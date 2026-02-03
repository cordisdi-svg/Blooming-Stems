import requests
import sys
from datetime import datetime
import json

class FlowerShopAPITester:
    def __init__(self, base_url="https://blooming-stems-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": None,
                "error": None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result["response_data"] = response.json()
                    print(f"   Response: {json.dumps(result['response_data'], indent=2)}")
                except:
                    result["response_data"] = response.text
                    print(f"   Response: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    result["error"] = error_data
                    print(f"   Error: {json.dumps(error_data, indent=2)}")
                except:
                    result["error"] = response.text
                    print(f"   Error: {response.text}")

            self.test_results.append(result)
            return success, result["response_data"] if success else result["error"]

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": None,
                "success": False,
                "response_data": None,
                "error": str(e)
            }
            self.test_results.append(result)
            return False, str(e)

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_contact_form_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test Customer",
            "email": "test@example.com",
            "phone": "720-706-6937",
            "message": "This is a test message for flower arrangement inquiry."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "contact",
            200,
            data=test_data
        )
        
        if success and response:
            # Verify response contains expected fields
            required_fields = ["id", "name", "email", "message", "timestamp"]
            for field in required_fields:
                if field not in response:
                    print(f"⚠️  Warning: Missing field '{field}' in response")
                    return False
            
            # Verify data matches
            if response["name"] != test_data["name"]:
                print(f"⚠️  Warning: Name mismatch - sent: {test_data['name']}, received: {response['name']}")
                return False
                
            if response["email"] != test_data["email"]:
                print(f"⚠️  Warning: Email mismatch - sent: {test_data['email']}, received: {response['email']}")
                return False
                
            print("✅ Contact form data validation passed")
        
        return success

    def test_contact_form_validation(self):
        """Test contact form validation with missing required fields"""
        # Test missing name
        invalid_data = {
            "email": "test@example.com",
            "message": "Missing name field"
        }
        
        success, response = self.run_test(
            "Contact Form Validation (Missing Name)",
            "POST",
            "contact",
            422,  # Validation error
            data=invalid_data
        )
        
        # Test missing email
        invalid_data2 = {
            "name": "Test User",
            "message": "Missing email field"
        }
        
        success2, response2 = self.run_test(
            "Contact Form Validation (Missing Email)",
            "POST",
            "contact",
            422,  # Validation error
            data=invalid_data2
        )
        
        return success and success2

    def test_status_endpoint(self):
        """Test status check endpoint"""
        # Test POST to status
        test_data = {
            "client_name": "test_client"
        }
        
        success, response = self.run_test(
            "Status Check Creation",
            "POST",
            "status",
            200,
            data=test_data
        )
        
        if success:
            # Test GET status
            success2, response2 = self.run_test(
                "Status Check Retrieval",
                "GET",
                "status",
                200
            )
            return success and success2
        
        return success

    def print_summary(self):
        """Print test summary"""
        print(f"\n{'='*50}")
        print(f"📊 API Test Summary")
        print(f"{'='*50}")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed < self.tests_run:
            print(f"\n❌ Failed Tests:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"   - {result['test_name']}: {result['error']}")
        
        return self.tests_passed == self.tests_run

def main():
    print("🌸 Nice Stems Florist - API Testing")
    print("="*50)
    
    tester = FlowerShopAPITester()
    
    # Run all tests
    tests = [
        tester.test_root_endpoint,
        tester.test_contact_form_submission,
        tester.test_contact_form_validation,
        tester.test_status_endpoint
    ]
    
    all_passed = True
    for test in tests:
        try:
            result = test()
            if not result:
                all_passed = False
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
            all_passed = False
    
    # Print summary
    success = tester.print_summary()
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())
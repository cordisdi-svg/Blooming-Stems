import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact"
      className="py-20 sm:py-32 bg-white"
      data-testid="contact-section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-handwritten text-4xl sm:text-5xl text-sage mb-4" data-testid="contact-title">
            Get in Touch
          </h2>
          <p className="font-sans text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions or ready to order? We'd love to hear from you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-cream rounded-3xl p-8 sm:p-12 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-sans font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-sage/30 focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all font-sans"
                placeholder="John Doe"
                data-testid="contact-name-input"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-sans font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-sage/30 focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all font-sans"
                placeholder="john@example.com"
                data-testid="contact-email-input"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block font-sans font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-sage/30 focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all font-sans"
                placeholder="(720) 706-6937"
                data-testid="contact-phone-input"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-sans font-medium text-gray-700 mb-2">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 rounded-xl border border-sage/30 focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all font-sans resize-none"
                placeholder="Tell us about the occasion or what you're looking for..."
                data-testid="contact-message-input"
              ></textarea>
            </div>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-xl"
                data-testid="contact-success-message"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="font-sans">Thank you! We'll get back to you soon.</span>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl"
                data-testid="contact-error-message"
              >
                <span className="font-sans">Something went wrong. Please try again or call us directly.</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-sage hover:bg-sage/90 disabled:bg-sage/50 text-white font-sans font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
              data-testid="contact-submit-button"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-sage/20 text-center">
            <p className="font-sans text-gray-600 mb-3">Or reach us directly:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:+17207066937"
                className="font-sans text-sage hover:text-sage/80 font-medium transition-colors"
              >
                +1 (720) 706-6937
              </a>
              <span className="hidden sm:inline text-gray-300">•</span>
              <a
                href="https://maps.app.goo.gl/vKibmwLTcL7ZMq7y6"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sage hover:text-sage/80 font-medium transition-colors"
              >
                Visit us in Denver
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

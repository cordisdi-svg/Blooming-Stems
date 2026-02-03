import "@/App.css";
import Hero from './components/Hero';
import About from './components/About';
import ReviewsChat from './components/ReviewsChat';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App bg-cream min-h-screen">
      <Hero />
      <About />
      <ReviewsChat />
      <Services />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

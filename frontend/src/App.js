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
      <div className="relative overflow-hidden">
        <div className="video-wall" aria-hidden="true">
          <div className="video-pane">
            <video
              className="video-media"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source
                src={`${process.env.PUBLIC_URL}/images/111.webm`}
                type="video/webm"
              />
              <source
                src={`${process.env.PUBLIC_URL}/images/111.mp4`}
                type="video/mp4"
              />
            </video>
          </div>
          <div className="video-pane">
            <video
              className="video-media"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source
                src={`${process.env.PUBLIC_URL}/images/222.webm`}
                type="video/webm"
              />
              <source
                src={`${process.env.PUBLIC_URL}/images/222.mp4`}
                type="video/mp4"
              />
            </video>
          </div>
          <div className="video-overlay" />
        </div>
        <div className="relative z-10">
          <About />
          <ReviewsChat />
          <Services />
          <Gallery />
          <Contact />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;

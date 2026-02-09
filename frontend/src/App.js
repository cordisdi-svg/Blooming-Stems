import "@/App.css";
import Hero from './components/Hero';
import About from './components/About';
import ReviewsChat from './components/ReviewsChat';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

const VideoSection = ({ children }) => (
  <section className="video-section">
    <div className="video-wall" aria-hidden="true">
      <div className="video-pane">
        <video className="video-media" autoPlay muted loop playsInline preload="auto">
          <source
            src="/images/111.webm"
            type="video/webm"
          />
          <source
            src="/images/111.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="video-pane">
        <video className="video-media" autoPlay muted loop playsInline preload="auto">
          <source
            src="/images/222.webm"
            type="video/webm"
          />
          <source
            src="/images/222.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="video-overlay" />
    </div>
    <div className="video-content">{children}</div>
  </section>
);

function App() {
  return (
    <div className="App bg-cream min-h-screen">
      <Hero />
      <VideoSection>
        <About />
      </VideoSection>
      <VideoSection>
        <ReviewsChat />
      </VideoSection>
      <VideoSection>
        <Services />
      </VideoSection>
      <VideoSection>
        <Gallery />
      </VideoSection>
      <VideoSection>
        <Contact />
      </VideoSection>
      <VideoSection>
        <Footer />
      </VideoSection>
    </div>
  );
}

export default App;

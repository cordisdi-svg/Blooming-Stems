import React from 'react';
import { Heart, Instagram, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sage text-white py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-handwritten text-2xl mb-4">Nice Stems Florist</h3>
            <p className="font-sans text-white/80 text-sm leading-relaxed">
              Your cozy neighborhood flower shop in Denver, creating beautiful arrangements with love and care since day one.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 font-sans text-sm">
              <a 
                href="tel:+17207066937" 
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                +1 (720) 706-6937
              </a>
              <a 
                href="https://maps.app.goo.gl/vKibmwLTcL7ZMq7y6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4" />
                1457 Old South Pearl, Denver, CO 80210
              </a>
            </div>
          </div>

          {/* Hours & Social */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Hours</h4>
            <div className="font-sans text-sm text-white/80 mb-4">
              <p>Monday - Friday: 7AM - 4PM</p>
              <p>Saturday - Sunday: Closed</p>
            </div>
            <a
              href="https://www.instagram.com/nicestemsflowershop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
              data-testid="footer-instagram-link"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-sans text-sm">Follow Us</span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="font-sans text-sm text-white/70 flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 fill-blush text-blush" /> © {currentYear} Nice Stems Florist
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

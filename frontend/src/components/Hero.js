import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-02-03%20124632.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      data-testid="hero-section"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-cream"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/50"
        >
          <motion.h1 
            className="font-handwritten text-5xl sm:text-6xl lg:text-7xl text-sage mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            data-testid="hero-title"
          >
            Nice Stems Florist
          </motion.h1>
          
          <motion.div 
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            data-testid="hero-rating"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-sage text-sage" />
              ))}
            </div>
            <span className="font-serif text-lg text-gray-700">5.0</span>
          </motion.div>

          <motion.p 
            className="font-serif italic text-xl sm:text-2xl text-gray-700 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Your neighborhood flower shop in Denver
          </motion.p>

          <motion.div 
            className="space-y-4 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-center justify-center gap-3" data-testid="hero-address">
              <MapPin className="w-5 h-5 text-sage flex-shrink-0" />
              <span className="font-sans">1457 Old South Pearl, Denver, CO 80210</span>
            </div>
            
            <div className="flex items-center justify-center gap-3" data-testid="hero-phone">
              <Phone className="w-5 h-5 text-sage flex-shrink-0" />
              <a href="tel:+17207066937" className="font-sans hover:text-sage transition-colors">
                +1 720-706-6937
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-3" data-testid="hero-hours">
              <Clock className="w-5 h-5 text-sage flex-shrink-0" />
              <span className="font-sans">Mon-Fri: 7AM-4PM • Sat-Sun: Closed</span>
            </div>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <a
              href="#contact"
              className="inline-block bg-sage hover:bg-sage/90 text-white font-sans font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              data-testid="hero-cta-button"
            >
              Order Flowers
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

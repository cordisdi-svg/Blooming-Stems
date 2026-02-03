import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Heart, Truck } from 'lucide-react';

const Typewriter = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <div className="font-mono text-[#4A4A4A] text-base leading-relaxed">
      {displayedText}
      <span className="animate-blink">|</span>
    </div>
  );
};

const About = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setStartTyping(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const story = `Welcome to Nice Stems Florist, your cozy neighborhood flower shop in the heart of Denver's South Pearl Street. 

For years, we've been crafting beautiful arrangements that brighten special moments and everyday life. Our owner, Bill, personally selects each stem with care and creativity, ensuring every bouquet tells its own unique story.

What started as a passion for flowers has blossomed into a warm community gathering place where locals come not just for stunning arrangements, but for the personal touch and friendly conversation that makes every visit feel like coming home.

We believe flowers aren't just decorations—they're messengers of love, comfort, celebration, and connection. Whether you're celebrating life's biggest milestones or simply want to make someone's Tuesday a little brighter, we're here to help you say it with flowers.`;

  return (
    <section 
      ref={sectionRef}
      className="py-20 sm:py-32 bg-cream"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-handwritten text-4xl sm:text-5xl text-sage text-center mb-16"
          data-testid="about-title"
        >
          Our Story
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Notebook with typewriter effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div 
              className="bg-white/90 rounded-lg shadow-xl p-8 sm:p-10"
              style={{
                backgroundImage: 'linear-gradient(transparent 31px, #E0E0E0 1px)',
                backgroundSize: '100% 32px',
                position: 'relative',
              }}
              data-testid="about-notebook"
            >
              {/* Red margin line */}
              <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-blush"></div>
              
              <div className="ml-8">
                {startTyping && (
                  <Typewriter text={story} />
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-lavender-light rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-sage rounded-full p-3">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2">
                    Fresh & Unique
                  </h3>
                  <p className="font-sans text-gray-600">
                    We source unique and uncommon flowers to create arrangements that stand out. Every bouquet is handcrafted with fresh, carefully selected blooms.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blush-light rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-sage rounded-full p-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2">
                    Personal Touch
                  </h3>
                  <p className="font-sans text-gray-600">
                    Bill personally takes your order, listens to your vision, and creates something spectacular tailored to your occasion and the recipient.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-sage/20">
              <div className="flex items-start gap-4">
                <div className="bg-sage rounded-full p-3">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2">
                    Fast & Reliable
                  </h3>
                  <p className="font-sans text-gray-600">
                    Same-day delivery available throughout the Denver metro area. We're here when you need us, even at the last minute.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

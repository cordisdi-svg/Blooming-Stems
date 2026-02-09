import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const reviews = [
  {
    name: 'Sophia Templin',
    text: 'The owner, Bill, was so personable and easy to work with! He did a beautiful delivery for me for a friend who just got out of the hospital. Will definitely use again.',
    side: 'left',
    delay: 0
  },
  {
    name: 'Brad Morian',
    text: 'Bill was amazing. I called the same day I needed delivery and he was patient, understanding, and asked all the right questions to ensure what I wanted was what was delivered. Beautiful bouquet, timely and the friendliest service. Would highly recommend.',
    side: 'right',
    delay: 1.2
  },
  {
    name: 'Sabrina',
    text: 'We Ordered last minute from Nice Stems and they totally delivered—gorgeous bouquet, fast service, and super friendly on the phone.',
    side: 'left',
    delay: 2.4
  },
  {
    name: 'Suzi K',
    text: 'I am in Northern California and found Nice Stems Florist doing a Google search. Bill was friendly, professional and super creative. He used my reasons for sending the flowers to put together a gorgeous arrangement. He has unique and uncommon flowers available to create something spectacular.',
    side: 'right',
    delay: 3.6
  },
  {
    name: 'Dick DeAngelis',
    text: "Bill was great - so friendly. He helped us send a beautiful arrangement to a Denver friend even though we lived in another state. He'll take good care of you.",
    side: 'left',
    delay: 4.8
  },
  {
    name: 'M "Bigg Daddy"',
    text: "Thank you, Nice Stems for the jaw-dropping floral arrangement for our aunts' going home ceremony at our church- she never liked funeral-looking flowers and you did not disappoint- Truly breathtaking.",
    side: 'right',
    delay: 6
  }
];

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const getAvatarColor = (name) => {
  const colors = ['#8A9A5B', '#F4C2C2', '#E6E6FA', '#A4B87A', '#FBE4E4'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const ChatBubble = ({ review, shouldAnimate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = review.text.length > 150;
  const displayText = isExpanded || !isLong ? review.text : review.text.slice(0, 150) + '...';

  const bubbleVariants = {
    hidden: { 
      opacity: 0, 
      x: review.side === 'left' ? -100 : 100,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: shouldAnimate ? review.delay : 0
      }
    }
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      className={`flex gap-3 ${review.side === 'right' ? 'flex-row-reverse' : 'flex-row'} mb-6`}
      data-testid={`review-bubble-${review.name.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* Avatar */}
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-sans font-semibold text-sm flex-shrink-0"
        style={{ backgroundColor: getAvatarColor(review.name) }}
      >
        {getInitials(review.name)}
      </div>

      {/* Message bubble */}
      <div className="max-w-md">
        <div
          className={`rounded-2xl p-4 shadow-md ${
            review.side === 'left' 
              ? 'bg-white/10 backdrop-blur-md border border-white/15 rounded-tl-none text-white' 
              : 'bg-sage/80 text-white rounded-tr-none'
          }`}
        >
          <p className={`font-sans text-sm mb-2 ${review.side === 'right' ? 'text-white' : 'text-white/80'}`}>
            {displayText}
          </p>
          {isLong && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center gap-1 text-xs font-medium ${
                review.side === 'right' ? 'text-white/90' : 'text-sage'
              }`}
              data-testid={`expand-review-${review.name.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {isExpanded ? (
                <>Show less <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>Show more <ChevronDown className="w-3 h-3" /></>
              )}
            </button>
          )}
        </div>
        <p className={`font-sans text-xs text-white/60 mt-1 ${review.side === 'right' ? 'text-right' : 'text-left'}`}>
          {review.name}
        </p>
      </div>
    </motion.div>
  );
};

const ReviewsChat = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Check if animation has been shown in this session
    const animationShown = sessionStorage.getItem('reviewsAnimated');
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          if (!animationShown) {
            setShouldAnimate(true);
            sessionStorage.setItem('reviewsAnimated', 'true');
          }
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 sm:py-32 bg-transparent"
      data-testid="reviews-section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-handwritten text-4xl sm:text-5xl text-sage text-center mb-4"
          data-testid="reviews-title"
        >
          What Our Customers Say
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-sans text-center text-white/70 mb-12"
        >
          Real reviews from real people
        </motion.p>

        {/* Chat container */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-white/15">
          {reviews.map((review, index) => (
            <ChatBubble 
              key={index} 
              review={review} 
              shouldAnimate={shouldAnimate}
            />
          ))}

          {/* Instagram promo bubble */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 100, scale: 0.8 },
              visible: { 
                opacity: 1, 
                x: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                  delay: shouldAnimate ? 7.2 : 0
                }
              }
            }}
            initial={shouldAnimate ? "hidden" : "visible"}
            animate="visible"
            className="flex gap-3 flex-row-reverse mb-6"
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-sans font-semibold text-sm flex-shrink-0"
              style={{ backgroundColor: '#8A9A5B' }}
            >
              NS
            </div>
            <div className="max-w-md">
              <a
                href="https://www.instagram.com/nicestemsflowershop"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl rounded-tr-none p-4 bg-gradient-to-br from-blush/80 to-lavender/80 shadow-md hover:shadow-xl transition-shadow"
                data-testid="instagram-promo-link"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Instagram className="w-5 h-5 text-sage" />
                  <p className="font-sans font-semibold text-white">
                    Check out our Instagram!
                  </p>
                </div>
                <p className="font-sans text-sm text-white/80">
                  Follow @nicestemsflowershop for daily inspiration and our latest creations 🌸
                </p>
              </a>
              <p className="font-sans text-xs text-white/60 mt-1 text-right">
                Nice Stems Florist
              </p>
            </div>
          </motion.div>

          {/* Google Maps CTA bubble */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -100, scale: 0.8 },
              visible: { 
                opacity: 1, 
                x: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                  delay: shouldAnimate ? 8.4 : 0
                }
              }
            }}
            initial={shouldAnimate ? "hidden" : "visible"}
            animate="visible"
            className="flex gap-3 flex-row"
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 flex-shrink-0"
            >
              <MapPin className="w-5 h-5 text-sage" />
            </div>
            <div className="max-w-md">
              <a
                href="https://maps.app.goo.gl/vKibmwLTcL7ZMq7y6"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl rounded-tl-none p-4 bg-white/10 backdrop-blur-md shadow-md hover:shadow-xl transition-shadow border border-white/15"
                data-testid="google-maps-cta-link"
              >
                <p className="font-sans text-sm text-white/80 mb-2">
                  Want to see more reviews?
                </p>
                <p className="font-sans text-sm font-semibold text-sage">
                  Check us out on Google Maps →
                </p>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsChat;

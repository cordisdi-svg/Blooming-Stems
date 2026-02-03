import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const galleryImages = [
  {
    url: 'https://customer-assets.emergentagent.com/job_6e1c3fc4-4e47-44a9-8b50-ad6b69a18149/artifacts/br3uxzi1_%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-02-03%20124632.png',
    title: 'Sunflower & Roses',
    description: 'Vibrant arrangement with sunflowers, roses, and purple mums'
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_6e1c3fc4-4e47-44a9-8b50-ad6b69a18149/artifacts/gqi03b37_%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-02-03%20124712.png',
    title: 'Yellow & White Garden',
    description: 'Cheerful yellow roses with delicate white daisies'
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_6e1c3fc4-4e47-44a9-8b50-ad6b69a18149/artifacts/i9c9f1ls_%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-02-03%20132635.png',
    title: 'Pink & Yellow Mix',
    description: 'Elegant pink roses and freesias with bright yellow accents'
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_6e1c3fc4-4e47-44a9-8b50-ad6b69a18149/artifacts/42iqljz6_%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-02-03%20132724.png',
    title: 'Spring Bouquet',
    description: 'Colorful mix of tulips, peonies, and ranunculus'
  },
  {
    url: 'https://customer-assets.emergentagent.com/job_6e1c3fc4-4e47-44a9-8b50-ad6b69a18149/artifacts/a1adxyvu_%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-02-03%20132707.png',
    title: 'Pure Elegance',
    description: 'Simple yet stunning white tulips arrangement'
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section 
      className="py-20 sm:py-32 bg-gradient-to-b from-cream to-blush-light"
      data-testid="gallery-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-handwritten text-4xl sm:text-5xl text-sage mb-4" data-testid="gallery-title">
            Our Arrangements
          </h2>
          <p className="font-sans text-gray-600 text-lg max-w-2xl mx-auto">
            Every bouquet is handcrafted with love and attention to detail
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              className={`relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(image)}
              data-testid={`gallery-image-${index}`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ minHeight: index === 0 ? '400px' : '200px' }}
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-serif text-lg font-semibold mb-1">
                    {image.title}
                  </h3>
                  <p className="font-sans text-sm text-white/90">
                    {image.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            data-testid="gallery-lightbox"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-blush transition-colors"
                data-testid="close-lightbox-button"
              >
                <X className="w-8 h-8" />
              </button>
              
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              
              <div className="mt-4 text-center">
                <h3 className="font-serif text-2xl text-white mb-2">
                  {selectedImage.title}
                </h3>
                <p className="font-sans text-white/80">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Truck, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Heart,
    title: 'Special Occasions',
    description: 'Weddings, anniversaries, birthdays, and all of life\'s beautiful moments deserve the perfect arrangement.',
    color: 'blush'
  },
  {
    icon: Calendar,
    title: 'Event Florals',
    description: 'From corporate events to intimate gatherings, we create stunning floral designs that set the perfect ambiance.',
    color: 'lavender'
  },
  {
    icon: Truck,
    title: 'Delivery Service',
    description: 'Same-day delivery available throughout Denver metro area. We bring the beauty right to your doorstep.',
    color: 'sage'
  },
  {
    icon: Sparkles,
    title: 'Custom Creations',
    description: 'Have a vision? Bill will work with you to create a one-of-a-kind arrangement that exceeds your expectations.',
    color: 'blush'
  }
];

const Services = () => {
  return (
    <section 
      className="py-20 sm:py-32 bg-white"
      data-testid="services-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-handwritten text-4xl sm:text-5xl text-sage mb-4" data-testid="services-title">
            Our Services
          </h2>
          <p className="font-sans text-gray-600 text-lg max-w-2xl mx-auto">
            From everyday bouquets to extraordinary celebrations, we're here for all your floral needs
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const bgColor = service.color === 'sage' ? 'bg-sage' : 
                           service.color === 'blush' ? 'bg-blush' : 
                           'bg-lavender';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-cream rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                data-testid={`service-card-${index}`}
              >
                <div className={`${bgColor} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="font-serif text-xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                
                <p className="font-sans text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-block bg-sage hover:bg-sage/90 text-white font-sans font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            data-testid="services-cta-button"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

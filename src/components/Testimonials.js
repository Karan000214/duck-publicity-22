import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechFlow Solutions',
      role: 'Founder',
      image: '👩‍💼',
      rating: 5,
      text: 'Duck Publicity completely transformed our marketing. In 6 months, we went from $50K to $285K in monthly revenue. Their data-driven approach and transparency is unmatched.',
      metric: '+470% Revenue Growth',
    },
    {
      name: 'Marcus Chen',
      company: 'E-Commerce Pro',
      role: 'CEO',
      image: '👨‍💼',
      rating: 5,
      text: 'The team at Duck Publicity understands performance marketing. They\'ve helped us achieve a 5.8x ROAS consistently. Best decision we\'ve made for our business.',
      metric: '+470% ROAS',
    },
    {
      name: 'Emily Rodriguez',
      company: 'Local Services Co',
      role: 'Owner',
      image: '👩‍🔬',
      rating: 5,
      text: 'Finally, an agency that focuses on real results, not vanity metrics. Our booking rate increased dramatically and they\'ve been incredibly responsive to our needs.',
      metric: '+701% Revenue',
    },
    {
      name: 'David Park',
      company: 'B2B Tech Services',
      role: 'Marketing Director',
      image: '👨‍🎓',
      rating: 5,
      text: 'The strategic approach they take is impressive. They didn\'t just run ads - they rebuilt our entire marketing funnel. Our pipeline is now 6x larger.',
      metric: '+567% Pipeline',
    },
    {
      name: 'Jessica Williams',
      company: 'Fashion E-Commerce',
      role: 'Brand Manager',
      image: '👩‍🎨',
      rating: 5,
      text: 'Working with Duck Publicity has been a game-changer. Their creative + performance balance is perfect. We\'re now profitably scaling at 3x our previous rate.',
      metric: '+320% Growth',
    },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-teal font-semibold text-lg mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Success Stories From Our Clients
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real feedback from real businesses we've helped scale.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <div className="glass glass-dark rounded-3xl p-8 md:p-12 mb-8">
                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Star size={20} className="fill-orange text-orange" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <motion.p
                  className="text-xl md:text-2xl font-semibold text-navy mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  "{testimonials[currentIndex].text}"
                </motion.p>

                {/* Metric */}
                <motion.div
                  className="inline-block px-6 py-3 bg-gradient-to-r from-teal/20 to-orange/20 rounded-xl mb-8"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="font-bold text-teal text-lg">{testimonials[currentIndex].metric}</p>
                </motion.div>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-teal to-cyan-400 flex items-center justify-center text-3xl shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {testimonials[currentIndex].image}
                  </motion.div>
                  <div>
                    <p className="font-bold text-navy text-lg">{testimonials[currentIndex].name}</p>
                    <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                    <p className="text-teal font-semibold text-sm">{testimonials[currentIndex].company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4">
            <motion.button
              onClick={prev}
              className="p-3 rounded-full bg-white border-2 border-gray-200 hover:border-teal hover:text-teal transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-teal'
                      : 'w-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              className="p-3 rounded-full bg-white border-2 border-gray-200 hover:border-teal hover:text-teal transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Testimonial Counter */}
          <motion.p
            className="text-center mt-8 text-gray-500 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {currentIndex + 1} / {testimonials.length}
          </motion.p>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 mb-8 text-lg">
            Join hundreds of successful brands already growing with Duck Publicity.
          </p>
          <motion.a
            href="#cta"
            className="btn-primary inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Growth Story
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

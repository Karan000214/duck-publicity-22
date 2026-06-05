import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

const Trust = () => {
  const logoPlaceholders = ['TechCorp', 'GrowthCo', 'Digital+', 'ScaleHub', 'PureAI', 'VentureCo'];
  
  const stats = [
    { value: 100, label: 'Campaigns Projected', suffix: '+' },
    { value: 10, label: 'Million Ad Spend (Goal)', suffix: 'M+' },
    { value: 200, label: 'Expected ROI', suffix: '%' },
    { value: 90, label: 'Target Client Retention', suffix: '%' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p
            className="text-teal font-semibold text-lg mb-4"
            variants={itemVariants}
          >
            ✓ Trusted by Growing Brands
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-navy mb-6"
            variants={itemVariants}
          >
            Proven Results. Proven Partners.
          </motion.h2>
          <motion.p
            className="text-gray-700 text-lg max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Leading brands trust Duck Publicity to scale their digital marketing and achieve exceptional ROI.
          </motion.p>
        </motion.div>

        {/* Logos Slider */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {logoPlaceholders.map((logo, idx) => (
              <motion.div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-6 h-24 flex items-center justify-center shadow-sm"
                whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(0, 180, 216, 0.15)' }}
                variants={itemVariants}
              >
                <span className="text-gray-900 font-bold text-center">{logo}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="gradient-hover bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm"
              variants={itemVariants}
            >
              <motion.p
                className="text-4xl md:text-5xl font-bold text-teal mb-3"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </motion.p>
              <p className="text-gray-800 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Trust;

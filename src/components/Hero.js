import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { useContent } from '../context/ContentContext';

const Hero = () => {
  const { content } = useContent();
  const heroData = content?.hero || {};

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const metrics = heroData.metrics || [
    { label: 'ROAS', value: '120%', prefix: '+' },
    { label: 'Leads Generated', value: '200+', prefix: '' },
    { label: 'Revenue Growth', value: '60%', prefix: '+' },
    { label: 'Conversion Rate', value: '12%', prefix: '' },
  ];

  return (
    <section id="hero" className="min-h-screen pt-24 pb-20 md:pt-32 md:pb-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-teal rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-72 h-72 bg-navy rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div className="space-y-8" variants={containerVariants}>
            {/* Tagline */}
            <motion.div
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full w-fit"
              variants={itemVariants}
            >
              <span className="w-2 h-2 bg-teal rounded-full animate-pulse"></span>
              <span className="text-teal font-semibold text-sm">{heroData.tagline || 'Your Vision - Our Strategy - Real Growth'}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-navy font-display"
              variants={itemVariants}
            >
              {heroData.mainHeadline || 'We Turn Marketing Into Measurable Growth'}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 leading-relaxed"
              variants={itemVariants}
            >
              {heroData.subheadline || "Duck Publicity helps brands scale using performance-driven digital marketing strategies. We don't do vanity metrics – we deliver real ROI."}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => scrollToSection('#cta')}
                className="btn-primary flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Free Consultation
                <motion.div
                  className="group-hover:translate-x-2"
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('#case-studies')}
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See Our Work
              </motion.button>
            </motion.div>

            {/* Trust Badge */}
            <motion.p
              className="text-sm text-gray-500 pt-4"
              variants={itemVariants}
            >
              ✓ No credit card required • ✓ Results-focused approach • Immediate Response
            </motion.p>
          </motion.div>

          {/* Right Side - Dashboard Illustration */}
          <motion.div
            className="relative h-80 md:h-96"
            variants={itemVariants}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 h-full flex flex-col justify-between shadow-lg border border-gray-200"
              whileHover={{ y: -10, boxShadow: '0 30px 90px rgba(0, 180, 216, 0.2)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-orange rounded-full"></div>
                  <div className="w-3 h-3 bg-teal rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>
                <p className="text-navy text-sm mb-6 font-semibold">Campaign Analytics</p>
              </div>
              {/* Metrics Grid */}
              <div className="space-y-6">
                {metrics.map((metric, idx) => (
                  <motion.div
                    key={idx}
                    className="flex justify-between items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="text-gray-700 text-sm font-medium">{metric.label}</span>
                    <span className="text-teal font-bold text-xl">
                      {metric.prefix}<AnimatedCounter target={parseInt(metric.value)} suffix={metric.value.slice(-1) === '%' || metric.value.slice(-2) === 'K+' ? metric.value.slice(-2) : ''} />
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

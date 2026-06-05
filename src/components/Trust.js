import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Lightbulb, Briefcase, Palette, Users, ArrowRight } from 'lucide-react';

const Trust = () => {
  const expectations = [
    {
      icon: Palette,
      title: 'Transparent Communication',
      description: 'Clear updates, honest reporting, and no confusing marketing jargon.',
    },
    {
      icon: Target,
      title: 'Growth-Focused Strategy',
      description: 'Every campaign is planned with ROI, brand growth, and long-term impact in mind.',
    },
    {
      icon: Zap,
      title: 'Fast Execution',
      description: 'Quick implementation, faster optimizations, and proactive support.',
    },
    {
      icon: Lightbulb,
      title: 'Creative + Performance Balance',
      description: 'We combine strong visuals with data-driven marketing strategies.',
    },
    {
      icon: Briefcase,
      title: 'Custom Approach',
      description: 'No copy-paste marketing. Every business gets a tailored strategy.',
    },
    {
      icon: Users,
      title: 'Partnership Mindset',
      description: 'We work like your growth partner — not just another agency vendor.',
    },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    hover: {
      y: -8,
      boxShadow: '0 25px 50px rgba(0, 180, 216, 0.15)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <section id="expectations" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Subtle background gradient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p
            className="text-teal font-semibold text-sm md:text-base mb-4 tracking-wide uppercase"
            variants={itemVariants}
          >
            Built for Brands Ready to Grow
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6"
            variants={itemVariants}
          >
            What You Can Expect From Duck Publicity
          </motion.h2>
          <motion.p
            className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            We may be new, but our approach is built for serious growth. We focus on strategy, transparency, creativity, and performance — helping brands grow with smart digital marketing, not empty promises.
          </motion.p>
        </motion.div>

        {/* Expectation Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {expectations.map((expectation, idx) => {
            const Icon = expectation.icon;
            return (
              <motion.div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-teal/30 transition-all duration-300"
                variants={cardVariants}
                whileHover="hover"
              >
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal/10 to-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-teal/20 group-hover:to-cyan-500/20 transition-all duration-300"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Icon className="w-7 h-7 text-teal" strokeWidth={1.5} />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-navy mb-4">
                  {expectation.title}
                </h3>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed">
                  {expectation.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Statement Section */}
        <motion.div
          className="bg-gradient-to-br from-navy via-navy-light to-teal/20 rounded-3xl p-12 md:p-16 text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p
            className="text-teal font-semibold text-sm md:text-base mb-4 tracking-wide uppercase"
            variants={itemVariants}
          >
            Why Businesses Choose Us
          </motion.p>
          <motion.h3
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Fresh Ideas. Modern Execution. Relentless Growth Mindset.
          </motion.h3>
          <motion.p
            className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            We understand modern digital platforms, changing customer behavior, and performance marketing trends. Our focus is simple — help businesses grow with practical strategies that actually work.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.a
            href="#cta"
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Free Strategy Call
            <ArrowRight size={20} />
          </motion.a>
          <motion.a
            href="#process"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-navy text-navy font-bold rounded-lg hover:bg-navy hover:text-white transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See Our Process
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Trust;

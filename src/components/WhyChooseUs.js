import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, BarChart3, MessageCircle, Target, Zap, TrendingUp } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: BarChart3,
      title: 'Data-Driven Strategies',
      description: 'Every decision backed by analytics. We test, measure, and optimize continuously.',
    },
    {
      icon: CheckCircle,
      title: 'Transparent Reporting',
      description: 'Weekly reports, real dashboards, no vanity metrics. See exactly what we\'re doing.',
    },
    {
      icon: TrendingUp,
      title: 'Creative + Performance Balance',
      description: 'Stunning visuals that don\'t just look good – they convert and drive results.',
    },
    {
      icon: Target,
      title: 'ROI-Focused Campaigns',
      description: 'We don\'t measure success by impressions. We measure it by your bottom line.',
    },
    {
      icon: MessageCircle,
      title: 'Fast Communication',
      description: 'Immediate Response. Your account manager is always available when you need them.',
    },
    {
      icon: Zap,
      title: 'Scalable Systems',
      description: 'Whether you\'re doing $5K or $500K/month, our processes scale efficiently.',
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="why-choose" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy to-navy-light">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-teal font-semibold text-lg mb-4">Why Choose Duck Publicity</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Different Approach to Growth
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We're not just another agency. Here's what sets us apart.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reasons.map((reason, idx) => {
            const IconComponent = reason.icon;
            return (
              <motion.div
                key={idx}
                className="glass glass-dark rounded-2xl p-8 backdrop-blur-md hover:backdrop-blur-lg transition-all duration-300 border border-teal/20 hover:border-teal/50"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: '0 20px 60px rgba(0, 180, 216, 0.2)' }}
              >
                {/* Icon */}
                <motion.div
                  className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal to-cyan-400 flex items-center justify-center text-white mb-6"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <IconComponent size={24} />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                <p className="text-gray-300 leading-relaxed">{reason.description}</p>

                {/* Checkmark */}
                <motion.div
                  className="mt-6 pt-6 border-t border-teal/20 flex items-center gap-2 text-teal"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                >
                  <CheckCircle size={16} />
                  <span className="text-sm font-semibold">Proven & Guaranteed</span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className="mt-20 glass glass-dark rounded-2xl p-8 md:p-12 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">How We Compare</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-teal/20">
                  <th className="pb-4 text-white font-bold">Feature</th>
                  <th className="pb-4 text-teal font-bold text-center">Duck Publicity</th>
                  <th className="pb-4 text-gray-400 font-bold text-center">Freelancers</th>
                  <th className="pb-4 text-gray-400 font-bold text-center">Big Agencies</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Dedicated Account Manager', duck: true, freelance: false, big: true },
                  { feature: 'Real-time Reporting', duck: true, freelance: false, big: false },
                  { feature: 'ROI-Focused', duck: true, freelance: true, big: false },
                  { feature: 'Affordable', duck: true, freelance: true, big: false },
                  { feature: 'Scalability', duck: true, freelance: false, big: true },
                  { feature: '24/7 Support', duck: true, freelance: false, big: false },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-teal/10 hover:bg-teal/5 transition">
                    <td className="py-4 text-white font-medium">{row.feature}</td>
                    <td className="py-4 text-center">
                      {row.duck && <CheckCircle size={20} className="text-teal inline" />}
                      {!row.duck && <span className="text-gray-500">✗</span>}
                    </td>
                    <td className="py-4 text-center">
                      {row.freelance && <CheckCircle size={20} className="text-gray-500 inline" />}
                      {!row.freelance && <span className="text-gray-600">✗</span>}
                    </td>
                    <td className="py-4 text-center">
                      {row.big && <CheckCircle size={20} className="text-gray-500 inline" />}
                      {!row.big && <span className="text-gray-600">✗</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

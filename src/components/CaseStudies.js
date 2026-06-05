import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Zap } from 'lucide-react';

const CaseStudies = () => {
  const caseStudies = [
    {
      title: 'E-Commerce Brand Scaling',
      industry: 'E-Commerce',
      metrics: [
        { icon: TrendingUp, label: 'ROAS', before: '2.1x', after: '5.8x' },
        { icon: DollarSign, label: 'Revenue', before: '$50K/mo', after: '$285K/mo' },
        { icon: Users, label: 'Customers', before: '120/mo', after: '750/mo' },
        { icon: Zap, label: 'Cost/Sale', before: '$45', after: '$18' },
      ],
      description: 'Implemented multi-channel performance marketing strategy for online retailer.',
      result: '470% Revenue Growth',
    },
    {
      title: 'SaaS Lead Generation',
      industry: 'SaaS',
      metrics: [
        { icon: Users, label: 'Leads/Month', before: '45', after: '380' },
        { icon: TrendingUp, label: 'Conversion', before: '1.2%', after: '4.8%' },
        { icon: DollarSign, label: 'CAC', before: '$85', after: '$32' },
        { icon: Zap, label: 'Quality Score', before: '6.5/10', after: '9.2/10' },
      ],
      description: 'Optimized Google Ads and Meta campaigns for B2B SaaS platform.',
      result: '744% Lead Increase',
    },
    {
      title: 'Local Service Business',
      industry: 'Services',
      metrics: [
        { icon: Users, label: 'Bookings/mo', before: '25', after: '145' },
        { icon: TrendingUp, label: 'Avg Ticket', before: '$450', after: '$620' },
        { icon: DollarSign, label: 'Monthly Revenue', before: '$11.2K', after: '$89.9K' },
        { icon: Zap, label: 'ROI', before: '180%', after: '520%' },
      ],
      description: 'Local SEO + paid ads strategy for service-based business.',
      result: '701% Revenue Growth',
    },
    {
      title: 'B2B Tech Agency',
      industry: 'Technology',
      metrics: [
        { icon: TrendingUp, label: 'Pipeline Value', before: '$180K', after: '$1.2M' },
        { icon: Users, label: 'MQLs/month', before: '12', after: '94' },
        { icon: DollarSign, label: 'Cost/MQL', before: '$120', after: '$28' },
        { icon: Zap, label: 'Close Rate', before: '8%', after: '22%' },
      ],
      description: 'Account-based marketing and LinkedIn ads for B2B growth.',
      result: '567% Pipeline Growth',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="case-studies" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-teal font-semibold text-lg mb-4">Case Studies</p>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Real Results. Real Businesses.
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            See how we've transformed businesses across various industries through strategic digital marketing.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {caseStudies.map((study, idx) => (
            <motion.div
              key={idx}
              className="gradient-hover glass rounded-3xl p-8 md:p-10 overflow-hidden relative group"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-teal/10 text-teal rounded-full text-sm font-semibold mb-3">
                        {study.industry}
                      </span>
                      <h3 className="text-2xl font-bold text-navy">{study.title}</h3>
                    </div>
                    <motion.div
                      className="text-3xl font-bold text-teal"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, delay: idx * 0.1 + 0.3 }}
                    >
                      +{study.result.split(' ')[0]}
                    </motion.div>
                  </div>
                  <p className="text-gray-700">{study.description}</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {study.metrics.map((metric, metricIdx) => {
                    const IconComponent = metric.icon;
                    return (
                      <motion.div
                        key={metricIdx}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 + metricIdx * 0.05 + 0.2 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent size={16} className="text-teal" />
                          <p className="text-xs text-gray-700">{metric.label}</p>
                        </div>
                        <div className="flex items-end gap-2">
                          <div>
                            <p className="text-xs text-gray-500 line-through mb-1">{metric.before}</p>
                            <p className="text-lg font-bold text-gray-900">{metric.after}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA */}
                <motion.button
                  className="text-teal font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  View Full Case Study →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 mb-6 text-lg">
            Ready to become a case study? Let's create your success story.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#cta" className="btn-primary inline-block">
              Get Started Today
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Lightbulb, Rocket, TrendingUp, Zap } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Research',
      description: 'We dive deep into your market, competitors, and audience to understand what works.',
      details: ['Market Analysis', 'Competitor Review', 'Audience Research'],
    },
    {
      number: '02',
      icon: Lightbulb,
      title: 'Strategy',
      description: 'Develop a customized roadmap tailored to your goals with specific KPIs.',
      details: ['Campaign Planning', 'Channel Selection', 'Budget Allocation'],
    },
    {
      number: '03',
      icon: Rocket,
      title: 'Launch',
      description: 'Execute campaigns with precision, creativity, and attention to detail.',
      details: ['Creative Development', 'Campaign Setup', 'Quality Assurance'],
    },
    {
      number: '04',
      icon: TrendingUp,
      title: 'Optimize',
      description: 'Continuously test, measure, and refine based on real data.',
      details: ['A/B Testing', 'Performance Monitoring', 'Iterative Improvements'],
    },
    {
      number: '05',
      icon: Zap,
      title: 'Scale',
      description: 'Once we find what works, we scale it systematically for maximum ROI.',
      details: ['Budget Scaling', 'Audience Expansion', 'New Channel Testing'],
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
    <section id="process" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-teal font-semibold text-lg mb-4">Our Process</p>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            From Strategy to Scale
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our proven five-step process ensures consistent, measurable growth for your business.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={idx}
                  className="relative"
                  variants={itemVariants}
                >
                  {/* Card */}
                  <motion.div
                    className="gradient-hover glass rounded-2xl p-8 h-full flex flex-col relative z-10"
                    whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(0, 180, 216, 0.2)' }}
                  >
                    {/* Step Number */}
                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-teal to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center text-teal mb-6"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <IconComponent size={24} />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-navy mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-6 flex-1">{step.description}</p>

                    {/* Details */}
                    <div className="space-y-2 pt-6 border-t border-gray-200">
                      {step.details.map((detail, detailIdx) => (
                        <motion.p
                          key={detailIdx}
                          className="text-sm text-gray-500 flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + detailIdx * 0.05 + 0.3 }}
                        >
                          <span className="w-1.5 h-1.5 bg-teal rounded-full" />
                          {detail}
                        </motion.p>
                      ))}
                    </div>
                  </motion.div>

                  {/* Arrow Connector - Hidden on mobile */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-32 w-8 h-1 bg-gradient-to-r from-teal to-transparent" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom Timeline Info */}
        <motion.div
          className="mt-20 glass glass-dark rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-teal mb-2">2 Weeks</p>
              <p className="text-gray-600">Initial setup & launch</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-teal mb-2">4 Weeks</p>
              <p className="text-gray-600">Testing & optimization</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-teal mb-2">8 Weeks+</p>
              <p className="text-gray-600">Scaling & growth phase</p>
            </div>
          </div>
        </motion.div>

        {/* Process CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600 mb-8 text-lg">
            Ready to start your growth journey? Let's get you started today.
          </p>
          <motion.a
            href="#cta"
            className="btn-primary inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule Free Strategy Call
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Target, Search, Smartphone, Palette, Globe } from 'lucide-react';
import { FiArrowRight } from 'react-icons/fi';
import { useContent } from '../context/ContentContext';

const iconMap = {
  Zap,
  Target,
  Search,
  Smartphone,
  Palette,
  Globe,
};

const getSlug = (title) => {
  if (!title) return 'performance-marketing';
  return title
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const Services = () => {
  const { content } = useContent();
  const rawServices = content?.services || [];

  const services = rawServices.map((s) => ({
    ...s,
    slug: s.slug || getSlug(s.title),
    icon: iconMap[s.iconName] || Zap,
    color: s.color || 'from-orange to-red-500',
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
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
            className="text-teal font-semibold text-lg mb-4"
            variants={itemVariants}
          >
            Our Services
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-navy mb-6"
            variants={itemVariants}
          >
            Everything You Need to Scale
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            variants={itemVariants}
          >
            From paid advertising to organic growth, we offer end-to-end digital marketing solutions.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={idx}
                className="gradient-hover glass glass-dark rounded-2xl p-8 h-full flex flex-col justify-between group overflow-hidden relative"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}
                />

                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 10 }}
                >
                  <IconComponent size={28} />
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-navy mb-3">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Results Badge */}
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-gray-100 text-navy text-sm font-semibold rounded-lg">
                    {service.results}
                  </span>
                </div>

                {/* CTA */}
                <Link
                  to={`/services/${service.slug}`}
                  className="flex items-center gap-2 text-teal font-semibold group/btn"
                >
                  Learn More
                  <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-600 mb-6">
            Need a custom solution? We can mix and match services tailored to your business.
          </p>
          <motion.button
            onClick={() => scrollToSection('#cta')}
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Custom Package
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

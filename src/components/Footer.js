import React from 'react';
import { Link } from 'react-router-dom';
import DuckLogo from './DuckLogo';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      { label: 'Performance Marketing', href: '/services/performance-marketing' },
      { label: 'Meta Ads', href: '/services/meta-ads' },
      { label: 'Google Ads', href: '/services/google-ads' },
      { label: 'SEO Optimization', href: '/services/seo-optimization' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Process', href: '/process' },
      { label: 'Insights', href: '/insights' },
      { label: 'Contact', href: '/contact' },
    ],
    Resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'Guides', href: '/guides' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ', href: '/faq' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="bg-navy text-white pt-20 md:pt-32 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <motion.div
              className="flex items-center gap-2 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <DuckLogo style={{ height: '2.5rem', width: '2.5rem', minWidth: '2.5rem' }} />
              <span className="font-bold text-xl" style={{ lineHeight: '2.5rem', fontSize: '1.6rem', height: '2.5rem', display: 'flex', alignItems: 'center' }}>Duck Publicity</span>
            </motion.div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Your Vision - Our Strategy - Real Growth. Performance-driven digital marketing for ambitious brands.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
              ].map((social, idx) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-teal/10 hover:bg-teal/20 flex items-center justify-center text-teal transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    <IconComponent size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <h4 className="font-bold text-lg mb-6 text-white">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, linkIdx) => (
                  <motion.li
                    key={linkIdx}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-teal transition-colors duration-300 text-sm"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-gray-400 hover:text-teal transition-colors duration-300 text-sm"
                      >
                        {link.label}
                      </button>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="border-t border-gray-800 pt-12 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="font-bold text-lg mb-6">Get in Touch</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Mail,
                label: 'Email',
                value: 'hello@duckpublicity.com',
                href: 'mailto:hello@duckpublicity.com',
              },
              {
                icon: Phone,
                label: 'Phone',
                value: '+91 70699 40681',
                href: 'tel:+917069940681',
              },
              {
                icon: MapPin,
                label: 'Location',
                value: 'Ahmedabad, Gujarat, India',
                href: '#',
              },
            ].map((contact, idx) => {
              const IconComponent = contact.icon;
              return (
                <motion.a
                  key={idx}
                  href={contact.href}
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 5 }}
                  variants={itemVariants}
                >
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal group-hover:bg-teal/20 transition-colors"
                    whileHover={{ rotate: 10 }}
                  >
                    <IconComponent size={20} />
                  </motion.div>
                  <div>
                    <p className="text-xs text-gray-500">{contact.label}</p>
                    <p className="text-white font-semibold group-hover:text-teal transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          className="glass glass-dark rounded-xl p-6 mb-12 text-center border border-teal/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-gray-300 mb-4">Have a quick question?</p>
          <motion.a
            href="https://wa.me/917069940681"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>💬</span>
            Chat on WhatsApp
          </motion.a>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} Duck Publicity. All rights reserved. | Crafted with 🦆 for ambitious brands.
          </p>
          <div className="flex gap-4">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-teal transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Privacy
            </motion.a>
            <span className="text-gray-600">•</span>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-teal transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Terms
            </motion.a>
            <span className="text-gray-600">•</span>
            <motion.button
              onClick={() => scrollToSection('#hero')}
              className="text-gray-400 hover:text-teal transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Back to Top ↑
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const CTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const subject = `New Lead Inquiry - ${formData.company || 'Duck Publicity'}`;
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Company: ${formData.company}`,
      `Service: ${formData.service}`,
      `Budget: ${formData.budget}`,
      '',
      'Generated from Duck Publicity website lead form.',
    ].join('\n');

    const emailUrl = `mailto:bksales.amazon@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const whatsappUrl = `https://wa.me/7069940681?text=${encodeURIComponent(`Hi Duck Publicity,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\nService: ${formData.service}\nBudget: ${formData.budget}\n\nI would like to discuss my marketing needs.`)}`;

    window.location.href = emailUrl;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setLoading(false);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
      });
    }, 5000);
  };

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
    <section id="cta" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy via-navy-light to-teal/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Ready to Scale Your Brand?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8"
            variants={itemVariants}
          >
            Book a free strategy call with our team. No obligations, no sales pitch – just actionable insights.
          </motion.p>
          <motion.p
            className="text-teal font-semibold text-lg"
            variants={itemVariants}
          >
            Immediate Response • ✓ Customized strategy • ✓ Ready to implement
          </motion.p>
        </motion.div>

        {/* Form and Benefits */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Form */}
          <motion.div
            className="glass glass-dark rounded-2xl p-8 md:p-12 backdrop-blur-lg"
            variants={itemVariants}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-teal/40 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-teal focus:outline-none transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-teal/40 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-teal focus:outline-none transition-all duration-300"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-teal/40 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-teal focus:outline-none transition-all duration-300"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Company Name *</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-teal/40 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-teal focus:outline-none transition-all duration-300"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Service Interest *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-teal/40 rounded-lg px-4 py-3 text-gray-900 focus:border-teal focus:outline-none transition-all duration-300"
                  >
                    <option value="">Select a service...</option>
                    <option value="performance">Performance Marketing</option>
                    <option value="meta">Meta Ads</option>
                    <option value="google">Google Ads</option>
                    <option value="seo">SEO</option>
                    <option value="social">Social Media</option>
                    <option value="all">All Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Monthly Budget *</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-teal/40 rounded-lg px-4 py-3 text-gray-900 focus:border-teal focus:outline-none transition-all duration-300"
                  >
                    <option value="">Select budget range...</option>
                    <option value="₹5k - ₹10k">₹5,000 - ₹10,000</option>
                    <option value="₹10k - ₹25k">₹10,000 - ₹25,000</option>
                    <option value="₹25k - ₹50k">₹25,000 - ₹50,000</option>
                    <option value="₹50k+">₹50,000+</option>
                  </select>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-75"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <div className="loader" style={{ width: '16px', height: '16px' }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Book Free Consultation
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-gray-400 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-teal to-cyan-400 flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <CheckCircle size={32} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Perfect!</h3>
                <p className="text-gray-300 mb-4">
                  Your lead details have been prepared for email and WhatsApp outreach.
                </p>
                <p className="text-teal font-semibold">
                  Please check your email draft and chat app for the next step.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Benefits */}
          <motion.div className="space-y-8" variants={containerVariants}>
            <motion.div
              className="flex gap-4"
              variants={itemVariants}
            >
              <motion.div
                className="w-12 h-12 rounded-lg bg-teal/20 flex items-center justify-center text-teal flex-shrink-0"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <span className="text-xl">📊</span>
              </motion.div>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">Custom Strategy</h4>
                <p className="text-gray-300">
                  We'll analyze your business and create a personalized growth strategy.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex gap-4"
              variants={itemVariants}
            >
              <motion.div
                className="w-12 h-12 rounded-lg bg-teal/20 flex items-center justify-center text-teal flex-shrink-0"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <span className="text-xl">🎯</span>
              </motion.div>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">Quick Wins</h4>
                <p className="text-gray-300">
                  Identify immediate opportunities to improve your marketing ROI.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex gap-4"
              variants={itemVariants}
            >
              <motion.div
                className="w-12 h-12 rounded-lg bg-teal/20 flex items-center justify-center text-teal flex-shrink-0"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <span className="text-xl">⚡</span>
              </motion.div>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">Action Plan</h4>
                <p className="text-gray-300">
                  Get a detailed roadmap with next steps and expected outcomes.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex gap-4"
              variants={itemVariants}
            >
              <motion.div
                className="w-12 h-12 rounded-lg bg-teal/20 flex items-center justify-center text-teal flex-shrink-0"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <span className="text-xl">💬</span>
              </motion.div>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">No Pressure</h4>
                <p className="text-gray-300">
                  This is a consultation call. We'll discuss if we're a good fit together.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

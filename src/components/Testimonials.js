import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Target,
  Zap,
} from 'lucide-react';

const Testimonials = () => {
  const commitments = [
    {
      icon: MessageCircle,
      title: 'Clear Communication',
      description:
        'Regular updates, transparent reporting, and honest conversations without confusing marketing jargon.',
    },
    {
      icon: ShieldCheck,
      title: 'Long-Term Partnership',
      description:
        'We treat your business like our own and focus on sustainable growth instead of short-term wins.',
    },
    {
      icon: Zap,
      title: 'Fast Execution',
      description:
        'Quick responses, proactive improvements, and a team that keeps moving your projects forward.',
    },
    {
      icon: Target,
      title: 'Strategy Before Spending',
      description:
        'We prioritize research and planning to ensure every effort has a purpose.',
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Decisions',
      description:
        'Every optimization is guided by performance data and real insights.',
    },
    {
      icon: HeartHandshake,
      title: 'Growth Partner Mindset',
      description:
        'Our success is tied to your success. We aim to become an extension of your team.',
    },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-teal font-semibold text-lg mb-4">Why Businesses Work With Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight">
            What You Can Expect Working With Duck Publicity
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            We believe trust is built through transparency, communication, and consistent execution.
            Here&apos;s what every client can expect from us.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          {commitments.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_24px_60px_-28px_rgba(6,182,212,0.35)]"
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal/8 via-transparent to-orange/8 opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal/15 to-orange/15 text-teal shadow-inner">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-16 rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-[0_28px_80px_-32px_rgba(15,23,42,0.65)] md:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-teal font-semibold uppercase tracking-[0.25em] text-xs mb-3">Built On Trust</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                No Fake Promises. No Marketing Buzzwords.
              </h3>
              <p className="text-slate-200 leading-relaxed text-lg">
                We&apos;re building Duck Publicity on honesty, transparency, and relentless execution.
                Whether you&apos;re a startup, clinic, local business, or growing brand, our goal is simple
                — help you grow with smart digital marketing and dependable support.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#cta"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-100"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Book Free Strategy Call
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/12"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Let&apos;s Discuss Your Goals
                <ArrowRight size={16} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

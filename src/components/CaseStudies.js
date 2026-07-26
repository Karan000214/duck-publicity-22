import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  PenTool,
  Rocket,
  Search,
  Target,
  TrendingUp,
} from 'lucide-react';

const CaseStudies = () => {
  const frameworkCards = [
    {
      icon: Search,
      title: 'Discovery & Audit',
      description:
        'We understand your business, audience, competitors, and opportunities before making recommendations.',
    },
    {
      icon: Target,
      title: 'Strategy & Planning',
      description:
        'Every business receives a customized roadmap aligned with goals, budget, and growth priorities.',
    },
    {
      icon: PenTool,
      title: 'Content & Creative',
      description:
        'From branding to content and creatives, we focus on building trust and engagement.',
    },
    {
      icon: Rocket,
      title: 'Execution & Optimization',
      description:
        'SEO, social media, advertising, and website improvements are implemented with continuous optimization.',
    },
    {
      icon: BarChart3,
      title: 'Reporting & Insights',
      description:
        'Transparent communication and clear reporting help you understand what\'s working and what can improve.',
    },
    {
      icon: TrendingUp,
      title: 'Scale & Grow',
      description:
        'Once strategies perform, we focus on scaling and creating consistent long-term growth.',
    },
  ];

  return (
    <section id="case-studies" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-teal font-semibold text-lg mb-4">How We Turn Vision Into Growth</p>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight">Our Growth Framework</h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Great marketing isn&apos;t luck. It&apos;s a process. At Duck Publicity, every project follows a structured
            framework designed to create sustainable growth and long-term success.
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
          {frameworkCards.map((item) => {
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
              <p className="text-teal font-semibold uppercase tracking-[0.25em] text-xs mb-3">Built for Long-Term Partnerships</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">No Inflated Promises. Just Smart Marketing.</h3>
              <p className="text-slate-200 leading-relaxed text-lg">
                We believe in transparency, strategy, and continuous improvement. Our goal is simple — become your trusted
                growth partner and help your business build a stronger digital presence.
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
                Explore Our Services
                <ArrowRight size={16} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;

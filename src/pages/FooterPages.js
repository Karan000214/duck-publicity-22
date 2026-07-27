import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Globe,
  MessageCircle,
  PenTool,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';

const PageLayout = ({ eyebrow, title, description, children, ctaPrimary, ctaSecondary, ctaPrimaryHref = '#cta', ctaSecondaryHref = '/contact' }) => (
  <section className="min-h-screen bg-white text-slate-900">
    <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-teal-50/60 p-8 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)] md:p-10 lg:p-12"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-navy md:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
      </motion.div>

      <div className="mt-10 space-y-10">{children}</div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mt-12 rounded-[30px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-[0_30px_80px_-32px_rgba(15,23,42,0.75)] md:p-10"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal">Ready to grow</p>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">Ready to Grow Your Business?</h2>
            <p className="mt-4 text-slate-200">Let&apos;s discuss how Duck Publicity can help strengthen your online presence and create sustainable growth.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={ctaPrimaryHref} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100">{ctaPrimary}<ArrowRight size={16} /></a>
            <Link to={ctaSecondaryHref} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/12">{ctaSecondary}<ArrowRight size={16} /></Link>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const SectionCard = ({ title, text, icon: Icon, accent = 'teal' }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_24px_60px_-28px_rgba(6,182,212,0.35)]"
  >
    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent === 'teal' ? 'from-teal/15 to-orange/15 text-teal' : 'from-orange/15 to-teal/10 text-orange'} shadow-inner`}>
      <Icon size={20} />
    </div>
    <h3 className="text-xl font-semibold text-navy">{title}</h3>
    <p className="mt-3 text-slate-600 leading-7">{text}</p>
  </motion.article>
);

export const AboutPage = () => (
  <PageLayout
    eyebrow="About Duck Publicity"
    title="Helping Businesses Grow Through Smart Digital Marketing"
    description="Duck Publicity was built with a simple mission — help businesses create a stronger online presence and achieve sustainable growth through strategy, creativity, and transparency."
    ctaPrimary="Book a Free Strategy Call"
    ctaSecondary="Contact Us"
    ctaPrimaryHref="#cta"
    ctaSecondaryHref="/contact"
  >
    <div className="grid gap-6 md:grid-cols-2">
      <SectionCard icon={Globe} title="Who We Are" text="At Duck Publicity, we believe great marketing is about understanding people, solving problems, and building long-term relationships. We combine strategy, creativity, and data-driven execution to help businesses grow with confidence." />
      <SectionCard icon={ShieldCheck} title="Our Mission" text="To become a trusted growth partner for businesses by delivering practical digital marketing solutions that create lasting value." />
    </div>
    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 md:p-10">
      <h2 className="text-2xl font-bold text-navy">Our Values</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {['Transparency', 'Continuous Improvement', 'Customer First', 'Long-Term Thinking', 'Honest Communication'].map((item) => (
          <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 shadow-sm">{item}</div>
        ))}
      </div>
    </div>
  </PageLayout>
);

export const ProcessPage = () => (
  <PageLayout
    eyebrow="Our Process"
    title="How We Turn Vision Into Growth"
    description="Every project follows a structured process designed to create long-term success, from discovery to scalable execution."
    ctaPrimary="Let's Discuss Your Goals"
    ctaSecondary="Explore Services"
    ctaPrimaryHref="/contact"
    ctaSecondaryHref="/#services"
  >
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[
        ['Discovery & Audit', 'Understanding your business, audience, and competitors so recommendations are grounded in real context.'],
        ['Strategy & Planning', 'Building a customized roadmap aligned with your goals, budget, and growth priorities.'],
        ['Content & Creative', 'Creating compelling content and brand assets that make your business easier to trust and remember.'],
        ['Execution & Optimization', 'Implementing campaigns and refining them continuously for performance and efficiency.'],
        ['Reporting & Insights', 'Providing clear updates, practical recommendations, and transparent performance reporting.'],
        ['Scale & Grow', 'Focusing on sustainable marketing systems that help your business grow steadily over time.'],
      ].map(([title, text]) => (
        <SectionCard key={title} icon={Target} title={title} text={text} />
      ))}
    </div>
  </PageLayout>
);

export const InsightsPage = () => (
  <PageLayout
    eyebrow="Insights"
    title="Marketing Insights & Growth Ideas"
    description="Practical strategies, trends, and ideas to help businesses grow online without hype or inflated promises."
    ctaPrimary="Explore Our Services"
    ctaSecondary="Contact Us"
    ctaPrimaryHref="/#services"
    ctaSecondaryHref="/contact"
  >
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[
        ['SEO Insights', 'Build stronger visibility with clear keyword strategy, content structure, and technical improvements that support long-term discovery.'],
        ['Social Media Tips', 'Create content that reflects your brand voice, supports trust, and encourages meaningful engagement.'],
        ['Website Growth Strategies', 'Improve user experience, clarity, and conversion paths so your website works harder for your business.'],
        ['Google Business Profile Optimization', 'Keep your profile accurate, consistent, and relevant to help local discovery and customer trust.'],
        ['Reputation Management', 'Encourage positive reviews and shape a stronger digital presence through thoughtful reputation practices.'],
        ['Paid Advertising Trends', 'Use performance-focused messaging, audience refinement, and clear creative direction to improve efficiency.'],
      ].map(([title, text]) => (
        <SectionCard key={title} icon={Sparkles} title={title} text={text} />
      ))}
    </div>
  </PageLayout>
);

export const ContactPage = () => {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.phone || !form.phone.trim()) {
      alert('Phone number is compulsory.');
      return;
    }
    setLoading(true);
    try {
      await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSuccess(true);
      setForm({ name: '', company: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      console.error('Contact submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout
      eyebrow="Contact"
      title="Let's Build Something Great Together"
      description="Whether you're starting fresh or looking to grow, we'd love to hear about your goals. Get in touch and we will map out the right next step."
      ctaPrimary="Book Free Strategy Call"
      ctaSecondary="WhatsApp Us"
      ctaPrimaryHref="#contact-form"
      ctaSecondaryHref="https://wa.me/917069940681"
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]" id="contact-form">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)]">
          <h2 className="text-2xl font-bold text-navy">Contact Information</h2>
          <div className="mt-6 space-y-4 text-slate-600">
            <p><strong>Phone:</strong> <a href="tel:+917069940681" className="text-teal hover:underline">+91 70699 40681</a></p>
            <p><strong>Email:</strong> <a href="mailto:hello@duckpublicity.com" className="text-teal hover:underline">hello@duckpublicity.com</a></p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/917069940681" target="_blank" rel="noreferrer" className="text-teal hover:underline">Start a conversation (+91 7069940681)</a></p>
            <p><strong>Location:</strong> Ahmedabad, Gujarat, India</p>
            <p><strong>Business Hours:</strong> Monday – Saturday, 10 AM – 7 PM</p>
          </div>
          <div className="mt-8 rounded-3xl bg-slate-50 p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-navy">What to expect</h3>
            <p className="mt-3 text-slate-600">We respond with clear next steps, practical suggestions, and a simple plan tailored to your goals.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)]">
          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm font-medium">
              Thank you! Your message has been submitted and saved into our system. Our team will contact you shortly.
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-600">
              <span className="mb-2 block font-medium text-slate-800">Name</span>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal focus:bg-white text-slate-900" placeholder="Your Name" />
            </label>

            <label className="block text-sm text-slate-600">
              <span className="mb-2 block font-medium text-slate-800">Business Name</span>
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal focus:bg-white text-slate-900" placeholder="Business Name" />
            </label>

            <label className="block text-sm text-slate-600">
              <span className="mb-2 block font-medium text-slate-800">Email</span>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal focus:bg-white text-slate-900" placeholder="email@example.com" />
            </label>

            <label className="block text-sm text-slate-600">
              <span className="mb-2 block font-medium text-slate-800">Phone Number *</span>
              <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal focus:bg-white text-slate-900" placeholder="+91 70699 40681" />
            </label>

            <label className="block text-sm text-slate-600 md:col-span-2">
              <span className="mb-2 block font-medium text-slate-800">Services Interested In</span>
              <input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal focus:bg-white text-slate-900" placeholder="SEO, Social Media, Website, Ads..." />
            </label>

            <label className="block text-sm text-slate-600 md:col-span-2">
              <span className="mb-2 block font-medium text-slate-800">Message</span>
              <textarea rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal focus:bg-white text-slate-900" placeholder="Tell us about your business, goals, and timeline." />
            </label>
          </div>

          <button type="submit" disabled={loading} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal to-cyan-400 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-teal/20 transition hover:-translate-y-0.5 disabled:opacity-50">
            {loading ? 'Submitting...' : 'Book Free Strategy Call'}
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </PageLayout>
  );
};

export const BlogPage = () => (
  <PageLayout
    eyebrow="Blog"
    title="Digital Marketing Insights"
    description="Learn practical strategies, trends, and ideas to grow your business online with clear, honest guidance."
    ctaPrimary="Explore Our Services"
    ctaSecondary="Contact Us"
    ctaPrimaryHref="/#services"
    ctaSecondaryHref="/contact"
  >
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {[
        ['SEO', 'Improve discoverability, on-page clarity, and authority with smart content and optimization.'],
        ['Google Business Profile', 'Keep your local presence polished, current, and ready to convert searches into enquiries.'],
        ['Social Media Marketing', 'Build trust and visibility with consistent, useful, and engaging brand content.'],
        ['Website Optimization', 'Create a smoother user journey that supports conversions and stronger brand trust.'],
        ['Online Reputation', 'Use reviews and communication to establish credibility and long-term confidence.'],
        ['Paid Advertising', 'Focus on useful messaging, clear targeting, and efficient budget use.'],
        ['Local Marketing', 'Reach the right audience with local-focused content and customer experience.'],
      ].map(([title, text]) => (
        <SectionCard key={title} icon={MessageCircle} title={title} text={text} />
      ))}
    </div>
  </PageLayout>
);

export const GuidesPage = () => (
  <PageLayout
    eyebrow="Guides"
    title="Free Guides & Resources"
    description="Helpful resources designed to simplify digital marketing and make growth planning easier to understand."
    ctaPrimary="Download Resources"
    ctaSecondary="Contact Us"
    ctaPrimaryHref="/contact"
    ctaSecondaryHref="/contact"
  >
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[
        ['SEO Basics for Local Businesses', 'A clear starting point for local visibility, site structure, and search-friendly content.'],
        ['Google Business Profile Optimization Guide', 'Practical tips to improve local relevance, trust, and customer action.'],
        ['Social Media Content Ideas', 'Simple ways to create content that supports engagement and a consistent brand voice.'],
        ['Website Conversion Checklist', 'A reliable checklist for messaging, calls to action, and user experience.'],
        ['Beginner\'s Guide to Online Advertising', 'Understand the essentials of campaign setup, targeting, and clear optimization.'],
        ['Building Trust Through Reviews', 'Learn how to encourage feedback and strengthen your reputation organically.'],
      ].map(([title, text]) => (
        <SectionCard key={title} icon={PenTool} title={title} text={text} />
      ))}
    </div>
  </PageLayout>
);

export const PricingPage = () => (
  <PageLayout
    eyebrow="Pricing"
    title="Flexible Solutions for Growing Businesses"
    description="Every business is unique. We provide customized solutions based on your goals, requirements, and growth stage."
    ctaPrimary="Request a Free Consultation"
    ctaSecondary="Contact Us"
    ctaPrimaryHref="/contact"
    ctaSecondaryHref="/contact"
  >
    <div className="grid gap-6 md:grid-cols-3">
      {[
        ['Starter Growth', 'Ideal for local businesses and startups that need a focused, practical foundation for their digital presence.'],
        ['Growth Partner', 'Designed for businesses ready to scale with a stronger strategy, creative direction, and ongoing support.'],
        ['Custom Solutions', 'Tailored strategies based on your specific goals, industry, audience, and business priorities.'],
      ].map(([title, text]) => (
        <SectionCard key={title} icon={TrendingUp} title={title} text={text} />
      ))}
    </div>
    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-slate-700 md:p-10">
      <h2 className="text-2xl font-bold text-navy">Need something specific?</h2>
      <p className="mt-3 max-w-2xl text-slate-600">Let&apos;s discuss a custom plan that fits your business, your timeline, and your growth goals.</p>
    </div>
  </PageLayout>
);

export const FAQPage = () => (
  <PageLayout
    eyebrow="FAQ"
    title="Frequently Asked Questions"
    description="Clear answers to common questions about how we work, what we offer, and how to get started."
    ctaPrimary="Contact Us"
    ctaSecondary="Book a Call"
    ctaPrimaryHref="/contact"
    ctaSecondaryHref="/contact"
  >
    <div className="grid gap-6 md:grid-cols-2">
      {[
        ['What services does Duck Publicity offer?', 'We support digital marketing strategy, content, SEO, social media, website improvements, and growth planning.'],
        ['Do you work with small businesses?', 'Yes — we work with local businesses, startups, clinics, and growing brands that need practical support.'],
        ['How do I get started?', 'Start with a quick consultation, then we evaluate your goals, current presence, and next best actions.'],
        ['Do you offer customized solutions?', 'Absolutely. We tailor recommendations to your business, resources, and growth priorities.'],
        ['How often will I receive updates?', 'We provide clear communication, regular progress updates, and reporting based on the engagement level you choose.'],
        ['Can you help improve my Google presence?', 'Yes. We can support Google Business Profile optimization, local visibility, and related digital marketing efforts.'],
        ['Do you provide website services?', 'We can support website improvements and marketing-focused enhancements that strengthen your online presence.'],
        ['How long does digital marketing take to show results?', 'Results depend on strategy, competition, implementation, and consistency. We focus on sustainable progress rather than quick hype.'],
      ].map(([question, answer]) => (
        <div key={question} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)]">
          <h3 className="text-xl font-semibold text-navy">{question}</h3>
          <p className="mt-3 text-slate-600 leading-7">{answer}</p>
        </div>
      ))}
    </div>
  </PageLayout>
);

export const DynamicLegalPage = ({ docType, eyebrow, title, description, fallbackContent }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [filename, setFilename] = useState('');
  const [lastModified, setLastModified] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(`/api/legal/${docType}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Failed to load document');
      })
      .then((data) => {
        if (isMounted && data.html) {
          setHtmlContent(data.html);
          setFilename(data.filename);
          if (data.lastModified) {
            const dateStr = new Date(data.lastModified).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            setLastModified(dateStr);
          }
        }
      })
      .catch((err) => {
        console.warn('Using fallback legal content for', docType, err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [docType]);

  return (
    <PageLayout
      eyebrow={eyebrow}
      title={title}
      description={description}
      ctaPrimary="Contact Us"
      ctaSecondary="Book Call"
      ctaPrimaryHref="/contact"
      ctaSecondaryHref="/contact"
    >
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)] text-slate-700 leading-relaxed md:p-10">
        {filename && (
          <div className="mb-6 pb-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center gap-1.5 bg-teal/10 text-teal px-3.5 py-1.5 rounded-full font-semibold">
              📄 Synced from Word Document: {filename}
            </span>
            {lastModified && <span>Last Saved: {lastModified}</span>}
          </div>
        )}

        {loading ? (
          <div className="py-12 text-center text-slate-400 font-medium animate-pulse">
            Loading document content from Word file...
          </div>
        ) : htmlContent ? (
          <div
            className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-navy prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:mb-4 prose-p:leading-relaxed prose-li:mb-2 prose-strong:text-slate-900"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : (
          <div className="space-y-6 text-slate-600 leading-7">{fallbackContent}</div>
        )}
      </div>
    </PageLayout>
  );
};

export const PrivacyPage = () => (
  <DynamicLegalPage
    docType="privacy-policy"
    eyebrow="Privacy Policy"
    title="Privacy Policy"
    description="This policy explains how Duck Publicity collects, uses, and protects information. Live-synced directly from our official Word document."
    fallbackContent={
      <>
        <p>Information Collection: We may collect your name, email, phone number, business details, and usage data when you contact us or interact with the website.</p>
        <p>How Data Is Used: We use this information to respond to enquiries, improve our services, and provide relevant marketing support.</p>
        <p>Cookies: We may use cookies and analytics tools to understand how visitors navigate the site and improve the user experience.</p>
        <p>Third-Party Services: We may use trusted third-party platforms for analytics, communications, or site performance.</p>
        <p>Data Security: We take reasonable steps to protect your personal information, though no online method is completely risk-free.</p>
        <p>User Rights: You may request access to, correction of, or deletion of your personal information where applicable.</p>
        <p>Contact Information: For privacy-related questions, please email hello@duckpublicity.com.</p>
      </>
    }
  />
);

export const TermsPage = () => (
  <DynamicLegalPage
    docType="terms-of-service"
    eyebrow="Terms of Service"
    title="Terms of Service"
    description="These terms outline how our services and website are used. Live-synced directly from our official Word document."
    fallbackContent={
      <>
        <p>Acceptance of Terms: By using this website or our services, you agree to these terms and conditions.</p>
        <p>Services Provided: We provide marketing strategy, digital marketing support, and related advisory services based on the scope agreed in each engagement.</p>
        <p>Payments: Any fees, timelines, and payment terms are discussed and agreed to before work begins.</p>
        <p>Client Responsibilities: Clients are responsible for timely approvals, clear business information, and access to necessary assets.</p>
        <p>Intellectual Property: Content and materials created for clients remain subject to agreed ownership and usage terms.</p>
        <p>Limitation of Liability: Duck Publicity is not liable for indirect, consequential, or special damages arising from the use of our services.</p>
        <p>Termination: Either party may terminate engagements in line with the written agreement or reasonable notice.</p>
        <p>Changes to Terms: We may update these terms from time to time, and the latest version will apply.</p>
      </>
    }
  />
);

export const CookiePage = () => (
  <DynamicLegalPage
    docType="cookie-policy"
    eyebrow="Cookie Policy"
    title="Cookie Policy"
    description="This page explains what cookies are, how we use them, and how you can manage cookie settings. Live-synced directly from our official Word document."
    fallbackContent={
      <>
        <p>What Cookies Are: Cookies are small files stored on your device to improve website functionality and collect analytics data.</p>
        <p>Types of Cookies Used: We may use essential cookies for basic site function, analytics cookies to understand usage, and preference cookies where relevant.</p>
        <p>Analytics Cookies: These help us understand traffic, user behavior, and performance to improve the site.</p>
        <p>How Users Can Manage Cookies: You can usually control or disable cookies through your browser settings.</p>
        <p>Third-Party Cookies: Some analytics or embedded tools may place cookies on your device, subject to their own terms.</p>
      </>
    }
  />
);

export const DisclaimerPage = () => (
  <DynamicLegalPage
    docType="disclaimer"
    eyebrow="Disclaimer"
    title="Disclaimer"
    description="The information on this website is provided for general informational purposes. Live-synced directly from our official Word document."
    fallbackContent={
      <>
        <p>Information provided on this website is for general informational purposes only.</p>
        <p>Results may vary depending on industry, competition, budget, implementation, and business context.</p>
        <p>Duck Publicity does not guarantee specific rankings, lead volume, revenue outcomes, or other business performance results.</p>
        <p>All content and recommendations are provided in good faith and should be reviewed within the context of your own business and strategy.</p>
      </>
    }
  />
);

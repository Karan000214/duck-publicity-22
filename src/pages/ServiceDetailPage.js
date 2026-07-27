import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, Target, Search, Smartphone, Palette, Globe, 
  CheckCircle2, ArrowRight, TrendingUp, ShieldCheck, 
  PhoneCall, MessageSquare, Sparkles, ArrowLeft, BarChart3, Layers
} from 'lucide-react';

export const serviceDetailsData = {
  'performance-marketing': {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    badge: 'ROI & Conversion Focused',
    tagline: 'Maximize ROI with Data-Driven Campaign Optimization',
    description: 'Our Performance Marketing service turns marketing budgets into scalable revenue engines. We execute high-precision paid media campaigns built around core unit economics, target CAC, and lifetime customer value.',
    color: 'from-orange to-red-500',
    iconName: 'Zap',
    results: '320% avg ROI',
    overview: 'Performance marketing eliminates guesswork. Every rupee spent is tracked against key conversion metrics, ensuring your advertising dollars directly drive profit and sustainable market expansion.',
    features: [
      'Multi-channel Paid Strategy (Meta, Google, LinkedIn)',
      'A/B Testing & Creative Iteration Frameworks',
      'Conversion Rate Optimization (CRO) Landing Pages',
      'Advanced Funnel Attribution & Pixel Tracking',
      'Target CAC & LTV Unit Economics Optimization',
      'Real-Time Dashboard & Weekly Performance Reports'
    ],
    process: [
      { step: '01', title: 'Audit & Benchmark', desc: 'We analyze your previous campaign data, competitor landscape, and conversion bottleneck points.' },
      { step: '02', title: 'Funnel Architecture', desc: 'Designing custom landing pages, tracking pixels, and high-intent audience targeting segments.' },
      { step: '03', title: 'Creative Execution', desc: 'Deploying high-converting ad formats, direct-response copy, and video assets.' },
      { step: '04', title: 'Scale & Optimize', desc: 'Continuously refining bids, ad spend allocation, and audience retargeting to maximize ROAS.' }
    ],
    caseStudy: {
      client: 'E-Commerce Retailer',
      result: '4.2x ROAS in 90 Days',
      detail: 'Scaled monthly ad spend from $5,000 to $35,000 while maintaining a healthy 420% return on ad spend.'
    }
  },
  'meta-ads': {
    slug: 'meta-ads',
    title: 'Meta Ads (Facebook & Instagram)',
    badge: 'Social Commerce & Direct Response',
    tagline: 'Engage & Convert Customers Where They Spend Their Time',
    description: 'Harness the full power of Meta’s AI bidding and hyper-targeted algorithms on Facebook & Instagram to capture customer attention and trigger instant buying decisions.',
    color: 'from-blue-600 to-blue-400',
    iconName: 'Target',
    results: '4.8% avg conversion rate',
    overview: 'With over 3 billion active users, Meta remains the unmatched king of discovery marketing. We build compelling visual ads and automated funnel retargeting sequences that turn scrollers into loyal customers.',
    features: [
      'Advantage+ Shopping & Catalog Ads Integration',
      'High-Converting Reel & Video Ad Creatives',
      'Lookalike & Custom Custom Audience Modeling',
      'Dynamic Retargeting Sequences for Abandoned Carts',
      'Creative Fatigue Management & Scaling Rotation',
      'Conversions API (CAPI) First-Party Data Setup'
    ],
    process: [
      { step: '01', title: 'Audience Profiling', desc: 'Mapping buyer personas, customer pain points, and behavioral triggers on IG & FB.' },
      { step: '02', title: 'Creative Production', desc: 'Designing UGC-style videos, static graphics, and hook-driven headlines.' },
      { step: '03', title: 'CAPI & Pixel Setup', desc: 'Ensuring 100% accurate tracking despite iOS privacy restrictions.' },
      { step: '04', title: 'Aggressive Scaling', desc: 'Scaling winning ad sets vertically and horizontally without burning ROI.' }
    ],
    caseStudy: {
      client: 'D2C Skincare Brand',
      result: '3,200+ Qualified Leads/Mo',
      detail: 'Reduced cost per acquisition by 45% using Advantage+ creative testing.'
    }
  },
  'google-ads': {
    slug: 'google-ads',
    title: 'Google Ads (Search & Shopping)',
    badge: 'High-Intent Customer Capture',
    tagline: 'Capture Ready-To-Buy Customers Exactly When They Search',
    description: 'Position your business right in front of prospective buyers the exact second they search for your products or services on Google Search, Shopping, and YouTube.',
    color: 'from-yellow-400 to-orange-400',
    iconName: 'Search',
    results: '8.5% avg CTR',
    overview: 'Search intent is the highest quality traffic in digital marketing. We build structured Google Search, Performance Max (PMax), and Shopping campaigns that dominate prime search real estate.',
    features: [
      'High-Intent Keyword Architecture & Negative List Management',
      'Performance Max (PMax) Campaign Optimization',
      'Google Shopping & Merchant Center Feed Setup',
      'Quality Score & Ad Copy Relevance Optimization',
      'Local Service Ads & Google Maps Search Ads',
      'Call Tracking & Conversion Attribution'
    ],
    process: [
      { step: '01', title: 'Keyword Mining', desc: 'Identifying transactional keywords with high commercial intent and optimal CPC.' },
      { step: '02', title: 'Ad Copywriting', desc: 'Crafting dynamic search ads with extensions, sitelinks, and structured snippets.' },
      { step: '03', title: 'Bidding Strategy', desc: 'Implementing Smart Bidding (Target CPA / Target ROAS) for maximum efficiency.' },
      { step: '04', title: 'Negative Keyword Filtering', desc: 'Eliminating wasted spend by continuously filtering non-converting search terms.' }
    ],
    caseStudy: {
      client: 'B2B SaaS Provider',
      result: '180% Demo Request Boost',
      detail: 'Achieved 8.5% CTR and cut Cost Per Demo by 38% in the first 60 days.'
    }
  },
  'social-media-marketing': {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    badge: 'Organic & Brand Growth',
    tagline: 'Build an Engine of Organic Audience Engagement & Loyalty',
    description: 'Transform your brand presence with thumb-stopping social media content, viral Reels strategy, active community management, and brand storytelling.',
    color: 'from-pink-500 to-rose-500',
    iconName: 'Smartphone',
    results: '250% engagement growth',
    overview: 'Modern consumers check social channels before making purchasing decisions. We build organic social channels that foster deep customer trust, community engagement, and brand authority.',
    features: [
      'Short-Form Video (Reels/Shorts) Strategy & Scripts',
      'Content Calendar Creation & Brand Voice Development',
      'Graphics & Carousel Post Design',
      'Active Community Management & DM Engagement',
      'Influencer Collaboration & UGC Sourcing',
      'Monthly Analytics & Audience Insights'
    ],
    process: [
      { step: '01', title: 'Brand Identity Strategy', desc: 'Defining your visual aesthetics, tone of voice, and content pillars.' },
      { step: '02', title: 'Content Production', desc: 'Creating high-quality carousels, videos, and captions tailored for engagement.' },
      { step: '03', title: 'Distribution & Posting', desc: 'Optimizing posting schedules across Instagram, LinkedIn, and Facebook.' },
      { step: '04', title: 'Community Nurturing', desc: 'Responding to comments and DMs to build active brand advocates.' }
    ],
    caseStudy: {
      client: 'Lifestyle Apparel Brand',
      result: '50K+ New Organic Followers',
      detail: 'Drove 250% increase in social media engagement and viral Reel reach within 4 months.'
    }
  },
  'seo-optimization': {
    slug: 'seo-optimization',
    title: 'SEO Optimization',
    badge: 'Sustainable Organic Traffic',
    tagline: 'Dominate Google Search Rankings & Drive Evergreen Organic Traffic',
    description: 'Dominate search rankings with comprehensive Technical SEO, on-page optimization, content strategy, and high-authority backlink acquisition.',
    color: 'from-green-500 to-emerald-500',
    iconName: 'Search',
    results: '180% organic traffic',
    overview: 'Organic search traffic provides the highest long-term ROI. We optimize your website code, site speed, content structure, and domain authority so you rank #1 for high-value search terms.',
    features: [
      'Technical SEO Audits & Core Web Vitals Optimization',
      'On-Page Optimization (Title Tags, Schema, Content)',
      'High-Intent Keyword & Topic Cluster Strategy',
      'White-Hat High Authority Backlink Building',
      'Local SEO & Google Business Profile Optimization',
      'Content Marketing & Blog Writing Packages'
    ],
    process: [
      { step: '01', title: 'Technical Audit', desc: 'Fixing site speed issues, indexing errors, crawl issues, and mobile responsiveness.' },
      { step: '02', title: 'Keyword Mapping', desc: 'Mapping high-traffic commercial keywords to existing and new pages.' },
      { step: '03', title: 'Content Optimization', desc: 'Publishing optimized articles and refining metadata using semantic SEO.' },
      { step: '04', title: 'Authority Building', desc: 'Earning authoritative niche contextual backlinks to boost domain rank.' }
    ],
    caseStudy: {
      client: 'Financial Services Firm',
      result: '#1 Rank for 25+ Keywords',
      detail: 'Grew organic search traffic by 180% and reduced monthly Google Ad dependency.'
    }
  },
  'branding-creative': {
    slug: 'branding-creative',
    title: 'Branding & Creative Design',
    badge: 'Visual Identity & Impact',
    tagline: 'Stand Out with Premium Brand Design that Commands Attention',
    description: 'Craft a memorable brand identity, logo, style guide, and visual marketing collateral that positions your business as an industry leader.',
    color: 'from-purple-600 to-indigo-600',
    iconName: 'Palette',
    results: '95% brand recall',
    overview: 'First impressions matter. We blend strategic positioning with world-class graphic design to create visual brand assets that inspire trust and drive conversion.',
    features: [
      'Complete Brand Identity & Logo Design Systems',
      'Brand Style Guides (Typography, Palette, Voice)',
      'Ad Creative Kits (Banners, Social Assets, Templates)',
      'Packaging & Print Material Design',
      'Pitch Decks & Presentation Templates',
      'Brand Messaging & Positioning Frameworks'
    ],
    process: [
      { step: '01', title: 'Discovery & Moodboards', desc: 'Uncovering brand values, market differentiation, and visual directions.' },
      { step: '02', title: 'Logo & Identity Concepting', desc: 'Designing iconic logos and visual elements with multiple concepts.' },
      { step: '03', title: 'Brand Guidelines', desc: 'Building comprehensive design systems for consistent multi-platform use.' },
      { step: '04', title: 'Asset Rollout', desc: 'Delivering export-ready design files for web, ad, and print execution.' }
    ],
    caseStudy: {
      client: 'Boutique Real Estate Agency',
      result: 'Rebrand Launch Success',
      detail: 'Transformed brand perception, leading to a 40% increase in premium client inquiries.'
    }
  },
  'website-development': {
    slug: 'website-development',
    title: 'Website Development',
    badge: 'High-Converting Web Experiences',
    tagline: 'Fast, Responsive & High-Converting Websites Built to Scale',
    description: 'We design and build ultra-fast, mobile-optimized, conversion-focused websites and landing pages engineered to convert visitors into paying clients.',
    color: 'from-teal-500 to-cyan-500',
    iconName: 'Globe',
    results: '6.2% avg conversion rate',
    overview: 'Your website is the heart of your digital presence. We craft bespoke web experiences with modern UX/UI, glassmorphism design elements, instant load speeds, and seamless CRM integrations.',
    features: [
      'Custom React, Next.js, and Modern Web Development',
      'Mobile-First Responsive Layouts & Touch Controls',
      'Conversion Rate Optimized (CRO) Page Structures',
      'Seamless Form & CRM Backend Integration',
      'Ultra-Fast Loading Speeds & Core Web Vitals 95+ Scores',
      'SSL Security, Analytics & Heatmap Setup'
    ],
    process: [
      { step: '01', title: 'Wireframing & UX', desc: 'Mapping user journeys and wireframing conversion-focused layouts.' },
      { step: '02', title: 'UI Design Mockups', desc: 'Crafting stunning visual mockups with interactive states and typography.' },
      { step: '03', title: 'Custom Frontend Build', desc: 'Developing clean, SEO-friendly code optimized for all device sizes.' },
      { step: '04', title: 'Testing & Launch', desc: 'Rigorous cross-browser testing, speed optimization, and live deployment.' }
    ],
    caseStudy: {
      client: 'Healthcare Services Provider',
      result: '210% More Online Bookings',
      detail: 'Redesigned core web portal resulting in sub-1 second load speed and 6.2% conversion rate.'
    }
  },
  'lead-generation': {
    slug: 'lead-generation',
    title: 'Lead Generation Campaigns',
    badge: 'Qualified Sales Pipeline',
    tagline: 'Fill Your Sales Pipeline with High-Intent Business Leads',
    description: 'End-to-end B2B and B2C lead generation campaigns that identify, engage, and capture high-intent prospects for your sales team.',
    color: 'from-orange to-yellow-500',
    iconName: 'Target',
    results: '$8 cost per lead',
    overview: 'Consistent lead flow is the lifeblood of business growth. We build automated lead engines using landing pages, lead magnet funnels, and targeted ads that deliver verified contact data directly to your inbox.',
    features: [
      'High-Converting Lead Magnet & Offer Creation',
      'Custom Lead Capture Landing Page Design',
      'Instant WhatsApp & Email Notification Integration',
      'Lead Qualification & Spam Filter Validation',
      'Multi-Channel Paid Lead Gen (Meta, Google, LinkedIn)',
      'Automated Lead Nurture Email Sequences'
    ],
    process: [
      { step: '01', title: 'Offer Strategy', desc: 'Creating irresistible lead magnets or consultation offers.' },
      { step: '02', title: 'Funnel Build', desc: 'Constructing high-converting lead forms and landing pages.' },
      { step: '03', title: 'Campaign Launch', desc: 'Targeting ideal client demographics across search and social channels.' },
      { step: '04', title: 'Lead Delivery', desc: 'Streaming leads directly into your database and sales CRM in real time.' }
    ],
    caseStudy: {
      client: 'B2B Logistics Company',
      result: '450+ Verified B2B Inquiries/Mo',
      detail: 'Built an automated pipeline cutting cost per lead by 52%.'
    }
  }
};

const iconMap = {
  Zap, Target, Search, Smartphone, Palette, Globe, Layers, BarChart3
};

export const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();

  const service = serviceDetailsData[serviceSlug] || serviceDetailsData['performance-marketing'];
  const IconComponent = iconMap[service.iconName] || Zap;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone || !formData.phone.trim()) {
      alert('Phone number is compulsory.');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...formData,
        service: service.title,
        status: 'new',
        budget: 'Custom Service Request'
      };
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const whatsappText = `Hi Duck Publicity,\n\nI am interested in your *${service.title}* service.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company || 'N/A'}\nMessage: ${formData.message}`;
      window.open(`https://wa.me/917069940681?text=${encodeURIComponent(whatsappText)}`, '_blank');

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal transition-colors"
          >
            <ArrowLeft size={16} /> Back to All Services
          </button>
        </div>

        <motion.div 
          className="rounded-3xl bg-navy text-white p-8 md:p-14 relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${service.color} opacity-20 blur-3xl pointer-events-none rounded-full`} />
          
          <div className="relative z-10 grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-teal text-sm font-semibold mb-6 backdrop-blur-sm border border-teal/20">
                <Sparkles size={16} />
                <span>{service.badge}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-teal font-medium mb-6">
                {service.tagline}
              </p>
              <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
                {service.description}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-xl mb-4`}>
                <IconComponent size={48} />
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Benchmark Results</p>
                <p className="text-2xl font-bold text-teal">{service.results}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Details & Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid gap-12 lg:grid-cols-12">
        {/* Left Column: Detailed Features & Process */}
        <div className="lg:col-span-7 space-y-12">
          {/* Service Overview */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-3">
              <TrendingUp className="text-teal" size={24} /> Service Overview
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {service.overview}
            </p>
          </div>

          {/* Key Features & Deliverables */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
              <ShieldCheck className="text-teal" size={24} /> What’s Included in {service.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <CheckCircle2 size={20} className="text-teal mt-0.5 shrink-0" />
                  <span className="text-sm font-medium text-slate-800 leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Process */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
              <Layers className="text-teal" size={24} /> Our Execution Process
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {service.process.map((step, idx) => (
                <div key={idx} className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-3xl font-extrabold text-teal/30 block mb-2">{step.step}</span>
                  <h3 className="text-lg font-bold text-navy mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Proven Case Study */}
          {service.caseStudy && (
            <div className="bg-gradient-to-br from-navy to-slate-900 text-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-teal">Proven Track Record</span>
              <h3 className="text-xl font-bold text-white mt-1 mb-3">{service.caseStudy.client}</h3>
              <p className="text-3xl font-extrabold text-teal mb-2">{service.caseStudy.result}</p>
              <p className="text-slate-300 text-sm leading-relaxed">{service.caseStudy.detail}</p>
            </div>
          )}
        </div>

        {/* Right Column: Lead Form & Contact */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
            <h3 className="text-2xl font-bold text-navy mb-2">Request {service.title} Proposal</h3>
            <p className="text-slate-600 text-sm mb-6">
              Get a customized audit, strategy plan, and quote tailored for your business.
            </p>

            {submitted && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-sm font-medium">
                ✅ Request submitted successfully! Our team will get back to you within 2 business hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Your Full Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Business Email *</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Phone / WhatsApp Number *</label>
                <input 
                  type="tel" 
                  required 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 70699 40681"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Company / Brand Name</label>
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Duck Publicity"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Project Details / Goals</label>
                <textarea 
                  rows="3" 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your current marketing challenges and goals..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal focus:bg-white transition"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-teal to-cyan-500 text-slate-950 font-bold text-base shadow-lg shadow-teal/20 hover:-translate-y-0.5 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : `Get Strategy & Quote for ${service.title}`}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-3 text-sm text-slate-600">
              <a href="tel:+917069940681" className="flex items-center gap-3 hover:text-teal transition-colors">
                <PhoneCall size={18} className="text-teal" />
                <span>Call Us: +91 70699 40681</span>
              </a>
              <a href="https://wa.me/917069940681" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-teal transition-colors">
                <MessageSquare size={18} className="text-green-500" />
                <span>Chat on WhatsApp (+91 7069940681)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const ServicesIndexPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-teal font-semibold text-sm uppercase tracking-wider mb-2">Our Growth Solutions</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy mb-4">
            Services Designed to Scale Your Business
          </h1>
          <p className="text-slate-600 text-lg">
            Click on any service below to explore detailed features, workflows, and performance metrics tailored to your industry.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Object.values(serviceDetailsData).map((service) => {
            const IconComponent = iconMap[service.iconName] || Zap;
            return (
              <motion.div
                key={service.slug}
                onClick={() => navigate(`/services/${service.slug}`)}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                whileHover={{ y: -6 }}
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent size={28} />
                  </div>
                  <span className="inline-block px-3 py-1 bg-teal/10 text-teal font-semibold text-xs rounded-full mb-3">
                    {service.badge}
                  </span>
                  <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-teal transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div>
                  <div className="mb-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>Performance Benchmark:</span>
                    <span className="text-teal font-bold">{service.results}</span>
                  </div>
                  <Link 
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-teal font-bold text-sm group-hover:translate-x-1 transition-transform"
                  >
                    View Full Details <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

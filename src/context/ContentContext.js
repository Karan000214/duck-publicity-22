import React, { createContext, useContext, useState, useEffect } from 'react';
import { initCookieTracker } from '../utils/cookieTracker';

const ContentContext = createContext();

const defaultContent = {
  hero: {
    tagline: 'Your Vision - Our Strategy - Real Growth',
    mainHeadline: 'We Turn Marketing Into Measurable Growth',
    subheadline: "Duck Publicity helps brands scale using performance-driven digital marketing strategies. We don't do vanity metrics – we deliver real ROI.",
    metrics: [
      { id: 1, label: 'ROAS', value: '120%', prefix: '+' },
      { id: 2, label: 'Leads Generated', value: '200+', prefix: '' },
      { id: 3, label: 'Revenue Growth', value: '60%', prefix: '+' },
      { id: 4, label: 'Conversion Rate', value: '12%', prefix: '' },
    ],
  },
  services: [
    {
      id: 1,
      title: 'Performance Marketing',
      description: 'Data-driven campaigns that focus on measurable results and ROI optimization.',
      results: '320% avg ROI',
      iconName: 'Zap',
      color: 'from-orange to-red-500',
    },
    {
      id: 2,
      title: 'Meta Ads',
      description: 'Strategic Facebook & Instagram campaigns designed for conversion and scale.',
      results: '4.8% avg conversion',
      iconName: 'Target',
      color: 'from-blue-600 to-blue-400',
    },
    {
      id: 3,
      title: 'Google Ads',
      description: 'High-intent keyword targeting to capture customers ready to buy.',
      results: '8.5% avg CTR',
      iconName: 'Search',
      color: 'from-yellow-400 to-orange-400',
    },
    {
      id: 4,
      title: 'Social Media Marketing',
      description: 'Content strategy, community management, and organic growth campaigns.',
      results: '250% engagement growth',
      iconName: 'Smartphone',
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 5,
      title: 'SEO Optimization',
      description: 'Technical and content SEO to dominate search results and drive organic traffic.',
      results: '180% organic traffic',
      iconName: 'Search',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 6,
      title: 'Branding & Creative',
      description: 'Premium brand strategy and creative design that converts and resonates.',
      results: '95% brand recall',
      iconName: 'Palette',
      color: 'from-purple-600 to-indigo-600',
    },
    {
      id: 7,
      title: 'Website Development',
      description: 'High-converting, responsive websites built for performance and user experience.',
      results: '6.2% avg conversion',
      iconName: 'Globe',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      id: 8,
      title: 'Lead Generation',
      description: 'Strategic campaigns designed to generate high-quality leads for your business.',
      results: '$8 cost per lead',
      iconName: 'Target',
      color: 'from-orange to-yellow-500',
    },
  ],
  testimonials: [
    {
      id: 1,
      title: 'Clear Communication',
      description: 'Regular updates, transparent reporting, and honest conversations without confusing marketing jargon.',
      iconName: 'MessageCircle',
    },
    {
      id: 2,
      title: 'Long-Term Partnership',
      description: 'We treat your business like our own and focus on sustainable growth instead of short-term wins.',
      iconName: 'ShieldCheck',
    },
    {
      id: 3,
      title: 'Fast Execution',
      description: 'Quick responses, proactive improvements, and a team that keeps moving your projects forward.',
      iconName: 'Zap',
    },
    {
      id: 4,
      title: 'Strategy Before Spending',
      description: 'We prioritize research and planning to ensure every effort has a purpose.',
      iconName: 'Target',
    },
    {
      id: 5,
      title: 'Data-Driven Decisions',
      description: 'Every optimization is guided by performance data and real insights.',
      iconName: 'BarChart3',
    },
    {
      id: 6,
      title: 'Growth Partner Mindset',
      description: 'Our success is tied to your success. We aim to become an extension of your team.',
      iconName: 'HeartHandshake',
    },
  ],
  contact: {
    email: 'hello@duckpublicity.com',
    phone: '+1 (555) 019-2834',
    address: '100 Growth Boulevard, Suite 400, San Francisco, CA',
  },
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  // Fetch site content from backend API
  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        if (data && Object.keys(data).length > 0) {
          setContent((prev) => ({ ...prev, ...data }));
        }
      }
    } catch (err) {
      console.warn('Could not fetch remote content, using local fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  // Track page view & cookie analytics
  const trackPageView = async () => {
    try {
      const cookieData = initCookieTracker();
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: window.location.pathname,
          referrer: document.referrer || '',
          visitorId: cookieData.visitorId,
          visitCount: cookieData.visitCount,
          isReturning: cookieData.isReturning,
          utmSource: cookieData.utmSource,
          utmMedium: cookieData.utmMedium,
          utmCampaign: cookieData.utmCampaign,
        }),
      });
    } catch (err) {
      // Ignore background analytics tracking errors
    }
  };

  useEffect(() => {
    fetchContent();
    trackPageView();
  }, []);

  // Update content handler for admin dashboard
  const updateContent = async (newContent) => {
    const token = localStorage.getItem('duck_admin_token');
    if (!token) throw new Error('Not authenticated');

    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newContent),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update content');
    }

    setContent(newContent);
    return true;
  };

  return (
    <ContentContext.Provider value={{ content, setContent, updateContent, loading, refreshContent: fetchContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);

import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Trust from './components/Trust';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopOnRoute from './components/ScrollToTopOnRoute';
import { ContentProvider } from './context/ContentContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { ServiceDetailPage, ServicesIndexPage } from './pages/ServiceDetailPage';
import {
  AboutPage,
  BlogPage,
  ContactPage,
  CookiePage,
  DisclaimerPage,
  FAQPage,
  GuidesPage,
  InsightsPage,
  PrivacyPage,
  PricingPage,
  ProcessPage,
  TermsPage,
} from './pages/FooterPages';

function HomePage() {
  return (
    <>
      <Hero />
      <Trust />
      <Services />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}

function MainLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTopOnRoute />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesIndexPage />} />
        <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms-of-service" element={<TermsPage />} />
        <Route path="/cookie-policy" element={<CookiePage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
      {!isAdminRoute && <ScrollToTop />}
    </div>
  );
}

function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </ContentProvider>
  );
}

export default App;

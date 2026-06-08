import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import CookieConsent from '@/components/CookieConsent';
import AccessibilityWidget from '@/components/AccessibilityWidget';

const Layout = () => {
  const location = useLocation();
  const showBreadcrumbs = location.pathname !== '/';

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent-status');
    if (consent === 'accepted') {
      const track = () => {
        if (window.gtag) {
          window.gtag('event', 'page_view', {
            page_path: location.pathname,
            page_title: document.title
          });
        }
      };
      
      // Delay tracking slightly to let document.title be updated by react-helmet-async
      const timer = setTimeout(track, 150);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 font-sans flex flex-col">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-lg z-50 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        Skip to main content
      </a>
      <Header />
      <div className="flex-grow w-full">
        <main id="main-content" className="container mx-auto px-4 pt-2 md:pt-4 pb-8 max-w-7xl focus:outline-none" tabIndex="-1">
            {showBreadcrumbs && <Breadcrumbs />}
            <Outlet />
        </main>
      </div>
      <Footer />
      <CookieConsent />
      <AccessibilityWidget />
    </div>
  );
};

export default Layout;
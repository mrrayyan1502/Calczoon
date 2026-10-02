'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import CookieConsent from '@/components/CookieConsent';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import ShareButtons from '@/components/ShareButtons';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const showBreadcrumbs = pathname !== '/';

  useEffect(() => {
    const consent = typeof window !== 'undefined' ? localStorage.getItem('cookie-consent-status') : null;
    if (consent === 'accepted') {
      const track = () => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'page_view', {
            page_path: pathname,
            page_title: document.title,
          });
        }
      };
      const timer = setTimeout(track, 150);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

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
        <main id="main-content" className="container mx-auto px-4 pt-2 md:pt-4 pb-8 max-w-7xl focus:outline-none" tabIndex={-1}>
          {showBreadcrumbs && <Breadcrumbs />}
          <React.Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div></div>}>
            {children}
          </React.Suspense>
          {showBreadcrumbs && (
            <div className="mt-12">
              <ShareButtons />
            </div>
          )}
        </main>
      </div>
      <Footer />
      <CookieConsent />
      <AccessibilityWidget />
      <Toaster />
    </div>
  );
}

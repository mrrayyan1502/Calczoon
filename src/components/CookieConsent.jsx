import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent-status');
    if (!consent) {
      // Show banner after a short delay for smooth UX
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else if (consent === 'accepted') {
      initializeAnalytics();
    }
  }, []);

  const initializeAnalytics = () => {
    // Check if script is already injected
    if (document.getElementById('google-analytics-script')) return;

    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-Q04GC32XEX';
    script.id = 'google-analytics-script';
    document.head.appendChild(script);

    // Initialize gtag configuration
    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Q04GC32XEX', {
        page_path: window.location.pathname,
        cookie_flags: 'SameSite=None;Secure'
      });
    `;
    inlineScript.id = 'google-analytics-config';
    document.head.appendChild(inlineScript);
    console.log('Google Analytics initialized via Cookie Consent.');
  };

  const handleAccept = () => {
    localStorage.setItem('cookie-consent-status', 'accepted');
    initializeAnalytics();
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent-status', 'rejected');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 p-6 rounded-2xl backdrop-blur-xl bg-slate-900/90 border border-slate-700/60 shadow-[0_10px_50px_rgba(0,0,0,0.5)] flex flex-col gap-4 text-slate-200"
          role="dialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
        >
          <div className="flex items-start gap-4">
            <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-400 border border-emerald-500/20 shrink-0">
              <Cookie className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 id="cookie-title" className="text-lg font-bold text-white flex items-center gap-2">
                We value your privacy
              </h4>
              <p id="cookie-desc" className="text-sm text-slate-400 leading-relaxed">
                We use cookies to analyze website traffic and optimize your user experience. By clicking "Accept All", you agree to our use of cookies.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 justify-end items-center mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReject}
              className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full font-medium"
              aria-label="Reject all cookies"
            >
              Reject All
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 rounded-full shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
              aria-label="Accept all cookies"
            >
              Accept All
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;

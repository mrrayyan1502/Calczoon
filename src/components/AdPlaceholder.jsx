import React, { useEffect, useRef } from 'react';

/**
 * AdPlaceholder - Renders Google AdSense display ads on calculator pages.
 * 
 * HOW TO ACTIVATE ADSENSE:
 * 1. Go to https://adsense.google.com and create an account
 * 2. Add calczoon.com as a site
 * 3. Get your publisher ID (ca-pub-XXXXXXXXXXXXXX)
 * 4. Replace 'ca-pub-xxxxxxxxxxxxxxxx' in:
 *    - index.html (google-adsense-account meta tag)
 *    - The ad slot code below
 * 5. Once approved, ads will start showing automatically
 */
const AdPlaceholder = ({ slot = '1234567890', format = 'auto', className = '' }) => {
  const adRef = useRef(null);
  const isAdSenseActive = false; // Set to true once AdSense is approved

  useEffect(() => {
    // When AdSense is approved, uncomment this:
    // if (isAdSenseActive && adRef.current && window.adsbygoogle) {
    //   try {
    //     (window.adsbygoogle = window.adsbygoogle || []).push({});
    //   } catch (e) {
    //     console.error('AdSense error:', e);
    //   }
    // }
  }, []);

  // Until AdSense is approved, show a subtle placeholder
  // This space is reserved for ads - no visible content
  return null;
};

export default AdPlaceholder;

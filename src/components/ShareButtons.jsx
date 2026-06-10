import React, { useState } from 'react';
import { Facebook, Twitter, Link as LinkIcon, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ShareButtons = ({ title }) => {
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const url = `https://calczoon.com${location.pathname}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || "Check out this useful calculator from CalcZoon!");

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
        Share this Calculator
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        <a 
          href={shareLinks.whatsapp} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors text-sm font-medium shadow-sm hover:shadow-md"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
        
        <a 
          href={shareLinks.facebook} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors text-sm font-medium shadow-sm hover:shadow-md"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </a>
        
        <a 
          href={shareLinks.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-full transition-colors text-sm font-medium shadow-sm hover:shadow-md"
        >
          <Twitter className="w-4 h-4" />
          X (Twitter)
        </a>
        
        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full transition-colors text-sm font-medium shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700"
        >
          <LinkIcon className="w-4 h-4" />
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;

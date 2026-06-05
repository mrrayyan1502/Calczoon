import React from 'react';
import Seo from '@/components/Seo';
import Faq from '@/components/Faq';

const AgeBlog = () => {
    const pageTitle = "Age Calculator Guide: More Than Just Years";
    const pageDescription = "Discover your exact age in years, months, days, and even seconds with our Age Calculator. This fun guide shows you different ways to think about your age.";
    const canonicalUrl = "/blog/age-calculator-guide";

    const faqItems = [
        // FAQ content here
    ];

    return (
        <>
            <Seo title={pageTitle} description={pageDescription} canonicalUrl={canonicalUrl} faqSchema={faqItems} />
            <div className="w-full max-w-4xl mx-auto py-12 px-4 text-slate-300">
                {/* Blog content here */}
                <h1 className="text-4xl font-bold text-white mb-4">{pageTitle}</h1>
                <p>Content for the Age Calculator blog post will go here...</p>
                 <a href="/lifestyle/age-calculator" className="text-primary hover:underline">Use the Age Calculator</a>
            </div>
        </>
    );
};

export default AgeBlog;
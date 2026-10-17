'use client';

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart as Lungs } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import PlaceholderCalculator from '@/components/calculators/PlaceholderCalculator';
import TDEE_Content from '@/components/calculators/tdee/TDEE_Content';
import TDEE_FAQ from '@/components/calculators/tdee/TDEE_FAQ';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdPlaceholder from '@/components/AdPlaceholder';


const VO2MaxCalculator = () => {
  const pageTitle = "VO2 Max Calculator - Estimate Your Aerobic Fitness";
  const pageDescription = "Use our free VO2 Max Calculator to estimate your maximal oxygen uptake, a key indicator of cardiovascular fitness and aerobic endurance. Supports various testing methods.";
  const canonicalUrl = "https://calczoon.com/health/vo2-max-calculator";

  const faqItems = [
    {
      question: "What is VO2 Max?",
      answer: "VO2 Max, or maximal oxygen uptake, is the maximum rate of oxygen your body can consume during intense exercise. It's a key indicator of cardiovascular fitness and aerobic endurance. It's measured in milliliters of oxygen used per kilogram of body weight per minute (mL/kg/min)."
    },
    {
      question: "Why is a good VO2 Max important?",
      answer: "A higher VO2 max indicates a more efficient cardiovascular system. It's associated with better athletic performance in endurance sports and is a strong predictor of long-term health and longevity."
    },
    {
      question: "How can I improve my VO2 Max?",
      answer: "High-Intensity Interval Training (HIIT) is one of the most effective methods. It involves short bursts of all-out effort followed by brief recovery periods. Consistent endurance training like running, swimming, or cycling also significantly improves VO2 max over time."
    },
    {
      question: "What's a good VO2 Max score?",
      answer: "It varies greatly depending on age, sex, and fitness level. For men aged 20-29, 'Excellent' is typically above 52.5 mL/kg/min. For women in the same age group, it's above 41 mL/kg/min. Our calculator provides a detailed breakdown based on your demographics."
    },
    {
      question: "What is the Cooper 12-Minute Run Test formula for VO2 Max?",
      answer: "The Cooper test formula estimates VO2 Max from the total distance run in 12 minutes: VO2 Max (mL/kg/min) = (Distance in meters – 504.9) ÷ 44.73. It was created by Dr. Kenneth Cooper for the U.S. Air Force and has high correlation to laboratory gas analysis."
    },
    {
      question: "How does VO2 Max correlate with all-cause mortality and longevity?",
      answer: "Groundbreaking research published in JAMA Network Open demonstrates that high and elite cardiorespiratory fitness (top 20% VO2 Max for age) is associated with an 80% reduction in mortality risk compared to low fitness, outperforming the negative risk factors of smoking, diabetes, and hypertension."
    }
  ];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="vo2 max calculator, cardiovascular fitness, aerobic capacity, endurance test, cooper test, rockport walk test, fitness calculator" />
        <link rel="canonical" href={canonicalUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Helmet>
      
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title="VO2 Max Calculator" description={pageDescription} icon={Lungs} />

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                  <CardTitle className="text-white">Estimate Your VO2 Max</CardTitle>
              </CardHeader>
              <CardContent>
                <PlaceholderCalculator toolName="VO2 Max Calculator" />
              </CardContent>
            </Card>
            <div className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 flex items-start gap-3 text-left">
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-emerald-400 block mb-1">Recommended Cardiovascular Resource: Zone 2 &amp; HIIT Polarization</strong>
                Cardiologists and exercise physiologists recommend accumulating 80% of weekly training volume in low-intensity Zone 2 (conversational pace) and 20% in high-intensity Zone 5 intervals to maximize mitochondrial biogenesis and VO2 Max gains.
              </div>
            </div>
          </div>
          <aside className="lg:col-span-1 space-y-6">
              <AdPlaceholder className="h-60" />
              <RelatedTools />
          </aside>
        </div>

        {/* Static HTML Reference Benchmark Table */}
        <div className="my-10 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-6 md:p-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">VO2 Max Normative Benchmark Table by Age &amp; Sex (mL/kg/min)</h2>
          <p className="text-sm text-slate-400">
            The cardiovascular fitness benchmark table below outlines standardized American College of Sports Medicine (ACSM) aerobic capacity classifications across age demographics for healthy men and women.
          </p>
          <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm border-collapse bg-slate-950">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                  <th className="p-3 font-semibold">Age Group</th>
                  <th className="p-3 font-semibold text-rose-400">Men: Poor</th>
                  <th className="p-3 font-semibold text-amber-400">Men: Fair</th>
                  <th className="p-3 font-semibold text-emerald-400">Men: Good / Excellent</th>
                  <th className="p-3 font-semibold text-sky-400">Women: Fair</th>
                  <th className="p-3 font-semibold text-emerald-400">Women: Good / Excellent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">20–29 Years</td><td className="p-3 text-rose-400 font-mono">&lt; 38.0</td><td className="p-3 text-amber-400 font-mono">38.0 – 43.9</td><td className="p-3 text-emerald-400 font-bold">&gt; 52.5</td><td className="p-3 text-sky-400 font-mono">31.0 – 36.9</td><td className="p-3 text-emerald-400 font-bold">&gt; 41.0</td></tr>
                <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">30–39 Years</td><td className="p-3 text-rose-400 font-mono">&lt; 36.5</td><td className="p-3 text-amber-400 font-mono">36.5 – 41.9</td><td className="p-3 text-emerald-400 font-bold">&gt; 49.0</td><td className="p-3 text-sky-400 font-mono">29.0 – 34.9</td><td className="p-3 text-emerald-400 font-bold">&gt; 38.5</td></tr>
                <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">40–49 Years</td><td className="p-3 text-rose-400 font-mono">&lt; 34.5</td><td className="p-3 text-amber-400 font-mono">34.5 – 39.9</td><td className="p-3 text-emerald-400 font-bold">&gt; 46.5</td><td className="p-3 text-sky-400 font-mono">27.0 – 32.9</td><td className="p-3 text-emerald-400 font-bold">&gt; 36.0</td></tr>
                <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">50–59 Years</td><td className="p-3 text-rose-400 font-mono">&lt; 32.0</td><td className="p-3 text-amber-400 font-mono">32.0 – 36.9</td><td className="p-3 text-emerald-400 font-bold">&gt; 43.0</td><td className="p-3 text-sky-400 font-mono">24.5 – 30.0</td><td className="p-3 text-emerald-400 font-bold">&gt; 33.5</td></tr>
                <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">60–69 Years</td><td className="p-3 text-rose-400 font-mono">&lt; 29.5</td><td className="p-3 text-amber-400 font-mono">29.5 – 34.0</td><td className="p-3 text-emerald-400 font-bold">&gt; 39.5</td><td className="p-3 text-sky-400 font-mono">22.0 – 27.5</td><td className="p-3 text-emerald-400 font-bold">&gt; 30.5</td></tr>
                <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">70–79 Years</td><td className="p-3 text-rose-400 font-mono">&lt; 26.0</td><td className="p-3 text-amber-400 font-mono">26.0 – 30.5</td><td className="p-3 text-emerald-400 font-bold">&gt; 35.5</td><td className="p-3 text-sky-400 font-mono">20.0 – 24.5</td><td className="p-3 text-emerald-400 font-bold">&gt; 27.5</td></tr>
                <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">Sub-Elite Runner</td><td className="p-3 text-sky-400 font-mono">60.0 – 68.0</td><td className="p-3 text-sky-400 font-mono">62.0 – 70.0</td><td className="p-3 text-emerald-400 font-bold">&gt; 72.0</td><td className="p-3 text-sky-400 font-mono">52.0 – 58.0</td><td className="p-3 text-emerald-400 font-bold">&gt; 62.0</td></tr>
                <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">Olympic Marathoner</td><td className="p-3 text-emerald-400 font-mono">75.0 – 82.0</td><td className="p-3 text-emerald-400 font-mono">78.0 – 85.0</td><td className="p-3 text-emerald-400 font-bold">&gt; 85.0</td><td className="p-3 text-emerald-400 font-mono">68.0 – 74.0</td><td className="p-3 text-emerald-400 font-bold">&gt; 76.0</td></tr>
                <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">Tour de France Cyclist</td><td className="p-3 text-emerald-400 font-mono">80.0 – 88.0</td><td className="p-3 text-emerald-400 font-mono">82.0 – 90.0</td><td className="p-3 text-emerald-400 font-bold">&gt; 90.0</td><td className="p-3 text-emerald-400 font-mono">70.0 – 78.0</td><td className="p-3 text-emerald-400 font-bold">&gt; 80.0</td></tr>
                <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">Cross-Country Skier (Record)</td><td className="p-3 text-purple-400 font-mono">85.0 – 94.0</td><td className="p-3 text-purple-400 font-mono">88.0 – 96.0</td><td className="p-3 text-purple-400 font-bold">&gt; 96.0</td><td className="p-3 text-purple-400 font-mono">75.0 – 82.0</td><td className="p-3 text-purple-400 font-bold">&gt; 85.0</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <TDEE_Content />
        <TDEE_FAQ items={faqItems} />
      </div>
    </>
  );
};

export default VO2MaxCalculator;

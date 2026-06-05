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
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title="VO2 Max Calculator" description={pageDescription} icon={Lungs} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                  <CardTitle className="text-white">Estimate Your VO2 Max</CardTitle>
              </CardHeader>
              <CardContent>
                <PlaceholderCalculator toolName="VO2 Max Calculator" />
              </CardContent>
            </Card>
          </div>
          <aside className="lg:col-span-1 space-y-6">
              <AdPlaceholder className="h-60" />
              <RelatedTools />
          </aside>
        </div>
        
        <TDEE_Content />
        <TDEE_FAQ items={faqItems} />
      </div>
    </>
  );
};

export default VO2MaxCalculator;
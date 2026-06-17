import React, { useState } from 'react';
import Seo from '@/components/Seo';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { Dumbbell } from 'lucide-react';
import TDEE_Intro from '@/components/calculators/tdee/TDEE_Intro';
import TDEE_CalculatorForm from '@/components/calculators/tdee/TDEE_CalculatorForm';
import TDEE_Results from '@/components/calculators/tdee/TDEE_Results';
import TDEE_Content from '@/components/calculators/tdee/TDEE_Content';
import TDEE_FAQ from '@/components/calculators/tdee/TDEE_FAQ';
import Disclaimer from '@/components/Disclaimer';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { saveCalculation } from '@/lib/history';

const TDEECalculator = () => {
    const [result, setResult] = useState(null);

    const handleCalculation = (data) => {
        setResult(data);
        if (data) {
          saveCalculation({ type: 'TDEE', inputs: data.inputs, result: { TDEE: data.tdee.maintenance.toFixed(0) } });
        }
    };
    
    const pageTitle = "Free TDEE Calculator: Estimate Daily Calorie Burn 2026";
    const pageDescription = "Calculate your Total Daily Energy Expenditure (TDEE) online for free. Get an instant, accurate estimate of your daily calorie needs for weight goals.";
    const canonicalUrl = "/health/tdee-calculator";

    const faqItems = [
      {
        question: "What's the difference between Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas?",
        answer: "Mifflin-St Jeor is the most modern and widely recommended formula for the general population. Katch-McArdle is highly accurate for leaner individuals who know their body fat percentage. The Harris-Benedict formula is older and generally less accurate."
      },
      {
        question: "How accurate is this online TDEE calculator?",
        answer: "This calculator provides a highly educated estimate based on proven formulas. However, your true metabolism can vary. Use this result as a reliable starting point and adjust based on your real-world weight change over 2-4 weeks."
      },
      {
        question: "Which activity level should I choose?",
        answer: "Be honest and conservative. Most people overestimate their activity level. If you work a desk job and exercise 3-4 times a week, 'Lightly Active' is a good start. When in doubt, choose the lower option."
      },
      {
        question: "How much of a calorie deficit should I create for weight loss?",
        answer: "A sustainable and effective calorie deficit for weight loss is typically 300-500 calories below your TDEE (maintenance calories). This promotes fat loss while preserving muscle mass and energy levels."
      },
      {
        question: "Why isn't my weight changing even though I'm eating at my TDEE?",
        answer: "First, check your tracking accuracy—food scales are crucial. Your actual NEAT (Non-Exercise Activity Thermogenesis) might be lower than estimated, or your body could be adapting by subconsciously moving less to conserve energy. Consistency over weeks is key."
      },
      {
        question: "Should I eat back the calories I burn from exercise?",
        answer: "Generally, no. The activity multipliers in the TDEE formula already account for exercise. Fitness trackers are known to overestimate calories burned, so eating them back can erase your intended calorie deficit."
      },
      {
        question: "How often should I recalculate my TDEE?",
        answer: "Recalculate your TDEE after every 5-10 lbs (about 2-5 kg) of weight loss, as a lighter body burns fewer calories. You should also recalculate if your daily activity level changes significantly for an extended period."
      },
      {
        question: "Can I use the TDEE calculator for a lean bulk?",
        answer: "Absolutely. For a controlled lean bulk aimed at minimizing fat gain, add a modest surplus of 200-300 calories to your TDEE (maintenance) result. Combine this with progressive resistance training for optimal muscle growth."
      }
    ];
    
    const webAppSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "TDEE Calculator",
      "description": "Calculate your Total Daily Energy Expenditure (TDEE) to determine your daily maintenance calorie needs. Essential for weight loss, gain, or maintenance.",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Any",
      "url": `https://calczoon.com${canonicalUrl}`,
      "browserRequirements": "Requires a modern web browser.",
      "offers": {
        "@type": "Offer",
        "price": "0"
      }
    };

    return (
        <>
            <Seo
                title={pageTitle}
                description={pageDescription}
                canonicalUrl={canonicalUrl}
                schema={[webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }]}
            />
            <div className="w-full max-w-7xl mx-auto py-8 px-4">
                <PageHeader
                    title="TDEE Calculator"
                    description="Calculate your Total Daily Energy Expenditure (TDEE) to discover your daily maintenance calories, crucial for managing your weight effectively."
                    icon={Dumbbell}
                />
                
                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2 space-y-8">
                        <TDEE_Intro />
                        <TDEE_CalculatorForm onCalculate={handleCalculation} />
                        {result && <TDEE_Results result={result} />}
                    </div>
                    <aside className="lg:col-span-1 space-y-6">
                        <RelatedTools />
                        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
                          <h4 className="font-bold text-white mb-2 text-sm">Need a complete guide?</h4>
                          <p className="text-xs text-slate-300 mb-4">Learn step-by-step how to manage calorie burn, calorie deficit, and nutrition profiles.</p>
                          <Link to="/blog/tdee-calculator-guide" className="text-emerald-400 hover:text-emerald-300 hover:underline text-xs font-bold transition-colors block">
                            Read Our TDEE Weight Loss Guide &rarr;
                          </Link>
                        </div>
                    </aside>
                </div>
                
                <TDEE_Content />
                <TDEE_FAQ items={faqItems} />
                <Disclaimer text="This calculator provides an estimate and should not replace professional medical advice. Results can vary based on individual metabolic rates and other factors." />
            </div>
        </>
    );
};

        <AffiliateLinks category="tdee" title="Recommended Fitness & Nutrition Tools" />

export default TDEECalculator;
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BrainCircuit } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BodyFatCalculatorForm from '@/components/calculators/bodyfat/BodyFatCalculatorForm';
import BodyFatResults from '@/components/calculators/bodyfat/BodyFatResults';
import BodyFatContent from '@/components/calculators/bodyfat/BodyFatContent';
import TDEE_FAQ from '@/components/calculators/tdee/TDEE_FAQ';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { saveCalculation } from '@/lib/history';

const BodyFatCalculator = () => {
    const [result, setResult] = useState(null);

    const handleCalculation = (data) => {
        if (data) {
            setResult(data);
            saveCalculation({ 
                type: 'Body Fat', 
                inputs: data.inputs, 
                result: { 
                    'Body Fat %': data.bodyFatPercentage.toFixed(1),
                    'Category': data.category
                } 
            });
        } else {
            setResult(null);
        }
    };

    const pageTitle = "Body Fat Calculator: Estimate Your Body Fat Percentage";
    const pageDescription = "Estimate your body fat percentage using the U.S. Navy formula. A useful tool for tracking fitness progress beyond just body weight.";
    const canonicalUrl = "https://calczoon.com/health/body-fat-calculator";

    const faqItems = [
        { 
            question: "Why is body fat percentage a better metric than BMI?", 
            answer: "Body fat percentage distinguishes between fat mass and lean mass (muscle, bone, water), offering a more accurate view of your body composition and health risk. BMI can misclassify muscular individuals as overweight." 
        },
        { 
            question: "How accurate is the U.S. Navy method?", 
            answer: "The U.S. Navy method is a reliable estimation tool for tracking changes over time. While not as precise as clinical methods like a DEXA scan, it provides a consistent and accessible way to monitor your progress." 
        },
        { 
            question: "How often should I measure my body fat?", 
            answer: "For consistent tracking, measure your body fat every 2-4 weeks. Take measurements at the same time of day, under similar conditions (e.g., before breakfast), to ensure the most accurate trend data." 
        },
        {
            question: "What's the difference between essential fat and storage fat?",
            answer: "Essential fat is necessary for your body to function correctly and is found in organs, bones, and muscles. Storage fat is excess energy stored in adipose tissue. This calculator measures both combined."
        }
    ];

    const pageSchema = {
        "@context": "https://schema.org", "@type": "WebApplication", "name": pageTitle, "description": pageDescription, "url": canonicalUrl,
        "applicationCategory": "HealthApplication", "operatingSystem": "Any", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    };
    const faqSchema = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } }))
    };

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content="body fat calculator, body fat percentage, navy method body fat, fitness calculator, lean mass, fat mass" />
                <link rel="canonical" href={canonicalUrl} />
                <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
            </Helmet>
            
            <div className="w-full max-w-7xl mx-auto py-8 px-4">
                <PageHeader title="Body Fat Calculator" description={pageDescription} icon={BrainCircuit} />
                
                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2 space-y-8">
                        <BodyFatCalculatorForm onCalculate={handleCalculation} />
                        {result && <BodyFatResults result={result} />}
                    </div>
                     <aside className="lg:col-span-1 space-y-6">
                        <RelatedTools />
                    </aside>
                </div>
                
                <BodyFatContent />
                <TDEE_FAQ items={faqItems} />
            </div>
        </>
    );
};

export default BodyFatCalculator;
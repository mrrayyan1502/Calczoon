'use client';

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BrainCircuit } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BodyFatCalculatorForm from '@/components/calculators/bodyfat/BodyFatCalculatorForm';
import BodyFatResults from '@/components/calculators/bodyfat/BodyFatResults';
import BodyFatContent from '@/components/calculators/bodyfat/BodyFatContent';
import Faq from '@/components/Faq';
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
            question: "Why is body fat percentage a far superior health metric than BMI?", 
            answer: "Body fat percentage distinguishes between fat mass and lean muscle mass, offering an accurate assessment of true metabolic health. Standard BMI formulas consider only height and weight, frequently misclassifying muscular athletes as 'overweight' while failing to diagnose sarcopenic 'skinny-fat' individuals who possess high visceral fat despite a low scale weight." 
        },
        { 
            question: "How accurate is the U.S. Navy Circumference method compared to DEXA?", 
            answer: "In clinical validations by the Naval Health Research Center, the U.S. Navy method demonstrates an average error rate of only 3% to 4% compared to clinical dual-energy X-ray absorptiometry (DEXA) scans. When neck, waist, and hip circumferences are measured consistently with proper tape tension, it serves as an exceptionally reliable tracking tool." 
        },
        { 
            question: "What are the biological risks of dropping below essential body fat levels?", 
            answer: "Dropping below essential fat levels (under 5% for men, under 12% for women) triggers severe endocrine collapse. For women, it can cause athletic amenorrhea (cessation of menstrual cycles) and premature bone demineralization (osteopenia). For men, it causes drastic testosterone depletion, chronic fatigue, immune suppression, and thyroid hormone reduction." 
        },
        { 
            question: "What is the difference between visceral fat and subcutaneous fat?", 
            answer: "Subcutaneous fat resides directly beneath the skin and serves primarily as insulation and energy storage. Visceral fat wraps around internal abdominal organs (liver, kidneys, intestines). High visceral fat is biologically active, releasing inflammatory cytokines that elevate the risk of arterial disease, non-alcoholic fatty liver, and type 2 diabetes." 
        },
        { 
            question: "What is a realistic and healthy rate of body fat reduction per month?", 
            answer: "A safe, sustainable rate of body fat loss is approximately 0.5% to 1.0% of body fat per month (equivalent to 1 to 2 lbs of pure adipose tissue per week for an average adult). Attempting to drop fat faster through extreme caloric deficits inevitably leads to muscle catabolism and metabolic slowdown." 
        },
        { 
            question: "When and how frequently should I measure body circumferences?", 
            answer: "Measure once every 2 to 4 weeks, consistently first thing in the morning in a fasted state before consuming breakfast or liquids. Daily measurements are discouraged because sodium intake, water retention, and digestion cause temporary perimeter fluctuations." 
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
                <div className="mt-8">
                    <Faq items={faqItems} />
                </div>
            </div>
        </>
    );
};

export default BodyFatCalculator;

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveCalculation } from '@/lib/history';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { Scale, HeartPulse, Sparkles, Activity, ShieldAlert } from 'lucide-react';

const IdealWeightCalculator = () => {
  const [gender, setGender] = useState('male');
  const [unitSystem, setUnitSystem] = useState('metric');
  const [heightCm, setHeightCm] = useState('175');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');
  const [result, setResult] = useState(null);

  const calculateIdealWeight = (e) => {
    if (e) e.preventDefault();
    
    let heightInInches = 0;
    let heightInMeters = 0;

    if (unitSystem === 'metric') {
      const cm = parseFloat(heightCm);
      if (isNaN(cm) || cm <= 0) {
        setResult({ error: "Please enter a valid height in centimeters." });
        return;
      }
      heightInInches = cm / 2.54;
      heightInMeters = cm / 100;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      if ((ft === 0 && inch === 0) || ft < 0 || inch < 0) {
        setResult({ error: "Please enter a valid height in feet and inches." });
        return;
      }
      heightInInches = (ft * 12) + inch;
      heightInMeters = (heightInInches * 2.54) / 100;
    }

    if (heightInInches < 60) {
      setResult({ error: "Standard clinical IBW equations (Devine, Robinson, Miller, Hamwi) are calibrated for individuals 5 feet (60 inches / 152.4 cm) and taller." });
      return;
    }

    const heightOver60 = heightInInches - 60;
    
    // 1. Devine Formula (1974)
    const devineBase = gender === 'male' ? 50.0 : 45.5;
    const devineWeight = devineBase + (2.3 * heightOver60);

    // 2. Robinson Formula (1983)
    const robinsonBase = gender === 'male' ? 52.0 : 49.0;
    const robinsonMult = gender === 'male' ? 1.9 : 1.7;
    const robinsonWeight = robinsonBase + (robinsonMult * heightOver60);

    // 3. Miller Formula (1983)
    const millerBase = gender === 'male' ? 56.2 : 53.1;
    const millerMult = gender === 'male' ? 1.41 : 1.36;
    const millerWeight = millerBase + (millerMult * heightOver60);

    // 4. Hamwi Formula (1964)
    const hamwiBase = gender === 'male' ? 48.0 : 45.5;
    const hamwiMult = gender === 'male' ? 2.7 : 2.2;
    const hamwiWeight = hamwiBase + (hamwiMult * heightOver60);

    // 5. Healthy WHO BMI Range (18.5 - 24.9 kg/m²)
    const bmiMinKg = 18.5 * (heightInMeters * heightInMeters);
    const bmiMaxKg = 24.9 * (heightInMeters * heightInMeters);

    // Calculate Average Clinical IBW
    const avgKg = (devineWeight + robinsonWeight + millerWeight + hamwiWeight) / 4;
    const minKg = Math.min(devineWeight, robinsonWeight, millerWeight, hamwiWeight);
    const maxKg = Math.max(devineWeight, robinsonWeight, millerWeight, hamwiWeight);

    // Convert to Lbs
    const kgToLbs = (kg) => kg * 2.20462;

    const newResult = {
      avgKg: avgKg.toFixed(1),
      avgLbs: kgToLbs(avgKg).toFixed(1),
      rangeKg: `${minKg.toFixed(1)} - ${maxKg.toFixed(1)}`,
      rangeLbs: `${kgToLbs(minKg).toFixed(1)} - ${kgToLbs(maxKg).toFixed(1)}`,
      bmiRangeKg: `${bmiMinKg.toFixed(1)} - ${bmiMaxKg.toFixed(1)}`,
      bmiRangeLbs: `${kgToLbs(bmiMinKg).toFixed(1)} - ${kgToLbs(bmiMaxKg).toFixed(1)}`,
      formulas: {
        devine: devineWeight.toFixed(1),
        robinson: robinsonWeight.toFixed(1),
        miller: millerWeight.toFixed(1),
        hamwi: hamwiWeight.toFixed(1)
      }
    };
    
    setResult(newResult);
    saveCalculation({
      type: 'Ideal Weight',
      inputs: { gender, height: unitSystem === 'metric' ? `${heightCm} cm` : `${heightFt}'${heightIn}"` },
      result: { Ideal: `${newResult.avgKg} kg (${newResult.avgLbs} lbs)` }
    });
  };

  const faqItems = [
    {
      question: "What is Ideal Body Weight (IBW) and how is it used in medicine?",
      answer: "Ideal Body Weight (IBW) is a standardized clinical estimate of a healthy weight for a person of a given height and biological sex. In medical pharmacology, physicians use IBW to calculate narrow-therapeutic-index drug dosages (such as aminoglycoside antibiotics, theophylline, and anesthetics) and mechanical ventilator tidal volumes, preventing toxic overdoses in patients with excess adipose tissue."
    },
    {
      question: "Which formula is considered the medical gold standard for IBW?",
      answer: "The Devine Formula (1974) is the most widely cited and utilized formula in clinical medicine and critical care pharmacy. The Robinson and Miller formulas (1983) were introduced as empirical modifications, while the Hamwi method (1964) remains widely utilized by clinical dietitians and diabetic educators."
    },
    {
      question: "Why do these formulas require a minimum height of 5 feet (60 inches)?",
      answer: "Historical clinical formulas were derived assuming a base physiological weight at 5 feet (60 inches / 152.4 cm) and adding incremental weight for each inch above 60. Subtracting weight for heights below 5 feet creates significant mathematical distortion, where the World Health Organization (WHO) BMI range serves as a far superior benchmark."
    },
    {
      question: "What is the difference between Ideal Body Weight and healthy BMI range?",
      answer: "IBW formulas yield a specific target weight based on historical regression models. In contrast, the World Health Organization Body Mass Index (BMI) provides a flexible healthy weight band (BMI 18.5 to 24.9 kg/m²) that accommodates individual variations in muscularity, bone density, and age."
    },
    {
      question: "How does frame size affect ideal weight calculation?",
      answer: "Frame size (small, medium, or large bone structure) typically adjusts ideal weight by plus or minus 10%. Clinical dietitians assess frame size by measuring wrist circumference or elbow breadth to refine individual weight targets."
    },
    {
      question: "Does Ideal Body Weight apply to competitive athletes and bodybuilders?",
      answer: "No. Standard IBW equations cannot differentiate between skeletal muscle mass and adipose fat tissue. Muscular athletes often weigh significantly more than their statistical IBW while maintaining healthy low body fat percentages and exceptional cardiovascular biomarkers."
    },
    {
      question: "Why is biological sex an essential input in IBW calculations?",
      answer: "Biological males possess higher average bone mineral density, broader skeletal shoulder architecture, and greater natural lean muscle mass compared to biological females of identical height, necessitating distinct clinical baseline constants."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Ideal Weight Calculator",
    "description": "Calculate ideal body weight using Devine, Robinson, Miller, and Hamwi clinical equations alongside healthy WHO BMI ranges.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/health/ideal-weight-calculator",
    "browserRequirements": "Requires JavaScript."
  };

  const faqPageSchema = {
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
      <Seo
        title="Ideal Weight Calculator: Devine, Robinson & Hamwi Clinical Formulas"
        description="Free Ideal Weight Calculator. Calculate your clinical Ideal Body Weight (IBW) using Devine, Robinson, Miller, and Hamwi equations plus WHO BMI healthy weight range."
        canonicalUrl="/health/ideal-weight-calculator"
        schema={[webAppSchema, faqPageSchema]}
        keywords={['ideal weight calculator', 'ibw calculator', 'devine formula', 'robinson formula', 'hamwi formula', 'ideal body weight']}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Ideal Body Weight (IBW) Calculator"
          description="Evaluate your clinical target weight using the four major medical formulas (Devine, Robinson, Miller, and Hamwi) alongside the World Health Organization BMI healthy weight spectrum."
          icon={Scale}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-xl">Anthropometric Inputs</CardTitle>
                <CardDescription className="text-slate-400">Select your biological sex, measurement unit, and height</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={calculateIdealWeight} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-300 font-medium">Biological Sex</Label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          onClick={() => setGender('male')}
                          className={`flex-1 ${gender === 'male' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-950 border border-slate-700 text-slate-300 hover:text-white'}`}
                        >
                          Male
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setGender('female')}
                          className={`flex-1 ${gender === 'female' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-950 border border-slate-700 text-slate-300 hover:text-white'}`}
                        >
                          Female
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-300 font-medium">Measurement Standard</Label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          onClick={() => setUnitSystem('metric')}
                          className={`flex-1 ${unitSystem === 'metric' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-950 border border-slate-700 text-slate-300 hover:text-white'}`}
                        >
                          Metric (cm)
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setUnitSystem('imperial')}
                          className={`flex-1 ${unitSystem === 'imperial' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-950 border border-slate-700 text-slate-300 hover:text-white'}`}
                        >
                          Imperial (ft/in)
                        </Button>
                      </div>
                    </div>
                  </div>

                  {unitSystem === 'metric' ? (
                    <div className="space-y-2">
                      <Label htmlFor="heightCm" className="text-slate-300 font-medium">Stature / Height (cm)</Label>
                      <Input
                        id="heightCm"
                        type="number"
                        value={heightCm}
                        onChange={(e) => setHeightCm(e.target.value)}
                        placeholder="175"
                        required
                        className="bg-slate-950 border-slate-700 text-white text-lg"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="heightFt" className="text-slate-300 font-medium">Height (Feet)</Label>
                        <Input
                          id="heightFt"
                          type="number"
                          value={heightFt}
                          onChange={(e) => setHeightFt(e.target.value)}
                          placeholder="5"
                          required
                          className="bg-slate-950 border-slate-700 text-white text-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heightIn" className="text-slate-300 font-medium">Height (Inches)</Label>
                        <Input
                          id="heightIn"
                          type="number"
                          value={heightIn}
                          onChange={(e) => setHeightIn(e.target.value)}
                          placeholder="9"
                          required
                          className="bg-slate-950 border-slate-700 text-white text-lg"
                        />
                      </div>
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 text-base">
                    Calculate Clinical Ideal Weight
                  </Button>
                </form>
              </CardContent>

              {result && !result.error && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-950/80 border-t border-slate-800 rounded-b-xl">
                  <div className="w-full space-y-5">
                    <div className="text-center py-5 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-slate-400 text-sm font-medium">Consensus Clinical Ideal Weight</p>
                      <p className="text-4xl md:text-5xl font-extrabold text-emerald-400 my-1">
                        {result.avgKg} kg <span className="text-2xl text-slate-400 font-normal">/ {result.avgLbs} lbs</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Formula Range: <span className="text-white font-medium">{result.rangeKg} kg</span> ({result.rangeLbs} lbs)
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-400">Devine (1974)</p>
                        <p className="text-lg font-bold text-white">{result.formulas.devine} kg</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-400">Robinson (1983)</p>
                        <p className="text-lg font-bold text-white">{result.formulas.robinson} kg</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-400">Miller (1983)</p>
                        <p className="text-lg font-bold text-white">{result.formulas.miller} kg</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-400">Hamwi (1964)</p>
                        <p className="text-lg font-bold text-white">{result.formulas.hamwi} kg</p>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
                      <p className="text-xs text-slate-400">WHO Healthy BMI Target Range (18.5 – 24.9 kg/m²)</p>
                      <p className="text-lg font-bold text-sky-400 mt-0.5">
                        {result.bmiRangeKg} kg <span className="text-sm font-normal text-slate-400">({result.bmiRangeLbs} lbs)</span>
                      </p>
                    </div>

                    {/* Monetization / Recommended Resource Callout Box */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <p className="font-semibold text-emerald-300">Recommended Clinical Body Composition Strategy</p>
                        <p className="text-slate-300 leading-relaxed">
                          Reaching your ideal body weight requires preserving functional lean skeletal muscle while targeting visceral fat loss. Pairing structured progressive resistance training with a high-protein nutrition plan (1.6 to 2.2g per kg of body weight) yields optimal metabolic health compared to restrictive crash dieting.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <ShareResults
                        title="Ideal Weight Calculation"
                        text={`My ideal weight is approximately ${result.avgKg} kg (${result.avgLbs} lbs) based on clinical formulas on Calczoon.`}
                        url="/health/ideal-weight-calculator"
                      />
                    </div>
                  </div>
                </CardFooter>
              )}

              {result && result.error && (
                <CardFooter className="p-6 bg-slate-950/80 border-t border-slate-800 text-center rounded-b-xl">
                  <p className="text-rose-400 font-semibold text-center w-full">{result.error}</p>
                </CardFooter>
              )}
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <RelatedTools category="health" />
          </aside>
        </div>

        {/* In-depth Educational & AEO Section */}
        <section className="mt-12 bg-slate-900/60 rounded-xl p-8 border border-slate-800 space-y-8 text-slate-300">
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Comprehensive Clinical Guide to Ideal Body Weight (IBW) Determination</h2>
            <p className="leading-relaxed text-slate-300">
              The concept of "Ideal Body Weight" originated not as an aesthetic fitness target, but as a critical mathematical benchmark for clinical pharmacology, critical care medicine, and epidemiological life insurance actuarial tables. In contemporary healthcare, medical professionals calculate IBW to accurately dose potent water-soluble medications, calibrate protective lung ventilation volumes in intensive care units, and establish healthy nutritional recovery ranges for clinical dietary therapy.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">The Four Classic Clinical IBW Equations</h3>
            <p className="mb-4 leading-relaxed">
              Medical literature utilizes four prominent equations, each calibrated to a baseline stature of 5 feet (60 inches / 152.4 cm) with incremental additions per inch of height above 5 feet:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">1. Devine Formula (1974)</p>
                <p className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">
                  Men: IBW (kg) = 50.0 + 2.3 × (Height in inches - 60)<br />
                  Women: IBW (kg) = 45.5 + 2.3 × (Height in inches - 60)
                </p>
                <p className="text-xs text-slate-400">
                  Developed by Dr. Ben J. Devine to estimate theophylline clearance, this is the gold standard benchmark cited by the American College of Clinical Pharmacy (ACCP).
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">2. Robinson Formula (1983)</p>
                <p className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">
                  Men: IBW (kg) = 52.0 + 1.9 × (Height in inches - 60)<br />
                  Women: IBW (kg) = 49.0 + 1.7 × (Height in inches - 60)
                </p>
                <p className="text-xs text-slate-400">
                  An empirical modification of Devine's equation based on the 1959 Metropolitan Life Insurance tables, providing slightly higher baseline weights for shorter stature.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">3. Miller Formula (1983)</p>
                <p className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">
                  Men: IBW (kg) = 56.2 + 1.41 × (Height in inches - 60)<br />
                  Women: IBW (kg) = 53.1 + 1.36 × (Height in inches - 60)
                </p>
                <p className="text-xs text-slate-400">
                  Calculated from modern actuarial mortality statistics, the Miller formula features a higher base weight at 5 feet but a flatter progression per additional inch.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">4. Hamwi Formula (1964)</p>
                <p className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">
                  Men: IBW (kg) = 48.0 + 2.7 × (Height in inches - 60)<br />
                  Women: IBW (kg) = 45.5 + 2.2 × (Height in inches - 60)
                </p>
                <p className="text-xs text-slate-400">
                  Formulated by Dr. George J. Hamwi as a simple bedside rule of thumb (106 lbs for men + 6 lbs/inch; 100 lbs for women + 5 lbs/inch), widely taught in dietetics.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Height-to-Ideal-Body-Weight (IBW) Clinical Reference Table</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The benchmark table below compares clinical IBW formulas against the World Health Organization (WHO) healthy adult BMI range (18.5 – 24.9 kg/m²) across standard heights:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-200">
                  <tr>
                    <th className="p-3">Height (ft / cm)</th>
                    <th className="p-3">Sex</th>
                    <th className="p-3">Devine IBW</th>
                    <th className="p-3">Robinson IBW</th>
                    <th className="p-3">Hamwi IBW</th>
                    <th className="p-3">Miller IBW</th>
                    <th className="p-3">WHO Healthy BMI (18.5 - 24.9)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">5'2" (157.5 cm)</td>
                    <td className="p-3">Female</td>
                    <td className="p-3 text-slate-200">50.1 kg (110.5 lb)</td>
                    <td className="p-3 text-slate-200">52.4 kg (115.5 lb)</td>
                    <td className="p-3 text-slate-200">49.9 kg (110.0 lb)</td>
                    <td className="p-3 text-slate-200">55.8 kg (123.0 lb)</td>
                    <td className="p-3 text-emerald-400 font-semibold">45.9 - 61.8 kg (101 - 136 lb)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">5'4" (162.6 cm)</td>
                    <td className="p-3">Female</td>
                    <td className="p-3 text-slate-200">54.7 kg (120.6 lb)</td>
                    <td className="p-3 text-slate-200">55.8 kg (123.0 lb)</td>
                    <td className="p-3 text-slate-200">54.3 kg (119.7 lb)</td>
                    <td className="p-3 text-slate-200">58.5 kg (129.0 lb)</td>
                    <td className="p-3 text-emerald-400 font-semibold">49.0 - 65.9 kg (108 - 145 lb)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">5'6" (167.6 cm)</td>
                    <td className="p-3">Female</td>
                    <td className="p-3 text-slate-200">59.3 kg (130.7 lb)</td>
                    <td className="p-3 text-slate-200">59.2 kg (130.5 lb)</td>
                    <td className="p-3 text-slate-200">58.7 kg (129.4 lb)</td>
                    <td className="p-3 text-slate-200">61.3 kg (135.1 lb)</td>
                    <td className="p-3 text-emerald-400 font-semibold">52.0 - 70.0 kg (115 - 154 lb)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">5'7" (170.2 cm)</td>
                    <td className="p-3">Male</td>
                    <td className="p-3 text-slate-200">66.1 kg (145.7 lb)</td>
                    <td className="p-3 text-slate-200">65.3 kg (144.0 lb)</td>
                    <td className="p-3 text-slate-200">66.9 kg (147.5 lb)</td>
                    <td className="p-3 text-slate-200">66.1 kg (145.7 lb)</td>
                    <td className="p-3 text-emerald-400 font-semibold">53.6 - 72.2 kg (118 - 159 lb)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">5'9" (175.3 cm)</td>
                    <td className="p-3">Male</td>
                    <td className="p-3 text-slate-200">70.7 kg (155.9 lb)</td>
                    <td className="p-3 text-slate-200">69.1 kg (152.3 lb)</td>
                    <td className="p-3 text-slate-200">72.3 kg (159.4 lb)</td>
                    <td className="p-3 text-slate-200">68.9 kg (151.9 lb)</td>
                    <td className="p-3 text-emerald-400 font-semibold">56.9 - 76.6 kg (125 - 169 lb)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">5'10" (177.8 cm)</td>
                    <td className="p-3">Male</td>
                    <td className="p-3 text-slate-200">73.0 kg (160.9 lb)</td>
                    <td className="p-3 text-slate-200">71.0 kg (156.5 lb)</td>
                    <td className="p-3 text-slate-200">75.0 kg (165.3 lb)</td>
                    <td className="p-3 text-slate-200">70.3 kg (155.0 lb)</td>
                    <td className="p-3 text-emerald-400 font-semibold">58.5 - 78.8 kg (129 - 174 lb)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">6'0" (182.9 cm)</td>
                    <td className="p-3">Male</td>
                    <td className="p-3 text-slate-200">77.6 kg (171.1 lb)</td>
                    <td className="p-3 text-slate-200">74.8 kg (164.9 lb)</td>
                    <td className="p-3 text-slate-200">80.4 kg (177.3 lb)</td>
                    <td className="p-3 text-slate-200">73.1 kg (161.2 lb)</td>
                    <td className="p-3 text-emerald-400 font-semibold">61.9 - 83.3 kg (136 - 184 lb)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">6'2" (188.0 cm)</td>
                    <td className="p-3">Male</td>
                    <td className="p-3 text-slate-200">82.2 kg (181.2 lb)</td>
                    <td className="p-3 text-slate-200">78.6 kg (173.3 lb)</td>
                    <td className="p-3 text-slate-200">85.8 kg (189.2 lb)</td>
                    <td className="p-3 text-slate-200">75.9 kg (167.3 lb)</td>
                    <td className="p-3 text-emerald-400 font-semibold">65.4 - 88.0 kg (144 - 194 lb)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">6'4" (193.0 cm)</td>
                    <td className="p-3">Male</td>
                    <td className="p-3 text-slate-200">86.8 kg (191.4 lb)</td>
                    <td className="p-3 text-slate-200">82.4 kg (181.7 lb)</td>
                    <td className="p-3 text-slate-200">91.2 kg (201.1 lb)</td>
                    <td className="p-3 text-slate-200">78.8 kg (173.7 lb)</td>
                    <td className="p-3 text-emerald-400 font-semibold">69.0 - 92.8 kg (152 - 205 lb)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Step-by-Step Numerical Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-emerald-400 text-base">Case Study 1: Adult Male (5'10" / 177.8 cm)</h4>
                <p><strong>Baseline Height:</strong> 70 inches total (10 inches over 60)</p>
                <p><strong>Devine Calculation:</strong> 50.0 + (2.3 × 10) = 73.0 kg (160.9 lbs)</p>
                <p><strong>Robinson Calculation:</strong> 52.0 + (1.9 × 10) = 71.0 kg (156.5 lbs)</p>
                <p><strong>Miller Calculation:</strong> 56.2 + (1.41 × 10) = 70.3 kg (155.0 lbs)</p>
                <p><strong>Hamwi Calculation:</strong> 48.0 + (2.7 × 10) = 75.0 kg (165.3 lbs)</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-emerald-300 font-semibold">Consensus Clinical IBW: 72.3 kg (159.4 lbs)</p>
                  <p className="text-sky-300 font-semibold">WHO Normal BMI Weight Range: 58.5 – 78.8 kg (129 – 174 lbs)</p>
                  <p className="text-slate-300 text-xs mt-1">Conclusion: Target weight falls precisely within the median of the healthy BMI spectrum.</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-sky-400 text-base">Case Study 2: Adult Female (5'4" / 162.6 cm)</h4>
                <p><strong>Baseline Height:</strong> 64 inches total (4 inches over 60)</p>
                <p><strong>Devine Calculation:</strong> 45.5 + (2.3 × 4) = 54.7 kg (120.6 lbs)</p>
                <p><strong>Robinson Calculation:</strong> 49.0 + (1.7 × 4) = 55.8 kg (123.0 lbs)</p>
                <p><strong>Miller Calculation:</strong> 53.1 + (1.36 × 4) = 58.5 kg (129.0 lbs)</p>
                <p><strong>Hamwi Calculation:</strong> 45.5 + (2.2 × 4) = 54.3 kg (119.7 lbs)</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-sky-300 font-semibold">Consensus Clinical IBW: 55.8 kg (123.1 lbs)</p>
                  <p className="text-emerald-300 font-semibold">WHO Normal BMI Weight Range: 49.0 – 65.9 kg (108 – 145 lbs)</p>
                  <p className="text-slate-300 text-xs mt-1">Conclusion: Healthy physiological baseline suitable for nutritional planning.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Frame Size & Skeletal Mass Adjustments</h3>
            <p className="leading-relaxed mb-4 text-sm">
              Clinical dietitians frequently adjust standard IBW results based on skeletal wrist circumference measurements:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">Small Skeletal Frame</p>
                <p className="text-xs text-slate-300">
                  Subtract 10% from the baseline consensus IBW. For a 70 kg baseline, target weight adjusts down to approximately 63 kg.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">Medium Skeletal Frame</p>
                <p className="text-xs text-slate-300">
                  Maintain 100% of the calculated baseline IBW. Represents the statistical median of the demographic population.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">Large Skeletal Frame</p>
                <p className="text-xs text-slate-300">
                  Add 10% to the baseline consensus IBW to accommodate broader bone structure, wider pelvic girdle, and greater skeletal mass.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">5 Critical Limitations of Statistical Ideal Weight Formulas</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed text-slate-300">
              <li>
                <strong>Blindness to Body Composition:</strong> IBW formulas evaluate gross total body mass without measuring body fat percentage, subcutaneous adipose tissue, or visceral fat deposits surrounding vital organs.
              </li>
              <li>
                <strong>Inapplicability to Athletic Populations:</strong> Resistance-trained individuals frequently register 10 to 20 kg over their clinical IBW while maintaining low, single-digit body fat and pristine metabolic health markers.
              </li>
              <li>
                <strong>Disregard for Age-Related Sarcopenia:</strong> Older adults naturally experience gradual age-related muscle loss. Maintaining a slightly higher body mass index in older age is correlated with lower all-cause mortality and fracture protection.
              </li>
              <li>
                <strong>Lack of Pediatric & Adolescent Scaling:</strong> Clinical formulas are strictly calibrated for adults whose epiphyseal growth plates have fully closed and cannot be applied to growing children or adolescents.
              </li>
              <li>
                <strong>Failure to Account for Ethnic Phenotypic Variations:</strong> Populations of Asian descent exhibit higher visceral adipose risk at lower BMI and body weight thresholds compared to individuals of Caucasian or African descent.
              </li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="Medical Disclaimer: This Ideal Body Weight calculator is provided strictly for educational and informational purposes. It does not constitute medical advice, diagnosis, or clinical pharmacotherapy dosing. Always consult a qualified physician or registered dietitian before embarking on significant weight loss or dietary interventions." />
      </div>
    </>
  );
};

export default IdealWeightCalculator;

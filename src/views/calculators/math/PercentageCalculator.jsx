'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Percent, BookOpen, CheckCircle, HelpCircle, ArrowRight, TrendingUp } from 'lucide-react';

const PercentageCalculator = () => {
  const [activeTab, setActiveTab] = useState("p_of_x");
  
  // State for "What is P% of X?"
  const [p1, setP1] = useState('');
  const [x1, setX1] = useState('');
  const [result1, setResult1] = useState('');

  // State for "X is what percent of Y?"
  const [x2, setX2] = useState('');
  const [y2, setY2] = useState('');
  const [result2, setResult2] = useState('');

  // State for "What is the percentage increase/decrease?"
  const [x3, setX3] = useState('');
  const [y3, setY3] = useState('');
  const [result3, setResult3] = useState('');

  const calculate1 = (e) => {
    e.preventDefault();
    const percent = parseFloat(p1);
    const value = parseFloat(x1);
    if (!isNaN(percent) && !isNaN(value)) {
      const res = (percent / 100) * value;
      setResult1(res.toFixed(2));
      saveCalculation({ type: 'Percentage', inputs: { p1, x1 }, result: { Result: res.toFixed(2) } });
    }
  };
  
  const calculate2 = (e) => {
    e.preventDefault();
    const valX = parseFloat(x2);
    const valY = parseFloat(y2);
    if (!isNaN(valX) && !isNaN(valY) && valY !== 0) {
      const res = (valX / valY) * 100;
      setResult2(res.toFixed(2));
      saveCalculation({ type: 'Percentage', inputs: { x2, y2 }, result: { Result: `${res.toFixed(2)}%` } });
    }
  };

  const calculate3 = (e) => {
    e.preventDefault();
    const valX = parseFloat(x3);
    const valY = parseFloat(y3);
    if (!isNaN(valX) && !isNaN(valY) && valX !== 0) {
      const res = ((valY - valX) / valX) * 100;
      setResult3(res.toFixed(2));
      saveCalculation({ type: 'Percentage Change', inputs: { x3, y3 }, result: { Result: `${res.toFixed(2)}%` } });
    }
  };

  const faqItems = [
    {
      question: "How do you calculate the percentage of a number manually?",
      answer: "To find P% of a number X, divide the percentage P by 100 to convert it into a decimal fraction, and then multiply by the total number X. Mathematically: Result = (P / 100) * X. For instance, to compute 15% of $80, compute (15 / 100) * 80 = 0.15 * 80 = $12.00."
    },
    {
      question: "How do I calculate a percentage increase or decrease between two values?",
      answer: "To calculate percentage change from initial value X to final value Y, subtract the starting value from the final value, divide by the original starting value, and multiply by 100: Percentage Change = ((Final - Initial) / Initial) * 100. A positive outcome represents percentage growth or markup, while a negative figure denotes a reduction or discount."
    },
    {
      question: "What is the critical difference between percentage change and percentage points?",
      answer: "A percentage point represents the simple arithmetic difference between two percentage figures, whereas percentage change measures relative proportional movement. For example, if an interest rate moves from 5% to 6%, it has increased by 1 percentage point, but represents a 20% relative increase ((6 - 5) / 5 * 100 = 20%). Conflating the two is a frequent financial reporting error."
    },
    {
      question: "Why does a 20% price increase followed by a 20% decrease not return to the original amount?",
      answer: "Percentage changes operate on asymmetric bases. If a $100 product rises by 20%, its new cost becomes $120. A subsequent 20% discount applies to the new $120 price base ($120 * 0.20 = $24 deduction), reducing the final price to $96. Because the reduction base is larger than the starting base, identical percentages do not cancel each other out."
    },
    {
      question: "How can I calculate the original price before a discount was applied?",
      answer: "To find the original pre-discount price (reverse percentage), divide the sale price by (1 - (Discount % / 100)). For example, if a jacket sells for $80 after a 20% discount, divide $80 by (1 - 0.20) = $80 / 0.80 = $100.00 original price."
    },
    {
      question: "How do I convert fractions and decimals into percentages?",
      answer: "To convert any fraction (such as 3/8) into a percentage, divide the numerator by denominator to get the decimal representation (3 / 8 = 0.375), and multiply by 100 (0.375 * 100 = 37.5%). To convert a decimal directly, shift the decimal point two digits to the right and append the % sign."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Percentage Calculator",
    "description": "Comprehensive online percentage calculator to solve percentage of a number, relative proportions, percentage increase, decrease, markups, and reverse percentages.",
    "applicationCategory": "EducationalTool",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/math/percentage-calculator",
    "browserRequirements": "Requires a modern web browser."
  };

  const pageTitle = "Percentage Calculator: Free Online Percent & Change Tool 2026";
  const pageDescription = "Calculate percentage increases, decreases, relative proportions, discounts, and fractions instantly with exact formulas and step-by-step worked solutions.";

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="/math/percentage-calculator"
        schema={[webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }]}
      />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={Percent} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white">Percentage Calculations</CardTitle>
                <CardDescription>Select conversion mode using the tabs below</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-slate-900/50 p-1 rounded-xl">
                    <TabsTrigger value="p_of_x" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">P% of X</TabsTrigger>
                    <TabsTrigger value="x_is_what_p_of_y" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">X is what % of Y</TabsTrigger>
                    <TabsTrigger value="change" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Increase/Decrease</TabsTrigger>
                  </TabsList>

                  <TabsContent value="p_of_x" className="pt-6">
                    <form onSubmit={calculate1} className="space-y-6">
                      <div className="flex items-center gap-4 bg-slate-900/30 p-4 rounded-xl border border-slate-700/40">
                        <Input type="number" step="any" value={p1} onChange={(e) => setP1(e.target.value)} placeholder="20" required className="bg-slate-900 border-slate-700 rounded-xl" />
                        <Label className="whitespace-nowrap text-slate-300 font-medium">% of</Label>
                        <Input type="number" step="any" value={x1} onChange={(e) => setX1(e.target.value)} placeholder="150" required className="bg-slate-900 border-slate-700 rounded-xl" />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300">
                        Calculate Percentage
                      </Button>
                      {result1 && (
                        <div className="space-y-4 pt-4 border-t border-slate-800">
                          <div className="text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                            Result: {result1}
                          </div>
                          <ShareResults
                            title="Percentage Calculation"
                            text={`Solved my percentage calculation on CalcZoon! ${p1}% of ${x1} is equal to ${result1}. Solve math percentages online:`}
                            url="/math/percentage-calculator"
                          />
                        </div>
                      )}
                    </form>
                  </TabsContent>

                  <TabsContent value="x_is_what_p_of_y" className="pt-6">
                    <form onSubmit={calculate2} className="space-y-6">
                      <div className="flex items-center gap-4 bg-slate-900/30 p-4 rounded-xl border border-slate-700/40">
                        <Input type="number" step="any" value={x2} onChange={(e) => setX2(e.target.value)} placeholder="30" required className="bg-slate-900 border-slate-700 rounded-xl" />
                        <Label className="whitespace-nowrap text-slate-300 font-medium">is what % of</Label>
                        <Input type="number" step="any" value={y2} onChange={(e) => setY2(e.target.value)} placeholder="150" required className="bg-slate-900 border-slate-700 rounded-xl" />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300">
                        Calculate Percentage
                      </Button>
                      {result2 && (
                        <div className="space-y-4 pt-4 border-t border-slate-800">
                          <div className="text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                            Result: {result2}%
                          </div>
                          <ShareResults
                            title="Percentage Calculation"
                            text={`Solved my percentage calculation on CalcZoon! ${x2} is exactly ${result2}% of ${y2}. Solve yours online for free:`}
                            url="/math/percentage-calculator"
                          />
                        </div>
                      )}
                    </form>
                  </TabsContent>

                  <TabsContent value="change" className="pt-6">
                    <form onSubmit={calculate3} className="space-y-6">
                      <div className="flex items-center gap-4 bg-slate-900/30 p-4 rounded-xl border border-slate-700/40">
                        <Label className="whitespace-nowrap text-slate-300 font-medium">From</Label>
                        <Input type="number" step="any" value={x3} onChange={(e) => setX3(e.target.value)} placeholder="150" required className="bg-slate-900 border-slate-700 rounded-xl" />
                        <Label className="whitespace-nowrap text-slate-300 font-medium">to</Label>
                        <Input type="number" step="any" value={y3} onChange={(e) => setY3(e.target.value)} placeholder="180" required className="bg-slate-900 border-slate-700 rounded-xl" />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300">
                        Calculate Change
                      </Button>
                      {result3 && (
                        <div className="space-y-4 pt-4 border-t border-slate-800">
                          <div className={`text-center text-3xl font-extrabold ${parseFloat(result3) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            Result: {result3}% {parseFloat(result3) >= 0 ? 'increase' : 'decrease'}
                          </div>
                          <ShareResults
                            title="Percentage Change"
                            text={`Calculated percentage change from ${x3} to ${y3} on CalcZoon! The result is a ${Math.abs(parseFloat(result3))}% ${parseFloat(result3) >= 0 ? 'increase' : 'decrease'}. Check your numbers:`}
                            url="/math/percentage-calculator"
                          />
                        </div>
                      )}
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 flex items-start gap-3 text-left mt-6">
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-emerald-400 block mb-1">Recommended Financial &amp; STEM Resource: Percentage Optimization</strong>
                    Whether calculating corporate margin expansions or compounding portfolio returns, always distinguish between absolute percentage changes and nominal percentage points.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" /> Percentage Quick Sheet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-300 font-mono">
                <div className="pb-2 border-b border-slate-700/60">
                  <p className="text-emerald-400 font-bold">Portion of Total:</p>
                  <p className="text-slate-300 mt-0.5">Value = (P / 100) × Total</p>
                </div>
                <div className="pb-2 border-b border-slate-700/60">
                  <p className="text-sky-400 font-bold">Relative Share:</p>
                  <p className="text-slate-300 mt-0.5">Percent = (Part / Total) × 100</p>
                </div>
                <div>
                  <p className="text-amber-400 font-bold">Rate of Growth/Decline:</p>
                  <p className="text-slate-300 mt-0.5">Change = ((New − Old) / Old) × 100</p>
                </div>
              </CardContent>
            </Card>
            <RelatedTools category="math" />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,200 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10 mb-12">
          {/* Section 1: What is a Percentage */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Percent className="text-emerald-400 w-7 h-7" /> What is a Percentage & The Foundations of Relative Proportions
            </h2>
            <p className="text-base md:text-lg">
              The term <strong>percentage</strong> originates from the Latin <em>per centum</em>, translating directly to &quot;by the hundred.&quot; In modern mathematics and statistical analysis, a percentage is a dimensionless ratio or fraction whose denominator is standardized to exactly 100. By standardizing diverse quantities to a unified base of 100, percentages enable instantaneous comparisons between datasets of vastly differing scales, such as comparing the financial growth of a multinational conglomerate with that of a local neighborhood enterprise.
            </p>
            <p>
              Whether analyzing consumer price index inflation, examining loan interest rates, calculating sales tax surcharges, or assessing retail seasonal discounts, percentages represent the universal quantitative language of trade and science. Understanding how to calculate percentage values, rates of change, and relative shares ensures error-free budgeting, accurate financial planning, and sound business decisions.
            </p>
          </div>

          {/* Section 2: Mathematical Formulas & Equations */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Mathematical Formulas & Structural Equations
            </h2>
            <p>
              Our calculator automates three primary algebraic expressions alongside essential reciprocal formulas:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4 font-mono text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-800/40 space-y-2">
                <p className="text-emerald-400 font-bold uppercase tracking-wider">Formula 1: Direct Percentage of a Number</p>
                <p className="text-white text-sm font-semibold">Value = (P ÷ 100) × Total</p>
                <p className="text-slate-400">Used for determining discounts, commissions, gratuities, and statutory sales taxes.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-sky-800/40 space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider">Formula 2: Proportional Ratio</p>
                <p className="text-white text-sm font-semibold">Percentage = (Part ÷ Whole) × 100</p>
                <p className="text-slate-400">Calculates exam scores, demographic shares, and portfolio asset allocation percentages.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-800/40 space-y-2">
                <p className="text-amber-400 font-bold uppercase tracking-wider">Formula 3: Percentage Growth or Decline</p>
                <p className="text-white text-sm font-semibold">Δ% = ((Final − Initial) ÷ Initial) × 100</p>
                <p className="text-slate-400">Measures quarterly revenue shifts, asset depreciation, inflation, and bodily weight fluctuations.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-purple-800/40 space-y-2">
                <p className="text-purple-400 font-bold uppercase tracking-wider">Formula 4: Reverse Base Value</p>
                <p className="text-white text-sm font-semibold">Base Price = Final Price ÷ (1 ± (P ÷ 100))</p>
                <p className="text-slate-400">Extracts original wholesale cost from discounted totals or VAT-inclusive invoices.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Step-by-Step Practical Usage Guide */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Step-by-Step Guide: How to Select and Solve Your Problem
            </h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-white">Determine Your Goal:</strong> Identify whether you need to extract a specific dollar amount (e.g., 20% off $80), calculate what fraction an item represents of the total, or calculate how much a metric increased or decreased over time.
              </li>
              <li>
                <strong className="text-white">Choose the Appropriate Tab:</strong> 
                Select <em>P% of X</em> for simple cuts and taxes, <em>X is what % of Y</em> for relative ratios and grade percentages, or <em>Increase/Decrease</em> for comparative timeline analysis.
              </li>
              <li>
                <strong className="text-white">Enter Clean Numerical Values:</strong> 
                Input numbers without currency symbols, commas, or percent signs. Our calculator natively processes decimals and floating-point values.
              </li>
              <li>
                <strong className="text-white">Click Calculate & Interpret Results:</strong> 
                The calculated figure displays instantly with high precision. For percentage change calculations, the engine highlights whether the result represents positive growth (green) or a decrease (red).
              </li>
            </ol>
          </div>

          {/* Section 4: Real-World Numerical Worked Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Real-World Numerical Worked Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg">
                  <CheckCircle className="w-5 h-5" /> Example 1: Multi-Step Retail Clearance Discount
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> A premium winter jacket with an original retail price of $240.00 is placed on a 35% seasonal markdown. Local sales tax of 8% is applied at checkout.
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Dollar Discount = (35 ÷ 100) × 240 = $84.00</p>
                  <p>2. Discounted Price = $240.00 − $84.00 = $156.00</p>
                  <p>3. Sales Tax = (8 ÷ 100) × $156.00 = $12.48</p>
                  <p className="text-emerald-400 font-bold">Final Register Cost: $156.00 + $12.48 = $168.48</p>
                </div>
                <p className="text-xs text-slate-400">
                  Notice that the effective net savings is 29.8% off the original price, illustrating the interplay of discounts and taxes.
                </p>
              </div>

              <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-lg">
                  <TrendingUp className="w-5 h-5" /> Example 2: Quarterly SaaS Revenue Growth Analysis
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> A software startup records recurring monthly revenue of $42,500 in Q1. Following product expansion, Q2 revenue climbs to $58,650.
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Absolute Growth = $58,650 − $42,500 = $16,150</p>
                  <p>2. Relative Growth = ($16,150 ÷ $42,500) = 0.38</p>
                  <p>3. Percentage Change = 0.38 × 100 = +38.00%</p>
                  <p className="text-sky-400 font-bold">Quarterly Revenue Growth: +38.00%</p>
                </div>
                <p className="text-xs text-slate-400">
                  The executive team can formally report a 38% quarter-over-quarter expansion in recurring revenue.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Common Calculation Mistakes & Pitfalls */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Common Calculation Mistakes & Pitfalls to Avoid
            </h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-amber-500 space-y-1">
                <p className="font-bold text-white">1. Confusing Percentage Points With Percentage Change</p>
                <p>
                  If an interest rate or unemployment metric rises from 4% to 5%, that is an increase of <strong>1 percentage point</strong>, but a <strong>25% relative increase</strong> ((5 − 4) ÷ 4 × 100 = 25%). Using these terms interchangeably causes significant distortion in financial and legal reporting.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-rose-500 space-y-1">
                <p className="font-bold text-white">2. Assuming Symmetrical Percentage Increases and Decreases</p>
                <p>
                  A 50% loss requires a 100% gain just to break even. If a $100 stock portfolio drops 50%, it sits at $50. A subsequent 50% gain only lifts the balance to $75 ($50 × 1.50), leaving you 25% below your starting capital. Always compute changes against their current base.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-sky-500 space-y-1">
                <p className="font-bold text-white">3. Adding Stacked Percentage Discounts Directly</p>
                <p>
                  If a store offers &quot;20% off storewide plus an additional 20% loyalty coupon,&quot; the total discount is not 40%. The first 20% lowers a $100 price to $80. The second 20% cuts $16 (20% of $80), making the net price $64—representing a 36% compound discount, not 40%.
                </p>
              </div>
            </div>
          </div>

          {/* Static HTML Reference Benchmark Table */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Common Percentage Multipliers, Fractions &amp; Increase Equivalents Table</h2>
            <p className="text-sm text-slate-400">
              The benchmark reference table below demonstrates common percentages, their exact decimal multipliers, standard fractional equivalents, and their mathematical impact on base values.
            </p>
            <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-slate-950">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                    <th className="p-3 font-semibold">Percentage</th>
                    <th className="p-3 font-semibold text-emerald-400">Decimal Multiplier</th>
                    <th className="p-3 font-semibold text-sky-400">Fractional Value</th>
                    <th className="p-3 font-semibold">Impact on $100 Base</th>
                    <th className="p-3 font-semibold text-rose-400">+P% Increase Factor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">5%</td><td className="p-3 font-mono text-emerald-400">0.05</td><td className="p-3 font-mono text-sky-400">1/20</td><td className="p-3 font-mono">$5.00</td><td className="p-3 font-mono text-rose-400">1.05× ($105.00)</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">10%</td><td className="p-3 font-mono text-emerald-400">0.10</td><td className="p-3 font-mono text-sky-400">1/10</td><td className="p-3 font-mono">$10.00</td><td className="p-3 font-mono text-rose-400">1.10× ($110.00)</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">15%</td><td className="p-3 font-mono text-emerald-400">0.15</td><td className="p-3 font-mono text-sky-400">3/20</td><td className="p-3 font-mono">$15.00</td><td className="p-3 font-mono text-rose-400">1.15× ($115.00)</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">20%</td><td className="p-3 font-mono text-emerald-400">0.20</td><td className="p-3 font-mono text-sky-400">1/5</td><td className="p-3 font-mono">$20.00</td><td className="p-3 font-mono text-rose-400">1.20× ($120.00)</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">25%</td><td className="p-3 font-mono text-emerald-400">0.25</td><td className="p-3 font-mono text-sky-400">1/4</td><td className="p-3 font-mono">$25.00</td><td className="p-3 font-mono text-rose-400">1.25× ($125.00)</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">33.33%</td><td className="p-3 font-mono text-emerald-400">0.3333</td><td className="p-3 font-mono text-sky-400">1/3</td><td className="p-3 font-mono">$33.33</td><td className="p-3 font-mono text-rose-400">1.3333× ($133.33)</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">50%</td><td className="p-3 font-mono text-emerald-400">0.50</td><td className="p-3 font-mono text-sky-400">1/2</td><td className="p-3 font-mono">$50.00</td><td className="p-3 font-mono text-rose-400">1.50× ($150.00)</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">75%</td><td className="p-3 font-mono text-emerald-400">0.75</td><td className="p-3 font-mono text-sky-400">3/4</td><td className="p-3 font-mono">$75.00</td><td className="p-3 font-mono text-rose-400">1.75× ($175.00)</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">100%</td><td className="p-3 font-mono text-emerald-400">1.00</td><td className="p-3 font-mono text-sky-400">1/1</td><td className="p-3 font-mono">$100.00</td><td className="p-3 font-mono text-rose-400">2.00× ($200.00)</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">200%</td><td className="p-3 font-mono text-emerald-400">2.00</td><td className="p-3 font-mono text-sky-400">2/1</td><td className="p-3 font-mono">$200.00</td><td className="p-3 font-mono text-rose-400">3.00× ($300.00)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 6: In-Depth FAQ Component is rendered below */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <HelpCircle className="text-sky-400 w-7 h-7" /> Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-sm">
              Explore thorough answers to everyday percentage questions, conversion formulas, and mathematical nuances.
            </p>
          </div>

          <Faq items={faqItems} className="mt-4" />

          {/* Section 7: Academic References & Internal Navigation */}
          <div className="space-y-4 pt-6 border-t border-slate-700/60">
            <h3 className="text-xl font-bold text-white">Standards, References & Companion Tools</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mathematical notations and percentage algorithms adhere to international specifications under <strong>ISO 80000-2:2019</strong> (Quantities and units — Mathematics) and standard algebraic guidelines outlined by the <em>National Institute of Standards and Technology (NIST)</em>.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/lifestyle/discount-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Discount Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/lifestyle/tip-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Tip & Gratuity Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/math/fraction-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Fraction Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/financial/savings-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Savings Goal Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <Disclaimer text="This calculator is for educational and general estimation purposes. For formal corporate accounting, statutory tax filing, or investment advisory, always consult with a certified financial planner or accountant." />
      </div>
    </>
  );
};

export default PercentageCalculator;

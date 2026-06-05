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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Percent } from 'lucide-react';

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
    { question: "How do you calculate percentage of a number?", answer: "To calculate the percentage of a number, multiply the number by the percentage and then divide by 100. For example, 20% of 150 is calculated as (150 * 20) / 100 = 30." },
    { question: "How do I calculate a percentage increase?", answer: "To calculate the percentage increase from value X to value Y, subtract X from Y, divide the result by X, and then multiply by 100. The formula is: ((Y - X) / X) * 100." },
    { question: "Can this calculator be used for discounts?", answer: "Yes! To find a discount, select the 'P% of X' tab. Enter the discount percentage (e.g. 20) and the original price. The result shows your total savings. Subtract this from the original price to get the final sales cost." },
    { question: "What is the formula to convert a fraction to a percentage?", answer: "To convert any fraction (like 3/4) to a percentage, divide the numerator by the denominator to get a decimal, and then multiply by 100. For example: (3 ÷ 4) × 100 = 0.75 × 100 = 75%." }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Percentage Calculator",
    "description": "A versatile and free Percentage Calculator to solve all percentage-related problems. Perfect for math homework and everyday tasks.",
    "applicationCategory": "EducationalTool",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/math/percentage-calculator",
    "browserRequirements": "Requires a modern web browser."
  };

  const pageTitle = "Percentage Calculator: Solve Math Percentages Instantly 2026";
  const pageDescription = "Calculate percentage increases, decreases, fractions, and values instantly. Solve school math or calculate retail discounts with our free online tool.";

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
              </CardContent>
            </Card>
          </div>
          <aside className="lg:col-span-1 space-y-6">
            <RelatedTools category="math" />
          </aside>
        </div>

        {/* Detailed SEO Explanation Section */}
        <section className="mt-16 bg-slate-800/20 rounded-2xl border border-slate-700/40 p-8 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Understanding Mathematical Percentages</h2>
            <p>
              A percentage is a mathematical number or ratio expressed as a fraction of 100. It is often denoted using the percent sign, "%". Percentages are dimensionless fractions used to describe size, proportions, relative increases, decreases, interest rates, and discounts.
            </p>
            <p>
              Understanding how to calculate percentages helps in managing everyday tasks like budgeting, determining financial growth, calculating discounts at retail stores, tips at restaurants, and tax rates on invoices.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">How to Use the Free Percentage Calculator</h2>
            <p>Our tool operates in three separate modes, designed to cover all daily calculation needs:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Tab 1: P% of X</strong> – Use this to find a specific percentage value of a number. (Example: What is 15% of $80?).</li>
              <li><strong>Tab 2: X is what % of Y</strong> – Use this to discover the proportion of one value relative to another. (Example: 45 is what percentage of 150?).</li>
              <li><strong>Tab 3: Increase/Decrease</strong> – Use this to calculate the percentage rate of change when a number grows or shrinks from its starting value. (Example: If price increases from $100 to $125, what is the percent change?).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Percentage Formulas & Calculations Explained</h2>
            <p>Behind the tabs, our calculator executes the following fundamental algebraic formulas:</p>
            
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 font-mono text-emerald-400 space-y-3">
              <p>1. Percentage Value (P% of X): Value = (P ÷ 100) × X</p>
              <p>2. Relative Percentage (X is what % of Y): Percentage = (X ÷ Y) × 100</p>
              <p>3. Percentage Change (From X to Y): Change = ((Y - X) ÷ X) × 100</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Practical Everyday Applications of Percentages</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Sales & Discounts:</strong> Quickly calculate how much money you save during store clearance events.</li>
              <li><strong>Tax Calculations:</strong> Add sales tax (VAT/GST) to wholesale unit prices.</li>
              <li><strong>Restaurant Gratuity:</strong> Compute a standard 15% or 20% waiter tip on the subtotal.</li>
              <li><strong>Finance & Interest:</strong> Estimate interest yields on investments or interest penalties on loans.</li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="This calculator is for general calculation purposes. For financial decisions, always consult with a professional." />
      </div>
    </>
  );
};

export default PercentageCalculator;
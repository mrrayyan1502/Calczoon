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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    { question: "How do you calculate percentage of a number?", answer: "To calculate the percentage of a number, you multiply the number by the percentage and then divide by 100. For example, 20% of 150 is (150 * 20) / 100 = 30." },
    { question: "How do I calculate a percentage increase?", answer: "To calculate a percentage increase from X to Y, use the formula: ((Y - X) / X) * 100. Our third calculator does this automatically." },
    { question: "Can this calculator be used for discounts?", answer: "Yes! To find a discount, use the first calculator 'What is P% of X?'. Enter the discount percentage and the original price. The result is your savings." }
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

  return (
    <>
      <Seo
        title="Percentage Calculator | Find Percentages Instantly"
        description="A versatile and free Percentage Calculator to solve all percentage-related problems. Perfect for math homework and everyday tasks."
        canonicalUrl="/math/percentage-calculator"
        schema={webAppSchema}
      />
      <div className="max-w-2xl mx-auto py-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <h1 className="text-3xl font-bold text-center text-primary">Percentage Calculator</h1>
              <CardDescription className="text-center text-slate-400">
                A versatile tool to solve all your percentage problems.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="p_of_x">P% of X</TabsTrigger>
                  <TabsTrigger value="x_is_what_p_of_y">X is what % of Y</TabsTrigger>
                  <TabsTrigger value="change">Increase/Decrease</TabsTrigger>
                </TabsList>
                <TabsContent value="p_of_x" className="pt-6">
                  <form onSubmit={calculate1} className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Input type="number" value={p1} onChange={(e) => setP1(e.target.value)} placeholder="20" required className="bg-slate-900 border-slate-700"/>
                      <Label className="whitespace-nowrap">% of</Label>
                      <Input type="number" value={x1} onChange={(e) => setX1(e.target.value)} placeholder="150" required className="bg-slate-900 border-slate-700"/>
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Calculate</Button>
                    {result1 && <div className="text-center text-2xl font-bold text-primary pt-4">Result: {result1}</div>}
                  </form>
                </TabsContent>
                <TabsContent value="x_is_what_p_of_y" className="pt-6">
                  <form onSubmit={calculate2} className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Input type="number" value={x2} onChange={(e) => setX2(e.target.value)} placeholder="30" required className="bg-slate-900 border-slate-700"/>
                      <Label className="whitespace-nowrap">is what % of</Label>
                      <Input type="number" value={y2} onChange={(e) => setY2(e.target.value)} placeholder="150" required className="bg-slate-900 border-slate-700"/>
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Calculate</Button>
                    {result2 && <div className="text-center text-2xl font-bold text-primary pt-4">Result: {result2}%</div>}
                  </form>
                </TabsContent>
                <TabsContent value="change" className="pt-6">
                   <form onSubmit={calculate3} className="space-y-4">
                    <div className="flex items-center gap-4">
                       <Label className="whitespace-nowrap">From</Label>
                      <Input type="number" value={x3} onChange={(e) => setX3(e.target.value)} placeholder="150" required className="bg-slate-900 border-slate-700"/>
                      <Label className="whitespace-nowrap">to</Label>
                      <Input type="number" value={y3} onChange={(e) => setY3(e.target.value)} placeholder="180" required className="bg-slate-900 border-slate-700"/>
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Calculate</Button>
                    {result3 && <div className={`text-center text-2xl font-bold pt-4 ${parseFloat(result3) >= 0 ? 'text-green-400' : 'text-red-400'}`}>Result: {result3}% {parseFloat(result3) >= 0 ? 'increase' : 'decrease'}</div>}
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Faq items={faqItems} className="mt-8"/>
          <Disclaimer text="This calculator is for general calculation purposes. For financial decisions, always consult with a professional."/>
        </div>
    </>
  );
};

export default PercentageCalculator;
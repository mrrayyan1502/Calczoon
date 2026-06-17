import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Faq from '@/components/Faq';
import { saveCalculation } from '@/lib/history';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';

const PregnancyDueDateCalculator = () => {
  const [lmp, setLmp] = useState('');
  const [result, setResult] = useState(null);

  const calculateDueDate = (e) => {
    e.preventDefault();
    if (!lmp) {
      setResult({ error: "Please enter the first day of your last menstrual period." });
      return;
    }

    const lmpDate = new Date(lmp);
    if (isNaN(lmpDate.getTime())) {
      setResult({ error: "Invalid date format." });
      return;
    }
    
    const dueDate = new Date(lmpDate.getTime());
    dueDate.setDate(dueDate.getDate() + 280);
    
    const newResult = { 
      dueDate: dueDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    };
    setResult(newResult);
    saveCalculation({
      type: 'Pregnancy Due Date',
      inputs: { lmp },
      result: { DueDate: newResult.dueDate }
    });
  };

  const faqItems = [
    { question: "Is the calculated due date 100% accurate?", answer: "The due date is an estimate. Only about 5% of babies are born on their exact due date. It provides a useful timeframe, but your baby will arrive when they are ready. An ultrasound can provide a more accurate dating, especially if your cycles are irregular." },
    { question: "What if I don't know the date of my last menstrual period?", answer: "If you are unsure of your LMP, a healthcare provider can estimate your due date using an ultrasound, which measures the baby's size. This is the most accurate method in such cases." }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pregnancy Due Date Calculator",
    "description": "Calculate your expected delivery date with our easy Pregnancy Due Date Calculator. Track your pregnancy timeline with confidence.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/health/pregnancy-due-date-calculator",
    "browserRequirements": "Requires a modern web browser."
  };

  return (
    <>
      <Seo
        title="Pregnancy Due Date Calculator | When Is Your Baby Due?"
        description="Calculate your expected delivery date with our easy Pregnancy Due Date Calculator. Track your pregnancy timeline with confidence."
        canonicalUrl="/health/pregnancy-due-date-calculator"
        schema={webAppSchema}
      />
      <div className="max-w-2xl mx-auto py-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <h1 className="text-3xl font-bold text-center text-primary">Pregnancy Due Date Calculator</h1>
              <CardDescription className="text-center text-slate-300">
                Find out when your baby is due with our easy-to-use Pregnancy Due Date Calculator. Enter the first day of your last menstrual period and your average cycle length to get your estimated due date. This tool provides a helpful estimate, which can be confirmed by your healthcare provider with a first-trimester ultrasound.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateDueDate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="lmp">First Day of Your Last Menstrual Period (LMP)</Label>
                  <Input id="lmp" type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} required className="bg-slate-900 border-slate-700" max={new Date().toISOString().split('T')[0]} />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate Due Date</Button>
              </form>
            </CardContent>
            {result && !result.error && (
              <CardFooter className="flex flex-col items-start mt-6 p-6 bg-slate-800 rounded-b-lg">
                <div className="w-full text-center space-y-2">
                  <h2 className="text-xl font-bold text-slate-100">Your Estimated Due Date:</h2>
                  <p className="text-4xl font-bold text-primary">{result.dueDate}</p>
                </div>
              </CardFooter>
            )}
             {result && result.error && (
                <CardFooter className="mt-6 p-6 bg-slate-800 rounded-b-lg">
                    <p className="text-destructive text-center w-full">{result.error}</p>
                </CardFooter>
            )}
          </Card>
          
          {result && !result.error && (
            <ShareResults
              title="Our Baby's Due Date!"
              text={`We're expecting! Our estimated due date is ${result.dueDate}. Calculated with Calczoon!`}
              url="https://calczoon.com/health/pregnancy-due-date-calculator"
            />
          )}

          <Card className="bg-slate-800/50 border-slate-700 mt-8">
            <CardHeader><h2 className="text-2xl font-bold text-primary">How Pregnancy Due Date is Calculated</h2></CardHeader>
            <CardContent className="space-y-4 text-slate-300">
                <p>This calculator uses Naegele's rule, a standard method for estimating a due date. It works by adding 280 days (40 weeks) to the first day of your last menstrual period (LMP). This assumes a regular 28-day menstrual cycle.</p>
                <h3 className="text-xl font-semibold text-white">Using the Pregnancy Due Date Calculator</h3>
                <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Enter LMP Date:</strong> Use the date picker to select the first day of your last period.</li>
                    <li><strong>Calculate:</strong> Click the button to get your estimated due date instantly.</li>
                </ol>
                <h3 className="text-xl font-semibold text-white">Pregnancy Trimester Overview</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li><strong>First Trimester:</strong> Week 1 to Week 12</li>
                    <li><strong>Second Trimester:</strong> Week 13 to Week 28</li>
                    <li><strong>Third Trimester:</strong> Week 29 to Week 40</li>
                </ul>
            </CardContent>
          </Card>
          
          <Faq items={faqItems} className="mt-8"/>
        </div>
    </>
  );
};

export default PregnancyDueDateCalculator;
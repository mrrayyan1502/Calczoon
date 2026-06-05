import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Disclaimer from '@/components/Disclaimer';
import Faq from '@/components/Faq';
import { saveCalculation } from '@/lib/history';
import Seo from '@/components/Seo';
import ShareResults from '@/components/ShareResults';

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => (currency === 'USD' ? '$' : '£');

  const calculateInterest = (e) => {
    e.preventDefault();
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t) || p < 0 || r < 0 || t < 0) {
      setResult({ error: "Please enter valid positive numbers." });
      return;
    }

    const interest = p * r * t;
    const totalAmount = p + interest;
    const newResult = {
      interest: interest.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    };
    setResult(newResult);
    saveCalculation({
      type: 'Simple Interest',
      inputs: { principal, rate, time, currency },
      result: { Interest: `${getCurrencySymbol()}${newResult.interest}`, Total: `${getCurrencySymbol()}${newResult.totalAmount}` }
    });
  };
  
  const faqItems = [
    {
      "@type": "Question",
      "name": "How do I calculate simple interest on a personal loan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To calculate simple interest on a personal loan, enter the loan amount as the 'Principal', the annual interest rate, and the loan term in years. The calculator will instantly show you the total interest you'll pay over the life of the loan."
      }
    },
    {
      "@type": "Question",
      "name": "What is simple interest?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simple interest is a quick and easy method of calculating the interest charge on a loan. It is determined by multiplying the daily interest rate by the principal by the number of days that elapse between payments. Unlike compound interest, it does not factor in the interest on accumulated interest."
      }
    },
    {
      "@type": "Question",
      "name": "What's the difference between simple and compound interest?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Simple interest is calculated only on the principal amount. In contrast, compound interest is calculated on the principal plus any accumulated interest. For compound interest calculations, such as for investment earnings, please use our 'Compound Interest Calculator'."
      }
    }
  ];
  
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Simple Interest",
    "description": "Calculate simple interest on a loan or investment.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Principal",
        "text": "Input the initial amount of the loan or investment."
      },
      {
        "@type": "HowToStep",
        "name": "Enter Rate",
        "text": "Input the annual interest rate."
      },
      {
        "@type": "HowToStep",
        "name": "Enter Time",
        "text": "Input the time period in years."
      },
      {
        "@type": "HowToStep",
        "name": "Calculate",
        "text": "Click the 'Calculate' button to see the total simple interest and the final amount."
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Simple Interest Calculator",
    "description": "A free online tool to calculate simple interest for loans or investments. Fast, accurate, and easy to use.",
    "applicationCategory": "FinancialApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/financial/simple-interest-calculator",
    "browserRequirements": "Requires a modern web browser."
  };

  return (
    <>
      <Seo
        title="Simple Interest Calculator - Fast & Accurate"
        description="Our free Simple Interest Calculator helps you quickly find interest on personal loans, legal claims, or savings. Use the simple interest formula online."
        canonicalUrl="/financial/simple-interest-calculator"
        schema={[howToSchema, webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems }]}
      />
      <div className="max-w-2xl mx-auto py-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <h1 className="text-3xl font-bold text-center text-primary">Simple Interest Calculator</h1>
                <CardDescription className="text-center text-slate-400">
                  This tool provides a quick way to compute interest on loans or savings without compounding. It's ideal for personal loans, certain investments, or legal claims where simple interest applies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateInterest} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white">
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="principal">Principal Amount ({getCurrencySymbol()})</Label>
                    <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g., 1000" required className="bg-slate-900 border-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                    <Input id="rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 5" required className="bg-slate-900 border-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time Period (Years)</Label>
                    <Input id="time" type="number" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 2" required className="bg-slate-900 border-slate-700" />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate</Button>
                </form>
              </CardContent>
               {result && !result.error && (
                <CardFooter className="flex flex-col items-start mt-6 p-6 bg-slate-800 rounded-b-lg">
                  <div className="w-full space-y-4">
                    <h2 className="text-xl font-bold text-slate-100">Calculation Results</h2>
                    <div className="flex justify-between items-center"><p className="text-slate-300">Simple Interest:</p><p className="text-2xl font-bold text-primary">{getCurrencySymbol()}{result.interest}</p></div>
                    <div className="flex justify-between items-center"><p className="text-slate-300">Total Amount:</p><p className="text-2xl font-bold text-primary">{getCurrencySymbol()}{result.totalAmount}</p></div>
                  </div>
                </CardFooter>
              )}
              {result && result.error && (
                  <CardFooter className="mt-6 p-6 bg-slate-800 rounded-b-lg">
                      <p className="text-destructive text-center w-full">{result.error}</p>
                  </CardFooter>
              )}
            </Card>
          </motion.div>
          
          {result && !result.error && (
            <ShareResults
              title="Simple Interest Calculation"
              text={`The simple interest on ${getCurrencySymbol()}${result.originalValue} is ${getCurrencySymbol()}${result.interest}. Calculated with Calczoon!`}
              url="https://calczoon.com/financial/simple-interest-calculator"
            />
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <Card className="bg-slate-800/50 border-slate-700 mt-8">
              <CardHeader><h2 className="text-2xl font-bold text-primary">Understanding Simple Interest</h2></CardHeader>
              <CardContent className="space-y-4 text-slate-300">
                  <p>Simple interest is a foundational concept in finance, representing the most basic form of interest calculation. Unlike compound interest, it is calculated solely on the original principal amount of a loan or deposit. This makes it a straightforward way to understand the cost of borrowing or the return on an investment over time.</p>
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="font-semibold text-white">The Formula Explained</h3>
                    <p className="font-mono text-lg text-primary my-2">Interest = P × r × t</p>
                    <ul className="text-sm list-disc list-inside pl-2 mt-2 space-y-1">
                      <li><strong className="text-white">P (Principal):</strong> The initial amount of money borrowed or invested.</li>
                      <li><strong className="text-white">r (Rate):</strong> The annual interest rate expressed as a decimal (e.g., 5% becomes 0.05).</li>
                      <li><strong className="text-white">t (Time):</strong> The duration for which the money is borrowed or invested, measured in years.</li>
                    </ul>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Practical Example</h3>
                  <p>Imagine you take out a small personal loan of $1,000 for 2 years at a simple interest rate of 5% per year. Using the formula:</p>
                  <p className='italic text-slate-400'>Interest = $1,000 × 0.05 × 2 = $100.</p>
                  <p>This means over the two years, you would pay $100 in interest. The total amount you would repay is the principal plus the interest, which is $1,000 + $100 = $1,100.</p>
                  <p>This calculator automates that process for you, providing instant and accurate results for any given scenario.</p>
              </CardContent>
            </Card>
          </motion.div>

          <Faq items={faqItems.map(item => ({ question: item.name, answer: item.acceptedAnswer.text }))} />
          <Disclaimer text="This calculator is for illustrative purposes only and assumes simple interest. Most modern financial products use compound interest, which can result in different outcomes." />
        </div>
    </>
  );
};

export default SimpleInterestCalculator;
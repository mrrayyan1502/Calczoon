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

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [asOfDate, setAsOfDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState(null);

  const calculateAge = (e) => {
    e.preventDefault();
    if (!birthDate) {
      setResult({ error: "Please enter your birth date." });
      return;
    }

    const bd = new Date(birthDate);
    const ad = new Date(asOfDate);

    if (isNaN(bd.getTime()) || isNaN(ad.getTime())) {
      setResult({ error: "Invalid date format." });
      return;
    }

    if (bd > ad) {
      setResult({ error: "Birth date cannot be after 'As of' date." });
      return;
    }

    let years = ad.getFullYear() - bd.getFullYear();
    let months = ad.getMonth() - bd.getMonth();
    let days = ad.getDate() - bd.getDate();

    if (days < 0) {
      months--;
      days += new Date(ad.getFullYear(), ad.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const newResult = {
      years,
      months,
      days,
      totalDays: Math.floor((ad - bd) / (1000 * 60 * 60 * 24)),
    };
    setResult(newResult);
    saveCalculation({
      type: 'Age',
      inputs: { birthDate, asOfDate },
      result: { Age: `${years}y ${months}m ${days}d` }
    });
  };
  
  const resetForm = () => {
    setBirthDate('');
    setAsOfDate(new Date().toISOString().split('T')[0]);
    setResult(null);
  };

  const faqItems = [
    { question: "How do I calculate age from date of birth?", answer: "To calculate age from a date of birth, simply enter the birth date into the calculator. It subtracts the birth date from the current date (or a date you specify) to give you the exact age in years, months, and days." },
    { question: "Can I use this as a family age calculator?", answer: "Yes, you can use this as a family age calculator by entering the birth date of each family member one by one. It's a quick way to find everyone's current age." },
    { question: "Is this an easy age calculator to use?", answer: "Absolutely. We designed this tool to be as simple as possible. Just pick a date and you'll get an instant, accurate age calculation without any complicated steps." }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Age Calculator",
    "description": "Calculate age from date of birth with our easy age calculator. Perfect for personal use or as a family age calculator.",
    "applicationCategory": "Tool",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/lifestyle/age-calculator",
    "browserRequirements": "Requires a modern web browser."
  };

  return (
    <>
      <Seo
        title="Age Calculator | How Old Am I?"
        description="Calculate age from date of birth with our easy age calculator. Perfect for personal use or as a family age calculator. Find out your age in years, months, and days."
        canonicalUrl="/lifestyle/age-calculator"
        schema={[webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }]}
      />
      <div className="max-w-2xl mx-auto py-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <h1 className="text-3xl font-bold text-center text-primary">Age Calculator</h1>
              <CardDescription className="text-center text-slate-400">
                Quickly find your age in years, months, and days with our easy-to-use Age Calculator. Simply enter your date of birth and the current date (or any other date) to get an instant and accurate age calculation. It's perfect for finding out exactly how old you are down to the day.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateAge} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Your Date of Birth</Label>
                  <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required className="bg-slate-900 border-slate-700" max={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asOfDate">Age as of Date</Label>
                  <Input id="asOfDate" type="date" value={asOfDate} onChange={(e) => setAsOfDate(e.target.value)} required className="bg-slate-900 border-slate-700" />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate Age</Button>
                  <Button type="button" variant="secondary" onClick={resetForm} className="h-12">Reset</Button>
                </div>
              </form>
            </CardContent>
            {result && (
              <CardFooter className="flex flex-col items-start mt-6 p-6 bg-slate-800 rounded-b-lg">
                {result.error ? ( <p className="text-destructive text-center w-full">{result.error}</p> ) : (
                  <div className="w-full space-y-4">
                    <h2 className="text-xl font-bold text-slate-100">Your Age Is:</h2>
                    <div className="text-center mb-4">
                      <p className="text-4xl font-bold text-primary">{result.years} <span className="text-2xl text-slate-300">years</span> {result.months} <span className="text-2xl text-slate-300">months</span> {result.days} <span className="text-2xl text-slate-300">days</span></p>
                    </div>
                    <div className="flex justify-center"><span className="text-slate-300">Total Days:</span><span className="font-bold text-slate-100 ml-2">{result.totalDays.toLocaleString()}</span></div>
                     <div className="mt-4">
                        <ShareResults
                          title="My Age Calculation"
                          text={`I calculated my age on Calczoon! I am ${result.years} years, ${result.months} months, and ${result.days} days old.`}
                          url="https://calczoon.com/lifestyle/age-calculator"
                        />
                    </div>
                  </div>
                )}
              </CardFooter>
            )}
          </Card>
          
          <Faq items={faqItems} className="mt-8"/>
          <Disclaimer text="Age calculations are based on the Gregorian calendar. Results are for informational purposes." />
        </div>
    </>
  );
};

export default AgeCalculator;
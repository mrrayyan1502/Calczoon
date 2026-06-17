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
import { Calendar } from 'lucide-react';

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
    { question: "How do I calculate age from date of birth?", answer: "To calculate age from a date of birth, enter your birth date and the reference date (which defaults to today). The tool subtracts the birth date from the reference date to calculate your exact age in years, months, and days." },
    { question: "Can I use this as a family age calculator?", answer: "Yes, you can use this as a family age calculator by entering the birth date of each family member one by one. It's a quick way to find everyone's current age." },
    { question: "Is this an easy age calculator to use?", answer: "Absolutely. We designed this tool to be as simple as possible. Just pick a date and you'll get an instant, accurate age calculation without any complicated steps." },
    { question: "How does the calculator handle leap years?", answer: "Our calculator automatically accounts for leap years and the varying number of days in each month by using Javascript's native Date objects, ensuring 100% mathematical precision." }
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

  const pageTitle = "Age Calculator: Find Your Exact Age Online 2026";
  const pageDescription = "Calculate your exact age in years, months, days, and total days. Track family birthdays and age differences instantly with our free online tool.";

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="/lifestyle/age-calculator"
        schema={[webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }]}
      />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={Calendar} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white font-bold">Chronological Age Calculator</CardTitle>
                <CardDescription>Enter your birth date and the reference date below</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={calculateAge} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-slate-300 font-medium">Your Date of Birth</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      required
                      className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="asOfDate" className="text-slate-300 font-medium">Age as of Date</Label>
                    <Input
                      id="asOfDate"
                      type="date"
                      value={asOfDate}
                      onChange={(e) => setAsOfDate(e.target.value)}
                      required
                      className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                      Calculate Age
                    </Button>
                    <Button type="button" variant="secondary" onClick={resetForm} className="h-12 rounded-xl">
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>
              {result && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-800/30 border-t border-slate-700/40">
                  {result.error ? (
                    <p className="text-destructive text-center w-full">{result.error}</p>
                  ) : (
                    <div className="w-full space-y-4">
                      <h3 className="text-lg font-bold text-slate-300">Your Calculated Age:</h3>
                      <div className="text-center mb-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                        <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 leading-tight">
                          {result.years} <span className="text-2xl text-slate-300 font-semibold">years</span>, {result.months} <span className="text-2xl text-slate-300 font-semibold">months</span>, {result.days} <span className="text-2xl text-slate-300 font-semibold">days</span>
                        </p>
                      </div>
                      <div className="flex justify-center text-sm">
                        <span className="text-slate-300">Total Days Lived:</span>
                        <span className="font-bold text-emerald-400 ml-2">{result.totalDays.toLocaleString()} days</span>
                      </div>
                      <div className="mt-4 w-full">
                        <ShareResults
                          title="Age Calculation"
                          text={`Calculated my exact age on CalcZoon! I am exactly ${result.years} years, ${result.months} months, and ${result.days} days old. Find your age down to the day:`}
                          url="/lifestyle/age-calculator"
                        />
                      </div>
                    </div>
                  )}
                </CardFooter>
              )}
            </Card>
          </div>
          <aside className="lg:col-span-1 space-y-6">
            <RelatedTools category="lifestyle" />
          </aside>
        </div>

        {/* Detailed SEO Explanation Section */}
        <section className="mt-16 bg-slate-800/20 rounded-2xl border border-slate-700/40 p-8 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Understanding Chronological Age Calculation</h2>
            <p>
              Chronological age is the measure of time that has elapsed from a person's birth to a specific reference date. While we usually express age in rounded years, our bodies and relationships track milestones down to months, weeks, and days.
            </p>
            <p>
              Calculating age is useful for legal applications (e.g., verifying eligibility or retirement dates), medical records, developmental milestones in children, and planning special family celebrations.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">How to Use the Chronological Age Calculator</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Enter Date of Birth:</strong> Use the date selector to input the exact day, month, and year of birth.</li>
              <li><strong>Set the Reference Date:</strong> Enter the target date you are calculating the age for. By default, this is set to today's date.</li>
              <li><strong>Convert:</strong> Click "Calculate Age" to instantly see the output broken down by years, months, and days, alongside total elapsed days.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">How Age is Mathematically Calculated</h2>
            <p>
              Calendar calculations are complex because months contain differing lengths (28, 29, 30, or 31 days) and leap years insert an extra day every four years. Our calculator operates using JavaScript's native date arithmetic:
            </p>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 font-mono text-emerald-400 space-y-2">
              <p>1. Years = Reference Year - Birth Year</p>
              <p>2. Months = Reference Month - Birth Month</p>
              <p>3. Days = Reference Day - Birth Day</p>
              <p>4. If Days &lt; 0: Subtract 1 from Months, and add the total days of the previous month.</p>
              <p>5. If Months &lt; 0: Subtract 1 from Years, and add 12 to Months.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Practical Benefits of an Online Age Calculator</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Varying Month Lengths Handled Automatically:</strong> You don't have to count manually which months had 30 or 31 days.</li>
              <li><strong>Find exact milestones:</strong> Excellent for tracking newborn development (which is counted in weeks and months rather than years).</li>
              <li><strong>Leap Year Correction:</strong> Leap years (like 2024, 2028, etc.) are factored in automatically when calculating total days.</li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="Age calculations are based on the Gregorian calendar. Results are for informational purposes." />
      </div>
    </>
  );
};

export default AgeCalculator;
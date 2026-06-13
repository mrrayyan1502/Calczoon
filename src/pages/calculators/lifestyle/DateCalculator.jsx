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
import { CalendarDays } from 'lucide-react';

const DateCalculator = () => {
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState(null);

  const calculateDifference = (e) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      setResult({ error: "Please select both dates." });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const diffWeeks = Math.floor(diffDays / 7);
    const remainingDays = diffDays % 7;
    
    // Approximate months and years
    let startY = start.getFullYear();
    let startM = start.getMonth();
    let startD = start.getDate();
    let endY = end.getFullYear();
    let endM = end.getMonth();
    let endD = end.getDate();

    if (start > end) {
      // Swap for calculation logic
      let temp = startY; startY = endY; endY = temp;
      temp = startM; startM = endM; endM = temp;
      temp = startD; startD = endD; endD = temp;
    }

    let diffYears = endY - startY;
    let diffMonths = endM - startM;
    let diffMonthDays = endD - startD;

    if (diffMonthDays < 0) {
      diffMonths--;
      // Approximate days in previous month
      const prevMonth = new Date(endY, endM, 0);
      diffMonthDays += prevMonth.getDate();
    }
    if (diffMonths < 0) {
      diffYears--;
      diffMonths += 12;
    }

    const newResult = {
      totalDays: diffDays,
      weeks: diffWeeks,
      remainingDays: remainingDays,
      years: diffYears,
      months: diffMonths,
      monthDays: diffMonthDays,
    };
    
    setResult(newResult);
    saveCalculation({
      type: 'Date Difference',
      inputs: { startDate, endDate },
      result: { Difference: `${diffDays} days` }
    });
  };

  const faqItems = [
    {
      question: "Does this calculator include the end date?",
      answer: "By default, this calculates the mathematical difference between the two dates, which means it counts the number of nights or complete 24-hour periods. It does not include both the start and end date as full days."
    },
    {
      question: "How are months and years calculated?",
      answer: "Months and years are calculated using calendar dates. A month from January 15th to February 15th is exactly one month, regardless of whether January has 31 days."
    }
  ];

  const pageTitle = "Date Calculator: Days Between Two Dates";
  const pageDescription = "Calculate the exact number of days, weeks, months, and years between two dates instantly with our free online date calculator.";

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} canonicalUrl="/lifestyle/date-calculator" />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={CalendarDays} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white">Calculate Date Difference</CardTitle>
                <CardDescription>Select a start and end date</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={calculateDifference} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate" className="text-slate-300 font-medium">Start Date</Label>
                      <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate" className="text-slate-300 font-medium">End Date</Label>
                      <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl" />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                    Calculate Difference
                  </Button>
                </form>
              </CardContent>
              {result && !result.error && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-800/30 border-t border-slate-700/40">
                  <div className="w-full space-y-4">
                    <h3 className="text-lg font-bold text-slate-300">Result</h3>
                    <div className="text-center mb-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                      <p className="text-slate-400 text-sm font-medium">Total Difference in Days</p>
                      <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                        {result.totalDays} Days
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-400">In Weeks</p>
                        <p className="font-semibold text-slate-200">{result.weeks} weeks {result.remainingDays > 0 ? `and ${result.remainingDays} days` : ''}</p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-400">In Calendar Years/Months</p>
                        <p className="font-semibold text-slate-200">
                          {result.years > 0 ? `${result.years} years, ` : ''}
                          {result.months > 0 ? `${result.months} months, ` : ''}
                          {result.monthDays} days
                        </p>
                      </div>
                    </div>
                    <ShareResults title="Date Difference Calculation" text={`There are ${result.totalDays} days between ${startDate} and ${endDate}. Calculated via CalcZoon!`} url="/lifestyle/date-calculator" />
                  </div>
                </CardFooter>
              )}
              {result && result.error && (
                <CardFooter className="p-6 bg-slate-800/30 border-t border-slate-700/40 text-center">
                  <p className="text-destructive text-center w-full">{result.error}</p>
                </CardFooter>
              )}
            </Card>
          </div>
          <aside className="lg:col-span-1 space-y-6">
            <RelatedTools category="lifestyle" />
          </aside>
        </div>
        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="This calculator provides mathematical differences between dates. It does not account for specific business days or local holidays." />
      </div>
    </>
  );
};

export default DateCalculator;

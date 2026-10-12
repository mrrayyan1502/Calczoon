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
import { CalendarDays, BookOpen, CheckCircle, HelpCircle, ArrowRight, Clock, Calendar } from 'lucide-react';

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
    
    // Normalize to UTC midnight to avoid Daylight Saving Time hour shifts
    const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
    
    const diffTime = Math.abs(utcEnd - utcStart);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    const diffWeeks = Math.floor(diffDays / 7);
    const remainingDays = diffDays % 7;
    
    // Exact calendar breakdown
    let s = start < end ? start : end;
    let eDate = start < end ? end : start;

    let startY = s.getFullYear();
    let startM = s.getMonth();
    let startD = s.getDate();
    let endY = eDate.getFullYear();
    let endM = eDate.getMonth();
    let endD = eDate.getDate();

    let diffYears = endY - startY;
    let diffMonths = endM - startM;
    let diffMonthDays = endD - startD;

    if (diffMonthDays < 0) {
      diffMonths--;
      // Days in previous month
      const prevMonth = new Date(endY, endM, 0);
      diffMonthDays += prevMonth.getDate();
    }
    if (diffMonths < 0) {
      diffYears--;
      diffMonths += 12;
    }

    const newResult = {
      totalDays: diffDays,
      inclusiveDays: diffDays + 1,
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
      result: { Difference: `${diffDays} days (${diffYears}y ${diffMonths}m ${diffMonthDays}d)` }
    });
  };

  const faqItems = [
    {
      question: "Does this date calculation include both the start and end date?",
      answer: "By standard mathematical convention, date differences count the elapsed duration (nights or full 24-hour intervals) between two dates. For instance, between June 1st and June 2nd is exactly 1 elapsed day. If your legal contract or vacation booking requires inclusive counting (both boundary dates counted as whole days), use the Inclusive Days metric displayed in the results, which equals Elapsed Days + 1."
    },
    {
      question: "How are calendar months calculated when months have varying numbers of days?",
      answer: "Calendar month calculations honor standard Gregorian calendar boundaries. One full calendar month elapses between corresponding calendar day numbers (such as January 15th to February 15th), regardless of whether January has 31 days or February has 28 days. When an end month has fewer days than the start month (such as January 31st to February 28th), the residual days are adjusted according to the prior month's day count."
    },
    {
      question: "How does the date calculator handle leap years and February 29th?",
      answer: "The calculator natively enforces Gregorian leap year rules: a year is a leap year if divisible by 4, except for century years which must be divisible by 400. If your selected date span bridges February 29th (such as in 2024, 2028, or 2032), the extra intercalary leap day is automatically incorporated into the total day count."
    },
    {
      question: "What is the difference between calendar days and business days?",
      answer: "Calendar days encompass every successive 24-hour cycle including weekends (Saturdays and Sundays) and statutory national holidays. In contrast, business days (working days) exclude weekends and non-working holidays. A span of 14 calendar days typically corresponds to exactly 10 business days."
    },
    {
      question: "Why do simple millisecond subtraction formulas often fail around Daylight Saving Time?",
      answer: "When clocks spring forward or fall back for Daylight Saving Time (DST), calendar days can contain 23 or 25 local solar hours rather than exactly 24 hours. Naive division by 86,400,000 milliseconds without UTC time normalization can yield fractional truncation errors. CalcZoon normalizes all dates to UTC midnight to guarantee exact integer day accuracy."
    },
    {
      question: "What is the Julian Day Number (JDN) system used by astronomers and historians?",
      answer: "The Julian Day Number (JDN) is a continuous integer count of days elapsed since the beginning of the Julian Period (January 1, 4713 BCE). Astronomers, geodesists, and historical chronologists utilize JDN because it eliminates calendar discrepancies, month name variations, and leap year reform shifts when computing multi-century date spans."
    }
  ];

  const pageTitle = "Date Calculator: Days Between Two Dates & Duration 2026";
  const pageDescription = "Calculate exact days, weeks, months, and years between two dates. Handles leap years, inclusive and exclusive date counting, and Gregorian time intervals.";

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Date Calculator",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/lifestyle/date-calculator",
    "description": "High-precision online date calculator for counting days between dates, calendar intervals, leap years, and project timelines."
  };

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="/lifestyle/date-calculator"
        schema={[appSchema, {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": { "@type": "Answer", text: item.answer }
          }))
        }]}
      />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={CalendarDays} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white">Calculate Date Difference</CardTitle>
                <CardDescription>Select start date and end date to measure elapsed duration</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={calculateDifference} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate" className="text-slate-300 font-medium">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate" className="text-slate-300 font-medium">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                    Calculate Elapsed Duration
                  </Button>
                </form>
              </CardContent>
              {result && !result.error && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-800/30 border-t border-slate-700/40">
                  <div className="w-full space-y-4">
                    <h3 className="text-lg font-bold text-slate-300">Duration Results</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="text-center bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                        <p className="text-slate-300 text-sm font-medium">Total Days Elapsed</p>
                        <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                          {result.totalDays} Days
                        </p>
                        <p className="text-xs text-slate-500 mt-1">({result.inclusiveDays} days inclusive)</p>
                      </div>

                      <div className="text-center bg-slate-900/60 p-6 rounded-2xl border border-emerald-900/50">
                        <p className="text-slate-300 text-sm font-medium">Calendar Breakdown</p>
                        <p className="text-2xl font-bold text-emerald-400 mt-1">
                          {result.years > 0 ? `${result.years}y ` : ''}
                          {result.months > 0 ? `${result.months}m ` : ''}
                          {result.monthDays}d
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Years, Months, and Days</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-400">Expressed in Weeks</p>
                        <p className="font-semibold text-slate-200 mt-1">
                          {result.weeks} weeks {result.remainingDays > 0 ? `and ${result.remainingDays} days` : ''}
                        </p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-400">Approximate Hours</p>
                        <p className="font-semibold text-slate-200 mt-1">
                          {(result.totalDays * 24).toLocaleString()} Hours
                        </p>
                      </div>
                    </div>

                    <ShareResults
                      title="Date Difference Calculation"
                      text={`There are ${result.totalDays} days between ${startDate} and ${endDate}. Calculated via CalcZoon!`}
                      url="/lifestyle/date-calculator"
                    />
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
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" /> Time Reference Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-300 font-mono">
                <div className="pb-2 border-b border-slate-700/60">
                  <p className="text-emerald-400 font-bold">Standard Year:</p>
                  <p className="text-slate-300 mt-0.5">365 days = 52 weeks + 1 day</p>
                </div>
                <div className="pb-2 border-b border-slate-700/60">
                  <p className="text-sky-400 font-bold">Leap Year (intercalary):</p>
                  <p className="text-slate-300 mt-0.5">366 days (includes Feb 29)</p>
                </div>
                <div>
                  <p className="text-amber-400 font-bold">Average Month:</p>
                  <p className="text-slate-300 mt-0.5">30.4375 days (365.25 / 12)</p>
                </div>
              </CardContent>
            </Card>
            <RelatedTools category="lifestyle" />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,200 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10 mb-12">
          {/* Section 1: What is a Date Calculator */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Calendar className="text-emerald-400 w-7 h-7" /> What is a Date Calculator & The Gregorian Calendar System
            </h2>
            <p className="text-base md:text-lg">
              A <strong>date calculator</strong> is a chronological computational tool engineered to measure exact time intervals, calendar durations, and elapsed days between two specific calendar dates. Time tracking forms the structural architecture of human civilization—governing legal contracts, interest accrual periods in banking, project management milestones, gestational timelines, and statutory regulatory deadlines.
            </p>
            <p>
              The global civil standard is the <strong>Gregorian calendar</strong>, promulgated by Pope Gregory XIII in October 1582 to reform the older Julian calendar. Under the Julian system, the solar year was assumed to be exactly 365.25 days, causing the calendar to drift by approximately 11 minutes per year relative to the astronomical tropical year (365.2422 days). The Gregorian reform eliminated this cumulative drift by introducing the 400-year centurial leap year rule, creating the precise 365.2425-day average calendar cycle we rely upon today.
            </p>
          </div>

          {/* Section 2: Mathematical Algorithms for Date Interval Computation */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Mathematical Algorithms & Intercalary Leap Year Rules
            </h2>
            <p>
              Calculating the exact difference between two dates requires rigorous mathematical algorithms to handle uneven month lengths and intercalary leap days:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4 font-mono text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-800/40 space-y-2">
                <p className="text-emerald-400 font-bold uppercase tracking-wider">Rule 1: Gregorian Leap Year Axiom</p>
                <p className="text-white text-sm font-semibold">Leap = (Year % 4 == 0 &amp;&amp; Year % 100 != 0) || (Year % 400 == 0)</p>
                <p className="text-slate-400">1900 was not a leap year; 2000 was a leap year; 2024 and 2028 are leap years with 366 days.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-sky-800/40 space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider">Rule 2: UTC Epoch Day Difference</p>
                <p className="text-white text-sm font-semibold">Days = round(|UTC(End) − UTC(Start)| ÷ 86,400,000 ms)</p>
                <p className="text-slate-400">Normalizing dates to UTC midnight prevents errors from 23-hour or 25-hour Daylight Saving shifts.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-800/40 space-y-2">
                <p className="text-amber-400 font-bold uppercase tracking-wider">Rule 3: Calendar Breakdown (Y / M / D)</p>
                <p className="text-white text-sm font-semibold">Borrowing Days: Days += DaysInPriorMonth(EndM, EndY)</p>
                <p className="text-slate-400">Accounts for variable month lengths (28, 29, 30, or 31 days) when rolling back calendar days.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-purple-800/40 space-y-2">
                <p className="text-purple-400 font-bold uppercase tracking-wider">Rule 4: Financial Day-Count Conventions</p>
                <p className="text-white text-sm font-semibold">Actual/Actual vs Actual/360 vs 30/360</p>
                <p className="text-slate-400">Used in commercial paper and Treasury bond yield calculations to compute accrued interest.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Step-by-Step Practical Usage Guide */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Step-by-Step Guide: How to Calculate Exact Date Intervals
            </h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-white">Select the Originating Start Date:</strong> Use the native date picker to choose your baseline starting day, month, and year.
              </li>
              <li>
                <strong className="text-white">Select the Target End Date:</strong> Pick the concluding date. If the end date is earlier than the start date, our engine automatically inverts the order to calculate the absolute elapsed duration.
              </li>
              <li>
                <strong className="text-white">Click Calculate Elapsed Duration:</strong> The system computes total elapsed days, total elapsed weeks, and broken-down calendar years, months, and residual days.
              </li>
              <li>
                <strong className="text-white">Distinguish Elapsed vs Inclusive Days:</strong> For hotel stays, elapsed days represents the number of nights. For legal notices requiring the start date to count as Day 1, use the Inclusive Days metric.
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
                  <CheckCircle className="w-5 h-5" /> Example 1: Project Timeline Across a Leap Year
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> A software engineering contract commences on <strong>November 15, 2023</strong> and delivers on <strong>March 15, 2024</strong>. How many total calendar days elapse, accounting for the 2024 leap year?
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Nov 15 – Nov 30: 15 days remaining in November</p>
                  <p>2. Full Dec 2023: 31 days</p>
                  <p>3. Full Jan 2024: 31 days</p>
                  <p>4. Full Feb 2024 (Leap Year!): 29 days</p>
                  <p>5. Mar 1 – Mar 15: 15 days</p>
                  <p className="text-emerald-400 font-bold">Total Elapsed Days: 15 + 31 + 31 + 29 + 15 = 121 Days</p>
                </div>
                <p className="text-xs text-slate-400">
                  Expressed in calendar months: exactly 4 calendar months (Nov 15 to Mar 15).
                </p>
              </div>

              <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-lg">
                  <Clock className="w-5 h-5" /> Example 2: Financial Commercial Paper Interest Accrual
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> A $500,000 short-term commercial loan at 6.0% annual interest runs from <strong>April 10, 2026</strong> to <strong>July 25, 2026</strong> under an Actual/360 day-count convention.
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Elapsed Days: Apr (20d) + May (31d) + Jun (30d) + Jul (25d) = 106 Days</p>
                  <p>2. Daily Interest Rate: 0.06 ÷ 360 = 0.00016667</p>
                  <p>3. Interest: $500,000 × 0.06 × (106 ÷ 360)</p>
                  <p className="text-sky-400 font-bold">Accrued Interest: $8,833.33</p>
                </div>
                <p className="text-xs text-slate-400">
                  An error of even one day in calendar tracking shifts loan interest by $83.33.
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
                <p className="font-bold text-white">1. The Fencepost Error (Exclusive vs Inclusive Counting)</p>
                <p>
                  One of the most frequent errors in legal filings and warranty calculations is confusing the number of posts with the number of sections. If an employee takes leave from Monday (Day 1) through Friday (Day 5), the elapsed difference is 4 days ($5 - 1 = 4$), but the inclusive working days count is 5 days ($4 + 1$).
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-rose-500 space-y-1">
                <p className="font-bold text-white">2. Assuming All Months Have 30 Days</p>
                <p>
                  Multiplying months by 30 to approximate days leads to severe compounding errors over multi-month spans. July and August both contain 31 days consecutively, while February has 28 (or 29) days. Always compute exact calendar dates.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-sky-500 space-y-1">
                <p className="font-bold text-white">3. Ignoring Daylight Saving Time Offsets</p>
                <p>
                  When computer scripts naively divide local timestamp differences by 86,400,000 ms, a 23-hour spring daylight saving shift will yield 0.958 days, which can round down to 0 days if using `Math.floor`. Using UTC normalization eliminates this hazard.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: In-Depth FAQ Component */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <HelpCircle className="text-sky-400 w-7 h-7" /> Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-sm">
              Detailed answers regarding date arithmetic, calendar history, leap days, and international conventions.
            </p>
          </div>

          <Faq items={faqItems} className="mt-4" />

          {/* Section 7: Academic References & Companion Tools */}
          <div className="space-y-4 pt-6 border-t border-slate-700/60">
            <h3 className="text-xl font-bold text-white">Chronological Standards, References & Companion Tools</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calendar date algorithms conform to the international standard <strong>ISO 8601:2019</strong> (Data elements and interchange formats — Representation of dates and times) and astronomical time scales maintained by the <em>International Earth Rotation and Reference Systems Service (IERS)</em> and the <em>US Naval Observatory</em>.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/lifestyle/age-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Age Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/financial/loan-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Loan & Amortization Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/math/percentage-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Percentage Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/lifestyle/fuel-cost-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Fuel Cost Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <Disclaimer text="This date calculator computes mathematical and calendar durations between dates. For legal notice periods, court filings, or statutory taxation deadlines, confirm local jurisdiction rules regarding business days, weekend rollovers, and public holidays." />
      </div>
    </>
  );
};

export default DateCalculator;

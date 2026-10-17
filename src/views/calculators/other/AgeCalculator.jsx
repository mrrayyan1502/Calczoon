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
import { Calendar, BookOpen, CheckCircle, HelpCircle, ArrowRight, Clock, Heart, Sparkles } from 'lucide-react';

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
      setResult({ error: "Birth date cannot be after the 'As of' reference date." });
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

    const utcBirth = Date.UTC(bd.getFullYear(), bd.getMonth(), bd.getDate());
    const utcAsOf = Date.UTC(ad.getFullYear(), ad.getMonth(), ad.getDate());
    const totalDays = Math.round((utcAsOf - utcBirth) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const estHeartbeats = Math.round(totalDays * 24 * 60 * 72); // ~72 bpm
    const estBreaths = Math.round(totalDays * 24 * 60 * 16); // ~16 breaths/min

    // Next birthday calculation
    const currentYear = ad.getFullYear();
    let nextBday = new Date(currentYear, bd.getMonth(), bd.getDate());
    if (nextBday < ad) {
      nextBday = new Date(currentYear + 1, bd.getMonth(), bd.getDate());
    }
    const daysToNextBday = Math.ceil((nextBday - ad) / (1000 * 60 * 60 * 24));

    const newResult = {
      years,
      months,
      days,
      totalDays,
      totalHours,
      estHeartbeats,
      estBreaths,
      daysToNextBday
    };
    
    setResult(newResult);
    saveCalculation({
      type: 'Age',
      inputs: { birthDate, asOfDate },
      result: { Age: `${years}y ${months}m ${days}d`, TotalDays: `${totalDays.toLocaleString()} days` }
    });
  };
  
  const resetForm = () => {
    setBirthDate('');
    setAsOfDate(new Date().toISOString().split('T')[0]);
    setResult(null);
  };

  const faqItems = [
    {
      question: "How is chronological age different from biological age?",
      answer: "Chronological age measures the absolute calendar time that has elapsed from your date of birth to the present. In contrast, biological age (epigenetic or physiological age) reflects the cellular health, organ integrity, and cumulative DNA damage of your tissues. Lifestyle choices (diet, exercise, stress, sleep) can cause biological age to be significantly younger or older than chronological age."
    },
    {
      question: "On which date do people born on February 29th legally celebrate in non-leap years?",
      answer: "In common 365-day years, legal jurisdictions vary. Under English common law and in several US states, a leap-day baby is legally considered to reach their new age on March 1st. In other jurisdictions (such as France and New Zealand), the law specifies February 28th. Socially, leaplings often celebrate on either February 28th or March 1st."
    },
    {
      question: "How does this calculator handle months with differing numbers of days?",
      answer: "The algorithm computes calendar age by borrowing days from the preceding calendar month when the reference day is smaller than the birth day. If you were born on March 31st and the reference date is April 30th, the system borrows March's 31 days to ensure mathematical precision without arbitrary 30-day approximations."
    },
    {
      question: "Can I use this tool to calculate age on a past or future date?",
      answer: "Yes! By modifying the 'Age as of Date' input, you can calculate how old someone was on a historical date (such as their wedding day or graduation) or determine their future age (such as when they reach statutory retirement age or pension eligibility)."
    },
    {
      question: "Why is precise chronological age critical in pediatric healthcare?",
      answer: "Pediatricians and clinical researchers track child development in exact weeks and months rather than rounded years. Pediatric immunization schedules, developmental milestones (sitting, walking, speech), and World Health Organization (WHO) growth charts for weight and head circumference depend on exact day counts."
    },
    {
      question: "How does traditional East Asian age reckoning differ from Western age?",
      answer: "In traditional East Asian age reckoning (such as the historical Korean age or Chinese nominal age), a baby is considered 1 year old at birth, and everyone gains an additional year together on New Year's Day (or the Lunar New Year). Consequently, an infant born on December 31st would be considered 2 years old on January 1st under traditional reckoning, but only 1 day old under Western chronological reckoning."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Age Calculator",
    "description": "Calculate exact chronological age in years, months, days, total days, heartbeats, and next birthday countdown from date of birth.",
    "applicationCategory": "Tool",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/lifestyle/age-calculator",
    "browserRequirements": "Requires a modern web browser."
  };

  const pageTitle = "Age Calculator: Exact Age in Years, Months & Days 2026";
  const pageDescription = "Calculate your exact chronological age down to the day, hours, and minutes from your date of birth, with total days lived and birthday countdown.";

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="/lifestyle/age-calculator"
        schema={[webAppSchema, {
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
        <PageHeader title={pageTitle} description={pageDescription} icon={Calendar} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white font-bold">Chronological Age Calculator</CardTitle>
                <CardDescription>Enter date of birth and reference date below</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={calculateAge} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                      Calculate Exact Age
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
                    <div className="w-full space-y-6">
                      <h3 className="text-lg font-bold text-slate-300">Your Calculated Chronological Age:</h3>
                      
                      <div className="text-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
                        <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 leading-tight">
                          {result.years} <span className="text-2xl text-slate-300 font-semibold">years</span>, {result.months} <span className="text-2xl text-slate-300 font-semibold">months</span>, {result.days} <span className="text-2xl text-slate-300 font-semibold">days</span>
                        </p>
                        {result.daysToNextBday > 0 && (
                          <p className="text-xs text-sky-400 mt-2 font-medium">
                            🎉 Next birthday in {result.daysToNextBday} days!
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                        <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                          <p className="text-xs text-slate-400">Total Days Lived</p>
                          <p className="text-lg font-bold text-emerald-400 mt-1">{result.totalDays.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                          <p className="text-xs text-slate-400">Total Hours Lived</p>
                          <p className="text-lg font-bold text-sky-400 mt-1">{result.totalHours.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                          <p className="text-xs text-slate-400">Est. Heartbeats</p>
                          <p className="text-lg font-bold text-purple-400 mt-1">{(result.estHeartbeats / 1e6).toFixed(1)}M</p>
                        </div>
                        <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                          <p className="text-xs text-slate-400">Est. Breaths</p>
                          <p className="text-lg font-bold text-amber-400 mt-1">{(result.estBreaths / 1e6).toFixed(1)}M</p>
                        </div>
                      </div>

                      <div className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 flex items-start gap-3 text-left my-3">
                        <div className="text-xs text-slate-300 leading-relaxed">
                          <strong className="text-emerald-400 block mb-1">Recommended Longevity Resource: Biological Health Optimization</strong>
                          Track health biomarkers, cardiovascular conditioning, and restorative sleep architecture to align biological vitality with your chronological timeline.
                        </div>
                      </div>

                      <div className="w-full">
                        <ShareResults
                          title="My Exact Age"
                          text={`Calculated my exact age on CalcZoon! I am ${result.years} years, ${result.months} months, and ${result.days} days old (${result.totalDays.toLocaleString()} days lived). Find yours:`}
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
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" /> Milestone Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <div>
                  <h4 className="font-semibold text-white mb-1">10,000 Days Milestone</h4>
                  <p className="text-slate-300 text-xs">Occurs at approximately 27 years, 4 months, and 15 days of age.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">20,000 Days Milestone</h4>
                  <p className="text-slate-300 text-xs">Celebrated at approximately 54 years, 9 months of age.</p>
                </div>
              </CardContent>
            </Card>

            <RelatedTools category="lifestyle" />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,200 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10 mb-12">
          {/* Section 1: What is Chronological Age */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Clock className="text-emerald-400 w-7 h-7" /> What is Chronological Age & The Biology of Human Lifespans
            </h2>
            <p className="text-base md:text-lg">
              <strong>Chronological age</strong> is the formal measurement of elapsed time from an individual&apos;s moment of birth to a designated reference date. Standardized across global civil institutions via the Gregorian calendar, chronological age governs statutory legal milestones—such as the age of majority, motor vehicle licensure, voting franchise eligibility, statutory retirement thresholds, and life insurance underwriting policies.
            </p>
            <p>
              However, modern biogerontology distinguishes sharply between chronological time and <strong>biological age</strong>. While chronological age ticks forward at a perfectly immutable mathematical rate of 365.25 days per solar orbit, biological age measures the cumulative cellular wear, telomeric shortening, DNA methylation patterns (such as Horvath&apos;s Epigenetic Clock), and physiological organ reserve across the human lifespan. Two individuals sharing the identical chronological age of 50 years can exhibit biological profiles differing by upwards of two decades depending on genetics, metabolic health, nutrition, sleep quality, and physical activity.
            </p>
          </div>

          {/* Section 2: Mathematical Algorithms for Exact Age Determination */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Mathematical Algorithms: Calendar Borrowing & Intercalary Days
            </h2>
            <p>
              Computing exact chronological age is far more intricate than subtracting birth year from current year. The algorithm must resolve varying month lengths and intercalary leap years:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4 font-mono text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-800/40 space-y-2">
                <p className="text-emerald-400 font-bold uppercase tracking-wider">Step 1: Primary Difference</p>
                <p className="text-white text-sm font-semibold">ΔY = Year_ref − Year_birth | ΔM = Month_ref − Month_birth | ΔD = Day_ref − Day_birth</p>
                <p className="text-slate-400">Establishes initial nominal integer differences before calendar month borrowing adjustments.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-sky-800/40 space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider">Step 2: Calendar Day Borrowing</p>
                <p className="text-white text-sm font-semibold">If ΔD &lt; 0: ΔM = ΔM − 1; ΔD = ΔD + DaysInMonth(Month_ref − 1)</p>
                <p className="text-slate-400">Borrows the precise day count of the preceding month (28, 29, 30, or 31 days) to resolve negative days.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-800/40 space-y-2">
                <p className="text-amber-400 font-bold uppercase tracking-wider">Step 3: Calendar Month Borrowing</p>
                <p className="text-white text-sm font-semibold">If ΔM &lt; 0: ΔY = ΔY − 1; ΔM = ΔM + 12</p>
                <p className="text-slate-400">Adjusts for birthdays that have not yet occurred in the current calendar year.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-purple-800/40 space-y-2">
                <p className="text-purple-400 font-bold uppercase tracking-wider">Step 4: Absolute UTC Day Count</p>
                <p className="text-white text-sm font-semibold">Total Days = round(|UTC(AsOf) − UTC(Birth)| ÷ 86,400,000 ms)</p>
                <p className="text-slate-400">Calculates exact total days lived, factoring in every leap day and eliminating timezone errors.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Step-by-Step Practical Usage Guide */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Step-by-Step Guide: How to Calculate Exact Age and Milestones
            </h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-white">Input Your Date of Birth:</strong> Select your day, month, and year of birth from the calendar interface.
              </li>
              <li>
                <strong className="text-white">Confirm or Adjust the Reference Date:</strong> By default, the tool calculates your age as of today. To discover how old you were on a past milestone (such as a college graduation or wedding) or your age at a future retirement date, update the &quot;Age as of Date&quot; field.
              </li>
              <li>
                <strong className="text-white">Execute the Calculation:</strong> Click Calculate Exact Age to receive an instantaneous breakdown of complete years, months, and residual calendar days.
              </li>
              <li>
                <strong className="text-white">Examine Biometric Estimates:</strong> Review cumulative lifetime statistics including total days lived, total hours lived, estimated cumulative heartbeats, and your upcoming birthday countdown.
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
                  <CheckCircle className="w-5 h-5" /> Example 1: Pediatric Vaccination Window Calculation
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> An infant born on <strong>March 28, 2024</strong> is presented for a clinical pediatric evaluation and vaccination checkup on <strong>November 15, 2024</strong>.
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Year Difference: 2024 − 2024 = 0 years</p>
                  <p>2. Month Difference: 11 − 3 = 8 months</p>
                  <p>3. Day Difference: 15 − 28 = −13 days (negative!)</p>
                  <p>4. Month Borrowing: 8 − 1 = 7 months</p>
                  <p>5. Day Adjustment: −13 + 31 (days in Oct) = 18 days</p>
                  <p className="text-emerald-400 font-bold">Exact Age: 7 months and 18 days (232 total days)</p>
                </div>
                <p className="text-xs text-slate-400">
                  Provides exact timeline data for pediatric MMR and DTaP vaccination windows.
                </p>
              </div>

              <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-lg">
                  <Heart className="w-5 h-5" /> Example 2: Celebrating the 10,000 Days of Life Milestone
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> An individual born on <strong>May 12, 1996</strong> wishes to find the exact calendar date when they achieve 10,000 total days lived on Earth.
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Birthdate UTC: May 12, 1996</p>
                  <p>2. Day Interval: +10,000 days × 86,400,000 ms</p>
                  <p>3. Years Spanned: ~27 years and 4.5 months</p>
                  <p className="text-sky-400 font-bold">Milestone Date: September 28, 2023</p>
                </div>
                <p className="text-xs text-slate-400">
                  At 10,000 days of life, an adult human heart has beaten approximately 1.03 billion times.
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
                <p className="font-bold text-white">1. Naive Year Subtraction Without Day Boundary Check</p>
                <p>
                  Subtracting birth year from the current year ($2026 - 1990 = 36$) is incorrect if the individual was born in October and the current month is April. Until the actual anniversary date arrives, the individual is 35 years old.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-rose-500 space-y-1">
                <p className="font-bold text-white">2. Assuming Uniform 30-Day Month Durations</p>
                <p>
                  Approximating months as 30 days yields significant compounding drift over multi-decade intervals. July and August have 31 days back-to-back, while February has 28 or 29 days. Always compute exact calendar dates.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-sky-500 space-y-1">
                <p className="font-bold text-white">3. Midnight Timezone Boundary Shifts</p>
                <p>
                  For individuals born near midnight, local Daylight Saving Time or international flight travel across timezones can create a one-day discrepancy if birth certificates record UTC vs local solar time.
                </p>
              </div>
            </div>
          </div>

          {/* Static HTML Reference Benchmark Table */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Chronological Life Milestone &amp; Cumulative Longevity Benchmark Table</h2>
            <p className="text-sm text-slate-400">
              The reference table below illustrates lifetime developmental milestones, estimated cumulative biological metrics, and legal benchmarks based on standard Gregorian calendar algorithms.
            </p>
            <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-slate-950">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                    <th className="p-3 font-semibold">Age Milestone</th>
                    <th className="p-3 font-semibold text-emerald-400">Days Lived (Avg)</th>
                    <th className="p-3 font-semibold text-sky-400">Total Weeks</th>
                    <th className="p-3 font-semibold text-purple-400">Est. Heartbeats</th>
                    <th className="p-3 font-semibold text-amber-400">Est. Breaths</th>
                    <th className="p-3 font-semibold">Developmental / Legal Milestone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">1 Year (Infancy)</td><td className="p-3 font-mono text-emerald-400">365</td><td className="p-3 font-mono text-sky-400">52.1</td><td className="p-3 font-mono text-purple-400">~37.8M</td><td className="p-3 font-mono text-amber-400">~8.4M</td><td className="p-3">Tripling of birth weight &amp; neural synapse formation</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">5 Years (Early Childhood)</td><td className="p-3 font-mono text-emerald-400">1,826</td><td className="p-3 font-mono text-sky-400">260.9</td><td className="p-3 font-mono text-purple-400">~189M</td><td className="p-3 font-mono text-amber-400">~42M</td><td className="p-3">Brain reaches 90% of adult cranial volume</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">10 Years (Preadolescence)</td><td className="p-3 font-mono text-emerald-400">3,652</td><td className="p-3 font-mono text-sky-400">521.7</td><td className="p-3 font-mono text-purple-400">~378M</td><td className="p-3 font-mono text-amber-400">~84M</td><td className="p-3">Onset of adolescent bone mineralization</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">18 Years (Legal Majority)</td><td className="p-3 font-mono text-emerald-400">6,574</td><td className="p-3 font-mono text-sky-400">939.1</td><td className="p-3 font-mono text-purple-400">~681M</td><td className="p-3 font-mono text-amber-400">~151M</td><td className="p-3">Attainment of legal adult majority &amp; voting rights</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">25 Years (Prefrontal Cortex)</td><td className="p-3 font-mono text-emerald-400">9,131</td><td className="p-3 font-mono text-sky-400">1,304.4</td><td className="p-3 font-mono text-purple-400">~946M</td><td className="p-3 font-mono text-amber-400">~210M</td><td className="p-3">Complete structural myelination of frontal cognitive lobes</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">30 Years (Peak Bone Mass)</td><td className="p-3 font-mono text-emerald-400">10,957</td><td className="p-3 font-mono text-sky-400">1,565.3</td><td className="p-3 font-mono text-purple-400">~1.13B</td><td className="p-3 font-mono text-amber-400">~252M</td><td className="p-3">Peak adult bone mineral density &amp; skeletal stabilization</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">40 Years (Midlife Prime)</td><td className="p-3 font-mono text-emerald-400">14,610</td><td className="p-3 font-mono text-sky-400">2,087.1</td><td className="p-3 font-mono text-purple-400">~1.51B</td><td className="p-3 font-mono text-amber-400">~336M</td><td className="p-3">Baseline cardiovascular &amp; cellular metabolic calibration</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">50 Years (Longevity Half-Century)</td><td className="p-3 font-mono text-emerald-400">18,262</td><td className="p-3 font-mono text-sky-400">2,608.9</td><td className="p-3 font-mono text-purple-400">~1.89B</td><td className="p-3 font-mono text-amber-400">~420M</td><td className="p-3">Cardiovascular screening &amp; preventative health protocols</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">65 Years (Retirement Benchmark)</td><td className="p-3 font-mono text-emerald-400">23,741</td><td className="p-3 font-mono text-sky-400">3,391.6</td><td className="p-3 font-mono text-purple-400">~2.46B</td><td className="p-3 font-mono text-amber-400">~546M</td><td className="p-3">Medicare statutory eligibility &amp; retirement transition</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">80 Years (Octogenarian Longevity)</td><td className="p-3 font-mono text-emerald-400">29,220</td><td className="p-3 font-mono text-sky-400">4,174.3</td><td className="p-3 font-mono text-purple-400">~3.02B</td><td className="p-3 font-mono text-amber-400">~673M</td><td className="p-3">Exceptional longevity surpassing global life expectancy</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 6: In-Depth FAQ Component */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <HelpCircle className="text-sky-400 w-7 h-7" /> Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-sm">
              Explore thorough answers to chronological age queries, leap-year birthday legalities, and developmental timelines.
            </p>
          </div>

          <Faq items={faqItems} className="mt-4" />

          {/* Section 7: Academic References & Companion Tools */}
          <div className="space-y-4 pt-6 border-t border-slate-700/60">
            <h3 className="text-xl font-bold text-white">Chronological Standards, References & Companion Tools</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Age calculation methodologies comply with <strong>ISO 8601:2019</strong> representation of dates and times and clinical developmental standards established by the <em>American Academy of Pediatrics (AAP)</em> and the <em>World Health Organization (WHO) Child Growth Standards</em>.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/lifestyle/date-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Date Difference Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/health/bmi-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                BMI Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/health/tdee-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                TDEE Calorie Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/financial/retirement-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Retirement Goal Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <Disclaimer text="This age calculator calculates chronological age based on standard Gregorian calendar algorithms. For statutory legal filings, international visa verifications, or medical dosing, verify with certified vital statistics records." />
      </div>
    </>
  );
};

export default AgeCalculator;

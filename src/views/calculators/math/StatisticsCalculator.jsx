'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { saveCalculation } from '@/lib/history';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';
import { BarChart2, BookOpen, ShieldAlert, CheckCircle2, HelpCircle } from 'lucide-react';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { Link } from 'react-router-dom';

const StatisticsCalculator = () => {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState(null);

  const calculateStatistics = (e) => {
    e.preventDefault();
    if (!numbers.trim()) {
      setResult({ error: "Please enter a dataset of numbers." });
      return;
    }

    const numArray = numbers
      .split(/[,\s\n\t]+/)
      .map((num) => parseFloat(num.trim()))
      .filter((num) => !isNaN(num));

    if (numArray.length < 2) {
      setResult({ error: "Please enter at least 2 valid numbers separated by commas or spaces." });
      return;
    }

    const sortedArray = [...numArray].sort((a, b) => a - b);
    const n = numArray.length;
    const sum = numArray.reduce((acc, num) => acc + num, 0);
    const mean = sum / n;

    // Median
    let median;
    if (n % 2 === 0) {
      const mid1 = sortedArray[n / 2 - 1];
      const mid2 = sortedArray[n / 2];
      median = (mid1 + mid2) / 2;
    } else {
      median = sortedArray[Math.floor(n / 2)];
    }

    // Mode
    const frequencyMap = {};
    numArray.forEach((num) => {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    });
    let maxFreq = 0;
    for (const key in frequencyMap) {
      if (frequencyMap[key] > maxFreq) {
        maxFreq = frequencyMap[key];
      }
    }

    const modes = [];
    if (maxFreq > 1) {
      for (const key in frequencyMap) {
        if (frequencyMap[key] === maxFreq) {
          modes.push(parseFloat(key));
        }
      }
    }

    const range = sortedArray[n - 1] - sortedArray[0];
    
    // Sample Variance (Bessel's correction n - 1)
    const sumSquaredDiffs = numArray.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0);
    const sampleVariance = sumSquaredDiffs / (n - 1);
    const sampleStdDev = Math.sqrt(sampleVariance);

    // Population Variance (divide by n)
    const popVariance = sumSquaredDiffs / n;
    const popStdDev = Math.sqrt(popVariance);

    const newResult = {
      count: n,
      sum: sum,
      mean: mean.toFixed(4),
      median: median.toLocaleString(undefined, { maximumFractionDigits: 4 }),
      mode: modes.length > 0 && modes.length < n ? modes.join(', ') : 'No unique mode',
      range: range.toLocaleString(undefined, { maximumFractionDigits: 4 }),
      sampleStdDev: sampleStdDev.toFixed(4),
      popStdDev: popStdDev.toFixed(4),
      sampleVariance: sampleVariance.toFixed(4),
      min: sortedArray[0],
      max: sortedArray[n - 1],
    };

    setResult(newResult);
    saveCalculation({
      type: 'Descriptive Statistics',
      inputs: { 'Data Count': n, 'Sample Input': numbers.slice(0, 40) + '...' },
      result: { Mean: newResult.mean, Median: newResult.median, 'Sample Std Dev': newResult.sampleStdDev }
    });
  };

  const resetForm = () => {
    setNumbers('');
    setResult(null);
  };

  const pageTitle = "Statistics Calculator: Mean, Median, Mode & Standard Deviation | CalcZoon";
  const pageDescription = "Calculate sample mean, median, mode, sample & population standard deviation, variance, and range with step-by-step statistical formulas.";
  const canonicalUrl = "https://calczoon.com/math/statistics-calculator";

  const faqItems = [
    {
      question: "What is the difference between Mean, Median, and Mode?",
      answer: "Mean is the mathematical average (sum of all values divided by count n). Median is the middle observation when values are arranged in ascending order, dividing the dataset into two equal halves. Mode is the value that appears with the highest frequency. When data contains extreme outliers or skewness, the median offers a much more accurate representation of central tendency than the mean."
    },
    {
      question: "Why does Sample Standard Deviation divide by (n − 1) instead of n?",
      answer: "Dividing by (n − 1) is known as Bessel's Correction. In inferential statistics, calculating variance using sample mean (x̄) slightly underestimates true population variance because sample observations cluster closer to their sample mean than to the true unknown population mean (μ). Dividing by (n − 1) mathematically removes this negative bias."
    },
    {
      question: "What does Standard Deviation communicate about data spread?",
      answer: "Standard deviation quantifies the average dispersion of data points around the mean. In a normal bell-curve distribution (Gaussian): approximately 68.2% of all data points fall within ±1 standard deviation of the mean, 95.4% fall within ±2 standard deviations, and 99.7% fall within ±3 standard deviations (the Empirical Rule)."
    },
    {
      question: "When should I report Median instead of Mean?",
      answer: "Always report median for skewed distributions containing extreme outliers—such as household incomes, house sale prices, or website response latencies. For example, if nine people earn $50,000 and one person earns $5,000,000, the mean salary is $545,000 (misleading), while the median is $50,000 (accurately representative)."
    },
    {
      question: "What is the difference between Sample Variance and Population Variance?",
      answer: "Population variance (σ²) is computed when you possess measurements for every single member of the target group (dividing by N). Sample variance (s²) is computed when you measure a subset or sample drawn from a larger population (dividing by n − 1 with Bessel's correction to prevent variance underestimation)."
    },
    {
      question: "What does it mean if a dataset has 'No Unique Mode' or is 'Bimodal'?",
      answer: "If all numbers appear with equal frequency (e.g. 2, 4, 6, 8), no value is more frequent than any other, resulting in 'No Mode'. If two distinct values tie for the highest frequency, the distribution is Bimodal, indicating two separate clustering peaks (such as shoe sizes across a combined male and female group)."
    }
  ];

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} canonicalUrl={canonicalUrl} />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader
          title="Descriptive Statistics Calculator"
          description="Analyze datasets to compute sample and population mean, median, mode, range, variance, and standard deviation with Bessel's correction."
          icon={BarChart2}
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-xl">Enter Dataset Values</CardTitle>
                <CardDescription className="text-slate-300">
                  Input numbers separated by commas, spaces, or line breaks (e.g., 12, 15, 18, 22, 25, 30).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateStatistics} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="numbers" className="text-slate-300">Numeric Data Values</Label>
                    <Textarea
                      id="numbers"
                      value={numbers}
                      onChange={(e) => setNumbers(e.target.value)}
                      placeholder="e.g., 4, 8, 6, 5, 3, 8, 9, 12, 15"
                      rows={4}
                      className="bg-slate-900 border-slate-700 text-white font-mono text-base"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-slate-950 font-bold h-12 text-base">
                      Compute Statistical Summary
                    </Button>
                    <Button variant="outline" onClick={resetForm} className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 h-12">
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>

              {result && (
                <CardFooter className="flex flex-col items-center justify-center p-6 bg-slate-900/80 border-t border-slate-700 rounded-b-lg">
                  {result.error ? (
                    <p className="text-rose-400 text-center w-full font-medium">{result.error}</p>
                  ) : (
                    <div className="w-full space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                          <span className="text-xs text-slate-400 block mb-1">Mean (Average)</span>
                          <span className="text-2xl font-black text-emerald-400 font-mono">{result.mean}</span>
                        </div>
                        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                          <span className="text-xs text-slate-400 block mb-1">Median (Middle)</span>
                          <span className="text-2xl font-black text-sky-400 font-mono">{result.median}</span>
                        </div>
                        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                          <span className="text-xs text-slate-400 block mb-1">Mode</span>
                          <span className="text-lg font-bold text-amber-300 truncate block mt-1">{result.mode}</span>
                        </div>
                        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                          <span className="text-xs text-slate-400 block mb-1">Sample Count (n)</span>
                          <span className="text-2xl font-black text-white font-mono">{result.count}</span>
                        </div>
                      </div>

                      <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 text-xs font-mono space-y-2">
                        <div className="flex justify-between pb-1.5 border-b border-slate-700">
                          <span className="text-slate-400">Sample Standard Deviation (s, n−1):</span>
                          <span className="font-bold text-emerald-300 text-sm">{result.sampleStdDev}</span>
                        </div>
                        <div className="flex justify-between pb-1.5 border-b border-slate-700">
                          <span className="text-slate-400">Population Standard Deviation (σ, n):</span>
                          <span className="font-bold text-white text-sm">{result.popStdDev}</span>
                        </div>
                        <div className="flex justify-between pb-1.5 border-b border-slate-700">
                          <span className="text-slate-400">Sample Variance (s²):</span>
                          <span className="font-bold text-white">{result.sampleVariance}</span>
                        </div>
                        <div className="flex justify-between pb-1.5 border-b border-slate-700">
                          <span className="text-slate-400">Range (Max − Min):</span>
                          <span className="font-bold text-white">{result.range} (from {result.min} to {result.max})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Sum of All Values (Σx):</span>
                          <span className="font-bold text-white">{result.sum.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <ShareResults
                          title="Statistics Summary"
                          text={`I computed a statistical analysis on CalcZoon: Mean = ${result.mean}, Median = ${result.median}, Sample Std Dev = ${result.sampleStdDev}!`}
                          url="/math/statistics-calculator"
                        />
                      </div>
                    </div>
                  )}
                </CardFooter>
              )}
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" /> Statistical Formulas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-300 font-mono">
                <div className="pb-2 border-b border-slate-700/60">
                  <p className="text-emerald-400 font-bold">Sample Mean (x̄):</p>
                  <p className="text-slate-300 mt-0.5">x̄ = (Σx) ÷ n</p>
                </div>
                <div className="pb-2 border-b border-slate-700/60">
                  <p className="text-sky-400 font-bold">Sample Variance (s²):</p>
                  <p className="text-slate-300 mt-0.5">s² = Σ(x − x̄)² ÷ (n − 1)</p>
                </div>
                <div>
                  <p className="text-amber-400 font-bold">Standard Deviation (s):</p>
                  <p className="text-slate-300 mt-0.5">s = √[s²]</p>
                </div>
              </CardContent>
            </Card>
            <RelatedTools />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,150 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10 mb-12">
          {/* Section 1: What is Descriptive Statistics */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <BarChart2 className="text-emerald-400 w-7 h-7" /> What is the Statistics Calculator & Principles of Descriptive Statistics
            </h2>
            <p className="text-base md:text-lg">
              The <strong>Statistics Calculator</strong> is a rigorous data analysis engine engineered to summarize, organize, and describe numerical datasets through standard mathematical parameters of <strong>Central Tendency</strong> (Mean, Median, Mode) and <strong>Statistical Dispersion</strong> (Range, Variance, Standard Deviation). In empirical research, descriptive statistics serve as the initial diagnostic layer before deploying inferential hypothesis tests.
            </p>
            <p>
              Raw datasets—whether representing laboratory blood pressure readings, manufacturing tolerance margins, financial equity returns, or school exam scores—are unwieldy in isolation. By collapsing raw numbers into standardized summary metrics, analysts can characterize the central location of the data and quantify the degree of variability or uncertainty surrounding that center.
            </p>
          </div>

          {/* Section 2: Mathematical Formulas & Bessel's Correction */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Mathematical Formulations & Bessel's Correction Proof
            </h2>
            <p>
              Our statistical algorithms strictly observe academic standards established by the American Statistical Association:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4 font-mono text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-800/40 space-y-2">
                <p className="text-emerald-400 font-bold uppercase tracking-wider">Arithmetic Mean Equation</p>
                <p className="text-white text-sm font-semibold">x̄ = (1/n) × Σᵢ₌₁ⁿ xᵢ</p>
                <p className="text-slate-400">Sum of all observed numerical values divided by total count n.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-sky-800/40 space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider">Sample Variance (Bessel's Correction)</p>
                <p className="text-white text-sm font-semibold">s² = [1 / (n − 1)] × Σᵢ₌₁ⁿ (xᵢ − x̄)²</p>
                <p className="text-slate-400">Divides sum of squared errors by (n − 1) to eliminate negative bias in sample estimation.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-800/40 space-y-2">
                <p className="text-amber-400 font-bold uppercase tracking-wider">Sample Standard Deviation</p>
                <p className="text-white text-sm font-semibold">s = √[s²]</p>
                <p className="text-slate-400">Square root of variance, restoring dispersion into the original unit of measurement.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-purple-800/40 space-y-2">
                <p className="text-purple-400 font-bold uppercase tracking-wider">Median Positioning Algorithm</p>
                <p className="text-white text-sm font-semibold">Odd: x_[(n+1)/2] &nbsp;|&nbsp; Even: ½[x_(n/2) + x_(n/2 + 1)]</p>
                <p className="text-slate-400">Identifies true 50th percentile rank from sorted array without parametric assumptions.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Step-by-Step Usage Guide */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Step-by-Step Guide: How to Compute Descriptive Statistics
            </h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-white">Step 1: Input Your Dataset Values:</strong> Enter raw numerical values into the input field separated by commas, spaces, or tabs.
              </li>
              <li>
                <strong className="text-white">Step 2: Verify Count and Extremes:</strong> Check the resulting count ($n$), minimum, and maximum to ensure no typo data points were erroneously entered.
              </li>
              <li>
                <strong className="text-white">Step 3: Compare Mean Against Median:</strong> If the Mean is significantly higher than the Median, your distribution is positively skewed by high outliers. If Mean is lower, it is negatively skewed.
              </li>
              <li>
                <strong className="text-white">Step 4: Use Sample Standard Deviation (s) for Surveys & Experiments:</strong> When your data represents a sample of a broader population, always report the sample standard deviation ($n-1$).
              </li>
              <li>
                <strong className="text-white">Step 5: Apply the Empirical 68-95-99.7 Rule:</strong> If the data follows a bell curve, expect roughly 68% of all future samples to fall within Mean ± 1 SD.
              </li>
            </ol>
          </div>

          {/* Section 4: Real-World Numerical Worked Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Real-World Numerical Worked Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-bold">Case Study 1</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Exam Performance</span>
                </div>
                <h3 className="text-lg font-bold text-white">Dataset: 72, 75, 78, 82, 85, 88, 92</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Count (n):</strong> 7 students</li>
                  <li><strong>Sum (Σx):</strong> 572</li>
                  <li><strong>Mean:</strong> 572 ÷ 7 = <span className="text-emerald-400 font-bold">81.71</span></li>
                  <li><strong>Sorted Array:</strong> [72, 75, 78, <strong>82</strong>, 85, 88, 92]</li>
                  <li><strong>Median:</strong> Middle observation = <span className="text-sky-400 font-bold">82.00</span></li>
                  <li><strong>Sum of Squared Deviations:</strong> 317.43</li>
                  <li><strong>Sample Std Dev (n−1 = 6):</strong> √(317.43 ÷ 6) = <span className="text-amber-300 font-bold">7.27</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Takeaway: Close alignment between Mean (81.7) and Median (82.0) confirms a balanced, symmetric distribution.
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-rose-400 font-mono font-bold">Case Study 2</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Skewed Salary Outlier</span>
                </div>
                <h3 className="text-lg font-bold text-white">Dataset: 40k, 45k, 48k, 50k, 52k, 500k</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Count (n):</strong> 6 employees</li>
                  <li><strong>Sum:</strong> $735,000</li>
                  <li><strong>Mean:</strong> $735,000 ÷ 6 = <span className="text-rose-400 font-bold">$122,500 (Heavily Distorted!)</span></li>
                  <li><strong>Sorted Array:</strong> [40k, 45k, <strong>48k, 50k</strong>, 52k, 500k]</li>
                  <li><strong>Median:</strong> (48k + 50k) ÷ 2 = <span className="text-emerald-400 font-bold">$49,000 (True Center)</span></li>
                  <li><strong>Sample Std Dev:</strong> <span className="text-amber-300 font-bold">$185,027</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Takeaway: One single $500k outlier pulls the mean up by 150%, demonstrating why Median is the mandatory metric for skewed data.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Common Calculation Mistakes */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="text-amber-400 w-6 h-6" /> Common Statistical Traps to Avoid
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Reporting Only the Mean on Skewed Data
                </h3>
                <p className="text-xs text-slate-400">
                  Relying solely on the mean when data has extreme positive or negative outliers misrepresents the reality of 90% of the population. Always pair the mean with the median and interquartile range.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Confusing Standard Deviation with Standard Error
                </h3>
                <p className="text-xs text-slate-400">
                  Standard Deviation (s) measures variability among individual data observations. Standard Error (SE = s / √n) measures the precision of the sample mean estimate itself. They are not interchangeable.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Applying Population Formulas to Sample Data
                </h3>
                <p className="text-xs text-slate-400">
                  Dividing by $n$ instead of $n-1$ on survey data produces an artificially narrow variance estimate, leading to inflated confidence intervals and false positive statistical conclusions.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Misinterpreting Multi-Modal Distributions
                </h3>
                <p className="text-xs text-slate-400">
                  When a dataset has two distinct clustering peaks (Bimodal), reporting a single mean places the average directly inside a valley where almost zero observations actually exist.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: In-Depth FAQs */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="text-primary w-6 h-6" /> Frequently Asked Questions (FAQ)
            </h2>
            <Faq items={faqItems} />
          </div>

          {/* Section 7: Clinical References & Interlinked Tools */}
          <div className="pt-6 border-t border-slate-700/60 space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Statistical References & Related Calculators
            </h3>
            <ul className="text-xs text-slate-400 space-y-1.5">
              <li>• Moore DS, Notz WI, Fligner MA. <em>The Basic Practice of Statistics</em>. W. H. Freeman (2021).</li>
              <li>• Triola MF. <em>Elementary Statistics</em>. Pearson (2018).</li>
              <li>• American Statistical Association (ASA). <em>Ethical Guidelines for Statistical Practice</em>.</li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/math/percentage-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Percentage Calculator →
              </Link>
              <Link to="/math/fraction-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Fraction Calculator →
              </Link>
              <Link to="/math/scientific-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Scientific Calculator →
              </Link>
              <Link to="/math/triangle-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Triangle Geometry Calculator →
              </Link>
            </div>
          </div>

          <Disclaimer text="Computations strictly adhere to standard descriptive statistical algorithms. Sample standard deviation and variance utilize Bessel's correction (n − 1)." />
        </section>
      </div>
    </>
  );
};

export default StatisticsCalculator;

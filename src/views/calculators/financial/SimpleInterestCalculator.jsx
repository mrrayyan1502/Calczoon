'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveCalculation } from '@/lib/history';
import { Link } from 'react-router-dom';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { Percent, DollarSign, Calculator, Clock, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('6.5');
  const [time, setTime] = useState('3');
  const [timeUnit, setTimeUnit] = useState('years'); // 'years', 'months', 'days'
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const calculateInterest = (e) => {
    if (e) e.preventDefault();
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const tVal = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(tVal) || p < 0 || r < 0 || tVal < 0) {
      setResult({ error: "Please enter valid, positive numbers for all fields." });
      return;
    }

    // Convert time to fractional years based on unit
    let timeInYears = tVal;
    if (timeUnit === 'months') {
      timeInYears = tVal / 12;
    } else if (timeUnit === 'days') {
      timeInYears = tVal / 365;
    }

    const interestAccrued = p * r * timeInYears;
    const totalMaturityAmount = p + interestAccrued;
    const dailyInterest = (p * r) / 365;

    const newResult = {
      interest: interestAccrued.toFixed(2),
      totalAmount: totalMaturityAmount.toFixed(2),
      principal: p.toFixed(2),
      dailyInterest: dailyInterest.toFixed(2),
      timeInYears: timeInYears.toFixed(2)
    };

    setResult(newResult);
    saveCalculation({
      type: 'Simple Interest',
      inputs: { principal: p, rate: rate, time: tVal, timeUnit, currency },
      result: {
        Interest: `${getCurrencySymbol()}${newResult.interest}`,
        Total: `${getCurrencySymbol()}${newResult.totalAmount}`
      }
    });
  };

  const faqItems = [
    {
      question: "What is simple interest and how is it defined in finance?",
      answer: "Simple interest is a linear method of calculating borrowing cost or investment earnings strictly on the original principal amount. Unlike compound interest, simple interest does not add accumulated interest back into the principal balance to earn additional interest in subsequent periods."
    },
    {
      question: "What is the standard mathematical formula for simple interest?",
      answer: "The fundamental simple interest equation is I = P × r × t, where 'I' represents the total accrued interest, 'P' is the initial principal sum, 'r' is the annual nominal interest rate in decimal format, and 't' is the duration time in years."
    },
    {
      question: "What is the difference between simple interest and compound interest?",
      answer: "Simple interest grows linearly at a constant fixed monetary amount each year because interest is calculated solely on the principal. Compound interest grows exponentially because accumulated interest is continuously reinvested, earning interest on top of past interest."
    },
    {
      question: "What real-world financial products use simple interest?",
      answer: "Simple interest is standard in automotive installment financing, short-term personal promissory notes, municipal bonds, judicial pre-judgment interest awards, short-term pawn agreements, and commercial bridge loans."
    },
    {
      question: "How do you calculate simple interest for periods in months or days?",
      answer: "When calculating for months, divide the number of months by 12 (t = months / 12). For days, financial institutions use either the Exact Day Count convention (t = days / 365) or the Ordinary Banker's Rule (t = days / 360)."
    },
    {
      question: "Can I rearrange the simple interest formula to solve for interest rate or time?",
      answer: "Yes. By algebraic rearrangement: To solve for Rate: r = I / (P × t); To solve for Time: t = I / (P × r); To solve for Principal: P = I / (r × t)."
    },
    {
      question: "Why do savings accounts earn compound interest instead of simple interest?",
      answer: "Retail consumer banks utilize compound interest (quoted as Annual Percentage Yield or APY) for savings and certificates of deposit to incentivize long-term capital deposits, compounding interest daily or monthly into the account balance."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Simple Interest Calculator",
    "description": "Calculate simple interest, maturity balances, and daily accrual for personal loans, promissory notes, and short-term debt agreements.",
    "applicationCategory": "FinancialApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/financial/simple-interest-calculator",
    "browserRequirements": "Requires JavaScript."
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <Seo
        title="Simple Interest Calculator: Fast & Accurate Principal Accrual"
        description="Free Simple Interest Calculator. Calculate loan interest, final maturity value, and daily accrual using the standard I = P × r × t formula."
        canonicalUrl="/financial/simple-interest-calculator"
        schema={[webAppSchema, faqPageSchema]}
        keywords={['simple interest calculator', 'interest formula', 'loan interest calculation', 'promissory note interest', 'principal interest']}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Simple Interest Calculator"
          description="Quickly calculate total interest accrued and final maturity payout on loans, promissory notes, or investments using the linear simple interest equation."
          icon={Percent}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white text-xl">Simple Interest Parameters</CardTitle>
                    <CardDescription className="text-slate-400">Enter your principal capital, annual rate, and time duration</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {['USD', 'GBP', 'EUR'].map((cur) => (
                      <button
                        key={cur}
                        type="button"
                        onClick={() => setCurrency(cur)}
                        className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                          currency === cur ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cur}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={calculateInterest} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="principal" className="text-slate-300">Original Principal Sum ({getCurrencySymbol()})</Label>
                      <Input
                        id="principal"
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        placeholder="10000"
                        className="bg-slate-950 border-slate-700 text-white text-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rate" className="text-slate-300">Annual Interest Rate - APR (%)</Label>
                      <Input
                        id="rate"
                        type="number"
                        step="0.01"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="6.5"
                        className="bg-slate-950 border-slate-700 text-white text-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-slate-300">Time Duration</Label>
                      <Input
                        id="time"
                        type="number"
                        step="0.1"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="3"
                        className="bg-slate-950 border-slate-700 text-white text-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeUnit" className="text-slate-300">Time Measurement Unit</Label>
                      <select
                        id="timeUnit"
                        value={timeUnit}
                        onChange={(e) => setTimeUnit(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-md text-white"
                      >
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                        <option value="days">Days (365-day basis)</option>
                      </select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 mt-2 text-base">
                    Calculate Simple Interest
                  </Button>
                </form>
              </CardContent>

              {result && (
                <CardFooter className="flex flex-col bg-slate-950/80 border-t border-slate-800 p-6 rounded-b-xl">
                  {result.error ? (
                    <p className="text-rose-400 font-semibold">{result.error}</p>
                  ) : (
                    <div className="w-full space-y-4">
                      <div className="text-center py-4 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-slate-400 text-sm">Total Accrued Simple Interest</p>
                        <p className="text-4xl md:text-5xl font-extrabold text-emerald-400 my-1">
                          {getCurrencySymbol()}{result.interest}
                        </p>
                        <p className="text-xs text-slate-400">
                          Accrues at approximately <span className="text-amber-400 font-medium">{getCurrencySymbol()}{result.dailyInterest} per day</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Initial Principal</p>
                          <p className="text-lg font-bold text-white">{getCurrencySymbol()}{result.principal}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Total Maturity Value</p>
                          <p className="text-lg font-bold text-sky-400">{getCurrencySymbol()}{result.totalAmount}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 col-span-2 md:col-span-1">
                          <p className="text-xs text-slate-400">Effective Duration</p>
                          <p className="text-lg font-bold text-slate-200">{result.timeInYears} Years</p>
                        </div>
                      </div>

                      {/* Monetization / Recommended Financial Tool */}
                      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="text-xs space-y-1">
                          <p className="font-semibold text-emerald-300">Maximize Cash Yield with Compound Growth</p>
                          <p className="text-slate-300 leading-relaxed">
                            While simple interest applies to certain private loan agreements and debt instruments, personal cash deposits generate superior wealth through compounding interest. Explore high-yield savings accounts and Treasury Bills yielding 4.5% to 5.2% APY with daily compounding.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <ShareResults
                          title="Simple Interest Calculation"
                          text={`Simple Interest on ${getCurrencySymbol()}${result.principal} at ${rate}% is ${getCurrencySymbol()}${result.interest} on Calczoon.`}
                          url="/financial/simple-interest-calculator"
                        />
                      </div>
                    </div>
                  )}
                </CardFooter>
              )}
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <RelatedTools category="financial" />
          </aside>
        </div>

        {/* In-depth Educational & AEO Section */}
        <section className="mt-12 bg-slate-900/60 rounded-xl p-8 border border-slate-800 space-y-8 text-slate-300">
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Comprehensive Guide to Simple Interest Mechanics & Formulas</h2>
            <p className="leading-relaxed text-slate-300">
              Interest is the economic fee paid for the temporary use of borrowed capital, or conversely, the financial reward earned by lenders and depositors for deferred consumption. Unlike compound interest which reinvests periodic gains into the capital base, <strong>simple interest</strong> is calculated solely on the unadjusted principal balance. Because of its predictable, non-compounding nature, simple interest is universally utilized in promissory notes between private parties, short-term commercial bridge financing, auto loans, and legal damage settlements.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">The Fundamental Mathematical Equation: I = P × r × t</h3>
            <p className="mb-4 leading-relaxed">
              The mathematical computation of simple interest relies on direct linear proportionality across three core variables:
            </p>
            <div className="bg-slate-950 p-4 rounded-lg font-mono text-center text-emerald-400 border border-slate-800 text-sm md:text-base mb-4">
              I = P × r × t
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">I = Accrued Simple Interest</p>
                <p className="text-xs leading-relaxed">
                  The total financial cost of borrowing or the total earnings produced by the capital over the complete loan lifecycle.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">P = Initial Principal Sum</p>
                <p className="text-xs leading-relaxed">
                  The baseline monetary value initially borrowed or invested prior to the accrual of any financing charges.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">r = Annual Interest Rate (Decimal)</p>
                <p className="text-xs leading-relaxed">
                  The nominal percentage expressed as a decimal fraction (e.g., a 6.5% interest rate is converted to r = 0.065).
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">t = Duration Time in Years</p>
                <p className="text-xs leading-relaxed">
                  The elapsed time expressed in annual terms. For monthly periods, t = months / 12; for daily periods, t = days / 365.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Simple Interest Accrual Benchmark Table</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The benchmark table below illustrates total simple interest accrual and final maturity values across principal sums from $5,000 to $100,000 across multiple annual terms at standard interest rates:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-200">
                  <tr>
                    <th className="p-3">Principal (P)</th>
                    <th className="p-3">Annual Rate (r)</th>
                    <th className="p-3">Duration (t)</th>
                    <th className="p-3">Annual Interest</th>
                    <th className="p-3">Total Accrued Interest</th>
                    <th className="p-3">Final Maturity Value (A)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$5,000</td>
                    <td className="p-3">5.00%</td>
                    <td className="p-3">1 Year</td>
                    <td className="p-3 text-slate-300">$250.00</td>
                    <td className="p-3 text-amber-400 font-bold">$250.00</td>
                    <td className="p-3 text-emerald-400">$5,250.00</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$5,000</td>
                    <td className="p-3">7.50%</td>
                    <td className="p-3">3 Years</td>
                    <td className="p-3 text-slate-300">$375.00</td>
                    <td className="p-3 text-amber-400 font-bold">$1,125.00</td>
                    <td className="p-3 text-emerald-400">$6,125.00</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$10,000</td>
                    <td className="p-3">6.00%</td>
                    <td className="p-3">2 Years</td>
                    <td className="p-3 text-slate-300">$600.00</td>
                    <td className="p-3 text-amber-400 font-bold">$1,200.00</td>
                    <td className="p-3 text-emerald-400">$11,200.00</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$10,000</td>
                    <td className="p-3">8.00%</td>
                    <td className="p-3">5 Years</td>
                    <td className="p-3 text-slate-300">$800.00</td>
                    <td className="p-3 text-amber-400 font-bold">$4,000.00</td>
                    <td className="p-3 text-emerald-400">$14,000.00</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$25,000</td>
                    <td className="p-3">5.50%</td>
                    <td className="p-3">3 Years</td>
                    <td className="p-3 text-slate-300">$1,375.00</td>
                    <td className="p-3 text-amber-400 font-bold">$4,125.00</td>
                    <td className="p-3 text-emerald-400">$29,125.00</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$25,000</td>
                    <td className="p-3">7.00%</td>
                    <td className="p-3">5 Years</td>
                    <td className="p-3 text-slate-300">$1,750.00</td>
                    <td className="p-3 text-amber-400 font-bold">$8,750.00</td>
                    <td className="p-3 text-emerald-400">$33,750.00</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$50,000</td>
                    <td className="p-3">6.00%</td>
                    <td className="p-3">4 Years</td>
                    <td className="p-3 text-slate-300">$3,000.00</td>
                    <td className="p-3 text-amber-400 font-bold">$12,000.00</td>
                    <td className="p-3 text-emerald-400">$62,000.00</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$50,000</td>
                    <td className="p-3">8.50%</td>
                    <td className="p-3">6 Years</td>
                    <td className="p-3 text-slate-300">$4,250.00</td>
                    <td className="p-3 text-amber-400 font-bold">$25,500.00</td>
                    <td className="p-3 text-emerald-400">$75,500.00</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$100,000</td>
                    <td className="p-3">5.00%</td>
                    <td className="p-3">5 Years</td>
                    <td className="p-3 text-slate-300">$5,000.00</td>
                    <td className="p-3 text-amber-400 font-bold">$25,000.00</td>
                    <td className="p-3 text-emerald-400">$125,000.00</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$100,000</td>
                    <td className="p-3">7.50%</td>
                    <td className="p-3">10 Years</td>
                    <td className="p-3 text-slate-300">$7,500.00</td>
                    <td className="p-3 text-amber-400 font-bold">$75,000.00</td>
                    <td className="p-3 text-emerald-400">$175,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Step-by-Step Numerical Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-emerald-400 text-base">Case Study 1: Private Promissory Note ($ USD)</h4>
                <p><strong>Principal Loan Capital:</strong> $15,000.00</p>
                <p><strong>Agreed Annual Rate:</strong> 7.5% per annum</p>
                <p><strong>Loan Term:</strong> 3 Years (36 months)</p>
                <p><strong>Calculation Formula:</strong> I = $15,000 × 0.075 × 3</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-amber-300 font-semibold">Total Simple Interest Paid: $3,375.00</p>
                  <p className="text-emerald-300 font-semibold">Final Maturity Payoff Amount: $18,375.00</p>
                  <p className="text-slate-300 text-xs">Note: Under compounding interest at 7.5% monthly, interest would total $3,771.44 ($396.44 higher).</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-sky-400 text-base">Case Study 2: Short-Term Commercial Bridge Loan (£ GBP)</h4>
                <p><strong>Principal Borrowed:</strong> £40,000.00</p>
                <p><strong>Nominal Rate:</strong> 8.0% simple annual interest</p>
                <p><strong>Bridge Duration:</strong> 9 Months (t = 9/12 = 0.75 years)</p>
                <p><strong>Calculation:</strong> I = £40,000 × 0.08 × 0.75</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-amber-300 font-semibold">Accrued Simple Interest: £2,400.00</p>
                  <p className="text-sky-300 font-semibold">Total Repayment at Exit: £42,400.00</p>
                  <p className="text-slate-300 text-xs">Daily Interest Cost: £8.77 per calendar day (£40,000 × 0.08 / 365).</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Simple Interest vs Compound Interest: Fundamental Divergence</h3>
            <p className="leading-relaxed mb-4 text-sm">
              The mathematical distinction between simple and compound interest creates enormous wealth differentials over extended timeframes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="font-semibold text-emerald-400 mb-2">Linear Growth (Simple Interest)</h4>
                <p className="text-xs leading-relaxed mb-2">
                  Equation: <em>A = P(1 + rt)</em>. Because interest never enters the principal base, growth is strictly linear. An investment of $10,000 at 7% simple interest earns exactly $700 every single year. After 30 years, total interest is $21,000, bringing the final balance to $31,000.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="font-semibold text-sky-400 mb-2">Exponential Growth (Compound Interest)</h4>
                <p className="text-xs leading-relaxed mb-2">
                  Equation: <em>A = P(1 + r/n)^(nt)</em>. Reinvested earnings generate accelerating snowball returns. The same $10,000 at 7% compounded annually grows to $76,122.55 over 30 years—yielding $45,122.55 in additional compound interest compared to simple interest.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Algebraic Derivations: Solving for Unknown Financial Variables</h3>
            <p className="leading-relaxed mb-4 text-sm">
              The primary linear relationship <em>I = P × r × t</em> can be algebraically manipulated to isolate and solve for any missing financial variable when three of the four parameters are established:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">Solving for Annual Rate (r)</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">r = I / (P × t)</div>
                <p className="text-xs text-slate-300">
                  Used to reveal the hidden annual interest rate on consumer promissory notes when only the total interest charge and duration are stated.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">Solving for Time Duration (t)</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">t = I / (P × r)</div>
                <p className="text-xs text-slate-300">
                  Calculates exactly how many years or months it will take for a given principal deposit to accumulate a desired target interest yield.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">Solving for Original Principal (P)</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">P = I / (r × t)</div>
                <p className="text-xs text-slate-300">
                  Essential for present value financial analysis, determining how much initial capital must be invested today to generate future interest.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Day-Count Conventions: Exact 365 vs Banker's 360 Rule</h3>
            <p className="leading-relaxed mb-4 text-sm">
              In commercial debt markets, short-term debt calculations hinge upon which calendar day-count convention is specified in the legal agreement:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="font-semibold text-emerald-400 mb-2">Exact Day Count (Actual / 365)</h4>
                <p className="text-xs leading-relaxed">
                  Counts the exact number of elapsed calendar days and divides by 365 (or 366 in a leap year). This is the standard method for government Treasury notes, consumer auto loans, and retail banking accounts.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="font-semibold text-amber-400 mb-2">Ordinary Banker's Rule (Actual / 360)</h4>
                <p className="text-xs leading-relaxed">
                  Counts exact calendar days but divides by a simplified 360-day commercial financial year (twelve 30-day months). Because the denominator is smaller, the Banker's Rule produces a slightly higher interest payout, favoring commercial lenders.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Legal Enforceability of Simple Interest Promissory Notes</h3>
            <p className="leading-relaxed mb-4 text-sm">
              When drafting private promissory notes between family members, business partners, or peer lenders, establishing a simple interest clause ensures unambiguous legal enforceability. Contractual documentation must explicitly identify the initial principal disbursement date, the exact nominal annual interest percentage, the agreed day-count convention, and a definitive calendar maturity date to satisfy judicial scrutiny under state and national contract law.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">5 Critical Misconceptions About Simple Interest</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed text-slate-300">
              <li>
                <strong>Confusing Simple Interest with Fixed-Rate Mortgages:</strong> Although 30-year fixed mortgages feature a fixed interest rate, they are amortized loans with monthly compounding interest, not simple interest contracts.
              </li>
              <li>
                <strong>Assuming Daily Accrual Always Uses 365 Days:</strong> Commercial lenders frequently use the "Ordinary Banker's Rule" (360 days in a year), which slightly inflates the lender's effective annual yield compared to the 365-day exact method.
              </li>
              <li>
                <strong>Believing Simple Interest Loans Have No Early Payoff Benefit:</strong> While simple interest does not compound, paying off principal early immediately shrinks the base upon which subsequent daily interest accrues, saving thousands.
              </li>
              <li>
                <strong>Equating Simple Interest Rate with APY:</strong> Quoted nominal simple interest ignores the compounding frequency that Annual Percentage Yield (APY) incorporates. A 5% APY yield always surpasses a 5% simple annual rate.
              </li>
              <li>
                <strong>Neglecting Penalty Interest Clauses in Promissory Notes:</strong> Private simple interest loan agreements frequently mandate default escalation clauses that elevate the interest rate by 5% to 10% if contractual maturity dates are breached.
              </li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="This simple interest calculator is designed for educational, estimation, and analytical purposes. Specific loan agreements, promissory legal notes, and commercial instruments may be governed by distinctive day-count conventions and contractual clauses." />
      </div>
    </>
  );
};

export default SimpleInterestCalculator;

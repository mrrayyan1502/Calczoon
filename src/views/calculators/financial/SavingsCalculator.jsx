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
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { PiggyBank, TrendingUp, DollarSign, ShieldAlert, CheckCircle2, HelpCircle } from 'lucide-react';

const SavingsCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [years, setYears] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const calculateSavings = (e) => {
    e.preventDefault();
    const P = parseFloat(initialDeposit) || 0;
    const C = parseFloat(monthlyContribution) || 0;
    const annualRate = parseFloat(interestRate);
    const t = parseFloat(years);

    if (isNaN(annualRate) || isNaN(t) || annualRate < 0 || t <= 0) {
      setResult({ error: "Please enter a valid interest rate and a time period greater than 0." });
      return;
    }

    const r = annualRate / 100 / 12; // Monthly rate
    const n = t * 12; // Total monthly periods

    const futureValueOfP = P * Math.pow(1 + r, n);
    const futureValueOfC = r > 0 ? C * ((Math.pow(1 + r, n) - 1) / r) : C * n;
    const futureValue = futureValueOfP + futureValueOfC;

    const totalPrincipal = P + (C * n);
    const totalInterest = futureValue - totalPrincipal;

    const newResult = {
      futureValue: futureValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      totalPrincipal: totalPrincipal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      totalInterest: totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      timeYears: t,
    };
    setResult(newResult);
    saveCalculation({
      type: 'Savings Goal',
      inputs: {
        'Initial Deposit': `${getCurrencySymbol()}${P.toLocaleString()}`,
        'Monthly Deposit': `${getCurrencySymbol()}${C.toLocaleString()}`,
        'Annual Rate': `${annualRate}%`,
        'Time Horizon': `${t} Years`,
      },
      result: {
        'Future Value': `${getCurrencySymbol()}${newResult.futureValue}`,
        'Total Interest': `${getCurrencySymbol()}${newResult.totalInterest}`,
      }
    });
  };

  const faqItems = [
    {
      question: "How does monthly compounding affect my total savings interest?",
      answer: "Compounding frequency determines how often earned interest is added to your principal balance to start earning interest itself. With monthly compounding, your interest is recalculated and added to your balance 12 times per year. Over a 10-year period, monthly compounding generates significantly higher terminal returns than annual compounding because your principal base expands every 30 days."
    },
    {
      question: "What is the difference between an APY and an APR on savings accounts?",
      answer: "The Annual Percentage Rate (APR) reflects the simple nominal interest rate over a year without accounting for compounding. The Annual Percentage Yield (APY) reflects the true annual return earned when compounding is factored in. For example, a high-yield savings account (HYSA) with a 5.00% APR compounded monthly produces an effective APY of approximately 5.12%."
    },
    {
      question: "How many months of living expenses should I keep in an Emergency Fund?",
      answer: "Financial planners recommend maintaining 3 to 6 months of essential living expenses (rent/mortgage, utilities, food, insurance, debt minimums) in an accessible High-Yield Savings Account (HYSA). Freelancers, single-income households, or business owners should aim for 9 to 12 months of reserves to safeguard against economic volatility."
    },
    {
      question: "When should I save in an HYSA versus investing in index funds?",
      answer: "Funds required within 1 to 3 years (emergency funds, home down payment, vehicle purchase, upcoming taxes) belong in capital-preservation instruments like high-yield savings accounts or Certificates of Deposit (CDs) to avoid market drawdown risk. Capital designated for horizons beyond 5 to 7 years should be invested in diversified index funds to outpace long-term inflation."
    },
    {
      question: "Are high-yield savings accounts safe and insured against bank failure?",
      answer: "Yes, provided the bank is FDIC-insured (in the United States) or FSCS-insured (in the United Kingdom). In the US, the Federal Deposit Insurance Corporation (FDIC) guarantees deposits up to $250,000 per depositor, per insured bank, per ownership category. In the UK, the Financial Services Compensation Scheme protects up to £85,000."
    },
    {
      question: "How does the 'Rule of 72' help estimate how fast savings double?",
      answer: "The Rule of 72 is a mental math shortcut to calculate the number of years required for an investment to double at a fixed annual rate of return. Simply divide 72 by the annual interest rate. For example, at a 6% return, your money doubles in approximately 12 years (72 ÷ 6 = 12). At 9%, it doubles in approximately 8 years (72 ÷ 9 = 8)."
    }
  ];

  return (
    <>
      <Seo
        title="Savings Calculator: Compound Interest & Future Value Growth | CalcZoon"
        description="Calculate the future value of your savings, total deposits, and compound interest growth across monthly contribution schedules and customizable interest rates."
        canonicalUrl="/financial/savings-calculator"
      />
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
                    <PiggyBank className="w-8 h-8" />
                  </div>
                </div>
                <h1 className="text-3xl font-extrabold text-white">Savings Goal Calculator</h1>
                <CardDescription className="text-slate-300 max-w-xl mx-auto">
                  Project your savings growth over time with monthly compounding. Enter your starting balance, recurring monthly deposits, and expected interest rate.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateSavings} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currency" className="text-slate-200">Currency</Label>
                      <select
                        id="currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white h-10"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="initialDeposit" className="text-slate-200">
                        Initial Deposit ({getCurrencySymbol()})
                      </Label>
                      <Input
                        id="initialDeposit"
                        type="number"
                        min="0"
                        step="50"
                        value={initialDeposit}
                        onChange={(e) => setInitialDeposit(e.target.value)}
                        placeholder="e.g., 2000"
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="monthlyContribution" className="text-slate-200">
                        Monthly Contribution ({getCurrencySymbol()})
                      </Label>
                      <Input
                        id="monthlyContribution"
                        type="number"
                        min="0"
                        step="25"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value)}
                        placeholder="e.g., 300"
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interestRate" className="text-slate-200">Annual Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.05"
                        min="0"
                        max="30"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="e.g., 5.25"
                        required
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="years" className="text-slate-200">Investment Horizon (Years)</Label>
                    <Input
                      id="years"
                      type="number"
                      step="0.5"
                      min="0.5"
                      max="60"
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      placeholder="e.g., 5"
                      required
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-slate-950 font-bold h-12 text-base">
                    Calculate Projected Savings
                  </Button>
                </form>
              </CardContent>

              {result && !result.error && (
                <CardFooter className="flex flex-col items-center mt-6 p-6 bg-slate-900/80 border-t border-slate-700 rounded-b-lg">
                  <div className="w-full text-center space-y-4">
                    <h2 className="text-base font-semibold text-slate-300">
                      Total Future Value After {result.timeYears} Years:
                    </h2>
                    <p className="text-5xl font-black text-emerald-400">
                      {getCurrencySymbol()}{result.futureValue}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                      <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                        <span className="text-slate-400 block mb-1">Total Principal Contributed</span>
                        <span className="font-mono font-bold text-white text-base">
                          {getCurrencySymbol()}{result.totalPrincipal}
                        </span>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg border border-emerald-900/50">
                        <span className="text-emerald-400 block mb-1">Total Interest Earned</span>
                        <span className="font-mono font-bold text-emerald-300 text-base">
                          {getCurrencySymbol()}{result.totalInterest}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 w-full">
                    <ShareResults
                      title="My Savings Goal Projection"
                      text={`I'm on track to save ${getCurrencySymbol()}${result.futureValue} with ${getCurrencySymbol()}${result.totalInterest} in compound interest! Calculate your savings on CalcZoon:`}
                      url="/financial/savings-calculator"
                    />
                  </div>
                </CardFooter>
              )}

              {result && result.error && (
                <CardFooter className="mt-6 p-4 bg-red-900/20 border-t border-red-800/40 rounded-b-lg">
                  <p className="text-red-400 text-center w-full">{result.error}</p>
                </CardFooter>
              )}
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" /> Current Yield Benchmarks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <div className="flex justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400">Traditional Bank Checking</span>
                  <span className="font-semibold text-slate-200 font-mono">0.01% – 0.05%</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400">High-Yield Savings (HYSA)</span>
                  <span className="font-semibold text-emerald-400 font-mono">4.00% – 5.25%</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400">12-Month Bank CD</span>
                  <span className="font-semibold text-emerald-400 font-mono">4.50% – 5.10%</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400">US Treasury Bills (4-Week)</span>
                  <span className="font-semibold text-sky-400 font-mono">4.80% – 5.30%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">S&P 500 Index (Long-Term)</span>
                  <span className="font-semibold text-amber-300 font-mono">9.50% – 10.20%</span>
                </div>
              </CardContent>
            </Card>
            <RelatedTools />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,100 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10 mb-12">
          {/* Section 1: What is a Savings Calculator */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <PiggyBank className="text-emerald-400 w-7 h-7" /> What is the Savings Calculator & How Capital Grows Over Time
            </h2>
            <p className="text-base md:text-lg">
              The <strong>Savings Calculator</strong> is a quantitative financial planning instrument that simulates the future value ($FV$) of cash reserves over designated time horizons. Whether you are building a dedicated 6-month liquid emergency cushion, saving for a home down payment, preparing for a child’s college tuition, or funding a dream sabbatical, regular incremental savings paired with compound interest transforms modest monthly habits into substantial financial security.
            </p>
            <p>
              In conventional banking, idle cash deposited into zero-yield checking accounts loses purchasing power each year to inflation. By strategically deploying savings into competitive High-Yield Savings Accounts (HYSAs), Certificates of Deposit (CDs), Money Market Funds, or Treasury bills, you earn compound yields where your interest payments themselves generate additional monthly dividends.
            </p>
          </div>

          {/* Section 2: Mathematical Compounding Equations */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              The Mathematical Compounding Formulas
            </h2>
            <p>
              The calculator computes the total future value through the superposition of two fundamental time-value-of-money equations:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4">
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                <p className="text-emerald-400 font-bold uppercase tracking-wider">Lump-Sum Initial Deposit Equation</p>
                <p className="text-white text-sm font-semibold">FV_P = P × (1 + r)^n</p>
                <p className="text-slate-400">Where P is starting deposit, r is monthly interest rate (APR ÷ 12), and n is total months.</p>
              </div>
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider">Future Value of Monthly Annuity</p>
                <p className="text-white text-sm font-semibold">FV_C = C × [((1 + r)^n − 1) ÷ r]</p>
                <p className="text-slate-400">Where C is the recurring monthly deposit compounding at rate r across n months.</p>
              </div>
            </div>
            <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <p className="text-white font-bold">Total Capital Accumulation:</p>
              <p className="text-slate-300">Total Future Value = FV_P + FV_C</p>
              <p className="text-emerald-400">Total Interest Earned = Total Future Value − [P + (C × n)]</p>
            </div>
          </div>

          {/* Section 3: Step-by-Step Usage Guide */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Step-by-Step Guide: How to Structure and Execute a High-Yield Savings Goal
            </h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-white">Step 1: Define Your Financial Objective & Timeframe:</strong> Identify whether this fund is an immediate liquid buffer (1–2 years), a medium-term down payment (3–5 years), or a long-term goal.
              </li>
              <li>
                <strong className="text-white">Step 2: Input Your Starting Capital:</strong> Enter any current savings or lump-sum rollover you already possess into the Initial Deposit field.
              </li>
              <li>
                <strong className="text-white">Step 3: Commit to a Realistic Monthly Contribution:</strong> Calculate an automatic savings amount you can comfortably sustain every month without straining your monthly budget.
              </li>
              <li>
                <strong className="text-white">Step 4: Check Real Bank Yields (APY):</strong> Input the actual APY provided by your high-yield savings account or money market fund (e.g. 4.5% to 5.2%).
              </li>
              <li>
                <strong className="text-white">Step 5: Automate Direct Deposit Transfers:</strong> Set up automated transfers from your checking account to your high-yield savings account on the morning of each payday to eliminate reliance on willpower.
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
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Emergency Fund</span>
                </div>
                <h3 className="text-lg font-bold text-white">Sarah: Building a $15,000 Safety Net</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Initial Deposit:</strong> $1,000</li>
                  <li><strong>Monthly Contribution:</strong> $350</li>
                  <li><strong>Annual Interest Rate:</strong> 5.0% APY (High-Yield Savings)</li>
                  <li><strong>Time Horizon:</strong> 3 Years (36 months)</li>
                  <li><strong>Total Contributed Principal:</strong> $1,000 + ($350 × 36) = $13,600</li>
                  <li><strong>Total Projected Value:</strong> <span className="text-emerald-400 font-bold text-sm">$14,754.21</span></li>
                  <li><strong>Compound Interest Earned:</strong> <span className="text-emerald-300 font-bold">$1,154.21</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Takeaway: Sarah generates over $1,150 in passive risk-free interest simply by parking her safety net in a 5% HYSA rather than a traditional checking account.
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-sky-400 font-mono font-bold">Case Study 2</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Home Down Payment</span>
                </div>
                <h3 className="text-lg font-bold text-white">Liam & Chloe: 5-Year House Fund</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Initial Deposit:</strong> $10,000</li>
                  <li><strong>Monthly Contribution:</strong> $800</li>
                  <li><strong>Annual Interest Rate:</strong> 5.25% APY</li>
                  <li><strong>Time Horizon:</strong> 5 Years (60 months)</li>
                  <li><strong>Total Contributed Principal:</strong> $10,000 + ($800 × 60) = $58,000</li>
                  <li><strong>Total Projected Value:</strong> <span className="text-emerald-400 font-bold text-sm">$68,829.45</span></li>
                  <li><strong>Compound Interest Earned:</strong> <span className="text-emerald-300 font-bold">$10,829.45</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Takeaway: Over 5 years, monthly compounding contributes nearly $11,000 in interest, covering almost all closing costs on their future home.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Common Calculation Mistakes */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="text-amber-400 w-6 h-6" /> Common Savings Mistakes to Avoid
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Keeping Cash in 0.01% Traditional Accounts
                </h3>
                <p className="text-xs text-slate-400">
                  Brick-and-mortar mega banks often pay a negligible 0.01% interest. On a $20,000 balance, that yields $2 per year versus ~$1,000 per year in a 5.0% HYSA.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Forgetting That Savings Interest Is Taxable
                </h3>
                <p className="text-xs text-slate-400">
                  Interest earned in high-yield savings accounts is treated as ordinary income by tax authorities (IRS 1099-INT in the US). If you earn $1,000 in interest and fall into the 22% tax bracket, you owe $220 in income taxes.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Commingling Emergency Cash with Everyday Spending
                </h3>
                <p className="text-xs text-slate-400">
                  Keeping your emergency savings linked directly to your primary checking debit card creates subconscious spending leakage. House emergency funds in an independent online bank to maintain psychological friction.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Locking Short-Term Funds into Illiquid CDs
                </h3>
                <p className="text-xs text-slate-400">
                  Certificates of Deposit penalize you (typically 3 to 6 months of interest) if you withdraw early. Never place funds you might need unexpectedly into locked CD terms.
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
              Financial Literature & Related Tools
            </h3>
            <ul className="text-xs text-slate-400 space-y-1.5">
              <li>• Federal Reserve Board. <em>Report on the Economic Well-Being of U.S. Households</em> (2023).</li>
              <li>• Malkiel BG. <em>A Random Walk Down Wall Street</em>. W. W. Norton & Company (2020).</li>
              <li>• Consumer Financial Protection Bureau (CFPB). <em>An Essential Guide to Emergency Savings</em> (2022).</li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/financial/compound-interest-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Simulate Long-Term Compound Growth →
              </Link>
              <Link to="/financial/retirement-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Plan Your Retirement Nest Egg →
              </Link>
              <Link to="/financial/sip-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Systematic Investment Plan (SIP) →
              </Link>
              <Link to="/financial/loan-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Calculate Loan Amortization →
              </Link>
            </div>
          </div>

          <Disclaimer text="Calculations generated by this tool assume constant annual interest rates compounded on a monthly cycle. Deposit rates offered by commercial banking institutions fluctuate with macroeconomic monetary policy set by central banks." />
        </section>
      </div>
    </>
  );
};

export default SavingsCalculator;

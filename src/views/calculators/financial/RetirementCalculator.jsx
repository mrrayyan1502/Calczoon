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
import { Landmark, TrendingUp, DollarSign, ShieldAlert, CheckCircle2, HelpCircle } from 'lucide-react';

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const calculateRetirement = (e) => {
    e.preventDefault();
    const age = parseInt(currentAge, 10);
    const retAge = parseInt(retirementAge, 10);
    const P = parseFloat(currentSavings) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = parseFloat(interestRate) / 100;

    if (isNaN(age) || isNaN(retAge) || isNaN(r) || age <= 0 || retAge <= age || r < 0) {
      setResult({ error: "Please enter a valid current age, a higher retirement age, and an interest rate of 0% or higher." });
      return;
    }

    const t = retAge - age;
    const n = 12; // Monthly compounding
    const nt = n * t;
    const ratePerPeriod = r / n;

    let futureValueOfP = P * Math.pow(1 + ratePerPeriod, nt);
    let futureValueOfPMT = ratePerPeriod > 0
      ? PMT * ((Math.pow(1 + ratePerPeriod, nt) - 1) / ratePerPeriod)
      : PMT * nt;

    const totalSavings = futureValueOfP + futureValueOfPMT;
    const totalPrincipal = P + (PMT * nt);
    const totalInterestEarned = totalSavings - totalPrincipal;
    // Safe annual withdrawal based on Trinity study 4% rule
    const safeAnnualWithdrawal = totalSavings * 0.04;
    const safeMonthlyIncome = safeAnnualWithdrawal / 12;

    const newResult = {
      totalSavings: totalSavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      totalPrincipal: totalPrincipal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      interestEarned: totalInterestEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      safeAnnualWithdrawal: safeAnnualWithdrawal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      safeMonthlyIncome: safeMonthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      investmentYears: t,
    };

    setResult(newResult);
    saveCalculation({
      type: 'Retirement Savings',
      inputs: {
        'Current Age': age,
        'Retirement Age': retAge,
        'Starting Balance': `${getCurrencySymbol()}${P.toLocaleString()}`,
        'Monthly Deposit': `${getCurrencySymbol()}${PMT.toLocaleString()}`,
        'Expected Return': `${interestRate}%`,
      },
      result: {
        'Projected Nest Egg': `${getCurrencySymbol()}${newResult.totalSavings}`,
        '4% Rule Monthly Income': `${getCurrencySymbol()}${newResult.safeMonthlyIncome}`,
      }
    });
  };

  const faqItems = [
    {
      question: "What is the 4% Safe Withdrawal Rule in retirement planning?",
      answer: "Formulated in the famous Trinity Study by Cooley, Hubbard, and Walz (1998), the 4% Rule states that a retiree can withdraw 4% of their total investment portfolio in the first year of retirement, and adjust subsequent annual withdrawals for inflation, with a 95% historical probability that the nest egg will last at least 30 years across diversified stocks and bonds."
    },
    {
      question: "What is a realistic annual rate of return for a retirement portfolio?",
      answer: "Historically, the S&P 500 has averaged an annualized nominal return of approximately 10% (around 7% after adjusting for long-term historical inflation). For a diversified portfolio containing 70% equities and 30% fixed-income bonds, financial planners typically model a conservative 6% to 8% nominal annual return."
    },
    {
      question: "How does inflation impact my projected retirement purchasing power?",
      answer: "Inflation erodes the purchasing power of money over time. An average annual inflation rate of 3% will cause prices to double roughly every 24 years (Rule of 72). Therefore, a $1,000,000 portfolio in 30 years will have the equivalent purchasing power of roughly $412,000 in today's money. To calculate inflation-adjusted values, subtract your expected inflation rate from your nominal return."
    },
    {
      question: "Should I prioritize a Roth IRA / 401(k) or a Traditional account?",
      answer: "Traditional retirement accounts are funded with pre-tax dollars, lowering your current taxable income, but withdrawals in retirement are taxed as ordinary income. Roth accounts use after-tax contributions, allowing your investments and future withdrawals to compound 100% tax-free. Generally, if you expect to be in a higher tax bracket at retirement, Roth accounts are advantageous; if you expect a lower bracket, Traditional is often preferred."
    },
    {
      question: "What is the biggest cost of delaying retirement investing by 10 years?",
      answer: "The greatest cost is lost compound interest. For example, an individual investing $300/month from age 25 to 65 at 8% return accumulates roughly $932,000 (having invested $144,000). If that same person waits until age 35 to start, they accumulate only $410,000. That 10-year delay costs over $520,000 in compound growth that cannot be made up without tripling monthly deposits."
    },
    {
      question: "How much total savings do financial planners recommend before retiring?",
      answer: "A widely accepted benchmark (such as the Fidelity Retirement Savings Milestones) recommends saving: 1x your annual salary by age 30, 3x by age 40, 6x by age 50, 8x by age 60, and 10x to 12x your salary by age 67. Combined with Social Security or government pensions, this maintains pre-retirement lifestyle standards."
    }
  ];

  return (
    <>
      <Seo
        title="Retirement Calculator: Plan Your Nest Egg & 4% Rule Income | CalcZoon"
        description="Estimate your future retirement nest egg, compound interest growth, and safe monthly withdrawal income using clinical financial annuity models."
        canonicalUrl="/financial/retirement-calculator"
      />
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
                    <Landmark className="w-8 h-8" />
                  </div>
                </div>
                <h1 className="text-3xl font-extrabold text-white">Retirement Savings Calculator</h1>
                <CardDescription className="text-slate-300 max-w-xl mx-auto">
                  Project your retirement nest egg, total interest growth, and monthly retirement income based on monthly compounding annuity equations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateRetirement} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentAge" className="text-slate-200">Current Age</Label>
                      <Input
                        id="currentAge"
                        type="number"
                        min="15"
                        max="90"
                        value={currentAge}
                        onChange={(e) => setCurrentAge(e.target.value)}
                        placeholder="e.g., 30"
                        required
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retirementAge" className="text-slate-200">Target Retirement Age</Label>
                      <Input
                        id="retirementAge"
                        type="number"
                        min="20"
                        max="100"
                        value={retirementAge}
                        onChange={(e) => setRetirementAge(e.target.value)}
                        placeholder="e.g., 65"
                        required
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentSavings" className="text-slate-200">Current Retirement Savings</Label>
                      <Input
                        id="currentSavings"
                        type="number"
                        min="0"
                        step="100"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(e.target.value)}
                        placeholder="e.g., 25000"
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyContribution" className="text-slate-200">Monthly Contribution</Label>
                      <Input
                        id="monthlyContribution"
                        type="number"
                        min="0"
                        step="50"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value)}
                        placeholder="e.g., 500"
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="interestRate" className="text-slate-200">Expected Annual Return (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.1"
                        min="0"
                        max="25"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="e.g., 7.5"
                        required
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
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
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-slate-950 font-bold h-12 text-base">
                    Calculate Retirement Nest Egg
                  </Button>
                </form>
              </CardContent>

              {result && !result.error && (
                <CardFooter className="flex flex-col items-center mt-6 p-6 bg-slate-900/80 border-t border-slate-700 rounded-b-lg">
                  <div className="w-full text-center space-y-4">
                    <h2 className="text-base font-semibold text-slate-300">
                      Projected Portfolio at Age {retirementAge} ({result.investmentYears} Years of Compounding):
                    </h2>
                    <p className="text-5xl font-black text-emerald-400">
                      {getCurrencySymbol()}{result.totalSavings}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
                      <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                        <span className="text-slate-400 block mb-1">Your Total Deposits</span>
                        <span className="font-mono font-bold text-white text-sm">
                          {getCurrencySymbol()}{result.totalPrincipal}
                        </span>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg border border-emerald-900/50">
                        <span className="text-emerald-400 block mb-1">Compound Interest</span>
                        <span className="font-mono font-bold text-emerald-300 text-sm">
                          {getCurrencySymbol()}{result.interestEarned}
                        </span>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                        <span className="text-slate-400 block mb-1">4% Annual Income</span>
                        <span className="font-mono font-bold text-white text-sm">
                          {getCurrencySymbol()}{result.safeAnnualWithdrawal}/yr
                        </span>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg border border-sky-900/50">
                        <span className="text-sky-400 block mb-1">Safe Monthly Draw</span>
                        <span className="font-mono font-bold text-sky-300 text-sm">
                          {getCurrencySymbol()}{result.safeMonthlyIncome}/mo
                        </span>
                      </div>
                    </div>

                    <div className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 flex items-start gap-3 text-left">
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-emerald-400 block mb-1">Recommended Retirement Resource: Safe Withdrawal Planning</strong>
                        Academic research (Trinity Study) confirms that maintaining an equity allocation of 50% to 75% alongside high-grade bonds substantially reduces sequence-of-returns risk during your first decade of retirement.
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 w-full">
                    <ShareResults
                      title="My Retirement Projection"
                      text={`I projected my retirement nest egg to reach ${getCurrencySymbol()}${result.totalSavings} with a safe monthly income of ${getCurrencySymbol()}${result.safeMonthlyIncome}! Calculate yours on CalcZoon:`}
                      url="/financial/retirement-calculator"
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
                  <TrendingUp className="w-5 h-5 text-emerald-400" /> Savings Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <div className="flex justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400">By Age 30</span>
                  <span className="font-semibold text-white font-mono">1× Annual Salary</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400">By Age 40</span>
                  <span className="font-semibold text-white font-mono">3× Annual Salary</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400">By Age 50</span>
                  <span className="font-semibold text-emerald-400 font-mono">6× Annual Salary</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400">By Age 60</span>
                  <span className="font-semibold text-emerald-400 font-mono">8× Annual Salary</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">At Retirement (67)</span>
                  <span className="font-semibold text-emerald-400 font-mono">10× to 12× Salary</span>
                </div>
              </CardContent>
            </Card>
            <RelatedTools />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,100 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10 mb-12">
          {/* Section 1: What is a Retirement Calculator */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Landmark className="text-emerald-400 w-7 h-7" /> What is a Retirement Calculator & The Power of Financial Compounding
            </h2>
            <p className="text-base md:text-lg">
              A <strong>Retirement Calculator</strong> is an advanced financial modeling instrument engineered to forecast the terminal accumulation of investment assets across an individual’s working career. By combining existing capital balances with recurring monthly contributions and an assumed annualized investment return, the model projects total portfolio wealth at designated retirement milestones.
            </p>
            <p>
              In wealth management, retirement accumulation represents the classic application of exponential compounding. As Albert Einstein famously remarked, compound interest is the eighth wonder of the world: those who understand it earn it, and those who don’t pay it. Because reinvested earnings themselves generate subsequent returns, money invested in your twenties and thirties achieves an exponential hockey-stick growth curve, where compound interest eventually dwarfs lifetime out-of-pocket contributions.
            </p>
          </div>

          {/* Section 2: Mathematical Formulas (Future Value of Annuity) */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              The Mathematical Compounding Formulas
            </h2>
            <p>
              Our calculator calculates two simultaneous cash flows: the exponential growth of your lump-sum initial savings (FV_P), combined with the future value of an ordinary monthly annuity (FV_PMT):
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4">
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                <p className="text-emerald-400 font-bold uppercase tracking-wider">Lump-Sum Starting Growth</p>
                <p className="text-white text-sm font-semibold">FV_P = P × (1 + r/n)^(n×t)</p>
                <p className="text-slate-400">Where P is initial savings, r is annual return, n is 12 (monthly periods), and t is investment years.</p>
              </div>
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider">Future Value of Monthly Deposits</p>
                <p className="text-white text-sm font-semibold">FV_PMT = PMT × [((1 + r/n)^(n×t) − 1) ÷ (r/n)]</p>
                <p className="text-slate-400">Calculates recurring monthly deposits (PMT) compounding at monthly periodic rates.</p>
              </div>
            </div>
            <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-semibold text-white text-base">The Trinity Study & Safe Withdrawal Rate (4% Rule):</h3>
              <p className="text-sm text-slate-300">
                To translate accumulated capital into sustainable retirement income, the model incorporates the 4% Safe Withdrawal Rule from the Trinity Study (Cooley, Hubbard, Walz 1998):
              </p>
              <div className="bg-slate-800/80 p-3 rounded border border-emerald-900/50 font-mono text-xs text-emerald-300">
                Safe Annual Income = Total Nest Egg × 0.04 &nbsp;|&nbsp; Safe Monthly Income = (Total Nest Egg × 0.04) ÷ 12
              </div>
            </div>
          </div>

          {/* Section 3: Step-by-Step Practical Usage Guide */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Step-by-Step Guide: How to Formulate Your Retirement Roadmap
            </h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-white">Step 1: Set Your Current Age & Realistic Exit Horizon:</strong> Choose an age when you wish to transition from full-time active labor to passive financial independence (typically between ages 60 and 68).
              </li>
              <li>
                <strong className="text-white">Step 2: Aggregate All Existing Investment Accounts:</strong> Sum up balances across 401(k)s, IRAs, Roth accounts, brokerage index funds, and dedicated savings accounts into Current Savings.
              </li>
              <li>
                <strong className="text-white">Step 3: Define Your Automated Monthly Contribution:</strong> Calculate your monthly savings rate. Pay yourself first by setting up automatic transfers on payday.
              </li>
              <li>
                <strong className="text-white">Step 4: Input a Prudent Annual Rate of Return:</strong> Avoid overly optimistic 12% projections. Use 6% to 8% nominal (or 5% to 6% inflation-adjusted) for diversified index portfolios.
              </li>
              <li>
                <strong className="text-white">Step 5: Compare 4% Rule Income Against Anticipated Living Expenses:</strong> Check whether the projected safe monthly income covers your mortgage-free living expenses, healthcare, and leisure.
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
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Early Starter (Age 25)</span>
                </div>
                <h3 className="text-lg font-bold text-white">James: $5,000 Starting, $400/month</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Timeline:</strong> Age 25 to 65 (40 years of compounding)</li>
                  <li><strong>Expected Return:</strong> 7.5% annualized</li>
                  <li><strong>Total Principal Invested:</strong> $5,000 + ($400 × 480 mo) = $197,000</li>
                  <li><strong>Total Portfolio Accumulation:</strong> <span className="text-emerald-400 font-bold text-sm">$1,353,248</span></li>
                  <li><strong>Compound Interest Gained:</strong> $1,156,248 (85% of total wealth!)</li>
                  <li><strong>Safe Monthly Income (4% Rule):</strong> <span className="text-sky-400 font-bold text-sm">$4,510 / month</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Takeaway: Thanks to 40 years of compounding, over 85% of James's final nest egg is pure compound growth, allowing a comfortable retirement from a modest $400 monthly contribution.
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-bold">Case Study 2</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Late Starter (Age 45)</span>
                </div>
                <h3 className="text-lg font-bold text-white">Maria: $30,000 Starting, $1,000/month</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Timeline:</strong> Age 45 to 65 (20 years of compounding)</li>
                  <li><strong>Expected Return:</strong> 7.5% annualized</li>
                  <li><strong>Total Principal Invested:</strong> $30,000 + ($1,000 × 240 mo) = $270,000</li>
                  <li><strong>Total Portfolio Accumulation:</strong> <span className="text-emerald-400 font-bold text-sm">$680,942</span></li>
                  <li><strong>Compound Interest Gained:</strong> $410,942</li>
                  <li><strong>Safe Monthly Income (4% Rule):</strong> <span className="text-sky-400 font-bold text-sm">$2,270 / month</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Takeaway: Even though Maria contributed $73,000 MORE of her own money than James, her 20-year shorter compounding window yielded half the final nest egg.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Common Calculation Mistakes */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="text-amber-400 w-6 h-6" /> Critical Retirement Planning Mistakes to Avoid
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Underestimating the Silent Cost of Inflation
                </h3>
                <p className="text-xs text-slate-400">
                  Over a 30-year horizon, 3% historical inflation reduces the real purchasing power of each dollar by more than half. Always measure future nest egg targets against inflation-adjusted living costs.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Keeping Excessive Capital in Cash Savings
                </h3>
                <p className="text-xs text-slate-400">
                  Leaving retirement funds in standard checking or low-yield savings accounts yielding 0.5% guarantees negative real returns after inflation and taxes. Long-term wealth must be invested in productive assets.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Ignoring High Expense Ratios & Advisory Fees
                </h3>
                <p className="text-xs text-slate-400">
                  A seemingly modest 1.5% financial advisor or actively managed mutual fund fee consumes over 30% to 40% of your potential lifetime portfolio returns. Low-cost broad market index funds (0.03% to 0.10% fees) maximize net accumulation.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Failing to Capture Full Employer 401(k) Matches
                </h3>
                <p className="text-xs text-slate-400">
                  An employer 401(k) dollar-for-dollar match represents an immediate, risk-free 100% return on invested capital. Never contribute less than the full percentage required to unlock your employer match.
                </p>
              </div>
            </div>
          </div>

          {/* Pre-Calculated Benchmark Table */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Retirement Nest Egg &amp; Safe Withdrawal Rate Benchmark Table</h2>
            <p className="text-sm text-slate-400">
              The benchmark table below compares annual and monthly retirement cash flows under conservative (3.5%), standard Trinity Study (4.0%), and flexible (4.5%) safe withdrawal rates across common portfolio balances.
            </p>
            <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-slate-950">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                    <th className="p-3 font-semibold">Total Nest Egg</th>
                    <th className="p-3 font-semibold text-sky-400">3.5% Conservative (Mo)</th>
                    <th className="p-3 font-semibold text-emerald-400">4.0% Benchmark (Yr)</th>
                    <th className="p-3 font-semibold text-emerald-400">4.0% Benchmark (Mo)</th>
                    <th className="p-3 font-semibold text-amber-400">4.5% Flexible (Mo)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$250,000</td><td className="p-3 text-sky-400 font-mono">$729/mo</td><td className="p-3 font-mono text-white">$10,000/yr</td><td className="p-3 text-emerald-400 font-bold">$833/mo</td><td className="p-3 text-amber-400 font-mono">$938/mo</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$400,000</td><td className="p-3 text-sky-400 font-mono">$1,167/mo</td><td className="p-3 font-mono text-white">$16,000/yr</td><td className="p-3 text-emerald-400 font-bold">$1,333/mo</td><td className="p-3 text-amber-400 font-mono">$1,500/mo</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$500,000</td><td className="p-3 text-sky-400 font-mono">$1,458/mo</td><td className="p-3 font-mono text-white">$20,000/yr</td><td className="p-3 text-emerald-400 font-bold">$1,667/mo</td><td className="p-3 text-amber-400 font-mono">$1,875/mo</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$650,000</td><td className="p-3 text-sky-400 font-mono">$1,896/mo</td><td className="p-3 font-mono text-white">$26,000/yr</td><td className="p-3 text-emerald-400 font-bold">$2,167/mo</td><td className="p-3 text-amber-400 font-mono">$2,438/mo</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$750,000</td><td className="p-3 text-sky-400 font-mono">$2,188/mo</td><td className="p-3 font-mono text-white">$30,000/yr</td><td className="p-3 text-emerald-400 font-bold">$2,500/mo</td><td className="p-3 text-amber-400 font-mono">$2,813/mo</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$1,000,000</td><td className="p-3 text-sky-400 font-mono">$2,917/mo</td><td className="p-3 font-mono text-white">$40,000/yr</td><td className="p-3 text-emerald-400 font-bold">$3,333/mo</td><td className="p-3 text-amber-400 font-mono">$3,750/mo</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$1,250,000</td><td className="p-3 text-sky-400 font-mono">$3,646/mo</td><td className="p-3 font-mono text-white">$50,000/yr</td><td className="p-3 text-emerald-400 font-bold">$4,167/mo</td><td className="p-3 text-amber-400 font-mono">$4,688/mo</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$1,500,000</td><td className="p-3 text-sky-400 font-mono">$4,375/mo</td><td className="p-3 font-mono text-white">$60,000/yr</td><td className="p-3 text-emerald-400 font-bold">$5,000/mo</td><td className="p-3 text-amber-400 font-mono">$5,625/mo</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$2,000,000</td><td className="p-3 text-sky-400 font-mono">$5,833/mo</td><td className="p-3 font-mono text-white">$80,000/yr</td><td className="p-3 text-emerald-400 font-bold">$6,667/mo</td><td className="p-3 text-amber-400 font-mono">$7,500/mo</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$2,500,000</td><td className="p-3 text-sky-400 font-mono">$7,292/mo</td><td className="p-3 font-mono text-white">$100,000/yr</td><td className="p-3 text-emerald-400 font-bold">$8,333/mo</td><td className="p-3 text-amber-400 font-mono">$9,375/mo</td></tr>
                </tbody>
              </table>
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
              Financial Literature & Related Calculators
            </h3>
            <ul className="text-xs text-slate-400 space-y-1.5">
              <li>• Cooley PL, Hubbard CM, Walz DT. Retirement Savings: Choosing a Withdrawal Rate That Is Sustainable. <em>AAII Journal</em>, 20(2):16-21 (1998).</li>
              <li>• Bogle JC. <em>The Little Book of Common Sense Investing</em>. John Wiley & Sons (2017).</li>
              <li>• Bengen W. Determining Withdrawal Rates Using Historical Data. <em>Journal of Financial Planning</em>, 7(4):171-180 (1994).</li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/financial/compound-interest-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Simulate Compound Interest Growth →
              </Link>
              <Link to="/financial/savings-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Calculate Monthly Savings Goals →
              </Link>
              <Link to="/financial/sip-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Systematic Investment Plan (SIP) Calculator →
              </Link>
              <Link to="/financial/mortgage-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Calculate Mortgage Payments →
              </Link>
            </div>
          </div>

          <Disclaimer text="Retirement calculations are projections based on historical annualized market rates and mathematical compounding models. Actual investment returns fluctuate annually with capital market conditions. This tool does not constitute registered financial, tax, or investment advice." />
        </section>
      </div>
    </>
  );
};

export default RetirementCalculator;

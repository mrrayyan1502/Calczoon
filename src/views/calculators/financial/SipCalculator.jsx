'use client';

import React, { useState } from 'react';
import Seo from '@/components/Seo';
import { Link } from 'react-router-dom';
import { TrendingUp, ShieldAlert, CheckCircle2, HelpCircle, Landmark } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { saveCalculation } from '@/lib/history';
import ShareResults from '@/components/ShareResults';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [years, setYears] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      case 'INR': return '₹';
      default: return '$';
    }
  };

  const calculateSip = (e) => {
    e.preventDefault();
    const P = parseFloat(monthlyInvestment);
    const i = parseFloat(expectedReturn);
    const y = parseFloat(years);

    if (isNaN(P) || isNaN(i) || isNaN(y) || P <= 0 || i <= 0 || y <= 0) {
      toast({ title: "Invalid Input", description: "Please enter positive numerical values for all fields.", variant: "destructive" });
      return;
    }

    const monthlyRate = i / 12 / 100;
    const months = y * 12;

    // SIP Future Value formula (Annuity Due): FV = P * [((1 + r)^n - 1) / r] * (1 + r)
    const futureValue = P * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvested = P * months;
    const wealthGained = futureValue - totalInvested;

    const newResult = {
      invested: totalInvested.toFixed(0),
      wealth: wealthGained.toFixed(0),
      total: futureValue.toFixed(0),
      investedPercent: Math.round((totalInvested / futureValue) * 100),
      wealthPercent: Math.round((wealthGained / futureValue) * 100),
      years: y,
    };

    setResult(newResult);
    saveCalculation({
      type: 'SIP',
      inputs: {
        'Monthly Deposit': `${getCurrencySymbol()}${P.toLocaleString()}`,
        'Expected Return': `${i}%`,
        'Time Period': `${y} Years`
      },
      result: {
        'Future Value': `${getCurrencySymbol()}${Number(newResult.total).toLocaleString()}`,
        'Total Profit': `${getCurrencySymbol()}${Number(newResult.wealth).toLocaleString()}`
      }
    });
    toast({ title: "SIP Projection Ready!", description: "Review your portfolio accumulation below." });
  };

  const pageTitle = "SIP Calculator: Systematic Investment Plan Returns 2026 | CalcZoon";
  const pageDescription = "Calculate the future value of your Systematic Investment Plan (SIP) in mutual funds and index ETFs. Project compound interest and dollar-cost averaging growth.";
  const canonicalUrl = "https://calczoon.com/financial/sip-calculator";

  const faqItems = [
    {
      question: "What is a Systematic Investment Plan (SIP) and how does it work?",
      answer: "A Systematic Investment Plan (SIP) is a structured investment methodology where you commit a fixed amount of capital at regular monthly intervals into a mutual fund, ETF, or index fund. By investing automatically every 30 days regardless of market fluctuations, you implement Dollar-Cost Averaging (DCA), buying more fund units when prices decline and fewer units when prices surge."
    },
    {
      question: "Why does an SIP outperform trying to time the stock market?",
      answer: "Market timing requires being right twice: predicting the market peak to sell and predicting the bottom to rebuy. Historical studies by J.P. Morgan Asset Management show that missing just the 10 best trading days in the S&P 500 over a 20-year period cuts your overall portfolio returns by more than half. An SIP removes emotional market timing, ensuring you never miss explosive market recovery rallies."
    },
    {
      question: "What is the difference between an Annuity Due (SIP) and Ordinary Annuity?",
      answer: "In an ordinary annuity, deposits are made at the *end* of each monthly cycle. In an SIP (Annuity Due), contributions occur at the *beginning* of the period. This means each monthly installment earns an additional 30 days of compounding, represented mathematically by multiplying the future value annuity formula by (1 + r)."
    },
    {
      question: "Can I increase my monthly SIP amount as my salary rises (Step-Up SIP)?",
      answer: "Yes, this strategy is known as a Step-Up SIP. Increasing your monthly investment by 5% to 10% annually in step with annual career raises dramatically increases terminal wealth. For example, a 10% annual step-up on a 20-year SIP can double your final portfolio balance compared to a static flat contribution."
    },
    {
      question: "What is a realistic expected annual CAGR return for an equity index SIP?",
      answer: "Historically, broad market equity indices (like the S&P 500 or MSCI World Index) have delivered nominal annualized returns between 9% and 11% over 20+ year horizons (approximately 6.5% to 7.5% real return after inflation). Financial planners recommend modeling 8% to 10% for conservative, realistic projections."
    },
    {
      question: "Are there penalties for stopping, pausing, or modifying an SIP?",
      answer: "No. In modern open-ended mutual funds and retail brokerage platforms, you can pause, decrease, or terminate an SIP mandate at any time without administrative penalties. However, early redemption of fund units within 1 year may incur exit loads (typically 0.5% to 1.0%) or short-term capital gains tax depending on jurisdiction."
    }
  ];

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} canonicalUrl={canonicalUrl} />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title="SIP Calculator" description={pageDescription} icon={TrendingUp} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white text-xl">Systematic Investment Projection</CardTitle>
                <CardDescription className="text-slate-300">
                  Input your recurring monthly contribution, expected annual growth rate, and investment timeline.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={calculateSip} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currency" className="text-slate-300 font-medium">Currency</Label>
                      <select
                        id="currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white h-11"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="INR">INR (₹)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyInvestment" className="text-slate-300 font-medium">
                        Monthly Investment ({getCurrencySymbol()})
                      </Label>
                      <Input
                        id="monthlyInvestment"
                        type="number"
                        min="1"
                        step="10"
                        value={monthlyInvestment}
                        onChange={(e) => setMonthlyInvestment(e.target.value)}
                        placeholder="e.g., 500"
                        required
                        className="bg-slate-900 border-slate-700 text-white rounded-xl h-11"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expectedReturn" className="text-slate-300 font-medium">Expected Annual Return (% CAGR)</Label>
                      <Input
                        id="expectedReturn"
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="30"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(e.target.value)}
                        placeholder="e.g., 10"
                        required
                        className="bg-slate-900 border-slate-700 text-white rounded-xl h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="years" className="text-slate-300 font-medium">Time Period (Years)</Label>
                      <Input
                        id="years"
                        type="number"
                        step="1"
                        min="1"
                        max="50"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        placeholder="e.g., 15"
                        required
                        className="bg-slate-900 border-slate-700 text-white rounded-xl h-11"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-slate-950 font-bold py-3 text-base rounded-xl shadow-lg transition-all duration-300 h-12"
                  >
                    Calculate SIP Wealth Growth
                  </Button>
                </form>
              </CardContent>

              {result && (
                <div className="p-6 bg-slate-900/80 border-t border-slate-700/60">
                  <h3 className="text-lg font-bold text-white mb-6 text-center">
                    Projection After {result.years} Years of Disciplined Investing
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
                      <p className="text-xs text-slate-400 font-medium mb-1">Your Total Contributions</p>
                      <p className="text-2xl font-black text-sky-400">{getCurrencySymbol()}{Number(result.invested).toLocaleString()}</p>
                      <p className="text-xs text-slate-400 mt-1">{result.investedPercent}% of portfolio</p>
                    </div>
                    <div className="p-4 bg-slate-800/80 rounded-xl border border-emerald-900/50 text-center">
                      <p className="text-xs text-emerald-400 font-medium mb-1">Estimated Compound Gains</p>
                      <p className="text-2xl font-black text-emerald-300">{getCurrencySymbol()}{Number(result.wealth).toLocaleString()}</p>
                      <p className="text-xs text-slate-400 mt-1">{result.wealthPercent}% of portfolio</p>
                    </div>
                    <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
                      <p className="text-xs text-slate-400 font-medium mb-1">Total Future Portfolio</p>
                      <p className="text-2xl font-black text-white">{getCurrencySymbol()}{Number(result.total).toLocaleString()}</p>
                      <p className="text-xs text-emerald-400 mt-1">Net Accumulated Value</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs text-slate-300 font-bold">Portfolio Composition:</p>
                    <div className="w-full h-5 bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
                      <div
                        style={{ width: `${result.investedPercent}%` }}
                        className="bg-sky-500 h-full flex items-center justify-center text-[10px] text-white font-bold"
                        title={`Invested: ${result.investedPercent}%`}
                      >
                        {result.investedPercent > 12 ? `${result.investedPercent}%` : ''}
                      </div>
                      <div
                        style={{ width: `${result.wealthPercent}%` }}
                        className="bg-emerald-500 h-full flex items-center justify-center text-[10px] text-slate-950 font-bold"
                        title={`Wealth: ${result.wealthPercent}%`}
                      >
                        {result.wealthPercent > 12 ? `${result.wealthPercent}%` : ''}
                      </div>
                    </div>
                    <div className="flex gap-6 justify-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500 block"></span>
                        <span className="text-slate-300">Principal Deposits ({result.investedPercent}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
                        <span className="text-slate-300">Compound Returns ({result.wealthPercent}%)</span>
                      </div>
                    </div>
                  </div>

                    <div className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 flex items-start gap-3 text-left my-4">
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-emerald-400 block mb-1">Recommended SIP Acceleration Strategy: Step-Up SIP</strong>
                        Increasing your monthly SIP contribution by just 10% each year (matching annual salary raises) can more than double your total 20-year accumulated wealth compared to maintaining a static fixed contribution.
                      </div>
                    </div>

                    <div className="mt-6 flex justify-center border-t border-slate-800 pt-4">
                      <ShareResults
                        title="My SIP Investment Results"
                        text={`For ${getCurrencySymbol()}${monthlyInvestment}/month at ${expectedReturn}%, my projected future value in ${years} years is ${getCurrencySymbol()}${Number(result.total).toLocaleString()}! Calculated via CalcZoon:`}
                        url="/financial/sip-calculator"
                      />
                    </div>
                  </div>
                )}
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-emerald-400" /> Advantages of SIP
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <div className="flex gap-3 items-start">
                  <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400 border border-emerald-500/20 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-0.5 text-xs">Dollar-Cost Averaging (DCA)</h4>
                    <p className="text-slate-400 text-xs">Acquire more mutual fund units when markets dip and fewer when markets peak, driving down average entry cost.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="bg-sky-500/10 p-2 rounded-lg text-sky-400 border border-sky-500/20 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-0.5 text-xs">Behavioral Discipline</h4>
                    <p className="text-slate-400 text-xs">Eliminates emotional FOMO-buying and panic-selling. Automated monthly withdrawals ensure you invest consistently.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <RelatedTools category="financial" />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,150 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10 mb-12">
          {/* Section 1: What is an SIP */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <TrendingUp className="text-emerald-400 w-7 h-7" /> What is a Systematic Investment Plan (SIP) & Why It Builds Wealth
            </h2>
            <p className="text-base md:text-lg">
              A <strong>Systematic Investment Plan (SIP)</strong> is a disciplined wealth accumulation methodology wherein an investor channels a fixed quantum of money at predetermined intervals (usually monthly) into a diversified mutual fund, index fund, or exchange-traded fund (ETF). Rather than attempting to time cyclical stock market tops and bottoms with high-stress lump-sum bets, an SIP automates portfolio growth.
            </p>
            <p>
              In academic financial literature, the mathematical foundation of an SIP is <strong>Dollar-Cost Averaging (DCA)</strong>. When market valuations fluctuate, your fixed recurring payment automatically buys fewer shares at higher prices and more shares at discounted prices. Over multi-year market cycles, this structural behavior reduces your average price per share below the arithmetic average market price, substantially dampening downside portfolio risk.
            </p>
          </div>

          {/* Section 2: Mathematical Annuity Due Formula */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              The Mathematics of Compound Growth: Annuity Due Formula
            </h2>
            <p>
              Because monthly SIP deposits are invested at the start of each month, the model evaluates compound growth using the formal <strong>Future Value of an Annuity Due</strong> equation:
            </p>
            <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 font-mono text-center text-emerald-400 my-4 text-sm md:text-base">
              FV = P × [ ( (1 + r)^n − 1 ) ÷ r ] × (1 + r)
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <p className="text-white font-bold">Variable Definitions:</p>
                <p className="text-slate-300">• <strong>FV:</strong> Future Value (Terminal Portfolio Wealth)</p>
                <p className="text-slate-300">• <strong>P:</strong> Fixed Monthly Contribution Installment</p>
              </div>
              <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <p className="text-white font-bold">Compounding Variables:</p>
                <p className="text-slate-300">• <strong>r:</strong> Monthly Periodic Return (Annual CAGR ÷ 12 ÷ 100)</p>
                <p className="text-slate-300">• <strong>n:</strong> Total Monthly Compounding Periods (Years × 12)</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 pt-1">
              Note: The terminal multiplier <code className="text-emerald-400 font-mono">(1 + r)</code> represents the Annuity Due component, accounting for the additional 30 days of interest earned by investing at the beginning of each cycle rather than the end.
            </p>
          </div>

          {/* Section 3: Step-by-Step Practical Usage Guide */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Step-by-Step Guide: How to Construct an Enduring SIP Strategy
            </h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-white">Step 1: Quantify Your Monthly Disposable Cash Flow:</strong> Review your net income minus mandatory fixed expenses (housing, utilities, debt servicing). Allocate a sustainable 15% to 25% of take-home pay to your investment plan.
              </li>
              <li>
                <strong className="text-white">Step 2: Select a Low-Cost Index Vehicle:</strong> Route your SIP into broad-market index funds (e.g. S&P 500, Total World Stock Market, or Nifty 50) with total expense ratios below 0.15% to maximize long-term retention of returns.
              </li>
              <li>
                <strong className="text-white">Step 3: Establish a Long-Term Time Horizon (10+ Years):</strong> Equities exhibit short-term noise but multi-decade upward drifts. Compounding works its greatest miracles in years 11 through 25.
              </li>
              <li>
                <strong className="text-white">Step 4: Enable Automated Bank Auto-Debits:</strong> Schedule the transfer on the 1st or 5th of each month, immediately following payday, locking in a "Pay Yourself First" financial architecture.
              </li>
              <li>
                <strong className="text-white">Step 5: Implement an Annual Step-Up Strategy:</strong> Whenever you receive an annual merit raise or cost-of-living salary increase, bump your monthly SIP amount by 5% to 10% to supercharge portfolio growth.
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
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">15-Year Horizon</span>
                </div>
                <h3 className="text-lg font-bold text-white">Daniel: $400/month at 10% CAGR</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Monthly Deposit (P):</strong> $400</li>
                  <li><strong>Timeline (y):</strong> 15 Years (180 months)</li>
                  <li><strong>CAGR (i):</strong> 10.0% (Monthly rate r = 0.008333)</li>
                  <li><strong>Total Principal Invested:</strong> $400 × 180 = $72,000</li>
                  <li><strong>Total Future Value:</strong> <span className="text-emerald-400 font-bold text-sm">$167,772</span></li>
                  <li><strong>Wealth Gained (Compound Interest):</strong> <span className="text-emerald-300 font-bold">$95,772</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Takeaway: Daniel's compound earnings ($95.7k) surpass his entire lifetime out-of-pocket capital deposits ($72k), generating 133% in net pure gains.
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-sky-400 font-mono font-bold">Case Study 2</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">25-Year Long Horizon</span>
                </div>
                <h3 className="text-lg font-bold text-white">Priya: $500/month at 12% CAGR</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Monthly Deposit (P):</strong> $500</li>
                  <li><strong>Timeline (y):</strong> 25 Years (300 months)</li>
                  <li><strong>CAGR (i):</strong> 12.0% (Monthly rate r = 0.0100)</li>
                  <li><strong>Total Principal Invested:</strong> $500 × 300 = $150,000</li>
                  <li><strong>Total Future Value:</strong> <span className="text-emerald-400 font-bold text-sm">$948,817</span></li>
                  <li><strong>Wealth Gained:</strong> <span className="text-emerald-300 font-bold">$798,817 (84% of portfolio!)</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Takeaway: By extending the horizon to 25 years, compound interest expands to over 5x Priya's total deposits, creating nearly $1M from a $500/month commitment.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Common Calculation Mistakes */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="text-amber-400 w-6 h-6" /> Critical Pitfalls in SIP Investing
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Stopping SIPs During Market Bear Crashes
                </h3>
                <p className="text-xs text-slate-400">
                  The entire mathematical premise of an SIP hinges on buying depressed units cheaply during recessions. Pausing your plan during corrections destroys Dollar-Cost Averaging, locking in low returns.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Over-Diversifying Across 20 Identical Funds
                </h3>
                <p className="text-xs text-slate-400">
                  Investing across multiple large-cap funds results in duplicate holdings and high expense ratios. Two to three broad, low-fee index funds provide complete global asset diversification.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Neglecting Inflation in 25-Year Projections
                </h3>
                <p className="text-xs text-slate-400">
                  A $1,000,000 nominal figure in 25 years will purchase less than $1,000,000 today. Always subtract an estimated 2.5% to 3.5% inflation rate from nominal returns to calculate real future purchasing power.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Keeping Monthly Contributions Flat for Decades
                </h3>
                <p className="text-xs text-slate-400">
                  Failing to scale contributions as your career earnings grow wastes peak earning years. Make an annual habit of stepping up your SIP contributions by at least 10% each year.
                </p>
              </div>
            </div>
          </div>

          {/* Pre-Calculated Benchmark Table */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Monthly SIP Wealth Accumulation Benchmark Table (12% Annualized Return)</h2>
            <p className="text-sm text-slate-400">
              The benchmark reference table below demonstrates projected portfolio growth across various regular monthly investment amounts at a benchmark 12% equity index CAGR.
            </p>
            <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-slate-950">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                    <th className="p-3 font-semibold">Monthly Deposit</th>
                    <th className="p-3 font-semibold">Investment Term</th>
                    <th className="p-3 font-semibold">Total Invested</th>
                    <th className="p-3 font-semibold text-emerald-400">Projected Portfolio</th>
                    <th className="p-3 font-semibold text-rose-400">Compound Wealth Gain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$100/mo</td><td className="p-3">5 Years</td><td className="p-3 font-mono">$6,000</td><td className="p-3 text-emerald-400 font-bold">$8,249</td><td className="p-3 text-rose-400 font-mono">+$2,249</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$100/mo</td><td className="p-3">10 Years</td><td className="p-3 font-mono">$12,000</td><td className="p-3 text-emerald-400 font-bold">$23,234</td><td className="p-3 text-rose-400 font-mono">+$11,234</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$250/mo</td><td className="p-3">5 Years</td><td className="p-3 font-mono">$15,000</td><td className="p-3 text-emerald-400 font-bold">$20,622</td><td className="p-3 text-rose-400 font-mono">+$5,622</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$250/mo</td><td className="p-3">10 Years</td><td className="p-3 font-mono">$30,000</td><td className="p-3 text-emerald-400 font-bold">$58,085</td><td className="p-3 text-rose-400 font-mono">+$28,085</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$250/mo</td><td className="p-3">15 Years</td><td className="p-3 font-mono">$45,000</td><td className="p-3 text-emerald-400 font-bold">$126,143</td><td className="p-3 text-rose-400 font-mono">+$81,143</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$500/mo</td><td className="p-3">10 Years</td><td className="p-3 font-mono">$60,000</td><td className="p-3 text-emerald-400 font-bold">$116,170</td><td className="p-3 text-rose-400 font-mono">+$56,170</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$500/mo</td><td className="p-3">15 Years</td><td className="p-3 font-mono">$90,000</td><td className="p-3 text-emerald-400 font-bold">$252,286</td><td className="p-3 text-rose-400 font-mono">+$162,286</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$500/mo</td><td className="p-3">20 Years</td><td className="p-3 font-mono">$120,000</td><td className="p-3 text-emerald-400 font-bold">$499,574</td><td className="p-3 text-rose-400 font-mono">+$379,574</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$1,000/mo</td><td className="p-3">15 Years</td><td className="p-3 font-mono">$180,000</td><td className="p-3 text-emerald-400 font-bold">$504,572</td><td className="p-3 text-rose-400 font-mono">+$324,572</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">$1,000/mo</td><td className="p-3">20 Years</td><td className="p-3 font-mono">$240,000</td><td className="p-3 text-emerald-400 font-bold">$999,148</td><td className="p-3 text-rose-400 font-mono">+$759,148</td></tr>
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
              Academic References & Related Financial Calculators
            </h3>
            <ul className="text-xs text-slate-400 space-y-1.5">
              <li>• Statman M. A Behavioral Framework for Dollar-Cost Averaging. <em>Journal of Portfolio Management</em>, 22(1):70-78 (1995).</li>
              <li>• Bogle JC. <em>Common Sense on Mutual Funds</em>. John Wiley & Sons (2010).</li>
              <li>• Siegel JJ. <em>Stocks for the Long Run</em>. McGraw-Hill Education (2022).</li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/financial/compound-interest-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Simulate Compound Interest →
              </Link>
              <Link to="/financial/retirement-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Retirement Planning Calculator →
              </Link>
              <Link to="/financial/savings-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                High-Yield Savings Calculator →
              </Link>
              <Link to="/financial/loan-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Calculate Amortization & Debt →
              </Link>
            </div>
          </div>

          <Disclaimer text="Projected Systematic Investment Plan figures are mathematical estimates derived from constant CAGR assumptions. Capital markets are volatile; actual equity mutual fund and ETF returns will vary from year to year. Past performance does not guarantee future financial returns." />
        </section>
      </div>
    </>
  );
};

export default SipCalculator;

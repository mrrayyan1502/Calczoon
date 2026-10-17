'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveCalculation } from '@/lib/history';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import { TrendingUp, DollarSign, Clock, ShieldCheck, Sparkles, AlertCircle, ArrowRight, CheckCircle2, PieChart, BarChart3 } from 'lucide-react';

const InvestmentRoiCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState('25000');
  const [finalValue, setFinalValue] = useState('55000');
  const [investmentLength, setInvestmentLength] = useState('6');
  const [annualContribution, setAnnualContribution] = useState('0');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const calculateROI = (e) => {
    if (e) e.preventDefault();
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);
    const years = parseFloat(investmentLength) || 1;
    const additionalAnnual = parseFloat(annualContribution) || 0;

    if (isNaN(initial) || isNaN(final) || initial <= 0 || years <= 0) {
      setResult({ error: "Please enter valid positive numbers for your initial investment and duration." });
      return;
    }

    const totalContributed = initial + (additionalAnnual * years);
    const netProfit = final - totalContributed;
    const simpleRoi = (netProfit / totalContributed) * 100;

    // Annualized Return (CAGR) = (Final Value / Total Outlay)^(1 / years) - 1
    let annualizedRoi = 0;
    if (final > 0 && totalContributed > 0) {
      annualizedRoi = (Math.pow(final / totalContributed, 1 / years) - 1) * 100;
    }

    const investmentMultiple = (final / totalContributed).toFixed(2);
    const principalPct = Math.min(100, Math.max(0, (totalContributed / final) * 100)).toFixed(1);
    const profitPct = Math.max(0, 100 - Number(principalPct)).toFixed(1);

    const calculatedResult = {
      initialInvestment: initial.toFixed(2),
      totalContributed: totalContributed.toFixed(2),
      finalValue: final.toFixed(2),
      netProfit: netProfit.toFixed(2),
      simpleRoi: simpleRoi.toFixed(2),
      annualizedRoi: annualizedRoi.toFixed(2),
      investmentMultiple,
      years,
      principalPct,
      profitPct,
      isPositive: netProfit >= 0
    };

    setResult(calculatedResult);
    saveCalculation({
      type: 'Investment ROI',
      inputs: { initialInvestment, finalValue, investmentLength, annualContribution, currency },
      result: {
        NetProfit: `${getCurrencySymbol()}${calculatedResult.netProfit}`,
        SimpleROI: `${calculatedResult.simpleRoi}%`,
        CAGR: `${calculatedResult.annualizedRoi}%`
      }
    });
  };

  const faqItems = [
    {
      question: "What is the critical difference between Simple ROI and Annualized ROI (CAGR)?",
      answer: "Simple Return on Investment (ROI) measures total percentage capital growth over the entire lifetime of an asset, ignoring the time required to achieve that gain. Annualized ROI (Compound Annual Growth Rate or CAGR) divides and geometricizes that return into a standardized yearly percentage. For example, a 100% simple return sounds identical, but doubling your money in 3 years yields a stellar 26% CAGR, whereas doubling your money in 25 years yields barely a 2.8% CAGR."
    },
    {
      question: "What is considered a 'good' annualized ROI across major asset classes?",
      answer: "Historically, broad-market index funds (such as the S&P 500 or MSCI World Index) have generated nominal annualized returns of approximately 9% to 10% (around 7% after inflation). Residential real estate typically yields 4% to 8% in net rental yield plus capital appreciation. High-yield corporate bonds return 5% to 7%, while risk-free government treasury bills offer 3% to 5% depending on prevailing central bank rates."
    },
    {
      question: "How does inflation impact real purchasing power and true investment returns?",
      answer: "Nominal ROI reflects the raw numerical expansion of your capital, while Real ROI reflects changes in actual purchasing power. If your portfolio generates a 9% nominal return while inflation averages 4%, your Real Return is approximately 4.8% using the Fisher Equation: (1 + 0.09) / (1 + 0.04) - 1. High nominal gains in high-inflation environments can mask stagnant real wealth."
    },
    {
      question: "Does this ROI calculator account for capital gains taxes and brokerage commissions?",
      answer: "This tool calculates pre-tax gross investment returns. In real-world asset realization, taxes depend on your asset holding period (short-term vs. long-term capital gains in the US), ISA / Roth tax-free wrappers, depreciation recapture in real estate, and brokerage transaction fees. For precise after-tax liquidation figures, consult our tax planning schedules."
    },
    {
      question: "How does the 'Rule of 72' estimate investment doubling time?",
      answer: "The Rule of 72 is an actuarial shortcut: divide 72 by your expected annualized rate of return (CAGR) to determine approximately how many years it will take for your money to double. At a 10% annual return, an investment doubles in approximately 7.2 years (72 / 10). At a 6% return, doubling requires 12 years (72 / 6)."
    },
    {
      question: "What happens if an investment produces a negative ROI?",
      answer: "A negative ROI indicates a net financial loss, occurring when the liquidation or current market value of an asset falls below your total cost basis. In tax-advantaged accounts, losses are unrecoverable; in standard taxable brokerage accounts, realized capital losses can offset realized capital gains (tax-loss harvesting) and up to $3,000 of ordinary annual income in the United States."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Investment ROI Calculator",
    "description": "Calculate simple return on investment (ROI), annualized compound growth rate (CAGR), and total net profit across real estate, stocks, and business capital.",
    "applicationCategory": "FinancialApplication",
    "operatingSystem": "All",
    "url": "https://calczoon.com/financial/investment-roi-calculator"
  };

  const faqSchema = {
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
        title="Investment ROI Calculator: Simple Return & Annualized CAGR"
        description="Calculate simple and annualized return on investment (ROI & CAGR) with our free tool. Measure profit multiples, visual return distributions, and asset benchmarks."
        canonicalUrl="https://calczoon.com/financial/investment-roi-calculator"
        schema={[webAppSchema, faqSchema]}
      />

      <div className="max-w-4xl mx-auto py-8 px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-800/80 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <TrendingUp className="w-6 h-6" />
                </span>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Investment ROI Calculator</h1>
                  <p className="text-xs sm:text-sm text-slate-400">Evaluate net profit, total percentage return, and annualized CAGR growth rate.</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={calculateROI} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency" className="text-slate-300 font-semibold text-xs">Currency</Label>
                    <select
                      id="currency"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="USD">USD ($) United States</option>
                      <option value="GBP">GBP (£) United Kingdom</option>
                      <option value="EUR">EUR (€) European Union</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="initialInvestment" className="text-slate-300 font-semibold text-xs">
                      Initial Capital Outlay ({getCurrencySymbol()})
                    </Label>
                    <Input
                      id="initialInvestment"
                      type="number"
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(e.target.value)}
                      placeholder="e.g. 25000"
                      required
                      className="bg-slate-950 border-slate-800 text-white rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="finalValue" className="text-slate-300 font-semibold text-xs">
                      Final Value / Selling Price ({getCurrencySymbol()})
                    </Label>
                    <Input
                      id="finalValue"
                      type="number"
                      value={finalValue}
                      onChange={(e) => setFinalValue(e.target.value)}
                      placeholder="e.g. 55000"
                      required
                      className="bg-slate-950 border-slate-800 text-white rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="investmentLength" className="text-slate-300 font-semibold text-xs">
                      Holding Period (Years)
                    </Label>
                    <Input
                      id="investmentLength"
                      type="number"
                      step="0.1"
                      value={investmentLength}
                      onChange={(e) => setInvestmentLength(e.target.value)}
                      placeholder="e.g. 6"
                      required
                      className="bg-slate-950 border-slate-800 text-white rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="annualContribution" className="text-slate-300 font-semibold text-xs">
                      Additional Annual Contributions ({getCurrencySymbol()}, Optional)
                    </Label>
                    <Input
                      id="annualContribution"
                      type="number"
                      value={annualContribution}
                      onChange={(e) => setAnnualContribution(e.target.value)}
                      placeholder="e.g. 0"
                      className="bg-slate-950 border-slate-800 text-white rounded-xl"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold h-12 rounded-xl shadow-lg transition-all duration-300">
                  Analyze Investment Return &amp; Compound CAGR
                </Button>
              </form>
            </CardContent>

            {result && !result.error && (
              <CardFooter className="flex flex-col items-start p-6 bg-slate-950/80 border-t border-slate-800/80">
                <div className="w-full space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Total Net Profit Generated</p>
                      <p className={`text-3xl sm:text-4xl font-extrabold mt-1 ${result.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {getCurrencySymbol()}{Number(result.netProfit).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Annualized Return (CAGR)</p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-sky-400 mt-1">
                        {result.annualizedRoi}% / Year
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Total Capital Invested</p>
                      <p className="font-bold text-white mt-1">{getCurrencySymbol()}{Number(result.totalContributed).toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Simple Lifetime ROI</p>
                      <p className="font-bold text-emerald-400 mt-1">{result.simpleRoi}%</p>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Capital Multiple</p>
                      <p className="font-bold text-sky-400 mt-1">{result.investmentMultiple}x Return</p>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Time Horizon</p>
                      <p className="font-bold text-indigo-400 mt-1">{result.years} Years</p>
                    </div>
                  </div>

                  {/* Visual Return Breakdown Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400 font-semibold">
                      <span>Invested Capital: {result.principalPct}%</span>
                      <span>Net Wealth Gain: {result.profitPct}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                      <div
                        className="bg-slate-600 h-full transition-all duration-500"
                        style={{ width: `${result.principalPct}%` }}
                      ></div>
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-sky-500 h-full transition-all duration-500"
                        style={{ width: `${result.profitPct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Smart Financial Tip Callout Box */}
                  <div className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-emerald-400 block mb-1">Portfolio Strategy: The Rule of 72 Benchmark</strong>
                      At your calculated annual growth rate of {result.annualizedRoi}% per year, your investment portfolio is projected to double in value approximately every {(72 / Math.max(1, Number(result.annualizedRoi))).toFixed(1)} years through compound reinvestment.
                    </div>
                  </div>

                  <div className="pt-2">
                    <ShareResults
                      title="My Investment ROI Analysis"
                      text={`My investment produced a ${result.simpleRoi}% total return (${result.annualizedRoi}% Annualized CAGR) generating ${getCurrencySymbol()}${result.netProfit} in profit. Analyze your portfolio on CalcZoon.`}
                      url="https://calczoon.com/financial/investment-roi-calculator"
                    />
                  </div>
                </div>
              </CardFooter>
            )}

            {result && result.error && (
              <CardFooter className="p-6 bg-rose-950/20 border-t border-rose-900/40">
                <div className="flex items-center gap-2 text-rose-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{result.error}</span>
                </div>
              </CardFooter>
            )}
          </Card>
        </motion.div>

        {/* --- DEEP REA SEO CONTENT (1000+ WORDS, HTML TABLE, FORMULA & CASE STUDIES) --- */}
        <article className="mt-12 space-y-12 text-slate-300 leading-relaxed text-sm sm:text-base">

          {/* Section 1: Conceptual Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Clock className="w-6 h-6 text-emerald-400" />
              The Fundamentals of Return on Investment: Evaluating Financial Efficiency
            </h2>
            <p>
              Return on Investment (ROI) is the universal profitability metric utilized by venture capitalists, institutional asset managers, private equity partners, and retail investors to quantify the financial performance of an asset relative to its historical cost. Whether assessing a buy-and-hold residential rental property, a diversified index fund portfolio, a high-yield corporate bond, or direct equipment expenditure in a small business, ROI provides an objective baseline to compare competing investment vehicles.
            </p>
            <p>
              However, analyzing investment performance exclusively through simple total return can create deceptive illusions. An asset that produces a 50% total return across two years represents a high-performing investment (yielding roughly 22.5% annualized CAGR). That same 50% return delivered across twenty years represents severe underperformance (barely 2.05% annualized), substantially lagging monetary inflation and destroying real purchasing power. Comprehensive investment analysis requires measuring both nominal profit and annualized compound performance.
            </p>
          </section>

          {/* Section 2: Mathematical Formula & Derivations */}
          <section className="space-y-4 p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-sky-400" />
              Exact Mathematical Formulas for Simple ROI, Net Profit, and CAGR
            </h2>
            <p>
              The baseline Simple Return on Investment is calculated by taking the net profit and dividing it by total capital outlay:
            </p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-emerald-400 text-xs sm:text-sm overflow-x-auto space-y-1">
              <p>Net Profit = Final Asset Value - Total Capital Invested</p>
              <p>Simple ROI (%) = (Net Profit / Total Capital Invested) * 100</p>
            </div>
            <p className="text-xs text-slate-400">
              Where <strong>Total Capital Invested</strong> includes initial acquisition principal plus all supplementary periodic contributions or direct renovation outlays.
            </p>
            <p>
              To standardize performance across multi-year holding periods, the Annualized Return (Compound Annual Growth Rate or CAGR) is derived geometrically:
            </p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sky-400 text-xs sm:text-sm overflow-x-auto">
              CAGR (%) = [ (Final Asset Value / Total Capital Invested)^(1 / n) - 1 ] * 100
            </div>
            <p className="text-xs text-slate-400">
              Where <strong>n</strong> represents the holding duration in years. To calculate the <strong>Real (Inflation-Adjusted) Return</strong>, apply the Fisher Equation: <strong>Real ROI = [ (1 + Nominal ROI) / (1 + Inflation Rate) ] - 1</strong>.
            </p>
          </section>

          {/* Section 3: Two Detailed Real-World Case Studies */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              Real-World Case Studies: Investment ROI in Action ($ and £)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Case Study 1 (US Dollar Scenario)
                </span>
                <h3 className="text-lg font-bold text-white">Sarah's Index Fund Portfolio ($25,000 Outlay)</h3>
                <p className="text-xs text-slate-300">
                  In 2018, Sarah invested $25,000 into a low-cost S&amp;P 500 index fund. Six years later in 2024, reinvesting all dividends, her portfolio balance reached $54,800.
                </p>
                <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1 text-slate-300 font-mono">
                  <p>• Initial Capital Outlay: $25,000.00</p>
                  <p>• Ending Balance (Year 6): $54,800.00</p>
                  <p>• Net Profit: $29,800.00</p>
                  <p className="text-emerald-400 font-bold">• Simple Lifetime ROI: 119.20%</p>
                  <p className="text-sky-400 font-bold">• Annualized Return (CAGR): 13.98% / year</p>
                </div>
                <p className="text-xs text-slate-400">
                  Sarah's capital more than doubled, delivering an impressive 13.98% CAGR. This comfortably outpaced the 4.2% average inflation rate during that span, multiplying her real net purchasing power.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                  Case Study 2 (British Pound Scenario)
                </span>
                <h3 className="text-lg font-bold text-white">Oliver's Buy-to-Let Property in Leeds (£180,000)</h3>
                <p className="text-xs text-slate-300">
                  Oliver acquired a residential rental property for £180,000 cash in 2019. Over 5 years, he collected £42,000 in cumulative net rental cash flow and sold the home for £230,000.
                </p>
                <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1 text-slate-300 font-mono">
                  <p>• Total Acquisition Outlay: £180,000.00</p>
                  <p>• Total Proceeds (Sale + Rent): £272,000.00</p>
                  <p>• Total Net Profit: £92,000.00</p>
                  <p className="text-emerald-400 font-bold">• Simple Lifetime ROI: 51.11%</p>
                  <p className="text-sky-400 font-bold">• Annualized Return (CAGR): 8.61% / year</p>
                </div>
                <p className="text-xs text-slate-400">
                  Combining capital appreciation with operating rental yield generated an 8.61% annualized return for Oliver, demonstrating the power of multi-stream income in real estate equity growth.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Static HTML Reference Table with 10+ Precalculated Scenarios */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Pre-Calculated Investment ROI Benchmark Table Across Asset Classes
            </h2>
            <p className="text-xs text-slate-400">
              The reference table below illustrates realistic returns across varying initial capital outlays, holding timeframes, and historical asset class benchmarks.
            </p>

            <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-slate-950">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                    <th className="p-3 font-semibold">Asset Class Benchmark</th>
                    <th className="p-3 font-semibold">Initial Capital</th>
                    <th className="p-3 font-semibold">Final Value</th>
                    <th className="p-3 font-semibold">Timeframe</th>
                    <th className="p-3 font-semibold text-sky-400">Simple ROI</th>
                    <th className="p-3 font-semibold text-emerald-400">Annualized CAGR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">Treasury Bills / Cash Equivalent</td>
                    <td className="p-3 font-mono">$10,000</td>
                    <td className="p-3 font-mono">$11,500</td>
                    <td className="p-3">3 Years</td>
                    <td className="p-3 text-sky-400 font-medium">15.00%</td>
                    <td className="p-3 text-emerald-400 font-bold">4.77% / yr</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">High-Yield Corporate Bonds</td>
                    <td className="p-3 font-mono">$25,000</td>
                    <td className="p-3 font-mono">$33,500</td>
                    <td className="p-3">5 Years</td>
                    <td className="p-3 text-sky-400 font-medium">34.00%</td>
                    <td className="p-3 text-emerald-400 font-bold">6.03% / yr</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">Residential Rental Real Estate</td>
                    <td className="p-3 font-mono">$50,000</td>
                    <td className="p-3 font-mono">$82,000</td>
                    <td className="p-3">6 Years</td>
                    <td className="p-3 text-sky-400 font-medium">64.00%</td>
                    <td className="p-3 text-emerald-400 font-bold">8.59% / yr</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">Broad Index Fund (S&amp;P 500)</td>
                    <td className="p-3 font-mono">$20,000</td>
                    <td className="p-3 font-mono">$41,500</td>
                    <td className="p-3">8 Years</td>
                    <td className="p-3 text-sky-400 font-medium">107.50%</td>
                    <td className="p-3 text-emerald-400 font-bold">9.55% / yr</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">Large-Cap Dividend Aristocrats</td>
                    <td className="p-3 font-mono">$35,000</td>
                    <td className="p-3 font-mono">$68,000</td>
                    <td className="p-3">10 Years</td>
                    <td className="p-3 text-sky-400 font-medium">94.29%</td>
                    <td className="p-3 text-emerald-400 font-bold">6.87% / yr</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">Tech Growth Equity (Nasdaq 100)</td>
                    <td className="p-3 font-mono">$15,000</td>
                    <td className="p-3 font-mono">$48,000</td>
                    <td className="p-3">7 Years</td>
                    <td className="p-3 text-sky-400 font-medium">220.00%</td>
                    <td className="p-3 text-emerald-400 font-bold">18.08% / yr</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">Commercial Logistics Facility</td>
                    <td className="p-3 font-mono">$100,000</td>
                    <td className="p-3 font-mono">$165,000</td>
                    <td className="p-3">5 Years</td>
                    <td className="p-3 text-sky-400 font-medium">65.00%</td>
                    <td className="p-3 text-emerald-400 font-bold">10.53% / yr</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">Private Equity / Small Business</td>
                    <td className="p-3 font-mono">$75,000</td>
                    <td className="p-3 font-mono">$190,000</td>
                    <td className="p-3">6 Years</td>
                    <td className="p-3 text-sky-400 font-medium">153.33%</td>
                    <td className="p-3 text-emerald-400 font-bold">16.76% / yr</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">Balanced 60/40 Conservative Stock/Bond</td>
                    <td className="p-3 font-mono">$50,000</td>
                    <td className="p-3 font-mono">$92,000</td>
                    <td className="p-3">10 Years</td>
                    <td className="p-3 text-sky-400 font-medium">84.00%</td>
                    <td className="p-3 text-emerald-400 font-bold">6.28% / yr</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">Emerging Markets Growth Fund</td>
                    <td className="p-3 font-mono">$30,000</td>
                    <td className="p-3 font-mono">$62,500</td>
                    <td className="p-3">9 Years</td>
                    <td className="p-3 text-sky-400 font-medium">108.33%</td>
                    <td className="p-3 text-emerald-400 font-bold">8.50% / yr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Strategic Decision Framework & Traps to Avoid */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Critical Pitfalls in Return on Investment Calculations
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Ignoring Ongoing Holding &amp; Operating Expenses</strong>
                  <p className="text-xs text-slate-300">
                    Calculating property or business ROI strictly based on purchase and sale prices ignores property taxes, insurance, management fees, and maintenance capital expenditures, which can lower real returns by 3% to 5% annually.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Confusing Cumulative Growth with Annual Rate</strong>
                  <p className="text-xs text-slate-300">
                    Advertising a "50% return" over a 10-year span sounds attractive, but mathematically represents an annualized return of only 4.14%—which may lag the consumer price index (CPI).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Failing to Account for Opportunity Cost</strong>
                  <p className="text-xs text-slate-300">
                    An investment that achieves a 6% return in an economic environment where risk-free government bonds pay 5.25% yields a risk premium of barely 0.75%, which may not justify the underlying capital volatility.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: FAQs (Rendered Visually) */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Frequently Asked Questions About Investment Return on Investment (ROI)
            </h2>
            <Faq items={faqItems} className="mt-4" />
          </section>

          {/* Section 7: YMYL Disclaimer */}
          <section className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              YMYL Investment Performance Disclosure &amp; Regulatory Standard
            </div>
            <p>
              CalcZoon provides this Return on Investment (ROI) and Compound Annual Growth Rate (CAGR) calculator strictly for educational, illustrative, and personal financial modeling purposes. All returns, growth multiples, and scenario benchmarks are hypothetical and do not represent guaranteed financial outcomes or certified securities endorsements. Past performance is no guarantee of future results. Actual investment returns are subject to market volatility, liquidity constraints, capital gains tax liability, currency exchange swings, and brokerage fees. Consult a certified financial planner (CFP), registered investment advisor (RIA), or licensed tax accountant before executing any investment transactions.
            </p>
          </section>

        </article>
      </div>
    </>
  );
};

export default InvestmentRoiCalculator;

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
import { DollarSign, Briefcase, Clock, ShieldCheck, Sparkles, AlertCircle, ArrowRight, CheckCircle2, TrendingUp, Calculator } from 'lucide-react';

const SalaryCalculator = () => {
  const [salary, setSalary] = useState('65000');
  const [payFrequency, setPayFrequency] = useState('annually');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [daysPerWeek, setDaysPerWeek] = useState('5');
  const [estimatedTaxRate, setEstimatedTaxRate] = useState('22');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const calculateSalary = (e) => {
    if (e) e.preventDefault();
    const amount = parseFloat(salary);
    const hours = parseFloat(hoursPerWeek) || 40;
    const days = parseFloat(daysPerWeek) || 5;
    const taxRatePct = parseFloat(estimatedTaxRate) || 0;

    if (isNaN(amount) || amount <= 0 || hours <= 0 || days <= 0) {
      setResult({ error: "Please enter a valid positive salary amount and standard working hours." });
      return;
    }

    const totalAnnualHours = hours * 52;
    const totalAnnualDays = days * 52;

    let annualGross;
    switch (payFrequency) {
      case 'hourly':
        annualGross = amount * totalAnnualHours;
        break;
      case 'daily':
        annualGross = amount * totalAnnualDays;
        break;
      case 'weekly':
        annualGross = amount * 52;
        break;
      case 'biweekly':
        annualGross = amount * 26;
        break;
      case 'monthly':
        annualGross = amount * 12;
        break;
      default:
        annualGross = amount;
    }

    const monthlyGross = annualGross / 12;
    const biweeklyGross = annualGross / 26;
    const weeklyGross = annualGross / 52;
    const dailyGross = annualGross / totalAnnualDays;
    const hourlyGross = annualGross / totalAnnualHours;

    const estimatedAnnualTax = annualGross * (taxRatePct / 100);
    const annualNet = annualGross - estimatedAnnualTax;
    const monthlyNet = annualNet / 12;
    const biweeklyNet = annualNet / 26;
    const weeklyNet = annualNet / 52;
    const hourlyNet = annualNet / totalAnnualHours;

    const calculatedResult = {
      annualGross: annualGross.toFixed(2),
      monthlyGross: monthlyGross.toFixed(2),
      biweeklyGross: biweeklyGross.toFixed(2),
      weeklyGross: weeklyGross.toFixed(2),
      dailyGross: dailyGross.toFixed(2),
      hourlyGross: hourlyGross.toFixed(2),
      annualNet: annualNet.toFixed(2),
      monthlyNet: monthlyNet.toFixed(2),
      biweeklyNet: biweeklyNet.toFixed(2),
      weeklyNet: weeklyNet.toFixed(2),
      hourlyNet: hourlyNet.toFixed(2),
      estimatedAnnualTax: estimatedAnnualTax.toFixed(2),
      taxRatePct: taxRatePct.toFixed(1),
      netPercentage: (100 - taxRatePct).toFixed(1)
    };

    setResult(calculatedResult);
    saveCalculation({
      type: 'Salary Conversion',
      inputs: { salary, payFrequency, hoursPerWeek, daysPerWeek, estimatedTaxRate, currency },
      result: {
        AnnualGross: `${getCurrencySymbol()}${calculatedResult.annualGross}`,
        HourlyGross: `${getCurrencySymbol()}${calculatedResult.hourlyGross}`,
        MonthlyNet: `${getCurrencySymbol()}${calculatedResult.monthlyNet}`
      }
    });
  };

  const faqItems = [
    {
      question: "How do you accurately convert an annual salary into an hourly wage rate?",
      answer: "In standard payroll accounting, an annual salary is divided by total annual paid hours. For a traditional full-time employee working 40 hours per week across 52 weeks, the standard baseline is 2,080 working hours per year (40 hours * 52 weeks). For example, a $65,000 annual salary yields a standard hourly rate of $31.25 ($65,000 / 2,080). If your position includes uncompensated overtime or different contracted hours, our tool allows you to customize your exact weekly schedule."
    },
    {
      question: "What is the difference between gross salary and net take-home pay?",
      answer: "Gross salary represents the total compensation agreed upon in your employment agreement before any withholdings or payroll deductions occur. Net take-home pay is the liquid capital deposited into your bank account after mandatory federal, state, and local income taxes, Social Security (FICA), Medicare, pension contributions, and healthcare benefit premiums have been deducted."
    },
    {
      question: "How many working days and working hours are in a typical calendar year?",
      answer: "A standard calendar year contains 52 weeks and 1 to 2 extra days (52.14 weeks). A conventional 5-day work week consists of 260 working days (5 days * 52 weeks). Assuming a standard 8-hour workday, this equates to 2,080 working hours. In leap years, working days increase to 261 or 262 depending on calendar day alignment."
    },
    {
      question: "How do bi-weekly pay schedules differ from semi-monthly pay periods?",
      answer: "A bi-weekly schedule pays employees every two weeks, generating 26 paychecks per year. This results in two months per year having three paychecks instead of two. A semi-monthly schedule pays employees twice per month (typically on the 15th and the final day of the month), producing exactly 24 paychecks per year with slightly larger gross distributions per paycheck."
    },
    {
      question: "How should salaried employees evaluate job offers with different benefits?",
      answer: "When comparing employment opportunities, evaluating only nominal base salary can be misleading. Factor in total compensation: employer 401(k) / pension matching percentages, subsidized health insurance premiums, paid time off (PTO) allotments, annual bonuses, equity grants, and commuting costs. A $75,000 salary with comprehensive healthcare and a 6% 401(k) match often yields higher net financial wealth than an $82,000 offer with zero benefits."
    },
    {
      question: "How does overtime pay work when transitioning between hourly and salaried roles?",
      answer: "Under the US Fair Labor Standards Act (FLSA) and UK Employment Rights legislation, non-exempt hourly workers are legally entitled to 1.5x overtime pay for all hours worked exceeding 40 per week. Exempt salaried employees receive a fixed predetermined salary regardless of how many hours they work. If a salaried employee regularly works 50 hours per week, their effective hourly rate decreases significantly."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Salary Calculator",
    "description": "Convert gross and net pay across annual, monthly, bi-weekly, weekly, daily, and hourly frequencies with customizable working hours and tax estimates.",
    "applicationCategory": "FinancialApplication",
    "operatingSystem": "All",
    "url": "https://calczoon.com/financial/salary-calculator"
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
        title="Salary Calculator: Convert Hourly, Weekly, Monthly & Annual Pay"
        description="Convert your gross income between annual, monthly, bi-weekly, weekly, daily, and hourly rates. Calculate estimated net take-home pay, benchmark pay tables, and tax deductions."
        canonicalUrl="https://calczoon.com/financial/salary-calculator"
        schema={[webAppSchema, faqSchema]}
      />

      <div className="max-w-4xl mx-auto py-8 px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-800/80 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Briefcase className="w-6 h-6" />
                </span>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Salary Calculator</h1>
                  <p className="text-xs sm:text-sm text-slate-400">Convert pay frequencies, analyze hourly earnings, and estimate net take-home compensation.</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={calculateSalary} className="space-y-6">
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
                    <Label htmlFor="salary" className="text-slate-300 font-semibold text-xs">
                      Gross Compensation Amount ({getCurrencySymbol()})
                    </Label>
                    <Input
                      id="salary"
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="e.g. 65000"
                      required
                      className="bg-slate-950 border-slate-800 text-white rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payFrequency" className="text-slate-300 font-semibold text-xs">Stated Pay Frequency</Label>
                    <select
                      id="payFrequency"
                      value={payFrequency}
                      onChange={(e) => setPayFrequency(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="annually">Per Year (Annual Salary)</option>
                      <option value="monthly">Per Month</option>
                      <option value="biweekly">Every 2 Weeks (Bi-Weekly)</option>
                      <option value="weekly">Per Week</option>
                      <option value="daily">Per Day</option>
                      <option value="hourly">Per Hour</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hoursPerWeek" className="text-slate-300 font-semibold text-xs">
                      Working Hours / Week
                    </Label>
                    <Input
                      id="hoursPerWeek"
                      type="number"
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(e.target.value)}
                      placeholder="e.g. 40"
                      required
                      className="bg-slate-950 border-slate-800 text-white rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="daysPerWeek" className="text-slate-300 font-semibold text-xs">
                      Working Days / Week
                    </Label>
                    <Input
                      id="daysPerWeek"
                      type="number"
                      value={daysPerWeek}
                      onChange={(e) => setDaysPerWeek(e.target.value)}
                      placeholder="e.g. 5"
                      required
                      className="bg-slate-950 border-slate-800 text-white rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxRate" className="text-slate-300 font-semibold text-xs">
                      Estimated Tax &amp; Deductions (%)
                    </Label>
                    <Input
                      id="taxRate"
                      type="number"
                      step="0.5"
                      value={estimatedTaxRate}
                      onChange={(e) => setEstimatedTaxRate(e.target.value)}
                      placeholder="e.g. 22"
                      className="bg-slate-950 border-slate-800 text-white rounded-xl"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold h-12 rounded-xl shadow-lg transition-all duration-300">
                  Convert Salary &amp; Calculate Take-Home Pay
                </Button>
              </form>
            </CardContent>

            {result && !result.error && (
              <CardFooter className="flex flex-col items-start p-6 bg-slate-950/80 border-t border-slate-800/80">
                <div className="w-full space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Annual Gross Compensation</p>
                      <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mt-1">
                        {getCurrencySymbol()}{Number(result.annualGross).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Estimated Net Take-Home (Annual)</p>
                      <p className="text-xl sm:text-2xl font-bold text-white mt-1">
                        {getCurrencySymbol()}{Number(result.annualNet).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Complete Pay Breakdown Table Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Hourly Rate</p>
                      <p className="font-bold text-white mt-1">{getCurrencySymbol()}{result.hourlyGross}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Net: {getCurrencySymbol()}{result.hourlyNet}</p>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Weekly Pay</p>
                      <p className="font-bold text-white mt-1">{getCurrencySymbol()}{Number(result.weeklyGross).toLocaleString()}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Net: {getCurrencySymbol()}{Number(result.weeklyNet).toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Bi-Weekly Pay</p>
                      <p className="font-bold text-sky-400 mt-1">{getCurrencySymbol()}{Number(result.biweeklyGross).toLocaleString()}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Net: {getCurrencySymbol()}{Number(result.biweeklyNet).toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Monthly Gross</p>
                      <p className="font-bold text-emerald-400 mt-1">{getCurrencySymbol()}{Number(result.monthlyGross).toLocaleString()}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Net: {getCurrencySymbol()}{Number(result.monthlyNet).toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <p className="text-xs text-slate-400">Est. Tax Withheld</p>
                      <p className="font-bold text-rose-400 mt-1">{getCurrencySymbol()}{Number(result.estimatedAnnualTax).toLocaleString()}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{result.taxRatePct}% rate</p>
                    </div>
                  </div>

                  {/* Visual Progress Bar: Take-Home Pay vs Taxes */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400 font-semibold">
                      <span>Net Cash in Hand: {result.netPercentage}%</span>
                      <span>Estimated Taxes/Deductions: {result.taxRatePct}%</span>
                    </div>
                    <div className="w-full h-3 bg-rose-900/40 rounded-full overflow-hidden flex">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-sky-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${result.netPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Smart Financial Tip Callout Box */}
                  <div className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-emerald-400 block mb-1">Career &amp; Wealth Tip: The "Gross vs. Value" Negotiation Rule</strong>
                      When negotiating a new salary or promotion, asking for non-taxable employer benefits (such as health savings account (HSA) seed money, tuition reimbursement, or extra PTO days) can provide higher effective wealth than a nominal pre-tax bump that gets clipped by higher marginal tax brackets.
                    </div>
                  </div>

                  <div className="pt-2">
                    <ShareResults
                      title="My Comprehensive Salary Breakdown"
                      text={`A salary of ${getCurrencySymbol()}${result.annualGross} equals an hourly rate of ${getCurrencySymbol()}${result.hourlyGross} and monthly net take-home of ${getCurrencySymbol()}${result.monthlyNet}. Calculate your pay on CalcZoon.`}
                      url="https://calczoon.com/financial/salary-calculator"
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
              Understanding Salary Mathematics: Deconstructing Modern Compensation Structures
            </h2>
            <p>
              In modern workforce economics, employment compensation is quoted across diverse time intervals depending on industry norms, geographic location, and contractual classifications. Freelancers, contractors, and retail professionals typically think in terms of hourly rates, while corporate, healthcare, and engineering professionals receive annual salary offers. Converting accurately between hourly wages, daily per-diems, bi-weekly paychecks, and gross annual earnings is critical for comparing job offers, negotiating performance raises, and managing household living budgets.
            </p>
            <p>
              However, nominal gross salary only tells half the financial story. What genuinely matters for household purchasing power and wealth accumulation is net take-home pay—the residual liquidity that remains after mandatory national income taxes, local municipal levies, payroll insurance (such as FICA or National Insurance), and employer-sponsored benefit contributions are deducted. By examining both gross equivalents and estimated net distributions, employees can accurately benchmark their real hourly value.
            </p>
            <p>
              Moreover, career decision-making requires evaluating contractual classifications such as W2 salaried exempt versus 1099 independent contractor arrangements. Independent contractors must bear the full 15.3% burden of self-employment payroll taxes (covering both employer and employee portions of Social Security and Medicare) and self-fund healthcare coverage. Therefore, an independent contractor must command an hourly billing rate at least 25% to 35% higher than an equivalent salaried W2 employee to achieve economic parity.
            </p>
            <p>
              Understanding your exact daily and hourly earnings also empowers smarter negotiation during performance reviews and bonus distributions. Knowing that an extra $5,000 annual raise translates to roughly $2.40 per hour or $96 per week allows professionals to realistically quantify counter-offers and assess the true economic impact of prospective career moves.
            </p>
          </section>

          {/* Section 2: Mathematical Formula & Conversion Derivations */}
          <section className="space-y-4 p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-sky-400" />
              Exact Mathematical Formulas for Salary and Wage Conversion
            </h2>
            <p>
              The baseline conversion from Annual Salary to Hourly Wage relies on the total contracted work hours in a standard operational year:
            </p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-emerald-400 text-xs sm:text-sm overflow-x-auto">
              Hourly Wage = Annual Gross Salary / (Weekly Work Hours * 52)
            </div>
            <p className="text-xs text-slate-400">
              For a standard full-time employee working 40 hours per week, the annual divisor equals 2,080 hours (40 * 52). Thus: Hourly = Annual / 2,080.
            </p>
            <p>
              To convert across intermediate payment intervals:
            </p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sky-400 text-xs sm:text-sm overflow-x-auto space-y-1">
              <p>• Monthly Gross = Annual Gross / 12</p>
              <p>• Semi-Monthly Gross = Annual Gross / 24</p>
              <p>• Bi-Weekly Gross = Annual Gross / 26</p>
              <p>• Weekly Gross = Annual Gross / 52</p>
              <p>• Daily Gross = Annual Gross / (Weekly Work Days * 52)</p>
            </div>
            <p className="text-xs text-slate-400">
              Estimated Net Take-Home Pay is calculated by applying an effective statutory deduction rate <strong>T</strong> (comprising federal/state income tax brackets, healthcare premiums, and social insurance): <strong>Net Pay = Gross Pay * (1 - T)</strong>.
            </p>
          </section>

          {/* Section 3: Two Detailed Real-World Case Studies */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              Real-World Case Studies: Salary Conversions ($ and £)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Case Study 1 (US Dollar Scenario)
                </span>
                <h3 className="text-lg font-bold text-white">Alex's Tech Role: Salaried vs. Contractor Offer</h3>
                <p className="text-xs text-slate-300">
                  Alex is weighing two job opportunities in Austin, Texas: an exempt salaried position offering $95,000 per year with standard 40-hour weeks, versus an independent contracting gig offering $52.00 per hour with zero paid time off (PTO).
                </p>
                <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1 text-slate-300 font-mono">
                  <p>• Salaried Equivalent Hourly: $45.67 / hr</p>
                  <p>• Salaried Monthly Gross: $7,916.67</p>
                  <p>• Contractor Annual (2,000 billable hrs): $104,000</p>
                  <p>• Self-Employment Tax Offset (7.65%): -$7,956</p>
                  <p className="text-emerald-400 font-bold">• Effective Net Difference: Under $1,500/yr</p>
                </div>
                <p className="text-xs text-slate-400">
                  Using our calculator, Alex realized that after accounting for 3 weeks of unpaid vacation and the additional 7.65% self-employment tax burden on the 1099 contract, the $95k W2 salaried role with 401(k) matching actually provided superior net wealth.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                  Case Study 2 (British Pound Scenario)
                </span>
                <h3 className="text-lg font-bold text-white">James's London Corporate Promotion (£55,000)</h3>
                <p className="text-xs text-slate-300">
                  James earns £42,000 as a project coordinator in London and is offered a senior managerial promotion paying £55,000 per annum (contracted at 37.5 hours per week).
                </p>
                <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1 text-slate-300 font-mono">
                  <p>• Base Hourly Rate Increase: £21.54 ➔ £28.21 / hr</p>
                  <p>• Monthly Gross Jump: £3,500.00 ➔ £4,583.33</p>
                  <p>• Higher Rate Tax (40% above £50,270): £1,892.00</p>
                  <p>• Estimated Monthly Net Increase: +£645.00</p>
                  <p className="text-sky-400 font-bold">• Real Take-Home Percentage: ~73.5%</p>
                </div>
                <p className="text-xs text-slate-400">
                  James clearly sees that while his gross compensation increased by £1,083 per month, his net take-home pay rose by £645 due to the 40% higher-rate tax bracket threshold, helping him plan his revised mortgage and pension allocation accurately.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Static HTML Reference Table with 10+ Precalculated Scenarios */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Pre-Calculated Salary Benchmark Conversion Table (Standard 40-Hr Week)
            </h2>
            <p className="text-xs text-slate-400">
              The reference table below illustrates exact mathematical conversions across full-time gross salary tiers, comparing hourly, weekly, and monthly rates alongside estimated net take-home earnings (modeled at a standard 20% aggregate tax and deduction rate).
            </p>

            <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-slate-950">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                    <th className="p-3 font-semibold">Annual Salary</th>
                    <th className="p-3 font-semibold">Hourly Rate</th>
                    <th className="p-3 font-semibold">Daily Rate</th>
                    <th className="p-3 font-semibold">Weekly Pay</th>
                    <th className="p-3 font-semibold text-sky-400">Monthly Gross</th>
                    <th className="p-3 font-semibold text-emerald-400">Est. Monthly Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono text-white">$30,000</td>
                    <td className="p-3 font-mono">$14.42</td>
                    <td className="p-3 font-mono">$115.38</td>
                    <td className="p-3 font-mono">$576.92</td>
                    <td className="p-3 text-sky-400 font-medium">$2,500.00</td>
                    <td className="p-3 text-emerald-400 font-bold">$2,000.00</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono text-white">$45,000</td>
                    <td className="p-3 font-mono">$21.63</td>
                    <td className="p-3 font-mono">$173.08</td>
                    <td className="p-3 font-mono">$865.38</td>
                    <td className="p-3 text-sky-400 font-medium">$3,750.00</td>
                    <td className="p-3 text-emerald-400 font-bold">$3,000.00</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono text-white">$55,000</td>
                    <td className="p-3 font-mono">$26.44</td>
                    <td className="p-3 font-mono">$211.54</td>
                    <td className="p-3 font-mono">$1,057.69</td>
                    <td className="p-3 text-sky-400 font-medium">$4,583.33</td>
                    <td className="p-3 text-emerald-400 font-bold">$3,666.67</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono text-white">$65,000</td>
                    <td className="p-3 font-mono">$31.25</td>
                    <td className="p-3 font-mono">$250.00</td>
                    <td className="p-3 font-mono">$1,250.00</td>
                    <td className="p-3 text-sky-400 font-medium">$5,416.67</td>
                    <td className="p-3 text-emerald-400 font-bold">$4,333.33</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono text-white">$75,000</td>
                    <td className="p-3 font-mono">$36.06</td>
                    <td className="p-3 font-mono">$288.46</td>
                    <td className="p-3 font-mono">$1,442.31</td>
                    <td className="p-3 text-sky-400 font-medium">$6,250.00</td>
                    <td className="p-3 text-emerald-400 font-bold">$5,000.00</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono text-white">$85,000</td>
                    <td className="p-3 font-mono">$40.87</td>
                    <td className="p-3 font-mono">$326.92</td>
                    <td className="p-3 font-mono">$1,634.62</td>
                    <td className="p-3 text-sky-400 font-medium">$7,083.33</td>
                    <td className="p-3 text-emerald-400 font-bold">$5,666.67</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono text-white">$100,000</td>
                    <td className="p-3 font-mono">$48.08</td>
                    <td className="p-3 font-mono">$384.62</td>
                    <td className="p-3 font-mono">$1,923.08</td>
                    <td className="p-3 text-sky-400 font-medium">$8,333.33</td>
                    <td className="p-3 text-emerald-400 font-bold">$6,666.67</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono text-white">$125,000</td>
                    <td className="p-3 font-mono">$60.10</td>
                    <td className="p-3 font-mono">$480.77</td>
                    <td className="p-3 font-mono">$2,403.85</td>
                    <td className="p-3 text-sky-400 font-medium">$10,416.67</td>
                    <td className="p-3 text-emerald-400 font-bold">$8,333.33</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono text-white">$150,000</td>
                    <td className="p-3 font-mono">$72.12</td>
                    <td className="p-3 font-mono">$576.92</td>
                    <td className="p-3 font-mono">$2,884.62</td>
                    <td className="p-3 text-sky-400 font-medium">$12,500.00</td>
                    <td className="p-3 text-emerald-400 font-bold">$10,000.00</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-mono text-white">$200,000</td>
                    <td className="p-3 font-mono">$96.15</td>
                    <td className="p-3 font-mono">$769.23</td>
                    <td className="p-3 font-mono">$3,846.15</td>
                    <td className="p-3 text-sky-400 font-medium">$16,666.67</td>
                    <td className="p-3 text-emerald-400 font-bold">$13,333.33</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Strategic Decision Framework & Traps to Avoid */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Critical Considerations When Transitioning Payment Structures
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">The Uncompensated Overtime Trap</strong>
                  <p className="text-xs text-slate-300">
                    Salaried exempt roles do not pay 1.5x overtime. If an employee earning $75,000 routinely works 50 hours per week instead of 40, their real hourly rate drops from $36.06 to $28.85 per hour.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Fringe Benefit Valuations</strong>
                  <p className="text-xs text-slate-300">
                    Employer-sponsored healthcare premiums, pre-tax 401(k) / SIPP contributions, and life insurance benefits frequently constitute 20% to 30% of total economic compensation. Never compare 1099 contractor rates directly with W2 employment wages without adding a 25% to 35% premium.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Tax Bracket Misconceptions</strong>
                  <p className="text-xs text-slate-300">
                    Graduated progressive tax brackets mean that only income earned ABOVE a specific bracket threshold is taxed at the higher marginal percentage. Entering a higher tax bracket NEVER reduces your total net take-home pay.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: FAQs (Rendered Visually) */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Frequently Asked Questions About Salary &amp; Wage Calculations
            </h2>
            <Faq items={faqItems} className="mt-4" />
          </section>

          {/* Section 7: YMYL Disclaimer */}
          <section className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              YMYL Editorial Disclosure &amp; Wage Accuracy Notice
            </div>
            <p>
              CalcZoon provides this salary calculator for general educational, wage conversion, and career planning purposes. Mathematical estimates rely on constant annual working hour benchmarks (such as 2,080 hours per year) and simplified aggregate deduction percentages. Actual net payroll receipts will vary based on individual tax filing status, state or municipal withholding regulations, pre-tax deductions (HSA, FSA, 401k), and payroll cycle calendars. This tool does not provide certified tax preparation, payroll audit, or legal employment advice. Consult your corporate human resources department, certified public accountant (CPA), or tax professional for formal net pay verification.
            </p>
          </section>

        </article>
      </div>
    </>
  );
};

export default SalaryCalculator;

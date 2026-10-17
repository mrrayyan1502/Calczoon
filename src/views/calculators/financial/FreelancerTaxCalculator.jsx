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
import { Briefcase, DollarSign, Calendar, Sparkles, ReceiptText, ShieldCheck } from 'lucide-react';

const FreelancerTaxCalculator = () => {
  const [income, setIncome] = useState('65000');
  const [expenses, setExpenses] = useState('12000');
  const [taxRate, setTaxRate] = useState('18'); // Marginal income tax rate estimate
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const calculateTaxes = (e) => {
    if (e) e.preventDefault();
    const inc = parseFloat(income);
    const exp = parseFloat(expenses) || 0;
    const incRate = parseFloat(taxRate) || 0;

    if (isNaN(inc) || inc < 0 || exp < 0 || incRate < 0) {
      setResult({ error: "Please enter valid, positive numbers for all fields." });
      return;
    }
    
    if (exp > inc) {
      setResult({ error: "Business expenses cannot exceed total gross income." });
      return;
    }

    const netBusinessProfit = inc - exp;
    
    // Self-employment tax calculation (FICA standard: 15.3% on 92.35% of net profit up to cap)
    const seTaxBase = netBusinessProfit * 0.9235;
    const seTaxAmount = seTaxBase * 0.153;
    
    // Half of SE tax is tax deductible from income tax base
    const taxableIncomeForIncomeTax = Math.max(0, netBusinessProfit - (seTaxAmount * 0.5));
    const estimatedIncomeTax = taxableIncomeForIncomeTax * (incRate / 100);
    
    const totalTaxLiability = seTaxAmount + estimatedIncomeTax;
    const quarterlyPayment = totalTaxLiability / 4;
    const netTakeHome = netBusinessProfit - totalTaxLiability;
    const effectiveTaxRate = inc > 0 ? (totalTaxLiability / inc) * 100 : 0;

    const newResult = {
      grossIncome: inc.toFixed(2),
      expenses: exp.toFixed(2),
      netProfit: netBusinessProfit.toFixed(2),
      seTax: seTaxAmount.toFixed(2),
      incomeTax: estimatedIncomeTax.toFixed(2),
      totalTax: totalTaxLiability.toFixed(2),
      quarterly: quarterlyPayment.toFixed(2),
      takeHome: netTakeHome.toFixed(2),
      effectiveRate: effectiveTaxRate.toFixed(1)
    };

    setResult(newResult);
    saveCalculation({
      type: 'Freelancer Tax',
      inputs: { income: inc, expenses: exp, taxRate: incRate, currency },
      result: {
        'Total Tax': `${getCurrencySymbol()}${newResult.totalTax}`,
        'Quarterly Payment': `${getCurrencySymbol()}${newResult.quarterly}`,
        'Take-Home': `${getCurrencySymbol()}${newResult.takeHome}`
      }
    });
  };

  const faqItems = [
    {
      question: "What is self-employment tax and who is required to pay it?",
      answer: "Self-employment tax represents Social Security and Medicare taxes for independent contractors, freelancers, and sole proprietors. Traditional W-2 employees split these FICA taxes (7.65% paid by employee, 7.65% paid by employer). Self-employed individuals remit both halves, totaling 15.3% on net profit."
    },
    {
      question: "What legitimate business expenses can freelancers deduct to reduce tax?",
      answer: "Allowable tax write-offs include dedicated home office square footage, computer hardware and software subscriptions, client project supplies, continuing professional education, business travel, marketing and domain hosting, and 100% of self-employed health insurance premiums."
    },
    {
      question: "When are quarterly estimated tax payments due in the United States?",
      answer: "Quarterly estimated tax payments for Form 1040-ES are due on four strict IRS calendar dates: Q1 is due April 15, Q2 is due June 15, Q3 is due September 15, and Q4 is due January 15 of the subsequent tax year."
    },
    {
      question: "What is the IRS Safe Harbor rule for avoiding underpayment penalties?",
      answer: "To avoid IRS underpayment penalties, freelancers must remit through quarterly estimated payments either: (1) 90% of their current year's actual tax liability, or (2) 100% of their prior year's tax liability (increased to 110% if prior year adjusted gross income exceeded $150,000)."
    },
    {
      question: "How does the home office deduction work for remote freelancers?",
      answer: "The IRS permits two home office deduction methods: the Simplified Method, which allows $5 per square foot up to 300 square feet ($1,500 maximum deduction), or the Actual Expense Method, which deducts a proportional share of mortgage interest, rent, utilities, and repairs."
    },
    {
      question: "What percentage of freelance income should I set aside for taxes?",
      answer: "As a general financial guideline, freelancers should deposit 25% to 35% of every incoming client invoice into a dedicated high-yield business tax reserve account to comfortably satisfy combined federal, self-employment, and state/local tax burdens."
    },
    {
      question: "How do UK sole traders pay tax through Self Assessment?",
      answer: "In the United Kingdom, sole traders pay Income Tax via annual Self Assessment after applying their tax-free Personal Allowance. They also remit Class 2 and Class 4 National Insurance Contributions (NICs) on trading profits, with payments due on 31 January and 31 July ('Payments on Account')."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Freelancer & Self-Employed Tax Calculator",
    "description": "Calculate quarterly estimated taxes, self-employment FICA obligations, deductible business expenses, and net take-home earnings for freelancers.",
    "applicationCategory": "FinancialApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/financial/freelancer-tax-calculator",
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
        title="Freelancer Tax Calculator: Estimate Self-Employment & Quarterly Tax"
        description="Free Freelancer Tax Calculator. Estimate 15.3% self-employment tax, Schedule C expenses, quarterly estimated IRS payments, and net take-home pay."
        canonicalUrl="/financial/freelancer-tax-calculator"
        schema={[webAppSchema, faqPageSchema]}
        keywords={['freelancer tax calculator', 'self employment tax calculator', '1099 tax calculator', 'quarterly estimated taxes', 'sole proprietor tax']}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Freelancer & Self-Employed Tax Calculator"
          description="Calculate your self-employment tax, allowable business expense deductions, estimated income tax, and quarterly payment obligations."
          icon={Briefcase}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white text-xl">Freelance Earnings & Expense Inputs</CardTitle>
                    <CardDescription className="text-slate-400">Estimate your gross billing, deductible expenses, and income tax tier</CardDescription>
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
                <form onSubmit={calculateTaxes} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="income" className="text-slate-300">Gross Freelance / 1099 Revenue ({getCurrencySymbol()})</Label>
                      <Input
                        id="income"
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        placeholder="65000"
                        className="bg-slate-950 border-slate-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expenses" className="text-slate-300">Deductible Business Expenses ({getCurrencySymbol()})</Label>
                      <Input
                        id="expenses"
                        type="number"
                        value={expenses}
                        onChange={(e) => setExpenses(e.target.value)}
                        placeholder="12000"
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxRate" className="text-slate-300">
                      Estimated Marginal Income Tax Rate (%)
                    </Label>
                    <Input
                      id="taxRate"
                      type="number"
                      step="0.5"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      placeholder="18"
                      className="bg-slate-950 border-slate-700 text-white"
                      required
                    />
                    <p className="text-xs text-slate-400">
                      Typical state + federal marginal income tax rate (excluding self-employment tax, which is calculated automatically).
                    </p>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 mt-2">
                    Calculate Tax Obligations
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
                        <p className="text-slate-400 text-sm">Estimated Quarterly Payment (Due Every 3 Months)</p>
                        <p className="text-4xl md:text-5xl font-extrabold text-emerald-400 my-1">
                          {getCurrencySymbol()}{result.quarterly}
                        </p>
                        <p className="text-xs text-slate-400">
                          Total Annual Tax Bill: <span className="text-rose-400 font-semibold">{getCurrencySymbol()}{result.totalTax}</span> ({result.effectiveRate}% effective tax)
                        </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Net Taxable Profit</p>
                          <p className="text-lg font-bold text-white">{getCurrencySymbol()}{result.netProfit}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Self-Employment Tax</p>
                          <p className="text-lg font-bold text-amber-400">{getCurrencySymbol()}{result.seTax}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Income Tax (Est.)</p>
                          <p className="text-lg font-bold text-sky-400">{getCurrencySymbol()}{result.incomeTax}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Net Take-Home Pay</p>
                          <p className="text-lg font-bold text-emerald-400">{getCurrencySymbol()}{result.takeHome}</p>
                        </div>
                      </div>

                      {/* Monetization / Recommended Bookkeeping Tool */}
                      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="text-xs space-y-1">
                          <p className="font-semibold text-emerald-300">Automate Your Freelance Expense Tracking</p>
                          <p className="text-slate-300 leading-relaxed">
                            Every $100 in unrecorded business write-offs costs you approximately $30 to $40 in unnecessary taxes. Using a dedicated business checking account coupled with cloud bookkeeping software (like QuickBooks Self-Employed or FreshBooks) guarantees maximum Schedule C deduction compliance.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <ShareResults
                          title="Freelance Tax Calculation"
                          text={`My estimated quarterly freelance tax payment is ${getCurrencySymbol()}${result.quarterly} on Calczoon.`}
                          url="/financial/freelancer-tax-calculator"
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
            <h2 className="text-2xl font-bold text-white mb-3">Comprehensive Guide to Freelancer & Self-Employed Tax Planning</h2>
            <p className="leading-relaxed text-slate-300">
              Operating as an independent contractor, freelance professional, or sole proprietor affords tremendous career autonomy, but it completely shifts the burden of payroll tax administration onto your shoulders. Unlike traditional W-2 employees whose taxes are withheld automatically from bi-weekly paychecks, self-employed workers receive gross payments without any tax deductions. Understanding how to calculate self-employment tax, leverage legitimate Schedule C business deductions, and execute timely quarterly estimated tax filings is vital to avoid punishing IRS penalties and preserve hard-earned revenue.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Mathematical Breakdown of Self-Employment Tax</h3>
            <p className="mb-4 leading-relaxed">
              In the United States, self-employment tax is codified under the Federal Insurance Contributions Act (FICA). The calculation follows a strict statutory formula:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">1. Net Taxable Business Profit</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">Net Profit = Gross 1099 Revenue - Allowable Business Expenses</div>
                <p className="text-xs leading-relaxed">
                  Only net trading profit is subject to self-employment and income tax. Every legitimate dollar spent operating your enterprise directly reduces taxable income.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">2. Self-Employment Tax Base (92.35%)</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">Tax Base = Net Profit × 0.9235</div>
                <p className="text-xs leading-relaxed">
                  The IRS grants a 7.65% statutory deduction so self-employed individuals do not pay tax on the employer equivalent portion of FICA contributions.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">3. Total FICA Self-Employment Tax</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">SE Tax = Tax Base × 15.3% (12.4% Social Security + 2.9% Medicare)</div>
                <p className="text-xs leading-relaxed">
                  The 12.4% Social Security portion applies up to the annual statutory wage base limit, while the 2.9% Medicare portion applies to all net earnings without an upper cap.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">4. Above-the-Line Income Tax Adjustment</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">AGI Deduction = SE Tax × 50%</div>
                <p className="text-xs leading-relaxed">
                  You can deduct exactly 50% of your total self-employment tax directly on Schedule 1 of Form 1040, lowering your Adjusted Gross Income (AGI).
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Freelance Gross 1099 Income vs Net Take-Home & Self-Employment Tax Matrix</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The benchmark table below demonstrates estimated annual tax liabilities and net take-home earnings across common freelance income tiers assuming typical 15% operating expense write-offs:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-200">
                  <tr>
                    <th className="p-3">Gross Revenue</th>
                    <th className="p-3">Expenses (15%)</th>
                    <th className="p-3">Net Profit</th>
                    <th className="p-3">SE Tax (15.3%)</th>
                    <th className="p-3">Income Tax (Est.)</th>
                    <th className="p-3">Quarterly Payment</th>
                    <th className="p-3">Net Take-Home</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$30,000</td>
                    <td className="p-3">$4,500</td>
                    <td className="p-3 font-medium text-slate-200">$25,500</td>
                    <td className="p-3 text-amber-400">$3,603</td>
                    <td className="p-3 text-sky-400">$2,410</td>
                    <td className="p-3 text-emerald-400 font-bold">$1,503</td>
                    <td className="p-3 text-emerald-400">$19,487</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$45,000</td>
                    <td className="p-3">$6,750</td>
                    <td className="p-3 font-medium text-slate-200">$38,250</td>
                    <td className="p-3 text-amber-400">$5,405</td>
                    <td className="p-3 text-sky-400">$4,260</td>
                    <td className="p-3 text-emerald-400 font-bold">$2,416</td>
                    <td className="p-3 text-emerald-400">$28,585</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$60,000</td>
                    <td className="p-3">$9,000</td>
                    <td className="p-3 font-medium text-slate-200">$51,000</td>
                    <td className="p-3 text-amber-400">$7,206</td>
                    <td className="p-3 text-sky-400">$6,410</td>
                    <td className="p-3 text-emerald-400 font-bold">$3,404</td>
                    <td className="p-3 text-emerald-400">$37,384</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$80,000</td>
                    <td className="p-3">$12,000</td>
                    <td className="p-3 font-medium text-slate-200">$68,000</td>
                    <td className="p-3 text-amber-400">$9,608</td>
                    <td className="p-3 text-sky-400">$9,580</td>
                    <td className="p-3 text-emerald-400 font-bold">$4,797</td>
                    <td className="p-3 text-emerald-400">$48,812</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$100,000</td>
                    <td className="p-3">$15,000</td>
                    <td className="p-3 font-medium text-slate-200">$85,000</td>
                    <td className="p-3 text-amber-400">$12,010</td>
                    <td className="p-3 text-sky-400">$13,650</td>
                    <td className="p-3 text-emerald-400 font-bold">$6,415</td>
                    <td className="p-3 text-emerald-400">$59,340</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$125,000</td>
                    <td className="p-3">$18,750</td>
                    <td className="p-3 font-medium text-slate-200">$106,250</td>
                    <td className="p-3 text-amber-400">$15,013</td>
                    <td className="p-3 text-sky-400">$18,840</td>
                    <td className="p-3 text-emerald-400 font-bold">$8,463</td>
                    <td className="p-3 text-emerald-400">$72,397</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$150,000</td>
                    <td className="p-3">$22,500</td>
                    <td className="p-3 font-medium text-slate-200">$127,500</td>
                    <td className="p-3 text-amber-400">$18,015</td>
                    <td className="p-3 text-sky-400">$24,850</td>
                    <td className="p-3 text-emerald-400 font-bold">$10,716</td>
                    <td className="p-3 text-emerald-400">$84,635</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">$200,000</td>
                    <td className="p-3">$30,000</td>
                    <td className="p-3 font-medium text-slate-200">$170,000</td>
                    <td className="p-3 text-amber-400">$23,540</td>
                    <td className="p-3 text-sky-400">$37,600</td>
                    <td className="p-3 text-emerald-400 font-bold">$15,285</td>
                    <td className="p-3 text-emerald-400">$108,860</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Step-by-Step Numerical Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-emerald-400 text-base">Case Study 1: US Independent Consultant ($ USD)</h4>
                <p><strong>Gross 1099 Invoicing Revenue:</strong> $85,000.00</p>
                <p><strong>Allowable Schedule C Deductions:</strong> $15,000.00 (Software, travel, equipment)</p>
                <p><strong>Net Taxable Business Profit:</strong> $70,000.00</p>
                <p><strong>SE Tax (15.3% on $70,000 × 0.9235):</strong> $9,890.69</p>
                <p><strong>Above-the-Line AGI Deduction (50% SE Tax):</strong> $4,945.34</p>
                <p><strong>Estimated Federal & State Income Tax (18%):</strong> $11,710.00</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-rose-300 font-semibold">Total Combined Tax: $21,600.69</p>
                  <p className="text-emerald-300 font-semibold">Quarterly Payment Amount: $5,400.17 / quarter</p>
                  <p className="text-sky-300 font-semibold">Net Take-Home Annual Cash Flow: $48,399.31</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-sky-400 text-base">Case Study 2: UK Freelance UI/UX Designer (£ GBP)</h4>
                <p><strong>Annual Invoiced Turnover:</strong> £60,000.00</p>
                <p><strong>Allowable Business Expenses:</strong> £8,000.00 (Coworking, subscriptions)</p>
                <p><strong>Net Taxable Sole Trader Profit:</strong> £52,000.00</p>
                <p><strong>Tax-Free Personal Allowance:</strong> £12,570.00</p>
                <p><strong>Income Tax (Basic 20% & Higher 40% Tiers):</strong> £7,432.00</p>
                <p><strong>Class 2 & Class 4 National Insurance:</strong> £2,850.00</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-rose-300 font-semibold">Total HMRC Annual Tax & NICs: £10,282.00</p>
                  <p className="text-emerald-300 font-semibold">Semiannual Payment on Account: £5,141.00</p>
                  <p className="text-sky-300 font-semibold">Net Annual Disposable Income: £41,718.00</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">5 Critical Freelancer Tax Mistakes to Avoid</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed text-slate-300">
              <li>
                <strong>Commingling Business and Personal Finances:</strong> Paying personal groceries or rent from your business revenue creates an accounting nightmare and invites severe scrutiny during IRS or state revenue audits. Maintain a separate business account.
              </li>
              <li>
                <strong>Failing to Remit Quarterly Estimated Payments:</strong> Believing you can settle your full tax bill in a lump sum on April 15 triggers automatic IRS underpayment interest charges. You must pay pay-as-you-go quarterly.
              </li>
              <li>
                <strong>Overlooking the Section 199A Qualified Business Income (QBI) Deduction:</strong> Eligible sole proprietors and pass-through entities can deduct up to 20% of qualified business income before income taxes, generating thousands in tax savings.
              </li>
              <li>
                <strong>Neglecting 100% Deductible Self-Employed Health Insurance:</strong> Freelancers can write off health, dental, and qualified long-term care insurance premiums directly as an adjustment to income on Form 1040 Schedule 1.
              </li>
              <li>
                <strong>Failing to Maintain Mileage and Receipt Documentation:</strong> The IRS disallows business vehicle deductions unless supported by contemporaneous mileage logs recording dates, trip purpose, and odometer readings.
              </li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="This freelancer tax calculator is designed strictly for budgeting and educational planning purposes. Tax codes vary significantly by jurisdiction, filing status, and individual circumstances. Consult a Certified Public Accountant (CPA) or licensed enrolled agent for official tax filing guidance." />
      </div>
    </>
  );
};

export default FreelancerTaxCalculator;

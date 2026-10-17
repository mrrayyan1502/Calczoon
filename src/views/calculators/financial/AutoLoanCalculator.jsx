'use client';

import React, { useState } from 'react';
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
import { Car, DollarSign, Calculator, Percent, Clock, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

const AutoLoanCalculator = () => {
  const [vehiclePrice, setVehiclePrice] = useState('28000');
  const [downPayment, setDownPayment] = useState('4000');
  const [tradeInValue, setTradeInValue] = useState('2000');
  const [interestRate, setInterestRate] = useState('5.5');
  const [loanTermMonths, setLoanTermMonths] = useState('60');
  const [salesTaxRate, setSalesTaxRate] = useState('6');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const calculateAutoLoan = (e) => {
    if (e) e.preventDefault();

    const price = parseFloat(vehiclePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeInValue) || 0;
    const apr = parseFloat(interestRate) || 0;
    const months = parseInt(loanTermMonths, 10) || 60;
    const taxRate = parseFloat(salesTaxRate) || 0;

    if (price <= 0) {
      setResult({ error: "Please enter a valid vehicle purchase price." });
      return;
    }

    const salesTaxAmount = price * (taxRate / 100);
    const taxablePrice = price + salesTaxAmount;
    const netFinancedAmount = taxablePrice - down - trade;

    if (netFinancedAmount <= 0) {
      setResult({
        monthlyPayment: '0.00',
        totalFinanced: '0.00',
        totalInterest: '0.00',
        totalCost: (down + trade).toFixed(2),
        salesTax: salesTaxAmount.toFixed(2)
      });
      return;
    }

    const monthlyRate = apr / 100 / 12;
    let monthlyPayment = 0;

    if (monthlyRate === 0) {
      monthlyPayment = netFinancedAmount / months;
    } else {
      monthlyPayment = (netFinancedAmount * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayments = monthlyPayment * months;
    const totalInterest = totalPayments - netFinancedAmount;
    const totalVehicleCost = price + salesTaxAmount + totalInterest;

    const calcResult = {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalFinanced: netFinancedAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalCost: totalVehicleCost.toFixed(2),
      salesTax: salesTaxAmount.toFixed(2)
    };

    setResult(calcResult);

    saveCalculation({
      type: 'Auto Loan',
      inputs: { vehiclePrice, downPayment, tradeInValue, interestRate, loanTermMonths },
      result: {
        Monthly: `${getCurrencySymbol()}${calcResult.monthlyPayment}`,
        Financed: `${getCurrencySymbol()}${calcResult.totalFinanced}`,
        Interest: `${getCurrencySymbol()}${calcResult.totalInterest}`
      }
    });
  };

  const faqItems = [
    {
      question: "How is an auto loan monthly payment calculated?",
      answer: "An auto loan payment is determined by standard amortization mathematics using the net financed principal (vehicle price plus dealer sales tax minus cash down payment and trade-in equity), the periodic monthly interest rate (annual percentage rate APR divided by 12), and the total loan term duration in months."
    },
    {
      question: "What is an ideal loan term for a new or used car?",
      answer: "Financial advisors universally advise financing terms between 36 and 60 months (3 to 5 years). While 72-month or 84-month contracts reduce the immediate monthly obligation, they dramatically increase cumulative compound interest charges and frequently trap motorists in negative equity ('underwater' or 'upside-down') where the depreciating car is worth less than the remaining lien balance."
    },
    {
      question: "How does my down payment percentage affect total financing costs?",
      answer: "Putting down 10% to 20% in upfront cash directly suppresses borrowed principal, qualifies borrowers for tier-1 promotional interest rates, bypasses costly guaranteed asset protection (GAP) insurance requirements, and insulates car buyers against the brutal 20% first-year depreciation curve."
    },
    {
      question: "Does this car finance calculator account for dealer sales tax and fees?",
      answer: "Yes. Our calculator provides a dedicated Sales Tax percentage input that automatically inflates the vehicle sticker price before deducting trade-in allowances and cash deposits. You can also sum documentation fees, destination charges, and registration tabs directly into the base Vehicle Price for a 100% realistic out-the-door estimate."
    },
    {
      question: "What is the difference between APR and interest rate on a car loan?",
      answer: "The interest rate is the base cost of borrowing the principal balance annually. In contrast, the Annual Percentage Rate (APR) reflects the all-inclusive annual financing cost, combining the nominal interest rate alongside mandatory lender origination charges, administrative processing fees, and prepaid dealer finance points."
    },
    {
      question: "Can I pay off my auto loan early to save on total interest?",
      answer: "Yes, standard simple interest automotive installment loans permit early principal curtailment without penalty in most jurisdictions. Every additional dollar remitted directly against the principal balance shortens your amortization timeline and eliminates future compounding interest."
    },
    {
      question: "How does my credit score influence auto loan APR?",
      answer: "Credit scores heavily dictate automotive lending brackets: Super-prime borrowers (scores 780+) often secure 4.5% to 6.5% APR, prime borrowers (660-779) receive 6.5% to 9.5%, while subprime applicants (below 600) frequently face 14% to 21% APR, more than doubling lifetime interest overhead."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Auto Loan & Car Finance Calculator",
    "description": "Calculate monthly car loan payments, total interest, sales tax, and out-the-door financing costs with trade-in and down payment options.",
    "applicationCategory": "FinanceApplication",
    "applicationSubCategory": "Auto Loan Calculator",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/financial/auto-loan-calculator",
    "browserRequirements": "Requires JavaScript.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
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
        title="Auto Loan Calculator: Estimate Car Payments, APR & Total Interest"
        description="Free Auto Loan Calculator. Compute monthly car finance payments, total interest, dealer sales tax, and trade-in deductions. Accurate 2026 car financing tool."
        canonicalUrl="/financial/auto-loan-calculator"
        schema={[webAppSchema, faqPageSchema]}
        keywords={['auto loan calculator', 'car payment calculator', 'vehicle finance calculator', 'car loan amortization', 'car EMI calculator']}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Auto Loan & Car Finance Calculator"
          description="Calculate your monthly car payment, total interest charges, and total out-the-door vehicle costs based on price, down payment, trade-in, and loan terms."
          icon={Car}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white text-xl">Vehicle Financing Inputs</CardTitle>
                    <CardDescription className="text-slate-400">Enter your vehicle pricing and loan parameters</CardDescription>
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
                <form onSubmit={calculateAutoLoan} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehiclePrice" className="text-slate-300">Vehicle Purchase Price ({getCurrencySymbol()})</Label>
                      <Input
                        id="vehiclePrice"
                        type="number"
                        value={vehiclePrice}
                        onChange={(e) => setVehiclePrice(e.target.value)}
                        placeholder="28000"
                        className="bg-slate-950 border-slate-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salesTaxRate" className="text-slate-300">Sales Tax Rate (%)</Label>
                      <Input
                        id="salesTaxRate"
                        type="number"
                        step="0.1"
                        value={salesTaxRate}
                        onChange={(e) => setSalesTaxRate(e.target.value)}
                        placeholder="6.0"
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="downPayment" className="text-slate-300">Upfront Cash Down Payment ({getCurrencySymbol()})</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        placeholder="4000"
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tradeInValue" className="text-slate-300">Net Trade-In Allowance ({getCurrencySymbol()})</Label>
                      <Input
                        id="tradeInValue"
                        type="number"
                        value={tradeInValue}
                        onChange={(e) => setTradeInValue(e.target.value)}
                        placeholder="2000"
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="interestRate" className="text-slate-300">Annual Percentage Rate - APR (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.01"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="5.5"
                        className="bg-slate-950 border-slate-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loanTermMonths" className="text-slate-300">Repayment Period (Months)</Label>
                      <select
                        id="loanTermMonths"
                        value={loanTermMonths}
                        onChange={(e) => setLoanTermMonths(e.target.value)}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-md text-white"
                      >
                        <option value="24">24 Months (2 Years)</option>
                        <option value="36">36 Months (3 Years)</option>
                        <option value="48">48 Months (4 Years)</option>
                        <option value="60">60 Months (5 Years)</option>
                        <option value="72">72 Months (6 Years)</option>
                        <option value="84">84 Months (7 Years)</option>
                      </select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 mt-4">
                    Calculate Auto Payment
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
                        <p className="text-slate-400 text-sm">Estimated Monthly Payment</p>
                        <p className="text-4xl md:text-5xl font-extrabold text-emerald-400 my-1">
                          {getCurrencySymbol()}{result.monthlyPayment}
                        </p>
                        <p className="text-xs text-slate-500">For {loanTermMonths} months at {interestRate}% APR</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Total Financed</p>
                          <p className="text-lg font-bold text-white">{getCurrencySymbol()}{result.totalFinanced}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Total Interest</p>
                          <p className="text-lg font-bold text-amber-400">{getCurrencySymbol()}{result.totalInterest}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Sales Tax</p>
                          <p className="text-lg font-bold text-sky-400">{getCurrencySymbol()}{result.salesTax}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Total Out-of-Pocket</p>
                          <p className="text-lg font-bold text-white">{getCurrencySymbol()}{result.totalCost}</p>
                        </div>
                      </div>

                      {/* Monetization / Recommended Resource Box */}
                      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="text-xs space-y-1">
                          <p className="font-semibold text-emerald-300">Smart Financing Tip & Pre-Approval Strategy</p>
                          <p className="text-slate-300 leading-relaxed">
                            Securing pre-approved auto financing from your credit union or independent bank prior to setting foot in a car dealership can save between 1.5% and 3.0% in dealer APR markups. Always negotiate vehicle purchase price separately from dealer trade-in valuations.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <ShareResults
                          title="Auto Loan Calculation"
                          text={`My estimated auto loan payment is ${getCurrencySymbol()}${result.monthlyPayment}/mo for ${loanTermMonths} months.`}
                          url="/financial/auto-loan-calculator"
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
            <h2 className="text-2xl font-bold text-white mb-3">Comprehensive Guide to Auto Loan Amortization & Car Financing</h2>
            <p className="leading-relaxed text-slate-300">
              Purchasing an automobile is commonly the second largest personal capital expenditure households make after residential housing. An auto loan is a structured installment agreement where a licensed financial institution advances capital to acquire a motor vehicle, which serves as collateral security until the principal debt and accumulated borrowing interest are fully extinguished. Mastering the underlying mathematical mechanics of vehicle financing empowers prospective car buyers to sidestep predatory dealer financing markups, avoid costly negative equity traps, and optimize monthly cash flow.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">The Mathematical Amortization Formula</h3>
            <p className="mb-4 leading-relaxed">
              Standard automotive lending uses fixed-rate installment amortization mathematics. The monthly payment equation calculates the exact periodic payment required to reduce both the borrowed principal balance and the daily compounding interest charges to zero over the agreed contract timeline:
            </p>
            <div className="bg-slate-950 p-4 rounded-lg font-mono text-center text-emerald-400 border border-slate-800 text-sm md:text-base">
              PMT = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800">
                <p className="font-semibold text-emerald-400 mb-1">PMT = Periodic Monthly Payment</p>
                <p>The fixed monthly amount remitted to your auto lender covering both principal reduction and interest fees.</p>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800">
                <p className="font-semibold text-emerald-400 mb-1">P = Net Financed Amount</p>
                <p>Calculated as Vehicle Price + Dealership Sales Tax - Cash Down Payment - Net Trade-In Equity.</p>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800">
                <p className="font-semibold text-emerald-400 mb-1">r = Monthly Periodic Interest Rate</p>
                <p>The annual nominal interest rate divided by 12 months (e.g., 6.0% APR equates to 0.06 / 12 = 0.005).</p>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800">
                <p className="font-semibold text-emerald-400 mb-1">n = Total Loan Term in Months</p>
                <p>The complete lifespan of the financing contract (e.g., 36, 48, 60, 72, or 84 installment periods).</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Vehicle Financing Benchmark Amortization Table</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The benchmark table below illustrates how loan term durations and borrowing amounts interact under a standard 6.5% APR financing agreement. Observe how extended loan terms reduce monthly payments while drastically compounding cumulative interest liabilities:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-200">
                  <tr>
                    <th className="p-3">Loan Amount</th>
                    <th className="p-3">APR Rate</th>
                    <th className="p-3">Loan Term</th>
                    <th className="p-3">Monthly Payment</th>
                    <th className="p-3">Total Interest Paid</th>
                    <th className="p-3">Total Repayment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">$20,000</td>
                    <td className="p-3">6.50%</td>
                    <td className="p-3">36 Months (3 Yrs)</td>
                    <td className="p-3 text-emerald-400 font-semibold">$612.98</td>
                    <td className="p-3 text-amber-400">$2,067.28</td>
                    <td className="p-3">$22,067.28</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">$20,000</td>
                    <td className="p-3">6.50%</td>
                    <td className="p-3">60 Months (5 Yrs)</td>
                    <td className="p-3 text-emerald-400 font-semibold">$391.32</td>
                    <td className="p-3 text-amber-400">$3,479.20</td>
                    <td className="p-3">$23,479.20</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">$20,000</td>
                    <td className="p-3">6.50%</td>
                    <td className="p-3">72 Months (6 Yrs)</td>
                    <td className="p-3 text-emerald-400 font-semibold">$336.00</td>
                    <td className="p-3 text-amber-400">$4,192.00</td>
                    <td className="p-3">$24,192.00</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">$30,000</td>
                    <td className="p-3">6.50%</td>
                    <td className="p-3">48 Months (4 Yrs)</td>
                    <td className="p-3 text-emerald-400 font-semibold">$711.08</td>
                    <td className="p-3 text-amber-400">$4,131.84</td>
                    <td className="p-3">$34,131.84</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">$30,000</td>
                    <td className="p-3">6.50%</td>
                    <td className="p-3">60 Months (5 Yrs)</td>
                    <td className="p-3 text-emerald-400 font-semibold">$586.98</td>
                    <td className="p-3 text-amber-400">$5,218.80</td>
                    <td className="p-3">$35,218.80</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">$30,000</td>
                    <td className="p-3">6.50%</td>
                    <td className="p-3">84 Months (7 Yrs)</td>
                    <td className="p-3 text-emerald-400 font-semibold">$445.69</td>
                    <td className="p-3 text-amber-400">$7,437.96</td>
                    <td className="p-3">$37,437.96</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">$45,000</td>
                    <td className="p-3">6.50%</td>
                    <td className="p-3">48 Months (4 Yrs)</td>
                    <td className="p-3 text-emerald-400 font-semibold">$1,066.62</td>
                    <td className="p-3 text-amber-400">$6,197.76</td>
                    <td className="p-3">$51,197.76</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">$45,000</td>
                    <td className="p-3">6.50%</td>
                    <td className="p-3">60 Months (5 Yrs)</td>
                    <td className="p-3 text-emerald-400 font-semibold">$880.47</td>
                    <td className="p-3 text-amber-400">$7,828.20</td>
                    <td className="p-3">$52,828.20</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">$60,000</td>
                    <td className="p-3">6.50%</td>
                    <td className="p-3">60 Months (5 Yrs)</td>
                    <td className="p-3 text-emerald-400 font-semibold">$1,173.96</td>
                    <td className="p-3 text-amber-400">$10,437.60</td>
                    <td className="p-3">$70,437.60</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-medium text-white">$60,000</td>
                    <td className="p-3">6.50%</td>
                    <td className="p-3">72 Months (6 Yrs)</td>
                    <td className="p-3 text-emerald-400 font-semibold">$1,008.00</td>
                    <td className="p-3 text-amber-400">$12,576.00</td>
                    <td className="p-3">$72,576.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Step-by-Step Numerical Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-emerald-400 text-base">Case Study 1: New SUV Purchase ($ Example)</h4>
                <p><strong>Vehicle List Price:</strong> $35,000</p>
                <p><strong>State & Local Sales Tax (7%):</strong> $2,450</p>
                <p><strong>Trade-In Credit:</strong> $4,000</p>
                <p><strong>Cash Down Payment:</strong> $5,000</p>
                <p><strong>Net Loan Financed:</strong> $35,000 + $2,450 - $9,000 = $28,450</p>
                <p><strong>Financing Terms:</strong> 5.75% APR across 60 months</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-emerald-300 font-semibold">Monthly Payment: $546.73 / month</p>
                  <p className="text-amber-300 font-semibold">Total Interest Paid: $4,353.80</p>
                  <p className="text-slate-300 font-medium">Total Out-of-Pocket Vehicle Outlay: $41,803.80</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-sky-400 text-base">Case Study 2: UK Certified Used EV (£ Example)</h4>
                <p><strong>Vehicle List Price:</strong> £24,000</p>
                <p><strong>Dealer Admin & Registration:</strong> £450</p>
                <p><strong>Part-Exchange Allowance:</strong> £3,500</p>
                <p><strong>Customer Cash Deposit:</strong> £3,000</p>
                <p><strong>Net Loan Financed:</strong> £24,000 + £450 - £6,500 = £17,950</p>
                <p><strong>Hire Purchase (HP) Terms:</strong> 6.9% APR across 48 months</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-sky-300 font-semibold">Monthly Payment: £429.08 / month</p>
                  <p className="text-amber-300 font-semibold">Total Interest Paid: £2,645.84</p>
                  <p className="text-slate-300 font-medium">Total Out-of-Pocket Expenditure: £27,095.84</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">The 20/4/10 Rule of Automotive Financial Prudence</h3>
            <p className="mb-4 leading-relaxed">
              Automotive affordability is often obscured by dealerships offering extended loan durations. To maintain household financial resilience, independent personal finance advisors endorse the time-tested <strong>20/4/10 Rule</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 text-base mb-1">20% Down Payment</p>
                <p className="text-slate-300">
                  Pay at least 20% in upfront equity through cash or vehicle trade-in. This buffers against immediate depreciation and eliminates the need for expensive gap insurance policies.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 text-base mb-1">4-Year Maximum Term</p>
                <p className="text-slate-300">
                  Never finance a passenger car for longer than 48 months (4 years). This guarantees you build positive equity faster than the automobile physically depreciates.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 text-base mb-1">10% of Gross Income</p>
                <p className="text-slate-300">
                  Cap total monthly automotive transportation expenses—including monthly loan payments, vehicle insurance premiums, fuel, and maintenance—at no more than 10% of your gross monthly earnings.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Financing vs Leasing: Direct Comparison</h3>
            <p className="leading-relaxed mb-4">
              When obtaining a new vehicle, motorists frequently debate whether to finance through an auto loan or enter a closed-end lease agreement. Understanding the balance sheet implications is vital:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="font-semibold text-emerald-400 mb-2">Purchasing via Auto Loan</h4>
                <p className="mb-2"><strong>Pros:</strong> Full asset ownership, zero mileage restrictions, freedom to sell or customize at any time, and equity accumulation after payoff.</p>
                <p><strong>Cons:</strong> Higher monthly repayment amounts, full liability for repair costs post-warranty, and rapid upfront market depreciation risk.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="font-semibold text-sky-400 mb-2">Entering a Vehicle Lease</h4>
                <p className="mb-2"><strong>Pros:</strong> Lower monthly payments, continuous manufacturer bumper-to-bumper warranty coverage, and driving modern technology every 36 months.</p>
                <p><strong>Cons:</strong> Zero ownership equity at contract conclusion, rigid annual mileage caps (10,000-12,000 miles) with penalizing overage charges, and perpetual monthly car payments.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">5 Critical Auto Financing Pitfalls to Avoid</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed text-slate-300">
              <li>
                <strong>Opting for 72- or 84-Month Loan Terms:</strong> While longer terms lower monthly debt commitments, vehicles depreciate faster than the loan balance declines during the first 36 months, generating severe negative equity where trading in or selling necessitates paying off debt out of pocket.
              </li>
              <li>
                <strong>Focusing Solely on the Monthly Payment:</strong> Dealership finance managers often manipulate loan terms, extending repayment duration to match your target monthly budget while packing in thousands of dollars in unnecessary interest charges and back-end warranties.
              </li>
              <li>
                <strong>Rolling Over Unpaid Balances:</strong> Transferring negative equity from your previous car loan into a brand new vehicle contract compounds interest liabilities, leaving you heavily underwater on a depreciating asset.
              </li>
              <li>
                <strong>Skipping Independent Lender Pre-Approval:</strong> Walking into a dealership without a locked pre-approval letter from a credit union or bank gives the dealership finance office complete leeway to mark up wholesale lender APRs by 100 to 250 basis points.
              </li>
              <li>
                <strong>Overlooking Total Cost of Ownership (TCO):</strong> Financing payments represent merely 50% to 60% of total automotive expense. Fuel or electricity charging, comprehensive auto insurance, periodic maintenance, and annual state registration tabs must all fit comfortably within your overall monthly budget.
              </li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="This auto loan calculator is provided for educational and estimation purposes only. Actual interest rates, taxes, documentation fees, and final monthly payments are established by your financing institution." />
      </div>
    </>
  );
};

export default AutoLoanCalculator;

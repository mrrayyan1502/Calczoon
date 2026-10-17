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
import { Scale, DollarSign, HelpCircle, Sparkles, ShieldAlert, CheckCircle2 } from 'lucide-react';

const DebtToIncomeRatioCalculator = () => {
  const [income, setIncome] = useState('6500');
  const [debts, setDebts] = useState({
    mortgage: '1600',
    carLoan: '400',
    studentLoan: '250',
    creditCard: '150',
    other: '100'
  });
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const handleDebtChange = (e) => {
    const { name, value } = e.target;
    setDebts(prev => ({ ...prev, [name]: value }));
  };

  const calculateDTI = (e) => {
    if (e) e.preventDefault();
    const monthlyIncome = parseFloat(income);
    if (isNaN(monthlyIncome) || monthlyIncome <= 0) {
      setResult({ error: "Please enter a valid monthly gross income." });
      return;
    }

    const housingDebt = parseFloat(debts.mortgage) || 0;
    const nonHousingDebts = (parseFloat(debts.carLoan) || 0) +
      (parseFloat(debts.studentLoan) || 0) +
      (parseFloat(debts.creditCard) || 0) +
      (parseFloat(debts.other) || 0);

    const totalDebts = housingDebt + nonHousingDebts;
    const frontEndDti = (housingDebt / monthlyIncome) * 100;
    const backEndDti = (totalDebts / monthlyIncome) * 100;

    let category = '';
    let color = '';
    let recommendation = '';

    if (backEndDti <= 20) {
      category = 'Exceptional';
      color = 'text-emerald-400';
      recommendation = 'You have minimal debt burden and qualify for the lowest competitive mortgage rates and loan programs.';
    } else if (backEndDti <= 35) {
      category = 'Healthy / Favorable';
      color = 'text-emerald-400';
      recommendation = 'Well within standard conventional underwriting limits (the 28/36 rule). High probability of loan approval.';
    } else if (backEndDti <= 43) {
      category = 'Manageable (QM Limit)';
      color = 'text-amber-400';
      recommendation = 'Meets the Qualified Mortgage (QM) ceiling for conventional loans, though lenders may scrutinize reserve funds.';
    } else if (backEndDti <= 50) {
      category = 'High Risk (FHA / VA Eligible)';
      color = 'text-orange-400';
      recommendation = 'Exceeds standard limits; may qualify for government-backed FHA or VA loans with strong credit scores.';
    } else {
      category = 'Critical / Overextended';
      color = 'text-rose-400';
      recommendation = 'Debt obligations exceed half your pre-tax income. Focus on aggressive debt paydown before applying for financing.';
    }

    const newResult = {
      frontEndDti: frontEndDti.toFixed(1),
      backEndDti: backEndDti.toFixed(1),
      totalDebts: totalDebts.toFixed(2),
      housingDebt: housingDebt.toFixed(2),
      nonHousingDebts: nonHousingDebts.toFixed(2),
      monthlyIncome: monthlyIncome.toFixed(2),
      category,
      color,
      recommendation
    };
    setResult(newResult);

    saveCalculation({
      type: 'Debt-to-Income Ratio',
      inputs: { income, debts, currency },
      result: {
        'Back-End DTI': `${newResult.backEndDti}%`,
        'Front-End DTI': `${newResult.frontEndDti}%`,
        Category: newResult.category
      }
    });
  };

  const faqItems = [
    {
      question: "What is a Debt-to-Income (DTI) ratio and why does it matter?",
      answer: "Your Debt-to-Income (DTI) ratio is the percentage of your gross pre-tax monthly income that goes toward servicing required monthly debt obligations. Mortgage lenders and underwriters use DTI as a core metric to gauge your repayment capacity and risk of default."
    },
    {
      question: "What is the difference between front-end DTI and back-end DTI?",
      answer: "Front-end DTI (the housing ratio) calculates only housing-related expenses (mortgage principal, interest, taxes, and homeowners insurance) divided by gross income. Back-end DTI factors in all recurring debt obligations, including housing, auto loans, student loans, and credit card minimum payments."
    },
    {
      question: "What is the golden 28/36 qualifying rule for home loans?",
      answer: "The 28/36 rule is a classical mortgage underwriting benchmark stating that a borrower should spend no more than 28% of gross monthly income on housing costs (front-end), and no more than 36% on total combined debt payments (back-end)."
    },
    {
      question: "What is the maximum allowable DTI for an FHA or Conventional mortgage?",
      answer: "Conventional mortgages typically cap back-end DTI at 43%, though automated underwriting systems (Desktop Underwriter) may approve ratios up to 45% or 50% with strong compensating factors (high credit score, substantial cash reserves). FHA loans permit DTIs up to 43% standard and up to 50% or 56.9% with automated approval."
    },
    {
      question: "Do living expenses like groceries, cell phone, and utilities count in DTI?",
      answer: "No. Lenders exclude non-debt living expenses such as utilities, food, auto insurance, streaming subscriptions, and healthcare from DTI calculations. Only contractual debt obligations reported on your credit bureau profile (or formal alimony/child support) are counted."
    },
    {
      question: "How can I quickly lower my DTI before applying for a mortgage?",
      answer: "You can reduce DTI by paying off small revolving credit card balances entirely (eliminating their monthly minimum payment), paying down student or auto loans that have fewer than 10 remaining installments, or adding a co-borrower with stable verifiable income."
    },
    {
      question: "How do mortgage underwriters calculate DTI for self-employed individuals?",
      answer: "For self-employed borrowers, underwriters average net taxable business income from Schedule C (or Form 1120-S/1065) across the previous two tax years, adding back non-cash deductions such as depreciation and depletion before calculating monthly income."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Debt-to-Income (DTI) Ratio Calculator",
    "description": "Calculate your front-end and back-end Debt-to-Income (DTI) ratio for mortgage approval, auto financing, and financial health.",
    "applicationCategory": "FinancialApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/financial/debt-to-income-ratio-calculator",
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
        title="DTI Ratio Calculator: Front-End & Back-End Debt-to-Income"
        description="Free Debt-to-Income (DTI) Ratio Calculator. Calculate front-end and back-end DTI ratios for mortgage qualification, FHA/Conventional loan limits, and financial health."
        canonicalUrl="/financial/debt-to-income-ratio-calculator"
        schema={[webAppSchema, faqPageSchema]}
        keywords={['dti calculator', 'debt to income ratio', 'mortgage qualifying ratio', 'front end dti', 'back end dti', 'fha dti limit']}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Debt-to-Income (DTI) Ratio Calculator"
          description="Evaluate your borrowing capacity with front-end and back-end DTI analysis. Discover your mortgage eligibility and lender risk profile."
          icon={Scale}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white text-xl">Income & Monthly Debt Inputs</CardTitle>
                    <CardDescription className="text-slate-400">Enter your gross pre-tax income and recurring monthly debts</CardDescription>
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
                <form onSubmit={calculateDTI} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="income" className="text-slate-300 font-semibold">
                      Gross Monthly Income Before Taxes ({getCurrencySymbol()})
                    </Label>
                    <Input
                      id="income"
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      placeholder="6500"
                      className="bg-slate-950 border-slate-700 text-white text-lg"
                      required
                    />
                    <p className="text-xs text-slate-400">Include pre-tax salary, wages, bonuses, verified alimony, or investment income.</p>
                  </div>

                  <div className="border-t border-slate-800 pt-4 space-y-4">
                    <h3 className="text-white font-semibold text-base">Monthly Contractual Debt Payments</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="mortgage" className="text-slate-300">Mortgage or Rent Payment ({getCurrencySymbol()})</Label>
                        <Input
                          id="mortgage"
                          name="mortgage"
                          type="number"
                          value={debts.mortgage}
                          onChange={handleDebtChange}
                          placeholder="1600"
                          className="bg-slate-950 border-slate-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="carLoan" className="text-slate-300">Auto Loans / Vehicle Leases ({getCurrencySymbol()})</Label>
                        <Input
                          id="carLoan"
                          name="carLoan"
                          type="number"
                          value={debts.carLoan}
                          onChange={handleDebtChange}
                          placeholder="400"
                          className="bg-slate-950 border-slate-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="studentLoan" className="text-slate-300">Student Loan Payments ({getCurrencySymbol()})</Label>
                        <Input
                          id="studentLoan"
                          name="studentLoan"
                          type="number"
                          value={debts.studentLoan}
                          onChange={handleDebtChange}
                          placeholder="250"
                          className="bg-slate-950 border-slate-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="creditCard" className="text-slate-300">Credit Card Minimum Payments ({getCurrencySymbol()})</Label>
                        <Input
                          id="creditCard"
                          name="creditCard"
                          type="number"
                          value={debts.creditCard}
                          onChange={handleDebtChange}
                          placeholder="150"
                          className="bg-slate-950 border-slate-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="other" className="text-slate-300">Other Debts (Personal Loans, Child Support) ({getCurrencySymbol()})</Label>
                      <Input
                        id="other"
                        name="other"
                        type="number"
                        value={debts.other}
                        onChange={handleDebtChange}
                        placeholder="100"
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 text-base">
                    Calculate DTI Ratio
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
                        <p className="text-slate-400 text-sm">Back-End DTI (Total Debt Ratio)</p>
                        <p className={`text-4xl md:text-5xl font-extrabold my-1 ${result.color}`}>
                          {result.backEndDti}%
                        </p>
                        <p className={`text-sm font-semibold ${result.color}`}>
                          Underwriting Assessment: {result.category}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto px-4">
                          {result.recommendation}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Front-End (Housing)</p>
                          <p className="text-lg font-bold text-sky-400">{result.frontEndDti}%</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Total Monthly Debts</p>
                          <p className="text-lg font-bold text-white">{getCurrencySymbol()}{result.totalDebts}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Housing Share</p>
                          <p className="text-lg font-bold text-slate-300">{getCurrencySymbol()}{result.housingDebt}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Non-Housing Debts</p>
                          <p className="text-lg font-bold text-amber-400">{getCurrencySymbol()}{result.nonHousingDebts}</p>
                        </div>
                      </div>

                      {/* Monetization / Recommended Resource Box */}
                      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="text-xs space-y-1">
                          <p className="font-semibold text-emerald-300">Underwriter Optimization Strategy</p>
                          <p className="text-slate-300 leading-relaxed">
                            If your back-end DTI exceeds 43%, refinancing high-interest credit card debt into a lower fixed-rate personal loan or utilizing the debt avalanche method can lower your minimum monthly payment obligations by $200–$400, immediately improving your mortgage qualification tier.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <ShareResults
                          title="Debt-to-Income Calculation"
                          text={`My Back-End DTI is ${result.backEndDti}% (${result.category}) on Calczoon.`}
                          url="/financial/debt-to-income-ratio-calculator"
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
            <h2 className="text-2xl font-bold text-white mb-3">Comprehensive Guide to Debt-to-Income (DTI) in Lending & Mortgage Underwriting</h2>
            <p className="leading-relaxed text-slate-300">
              When applying for a residential mortgage, refinancing an existing property, or securing an auto loan, lenders do not simply inspect your credit score and annual salary in isolation. Instead, underwriters rely upon the <strong>Debt-to-Income (DTI) ratio</strong> as the single most definitive indicator of financial leverage and default risk. A low DTI demonstrates that an applicant possesses ample cash flow flexibility to absorb unexpected medical emergencies, home repairs, or interest rate adjustments without jeopardizing monthly debt obligations.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Mathematical Formulas: Front-End vs Back-End DTI</h3>
            <p className="mb-4 leading-relaxed">
              Institutional lenders evaluate two distinct debt ratios when scrutinizing consumer credit applications:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">1. Front-End DTI (The Housing Ratio)</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">
                  DTI_front = (Housing Expenses / Gross Monthly Income) × 100
                </div>
                <p className="text-xs leading-relaxed">
                  Housing expenses encompass the complete PITI bundle: Principal, Interest, Property Taxes, and Homeowners Insurance (plus HOA dues or private mortgage insurance PMI where applicable).
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">2. Back-End DTI (The Total Debt Ratio)</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">
                  DTI_back = (Total Recurring Monthly Debts / Gross Monthly Income) × 100
                </div>
                <p className="text-xs leading-relaxed">
                  Sum of monthly housing expenses plus all contractual obligations: auto loan payments, minimum monthly credit card obligations, student loans, and court-ordered child support.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Debt-to-Income Underwriting Tiers & Mortgage Approval Eligibility Matrix</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The reference table below breaks down standard underwriting guidelines, maximum allowable DTI thresholds, and qualification likelihood across major loan categories:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-200">
                  <tr>
                    <th className="p-3">DTI Range</th>
                    <th className="p-3">Risk Category</th>
                    <th className="p-3">Conventional Loan</th>
                    <th className="p-3">FHA Loan Eligibility</th>
                    <th className="p-3">VA Loan Status</th>
                    <th className="p-3">Consumer Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">0% - 20%</td>
                    <td className="p-3 text-emerald-400 font-medium">Exceptional</td>
                    <td className="p-3 text-emerald-400">Prime Approval</td>
                    <td className="p-3 text-emerald-400">Guaranteed Eligible</td>
                    <td className="p-3 text-emerald-400">Full Approval</td>
                    <td className="p-3">Qualifies for lowest interest rates; maximum borrowing leverage.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">21% - 28%</td>
                    <td className="p-3 text-emerald-400 font-medium">Healthy</td>
                    <td className="p-3 text-emerald-400">Prime Approval</td>
                    <td className="p-3 text-emerald-400">Full Approval</td>
                    <td className="p-3 text-emerald-400">Full Approval</td>
                    <td className="p-3">Meets strict 28% front-end standard; minimal documentation friction.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">29% - 36%</td>
                    <td className="p-3 text-emerald-400 font-medium">Standard / Favorable</td>
                    <td className="p-3 text-emerald-400">Full Approval</td>
                    <td className="p-3 text-emerald-400">Full Approval</td>
                    <td className="p-3 text-emerald-400">Full Approval</td>
                    <td className="p-3">The classic 36% benchmark for conforming conventional Fannie Mae loans.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">37% - 43%</td>
                    <td className="p-3 text-amber-400 font-medium">Qualified Mortgage (QM)</td>
                    <td className="p-3 text-amber-400">Approval with AUS</td>
                    <td className="p-3 text-emerald-400">Full Approval</td>
                    <td className="p-3 text-emerald-400">Full Approval</td>
                    <td className="p-3">CFPB Qualified Mortgage upper ceiling; requires verified credit score 660+.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">44% - 45%</td>
                    <td className="p-3 text-amber-400 font-medium">Moderate Risk</td>
                    <td className="p-3 text-amber-400">Conditional Approval</td>
                    <td className="p-3 text-emerald-400">Full Approval</td>
                    <td className="p-3 text-emerald-400">Approval with Reserves</td>
                    <td className="p-3">Requires strong compensating factors (e.g., 6 months post-closing cash reserves).</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">46% - 50%</td>
                    <td className="p-3 text-orange-400 font-medium">Elevated Risk</td>
                    <td className="p-3 text-rose-400">Strictly Restricted</td>
                    <td className="p-3 text-amber-400">Approval with AUS</td>
                    <td className="p-3 text-amber-400">Approval with AUS</td>
                    <td className="p-3">Conforming conventional loans generally reject; FHA/VA requires AUS sign-off.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">51% - 56.9%</td>
                    <td className="p-3 text-rose-400 font-medium">High Risk</td>
                    <td className="p-3 text-rose-400">Rejected</td>
                    <td className="p-3 text-orange-400">FHA AUS Max</td>
                    <td className="p-3 text-orange-400">VA Case-by-Case</td>
                    <td className="p-3">Absolute maximum ceiling permitted under FHA automated underwriting (TOTAL AUS).</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">57%+</td>
                    <td className="p-3 text-rose-400 font-medium">Critical / Ineligible</td>
                    <td className="p-3 text-rose-400">Rejected</td>
                    <td className="p-3 text-rose-400">Rejected</td>
                    <td className="p-3 text-rose-400">Rejected</td>
                    <td className="p-3">Institutional mortgage financing unavailable. Requires aggressive debt paydown.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Step-by-Step Numerical Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-emerald-400 text-base">Case Study 1: First-Time Homebuyer Couple ($ USD)</h4>
                <p><strong>Combined Gross Monthly Income:</strong> $8,500.00</p>
                <p><strong>Target Home Mortgage (PITI + HOA):</strong> $2,200.00 / month</p>
                <p><strong>Car Loan Payment:</strong> $450.00 / month</p>
                <p><strong>Student Loans (Income-Driven):</strong> $280.00 / month</p>
                <p><strong>Credit Card Minimums:</strong> $170.00 / month</p>
                <p><strong>Total Monthly Debt Obligations:</strong> $3,100.00</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-sky-300 font-semibold">Front-End DTI: ($2,200 / $8,500) = 25.88% (Passes 28% Rule)</p>
                  <p className="text-emerald-300 font-semibold">Back-End DTI: ($3,100 / $8,500) = 36.47% (Passes 43% QM Rule)</p>
                  <p className="text-slate-300 text-xs mt-1">Status: Conforming conventional 30-year fixed loan approved at prime rates.</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-sky-400 text-base">Case Study 2: UK Professional Buying a Flat (£ GBP)</h4>
                <p><strong>Gross Monthly Earnings:</strong> £5,200.00</p>
                <p><strong>Prospective Mortgage Repayment:</strong> £1,450.00 / month</p>
                <p><strong>Vehicle PCP Financing:</strong> £320.00 / month</p>
                <p><strong>Personal Loan Installment:</strong> £180.00 / month</p>
                <p><strong>Store & Credit Cards:</strong> £90.00 / month</p>
                <p><strong>Total Monthly Contractual Commitments:</strong> £2,040.00</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-sky-300 font-semibold">Front-End Housing Ratio: (£1,450 / £5,200) = 27.88%</p>
                  <p className="text-emerald-300 font-semibold">Back-End Total Debt Ratio: (£2,040 / £5,200) = 39.23%</p>
                  <p className="text-slate-300 text-xs mt-1">Status: Successfully passes Bank of England mortgage affordability stress test.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Underwriter Compensating Factors for Elevated DTI Ratios</h3>
            <p className="leading-relaxed mb-4 text-sm">
              If your back-end DTI lands between 43% and 50%, mortgage automated underwriting systems (such as Fannie Mae Desktop Underwriter or Freddie Mac Loan Product Advisor) can still issue an Approve/Eligible recommendation if strong compensating factors exist:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">Substantial Cash Reserves</p>
                <p className="text-xs text-slate-300">
                  Documenting 6 to 12 months of post-closing principal, interest, taxes, and insurance (PITI) liquid assets in savings, money market accounts, or vested retirement balances.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">Substantial Equity / Down Payment</p>
                <p className="text-xs text-slate-300">
                  Investing a 20% or higher cash down payment provides lenders with a significant equity cushion, shielding them against loan default even if debt ratios are elevated.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">High Credit Score (740+)</p>
                <p className="text-xs text-slate-300">
                  A spotless credit profile reflecting pristine multi-year installment loan repayment history proves responsible debt management regardless of nominal monthly percentages.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">5 Critical Debt-to-Income Pitfalls to Avoid Before Closing</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed text-slate-300">
              <li>
                <strong>Financing Large Purchases Before Loan Closing:</strong> Taking out an auto loan or financing new furniture during escrow adds immediate monthly debt liabilities that can instantly push your back-end DTI over underwriting thresholds, triggering mortgage denial days before closing.
              </li>
              <li>
                <strong>Cosigning Loans for Family Members:</strong> When you cosign an auto or student loan for a relative, underwriters count 100% of that monthly payment against your DTI unless you document 12 consecutive months of canceled checks showing the primary borrower paid from their own account.
              </li>
              <li>
                <strong>Ignoring Credit Card Statement Cycle Dates:</strong> Even if you pay off credit cards in full every month, the balance reported to credit bureaus on your monthly statement date establishes the minimum payment figure used in your DTI calculation. Pay balances prior to statement generation.
              </li>
              <li>
                <strong>Assuming Overtime and Bonus Pay Automatically Counts:</strong> Lenders require a continuous two-year history of overtime, commissions, or bonus compensation with the same employer before factoring variable earnings into your gross qualifying income.
              </li>
              <li>
                <strong>Overlooking Deferred Student Loan Payments:</strong> Even if federal student loans are in economic hardship deferment or forbearance, underwriters must attribute a minimum monthly payment (typically 0.5% to 1.0% of the outstanding loan balance).
              </li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="This Debt-to-Income calculator is intended strictly for educational budgeting and mortgage planning purposes. Final lending approval, underwriting qualifications, and terms are determined exclusively by licensed financial institutions." />
      </div>
    </>
  );
};

export default DebtToIncomeRatioCalculator;

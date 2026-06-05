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
import { DollarSign } from 'lucide-react';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => (currency === 'USD' ? '$' : '£');

  const calculateLoan = (e) => {
    e.preventDefault();
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const termYears = parseFloat(loanTerm);

    if (isNaN(P) || isNaN(annualRate) || isNaN(termYears) || P <= 0 || annualRate < 0 || termYears <= 0) {
      setResult({ error: "Please enter valid positive numbers for all fields." });
      return;
    }

    const i = annualRate / 100 / 12;
    const n = termYears * 12;
    
    // Handle 0% interest rate case
    const M = i === 0 ? P / n : P * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    const totalPayment = M * n;
    const totalInterest = totalPayment - P;

    const newResult = {
      monthlyPayment: M.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      loanAmount: P.toFixed(2)
    };
    setResult(newResult);
    saveCalculation({
      type: 'Loan',
      inputs: { loanAmount, interestRate, loanTerm, currency },
      result: { Monthly: `${getCurrencySymbol()}${newResult.monthlyPayment}`, Total: `${getCurrencySymbol()}${newResult.totalPayment}` }
    });
  };

  const resetForm = () => {
    setLoanAmount(''); setInterestRate(''); setLoanTerm(''); setResult(null);
  };

  const faqItems = [
    {
      question: "What is an EMI?",
      answer: "EMI stands for Equated Monthly Installment. It is the fixed payment amount you make to a lender at a specified date each calendar month to pay off your loan."
    },
    {
      question: "How do I calculate my monthly loan payment?",
      answer: "You can use this Loan Calculator by entering the loan amount, the annual interest rate, and the loan term. The calculator automatically computes the monthly payment using standard amortization formulas."
    },
    {
      question: "What factors affect my monthly payment?",
      answer: "Three main factors affect your payment: the principal loan amount, the interest rate, and the loan duration (term). Higher amounts or rates increase payments, while longer terms decrease monthly payments but increase total interest."
    },
    {
      question: "What is the difference between interest rate and APR?",
      answer: "The interest rate is the cost of borrowing the principal amount. APR (Annual Percentage Rate) includes the interest rate plus other costs like broker fees and closing costs, providing a broader measure of the loan's cost."
    },
    {
      question: "How can I reduce my total interest paid?",
      answer: "You can reduce total interest by securing a lower interest rate, choosing a shorter loan term, or making extra payments towards the principal balance whenever possible."
    },
    {
      question: "Can I use this for car loans?",
      answer: "Yes, this calculator works perfectly for car loans. Simply enter the vehicle price minus your down payment as the 'Loan Amount'."
    },
    {
      question: "What happens if I make extra payments?",
      answer: "Making extra payments reduces your principal balance faster than scheduled. This not only shortens the life of the loan but also significantly reduces the total interest you pay over time."
    },
    {
      question: "Is this calculator accurate for all loan types?",
      answer: "This calculator uses the standard formula for fixed-rate installment loans (like mortgages, auto loans, and personal loans). It may not apply to interest-only loans, credit cards, or loans with variable rates."
    }
  ];

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
  
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Loan Calculator",
    "description": "Calculate monthly payments for auto, personal, or mortgage loans. Estimate total interest and compare loan scenarios instantly with our free calculator.",
    "applicationCategory": "FinancialApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/financial/loan-calculator",
    "browserRequirements": "Requires a modern web browser.",
    "offers": {
      "@type": "Offer",
      "price": "0"
    }
  };

  const pageTitle = "Loan Calculator: Estimate Monthly Payments and Interest 2026";
  const pageDescription = "Calculate monthly payments for auto, personal, or mortgage loans. Estimate total interest and compare loan scenarios instantly with our free calculator.";

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="/financial/loan-calculator"
        schema={[webAppSchema, faqPageSchema]}
      />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={DollarSign} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white">Calculate Loan Payments</CardTitle>
                <CardDescription>Enter your principal, interest, and term details</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={calculateLoan} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currency" className="text-slate-300 font-medium">Currency</Label>
                    <select
                      id="currency"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full p-3 bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-white outline-none"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount" className="text-slate-300 font-medium">Loan Amount ({getCurrencySymbol()})</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="e.g., 25000"
                      required
                      className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interestRate" className="text-slate-300 font-medium">Annual Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="e.g., 6.5"
                      required
                      className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loanTerm" className="text-slate-300 font-medium">Loan Term (Years)</Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      placeholder="e.g., 5"
                      required
                      className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                      Calculate Loan
                    </Button>
                    <Button type="button" variant="secondary" onClick={resetForm} className="h-12 rounded-xl">
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>
              {result && !result.error && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-800/30 border-t border-slate-700/40">
                  <div className="w-full space-y-4">
                    <h3 className="text-lg font-bold text-slate-300">Loan Repayment Summary</h3>
                    <div className="text-center mb-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                      <p className="text-slate-400 text-sm font-medium">Estimated Monthly Payment</p>
                      <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                        {getCurrencySymbol()}{Number(result.monthlyPayment).toLocaleString()}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-400">Total Principal</p>
                        <p className="font-semibold text-slate-200">{getCurrencySymbol()}{Number(result.loanAmount).toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-400">Total Interest</p>
                        <p className="font-semibold text-red-400">{getCurrencySymbol()}{Number(result.totalInterest).toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-400">Total Payments</p>
                        <p className="font-semibold text-slate-200">{getCurrencySymbol()}{Number(result.totalPayment).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center pt-2">
                      <ShareResults
                        title="My Loan Calculation"
                        text={`My estimated monthly loan payment is ${getCurrencySymbol()}${result.monthlyPayment} for a ${getCurrencySymbol()}${Number(result.loanAmount).toLocaleString()} loan.`}
                        url="https://calczoon.com/financial/loan-calculator"
                      />
                    </div>
                  </div>
                </CardFooter>
              )}
              {result && result.error && (
                <CardFooter className="p-6 bg-slate-800/30 border-t border-slate-700/40 text-center">
                  <p className="text-destructive text-center w-full">{result.error}</p>
                </CardFooter>
              )}
            </Card>
          </div>
          <aside className="lg:col-span-1 space-y-6">
            <RelatedTools category="financial" />
          </aside>
        </div>

        {/* Detailed SEO Explanation Section */}
        <section className="mt-16 bg-slate-800/20 rounded-2xl border border-slate-700/40 p-8 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">What is an Installment Loan?</h2>
            <p>
              An installment loan is a lump sum of money borrowed from a financial lender (like a bank or credit union) that is repaid over time with set, periodic payments (usually monthly installments). Installment loans have fixed interest rates and predetermined durations, meaning your monthly payments remain constant until the loan balance is fully paid off.
            </p>
            <p>
              Common examples of installment loans include auto loans, mortgage loans, student loans, and personal signature loans. Calculating these payments beforehand is vital to prevent overextending your budget.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">How to Use the Free Loan Calculator</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Select your Currency:</strong> Choose between USD ($) and GBP (£) to customize your results.</li>
              <li><strong>Enter Loan Principal:</strong> Type the total amount of money you want to borrow. If calculating a car loan, subtract your down payment from the purchase price first.</li>
              <li><strong>Input Interest Rate:</strong> Enter the annual interest rate (APR) offered by your lender.</li>
              <li><strong>Select Loan Term:</strong> Input the duration of the loan in years. (For example, entering 5 years represents a standard 60-month loan).</li>
              <li><strong>Click Calculate:</strong> Press the "Calculate Loan" button to view your Equated Monthly Installment (EMI), principal breakdown, and the total interest expense.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">The Mathematical Amortization Formula (EMI)</h2>
            <p>
              To determine monthly payments for a fixed-rate loan, lenders use standard amortization mathematics. The formula used is:
            </p>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-center font-mono text-emerald-400 my-4">
              M = P × [ i(1 + i)ⁿ ] / [ (1 + i)ⁿ - 1 ]
            </div>
            <p className="mb-4">Where:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>M:</strong> Monthly payment or Equated Monthly Installment (EMI).</li>
              <li><strong>P:</strong> Principal loan amount borrowed.</li>
              <li><strong>i:</strong> Monthly interest rate (Annual interest rate divided by 12 and then divided by 100).</li>
              <li><strong>n:</strong> Total number of monthly payments (Term of the loan in years multiplied by 12).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Benefits of Calculating Loan Payments in Advance</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Protects Your Debt-to-Income (DTI) Ratio:</strong> Keep your monthly obligations under a healthy threshold (typically below 36% of your gross monthly income) to protect your credit profile.</li>
              <li><strong>Unveils Hidden Borrowing Costs:</strong> See exactly how much money goes towards interest rather than paying down the actual principal.</li>
              <li><strong>Assists with Negotiation:</strong> Arm yourself with calculations before visiting a car dealership or signing broker agreements.</li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="This calculator is for informational purposes only. The results are estimates and may not reflect the actual terms of your loan. Consult with a financial professional for personalized advice." />
      </div>
    </>
  );
};

export default LoanCalculator;
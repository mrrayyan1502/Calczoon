import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveCalculation } from '@/lib/history';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import AffiliateLinks from '@/components/AffiliateLinks';
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

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

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
                        <option value="EUR">EUR (€)</option>
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
                    <div className="mt-4 w-full">
                        <ShareResults
                            title="Loan Payment Calculation"
                            text={`Calculated my monthly loan payment on CalcZoon! Estimated payment: ${getCurrencySymbol()}${Number(result.monthlyPayment).toLocaleString()}/month for a principal of ${getCurrencySymbol()}${Number(result.loanAmount).toLocaleString()}. Try this tool:`}
                            url="/financial/loan-calculator"
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

        {/* Detailed SEO Explanation Section with Financial References */}
        <section className="mt-16 bg-slate-800/20 rounded-2xl border border-slate-700/40 p-8 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">What is an Installment Loan and How Does Amortization Work?</h2>
            <p>
              An installment loan is a commercial lending agreement where a specific principal sum is borrowed from a financial institution and repaid over a predetermined schedule. Unlike revolving credit (such as credit cards), installment loans utilize a fixed repayment structure called amortization.
            </p>
            <p>
              Through the process of amortization, early payments primarily cover accrued interest charges, while subsequent payments increasingly reduce the principal balance. This mathematical curve ensures that the lender secures their profit early in the loan cycle, making it essential for borrowers to understand their long-term financial obligations.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">How to Use the Free Amortization Calculator</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Currency Selection:</strong> Opt for USD ($) or GBP (£) based on your geographic banking requirements.</li>
              <li><strong>Principal Amount:</strong> Enter the exact capital you intend to borrow. For mortgages or auto loans, this is the purchase price minus your initial down payment.</li>
              <li><strong>Annual Percentage Rate (APR):</strong> Input the nominal interest rate provided by your lending institution.</li>
              <li><strong>Loan Duration:</strong> Specify the term in years. For example, a standard auto loan is often 5 years (60 months), while a mortgage is typically 15 or 30 years.</li>
              <li><strong>Financial Analysis:</strong> The calculator will generate your Equated Monthly Installment (EMI) and separate the total interest from the principal capital.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">The Mathematical Amortization Equation (EMI)</h2>
            <p>
              Global banking systems rely on a standard compound interest equation to calculate fixed monthly payments. The universally accepted formula is:
            </p>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-center font-mono text-emerald-400 my-4">
              M = P × [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
            </div>
            <p className="mb-4">Where the variables represent:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>M:</strong> The final Equated Monthly Installment (EMI).</li>
              <li><strong>P:</strong> The principal borrowing amount.</li>
              <li><strong>r:</strong> The periodic interest rate (Annual interest rate ÷ 12 months ÷ 100).</li>
              <li><strong>n:</strong> The total number of compounding periods (Years × 12).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Strategic Financial Benefits of Calculating Your EMI</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Debt-to-Income (DTI) Optimization:</strong> Financial advisors strongly recommend keeping total debt obligations below 36% of gross income. Knowing your EMI prevents over-leveraging.</li>
              <li><strong>Interest Mitigation:</strong> By visualizing total interest costs, borrowers can make informed decisions about shortening the loan term to save capital.</li>
              <li><strong>Leverage in Negotiations:</strong> Understanding amortization equips consumers to negotiate better APRs with credit bureaus and auto dealerships.</li>
            </ul>
          </div>

          {/* Financial References Section */}
          <div className="mt-10 pt-6 border-t border-slate-700/50">
            <h3 className="text-lg font-bold text-slate-400 mb-3 uppercase tracking-wider text-sm">Financial References & Sources</h3>
            <ul className="text-xs text-slate-500 space-y-2">
              <li>1. Federal Reserve Board. (2020). <em>Consumer Credit - G.19</em>. Board of Governors of the Federal Reserve System.</li>
              <li>2. Investopedia. (2023). <em>Amortization: How it Works and How to Calculate it</em>.</li>
              <li>3. Consumer Financial Protection Bureau (CFPB). <em>What is a debt-to-income ratio?</em> Official US Government Financial Guidelines.</li>
              <li>4. Brealey, R. A., Myers, S. C., & Allen, F. (2011). <em>Principles of Corporate Finance</em>. McGraw-Hill Education.</li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="This calculator is for informational purposes only. The results are estimates and may not reflect the actual terms of your loan. Consult with a financial professional for personalized advice." />
      </div>
    </>
  );
};

        <AffiliateLinks category="loan" title="Recommended Loan & Finance Tools" />

export default LoanCalculator;
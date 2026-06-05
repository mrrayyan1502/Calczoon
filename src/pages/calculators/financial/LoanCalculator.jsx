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

  // Enhanced FAQ Items (8 total)
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

  // Single Valid FAQPage Schema
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
    "description": "Our free Loan Calculator helps you estimate monthly payments for auto, student, or personal loans. Factor in trade-ins and compare multiple loan options.",
    "applicationCategory": "FinancialApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/financial/loan-calculator",
    "browserRequirements": "Requires a modern web browser.",
    "offers": {
      "@type": "Offer",
      "price": "0"
    }
  };

  return (
    <>
      <Seo
        title="Loan Calculator - Estimate Monthly Payments | Calczoon"
        description="Our free Loan Calculator helps you estimate monthly payments for auto, student, or personal loans. Factor in trade-ins and compare multiple loan options."
        canonicalUrl="/financial/loan-calculator"
        schema={[webAppSchema, faqPageSchema]}
      />
      <div className="max-w-4xl mx-auto py-8 px-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <h1 className="text-3xl font-bold text-center text-primary">Loan Comparison & Payment Calculator</h1>
              <CardDescription className="text-center text-slate-400">
                Our versatile Loan Calculator empowers you to make informed financial decisions. Whether you're exploring auto loans with a trade-in, comparing student loan options, or planning for a personal loan, this tool provides clear insights into monthly payments, total interest, and the overall cost of borrowing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateLoan} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white">
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount ({getCurrencySymbol()})</Label>
                  <Input id="loanAmount" type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="e.g., 25000" required className="bg-slate-900 border-slate-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                  <Input id="interestRate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 6.5" required className="bg-slate-900 border-slate-700" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                  <Input id="loanTerm" type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} placeholder="e.g., 5" required className="bg-slate-900 border-slate-700" />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate Loan</Button>
                  <Button type="button" variant="secondary" onClick={resetForm} className="h-12">Reset</Button>
                </div>
              </form>
            </CardContent>
            {result && !result.error && (
              <CardFooter className="flex flex-col items-start mt-6 p-6 bg-slate-800 rounded-b-lg">
                <div className="w-full space-y-4">
                  <h2 className="text-xl font-bold text-slate-100">Loan Summary</h2>
                  <div className="text-center mb-4">
                    <p className="text-slate-300">Monthly Payment</p>
                    <p className="text-4xl font-bold text-primary">{getCurrencySymbol()}{result.monthlyPayment}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-slate-300">Total Principal Paid:</span><span className="font-bold text-slate-100">{getCurrencySymbol()}{result.loanAmount}</span></div>
                    <div className="flex justify-between"><span className="text-slate-300">Total Interest Paid:</span><span className="font-bold text-red-400">{getCurrencySymbol()}{result.totalInterest}</span></div>
                    <div className="flex justify-between"><span className="text-slate-300">Total Payment:</span><span className="font-bold text-slate-100">{getCurrencySymbol()}{result.totalPayment}</span></div>
                  </div>
                   <div className="mt-4 w-full">
                        <ShareResults
                            title="My Loan Calculation"
                            text={`My estimated monthly loan payment is ${getCurrencySymbol()}${result.monthlyPayment}. Calculated via Calczoon.`}
                            url="https://calczoon.com/financial/loan-calculator"
                        />
                    </div>
                </div>
              </CardFooter>
            )}
             {result && result.error && (
              <CardFooter className="mt-6 p-6 bg-slate-800 rounded-b-lg">
                <p className="text-destructive text-center w-full">{result.error}</p>
              </CardFooter>
            )}
          </Card>
          <Faq items={faqItems} className="mt-8"/>
          <Disclaimer text="This calculator is for informational purposes only. The results are estimates and may not reflect the actual terms of your loan. Consult with a financial professional for personalized advice." />
      </div>
    </>
  );
};

export default LoanCalculator;
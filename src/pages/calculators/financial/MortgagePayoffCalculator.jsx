import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Disclaimer from '@/components/Disclaimer';
import Faq from '@/components/Faq';
import { saveCalculation } from '@/lib/history';
import Seo from '@/components/Seo';
import ShareResults from '@/components/ShareResults';

const MortgagePayoffCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [extraPayment, setExtraPayment] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => (currency === 'USD' ? '$' : '£');

  const calculatePayoff = (e) => {
    e.preventDefault();
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const termYears = parseFloat(loanTerm);
    const extra = parseFloat(extraPayment) || 0;

    if (isNaN(P) || isNaN(annualRate) || isNaN(termYears) || P <= 0 || annualRate <= 0 || termYears <= 0) {
      setResult({ error: "Please enter valid loan details." });
      return;
    }

    const i = annualRate / 100 / 12;
    const originalN = termYears * 12;
    
    const M = i === 0 ? P / originalN : P * (i * Math.pow(1 + i, originalN)) / (Math.pow(1 + i, originalN) - 1);
    const totalOriginalInterest = (M * originalN) - P;

    let newResult;

    if (extra > 0) {
      const newM = M + extra;
      if (i === 0) {
        const newN = Math.ceil(P / newM);
        const totalNewPayment = P;
        const totalNewInterest = 0;
        const interestSaved = totalOriginalInterest - totalNewInterest;
        const timeSavedMonths = originalN - newN;
        newResult = {
          originalMonthlyPayment: M.toFixed(2), newMonthlyPayment: newM.toFixed(2), interestSaved: interestSaved.toFixed(2),
          yearsSaved: Math.floor(timeSavedMonths / 12), monthsSaved: timeSavedMonths % 12,
          newPayoff: `${Math.floor(newN / 12)} years, ${newN % 12} months`
        };
      } else {
        const newN = Math.log(newM / (newM - P * i)) / Math.log(1 + i);
        if (newN < 0 || !isFinite(newN)) {
           setResult({ error: "Extra payment is too high or causes calculation issues. Please review inputs." });
           return;
        }
        const totalNewPayment = newM * newN;
        const totalNewInterest = totalNewPayment - P;
        const interestSaved = totalOriginalInterest - totalNewInterest;
        const timeSavedMonths = Math.round(originalN - newN);
        newResult = {
          originalMonthlyPayment: M.toFixed(2), newMonthlyPayment: newM.toFixed(2), interestSaved: interestSaved.toFixed(2),
          yearsSaved: Math.floor(timeSavedMonths / 12), monthsSaved: timeSavedMonths % 12,
          newPayoff: `${Math.floor(newN / 12)} years, ${Math.ceil(newN) % 12} months`
        };
      }
    } else {
      newResult = {
        originalMonthlyPayment: M.toFixed(2), newMonthlyPayment: M.toFixed(2), interestSaved: "0.00", yearsSaved: 0, monthsSaved: 0,
        newPayoff: `${termYears} years, 0 months`
      };
    }
    setResult(newResult);
    saveCalculation({
      type: 'Mortgage Payoff',
      inputs: { loanAmount, interestRate, loanTerm, extraPayment, currency },
      result: { InterestSaved: `${getCurrencySymbol()}${newResult.interestSaved}`, TimeSaved: `${newResult.yearsSaved}y ${newResult.monthsSaved}m` }
    });
  };

  const faqItems = [
    { question: "How much can I save by making extra mortgage payments?", answer: "The amount you save depends on your loan amount, interest rate, and the size of your extra payments. Even small additional amounts applied directly to the principal can save you tens of thousands of dollars and shave years off your loan term. Our calculator provides a precise estimate for your scenario." },
    { question: "What is mortgage amortization?", answer: "Amortization is the process of spreading out a loan into a series of fixed payments over time. Each payment consists of both principal and interest. In the beginning, a larger portion of your payment goes to interest. As you pay down the principal, more of each payment goes towards your loan balance." },
    { question: "Should I make extra payments or invest the money instead?", answer: "This is a common financial dilemma. Paying off your mortgage early provides a guaranteed, risk-free return equal to your mortgage interest rate. Investing, on the other hand, offers the potential for higher returns but comes with risk. The right choice depends on your risk tolerance and financial goals." }
  ];

  return (
    <>
      <Seo
        title="Mortgage Payoff Calculator - Save Interest & Time"
        description="Use our free Mortgage Payoff Calculator with extra principal payments to see how much interest you can save and shorten your mortgage term. Pay off your mortgage faster!"
        canonicalUrl="/financial/mortgage-payoff-calculator"
      />
      <div className="max-w-2xl mx-auto py-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <h1 className="text-3xl font-bold text-center text-primary">Mortgage Payoff Calculator</h1>
                <CardDescription className="text-center text-slate-400">
                  Discover how making additional monthly payments can dramatically shorten your loan term and save you thousands in interest. See your new payoff date and total savings instantly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculatePayoff} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white">
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Original Loan Amount ({getCurrencySymbol()})</Label>
                    <Input id="loanAmount" type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="e.g., 300000" required className="bg-slate-900 border-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                    <Input id="interestRate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 5.5" required className="bg-slate-900 border-slate-700" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loanTerm">Original Loan Term (Years)</Label>
                    <Input id="loanTerm" type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} placeholder="e.g., 30" required className="bg-slate-900 border-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="extraPayment">Extra Monthly Principal Payment ({getCurrencySymbol()})</Label>
                    <Input id="extraPayment" type="number" value={extraPayment} onChange={(e) => setExtraPayment(e.target.value)} placeholder="e.g., 200 (optional)" className="bg-slate-900 border-slate-700" />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate Payoff</Button>
                </form>
              </CardContent>
              {result && !result.error && (
                <CardFooter className="flex flex-col items-start mt-6 p-6 bg-slate-800 rounded-b-lg">
                  <div className="w-full space-y-4">
                    <h2 className="text-xl font-bold text-slate-100">Your Payoff Results</h2>
                    <div className="text-center mb-4">
                      <p className="text-slate-300">Total Interest Saved</p>
                      <p className="text-4xl font-bold text-green-400">{getCurrencySymbol()}{result.interestSaved}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-slate-300">Time Saved:</span><span className="font-bold text-slate-100">{result.yearsSaved} years, {result.monthsSaved} months</span></div>
                      <div className="flex justify-between"><span className="text-slate-300">Original Monthly Payment:</span><span className="font-bold text-slate-100">{getCurrencySymbol()}{result.originalMonthlyPayment}</span></div>
                      <div className="flex justify-between"><span className="text-slate-300">New Monthly Payment:</span><span className="font-bold text-primary">{getCurrencySymbol()}{result.newMonthlyPayment}</span></div>
                      <div className="flex justify-between"><span className="text-slate-300">New Payoff Time:</span><span className="font-bold text-slate-100">{result.newPayoff}</span></div>
                    </div>
                     <div className="mt-4 w-full">
                        <ShareResults
                            title="My Mortgage Payoff Plan"
                            text={`By paying extra, I can save ${getCurrencySymbol()}${result.interestSaved} and pay off my mortgage ${result.yearsSaved} years early! Check your savings on Calczoon.`}
                            url="https://calczoon.com/financial/mortgage-payoff-calculator"
                        />
                    </div>
                  </div>
                </CardFooter>
              )}
               {result && result.error && (
                  <CardFooter className="mt-6 p-6 bg-red-900/20 rounded-b-lg">
                      <p className="text-red-400 text-center w-full">{result.error}</p>
                  </CardFooter>
              )}
            </Card>
          </motion.div>
          <Faq items={faqItems} className="mt-8"/>
          <Disclaimer text="This calculator provides an estimate for informational purposes. Verify all information with your lender before making changes to your payment schedule. Ensure extra payments are applied directly to the principal, as some lenders may not do this automatically." />
        </div>
    </>
  );
};

export default MortgagePayoffCalculator;
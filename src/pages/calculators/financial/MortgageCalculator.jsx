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
import { Home } from 'lucide-react';

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('30');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const calculateMortgage = (e) => {
    e.preventDefault();
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment) || 0;
    const annualRate = parseFloat(interestRate);
    const termYears = parseFloat(loanTerm);

    if (isNaN(price) || isNaN(annualRate) || isNaN(termYears) || price <= 0 || annualRate < 0 || termYears <= 0 || down < 0 || down >= price) {
      setResult({ error: "Please enter valid positive numbers. Down payment cannot exceed home price." });
      return;
    }

    const principal = price - down;
    const i = annualRate / 100 / 12;
    const n = termYears * 12;
    
    const M = i === 0 ? principal / n : principal * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    const totalPayment = M * n;
    const totalInterest = totalPayment - principal;

    const newResult = {
      monthlyPayment: M.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principalAmount: principal.toFixed(2)
    };
    
    setResult(newResult);
    saveCalculation({
      type: 'Mortgage',
      inputs: { homePrice, downPayment, interestRate, loanTerm, currency },
      result: { Monthly: `${getCurrencySymbol()}${newResult.monthlyPayment}`, Total: `${getCurrencySymbol()}${newResult.totalPayment}` }
    });
  };

  const resetForm = () => {
    setHomePrice(''); setDownPayment(''); setInterestRate(''); setLoanTerm('30'); setResult(null);
  };

  const faqItems = [
    {
      question: "What is a Mortgage Calculator?",
      answer: "A mortgage calculator helps you estimate your monthly home loan payments based on the home's purchase price, down payment, interest rate, and loan term."
    },
    {
      question: "How does the down payment affect my mortgage?",
      answer: "A larger down payment reduces the principal loan amount, which lowers your monthly payments and decreases the total interest paid over the life of the loan."
    },
    {
      question: "What is the difference between a 15-year and 30-year mortgage?",
      answer: "A 15-year mortgage has higher monthly payments but significantly less total interest. A 30-year mortgage has lower monthly payments but costs more in interest over time."
    }
  ];

  const pageTitle = "Mortgage Calculator: Estimate Monthly Home Payments";
  const pageDescription = "Easily estimate your monthly mortgage payments, including total interest and principal amounts, using our free online mortgage calculator.";

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} canonicalUrl="/financial/mortgage-calculator" />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={Home} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white">Calculate Mortgage</CardTitle>
                <CardDescription>Enter your home details</CardDescription>
                <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-xl">
                  <p className="text-sm text-emerald-400/90 leading-relaxed">
                    Yeh tool aapko calculations ko multiple currencies mein dekhne ki sahulat deta hai. Sirf apni currency select karein aur result US Dollar ($), British Pound (£) ya Euro (€) mein hasil karein. Is se UK, Europe aur international users ke liye calculations ko samajhna aur plan karna zyada asaan ho jata hai.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={calculateMortgage} className="space-y-6">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="homePrice" className="text-slate-300 font-medium">Home Price ({getCurrencySymbol()})</Label>
                      <Input id="homePrice" type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} placeholder="e.g., 300000" required className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="downPayment" className="text-slate-300 font-medium">Down Payment ({getCurrencySymbol()})</Label>
                      <Input id="downPayment" type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="e.g., 60000" className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="interestRate" className="text-slate-300 font-medium">Interest Rate (%)</Label>
                      <Input id="interestRate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 6.5" required step="0.01" className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loanTerm" className="text-slate-300 font-medium">Loan Term (Years)</Label>
                      <select id="loanTerm" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-white outline-none">
                        <option value="15">15 Years</option>
                        <option value="20">20 Years</option>
                        <option value="30">30 Years</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                      Calculate Mortgage
                    </Button>
                    <Button type="button" variant="secondary" onClick={resetForm} className="h-12 rounded-xl">Reset</Button>
                  </div>
                </form>
              </CardContent>
              {result && !result.error && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-800/30 border-t border-slate-700/40">
                  <div className="w-full space-y-4">
                    <h3 className="text-lg font-bold text-slate-300">Mortgage Summary</h3>
                    <div className="text-center mb-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                      <p className="text-slate-300 text-sm font-medium">Estimated Monthly Payment (P&I)</p>
                      <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                        {getCurrencySymbol()}{Number(result.monthlyPayment).toLocaleString()}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-300">Principal Loan Amount</p>
                        <p className="font-semibold text-slate-200">{getCurrencySymbol()}{Number(result.principalAmount).toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-300">Total Interest</p>
                        <p className="font-semibold text-red-400">{getCurrencySymbol()}{Number(result.totalInterest).toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-300">Total Payments</p>
                        <p className="font-semibold text-slate-200">{getCurrencySymbol()}{Number(result.totalPayment).toLocaleString()}</p>
                      </div>
                    </div>
                    <ShareResults title="Mortgage Payment Calculation" text={`Calculated my monthly mortgage payment on CalcZoon! Estimated: ${getCurrencySymbol()}${Number(result.monthlyPayment).toLocaleString()}/month.`} url="/financial/mortgage-calculator" />
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
        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="This calculator is for informational purposes only. Actual mortgage terms and amounts may vary based on property taxes, insurance, and lender fees." />
      </div>
    </>
  );
};

export default MortgageCalculator;

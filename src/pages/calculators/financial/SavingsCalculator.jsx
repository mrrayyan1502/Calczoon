import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Disclaimer from '@/components/Disclaimer';
import Faq from '@/components/Faq';
import { saveCalculation } from '@/lib/history';
import Seo from '@/components/Seo';
import ShareResults from '@/components/ShareResults';

const SavingsCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [years, setYears] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => (currency === 'USD' ? '$' : '£');

  const calculateSavings = (e) => {
    e.preventDefault();
    const P = parseFloat(initialDeposit) || 0;
    const C = parseFloat(monthlyContribution) || 0;
    const annualRate = parseFloat(interestRate);
    const t = parseFloat(years);

    if (isNaN(annualRate) || isNaN(t) || annualRate < 0 || t <= 0) {
      setResult({ error: "Please enter a valid interest rate and time period." });
      return;
    }

    const r = annualRate / 100 / 12;
    const n = t * 12;

    const futureValueOfP = P * Math.pow(1 + r, n);
    const futureValueOfC = r > 0 ? C * ((Math.pow(1 + r, n) - 1) / r) : C * n;
    const futureValue = futureValueOfP + futureValueOfC;
    
    const totalPrincipal = P + (C * n);
    const totalInterest = futureValue - totalPrincipal;

    const newResult = {
      futureValue: futureValue.toFixed(2),
      totalPrincipal: totalPrincipal.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    };
    setResult(newResult);
    saveCalculation({
      type: 'Savings',
      inputs: { initialDeposit, monthlyContribution, interestRate, years, currency },
      result: { FutureValue: `${getCurrencySymbol()}${newResult.futureValue}`, Interest: `${getCurrencySymbol()}${newResult.totalInterest}` }
    });
  };

  const faqItems = [
    { question: "How long will my savings last in retirement?", answer: "While this calculator projects savings growth, a 'drawdown' calculator is needed to see how long savings will last. That tool would factor in your total savings, annual return, and how much you withdraw each year to estimate the lifespan of your retirement fund." },
    { question: "Can I use this as a college savings plan calculator by age?", answer: "Yes, this is an excellent tool for that. Enter your current savings as the 'Initial Deposit', your planned monthly contributions, an estimated interest rate for your investment (e.g., a 529 plan), and the number of years until your child attends college." },
    { question: "How does the compound interest savings calculator with daily contributions work?", answer: "This calculator compounds interest monthly. For daily contributions, you could approximate by multiplying your daily amount by 30 and entering it as the 'Monthly Contribution'. For precise daily compounding, a more specialized calculator would be needed." }
  ];
  
  return (
    <>
      <Seo
        title="Savings Goal Calculator - Plan Your Financial Future"
        description="Our free Savings Calculator shows you how your money can grow with compound interest. Plan for retirement, college, or an emergency fund with ease."
        canonicalUrl="/financial/savings-calculator"
      />
      <div className="max-w-2xl mx-auto py-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <h1 className="text-3xl font-bold text-center text-primary">Future Value of Savings Calculator</h1>
              <CardDescription className="text-center text-slate-400">
                Visualize your financial future. This calculator shows how your savings can grow over time with the power of compound interest. Enter your initial deposit, regular contributions, and interest rate to project the future value of your investments, perfect for retirement, college, or any long-term savings goal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateSavings} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white">
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="initialDeposit">Initial Deposit ({getCurrencySymbol()})</Label>
                  <Input id="initialDeposit" type="number" value={initialDeposit} onChange={(e) => setInitialDeposit(e.target.value)} placeholder="e.g., 1000" className="bg-slate-900 border-slate-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyContribution">Monthly Contribution ({getCurrencySymbol()})</Label>
                  <Input id="monthlyContribution" type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} placeholder="e.g., 200" className="bg-slate-900 border-slate-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                  <Input id="interestRate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 5" required className="bg-slate-900 border-slate-700" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="years">Time Period (Years)</Label>
                  <Input id="years" type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g., 10" required className="bg-slate-900 border-slate-700" />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate Savings</Button>
              </form>
            </CardContent>
            {result && !result.error && (
              <CardFooter className="flex flex-col items-start mt-6 p-6 bg-slate-800 rounded-b-lg">
                <div className="w-full space-y-4">
                  <h2 className="text-xl font-bold text-slate-100">Projected Growth</h2>
                  <div className="text-center mb-4">
                    <p className="text-slate-300">Future Value</p>
                    <p className="text-4xl font-bold text-primary">{getCurrencySymbol()}{result.futureValue}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-slate-300">Total Principal Contributed:</span><span className="font-bold text-slate-100">{getCurrencySymbol()}{result.totalPrincipal}</span></div>
                    <div className="flex justify-between"><span className="text-slate-300">Total Interest Earned:</span><span className="font-bold text-green-400">{getCurrencySymbol()}{result.totalInterest}</span></div>
                  </div>
                   <div className="mt-4 w-full">
                        <ShareResults
                            title="My Savings Goal"
                            text={`I'm projected to save ${getCurrencySymbol()}${result.futureValue}! Plan your savings with Calczoon.`}
                            url="https://calczoon.com/financial/savings-calculator"
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
          <Faq items={faqItems} className="mt-8" />
          <Disclaimer text="The results are estimates based on the inputs provided and assume interest is compounded monthly. Actual returns may vary. This is not financial advice." />
        </div>
    </>
  );
};

export default SavingsCalculator;
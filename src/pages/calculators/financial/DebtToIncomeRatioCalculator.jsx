import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Disclaimer from '@/components/Disclaimer';
import Faq from '@/components/Faq';
import { saveCalculation } from '@/lib/history';
import { Link } from 'react-router-dom';
import ToolFeatures from '@/components/ToolFeatures';
import { Link as LinkIcon } from 'lucide-react';
import Seo from '@/components/Seo';

const DebtToIncomeRatioCalculator = () => {
  const [income, setIncome] = useState('');
  const [debts, setDebts] = useState({
    mortgage: '',
    carLoan: '',
    studentLoan: '',
    creditCard: '',
    other: ''
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
    e.preventDefault();
    const monthlyIncome = parseFloat(income);
    if (isNaN(monthlyIncome) || monthlyIncome <= 0) {
      setResult({ error: "Please enter a valid monthly income." });
      return;
    }

    const totalDebts = Object.values(debts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
    const dtiRatio = (totalDebts / monthlyIncome) * 100;

    let category = '';
    let color = '';
    if (dtiRatio <= 36) {
      category = 'Healthy';
      color = 'text-green-400';
    } else if (dtiRatio <= 43) {
      category = 'Manageable';
      color = 'text-yellow-400';
    } else {
      category = 'High';
      color = 'text-red-400';
    }

    const newResult = {
      dtiRatio: dtiRatio.toFixed(1),
      totalDebts: totalDebts.toFixed(2),
      monthlyIncome: monthlyIncome.toFixed(2),
      category,
      color
    };
    setResult(newResult);
    saveCalculation({
      type: 'Debt-to-Income Ratio',
      inputs: { income, debts, currency },
      result: { DTI: `${newResult.dtiRatio}%`, Category: newResult.category }
    });
  };

  const faqItems = [
    {
      question: "What is a good DTI ratio for renting?",
      answer: "While landlords may not have strict DTI rules like mortgage lenders, many prefer a DTI ratio under 40%. A lower DTI suggests you have enough income to comfortably pay rent and other living expenses, making you a more reliable tenant."
    },
    {
      question: "How can I lower my debt-to-income ratio for a home loan?",
      answer: "You can lower your DTI by either reducing your monthly debt payments (e.g., paying off loans faster) or increasing your gross monthly income. Avoid taking on new debt, like car loans or new credit cards, when you're preparing to apply for a mortgage."
    },
    {
      question: "Is this a DTI calculator for self-employed individuals?",
      answer: "Yes, self-employed individuals can use this calculator. For 'Gross Monthly Income', use your average monthly income after business expenses but before taxes. Lenders often look at a two-year average for self-employment income."
    }
  ];
  
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Debt-to-Income (DTI) Ratio",
    "description": "Calculate your DTI ratio to assess your financial health for loans and mortgages.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Income",
        "text": "Input your gross monthly income before taxes."
      },
      {
        "@type": "HowToStep",
        "name": "Enter Debts",
        "text": "Input all your monthly debt payments, including rent/mortgage, car loans, student loans, and credit card payments."
      },
      {
        "@type": "HowToStep",
        "name": "Calculate",
        "text": "Click the 'Calculate DTI Ratio' button to see your result and what it means for your financial health."
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Debt-to-Income (DTI) Ratio Calculator",
    "description": "Our free DTI Ratio Calculator helps you determine your financial health for mortgage approval, renting, or personal loans. See where you stand in seconds.",
    "applicationCategory": "FinancialApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/financial/debt-to-income-ratio-calculator",
    "browserRequirements": "Requires a modern web browser."
  };

  return (
    <>
      <Seo
        title="DTI Ratio Calculator - Check Your Financial Health"
        description="Our free DTI Ratio Calculator helps you determine your financial health for mortgage approval, renting, or personal loans. See where you stand in seconds."
        canonicalUrl="/financial/debt-to-income-ratio-calculator"
        schema={[webAppSchema, {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } }))
        }]}
      />
      <div className="max-w-4xl mx-auto py-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <h1 className="text-3xl font-bold text-center text-primary">DTI Ratio Calculator for Mortgage Approval</h1>
              <CardDescription className="text-center text-slate-300">
                 Your debt-to-income (DTI) ratio is a critical financial health indicator that lenders use to assess your borrowing risk. This tool helps you calculate your DTI to see where you stand, whether you're aiming for mortgage approval, applying for a personal loan, or simply managing your finances.
              </CardDescription>
                <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-xl">
                  <p className="text-sm text-emerald-400/90 leading-relaxed">
                    Yeh tool aapko calculations ko multiple currencies mein dekhne ki sahulat deta hai. Sirf apni currency select karein aur result US Dollar ($), British Pound (£) ya Euro (€) mein hasil karein. Is se UK, Europe aur international users ke liye calculations ko samajhna aur plan karna zyada asaan ho jata hai.
                  </p>
                </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateDTI} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white">
                        <option value="USD">USD ($)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-200 mb-4">Your Monthly Income</h2>
                  <div className="space-y-2">
                    <Label htmlFor="income">Gross Monthly Income ({getCurrencySymbol()})</Label>
                    <Input id="income" type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="Income before taxes" required className="bg-slate-900 border-slate-700" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-200 mb-4">Your Monthly Debt Payments</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label htmlFor="mortgage">Mortgage/Rent ({getCurrencySymbol()})</Label><Input name="mortgage" type="number" value={debts.mortgage} onChange={handleDebtChange} placeholder="e.g., 1500" className="bg-slate-900 border-slate-700" /></div>
                    <div className="space-y-2"><Label htmlFor="carLoan">Car Loan ({getCurrencySymbol()})</Label><Input name="carLoan" type="number" value={debts.carLoan} onChange={handleDebtChange} placeholder="e.g., 400" className="bg-slate-900 border-slate-700" /></div>
                    <div className="space-y-2"><Label htmlFor="studentLoan">Student Loan ({getCurrencySymbol()})</Label><Input name="studentLoan" type="number" value={debts.studentLoan} onChange={handleDebtChange} placeholder="e.g., 300" className="bg-slate-900 border-slate-700" /></div>
                    <div className="space-y-2"><Label htmlFor="creditCard">Credit Card Payments ({getCurrencySymbol()})</Label><Input name="creditCard" type="number" value={debts.creditCard} onChange={handleDebtChange} placeholder="e.g., 150" className="bg-slate-900 border-slate-700" /></div>
                    <div className="space-y-2 md:col-span-2"><Label htmlFor="other">Other Debts ({getCurrencySymbol()})</Label><Input name="other" type="number" value={debts.other} onChange={handleDebtChange} placeholder="e.g., 100" className="bg-slate-900 border-slate-700" /></div>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate DTI Ratio</Button>
              </form>
            </CardContent>
            {result && !result.error && (
              <CardFooter className="flex flex-col items-start mt-6 p-6 bg-slate-800 rounded-b-lg">
                <div className="w-full space-y-4">
                  <h2 className="text-xl font-bold text-slate-100">Your DTI Analysis</h2>
                  <div className="text-center mb-4">
                    <p className="text-4xl font-bold text-primary">{result.dtiRatio}%</p>
                    <p className={`text-xl font-semibold ${result.color}`}>{result.category}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-slate-300">Total Monthly Debts:</span><span className="font-bold text-slate-100">{getCurrencySymbol()}{result.totalDebts}</span></div>
                    <div className="flex justify-between"><span className="text-slate-300">Gross Monthly Income:</span><span className="font-bold text-slate-100">{getCurrencySymbol()}{result.monthlyIncome}</span></div>
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
          
          <ToolFeatures toolName="DTI Ratio Calculator" toolPath="/financial/debt-to-income-ratio-calculator" />

          <Card className="bg-slate-800/50 border-slate-700 mt-8">
            <CardHeader><h2 className="text-2xl font-bold text-primary">Understanding Your DTI Ratio</h2></CardHeader>
            <CardContent className="space-y-4 text-slate-300">
                <p>Your Debt-to-Income (DTI) ratio is a key financial metric comparing your total monthly debt payments to your gross monthly income. Lenders use it to measure your ability to manage payments. A lower DTI ratio indicates a good balance between debt and income.</p>
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <h3 className="font-semibold text-white">The Formula</h3>
                  <p className="font-mono text-lg text-primary">DTI = (Total Monthly Debt / Gross Monthly Income) x 100</p>
                </div>
                <h3 className="text-xl font-semibold text-white">Example Calculation</h3>
                <p>If your total monthly debts are $2,000 and your gross monthly income is $6,000, your DTI ratio would be ($2,000 / $6,000) * 100 = 33.3%. This is generally considered a healthy ratio by lenders.</p>
                <p>For more, check resources from the <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Consumer Financial Protection Bureau</a> and <a href="https://www.investopedia.com/terms/d/dti.asp" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Investopedia</a>.</p>
                
                 <div className="mt-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Related Financial Calculators</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><Link to="/financial/loan-calculator" className="text-primary hover:underline flex items-center gap-2"><LinkIcon size={16}/>Loan Comparison Calculator Multiple Loans</Link></li>
                        <li><Link to="/financial/savings-calculator" className="text-primary hover:underline flex items-center gap-2"><LinkIcon size={16}/>Future Value of Savings Calculator</Link></li>
                    </ul>
                </div>
            </CardContent>
          </Card>

          <Faq items={faqItems.map(item => ({ question: item.question, answer: item.answer.text }))} className="mt-8"/>
          <Disclaimer text="This tool is for educational purposes. Lenders may use different methods to calculate DTI and have varying qualification standards. Consult a financial advisor for personalized guidance." />
      </div>
    </>
  );
};

export default DebtToIncomeRatioCalculator;
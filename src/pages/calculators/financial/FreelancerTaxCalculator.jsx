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
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FreelancerTaxCalculator = () => {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [taxRate, setTaxRate] = useState('25'); // Default to 25% as a common estimate
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
      switch(currency) {
          case 'USD': return '$';
          case 'GBP': return '£';
          case 'EUR': return '€';
          default: return '$';
      }
  };

  const calculateTaxes = (e) => {
    e.preventDefault();
    const inc = parseFloat(income);
    const exp = parseFloat(expenses) || 0;
    const rate = parseFloat(taxRate);

    if (isNaN(inc) || isNaN(rate) || inc < 0 || exp < 0 || rate < 0) {
      setResult({ error: "Please enter valid, positive numbers for all fields." });
      return;
    }
    
    if (exp > inc) {
        setResult({ error: "Expenses cannot be greater than income." });
        return;
    }

    const netIncome = inc - exp;
    const estimatedTax = netIncome * (rate / 100);
    const incomeAfterTax = netIncome - estimatedTax;

    const newResult = {
      grossIncome: inc.toFixed(2),
      netIncome: netIncome.toFixed(2),
      estimatedTax: estimatedTax.toFixed(2),
      incomeAfterTax: incomeAfterTax.toFixed(2),
    };

    setResult(newResult);
    saveCalculation({
      type: 'Freelancer Tax',
      inputs: { income, expenses, taxRate, currency },
      result: { Tax: `${getCurrencySymbol()}${newResult.estimatedTax}` }
    });
  };

  const faqItems = [
    { question: "What is self-employment tax?", answer: "Self-employment tax is a tax consisting of Social Security and Medicare taxes, similar to FICA taxes for employees. As a freelancer, you're responsible for paying both the employee and employer portions, which is why it's crucial to set money aside." },
    { question: "What are some common deductible expenses?", answer: "Common deductions include home office expenses, software subscriptions, office supplies, business travel, and a portion of your health insurance premiums. Keeping good records is key. Our investment ROI calculator can help you see the return on these business investments." },
    { question: "Is this calculator a substitute for professional tax advice?", answer: "No. This tool provides a simplified estimate for budgeting and planning. Tax laws are complex and vary by location. We always recommend consulting with a qualified accountant for personalized advice." }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Freelancer & Self-Employed Tax Calculator",
    "description": "Estimate your quarterly or annual self-employment taxes. A simple tool for freelancers and independent contractors to budget for their tax obligations.",
    "applicationCategory": "FinancialApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/financial/freelancer-tax-calculator",
    "browserRequirements": "Requires a modern web browser."
  };

  return (
    <>
      <Seo
        title="Freelancer Tax Calculator (Self-Employment) | Calczoon"
        description="Estimate your quarterly or annual self-employment taxes. A simple tool for freelancers and independent contractors to budget for their tax obligations."
        canonicalUrl="/financial/freelancer-tax-calculator"
        schema={[webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }]}
      />
      <div className="max-w-3xl mx-auto py-8">
        <Card className="bg-slate-800/50 border-slate-700 shadow-xl">
          <CardHeader className="text-center">
            <h1 className="text-3xl font-bold text-primary">Freelancer & Self-Employed Tax Calculator</h1>
            <CardDescription className="text-slate-300 mt-2">
              Plan ahead and avoid tax-time surprises. This tool helps you estimate your tax liability based on your income and expenses.
            </CardDescription>
                <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-xl">
                  <p className="text-sm text-emerald-400/90 leading-relaxed">
                    This tool supports multiple currencies for international users. Simply select your preferred currency, and all financial results will automatically format into US Dollars ($), British Pounds (£), or Euros (€) for easier planning.</p>
                </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={calculateTaxes} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="income">Total Gross Income ({getCurrencySymbol()})</Label>
                  <Input id="income" type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="e.g., 60000" required className="bg-slate-900 border-slate-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expenses">Total Business Expenses ({getCurrencySymbol()})</Label>
                  <Input id="expenses" type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} placeholder="e.g., 8000" required className="bg-slate-900 border-slate-700" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxRate" className="flex items-center">
                  Estimated Overall Tax Rate (%)
                  <TooltipProvider>
                      <Tooltip>
                          <TooltipTrigger type="button" className="ml-2"><HelpCircle className="w-4 h-4 text-slate-300" /></TooltipTrigger>
                          <TooltipContent className="bg-slate-800 text-white border-slate-600">
                              <p>This is your combined federal, state, and self-employment tax rate. <br/> A common estimate is 25-35%, but consult a tax professional.</p>
                          </TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input id="taxRate" type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} placeholder="25" required className="bg-slate-900 border-slate-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white">
                        <option value="USD">USD ($)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Estimate Tax Bill</Button>
            </form>
          </CardContent>
          {result && !result.error && (
            <CardFooter className="flex flex-col items-start mt-6 p-6 bg-slate-800 rounded-b-lg">
                <div className="w-full space-y-4">
                  <h2 className="text-xl font-bold text-slate-100 mb-4 text-center">Tax Estimate Summary</h2>
                  <div className="bg-slate-700/50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between items-center text-lg">
                        <span className="text-slate-300">Net Income (Taxable):</span>
                        <span className="font-bold text-white">{getCurrencySymbol()}{result.netIncome}</span>
                      </div>
                      <div className="flex justify-between items-center text-lg">
                        <span className="text-slate-300">Estimated Tax Owed:</span>
                        <span className="font-bold text-red-400">{getCurrencySymbol()}{result.estimatedTax}</span>
                      </div>
                      <div className="border-t border-slate-600 my-2"></div>
                      <div className="flex justify-between items-center text-xl">
                        <span className="font-semibold text-white">Income After Tax:</span>
                        <span className="font-bold text-green-400">{getCurrencySymbol()}{result.incomeAfterTax}</span>
                      </div>
                  </div>
                  <ShareResults
                    title="My Freelance Tax Estimate"
                    text={`I used Calczoon to estimate my freelance taxes. It's a great tool for financial planning!`}
                    url="https://calczoon.com/financial/freelancer-tax-calculator"
                  />
                </div>
            </CardFooter>
          )}
           {result && result.error && (
            <CardFooter className="p-4 bg-red-900/20 rounded-b-lg mt-4">
                <p className="text-red-400 text-center w-full">{result.error}</p>
            </CardFooter>
          )}
        </Card>

        <Faq items={faqItems} className="mt-8"/>
        <Disclaimer text="This calculator is for estimation purposes only and should not be considered financial or legal advice. Tax laws vary and are subject to change. Always consult with a qualified tax professional for your specific situation." />
      </div>
    </>
  );
};

export default FreelancerTaxCalculator;
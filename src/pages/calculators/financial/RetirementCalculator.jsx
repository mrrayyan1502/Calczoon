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
import { Link as LinkIcon } from 'lucide-react';
import Seo from '@/components/Seo';

const RetirementCalculator = () => {
    const [currentAge, setCurrentAge] = useState('');
    const [retirementAge, setRetirementAge] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [result, setResult] = useState(null);

    const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

    const calculateRetirement = (e) => {
        e.preventDefault();
        const age = parseInt(currentAge);
        const retAge = parseInt(retirementAge);
        const P = parseFloat(currentSavings) || 0;
        const PMT = parseFloat(monthlyContribution) || 0;
        const r = parseFloat(interestRate) / 100;
        
        if (isNaN(age) || isNaN(retAge) || isNaN(r) || age <= 0 || retAge <= age || r < 0) {
            setResult({ error: "Please enter valid ages, savings details, and a positive interest rate." });
            return;
        }

        const t = retAge - age;
        const n = 12; // Compounded monthly
        const nt = n * t;
        const ratePerPeriod = r / n;

        const futureValueOfP = P * Math.pow(1 + ratePerPeriod, nt);
        const futureValueOfPMT = PMT * ((Math.pow(1 + ratePerPeriod, nt) - 1) / ratePerPeriod);
        const totalSavings = futureValueOfP + futureValueOfPMT;

        const newResult = {
            totalSavings: totalSavings.toFixed(2),
        };
        setResult(newResult);
        saveCalculation({
            type: 'Retirement Savings',
            inputs: { currentAge, retirementAge, currentSavings, monthlyContribution, interestRate, currency },
            result: { Savings: `${getCurrencySymbol()}${newResult.totalSavings}` }
        });
    };

    const faqItems = [
        { question: "How much do I need to save for retirement?", answer: "A common rule of thumb is to have about 10 times your final salary saved for retirement. However, the amount you need depends on your desired lifestyle, life expectancy, and other sources of income. This calculator helps you see if you're on track." },
        { question: "What is a realistic interest rate for retirement savings?", answer: "A realistic long-term annual interest rate for a diversified investment portfolio (like one in a 401(k) or IRA) is often estimated at 6-8%, though past performance is not a guarantee of future results." },
        { question: "Does this calculator account for inflation?", answer: "This calculator does not account for inflation. To get a clearer picture, you can use a 'real rate of return' as your interest rate. To do this, subtract the expected inflation rate (e.g., 2-3%) from your investment's expected interest rate." }
    ];
    
    const webAppSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Retirement Savings Calculator",
      "description": "Plan for your future with our free Retirement Savings Calculator. Estimate how much your savings will be worth when you retire.",
      "applicationCategory": "FinancialApplication",
      "operatingSystem": "Any",
      "url": "https://calczoon.com/financial/retirement-calculator",
      "browserRequirements": "Requires a modern web browser."
    };

    return (
        <>
            <Seo
                title="Retirement Savings Calculator"
                description="Plan for your future with our free Retirement Savings Calculator. Estimate how much your savings will be worth when you retire."
                canonicalUrl="/financial/retirement-calculator"
                schema={[webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems }]}
            />
            <div className="max-w-2xl mx-auto py-8">
                <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="text-center">
                        <h1 className="text-3xl font-bold text-primary">Retirement Savings Calculator</h1>
                        <CardDescription className="text-slate-300">Are you on track for retirement? This calculator helps you estimate the future value of your retirement savings based on your current age, savings, contributions, and expected rate of return.</CardDescription>
                <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-xl">
                  <p className="text-sm text-emerald-400/90 leading-relaxed">
                    Yeh tool aapko calculations ko multiple currencies mein dekhne ki sahulat deta hai. Sirf apni currency select karein aur result US Dollar ($), British Pound (£) ya Euro (€) mein hasil karein. Is se UK, Europe aur international users ke liye calculations ko samajhna aur plan karna zyada asaan ho jata hai.
                  </p>
                </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={calculateRetirement} className="space-y-6">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentAge">Current Age</Label>
                                    <Input id="currentAge" type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} placeholder="e.g., 30" required className="bg-slate-900 border-slate-700" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="retirementAge">Retirement Age</Label>
                                    <Input id="retirementAge" type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} placeholder="e.g., 65" required className="bg-slate-900 border-slate-700" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentSavings">Current Savings ({getCurrencySymbol()})</Label>
                                    <Input id="currentSavings" type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} placeholder="e.g., 50000" className="bg-slate-900 border-slate-700" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="monthlyContribution">Monthly Contribution ({getCurrencySymbol()})</Label>
                                    <Input id="monthlyContribution" type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} placeholder="e.g., 500" className="bg-slate-900 border-slate-700" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="interestRate">Estimated Annual Interest Rate (%)</Label>
                                <Input id="interestRate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 7" required className="bg-slate-900 border-slate-700" step="0.01" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="currency">Currency</Label>
                                <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white">
                        <option value="USD">USD ($)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                            </div>
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate</Button>
                        </form>
                    </CardContent>
                    {result && !result.error && (
                        <CardFooter className="flex flex-col items-start mt-6 p-6 bg-slate-800 rounded-b-lg">
                            <div className="w-full space-y-4">
                                <h2 className="text-xl font-bold text-slate-100">Retirement Projection</h2>
                                <div className="text-center mb-4">
                                    <p className="text-slate-300">Estimated Savings at Age {retirementAge}</p>
                                    <p className="text-4xl font-bold text-primary">{getCurrencySymbol()}{result.totalSavings}</p>
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

                {result && !result.error && <ShareResults title="My Retirement Goal" text={`I projected my retirement savings to be ${getCurrencySymbol()}${result.totalSavings} by age ${retirementAge}! Calculated on CalcZoon.`} url="https://calczoon.com/financial/retirement-calculator" />}

                <Card className="bg-slate-800/50 border-slate-700 mt-8">
                  <CardHeader><h2 className="text-2xl font-bold text-primary">Understanding Your Retirement Goal</h2></CardHeader>
                  <CardContent className="space-y-4 text-slate-300">
                      <p>Saving for retirement is a long-term journey. This calculator uses the power of compound interest to project your potential savings, helping you visualize your financial future.</p>
                      <h3 className="text-xl font-semibold text-white">Example Scenario</h3>
                      <p>If a 30-year-old with $50,000 in savings contributes $500 per month until age 65, with an average annual return of 7%, they could have over $1.4 million saved for retirement.</p>
                      <div className="mt-6">
                          <h3 className="text-xl font-semibold text-white mb-2">Related Financial Calculators</h3>
                          <ul className="list-disc list-inside space-y-2">
                              <li><Link to="/financial/compound-interest-calculator" className="text-primary hover:underline flex items-center gap-2"><LinkIcon size={16}/>Compound Interest Calculator</Link></li>
                              <li><Link to="/financial/investment-roi-calculator" className="text-primary hover:underline flex items-center gap-2"><LinkIcon size={16}/>Investment ROI Calculator</Link></li>
                          </ul>
                      </div>
                  </CardContent>
                </Card>

                <Faq items={faqItems.map(item => ({ question: item.question, answer: item.answer }))} className="mt-8" />
                <Disclaimer text="This is a hypothetical projection and not investment advice. Actual results will vary. Consult a financial advisor for personalized retirement planning." />
            </div>
        </>
    );
};

export default RetirementCalculator;
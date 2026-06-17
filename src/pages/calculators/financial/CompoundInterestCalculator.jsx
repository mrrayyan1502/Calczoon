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
import AffiliateLinks from '@/components/AffiliateLinks';
import { Link as LinkIcon } from 'lucide-react';
import Seo from '@/components/Seo';

const CompoundInterestCalculator = () => {
    const [initialAmount, setInitialAmount] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [years, setYears] = useState('');
    const [compoundFrequency, setCompoundFrequency] = useState(12);
    const [currency, setCurrency] = useState('USD');
    const [result, setResult] = useState(null);

    const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

    const calculateCompoundInterest = (e) => {
        e.preventDefault();
        const P = parseFloat(initialAmount) || 0;
        const PMT = parseFloat(monthlyContribution) || 0;
        const r = parseFloat(interestRate) / 100;
        const t = parseFloat(years);
        const n = parseInt(compoundFrequency);

        if (isNaN(r) || isNaN(t) || t <= 0 || r < 0) {
            setResult({ error: "Please enter a valid, positive interest rate and time period." });
            return;
        }

        const nt = n * t;
        const ratePerPeriod = r / n;

        const futureValueOfP = P * Math.pow(1 + ratePerPeriod, nt);
        const futureValueOfPMT = PMT * ((Math.pow(1 + ratePerPeriod, nt) - 1) / ratePerPeriod);
        const totalAmount = futureValueOfP + futureValueOfPMT;

        const totalPrincipal = P + (PMT * 12 * t);
        const totalInterest = totalAmount - totalPrincipal;

        const newResult = {
            totalAmount: totalAmount.toFixed(2),
            totalPrincipal: totalPrincipal.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
        };
        setResult(newResult);
        saveCalculation({
            type: 'Compound Interest',
            inputs: { initialAmount, monthlyContribution, interestRate, years, compoundFrequency, currency },
            result: { Total: `${getCurrencySymbol()}${newResult.totalAmount}`, Interest: `${getCurrencySymbol()}${newResult.totalInterest}` }
        });
    };

    const faqItems = [
        {
            question: "What is compound interest?",
            answer: "Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. It's essentially 'interest on interest,' and it will make a sum grow at a faster rate than simple interest."
        },
        {
            question: "How does the compound frequency affect my savings?",
            answer: "The more frequently interest is compounded, the more you earn. For example, compounding monthly adds interest to your principal 12 times a year, while annual compounding does it only once. This means you start earning interest on your interest sooner and more often, accelerating your savings growth."
        },
        {
            question: "Can I use this for my retirement savings plan?",
            answer: "Absolutely. This calculator is a great tool for retirement planning. Enter your current savings, planned monthly contributions, an estimated annual rate of return, and the number of years until retirement to see a projection of your nest egg's growth."
        }
    ];
    
    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Compound Interest Calculator",
        "description": "A powerful free tool to forecast investment growth with compound interest. Perfect for retirement planning, savings goals, and seeing how your money can grow over time. Easy to use with flexible contribution options.",
        "applicationCategory": "FinancialApplication",
        "operatingSystem": "Any",
        "url": "https://calczoon.com/financial/compound-interest-calculator",
        "browserRequirements": "Requires a modern web browser."
    };

    const faqSchema = {
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
                title="Compound Interest Calculator"
                description="A powerful free tool to forecast investment growth with compound interest. Perfect for retirement planning, savings goals, and seeing how your money can grow over time. Easy to use with flexible contribution options."
                canonicalUrl="/financial/compound-interest-calculator"
                schema={[webAppSchema, faqSchema]}
            />
            <div className="max-w-2xl mx-auto py-8">
                <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="text-center">
                        <h1 className="text-3xl font-bold text-primary">Compound Interest Calculator</h1>
                        <CardDescription className="text-slate-300">See how your money can grow over time with the power of compound interest. Perfect for retirement planning, savings goals, or investment projections.</CardDescription>
                <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-xl">
                  <p className="text-sm text-emerald-400/90 leading-relaxed">
                    Yeh tool aapko calculations ko multiple currencies mein dekhne ki sahulat deta hai. Sirf apni currency select karein aur result US Dollar ($), British Pound (£) ya Euro (€) mein hasil karein. Is se UK, Europe aur international users ke liye calculations ko samajhna aur plan karna zyada asaan ho jata hai.
                  </p>
                </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={calculateCompoundInterest} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="initialAmount">Initial Amount ({getCurrencySymbol()})</Label>
                                    <Input id="initialAmount" type="number" value={initialAmount} onChange={(e) => setInitialAmount(e.target.value)} placeholder="e.g., 1000" className="bg-slate-900 border-slate-700" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="monthlyContribution">Monthly Contribution ({getCurrencySymbol()})</Label>
                                    <Input id="monthlyContribution" type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} placeholder="e.g., 100" className="bg-slate-900 border-slate-700" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                                    <Input id="interestRate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 7" required className="bg-slate-900 border-slate-700" step="0.01" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="years">Years to Grow</Label>
                                    <Input id="years" type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g., 10" required className="bg-slate-900 border-slate-700" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="compoundFrequency">Compound Frequency</Label>
                                <select id="compoundFrequency" value={compoundFrequency} onChange={(e) => setCompoundFrequency(parseInt(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white">
                                    <option value="1">Annually</option>
                                    <option value="2">Semi-Annually</option>
                                    <option value="4">Quarterly</option>
                                    <option value="12">Monthly</option>
                                    <option value="365">Daily</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="currency">Currency</Label>
                                <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white">
                                    <option value="USD">USD ($)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                            </div>
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate</Button>
                        </form>
                    </CardContent>
                    {result && !result.error && (
                        <CardFooter className="flex flex-col items-start mt-6 p-6 bg-slate-800 rounded-b-lg">
                            <div className="w-full space-y-4">
                                <h2 className="text-xl font-bold text-slate-100">Projected Growth</h2>
                                <div className="text-center mb-4">
                                    <p className="text-slate-300">Future Value</p>
                                    <p className="text-4xl font-bold text-primary">{getCurrencySymbol()}{result.totalAmount}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between"><span className="text-slate-300">Total Principal Contributed:</span><span className="font-bold text-slate-100">{getCurrencySymbol()}{result.totalPrincipal}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-300">Total Interest Earned:</span><span className="font-bold text-green-400">{getCurrencySymbol()}{result.totalInterest}</span></div>
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

                {result && !result.error && <ShareResults title="My Investment Growth" text={`I projected my investment to grow to ${getCurrencySymbol()}${result.totalAmount} using Calczoon!`} url="https://calczoon.com/financial/compound-interest-calculator" />}

                <Card className="bg-slate-800/50 border-slate-700 mt-8">
                  <CardHeader><h2 className="text-2xl font-bold text-primary">Understanding Compound Interest</h2></CardHeader>
                  <CardContent className="space-y-4 text-slate-300">
                      <p>Compound interest is the interest you earn on both your initial investment and the accumulated interest from previous periods. Albert Einstein famously called it the "eighth wonder of the world," and for good reason. It allows your wealth to grow at an accelerating rate.</p>
                      
                      <h3 className="text-xl font-semibold text-white mt-4">How it Works</h3>
                      <p>When you invest money, it earns interest. With simple interest, you only earn interest on the initial amount (the principal). With compound interest, the interest you earn is added back to the principal, and you then earn interest on this new, larger amount. This process repeats, creating a snowball effect.</p>
                      
                      <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                          <h3 className="font-semibold text-white">The Formula</h3>
                          <p className="font-mono text-sm text-primary">A = P(1 + r/n)^(nt) + PMT * [(((1 + r/n)^(nt)) - 1) / (r/n)]</p>
                          <p className="text-xs mt-2 text-slate-300">Where P is the principal, PMT is the monthly payment, r is the annual rate, n is the number of compounding periods per year, and t is the number of years.</p>
                      </div>

                      <h3 className="text-xl font-semibold text-white mt-4">Practical Example:</h3>
                      <p>Imagine you invest $1,000 at a 5% annual interest rate. After one year, you'd have $1,050. The next year, you'd earn 5% on $1,050, not just the original $1,000. This small difference becomes massive over decades. This calculator helps you visualize this powerful effect for your savings and investments.</p>
                      
                       <div className="mt-6">
                          <h3 className="text-xl font-semibold text-white mb-2">Related Financial Calculators</h3>
                          <ul className="list-disc list-inside space-y-2">
                              <li><Link to="/financial/investment-roi-calculator" className="text-primary hover:underline flex items-center gap-2"><LinkIcon size={16}/>Investment ROI Calculator</Link></li>
                              <li><Link to="/financial/retirement-calculator" className="text-primary hover:underline flex items-center gap-2"><LinkIcon size={16}/>Retirement Calculator</Link></li>
                          </ul>
                      </div>
                  </CardContent>
                </Card>

                <Faq items={faqItems} className="mt-8" />
                <Disclaimer text="This calculator is for illustrative purposes only. Actual returns may vary based on investment performance and other factors. This is not financial advice." />
            </div>
        </>
    );
};

        <AffiliateLinks category="compound" title="Recommended Investment Tools" />

export default CompoundInterestCalculator;
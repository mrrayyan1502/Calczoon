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

const SalaryCalculator = () => {
    const [salary, setSalary] = useState('');
    const [payFrequency, setPayFrequency] = useState('annually');
    const [currency, setCurrency] = useState('USD');
    const [result, setResult] = useState(null);

    const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

    const calculateSalary = (e) => {
        e.preventDefault();
        const amount = parseFloat(salary);

        if (isNaN(amount) || amount <= 0) {
            setResult({ error: "Please enter a valid positive salary amount." });
            return;
        }

        let annualSalary;
        switch (payFrequency) {
            case 'hourly': annualSalary = amount * 40 * 52; break; // Assumes 40-hour week
            case 'daily': annualSalary = amount * 5 * 52; break; // Assumes 5-day week
            case 'weekly': annualSalary = amount * 52; break;
            case 'monthly': annualSalary = amount * 12; break;
            default: annualSalary = amount;
        }

        const newResult = {
            annual: annualSalary.toFixed(2),
            monthly: (annualSalary / 12).toFixed(2),
            weekly: (annualSalary / 52).toFixed(2),
            daily: (annualSalary / 260).toFixed(2), // 5*52 working days
            hourly: (annualSalary / 2080).toFixed(2), // 40*52 working hours
        };
        setResult(newResult);
        saveCalculation({
            type: 'Salary',
            inputs: { salary, payFrequency, currency },
            result: { Annual: `${getCurrencySymbol()}${newResult.annual}` }
        });
    };

    const faqItems = [
        { question: "How does this salary calculator work?", answer: "This calculator converts your salary across different pay periods. For example, if you provide your annual salary, it will break it down into monthly, weekly, daily, and hourly equivalents based on standard working hours and weeks." },
        { question: "Does this calculator include taxes?", answer: "No, this is a gross salary calculator. It does not account for income tax, social security, or other deductions. Your take-home pay will be lower than the amounts shown here. For tax estimations, please use our VAT/Tax calculator." },
        { question: "What assumptions are made for daily and hourly rates?", answer: "The calculations assume a standard 40-hour work week and a 5-day work week across 52 weeks in a year (2,080 hours or 260 days annually). Your actual rates may vary if you work more or fewer hours." }
    ];
    
    const webAppSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Salary Calculator",
      "description": "Convert your salary between annual, monthly, weekly, daily, and hourly rates. Understand your earnings better.",
      "applicationCategory": "FinancialApplication",
      "operatingSystem": "Any",
      "url": "https://calczoon.com/financial/salary-calculator",
      "browserRequirements": "Requires a modern web browser."
    };

    return (
        <>
            <Seo
                title="Salary Calculator | Convert Annual, Monthly, Hourly Pay"
                description="Use our free Salary Calculator to convert your pay between annual, monthly, weekly, daily, and hourly rates. Understand your earnings better."
                canonicalUrl="/financial/salary-calculator"
                schema={[webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems }]}
            />
            <div className="max-w-2xl mx-auto py-8">
                <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="text-center">
                        <h1 className="text-3xl font-bold text-primary">Salary Calculator</h1>
                        <CardDescription className="text-slate-300">Convert your salary between different pay periods. Whether you're comparing job offers or just curious about your earnings, this tool breaks down your income into annual, monthly, weekly, daily, and hourly rates.</CardDescription>
                <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-xl">
                  <p className="text-sm text-emerald-400/90 leading-relaxed">
                    Yeh tool aapko calculations ko multiple currencies mein dekhne ki sahulat deta hai. Sirf apni currency select karein aur result US Dollar ($), British Pound (£) ya Euro (€) mein hasil karein. Is se UK, Europe aur international users ke liye calculations ko samajhna aur plan karna zyada asaan ho jata hai.
                  </p>
                </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={calculateSalary} className="space-y-6">
                             <div className="space-y-2">
                                <Label htmlFor="salary">Salary Amount</Label>
                                <Input id="salary" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="e.g., 50000" required className="bg-slate-900 border-slate-700" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <div className="space-y-2">
                                    <Label htmlFor="payFrequency">Pay Frequency</Label>
                                    <select id="payFrequency" value={payFrequency} onChange={(e) => setPayFrequency(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white">
                                        <option value="annually">Annually</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="daily">Daily</option>
                                        <option value="hourly">Hourly</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Currency</Label>
                                    <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white">
                                        <option value="USD">USD ($)</option>
                                        <option value="GBP">GBP (£)</option>
                                    </select>
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate</Button>
                        </form>
                    </CardContent>
                    {result && !result.error && (
                        <CardFooter className="flex flex-col items-start mt-6 p-6 bg-slate-800 rounded-b-lg">
                            <div className="w-full space-y-2">
                                <h2 className="text-xl font-bold text-slate-100">Salary Breakdown</h2>
                                <div className="flex justify-between"><span className="text-slate-300">Annual:</span><span className="font-bold text-slate-100">{getCurrencySymbol()}{result.annual}</span></div>
                                <div className="flex justify-between"><span className="text-slate-300">Monthly:</span><span className="font-bold text-slate-100">{getCurrencySymbol()}{result.monthly}</span></div>
                                <div className="flex justify-between"><span className="text-slate-300">Weekly:</span><span className="font-bold text-slate-100">{getCurrencySymbol()}{result.weekly}</span></div>
                                <div className="flex justify-between"><span className="text-slate-300">Daily:</span><span className="font-bold text-slate-100">{getCurrencySymbol()}{result.daily}</span></div>
                                <div className="flex justify-between"><span className="text-slate-300">Hourly:</span><span className="font-bold text-slate-100">{getCurrencySymbol()}{result.hourly}</span></div>
                            </div>
                        </CardFooter>
                    )}
                    {result && result.error && (
                        <CardFooter className="mt-6 p-6 bg-slate-800 rounded-b-lg">
                            <p className="text-destructive text-center w-full">{result.error}</p>
                        </CardFooter>
                    )}
                </Card>

                {result && !result.error && <ShareResults title="My Salary Breakdown" text={`I broke down my salary on CalcZoon! My annual earnings are equivalent to ${getCurrencySymbol()}${result.annual}.`} url="https://calczoon.com/financial/salary-calculator" />}

                <Card className="bg-slate-800/50 border-slate-700 mt-8">
                  <CardHeader><h2 className="text-2xl font-bold text-primary">Understanding Your Pay</h2></CardHeader>
                  <CardContent className="space-y-4 text-slate-300">
                      <p>Knowing how your salary translates across different timeframes can be incredibly useful for budgeting, comparing job offers, or evaluating your financial situation. This calculator provides a clear breakdown of your gross earnings, helping you understand the value of your time and plan your finances more effectively.</p>
                      <h3 className="text-xl font-semibold text-white">Example Calculation</h3>
                      <p>If your annual salary is $50,000, this calculator will show you that it's equivalent to approximately $4,166.67 per month, $961.54 per week, or $24.04 per hour (based on a 40-hour work week). This can help you compare hourly roles to salaried positions or understand your budget on a more granular level.</p>
                  </CardContent>
                </Card>

                <Faq items={faqItems} className="mt-8" />
                <Disclaimer text="All calculations are based on standard work weeks (40 hours/week, 52 weeks/year) and do not account for taxes, overtime, or other potential deductions or additions to your pay." />
            </div>
        </>
    );
};

export default SalaryCalculator;
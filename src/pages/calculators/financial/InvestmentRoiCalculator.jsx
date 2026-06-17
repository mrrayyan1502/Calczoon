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

const InvestmentRoiCalculator = () => {
    const [initialInvestment, setInitialInvestment] = useState('');
    const [finalValue, setFinalValue] = useState('');
    const [investmentLength, setInvestmentLength] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [result, setResult] = useState(null);

    const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

    const calculateROI = (e) => {
        e.preventDefault();
        const initial = parseFloat(initialInvestment);
        const final = parseFloat(finalValue);
        const years = parseFloat(investmentLength) || 1;

        if (isNaN(initial) || isNaN(final) || initial <= 0 || years <= 0) {
            setResult({ error: "Please enter valid positive numbers for all fields." });
            return;
        }

        const netProfit = final - initial;
        const roi = (netProfit / initial) * 100;
        const annualizedRoi = (Math.pow((final / initial), (1 / years)) - 1) * 100;
        
        const newResult = {
            roi: roi.toFixed(2),
            annualizedRoi: annualizedRoi.toFixed(2),
            netProfit: netProfit.toFixed(2),
        };
        setResult(newResult);
        saveCalculation({
            type: 'Investment ROI',
            inputs: { initialInvestment, finalValue, investmentLength, currency },
            result: { ROI: `${newResult.roi}%`, Annualized: `${newResult.annualizedRoi}%`, Profit: `${getCurrencySymbol()}${newResult.netProfit}` }
        });
    };

    const faqItems = [
        { question: "What is a good ROI for an investment?", answer: "A 'good' ROI is relative and depends on the type of investment, its risk level, and the time horizon. Historically, the S&P 500 has an average annual return of about 10%, which many investors use as a benchmark. Anything above this is often considered good." },
        { question: "What is the difference between ROI and Annualized ROI?", answer: "ROI (Return on Investment) shows the total gain or loss of an investment over its entire period. Annualized ROI shows the rate of return per year, making it easier to compare investments with different timeframes." },
        { question: "How does this calculator handle additional contributions?", answer: "This is a simple ROI calculator for a single lump-sum investment. It does not account for additional contributions over time. For that, our 'Compound Interest Calculator' is more suitable." }
    ];
    
    const webAppSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Investment ROI Calculator",
      "description": "Calculate your simple and annualized Return on Investment (ROI) with our free and easy-to-use tool. Measure the profitability of your stocks, real estate, or other investments quickly and see your net profit.",
      "applicationCategory": "FinancialApplication",
      "operatingSystem": "Any",
      "url": "https://calczoon.com/financial/investment-roi-calculator",
      "browserRequirements": "Requires a modern web browser."
    };

    return (
        <>
            <Seo
                title="Investment ROI Calculator | CalcZoon.com"
                description="Calculate your simple and annualized Return on Investment (ROI) with our free and easy-to-use tool. Measure the profitability of your stocks, real estate, or other investments quickly and see your net profit."
                canonicalUrl="/financial/investment-roi-calculator"
                schema={[webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }]}
            />
            <div className="max-w-2xl mx-auto py-8">
                <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold text-primary">Investment ROI Calculator</CardTitle>
                        <CardDescription className="text-slate-300">Measure the efficiency and profitability of your investment. This Return on Investment (ROI) calculator helps you evaluate the performance of a stock, real estate, or any other investment by showing both simple and annualized returns.</CardDescription>
                <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-xl">
                  <p className="text-sm text-emerald-400/90 leading-relaxed">
                    Yeh tool aapko calculations ko multiple currencies mein dekhne ki sahulat deta hai. Sirf apni currency select karein aur result US Dollar ($), British Pound (£) ya Euro (€) mein hasil karein. Is se UK, Europe aur international users ke liye calculations ko samajhna aur plan karna zyada asaan ho jata hai.
                  </p>
                </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={calculateROI} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="initialInvestment">Initial Investment ({getCurrencySymbol()})</Label>
                                    <Input id="initialInvestment" type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} placeholder="e.g., 5000" required className="bg-slate-900 border-slate-700" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="finalValue">Final Value ({getCurrencySymbol()})</Label>
                                    <Input id="finalValue" type="number" value={finalValue} onChange={(e) => setFinalValue(e.target.value)} placeholder="e.g., 7500" required className="bg-slate-900 border-slate-700" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <div className="space-y-2">
                                    <Label htmlFor="investmentLength">Investment Length (Years)</Label>
                                    <Input id="investmentLength" type="number" value={investmentLength} onChange={(e) => setInvestmentLength(e.target.value)} placeholder="e.g., 5" required className="bg-slate-900 border-slate-700" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Currency</Label>
                                    <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white h-10">
                        <option value="USD">USD ($)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate ROI</Button>
                        </form>
                    </CardContent>
                    {result && !result.error && (
                        <CardFooter className="flex flex-col items-center mt-6 p-6 bg-slate-800 rounded-b-lg">
                            <div className="w-full space-y-4">
                                <h2 className="text-xl font-bold text-slate-100">Investment Performance</h2>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                                    <div className="p-4 bg-slate-700 rounded-lg">
                                        <p className="text-slate-300">Total ROI</p>
                                        <p className={`text-3xl font-bold ${result.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>{result.roi}%</p>
                                    </div>
                                    <div className="p-4 bg-slate-700 rounded-lg">
                                        <p className="text-slate-300">Annualized ROI</p>
                                        <p className={`text-3xl font-bold ${result.annualizedRoi >= 0 ? 'text-green-400' : 'text-red-400'}`}>{result.annualizedRoi}%</p>
                                    </div>
                                </div>
                                 <div className="flex justify-between pt-4 w-full"><span className="text-slate-300">Net Profit:</span><span className="font-bold text-slate-100">{getCurrencySymbol()}{result.netProfit}</span></div>
                            </div>
                        </CardFooter>
                    )}
                    {result && result.error && (
                        <CardFooter className="mt-6 p-6 bg-slate-800 rounded-b-lg">
                            <p className="text-destructive text-center w-full">{result.error}</p>
                        </CardFooter>
                    )}
                </Card>

                {result && !result.error && <ShareResults title="My Investment ROI" text={`My investment achieved a ${result.roi}% ROI! Check your own investments on Calczoon.`} url="https://calczoon.com/financial/investment-roi-calculator" />}

                <Card className="bg-slate-800/50 border-slate-700 mt-8">
                  <CardHeader><h2 className="text-2xl font-bold text-primary">Understanding ROI</h2></CardHeader>
                  <CardContent className="space-y-4 text-slate-300">
                      <p>Return on Investment (ROI) is a performance measure used to evaluate the efficiency and profitability of an investment. It is a simple ratio that compares the net profit of an investment to its initial cost. A higher ROI means the investment’s gains compare favorably to its cost.</p>
                      
                      <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                          <h3 className="font-semibold text-white">The Formula</h3>
                          <p className="font-mono text-lg text-primary">ROI = [(Final Value - Initial Investment) / Initial Investment] * 100</p>
                          <p>To compare investments over different timeframes, the <strong>Annualized ROI</strong> is more useful. It provides a geometric average amount of money earned by an investment each year over a defined period.</p>
                      </div>

                      <h3 className="text-xl font-semibold text-white mt-4">Example Calculation</h3>
                      <p>If you invest $5,000 and sell it for $7,500 after 3 years, your total ROI is 50%. However, your annualized ROI is approximately 14.47%, which gives you a clearer picture of its yearly performance.</p>
                      
                       <div className="mt-6">
                          <h3 className="text-xl font-semibold text-white mb-2">Related Financial Calculators</h3>
                          <ul className="list-disc list-inside space-y-2">
                              <li><Link to="/financial/compound-interest-calculator" className="text-primary hover:underline flex items-center gap-2"><LinkIcon size={16}/>Compound Interest Calculator</Link></li>
                              <li><Link to="/financial/retirement-calculator" className="text-primary hover:underline flex items-center gap-2"><LinkIcon size={16}/>Retirement Calculator</Link></li>
                          </ul>
                      </div>
                  </CardContent>
                </Card>

                <Faq items={faqItems.map(item => ({ question: item.question, answer: item.answer }))} className="mt-8" />
                <Disclaimer text="This calculator does not account for taxes, fees, or inflation, which can impact your net return. Always consider these factors in your investment analysis." />
            </div>
        </>
    );
};

export default InvestmentRoiCalculator;
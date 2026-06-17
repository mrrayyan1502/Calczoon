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
import { TrendingUp, TrendingDown, HelpCircle, Link as LinkIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


const CryptoProfitCalculator = () => {
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [invested, setInvested] = useState('');
  const [fees, setFees] = useState('');
  const [result, setResult] = useState(null);
  const [currency, setCurrency] = useState('$');

  const calculateProfit = (e) => {
    e.preventDefault();
    const p = parseFloat(buyPrice);
    const s = parseFloat(sellPrice);
    const i = parseFloat(invested);
    const f = parseFloat(fees) || 0;

    if (isNaN(p) || isNaN(s) || isNaN(i) || p <= 0 || s <= 0 || i <= 0) {
      setResult({ error: "Please enter valid, positive numbers for all fields." });
      return;
    }
    
    const quantity = i / p;
    const finalValue = quantity * s;
    const netProfit = finalValue - i - f;
    const roi = (netProfit / i) * 100;

    const newResult = {
      netProfit: netProfit.toFixed(2),
      roi: roi.toFixed(2),
      totalCost: (i + f).toFixed(2),
      finalValue: finalValue.toFixed(2),
      isProfit: netProfit >= 0,
    };
    setResult(newResult);
    saveCalculation({
      type: 'Crypto Profit',
      inputs: { invested: i, buyPrice: p, sellPrice: s, fees: f },
      result: { Profit: `${currency}${newResult.netProfit}`, ROI: `${newResult.roi}%` }
    });
  };
  
    const faqItems = [
    {
      question: "How is crypto profit calculated?",
      answer: "The basic formula is: `(Total Sale Value - Total Investment) - Fees`. Return on Investment (ROI) is then calculated as `(Net Profit / Total Investment) * 100`. Our calculator simplifies this by taking your initial investment and prices to determine the outcome."
    },
    {
      question: "What should I include in 'Fees'?",
      answer: "Include all costs associated with buying and selling your crypto assets. This can include exchange trading fees, network (gas) fees for transfers, and any other transaction costs. Accurate fee accounting is crucial for a true profit calculation."
    },
    {
      question: "Is crypto profit taxable?",
      answer: "In most countries, including the US, profits from cryptocurrency are considered capital gains and are subject to taxes. The tax rate depends on how long you held the asset (short-term vs. long-term gains). This calculator does not include tax estimations. Please consult a tax professional for advice specific to your situation."
    },
    {
        question: "Where can I find my 'Buy Price'?",
        answer: "Your average buy price is the weighted average cost of all your purchases for a specific cryptocurrency. If you bought at different times and prices, you can calculate it by dividing the total amount you spent by the total amount of the coin you own. Many exchanges provide this information in your transaction history."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Cryptocurrency Profit Calculator",
    "description": "Calculate your cryptocurrency profit or loss and Return on Investment (ROI) with this easy-to-use tool. Works for Bitcoin, Ethereum, and any other crypto asset.",
    "applicationCategory": "FinancialApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/financial/crypto-profit-calculator",
    "browserRequirements": "Requires a modern web browser."
  };

  return (
    <>
      <Seo
        title="Cryptocurrency Profit Calculator"
        description="Calculate your cryptocurrency profit or loss and Return on Investment (ROI) with this easy-to-use tool. Works for Bitcoin, Ethereum, and any other crypto asset."
        canonicalUrl="/financial/crypto-profit-calculator"
        schema={[webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }]}
      />
      <div className="max-w-4xl mx-auto py-8">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <h1 className="text-3xl font-bold text-primary">Cryptocurrency Profit Calculator</h1>
            <CardDescription className="text-slate-300">
              Easily calculate the profit or loss from your crypto trades, including your Return on Investment (ROI). This tool helps you understand the performance of your crypto assets like Bitcoin, Ethereum, and more.
            </CardDescription>
                <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-xl">
                  <p className="text-sm text-emerald-400/90 leading-relaxed">
                    This tool supports multiple currencies for international users. Simply select your preferred currency, and all financial results will automatically format into US Dollars ($), British Pounds (£), or Euros (€) for easier planning.</p>
                </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={calculateProfit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invested">Total Amount Invested ({currency})</Label>
                    <Input id="invested" type="number" value={invested} onChange={(e) => setInvested(e.target.value)} placeholder="e.g., 1000" required className="bg-slate-900 border-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buyPrice">Average Buy Price per Coin ({currency})</Label>
                    <Input id="buyPrice" type="number" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} placeholder="e.g., 50000" required className="bg-slate-900 border-slate-700" />
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sellPrice">Selling Price per Coin ({currency})</Label>
                    <Input id="sellPrice" type="number" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} placeholder="e.g., 60000" required className="bg-slate-900 border-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fees" className="flex items-center">
                        Total Fees ({currency})
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><HelpCircle className="w-4 h-4 ml-1.5 text-slate-300" /></TooltipTrigger>
                                <TooltipContent>
                                    <p>Include all exchange fees, network fees, etc.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Label>
                    <Input id="fees" type="number" value={fees} onChange={(e) => setFees(e.target.value)} placeholder="e.g., 15.50" className="bg-slate-900 border-slate-700" />
                  </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate Profit</Button>
            </form>
          </CardContent>
          {result && !result.error && (
            <CardFooter className="flex flex-col items-center mt-6 p-6 bg-slate-800 rounded-b-lg">
                <div className="w-full text-center space-y-4">
                  <h2 className="text-xl font-bold text-slate-100">Your Trade Result</h2>
                  <div className={`text-4xl font-bold ${result.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                    {result.isProfit ? '+' : ''}{currency}{result.netProfit}
                  </div>
                  <p className="text-slate-300">{result.isProfit ? 'Net Profit' : 'Net Loss'}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center pt-4">
                      <div className="p-4 bg-slate-700/50 rounded-lg">
                          <p className="text-slate-300 text-sm">Return on Investment (ROI)</p>
                          <p className={`text-2xl font-bold ${result.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                            {result.roi}%
                          </p>
                      </div>
                      <div className="p-4 bg-slate-700/50 rounded-lg">
                          <p className="text-slate-300 text-sm">Total Value</p>
                          <p className="text-2xl font-bold text-white">
                            {currency}{result.finalValue}
                          </p>
                      </div>
                  </div>
                  <ShareResults
                    title="My Crypto Trade Result"
                    text={`Check out my crypto trade! ROI: ${result.roi}%. Calculated via Calczoon.`}
                    url="https://calczoon.com/financial/crypto-profit-calculator"
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

        <Card className="bg-slate-800/50 border-slate-700 mt-8">
          <CardHeader><h2 className="text-2xl font-bold text-primary">Understanding Crypto Profit & ROI</h2></CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <p>Tracking the profitability of your cryptocurrency investments is key to a successful strategy. This calculator helps you quickly see the outcome of your trades.</p>
            <h3 className="text-xl font-semibold text-white">How It Works:</h3>
            <p>We calculate the total value of your holdings at the selling price and subtract your total initial investment cost. The result is your net profit or loss. The Return on Investment (ROI) is this net profit divided by your initial cost, shown as a percentage.</p>
            <h3 className="text-xl font-semibold text-white">Example Calculation:</h3>
            <p>You invest $1,000 to buy 0.02 Bitcoin (BTC) at a price of $50,000 per BTC. You later sell all 0.02 BTC when the price hits $60,000. Your total sale value is $1,200. Your profit is $1,200 (sale) - $1,000 (investment) = $200. Your ROI is ($200 / $1,000) * 100 = 20%.</p>
            <p>For more advanced investment tracking, consider our <Link to="/financial/investment-roi-calculator" className="text-primary hover:underline">general ROI calculator</Link>.</p>
          </CardContent>
        </Card>

        <Faq items={faqItems} className="mt-8"/>
        <Disclaimer text="Cryptocurrency markets are extremely volatile. This calculator provides estimates and does not account for all potential fees or market conditions. Not financial advice." />
      </div>
    </>
  );
};

export default CryptoProfitCalculator;
import React, { useState, useEffect } from 'react';
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
import { Globe, ArrowRightLeft } from 'lucide-react';

const COMMON_CURRENCIES = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  HKD: "Hong Kong Dollar",
  NZD: "New Zealand Dollar",
  INR: "Indian Rupee",
  SGD: "Singapore Dollar",
  ZAR: "South African Rand",
  AED: "UAE Dirham",
  SAR: "Saudi Riyal"
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchConversion = async (e) => {
    if(e) e.preventDefault();
    
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      setError("Please enter a valid positive amount.");
      setResult(null);
      return;
    }

    if (fromCurrency === toCurrency) {
      setResult({ amount: val.toFixed(2), rate: 1 });
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://api.frankfurter.app/latest?amount=${val}&from=${fromCurrency}&to=${toCurrency}`);
      if (!response.ok) throw new Error("API response was not ok");
      const data = await response.json();
      
      const convertedValue = data.rates[toCurrency];
      setResult({
        amount: convertedValue.toFixed(2),
        rate: (convertedValue / val).toFixed(4)
      });
      
      saveCalculation({
        type: 'Currency',
        inputs: { amount: val, from: fromCurrency, to: toCurrency },
        result: { Converted: `${convertedValue.toFixed(2)} ${toCurrency}` }
      });
    } catch (err) {
      console.error("Currency API Error:", err);
      setError("Unable to fetch live exchange rates right now. Please try again later.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    if (result && !error) {
      // Optional: automatically re-fetch, but user can click convert
      setResult(null);
    }
  };

  const faqItems = [
    {
      question: "Are these exchange rates live?",
      answer: "The exchange rates are updated daily based on data published by the European Central Bank. They are extremely accurate for general use but may not reflect real-time second-by-second market fluctuations."
    },
    {
      question: "Is there any hidden fee in these calculations?",
      answer: "No, this converter shows the pure mid-market exchange rate. Actual banks or money transfer services will usually add a markup or fee on top of this rate."
    }
  ];

  const pageTitle = "Currency Converter: Live Exchange Rates";
  const pageDescription = "Convert between USD, EUR, GBP, and major global currencies using live mid-market exchange rates.";

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} canonicalUrl="/financial/currency-converter" />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={Globe} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white">Convert Currency</CardTitle>
                <CardDescription>Get up-to-date exchange rates</CardDescription>
                <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-xl">
                  <p className="text-sm text-emerald-400/90 leading-relaxed">
                    Yeh tool aapko calculations ko multiple currencies mein dekhne ki sahulat deta hai. Sirf apni currency select karein aur result US Dollar ($), British Pound (£) ya Euro (€) mein hasil karein. Is se UK, Europe aur international users ke liye calculations ko samajhna aur plan karna zyada asaan ho jata hai.
                  </p>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={fetchConversion} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-slate-300 font-medium">Amount</Label>
                    <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 100" required step="0.01" className="bg-slate-900 border-slate-700 text-2xl font-bold focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl py-6" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-full space-y-2">
                      <Label htmlFor="fromCurrency" className="text-slate-300 font-medium">From</Label>
                      <select id="fromCurrency" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-white outline-none">
                        {Object.entries(COMMON_CURRENCIES).map(([code, name]) => (
                          <option key={`from-${code}`} value={code}>{code} - {name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="pt-6 hidden md:block">
                      <Button type="button" variant="ghost" onClick={handleSwap} className="rounded-full p-3 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 transition-colors">
                        <ArrowRightLeft className="w-5 h-5 text-emerald-400" />
                      </Button>
                    </div>
                    <div className="w-full flex justify-center md:hidden pt-2">
                      <Button type="button" variant="outline" onClick={handleSwap} className="rounded-full bg-slate-900 border-slate-700 text-emerald-400">
                        <ArrowRightLeft className="w-4 h-4 mr-2" /> Swap
                      </Button>
                    </div>

                    <div className="w-full space-y-2">
                      <Label htmlFor="toCurrency" className="text-slate-300 font-medium">To</Label>
                      <select id="toCurrency" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="w-full p-3 bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-white outline-none">
                        {Object.entries(COMMON_CURRENCIES).map(([code, name]) => (
                          <option key={`to-${code}`} value={code}>{code} - {name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                    {loading ? 'Converting...' : 'Convert Currency'}
                  </Button>
                </form>
              </CardContent>
              {error && (
                <CardFooter className="p-6 bg-slate-800/30 border-t border-slate-700/40 text-center">
                  <p className="text-destructive text-center w-full">{error}</p>
                </CardFooter>
              )}
              {result && !error && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-800/30 border-t border-slate-700/40">
                  <div className="w-full space-y-4 text-center">
                    <p className="text-slate-300 font-medium">{amount} {fromCurrency} equals</p>
                    <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                      {result.amount} <span className="text-3xl">{toCurrency}</span>
                    </p>
                    <p className="text-xs text-slate-400 pt-2">Mid-market exchange rate: 1 {fromCurrency} = {result.rate} {toCurrency}</p>
                    <ShareResults title="Currency Conversion" text={`${amount} ${fromCurrency} is equal to ${result.amount} ${toCurrency}.`} url="/financial/currency-converter" />
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
          <aside className="lg:col-span-1 space-y-6">
            <RelatedTools category="financial" />
          </aside>
        </div>
        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="Rates are provided for informational purposes only. Actual rates offered by your bank or foreign exchange provider will vary." />
      </div>
    </>
  );
};

export default CurrencyConverter;

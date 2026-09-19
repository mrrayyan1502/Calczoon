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
import { Receipt, Percent, ArrowRightLeft, DollarSign } from 'lucide-react';

const VatCalculator = () => {
  const [amount, setAmount] = useState('100');
  const [taxRate, setTaxRate] = useState('20');
  const [mode, setMode] = useState('add'); // 'add' (Net to Gross) or 'remove' (Gross to Net)
  const [currency, setCurrency] = useState('GBP');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      default: return '£';
    }
  };

  const calculateVat = (e) => {
    if (e) e.preventDefault();

    const inputVal = parseFloat(amount);
    const rateVal = parseFloat(taxRate);

    if (isNaN(inputVal) || inputVal < 0 || isNaN(rateVal) || rateVal < 0) {
      setResult({ error: "Please enter valid positive values for amount and tax rate." });
      return;
    }

    let netAmount = 0;
    let vatAmount = 0;
    let grossAmount = 0;

    if (mode === 'add') {
      // Adding VAT to Net amount
      netAmount = inputVal;
      vatAmount = netAmount * (rateVal / 100);
      grossAmount = netAmount + vatAmount;
    } else {
      // Removing VAT from Gross amount (Reverse VAT)
      grossAmount = inputVal;
      netAmount = grossAmount / (1 + (rateVal / 100));
      vatAmount = grossAmount - netAmount;
    }

    const calcResult = {
      net: netAmount.toFixed(2),
      vat: vatAmount.toFixed(2),
      gross: grossAmount.toFixed(2),
      mode: mode,
      rate: rateVal.toFixed(1)
    };

    setResult(calcResult);

    saveCalculation({
      type: 'VAT / Sales Tax',
      inputs: { amount, taxRate, mode, currency },
      result: {
        Net: `${getCurrencySymbol()}${calcResult.net}`,
        VAT: `${getCurrencySymbol()}${calcResult.vat}`,
        Gross: `${getCurrencySymbol()}${calcResult.gross}`
      }
    });
  };

  const handlePreset = (presetRate, presetCurrency) => {
    setTaxRate(presetRate.toString());
    if (presetCurrency) setCurrency(presetCurrency);
  };

  const faqItems = [
    {
      question: "How do you calculate adding VAT to an amount?",
      answer: "To add VAT to a net price, multiply the net price by the VAT rate (e.g. 20% = 0.20) to find the tax amount, then add it to the net price. Formula: Gross = Net × (1 + VAT Rate / 100)."
    },
    {
      question: "How do you remove or reverse calculate VAT from a total price?",
      answer: "To remove VAT from a gross price, divide the total gross amount by 1 plus the VAT decimal rate. For a 20% rate, divide the gross total by 1.20. The difference between the gross amount and net amount is the VAT."
    },
    {
      question: "What is the standard UK VAT rate in 2026?",
      answer: "The UK standard VAT rate is 20% on most goods and services. A reduced rate of 5% applies to specific items like children's car seats and home energy, while zero-rated items (0%) include most food, books, and children's clothing."
    },
    {
      question: "What is the difference between Sales Tax and VAT?",
      answer: "Sales Tax (common in the USA) is collected only at the final retail purchase by the end consumer. Value Added Tax (VAT) is collected incrementally at every stage of the supply chain and production process."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon VAT & Sales Tax Calculator",
    "description": "Calculate and reverse calculate Value Added Tax (VAT) and US Sales Tax. Add or remove tax with instant net, tax, and gross breakdowns.",
    "applicationCategory": "FinanceApplication",
    "applicationSubCategory": "Tax Calculator",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/financial/vat-calculator",
    "browserRequirements": "Requires JavaScript.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "GBP"
    }
  };

  const faqPageSchema = {
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
        title="VAT Calculator: Add or Remove Value Added Tax (UK & Global)"
        description="Free VAT & Sales Tax Calculator. Calculate Net to Gross, or reverse calculate Gross to Net (exclude VAT). Instant 20% UK VAT and custom tax rates."
        canonicalUrl="/financial/vat-calculator"
        schema={[webAppSchema, faqPageSchema]}
        keywords={['vat calculator', 'sales tax calculator', 'remove vat calculator', 'reverse vat calculator', 'uk 20% vat']}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="VAT & Sales Tax Calculator"
          description="Easily add VAT to net prices or reverse-calculate VAT from gross totals. Includes one-click presets for UK, European, and US sales tax rates."
          icon={<Receipt className="w-8 h-8 text-emerald-400" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white text-xl">Tax Calculation Inputs</CardTitle>
                    <CardDescription className="text-slate-400">Choose mode and enter prices to calculate tax</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {['GBP', 'USD', 'EUR'].map((cur) => (
                      <button
                        key={cur}
                        type="button"
                        onClick={() => setCurrency(cur)}
                        className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                          currency === cur ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cur}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateVat} className="space-y-5">
                  {/* Mode Selector */}
                  <div className="grid grid-cols-2 gap-3 p-1 bg-slate-950 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setMode('add')}
                      className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                        mode === 'add' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Add VAT (Net ➔ Gross)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('remove')}
                      className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                        mode === 'remove' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Remove VAT (Gross ➔ Net)
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-slate-300">
                        {mode === 'add' ? `Net Amount Excl. Tax (${getCurrencySymbol()})` : `Gross Amount Incl. Tax (${getCurrencySymbol()})`}
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="100.00"
                        className="bg-slate-950 border-slate-700 text-white text-lg"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="taxRate" className="text-slate-300">Tax / VAT Rate (%)</Label>
                      <Input
                        id="taxRate"
                        type="number"
                        step="0.1"
                        value={taxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                        placeholder="20"
                        className="bg-slate-950 border-slate-700 text-white text-lg"
                        required
                      />
                    </div>
                  </div>

                  {/* Popular Presets */}
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 font-medium">Quick Country Presets:</p>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => handlePreset(20, 'GBP')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-md text-slate-300">
                        UK Standard (20%)
                      </button>
                      <button type="button" onClick={() => handlePreset(5, 'GBP')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-md text-slate-300">
                        UK Reduced (5%)
                      </button>
                      <button type="button" onClick={() => handlePreset(19, 'EUR')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-md text-slate-300">
                        Germany (19%)
                      </button>
                      <button type="button" onClick={() => handlePreset(21, 'EUR')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-md text-slate-300">
                        Spain / NL (21%)
                      </button>
                      <button type="button" onClick={() => handlePreset(8.25, 'USD')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-md text-slate-300">
                        US Sales Tax (8.25%)
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 mt-4 text-base">
                    {mode === 'add' ? 'Calculate Price with VAT' : 'Calculate Price Excluding VAT'}
                  </Button>
                </form>
              </CardContent>

              {result && (
                <CardFooter className="flex flex-col bg-slate-950/80 border-t border-slate-800 p-6 rounded-b-xl">
                  {result.error ? (
                    <p className="text-rose-400 font-semibold">{result.error}</p>
                  ) : (
                    <div className="w-full space-y-5">
                      <div className="text-center py-4 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-slate-400 text-sm">
                          {mode === 'add' ? 'Final Gross Price (With VAT)' : 'Original Net Price (Without VAT)'}
                        </p>
                        <p className="text-4xl md:text-5xl font-extrabold text-emerald-400 my-1">
                          {getCurrencySymbol()}{mode === 'add' ? result.gross : result.net}
                        </p>
                        <p className="text-xs text-slate-500">Includes {getCurrencySymbol()}{result.vat} VAT at {result.rate}%</p>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Net Amount</p>
                          <p className="text-lg font-bold text-white">{getCurrencySymbol()}{result.net}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">VAT Amount ({result.rate}%)</p>
                          <p className="text-lg font-bold text-amber-400">{getCurrencySymbol()}{result.vat}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Gross Total</p>
                          <p className="text-lg font-bold text-sky-400">{getCurrencySymbol()}{result.gross}</p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <ShareResults
                          title="VAT Calculation"
                          text={`VAT Calculation: Net ${getCurrencySymbol()}${result.net} + ${getCurrencySymbol()}${result.vat} VAT (${result.rate}%) = Gross ${getCurrencySymbol()}${result.gross}`}
                          url="/financial/vat-calculator"
                        />
                      </div>
                    </div>
                  )}
                </CardFooter>
              )}
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <RelatedTools category="financial" />
          </aside>
        </div>

        {/* Educational & Business Guides for AEO */}
        <section className="mt-12 bg-slate-900/60 rounded-xl p-8 border border-slate-800 space-y-6 text-slate-300">
          <h2 className="text-2xl font-bold text-white">Understanding Value Added Tax (VAT) Calculations</h2>
          <p className="leading-relaxed">
            Value Added Tax is a consumption tax placed on a product or service whenever value is added at each stage of the supply chain. Whether you are invoicing business clients, submitting quarterly VAT returns to HMRC, or tracking retail consumer expenses, calculating both standard and reverse VAT accurately is essential.
          </p>

          <h3 className="text-xl font-semibold text-white">The Mathematical Formulas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <h4 className="text-emerald-400 font-semibold mb-2">1. Adding VAT (Net to Gross)</h4>
              <p className="font-mono text-xs text-slate-300">VAT = Net Amount × (Rate ÷ 100)</p>
              <p className="font-mono text-xs text-slate-300 mt-1">Gross = Net Amount + VAT</p>
              <p className="text-xs text-slate-500 mt-2">Example: £100 Net + 20% = £120 Gross</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <h4 className="text-amber-400 font-semibold mb-2">2. Removing VAT (Reverse Calculation)</h4>
              <p className="font-mono text-xs text-slate-300">Net = Gross Amount ÷ (1 + Rate ÷ 100)</p>
              <p className="font-mono text-xs text-slate-300 mt-1">VAT = Gross Amount − Net Amount</p>
              <p className="text-xs text-slate-500 mt-2">Example: £120 Gross ÷ 1.20 = £100 Net (£20 VAT)</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white">Common Mistake in Reverse VAT Calculation</h3>
          <p className="text-sm leading-relaxed">
            A common accounting mistake is attempting to remove 20% VAT by multiplying the gross amount by 20% (e.g. £120 × 0.20 = £24). That yields the wrong result! 20% was originally added to the smaller net figure, so to extract it from the gross total, you must divide by 1.20 (which represents 100% principal + 20% tax).
          </p>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="This VAT calculator is intended for general business and personal estimating purposes. It does not replace certified tax advice or professional accountancy services." />
      </div>
    </>
  );
};

export default VatCalculator;
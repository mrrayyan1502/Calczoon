'use client';

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
import { Receipt, Percent, ArrowRightLeft, DollarSign, Sparkles, Globe, ShieldCheck } from 'lucide-react';

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
      question: "How do you calculate adding VAT to a net price?",
      answer: "To add VAT to an exclusive net price, multiply the net price by the VAT rate decimal (e.g., 20% = 0.20) to determine the VAT charge, then sum the net price and VAT amount. Formula: Gross = Net × (1 + Rate / 100)."
    },
    {
      question: "How do you remove or reverse-calculate VAT from a gross total?",
      answer: "To remove VAT from an inclusive gross total, divide the gross figure by (1 + Rate / 100). For standard 20% UK VAT, divide the gross total by 1.20 to reveal the net base price. The difference between the gross total and net base equals the VAT collected."
    },
    {
      question: "Why is taking 20% off a gross price mathematically incorrect?",
      answer: "Multiplying a gross inclusive price by 20% yields an incorrectly high tax figure because the original 20% tax was levied on the smaller net base, not the inflated gross figure. To extract 20% VAT from a gross figure, you must multiply by 1/6 (approx. 16.6667%) or divide by 1.20."
    },
    {
      question: "What is the difference between Value Added Tax (VAT) and US Sales Tax?",
      answer: "US Sales Tax is a single-stage consumption levy collected strictly from the end retail consumer at the point of final sale. In contrast, VAT is an incremental multi-stage consumption tax assessed and remitted at every commercial interchange throughout the manufacturing, wholesale, and retail supply chain."
    },
    {
      question: "What items qualify for reduced or zero-rate VAT in the United Kingdom?",
      answer: "In the UK, a reduced 5% VAT rate applies to home domestic energy and children's car seats. Zero-rated supplies (0% VAT) include most supermarket groceries, books, newspapers, prescription medications, public passenger transport, and children's clothing."
    },
    {
      question: "What is the VAT registration turnover threshold in the UK?",
      answer: "Under current HMRC statutory rules, businesses must compulsorily register for VAT if their rolling 12-month taxable turnover exceeds £90,000, or if they anticipate exceeding that threshold within the next 30 days."
    },
    {
      question: "How does the reverse charge mechanism work in international B2B services?",
      answer: "Under the reverse charge mechanism, when cross-border B2B digital or professional services are delivered, the overseas seller invoices without charging foreign VAT, and the recipient business accounts for both input and output VAT simultaneously on their domestic tax return."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon VAT & Sales Tax Calculator",
    "description": "Calculate and reverse calculate Value Added Tax (VAT) and international sales tax. Add or remove tax with instant net, tax, and gross breakdowns.",
    "applicationCategory": "FinanceApplication",
    "applicationSubCategory": "Tax Calculator",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/financial/vat-calculator",
    "browserRequirements": "Requires JavaScript."
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
        title="VAT Calculator: Add or Remove Value Added Tax (UK & Global Rates)"
        description="Free VAT Calculator. Add VAT to net prices or reverse-calculate gross to net. Supports UK 20% VAT, European rates, and US sales tax with formula breakdowns."
        canonicalUrl="/financial/vat-calculator"
        schema={[webAppSchema, faqPageSchema]}
        keywords={['vat calculator', 'sales tax calculator', 'remove vat calculator', 'reverse vat calculator', 'uk 20% vat', 'gross to net vat']}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="VAT & Sales Tax Calculator"
          description="Easily add VAT to net prices or reverse-calculate VAT from gross totals. Includes one-click presets for UK, European, and US sales tax rates."
          icon={Receipt}
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
                      Add VAT (Net → Gross)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('remove')}
                      className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                        mode === 'remove' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Remove VAT (Gross → Net)
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
                      <button type="button" onClick={() => handlePreset(20, 'EUR')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-md text-slate-300">
                        France (20%)
                      </button>
                      <button type="button" onClick={() => handlePreset(21, 'EUR')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-md text-slate-300">
                        Spain / NL (21%)
                      </button>
                      <button type="button" onClick={() => handlePreset(23, 'EUR')} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-md text-slate-300">
                        Ireland (23%)
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
                        <p className="text-xs text-slate-400">
                          Includes {getCurrencySymbol()}{result.vat} VAT assessed at {result.rate}%
                        </p>
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

                      {/* Monetization / Recommended Bookkeeping Tool */}
                      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="text-xs space-y-1">
                          <p className="font-semibold text-emerald-300">Streamline Multi-Jurisdiction VAT Compliance</p>
                          <p className="text-slate-300 leading-relaxed">
                            Selling digital goods or physical products across the UK, EU, and US requires tracking localized destination tax thresholds. Cloud accounting platforms (such as Xero or QuickBooks) with integrated automated tax calculation tools eliminate cross-border compliance errors and simplify quarterly filings.
                          </p>
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
        <section className="mt-12 bg-slate-900/60 rounded-xl p-8 border border-slate-800 space-y-8 text-slate-300">
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Comprehensive Guide to Value Added Tax (VAT) & Sales Tax Principles</h2>
            <p className="leading-relaxed text-slate-300">
              Value Added Tax (VAT), known in certain jurisdictions as Goods and Services Tax (GST), is an ad-valorem indirect consumption tax levied on goods and services at every juncture where economic value is added along the supply chain. From the initial extraction of raw materials, through manufacturing, wholesale distribution, and down to the ultimate consumer transaction, VAT is systematically assessed and credited. Understanding how to calculate both additive VAT (net-to-gross) and deductive reverse VAT (gross-to-net) is essential for corporate financial controllers, e-commerce merchants, freelancers, and household consumers.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">The Mathematical Models of VAT Calculation</h3>
            <p className="mb-4 leading-relaxed">
              VAT accounting relies upon two inverse mathematical formulas depending on whether tax is being appended to a net price or backed out of a gross invoice:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="text-emerald-400 font-semibold mb-2">1. Adding VAT (Net to Gross)</h4>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">VAT = Net Amount × (Rate / 100)</div>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">Gross = Net Amount × (1 + Rate / 100)</div>
                <p className="text-xs text-slate-400">
                  Applied when quoting commercial B2B rates where prices are agreed exclusive of tax, and statutory VAT is added onto the final customer invoice.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="text-amber-400 font-semibold mb-2">2. Removing VAT (Gross to Net Reverse Calculation)</h4>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">Net = Gross Amount / (1 + Rate / 100)</div>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">VAT = Gross Amount - Net Amount</div>
                <p className="text-xs text-slate-400">
                  Applied when reviewing consumer retail receipts (which are legally mandated to display VAT-inclusive pricing) to isolate the tax paid for bookkeeping.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Standard & Reduced VAT Rates Across International Economies</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The benchmark table below compares standard, reduced, and super-reduced VAT/GST rates across leading global economies:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-200">
                  <tr>
                    <th className="p-3">Country / Jurisdiction</th>
                    <th className="p-3">Tax Name</th>
                    <th className="p-3">Standard Rate</th>
                    <th className="p-3">Reduced Rate</th>
                    <th className="p-3">Reverse Multiplier</th>
                    <th className="p-3">Typical Applicable Goods</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">United Kingdom (UK)</td>
                    <td className="p-3">VAT</td>
                    <td className="p-3 text-emerald-400 font-bold">20.0%</td>
                    <td className="p-3 text-slate-300">5.0% / 0%</td>
                    <td className="p-3 font-mono text-amber-400">16.6667%</td>
                    <td className="p-3">General commercial merchandise, services, digital subscriptions.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Germany (DE)</td>
                    <td className="p-3">MwSt</td>
                    <td className="p-3 text-emerald-400 font-bold">19.0%</td>
                    <td className="p-3 text-slate-300">7.0%</td>
                    <td className="p-3 font-mono text-amber-400">15.9664%</td>
                    <td className="p-3">Industrial machinery, consumer electronics, hospitality.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">France (FR)</td>
                    <td className="p-3">TVA</td>
                    <td className="p-3 text-emerald-400 font-bold">20.0%</td>
                    <td className="p-3 text-slate-300">10.0% / 5.5%</td>
                    <td className="p-3 font-mono text-amber-400">16.6667%</td>
                    <td className="p-3">Standard consumer goods; reduced on books and groceries.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Spain (ES)</td>
                    <td className="p-3">IVA</td>
                    <td className="p-3 text-emerald-400 font-bold">21.0%</td>
                    <td className="p-3 text-slate-300">10.0% / 4.0%</td>
                    <td className="p-3 font-mono text-amber-400">17.3554%</td>
                    <td className="p-3">General retail, telecom, transport; reduced on basic bread and milk.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Italy (IT)</td>
                    <td className="p-3">IVA</td>
                    <td className="p-3 text-emerald-400 font-bold">22.0%</td>
                    <td className="p-3 text-slate-300">10.0% / 5.0% / 4.0%</td>
                    <td className="p-3 font-mono text-amber-400">18.0328%</td>
                    <td className="p-3">Standard goods; 10% on tourism, pharmaceuticals, public utilities.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Ireland (IE)</td>
                    <td className="p-3">VAT</td>
                    <td className="p-3 text-emerald-400 font-bold">23.0%</td>
                    <td className="p-3 text-slate-300">13.5% / 9.0%</td>
                    <td className="p-3 font-mono text-amber-400">18.6992%</td>
                    <td className="p-3">Retail consumer products; reduced on hotel accommodation and dining.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Netherlands (NL)</td>
                    <td className="p-3">BTW</td>
                    <td className="p-3 text-emerald-400 font-bold">21.0%</td>
                    <td className="p-3 text-slate-300">9.0%</td>
                    <td className="p-3 font-mono text-amber-400">17.3554%</td>
                    <td className="p-3">Commercial transactions; reduced on foodstuffs, water supply, art.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Australia (AU)</td>
                    <td className="p-3">GST</td>
                    <td className="p-3 text-emerald-400 font-bold">10.0%</td>
                    <td className="p-3 text-slate-300">0%</td>
                    <td className="p-3 font-mono text-amber-400">9.0909%</td>
                    <td className="p-3">Broad-based consumption tax on most sales, excluding basic food.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Canada (CA)</td>
                    <td className="p-3">GST / HST</td>
                    <td className="p-3 text-emerald-400 font-bold">5.0% - 15.0%</td>
                    <td className="p-3 text-slate-300">0%</td>
                    <td className="p-3 font-mono text-amber-400">4.76% - 13.04%</td>
                    <td className="p-3">Federal 5% GST combined with provincial sales tax (PST) or HST.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Japan (JP)</td>
                    <td className="p-3">JCT</td>
                    <td className="p-3 text-emerald-400 font-bold">10.0%</td>
                    <td className="p-3 text-slate-300">8.0%</td>
                    <td className="p-3 font-mono text-amber-400">9.0909%</td>
                    <td className="p-3">Standard consumption tax; reduced 8% on non-restaurant food.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Step-by-Step Numerical Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-emerald-400 text-base">Case Study 1: B2B Technology Consulting Invoice (£ GBP)</h4>
                <p><strong>Agreed Net Service Fee:</strong> £2,500.00</p>
                <p><strong>UK Standard VAT Rate:</strong> 20.0%</p>
                <p><strong>Output VAT Calculation:</strong> £2,500 × 0.20 = £500.00</p>
                <p><strong>Total Gross Invoice Value:</strong> £2,500 + £500 = £3,000.00</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-emerald-300 font-semibold">Total Remitted by Client: £3,000.00</p>
                  <p className="text-amber-300 font-semibold">HMRC Output Tax Liability: £500.00</p>
                  <p className="text-slate-300 text-xs">Note: If the client is VAT-registered, they reclaim the entire £500 as Input VAT.</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-sky-400 text-base">Case Study 2: European Consumer Electronics Purchase (€ EUR)</h4>
                <p><strong>Retail Shelf Price (VAT Inclusive):</strong> €595.00</p>
                <p><strong>German Standard VAT Rate:</strong> 19.0%</p>
                <p><strong>Net Price Extraction:</strong> €595 / 1.19 = €500.00</p>
                <p><strong>Embedded VAT Calculation:</strong> €595 - €500 = €95.00</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-sky-300 font-semibold">Base Cost of Goods Sold (COGS): €500.00</p>
                  <p className="text-amber-300 font-semibold">Embedded Tax Remitted to Tax Authority: €95.00</p>
                  <p className="text-slate-300 text-xs">Warning: Taking 19% directly of €595 would erroneously calculate €113.05.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">The Common Reverse VAT Calculation Fallacy</h3>
            <p className="leading-relaxed mb-4 text-sm">
              The single most rampant mathematical error committed in small business bookkeeping is attempting to remove VAT by applying the headline percentage directly to the gross total. For instance, if a bill is £120 including 20% VAT, taking 20% of £120 produces £24, leaving a supposed net figure of £96.
            </p>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-sm space-y-2">
              <p className="text-rose-400 font-semibold">Why this fails mathematically:</p>
              <p className="text-slate-300">
                The 20% was originally charged on £100 of net goods (£100 × 0.20 = £20), creating a £120 total. £20 represents exactly 20% of the £100 net, but it represents only <strong>16.6667% (one-sixth)</strong> of the £120 gross total! Therefore, to correctly reverse VAT, you must divide the gross amount by <em>1 + (Rate / 100)</em>.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">5 Critical VAT Compliance Pitfalls for Growing Enterprises</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed text-slate-300">
              <li>
                <strong>Failing to Monitor Compulsory Registration Thresholds:</strong> In the UK, crossing the rolling £90,000 12-month turnover threshold triggers mandatory VAT registration. Failure to register on time results in retroactive tax assessments and heavy civil penalties.
              </li>
              <li>
                <strong>Confusing Zero-Rated with Exempt Supplies:</strong> Zero-rated sales (such as basic food) carry 0% VAT, allowing the business to reclaim all input VAT on related purchases. Exempt sales (such as financial or insurance services) do not permit input VAT reclamation.
              </li>
              <li>
                <strong>Overlooking the Reverse Charge on Cross-Border B2B Services:</strong> When purchasing digital software or services from overseas providers, domestic businesses must apply the reverse charge mechanism, declaring both input and output VAT.
              </li>
              <li>
                <strong>Missing Strict Deadlines for Making Tax Digital (MTD):</strong> Modern tax authorities mandate that registered businesses maintain digital accounting records and submit quarterly VAT returns via approved MTD software.
              </li>
              <li>
                <strong>Neglecting Valid VAT Invoicing Elements:</strong> Invoices must legally display the seller's valid VAT identification number, invoice date, unique sequential invoice number, net amount, applicable rate, and total tax charged.
              </li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="This VAT calculator is intended for general commercial and personal estimation purposes. International tax rates, zero-rated exemptions, and reverse-charge rules are subject to legislative revision. Consult a certified accountant or tax authority for formal tax reporting." />
      </div>
    </>
  );
};

export default VatCalculator;

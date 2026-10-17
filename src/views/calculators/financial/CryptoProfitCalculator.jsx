'use client';

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
import PageHeader from '@/components/PageHeader';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { TrendingUp, TrendingDown, HelpCircle, Coins, Sparkles, ShieldCheck } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CryptoProfitCalculator = () => {
  const [buyPrice, setBuyPrice] = useState('50000');
  const [sellPrice, setSellPrice] = useState('65000');
  const [invested, setInvested] = useState('2000');
  const [fees, setFees] = useState('20');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const calculateProfit = (e) => {
    if (e) e.preventDefault();
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
    const breakEvenPrice = p + (f / quantity);

    const newResult = {
      netProfit: netProfit.toFixed(2),
      roi: roi.toFixed(2),
      totalCost: (i + f).toFixed(2),
      finalValue: finalValue.toFixed(2),
      quantity: quantity.toFixed(6),
      breakEven: breakEvenPrice.toFixed(2),
      isProfit: netProfit >= 0,
    };
    setResult(newResult);
    saveCalculation({
      type: 'Crypto Profit',
      inputs: { invested: i, buyPrice: p, sellPrice: s, fees: f, currency },
      result: { Profit: `${getCurrencySymbol()}${newResult.netProfit}`, ROI: `${newResult.roi}%` }
    });
  };
  
  const faqItems = [
    {
      question: "How is cryptocurrency profit or loss calculated?",
      answer: "Net crypto profit is calculated using the formula: Net Profit = (Coin Quantity × Exit Selling Price) - Initial Investment - Cumulative Transaction Fees. Return on Investment (ROI) is then expressed as (Net Profit / Total Initial Investment) × 100."
    },
    {
      question: "What transaction fees must be included in crypto cost basis?",
      answer: "You should account for centralized exchange maker/taker trading commissions (typically 0.1% to 0.5%), on-chain blockchain network gas fees (Ethereum gwei, Bitcoin sats/vB), fiat deposit/withdrawal banking fees, and decentralized exchange liquidity pool swap fees."
    },
    {
      question: "Are cryptocurrency profits subject to capital gains tax?",
      answer: "In major jurisdictions including the United States (IRS Notice 2014-21) and United Kingdom (HMRC Cryptoassets Manual), cryptocurrencies are classified as property. Selling, trading one crypto asset for another, or spending crypto triggers a taxable event subject to short-term or long-term capital gains tax rates."
    },
    {
      question: "How do I calculate my average buy price with Dollar-Cost Averaging (DCA)?",
      answer: "To determine your weighted average cost basis when buying at multiple price points, sum your total fiat currency spent across all orders and divide it by the total cumulative units of the cryptocurrency token accumulated."
    },
    {
      question: "What is the difference between unrealized (paper) gains and realized gains?",
      answer: "Unrealized gains represent the theoretical appreciation of your open crypto portfolio while the coins remain in your wallet. A gain only converts into a realized profit (or loss) when you execute a trade into fiat currency, stablecoins, or another token."
    },
    {
      question: "What is slippage and how does it affect crypto trading profits?",
      answer: "Slippage occurs when market volatility or thin order book liquidity causes your trade to execute at a less favorable price than anticipated. On decentralized exchanges (DEXs), automated market makers (AMMs) require slippage tolerance settings that directly diminish net trading return."
    },
    {
      question: "Does the wash-sale rule apply to cryptocurrency?",
      answer: "Under current United States IRS guidelines, the wash-sale rule (which disallows claiming a tax loss if you repurchase the same security within 30 days) applies specifically to stocks and securities, although legislative proposals frequently consider expanding this limitation to digital assets."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Cryptocurrency Profit & ROI Calculator",
    "description": "Calculate crypto profit or loss, Return on Investment (ROI), break-even price, and trading fees for Bitcoin, Ethereum, and altcoins.",
    "applicationCategory": "FinancialApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/financial/crypto-profit-calculator",
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
        title="Crypto Profit Calculator: Calculate Bitcoin & Altcoin ROI, Fees & Gains"
        description="Calculate cryptocurrency profit, net exit value, ROI percentage, break-even price, and exchange fees for Bitcoin, Ethereum, and digital assets."
        canonicalUrl="/financial/crypto-profit-calculator"
        schema={[webAppSchema, faqPageSchema]}
        keywords={['crypto profit calculator', 'bitcoin roi calculator', 'crypto tax gains', 'crypto break even calculator', 'ethereum profit calculator']}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Cryptocurrency Profit & ROI Calculator"
          description="Evaluate net profit or loss, Return on Investment (ROI), exchange commissions, and break-even targets for your digital asset trades."
          icon={Coins}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white text-xl">Crypto Trade Parameters</CardTitle>
                    <CardDescription className="text-slate-400">Enter your buy price, sell target, and transaction costs</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {['USD', 'GBP', 'EUR'].map((cur) => (
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
                <form onSubmit={calculateProfit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="invested" className="text-slate-300">Total Capital Invested ({getCurrencySymbol()})</Label>
                      <Input
                        id="invested"
                        type="number"
                        value={invested}
                        onChange={(e) => setInvested(e.target.value)}
                        placeholder="2000"
                        className="bg-slate-950 border-slate-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fees" className="text-slate-300">Total Exchange & Gas Fees ({getCurrencySymbol()})</Label>
                      <Input
                        id="fees"
                        type="number"
                        step="0.01"
                        value={fees}
                        onChange={(e) => setFees(e.target.value)}
                        placeholder="20.00"
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="buyPrice" className="text-slate-300">Average Purchase Price Per Coin ({getCurrencySymbol()})</Label>
                      <Input
                        id="buyPrice"
                        type="number"
                        step="0.01"
                        value={buyPrice}
                        onChange={(e) => setBuyPrice(e.target.value)}
                        placeholder="50000"
                        className="bg-slate-950 border-slate-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sellPrice" className="text-slate-300">Target Selling Price Per Coin ({getCurrencySymbol()})</Label>
                      <Input
                        id="sellPrice"
                        type="number"
                        step="0.01"
                        value={sellPrice}
                        onChange={(e) => setSellPrice(e.target.value)}
                        placeholder="65000"
                        className="bg-slate-950 border-slate-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 mt-4">
                    Calculate Trade Return
                  </Button>
                </form>
              </CardContent>

              {result && (
                <CardFooter className="flex flex-col bg-slate-950/80 border-t border-slate-800 p-6 rounded-b-xl">
                  {result.error ? (
                    <p className="text-rose-400 font-semibold">{result.error}</p>
                  ) : (
                    <div className="w-full space-y-4">
                      <div className="text-center py-4 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-slate-400 text-sm">Estimated Net Profit / Loss</p>
                        <p className={`text-4xl md:text-5xl font-extrabold my-1 ${result.isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {result.isProfit ? '+' : ''}{getCurrencySymbol()}{result.netProfit}
                        </p>
                        <p className="text-xs text-slate-500">
                          Return on Investment: <span className={result.isProfit ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>{result.roi}%</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Total Exit Value</p>
                          <p className="text-lg font-bold text-white">{getCurrencySymbol()}{result.finalValue}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Tokens Acquired</p>
                          <p className="text-lg font-bold text-sky-400">{result.quantity}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Total Cost Basis</p>
                          <p className="text-lg font-bold text-slate-300">{getCurrencySymbol()}{result.totalCost}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Break-Even Price</p>
                          <p className="text-lg font-bold text-amber-400">{getCurrencySymbol()}{result.breakEven}</p>
                        </div>
                      </div>

                      {/* Monetization / Recommended Security Tool */}
                      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="text-xs space-y-1">
                          <p className="font-semibold text-emerald-300">Essential Crypto Security Best Practice</p>
                          <p className="text-slate-300 leading-relaxed">
                            Leaving substantial crypto profits on centralized exchanges exposes your capital to counterparty insolvency and hacking risks. Store long-term digital wealth in certified non-custodial hardware cold storage (such as Ledger or Trezor) to retain sovereign ownership of your private keys.
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <ShareResults
                          title="Crypto Trade Calculation"
                          text={`My crypto trade ROI is ${result.roi}% with a net return of ${getCurrencySymbol()}${result.netProfit}.`}
                          url="/financial/crypto-profit-calculator"
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

        {/* In-depth Educational & AEO Section */}
        <section className="mt-12 bg-slate-900/60 rounded-xl p-8 border border-slate-800 space-y-8 text-slate-300">
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Complete Guide to Cryptocurrency Trading Profitability & Tax Accounting</h2>
            <p className="leading-relaxed text-slate-300">
              Cryptocurrency markets operate 24 hours a day, 365 days a year across decentralized blockchains and centralized global exchanges. Unlike conventional equities, crypto trades involve volatile cross-currency liquidity pairs, high frequency blockchain gas fees, maker and taker order book commissions, and distinctive sovereign tax regulations. Understanding how to compute true net profitability—factoring in all friction costs—is paramount for retail traders and institutional digital asset allocators alike.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">The Mathematical Models of Crypto Profit & Break-Even</h3>
            <p className="mb-4 leading-relaxed">
              Accurately assessing trading performance requires standardizing your entries, exits, and execution overhead into clear mathematical relationships:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">1. Token Quantity Acquired</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">Q = I / P_buy</div>
                <p>Where <em>I</em> represents initial fiat capital deployed and <em>P_buy</em> is the execution buy price per whole coin.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">2. Gross Exit Valuation</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">V_gross = Q × P_sell</div>
                <p>The total value generated upon converting coin units <em>Q</em> at the target selling price <em>P_sell</em>.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">3. Net Trade Profit Equation</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">P_net = V_gross - I - Fees</div>
                <p>Real net profit subtracting initial investment capital and all cumulative exchange trading commissions and gas fees.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">4. Break-Even Price Equation</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">P_breakeven = P_buy + (Fees / Q)</div>
                <p>The precise per-coin market price required to liquidate your position with zero dollar loss after covering transaction fees.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Crypto Trade Benchmarks: Investment Return & Fee Sensitivity Table</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The benchmark table below demonstrates simulated trade outcomes across various crypto assets, entry valuations, price targets, and exchange commission tiers:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-200">
                  <tr>
                    <th className="p-3">Asset</th>
                    <th className="p-3">Capital Invested</th>
                    <th className="p-3">Entry Price</th>
                    <th className="p-3">Exit Target</th>
                    <th className="p-3">Total Fees</th>
                    <th className="p-3">Net Profit/Loss</th>
                    <th className="p-3">ROI (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Bitcoin (BTC)</td>
                    <td className="p-3">$1,000</td>
                    <td className="p-3">$40,000</td>
                    <td className="p-3">$60,000</td>
                    <td className="p-3 text-slate-400">$10.00</td>
                    <td className="p-3 text-emerald-400 font-bold">+$490.00</td>
                    <td className="p-3 text-emerald-400">+49.00%</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Bitcoin (BTC)</td>
                    <td className="p-3">$5,000</td>
                    <td className="p-3">$50,000</td>
                    <td className="p-3">$75,000</td>
                    <td className="p-3 text-slate-400">$35.00</td>
                    <td className="p-3 text-emerald-400 font-bold">+$2,465.00</td>
                    <td className="p-3 text-emerald-400">+49.30%</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Bitcoin (BTC)</td>
                    <td className="p-3">$10,000</td>
                    <td className="p-3">$65,000</td>
                    <td className="p-3">$55,000</td>
                    <td className="p-3 text-slate-400">$50.00</td>
                    <td className="p-3 text-rose-400 font-bold">-$1,588.46</td>
                    <td className="p-3 text-rose-400">-15.88%</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Ethereum (ETH)</td>
                    <td className="p-3">$2,000</td>
                    <td className="p-3">$2,500</td>
                    <td className="p-3">$3,500</td>
                    <td className="p-3 text-slate-400">$45.00</td>
                    <td className="p-3 text-emerald-400 font-bold">+$755.00</td>
                    <td className="p-3 text-emerald-400">+37.75%</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Ethereum (ETH)</td>
                    <td className="p-3">$5,000</td>
                    <td className="p-3">$3,000</td>
                    <td className="p-3">$4,500</td>
                    <td className="p-3 text-slate-400">$60.00</td>
                    <td className="p-3 text-emerald-400 font-bold">+$2,440.00</td>
                    <td className="p-3 text-emerald-400">+48.80%</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Solana (SOL)</td>
                    <td className="p-3">$1,500</td>
                    <td className="p-3">$100</td>
                    <td className="p-3">$180</td>
                    <td className="p-3 text-slate-400">$12.00</td>
                    <td className="p-3 text-emerald-400 font-bold">+$1,188.00</td>
                    <td className="p-3 text-emerald-400">+79.20%</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Solana (SOL)</td>
                    <td className="p-3">$3,000</td>
                    <td className="p-3">$150</td>
                    <td className="p-3">$120</td>
                    <td className="p-3 text-slate-400">$18.00</td>
                    <td className="p-3 text-rose-400 font-bold">-$618.00</td>
                    <td className="p-3 text-rose-400">-20.60%</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Avalanche (AVAX)</td>
                    <td className="p-3">$1,000</td>
                    <td className="p-3">$25</td>
                    <td className="p-3">$45</td>
                    <td className="p-3 text-slate-400">$15.00</td>
                    <td className="p-3 text-emerald-400 font-bold">+$785.00</td>
                    <td className="p-3 text-emerald-400">+78.50%</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Cardano (ADA)</td>
                    <td className="p-3">$1,000</td>
                    <td className="p-3">$0.40</td>
                    <td className="p-3">$0.80</td>
                    <td className="p-3 text-slate-400">$8.00</td>
                    <td className="p-3 text-emerald-400 font-bold">+$992.00</td>
                    <td className="p-3 text-emerald-400">+99.20%</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Chainlink (LINK)</td>
                    <td className="p-3">$2,500</td>
                    <td className="p-3">$14</td>
                    <td className="p-3">$22</td>
                    <td className="p-3 text-slate-400">$20.00</td>
                    <td className="p-3 text-emerald-400 font-bold">+$1,408.57</td>
                    <td className="p-3 text-emerald-400">+56.34%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Step-by-Step Numerical Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-emerald-400 text-base">Case Study 1: Bitcoin Swing Trade ($ USD)</h4>
                <p><strong>Initial Investment:</strong> $5,000.00</p>
                <p><strong>Purchase Price:</strong> $45,000.00 per BTC</p>
                <p><strong>Coins Purchased:</strong> 0.111111 BTC</p>
                <p><strong>Exit Sale Price:</strong> $67,500.00 per BTC</p>
                <p><strong>Gross Exit Proceeds:</strong> 0.111111 × $67,500 = $7,500.00</p>
                <p><strong>Trading Commissions:</strong> $30.00 (0.3% maker + 0.3% taker)</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-emerald-300 font-semibold">Net Profit: $2,470.00</p>
                  <p className="text-sky-300 font-semibold">Return on Investment (ROI): +49.40%</p>
                  <p className="text-amber-300 font-semibold">Break-Even Execution Target: $45,270.00</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-sky-400 text-base">Case Study 2: Ethereum DeFi Swapping (£ GBP)</h4>
                <p><strong>Initial Investment:</strong> £2,000.00</p>
                <p><strong>Purchase Price:</strong> £2,000.00 per ETH (1.0000 ETH)</p>
                <p><strong>Exit Price:</strong> £2,800.00 per ETH</p>
                <p><strong>Gross Exit Proceeds:</strong> £2,800.00</p>
                <p><strong>DEX Swapping & Gas Network Fees:</strong> £45.00</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-sky-300 font-semibold">Net Profit: £755.00</p>
                  <p className="text-emerald-300 font-semibold">Return on Investment (ROI): +37.75%</p>
                  <p className="text-amber-300 font-semibold">Break-Even Execution Target: £2,045.00</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Cryptocurrency Taxation Guidelines: US & UK Standards</h3>
            <p className="leading-relaxed mb-4 text-sm">
              Navigating crypto compliance requires distinguishing between taxable disposal events and tax-exempt actions:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="font-semibold text-emerald-400 mb-2">United States (IRS Rules)</h4>
                <p className="mb-2"><strong>Short-Term Capital Gains:</strong> Assets held for 12 months or less are taxed as ordinary income at marginal rates ranging from 10% to 37%.</p>
                <p><strong>Long-Term Capital Gains:</strong> Assets held longer than one year benefit from preferential tax brackets: 0%, 15%, or 20% depending on adjusted gross income.</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <h4 className="font-semibold text-sky-400 mb-2">United Kingdom (HMRC Rules)</h4>
                <p className="mb-2"><strong>Capital Gains Allowance:</strong> UK residents receive an annual tax-free Capital Gains Tax exemption. Gains exceeding the allowance are taxed at 10% or 20%.</p>
                <p><strong>Pooling Rules:</strong> Disposals are matched using the 'Same-Day' rule, '30-Day Bed and Breakfast' rule, and the 'Section 104 Holding' pooled average cost method.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">5 Critical Crypto Trading Misconceptions</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed text-slate-300">
              <li>
                <strong>Assuming Trading Between Coins is Tax-Free:</strong> Trading Bitcoin directly for Ethereum or swapping into a USD-pegged stablecoin (USDT/USDC) is classified by tax authorities as a disposal event subject to immediate capital gains assessment.
              </li>
              <li>
                <strong>Ignoring Gas Fees During High Congestion:</strong> Blockchain network congestion can elevate transaction gas fees to $50–$100 per transaction, completely erasing profits on modest trading balances.
              </li>
              <li>
                <strong>Confusing Paper Equity with Realized Capital:</strong> A portfolio showing 200% unrealized profit remains highly vulnerable to market drawdowns until profit-taking orders are executed.
              </li>
              <li>
                <strong>Overlooking Centralized Exchange Withdrawal Fees:</strong> While maker/taker trading fees may appear small (0.1%), flat token withdrawal fees can significantly degrade your effective net ROI when transferring funds to private storage.
              </li>
              <li>
                <strong>Neglecting Record Keeping for Cost Basis:</strong> Failing to log exchange deposit dates, trade timestamps, and transaction hashes leads to massive headaches and potential audit penalties during tax filing season.
              </li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="Cryptocurrency markets are subject to extreme market volatility. This calculator provides mathematical estimates for educational analysis and does not constitute financial, investment, or certified tax advice." />
      </div>
    </>
  );
};

export default CryptoProfitCalculator;

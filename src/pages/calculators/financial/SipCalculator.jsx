import React, { useState } from 'react';
import Seo from '@/components/Seo';
import { Link } from 'react-router-dom';
import { TrendingUp, Info } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { saveCalculation } from '@/lib/history';
import ShareResults from '@/components/ShareResults';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import Faq from '@/components/Faq';

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const calculateSip = (e) => {
    e.preventDefault();
    const P = parseFloat(monthlyInvestment);
    const i = parseFloat(expectedReturn);
    const y = parseFloat(years);

    if (isNaN(P) || isNaN(i) || isNaN(y) || P <= 0 || i <= 0 || y <= 0) {
      toast({ title: "Invalid Input", description: "Please enter positive values for all fields.", variant: "destructive" });
      return;
    }

    const monthlyRate = i / 12 / 100;
    const months = y * 12;
    
    // SIP Future Value formula (Annuity Due)
    // FV = P * [ ( (1 + r)^n - 1 ) / r ] * (1 + r)
    const futureValue = P * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvested = P * months;
    const wealthGained = futureValue - totalInvested;

    const newResult = {
      invested: totalInvested.toFixed(0),
      wealth: wealthGained.toFixed(0),
      total: futureValue.toFixed(0),
      investedPercent: ((totalInvested / futureValue) * 100).toFixed(0),
      wealthPercent: ((wealthGained / futureValue) * 100).toFixed(0)
    };

    setResult(newResult);
    saveCalculation({
      type: 'SIP',
      inputs: { monthlyInvestment: P, expectedReturn: i, years: y },
      result: { totalValue: newResult.total, wealthGained: newResult.wealth }
    });
    toast({ title: "SIP Calculated!", description: "Check your wealth growth below." });
  };

  const pageTitle = "SIP Calculator: Project Mutual Fund Investment Returns 2026";
  const pageDescription = "Calculate the future value of your Systematic Investment Plan (SIP) returns. Project your mutual fund compound growth with our free, easy-to-use SIP calculator.";
  const canonicalUrl = "https://calczoon.com/financial/sip-calculator";

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CalcZoon SIP Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqItems = [
    { question: "What is an SIP?", answer: "A Systematic Investment Plan (SIP) is an investment route offered by mutual funds, allowing you to invest a fixed amount of money regularly (typically monthly) into a selected mutual fund scheme." },
    { question: "How does compounding work in SIP?", answer: "Compounding means you earn interest on your initial investment as well as on the accumulated interest from previous periods. Over long periods, this creates exponential growth." },
    { question: "Can I stop or pause my SIP?", answer: "Yes, you can pause or stop your SIP at any time without any penalty, making it a highly flexible investment option." },
    { question: "Is SIP better than lump sum investment?", answer: "Yes, typically for volatile stock markets, SIP is safer because it averages out your purchasing cost (Dollar-Cost Averaging). Lump-sum can be risky if you invest right before a market dip." },
    { question: "What is the tax on SIP returns?", answer: "Taxation on mutual fund SIP returns depends on the type of fund (equity vs. debt) and the holding period. Short-term capital gains (STCG) and long-term capital gains (LTCG) apply according to your country's tax laws." }
  ];

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
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="/financial/sip-calculator"
        schema={[appSchema, faqSchema]}
      />

      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title="SIP Calculator" description={pageDescription} icon={TrendingUp} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white">Estimate Your Wealth Growth</CardTitle>
                <CardDescription>Enter details about your Systematic Investment Plan</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={calculateSip} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyInvestment" className="text-slate-300 font-medium">Monthly Investment ($)</Label>
                    <Input
                      id="monthlyInvestment"
                      type="number"
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment(e.target.value)}
                      placeholder="e.g., 500"
                      required
                      className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expectedReturn" className="text-slate-300 font-medium">Expected Return Rate (% p.a.)</Label>
                      <Input
                        id="expectedReturn"
                        type="number"
                        step="0.1"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(e.target.value)}
                        placeholder="e.g., 12"
                        required
                        className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="years" className="text-slate-300 font-medium">Time Period (Years)</Label>
                      <Input
                        id="years"
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        placeholder="e.g., 10"
                        required
                        className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                  >
                    Calculate SIP Growth
                  </Button>
                </form>
              </CardContent>

              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 bg-slate-800/30 border-t border-slate-700/40"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    Calculation Summary
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 text-center">
                      <p className="text-sm text-slate-400 font-medium mb-1">Invested Amount</p>
                      <p className="text-2xl font-extrabold text-sky-400">${Number(result.invested).toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 text-center">
                      <p className="text-sm text-slate-400 font-medium mb-1">Est. Returns</p>
                      <p className="text-2xl font-extrabold text-emerald-400">${Number(result.wealth).toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 text-center">
                      <p className="text-sm text-slate-400 font-medium mb-1">Total Value</p>
                      <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">${Number(result.total).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Visual Chart representation */}
                  <div className="space-y-4">
                    <p className="text-sm text-slate-300 font-bold">Investment Breakup</p>
                    <div className="w-full h-6 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
                      <div 
                        style={{ width: `${result.investedPercent}%` }} 
                        className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full flex items-center justify-center text-[10px] text-white font-bold"
                        title={`Invested: ${result.investedPercent}%`}
                      >
                        {result.investedPercent > 15 ? `${result.investedPercent}%` : ''}
                      </div>
                      <div 
                        style={{ width: `${result.wealthPercent}%` }} 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full flex items-center justify-center text-[10px] text-white font-bold"
                        title={`Wealth: ${result.wealthPercent}%`}
                      >
                        {result.wealthPercent > 15 ? `${result.wealthPercent}%` : ''}
                      </div>
                    </div>
                    <div className="flex gap-6 justify-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-sky-500 block"></span>
                        <span className="text-slate-400">Invested Amount ({result.investedPercent}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 block"></span>
                        <span className="text-slate-400">Est. Returns ({result.wealthPercent}%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center border-t border-slate-700/20 pt-6">
                    <ShareResults 
                      title="My SIP Investment Results" 
                      text={`I estimated my SIP returns on Calczoon. For $${monthlyInvestment}/month at ${expectedReturn}%, my future value in ${years} years will be $${Number(result.total).toLocaleString()}!`} 
                      url={canonicalUrl} 
                    />
                  </div>
                </motion.div>
              )}
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white">Why invest via SIP?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <div className="flex gap-3 items-start">
                  <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400 border border-emerald-500/20 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Dollar-Cost Averaging</h4>
                    <p className="text-slate-400 text-xs">You buy more units when market prices are low and fewer units when prices are high, lowering your average cost.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="bg-sky-500/10 p-2 rounded-lg text-sky-400 border border-sky-500/20 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Power of Compounding</h4>
                    <p className="text-slate-400 text-xs">Reinvesting your gains generates exponential returns over the long run. Start early to leverage this power.</p>
                  </div>
                </div>
                <Link to="/blog/compound-interest-guide" className="text-emerald-400 hover:text-emerald-300 hover:underline text-xs font-bold mt-4 block text-center transition-colors">
                  Learn More About Compounding &rarr;
                </Link>
              </CardContent>
            </Card>

            <RelatedTools category="financial" />
          </aside>
        </div>

        {/* Detailed SEO Explanation Section with Financial References */}
        <section className="mt-16 bg-slate-800/20 rounded-2xl border border-slate-700/40 p-8 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">What is a Systematic Investment Plan (SIP)?</h2>
            <p>
              A Systematic Investment Plan (SIP) is a disciplined and automated wealth generation strategy commonly utilized in mutual funds and index fund investing. Instead of allocating a single, large lump-sum payment (which carries the risk of market timing), an investor automatically contributes a fixed amount of capital at regular intervals (such as weekly or monthly).
            </p>
            <p>
              By investing via SIP, investors mathematically benefit from <strong>Dollar-Cost Averaging (DCA)</strong>. This means you naturally acquire more equity shares or mutual fund units when the market is down, and fewer units when the market is up, thereby lowering your average cost per unit over the long term and mitigating acute market volatility.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">How to Use Our Financial SIP Calculator</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Enter your Monthly Investment:</strong> Input the exact capital you intend to allocate automatically every month.</li>
              <li><strong>Enter Expected Annual Return (CAGR):</strong> Type the estimated Compound Annual Growth Rate. Historically, broad market index funds (like the S&P 500) have yielded average long-term returns between 8% to 12% before inflation.</li>
              <li><strong>Select Time Period:</strong> Enter the investment horizon in years. Compounding works best over periods exceeding 10 years.</li>
              <li><strong>Analyze the Projection:</strong> The algorithm will instantly isolate your principal investment from the wealth generated through compounded interest.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">The Mathematics of Compound Growth (Annuity Due)</h2>
            <p>
              The future value of a Systematic Investment Plan is calculated using the established financial formula for the Future Value of an Annuity Due:
            </p>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-center font-mono text-emerald-400 my-4">
              FV = P × [ ( (1 + r)ⁿ - 1 ) / r ] × (1 + r)
            </div>
            <p className="mb-4">Variable Definitions:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>FV:</strong> Future Value (Total projected wealth accumulation).</li>
              <li><strong>P:</strong> The periodic (monthly) SIP installment amount.</li>
              <li><strong>r:</strong> Periodic interest rate (Annual Return Percentage ÷ 12 months ÷ 100).</li>
              <li><strong>n:</strong> Total number of compounding periods (Investment Years × 12).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Why Financial Advisors Recommend SIPs</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>The Snowball Effect (Compounding):</strong> Reinvested dividends and capital gains begin generating their own returns. The longer the capital remains invested, the steeper the exponential growth curve becomes.</li>
              <li><strong>Behavioral Finance Alpha:</strong> Automating investments removes the emotional biases of panic-selling or FOMO-buying, encouraging steadfast financial discipline.</li>
              <li><strong>High Liquidity and Flexibility:</strong> Most open-ended mutual funds permit investors to adjust their SIP mandate amounts or liquidate their holdings swiftly if emergency capital is required.</li>
            </ul>
          </div>

          {/* Financial References Section */}
          <div className="mt-10 pt-6 border-t border-slate-700/50">
            <h3 className="text-lg font-bold text-slate-400 mb-3 uppercase tracking-wider text-sm">Financial References & Market Sources</h3>
            <ul className="text-xs text-slate-500 space-y-2">
              <li>1. Malkiel, B. G. (2015). <em>A Random Walk Down Wall Street: The Time-Tested Strategy for Successful Investing</em>. W. W. Norton & Company.</li>
              <li>2. Bogle, J. C. (2017). <em>The Little Book of Common Sense Investing</em>. John Wiley & Sons.</li>
              <li>3. U.S. Securities and Exchange Commission (SEC). <em>Compound Interest and Yield</em>. Investor.gov.</li>
              <li>4. Statman, M. (1995). A Behavioral Framework for Dollar-Cost Averaging. <em>The Journal of Portfolio Management</em>, 22(1), 70-78.</li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
      </div>
    </>
  );
};

export default SipCalculator;

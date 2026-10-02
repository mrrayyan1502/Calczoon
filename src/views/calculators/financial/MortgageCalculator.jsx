'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveCalculation } from '@/lib/history';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('30');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const calculateMortgage = (e) => {
    e.preventDefault();
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment) || 0;
    const annualRate = parseFloat(interestRate);
    const termYears = parseFloat(loanTerm);

    if (isNaN(price) || isNaN(annualRate) || isNaN(termYears) || price <= 0 || annualRate < 0 || termYears <= 0 || down < 0 || down >= price) {
      setResult({ error: "Please enter valid positive numbers. Down payment cannot exceed home price." });
      return;
    }

    const principal = price - down;
    const i = annualRate / 100 / 12;
    const n = termYears * 12;
    
    const M = i === 0 ? principal / n : principal * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    const totalPayment = M * n;
    const totalInterest = totalPayment - principal;

    const newResult = {
      monthlyPayment: M.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principalAmount: principal.toFixed(2)
    };
    
    setResult(newResult);
    saveCalculation({
      type: 'Mortgage',
      inputs: { homePrice, downPayment, interestRate, loanTerm, currency },
      result: { Monthly: `${getCurrencySymbol()}${newResult.monthlyPayment}`, Total: `${getCurrencySymbol()}${newResult.totalPayment}` }
    });
  };

  const resetForm = () => {
    setHomePrice(''); setDownPayment(''); setInterestRate(''); setLoanTerm('30'); setResult(null);
  };

  const pageTitle = "Mortgage Calculator: Estimate Monthly Home Payments";
  const pageDescription = "Calculate your estimated monthly mortgage payment, total interest, and loan amortization. Free, fast mortgage calculator for home buyers.";

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="/financial/mortgage-calculator"
      />
      
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={Home} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Mortgage Details</CardTitle>
                  <div className="flex gap-2">
                    {['USD', 'GBP', 'EUR'].map((curr) => (
                      <Button
                        key={curr}
                        type="button"
                        variant={currency === curr ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrency(curr)}
                        className={`text-xs ${currency === curr ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-slate-700 text-slate-300'}`}
                      >
                        {curr}
                      </Button>
                    ))}
                  </div>
                </div>
                <CardDescription className="text-slate-300">
                  Enter your home purchase price, down payment, and expected interest rate.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateMortgage} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="homePrice" className="text-slate-200">Home Price ({getCurrencySymbol()})</Label>
                      <Input
                        id="homePrice"
                        type="number"
                        placeholder="e.g. 400000"
                        value={homePrice}
                        onChange={(e) => setHomePrice(e.target.value)}
                        required
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="downPayment" className="text-slate-200">Down Payment ({getCurrencySymbol()})</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        placeholder="e.g. 80000"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="interestRate" className="text-slate-200">Annual Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.01"
                        placeholder="e.g. 6.5"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        required
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loanTerm" className="text-slate-200">Loan Term (Years)</Label>
                      <select
                        id="loanTerm"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        className="w-full h-10 px-3 rounded-md bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="15">15 Years Fixed</option>
                        <option value="20">20 Years Fixed</option>
                        <option value="25">25 Years Fixed</option>
                        <option value="30">30 Years Fixed</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-slate-950 font-bold">
                      Calculate Mortgage
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm} className="border-slate-700 text-slate-300">
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>

              {result && !result.error && (
                <CardFooter className="p-6 bg-slate-800/30 border-t border-slate-700/40 block">
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800">
                      <p className="text-sm text-slate-300 mb-1">Estimated Monthly Payment (P&I)</p>
                      <p className="text-5xl font-extrabold text-emerald-400">
                        {getCurrencySymbol()}{Number(result.monthlyPayment).toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">Principal and interest only (excluding local taxes & insurance)</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-300">Principal Loan</p>
                        <p className="font-semibold text-white">{getCurrencySymbol()}{Number(result.principalAmount).toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-300">Total Interest</p>
                        <p className="font-semibold text-rose-400">{getCurrencySymbol()}{Number(result.totalInterest).toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-300">Total Payments</p>
                        <p className="font-semibold text-slate-200">{getCurrencySymbol()}{Number(result.totalPayment).toLocaleString()}</p>
                      </div>
                    </div>
                    <ShareResults title="Mortgage Payment Calculation" text={`Calculated my monthly mortgage payment on CalcZoon! Estimated: ${getCurrencySymbol()}${Number(result.monthlyPayment).toLocaleString()}/month.`} url="/financial/mortgage-calculator" />
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
          <aside className="lg:col-span-1 space-y-6">
            <RelatedTools category="financial" />
          </aside>
        </div>

        {/* Comprehensive Content Section - 500 to 800 Words */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10">
          
          {/* 1. What is a Mortgage Calculator? */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">What is a Mortgage Calculator?</h2>
            <p className="text-base md:text-lg">
              A <strong>Mortgage Calculator</strong> is an indispensable personal finance tool designed to forecast the exact monthly principal and interest commitments required when financing residential real estate. For the vast majority of households, purchasing a home is the single largest financial commitment of a lifetime, involving multi-decade repayment terms and tens or hundreds of thousands of dollars in cumulative interest.
            </p>
            <p>
              By translating the home purchase price, down payment percentage, annual percentage rate (APR), and loan amortization duration into clear monthly figures, this tool empowers home buyers, investors, and homeowners seeking refinancing to gauge affordability before submitting mortgage applications to lending institutions.
            </p>
          </div>

          {/* 2. How it works / formula */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">How it Works / Formula</h2>
            <p>
              Fixed-rate residential mortgages amortize over a specified schedule using the standard compound annuity formula. Each monthly installment contains two components: interest charged by the lender on the remaining balance, and principal repayment that builds direct home equity.
            </p>
            <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 font-mono text-sm space-y-3">
              <p className="text-emerald-400 font-bold uppercase tracking-wider text-xs">Standard Fixed-Rate Mortgage Amortization Formula</p>
              <p className="text-white text-base md:text-lg">M = P × [ i(1 + i)ⁿ ] ÷ [ (1 + i)ⁿ – 1 ]</p>
              <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <p><strong>M:</strong> Total monthly payment (principal & interest)</p>
                <p><strong>P:</strong> Principal loan amount (Purchase price – Down payment)</p>
                <p><strong>i:</strong> Monthly interest rate (Annual rate ÷ 12 ÷ 100)</p>
                <p><strong>n:</strong> Total number of monthly installments (Years × 12)</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              During the initial years of a 30-year mortgage, the majority of every monthly payment is consumed by interest charges. As the remaining principal diminishes over time, an increasingly larger portion of each payment directly reduces the loan balance.
            </p>
          </div>

          {/* 3. How to use it (steps) */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">How to Use It (Steps)</h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li><strong className="text-white">Step 1: Enter the Target Home Price:</strong> Input the agreed contract purchase price or your maximum home shopping budget.</li>
              <li><strong className="text-white">Step 2: Input Your Upfront Down Payment:</strong> Enter your cash down payment. A 20% down payment is ideal to avoid Private Mortgage Insurance (PMI), but conventional and FHA loans often permit down payments between 3% and 10%.</li>
              <li><strong className="text-white">Step 3: Specify the Quoted Annual Interest Rate:</strong> Enter the fixed interest rate offered by your mortgage lender or current market benchmarks (e.g. 6.75%).</li>
              <li><strong className="text-white">Step 4: Select Your Loan Amortization Term:</strong> Choose between a standard 30-year loan (lower monthly payments) or a 15-year loan (substantially lower total lifetime interest).</li>
              <li><strong className="text-white">Step 5: Click "Calculate Mortgage":</strong> Review your required monthly payment, total interest costs, and full repayment figures.</li>
            </ol>
          </div>

          {/* 4. 2 Solved Real-Life Examples with Numbers */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">2 Solved Real-Life Examples with Numbers</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700/60 space-y-3">
                <h3 className="text-lg font-bold text-emerald-400">Example 1: Single-Family Suburban Home ($400,000)</h3>
                <p className="text-sm">
                  <strong>Scenario:</strong> Michael and Sarah purchase a home for <strong>$400,000</strong> with a 20% down payment (<strong>$80,000</strong>) using a <strong>30-year fixed</strong> loan at <strong>6.5% interest</strong>.
                </p>
                <div className="bg-slate-950 p-3.5 rounded font-mono text-xs text-slate-300 space-y-1">
                  <p>Principal loan (P): $400,000 – $80,000 = $320,000</p>
                  <p>Monthly rate (i): 0.065 ÷ 12 = 0.005417</p>
                  <p>Total months (n): 30 × 12 = 360 payments</p>
                  <p className="text-emerald-400 font-bold">Monthly Payment (M): $2,022.62</p>
                </div>
                <p className="text-sm">
                  <strong>Outcome:</strong> Over 30 years, they will pay a total of <strong>$728,143</strong>. While their original loan was $320,000, cumulative interest charges amount to <strong>$408,143</strong>—more than the home's initial financed balance.
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700/60 space-y-3">
                <h3 className="text-lg font-bold text-sky-400">Example 2: Townhouse on a 15-Year Term (£250,000)</h3>
                <p className="text-sm">
                  <strong>Scenario:</strong> Liam purchases a townhome for <strong>£250,000</strong> with a 10% down payment (<strong>£25,000</strong>) financed with a <strong>15-year mortgage</strong> at <strong>5.0% interest</strong>.
                </p>
                <div className="bg-slate-950 p-3.5 rounded font-mono text-xs text-slate-300 space-y-1">
                  <p>Principal loan (P): £250,000 – £25,000 = £225,000</p>
                  <p>Monthly rate (i): 0.05 ÷ 12 = 0.004167</p>
                  <p>Total months (n): 15 × 12 = 180 payments</p>
                  <p className="text-sky-400 font-bold">Monthly Payment (M): £1,779.37</p>
                </div>
                <p className="text-sm">
                  <strong>Outcome:</strong> By choosing a 15-year term rather than 30 years, Liam's monthly payment is higher, but his total interest paid is only <strong>£95,286</strong>, saving over £120,000 in interest and becoming debt-free 15 years earlier.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Common Mistakes */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Common Mistakes to Avoid</h2>
            <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm">
              <li><strong className="text-white">Ignoring the PITI Components:</strong> Many buyers budget only for Principal & Interest, forgetting Property Taxes, Homeowners Hazard Insurance, and HOA fees, which can add $300 to $800+ to your real monthly housing outgo.</li>
              <li><strong className="text-white">Failing to Account for Private Mortgage Insurance (PMI):</strong> If your down payment is below 20%, lenders mandate PMI, which adds an additional 0.5% to 1.5% of the loan amount annually until you reach 20% equity.</li>
              <li><strong className="text-white">Confusing Interest Rate with APR:</strong> The interest rate calculates your bare monthly payment, but the Annual Percentage Rate (APR) reflects the true cost including origination fees, points, and lender charges.</li>
              <li><strong className="text-white">Overestimating How Much You Can Afford:</strong> Getting approved for a $500,000 loan does not mean it fits your lifestyle. Ensure your total debt payments do not exceed 36% of gross monthly income.</li>
              <li><strong className="text-white">Overlooking Cash Reserves for Closing Costs:</strong> Aside from the down payment, closing costs typically require an additional 2% to 5% in liquid cash at settlement.</li>
            </ul>
          </div>

          {/* 6. 5 FAQs */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">5 Frequently Asked Questions (FAQs)</h2>
            <div className="space-y-4">
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                <h3 className="font-bold text-white text-base mb-1">1. Does this calculator include property taxes and insurance?</h3>
                <p className="text-sm text-slate-300">
                  This calculator computes baseline Principal and Interest (P&I). To calculate your complete monthly housing budget, check your local municipal property tax rate and obtain a homeowner insurance quote, adding them to your monthly estimate.
                </p>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                <h3 className="font-bold text-white text-base mb-1">2. How much does a 20% down payment really save me?</h3>
                <p className="text-sm text-slate-300">
                  A 20% down payment eliminates costly monthly PMI fees, secures superior interest rates from lenders, reduces your borrowed principal, and immediately provides a 20% home equity safety cushion against property market fluctuations.
                </p>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                <h3 className="font-bold text-white text-base mb-1">3. Can I pay extra toward my principal to shorten the mortgage?</h3>
                <p className="text-sm text-slate-300">
                  Yes! Making just one additional monthly mortgage payment per year on a 30-year fixed loan can shorten your overall repayment term by four to seven years and save tens of thousands of dollars in interest charges.
                </p>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                <h3 className="font-bold text-white text-base mb-1">4. Should I choose a 15-year or 30-year mortgage term?</h3>
                <p className="text-sm text-slate-300">
                  A 30-year loan offers lower required monthly payments, providing monthly cash flow flexibility. A 15-year mortgage offers lower interest rates and slashes total interest by more than half, but demands a significantly higher monthly cash outlay.
                </p>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                <h3 className="font-bold text-white text-base mb-1">5. How does refinancing my mortgage work?</h3>
                <p className="text-sm text-slate-300">
                  Refinancing replaces your existing loan with a new loan at a lower interest rate or different term. If current market rates drop by 1% or more below your existing rate, refinancing can substantially lower your monthly obligations.
                </p>
              </div>
            </div>
          </div>

          {/* 7. Related Calculators (Internal Links) */}
          <div className="space-y-4 pt-4 border-t border-slate-700/60">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Related Calculators (Internal Links)</h2>
            <p className="text-sm text-slate-300 mb-4">
              Explore our suite of personal finance and debt planning tools to master your capital and investments:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link to="/financial/loan-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Loan EMI Calculator &rarr;</span>
                <span className="text-xs text-slate-400">Calculate personal, auto, and commercial loan repayments.</span>
              </Link>
              <Link to="/financial/compound-interest-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Compound Interest Calculator &rarr;</span>
                <span className="text-xs text-slate-400">Model long-term wealth growth and compounding schedules.</span>
              </Link>
              <Link to="/financial/savings-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Savings Goal Calculator &rarr;</span>
                <span className="text-xs text-slate-400">Plan monthly deposits required to reach your target down payment.</span>
              </Link>
              <Link to="/financial/retirement-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Retirement Calculator &rarr;</span>
                <span className="text-xs text-slate-400">Estimate retirement corpus and post-career financial independence.</span>
              </Link>
              <Link to="/financial/sip-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">SIP Calculator &rarr;</span>
                <span className="text-xs text-slate-400">Calculate returns on regular monthly mutual fund investments.</span>
              </Link>
            </div>
          </div>

        </section>

      </div>
    </>
  );
};

export default MortgageCalculator;

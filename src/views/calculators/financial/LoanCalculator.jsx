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
import { DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const calculateLoan = (e) => {
    e.preventDefault();
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const termYears = parseFloat(loanTerm);

    if (isNaN(P) || isNaN(annualRate) || isNaN(termYears) || P <= 0 || annualRate < 0 || termYears <= 0) {
      setResult({ error: "Please enter valid positive numbers for all fields." });
      return;
    }

    const i = annualRate / 100 / 12;
    const n = termYears * 12;
    
    // Handle 0% interest rate case
    const M = i === 0 ? P / n : P * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    const totalPayment = M * n;
    const totalInterest = totalPayment - P;

    const newResult = {
      monthlyPayment: M.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      loanAmount: P.toFixed(2)
    };
    setResult(newResult);
    saveCalculation({
      type: 'Loan',
      inputs: { loanAmount, interestRate, loanTerm, currency },
      result: { Monthly: `${getCurrencySymbol()}${newResult.monthlyPayment}`, Total: `${getCurrencySymbol()}${newResult.totalPayment}` }
    });
  };

  const resetForm = () => {
    setLoanAmount(''); setInterestRate(''); setLoanTerm(''); setResult(null);
  };

  const pageTitle = "Loan Calculator: Estimate Monthly EMI & Total Interest";
  const pageDescription = "Calculate your monthly loan payments (EMI), total interest, and complete repayment cost for personal, auto, or business loans with our free calculator.";

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="/financial/loan-calculator"
      />
      
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={DollarSign} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Loan Parameters</CardTitle>
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
                  Enter the principal loan amount, interest rate, and repayment duration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateLoan} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount" className="text-slate-200">Principal Loan Amount ({getCurrencySymbol()})</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="e.g., 25000"
                      required
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="interestRate" className="text-slate-200">Annual Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.01"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="e.g., 6.5"
                        required
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loanTerm" className="text-slate-200">Loan Term (Years)</Label>
                      <Input
                        id="loanTerm"
                        type="number"
                        step="0.5"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        placeholder="e.g., 5"
                        required
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-slate-950 font-bold py-3">
                      Calculate Loan
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
                      <p className="text-sm text-slate-300 mb-1">Estimated Monthly Payment (EMI)</p>
                      <p className="text-5xl font-extrabold text-emerald-400">
                        {getCurrencySymbol()}{Number(result.monthlyPayment).toLocaleString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-300">Principal Borrowed</p>
                        <p className="font-semibold text-white">{getCurrencySymbol()}{Number(result.loanAmount).toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-300">Total Interest</p>
                        <p className="font-semibold text-rose-400">{getCurrencySymbol()}{Number(result.totalInterest).toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-300">Total Cost</p>
                        <p className="font-semibold text-slate-200">{getCurrencySymbol()}{Number(result.totalPayment).toLocaleString()}</p>
                      </div>
                    </div>
                    <ShareResults
                      title="Loan Payment Calculation"
                      text={`Calculated my monthly loan payment on CalcZoon! Estimated payment: ${getCurrencySymbol()}${Number(result.monthlyPayment).toLocaleString()}/month for a principal of ${getCurrencySymbol()}${Number(result.loanAmount).toLocaleString()}. Try this tool:`}
                      url="/financial/loan-calculator"
                    />
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
          
          {/* 1. What is a Loan Calculator? */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">What is a Loan Calculator?</h2>
            <p className="text-base md:text-lg">
              A <strong>Loan Calculator</strong> is a specialized financial computation tool that calculates your Equated Monthly Installment (EMI), cumulative interest payable, and the total cost of credit for fixed-term installment debt. Whether you are applying for an auto loan, unsecured personal loan, home renovation loan, or small business debt, this tool reveals the true financial burden of borrowing capital before you sign a credit contract.
            </p>
            <p>
              Unlike credit cards with revolving minimum payments, installment loans operate on a structured amortization schedule. By entering the principal capital, the lender's annual interest rate, and the duration of the borrowing term, you can instantly see how changes in interest or duration impact your monthly budget.
            </p>
          </div>

          {/* 2. How it works / formula */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">How it Works / Formula</h2>
            <p>
              The loan calculator computes fixed payments using the globally recognized reducing-balance amortization formula. With each monthly installment, interest is assessed only against the remaining unpaid principal balance.
            </p>
            <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 font-mono text-sm space-y-3">
              <p className="text-emerald-400 font-bold uppercase tracking-wider text-xs">Loan Amortization Equation (EMI)</p>
              <p className="text-white text-base md:text-lg">M = P × [ i(1 + i)ⁿ ] ÷ [ (1 + i)ⁿ – 1 ]</p>
              <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <p><strong>M:</strong> Fixed monthly loan installment (EMI)</p>
                <p><strong>P:</strong> Principal loan amount borrowed</p>
                <p><strong>i:</strong> Periodic monthly interest rate (Annual rate ÷ 12 ÷ 100)</p>
                <p><strong>n:</strong> Total number of monthly repayment periods (Years × 12)</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              When interest is set to 0% (such as promotional zero-interest dealership financing), the formula simplifies directly to M = P ÷ n, distributing the principal evenly across all months.
            </p>
          </div>

          {/* 3. How to use it (steps) */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">How to Use It (Steps)</h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li><strong className="text-white">Step 1: Choose Your Currency:</strong> Select USD ($), GBP (£), or EUR (€) to match your domestic loan terms.</li>
              <li><strong className="text-white">Step 2: Enter Principal Loan Amount:</strong> Input the exact sum you need to borrow. For vehicles or goods, subtract any upfront cash down payment or trade-in credit from the sticker price.</li>
              <li><strong className="text-white">Step 3: Enter the Annual Interest Rate:</strong> Type the annual percentage rate (APR) quoted by your bank, credit union, or online lender.</li>
              <li><strong className="text-white">Step 4: Specify the Loan Term:</strong> Enter the loan duration in years (e.g., 3 years for 36 months, or 5 years for 60 months).</li>
              <li><strong className="text-white">Step 5: Click "Calculate Loan":</strong> Review your required monthly payment, total interest charges, and the gross cost of the debt.</li>
            </ol>
          </div>

          {/* 4. 2 Solved Real-Life Examples with Numbers */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">2 Solved Real-Life Examples with Numbers</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700/60 space-y-3">
                <h3 className="text-lg font-bold text-emerald-400">Example 1: Auto Financing ($25,000 New Vehicle)</h3>
                <p className="text-sm">
                  <strong>Scenario:</strong> Alex finances a car for <strong>$25,000</strong> over a <strong>5-year term (60 months)</strong> at an annual interest rate of <strong>6.0%</strong>.
                </p>
                <div className="bg-slate-950 p-3.5 rounded font-mono text-xs text-slate-300 space-y-1">
                  <p>Principal (P): $25,000</p>
                  <p>Monthly rate (i): 0.06 ÷ 12 = 0.005</p>
                  <p>Repayment periods (n): 5 × 12 = 60 months</p>
                  <p className="text-emerald-400 font-bold">Monthly Payment (M): $483.32</p>
                </div>
                <p className="text-sm">
                  <strong>Outcome:</strong> Over 60 months, Alex repays a total of <strong>$28,999.20</strong>. The total cost of borrowing comprises the original $25,000 principal plus <strong>$3,999.20</strong> in cumulative interest.
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700/60 space-y-3">
                <h3 className="text-lg font-bold text-sky-400">Example 2: Unsecured Debt Consolidation (£10,000)</h3>
                <p className="text-sm">
                  <strong>Scenario:</strong> Emma consolidates high-interest credit card debt into a <strong>£10,000</strong> personal loan for <strong>3 years (36 months)</strong> at an interest rate of <strong>8.5%</strong>.
                </p>
                <div className="bg-slate-950 p-3.5 rounded font-mono text-xs text-slate-300 space-y-1">
                  <p>Principal (P): £10,000</p>
                  <p>Monthly rate (i): 0.085 ÷ 12 = 0.007083</p>
                  <p>Repayment periods (n): 3 × 12 = 36 months</p>
                  <p className="text-sky-400 font-bold">Monthly Payment (M): £315.68</p>
                </div>
                <p className="text-sm">
                  <strong>Outcome:</strong> Emma pays <strong>£315.68 per month</strong> for 36 months, repaying a total of <strong>£11,364.48</strong>. Consolidating into an 8.5% fixed loan saves her thousands compared to revolving 22% card interest.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Common Mistakes */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Common Borrowing Mistakes to Avoid</h2>
            <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm">
              <li><strong className="text-white">Fixating Only on the Monthly Payment:</strong> Dealerships and lenders often stretch a loan to 72 or 84 months to offer a low monthly payment. This drastically increases your total interest paid and can trap you in "negative equity" where you owe more than the asset is worth.</li>
              <li><strong className="text-white">Ignoring Origination and Administrative Fees:</strong> Some lenders charge upfront origination fees (typically 1% to 6%) deducted directly from the disbursed principal, meaning you receive less cash than you borrowed.</li>
              <li><strong className="text-white">Overlooking Prepayment Penalty Clauses:</strong> Check if your lender charges a penalty fee if you pay off the loan early to escape future interest charges.</li>
              <li><strong className="text-white">Confusing Flat Rate with Reducing Balance Rate:</strong> A "flat rate" calculates interest on the full original balance for the entire term, costing nearly twice as much as a true reducing-balance APR.</li>
              <li><strong className="text-white">Failing to Shop Multiple Lenders:</strong> Borrowers who compare quotes across credit unions, traditional banks, and online lenders often save 1% to 3% on their APR.</li>
            </ul>
          </div>

          {/* 6. 5 FAQs */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">5 Frequently Asked Questions (FAQs)</h2>
            <div className="space-y-4">
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                <h3 className="font-bold text-white text-base mb-1">1. What is an Equated Monthly Installment (EMI)?</h3>
                <p className="text-sm text-slate-300">
                  An EMI is a fixed, predictable monthly payment made to a lender on a specific date each month. It covers both interest accrued and principal reduction so the debt reaches exactly zero at the end of the term.
                </p>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                <h3 className="font-bold text-white text-base mb-1">2. How much does a shorter loan term save in interest?</h3>
                <p className="text-sm text-slate-300">
                  A shorter loan term requires higher monthly installments, but it drastically reduces the number of months interest compounds. For example, shortening a $20,000 loan from 5 years to 3 years can save over $1,500 in pure interest.
                </p>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                <h3 className="font-bold text-white text-base mb-1">3. Can I pay extra towards my loan principal each month?</h3>
                <p className="text-sm text-slate-300">
                  Yes, on most standard amortized loans with no prepayment penalties, extra principal payments directly reduce the outstanding balance, lowering all subsequent interest calculations and accelerating debt payoff.
                </p>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                <h3 className="font-bold text-white text-base mb-1">4. What is the difference between a secured and unsecured loan?</h3>
                <p className="text-sm text-slate-300">
                  A secured loan is backed by collateral (such as a vehicle or home title), which the lender can repossess upon default, resulting in lower interest rates. An unsecured loan (such as a personal loan) requires no collateral but carries higher rates.
                </p>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                <h3 className="font-bold text-white text-base mb-1">5. How does my credit score affect the loan interest rate?</h3>
                <p className="text-sm text-slate-300">
                  Borrowers with excellent credit scores (740+) generally qualify for the lowest benchmark interest rates, while subprime scores (under 620) may result in rates two to four times higher, adding thousands of dollars to borrowing costs.
                </p>
              </div>
            </div>
          </div>

          {/* 7. Related Calculators (Internal Links) */}
          <div className="space-y-4 pt-4 border-t border-slate-700/60">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Related Calculators (Internal Links)</h2>
            <p className="text-sm text-slate-300 mb-4">
              Explore our connected financial tools to plan budgets, compare amortization schedules, and build savings:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link to="/financial/mortgage-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Mortgage Calculator &rarr;</span>
                <span className="text-xs text-slate-400">Calculate home loan payments, down payment thresholds, and long-term interest.</span>
              </Link>
              <Link to="/financial/compound-interest-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Compound Interest Calculator &rarr;</span>
                <span className="text-xs text-slate-400">Model how recurring deposits and compound interest grow your investment corpus.</span>
              </Link>
              <Link to="/financial/savings-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Savings Goal Calculator &rarr;</span>
                <span className="text-xs text-slate-400">Determine how much to set aside monthly to build an emergency fund or pay off debt.</span>
              </Link>
              <Link to="/financial/sip-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">SIP Calculator &rarr;</span>
                <span className="text-xs text-slate-400">Forecast returns on monthly systematic mutual fund investment plans.</span>
              </Link>
              <Link to="/financial/retirement-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Retirement Calculator &rarr;</span>
                <span className="text-xs text-slate-400">Plan post-career nest eggs and sustainable safe withdrawal rates.</span>
              </Link>
            </div>
          </div>

        </section>

      </div>
    </>
  );
};

export default LoanCalculator;

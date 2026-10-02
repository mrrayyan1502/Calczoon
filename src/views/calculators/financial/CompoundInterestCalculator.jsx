'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveCalculation } from '@/lib/history';
import { Link } from 'react-router-dom';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';
import { TrendingUp } from 'lucide-react';

const CompoundInterestCalculator = () => {
    const [initialAmount, setInitialAmount] = useState('');
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [years, setYears] = useState('');
    const [compoundFrequency, setCompoundFrequency] = useState('12');
    const [currency, setCurrency] = useState('USD');
    const [result, setResult] = useState(null);

    const getCurrencySymbol = () => {
      switch (currency) {
        case 'GBP': return '£';
        case 'EUR': return '€';
        default: return '$';
      }
    };

    const calculateCompoundInterest = (e) => {
        e.preventDefault();
        const P = parseFloat(initialAmount) || 0;
        const PMT = parseFloat(monthlyContribution) || 0;
        const r = parseFloat(interestRate) / 100;
        const t = parseFloat(years);
        const n = parseInt(compoundFrequency);

        if (isNaN(r) || isNaN(t) || t <= 0 || r < 0) {
            setResult({ error: "Please enter a valid, positive interest rate and time period." });
            return;
        }

        const nt = n * t;
        const ratePerPeriod = r / n;

        const futureValueOfP = P * Math.pow(1 + ratePerPeriod, nt);
        const futureValueOfPMT = PMT * ((Math.pow(1 + ratePerPeriod, nt) - 1) / ratePerPeriod);
        const totalAmount = futureValueOfP + futureValueOfPMT;

        const totalPrincipal = P + (PMT * 12 * t);
        const totalInterest = totalAmount - totalPrincipal;

        const newResult = {
            totalAmount: totalAmount.toFixed(2),
            totalPrincipal: totalPrincipal.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
        };
        setResult(newResult);
        saveCalculation({
            type: 'Compound Interest',
            inputs: { initialAmount, monthlyContribution, interestRate, years, compoundFrequency, currency },
            result: { Total: `${getCurrencySymbol()}${newResult.totalAmount}`, Interest: `${getCurrencySymbol()}${newResult.totalInterest}` }
        });
    };

    const resetForm = () => {
      setInitialAmount('');
      setMonthlyContribution('');
      setInterestRate('');
      setYears('');
      setResult(null);
    };

    const pageTitle = "Compound Interest Calculator: Project Investment Growth";
    const pageDescription = "Calculate the future value of your investments with compound interest. Forecast returns with monthly deposits and multiple compounding schedules.";

    return (
        <>
            <Seo
                title={pageTitle}
                description={pageDescription}
                canonicalUrl="/financial/compound-interest-calculator"
            />
            
            <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <PageHeader title={pageTitle} description={pageDescription} icon={TrendingUp} />

                <Card className="bg-slate-800/50 border-slate-700 shadow-xl mb-12">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="text-white text-2xl">Investment Growth Parameters</CardTitle>
                                <CardDescription className="text-slate-300">
                                    Input your starting capital, recurring monthly savings, and expected rate of return.
                                </CardDescription>
                            </div>
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
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={calculateCompoundInterest} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="initialAmount" className="text-slate-200">Initial Deposit ({getCurrencySymbol()})</Label>
                                    <Input
                                        id="initialAmount"
                                        type="number"
                                        value={initialAmount}
                                        onChange={(e) => setInitialAmount(e.target.value)}
                                        placeholder="e.g., 5000"
                                        className="bg-slate-900 border-slate-700 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="monthlyContribution" className="text-slate-200">Monthly Contribution ({getCurrencySymbol()})</Label>
                                    <Input
                                        id="monthlyContribution"
                                        type="number"
                                        value={monthlyContribution}
                                        onChange={(e) => setMonthlyContribution(e.target.value)}
                                        placeholder="e.g., 300"
                                        className="bg-slate-900 border-slate-700 text-white"
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="interestRate" className="text-slate-200">Annual Return Rate (%)</Label>
                                    <Input
                                        id="interestRate"
                                        type="number"
                                        step="0.01"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(e.target.value)}
                                        placeholder="e.g., 7.5"
                                        required
                                        className="bg-slate-900 border-slate-700 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="years" className="text-slate-200">Investment Horizon (Years)</Label>
                                    <Input
                                        id="years"
                                        type="number"
                                        step="0.5"
                                        value={years}
                                        onChange={(e) => setYears(e.target.value)}
                                        placeholder="e.g., 20"
                                        required
                                        className="bg-slate-900 border-slate-700 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="compoundFrequency" className="text-slate-200">Compound Frequency</Label>
                                    <select
                                        id="compoundFrequency"
                                        value={compoundFrequency}
                                        onChange={(e) => setCompoundFrequency(e.target.value)}
                                        className="w-full h-10 px-3 rounded-md bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="12">Monthly (Standard)</option>
                                        <option value="4">Quarterly</option>
                                        <option value="1">Annually</option>
                                        <option value="365">Daily</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-slate-950 font-bold py-3">
                                    Calculate Growth
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
                                    <p className="text-sm text-slate-300 mb-1">Projected Future Portfolio Value</p>
                                    <p className="text-5xl font-extrabold text-emerald-400">
                                        {getCurrencySymbol()}{Number(result.totalAmount).toLocaleString()}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                                        <p className="text-xs text-slate-300">Total Capital Contributed</p>
                                        <p className="text-xl font-bold text-white mt-1">{getCurrencySymbol()}{Number(result.totalPrincipal).toLocaleString()}</p>
                                    </div>
                                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                                        <p className="text-xs text-slate-300">Total Compound Interest Earned</p>
                                        <p className="text-xl font-bold text-emerald-400 mt-1">{getCurrencySymbol()}{Number(result.totalInterest).toLocaleString()}</p>
                                    </div>
                                </div>
                                <ShareResults
                                    title="Investment Growth Calculation"
                                    text={`Projected my investment to grow to ${getCurrencySymbol()}${Number(result.totalAmount).toLocaleString()} using CalcZoon! Free tool:`}
                                    url="/financial/compound-interest-calculator"
                                />
                            </div>
                        </CardFooter>
                    )}
                </Card>

                {/* Comprehensive Content Section - 500 to 800 Words */}
                <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10">
                    
                    {/* 1. What is a Compound Interest Calculator? */}
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">What is a Compound Interest Calculator?</h2>
                        <p className="text-base md:text-lg">
                            A <strong>Compound Interest Calculator</strong> is an advanced wealth-projection instrument designed to model the exponential growth of capital over time. Often termed the "eighth wonder of the world," compound interest occurs when earnings generated by an investment are continuously reinvested to earn additional returns of their own in subsequent cycles.
                        </p>
                        <p>
                            Unlike simple interest—which produces a linear gain based solely on your original deposit—compounding creates a powerful compounding snowball. Whether you are accumulating an emergency fund in a high-yield savings account, planning for retirement through an index fund, or establishing a dividend reinvestment program, this calculator allows you to visualize how patient, disciplined investing produces substantial long-term wealth.
                        </p>
                    </div>

                    {/* 2. How it works / formula */}
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">How it Works / Formula</h2>
                        <p>
                            The calculator combines two foundational financial mechanics: the compound expansion of an initial lump-sum deposit, and the future value of a recurring monthly annuity contribution.
                        </p>
                        <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 font-mono text-sm space-y-3">
                            <p className="text-emerald-400 font-bold uppercase tracking-wider text-xs">Unified Future Value Compounding Equation</p>
                            <p className="text-white text-base md:text-lg">A = P(1 + r/n)ⁿᵗ + PMT × [ ((1 + r/n)ⁿᵗ – 1) ÷ (r/n) ]</p>
                            <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                                <p><strong>A:</strong> Final accumulated investment balance</p>
                                <p><strong>P:</strong> Initial principal investment deposit</p>
                                <p><strong>PMT:</strong> Regular monthly contribution</p>
                                <p><strong>r:</strong> Nominal annual rate of return (decimal form: 8% = 0.08)</p>
                                <p><strong>n:</strong> Compounding frequency per year (12 = monthly, 365 = daily)</p>
                                <p><strong>t:</strong> Total investment duration in years</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-300">
                            Because interest compounds on interest, the growth curve steepens exponentially in later years. In a 30-year timeframe, more than 60% of total wealth accumulation typically occurs during the final decade alone.
                        </p>
                    </div>

                    {/* 3. How to use it (steps) */}
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">How to Use It (Steps)</h2>
                        <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
                            <li><strong className="text-white">Step 1: Set Starting Principal:</strong> Input your initial investment or current portfolio balance (can be $0 if starting from scratch).</li>
                            <li><strong className="text-white">Step 2: Enter Monthly Savings:</strong> Enter the realistic amount you intend to deposit each month from your salary or business cash flow.</li>
                            <li><strong className="text-white">Step 3: Define Expected Return Rate:</strong> Input your expected annual rate of return (e.g. 4.5% for high-yield cash, or 7% to 10% for diversified stock index funds).</li>
                            <li><strong className="text-white">Step 4: Select Horizon & Compounding Frequency:</strong> Specify your timeframe in years and choose monthly compounding (standard for retail brokerages and mutual funds).</li>
                            <li><strong className="text-white">Step 5: Click "Calculate Growth":</strong> Observe your total portfolio balance, separating your out-of-pocket contributions from pure interest earnings.</li>
                        </ol>
                    </div>

                    {/* 4. 2 Solved Real-Life Examples with Numbers */}
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">2 Solved Real-Life Examples with Numbers</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700/60 space-y-3">
                                <h3 className="text-lg font-bold text-emerald-400">Example 1: Long-Term Index Fund ($5,000 Starting)</h3>
                                <p className="text-sm">
                                    <strong>Scenario:</strong> Rachel starts with <strong>$5,000</strong>, contributes <strong>$300 every month</strong>, and earns an average annual return of <strong>8.0%</strong> compounded monthly for <strong>20 years</strong>.
                                </p>
                                <div className="bg-slate-950 p-3.5 rounded font-mono text-xs text-slate-300 space-y-1">
                                    <p>Total Capital Deposited: $5,000 + ($300 × 240) = $77,000</p>
                                    <p>Compound Interest Earned: $120,804.75</p>
                                    <p className="text-emerald-400 font-bold">Future Portfolio Value: $197,804.75</p>
                                </div>
                                <p className="text-sm">
                                    <strong>Outcome:</strong> While Rachel contributed $77,000 over 20 years, compound interest earned her an extra <strong>$120,804.75</strong>. Her investment profits exceed her own contributions by more than 156%!
                                </p>
                            </div>

                            <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700/60 space-y-3">
                                <h3 className="text-lg font-bold text-sky-400">Example 2: Cash Savings Account (£10,000 Starting)</h3>
                                <p className="text-sm">
                                    <strong>Scenario:</strong> James deposits <strong>£10,000</strong> into a high-yield savings account earning <strong>4.5% interest</strong>, adding <strong>£100 per month</strong> for <strong>10 years</strong>.
                                </p>
                                <div className="bg-slate-950 p-3.5 rounded font-mono text-xs text-slate-300 space-y-1">
                                    <p>Total Capital Deposited: £10,000 + (£100 × 120) = £22,000</p>
                                    <p>Compound Interest Earned: £9,180.20</p>
                                    <p className="text-sky-400 font-bold">Future Account Value: £31,180.20</p>
                                </div>
                                <p className="text-sm">
                                    <strong>Outcome:</strong> Thanks to monthly compounding, James gains over <strong>£9,180</strong> in risk-free guaranteed interest, transforming £22,000 in personal savings into over £31,180.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 5. Common Mistakes */}
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Common Compounding Mistakes to Avoid</h2>
                        <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm">
                            <li><strong className="text-white">Delaying the Starting Date:</strong> Time is the single most critical exponent in compounding. Waiting just five years to begin investing can reduce your final retirement nest egg by upwards of 30% to 40%.</li>
                            <li><strong className="text-white">Withdrawing Dividends Early:</strong> Cashing out annual dividends rather than automatically reinvesting them disrupts the exponential curve, reducing compound growth back to linear growth.</li>
                            <li><strong className="text-white">Overlooking Expense Ratios and High Fees:</strong> A seemingly small 1.5% annual financial management fee can consume more than 25% of your total lifetime portfolio gains over a 30-year horizon.</li>
                            <li><strong className="text-white">Ignoring Inflationary Drag:</strong> If your investments earn 5% nominal returns while consumer inflation runs at 3.5%, your real purchasing power growth is only 1.5% annually.</li>
                            <li><strong className="text-white">Expecting Fixed, Volatility-Free Equities:</strong> Stock market indices average 8% to 10% over multi-decade spans, but actual annual returns fluctuate widely (-15% one year, +24% the next). Stay invested through downturns.</li>
                        </ul>
                    </div>

                    {/* 6. 5 FAQs */}
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">5 Frequently Asked Questions (FAQs)</h2>
                        <div className="space-y-4">
                            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                                <h3 className="font-bold text-white text-base mb-1">1. What is the difference between APR and APY?</h3>
                                <p className="text-sm text-slate-300">
                                    APR (Annual Percentage Rate) reflects the simple annual interest rate without compounding. APY (Annual Percentage Yield) accounts for the frequency of compounding during the year, showing the true effective annual return.
                                </p>
                            </div>

                            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                                <h3 className="font-bold text-white text-base mb-1">2. What is the "Rule of 72" in personal finance?</h3>
                                <p className="text-sm text-slate-300">
                                    The Rule of 72 is a mental shortcut to estimate how many years it will take to double your money. Divide 72 by your annual interest rate. For example, at an 8% return rate, your investment doubles approximately every 9 years (72 ÷ 8 = 9).
                                </p>
                            </div>

                            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                                <h3 className="font-bold text-white text-base mb-1">3. Does compounding more frequently (daily vs. monthly) produce much more money?</h3>
                                <p className="text-sm text-slate-300">
                                    While more frequent compounding always yields higher returns, the difference between monthly and daily compounding on retail balances is typically less than 0.1% due to the mathematical limits of continuous compounding (Euler's number e).
                                </p>
                            </div>

                            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                                <h3 className="font-bold text-white text-base mb-1">4. Can compound interest work negatively against me?</h3>
                                <p className="text-sm text-slate-300">
                                    Yes. High-interest debt (such as credit cards carrying 20% to 28% APR) compounds against you. If you pay only the minimum balance, compounding interest can double your debt in just a few years.
                                </p>
                            </div>

                            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                                <h3 className="font-bold text-white text-base mb-1">5. Are compound interest earnings subject to tax?</h3>
                                <p className="text-sm text-slate-300">
                                    In taxable brokerage or savings accounts, earned interest and dividends are subject to capital gains or income taxes annually. Utilizing tax-advantaged accounts (such as a 401(k), Roth IRA, or UK ISA) allows your returns to compound completely tax-free.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 7. Related Calculators (Internal Links) */}
                    <div className="space-y-4 pt-4 border-t border-slate-700/60">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Related Calculators (Internal Links)</h2>
                        <p className="text-sm text-slate-300 mb-4">
                            Explore our complementary wealth management and financial projection calculators:
                        </p>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <Link to="/financial/sip-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">SIP Calculator &rarr;</span>
                                <span className="text-xs text-slate-400">Calculate wealth created through monthly systematic mutual fund deposits.</span>
                            </Link>
                            <Link to="/financial/savings-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Savings Goal Calculator &rarr;</span>
                                <span className="text-xs text-slate-400">Determine exact monthly contributions required to reach a target sum.</span>
                            </Link>
                            <Link to="/financial/retirement-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Retirement Calculator &rarr;</span>
                                <span className="text-xs text-slate-400">Model long-term nest egg targets and safe post-retirement withdrawal rates.</span>
                            </Link>
                            <Link to="/financial/mortgage-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Mortgage Calculator &rarr;</span>
                                <span className="text-xs text-slate-400">Estimate monthly home loan repayments and total interest commitments.</span>
                            </Link>
                            <Link to="/financial/loan-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Loan EMI Calculator &rarr;</span>
                                <span className="text-xs text-slate-400">Calculate personal and commercial installment loan repayment schedules.</span>
                            </Link>
                        </div>
                    </div>

                </section>

            </div>
        </>
    );
};

export default CompoundInterestCalculator;

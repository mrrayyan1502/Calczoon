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
import { Car, DollarSign, Calculator, Percent, Clock } from 'lucide-react';

const AutoLoanCalculator = () => {
  const [vehiclePrice, setVehiclePrice] = useState('28000');
  const [downPayment, setDownPayment] = useState('4000');
  const [tradeInValue, setTradeInValue] = useState('2000');
  const [interestRate, setInterestRate] = useState('5.5');
  const [loanTermMonths, setLoanTermMonths] = useState('60');
  const [salesTaxRate, setSalesTaxRate] = useState('6');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const calculateAutoLoan = (e) => {
    if (e) e.preventDefault();

    const price = parseFloat(vehiclePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const trade = parseFloat(tradeInValue) || 0;
    const apr = parseFloat(interestRate) || 0;
    const months = parseInt(loanTermMonths, 10) || 60;
    const taxRate = parseFloat(salesTaxRate) || 0;

    if (price <= 0) {
      setResult({ error: "Please enter a valid vehicle purchase price." });
      return;
    }

    const salesTaxAmount = price * (taxRate / 100);
    const taxablePrice = price + salesTaxAmount;
    const netFinancedAmount = taxablePrice - down - trade;

    if (netFinancedAmount <= 0) {
      setResult({
        monthlyPayment: '0.00',
        totalFinanced: '0.00',
        totalInterest: '0.00',
        totalCost: (down + trade).toFixed(2),
        salesTax: salesTaxAmount.toFixed(2)
      });
      return;
    }

    const monthlyRate = apr / 100 / 12;
    let monthlyPayment = 0;

    if (monthlyRate === 0) {
      monthlyPayment = netFinancedAmount / months;
    } else {
      monthlyPayment = (netFinancedAmount * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayments = monthlyPayment * months;
    const totalInterest = totalPayments - netFinancedAmount;
    const totalVehicleCost = price + salesTaxAmount + totalInterest;

    const calcResult = {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalFinanced: netFinancedAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalCost: totalVehicleCost.toFixed(2),
      salesTax: salesTaxAmount.toFixed(2)
    };

    setResult(calcResult);

    saveCalculation({
      type: 'Auto Loan',
      inputs: { vehiclePrice, downPayment, tradeInValue, interestRate, loanTermMonths },
      result: {
        Monthly: `${getCurrencySymbol()}${calcResult.monthlyPayment}`,
        Financed: `${getCurrencySymbol()}${calcResult.totalFinanced}`,
        Interest: `${getCurrencySymbol()}${calcResult.totalInterest}`
      }
    });
  };

  const faqItems = [
    {
      question: "How is an auto loan monthly payment calculated?",
      answer: "An auto loan payment is determined by the net financed amount (vehicle price plus sales tax minus down payment and trade-in value), the annual interest rate (APR) divided by 12 months, and the total loan term in months using standard amortization mathematics."
    },
    {
      question: "What is a good loan term for a new or used car?",
      answer: "Financial experts recommend 48 to 60 months (4 to 5 years) for new cars, and 36 to 48 months for used cars. While 72 or 84-month loans offer lower monthly payments, they result in significantly higher overall interest and risk negative equity (owing more than the car is worth)."
    },
    {
      question: "How does my down payment affect my car loan?",
      answer: "Every dollar you put down directly reduces the principal amount you need to borrow. A 10% to 20% down payment reduces your monthly payment, lowers your total interest paid, and prevents you from becoming upside-down on your auto loan."
    },
    {
      question: "Does this car loan calculator include sales tax and dealership fees?",
      answer: "Yes, this calculator includes an explicit Sales Tax field so you can model the exact out-the-door price. Additional dealer documentation fees can be added directly to the Vehicle Price."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Auto Loan & Car Finance Calculator",
    "description": "Calculate monthly car loan payments, total interest, sales tax, and out-the-door financing costs with trade-in and down payment options.",
    "applicationCategory": "FinanceApplication",
    "applicationSubCategory": "Auto Loan Calculator",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/financial/auto-loan-calculator",
    "browserRequirements": "Requires JavaScript.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
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
        title="Auto Loan Calculator: Estimate Car Payments, APR & Total Interest"
        description="Free Auto Loan Calculator. Compute monthly car finance payments, total interest, dealer sales tax, and trade-in deductions. Accurate 2026 car financing tool."
        canonicalUrl="/financial/auto-loan-calculator"
        schema={[webAppSchema, faqPageSchema]}
        keywords={['auto loan calculator', 'car payment calculator', 'vehicle finance calculator', 'car loan amortization', 'car EMI calculator']}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Auto Loan & Car Finance Calculator"
          description="Calculate your monthly car payment, total interest charges, and total out-the-door vehicle costs based on price, down payment, trade-in, and loan terms."
          icon={<Car className="w-8 h-8 text-emerald-400" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white text-xl">Vehicle Financing Inputs</CardTitle>
                    <CardDescription className="text-slate-400">Enter your vehicle pricing and loan parameters</CardDescription>
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
                <form onSubmit={calculateAutoLoan} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehiclePrice" className="text-slate-300">Vehicle Price ({getCurrencySymbol()})</Label>
                      <Input
                        id="vehiclePrice"
                        type="number"
                        value={vehiclePrice}
                        onChange={(e) => setVehiclePrice(e.target.value)}
                        placeholder="28000"
                        className="bg-slate-950 border-slate-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salesTaxRate" className="text-slate-300">Sales Tax Rate (%)</Label>
                      <Input
                        id="salesTaxRate"
                        type="number"
                        step="0.1"
                        value={salesTaxRate}
                        onChange={(e) => setSalesTaxRate(e.target.value)}
                        placeholder="6.0"
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="downPayment" className="text-slate-300">Down Payment ({getCurrencySymbol()})</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        placeholder="4000"
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tradeInValue" className="text-slate-300">Trade-In Value ({getCurrencySymbol()})</Label>
                      <Input
                        id="tradeInValue"
                        type="number"
                        value={tradeInValue}
                        onChange={(e) => setTradeInValue(e.target.value)}
                        placeholder="2000"
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="interestRate" className="text-slate-300">Interest Rate / APR (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.01"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="5.5"
                        className="bg-slate-950 border-slate-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loanTermMonths" className="text-slate-300">Loan Term (Months)</Label>
                      <select
                        id="loanTermMonths"
                        value={loanTermMonths}
                        onChange={(e) => setLoanTermMonths(e.target.value)}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-md text-white"
                      >
                        <option value="24">24 Months (2 Years)</option>
                        <option value="36">36 Months (3 Years)</option>
                        <option value="48">48 Months (4 Years)</option>
                        <option value="60">60 Months (5 Years)</option>
                        <option value="72">72 Months (6 Years)</option>
                        <option value="84">84 Months (7 Years)</option>
                      </select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 mt-4">
                    Calculate Auto Payment
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
                        <p className="text-slate-400 text-sm">Estimated Monthly Payment</p>
                        <p className="text-4xl md:text-5xl font-extrabold text-emerald-400 my-1">
                          {getCurrencySymbol()}{result.monthlyPayment}
                        </p>
                        <p className="text-xs text-slate-500">For {loanTermMonths} months at {interestRate}% APR</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Total Financed</p>
                          <p className="text-lg font-bold text-white">{getCurrencySymbol()}{result.totalFinanced}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Total Interest</p>
                          <p className="text-lg font-bold text-amber-400">{getCurrencySymbol()}{result.totalInterest}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Sales Tax</p>
                          <p className="text-lg font-bold text-sky-400">{getCurrencySymbol()}{result.salesTax}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">Total Out-of-Pocket</p>
                          <p className="text-lg font-bold text-white">{getCurrencySymbol()}{result.totalCost}</p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <ShareResults
                          title="Auto Loan Calculation"
                          text={`My estimated auto loan payment is ${getCurrencySymbol()}${result.monthlyPayment}/mo for ${loanTermMonths} months.`}
                          url="/financial/auto-loan-calculator"
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
        <section className="mt-12 bg-slate-900/60 rounded-xl p-8 border border-slate-800 space-y-6 text-slate-300">
          <h2 className="text-2xl font-bold text-white">How Auto Loan Calculations Work</h2>
          <p className="leading-relaxed">
            Auto loans are standard amortized installment loans. Unlike credit cards or revolving lines of credit, an auto loan has a fixed monthly repayment schedule designed to pay off both the borrowed principal and accumulated interest by the end of your term.
          </p>

          <h3 className="text-xl font-semibold text-white">The Monthly Payment Formula</h3>
          <p>
            The mathematical formula used by automotive lenders and financial institutions is:
          </p>
          <div className="bg-slate-950 p-4 rounded-lg font-mono text-center text-emerald-400 border border-slate-800">
            PMT = P × [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
          </div>
          <p className="text-sm">
            Where:
            <br />• <strong>PMT</strong> = Monthly Payment
            <br />• <strong>P</strong> = Net Financed Principal (Vehicle Price + Sales Tax − Down Payment − Trade-in)
            <br />• <strong>r</strong> = Monthly Interest Rate (Annual Rate ÷ 1200)
            <br />• <strong>n</strong> = Total Number of Months (e.g. 60)
          </p>

          <h3 className="text-xl font-semibold text-white">Worked Example: $28,000 Vehicle Purchase</h3>
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-sm space-y-2">
            <p>• <strong>Vehicle Price:</strong> $28,000</p>
            <p>• <strong>Sales Tax (6%):</strong> $1,680</p>
            <p>• <strong>Down Payment + Trade-In ($4,000 + $2,000):</strong> $6,000</p>
            <p>• <strong>Net Amount Financed:</strong> $23,680</p>
            <p>• <strong>Interest Rate:</strong> 5.5% APR over 60 Months</p>
            <p className="text-emerald-400 font-bold pt-2">• <strong>Estimated Monthly Payment:</strong> $452.48/month</p>
            <p className="text-amber-400 font-bold">• <strong>Total Interest Paid:</strong> $3,468.80 over 5 years</p>
          </div>

          <h3 className="text-xl font-semibold text-white">Tips to Lower Your Auto Financing Costs</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li><strong>Aim for 20% Down:</strong> Putting 20% down prevents you from owing more than the car is worth if you ever need to sell or refinance.</li>
            <li><strong>Keep Terms Under 60 Months:</strong> Longer 72 or 84-month terms look attractive on monthly budgets, but cost thousands more in cumulative interest.</li>
            <li><strong>Shop Lenders Before the Dealership:</strong> Getting pre-approved through a local credit union or bank gives you leverage to negotiate lower dealer APRs.</li>
          </ul>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="This auto loan calculator is provided for educational and estimation purposes only. Actual interest rates, taxes, documentation fees, and final monthly payments are established by your financing institution." />
      </div>
    </>
  );
};

export default AutoLoanCalculator;

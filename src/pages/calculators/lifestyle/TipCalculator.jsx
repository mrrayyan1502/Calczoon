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
import { Receipt } from 'lucide-react';

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('15');
  const [customTip, setCustomTip] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('1');
  const [result, setResult] = useState(null);

  const calculateTip = (e) => {
    e.preventDefault();
    
    const bill = parseFloat(billAmount);
    const tipPercent = customTip ? parseFloat(customTip) : parseFloat(tipPercentage);
    const people = parseInt(numberOfPeople, 10);

    if (isNaN(bill) || isNaN(tipPercent) || isNaN(people) || bill <= 0 || tipPercent < 0 || people < 1) {
      setResult({ error: "Please enter valid positive numbers. Number of people must be at least 1." });
      return;
    }

    const tipAmount = bill * (tipPercent / 100);
    const totalAmount = bill + tipAmount;
    const perPerson = totalAmount / people;
    const tipPerPerson = tipAmount / people;

    const newResult = {
      tipAmount: tipAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      perPerson: perPerson.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2)
    };
    
    setResult(newResult);
    saveCalculation({
      type: 'Tip',
      inputs: { billAmount, tipPercentage: tipPercent, numberOfPeople },
      result: { Total: `$${newResult.totalAmount}`, PerPerson: `$${newResult.perPerson}` }
    });
  };

  const handleTipSelection = (val) => {
    setTipPercentage(val);
    setCustomTip('');
  };

  const resetForm = () => {
    setBillAmount(''); setTipPercentage('15'); setCustomTip(''); setNumberOfPeople('1'); setResult(null);
  };

  const faqItems = [
    {
      question: "What is a standard tip percentage?",
      answer: "In the United States, a standard tip for good service at a sit-down restaurant is usually between 15% and 20%. For exceptional service, 20% or more is common."
    },
    {
      question: "Should I tip before or after tax?",
      answer: "This is a personal preference. Many people calculate their tip based on the pre-tax total, while others simply tip on the final bill amount (post-tax) for convenience."
    }
  ];

  const pageTitle = "Tip Calculator: Split Bills & Calculate Gratuity";
  const pageDescription = "Easily calculate the tip amount, total bill, and split the cost among multiple people with our free Tip Calculator.";

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} canonicalUrl="/lifestyle/tip-calculator" />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={Receipt} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white">Calculate Tip & Split Bill</CardTitle>
                <CardDescription>Enter your bill details</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={calculateTip} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="billAmount" className="text-slate-300 font-medium">Bill Amount ($)</Label>
                    <Input id="billAmount" type="number" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} placeholder="e.g., 85.50" required step="0.01" className="bg-slate-900 border-slate-700 text-xl focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl py-6" />
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium">Tip Percentage</Label>
                    <div className="flex flex-wrap gap-2">
                      {['10', '15', '18', '20', '25'].map((percent) => (
                        <Button
                          key={percent}
                          type="button"
                          variant={tipPercentage === percent && !customTip ? 'default' : 'outline'}
                          onClick={() => handleTipSelection(percent)}
                          className={`flex-1 min-w-[60px] ${tipPercentage === percent && !customTip ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-none' : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'}`}
                        >
                          {percent}%
                        </Button>
                      ))}
                    </div>
                    <div className="pt-2">
                      <Input
                        type="number"
                        placeholder="Custom Tip %"
                        value={customTip}
                        onChange={(e) => {
                          setCustomTip(e.target.value);
                          setTipPercentage('');
                        }}
                        className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfPeople" className="text-slate-300 font-medium">Number of People</Label>
                    <Input id="numberOfPeople" type="number" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} placeholder="e.g., 2" required min="1" className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                      Calculate
                    </Button>
                    <Button type="button" variant="secondary" onClick={resetForm} className="h-12 rounded-xl">Reset</Button>
                  </div>
                </form>
              </CardContent>
              {result && !result.error && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-800/30 border-t border-slate-700/40">
                  <div className="w-full space-y-4">
                    <h3 className="text-lg font-bold text-slate-300">Bill Summary</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                       <div className="text-center bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                        <p className="text-slate-300 text-sm font-medium">Total Bill (With Tip)</p>
                        <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                          ${result.totalAmount}
                        </p>
                      </div>
                      <div className="text-center bg-slate-900/60 p-6 rounded-2xl border border-emerald-900/50">
                        <p className="text-slate-300 text-sm font-medium">Total Per Person</p>
                        <p className="text-3xl font-extrabold text-emerald-400">
                          ${result.perPerson}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 flex justify-between">
                        <span className="text-slate-300">Total Tip Amount</span>
                        <span className="font-semibold text-slate-200">${result.tipAmount}</span>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 flex justify-between">
                        <span className="text-slate-300">Tip Per Person</span>
                        <span className="font-semibold text-slate-200">${result.tipPerPerson}</span>
                      </div>
                    </div>
                    
                    <ShareResults title="Tip & Bill Split Calculation" text={`Total bill: $${result.totalAmount}. Per person: $${result.perPerson}. Calculated using CalcZoon!`} url="/lifestyle/tip-calculator" />
                  </div>
                </CardFooter>
              )}
              {result && result.error && (
                <CardFooter className="p-6 bg-slate-800/30 border-t border-slate-700/40 text-center">
                  <p className="text-destructive text-center w-full">{result.error}</p>
                </CardFooter>
              )}
            </Card>
          </div>
          <aside className="lg:col-span-1 space-y-6">
            <RelatedTools category="lifestyle" />
          </aside>
        </div>
        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="This calculator provides a mathematical split for convenience. Always verify the math before making payments." />
      </div>
    </>
  );
};

export default TipCalculator;

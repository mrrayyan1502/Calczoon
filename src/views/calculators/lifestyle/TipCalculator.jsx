'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
import { Receipt, BookOpen, CheckCircle, HelpCircle, ArrowRight, Globe, Users } from 'lucide-react';

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('18');
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
      tipPerPerson: tipPerPerson.toFixed(2),
      billPerPerson: (bill / people).toFixed(2)
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
    setBillAmount('');
    setTipPercentage('18');
    setCustomTip('');
    setNumberOfPeople('1');
    setResult(null);
  };

  const faqItems = [
    {
      question: "What is considered a standard tipping percentage in the United States?",
      answer: "In the United States and Canada, standard gratuity at sit-down dining establishments typically ranges from 15% to 20%. A 15% tip reflects acceptable service, 18% is customary for attentive hospitality, and 20% or more recognizes exceptional dining care. For delivery drivers, 10% to 15% (with a $3 to $5 minimum) is standard."
    },
    {
      question: "Should tip percentages be calculated before or after sales tax?",
      answer: "Etiquette and consumer finance experts universally recommend calculating tips on the pre-tax food and beverage subtotal. Sales tax is a government statutory levy, not a service provided by hospitality staff. Tipping on post-tax totals effectively compounds tax into personal gratuity, inflating your dining cost by 1% to 2% unnecessarily."
    },
    {
      question: "What is an automatic gratuity or service charge on restaurant receipts?",
      answer: "Many restaurants automatically add an 18% to 20% 'auto-gratuity' for parties of 6 or more diners to protect waitstaff serving large tables. Always inspect your itemized bill before writing an additional tip; if an auto-gratuity is already added, you do not need to add another tip unless you wish to give extra."
    },
    {
      question: "How should group bills be divided if some diners ordered alcohol and others did not?",
      answer: "While splitting total bills evenly among all diners is simple and common, it can be unfair if alcoholic beverages or premium steaks significantly inflate the total. For substantial cost disparities, calculate each individual's pre-tax meal subtotal, apply the tip percentage proportionally to each person's food and drinks, and split shared appetizers equally."
    },
    {
      question: "Are tips expected for takeout, counter service, or coffee shops?",
      answer: "Tipping for takeout or counter service is entirely optional. While digital point-of-sale tablets commonly present 15%, 20%, or 25% prompts, counter staff are typically paid standard hourly minimum wages rather than tipped sub-minimum wage rates. Leaving $1 to $2 or 10% for custom preparation or large takeout orders is generous, but not mandatory."
    },
    {
      question: "How do tipping customs differ across Europe, Asia, and Oceania?",
      answer: "In much of continental Europe, service is included by law ('service compris'), though rounding up the bill or leaving 5% to 10% in cash for good service is appreciated. In Japan and South Korea, tipping is culturally non-existent and can be viewed as insulting. In Australia and New Zealand, staff earn living wages, so tipping is purely optional for extraordinary hospitality."
    }
  ];

  const pageTitle = "Tip Calculator: Bill Splitter & Gratuity Calculator 2026";
  const pageDescription = "Calculate restaurant tips, split bills equally among friends, and check global tipping etiquette guidelines with our free online gratuity calculator.";

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Tip Calculator",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/lifestyle/tip-calculator",
    "description": "Fast and free tip calculator and group bill splitter with custom tip rates, pre-tax advice, and international gratuity guides."
  };

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="/lifestyle/tip-calculator"
        schema={[appSchema, {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": { "@type": "Answer", text: item.answer }
          }))
        }]}
      />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={Receipt} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white">Calculate Tip & Split Bill</CardTitle>
                <CardDescription>Enter subtotal, gratuity percentage, and number of guests</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={calculateTip} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="billAmount" className="text-slate-300 font-medium">Bill Subtotal ($)</Label>
                    <Input
                      id="billAmount"
                      type="number"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      placeholder="e.g., 85.50"
                      required
                      step="0.01"
                      className="bg-slate-900 border-slate-700 text-xl focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl py-6"
                    />
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
                        placeholder="Or enter custom tip % (e.g., 22)"
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
                    <Label htmlFor="numberOfPeople" className="text-slate-300 font-medium">Number of People Sharing Bill</Label>
                    <Input
                      id="numberOfPeople"
                      type="number"
                      value={numberOfPeople}
                      onChange={(e) => setNumberOfPeople(e.target.value)}
                      placeholder="e.g., 2"
                      required
                      min="1"
                      className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                      Calculate Tip & Split
                    </Button>
                    <Button type="button" variant="secondary" onClick={resetForm} className="h-12 rounded-xl">Reset</Button>
                  </div>
                </form>
              </CardContent>
              {result && !result.error && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-800/30 border-t border-slate-700/40">
                  <div className="w-full space-y-4">
                    <h3 className="text-lg font-bold text-slate-300">Payment Breakdown</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="text-center bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                        <p className="text-slate-300 text-sm font-medium">Total Bill (With Tip)</p>
                        <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                          ${result.totalAmount}
                        </p>
                      </div>
                      <div className="text-center bg-slate-900/60 p-6 rounded-2xl border border-emerald-900/50">
                        <p className="text-slate-300 text-sm font-medium">Each Person Pays</p>
                        <p className="text-3xl font-extrabold text-emerald-400">
                          ${result.perPerson}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 flex justify-between items-center text-xs md:text-sm">
                        <span className="text-slate-400">Total Tip</span>
                        <span className="font-semibold text-slate-200">${result.tipAmount}</span>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 flex justify-between items-center text-xs md:text-sm">
                        <span className="text-slate-400">Meal Share</span>
                        <span className="font-semibold text-slate-200">${result.billPerPerson}</span>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 flex justify-between items-center text-xs md:text-sm">
                        <span className="text-slate-400">Tip Share</span>
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
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" /> Gratuity Quick Rates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-300 font-mono">
                <div className="pb-2 border-b border-slate-700/60">
                  <p className="text-emerald-400 font-bold">15% Standard:</p>
                  <p className="text-slate-300 mt-0.5">Average, adequate table hospitality.</p>
                </div>
                <div className="pb-2 border-b border-slate-700/60">
                  <p className="text-sky-400 font-bold">18% Recommended:</p>
                  <p className="text-slate-300 mt-0.5">Prompt, friendly, and attentive service.</p>
                </div>
                <div>
                  <p className="text-amber-400 font-bold">20% Premium:</p>
                  <p className="text-slate-300 mt-0.5">Exceptional dining experience or large parties.</p>
                </div>
              </CardContent>
            </Card>
            <RelatedTools category="lifestyle" />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,200 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10 mb-12">
          {/* Section 1: What is a Tip Calculator */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Receipt className="text-emerald-400 w-7 h-7" /> What is a Tip Calculator & The Social Economics of Hospitality
            </h2>
            <p className="text-base md:text-lg">
              A <strong>tip calculator</strong> is an indispensable personal finance and dining utility engineered to compute exact service gratuities, determine total post-meal balances, and equitably apportion aggregate expenses among dining party members. Gratuity, historically rooted in 17th-century European coffeehouses under the acronym &quot;To Insure Promptitude,&quot; has evolved into a vital pillar of the modern service economy.
            </p>
            <p>
              In countries such as the United States and Canada, hospitality compensation frameworks frequently feature a statutory &quot;tip credit,&quot; permitting employers to pay waitstaff a reduced direct cash wage with the explicit legal assumption that customer tips bridge the gap to exceed minimum wage standards. Consequently, accurate gratuity calculation represents not merely an exercise in polite dining etiquette, but a direct economic contribution to the livelihoods of service professionals.
            </p>
          </div>

          {/* Section 2: Mathematical Formulas & Splitting Equations */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Mathematical Formulas & Splitting Equations
            </h2>
            <p>
              Our tip and bill-splitting calculator executes the following core algebraic equations:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4 font-mono text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-800/40 space-y-2">
                <p className="text-emerald-400 font-bold uppercase tracking-wider">Formula 1: Direct Gratuity Amount</p>
                <p className="text-white text-sm font-semibold">Tip = Subtotal × (Tip % ÷ 100)</p>
                <p className="text-slate-400">Calculates total dollar gratuity based on the food and beverage pre-tax subtotal.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-sky-800/40 space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider">Formula 2: Total Aggregate Payment</p>
                <p className="text-white text-sm font-semibold">Total Cost = Subtotal + Tip + Statutory Tax</p>
                <p className="text-slate-400">Determines the final charge tendered on credit cards or settleable in cash.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-800/40 space-y-2">
                <p className="text-amber-400 font-bold uppercase tracking-wider">Formula 3: Individual Per-Person Allocation</p>
                <p className="text-white text-sm font-semibold">Cost Per Person = Total Cost ÷ Diners (N)</p>
                <p className="text-slate-400">Evenly divides gross liability across dinner party guests without fractional rounding loss.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-purple-800/40 space-y-2">
                <p className="text-purple-400 font-bold uppercase tracking-wider">Formula 4: Proportional Split (Unequal Orders)</p>
                <p className="text-white text-sm font-semibold">Diner Share = Diner Items × (1 + Tip % ÷ 100)</p>
                <p className="text-slate-400">Applies gratuity proportionally when some diners order expensive wine or specialty items.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Global Tipping Conventions & Etiquette */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <Globe className="text-sky-400 w-6 h-6" /> International Tipping Etiquette Across the Globe
            </h2>
            <p>
              Tipping expectations vary dramatically across borders. Traveling abroad without understanding local gratuity norms can lead to awkward interactions or offense:
            </p>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                <p className="font-bold text-white">United States & Canada (15% – 22%)</p>
                <p className="text-slate-400 text-xs mt-1">
                  Customary and expected in sit-down restaurants, cocktail bars, taxi cabs, and food delivery. Service staff depend on tips for the majority of their take-home compensation.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                <p className="font-bold text-white">United Kingdom & European Union (Service Included / 5% – 10%)</p>
                <p className="text-slate-400 text-xs mt-1">
                  Most European restaurants include taxes and service fees (&quot;service compris&quot;). In London and Paris, receipts may include an optional 12.5% discretionary service charge. Leaving small cash change is polite, but high North American tips are uncommon.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                <p className="font-bold text-white">Japan & South Korea (No Tipping / Culturally Inappropriate)</p>
                <p className="text-slate-400 text-xs mt-1">
                  In Japan, outstanding customer service is considered an intrinsic professional standard. Leaving extra cash on a table can cause confusion, and servers may chase you out the door to return forgotten money.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                <p className="font-bold text-white">Australia & New Zealand (Optional Round-Up)</p>
                <p className="text-slate-400 text-xs mt-1">
                  Hospitality staff receive comprehensive award wages. Rounding up to the nearest $5 or leaving 5%–10% for exceptional dining is welcomed, but there is zero social obligation.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Real-World Numerical Worked Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Real-World Numerical Worked Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg">
                  <CheckCircle className="w-5 h-5" /> Example 1: 4-Person Restaurant Bill with 18% Tip
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> Four coworkers share lunch. The pre-tax food subtotal is $140.00, and local sales tax is 8.5% ($11.90), making the register subtotal $151.90. They choose an 18% tip on the food subtotal.
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Gratuity (on $140): 140 × 0.18 = $25.20</p>
                  <p>2. Gross Bill: $140.00 + $11.90 + $25.20 = $177.10</p>
                  <p>3. Cost Per Person: $177.10 ÷ 4 = $44.275</p>
                  <p className="text-emerald-400 font-bold">Each Person Pays: $44.28 (Rounded)</p>
                </div>
                <p className="text-xs text-slate-400">
                  By calculating gratuity on the pre-tax $140.00 instead of post-tax $151.90, the group saves $2.14 while fairly rewarding the server.
                </p>
              </div>

              <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-lg">
                  <Users className="w-5 h-5" /> Example 2: Fair Split with Unequal Alcoholic Drinks
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> Two friends dine together. Diner A orders an entrée and two glasses of wine ($50.00). Diner B orders a salad and iced tea ($20.00). Total food and drink is $70.00 with a 20% tip ($14.00).
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Even Split: ($70 + $14) ÷ 2 = $42.00 each</p>
                  <p>2. Diner B would overpay: $42.00 vs their $20 meal!</p>
                  <p>3. Proportional: Diner A pays $50 × 1.20 = $60.00</p>
                  <p className="text-sky-400 font-bold">Diner B pays $20 × 1.20 = $24.00</p>
                </div>
                <p className="text-xs text-slate-400">
                  Proportional calculation ensures Diner B isn&apos;t penalized for their friend&apos;s expensive drinks.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Common Calculation Mistakes & Pitfalls */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Common Calculation Mistakes & Pitfalls to Avoid
            </h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-amber-500 space-y-1">
                <p className="font-bold text-white">1. Double Tipping on Automatic Gratuity Clauses</p>
                <p>
                  Many restaurants automatically include an 18% or 20% tip for parties of 5 or 6 or more diners. Diners frequently fail to inspect the itemized receipt and unknowingly write another 20% on the signature line, resulting in an inadvertent 40% total tip.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-rose-500 space-y-1">
                <p className="font-bold text-white">2. Conflating Delivery Fees with Driver Gratuity</p>
                <p>
                  Major third-party food delivery apps frequently charge a $4 to $6 &quot;Delivery Fee&quot; or &quot;Service Fee.&quot; In almost all jurisdictions, this fee is retained by the technology platform to fund logistics and insurance; it is not remitted to the driver. Always tip delivery drivers separately.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-sky-500 space-y-1">
                <p className="font-bold text-white">3. Tipping on Post-Tax Totals</p>
                <p>
                  Calculating 20% on a bill that includes 10% sales tax means you are paying gratuity on government tax revenue. Always apply your tip percentage to the food and beverage subtotal.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: In-Depth FAQ Component */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <HelpCircle className="text-sky-400 w-7 h-7" /> Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-sm">
              Explore thorough answers to everyday tipping dilemmas, splitting etiquette, and service rate expectations.
            </p>
          </div>

          <Faq items={faqItems} className="mt-4" />

          {/* Section 7: Academic References & Companion Tools */}
          <div className="space-y-4 pt-6 border-t border-slate-700/60">
            <h3 className="text-xl font-bold text-white">Hospitality Research, References & Companion Tools</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consumer gratuity norms and tipping behaviors are studied extensively by the <em>Cornell University Center for Hospitality Research</em> and governed by statutory labor frameworks under the <strong>Fair Labor Standards Act (FLSA) Tip Regulations</strong> administered by the U.S. Department of Labor.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/lifestyle/discount-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Discount Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/math/percentage-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Percentage Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/financial/currency-converter" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Currency Converter <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/lifestyle/fuel-cost-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Fuel Cost & Trip Splitter <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <Disclaimer text="This tip calculator provides mathematical splitting for personal convenience. When splitting group bills, communicate with your fellow diners and adjust for personal preferences or alcohol consumption." />
      </div>
    </>
  );
};

export default TipCalculator;

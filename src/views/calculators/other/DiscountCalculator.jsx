'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Seo from '@/components/Seo';
import { Tag, BookOpen, CheckCircle, HelpCircle, ArrowRight, ShoppingBag, Receipt, Percent } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { saveCalculation } from '@/lib/history';
import ShareResults from '@/components/ShareResults';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [additionalDiscount, setAdditionalDiscount] = useState('');
  const [taxPercent, setTaxPercent] = useState('');
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const calculateDiscount = (e) => {
    e.preventDefault();
    const price = parseFloat(originalPrice);
    const d1 = parseFloat(discountPercent) || 0;
    const d2 = parseFloat(additionalDiscount) || 0;
    const tax = parseFloat(taxPercent) || 0;

    if (isNaN(price) || price <= 0 || d1 < 0 || d2 < 0 || tax < 0 || d1 > 100 || d2 > 100) {
      toast({ title: "Invalid Input", description: "Please enter valid numerical values.", variant: "destructive" });
      return;
    }

    // First discount
    const firstDiscountAmount = price * (d1 / 100);
    const priceAfterFirst = price - firstDiscountAmount;

    // Additional stackable discount (applied sequentially to already reduced price)
    const secondDiscountAmount = priceAfterFirst * (d2 / 100);
    const priceBeforeTax = priceAfterFirst - secondDiscountAmount;

    // Tax calculation
    const taxAmount = priceBeforeTax * (tax / 100);
    const finalPrice = priceBeforeTax + taxAmount;
    
    const totalSavings = price - priceBeforeTax;
    const effectiveDiscountPercent = ((totalSavings / price) * 100).toFixed(1);

    const newResult = {
      savings: totalSavings.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      discountedPrice: priceBeforeTax.toFixed(2),
      firstDiscount: firstDiscountAmount.toFixed(2),
      secondDiscount: secondDiscountAmount.toFixed(2),
      effectiveDiscountPercent
    };

    setResult(newResult);
    saveCalculation({
      type: 'Discount',
      inputs: { originalPrice: price, discount: d1, additionalDiscount: d2, tax },
      result: { finalPrice: newResult.finalPrice, totalSavings: newResult.savings }
    });
    toast({ title: "Discount Calculated!", description: `You save $${newResult.savings}!` });
  };

  const resetForm = () => {
    setOriginalPrice('');
    setDiscountPercent('');
    setAdditionalDiscount('');
    setTaxPercent('');
    setResult(null);
  };

  const pageTitle = "Discount Calculator: Calculate Percentage Off & Sale Savings 2026";
  const pageDescription = "Calculate final sale price, stackable promo coupons, total dollar savings, and sales tax. Features step-by-step sequential discount equations.";
  const canonicalUrl = "/lifestyle/discount-calculator";

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Discount Calculator",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "url": "https://calczoon.com/lifestyle/discount-calculator",
    "description": "Comprehensive sale price and stackable promo discount calculator with sales tax computation and itemized receipts."
  };

  const faqItems = [
    {
      question: "Why aren't stackable promotional discounts added together directly?",
      answer: "In commercial retail, secondary or stackable coupons are applied sequentially to the already discounted subtotal, not to the original sticker price. For example, if an item has a 30% sale discount and you apply an extra 20% coupon, the 20% is subtracted from the 70% remaining balance (20% of 70% = 14%), resulting in an effective total discount of 44% (30% + 14%), rather than 50%."
    },
    {
      question: "Is statutory sales tax calculated before or after the store discount is deducted?",
      answer: "For standard retailer store discounts, clearance markdowns, and store-issued promotional coupons, statutory sales tax is assessed strictly on the final discounted purchase price (the amount actually tendered). However, in certain US states, manufacturer coupons funded by third-party producers are taxed on the pre-coupon price because the store is reimbursed for the coupon value."
    },
    {
      question: "How do I calculate the original price of an item if I only know the sale price?",
      answer: "To determine the original pre-discount price (reverse percentage), divide the sale price by (1 - (Discount % / 100)). For example, if a winter coat is on sale for $120 after a 25% discount, calculate: $120 / (1 - 0.25) = $120 / 0.75 = $160.00 original sticker price."
    },
    {
      question: "What is the mathematical difference between retail profit margin and markup?",
      answer: "Markup represents the percentage added to the wholesale cost to establish the retail selling price: Markup % = ((Selling Price - Cost) / Cost) * 100. Profit Margin represents the percentage of the selling price that is profit: Margin % = ((Selling Price - Cost) / Selling Price) * 100. A 50% markup on a $100 item produces a $150 price, which yields a 33.3% profit margin."
    },
    {
      question: "How does a 'Buy One, Get One 50% Off' (BOGO 50%) deal translate into percentage savings?",
      answer: "When purchasing two equally priced items under a 'Buy One, Get One 50% Off' promotion, you pay 100% for the first item and 50% for the second, totaling 150% of a single unit price for two units. Dividing by two reveals an effective average discount of 25% off each item (1 - (1.5 / 2) = 0.25 = 25%). If the second item is free (BOGO Free), the effective discount is exactly 50% across both units."
    },
    {
      question: "Can I use this calculator for business wholesale bulk purchase discounts?",
      answer: "Yes! Input your wholesale list price, enter your primary trade discount in the Discount field, and input any additional cash payment settlement discount (such as 2% for net 10 payment terms) in the Additional Discount field to determine net payable supplier invoices."
    }
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
        canonicalUrl={canonicalUrl}
        schema={[appSchema, faqSchema]}
      />

      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={Tag} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white">Calculate Sales Price & Savings</CardTitle>
                <CardDescription>Enter original price, primary discount, stackable promo coupons, and sales tax</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={calculateDiscount} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="originalPrice" className="text-slate-300 font-medium">Original Sticker Price ($)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="e.g., 149.99"
                        required
                        className="bg-slate-900 border-slate-700 text-white rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discountPercent" className="text-slate-300 font-medium">Primary Discount (%)</Label>
                      <Input
                        id="discountPercent"
                        type="number"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                        placeholder="e.g., 25"
                        required
                        step="any"
                        className="bg-slate-900 border-slate-700 text-white rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="additionalDiscount" className="text-slate-300 font-medium">Additional Stacked Coupon (%, Optional)</Label>
                      <Input
                        id="additionalDiscount"
                        type="number"
                        value={additionalDiscount}
                        onChange={(e) => setAdditionalDiscount(e.target.value)}
                        placeholder="e.g., 10"
                        step="any"
                        className="bg-slate-900 border-slate-700 text-white rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxPercent" className="text-slate-300 font-medium">Sales Tax Rate (%, Optional)</Label>
                      <Input
                        id="taxPercent"
                        type="number"
                        step="0.01"
                        value={taxPercent}
                        onChange={(e) => setTaxPercent(e.target.value)}
                        placeholder="e.g., 8.25"
                        className="bg-slate-900 border-slate-700 text-white rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                    >
                      Calculate Net Price
                    </Button>
                    <Button type="button" variant="secondary" onClick={resetForm} className="h-12 rounded-xl">
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>

              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 bg-slate-800/30 border-t border-slate-700/40 space-y-6"
                >
                  {/* Glowing Price Results Header */}
                  <div className="flex flex-col items-center text-center p-6 bg-slate-950/50 rounded-2xl border border-slate-800">
                    <p className="text-sm text-slate-300 font-medium mb-1">Final Total Price Tendered</p>
                    <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 mb-2">
                      ${result.finalPrice}
                    </p>
                    <p className="text-sm font-semibold text-emerald-400">
                      You Save: ${result.savings} ({result.effectiveDiscountPercent}% effective discount)
                    </p>
                  </div>

                  {/* Itemized Digital Receipt */}
                  <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 font-mono text-sm space-y-3 text-slate-300 max-w-md mx-auto relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-sky-500"></div>
                    <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2 mb-2">
                      <span>Receipt Description</span>
                      <span>Amount</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Original Sticker Price</span>
                      <span>${originalPrice}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400">
                      <span>Primary Discount ({discountPercent}%)</span>
                      <span>-${result.firstDiscount}</span>
                    </div>
                    {parseFloat(additionalDiscount) > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Stacked Coupon ({additionalDiscount}%)</span>
                        <span>-${result.secondDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-slate-800/50 pt-2 font-semibold">
                      <span>Discounted Subtotal</span>
                      <span>${result.discountedPrice}</span>
                    </div>
                    {parseFloat(taxPercent) > 0 && (
                      <div className="flex justify-between text-amber-400">
                        <span>Sales Tax ({taxPercent}%)</span>
                        <span>+${result.taxAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-white border-t-2 border-dashed border-slate-700/50 pt-3 text-base">
                      <span>FINAL AMOUNT DUE</span>
                      <span className="text-emerald-400">${result.finalPrice}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center pt-2">
                    <ShareResults 
                      title="My Discount Savings" 
                      text={`I saved $${result.savings} (${result.effectiveDiscountPercent}%) on a $${originalPrice} purchase using CalcZoon's Discount Calculator!`} 
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
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" /> Shopping Math Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <div>
                  <h4 className="font-semibold text-white mb-1">Stackable Discounts</h4>
                  <p className="text-slate-300 text-xs">If a retailer offers &quot;30% off clearance plus an extra 20% loyalty coupon&quot;, discounts apply sequentially. The net discount is 44%, not 50%.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Sales Tax Impact</h4>
                  <p className="text-slate-300 text-xs">Store discounts reduce taxable subtotal, saving you extra money in sales tax compared to full-price purchases.</p>
                </div>
              </CardContent>
            </Card>

            <RelatedTools category="lifestyle" />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,200 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10 mb-12">
          {/* Section 1: What is a Discount Calculator */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <ShoppingBag className="text-emerald-400 w-7 h-7" /> What is a Discount Calculator & The Mechanics of Retail Pricing
            </h2>
            <p className="text-base md:text-lg">
              A <strong>discount calculator</strong> is a specialized commercial computation utility designed to calculate precise markdown amounts, determine net register sales prices, compute effective compound savings across multiple stacked promotional vouchers, and incorporate statutory sales taxes. In modern retail merchandising, price discounts represent the primary mechanism for inventory turnover, clearance liquidation, and consumer promotional campaigns.
            </p>
            <p>
              Consumers frequently encounter intricate pricing strategies—including seasonal markdown percentages, VIP club rewards, flash coupons, and clearance blowouts. However, psychological pricing structures can be deceptive: multiple stacked discounts do not add together arithmetically, and sales taxes vary significantly based on whether promotions are merchant-funded or manufacturer-reimbursed. Using a verified computational engine ensures total clarity before tendering payment at the cash register.
            </p>
          </div>

          {/* Section 2: Mathematical Markdown Formulas & Compound Stacking */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Mathematical Formulas: Single, Stacked & Reverse Markdown Equations
            </h2>
            <p>
              Our discount computational engine processes single-tier markdowns, multi-tier sequential coupons, and tax obligations according to established financial algebra:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4 font-mono text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-800/40 space-y-2">
                <p className="text-emerald-400 font-bold uppercase tracking-wider">Formula 1: Single Markdown</p>
                <p className="text-white text-sm font-semibold">Sale Price = Original Price × (1 − (D₁ ÷ 100))</p>
                <p className="text-slate-400">Total Dollar Savings = Original Price × (D₁ ÷ 100).</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-sky-800/40 space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider">Formula 2: Sequential Stacked Discount</p>
                <p className="text-white text-sm font-semibold">Price₂ = Original × (1 − D₁/100) × (1 − D₂/100)</p>
                <p className="text-slate-400">Applies secondary coupon to the already discounted subtotal, not the original sticker price.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-800/40 space-y-2">
                <p className="text-amber-400 font-bold uppercase tracking-wider">Formula 3: Effective Compound Discount Rate</p>
                <p className="text-white text-sm font-semibold">D_eff = [1 − ((1 − D₁/100) × (1 − D₂/100))] × 100</p>
                <p className="text-slate-400">Reveals true total percentage off original sticker price (e.g., 30% + 20% = 44%).</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-purple-800/40 space-y-2">
                <p className="text-purple-400 font-bold uppercase tracking-wider">Formula 4: Reverse Original Price</p>
                <p className="text-white text-sm font-semibold">Original Price = Sale Price ÷ (1 − (D ÷ 100))</p>
                <p className="text-slate-400">Reconstructs pre-sale MSRP from discounted register receipts or clearance tags.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Step-by-Step Practical Usage Guide */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Step-by-Step Guide: How to Calculate Your Final Purchase Price
            </h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-white">Input the Item Sticker Price:</strong> Enter the original manufacturer suggested retail price (MSRP) or shelf tag value.
              </li>
              <li>
                <strong className="text-white">Enter the Primary Store Discount:</strong> Input the advertised clearance or storewide percentage discount (e.g., 25 for 25% off).
              </li>
              <li>
                <strong className="text-white">Add Stackable Coupons (If Applicable):</strong> If you possess a newsletter sign-up promo, member loyalty code, or bonus voucher (e.g., an extra 10% off), enter it in the additional coupon field.
              </li>
              <li>
                <strong className="text-white">Incorporate Local Sales Tax:</strong> Enter your local municipal or state sales tax percentage to preview the exact total charged to your credit card.
              </li>
              <li>
                <strong className="text-white">Review the Itemized Digital Receipt:</strong> Click Calculate to review your itemized breakdown displaying intermediate subtotals, tax surcharges, and aggregate dollar savings.
              </li>
            </ol>
          </div>

          {/* Section 4: Real-World Numerical Worked Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Real-World Numerical Worked Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg">
                  <CheckCircle className="w-5 h-5" /> Example 1: Electronics Black Friday Deal with Member Coupon
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> A 4K television with an MSRP of $600.00 is featured on a 30% Black Friday markdown. An enrolled VIP member applies an additional 15% coupon at checkout, with 8.0% local sales tax.
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Primary 30% Cut: $600 × 0.30 = $180 savings ($420 subtotal)</p>
                  <p>2. Stacked 15% Coupon: $420 × 0.15 = $63 savings ($357 subtotal)</p>
                  <p>3. Total Savings: $180 + $63 = $243.00 (40.5% effective discount)</p>
                  <p>4. Sales Tax: $357 × 0.08 = $28.56</p>
                  <p className="text-emerald-400 font-bold">Final Register Total: $357.00 + $28.56 = $385.56</p>
                </div>
                <p className="text-xs text-slate-400">
                  Notice the effective discount is 40.5%, rather than 45% (30% + 15%).
                </p>
              </div>

              <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-lg">
                  <Receipt className="w-5 h-5" /> Example 2: Reconstructing Original Price from Clearance Tag
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> A shopper discovers a designer wool jacket marked down to $135.00 with a red sticker stating &quot;Take 40% Off Marked Price.&quot; What was the original retail value?
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Complement Ratio: 100% − 40% = 60% (0.60)</p>
                  <p>2. Reverse Formula: $135.00 ÷ 0.60</p>
                  <p>3. Original MSRP: $225.00</p>
                  <p className="text-sky-400 font-bold">Total Dollar Savings: $225.00 − $135.00 = $90.00</p>
                </div>
                <p className="text-xs text-slate-400">
                  Confirms the shopper saved an exact $90.00 off the manufacturer list price.
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
                <p className="font-bold text-white">1. The Additive Stacking Fallacy (Assuming 40% + 10% = 50%)</p>
                <p>
                  The most pervasive consumer math error is assuming that consecutive percentage cuts add together linearly. Stacking a 40% discount with an additional 10% discount yields a 46% effective discount, not 50%. The second coupon operates solely on the 60% remaining balance.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-rose-500 space-y-1">
                <p className="font-bold text-white">2. Calculating Sales Tax on the Pre-Discount MSRP</p>
                <p>
                  Unless using certain manufacturer-reimbursed coupons in specific tax jurisdictions, sales tax applies strictly to the net discounted subtotal. Computing tax on the original sticker price results in overpaying sales tax.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-sky-500 space-y-1">
                <p className="font-bold text-white">3. Misapplying Markups vs Discounts</p>
                <p>
                  Taking 20% off an item and then adding 20% does not restore the original price. A 20% discount on $100 drops it to $80; adding 20% to $80 brings it to only $96 ($80 × 1.20).
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
              Answers to common shopping questions regarding retail discounts, coupon stacking, and sales taxes.
            </p>
          </div>

          <Faq items={faqItems} className="mt-4" />

          {/* Section 7: Academic References & Companion Tools */}
          <div className="space-y-4 pt-6 border-t border-slate-700/60">
            <h3 className="text-xl font-bold text-white">Commerce Regulations, References & Companion Tools</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Retail promotional claims, deceptive price comparisons, and clearance discount disclosures are regulated by the <strong>Federal Trade Commission (FTC) Guides Against Deceptive Pricing (16 CFR Part 233)</strong> and consumer protection statutes across state and national jurisdictions.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/math/percentage-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Percentage Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/lifestyle/tip-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Tip & Gratuity Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/financial/currency-converter" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Currency Converter <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/financial/vat-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                VAT & Sales Tax Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <Disclaimer text="This discount calculator provides mathematical estimates for consumer budgeting and retail planning. Local sales tax laws, manufacturer coupon terms, and individual store return policies may affect final register totals." />
      </div>
    </>
  );
};

export default DiscountCalculator;

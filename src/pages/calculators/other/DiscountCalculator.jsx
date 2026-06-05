import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tag, Percent, ShoppingBag } from 'lucide-react';
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

    // Additional stackable discount
    const secondDiscountAmount = priceAfterFirst * (d2 / 100);
    const priceBeforeTax = priceAfterFirst - secondDiscountAmount;

    // Tax calculation
    const taxAmount = priceBeforeTax * (tax / 100);
    const finalPrice = priceBeforeTax + taxAmount;
    
    const totalSavings = price - priceBeforeTax;

    const newResult = {
      savings: totalSavings.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      discountedPrice: priceBeforeTax.toFixed(2),
      firstDiscount: firstDiscountAmount.toFixed(2),
      secondDiscount: secondDiscountAmount.toFixed(2)
    };

    setResult(newResult);
    saveCalculation({
      type: 'Discount',
      inputs: { originalPrice: price, discount: d1, additionalDiscount: d2, tax },
      result: { finalPrice: newResult.finalPrice, totalSavings: newResult.savings }
    });
    toast({ title: "Discount Calculated!", description: `You save $${newResult.savings}!` });
  };

  const pageTitle = "Discount Calculator: Calculate Sale Savings & Tax";
  const pageDescription = "Calculate the final price of an item during a sale. Our free Discount Calculator supports additional stackable discounts and sales tax computations.";
  const canonicalUrl = "https://calczoon.com/lifestyle/discount-calculator";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title="Discount Calculator" description={pageDescription} icon={Tag} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white">Calculate Sales Price & Savings</CardTitle>
                <CardDescription>Enter the item's original price and discount details</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={calculateDiscount} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="originalPrice" className="text-slate-300 font-medium">Original Price ($)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="e.g., 99.99"
                        required
                        className="bg-slate-900 border-slate-700 text-white rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discountPercent" className="text-slate-300 font-medium">Discount (%)</Label>
                      <Input
                        id="discountPercent"
                        type="number"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                        placeholder="e.g., 20"
                        required
                        className="bg-slate-900 border-slate-700 text-white rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="additionalDiscount" className="text-slate-300 font-medium">Additional Discount (%, Optional)</Label>
                      <Input
                        id="additionalDiscount"
                        type="number"
                        value={additionalDiscount}
                        onChange={(e) => setAdditionalDiscount(e.target.value)}
                        placeholder="e.g., 5"
                        className="bg-slate-900 border-slate-700 text-white rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxPercent" className="text-slate-300 font-medium">Sales Tax (%, Optional)</Label>
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

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                  >
                    Calculate Sale Price
                  </Button>
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
                    <p className="text-sm text-slate-400 font-medium mb-1">Final Price After Sale</p>
                    <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 mb-2">
                      ${result.finalPrice}
                    </p>
                    <p className="text-sm font-semibold text-emerald-400">
                      You Save: ${result.savings} ({((parseFloat(result.savings) / parseFloat(originalPrice)) * 100).toFixed(0)}%)
                    </p>
                  </div>

                  {/* Itemized Receipt (Visual Wow Factor) */}
                  <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800/60 font-mono text-sm space-y-3 text-slate-300 max-w-md mx-auto relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-sky-500"></div>
                    <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2 mb-2">
                      <span>Receipt Description</span>
                      <span>Amount</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Original Price</span>
                      <span>${originalPrice}</span>
                    </div>
                    <div className="flex justify-between text-red-400">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-${result.firstDiscount}</span>
                    </div>
                    {parseFloat(additionalDiscount) > 0 && (
                      <div className="flex justify-between text-red-400">
                        <span>Add. Discount ({additionalDiscount}%)</span>
                        <span>-${result.secondDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-slate-800/50 pt-2">
                      <span>Subtotal</span>
                      <span>${result.discountedPrice}</span>
                    </div>
                    {parseFloat(taxPercent) > 0 && (
                      <div className="flex justify-between text-slate-400">
                        <span>Sales Tax ({taxPercent}%)</span>
                        <span>+${result.taxAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-white border-t-2 border-dashed border-slate-700/50 pt-3 text-base">
                      <span>FINAL TOTAL</span>
                      <span>${result.finalPrice}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center pt-2">
                    <ShareResults 
                      title="My Discount Calculator Results" 
                      text={`I saved $${result.savings} on a $${originalPrice} item using the Discount Calculator on Calczoon!`} 
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
                <CardTitle className="text-white">Tips on Sales Shopping</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <div>
                  <h4 className="font-semibold text-white mb-1">Stackable Discounts</h4>
                  <p className="text-slate-400 text-xs">If a store offers an "extra 10% off sale items", the discounts are typically calculated sequentially (not added together). E.g., 20% off plus an extra 10% off equals a total discount of 28% off the original price, not 30%.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Sales Tax Impact</h4>
                  <p className="text-slate-400 text-xs">Sales tax is applied to the final discounted subtotal, not the original price, saving you even more money in taxes.</p>
                </div>
              </CardContent>
            </Card>

            <RelatedTools />
          </aside>
        </div>
      </div>
    </>
  );
};

export default DiscountCalculator;

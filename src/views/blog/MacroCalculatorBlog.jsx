'use client';

import React from 'react';
import RelatedBlogs from '@/components/blog/RelatedBlogs';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, TrendingDown, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Seo from '@/components/Seo';

const MacroCalculatorBlog = () => {
    const pageTitle = "3 Ways to Use a Macro Calculator for Weight Loss";
    const pageDescription = "Learn how to effectively use a macro calculator to create a sustainable and effective weight loss plan with these 3 simple strategies. Calculate your macros today!";
    const canonicalUrl = "/blog/macro-calculator-guide";

    return (
        <>
            <Seo
                title={pageTitle}
                description={pageDescription}
                canonicalUrl={canonicalUrl}
            />
            <motion.article
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="bg-gradient-to-b from-slate-900 to-slate-800 text-white"
            >
                <div className="relative">
                    <img
                        alt="A person planning meals with a notebook and fresh vegetables on a kitchen counter"
                        className="w-full h-64 md:h-96 object-cover"
                        src="https://images.unsplash.com/photo-1570645314284-8b28f8fac62e"
                        width="800"
                        height="400"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-4xl md:text-5xl font-extrabold text-center text-white"
                        >
                            3 Ways to Use a Macro Calculator for Weight Loss
                        </motion.h1>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><Target className="mr-3" />1. Establish Your Baseline with a Accurate Calorie Deficit</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">Before you can calculate your macros, you need to know how many calories you should be consuming. The most effective way to start is by determining your Total Daily Energy Expenditure (TDEE) and then creating a sustainable calorie deficit.</p>
                        <ul className="list-disc list-inside space-y-2 text-slate-300">
                            <li><strong className="text-white">Calculate Your TDEE:</strong> Use our <Link to="/health/tdee-calculator" className="text-primary hover:underline">free TDEE calculator</Link> to estimate your daily maintenance calories.</li>
                            <li><strong className="text-white">Apply a Moderate Deficit:</strong> Reduce your maintenance calories by 15-20% (typically 300-500 calories per day) to encourage fat loss without slowing your metabolic rate.</li>
                        </ul>
                        <p className="mt-4 text-slate-300">This ensures your macro plan is built on a foundation of a sensible calorie deficit for effective weight loss.</p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><Utensils className="mr-3" />2. Prioritize Protein with a 'High Protein' or 'Cutting' Profile</h2>
                        <p className="text-slate-300 mb-6">Protein is crucial for weight loss. It keeps you feeling full, helps preserve muscle mass, and has a higher thermic effect (meaning your body burns more calories digesting it).</p>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                            <p className="font-bold text-white">How to Do It:</p>
                            <p className="text-slate-300">Enter your calorie deficit number into the macro calculator and select the "High Protein" or "Cutting" goal. Both of these profiles allocate a higher percentage of your daily calories to protein, supporting your weight loss efforts.</p>
                        </div>
                    </section>
                    
                     <section>
                        <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><TrendingDown className="mr-3" />3. Calculate Your Macros Now</h2>
                        <p className="text-slate-300 mb-6">Theory is great, but action is better. Use our dedicated Macro Calculator to find your personalized macro targets for weight loss. Enter your calorie goal and choose a profile to get started!</p>
                        <div className="my-8 bg-slate-900/80 border border-slate-700 rounded-2xl p-8 text-center shadow-xl">
                          <h3 className="text-2xl font-bold text-white mb-3">Free Macronutrient Calculator</h3>
                          <p className="text-slate-300 max-w-xl mx-auto mb-6">Calculate optimal grams of protein, carbs, and healthy fats tailored to your weight loss or muscle building goals.</p>
                          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg">
                            <Link to="/health/macro-calculator" className="inline-flex items-center gap-2">
                              Open Macro Calculator <ArrowRight className="w-5 h-5" />
                            </Link>
                          </Button>
                        </div>
                    </section>

                    <div className="text-center border-t border-slate-700 pt-10">
                        <h3 className="text-2xl font-bold text-white mb-4">Start Your Journey Today</h3>
                        <p className="text-slate-300 mb-6">Tracking macros can be a powerful way to achieve your weight loss goals without feeling deprived. Use these strategies and our free tools to build a healthier relationship with food.</p>
                        <Button asChild size="lg">
                            <Link to="/tools">Explore All Health Tools</Link>
                        </Button>
                    </div>
                </div>
              <RelatedBlogs category="health" />
      </motion.article>
        </>
    );
};

export default MacroCalculatorBlog;

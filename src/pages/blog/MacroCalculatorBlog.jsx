import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, TrendingDown, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MacroCalculator from '@/pages/calculators/health/MacroCalculator';
import Seo from '@/components/Seo';

const MacroCalculatorBlog = () => {
    const pageTitle = "3 Ways to Use a Macro Calculator for Weight Loss | Calczoon";
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
                     src="https://images.unsplash.com/photo-1570645314284-8b28f8fac62e" />
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.h1 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-4xl md:text-6xl font-bold text-center text-white p-4"
                        >
                            3 Ways to Use a Macro Calculator for Weight Loss
                        </motion.h1>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto p-6 md:p-8 space-y-12">
                    <p className="text-xl text-slate-300 leading-relaxed">
                        Counting macros (protein, carbs, and fat) can be a game-changer for weight loss, offering a more flexible and sustainable approach than restrictive dieting. A macro calculator is your best friend on this journey, but how do you use it effectively? Here are three simple strategies to get started.
                    </p>

                    <section>
                        <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><Target className="mr-3" />1. Establish Your Calorie Baseline</h2>
                        <p className="text-slate-300 mb-6">Before you can set your macros, you need to know your daily calorie needs. This is your Total Daily Energy Expenditure (TDEE). Start here:</p>
                        <ul className="list-disc list-inside space-y-2 mt-4 text-slate-300">
                            <li><strong>Calculate Your TDEE:</strong> Use our <Link to="/health/tdee-calculator" className="text-primary hover:underline">TDEE Calculator</Link> to find your maintenance calories.</li>
                            <li><strong>Create a Deficit:</strong> For weight loss, subtract 300-500 calories from your TDEE. This is the number you'll use in the macro calculator.</li>
                        </ul>
                        <p className="mt-4 text-slate-300">This ensures your macro plan is built on a foundation of a sensible calorie deficit for effective weight loss.</p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><Utensils className="mr-3" />2. Prioritize Protein with a 'High Protein' or 'Cutting' Profile</h2>
                        <p className="text-slate-300 mb-6">Protein is crucial for weight loss. It keeps you feeling full, helps preserve muscle mass, and has a higher thermic effect (meaning your body burns more calories digesting it).</p>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                            <p className="font-bold text-white">How to Do It:</p>
                            <p className="text-slate-300">Enter your calorie deficit number into the macro calculator below and select the "High Protein" or "Cutting" goal. Both of these profiles allocate a higher percentage of your daily calories to protein, supporting your weight loss efforts.</p>
                        </div>
                    </section>
                    
                     <section>
                        <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><TrendingDown className="mr-3" />3. Embed the Tool & Calculate Your Macros Now</h2>
                        <p className="text-slate-300 mb-6">Theory is great, but action is better. Use the embedded calculator right here to find your personalized macro targets for weight loss. Enter your calorie goal and choose a profile to get started!</p>
                        <div className="my-8">
                          <MacroCalculator />
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
            </motion.article>
        </>
    );
};

export default MacroCalculatorBlog;
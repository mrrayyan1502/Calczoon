'use client';

import React, { Suspense } from 'react';
import RelatedBlogs from '@/components/blog/RelatedBlogs';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, TrendingDown, Target, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Seo from '@/components/Seo';

const MacroCalculatorGuide = () => {
    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://calczoon.com/blog/how-to-use-macro-calculator-for-weight-loss"
        },
        "headline": "A Beginner's Guide to Using a Macro Calculator for Fitness",
        "description": "Learn how to use a macro calculator to create a sustainable plan for weight loss or muscle gain. Our guide simplifies macros (protein, carbs, fat) for you.",
        "image": "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
        "author": {
            "@type": "Organization",
            "name": "CalcZoon"
        },
        "publisher": {
            "@type": "Organization",
            "name": "CalcZoon",
            "logo": {
                "@type": "ImageObject",
                "url": "https://calczoon.com/calczoon-logo.png"
            }
        },
        "datePublished": "2025-11-19"
    };

    return (
        <>
            <Seo
                title="A Beginner's Guide to Using a Macro Calculator for Fitness"
                description="Learn how to use a macro calculator to create a sustainable plan for weight loss or muscle gain. Our guide simplifies macros (protein, carbs, fat) for you."
                canonicalUrl="/blog/macro-calculator-guide"
                schema={blogSchema}
            />
            <Suspense fallback={<div>Loading...</div>}>
            <motion.article 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-b from-slate-900 to-slate-800 text-white"
            >
              <div className="relative">
                  <img
                      alt="A variety of healthy foods like fruits, vegetables, and nuts arranged on a table"
                      className="w-full h-64 md:h-96 object-cover"
                      src="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
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
                          A Beginner's Guide to Using a Macro Calculator
                      </motion.h1>
                  </div>
              </div>
                  <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
                      <section>
                          <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><Utensils className="mr-3" />What Are Macros? The Basics</h2>
                          <p className="text-slate-300 leading-relaxed">"Macros" is short for <strong className="text-white">macronutrients</strong>, the three main categories of nutrients your body needs in large amounts to survive and thrive: carbohydrates, protein, and fat. Each macro plays a unique role in your body and provides a specific number of calories per gram:</p>
                          <ul className="list-disc list-inside mt-4 space-y-2 text-slate-300">
                              <li><strong className="text-white">Protein (4 calories/gram):</strong> The building block of muscles, organs, and hormones. Essential for muscle repair, growth, and keeping you full.</li>
                              <li><strong className="text-white">Carbohydrates (4 calories/gram):</strong> Your body's primary and preferred source of energy, especially for high-intensity exercise and brain function.</li>
                              <li><strong className="text-white">Fat (9 calories/gram):</strong> Vital for hormone production, nutrient absorption, and long-term energy storage. It's the most calorie-dense macro.</li>
                          </ul>
                          <p className="mt-4 text-slate-300">Tracking macros (also known as "flexible dieting" or "If It Fits Your Macros") goes beyond simple calorie counting. It ensures that the calories you consume come from the right sources to support your specific goals, whether that's losing fat, building muscle, or improving athletic performance.</p>
                      </section>

                      <section>
                          <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><Target className="mr-3" />Step 1: Determine Your Calorie Needs</h2>
                          <p className="text-slate-300 mb-4">Before calculating your macro breakdown, you need a starting point: your daily calorie target. This begins with your <strong className="text-white">Total Daily Energy Expenditure (TDEE)</strong>, the number of calories you burn each day.</p>
                          <p className="text-slate-300">To find your TDEE, use our <Link to="/health/tdee-calculator" className="text-primary hover:underline font-semibold">Free TDEE Calculator</Link>. Once you have your TDEE:</p>
                          <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300">
                              <li><strong className="text-white">For Weight Loss:</strong> Subtract 300-500 calories from your TDEE to create a sustainable deficit.</li>
                              <li><strong className="text-white">For Muscle Gain:</strong> Add 200-400 calories to your TDEE to create a slight surplus.</li>
                              <li><strong className="text-white">For Maintenance:</strong> Eat at your TDEE level.</li>
                          </ul>
                      </section>

                      <section>
                          <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><TrendingDown className="mr-3" />Step 2: Choose Your Macro Ratio</h2>
                          <p className="text-slate-300">Once you have your calorie target, you can determine your macro split. Different goals require different ratios of protein, carbs, and fat.</p>
                          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4 my-4">
                              <p><strong className="text-white">For Weight Loss (Cutting):</strong> Prioritize protein. A higher protein intake keeps you full, boosts metabolism, and protects muscle mass. A good starting ratio is <strong className="text-white">40% Protein, 30% Carbs, 30% Fat</strong>.</p>
                              <p><strong className="text-white">For Muscle Gain (Bulking):</strong> You need plenty of protein for muscle synthesis and enough carbs to fuel intense workouts. A common ratio is <strong className="text-white">35% Protein, 40% Carbs, 25% Fat</strong>.</p>
                              <p><strong className="text-white">For Maintenance:</strong> A balanced approach works well. A standard ratio is <strong className="text-white">30% Protein, 40% Carbs, 30% Fat</strong>.</p>
                          </div>
                      </section>
                      
                       <section>
                          <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><Zap className="mr-3" />Step 3: Calculate Your Macros & Take Action</h2>
                          <p className="text-slate-300 mb-6">Now, let's put it all together. Use our dedicated Macro Calculator to find your personalized macro targets in grams for protein, carbs, and fats.</p>
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
                          <h3 className="text-2xl font-bold text-white mb-4">Start Your Fitness Journey Today</h3>
                          <p className="text-slate-300 mb-6">Tracking macros empowers you to eat flexibly while still achieving your goals. Use this guide and our free tools to build a sustainable and effective nutrition plan.</p>
                          <Button asChild size="lg">
                              <Link to="/health-fitness-calculators">Explore More Health Tools</Link>
                          </Button>
                      </div>
                  </div>
                <RelatedBlogs category="health" />
      </motion.article>
            </Suspense>
        </>
    );
};

export default MacroCalculatorGuide;

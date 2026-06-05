import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, TrendingDown, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MacroCalculator from '@/pages/calculators/health/MacroCalculator';
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
            "name": "Calczoon"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Calczoon",
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
                title="Macro Calculator for Fitness: A Beginner's Guide | Calczoon"
                description="Learn how to use a macro calculator to create a sustainable plan for weight loss or muscle gain. Our guide simplifies macros (protein, carbs, fat) for you."
                canonicalUrl="/blog/how-to-use-macro-calculator-for-weight-loss"
                schema={blogSchema}
            />
            <Suspense fallback={<div/>}>
              <motion.article
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="bg-slate-900 text-white"
              >
                  <div className="relative">
                      <img   
                          alt="A person planning meals with a notebook, fresh vegetables, and other healthy foods on a kitchen counter"
                          className="w-full h-64 md:h-96 object-cover"
                          width="1920" height="768"
                          src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1920" />
                      <div className="absolute inset-0 bg-black/50"></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                          <motion.h1 
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                              className="text-4xl md:text-5xl font-extrabold text-center text-white"
                          >
                              How to Use a Macro Calculator for Fitness
                          </motion.h1>
                          <p className="mt-4 text-lg text-slate-200 text-center max-w-2xl">A Simple Guide to Setting Your Protein, Carbs, and Fat for Weight Loss or Muscle Gain</p>
                      </div>
                  </div>

                  <div className="max-w-3xl mx-auto p-6 md:p-8 space-y-12 prose prose-invert prose-lg max-w-none text-slate-300">
                      <p className="text-xl leading-relaxed">
                          Counting macros (macronutrients) can feel like a complex puzzle, but it's one of the most effective ways to achieve your fitness goals. Whether you want to lose fat, build muscle, or simply maintain a healthy weight, understanding your macros is key. This guide will demystify the process and show you exactly how to use a <Link to="/health/macro-calculator" className="text-primary hover:underline font-semibold">macro calculator for fitness</Link>.
                      </p>

                      <section>
                          <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><Target className="mr-3" />Step 1: Determine Your Daily Calorie Goal</h2>
                          <p>Before you can calculate your macros, you must know your daily calorie needs. This is your <strong className="text-white">Total Daily Energy Expenditure (TDEE)</strong>, the number of calories your body burns in a day.</p>
                          <ul className="list-disc list-inside space-y-2 mt-4">
                              <li><strong className="text-white">For Weight Loss:</strong> You need a calorie deficit. A good starting point is 300-500 calories below your TDEE. This promotes fat loss while preserving muscle.</li>
                              <li><strong className="text-white">For Muscle Gain (Bulking):</strong> You need a calorie surplus. Aim for 200-400 calories above your TDEE to fuel muscle growth while minimizing fat gain.</li>
                          </ul>
                          <p className="mt-4">If you don't know your TDEE, use our <Link to="/health/tdee-calculator" className="text-primary hover:underline font-semibold">free TDEE calculator online</Link> to find your personalized number. This is the most crucial first step.</p>
                      </section>

                      <section>
                          <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><Utensils className="mr-3" />Step 2: Choose a Macro Split Based on Your Goal</h2>
                          <p>Once you have your calorie target, you can determine your macro split. Different goals require different ratios of protein, carbs, and fat.</p>
                          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
                              <p><strong className="text-white">For Weight Loss (Cutting):</strong> Prioritize protein. A higher protein intake keeps you full, boosts metabolism, and protects muscle mass. A good starting ratio is <strong className="text-white">40% Protein, 30% Carbs, 30% Fat</strong>.</p>
                              <p><strong className="text-white">For Muscle Gain (Bulking):</strong> You need plenty of protein for muscle synthesis and enough carbs to fuel intense workouts. A common ratio is <strong className="text-white">35% Protein, 40% Carbs, 25% Fat</strong>.</p>
                              <p><strong className="text-white">For Maintenance:</strong> A balanced approach works well. A standard ratio is <strong className="text-white">30% Protein, 40% Carbs, 30% Fat</strong>.</p>
                          </div>
                      </section>
                      
                       <section>
                          <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><Zap className="mr-3" />Step 3: Calculate Your Macros & Take Action</h2>
                          <p>Now, let's put it all together. Use the embedded calculator below to find your personalized macro targets. Enter your calorie goal from Step 1 and select the diet plan that matches your goal from Step 2.</p>
                          <div className="my-8 bg-slate-900/50 border border-slate-700 rounded-xl p-4 md:p-8 not-prose">
                            <Suspense fallback={<div>Loading Calculator...</div>}>
                                <MacroCalculator />
                            </Suspense>
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
              </motion.article>
            </Suspense>
        </>
    );
};

export default MacroCalculatorGuide;
'use client';

import React, { useState } from 'react';
import Seo from '@/components/Seo';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { Dumbbell } from 'lucide-react';
import Faq from '@/components/Faq';
import TDEE_Intro from '@/components/calculators/tdee/TDEE_Intro';
import TDEE_CalculatorForm from '@/components/calculators/tdee/TDEE_CalculatorForm';
import TDEE_Results from '@/components/calculators/tdee/TDEE_Results';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { saveCalculation } from '@/lib/history';

const TDEECalculator = () => {
    const [result, setResult] = useState(null);

    const handleCalculation = (data) => {
        setResult(data);
        if (data) {
          saveCalculation({ type: 'TDEE', inputs: data.inputs, result: { TDEE: data.tdee.maintenance.toFixed(0) } });
        }
    };
    
    const pageTitle = "Free TDEE Calculator: Estimate Daily Calorie Burn 2026";
    const pageDescription = "Calculate your Total Daily Energy Expenditure (TDEE) and BMR online. Find your daily maintenance calories for weight loss, muscle gain, or maintenance.";
    const canonicalUrl = "/health/tdee-calculator";

    const faqItems = [
      {
        question: "What is the fundamental difference between BMR and TDEE?",
        answer: "Basal Metabolic Rate (BMR) is the bare minimum energy your body requires to stay alive at complete rest (breathing, cellular repair, heartbeat). Total Daily Energy Expenditure (TDEE) accounts for all daily movement, digestion, walking, and physical exercise."
      },
      {
        question: "How large of a calorie deficit is safe for fat loss?",
        answer: "A deficit of 300 to 500 calories below your maintenance TDEE is universally recommended. This produces a safe, sustainable fat loss rate of 0.35 to 0.5 kg (0.75 to 1 lb) per week without causing muscle wasting or hormonal disruption."
      },
      {
        question: "What is NEAT and how does it affect my TDEE?",
        answer: "NEAT (Non-Exercise Activity Thermogenesis) encompasses all energy expended outside of sleeping, eating, and sports—such as pacing, typing, climbing stairs, and fidgeting. NEAT can vary by up to 800 calories between individuals of the same weight!"
      },
      {
        question: "Why has my weight loss stalled even though I eat below my TDEE?",
        answer: "Plateaus are commonly caused by temporary water retention (cortisol from dieting), unmeasured weekend caloric splurges, or decreased unconscious NEAT movement. Weigh yourself daily and compare weekly averages over three to four weeks."
      },
      {
        question: "How should I distribute my TDEE into macronutrients?",
        answer: "Once your calorie target is determined, use our Macro Calculator to split your calories into protein (1.6 to 2.2g per kg of bodyweight to preserve muscle), healthy fats (20% to 30% of total calories), and carbohydrates for workout performance."
      },
      {
        question: "Should I eat back the calories burned during workouts?",
        answer: "No, you should not eat back workout calories. Your TDEE activity multiplier already incorporates your weekly exercise energy expenditure into your baseline maintenance figure. Adding tracked exercise calories back on top will erase your planned caloric deficit."
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
                schema={[faqSchema]}
            />
            <div className="w-full max-w-7xl mx-auto py-8 px-4">
                <PageHeader
                    title="TDEE Calculator"
                    description="Calculate your Total Daily Energy Expenditure (TDEE) to discover your daily maintenance calories, crucial for managing your weight effectively."
                    icon={Dumbbell}
                />
                
                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2 space-y-8">
                        <TDEE_Intro />
                        <TDEE_CalculatorForm onCalculate={handleCalculation} />
                        {result && (
                          <>
                            <TDEE_Results result={result} />
                            <div className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 flex items-start gap-3 text-left">
                              <div className="text-xs text-slate-300 leading-relaxed">
                                <strong className="text-emerald-400 block mb-1">Recommended Fitness Resource: Caloric Deficit &amp; Protein Intake</strong>
                                To ensure fat loss rather than muscle loss during a caloric deficit, maintain a high protein intake of 1.6 to 2.2 grams per kilogram of body weight combined with progressive resistance training.
                              </div>
                            </div>
                          </>
                        )}
                    </div>
                    <aside className="lg:col-span-1 space-y-6">
                        <RelatedTools />
                    </aside>
                </div>

                {/* Comprehensive Content Section - 500 to 800 Words */}
                <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10">
                    
                    {/* 1. What is a TDEE Calculator? */}
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">What is a TDEE Calculator?</h2>
                        <p className="text-base md:text-lg">
                            A <strong>Total Daily Energy Expenditure (TDEE) Calculator</strong> is a foundational nutritional science tool that calculates the total number of calories your body burns over a complete 24-hour period. While most people are familiar with baseline metabolic rates, your actual daily energy expenditure is composed of four distinct metabolic components: your Basal Metabolic Rate (BMR), the Thermic Effect of Food (TEF), Non-Exercise Activity Thermogenesis (NEAT), and Exercise Activity Thermogenesis (EAT).
                        </p>
                        <p>
                            Knowing your exact TDEE eliminates the guesswork from personal health and fitness. By discovering your true daily caloric maintenance number, you gain the precise baseline required to structure a sustainable fat loss caloric deficit, a muscle-building caloric surplus, or a steady long-term weight maintenance regimen.
                        </p>
                    </div>

                    {/* 2. How it works / formula */}
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">How it Works / Formula</h2>
                        <p>
                            Our calculator utilizes the scientifically validated <strong>Mifflin-St Jeor Equation</strong>—recognized by the Academy of Nutrition and Dietetics as the most accurate standard for the general adult population. The calculation proceeds in two distinct phases: first determining your Basal Metabolic Rate (BMR), and then multiplying that figure by an empirical Physical Activity Level (PAL) coefficient.
                        </p>
                        <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 font-mono text-sm space-y-3">
                            <p className="text-emerald-400 font-bold uppercase tracking-wider text-xs">Mifflin-St Jeor BMR Equation</p>
                            <p className="text-white text-xs md:text-sm">Men: BMR = (10 × weight in kg) + (6.25 × height in cm) – (5 × age in years) + 5</p>
                            <p className="text-white text-xs md:text-sm">Women: BMR = (10 × weight in kg) + (6.25 × height in cm) – (5 × age in years) – 161</p>
                        </div>
                        <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 text-sm">
                            <p className="font-semibold text-white mb-2">Activity Multipliers (PAL):</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                <li className="bg-slate-800/80 p-2 rounded border border-slate-700"><strong>Sedentary (Desk Job, little movement):</strong> BMR × 1.2</li>
                                <li className="bg-slate-800/80 p-2 rounded border border-slate-700"><strong>Light Activity (1–2 workouts/week):</strong> BMR × 1.375</li>
                                <li className="bg-slate-800/80 p-2 rounded border border-slate-700"><strong>Moderate Activity (3–5 workouts/week):</strong> BMR × 1.55</li>
                                <li className="bg-slate-800/80 p-2 rounded border border-slate-700"><strong>Heavy Activity (6–7 heavy workouts/week):</strong> BMR × 1.725</li>
                            </ul>
                        </div>
                    </div>

                    {/* 3. How to use it (steps) */}
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">How to Use It (Steps)</h2>
                        <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
                            <li><strong className="text-white">Step 1: Enter Biological Sex & Age:</strong> Hormonal differences and muscle mass distribution affect basal expenditure, while metabolic rate decreases slightly with age.</li>
                            <li><strong className="text-white">Step 2: Enter Body Weight and Height:</strong> Input your morning barefoot height and scale weight in either Metric (kg/cm) or Imperial (lbs/inches).</li>
                            <li><strong className="text-white">Step 3: Select Realistic Activity Level:</strong> Be conservative. If you sit at an office desk for 8 hours and exercise moderately three times a week, select "Light" or "Moderate" rather than "Very Active."</li>
                            <li><strong className="text-white">Step 4: Press "Calculate Calories":</strong> Review your daily maintenance calories, along with tailored calorie targets for mild fat loss (-250 kcal), standard fat loss (-500 kcal), and muscle gain (+300 kcal).</li>
                        </ol>
                    </div>

                    {/* 4. 2 Solved Real-Life Examples with Numbers */}
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">2 Solved Real-Life Examples with Numbers</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700/60 space-y-3">
                                <h3 className="text-lg font-bold text-emerald-400">Example 1: Male Office Worker Seeking Fat Loss</h3>
                                <p className="text-sm">
                                    <strong>Profile:</strong> Marcus, 32 years old, <strong>82 kg</strong>, <strong>180 cm</strong> tall, works a desk job but lifts weights 3 times a week (Moderate Activity = 1.55 multiplier).
                                </p>
                                <div className="bg-slate-950 p-3.5 rounded font-mono text-xs text-slate-300 space-y-1">
                                    <p>BMR: (10 × 82) + (6.25 × 180) – (5 × 32) + 5 = 820 + 1125 – 160 + 5 = 1,790 kcal</p>
                                    <p>TDEE: 1,790 × 1.55 = <strong>2,775 kcal/day</strong></p>
                                    <p className="text-emerald-400 font-bold">Fat Loss Target (-500 kcal): 2,275 kcal/day</p>
                                </div>
                                <p className="text-sm">
                                    <strong>Outcome:</strong> Marcus consumes 2,275 calories daily to lose approximately 0.5 kg (1 lb) of fat per week sustainably while preserving lean muscle mass.
                                </p>
                            </div>

                            <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700/60 space-y-3">
                                <h3 className="text-lg font-bold text-sky-400">Example 2: Female Professional Maintaining Weight</h3>
                                <p className="text-sm">
                                    <strong>Profile:</strong> Elena, 27 years old, <strong>62 kg</strong>, <strong>166 cm</strong> tall, walks daily and attends yoga twice weekly (Light Activity = 1.375 multiplier).
                                </p>
                                <div className="bg-slate-950 p-3.5 rounded font-mono text-xs text-slate-300 space-y-1">
                                    <p>BMR: (10 × 62) + (6.25 × 166) – (5 × 27) – 161 = 620 + 1037.5 – 135 – 161 = 1,361.5 kcal</p>
                                    <p>TDEE: 1,361.5 × 1.375 = <strong>1,872 kcal/day</strong></p>
                                    <p className="text-sky-400 font-bold">Maintenance Target: 1,870 kcal/day</p>
                                </div>
                                <p className="text-sm">
                                    <strong>Outcome:</strong> By consuming approximately 1,870 calories per day, Elena maintains stable body weight and sustained daily cognitive energy.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 5. Common Mistakes */}
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Common Mistakes When Using TDEE</h2>
                        <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm">
                            <li><strong className="text-white">Overestimating Daily Physical Activity:</strong> Exercising for 45 minutes does not offset 9 hours of continuous sedentary desk sitting. Selecting an excessively high multiplier leads to calorie targets that stall weight loss.</li>
                            <li><strong className="text-white">"Eating Back" Exercise Calories:</strong> Fitness watches and gym machines notoriously overestimate calorie burn by 30% to 50%. Your TDEE activity multiplier already accounts for workout energy expenditure.</li>
                            <li><strong className="text-white">Ignoring Liquid Calories and Cooking Oils:</strong> A single tablespoon of olive oil contains 120 calories, and specialty coffees can add 300+ unaccounted calories, wiping out a 500-calorie deficit.</li>
                            <li><strong className="text-white">Failing to Recalculate After Weight Loss:</strong> As your body mass drops, your BMR decreases because a smaller body requires less energy to operate. Recalculate your TDEE every 4 to 5 kilograms of weight change.</li>
                            <li><strong className="text-white">Imposing Severe Starvation Deficits:</strong> Slashing calories by 1,000+ kcal triggers adaptive thermogenesis, lethargy, muscle catabolism, and rebound binge eating. Aim for a moderate 300–500 calorie deficit.</li>
                        </ul>
                    </div>

                    {/* Static HTML Reference Benchmark Table */}
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Daily Caloric Expenditure Benchmark Table Across Activity Levels</h2>
                        <p className="text-sm text-slate-400">
                            The benchmark reference table below demonstrates estimated BMR and TDEE maintenance requirements across 5 standardized physical activity tiers for adult men (75 kg, 178 cm, age 30) and adult women (62 kg, 165 cm, age 30).
                        </p>
                        <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-xl">
                            <table className="w-full text-left text-xs sm:text-sm border-collapse bg-slate-950">
                                <thead>
                                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                                        <th className="p-3 font-semibold">Activity Classification</th>
                                        <th className="p-3 font-semibold">Multiplier (PAL)</th>
                                        <th className="p-3 font-semibold">Weekly Exercise Volume</th>
                                        <th className="p-3 font-semibold text-sky-400">Men TDEE (kcal/day)</th>
                                        <th className="p-3 font-semibold text-emerald-400">Women TDEE (kcal/day)</th>
                                        <th className="p-3 font-semibold text-amber-400">Fat Loss Target (-500 kcal)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                                    <tr className="hover:bg-slate-900/50"><td className="p-3 font-medium text-white">Basal Metabolic Rate (BMR)</td><td className="p-3 font-mono">1.000</td><td className="p-3">Zero movement / bed rest</td><td className="p-3 text-sky-400 font-mono">1,718 kcal</td><td className="p-3 text-emerald-400 font-mono">1,340 kcal</td><td className="p-3 text-amber-400 font-mono">N/A (Below BMR)</td></tr>
                                    <tr className="hover:bg-slate-900/50"><td className="p-3 font-medium text-white">Sedentary (Desk Job)</td><td className="p-3 font-mono">1.200</td><td className="p-3">&lt; 3,000 steps, no structured exercise</td><td className="p-3 text-sky-400 font-mono">2,062 kcal</td><td className="p-3 text-emerald-400 font-mono">1,608 kcal</td><td className="p-3 text-amber-400 font-mono">1,562 / 1,200 kcal</td></tr>
                                    <tr className="hover:bg-slate-900/50"><td className="p-3 font-medium text-white">Lightly Active (Walking)</td><td className="p-3 font-mono">1.375</td><td className="p-3">1 to 2 light workouts, 5k steps/day</td><td className="p-3 text-sky-400 font-mono">2,362 kcal</td><td className="p-3 text-emerald-400 font-mono">1,843 kcal</td><td className="p-3 text-amber-400 font-mono">1,862 / 1,343 kcal</td></tr>
                                    <tr className="hover:bg-slate-900/50"><td className="p-3 font-medium text-white">Lightly Active (Gym)</td><td className="p-3 font-mono">1.425</td><td className="p-3">2 to 3 weightlifting sessions/week</td><td className="p-3 text-sky-400 font-mono">2,448 kcal</td><td className="p-3 text-emerald-400 font-mono">1,910 kcal</td><td className="p-3 text-amber-400 font-mono">1,948 / 1,410 kcal</td></tr>
                                    <tr className="hover:bg-slate-900/50"><td className="p-3 font-medium text-white">Moderately Active (Recreational)</td><td className="p-3 font-mono">1.550</td><td className="p-3">3 to 5 moderate workouts, 8k steps</td><td className="p-3 text-sky-400 font-mono">2,663 kcal</td><td className="p-3 text-emerald-400 font-mono">2,077 kcal</td><td className="p-3 text-amber-400 font-mono">2,163 / 1,577 kcal</td></tr>
                                    <tr className="hover:bg-slate-900/50"><td className="p-3 font-medium text-white">Moderately Active (CrossFit / HIIT)</td><td className="p-3 font-mono">1.625</td><td className="p-3">4 to 5 high-intensity conditioning days</td><td className="p-3 text-sky-400 font-mono">2,792 kcal</td><td className="p-3 text-emerald-400 font-mono">2,178 kcal</td><td className="p-3 text-amber-400 font-mono">2,292 / 1,678 kcal</td></tr>
                                    <tr className="hover:bg-slate-900/50"><td className="p-3 font-medium text-white">Very Active (Heavy Training)</td><td className="p-3 font-mono">1.725</td><td className="p-3">6 to 7 intense workouts/week</td><td className="p-3 text-sky-400 font-mono">2,964 kcal</td><td className="p-3 text-emerald-400 font-mono">2,312 kcal</td><td className="p-3 text-amber-400 font-mono">2,464 / 1,812 kcal</td></tr>
                                    <tr className="hover:bg-slate-900/50"><td className="p-3 font-medium text-white">Very Active (Active Occupation)</td><td className="p-3 font-mono">1.800</td><td className="p-3">Construction / trades + training</td><td className="p-3 text-sky-400 font-mono">3,092 kcal</td><td className="p-3 text-emerald-400 font-mono">2,412 kcal</td><td className="p-3 text-amber-400 font-mono">2,592 / 1,912 kcal</td></tr>
                                    <tr className="hover:bg-slate-900/50"><td className="p-3 font-medium text-white">Extra Active (Endurance Athlete)</td><td className="p-3 font-mono">1.900</td><td className="p-3">Marathon / triathlon 2x daily training</td><td className="p-3 text-sky-400 font-mono">3,264 kcal</td><td className="p-3 text-emerald-400 font-mono">2,546 kcal</td><td className="p-3 text-amber-400 font-mono">2,764 / 2,046 kcal</td></tr>
                                    <tr className="hover:bg-slate-900/50"><td className="p-3 font-medium text-white">Extreme / Elite Professional</td><td className="p-3 font-mono">2.000</td><td className="p-3">Competitive athletics &gt; 3 hours daily</td><td className="p-3 text-sky-400 font-mono">3,436 kcal</td><td className="p-3 text-emerald-400 font-mono">2,680 kcal</td><td className="p-3 text-amber-400 font-mono">2,936 / 2,180 kcal</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 6. Frequently Asked Questions (FAQs) */}
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Frequently Asked Questions (FAQs)</h2>
                        <Faq items={faqItems} />
                    </div>

                    {/* 7. Related Calculators (Internal Links) */}
                    <div className="space-y-4 pt-4 border-t border-slate-700/60">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Related Calculators (Internal Links)</h2>
                        <p className="text-sm text-slate-300 mb-4">
                            Connect your daily calorie expenditure with our specialized body composition and diet tools:
                        </p>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <Link to="/health/macro-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Macro Calculator &rarr;</span>
                                <span className="text-xs text-slate-400">Calculate exact daily grams of protein, carbs, and fats for your TDEE target.</span>
                            </Link>
                            <Link to="/health/bmi-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">BMI Calculator &rarr;</span>
                                <span className="text-xs text-slate-400">Evaluate your body mass index and healthy weight range.</span>
                            </Link>
                            <Link to="/health/body-fat-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Body Fat Calculator &rarr;</span>
                                <span className="text-xs text-slate-400">Estimate body fat percentage and calculate exact lean body mass.</span>
                            </Link>
                            <Link to="/health/calories-burned-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Calories Burned Calculator &rarr;</span>
                                <span className="text-xs text-slate-400">Estimate energy burned across workouts, walking, and athletic sports.</span>
                            </Link>
                            <Link to="/health/water-intake-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Water Intake Calculator &rarr;</span>
                                <span className="text-xs text-slate-400">Determine daily hydration targets according to your body mass and sweat rate.</span>
                            </Link>
                        </div>
                    </div>

                </section>

            </div>
        </>
    );
};

export default TDEECalculator;

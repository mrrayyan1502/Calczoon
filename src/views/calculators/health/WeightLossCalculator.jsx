'use client';

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
import { TrendingDown, Flame, Calendar, Activity, Sparkles, AlertTriangle, ShieldAlert } from 'lucide-react';

const WeightLossCalculator = () => {
  const [unitSystem, setUnitSystem] = useState('metric');
  const [currentWeight, setCurrentWeight] = useState('85');
  const [goalWeight, setGoalWeight] = useState('75');
  const [tdee, setTdee] = useState('2400');
  const [deficit, setDeficit] = useState('500'); // 250, 500, 750, 1000
  const [result, setResult] = useState(null);

  const calculateWeightLoss = (e) => {
    if (e) e.preventDefault();
    const cw = parseFloat(currentWeight);
    const gw = parseFloat(goalWeight);
    const tdeeVal = parseFloat(tdee);
    const def = parseFloat(deficit);

    if (isNaN(cw) || isNaN(gw) || isNaN(tdeeVal) || isNaN(def) || cw <= 0 || gw <= 0 || tdeeVal <= 0 || def <= 0) {
      setResult({ error: "Please enter valid, positive numbers for all fields." });
      return;
    }

    if (gw >= cw) {
      setResult({ error: "Goal weight must be lower than your current body weight for weight loss planning." });
      return;
    }

    const weightToLose = cw - gw;
    // 7700 kcal per kg of fat, or 3500 kcal per lb of fat
    const caloriesPerUnit = unitSystem === 'metric' ? 7700 : 3500;
    const totalDeficitNeeded = weightToLose * caloriesPerUnit;
    const daysNeeded = Math.round(totalDeficitNeeded / def);
    const weeksNeeded = (daysNeeded / 7).toFixed(1);
    const monthsNeeded = (daysNeeded / 30.4).toFixed(1);

    const dailyCalorieIntake = Math.round(tdeeVal - def);
    
    // Weekly rate of loss
    const weeklyLossRate = (def * 7) / caloriesPerUnit;

    // Target completion date
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysNeeded);
    const formattedDate = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // Minimum calorie safety warning (1200 kcal female / 1500 kcal male general floor)
    const isBelowSafeFloor = dailyCalorieIntake < 1200;

    const newResult = {
      weightToLose: weightToLose.toFixed(1),
      dailyCalories: dailyCalorieIntake,
      daysNeeded,
      weeksNeeded,
      monthsNeeded,
      weeklyLossRate: weeklyLossRate.toFixed(2),
      targetDate: formattedDate,
      isBelowSafeFloor,
      deficit: def
    };

    setResult(newResult);
    saveCalculation({
      type: 'Weight Loss Plan',
      inputs: { currentWeight: cw, goalWeight: gw, tdee: tdeeVal, deficit: def, unitSystem },
      result: {
        'Daily Calories': `${dailyCalorieIntake} kcal`,
        'Timeline': `${weeksNeeded} weeks`,
        'Target Date': formattedDate
      }
    });
  };

  const faqItems = [
    {
      question: "How does the weight loss calorie deficit calculation work?",
      answer: "Weight loss relies on thermodynamic energy balance. To lose one pound of adipose fat tissue, a cumulative caloric deficit of approximately 3,500 kcal is required (roughly 7,700 kcal per kilogram). Creating a daily 500 kcal deficit below your Total Daily Energy Expenditure (TDEE) produces approximately 1 pound (0.45 kg) of fat loss per week."
    },
    {
      question: "What is considered a safe and sustainable weekly rate of weight loss?",
      answer: "Clinical guidelines established by the National Institutes of Health (NIH) recommend a rate of 0.5 to 2.0 pounds (0.25 to 0.9 kg) per week, corresponding to a daily deficit of 250 to 1,000 calories. Losing weight faster than this significantly increases the risk of skeletal muscle wasting, gallstone formation, and hormonal down-regulation."
    },
    {
      question: "What is the minimum safe daily calorie floor for men and women?",
      answer: "Under general clinical practice, daily caloric intake should not drop below 1,200 kcal per day for adult women or 1,500 kcal per day for adult men without direct medical supervision. Diets below these thresholds rarely provide adequate essential micronutrients, vitamins, and minerals."
    },
    {
      question: "Why does weight loss slow down or plateau after several weeks?",
      answer: "Weight loss plateaus occur due to adaptive thermogenesis (metabolic adaptation). As your body mass decreases, your Basal Metabolic Rate (BMR) and the energy expended during movement naturally decline. Additionally, Non-Exercise Activity Thermogenesis (NEAT) subconsciously drops. Periodic calorie recalculations every 10 lbs (4-5 kg) lost are necessary."
    },
    {
      question: "How does dietary protein protect muscle mass during a calorie deficit?",
      answer: "Maintaining high protein intake (1.6 to 2.2 grams per kilogram of body weight) combined with progressive resistance exercise stimulates muscle protein synthesis, signaling the body to oxidize adipose lipid stores for fuel while preserving metabolically active lean muscle tissue."
    },
    {
      question: "What is the difference between fat loss and scale weight loss?",
      answer: "Scale weight fluctuates daily by 2 to 6 pounds due to fluid balance, sodium intake, bowel transit, and intramuscular glycogen storage (each gram of glycogen binds 3 to 4 grams of water). A drop in scale weight does not necessarily equate to fat loss, nor does a scale plateau mean fat loss has stalled."
    },
    {
      question: "Should I eat back calories burned during exercise?",
      answer: "Wearable fitness trackers and cardio machines frequently overestimate exercise caloric expenditure by 20% to 50%. If your TDEE input already accounts for your activity level, eating back estimated workout calories will eliminate your planned deficit and stall progress."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Weight Loss & Calorie Deficit Calculator",
    "description": "Calculate daily calorie targets, target completion dates, and weekly fat loss rates based on your TDEE and safe caloric deficits.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/health/weight-loss-calculator",
    "browserRequirements": "Requires JavaScript."
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
        title="Weight Loss Calculator: Calorie Deficit, Target Date & Timeline"
        description="Free Weight Loss Calculator. Calculate daily calorie targets, projected completion date, and safe weekly fat loss rates based on your maintenance TDEE."
        canonicalUrl="/health/weight-loss-calculator"
        schema={[webAppSchema, faqPageSchema]}
        keywords={['weight loss calculator', 'calorie deficit calculator', 'target weight loss date', 'how many calories to lose weight', 'tdee deficit']}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Weight Loss & Calorie Deficit Calculator"
          description="Design an evidence-based, sustainable fat loss strategy. Compute your daily calorie targets, safe rate of loss, and estimated completion date based on thermodynamic energy balance."
          icon={TrendingDown}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white text-xl">Weight Loss Parameters</CardTitle>
                    <CardDescription className="text-slate-400">Enter your current weight, goal target, and maintenance calories</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setUnitSystem('metric')}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                        unitSystem === 'metric' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Metric (kg)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnitSystem('imperial')}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                        unitSystem === 'imperial' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Imperial (lbs)
                    </button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={calculateWeightLoss} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentWeight" className="text-slate-300 font-medium">
                        Current Body Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
                      </Label>
                      <Input
                        id="currentWeight"
                        type="number"
                        step="0.1"
                        value={currentWeight}
                        onChange={(e) => setCurrentWeight(e.target.value)}
                        placeholder={unitSystem === 'metric' ? '85' : '185'}
                        required
                        className="bg-slate-950 border-slate-700 text-white text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goalWeight" className="text-slate-300 font-medium">
                        Target Goal Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
                      </Label>
                      <Input
                        id="goalWeight"
                        type="number"
                        step="0.1"
                        value={goalWeight}
                        onChange={(e) => setGoalWeight(e.target.value)}
                        placeholder={unitSystem === 'metric' ? '75' : '165'}
                        required
                        className="bg-slate-950 border-slate-700 text-white text-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tdee" className="text-slate-300 font-medium">
                        Maintenance Calories - TDEE (kcal/day)
                      </Label>
                      <Input
                        id="tdee"
                        type="number"
                        value={tdee}
                        onChange={(e) => setTdee(e.target.value)}
                        placeholder="2400"
                        required
                        className="bg-slate-950 border-slate-700 text-white text-lg"
                      />
                      <p className="text-xs text-slate-400">Your Total Daily Energy Expenditure (calories required to maintain current weight).</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deficit" className="text-slate-300 font-medium">Caloric Deficit Strategy</Label>
                      <select
                        id="deficit"
                        value={deficit}
                        onChange={(e) => setDeficit(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-md text-white"
                      >
                        <option value="250">Mild Deficit (-250 kcal/day / ~0.5 lb / 0.23 kg per week)</option>
                        <option value="500">Moderate Deficit (-500 kcal/day / ~1.0 lb / 0.45 kg per week) ★ Recommended</option>
                        <option value="750">Aggressive Deficit (-750 kcal/day / ~1.5 lb / 0.68 kg per week)</option>
                        <option value="1000">Maximum Safe Deficit (-1000 kcal/day / ~2.0 lb / 0.91 kg per week)</option>
                      </select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 text-base">
                    Calculate Weight Loss Schedule
                  </Button>
                </form>
              </CardContent>

              {result && !result.error && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-950/80 border-t border-slate-800 rounded-b-xl">
                  <div className="w-full space-y-5">
                    <div className="text-center py-5 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-slate-400 text-sm font-medium">Recommended Daily Calorie Intake</p>
                      <p className="text-4xl md:text-5xl font-extrabold text-emerald-400 my-1">
                        {result.dailyCalories} <span className="text-2xl font-normal text-slate-400">kcal/day</span>
                      </p>
                      <p className="text-sm text-slate-300 mt-1">
                        Projected Goal Arrival: <span className="font-bold text-sky-400">{result.targetDate}</span> ({result.weeksNeeded} Weeks / {result.monthsNeeded} Months)
                      </p>
                    </div>

                    {result.isBelowSafeFloor && (
                      <div className="p-4 bg-rose-950/40 border border-rose-500/40 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        <div className="text-xs text-rose-200 space-y-1">
                          <p className="font-semibold">Clinical Low Calorie Warning</p>
                          <p>
                            Your projected daily intake ({result.dailyCalories} kcal) falls below the standard clinical safety threshold (1,200 kcal for women, 1,500 kcal for men). Consuming fewer than these amounts increases risk of nutrient deficiencies and muscle wasting. Consider choosing a milder deficit.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-400">Total Mass to Lose</p>
                        <p className="text-lg font-bold text-white mt-1">
                          {result.weightToLose} {unitSystem === 'metric' ? 'kg' : 'lbs'}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-400">Daily Deficit</p>
                        <p className="text-lg font-bold text-amber-400 mt-1">-{result.deficit} kcal</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-400">Weekly Loss Rate</p>
                        <p className="text-lg font-bold text-sky-400 mt-1">
                          {result.weeklyLossRate} {unitSystem === 'metric' ? 'kg/wk' : 'lb/wk'}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-400">Timeline</p>
                        <p className="text-lg font-bold text-emerald-400 mt-1">{result.weeksNeeded} Wks</p>
                      </div>
                    </div>

                    {/* Monetization / Recommended Resource Box */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <p className="font-semibold text-emerald-300">Evidence-Based Muscle Preservation Tip</p>
                        <p className="text-slate-300 leading-relaxed">
                          To ensure that 80% to 90% of weight lost comes from adipose fat rather than lean skeletal muscle, maintain a high protein intake (minimum 1.6 to 2.2 grams per kilogram of body weight) and perform heavy resistance training 3 to 4 times per week throughout your diet.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <ShareResults
                        title="My Weight Loss Plan"
                        text={`My target weight loss goal will take approximately ${result.weeksNeeded} weeks at ${result.dailyCalories} kcal/day on Calczoon!`}
                        url="/health/weight-loss-calculator"
                      />
                    </div>
                  </div>
                </CardFooter>
              )}

              {result && result.error && (
                <CardFooter className="p-6 bg-slate-950/80 border-t border-slate-800 text-center rounded-b-xl">
                  <p className="text-rose-400 font-semibold text-center w-full">{result.error}</p>
                </CardFooter>
              )}
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <RelatedTools category="health" />
          </aside>
        </div>

        {/* In-depth Educational & AEO Section */}
        <section className="mt-12 bg-slate-900/60 rounded-xl p-8 border border-slate-800 space-y-8 text-slate-300">
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Comprehensive Clinical Guide to Calorie Deficits & Sustainable Fat Loss</h2>
            <p className="leading-relaxed text-slate-300">
              Sustainable body fat reduction is governed strictly by the first law of thermodynamics: energy can neither be created nor destroyed, only transformed from one form to another. In human physiology, this energy balance equation dictates that when dietary energy intake is less than total daily metabolic expenditure, the body oxidizes endogenous biochemical energy stores (primarily adipose triglycerides and intracellular glycogen) to meet physiological demands. Understanding how to establish a controlled, health-promoting calorie deficit prevents metabolic downregulation, protects lean muscle mass, and ensures long-term weight maintenance.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">The Mathematical Principles of Calorie Deficits</h3>
            <p className="mb-4 leading-relaxed">
              In 1958, clinical researcher Dr. Max Wishnofsky established the foundational mathematical model of human weight change:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">1. The 3,500 kcal Rule (Imperial)</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">1 lb of Body Fat ≈ 3,500 kcal</div>
                <p className="text-xs leading-relaxed text-slate-300">
                  Human adipose tissue is approximately 87% pure lipid and 13% water and extracellular matrix. A daily cumulative deficit of 500 kcal across 7 days (500 × 7 = 3,500 kcal) theoretically yields 1 pound of fat loss per week.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">2. The 7,700 kcal Rule (Metric)</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">1 kg of Body Fat ≈ 7,700 kcal</div>
                <p className="text-xs leading-relaxed text-slate-300">
                  In metric clinical nutrition, 1 kilogram of adipose tissue requires a cumulative caloric deficit of approximately 7,700 kcal, equivalent to a daily deficit of 550 kcal to lose 0.5 kg per week.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Calorie Deficit to Weekly & Monthly Weight Loss Benchmark Table</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The benchmark table below illustrates projected fat loss trajectories across standard daily caloric deficit tiers, comparing weekly and monthly progress in both imperial and metric standards:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-200">
                  <tr>
                    <th className="p-3">Deficit Strategy</th>
                    <th className="p-3">Daily Calorie Deficit</th>
                    <th className="p-3">Weekly Deficit</th>
                    <th className="p-3">Weekly Loss (lbs / kg)</th>
                    <th className="p-3">Monthly Loss (lbs / kg)</th>
                    <th className="p-3">Clinical Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Mild Deficit</td>
                    <td className="p-3 text-slate-200">-250 kcal/day</td>
                    <td className="p-3">-1,750 kcal</td>
                    <td className="p-3 text-emerald-400 font-semibold">0.50 lb / 0.23 kg</td>
                    <td className="p-3 text-emerald-400">2.17 lbs / 0.98 kg</td>
                    <td className="p-3 text-slate-300">Extremely sustainable; optimal for lean individuals and athletes.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Moderate Deficit</td>
                    <td className="p-3 text-slate-200">-500 kcal/day</td>
                    <td className="p-3">-3,500 kcal</td>
                    <td className="p-3 text-emerald-400 font-semibold">1.00 lb / 0.45 kg</td>
                    <td className="p-3 text-emerald-400">4.35 lbs / 1.97 kg</td>
                    <td className="p-3 text-slate-300">The gold standard benchmark; balanced adherence and steady fat loss.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Moderate-High</td>
                    <td className="p-3 text-slate-200">-600 kcal/day</td>
                    <td className="p-3">-4,200 kcal</td>
                    <td className="p-3 text-emerald-400 font-semibold">1.20 lbs / 0.55 kg</td>
                    <td className="p-3 text-emerald-400">5.22 lbs / 2.37 kg</td>
                    <td className="p-3 text-slate-300">Effective for individuals with higher initial body fat percentages.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Aggressive Deficit</td>
                    <td className="p-3 text-slate-200">-750 kcal/day</td>
                    <td className="p-3">-5,250 kcal</td>
                    <td className="p-3 text-amber-400 font-semibold">1.50 lbs / 0.68 kg</td>
                    <td className="p-3 text-amber-400">6.52 lbs / 2.96 kg</td>
                    <td className="p-3 text-slate-300">Requires strict protein prioritization to safeguard lean muscle mass.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">High Deficit</td>
                    <td className="p-3 text-slate-200">-850 kcal/day</td>
                    <td className="p-3">-5,950 kcal</td>
                    <td className="p-3 text-amber-400 font-semibold">1.70 lbs / 0.77 kg</td>
                    <td className="p-3 text-amber-400">7.39 lbs / 3.35 kg</td>
                    <td className="p-3 text-slate-300">Higher hunger signaling; recommended for short duration phases only.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Maximum Safe Deficit</td>
                    <td className="p-3 text-slate-200">-1,000 kcal/day</td>
                    <td className="p-3">-7,000 kcal</td>
                    <td className="p-3 text-orange-400 font-semibold">2.00 lbs / 0.91 kg</td>
                    <td className="p-3 text-orange-400">8.70 lbs / 3.95 kg</td>
                    <td className="p-3 text-slate-300">Upper clinical ceiling for non-supervised nutritional interventions.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Extreme Deficit</td>
                    <td className="p-3 text-rose-400 font-semibold">-1,200 kcal/day</td>
                    <td className="p-3 text-rose-400">-8,400 kcal</td>
                    <td className="p-3 text-rose-400">2.40 lbs / 1.09 kg</td>
                    <td className="p-3 text-rose-400">10.43 lbs / 4.73 kg</td>
                    <td className="p-3 text-rose-400">Not recommended; elevated risk of gallstones and muscle wasting.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Very Low Calorie (VLCD)</td>
                    <td className="p-3 text-rose-400 font-semibold">&gt; 1,500 kcal/day</td>
                    <td className="p-3 text-rose-400">&gt; 10,500 kcal</td>
                    <td className="p-3 text-rose-400">&gt; 3.00 lbs / 1.36 kg</td>
                    <td className="p-3 text-rose-400">&gt; 13.0 lbs / 5.90 kg</td>
                    <td className="p-3 text-rose-400">Requires strict inpatient medical supervision and electrolyte monitoring.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Step-by-Step Numerical Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-emerald-400 text-base">Case Study 1: Moderate Deficit Protocol (Metric Example)</h4>
                <p><strong>Subject Profile:</strong> 34-year-old male, current weight 90 kg, goal weight 80 kg</p>
                <p><strong>Baseline Maintenance TDEE:</strong> 2,600 kcal/day</p>
                <p><strong>Target Deficit:</strong> 500 kcal/day (Daily target: 2,100 kcal)</p>
                <p><strong>Total Caloric Energy to Deplete:</strong> 10 kg × 7,700 kcal = 77,000 kcal</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-emerald-300 font-semibold">Total Days Needed: 77,000 / 500 = 154 Days</p>
                  <p className="text-sky-300 font-semibold">Timeline: 22.0 Weeks (~5.1 Months)</p>
                  <p className="text-slate-300 text-xs mt-1">Expected Rate: 0.45 kg/week with complete preservation of lean body mass.</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-sky-400 text-base">Case Study 2: Mild-to-Moderate Deficit Protocol (Imperial Example)</h4>
                <p><strong>Subject Profile:</strong> 29-year-old female, current weight 150 lbs, goal weight 135 lbs</p>
                <p><strong>Baseline Maintenance TDEE:</strong> 2,000 kcal/day</p>
                <p><strong>Target Deficit:</strong> 400 kcal/day (Daily target: 1,600 kcal)</p>
                <p><strong>Total Caloric Energy to Deplete:</strong> 15 lbs × 3,500 kcal = 52,500 kcal</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-sky-300 font-semibold">Total Days Needed: 52,500 / 400 = 131 Days</p>
                  <p className="text-emerald-300 font-semibold">Timeline: 18.7 Weeks (~4.3 Months)</p>
                  <p className="text-slate-300 text-xs mt-1">Expected Rate: 0.8 lb/week with minimal hunger and uninterrupted training recovery.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Adaptive Thermogenesis: Understanding Metabolic Downregulation</h3>
            <p className="leading-relaxed mb-4 text-sm">
              Weight loss in biological organisms is non-linear. As body fat stores decline, evolutionary survival mechanisms trigger hormonal adjustments:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">Leptin Suppression</p>
                <p className="text-xs text-slate-300">
                  Adipose tissue secretes leptin, the satiety hormone. As fat mass decreases, circulating leptin plummets, signaling the hypothalamus to increase appetite and food preoccupation.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">Diminished NEAT</p>
                <p className="text-xs text-slate-300">
                  Non-Exercise Activity Thermogenesis (postural shifts, fidgeting, spontaneous walking) drops subconsciously by 100 to 300 kcal/day as the central nervous system conserves energy.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">Lowered Resting BMR</p>
                <p className="text-xs text-slate-300">
                  A lighter body requires fewer calories to pump blood, ventilate lungs, and maintain cellular membrane potentials, lowering baseline daily maintenance energy requirements.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">5 Critical Weight Loss Pitfalls to Avoid</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed text-slate-300">
              <li>
                <strong>Underestimating Liquid Caloric Intake:</strong> Specialty coffees, salad dressings, alcoholic beverages, and fruit juices contain substantial calories that are absorbed rapidly without promoting satiety, easily wiping out a daily 500 kcal deficit.
              </li>
              <li>
                <strong>Failing to Weigh Food with a Digital Kitchen Scale:</strong> Volumetric measurements (cups, tablespoons, estimation) undercount calorie density by up to 20% to 30% compared to precise gram weight measurements.
              </li>
              <li>
                <strong>Overestimating Exercise Caloric Burn:</strong> Cardio machines and smartwatches regularly overstate calories burned during workouts by 25% to 40%. Eating back estimated workout calories frequently leads to fat loss stalls.
              </li>
              <li>
                <strong>Unmeasured Weekend Calorie Surplus:</strong> Maintaining a 500 kcal deficit from Monday through Friday (-2,500 kcal total) can be completely negated by consuming an extra 1,250 calories on Saturday and Sunday (+2,500 kcal), netting zero net change across the week.
              </li>
              <li>
                <strong>Panic-Dieting During Natural Water Retention Plateaus:</strong> Cortisol spikes from hard training or dietary stress stimulate aldosterone release, causing transient extracellular fluid retention that masks fat loss on the scale for 1 to 3 weeks.
              </li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="Medical Disclaimer: This weight loss calculator is intended strictly for educational and dietary planning purposes. It does not constitute medical advice or individualized clinical nutrition therapy. Consult a licensed physician or registered dietitian before initiating a substantial caloric restriction protocol." />
      </div>
    </>
  );
};

export default WeightLossCalculator;

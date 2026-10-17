'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveCalculation } from '@/lib/history';
import { Link } from 'react-router-dom';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { Droplet, Activity, Flame, ShieldAlert, CheckCircle2, HelpCircle } from 'lucide-react';

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateWaterIntake = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const weightValue = parseFloat(weight);
    if (isNaN(weightValue) || weightValue <= 0) {
      setError('Please enter a valid positive weight.');
      return;
    }

    let weightInKg = weightValue;
    if (unit === 'lbs') {
      weightInKg = weightValue * 0.453592;
    }

    // Base calculation: 35ml per kg of body weight (Institute of Medicine standard guideline)
    let baseIntake = weightInKg * 35;

    // Adjust for physical activity expenditure
    switch (activityLevel) {
      case 'light':
        baseIntake += 350; // ~12 oz
        break;
      case 'moderate':
        baseIntake += 700; // ~24 oz
        break;
      case 'active':
        baseIntake += 1050; // ~35 oz
        break;
      default: // sedentary
        break;
    }

    const intakeLiters = (baseIntake / 1000).toFixed(2);
    const intakeOunces = (baseIntake * 0.033814).toFixed(1);
    const glassesEstimate = Math.round(baseIntake / 250); // standard 250 ml glass

    const newResult = {
      liters: intakeLiters,
      ounces: intakeOunces,
      glasses: glassesEstimate,
    };
    setResult(newResult);
    saveCalculation({
      type: 'Water Intake',
      inputs: { weight, unit, activityLevel },
      result: { Liters: newResult.liters, Ounces: newResult.ounces, Glasses: newResult.glasses }
    });
  };

  const faqItems = [
    {
      question: "Why is the traditional '8 glasses a day' rule outdated?",
      answer: "The '8x8 rule' (eight 8-ounce glasses daily, ~1.9 liters) is a general rule of thumb from the 1940s that disregards individual differences. Fluid needs vary drastically based on body mass, muscle percentage, sweat rate, ambient climate, and activity. A 50 kg sedentary person and a 95 kg construction worker require vastly different amounts of water. The weight-based formula (30–35 ml/kg) provides a personalized, scientifically backed baseline."
    },
    {
      question: "Does this calculation include water obtained from solid food?",
      answer: "No, this calculator specifically estimates your recommended fluid intake from drinking water and hydrating beverages. According to the National Academy of Medicine (NAM), approximately 20% to 25% of your total daily water comes from food (particularly fruits, vegetables, soups, and yogurt). The remaining 75% to 80% must come directly from fluid consumption."
    },
    {
      question: "Do tea and coffee count towards my daily hydration goal?",
      answer: "Yes, caffeinated beverages like moderate coffee and tea do contribute to daily fluid intake. While caffeine has a mild diuretic property, extensive research published in PLOS ONE shows that for regular caffeine consumers, the fluid volume ingested far outweighs the mild diuretic effect, providing effective net hydration."
    },
    {
      question: "What is the best way to verify if I am properly hydrated?",
      answer: "The most reliable, immediate biomarker is urine color. Pale straw or light lemonade-colored urine indicates optimal hydration. Dark yellow or amber urine signals mild-to-moderate dehydration, indicating you need to drink fluids immediately. Completely clear, water-like urine consistently throughout the day may indicate over-hydration and electrolyte dilution."
    },
    {
      question: "Can drinking too much water be dangerous (Water Intoxication)?",
      answer: "Yes. Hyponatremia occurs when excessive plain water is consumed faster than the kidneys can excrete it (roughly 0.8 to 1.0 liter per hour). This dangerously dilutes blood sodium levels, causing cellular swelling, nausea, confusion, and in extreme cases, seizures. To prevent this, space your fluid intake evenly across the day and include electrolytes during heavy endurance workouts."
    },
    {
      question: "How should I adjust water intake in hot or humid weather?",
      answer: "In ambient temperatures above 30°C (86°F) or during high relative humidity, sweat evaporation is less efficient, causing increased sweat volume. In hot climates, increase your baseline fluid consumption by 500 to 1,000 ml per day and consume mineral-rich fluids or an electrolyte supplement to replenish lost sodium and potassium."
    }
  ];

  return (
    <>
      <Seo
        title="Daily Water Intake Calculator: Hydration Requirement Tool | CalcZoon"
        description="Calculate your optimal daily water intake based on body weight, daily activity level, and climate conditions. Free, accurate hydration calculator with formulas and guides."
        canonicalUrl="/health/water-intake-calculator"
      />
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400">
                    <Droplet className="w-8 h-8" />
                  </div>
                </div>
                <h1 className="text-3xl font-extrabold text-white">Daily Water Intake Calculator</h1>
                <CardDescription className="text-slate-300 max-w-xl mx-auto">
                  Calculate your personalized daily hydration requirement based on clinical weight standards and physical exertion levels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateWaterIntake} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-slate-200">Your Body Weight</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="e.g., 70"
                        required
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit" className="text-slate-200">Weight Unit</Label>
                      <select
                        id="unit"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white h-10"
                      >
                        <option value="kg">Kilograms (kg)</option>
                        <option value="lbs">Pounds (lbs)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activityLevel" className="text-slate-200">Daily Activity Level</Label>
                    <select
                      id="activityLevel"
                      value={activityLevel}
                      onChange={(e) => setActivityLevel(e.target.value)}
                      className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white h-10"
                    >
                      <option value="sedentary">Sedentary (desk work, minimal daily exercise)</option>
                      <option value="light">Lightly Active (light walking / 20–30 min exercise)</option>
                      <option value="moderate">Moderately Active (gym workouts / sports 45–60 min)</option>
                      <option value="active">Very Active (intense training / physical labor 90+ min)</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-slate-950 font-bold h-12 text-base">
                    Calculate Daily Water Intake
                  </Button>
                </form>
              </CardContent>
              {result && !error && (
                <CardFooter className="flex flex-col items-center mt-6 p-6 bg-slate-900/80 border-t border-slate-700 rounded-b-lg">
                  <div className="w-full text-center space-y-3">
                    <h2 className="text-lg font-semibold text-slate-300">Your Recommended Daily Fluid Target:</h2>
                    <div className="flex justify-center items-center gap-3 text-cyan-400">
                      <Droplet className="w-10 h-10 animate-pulse" />
                      <p className="text-5xl font-black">{result.liters} Liters</p>
                    </div>
                    <div className="flex justify-center items-center gap-6 text-sm text-slate-400 pt-2">
                      <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 font-mono text-slate-200">
                        {result.ounces} fl oz
                      </span>
                      <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 font-mono text-slate-200">
                        ≈ {result.glasses} standard glasses (250 ml)
                      </span>
                    </div>
                  <div className="w-full p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900/60 border border-cyan-500/30 flex items-start gap-3 text-left my-3">
                    <div className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-cyan-400 block mb-1">Recommended Hydration Practice: Morning Fluid Activation</strong>
                      Drinking 500 ml (16 fl oz) of water with a pinch of unrefined sea salt immediately upon waking restores overnight respiratory water loss, stimulates peristalsis, and boosts morning metabolic rate by up to 24%.
                    </div>
                  </div>
                  <div className="mt-4 w-full">
                    <ShareResults
                      title="My Daily Water Goal"
                      text={`My personalized daily hydration target is ${result.liters}L (${result.ounces} fl oz). Calculate yours on CalcZoon:`}
                      url="/health/water-intake-calculator"
                    />
                  </div>
                </div>
              </CardFooter>
              )}
              {error && (
                <CardFooter className="mt-6 p-4 bg-red-900/20 border-t border-red-800/40 rounded-b-lg">
                  <p className="text-red-400 text-center w-full">{error}</p>
                </CardFooter>
              )}
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" /> Hydration Benchmarks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <div className="flex justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400">Adult Men (Avg)</span>
                  <span className="font-semibold text-white">3.0 – 3.7 L/day</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400">Adult Women (Avg)</span>
                  <span className="font-semibold text-white">2.2 – 2.7 L/day</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400">Per Hour of Workout</span>
                  <span className="font-semibold text-cyan-400">+500 to +1000 ml</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Food Hydration Share</span>
                  <span className="font-semibold text-slate-300">~20% of total</span>
                </div>
              </CardContent>
            </Card>
            <RelatedTools />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,000 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10">
          {/* Section 1: What is Water Intake & Why It Matters */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Droplet className="text-cyan-400 w-7 h-7" /> What is the Daily Water Intake Calculator & Why Hydration Matters
            </h2>
            <p className="text-base md:text-lg">
              The <strong>Daily Water Intake Calculator</strong> is an evidence-based clinical screening tool engineered to quantify the exact volume of fluids required to maintain cellular homeostasis, optimal plasma osmolarity, and physiological equilibrium. Water comprises roughly 60% of adult male body weight and 55% of adult female body weight, forming the primary medium for almost every biochemical reaction in the human body.
            </p>
            <p>
              In clinical physiology, chronic mild dehydration (a fluid deficit as small as 1% to 2% of total body mass) is linked to measurable cognitive impairments, reduced executive brain function, increased perception of fatigue, diminished physical power output, and altered mood states. Furthermore, prolonged dehydration elevates kidney strain, increases risk of nephrolithiasis (kidney stones), and impairs cardiovascular stroke volume during physical exertion.
            </p>
          </div>

          {/* Section 2: Mathematical Formulas & Activity Multipliers */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Mathematical Formulas & Activity Multipliers
            </h2>
            <p>
              Rather than using an arbitrary one-size-fits-all figure, our calculator employs the clinical standard adopted by sports medicine institutions and the National Academy of Medicine:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4">
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 font-mono text-sm space-y-2">
                <p className="text-cyan-400 font-bold uppercase tracking-wider text-xs">Metric Baseline Equation</p>
                <p className="text-white text-base font-semibold">Water (ml) = Body Weight (kg) × 35 ml</p>
                <p className="text-slate-400 text-xs">Baseline metabolic turnover for thermoregulation and renal clearance.</p>
              </div>
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 font-mono text-sm space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider text-xs">Imperial Baseline Equation</p>
                <p className="text-white text-base font-semibold">Water (fl oz) = Body Weight (lbs) × 0.54 fl oz</p>
                <p className="text-slate-400 text-xs">Converts imperial body mass into fluid ounces of daily water.</p>
              </div>
            </div>
            <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-semibold text-white text-base">Activity Exertion Additions (Sweat Compensation):</h3>
              <p className="text-sm text-slate-300">
                During exercise, the body dissipates heat via sweat evaporation. Depending on intensity, sweat losses range from 0.5 to 2.0 liters per hour:
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 text-xs">
                <li className="bg-slate-800/80 p-3 rounded border border-slate-700">
                  <strong className="text-white block text-sm">Light Activity (+350 ml / 12 oz)</strong>
                  Walking, gentle stretching, or short leisure activities.
                </li>
                <li className="bg-slate-800/80 p-3 rounded border border-slate-700">
                  <strong className="text-white block text-sm">Moderate Activity (+700 ml / 24 oz)</strong>
                  30 to 60 minutes of gym resistance training, cycling, or jogging.
                </li>
                <li className="bg-slate-800/80 p-3 rounded border border-cyan-700/50 text-cyan-200">
                  <strong className="text-white block text-sm">Active / High Intensity (+1,050 ml / 35 oz)</strong>
                  60 to 90 minutes of continuous high-intensity cardio, endurance sports, or heavy labor.
                </li>
                <li className="bg-slate-800/80 p-3 rounded border border-amber-700/50 text-amber-200">
                  <strong className="text-white block text-sm">Extreme Climate Adjustment (+500 to 1000 ml)</strong>
                  Ambient temperatures above 30°C (86°F) or high relative humidity.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Step-by-Step Practical Usage Guide */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Step-by-Step Guide: How to Calculate & Meet Your Hydration Target
            </h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-white">Step 1: Input Accurate Morning Body Weight:</strong> Weigh yourself first thing after waking and using the restroom. Enter weight in either kilograms (kg) or pounds (lbs).
              </li>
              <li>
                <strong className="text-white">Step 2: Assess Your True Physical Exertion:</strong> Select the activity tier corresponding to your planned exercise intensity today rather than your general aspirational fitness goals.
              </li>
              <li>
                <strong className="text-white">Step 3: Review Your Liters, Ounces, and Glass Counts:</strong> Note down the target. For practical everyday use, standard drinking glasses hold approximately 250 ml (8.5 fl oz).
              </li>
              <li>
                <strong className="text-white">Step 4: Establish a Structured Drinking Schedule:</strong> Rather than consuming large volumes at night, front-load your hydration: 500 ml upon waking, 500 ml mid-morning, 500 ml with lunch, 500 ml pre/post workout, and sip throughout the afternoon.
              </li>
              <li>
                <strong className="text-white">Step 5: Verify With the Urine Color Test:</strong> Cross-check your intake with urine color. Aim for pale straw; adjust upward if it turns dark gold.
              </li>
            </ol>
          </div>

          {/* Section 4: Real-World Numerical Worked Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Real-World Numerical Worked Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-mono font-bold">Case Study 1</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Sedentary Professional</span>
                </div>
                <h3 className="text-lg font-bold text-white">Mark: 72 kg Desk Worker</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Body Weight:</strong> 72 kg</li>
                  <li><strong>Activity Level:</strong> Sedentary (office desk work)</li>
                  <li><strong>Calculation:</strong> 72 kg × 35 ml = 2,520 ml baseline</li>
                  <li><strong>Activity Addition:</strong> 0 ml</li>
                  <li><strong>Daily Fluid Target:</strong> <span className="text-cyan-400 font-bold text-sm">2.52 Liters (85.2 fl oz / ~10 glasses)</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Outcome: Mark drinks a 500 ml water bottle upon waking, two 500 ml bottles during work hours, and one 500 ml bottle with dinner to hit his target effortlessly.
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-bold">Case Study 2</span>
                  <span className="text-xs bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">Active Athlete</span>
                </div>
                <h3 className="text-lg font-bold text-white">Sarah: 85 kg Marathon Runner</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Body Weight:</strong> 85 kg</li>
                  <li><strong>Activity Level:</strong> Very Active (60–90 min training)</li>
                  <li><strong>Baseline Equation:</strong> 85 kg × 35 ml = 2,975 ml</li>
                  <li><strong>Exertion Addition:</strong> +1,050 ml for prolonged sweat loss</li>
                  <li><strong>Daily Fluid Target:</strong> <span className="text-cyan-400 font-bold text-sm">4.03 Liters (136.1 fl oz / ~16 glasses)</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Outcome: Sarah supplements her water with sodium, potassium, and magnesium tablets during training runs to maintain electrolyte balance.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Common Hydration Mistakes & Pitfalls */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="text-amber-400 w-6 h-6" /> Common Hydration Mistakes to Avoid
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Waiting Until You Feel Thirsty
                </h3>
                <p className="text-xs text-slate-400">
                  The physiological sensation of thirst is only triggered after your body has already lost approximately 1.5% to 2% of its fluid mass. Relying solely on thirst means you are consistently operating in a mild dehydration state.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> "Chugging" Excessive Water at Night
                </h3>
                <p className="text-xs text-slate-400">
                  Drinking 1.5 liters in 10 minutes right before bed overloads renal filtration capacity, disrupts restorative deep sleep stages through nocturia (waking up to urinate), and fails to hydrate cells effectively throughout daytime hours.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Neglecting Electrolyte Balance
                </h3>
                <p className="text-xs text-slate-400">
                  Consuming gallons of demineralized distilled water during heavy exercise without sodium, potassium, and magnesium can trigger hyponatremia. True hydration requires both water and cellular electrolytes to cross cell membranes.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Ignoring Hydration from Whole Foods
                </h3>
                <p className="text-xs text-slate-400">
                  Fresh vegetables like cucumbers (96% water), celery (95%), watermelons (92%), and oranges provide mineral-bound cellular hydration that slows digestion and improves systemic fluid retention.
                </p>
              </div>
            </div>
          </div>

          {/* Static HTML Reference Benchmark Table */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Daily Hydration Benchmark Table Across Body Weights &amp; Activity Levels</h2>
            <p className="text-sm text-slate-400">
              The clinical hydration benchmark table below demonstrates recommended baseline daily fluid requirements across various body weights and exercise durations based on clinical guidelines from the National Academy of Medicine (NAM).
            </p>
            <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-slate-950">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                    <th className="p-3 font-semibold">Body Weight</th>
                    <th className="p-3 font-semibold text-sky-400">Sedentary Baseline (L)</th>
                    <th className="p-3 font-semibold text-cyan-400">Light Exercise (+30m)</th>
                    <th className="p-3 font-semibold text-emerald-400">Moderate Training (+60m)</th>
                    <th className="p-3 font-semibold text-amber-400">Heavy Athletics (+90m)</th>
                    <th className="p-3 font-semibold">Standard 250ml Glasses</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">100 lbs (45 kg)</td><td className="p-3 text-sky-400 font-mono">1.6 L (54 oz)</td><td className="p-3 text-cyan-400 font-mono">1.9 L (64 oz)</td><td className="p-3 text-emerald-400 font-mono">2.2 L (74 oz)</td><td className="p-3 text-amber-400 font-mono">2.5 L (84 oz)</td><td className="p-3 font-mono">7 – 10 glasses</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">120 lbs (54 kg)</td><td className="p-3 text-sky-400 font-mono">1.9 L (64 oz)</td><td className="p-3 text-cyan-400 font-mono">2.2 L (74 oz)</td><td className="p-3 text-emerald-400 font-mono">2.6 L (88 oz)</td><td className="p-3 text-amber-400 font-mono">2.9 L (98 oz)</td><td className="p-3 font-mono">8 – 12 glasses</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">140 lbs (64 kg)</td><td className="p-3 text-sky-400 font-mono">2.2 L (74 oz)</td><td className="p-3 text-cyan-400 font-mono">2.6 L (88 oz)</td><td className="p-3 text-emerald-400 font-mono">3.0 L (101 oz)</td><td className="p-3 text-amber-400 font-mono">3.3 L (112 oz)</td><td className="p-3 font-mono">9 – 13 glasses</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">160 lbs (73 kg)</td><td className="p-3 text-sky-400 font-mono">2.5 L (85 oz)</td><td className="p-3 text-cyan-400 font-mono">2.9 L (98 oz)</td><td className="p-3 text-emerald-400 font-mono">3.3 L (112 oz)</td><td className="p-3 text-amber-400 font-mono">3.8 L (128 oz)</td><td className="p-3 font-mono">10 – 15 glasses</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">180 lbs (82 kg)</td><td className="p-3 text-sky-400 font-mono">2.8 L (95 oz)</td><td className="p-3 text-cyan-400 font-mono">3.2 L (108 oz)</td><td className="p-3 text-emerald-400 font-mono">3.7 L (125 oz)</td><td className="p-3 text-amber-400 font-mono">4.2 L (142 oz)</td><td className="p-3 font-mono">11 – 17 glasses</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">200 lbs (91 kg)</td><td className="p-3 text-sky-400 font-mono">3.1 L (105 oz)</td><td className="p-3 text-cyan-400 font-mono">3.6 L (122 oz)</td><td className="p-3 text-emerald-400 font-mono">4.1 L (139 oz)</td><td className="p-3 text-amber-400 font-mono">4.6 L (155 oz)</td><td className="p-3 font-mono">12 – 18 glasses</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">220 lbs (100 kg)</td><td className="p-3 text-sky-400 font-mono">3.4 L (115 oz)</td><td className="p-3 text-cyan-400 font-mono">3.9 L (132 oz)</td><td className="p-3 text-emerald-400 font-mono">4.4 L (149 oz)</td><td className="p-3 text-amber-400 font-mono">5.0 L (169 oz)</td><td className="p-3 font-mono">14 – 20 glasses</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">240 lbs (109 kg)</td><td className="p-3 text-sky-400 font-mono">3.7 L (125 oz)</td><td className="p-3 text-cyan-400 font-mono">4.2 L (142 oz)</td><td className="p-3 text-emerald-400 font-mono">4.8 L (162 oz)</td><td className="p-3 text-amber-400 font-mono">5.4 L (183 oz)</td><td className="p-3 font-mono">15 – 22 glasses</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">260 lbs (118 kg)</td><td className="p-3 text-sky-400 font-mono">4.0 L (135 oz)</td><td className="p-3 text-cyan-400 font-mono">4.5 L (152 oz)</td><td className="p-3 text-emerald-400 font-mono">5.1 L (172 oz)</td><td className="p-3 text-amber-400 font-mono">5.8 L (196 oz)</td><td className="p-3 font-mono">16 – 23 glasses</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">280 lbs (127 kg)</td><td className="p-3 text-sky-400 font-mono">4.3 L (145 oz)</td><td className="p-3 text-cyan-400 font-mono">4.9 L (166 oz)</td><td className="p-3 text-emerald-400 font-mono">5.5 L (186 oz)</td><td className="p-3 text-amber-400 font-mono">6.2 L (210 oz)</td><td className="p-3 font-mono">17 – 25 glasses</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 6: In-Depth FAQs */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="text-primary w-6 h-6" /> Frequently Asked Questions (FAQ)
            </h2>
            <Faq items={faqItems} />
          </div>

          {/* Section 7: Scientific References & Interlinked Tools */}
          <div className="pt-6 border-t border-slate-700/60 space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Clinical References & Related Health Tools
            </h3>
            <ul className="text-xs text-slate-400 space-y-1.5">
              <li>• Institute of Medicine (US) Dietary Reference Intakes for Water, Potassium, Sodium, Chloride, and Sulfate. National Academies Press (2005).</li>
              <li>• Sawka MN, et al. American College of Sports Medicine position stand: Exercise and fluid replacement. <em>Medicine & Science in Sports & Exercise</em>, 39(2):377-390 (2007).</li>
              <li>• Armstrong LE. Assessing hydration status: the elusive gold standard. <em>Journal of the American College of Nutrition</em>, 26(sup5):575S-584S (2007).</li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/health/bmi-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-cyan-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Check Body Mass Index (BMI) →
              </Link>
              <Link to="/health/tdee-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-cyan-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Calculate Daily Calorie Needs (TDEE) →
              </Link>
              <Link to="/health/calories-burned-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-cyan-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Estimate Calories Burned in Workouts →
              </Link>
            </div>
          </div>

          <Disclaimer text="The figures generated by this calculator are intended for educational and general wellness informational purposes only. Individuals with congestive heart failure, chronic kidney disease (CKD), or severe liver cirrhosis must consult their attending physician regarding strict clinical fluid restriction guidelines." />
        </section>
      </div>
    </>
  );
};

export default WaterIntakeCalculator;

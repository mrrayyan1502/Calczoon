'use client';

import React, { useState } from 'react';
import { Target, PieChart, Weight, Utensils, HelpCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { saveCalculation } from '@/lib/history';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import { Link } from 'react-router-dom';

const MacroCalculator = () => {
  const [calories, setCalories] = useState('');
  const [dietType, setDietType] = useState('balanced');
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const dietPlans = {
    balanced: { p: 0.30, c: 0.40, f: 0.30, label: 'Balanced (30P / 40C / 30F)' },
    highProtein: { p: 0.40, c: 0.35, f: 0.25, label: 'High Protein / Lean Muscle (40P / 35C / 25F)' },
    lowCarb: { p: 0.35, c: 0.20, f: 0.45, label: 'Low Carb / Fat Adaptation (35P / 20C / 45F)' },
    lowFat: { p: 0.25, c: 0.55, f: 0.20, label: 'Low Fat / High Endurance (25P / 55C / 20F)' },
    keto: { p: 0.25, c: 0.05, f: 0.70, label: 'Ketogenic (25P / 5C / 70F)' },
  };

  const calculateMacros = (e) => {
    e.preventDefault();
    const cal = parseFloat(calories);
    if (isNaN(cal) || cal <= 0) {
      toast({ title: "Invalid Input", description: "Please enter a valid daily calorie goal.", variant: "destructive" });
      return;
    }

    const plan = dietPlans[dietType];
    const proteinGrams = Math.round((cal * plan.p) / 4);
    const carbsGrams = Math.round((cal * plan.c) / 4);
    const fatGrams = Math.round((cal * plan.f) / 9);

    const newResult = { proteinGrams, carbsGrams, fatGrams, calories: cal, planLabel: plan.label };
    setResult(newResult);
    saveCalculation({
      type: 'Macronutrients',
      inputs: { calories: `${cal} kcal`, dietType: plan.label },
      result: { Protein: `${proteinGrams}g`, Carbs: `${carbsGrams}g`, Fat: `${fatGrams}g` }
    });
    toast({ title: "Macros Calculated!", description: "Your daily macronutrient targets are ready." });
  };

  const resetForm = () => {
    setCalories('');
    setDietType('balanced');
    setResult(null);
    toast({ title: "Form Reset", description: "All fields have been cleared." });
  };

  const pageTitle = "Free Macro Calculator: Plan Daily Protein, Carbs & Fats | CalcZoon";
  const pageDescription = "Calculate your optimal macronutrient breakdown (protein, carbohydrates, fats) for cutting, bulking, or body recomposition based on your daily calorie goal.";
  const canonicalUrl = "https://calczoon.com/health/macro-calculator";

  const faqItems = [
    {
      question: "What is the biological difference between macros and total calories?",
      answer: "Calories determine whether you gain, lose, or maintain body weight (energy balance). Macronutrients determine the quality of that weight change—specifically, whether you lose pure adipose tissue while preserving skeletal muscle, or lose muscle while retaining stubborn fat. Protein provides amino acids for muscle protein synthesis (MPS), carbohydrates replenish muscle glycogen for high-intensity training, and fats sustain steroid hormone synthesis (testosterone, estrogen)."
    },
    {
      question: "Why does fat contain 9 kcal/gram while protein and carbs only contain 4 kcal/gram?",
      answer: "Fat molecules (triglycerides) have a significantly higher ratio of carbon-hydrogen bonds and fewer oxygen atoms than carbohydrates or amino acids. This chemical structure makes fats more energy-dense, releasing 9 kilocalories of metabolic heat per gram upon oxidative phosphorylation, compared to 4 kcal/gram for glucose and proteins."
    },
    {
      question: "How much protein is scientifically necessary for muscle preservation during a cut?",
      answer: "A comprehensive meta-analysis by Morton et al. in the British Journal of Sports Medicine and ISSN position stands indicate that 1.6 to 2.2 grams of protein per kilogram of total body weight (0.7 to 1.0 g/lb) is optimal for muscle protein synthesis. In a caloric deficit (cutting phase), increasing protein up to 2.3–2.8 g/kg of lean body mass prevents muscle catabolism and elevates satiety via peptide YY and GLP-1 secretion."
    },
    {
      question: "What is 'Carb Cycling' and should beginners use it?",
      answer: "Carb cycling involves alternating between high-carbohydrate days (scheduled on heavy training days like legs or back) and low-carbohydrate, higher-fat days (on rest days). While it can optimize insulin sensitivity and training performance for advanced competitors, total weekly caloric deficit and consistent daily protein intake govern 90% of fat loss outcomes."
    },
    {
      question: "Should I weigh my food raw or cooked when tracking macronutrients?",
      answer: "Always weigh foods raw when possible. Cooking alters water and moisture content drastically. For example, 100 grams of raw chicken breast contains ~23g of protein. After cooking, moisture loss shrinks it to ~75 grams while retaining the same 23g of protein. If you log 100g of cooked chicken as raw, you significantly miscalculate your protein and calorie intake."
    },
    {
      question: "How does alcohol fit into daily macronutrient tracking?",
      answer: "Alcohol is often called the 'fourth macronutrient' because it yields 7 kcal per gram. However, it cannot be stored as glycogen or muscle tissue. When alcohol is present, hepatic liver enzymes prioritize acetate oxidation over fatty acid breakdown, temporarily arresting lipolysis (fat burning). To track alcohol, divide its total calories by 4 to log as carbs, or by 9 to log as dietary fat."
    }
  ];

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
      />

      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title="Macro Calculator" description={pageDescription} icon={Target} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Calculate Your Daily Macronutrient Targets</CardTitle>
                <CardDescription className="text-slate-300">
                  Enter your daily target calorie budget to compute the exact grams of protein, carbohydrates, and dietary fats required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateMacros} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="calories" className="text-slate-200">Daily Calorie Target (kcal)</Label>
                    <Input
                      id="calories"
                      type="number"
                      step="1"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      placeholder="e.g., 2200"
                      required
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                    <p className="text-xs text-slate-400">
                      Need your target calorie budget? Calculate your maintenance calories first with our{' '}
                      <Link to="/health/tdee-calculator" className="text-primary hover:underline font-semibold">
                        TDEE Calculator
                      </Link>.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dietType" className="text-slate-200">Nutritional Strategy / Split</Label>
                    <Select value={dietType} onValueChange={setDietType}>
                      <SelectTrigger className="w-full bg-slate-900 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                        {Object.entries(dietPlans).map(([key, plan]) => (
                          <SelectItem key={key} value={key} className="focus:bg-slate-800">
                            {plan.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-slate-950 font-bold h-12 text-base">
                      Calculate Macros
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm} className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800">
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>

              {result && (
                <CardFooter className="flex-col items-center mt-6 p-6 bg-slate-900/80 border-t border-slate-700 rounded-b-lg">
                  <div className="w-full space-y-4">
                    <h3 className="text-center text-lg font-bold text-white">
                      Your Daily Targets ({result.calories} kcal Budget):
                    </h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-sky-800/40">
                        <p className="text-xs uppercase tracking-wider text-sky-400 font-bold">Protein (4 kcal/g)</p>
                        <p className="text-4xl font-black text-sky-300 mt-1">{result.proteinGrams}g</p>
                        <p className="text-xs text-slate-400 mt-1">{Math.round(result.proteinGrams * 4)} kcal</p>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-emerald-800/40">
                        <p className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Carbs (4 kcal/g)</p>
                        <p className="text-4xl font-black text-emerald-300 mt-1">{result.carbsGrams}g</p>
                        <p className="text-xs text-slate-400 mt-1">{Math.round(result.carbsGrams * 4)} kcal</p>
                      </div>
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-amber-800/40">
                        <p className="text-xs uppercase tracking-wider text-amber-400 font-bold">Fat (9 kcal/g)</p>
                        <p className="text-4xl font-black text-amber-300 mt-1">{result.fatGrams}g</p>
                        <p className="text-xs text-slate-400 mt-1">{Math.round(result.fatGrams * 9)} kcal</p>
                      </div>
                    </div>

                    <div className="w-full p-4 rounded-xl bg-gradient-to-r from-sky-950/40 to-slate-900/60 border border-sky-500/30 flex items-start gap-3 text-left my-3">
                      <div className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-sky-400 block mb-1">Recommended Macro Tracking Tool: Digital Food Scale</strong>
                        Tracking macros using volumetric cups or visual guessing carries an average error rate of 25% to 35%. Using a precision digital food scale to weigh portions in raw grams ensures exact caloric alignment.
                      </div>
                    </div>
                    <div className="mt-4">
                      <ShareResults
                        title="My Macro Targets"
                        text={`My daily macro breakdown: ${result.proteinGrams}g Protein, ${result.carbsGrams}g Carbs, ${result.fatGrams}g Fat (${result.calories} kcal). Calculate yours on CalcZoon:`}
                        url="/health/macro-calculator"
                      />
                    </div>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <PieChart className="text-primary w-5 h-5" /> Diet Presets Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                {Object.values(dietPlans).map(plan => (
                  <div key={plan.label} className="pb-2 border-b border-slate-700/60 last:border-0">
                    <p className="font-semibold text-white text-xs">{plan.label}</p>
                    <p className="text-xs text-slate-400">
                      P: {Math.round(plan.p * 100)}% | C: {Math.round(plan.c * 100)}% | F: {Math.round(plan.f * 100)}%
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <RelatedTools />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,100 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10 mb-12">
          {/* Section 1: The Physiology of Macronutrients */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-white">
              <Weight className="text-primary w-7 h-7" /> What is a Macro Calculator & The Science of Flexible Dieting
            </h2>
            <p className="text-base md:text-lg">
              A <strong>Macronutrient (Macro) Calculator</strong> translates gross daily energy targets (calories) into precise gram requirements for the three core biological macronutrients: <strong>Protein, Carbohydrates, and Dietary Fats</strong>. In sports nutrition and clinical dietetics, this paradigm is recognized as "Flexible Dieting" or "IIFYM" (If It Fits Your Macros).
            </p>
            <p>
              Unlike restrictive fad diets that arbitrarily eliminate entire food groups, macro tracking acknowledges that thermodynamic energy balance (calories in vs calories out) dictates total weight fluctuations, while the specific distribution of macronutrients directs body composition (the ratio of lean skeletal muscle mass to adipose fat mass). By synchronizing macro splits with resistance training, athletes preserve metabolic rate and prevent lean tissue catabolism during caloric deficits.
            </p>
          </div>

          {/* Section 2: Mathematical Formulas & Energy Densities */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Mathematical Formulas & Caloric Densities
            </h2>
            <p>
              Each macronutrient yields a specific enthalpy of combustion (energy density per gram). Converting total daily calories into grams relies on standard Atwater physiological factors:
            </p>
            <div className="grid md:grid-cols-3 gap-4 my-4 font-mono text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-sky-800/40 space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider">Protein Formula (4 kcal/g)</p>
                <p className="text-white text-sm font-semibold">Protein (g) = (Calories × P%) ÷ 4</p>
                <p className="text-slate-400">Thermic Effect of Food: ~20–30% of energy expended during assimilation.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-800/40 space-y-2">
                <p className="text-emerald-400 font-bold uppercase tracking-wider">Carb Formula (4 kcal/g)</p>
                <p className="text-white text-sm font-semibold">Carbs (g) = (Calories × C%) ÷ 4</p>
                <p className="text-slate-400">Primary fuel for central nervous system and muscular glycogen stores.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-800/40 space-y-2">
                <p className="text-amber-400 font-bold uppercase tracking-wider">Fat Formula (9 kcal/g)</p>
                <p className="text-white text-sm font-semibold">Fat (g) = (Calories × F%) ÷ 9</p>
                <p className="text-slate-400">Essential for cell wall lipid bilayers and fat-soluble vitamin absorption (A, D, E, K).</p>
              </div>
            </div>
          </div>

          {/* Section 3: Strategic Bulking vs Cutting Ratios */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-white">
              <Utensils className="text-primary w-7 h-7" /> Strategic Bulking vs Cutting Protocol Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-emerald-800/40 space-y-3">
                <h3 className="text-lg font-bold text-emerald-400">Hypertrophy & Muscle Gain (Bulking)</h3>
                <p className="text-sm">
                  To synthesize new contractile muscle tissue, consume a controlled caloric surplus (+250 to +400 kcal above maintenance). High carbohydrate availability powers high-volume lifting sessions and spikes insulin, which helps drive amino acids into muscle cells.
                </p>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  <li><strong>Target Split:</strong> 30% Protein / 45–50% Carbs / 20–25% Fat</li>
                  <li><strong>Protein Intake:</strong> 1.6 to 2.2 g/kg body weight</li>
                  <li><strong>Carb Density:</strong> Ample complex starches around workout windows</li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-rose-800/40 space-y-3">
                <h3 className="text-lg font-bold text-rose-400">Fat Loss & Muscle Retention (Cutting)</h3>
                <p className="text-sm">
                  Requires a moderate caloric deficit (-350 to -500 kcal below maintenance). Protein must be elevated to prevent muscle breakdown when glycogen stores are depleted, while high protein also enhances fullness and satiety.
                </p>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  <li><strong>Target Split:</strong> 40% Protein / 30–35% Carbs / 25–30% Fat</li>
                  <li><strong>Protein Intake:</strong> 2.0 to 2.6 g/kg of lean body mass</li>
                  <li><strong>Satiety Focus:</strong> High-volume, fibrous vegetables and lean poultry/fish</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4: Real-World Numerical Worked Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Real-World Numerical Worked Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-rose-400 font-mono font-bold">Cutting Scenario</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">80 kg Lifter</span>
                </div>
                <h3 className="text-lg font-bold text-white">Target: 2,000 kcal Cutting Diet</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Diet Split:</strong> High Protein (40% P / 35% C / 25% F)</li>
                  <li><strong>Protein Grams:</strong> (2000 × 0.40) ÷ 4 = <span className="text-sky-400 font-bold">200g (800 kcal)</span></li>
                  <li><strong>Carb Grams:</strong> (2000 × 0.35) ÷ 4 = <span className="text-emerald-400 font-bold">175g (700 kcal)</span></li>
                  <li><strong>Fat Grams:</strong> (2000 × 0.25) ÷ 9 = <span className="text-amber-400 font-bold">56g (500 kcal)</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Outcome: At 2.5g protein per kg of body mass, muscle retention is prioritized while a 500 kcal deficit ensures consistent fat loss.
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-bold">Bulking Scenario</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">70 kg Athlete</span>
                </div>
                <h3 className="text-lg font-bold text-white">Target: 2,800 kcal Lean Bulk</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Diet Split:</strong> Balanced Hypertrophy (30% P / 45% C / 25% F)</li>
                  <li><strong>Protein Grams:</strong> (2800 × 0.30) ÷ 4 = <span className="text-sky-400 font-bold">210g (840 kcal)</span></li>
                  <li><strong>Carb Grams:</strong> (2800 × 0.45) ÷ 4 = <span className="text-emerald-400 font-bold">315g (1,260 kcal)</span></li>
                  <li><strong>Fat Grams:</strong> (2800 × 0.25) ÷ 9 = <span className="text-amber-400 font-bold">78g (700 kcal)</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Outcome: 315g of carbohydrates saturates muscle glycogen, maximizing progressive overload and performance in the gym.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Common Tracking Pitfalls */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="text-amber-400 w-6 h-6" /> Common Macro Tracking Pitfalls to Avoid
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Eyeballing Cooking Oils and Dressings
                </h3>
                <p className="text-xs text-slate-400">
                  A single tablespoon of olive oil or butter contains ~14g of pure fat (126 kcal). Free-pouring oil directly into a skillet can inadvertently add 300 unrecorded calories, erasing an entire daily caloric deficit.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Confusing Net Carbs with Total Carbs
                </h3>
                <p className="text-xs text-slate-400">
                  Processed "keto" snacks often subtract large quantities of synthetic fibers and sugar alcohols. While pure insoluble fiber is indigestible, certain modified starches still provide ~2 kcal/g and can stall weight loss.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Dropping Fats Below 15% of Calories
                </h3>
                <p className="text-xs text-slate-400">
                  Excessively low-fat diets impair endocrine function, leading to suppressed free testosterone, disrupted menstrual regulation in females, dry skin, and impaired absorption of vitamins A, D, E, and K.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Neglecting Dietary Micronutrients
                </h3>
                <p className="text-xs text-slate-400">
                  "If It Fits Your Macros" does not mean eating junk food exclusively. Processed foods lack potassium, magnesium, and dietary fiber, which are critical for cardiovascular health, gut microbiome diversity, and blood pressure control.
                </p>
              </div>
            </div>
          </div>

          {/* Static HTML Reference Benchmark Table */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Daily Macronutrient Targets Benchmark Table (Balanced vs High-Protein)</h2>
            <p className="text-sm text-slate-400">
              The nutritional benchmark table below outlines precise daily gram targets for protein, carbohydrates, and fats across various daily energy intake levels based on standard Atwater factors (4 kcal/g for protein &amp; carbs, 9 kcal/g for fats).
            </p>
            <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-slate-950">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                    <th className="p-3 font-semibold">Daily Calories</th>
                    <th className="p-3 font-semibold">Diet Architecture</th>
                    <th className="p-3 font-semibold text-sky-400">Protein (g)</th>
                    <th className="p-3 font-semibold text-emerald-400">Carbohydrates (g)</th>
                    <th className="p-3 font-semibold text-amber-400">Fats (g)</th>
                    <th className="p-3 font-semibold">Primary Fitness Objective</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">1,500 kcal</td><td className="p-3">Balanced (30/40/30)</td><td className="p-3 text-sky-400 font-mono">113g (450 kcal)</td><td className="p-3 text-emerald-400 font-mono">150g (600 kcal)</td><td className="p-3 text-amber-400 font-mono">50g (450 kcal)</td><td className="p-3">Female Caloric Deficit (Fat Loss)</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">1,500 kcal</td><td className="p-3">High Protein (40/35/25)</td><td className="p-3 text-sky-400 font-bold">150g (600 kcal)</td><td className="p-3 text-emerald-400 font-mono">131g (525 kcal)</td><td className="p-3 text-amber-400 font-mono">42g (375 kcal)</td><td className="p-3">Aggressive Lean Tissue Retention</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">1,800 kcal</td><td className="p-3">Balanced (30/40/30)</td><td className="p-3 text-sky-400 font-mono">135g (540 kcal)</td><td className="p-3 text-emerald-400 font-mono">180g (720 kcal)</td><td className="p-3 text-amber-400 font-mono">60g (540 kcal)</td><td className="p-3">Moderate Deficit / Recomposition</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">2,000 kcal</td><td className="p-3">Balanced (30/40/30)</td><td className="p-3 text-sky-400 font-mono">150g (600 kcal)</td><td className="p-3 text-emerald-400 font-mono">200g (800 kcal)</td><td className="p-3 text-amber-400 font-mono">67g (600 kcal)</td><td className="p-3">Standard Adult Maintenance</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">2,000 kcal</td><td className="p-3">High Protein (40/35/25)</td><td className="p-3 text-sky-400 font-bold">200g (800 kcal)</td><td className="p-3 text-emerald-400 font-mono">175g (700 kcal)</td><td className="p-3 text-amber-400 font-mono">56g (500 kcal)</td><td className="p-3">Athletic Cutting &amp; Muscle Hardening</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">2,200 kcal</td><td className="p-3">Balanced (30/40/30)</td><td className="p-3 text-sky-400 font-mono">165g (660 kcal)</td><td className="p-3 text-emerald-400 font-mono">220g (880 kcal)</td><td className="p-3 text-amber-400 font-mono">73g (660 kcal)</td><td className="p-3">Active Male Deficit / Female Maintenance</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">2,500 kcal</td><td className="p-3">Balanced (30/40/30)</td><td className="p-3 text-sky-400 font-mono">188g (750 kcal)</td><td className="p-3 text-emerald-400 font-mono">250g (1000 kcal)</td><td className="p-3 text-amber-400 font-mono">83g (750 kcal)</td><td className="p-3">Active Training Maintenance</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">2,500 kcal</td><td className="p-3">High Protein (40/35/25)</td><td className="p-3 text-sky-400 font-bold">250g (1000 kcal)</td><td className="p-3 text-emerald-400 font-mono">219g (875 kcal)</td><td className="p-3 text-amber-400 font-mono">69g (625 kcal)</td><td className="p-3">Strength Athlete Recomposition</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">3,000 kcal</td><td className="p-3">Balanced (30/40/30)</td><td className="p-3 text-sky-400 font-mono">225g (900 kcal)</td><td className="p-3 text-emerald-400 font-mono">300g (1200 kcal)</td><td className="p-3 text-amber-400 font-mono">100g (900 kcal)</td><td className="p-3">Hypertrophy / Lean Muscle Bulking</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-mono text-white">3,500 kcal</td><td className="p-3">High Carb Performance (25/55/20)</td><td className="p-3 text-sky-400 font-mono">219g (875 kcal)</td><td className="p-3 text-emerald-400 font-bold">481g (1925 kcal)</td><td className="p-3 text-amber-400 font-mono">78g (700 kcal)</td><td className="p-3">Endurance / Heavy Volume Mass Building</td></tr>
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
              Clinical References & Related Health Calculators
            </h3>
            <ul className="text-xs text-slate-400 space-y-1.5">
              <li>• Morton RW, et al. A systematic review and meta-analysis of protein supplementation on resistance training gains. <em>British Journal of Sports Medicine</em>, 52(6):376-384 (2018).</li>
              <li>• Jäger R, et al. International Society of Sports Nutrition Position Stand: protein and exercise. <em>Journal of the International Society of Sports Nutrition</em>, 14(1):20 (2017).</li>
              <li>• Helms ER, et al. Evidence-based recommendations for natural bodybuilding contest preparation: nutrition and supplementation. <em>JISSN</em>, 11(1):20 (2014).</li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/health/tdee-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-primary px-3 py-1.5 rounded border border-slate-700 transition">
                Find Your Maintenance Calories (TDEE) →
              </Link>
              <Link to="/health/body-fat-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-primary px-3 py-1.5 rounded border border-slate-700 transition">
                Measure Lean Body Mass & Body Fat % →
              </Link>
              <Link to="/health/calories-burned-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-primary px-3 py-1.5 rounded border border-slate-700 transition">
                Calculate Workout Calories Burned →
              </Link>
              <Link to="/health/bmi-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-primary px-3 py-1.5 rounded border border-slate-700 transition">
                Check Body Mass Index (BMI) →
              </Link>
            </div>
          </div>

          <Disclaimer text="Macronutrient recommendations generated by this tool are designed for general fitness and educational purposes. Individuals with clinical renal disease, metabolic syndrome, or specific medical dietary constraints should seek guidance from a registered dietitian or licensed physician." />
        </section>
      </div>
    </>
  );
};

export default MacroCalculator;

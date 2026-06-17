import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Target, PieChart, Info, Weight, Utensils, BrainCircuit } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { saveCalculation } from '@/lib/history';
import Faq from '@/components/Faq';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import ShareResults from '@/components/ShareResults';
import AdPlaceholder from '@/components/AdPlaceholder';

const MacroCalculator = () => {
  const [calories, setCalories] = useState('');
  const [dietType, setDietType] = useState('balanced');
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const dietPlans = {
    balanced: { p: 0.30, c: 0.40, f: 0.30, label: 'Balanced' },
    lowCarb: { p: 0.40, c: 0.20, f: 0.40, label: 'Low Carb' },
    lowFat: { p: 0.30, c: 0.50, f: 0.20, label: 'Low Fat' },
    highProtein: { p: 0.40, c: 0.30, f: 0.30, label: 'High Protein / Bulking' },
    keto: { p: 0.25, c: 0.05, f: 0.70, label: 'Ketogenic' },
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
      inputs: { calories, dietType },
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

  const pageTitle = "Macro Calculator: Find Your Optimal Macronutrient Ratio";
  const pageDescription = "Calculate your ideal daily intake of protein, carbs, and fats based on your fitness goals (lose weight, gain muscle, or maintain). Get a personalized macronutrient split.";
  const canonicalUrl = "https://calczoon.com/health/macro-calculator";
  
  const faqItems = [
    { question: "What are macronutrients?", answer: "Macronutrients, or 'macros', are the three primary nutrients your body needs in large amounts: protein, carbohydrates, and fats. Each provides energy and serves different functions in the body." },
    { question: "Why is tracking macros important for weight loss?", answer: "While calorie intake determines weight change, the macronutrient composition of your diet can significantly affect body composition (muscle vs. fat), energy levels, and overall health. A higher protein intake, for example, increases satiety and helps preserve muscle during a calorie deficit." },
    { question: "How much protein do I need for muscle gain?", answer: "For building muscle, a general guideline is to consume about 1.6 to 2.2 grams of protein per kilogram of body weight (or around 0.7 to 1.0 grams per pound). This provides the necessary amino acids for muscle repair and growth." },
    { question: "What's a good macro split for muscle gain?", answer: "A common macro split for a lean bulk is 40% protein, 30% carbohydrates, and 30% fat. This provides ample protein for muscle synthesis, enough carbs to fuel intense workouts, and sufficient fats for hormone regulation." },
    { question: "Should I adjust my macros on rest days?", answer: "Some people practice 'carb cycling', where they consume fewer carbs on rest days and more on training days. While it can be effective, it's not necessary for most people. Maintaining a consistent daily macro target is often simpler and yields great results as long as your weekly calorie and protein goals are met." },
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={Target} />
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Calculate Your Daily Macros</CardTitle>
                <CardDescription>Enter your daily calorie target and choose a diet plan to get your personalized macronutrient breakdown.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateMacros} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="calories">Daily Calorie Goal (kcal)</Label>
                    <Input id="calories" type="number" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="e.g., 2000" required className="bg-slate-900 border-slate-700" />
                    <p className="text-xs text-slate-300">Tip: Use our <a href="/health/tdee-calculator" className="text-primary hover:underline">TDEE Calculator</a> to find your calorie goal.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dietType">Choose a Diet Plan</Label>
                    <Select value={dietType} onValueChange={setDietType}>
                      <SelectTrigger className="w-full bg-slate-900 border-slate-700"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(dietPlans).map(([key, {label}]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Calculate Macros</Button>
                    <Button type="button" variant="secondary" onClick={resetForm}>Reset</Button>
                  </div>
                </form>
              </CardContent>
              {result && (
                <CardFooter className="flex-col items-center mt-6">
                    <h3 className="text-xl font-bold mb-4">Your Daily Macro Targets for {result.planLabel}</h3>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-blue-900/50 rounded-lg border border-blue-700">
                            <p className="text-blue-400 font-bold">Protein</p>
                            <p className="text-3xl font-bold text-white">{result.proteinGrams}g</p>
                        </div>
                        <div className="p-4 bg-green-900/50 rounded-lg border border-green-700">
                            <p className="text-green-400 font-bold">Carbohydrates</p>
                            <p className="text-3xl font-bold text-white">{result.carbsGrams}g</p>
                        </div>
                        <div className="p-4 bg-yellow-900/50 rounded-lg border border-yellow-700">
                            <p className="text-yellow-400 font-bold">Fat</p>
                            <p className="text-3xl font-bold text-white">{result.fatGrams}g</p>
                        </div>
                    </div>
                     <div className="mt-4 w-full">
                        <ShareResults 
                            title="My Daily Macros" 
                            text={`My macro targets for a ${result.calories} kcal diet are: Protein ${result.proteinGrams}g, Carbs ${result.carbsGrams}g, Fat ${result.fatGrams}g. Calculated via Calczoon!`}
                            url={canonicalUrl}
                        />
                    </div>
                </CardFooter>
              )}
            </Card>
          </div>
          <aside className="lg:col-span-1 space-y-6">
            <AdPlaceholder className="h-60"/>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader><CardTitle className="flex items-center gap-2"><PieChart/> Macro Ratios</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {Object.values(dietPlans).map(plan => (
                  <div key={plan.label}>
                    <p className="font-semibold text-white">{plan.label}</p>
                    <p className="text-xs text-slate-300">
                      P: {plan.p*100}% | C: {plan.c*100}% | F: {plan.f*100}%
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <RelatedTools />
          </aside>
        </div>

        {/* Deep SEO Informational Section with Scientific References */}
        <section className="mt-16 bg-slate-800/20 rounded-2xl border border-slate-700/40 p-8 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-8 mb-12">
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-white"><Weight className="text-primary"/> The Science of Macronutrients</h2>
            <p>
              Macronutrients—protein, carbohydrates, and fats—are the primary structural and energy-providing components of the human diet. Unlike micronutrients (vitamins and minerals) which are required in trace amounts, macronutrients are necessary in large quantities to sustain metabolic function, cellular repair, and daily activity.
            </p>
            <p>
              By scientifically tracking and optimizing the ratio of these macronutrients (often referred to as "Flexible Dieting" or "IIFYM - If It Fits Your Macros"), individuals can achieve precise body composition goals, ranging from clinical weight loss to athletic hypertrophy (muscle gain).
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Understanding The Big Three</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-4">
              <div className="bg-slate-900/50 p-6 border border-blue-900/50 rounded-xl">
                <h3 className="text-blue-400 font-bold mb-2">Protein (4 kcal/g)</h3>
                <p className="text-sm">The primary building block for muscle tissue, enzymes, and hormones. High-protein diets increase thermogenesis and satiety, making them highly effective for fat loss and muscle preservation.</p>
              </div>
              <div className="bg-slate-900/50 p-6 border border-green-900/50 rounded-xl">
                <h3 className="text-green-400 font-bold mb-2">Carbohydrates (4 kcal/g)</h3>
                <p className="text-sm">The body's preferred and most efficient energy source. Carbohydrates are stored as glycogen in muscles and the liver, powering intense physical exertion and central nervous system function.</p>
              </div>
              <div className="bg-slate-900/50 p-6 border border-yellow-900/50 rounded-xl">
                <h3 className="text-yellow-400 font-bold mb-2">Fats (9 kcal/g)</h3>
                <p className="text-sm">Essential for endocrine (hormonal) health, vitamin absorption (A, D, E, K), and cellular membrane integrity. Fats are the most calorie-dense macronutrient.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-white"><Utensils className="text-primary"/> Strategic Bulking vs. Cutting</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-emerald-400 mb-2">Hypertrophy (Bulking)</h4>
                    <p className="text-sm mb-2">To build muscle mass, a caloric surplus (consuming more than your TDEE) combined with a high protein intake is required. A balanced ratio of 40% Carbs, 30% Protein, and 30% Fat ensures adequate recovery and growth.</p>
                    <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        <li>Focus on progressive overload</li>
                        <li>Maintain a +300 to +500 kcal surplus</li>
                        <li>High carbohydrate availability for training</li>
                    </ul>
                </div>
                <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700">
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-rose-400 mb-2">Fat Loss (Cutting)</h4>
                    <p className="text-sm mb-2">Requires a caloric deficit (consuming less than your TDEE). Protein intake must remain high (often 40% of total calories) to prevent muscle catabolism while losing fat tissue.</p>
                     <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        <li>Maintain a -300 to -500 kcal deficit</li>
                        <li>Prioritize high-satiety foods</li>
                        <li>Moderate to lower carbohydrates</li>
                    </ul>
                </div>
            </div>
          </div>

          {/* Scientific References Section */}
          <div className="mt-10 pt-6 border-t border-slate-700/50">
            <h3 className="text-lg font-bold text-slate-300 mb-3 uppercase tracking-wider text-sm">Scientific References & Sources</h3>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>1. Jäger, R., Kerksick, C. M., Campbell, B. I., et al. (2017). International Society of Sports Nutrition Position Stand: protein and exercise. <em>Journal of the International Society of Sports Nutrition</em>, 14(1), 20.</li>
              <li>2. Helms, E. R., Aragon, A. A., & Fitschen, P. J. (2014). Evidence-based recommendations for natural bodybuilding contest preparation: nutrition and supplementation. <em>Journal of the International Society of Sports Nutrition</em>, 11(1), 20.</li>
              <li>3. Morton, R. W., Murphy, K. T., McKellar, S. R., et al. (2018). A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. <em>British Journal of Sports Medicine</em>, 52(6), 376-384.</li>
              <li>4. Dietary Guidelines for Americans, 2020-2025. U.S. Department of Agriculture and U.S. Department of Health and Human Services.</li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} />
      </div>
    </>
  );
};

export default MacroCalculator;
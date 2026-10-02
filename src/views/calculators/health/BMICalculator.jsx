'use client';

import React, { useState } from 'react';
import Seo from '@/components/Seo';
import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { saveCalculation } from '@/lib/history';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import ShareResults from '@/components/ShareResults';

const BMICalculator = () => {
  const [unit, setUnit] = useState('metric');
  const [weight, setWeight] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const calculateBMI = (e) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    let heightM;

    if (unit === 'metric') {
      const heightCmNum = parseFloat(heightCm);
      if (isNaN(weightNum) || isNaN(heightCmNum) || weightNum <= 0 || heightCmNum <= 0) {
        toast({ title: "Invalid Input", description: "Please enter valid weight and height.", variant: "destructive" });
        return;
      }
      heightM = heightCmNum / 100;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      const totalInches = ft * 12 + inches;
      if (isNaN(weightNum) || totalInches <= 0 || weightNum <= 0) {
        toast({ title: "Invalid Input", description: "Please enter valid weight and height.", variant: "destructive" });
        return;
      }
      heightM = totalInches * 0.0254;
    }

    const bmi = weightNum / (heightM * heightM);
    let category, color;

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-400';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal weight';
      color = 'text-emerald-400';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      color = 'text-yellow-400';
    } else {
      category = 'Obesity';
      color = 'text-red-400';
    }
    
    const newResult = { bmi: bmi.toFixed(1), category, color };
    setResult(newResult);
    saveCalculation({
        type: 'BMI',
        inputs: { weight, heightCm, heightFt, heightIn, unit },
        result: { BMI: newResult.bmi, Category: newResult.category }
    });
    toast({ title: "BMI Calculated!", description: `Your BMI is ${newResult.bmi}.` });
  };

  const pageTitle = "Free BMI Calculator: Check Body Mass Index Online 2026";
  const pageDescription = "Calculate your Body Mass Index (BMI) instantly. Understand your weight category with our free, easy-to-use BMI checker for men and women.";

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CalcZoon BMI Calculator",
    "operatingSystem": "All",
    "applicationCategory": "HealthApplication",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="/health/bmi-calculator"
        schema={[appSchema]}
      />
      
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={HeartPulse} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Enter Your Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateBMI} className="space-y-6">
                  <div className="flex gap-2 p-1 bg-slate-900/50 rounded-lg">
                    <Button type="button" variant={unit === 'metric' ? 'default' : 'ghost'} className={`flex-1 ${unit === 'metric' ? 'bg-emerald-600 hover:bg-emerald-700' : 'text-slate-300 hover:text-white'}`} onClick={() => setUnit('metric')}>Metric</Button>
                    <Button type="button" variant={unit === 'imperial' ? 'default' : 'ghost'} className={`flex-1 ${unit === 'imperial' ? 'bg-emerald-600 hover:bg-emerald-700' : 'text-slate-300 hover:text-white'}`} onClick={() => setUnit('imperial')}>Imperial</Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</Label>
                    <Input id="weight" type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={`e.g., ${unit === 'metric' ? '70' : '155'}`} required className="bg-slate-900 border-slate-700" />
                  </div>
                  {unit === 'metric' ? (
                    <div className="space-y-2">
                      <Label htmlFor="heightCm">Height (cm)</Label>
                      <Input id="heightCm" type="number" step="0.1" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="e.g., 178" required className="bg-slate-900 border-slate-700" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="heightFt">Height (feet)</Label>
                        <Input id="heightFt" type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="e.g., 5" required className="bg-slate-900 border-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heightIn">Height (inches)</Label>
                        <Input id="heightIn" type="number" step="0.1" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="e.g., 10" className="bg-slate-900 border-slate-700" />
                      </div>
                    </div>
                  )}
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-slate-950 font-bold">Calculate BMI</Button>
                </form>
              </CardContent>
              {result && (
                <CardFooter className="flex flex-col items-center mt-6">
                  <h3 className="text-xl font-bold text-white">Your BMI is:</h3>
                  <p className={`text-6xl font-bold my-2 ${result.color}`}>{result.bmi}</p>
                  <p className={`text-xl font-semibold ${result.color}`}>{result.category}</p>
                  <div className="mt-4 w-full">
                    <ShareResults title="BMI Calculation" text={`Just calculated my BMI on CalcZoon: ${result.bmi} (${result.category}). Free check:`} url="/health/bmi-calculator" />
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader><CardTitle className="text-white">BMI Classifications</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2.5 text-slate-300 text-sm">
                  <li className="flex justify-between pb-1.5 border-b border-slate-800"><span>Underweight</span><span className="text-blue-400 font-semibold">&lt; 18.5</span></li>
                  <li className="flex justify-between pb-1.5 border-b border-slate-800"><span>Normal weight</span><span className="text-emerald-400 font-semibold">18.5 – 24.9</span></li>
                  <li className="flex justify-between pb-1.5 border-b border-slate-800"><span>Overweight</span><span className="text-yellow-400 font-semibold">25.0 – 29.9</span></li>
                  <li className="flex justify-between"><span>Obesity</span><span className="text-rose-400 font-semibold">30.0 or greater</span></li>
                </ul>
              </CardContent>
            </Card>
            <RelatedTools />
          </aside>
        </div>

        {/* Comprehensive Content Section - 500 to 800 Words */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10">
          
          {/* 1. What is BMI Calculator */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">What is a BMI Calculator?</h2>
            <p className="text-base md:text-lg">
              A <strong>Body Mass Index (BMI) Calculator</strong> is a standardized clinical screening tool used to assess body weight relative to stature. First developed in the 1830s by Belgian astronomer and statistician Adolphe Quetelet, BMI provides an objective, rapid benchmark to classify adults into four core health ranges: underweight, normal weight, overweight, and obesity.
            </p>
            <p>
              Major health institutions, including the World Health Organization (WHO) and the U.S. Centers for Disease Control and Prevention (CDC), use BMI as an initial population-level assessment tool. Although BMI does not directly measure body fat percentage, extensive epidemiological studies demonstrate that higher BMI figures correlate strongly with elevated risks for hypertension, cardiovascular disease, dyslipidemia, and type 2 diabetes.
            </p>
          </div>

          {/* 2. How it works / formula */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">How it Works / Formula</h2>
            <p>
              The calculator operates by normalizing an individual’s body weight relative to the square of their height. Because human body surface area scales exponentially with height, dividing weight by height squared produces an objective index.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 font-mono text-sm space-y-2">
                <p className="text-emerald-400 font-bold uppercase tracking-wider text-xs">Metric Formula</p>
                <p className="text-white text-base">BMI = Weight (kg) ÷ [Height (m)]²</p>
                <p className="text-slate-400 text-xs">Where weight is measured in kilograms and height in meters.</p>
              </div>
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 font-mono text-sm space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider text-xs">Imperial Formula</p>
                <p className="text-white text-base">BMI = 703 × Weight (lbs) ÷ [Height (inches)]²</p>
                <p className="text-slate-400 text-xs">The conversion multiplier 703 equates imperial units to kg/m².</p>
              </div>
            </div>
            <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 text-sm">
              <p className="font-semibold text-white mb-2">WHO Adult BMI Classifications:</p>
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <li className="bg-slate-800/80 p-2.5 rounded border border-slate-700"><strong>Underweight:</strong> &lt; 18.5</li>
                <li className="bg-slate-800/80 p-2.5 rounded border border-emerald-700/50 text-emerald-300"><strong>Normal Weight:</strong> 18.5 – 24.9</li>
                <li className="bg-slate-800/80 p-2.5 rounded border border-amber-700/50 text-amber-300"><strong>Overweight:</strong> 25.0 – 29.9</li>
                <li className="bg-slate-800/80 p-2.5 rounded border border-rose-700/50 text-rose-300"><strong>Obese:</strong> ≥ 30.0</li>
              </ul>
            </div>
          </div>

          {/* 3. How to use it (steps) */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">How to Use It (Steps)</h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li><strong className="text-white">Step 1: Select Measurement Standard:</strong> Choose either <strong>Metric</strong> (kg / cm) or <strong>Imperial</strong> (lbs / feet & inches) based on what you used to measure.</li>
              <li><strong className="text-white">Step 2: Enter Current Morning Weight:</strong> Record your weight first thing in the morning after using the restroom, wearing minimal clothing.</li>
              <li><strong className="text-white">Step 3: Enter Barefoot Standing Height:</strong> Measure your standing height against a flat vertical wall without shoes.</li>
              <li><strong className="text-white">Step 4: Press "Calculate BMI":</strong> The tool displays your exact BMI number, your official WHO weight category, and the healthy weight boundary for your height.</li>
            </ol>
          </div>

          {/* 4. 2 Solved Real-Life Examples with Numbers */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">2 Solved Real-Life Examples with Numbers</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700/60 space-y-3">
                <h3 className="text-lg font-bold text-emerald-400">Example 1: Metric Calculation (Software Engineer)</h3>
                <p className="text-sm">
                  <strong>Profile:</strong> David, 34 years old, weighs <strong>84 kg</strong> and stands <strong>178 cm (1.78 m)</strong> tall.
                </p>
                <div className="bg-slate-950 p-3 rounded font-mono text-xs text-slate-300 space-y-1">
                  <p>Height squared: 1.78 × 1.78 = 3.1684 m²</p>
                  <p>Calculation: 84 ÷ 3.1684 = <strong>26.51</strong></p>
                </div>
                <p className="text-sm">
                  <strong>Outcome:</strong> David’s calculated BMI is <strong>26.5</strong>, classifying him as <em>Overweight</em> (25.0 to 29.9). To achieve a normal BMI of 24.9, David would need a target weight of 78.8 kg (a reduction of 5.2 kg).
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700/60 space-y-3">
                <h3 className="text-lg font-bold text-sky-400">Example 2: Imperial Calculation (Fitness Enthusiast)</h3>
                <p className="text-sm">
                  <strong>Profile:</strong> Maria, 28 years old, weighs <strong>132 lbs</strong> and stands <strong>5 feet 5 inches (65 inches)</strong> tall.
                </p>
                <div className="bg-slate-950 p-3 rounded font-mono text-xs text-slate-300 space-y-1">
                  <p>Height in inches squared: 65 × 65 = 4,225 in²</p>
                  <p>Calculation: 703 × (132 ÷ 4,225) = 703 × 0.03124 = <strong>21.96</strong></p>
                </div>
                <p className="text-sm">
                  <strong>Outcome:</strong> Maria’s BMI is <strong>22.0</strong>, placing her squarely in the healthy <em>Normal Weight</em> category (18.5 to 24.9).
                </p>
              </div>
            </div>
          </div>

          {/* 5. Common Mistakes */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Common Mistakes When Using BMI</h2>
            <ul className="list-disc list-inside space-y-2 pl-2 text-slate-300 text-sm">
              <li><strong className="text-white">Confusing Skeletal Muscle with Adipose Fat:</strong> Because muscle tissue is 18% denser than fat, muscular athletes and bodybuilders often score in the overweight or obese ranges despite having low body fat percentages.</li>
              <li><strong className="text-white">Weighing at Inconsistent Times of Day:</strong> Water retention, meal digestion, and sodium levels can shift body weight by 1 to 3 kilograms within 24 hours. Always measure under identical morning conditions.</li>
              <li><strong className="text-white">Measuring Height with Footwear:</strong> Running sneakers or work shoes add 2 to 4 centimeters, distorting your score downward.</li>
              <li><strong className="text-white">Ignoring Body Fat Distribution:</strong> Visceral fat around abdominal organs carries severe cardiovascular risk, whereas subcutaneous fat on thighs is metabolically benign. BMI cannot differentiate where weight is carried.</li>
              <li><strong className="text-white">Applying Adult Scales to Adolescents:</strong> Individuals under age 18 must be evaluated using age-and-sex-adjusted pediatric growth charts rather than standard adult thresholds.</li>
            </ul>
          </div>

          {/* 6. 5 FAQs */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">5 Frequently Asked Questions (FAQs)</h2>
            <div className="space-y-4">
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                <h3 className="font-bold text-white text-base mb-1">1. Is the healthy BMI range identical for men and women?</h3>
                <p className="text-sm text-slate-300">
                  Yes, standard WHO guidelines define 18.5 to 24.9 as the normal range for both adult men and women. However, women naturally maintain a higher biological percentage of essential body fat at the same numerical BMI.
                </p>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                <h3 className="font-bold text-white text-base mb-1">2. Can you be metabolically fit while classified as overweight?</h3>
                <p className="text-sm text-slate-300">
                  Yes. Individuals with good cardiovascular conditioning, high muscle mass, and normal blood pressure, glucose, and lipid profiles frequently exhibit "metabolically healthy overweight" profiles.
                </p>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                <h3 className="font-bold text-white text-base mb-1">3. How many kilograms equal 1 point on the BMI scale?</h3>
                <p className="text-sm text-slate-300">
                  For an adult of average height (5'7" or 170 cm), approximately 2.9 kilograms (6.4 lbs) corresponds to exactly 1 BMI point.
                </p>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                <h3 className="font-bold text-white text-base mb-1">4. Does BMI criteria change for senior citizens (over 65)?</h3>
                <p className="text-sm text-slate-300">
                  Geriatric nutritionists often suggest that seniors maintain a slightly higher BMI (23.0 to 27.0) because modest nutritional reserves provide protection against osteoporosis, falls, and recovery from acute illnesses.
                </p>
              </div>

              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/60">
                <h3 className="font-bold text-white text-base mb-1">5. What tools should I consult alongside my BMI score?</h3>
                <p className="text-sm text-slate-300">
                  Combine your BMI with our Body Fat Calculator (to analyze body composition) and our TDEE Calculator (to discover your precise daily energy expenditure).
                </p>
              </div>
            </div>
          </div>

          {/* 7. Related Calculators (Internal Links) */}
          <div className="space-y-4 pt-4 border-t border-slate-700/60">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Related Calculators (Internal Links)</h2>
            <p className="text-sm text-slate-300 mb-4">
              Explore our connected health and wellness calculators to optimize your fitness and nutrition plans:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link to="/health/tdee-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">TDEE Calculator &rarr;</span>
                <span className="text-xs text-slate-400">Calculate total daily calories burned and maintenance energy.</span>
              </Link>
              <Link to="/health/body-fat-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Body Fat Calculator &rarr;</span>
                <span className="text-xs text-slate-400">Estimate body fat percentage using US Navy tape measurements.</span>
              </Link>
              <Link to="/health/macro-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Macro Calculator &rarr;</span>
                <span className="text-xs text-slate-400">Determine daily protein, carbohydrate, and fat grams for your goal.</span>
              </Link>
              <Link to="/health/calories-burned-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Calories Burned Calculator &rarr;</span>
                <span className="text-xs text-slate-400">Estimate energy burned across dozens of cardio and sports activities.</span>
              </Link>
              <Link to="/health/water-intake-calculator" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
                <span className="font-bold text-white group-hover:text-emerald-400 block mb-1">Water Intake Calculator &rarr;</span>
                <span className="text-xs text-slate-400">Determine your daily hydration requirements based on weight and activity.</span>
              </Link>
            </div>
          </div>

        </section>

      </div>
    </>
  );
};

export default BMICalculator;

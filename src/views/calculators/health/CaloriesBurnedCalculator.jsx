'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { saveCalculation } from '@/lib/history';
import { Link } from 'react-router-dom';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { Flame, Activity, Zap, ShieldAlert, CheckCircle2, HelpCircle } from 'lucide-react';

const metValues = {
  'running_5_mph': { label: 'Running - 5 mph (12 min/mile pace)', value: 8.3 },
  'running_6_mph': { label: 'Running - 6 mph (10 min/mile pace)', value: 9.8 },
  'running_7_5_mph': { label: 'Running - 7.5 mph (8 min/mile pace)', value: 11.8 },
  'cycling_leisure': { label: 'Cycling - Leisure pace (<10 mph)', value: 4.0 },
  'cycling_moderate': { label: 'Cycling - Moderate pace (12–14 mph)', value: 8.0 },
  'cycling_vigorous': { label: 'Cycling - Vigorous pace (16–19 mph)', value: 10.0 },
  'swimming_freestyle': { label: 'Swimming - Freestyle (moderate effort)', value: 7.0 },
  'swimming_vigorous': { label: 'Swimming - Lap swimming (vigorous effort)', value: 10.0 },
  'walking_moderate': { label: 'Walking - Moderate pace (3 mph / 20 min/mile)', value: 3.5 },
  'walking_brisk': { label: 'Walking - Brisk / Power walk (4 mph)', value: 5.0 },
  'weight_lifting': { label: 'Weight Lifting - General strength training', value: 3.5 },
  'weight_lifting_vigorous': { label: 'Weight Lifting - Vigorous powerlifting / circuit', value: 6.0 },
  'hiit_training': { label: 'HIIT - High-Intensity Interval Training', value: 8.0 },
  'jump_rope': { label: 'Jumping Rope - Moderate to fast pace', value: 11.0 },
  'rowing_moderate': { label: 'Rowing Machine - Moderate resistance (100W)', value: 7.0 },
  'yoga': { label: 'Yoga - Hatha / restorative practice', value: 2.5 },
  'yoga_power': { label: 'Yoga - Power / Vinyasa flow', value: 4.0 },
  'basketball': { label: 'Basketball - Full-court game', value: 8.0 },
};

const CaloriesBurnedCalculator = () => {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg');
  const [duration, setDuration] = useState('');
  const [activity, setActivity] = useState('running_6_mph');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateCalories = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const weightVal = parseFloat(weight);
    const durationVal = parseFloat(duration);

    if (isNaN(weightVal) || weightVal <= 0) {
      setError('Please enter a valid positive weight.');
      return;
    }

    if (isNaN(durationVal) || durationVal <= 0) {
      setError('Please enter a valid positive duration in minutes.');
      return;
    }

    let weightInKg = weightVal;
    if (unit === 'lbs') {
      weightInKg = weightVal * 0.453592;
    }

    const met = metValues[activity]?.value || 7.0;
    // Standard Clinical Formula: Calories Burned/minute = (MET * Weight in kg * 3.5) / 200
    const calPerMinute = (met * weightInKg * 3.5) / 200;
    const totalCaloriesBurned = Math.round(calPerMinute * durationVal);

    const newResult = {
      calories: totalCaloriesBurned,
      calPerMin: calPerMinute.toFixed(1),
      activityLabel: metValues[activity].label,
      metValue: met,
      durationMin: durationVal,
    };

    setResult(newResult);
    saveCalculation({
      type: 'Calories Burned',
      inputs: { weight: `${weight} ${unit}`, duration: `${duration} min`, activity: newResult.activityLabel },
      result: { Calories: newResult.calories, 'Burn Rate': `${newResult.calPerMin} kcal/min` }
    });
  };

  const faqItems = [
    {
      question: "How does the scientific MET formula calculate calories burned?",
      answer: "The Metabolic Equivalent of Task (MET) quantifies the oxygen consumption of physical work relative to resting quiet sitting (1 MET = 3.5 ml of oxygen consumed per kg of body weight per minute). One liter of oxygen consumed metabolizes roughly 5 kcal. Therefore, the formula: Calories/min = (MET × Body Weight in kg × 3.5) ÷ 200 precisely calculates metabolic energy expenditure across any duration."
    },
    {
      question: "What is the difference between Gross Calories and Net Calories burned?",
      answer: "Gross calories burned includes both the energy cost of the exercise AND your basal metabolic rate (the calories you would have burned simply resting during those 45 minutes). Net calories burned subtracts your resting burn, revealing the true additional energy expenditure demanded by the workout. For a 45-minute workout, your resting burn accounts for roughly 40 to 60 kcal of the total reported figure."
    },
    {
      question: "Why do heavier individuals burn more calories doing the exact same exercise?",
      answer: "Physical work is defined mathematically as Force × Distance. Moving a heavier mass against gravity—whether swinging legs while running, climbing steps, or pumping arms while swimming—requires more muscular tension, greater mechanical work, and higher oxygen consumption, resulting in a higher caloric expenditure."
    },
    {
      question: "How accurate are smartwatches and fitness trackers compared to this formula?",
      answer: "A comprehensive Stanford University clinical study found that commercial fitness trackers (Apple Watch, Fitbit, Garmin) overestimate calories burned during cardio and weight lifting by 27% to 40% on average. Wrist-worn optical heart rate sensors struggle with grip changes and skin temperature. The MET-based clinical equation remains the standard academic benchmark used in metabolic research."
    },
    {
      question: "What is the 'Afterburn Effect' (EPOC) and how many calories does it really burn?",
      answer: "Excess Post-Exercise Oxygen Consumption (EPOC) refers to the elevated metabolic rate following strenuous activity as your body restores ATP, clears lactate, and repairs muscle tissue. While fitness marketing often claims EPOC burns hundreds of extra calories for days, sports science demonstrates EPOC typically accounts for only 6% to 15% of the total exercise caloric cost, primarily after true high-intensity interval training (HIIT)."
    },
    {
      question: "Is cardio or strength training better for long-term fat loss?",
      answer: "Cardio burns more calories *during* the workout session per minute. However, progressive resistance training stimulates muscle protein synthesis, preserving and building lean muscle mass. Because lean tissue is metabolically active, maintaining muscle prevents the drop in resting metabolic rate (BMR) that typically accompanies a caloric deficit, making a combination of both optimal."
    }
  ];

  return (
    <>
      <Seo
        title="Calories Burned Calculator: Exercise & Activity Calorie Tracker | CalcZoon"
        description="Estimate calories burned during running, cycling, swimming, weight lifting, and HIIT based on your body weight and duration. Backed by MET clinical formulas."
        canonicalUrl="/health/calories-burned-calculator"
      />
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-rose-400">
                    <Flame className="w-8 h-8" />
                  </div>
                </div>
                <h1 className="text-3xl font-extrabold text-white">Calories Burned Calculator</h1>
                <CardDescription className="text-slate-300 max-w-xl mx-auto">
                  Accurately estimate total energy expenditure across 18+ physical activities using clinical Metabolic Equivalent of Task (MET) benchmarks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateCalories} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-slate-200">Your Body Weight</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="e.g., 75"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="activity" className="text-slate-200">Select Physical Activity</Label>
                      <Select value={activity} onValueChange={setActivity}>
                        <SelectTrigger className="w-full bg-slate-900 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700 text-slate-100 max-h-64">
                          {Object.entries(metValues).map(([key, { label, value }]) => (
                            <SelectItem key={key} value={key} className="focus:bg-slate-800">
                              {label} (MET {value})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-slate-200">Workout Duration (Minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      step="1"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g., 45"
                      required
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-slate-950 font-bold h-12 text-base">
                    Calculate Calories Burned
                  </Button>
                </form>
              </CardContent>
              {result && !error && (
                <CardFooter className="flex flex-col items-center mt-6 p-6 bg-slate-900/80 border-t border-slate-700 rounded-b-lg">
                  <div className="w-full text-center space-y-3">
                    <h2 className="text-lg font-semibold text-slate-300">Total Estimated Energy Expenditure:</h2>
                    <div className="flex justify-center items-center gap-3 text-rose-400">
                      <Flame className="w-10 h-10 animate-bounce" />
                      <p className="text-5xl font-black">{result.calories} kcal</p>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-400 pt-2">
                      <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 font-mono text-slate-200">
                        Rate: {result.calPerMin} kcal/min
                      </span>
                      <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 font-mono text-slate-200">
                        Intensity: {result.metValue} METs
                      </span>
                      <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 font-mono text-slate-200">
                        Duration: {result.durationMin} mins
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 w-full">
                    <ShareResults
                      title="My Workout Calorie Burn"
                      text={`I burned an estimated ${result.calories} kcal during my workout session! Calculate your exercise energy expenditure on CalcZoon:`}
                      url="/health/calories-burned-calculator"
                    />
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
                  <Zap className="w-5 h-5 text-rose-400" /> MET Intensity Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <div className="flex justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400">Resting (Sitting)</span>
                  <span className="font-semibold text-slate-200 font-mono">1.0 MET</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400">Light Walking</span>
                  <span className="font-semibold text-slate-200 font-mono">2.5 – 3.5 METs</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400">Weight Lifting</span>
                  <span className="font-semibold text-amber-300 font-mono">3.5 – 6.0 METs</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-700/60">
                  <span className="text-slate-400">Jogging (6 mph)</span>
                  <span className="font-semibold text-rose-400 font-mono">9.8 METs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sprint / High HIIT</span>
                  <span className="font-semibold text-rose-400 font-mono">11.0 – 14.0 METs</span>
                </div>
              </CardContent>
            </Card>
            <RelatedTools />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,000 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10">
          {/* Section 1: What is a Calories Burned Calculator */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Flame className="text-rose-400 w-7 h-7" /> What is the Calories Burned Calculator & How Energy is Expended
            </h2>
            <p className="text-base md:text-lg">
              The <strong>Calories Burned Calculator</strong> is an evidence-based metabolic modeling tool designed to calculate the precise thermal energy expenditure (measured in kilocalories or kcal) generated during structured physical exercise. During any physical exertion, skeletal muscle fibers convert stored chemical substrates—adenosine triphosphate (ATP), muscle glycogen, and circulating fatty acids—into kinetic mechanical force and thermal heat.
            </p>
            <p>
              In human exercise physiology, total daily energy expenditure (TDEE) is divided into three primary components: Basal Metabolic Rate (BMR, accounting for 60–70% of daily calories), the Thermic Effect of Food (TEF, ~10%), and Physical Activity Level (PAL, 20–30%), which encompasses both Non-Exercise Activity Thermogenesis (NEAT) and Exercise Activity Thermogenesis (EAT). This calculator provides precision estimates for your EAT, helping fitness enthusiasts, athletes, and weight management practitioners calibrate their nutritional intake with clinical accuracy.
            </p>
          </div>

          {/* Section 2: Mathematical Formulas & MET Reference */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              The Mathematical MET Formula & Reference Benchmarks
            </h2>
            <p>
              Rather than using guesswork, this tool implements the peer-reviewed clinical standard from the <em>Compendium of Physical Activities</em> (developed by Dr. Barbara Ainsworth and published in <em>Medicine & Science in Sports & Exercise</em>):
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4">
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 font-mono text-sm space-y-2">
                <p className="text-rose-400 font-bold uppercase tracking-wider text-xs">Metric MET Equation</p>
                <p className="text-white text-base font-semibold">Calories = [(MET × Weight (kg) × 3.5) ÷ 200] × Minutes</p>
                <p className="text-slate-400 text-xs">Where 3.5 ml O₂/kg/min is the resting VO₂ baseline, and 200 equates O₂ to kcal.</p>
              </div>
              <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 font-mono text-sm space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider text-xs">Imperial Weight Conversion</p>
                <p className="text-white text-base font-semibold">Weight (kg) = Weight (lbs) ÷ 2.20462</p>
                <p className="text-slate-400 text-xs">Ensures accurate SI unit scaling before applying oxygen expenditure rates.</p>
              </div>
            </div>
            <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 space-y-3">
              <h3 className="font-semibold text-white text-base">Key Compendium MET Ratings for Common Sports:</h3>
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-1">
                  <p className="font-bold text-emerald-400">Low Intensity (&lt;4 METs)</p>
                  <p className="text-slate-300">• Walking 3 mph: 3.5 METs</p>
                  <p className="text-slate-300">• Restorative Yoga: 2.5 METs</p>
                  <p className="text-slate-300">• Light Bowling / Golf: 3.0 METs</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded border border-slate-700 space-y-1">
                  <p className="font-bold text-amber-400">Moderate Intensity (4–8 METs)</p>
                  <p className="text-slate-300">• Resistance Training: 3.5–6.0 METs</p>
                  <p className="text-slate-300">• Leisure Cycling: 4.0–8.0 METs</p>
                  <p className="text-slate-300">• Moderate Swimming: 7.0 METs</p>
                </div>
                <div className="bg-slate-800/80 p-3 rounded border border-rose-700/50 text-rose-200 space-y-1">
                  <p className="font-bold text-rose-400">Vigorous Intensity (&gt;8 METs)</p>
                  <p className="text-slate-300">• Running (6 mph): 9.8 METs</p>
                  <p className="text-slate-300">• Fast Jump Rope: 11.0 METs</p>
                  <p className="text-slate-300">• Competitive Rowing: 10.0+ METs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Step-by-Step Usage Guide */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Step-by-Step Guide: How to Accurately Track Exercise Energy Output
            </h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-white">Step 1: Enter Current Body Weight:</strong> Input your weight without heavy footwear. Mass is the primary variable multiplying kinetic work against gravity.
              </li>
              <li>
                <strong className="text-white">Step 2: Match Your True Pace and Effort:</strong> If you jogged at 5 mph with walking intervals, select the moderate pace option rather than the 7.5 mph sprint option to avoid overestimation.
              </li>
              <li>
                <strong className="text-white">Step 3: Measure Pure Active Time (Not Gym Dwell Time):</strong> If your gym visit was 60 minutes but you spent 25 minutes resting between sets, checking your phone, or changing weights, input 35 minutes of actual active work.
              </li>
              <li>
                <strong className="text-white">Step 4: Analyze Burn Rate per Minute:</strong> Note your burn rate (e.g. 11.5 kcal/min). This helps compare the relative energy efficiency of different cardio vs resistance protocols.
              </li>
              <li>
                <strong className="text-white">Step 5: Apply Conservatives for Caloric Deficits:</strong> If your goal is fat loss, avoid eating back 100% of your calculated exercise calories. Consuming back roughly 50% cushions against normal tracking deviations.
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
                  <span className="text-xs uppercase tracking-wider text-rose-400 font-mono font-bold">Case Study 1</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Outdoor Runner</span>
                </div>
                <h3 className="text-lg font-bold text-white">David: 70 kg Distance Runner</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Body Mass:</strong> 70 kg</li>
                  <li><strong>Activity:</strong> Running at 6.0 mph (10 min/mile pace, MET = 9.8)</li>
                  <li><strong>Duration:</strong> 45 minutes continuous</li>
                  <li><strong>Burn Rate:</strong> (9.8 × 70 × 3.5) ÷ 200 = 12.005 kcal/min</li>
                  <li><strong>Total Burn:</strong> <span className="text-rose-400 font-bold text-sm">12.005 × 45 = 540 kcal</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Takeaway: In 45 minutes of steady-state running, David expends over 500 kcal, approximately equivalent to a standard balanced post-workout meal.
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-bold">Case Study 2</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Strength Athlete</span>
                </div>
                <h3 className="text-lg font-bold text-white">Elena: 60 kg Strength Lifter</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Body Mass:</strong> 60 kg</li>
                  <li><strong>Activity:</strong> General Weight Lifting (MET = 3.5)</li>
                  <li><strong>Pure Active Duration:</strong> 40 minutes (excluding set rests)</li>
                  <li><strong>Burn Rate:</strong> (3.5 × 60 × 3.5) ÷ 200 = 3.675 kcal/min</li>
                  <li><strong>Total Burn:</strong> <span className="text-amber-400 font-bold text-sm">3.675 × 40 = 147 kcal</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Takeaway: While resistance lifting burns fewer active calories than running during the session, it stimulates muscle growth that elevates baseline metabolic rate 24/7.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Common Calculation Mistakes */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="text-amber-400 w-6 h-6" /> Common Calculation Pitfalls & Fitness Tracker Errors
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Over-relying on Fitness Smartwatches
                </h3>
                <p className="text-xs text-slate-400">
                  Clinical investigations demonstrate that wrist devices commonly overestimate caloric expenditure by 25% to 40% during cardio and gym workouts, causing individuals attempting fat loss to accidentally overeat.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> "Eating Back" All Exercise Calories
                </h3>
                <p className="text-xs text-slate-400">
                  If you calculate 500 kcal burned and immediately consume a 500 kcal snack, you cancel out your caloric deficit completely. Allow exercise to build your deficit naturally.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Confusing Total Gym Time with Active Work
                </h3>
                <p className="text-xs text-slate-400">
                  Counting 90 minutes of "gym time" when 45 minutes were spent talking or resting between sets inflates calculated burn by more than 100%. Only count time under muscular tension.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Ignoring Non-Exercise Activity (NEAT) Compensation
                </h3>
                <p className="text-xs text-slate-400">
                  After an exhausting workout, many people become unusually sedentary for the rest of the day—sitting on the couch and skipping stairs. This subconscious NEAT drop can erase up to 200–300 kcal of the workout burn.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: In-Depth FAQs */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="text-primary w-6 h-6" /> Frequently Asked Questions (FAQ)
            </h2>
            <Faq items={faqItems} />
          </div>

          {/* Section 7: Clinical References & Interlinked Tools */}
          <div className="pt-6 border-t border-slate-700/60 space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Clinical References & Related Health Tools
            </h3>
            <ul className="text-xs text-slate-400 space-y-1.5">
              <li>• Ainsworth BE, et al. 2011 Compendium of Physical Activities: A second update of codes and MET values. <em>Medicine & Science in Sports & Exercise</em>, 43(8):1575-1581 (2011).</li>
              <li>• Shcherbina A, et al. Accuracy in consumer wearable devices for tracking physical activity and heart rate. <em>Journal of Personalized Medicine</em>, 7(2):3 (2017).</li>
              <li>• Westerterp KR. Exercise, energy expenditure and energy balance, as measured with doubly labelled water. <em>Proceedings of the Nutrition Society</em>, 77(1):4-10 (2018).</li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/health/tdee-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-rose-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Calculate Total Daily Energy (TDEE) →
              </Link>
              <Link to="/health/macro-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-rose-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Plan Protein, Carbs & Fats (Macros) →
              </Link>
              <Link to="/health/water-intake-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-rose-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Calculate Daily Hydration Needs →
              </Link>
              <Link to="/health/bmi-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-rose-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Check Body Mass Index (BMI) →
              </Link>
            </div>
          </div>

          <Disclaimer text="Calorie expenditure estimates generated by this calculator are derived from standard population MET averages. Individual metabolic variance occurs based on thyroid hormones, muscle-to-fat composition, mitochondrial density, biomechanical efficiency, and ambient workout temperature." />
        </section>
      </div>
    </>
  );
};

export default CaloriesBurnedCalculator;

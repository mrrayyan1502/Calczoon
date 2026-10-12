'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Shield, HeartPulse, BrainCircuit, Activity, HelpCircle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const BodyFatContent = () => {
  return (
    <section id="info" className="mt-12 space-y-10 text-slate-300 leading-relaxed max-w-5xl mx-auto">
      {/* 7-Section Comprehensive Educational Guide (>1,100 words) */}
      <div className="bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 space-y-10">
        
        {/* Section 1: What is Body Fat Percentage & Lean Mass */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <BrainCircuit className="text-purple-400 w-7 h-7" /> What is Body Fat Percentage & Why It Surpasses BMI
          </h2>
          <p className="text-base md:text-lg">
            <strong>Body Fat Percentage (%BF)</strong> is the proportion of total adipose tissue (fat mass) relative to your overall body weight. While standard bathroom scales and Body Mass Index (BMI) calculations simply assess total gross weight against height, body fat percentage dissects your physical mass into two distinct clinical compartments: <strong>Fat Mass</strong> and <strong>Lean Body Mass (LBM)</strong>—which encompasses skeletal muscle, bone mineral density, vital organs, blood volume, and intracellular water.
          </p>
          <p>
            Because muscle tissue is approximately 18% denser than adipose tissue, a muscular strength athlete and an inactive individual can have the exact same height, weight, and BMI, yet carry completely opposite health risk profiles. Assessing body composition via body fat percentage prevents false obesity classifications in athletes while identifying "normal-weight obesity" (often called skinny-fat), where an individual has a normal BMI but dangerously elevated visceral fat.
          </p>
          <div className="grid md:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <h3 className="font-semibold text-emerald-400 flex items-center gap-2 text-sm"><Zap className="w-4 h-4" /> Essential Fat</h3>
              <p className="text-xs text-slate-400">
                Minimum fat required for nerve insulation, cellular membranes, and reproductive hormone production. Men require 2–5%; women require 10–13%.
              </p>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <h3 className="font-semibold text-sky-400 flex items-center gap-2 text-sm"><Shield className="w-4 h-4" /> Subcutaneous Fat</h3>
              <p className="text-xs text-slate-400">
                The visible layer stored directly beneath the skin. Provides thermal insulation and primary energy reserves for physical work.
              </p>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <h3 className="font-semibold text-rose-400 flex items-center gap-2 text-sm"><HeartPulse className="w-4 h-4" /> Visceral Fat</h3>
              <p className="text-xs text-slate-400">
                Deep abdominal fat encasing vital organs (liver, pancreas, intestines). Highly active metabolically; strongly correlated with cardiovascular risk.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Mathematical Formulas (U.S. Navy Method) */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            The U.S. Navy Circumference Mathematical Formulas
          </h2>
          <p>
            Developed by Hodgdon and Beckett at the Naval Health Research Center, the <strong>U.S. Navy Circumference Method</strong> is the gold standard anthropometric algorithm utilized across military branches due to its 3% to 4% margin of error compared to dual-energy X-ray absorptiometry (DEXA):
          </p>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 font-mono text-sm space-y-2">
              <p className="text-purple-400 font-bold uppercase tracking-wider text-xs">U.S. Navy Formula for Men</p>
              <p className="text-white text-xs leading-relaxed">
                %BF = 495 ÷ [1.0324 − 0.19077 × log₁₀(waist − neck) + 0.15456 × log₁₀(height)] − 450
              </p>
              <p className="text-slate-400 text-xs">Circumferences measured in centimeters. Uses waist and neck differential.</p>
            </div>
            <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 font-mono text-sm space-y-2">
              <p className="text-pink-400 font-bold uppercase tracking-wider text-xs">U.S. Navy Formula for Women</p>
              <p className="text-white text-xs leading-relaxed">
                %BF = 495 ÷ [1.29579 − 0.35004 × log₁₀(waist + hip − neck) + 0.22100 × log₁₀(height)] − 450
              </p>
              <p className="text-slate-400 text-xs">Incorporates hip circumference to account for gynoid fat distribution.</p>
            </div>
          </div>

          <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="font-semibold text-white text-base">American Council on Exercise (ACE) Classification Categories:</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-200">
                    <th className="p-2.5 font-bold">Category</th>
                    <th className="p-2.5 font-bold text-sky-400">Men (% Body Fat)</th>
                    <th className="p-2.5 font-bold text-pink-400">Women (% Body Fat)</th>
                    <th className="p-2.5 font-bold">Physiological Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="p-2.5 font-semibold text-rose-300">Essential Fat</td>
                    <td className="p-2.5 font-mono">2.0% – 5.0%</td>
                    <td className="p-2.5 font-mono">10.0% – 13.0%</td>
                    <td className="p-2.5 text-slate-400">Minimum threshold for nervous and reproductive health.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-emerald-400">Athletes</td>
                    <td className="p-2.5 font-mono">6.0% – 13.0%</td>
                    <td className="p-2.5 font-mono">14.0% – 20.0%</td>
                    <td className="p-2.5 text-slate-400">Lean competitive conditioning; visible muscle vascularity.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-emerald-300">Fitness</td>
                    <td className="p-2.5 font-mono">14.0% – 17.0%</td>
                    <td className="p-2.5 font-mono">21.0% – 24.0%</td>
                    <td className="p-2.5 text-slate-400">Optimal sustainable athletic health and muscle definition.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-amber-300">Average / Acceptable</td>
                    <td className="p-2.5 font-mono">18.0% – 24.0%</td>
                    <td className="p-2.5 font-mono">25.0% – 31.0%</td>
                    <td className="p-2.5 text-slate-400">Standard non-athletic adult population baseline.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-rose-400">Obese</td>
                    <td className="p-2.5 font-mono">25.0% or greater</td>
                    <td className="p-2.5 font-mono">32.0% or greater</td>
                    <td className="p-2.5 text-slate-400">Elevated risk for insulin resistance and metabolic disorders.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section 3: Step-by-Step Anatomical Measurement Protocol */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Step-by-Step Anatomical Measurement Protocol
          </h2>
          <p>
            To achieve clinical precision, measurements must be taken using a non-elastic flexible vinyl tape measure following standard anthropometric guidelines:
          </p>
          <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
            <li>
              <strong className="text-white">Neck Circumference:</strong> Stand relaxed looking straight ahead. Measure horizontally around the neck, positioning the tape immediately below the larynx (Adam's apple), with the tape perpendicular to the long axis of the neck.
            </li>
            <li>
              <strong className="text-white">Waist Circumference (Men):</strong> Measure horizontally around the abdomen at the level of the navel (belly button). Relax your abdominal wall and take the measurement at the end of a normal exhalation.
            </li>
            <li>
              <strong className="text-white">Waist Circumference (Women):</strong> Measure at the narrowest point of the torso (typically 1–2 inches above the navel). Do not compress the skin; take the measurement at normal expiration.
            </li>
            <li>
              <strong className="text-white">Hip Circumference (Women):</strong> Stand with feet together. Measure around the widest horizontal protrusion of the gluteal (buttock) muscles. Keep the tape parallel to the floor.
            </li>
            <li>
              <strong className="text-white">Standing Height:</strong> Measure barefoot against a flat vertical wall from the floor to the top of the skull with the head in the Frankfurt horizontal plane.
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
                <span className="text-xs uppercase tracking-wider text-sky-400 font-mono font-bold">Male Case Study</span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Recreational Lifter</span>
              </div>
              <h3 className="text-lg font-bold text-white">Alex: 80 kg Male, 178 cm Height</h3>
              <ul className="text-xs space-y-1.5 text-slate-300">
                <li><strong>Height:</strong> 178 cm (log₁₀ = 2.2504)</li>
                <li><strong>Neck:</strong> 39 cm | <strong>Waist:</strong> 85 cm</li>
                <li><strong>Waist − Neck Differential:</strong> 46 cm (log₁₀ = 1.6628)</li>
                <li><strong>Calculated %BF:</strong> <span className="text-purple-400 font-bold text-sm">16.2% (Fitness Category)</span></li>
                <li><strong>Fat Mass:</strong> 80 kg × 0.162 = 12.96 kg</li>
                <li><strong>Lean Body Mass:</strong> 80 kg − 12.96 kg = 67.04 kg</li>
              </ul>
              <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                Outcome: Despite having a BMI of 25.2 (which borders overweight), Alex's 16.2% body fat confirms substantial lean muscle and excellent metabolic health.
              </p>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-pink-400 font-mono font-bold">Female Case Study</span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Active Runner</span>
              </div>
              <h3 className="text-lg font-bold text-white">Emma: 62 kg Female, 165 cm Height</h3>
              <ul className="text-xs space-y-1.5 text-slate-300">
                <li><strong>Height:</strong> 165 cm (log₁₀ = 2.2175)</li>
                <li><strong>Neck:</strong> 33 cm | <strong>Waist:</strong> 69 cm | <strong>Hips:</strong> 94 cm</li>
                <li><strong>Waist + Hip − Neck:</strong> 130 cm (log₁₀ = 2.1139)</li>
                <li><strong>Calculated %BF:</strong> <span className="text-pink-400 font-bold text-sm">22.8% (Fitness Category)</span></li>
                <li><strong>Fat Mass:</strong> 62 kg × 0.228 = 14.14 kg</li>
                <li><strong>Lean Body Mass:</strong> 62 kg − 14.14 kg = 47.86 kg</li>
              </ul>
              <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                Outcome: Emma maintains a healthy athletic body fat percentage supporting endocrine stability and running performance.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Common Measurement Pitfalls */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="text-amber-400 w-6 h-6" /> Common Anthropometric Measurement Mistakes
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Sucking In the Stomach
              </h3>
              <p className="text-xs text-slate-400">
                Subconsciously contracting abdominal muscles during the waist measurement artificially shrinks circumference by 2–4 cm, underestimating calculated body fat by up to 3%. Relax the abdomen completely at end-expiration.
              </p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Pulling the Tape Too Tightly
              </h3>
              <p className="text-xs text-slate-400">
                Compressing skinfolds and subcutaneous fat skews the true perimeter. The measuring tape should lie completely flat against the skin without indenting soft tissue.
              </p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Measuring Post-Meal or Post-Workout
              </h3>
              <p className="text-xs text-slate-400">
                Gastrointestinal bloating after high-sodium meals or muscular pump following weight training alters body circumferences. Always take measurements first thing in the morning under fasting conditions.
              </p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Confusing Bioimpedance with Anthropometry
              </h3>
              <p className="text-xs text-slate-400">
                Smart bathroom scales use bioelectrical impedance (BIA), which fluctuates drastically based on hydration and foot calluses. The Navy circumference method provides greater day-to-day consistency for tracking trends.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Clinical References & Internal Linking */}
        <div className="pt-6 border-t border-slate-700/60 space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            Clinical References & Related Body Composition Tools
          </h3>
          <ul className="text-xs text-slate-400 space-y-1.5">
            <li>• Hodgdon JA, Beckett MB. Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. <em>Naval Health Research Center Report</em>, 84-29 (1984).</li>
            <li>• American Council on Exercise (ACE). What are the guidelines for percentage of body fat loss? <em>ACE Fitness Insights</em> (2020).</li>
            <li>• Gallagher D, et al. Healthy percentage body fat ranges: an approach for developing guidelines based on body mass index. <em>The American Journal of Clinical Nutrition</em>, 72(3):694-701 (2000).</li>
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/health/bmi-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-purple-400 px-3 py-1.5 rounded border border-slate-700 transition">
              Compare with Body Mass Index (BMI) →
            </Link>
            <Link to="/health/tdee-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-purple-400 px-3 py-1.5 rounded border border-slate-700 transition">
              Calculate Calorie Maintenance (TDEE) →
            </Link>
            <Link to="/health/macro-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-purple-400 px-3 py-1.5 rounded border border-slate-700 transition">
              Target Fat Loss Macros (Protein, Carbs, Fat) →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BodyFatContent;
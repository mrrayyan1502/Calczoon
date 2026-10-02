'use client';

import React from 'react';
import Seo from '@/components/Seo';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse, ArrowRight } from 'lucide-react';

const healthCalculators = [
  { name: 'BMI Calculator', description: 'Calculate your Body Mass Index (BMI) and WHO clinical weight category.', path: '/health/bmi-calculator' },
  { name: 'TDEE Calculator', description: 'Determine your Total Daily Energy Expenditure and baseline maintenance calories.', path: '/health/tdee-calculator' },
  { name: 'Macro Calculator', description: 'Plan daily grams of protein, carbohydrates, and fats for your fitness goal.', path: '/health/macro-calculator' },
  { name: 'Body Fat Calculator', description: 'Estimate body fat percentage and lean muscle mass using the U.S. Navy method.', path: '/health/body-fat-calculator' },
  { name: 'Calories Burned Calculator', description: 'Calculate calories burned across walking, running, cycling, and workouts.', path: '/health/calories-burned-calculator' },
  { name: 'Water Intake Calculator', description: 'Calculate daily hydration requirements based on weight and activity levels.', path: '/health/water-intake-calculator' },
];

const HealthCalculators = () => {
  return (
    <>
      <Seo
        title="Health and Fitness Calculators Online - CalcZoon"
        description="Explore science-backed health and fitness calculators including BMI, TDEE, macronutrients, body fat, calorie expenditure, and hydration."
        canonicalUrl="/health-fitness-calculators"
      />
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl mb-6 shadow-lg">
            <HeartPulse className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Health & Fitness Calculators</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Achieve your fitness and wellness goals with evidence-based calculators. Understand your metabolism, track daily caloric demands, and establish targeted macronutrient plans.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          {healthCalculators.map((calc, index) => (
            <motion.div key={calc.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
              <Link to={calc.path} className="block h-full">
                <Card className="bg-slate-800/40 border-slate-700/50 h-full hover:bg-slate-800 hover:border-rose-500/50 transition-all duration-300 group flex flex-col justify-between p-6 rounded-2xl shadow-xl">
                  <div>
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors flex items-center justify-between">
                        <span>{calc.name}</span>
                        <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-sm text-slate-300 leading-relaxed">{calc.description}</p>
                    </CardContent>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-700/40 text-xs font-semibold text-rose-400 flex items-center justify-between">
                    <span>Use Calculator</span>
                    <span>&rarr;</span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default HealthCalculators;

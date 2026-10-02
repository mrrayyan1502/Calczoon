'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, HeartPulse, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const calculatorGroups = [
  {
    category: 'Financial Calculators',
    icon: <DollarSign className="w-7 h-7 text-emerald-400" />,
    hubPath: '/financial-calculators',
    calculators: [
      { name: 'Mortgage Calculator', description: 'Estimate your monthly home payments, principal, and interest.', path: '/financial/mortgage-calculator' },
      { name: 'Loan EMI Calculator', description: 'Estimate monthly loan payments and amortization schedules.', path: '/financial/loan-calculator' },
      { name: 'Compound Interest Calculator', description: 'See how your investments and regular savings multiply over time.', path: '/financial/compound-interest-calculator' },
      { name: 'Live Currency Converter', description: 'Real-time global currency exchange rates across 150+ currencies.', path: '/financial/currency-converter' },
      { name: 'Savings Goal Calculator', description: 'Calculate how much to save monthly to achieve your target nest egg.', path: '/financial/savings-calculator' },
      { name: 'Retirement Savings Calculator', description: 'Project your retirement nest egg and safe withdrawal rates.', path: '/financial/retirement-calculator' },
      { name: 'SIP Investment Calculator', description: 'Calculate mutual fund returns and compounding on monthly SIPs.', path: '/financial/sip-calculator' },
    ]
  },
  {
    category: 'Health & Fitness Calculators',
    icon: <HeartPulse className="w-7 h-7 text-rose-400" />,
    hubPath: '/health-fitness-calculators',
    calculators: [
      { name: 'BMI Calculator', description: 'Calculate your Body Mass Index (BMI) and WHO weight classification.', path: '/health/bmi-calculator' },
      { name: 'TDEE Calculator', description: 'Find your Total Daily Energy Expenditure and maintenance calories.', path: '/health/tdee-calculator' },
      { name: 'Macro Calculator', description: 'Plan daily protein, carbohydrate, and fat targets for fitness goals.', path: '/health/macro-calculator' },
      { name: 'Body Fat Calculator', description: 'Estimate body fat percentage using the U.S. Navy circumference method.', path: '/health/body-fat-calculator' },
      { name: 'Calories Burned Calculator', description: 'Estimate calories burned during running, cycling, and workouts.', path: '/health/calories-burned-calculator' },
      { name: 'Water Intake Calculator', description: 'Determine optimal daily hydration based on weight and activity.', path: '/health/water-intake-calculator' },
    ]
  },
  {
    category: 'Math & Science Calculators',
    icon: <BookOpen className="w-7 h-7 text-sky-400" />,
    hubPath: '/math-science-calculators',
    calculators: [
      { name: 'Percentage Calculator', description: 'Calculate percentage increase, decrease, discounts, and ratios.', path: '/math/percentage-calculator' },
      { name: 'Fraction Calculator with Steps', description: 'Add, subtract, multiply, and divide fractions with step-by-step proofs.', path: '/math/fraction-calculator' },
      { name: 'Scientific Calculator Online', description: 'Advanced trigonometry, logarithms, powers, and constants.', path: '/math/scientific-calculator' },
      { name: 'Triangle Calculator & Solver', description: 'Calculate sides, angles, area, and perimeter of any triangle.', path: '/math/triangle-calculator' },
      { name: 'Statistics Calculator', description: 'Calculate mean, median, mode, standard deviation, and variance.', path: '/math/statistics-calculator' },
    ]
  },
  {
    category: 'Lifestyle & Everyday Calculators',
    icon: <Sparkles className="w-7 h-7 text-amber-400" />,
    hubPath: '/lifestyle-everyday-calculators',
    calculators: [
      { name: 'Age Calculator', description: 'Find your exact age in years, months, days, and total hours.', path: '/lifestyle/age-calculator' },
      { name: 'Discount & Sales Calculator', description: 'Calculate promotional percentage discounts and net sale prices.', path: '/lifestyle/discount-calculator' },
      { name: 'Tip & Bill Split Calculator', description: 'Calculate gratuity and split restaurant checks equally among friends.', path: '/lifestyle/tip-calculator' },
      { name: 'Date Duration Calculator', description: 'Calculate exact calendar duration and business days between dates.', path: '/lifestyle/date-calculator' },
      { name: 'Unit Measurement Converter', description: 'Convert length, weight, volume, and temperature instantly.', path: '/lifestyle/unit-converter' },
      { name: 'Fuel Cost Trip Calculator', description: 'Estimate total fuel costs and cost per person for road trips.', path: '/lifestyle/fuel-cost-calculator' },
    ]
  },
];

const CalculatorsList = () => {
  return (
    <div className="space-y-16">
      {calculatorGroups.map((group, groupIndex) => (
        <motion.section
          key={group.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-800 rounded-xl border border-slate-700">
                {group.icon}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{group.category}</h2>
            </div>
            <Link 
              to={group.hubPath} 
              className="text-emerald-400 hover:text-emerald-300 font-semibold text-sm inline-flex items-center gap-1 group"
            >
              View All {group.category} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.calculators.map((calc) => (
              <Link key={calc.path} to={calc.path} className="block group h-full">
                <Card className="bg-slate-800/40 border-slate-700/60 h-full hover:bg-slate-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between p-6 rounded-2xl shadow-lg">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                      {calc.name}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {calc.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-700/40 flex justify-between items-center text-xs font-semibold text-emerald-400">
                    <span>Calculate Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
};

export default CalculatorsList;

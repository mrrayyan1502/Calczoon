'use client';

import React from 'react';
import Seo from '@/components/Seo';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, ArrowRight } from 'lucide-react';

const lifestyleCalculators = [
  { name: 'Age Calculator', description: 'Calculate exact age in years, months, days, hours, and upcoming birthday countdown.', path: '/lifestyle/age-calculator' },
  { name: 'Discount & Sales Calculator', description: 'Calculate promotional discounts, double percentage off, and total shopping savings.', path: '/lifestyle/discount-calculator' },
  { name: 'Tip & Bill Split Calculator', description: 'Calculate restaurant gratuity and split meal costs evenly among friends.', path: '/lifestyle/tip-calculator' },
  { name: 'Date Duration Calculator', description: 'Calculate exact calendar days, weeks, and business days between any two dates.', path: '/lifestyle/date-calculator' },
  { name: 'Unit Measurement Converter', description: 'Convert length, mass, temperature, and volume between metric and imperial systems.', path: '/lifestyle/unit-converter' },
  { name: 'Fuel Cost Trip Calculator', description: 'Estimate total gasoline expenses and cost per passenger for road trips.', path: '/lifestyle/fuel-cost-calculator' },
];

const LifestyleCalculators = () => {
  return (
    <>
      <Seo
        title="Lifestyle & Everyday Calculators - CalcZoon"
        description="Simplify daily routines with practical everyday calculators for age, shopping discounts, tip splitting, dates, units, and road trip fuel costs."
        canonicalUrl="/lifestyle-everyday-calculators"
      />
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-6 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Lifestyle & Everyday Calculators</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Simplify daily planning with fast, practical calculators designed for everyday life. From shopping sales and splitting bills to tracking milestones and road trip costs.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          {lifestyleCalculators.map((calc, index) => (
            <motion.div key={calc.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
              <Link to={calc.path} className="block h-full">
                <Card className="bg-slate-800/40 border-slate-700/50 h-full hover:bg-slate-800 hover:border-amber-500/50 transition-all duration-300 group flex flex-col justify-between p-6 rounded-2xl shadow-xl">
                  <div>
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                        <span>{calc.name}</span>
                        <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-sm text-slate-300 leading-relaxed">{calc.description}</p>
                    </CardContent>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-700/40 text-xs font-semibold text-amber-400 flex items-center justify-between">
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

export default LifestyleCalculators;

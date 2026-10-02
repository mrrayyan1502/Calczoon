'use client';

import React from 'react';
import Seo from '@/components/Seo';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ArrowRight } from 'lucide-react';

const mathCalculators = [
  { name: 'Percentage Calculator', description: 'Solve percentage problems: what percent X is of Y, increases, and decreases.', path: '/math/percentage-calculator' },
  { name: 'Fraction Calculator', description: 'Add, subtract, multiply, and divide fractions with clear step-by-step arithmetic.', path: '/math/fraction-calculator' },
  { name: 'Online Scientific Calculator', description: 'Solve complex equations with trigonometry, logarithms, powers, and roots.', path: '/math/scientific-calculator' },
  { name: 'Triangle Calculator & Solver', description: 'Solve sides, angles, area, and perimeter of any triangle using Heron’s formula.', path: '/math/triangle-calculator' },
  { name: 'Statistics Calculator', description: 'Analyze data sets to calculate mean, median, mode, standard deviation, and variance.', path: '/math/statistics-calculator' },
];

const MathCalculators = () => {
  return (
    <>
      <Seo
        title="Math and Science Calculators Online - CalcZoon"
        description="Solve equations and complex numerical problems with our curated math calculators: percentages, fractions, trigonometry, and statistics."
        canonicalUrl="/math-science-calculators"
      />
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Math & Science Calculators</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Whether you are a student, educator, or technical professional, solve mathematical challenges with speed and accuracy using our step-by-step math calculation engines.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          {mathCalculators.map((calc, index) => (
            <motion.div key={calc.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
              <Link to={calc.path} className="block h-full">
                <Card className="bg-slate-800/40 border-slate-700/50 h-full hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300 group flex flex-col justify-between p-6 rounded-2xl shadow-xl">
                  <div>
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
                        <span>{calc.name}</span>
                        <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-sm text-slate-300 leading-relaxed">{calc.description}</p>
                    </CardContent>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-700/40 text-xs font-semibold text-blue-400 flex items-center justify-between">
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

export default MathCalculators;

import React from 'react';
import Seo from '@/components/Seo';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sigma } from 'lucide-react';

const mathCalculators = [
  { name: 'Percentage Calculator', description: 'Solve any percentage problem instantly.', path: '/math/percentage-calculator' },
  { name: 'Fraction Calculator', description: 'Add, subtract, multiply, and divide fractions with ease.', path: '/math/fraction-calculator' },
  { name: 'Triangle Calculator', description: 'Find sides, angles, area, and perimeter of any triangle.', path: '/math/triangle-calculator' },
  { name: 'Statistics Calculator', description: 'Analyze data sets to find mean, median, mode, and more.', path: '/math/statistics-calculator' },
  { name: 'Exponent Calculator', description: 'Quickly solve expressions with positive or negative powers.', path: '/math/exponent-calculator' },
];

const MathCalculators = () => {
  return (
    <>
      <Seo
        title="Math and Science Calculators Online - Calczoon"
        description="Solve equations and complex problems with our online math and science calculators. Get accurate solutions for math, science, and more using our math equation solver."
        canonicalUrl="/math-science-calculators"
      />
      <div className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Math & Science Calculators</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">Whether you're a student, teacher, or professional, our math and science calculators are designed to help you solve complex problems with ease and accuracy. From basic arithmetic to advanced algebra, our online tools are perfect for tackling any equation.</p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          {mathCalculators.map((calc, index) => (
            <motion.div key={calc.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
              <Link to={calc.path} className="block h-full">
                <Card className="bg-slate-800/40 border-slate-700/50 h-full hover:bg-slate-800 hover:border-primary/50 transition-all duration-300 group flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center gap-2">
                      <Sigma size={24} /> {calc.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-slate-300">{calc.description}</p>
                  </CardContent>
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
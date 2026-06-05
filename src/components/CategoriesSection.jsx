import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, HeartPulse, Sigma, Sun } from 'lucide-react';

const categories = [
  {
    icon: <DollarSign className="w-10 h-10 text-green-400" />,
    title: 'Financial Calculators',
    description: 'Mortgage, Loan, Investment, Retirement',
    path: '/financial-calculators'
  },
  {
    icon: <HeartPulse className="w-10 h-10 text-red-400" />,
    title: 'Health & Fitness Calculators',
    description: 'BMI, TDEE, Macros, Pregnancy',
    path: '/health-fitness-calculators'
  },
  {
    icon: <Sigma className="w-10 h-10 text-blue-400" />,
    title: 'Math & Science Calculators',
    description: 'Percentage, Fractions, Statistics',
    path: '/math-science-calculators'
  },
  {
    icon: <Sun className="w-10 h-10 text-purple-400" />,
    title: 'Lifestyle & Everyday Calculators',
    description: 'Age, Sleep, Fuel Cost, GPA',
    path: '/lifestyle-everyday-calculators'
  }
];

const CategoriesSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">Explore by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={category.path} className="block h-full">
              <Card className="bg-slate-800/40 border-slate-700/50 h-full hover:bg-slate-800 hover:border-primary/50 transition-all duration-300 group text-center p-8">
                <CardContent className="flex flex-col items-center justify-center p-0">
                  <div className="mb-5 flex items-center justify-center w-20 h-20 rounded-full bg-slate-700/50 group-hover:bg-primary/20 transition-colors duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-slate-400 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
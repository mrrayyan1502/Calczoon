import React from 'react';
import Seo from '@/components/Seo';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile } from 'lucide-react';

const lifestyleCalculators = [
  { name: 'Date Calculator', description: 'Calculate the days, weeks, or months between two dates.', path: '/lifestyle/date-calculator' },
  { name: 'Tip Calculator', description: 'Calculate tip amount and split bills easily among friends.', path: '/lifestyle/tip-calculator' },
  { name: 'Age Calculator', description: 'Find your exact age in years, months, days, and more.', path: '/lifestyle/age-calculator' },
  { name: 'GPA Calculator', description: 'Calculate your Grade Point Average quickly and easily.', path: '/lifestyle/gpa-calculator' },
  { name: 'Concrete Calculator', description: 'Estimate the amount of concrete needed for your project.', path: '/lifestyle/concrete-calculator' },
  { name: 'Sleep Calculator', description: 'Find the best time to wake up or go to sleep for optimal rest.', path: '/lifestyle/sleep-calculator' },
  { name: 'Fuel Cost Calculator', description: 'Calculate the fuel cost for your trip based on distance and MPG.', path: '/lifestyle/fuel-cost-calculator' },
  { name: 'Time Zone Converter', description: 'Convert dates and times across global time zones instantly.', path: '/lifestyle/time-zone-converter' },
  { name: 'Discount Calculator', description: 'Calculate sales discounts and itemized tax savings.', path: '/lifestyle/discount-calculator' },
  { name: 'Unit Converter', description: 'Convert weight and length measurements between metric and imperial units.', path: '/lifestyle/unit-converter' },
];

const LifestyleCalculators = () => {
  return (
    <>
      <Seo
        title="Lifestyle & Everyday Calculators"
        description="A collection of free online calculators for various lifestyle and everyday needs, including age, GPA, fuel cost, and more."
        canonicalUrl="/lifestyle-everyday-calculators"
      />
      <div className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Lifestyle & Everyday Calculators</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">Simplify your daily life with our collection of practical calculators. From managing your health and fitness to planning your finances and projects, these tools are designed to provide quick and accurate answers.</p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          {lifestyleCalculators.map((calc, index) => (
            <motion.div key={calc.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
              <Link to={calc.path} className="block h-full">
                <Card className="bg-slate-800/40 border-slate-700/50 h-full hover:bg-slate-800 hover:border-primary/50 transition-all duration-300 group flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center gap-2">
                      <Smile size={24} /> {calc.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-slate-400">{calc.description}</p>
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

export default LifestyleCalculators;
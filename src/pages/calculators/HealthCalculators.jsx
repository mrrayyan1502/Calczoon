import React from 'react';
import Seo from '@/components/Seo';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse } from 'lucide-react';

const healthCalculators = [
  { name: 'BMI Calculator', description: 'Check your Body Mass Index to assess your weight category.', path: '/health/bmi-calculator' },
  { name: 'Ideal Weight Calculator', description: 'Calculate your ideal body weight range based on standard medical formulas.', path: '/health/ideal-weight-calculator' },
  { name: 'TDEE Calculator', description: 'Determine your total daily energy expenditure for diet planning.', path: '/health/tdee-calculator' },
  { name: 'Macro Calculator', description: 'Calculate your daily needs for protein, carbs, and fat.', path: '/health/macro-calculator' },
  { name: 'Calories Burned Calculator', description: 'Estimate calories burned during various activities.', path: '/health/calories-burned-calculator' },
  { name: 'Body Fat Calculator', description: 'Estimate your body fat percentage using the Navy method.', path: '/health/body-fat-calculator' },
  { name: 'Pregnancy Due Date Calculator', description: 'Estimate your baby\'s due date.', path: '/health/pregnancy-due-date-calculator' },
  { name: 'Weight Loss Calculator', description: 'Track your weight loss progress and set future goals.', path: '/health/weight-loss-calculator' },
  { name: 'Water Intake Calculator', description: 'Calculate your recommended daily water consumption.', path: '/health/water-intake-calculator' },
];

const HealthCalculators = () => {
  return (
    <>
      <Seo
        title="Health and Fitness Calculators Online - Calczoon"
        description="Explore online fitness and health calculators, including health check calculators. Track your wellness journey with tools like BMI, calorie burn, and more."
        canonicalUrl="/health-fitness-calculators"
      />
      <div className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Health and Fitness Calculators</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">Achieve your health and fitness goals with our easy-to-use fitness calculators. Track your progress, understand your body's needs, and make informed decisions about your wellness journey with our range of health calculators. Whether you're looking to calculate your BMI, track your caloric intake, or plan your workouts, our online fitness calculators are here to help.</p>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          {healthCalculators.map((calc, index) => (
            <motion.div key={calc.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
              <Link to={calc.path} className="block h-full">
                <Card className="bg-slate-800/40 border-slate-700/50 h-full hover:bg-slate-800 hover:border-primary/50 transition-all duration-300 group flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center gap-2">
                      <HeartPulse size={24} /> {calc.name}
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

export default HealthCalculators;
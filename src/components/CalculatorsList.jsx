import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, HeartPulse, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const calculatorGroups = [
  {
    category: 'Financial Calculators: Plan Your Finances',
    icon: <DollarSign className="w-7 h-7 text-green-400" />,
    calculators: [
      { name: 'Auto Loan Payment Calculator', description: 'Estimate your monthly car payments, factoring in trade-ins.', path: '/financial/loan-calculator' },
      { name: 'Simple Interest Calculator', description: 'Quickly calculate simple interest on personal loans or debts.', path: '/financial/simple-interest-calculator' },
      { name: 'Retirement Savings Calculator', description: 'Project how long your retirement savings will last.', path: '/financial/savings-calculator' },
      { name: 'Mortgage Payoff Calculator', description: 'See how extra principal payments can save you thousands.', path: '/financial/mortgage-payoff-calculator' },
      { name: 'DTI Ratio Calculator', description: 'Check your debt-to-income ratio for home loan readiness.', path: '/financial/debt-to-income-ratio-calculator' },
      { name: 'Investment ROI Calculator', description: 'Calculate the return on your investments quickly.', path: '/financial/investment-roi-calculator' },
    ]
  },
  {
    category: 'Health & Fitness Calculators: Track Your Goals',
    icon: <HeartPulse className="w-7 h-7 text-red-400" />,
    calculators: [
      { name: 'BMI Calculator for Adults', description: 'Calculate your Body Mass Index for a health snapshot.', path: '/health/bmi-calculator' },
      { name: 'TDEE Calculator for Weight Management', description: 'Find daily calorie needs for your goals.', path: '/health/tdee-calculator' },
      { name: 'Macro Calculator for Diet Planning', description: 'Get a personalized macro plan for your diet.', path: '/health/macro-calculator' },
      { name: 'Pregnancy Due Date & Conception Calculator', description: 'Estimate your baby\'s due date from LMP or conception.', path: '/health/pregnancy-due-date-calculator' },
      { name: 'Calories Burned Calculator', description: 'Estimate calories burned from walking and other activities.', path: '/health/calories-burned-calculator' },
      { name: 'Water Intake Calculator', description: 'Determine your recommended daily water intake.', path: '/health/water-intake-calculator' },
    ]
  },
  {
    category: 'Math Calculators: Solve Complex Problems',
    icon: <BookOpen className="w-7 h-7 text-blue-400" />,
    calculators: [
      { name: 'Percentage Calculator', description: 'Solve any percentage problem instantly.', path: '/math/percentage-calculator' },
      { name: 'Fraction Calculator with Steps', description: 'Add, subtract, multiply, and divide fractions with ease.', path: '/math/fraction-calculator' },
      { name: 'Triangle Area Calculator & Solver', description: 'Find sides, angles, area, and perimeter of any triangle.', path: '/math/triangle-calculator' },
      { name: 'Statistics Calculator', description: 'Analyze data sets to find mean, median, and mode.', path: '/math/statistics-calculator' },
      { name: 'Exponent Calculator', description: 'Quickly solve expressions with positive or negative powers.', path: '/math/exponent-calculator' },
    ]
  },
];


const CalculatorsList = () => {
    return (
        <div className="space-y-16">
            {calculatorGroups.map((group, groupIndex) => (
                <motion.div
                    key={group.category}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                >
                    <Card className="bg-slate-800/30 border-slate-700/50 overflow-hidden">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl font-bold text-white">
                                {group.icon}
                                {group.category}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {group.calculators.map((calc) => (
                                    <Card key={calc.path} className="bg-slate-800/50 border-slate-700 flex flex-col justify-between p-6 hover:bg-slate-800 transition-colors duration-300">
                                        <div>
                                            <h3 className="font-semibold text-lg text-slate-100">{calc.name}</h3>
                                            <p className="text-sm text-slate-400 mt-2 mb-4">{calc.description}</p>
                                        </div>
                                        <Button asChild variant="secondary" className="w-full mt-auto">
                                            <Link to={calc.path}>Use Tool →</Link>
                                        </Button>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
};

export default CalculatorsList;
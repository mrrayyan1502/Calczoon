'use client';

import React from 'react';
import Seo from '@/components/Seo';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';

const financialCalculators = [
  { name: 'Mortgage Calculator', description: 'Estimate your monthly home payments, principal, interest, taxes, and amortization.', path: '/financial/mortgage-calculator' },
  { name: 'Loan EMI Calculator', description: 'Estimate monthly payments, interest charges, and payoff schedules for loans.', path: '/financial/loan-calculator' },
  { name: 'Compound Interest Calculator', description: 'Calculate how your savings and mutual funds multiply over 5 to 30 years.', path: '/financial/compound-interest-calculator' },
  { name: 'Live Currency Converter', description: 'Convert 150+ world currencies instantly with real-time foreign exchange rates.', path: '/financial/currency-converter' },
  { name: 'Savings Goal Calculator', description: 'Plan monthly contributions to achieve your target financial milestones.', path: '/financial/savings-calculator' },
  { name: 'Retirement Savings Calculator', description: 'Project your retirement nest egg, inflation impact, and sustainable withdrawal.', path: '/financial/retirement-calculator' },
  { name: 'SIP Investment Calculator', description: 'Estimate returns on monthly Systematic Investment Plans with compounding interest.', path: '/financial/sip-calculator' },
];

const FinancialCalculators = () => {
    return (
        <>
            <Seo
                title="Free Online Financial Calculators - CalcZoon"
                description="Access our curated suite of free financial calculators for mortgages, loans, compound interest, savings goals, and retirement planning."
                canonicalUrl="/financial-calculators"
            />
            <div className="container mx-auto px-4 py-16 max-w-7xl">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6 shadow-lg">
                      <DollarSign className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Free Online Financial Calculators</h1>
                    <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                      Take control of your financial future with our reliable financial calculation tools. From planning home mortgages and personal loans to growing investments through compound interest, these tools deliver fast and accurate financial estimates.
                    </p>
                </motion.div>

                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    {financialCalculators.map((calc, index) => (
                        <motion.div key={calc.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                            <Link to={calc.path} className="block h-full">
                                <Card className="bg-slate-800/40 border-slate-700/50 h-full hover:bg-slate-800 hover:border-emerald-500/50 transition-all duration-300 group flex flex-col justify-between p-6 rounded-2xl shadow-xl">
                                    <div>
                                        <CardHeader className="p-0 mb-4">
                                            <CardTitle className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                                                <span>{calc.name}</span>
                                                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <p className="text-sm text-slate-300 leading-relaxed">{calc.description}</p>
                                        </CardContent>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-slate-700/40 text-xs font-semibold text-emerald-400 flex items-center justify-between">
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

export default FinancialCalculators;

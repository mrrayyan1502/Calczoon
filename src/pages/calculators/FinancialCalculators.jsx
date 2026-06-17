import React from 'react';
import Seo from '@/components/Seo';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

const financialCalculators = [
  { name: 'Mortgage Calculator', description: 'Estimate your monthly home payments, principal, and interest.', path: '/financial/mortgage-calculator' },
  { name: 'Currency Converter', description: 'Get live exchange rates for global currencies.', path: '/financial/currency-converter' },
  { name: 'Loan EMI Calculator', description: 'Estimate monthly payments for auto, personal, or other loans.', path: '/financial/loan-calculator' },
  { name: 'Compound Interest Calculator', description: 'See how your investments can grow over time.', path: '/financial/compound-interest-calculator' },
  { name: 'Investment ROI Calculator', description: 'Measure the profitability and return on your investments.', path: '/financial/investment-roi-calculator' },
  { name: 'Retirement Savings Calculator', description: 'Project your savings to see if you are on track for retirement.', path: '/financial/retirement-calculator' },
  { name: 'Salary Calculator', description: 'Convert your salary between annual, monthly, and hourly rates.', path: '/financial/salary-calculator' },
  { name: 'Mortgage Payoff Calculator', description: 'Calculate how extra payments can shorten your mortgage term.', path: '/financial/mortgage-payoff-calculator' },
  { name: 'DTI Ratio Calculator', description: 'Check your debt-to-income ratio for financial health.', path: '/financial/debt-to-income-ratio-calculator' },
  { name: 'Simple Interest Calculator', description: 'Calculate simple interest on loans or savings.', path: '/financial/simple-interest-calculator' },
  { name: 'Savings Goal Calculator', description: 'Plan how to reach your savings goals over time.', path: '/financial/savings-calculator' },
  { name: 'Crypto Profit Calculator', description: 'Track your profits and losses from cryptocurrency trades.', path: '/financial/crypto-profit-calculator' },
  { name: 'Freelancer Tax Calculator', description: 'Estimate your self-employment taxes and plan for payments.', path: '/financial/freelancer-tax-calculator' },
];

const FinancialCalculators = () => {
    return (
        <>
            <Seo
                title="Free Online Financial Calculators - CalcZoon"
                description="Get access to free online financial calculators for budgeting, loans, investments, and more. Calculate your finances easily with our reliable financial tools."
                canonicalUrl="/financial-calculators"
            />
            <div className="container mx-auto px-4 py-16">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Free Online Financial Calculators</h1>
                    <p className="text-lg text-slate-300 max-w-3xl mx-auto">Take control of your financial future with our free online financial calculators. From planning loans and investments to saving for retirement, we have a free financial calculator for every need. Our suite of financial calculators will help you make informed decisions, whether you are looking to calculate mortgage payments or plan for future expenses. With our online financial calculator, managing your finances has never been easier.</p>
                </motion.div>
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    {financialCalculators.map((calc, index) => (
                        <motion.div key={calc.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                            <Link to={calc.path} className="block h-full">
                                <Card className="bg-slate-800/40 border-slate-700/50 h-full hover:bg-slate-800 hover:border-primary/50 transition-all duration-300 group flex flex-col">
                                    <CardHeader>
                                        <CardTitle className="text-xl text-primary flex items-center gap-2">
                                            <DollarSign size={24} /> {calc.name}
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

export default FinancialCalculators;
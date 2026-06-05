import React from 'react';
import CalculatorsList from '@/components/CalculatorsList';
import Seo from '@/components/Seo';
import { DollarSign, Landmark, PiggyBank, TrendingUp, Coins as HandCoins, Building, FileBarChart, Bot, User, Bitcoin } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const financialTools = [
  { name: 'Loan/EMI Calculator', path: '/financial/loan-calculator', icon: <Landmark className="w-8 h-8" />, description: 'Estimate loan payments.' },
  { name: 'Simple Interest Calculator', path: '/financial/simple-interest-calculator', icon: <DollarSign className="w-8 h-8" />, description: 'Calculate simple interest.' },
  { name: 'Savings Calculator', path: '/financial/savings-calculator', icon: <PiggyBank className="w-8 h-8" />, description: 'Project savings growth.' },
  { name: 'Compound Interest', path: '/financial/compound-interest-calculator', icon: <TrendingUp className="w-8 h-8" />, description: 'See interest grow.' },
  { name: 'Mortgage Payoff', path: '/financial/mortgage-payoff-calculator', icon: <Building className="w-8 h-8" />, description: 'Pay off mortgage faster.' },
  { name: 'Retirement Calculator', path: '/financial/retirement-calculator', icon: <Bot className="w-8 h-8" />, description: 'Plan for retirement.' },
  { name: 'Salary Calculator', path: '/financial/salary-calculator', icon: <User className="w-8 h-8" />, description: 'Analyze your salary.' },
  { name: 'DTI Ratio Calculator', path: '/financial/debt-to-income-ratio-calculator', icon: <FileBarChart className="w-8 h-8" />, description: 'Check your DTI ratio.' },
  { name: 'Investment ROI', path: '/financial/investment-roi-calculator', icon: <HandCoins className="w-8 h-8" />, description: 'Calculate investment ROI.' },
  { name: 'Crypto Profit Calculator', path: '/financial/crypto-profit-calculator', icon: <Bitcoin className="w-8 h-8" />, description: 'Track crypto profits.' },
  { name: 'Freelancer Tax', path: '/financial/freelancer-tax-calculator', icon: <User className="w-8 h-8" />, description: 'Estimate freelancer taxes.' },
];

const FinancialCalculators = () => {
  return (
    <>
      <Seo
        title="Financial Calculators | Free Tools for Smart Money Management"
        description="A comprehensive suite of free financial calculators to help you manage loans, investments, savings, retirement, and more. Take control of your finances today."
        canonicalUrl="/financial-calculators"
      />
      <PageHeader 
        title="Financial Calculators"
        description="Tools for smart financial planning, from loans and investments to savings and retirement."
        icon={DollarSign}
      />
      <CalculatorsList tools={financialTools} />
    </>
  );
};

export default FinancialCalculators;
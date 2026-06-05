import React from 'react';
import Seo from '@/components/Seo';
import { motion } from 'framer-motion';
import CalculatorsList from '@/components/CalculatorsList';
import PageHeader from '@/components/PageHeader';
import { Calculator } from 'lucide-react';

const Tools = () => {
  return (
    <>
      <Seo
        title="All Calculators: Free Online Tools for Every Need | CalcZoon"
        description="Browse our complete collection of free, fast, and accurate online calculators. Find tools for finance, health, math, and general utility, all designed to give you instant answers."
        canonicalUrl="/tools"
      />
      <div className="container mx-auto px-4 py-8">
        <PageHeader 
          title="All Calculators"
          description="Your one-stop hub for free, fast, and accurate online calculators. Whether you're planning your finances, tracking your health goals, or solving complex math problems, we have the right tool for the job."
          icon={Calculator}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CalculatorsList />
        </motion.div>
      </div>
    </>
  );
};

export default Tools;
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CalculatorsList from '@/components/CalculatorsList';
import Seo from '@/components/Seo';

const Calculators = () => {
  return (
    <>
      <Seo
        title="All Calculators: Free Online Tools for Every Need | Calczoon"
        description="Browse our complete collection of free, fast, and accurate online calculators. Find tools for finance, health, math, and general utility, all designed to give you instant answers."
        canonicalUrl="/calculators"
      />
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">A Comprehensive Suite of Free Online Calculators</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Welcome to your one-stop hub for free, fast, and accurate online calculators. Whether you're planning your finances, tracking your health goals, or solving complex math problems, we have the right tool for the job.
          </p>
        </motion.div>
        <CalculatorsList />
      </div>
    </>
  );
};

export default Calculators;
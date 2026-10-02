'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Home, Calculator, Heart, DollarSign, Compass, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Seo from '@/components/Seo';

const NotFound = () => {
  return (
    <>
      <Seo
        title="404 - Page Not Found | CalcZoon"
        description="The calculator or page you are looking for does not exist. Browse our free financial, health, and math calculators."
        canonicalUrl="/404"
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-16 px-4 text-center"
      >
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
          <AlertCircle className="w-10 h-10" />
        </div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-3">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-4">Calculator or Page Not Found</h2>
        <p className="text-slate-300 text-base md:text-lg mb-8 max-w-lg mx-auto">
          The page you requested may have been relocated, updated, or does not exist. Don't worry, all our core calculators are ready for you below.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-slate-950 font-bold px-8">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" /> Go Back to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-slate-700 text-slate-200 hover:text-white">
            <Link to="/tools" className="flex items-center gap-2">
              <Compass className="w-5 h-5" /> Browse All 24 Calculators
            </Link>
          </Button>
        </div>

        {/* Category Shortcuts */}
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-8 text-left">
          <h3 className="text-lg font-bold text-white mb-4 text-center">Popular Calculator Hubs</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/financial-calculators" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white group-hover:text-emerald-400 text-sm">Financial Tools</span>
              </div>
              <span className="text-xs text-slate-400">Mortgage, Loan, Compound Interest & SIP</span>
            </Link>

            <Link to="/health-fitness-calculators" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-rose-400" />
                <span className="font-semibold text-white group-hover:text-emerald-400 text-sm">Health & Fitness</span>
              </div>
              <span className="text-xs text-slate-400">BMI, TDEE, Macros & Body Fat</span>
            </Link>

            <Link to="/math-science-calculators" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-4 h-4 text-sky-400" />
                <span className="font-semibold text-white group-hover:text-emerald-400 text-sm">Math & Science</span>
              </div>
              <span className="text-xs text-slate-400">Percentage, Fraction & Scientific</span>
            </Link>

            <Link to="/lifestyle-everyday-calculators" className="p-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl transition-all block group">
              <div className="flex items-center gap-2 mb-1">
                <Compass className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white group-hover:text-emerald-400 text-sm">Everyday Tools</span>
              </div>
              <span className="text-xs text-slate-400">Age, Discount, Tip & Fuel Cost</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NotFound;

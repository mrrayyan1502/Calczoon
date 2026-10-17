'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calculator, HeartPulse, ShieldCheck } from 'lucide-react';

const standards = [
  {
    icon: <Calculator className="h-6 w-6 text-emerald-400" />,
    badge: "Industry Standard",
    title: "Standardized Mathematical Models",
    description: "Financial and math tools use standard industry equations (compound interest, amortization, statistical formulas). Every algorithm is benchmarked against verified actuarial and computational formulas."
  },
  {
    icon: <HeartPulse className="h-6 w-6 text-sky-400" />,
    badge: "Clinical Evidence",
    title: "Health & Fitness Benchmarks",
    description: "Health calculators use peer-reviewed clinical equations (e.g., Mifflin-St Jeor, U.S. Navy Method, WHO BMI classifications) calibrated against established medical and nutritional literature."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-indigo-400" />,
    badge: "Editorial Integrity",
    title: "Editorial & YMYL Disclaimer",
    description: "All calculators and educational guides are strictly for educational and informational planning, not formal financial, tax, legal, or medical advice. Always consult certified professionals for critical decisions."
  }
];

const AccuracyStandardsSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          Methodology & Trust
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Accuracy Standards &amp; Formula Verification Methodology
        </h2>
        <p className="max-w-2xl mx-auto text-slate-300 text-sm md:text-base leading-relaxed">
          CalcZoon combines rigorous mathematical modeling with peer-reviewed scientific research to deliver transparent, reproducible calculation results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {standards.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
          >
            <Card className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 h-full flex flex-col p-6 rounded-2xl shadow-lg">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-full border border-slate-700/50">
                    {item.badge}
                  </span>
                </div>
                <CardTitle className="text-lg text-white font-bold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-grow">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AccuracyStandardsSection;

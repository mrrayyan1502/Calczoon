'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { AlertTriangle, HeartPulse, Landmark, Brain, ShieldAlert, CheckCircle2 } from 'lucide-react';
import Seo from '@/components/Seo';

const Disclaimer = () => {
  return (
    <>
      <Seo
        title="Disclaimer & Professional Advice Notice - CalcZoon"
        description="Important legal disclaimer for CalcZoon. All calculator results and content are for informational and educational purposes only. Always consult a qualified professional for medical or financial decisions."
        canonical="https://calczoon.com/disclaimer"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      >
        <Card className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <CardHeader className="text-center bg-slate-800/30 border-b border-slate-700/40 p-8 md:p-10">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle className="h-8 w-8 text-amber-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
              Disclaimer & Professional Advice Notice
            </h1>
            <p className="text-slate-300 text-sm mt-3">Last Updated: October 2, 2026</p>
          </CardHeader>
          
          <CardContent className="space-y-8 text-slate-300 leading-relaxed px-6 md:px-10 py-8">
            {/* Primary Notice Box */}
            <div className="p-5 bg-amber-500/10 border-l-4 border-amber-400 rounded-r-xl space-y-2">
              <p className="text-base md:text-lg font-bold text-amber-300">
                Important Notice: Results Are for Informational Purposes Only
              </p>
              <p className="text-sm text-slate-200">
                All calculation tools, formulas, estimations, and articles published on <strong>CalcZoon.com</strong> are provided strictly for general informational and educational purposes. Under no circumstances should any result from this website be treated as professional financial, legal, tax, or medical advice.
              </p>
            </div>

            <div className="space-y-6">
              {/* Financial Decisions Notice */}
              <div className="p-6 bg-slate-800/50 border border-slate-700/70 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <Landmark className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold text-white">1. Financial Decisions & Advice Disclaimer</h2>
                </div>
                <div className="text-sm text-slate-300 space-y-2">
                  <p>
                    Our financial calculators (including Mortgage, Loan, Compound Interest, Savings, Retirement, Currency, and SIP tools) use standard mathematical formulas to compute hypothetical estimations based on the exact numbers you input.
                  </p>
                  <p>
                    These mathematical projections do not account for individual credit scores, fluctuating interest rates, taxes, insurance premiums, bank fees, underwriting qualifications, or market risks. 
                  </p>
                  <p className="font-semibold text-white">
                    Always consult a licensed Certified Financial Planner (CFP), mortgage broker, qualified accountant, or tax attorney before making any loan commitment, investment decision, or major financial transaction.
                  </p>
                </div>
              </div>

              {/* Medical & Health Decisions Notice */}
              <div className="p-6 bg-slate-800/50 border border-slate-700/70 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-500/10 rounded-lg text-rose-400">
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold text-white">2. Medical & Health Decisions Disclaimer</h2>
                </div>
                <div className="text-sm text-slate-300 space-y-2">
                  <p>
                    Tools within our Health & Fitness category (such as BMI, TDEE, Macro, Body Fat, Calories Burned, and Water Intake calculators) are statistical screening tools and educational models based on general population formulas.
                  </p>
                  <p>
                    These tools do not diagnose medical conditions, determine clinical health, or replace individual medical evaluation. Factors such as bone density, muscle mass, underlying medical conditions, and pregnancy cannot be fully captured by basic mathematical equations.
                  </p>
                  <p className="font-semibold text-white">
                    Never disregard professional medical advice or delay seeking treatment because of a calculation result. Always consult a qualified physician, medical doctor, or registered dietitian before starting a new diet, calorie deficit, or exercise program.
                  </p>
                </div>
              </div>

              {/* Mathematical & General Tools */}
              <div className="p-6 bg-slate-800/50 border border-slate-700/70 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-sky-500/10 rounded-lg text-sky-400">
                    <Brain className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold text-white">3. Mathematical & Everyday Estimations</h2>
                </div>
                <p className="text-sm text-slate-300">
                  While our engineering team validates each calculator with extensive unit tests, mathematical and conversion tools (percentages, fractions, unit conversions, fuel costs) are provided on an "as-is" basis. Real-world conditions—such as vehicle efficiency fluctuations or rounding variations—mean results should always be independently verified for critical tasks.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-purple-500/10 rounded-lg text-purple-400">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold text-white">4. Limitation of Liability</h2>
                </div>
                <p className="text-sm text-slate-300">
                  By using CalcZoon.com, you expressly agree that CalcZoon Ltd., its founders, developers, and contributors shall not be liable for any direct, indirect, incidental, or consequential damages resulting from reliance on the calculations, estimates, or content provided on this website. You assume sole responsibility for any actions taken based on our tools.
                </p>
              </div>
            </div>

            <p className="text-center text-slate-400 text-sm pt-6 border-t border-slate-800">
              If you have any questions about this disclaimer, please reach out to us at{' '}
              <a href="mailto:contact@calczoon.com" className="text-primary hover:underline">contact@calczoon.com</a> or visit our{' '}
              <Link to="/contact" className="text-primary hover:underline">Contact Page</Link>.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Disclaimer;

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { AlertTriangle, HeartPulse, Landmark, Brain } from 'lucide-react';
import Seo from '@/components/Seo';

const Disclaimer = () => {
  return (
    <>
      <Seo
        title="Disclaimer - CalcZoon"
        description="Important disclaimer for CalcZoon.com. Our calculators provide estimates for informational purposes only and are not a substitute for professional advice."
        canonical="https://calczoon.com/disclaimer"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 px-4"
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-yellow-900/50">
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">Disclaimer & Waiver of Liability</h1>
            <p className="text-slate-300 text-lg mt-2">Please Read Carefully Before Using Our Tools</p>
          </CardHeader>
          <CardContent className="space-y-8 text-slate-200 leading-relaxed px-4 md:px-8 py-6">
            
            <div className="space-y-4 p-6 bg-slate-900/50 border border-slate-700 rounded-lg">
                <h2 className="text-2xl font-semibold text-white flex items-center"><Brain className="mr-3 h-6 w-6 text-primary" />For Informational Purposes Only</h2>
                <p>The calculators, content, and tools provided on CalcZoon.com are for informational and educational purposes only. The results generated are estimates based on widely accepted formulas and data you provide. They are not intended to be, and should not be interpreted as, professional advice.</p>
            </div>

            <div className="space-y-4 p-6 bg-slate-900/50 border border-slate-700 rounded-lg">
                <h2 className="text-2xl font-semibold text-white flex items-center"><HeartPulse className="mr-3 h-6 w-6 text-primary" />No Medical Advice</h2>
                <p>Information provided by our health and fitness calculators (such as the TDEE, BMI, or Macro calculators) does not constitute medical advice, diagnosis, or treatment. You should always consult with a qualified healthcare professional before making any decisions about your health, diet, or fitness regimen. Do not disregard professional medical advice or delay in seeking it because of something you have read or calculated on this website.</p>
            </div>

            <div className="space-y-4 p-6 bg-slate-900/50 border border-slate-700 rounded-lg">
                <h2 className="text-2xl font-semibold text-white flex items-center"><Landmark className="mr-3 h-6 w-6 text-primary" />No Financial Advice</h2>
                <p>Our financial calculators (such as Loan, Investment, or Retirement calculators) provide estimates that may not reflect your actual financial situation. The results are not a substitute for professional financial, tax, or legal advice. We strongly recommend consulting with a qualified financial advisor or accountant before making any financial decisions or investments.</p>
            </div>

            <div className="space-y-4 p-6 bg-red-900/20 border border-red-700/50 rounded-lg">
                <h2 className="text-2xl font-semibold text-white">Waiver of Liability</h2>
                <p>By using CalcZoon.com, you acknowledge and agree that we do not guarantee the accuracy, completeness, or applicability of any information or calculations. You agree that CalcZoon.com, its owners, and its contributors shall not be held liable for any damages, losses, or adverse consequences resulting directly or indirectly from the use of the information and tools provided on this site. You assume full responsibility and risk for your use of this website.</p>
            </div>

            <p className="text-center text-slate-400 pt-4">If you do not agree with this disclaimer, please do not use our website. Your continued use of the site signifies your acceptance of these terms. For any questions, please <Link to="/contact" className="text-primary hover:underline">contact us</Link>.</p>

          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Disclaimer;
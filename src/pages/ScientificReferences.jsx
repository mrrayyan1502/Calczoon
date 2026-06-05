import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import Seo from '@/components/Seo';

const references = [
  {
    calculator: 'TDEE & BMR Calculators',
    formulas: [
      {
        name: 'Mifflin-St Jeor Formula',
        source: 'Mifflin, M. D., St Jeor, S. T., Hill, L. A., Scott, B. J., Daugherty, S. A., & Koh, Y. O. (1990). A new predictive equation for resting energy expenditure in healthy individuals. The American journal of clinical nutrition, 51(2), 241-247.',
        link: 'https://doi.org/10.1093/ajcn/51.2.241'
      },
      {
        name: 'Revised Harris-Benedict Formula',
        source: 'Roza, A. M., & Shizgal, H. M. (1984). The Harris Benedict equation reevaluated: resting energy requirements and the body cell mass. The American journal of clinical nutrition, 40(1), 168-182.',
        link: 'https://doi.org/10.1093/ajcn/40.1.168'
      },
      {
        name: 'Katch-McArdle Formula',
        source: 'Katch, F. I., & McArdle, W. D. (1973). Prediction of body density from simple anthropometric measurements in college-age men and women. Human biology, 45(3), 445-454.',
        link: 'https://www.jstor.org/stable/41463337'
      }
    ]
  },
  {
    calculator: 'BMI Calculator',
    formulas: [
      {
        name: 'Body Mass Index (BMI)',
        source: 'World Health Organization. (2024). Body mass index - BMI. WHO.int.',
        link: 'https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations'
      }
    ]
  },
  {
    calculator: 'Loan & Interest Calculators',
    formulas: [
      {
        name: 'Compound Interest',
        source: 'Standard financial formula for calculating compound interest over time.',
        link: 'https://www.investopedia.com/terms/c/compoundinterest.asp'
      },
      {
        name: 'Loan Amortization (Annuity Formula)',
        source: 'Standard formula for calculating fixed periodic payments for an amortizing loan.',
        link: 'https://www.investopedia.com/terms/a/amortization.asp'
      }
    ]
  }
];

const ScientificReferences = () => {
  return (
    <>
      <Seo
        title="Scientific References - CalcZoon"
        description="A comprehensive list of the scientific papers, studies, and established formulas used in CalcZoon's calculators. We are committed to transparency and accuracy."
        canonical="https://calczoon.com/scientific-references"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 px-4"
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-slate-800">
                <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Scientific & Financial References</h1>
            <p className="text-slate-300 text-lg mt-2">The Foundation of Our Calculators</p>
          </CardHeader>
          <CardContent className="space-y-8 text-slate-200 leading-relaxed px-4 md:px-8 py-6">
            <p>At CalcZoon, we are committed to providing accurate and reliable tools. Our calculators are built upon established, peer-reviewed scientific research and standard financial formulas. Below is a list of the primary sources and formulas that power our calculators.</p>
            
            <div className="space-y-10">
              {references.map((ref, index) => (
                <div key={index} className="p-6 bg-slate-900/50 border border-slate-700 rounded-lg">
                  <h2 className="text-2xl font-semibold text-white mb-4">{ref.calculator}</h2>
                  <div className="space-y-4">
                    {ref.formulas.map((formula, fIndex) => (
                      <div key={fIndex} className="border-l-4 border-primary pl-4">
                        <h3 className="font-semibold text-primary">{formula.name}</h3>
                        <p className="text-sm text-slate-400 italic">"{formula.source}"</p>
                        <a href={formula.link} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-400 hover:underline">View Source</a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default ScientificReferences;
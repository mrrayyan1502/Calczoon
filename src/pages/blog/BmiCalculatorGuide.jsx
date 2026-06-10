import React from 'react';
import Seo from '@/components/Seo';
import { Activity, Heart, Apple, Scale, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const BmiCalculatorGuide = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Seo 
        title="Understanding BMI: The Complete Guide to Body Mass Index and Health" 
        description="A comprehensive guide to understanding your Body Mass Index (BMI), what the different categories mean, and how to maintain a healthy weight according to WHO standards." 
        canonicalUrl="/blog/bmi-calculator-guide"
      />
      
      <article className="prose prose-invert lg:prose-xl max-w-none">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6">
            Understanding BMI: The Complete Guide to Body Mass Index
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Learn what BMI really means, how it's calculated, and why it's a vital, though imperfect, tool for assessing your overall health.
          </p>
        </header>

        <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80" alt="Healthy Lifestyle and Fitness" className="w-full h-64 md:h-96 object-cover rounded-2xl mb-12 shadow-2xl" />

        <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl mb-10 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Activity className="text-blue-400" />
            What is Body Mass Index (BMI)?
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Body Mass Index (BMI) is a simple mathematical formula used globally to categorize an individual's weight in relation to their height. It is widely used by doctors and health professionals as a quick screening tool to identify possible weight problems for adults.
          </p>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-600 my-6 text-center font-mono text-lg text-blue-300">
            BMI = Weight (kg) / [Height (m)]²
          </div>
          <p className="text-slate-300 leading-relaxed">
            While BMI does not measure body fat directly, research has shown that it correlates strongly with more direct measures of body fat, such as underwater weighing and dual energy x-ray absorptiometry (DXA).
          </p>
        </div>

        <h2 className="text-3xl font-bold text-white mb-6">World Health Organization (WHO) BMI Categories</h2>
        
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="p-4 rounded-tl-lg font-semibold">BMI Range</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 rounded-tr-lg font-semibold">Health Risk</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-b border-slate-700 bg-blue-900/20">
                <td className="p-4 font-mono">&lt; 18.5</td>
                <td className="p-4 font-bold text-blue-400">Underweight</td>
                <td className="p-4 text-sm">Increased risk of nutritional deficiency and osteoporosis.</td>
              </tr>
              <tr className="border-b border-slate-700 bg-green-900/20">
                <td className="p-4 font-mono">18.5 - 24.9</td>
                <td className="p-4 font-bold text-green-400">Normal Weight</td>
                <td className="p-4 text-sm">Lowest risk of weight-related health conditions.</td>
              </tr>
              <tr className="border-b border-slate-700 bg-yellow-900/20">
                <td className="p-4 font-mono">25.0 - 29.9</td>
                <td className="p-4 font-bold text-yellow-400">Overweight</td>
                <td className="p-4 text-sm">Moderate risk of heart disease, high blood pressure, and type 2 diabetes.</td>
              </tr>
              <tr className="border-b border-slate-700 bg-red-900/20">
                <td className="p-4 font-mono">30.0+</td>
                <td className="p-4 font-bold text-red-400">Obese</td>
                <td className="p-4 text-sm">High risk of cardiovascular diseases, diabetes, and certain cancers.</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-slate-500 mt-2 text-right">* Categories based on World Health Organization (WHO) standards for adults.</p>
        </div>

        <h2 className="text-3xl font-bold text-white mb-6">Limitations of BMI</h2>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-10">
          <div className="flex items-start gap-4 mb-4">
            <Info className="text-blue-400 w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <p className="text-slate-300 leading-relaxed mb-4">
                While BMI is an excellent population-level screening tool, it has several limitations at an individual level:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-300">
                <li><strong>Athletes & Bodybuilders:</strong> BMI cannot distinguish between muscle and fat. Highly muscular individuals might be classified as "overweight" or "obese" despite having very low body fat.</li>
                <li><strong>Age & Gender:</strong> Women tend to have more body fat than men at the same BMI. Older adults tend to have more body fat than younger adults at the same BMI.</li>
                <li><strong>Fat Distribution:</strong> BMI does not account for <em>where</em> fat is stored. Visceral fat (belly fat) is significantly more dangerous than subcutaneous fat (fat under the skin).</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-6">Tips for Maintaining a Healthy BMI</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <Apple className="text-blue-400 w-8 h-8 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Balanced Nutrition</h3>
            <p className="text-slate-400 text-sm">
              Focus on whole foods, lean proteins, complex carbohydrates, and healthy fats. Maintain a slight caloric deficit if aiming for weight loss, and ensure adequate hydration.
            </p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <Heart className="text-blue-400 w-8 h-8 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Regular Exercise</h3>
            <p className="text-slate-400 text-sm">
              Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous aerobic activity a week, combined with strength training exercises twice a week.
            </p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <Scale className="text-blue-400 w-8 h-8 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Monitor Progress</h3>
            <p className="text-slate-400 text-sm">
              Track your weight consistently, but don't obsess over daily fluctuations. Use tools like body fat calipers or waist circumference measurements alongside BMI for a better picture.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 p-8 rounded-2xl text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">Calculate Your BMI Today</h3>
          <p className="text-slate-300 mb-6">
            Use our precise BMI calculator to find out your category and get personalized health recommendations instantly.
          </p>
          <Link 
            to="/health/bmi-calculator" 
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
          >
            Go to BMI Calculator <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700 text-sm text-slate-500 text-center">
          <p>
            <strong>Medical Disclaimer:</strong> The Body Mass Index (BMI) calculator and the information provided in this article are for informational and educational purposes only and are not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </div>
      </article>
    </div>
  );
};

export default BmiCalculatorGuide;

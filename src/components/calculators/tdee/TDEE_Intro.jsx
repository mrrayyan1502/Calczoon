import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TDEE_Intro = () => (
  <section className="mb-12 text-center">
    <p className="text-lg text-slate-300 max-w-4xl mx-auto mb-6">
      Discover your Total Daily Energy Expenditure (TDEE) — the exact number of calories your body burns in a day. Our calculator uses scientifically validated formulas to provide a personalized estimate, empowering you to tailor your nutrition for weight loss, maintenance, or muscle gain. Take control of your fitness journey by understanding your body's unique energy needs.
    </p>
    <div className="flex justify-center">
      <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <Link to="/health/macro-calculator">Calculate Your Macros Now</Link>
      </Button>
    </div>
  </section>
);

export default TDEE_Intro;
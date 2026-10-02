import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, HeartPulse, Target, Percent, BookOpen, Compass, Ruler, Calendar, DollarSign, TrendingUp, Landmark, Flame, Fuel } from 'lucide-react';

const toolsByCategory = {
  health: {
    title: "Related Health & Fitness Tools",
    items: [
      { name: 'TDEE Calculator', path: '/health/tdee-calculator', icon: <Dumbbell className="w-6 h-6" /> },
      { name: 'BMI Calculator', path: '/health/bmi-calculator', icon: <HeartPulse className="w-6 h-6" /> },
      { name: 'Macro Calculator', path: '/health/macro-calculator', icon: <Target className="w-6 h-6" /> },
      { name: 'Calories Burned', path: '/health/calories-burned-calculator', icon: <Flame className="w-6 h-6" /> },
    ]
  },
  financial: {
    title: "Related Financial Tools",
    items: [
      { name: 'Mortgage Calculator', path: '/financial/mortgage-calculator', icon: <Landmark className="w-6 h-6" /> },
      { name: 'Loan Calculator', path: '/financial/loan-calculator', icon: <DollarSign className="w-6 h-6" /> },
      { name: 'Compound Interest', path: '/financial/compound-interest-calculator', icon: <TrendingUp className="w-6 h-6" /> },
      { name: 'SIP Calculator', path: '/financial/sip-calculator', icon: <TrendingUp className="w-6 h-6" /> },
    ]
  },
  math: {
    title: "Related Math Tools",
    items: [
      { name: 'Percentage Calculator', path: '/math/percentage-calculator', icon: <Percent className="w-6 h-6" /> },
      { name: 'Fraction Calculator', path: '/math/fraction-calculator', icon: <BookOpen className="w-6 h-6" /> },
      { name: 'Triangle Calculator', path: '/math/triangle-calculator', icon: <Compass className="w-6 h-6" /> },
      { name: 'Scientific Calculator', path: '/math/scientific-calculator', icon: <BookOpen className="w-6 h-6" /> },
    ]
  },
  lifestyle: {
    title: "Related Everyday Tools",
    items: [
      { name: 'Age Calculator', path: '/lifestyle/age-calculator', icon: <Calendar className="w-6 h-6" /> },
      { name: 'Discount Calculator', path: '/lifestyle/discount-calculator', icon: <Percent className="w-6 h-6" /> },
      { name: 'Unit Converter', path: '/lifestyle/unit-converter', icon: <Ruler className="w-6 h-6" /> },
      { name: 'Fuel Cost Calculator', path: '/lifestyle/fuel-cost-calculator', icon: <Fuel className="w-6 h-6" /> },
    ]
  }
};

const RelatedTools = ({ category = 'health' }) => {
  const currentCategory = toolsByCategory[category] || toolsByCategory.health;
  
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-base font-bold">{currentCategory.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {currentCategory.items.map((tool) => (
            <Link key={tool.path} to={tool.path} className="block group">
              <Card className="bg-slate-900/60 border-slate-700/70 h-full hover:bg-slate-900 hover:border-emerald-500/50 transition-all duration-200">
                <CardContent className="p-3 flex flex-col items-center justify-center text-center h-full">
                  <div className="text-primary mb-1.5 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <p className="text-xs font-semibold text-slate-200 leading-tight group-hover:text-primary transition-colors">{tool.name}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedTools;
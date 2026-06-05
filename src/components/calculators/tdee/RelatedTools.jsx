import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, HeartPulse, Target, Percent, BookOpen, Compass, Ruler, Calendar, DollarSign, TrendingUp, Landmark, Flame, Coins, Clock } from 'lucide-react';

const toolsByCategory = {
  health: {
    title: "Related Health & Fitness Tools",
    items: [
      { name: 'TDEE Calculator', path: '/health/tdee-calculator', icon: <Dumbbell className="w-8 h-8" /> },
      { name: 'BMI Calculator', path: '/health/bmi-calculator', icon: <HeartPulse className="w-8 h-8" /> },
      { name: 'Macro Calculator', path: '/health/macro-calculator', icon: <Target className="w-8 h-8" /> },
      { name: 'Calories Burned', path: '/health/calories-burned-calculator', icon: <Flame className="w-8 h-8" /> },
    ]
  },
  financial: {
    title: "Related Financial Tools",
    items: [
      { name: 'SIP Calculator', path: '/financial/sip-calculator', icon: <TrendingUp className="w-8 h-8" /> },
      { name: 'Loan Calculator', path: '/financial/loan-calculator', icon: <DollarSign className="w-8 h-8" /> },
      { name: 'Compound Interest', path: '/financial/compound-interest-calculator', icon: <Landmark className="w-8 h-8" /> },
      { name: 'Investment ROI', path: '/financial/investment-roi-calculator', icon: <Coins className="w-8 h-8" /> },
    ]
  },
  math: {
    title: "Related Math Tools",
    items: [
      { name: 'Percentage Calculator', path: '/math/percentage-calculator', icon: <Percent className="w-8 h-8" /> },
      { name: 'Fraction Calculator', path: '/math/fraction-calculator', icon: <BookOpen className="w-8 h-8" /> },
      { name: 'Triangle Solver', path: '/math/triangle-calculator', icon: <Compass className="w-8 h-8" /> },
      { name: 'Scientific Calc', path: '/math/scientific-calculator', icon: <BookOpen className="w-8 h-8" /> },
    ]
  },
  lifestyle: {
    title: "Related Lifestyle Tools",
    items: [
      { name: 'Age Calculator', path: '/lifestyle/age-calculator', icon: <Calendar className="w-8 h-8" /> },
      { name: 'Unit Converter', path: '/lifestyle/unit-converter', icon: <Ruler className="w-8 h-8" /> },
      { name: 'Discount Calculator', path: '/lifestyle/discount-calculator', icon: <Percent className="w-8 h-8" /> },
      { name: 'Time Zone Converter', path: '/lifestyle/time-zone-converter', icon: <Clock className="w-8 h-8" /> },
    ]
  }
};

const RelatedTools = ({ category = 'health' }) => {
  const currentCategory = toolsByCategory[category] || toolsByCategory.health;
  
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white text-lg font-bold">{currentCategory.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {currentCategory.items.map((tool) => (
            <Link key={tool.path} to={tool.path} className="block group">
              <Card className="bg-slate-800 border-slate-700 h-full hover:bg-slate-800 hover:border-primary/40 transition-all duration-300">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                  <div className="text-primary mb-2 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <p className="text-xs font-semibold text-slate-200 leading-tight">{tool.name}</p>
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
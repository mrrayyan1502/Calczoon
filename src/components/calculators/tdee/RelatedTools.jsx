import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, HeartPulse, Target, Flame } from 'lucide-react';

const relatedToolsList = [
  { name: 'TDEE Calculator', path: '/health/tdee-calculator', icon: <Dumbbell className="w-8 h-8" /> },
  { name: 'BMI Calculator', path: '/health/bmi-calculator', icon: <HeartPulse className="w-8 h-8" /> },
  { name: 'Macro Calculator', path: '/health/macro-calculator', icon: <Target className="w-8 h-8" /> },
  { name: 'Calories Burned Calculator', path: '/health/calories-burned-calculator', icon: <Flame className="w-8 h-8" /> },
];

const RelatedTools = () => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle>Related Health & Fitness Calculators</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {relatedToolsList.map((tool) => (
            <Link key={tool.path} to={tool.path} className="block group">
              <Card className="bg-slate-800 border-slate-700 h-full hover:bg-slate-700/50 transition-colors">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                  <div className="text-primary mb-2 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <p className="text-sm font-medium text-slate-200 leading-tight">{tool.name}</p>
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
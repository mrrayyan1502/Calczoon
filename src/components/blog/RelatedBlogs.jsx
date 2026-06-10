import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, TrendingUp, HeartPulse, Calculator, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const allBlogs = [
  // Financial
  { path: '/blog/sip-calculator-guide', title: 'Guide to SIPs: Building Wealth', category: 'financial', icon: TrendingUp },
  { path: '/blog/loan-calculator-guide', title: 'Master Your Loans & Amortization', category: 'financial', icon: TrendingUp },
  { path: '/blog/compound-interest-guide', title: 'The Power of Compound Interest', category: 'financial', icon: TrendingUp },
  { path: '/blog/financial-wellness-guide', title: 'Financial Wellness Guide', category: 'financial', icon: TrendingUp },
  { path: '/blog/top-financial-calculators-for-financial-planning', title: 'Top Financial Calculators', category: 'financial', icon: TrendingUp },
  { path: '/blog/mortgage-payoff-guide', title: 'Mortgage Payoff Guide', category: 'financial', icon: TrendingUp },
  { path: '/blog/savings-goal-guide', title: 'How to Reach Savings Goals', category: 'financial', icon: TrendingUp },
  { path: '/blog/investment-roi-guide', title: 'Understanding ROI', category: 'financial', icon: TrendingUp },
  
  // Health
  { path: '/blog/understanding-bmi', title: 'Understanding BMI', category: 'health', icon: HeartPulse },
  { path: '/blog/bmi-calculator-guide', title: 'BMI Calculator Guide', category: 'health', icon: HeartPulse },
  { path: '/blog/macro-calculator-guide', title: 'Macro Calculator Guide', category: 'health', icon: HeartPulse },
  { path: '/blog/tdee-calculator-guide', title: 'TDEE & Metabolism Guide', category: 'health', icon: HeartPulse },
  { path: '/blog/body-fat-percentage-guide', title: 'Body Fat Percentage Guide', category: 'health', icon: HeartPulse },
  { path: '/blog/calories-burned-guide', title: 'Calories Burned Guide', category: 'health', icon: HeartPulse },
  { path: '/blog/sleep-cycle-guide', title: 'Sleep Cycle & Health', category: 'health', icon: HeartPulse },
  
  // Math
  { path: '/blog/simplifying-complex-math', title: 'Simplifying Complex Math', category: 'math', icon: Calculator },
  { path: '/blog/triangle-area-guide', title: 'Triangle Area Guide', category: 'math', icon: Calculator },
  { path: '/blog/percentage-calculator-guide', title: 'Percentage Calculations', category: 'math', icon: Calculator },
  { path: '/blog/fraction-calculator-guide', title: 'Understanding Fractions', category: 'math', icon: Calculator },
  { path: '/blog/statistics-calculator-guide', title: 'Basic Statistics Guide', category: 'math', icon: Calculator },
  
  // Lifestyle / Other
  { path: '/blog/age-calculator-guide', title: 'Age & Time Guide', category: 'lifestyle', icon: GraduationCap },
  { path: '/blog/gpa-calculator-guide', title: 'GPA & Academic Success', category: 'lifestyle', icon: GraduationCap },
  { path: '/blog/concrete-calculator-guide', title: 'Concrete Volume Guide', category: 'lifestyle', icon: BookOpen },
  { path: '/blog/fuel-cost-guide', title: 'Fuel Efficiency & Costs', category: 'lifestyle', icon: BookOpen },
];

const RelatedBlogs = ({ category }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Filter out current blog and match category
  let related = allBlogs.filter(blog => blog.path !== currentPath && blog.category === category);
  
  // If not enough related blogs, fill with other categories to ensure at least 3
  if (related.length < 3) {
    const others = allBlogs.filter(blog => blog.path !== currentPath && blog.category !== category);
    related = [...related, ...others].slice(0, 3);
  } else {
    // Shuffle or just take first 3 for simplicity
    related = related.slice(0, 3);
  }

  if (related.length === 0) return null;

  return (
    <div className="mt-16 border-t border-slate-700/50 pt-10 pb-6 w-full not-prose">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <BookOpen className="text-emerald-400" />
        Continue Reading
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((blog, idx) => {
          const Icon = blog.icon;
          return (
            <Link key={idx} to={blog.path} className="block group">
              <Card className="bg-slate-800/40 border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300 h-full">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="mb-4 bg-slate-900/50 p-3 rounded-lg w-fit group-hover:bg-emerald-500/10 transition-colors">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h4>
                  <div className="mt-auto pt-4 text-emerald-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article <span aria-hidden="true">&rarr;</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedBlogs;

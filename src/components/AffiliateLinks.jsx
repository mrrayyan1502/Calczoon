import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, TrendingUp, DollarSign, Calculator, Activity, Heart } from 'lucide-react';

/**
 * AffiliateLinks - Shows relevant affiliate product recommendations on calculator pages.
 * Add this component to any calculator page to show monetized links.
 * 
 * HOW TO SET UP AFFILIATE ACCOUNTS (all free):
 * 1. Amazon Associates: https://affiliate-program.amazon.com
 * 2. ShareASale: https://www.shareasale.com
 * 3. CJ Affiliate: https://www.cj.com
 * 4. Impact: https://impact.com
 * 
 * Replace the href URLs with your actual affiliate links once approved.
 */

const links = {
  loan: [
    { name: 'Compare Loan Rates', url: 'https://www.nerdwallet.com/l/loan-calculator', desc: 'Find the best personal loan rates in minutes' },
    { name: 'Loan Calculator Books', url: 'https://amzn.to/3R4loan', desc: 'Top-rated books on loans & debt management' },
  ],
  bmi: [
    { name: 'Gluco6 - Blood Sugar Support', url: 'https://tinyurl.com/5448pvdk', desc: 'Natural supplement for healthy glucose levels & weight management' },
    { name: 'Smart BMI Scale', url: 'https://amzn.to/3R4bmi', desc: 'Best-selling digital BMI scale for home use' },
  ],
  tdee: [
    { name: 'Gluco6 - Blood Sugar Support', url: 'https://tinyurl.com/5448pvdk', desc: 'Natural supplement for healthy glucose levels & weight management' },
    { name: 'Kitchen Food Scale', url: 'https://amzn.to/3R4food', desc: 'Accurate food scale for macro tracking' },
  ],
  compound: [
    { name: 'Best Investment Apps', url: 'https://www.nerdwallet.com/best/investing', desc: 'Top-rated investing platforms for beginners' },
    { name: 'Investing Books', url: 'https://amzn.to/3R4invest', desc: 'Must-read books on compound investing' },
  ],
  water: [
    { name: 'Gluco6 - Blood Sugar Support', url: 'https://tinyurl.com/5448pvdk', desc: 'Natural supplement for healthy glucose levels & weight management' },
    { name: 'Smart Water Bottle', url: 'https://amzn.to/3R4water', desc: 'LED smart bottle that reminds you to drink' },
  ],
  savings: [
    { name: 'High-Yield Savings', url: 'https://www.nerdwallet.com/best/savings', desc: 'Best savings accounts with highest APY' },
    { name: 'Budget Planner', url: 'https://amzn.to/3R4budget', desc: 'Popular budget planner notebook' },
  ],
  mortgage: [
    { name: 'Mortgage Rate Check', url: 'https://www.nerdwallet.com/mortgages', desc: 'Compare current mortgage rates' },
    { name: 'Home Buying Guide', url: 'https://amzn.to/3R4home', desc: 'Complete guide to buying a home' },
  ],
  retirement: [
    { name: 'Retirement Calculator', url: 'https://www.nerdwallet.com/calculator/retirement', desc: 'Plan your retirement savings' },
    { name: 'IRA Accounts', url: 'https://amzn.to/3R4ira', desc: 'Best IRA accounts for retirement' },
  ],
};

const AffiliateLinks = ({ category, title = 'Recommended Tools' }) => {
  const items = links[category];
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-8 p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-xs text-slate-500 ml-auto">Affiliate</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 hover:bg-slate-700/50 
                       border border-slate-700/30 hover:border-emerald-600/50 transition-all group"
          >
            <ExternalLink className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0 
                                     group-hover:translate-x-0.5 transition-transform" />
            <div>
              <span className="text-sm font-medium text-slate-200 group-hover:text-emerald-300 transition-colors">
                {item.name}
              </span>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </div>
          </a>
        ))}
      </div>
      <p className="text-[11px] text-slate-600 mt-3">
        As an Amazon Associate and partner with other affiliate programs, we may earn commissions 
        from qualifying purchases at no extra cost to you.
      </p>
    </div>
  );
};

export default AffiliateLinks;

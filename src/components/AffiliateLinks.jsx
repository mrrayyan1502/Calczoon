import React from 'react';
import { ExternalLink, TrendingUp } from 'lucide-react';

const links = {
  loan: [
    { name: 'Compare Loan Rates', url: 'https://www.nerdwallet.com/l/loan-calculator', desc: 'Find the best personal loan rates in minutes' },
  ],
  bmi: [
    { name: 'Gluco6 - Blood Sugar Support', url: 'https://tinyurl.com/5448pvdk', desc: 'Natural supplement for healthy glucose levels & weight management' },
  ],
  tdee: [
    { name: 'Gluco6 - Blood Sugar Support', url: 'https://tinyurl.com/5448pvdk', desc: 'Natural supplement for healthy glucose levels & weight management' },
  ],
  compound: [
    { name: 'Best Investment Apps', url: 'https://www.nerdwallet.com/best/investing', desc: 'Top-rated investing platforms for beginners' },
  ],
  water: [
    { name: 'Gluco6 - Blood Sugar Support', url: 'https://tinyurl.com/5448pvdk', desc: 'Natural supplement for healthy glucose levels & weight management' },
  ],
  savings: [
    { name: 'High-Yield Savings', url: 'https://www.nerdwallet.com/best/savings', desc: 'Best savings accounts with highest APY' },
  ],
  mortgage: [
    { name: 'Mortgage Rate Check', url: 'https://www.nerdwallet.com/mortgages', desc: 'Compare current mortgage rates' },
  ],
};

const AffiliateLinks = ({ category, title = 'Recommended' }) => {
  const items = links[category];
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-8 p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-xs text-slate-500 ml-auto">Affiliate</span>
      </div>
      <div className="grid grid-cols-1 gap-3">
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
    </div>
  );
};

export default AffiliateLinks;

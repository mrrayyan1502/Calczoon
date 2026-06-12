/**
 * Sitemap Generator - Creates XML sitemap from route list
 * Run after build: node tools/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://calczoon.com';
const TODAY = new Date().toISOString().split('T')[0];

const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/tools', priority: '0.9', changefreq: 'daily' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.4', changefreq: 'monthly' },
  { path: '/terms-and-conditions', priority: '0.4', changefreq: 'monthly' },
  { path: '/disclaimer', priority: '0.4', changefreq: 'monthly' },
  { path: '/sitemap', priority: '0.5', changefreq: 'monthly' },
  { path: '/scientific-references', priority: '0.5', changefreq: 'monthly' },
  { path: '/calculators', priority: '0.8', changefreq: 'weekly' },
  { path: '/financial-calculators', priority: '0.7', changefreq: 'weekly' },
  { path: '/health-fitness-calculators', priority: '0.7', changefreq: 'weekly' },
  { path: '/math-science-calculators', priority: '0.7', changefreq: 'weekly' },
  { path: '/lifestyle-everyday-calculators', priority: '0.7', changefreq: 'weekly' },
  // Calculator pages
  { path: '/health/bmi-calculator', priority: '0.9', changefreq: 'weekly' },
  { path: '/health/tdee-calculator', priority: '0.9', changefreq: 'weekly' },
  { path: '/health/macro-calculator', priority: '0.8', changefreq: 'weekly' },
  { path: '/health/calories-burned-calculator', priority: '0.8', changefreq: 'weekly' },
  { path: '/health/weight-loss-calculator', priority: '0.8', changefreq: 'weekly' },
  { path: '/health/body-fat-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/health/pregnancy-due-date-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/health/water-intake-calculator', priority: '0.6', changefreq: 'weekly' },
  { path: '/health/vo2-max-calculator', priority: '0.6', changefreq: 'weekly' },
  { path: '/financial/loan-calculator', priority: '0.9', changefreq: 'weekly' },
  { path: '/financial/compound-interest-calculator', priority: '0.9', changefreq: 'weekly' },
  { path: '/financial/simple-interest-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/financial/savings-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/financial/mortgage-payoff-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/financial/debt-to-income-ratio-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/financial/investment-roi-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/financial/retirement-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/financial/salary-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/financial/crypto-profit-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/financial/freelancer-tax-calculator', priority: '0.6', changefreq: 'weekly' },
  { path: '/math/percentage-calculator', priority: '0.8', changefreq: 'weekly' },
  { path: '/math/fraction-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/math/triangle-calculator', priority: '0.8', changefreq: 'weekly' },
  { path: '/math/statistics-calculator', priority: '0.8', changefreq: 'weekly' },
  { path: '/math/exponent-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/lifestyle/age-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/lifestyle/gpa-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/lifestyle/concrete-calculator', priority: '0.6', changefreq: 'weekly' },
  { path: '/lifestyle/sleep-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/lifestyle/fuel-cost-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/lifestyle/discount-calculator', priority: '0.7', changefreq: 'weekly' },
  { path: '/lifestyle/time-zone-converter', priority: '0.7', changefreq: 'weekly' },
  // Blog posts
  { path: '/blog/macro-calculator-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/financial-wellness-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/tdee-calculator-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/bmi-calculator-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/loan-calculator-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/compound-interest-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/body-fat-percentage-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/mortgage-payoff-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/triangle-area-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/percentage-calculator-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/fraction-calculator-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/statistics-calculator-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/savings-goal-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/investment-roi-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/calories-burned-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/sleep-cycle-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/age-calculator-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/gpa-calculator-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/concrete-calculator-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/fuel-cost-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/simplifying-complex-math', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/top-financial-calculators-for-financial-planning', priority: '0.6', changefreq: 'monthly' },
];

function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  for (const route of ROUTES) {
    xml += `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
  }
  xml += `</urlset>`;
  
  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml);
  console.log(`✅ Sitemap generated: ${outputPath} (${ROUTES.length} URLs)`);
}

generateSitemap();

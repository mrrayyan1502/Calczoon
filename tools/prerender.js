/**
 * Prerender Script - Generates static HTML for SPA SEO
 * Run after "vite build" to create pre-rendered HTML pages
 * 
 * Usage: node tools/prerender.js
 * This script uses Playwright to render JS pages and save HTML
 * Install: npx playwright install chromium
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:4173'; // vite preview server
const DIST_DIR = path.join(__dirname, '..', 'dist');

// All routes to prerender
const ROUTES = [
  '/',
  '/about',
  '/privacy',
  '/contact',
  '/tools',
  '/blog',
  '/sitemap',
  '/partners',
  '/terms-and-conditions',
  '/disclaimer',
  '/scientific-references',
  '/calculators',
  '/financial-calculators',
  '/health-fitness-calculators',
  '/math-science-calculators',
  '/lifestyle-everyday-calculators',
  '/blog/macro-calculator-guide',
  '/blog/financial-wellness-guide',
  '/blog/tdee-calculator-guide',
  '/blog/bmi-calculator-guide',
  '/blog/loan-calculator-guide',
  '/blog/compound-interest-guide',
  '/blog/body-fat-percentage-guide',
  '/blog/mortgage-payoff-guide',
  '/blog/triangle-area-guide',
  '/blog/percentage-calculator-guide',
  '/blog/fraction-calculator-guide',
  '/blog/statistics-calculator-guide',
  '/blog/savings-goal-guide',
  '/blog/investment-roi-guide',
  '/blog/calories-burned-guide',
  '/blog/sleep-cycle-guide',
  '/blog/age-calculator-guide',
  '/blog/gpa-calculator-guide',
  '/blog/concrete-calculator-guide',
  '/blog/fuel-cost-guide',
  '/blog/simplifying-complex-math',
  '/blog/top-financial-calculators-for-financial-planning',
  '/health/tdee-calculator',
  '/health/bmi-calculator',
  '/health/macro-calculator',
  '/health/calories-burned-calculator',
  '/health/weight-loss-calculator',
  '/health/pregnancy-due-date-calculator',
  '/health/water-intake-calculator',
  '/health/body-fat-calculator',
  '/health/vo2-max-calculator',
  '/financial/simple-interest-calculator',
  '/financial/loan-calculator',
  '/financial/savings-calculator',
  '/financial/mortgage-payoff-calculator',
  '/financial/debt-to-income-ratio-calculator',
  '/financial/compound-interest-calculator',
  '/financial/investment-roi-calculator',
  '/financial/retirement-calculator',
  '/financial/salary-calculator',
  '/financial/crypto-profit-calculator',
  '/financial/freelancer-tax-calculator',
  '/financial/vat-calculator',
  '/math/percentage-calculator',
  '/math/fraction-calculator',
  '/math/triangle-calculator',
  '/math/statistics-calculator',
  '/math/exponent-calculator',
  '/lifestyle/age-calculator',
  '/lifestyle/gpa-calculator',
  '/lifestyle/concrete-calculator',
  '/lifestyle/sleep-calculator',
  '/lifestyle/fuel-cost-calculator',
  '/lifestyle/discount-calculator',
  '/lifestyle/time-zone-converter',
  '/health/tdee-calculator-for-weight-loss-female',
];

async function prerender() {
  console.log('Starting prerender...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  for (const route of ROUTES) {
    const url = BASE_URL + route;
    console.log(`  Prerendering: ${route}`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Get rendered HTML
      const html = await page.content();
      
      // Create file path
      let filePath = route === '/' ? '/index.html' : route + '.html';
      if (route.endsWith('/')) {
        filePath = route + 'index.html';
        if (route === '/') filePath = '/index.html';
      }
      
      const fullPath = path.join(DIST_DIR, filePath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, html);
      console.log(`    -> ${filePath}`);
    } catch (err) {
      console.error(`    ERROR: ${err.message}`);
    }
  }
  
  await browser.close();
  console.log('Prerender complete!');
}

prerender().catch(console.error);

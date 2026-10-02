'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mainPages = [
  { path: '/', name: 'Home' },
  { path: '/tools', name: 'All Calculators' },
  { path: '/about', name: 'About Us' },
  { path: '/contact', name: 'Contact' },
  { path: '/privacy', name: 'Privacy Policy' },
  { path: '/terms-of-service', name: 'Terms of Service' },
  { path: '/disclaimer', name: 'Disclaimer' },
  { path: '/partners', name: 'Partners' },
  { path: '/blog', name: 'Blog' },
];

const financialCalculators = [
  { path: '/financial-calculators', name: 'Financial Calculators Hub' },
  { path: '/financial/mortgage-calculator', name: 'Mortgage Calculator' },
  { path: '/financial/loan-calculator', name: 'Loan EMI Calculator' },
  { path: '/financial/compound-interest-calculator', name: 'Compound Interest Calculator' },
  { path: '/financial/currency-converter', name: 'Currency Converter' },
  { path: '/financial/savings-calculator', name: 'Savings Goal Calculator' },
  { path: '/financial/retirement-calculator', name: 'Retirement Savings Calculator' },
  { path: '/financial/sip-calculator', name: 'SIP Investment Calculator' },
];

const healthCalculators = [
  { path: '/health-fitness-calculators', name: 'Health & Fitness Calculators Hub' },
  { path: '/health/bmi-calculator', name: 'BMI Calculator' },
  { path: '/health/tdee-calculator', name: 'TDEE Calculator' },
  { path: '/health/macro-calculator', name: 'Macro Calculator' },
  { path: '/health/body-fat-calculator', name: 'Body Fat Calculator' },
  { path: '/health/calories-burned-calculator', name: 'Calories Burned Calculator' },
  { path: '/health/water-intake-calculator', name: 'Water Intake Calculator' },
];

const mathCalculators = [
  { path: '/math-science-calculators', name: 'Math & Science Calculators Hub' },
  { path: '/math/percentage-calculator', name: 'Percentage Calculator' },
  { path: '/math/fraction-calculator', name: 'Fraction Calculator' },
  { path: '/math/scientific-calculator', name: 'Scientific Calculator' },
  { path: '/math/triangle-calculator', name: 'Triangle Calculator' },
  { path: '/math/statistics-calculator', name: 'Statistics Calculator' },
];

const lifestyleCalculators = [
  { path: '/lifestyle-everyday-calculators', name: 'Lifestyle & Everyday Calculators Hub' },
  { path: '/lifestyle/age-calculator', name: 'Age Calculator' },
  { path: '/lifestyle/discount-calculator', name: 'Discount & Sales Calculator' },
  { path: '/lifestyle/tip-calculator', name: 'Tip & Bill Split Calculator' },
  { path: '/lifestyle/date-calculator', name: 'Date Duration Calculator' },
  { path: '/lifestyle/unit-converter', name: 'Unit Measurement Converter' },
  { path: '/lifestyle/fuel-cost-calculator', name: 'Fuel Cost Trip Calculator' },
];

const blogPosts = [
    { path: '/blog/how-to-calculate-compound-interest', name: 'How to Calculate Compound Interest Easily' },
    { path: '/blog/what-is-bmi', name: 'What is BMI and How to Use a BMI Calculator' },
    { path: '/blog/top-financial-calculators-for-financial-planning', name: 'Top 5 Financial Calculators to Plan Your Budget' },
    { path: '/blog/how-our-loan-calculator-helps-you-save-money', name: 'How Our Loan Calculator Helps You Save Money' },
    { path: "/blog/3-ways-to-use-macro-calculator-for-weight-loss", name: "3 Simple Ways to Use a Macro Calculator for Your Weight Loss Goals" },
    { path: "/blog/financial-wellness-guide", name: "The Ultimate Guide to Financial Wellness" },
    { path: "/blog/how-to-use-tdee-calculator", name: "How to Use TDEE Calculator for Weight Loss" },
    { path: "/blog/simplifying-complex-math", name: "Simplifying Complex Math with Our Online Tools" },
];

const PageList = ({ title, pages }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">{title}</h2>
        <ul className="list-disc list-inside space-y-2">
            {pages.map(page => (
                <li key={page.path}>
                    <Link to={page.path} className="text-slate-300 hover:text-primary hover:underline">{page.name}</Link>
                </li>
            ))}
        </ul>
    </div>
);


const Sitemap = () => {
  return (
    <>
      <Seo
        title="Sitemap | Calczoon"
        description="An overview of all pages and calculators available on Calczoon.com for easy navigation."
        canonicalUrl="/sitemap"
      />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Sitemap</h1>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <PageList title="Main Pages" pages={mainPages} />
              <PageList title="Blog Articles" pages={blogPosts} />
            </div>
            <div>
              <PageList title="Financial Calculators" pages={financialCalculators} />
              <PageList title="Health & Fitness Calculators" pages={healthCalculators} />
              <PageList title="Math & Science Calculators" pages={mathCalculators} />
              <PageList title="Lifestyle Calculators" pages={lifestyleCalculators} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Sitemap;

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@/pages': path.resolve(__dirname, 'src/views'),
      'react-router-dom': path.resolve(__dirname, 'src/shims/react-router-dom.jsx'),
      'react-helmet': path.resolve(__dirname, 'src/shims/react-helmet.jsx'),
      'react-helmet-async': path.resolve(__dirname, 'src/shims/react-helmet.jsx'),
    };
    return config;
  },
  async redirects() {
    return [
      // 17 Removed Calculators -> Redirect to Category or Best Alternative
      {
        source: '/auto-loan-calculator',
        destination: '/financial/loan-calculator',
        permanent: true,
      },
      {
        source: '/financial/auto-loan-calculator',
        destination: '/financial/loan-calculator',
        permanent: true,
      },
      {
        source: '/mortgage-payoff-calculator',
        destination: '/financial/mortgage-calculator',
        permanent: true,
      },
      {
        source: '/financial/mortgage-payoff-calculator',
        destination: '/financial/mortgage-calculator',
        permanent: true,
      },
      {
        source: '/simple-interest-calculator',
        destination: '/financial/compound-interest-calculator',
        permanent: true,
      },
      {
        source: '/financial/simple-interest-calculator',
        destination: '/financial/compound-interest-calculator',
        permanent: true,
      },
      {
        source: '/debt-to-income-ratio-calculator',
        destination: '/financial-calculators',
        permanent: true,
      },
      {
        source: '/financial/debt-to-income-ratio-calculator',
        destination: '/financial-calculators',
        permanent: true,
      },
      {
        source: '/investment-roi-calculator',
        destination: '/financial-calculators',
        permanent: true,
      },
      {
        source: '/financial/investment-roi-calculator',
        destination: '/financial-calculators',
        permanent: true,
      },
      {
        source: '/salary-calculator',
        destination: '/financial-calculators',
        permanent: true,
      },
      {
        source: '/financial/salary-calculator',
        destination: '/financial-calculators',
        permanent: true,
      },
      {
        source: '/crypto-profit-calculator',
        destination: '/financial-calculators',
        permanent: true,
      },
      {
        source: '/financial/crypto-profit-calculator',
        destination: '/financial-calculators',
        permanent: true,
      },
      {
        source: '/freelancer-tax-calculator',
        destination: '/financial-calculators',
        permanent: true,
      },
      {
        source: '/financial/freelancer-tax-calculator',
        destination: '/financial-calculators',
        permanent: true,
      },
      {
        source: '/vat-calculator',
        destination: '/financial-calculators',
        permanent: true,
      },
      {
        source: '/financial/vat-calculator',
        destination: '/financial-calculators',
        permanent: true,
      },
      {
        source: '/ideal-weight-calculator',
        destination: '/health/bmi-calculator',
        permanent: true,
      },
      {
        source: '/health/ideal-weight-calculator',
        destination: '/health/bmi-calculator',
        permanent: true,
      },
      {
        source: '/weight-loss-calculator',
        destination: '/health/tdee-calculator',
        permanent: true,
      },
      {
        source: '/health/weight-loss-calculator',
        destination: '/health/tdee-calculator',
        permanent: true,
      },
      {
        source: '/pregnancy-due-date-calculator',
        destination: '/health-fitness-calculators',
        permanent: true,
      },
      {
        source: '/health/pregnancy-due-date-calculator',
        destination: '/health-fitness-calculators',
        permanent: true,
      },
      {
        source: '/exponent-calculator',
        destination: '/math/scientific-calculator',
        permanent: true,
      },
      {
        source: '/math/exponent-calculator',
        destination: '/math/scientific-calculator',
        permanent: true,
      },
      {
        source: '/gpa-calculator',
        destination: '/lifestyle-everyday-calculators',
        permanent: true,
      },
      {
        source: '/lifestyle/gpa-calculator',
        destination: '/lifestyle-everyday-calculators',
        permanent: true,
      },
      {
        source: '/concrete-calculator',
        destination: '/lifestyle-everyday-calculators',
        permanent: true,
      },
      {
        source: '/lifestyle/concrete-calculator',
        destination: '/lifestyle-everyday-calculators',
        permanent: true,
      },
      {
        source: '/sleep-calculator',
        destination: '/lifestyle-everyday-calculators',
        permanent: true,
      },
      {
        source: '/lifestyle/sleep-calculator',
        destination: '/lifestyle-everyday-calculators',
        permanent: true,
      },
      {
        source: '/time-zone-converter',
        destination: '/lifestyle-everyday-calculators',
        permanent: true,
      },
      {
        source: '/lifestyle/time-zone-converter',
        destination: '/lifestyle-everyday-calculators',
        permanent: true,
      },

      // Legacy Blog & Alias Redirects
      {
        source: '/blog/top-financial-calculators-2025',
        destination: '/blog/top-financial-calculators-for-financial-planning',
        permanent: true,
      },
      {
        source: '/math/triangle-area-calculator-with-steps',
        destination: '/math/triangle-calculator',
        permanent: true,
      },
      {
        source: '/health/vo2-max-calculator',
        destination: '/health-fitness-calculators',
        permanent: true,
      },
      {
        source: '/triangle',
        destination: '/math/triangle-calculator',
        permanent: true,
      },
      {
        source: '/percentage',
        destination: '/math/percentage-calculator',
        permanent: true,
      },
      {
        source: '/fraction',
        destination: '/math/fraction-calculator',
        permanent: true,
      },
      {
        source: '/mortgage',
        destination: '/financial/mortgage-calculator',
        permanent: true,
      },
      {
        source: '/statistics',
        destination: '/math/statistics-calculator',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/references',
        destination: '/scientific-references',
        permanent: true,
      },
      {
        source: '/community',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/testimonials',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/blog/20-free-online-calculators',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/math/area-of-triangle-with-3-sides-calculator',
        destination: '/math/triangle-calculator',
        permanent: true,
      },
      {
        source: '/tools/triangle-area-calculator',
        destination: '/math/triangle-calculator',
        permanent: true,
      },
      {
        source: '/health/tdee-calculator-for-weight-loss-female',
        destination: '/health/tdee-calculator',
        permanent: true,
      },
      {
        source: '/body-fat',
        destination: '/health/body-fat-calculator',
        permanent: true,
      },
      {
        source: '/math/triangle-area-calculator',
        destination: '/math/triangle-calculator',
        permanent: true,
      },
      {
        source: '/blog/how-to-use-macro-calculator-for-weight-loss',
        destination: '/blog/macro-calculator-guide',
        permanent: true,
      },
      {
        source: '/blog/how-to-use-tdee-calculator',
        destination: '/blog/tdee-calculator-guide',
        permanent: true,
      },
      {
        source: '/blog/what-is-bmi',
        destination: '/blog/bmi-calculator-guide',
        permanent: true,
      },
      {
        source: '/blog/how-loan-calculator-saves-money',
        destination: '/blog/loan-calculator-guide',
        permanent: true,
      },
      {
        source: '/blog/how-to-calculate-compound-interest',
        destination: '/blog/compound-interest-guide',
        permanent: true,
      },
      {
        source: '/blog/what-is-body-fat-percentage',
        destination: '/blog/body-fat-percentage-guide',
        permanent: true,
      },
      {
        source: '/blog/how-to-save-on-mortgage',
        destination: '/blog/mortgage-payoff-guide',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

const fs = require('fs');
const path = require('path');

const blogs = [
  { id: "RetirementPlanningGuide", slug: "retirement-planning-guide", title: "The Ultimate Guide to Retirement Planning" },
  { id: "FreelancerTaxGuide", slug: "freelancer-tax-guide", title: "Navigating Taxes as a Freelancer" },
  { id: "WaterIntakeGuide", slug: "water-intake-guide", title: "How Much Water Do You Really Need?" },
  { id: "DebtToIncomeGuide", slug: "debt-to-income-guide", title: "Mastering Your Debt-to-Income Ratio" },
  { id: "CryptoProfitGuide", slug: "crypto-profit-guide", title: "Calculating Cryptocurrency Profits and Risks" },
  { id: "PregnancyHealthGuide", slug: "pregnancy-health-guide", title: "Navigating Your Pregnancy Timeline" },
  { id: "VatTaxGuide", slug: "vat-tax-guide", title: "Understanding Value-Added Tax (VAT)" },
  { id: "DiscountShoppingGuide", slug: "discount-shopping-guide", title: "The Math of Smart Shopping" },
  { id: "InvestmentRoiGuide", slug: "investment-roi-guide", title: "Demystifying Return on Investment (ROI)" },
  { id: "SalaryNegotiationGuide", slug: "salary-negotiation-guide", title: "Understanding Your Salary and Net Pay" }
];

// 1. App.jsx
let appJsxPath = path.join(__dirname, 'src/App.jsx');
if (fs.existsSync(appJsxPath)) {
  let content = fs.readFileSync(appJsxPath, 'utf8');
  
  // Add lazy imports
  let imports = blogs.map(b => `const ${b.id} = lazy(() => import('@/pages/blog/${b.id}'));`).join('\n');
  content = content.replace(/(const Tools = lazy\(\(\) => import\('@\/pages\/Tools'\)\);)/, `$1\n${imports}`);
  
  // Add routes
  let routes = blogs.map(b => `              <Route path="${b.slug}" element={<${b.id} />} />`).join('\n');
  content = content.replace(/(<Route path="top-financial-calculators-for-financial-planning" element={<FinancialWellnessGuide \/>} \/>)/, `$1\n${routes}`);
  
  fs.writeFileSync(appJsxPath, content, 'utf8');
}

// 2. generate-sitemap.js
let sitemapPath = path.join(__dirname, 'tools/generate-sitemap.js');
if (fs.existsSync(sitemapPath)) {
  let content = fs.readFileSync(sitemapPath, 'utf8');
  
  let sitemapRoutes = blogs.map(b => `  { path: '/blog/${b.slug}', priority: '0.6', changefreq: 'monthly' },`).join('\n');
  content = content.replace(/({\s*path:\s*'\/blog\/top-financial-calculators-for-financial-planning',\s*priority:\s*'0.6',\s*changefreq:\s*'monthly'\s*},)/, `$1\n${sitemapRoutes}`);
  
  fs.writeFileSync(sitemapPath, content, 'utf8');
}

// 3. Blog.jsx (to list them on the main blog page)
let blogPath = path.join(__dirname, 'src/pages/Blog.jsx');
if (fs.existsSync(blogPath)) {
  let content = fs.readFileSync(blogPath, 'utf8');
  
  let blogEntries = blogs.map(b => `
    {
      id: '${b.id}',
      title: '${b.title}',
      excerpt: 'Read our comprehensive guide to mastering this topic and taking control of your future.',
      category: 'Guides',
      readTime: '5 min',
      date: 'June 2026',
      imgSrc: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=600&q=80',
      slug: '${b.slug}'
    },`).join('');
    
  content = content.replace(/(const allPosts = \[)/, `$1${blogEntries}`);
  
  fs.writeFileSync(blogPath, content, 'utf8');
}

console.log("Integrated 10 blogs into App.jsx, Blog.jsx, and sitemap.");

import dynamic from 'next/dynamic';

const AgeBlog = dynamic(() => import('@/pages/blog/AgeBlog'));
const BmiBlog = dynamic(() => import('@/pages/blog/BmiBlog'));
const BmiCalculatorGuide = dynamic(() => import('@/pages/blog/BmiCalculatorGuide'));
const BodyFatBlog = dynamic(() => import('@/pages/blog/BodyFatBlog'));
const CaloriesBurnedBlog = dynamic(() => import('@/pages/blog/CaloriesBurnedBlog'));
const CompoundInterestBlog = dynamic(() => import('@/pages/blog/CompoundInterestBlog'));
const ConcreteBlog = dynamic(() => import('@/pages/blog/ConcreteBlog'));
const CryptoProfitGuide = dynamic(() => import('@/pages/blog/CryptoProfitGuide'));
const DebtToIncomeGuide = dynamic(() => import('@/pages/blog/DebtToIncomeGuide'));
const DiscountShoppingGuide = dynamic(() => import('@/pages/blog/DiscountShoppingGuide'));
const FinancialBlog = dynamic(() => import('@/pages/blog/FinancialBlog'));
const FinancialWellnessGuide = dynamic(() => import('@/pages/blog/FinancialWellnessGuide'));
const FractionBlog = dynamic(() => import('@/pages/blog/FractionBlog'));
const FreelancerTaxGuide = dynamic(() => import('@/pages/blog/FreelancerTaxGuide'));
const FuelCostBlog = dynamic(() => import('@/pages/blog/FuelCostBlog'));
const GpaBlog = dynamic(() => import('@/pages/blog/GpaBlog'));
const InvestmentRoiGuide = dynamic(() => import('@/pages/blog/InvestmentRoiGuide'));
const LoanBlog = dynamic(() => import('@/pages/blog/LoanBlog'));
const MacroCalculatorBlog = dynamic(() => import('@/pages/blog/MacroCalculatorBlog'));
const MacroCalculatorGuide = dynamic(() => import('@/pages/blog/MacroCalculatorGuide'));
const MathBlog = dynamic(() => import('@/pages/blog/MathBlog'));
const MortgageBlog = dynamic(() => import('@/pages/blog/MortgageBlog'));
const PercentageBlog = dynamic(() => import('@/pages/blog/PercentageBlog'));
const PregnancyHealthGuide = dynamic(() => import('@/pages/blog/PregnancyHealthGuide'));
const RetirementPlanningGuide = dynamic(() => import('@/pages/blog/RetirementPlanningGuide'));
const RoiBlog = dynamic(() => import('@/pages/blog/RoiBlog'));
const SalaryNegotiationGuide = dynamic(() => import('@/pages/blog/SalaryNegotiationGuide'));
const SavingsBlog = dynamic(() => import('@/pages/blog/SavingsBlog'));
const SipCalculatorGuide = dynamic(() => import('@/pages/blog/SipCalculatorGuide'));
const SleepBlog = dynamic(() => import('@/pages/blog/SleepBlog'));
const StatisticsBlog = dynamic(() => import('@/pages/blog/StatisticsBlog'));
const TdeeBlog = dynamic(() => import('@/pages/blog/TdeeBlog'));
const TriangleBlog = dynamic(() => import('@/pages/blog/TriangleBlog'));
const VatTaxGuide = dynamic(() => import('@/pages/blog/VatTaxGuide'));
const WaterIntakeGuide = dynamic(() => import('@/pages/blog/WaterIntakeGuide'));

export const blogPosts = {
  'macro-calculator-guide': {
    title: 'A Comprehensive Guide to Using a Macro Calculator for Fitness Goals',
    description: 'Learn how to calculate and balance your macronutrients (protein, carbs, fats) to optimize muscle gain, fat loss, and athletic performance.',
    component: MacroCalculatorGuide,
  },
  'sip-calculator-guide': {
    title: 'How to Build Long-Term Wealth with a SIP Calculator',
    description: 'Understand the power of compound interest and systematic investment plans (SIP). Discover how small monthly contributions grow exponentially.',
    component: SipCalculatorGuide,
  },
  'understanding-bmi': {
    title: 'Understanding BMI: History, Science, and Health Implications',
    description: 'Explore the origins of the Body Mass Index, clinical strengths, limitations, and how to accurately interpret your personal score.',
    component: BmiCalculatorGuide,
  },
  'financial-wellness-guide': {
    title: 'Mastering Personal Finance: Essential Calculators for Budgeting',
    description: 'A step-by-step roadmap to achieving financial freedom, managing debt-to-income ratios, and building an automated savings strategy.',
    component: FinancialWellnessGuide,
  },
  'tdee-calculator-guide': {
    title: 'How to Use a TDEE Calculator for Sustainable Weight Loss',
    description: 'Demystify Total Daily Energy Expenditure. Learn how basal metabolic rate and activity levels determine your daily calorie requirements.',
    component: TdeeBlog,
  },
  'top-financial-calculators-for-financial-planning': {
    title: 'Top Financial Calculators Every Modern Saver Needs in 2026',
    description: 'Discover the top financial calculation tools that simplify loan amortizations, retirement projections, and investment returns.',
    component: FinancialBlog,
  },
  'simplifying-complex-math': {
    title: 'Simplifying Complex Math: Everyday Applications of Algebra & Geometry',
    description: 'Make numbers intuitive. From percentages and fractions to trigonometry, explore how online math solvers save time.',
    component: MathBlog,
  },
  'bmi-calculator-guide': {
    title: 'What Is BMI? A Complete Guide to Using a BMI Calculator',
    description: 'Learn what Body Mass Index means for your health, WHO classification boundaries, and how to track body composition accurately.',
    component: BmiBlog,
  },
  'loan-calculator-guide': {
    title: 'How a Loan EMI Calculator Saves You Thousands on Interest',
    description: 'Uncover amortization schedules, prepayments, and loan terms to minimize total borrowing costs on personal and car loans.',
    component: LoanBlog,
  },
  'compound-interest-guide': {
    title: 'The Magic of Compound Interest: Grow Your Savings Faster',
    description: 'Learn Albert Einstein’s eighth wonder of the world. Real-world compounding formulas and wealth accumulation strategies.',
    component: CompoundInterestBlog,
  },
  'body-fat-percentage-guide': {
    title: 'What Is Body Fat Percentage and How Is It Measured?',
    description: 'Compare the U.S. Navy circumference method with DEXA scans. Understand healthy body fat ranges for men and women.',
    component: BodyFatBlog,
  },
  'mortgage-payoff-guide': {
    title: 'How Extra Mortgage Payments Can Cut Years Off Your Home Loan',
    description: 'See how bi-weekly payments and small principal additions dramatically reduce lifetime interest payments on your home loan.',
    component: MortgageBlog,
  },
  'triangle-area-guide': {
    title: 'How to Calculate the Area of Any Triangle with Step-by-Step Proofs',
    description: 'Master Heron’s formula, base and height calculations, and equilateral triangle geometry with clear examples.',
    component: TriangleBlog,
  },
  'percentage-calculator-guide': {
    title: 'Everyday Percentage Calculations: Discounts, Increases, and Changes',
    description: 'Quick mental math tricks and formulas to calculate percentage increase, decrease, discounts, and sales tax effortlessly.',
    component: PercentageBlog,
  },
  'fraction-calculator-guide': {
    title: 'Adding, Subtracting, Multiplying, and Dividing Fractions Explained',
    description: 'A friendly guide to common denominators, improper fractions, and mixed numbers with step-by-step solutions.',
    component: FractionBlog,
  },
  'statistics-calculator-guide': {
    title: 'Understanding Statistics: Mean, Median, Mode, Variance, and Deviation',
    description: 'Master core statistical metrics for data analysis, research studies, and academic coursework with interactive examples.',
    component: StatisticsBlog,
  },
  'savings-goal-guide': {
    title: 'How to Calculate and Achieve Your Personal Savings Goals',
    description: 'Calculate how much to save monthly for emergency funds, down payments, or dream vacations using compound growth.',
    component: SavingsBlog,
  },
  'investment-roi-guide': {
    title: 'Calculating Investment ROI: Formula, Annualized Return, and Case Studies',
    description: 'Determine the real profitability of your stocks, real estate, and business ventures with net return on investment calculations.',
    component: RoiBlog,
  },
  'calories-burned-guide': {
    title: 'How Many Calories Do You Really Burn During Exercise?',
    description: 'Learn how MET values, body weight, and duration impact caloric burn during running, cycling, swimming, and weight lifting.',
    component: CaloriesBurnedBlog,
  },
  'sleep-cycle-guide': {
    title: 'Mastering the 90-Minute Sleep Cycle for Peak Energy',
    description: 'Understand REM and non-REM sleep stages to calculate the perfect bedtime and wake-up times to avoid sleep inertia.',
    component: SleepBlog,
  },
  'age-calculator-guide': {
    title: 'Calculating Exact Age in Years, Months, Days, and Hours',
    description: 'Discover the calendrical mathematics of leap years, planetary rotations, and calculating precise age milestones.',
    component: AgeBlog,
  },
  'gpa-calculator-guide': {
    title: 'How to Calculate Your Weighted and Unweighted High School/College GPA',
    description: 'Understand credit hours, honor course scales, and strategies to raise your cumulative grade point average for admissions.',
    component: GpaBlog,
  },
  'concrete-calculator-guide': {
    title: 'How Much Concrete Do You Need? Slabs, Footings, and Columns Formula',
    description: 'Calculate cubic yards and bags of pre-mix concrete needed for DIY patios, driveways, and post holes with waste margins.',
    component: ConcreteBlog,
  },
  'fuel-cost-guide': {
    title: 'How to Calculate Fuel Costs for Road Trips and Daily Commutes',
    description: 'Calculate fuel consumption based on distance, vehicle MPG, and current gas prices to budget road trips effectively.',
    component: FuelCostBlog,
  },
  'retirement-planning-guide': {
    title: 'Retirement Planning Guide: How Much Do You Need to Retire comfortably?',
    description: 'Use the 4% rule, projected living expenses, and inflation assumptions to build a foolproof retirement nest egg.',
    component: RetirementPlanningGuide,
  },
  'freelancer-tax-guide': {
    title: 'Freelancer and Self-Employment Tax Guide: Estimating Your Liability',
    description: 'Understand self-employment tax, deductible expenses, quarterly estimated payments, and net profit calculations.',
    component: FreelancerTaxGuide,
  },
  'water-intake-guide': {
    title: 'How Much Water Should You Drink Daily? Science-Backed Hydration',
    description: 'Calculate optimal fluid intake based on body weight, climate, and exercise level for physical and cognitive health.',
    component: WaterIntakeGuide,
  },
  'debt-to-income-guide': {
    title: 'Understanding Debt-to-Income Ratio (DTI) for Mortgages and Loans',
    description: 'Learn why lenders evaluate front-end and back-end DTI ratios and actionable steps to lower your score before applying.',
    component: DebtToIncomeGuide,
  },
  'crypto-profit-guide': {
    title: 'How to Calculate Cryptocurrency Profit, Loss, and Capital Gains',
    description: 'Calculate return on investment, realized gains, cost basis, and trading fees for Bitcoin, Ethereum, and altcoins.',
    component: CryptoProfitGuide,
  },
  'pregnancy-health-guide': {
    title: 'Pregnancy Due Date & Trimester Milestones: Week-by-Week Guide',
    description: 'Understand Naegele’s rule, conception calculations, and key developmental markers throughout the three trimesters.',
    component: PregnancyHealthGuide,
  },
  'vat-tax-guide': {
    title: 'Understanding Value-Added Tax (VAT): Domestic and International Rates',
    description: 'Calculate gross price, net price, and input tax credits across UK, European, and international tax frameworks.',
    component: VatTaxGuide,
  },
  'discount-shopping-guide': {
    title: 'Smart Shopping: How to Calculate Stacked Discounts and Real Savings',
    description: 'Master combined percentage sales, coupon codes, and clearance markdowns to determine real savings before checkout.',
    component: DiscountShoppingGuide,
  },
  'investment-roi-guide-advanced': {
    title: 'Advanced Investment Analysis: ROI, IRR, and NPV Explained',
    description: 'Deep dive into financial valuation metrics for entrepreneurs, real estate investors, and portfolio managers.',
    component: InvestmentRoiGuide,
  },
  'salary-negotiation-guide': {
    title: 'Salary Negotiation Guide: Converting Hourly, Monthly, and Annual Pay',
    description: 'Evaluate total compensation, benefits packages, bonus structures, and cost-of-living adjustments when negotiating.',
    component: SalaryNegotiationGuide,
  },
};

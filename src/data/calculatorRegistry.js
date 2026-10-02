import dynamic from 'next/dynamic';

// Health Calculators
const BMICalculator = dynamic(() => import('@/pages/calculators/health/BMICalculator'));
const TDEECalculator = dynamic(() => import('@/pages/calculators/health/TDEECalculator'));
const MacroCalculator = dynamic(() => import('@/pages/calculators/health/MacroCalculator'));
const CaloriesBurnedCalculator = dynamic(() => import('@/pages/calculators/health/CaloriesBurnedCalculator'));
const WeightLossCalculator = dynamic(() => import('@/pages/calculators/health/WeightLossCalculator'));
const PregnancyDueDateCalculator = dynamic(() => import('@/pages/calculators/health/PregnancyDueDateCalculator'));
const WaterIntakeCalculator = dynamic(() => import('@/pages/calculators/health/WaterIntakeCalculator'));
const BodyFatCalculator = dynamic(() => import('@/pages/calculators/health/BodyFatCalculator'));
const IdealWeightCalculator = dynamic(() => import('@/pages/calculators/health/IdealWeightCalculator'));

// Financial Calculators
const MortgageCalculator = dynamic(() => import('@/pages/calculators/financial/MortgageCalculator'));
const CurrencyConverter = dynamic(() => import('@/pages/calculators/financial/CurrencyConverter'));
const SimpleInterestCalculator = dynamic(() => import('@/pages/calculators/financial/SimpleInterestCalculator'));
const LoanCalculator = dynamic(() => import('@/pages/calculators/financial/LoanCalculator'));
const SavingsCalculator = dynamic(() => import('@/pages/calculators/financial/SavingsCalculator'));
const MortgagePayoffCalculator = dynamic(() => import('@/pages/calculators/financial/MortgagePayoffCalculator'));
const DebtToIncomeRatioCalculator = dynamic(() => import('@/pages/calculators/financial/DebtToIncomeRatioCalculator'));
const CompoundInterestCalculator = dynamic(() => import('@/pages/calculators/financial/CompoundInterestCalculator'));
const InvestmentRoiCalculator = dynamic(() => import('@/pages/calculators/financial/InvestmentRoiCalculator'));
const RetirementCalculator = dynamic(() => import('@/pages/calculators/financial/RetirementCalculator'));
const SalaryCalculator = dynamic(() => import('@/pages/calculators/financial/SalaryCalculator'));
const CryptoProfitCalculator = dynamic(() => import('@/pages/calculators/financial/CryptoProfitCalculator'));
const FreelancerTaxCalculator = dynamic(() => import('@/pages/calculators/financial/FreelancerTaxCalculator'));
const SipCalculator = dynamic(() => import('@/pages/calculators/financial/SipCalculator'));
const AutoLoanCalculator = dynamic(() => import('@/pages/calculators/financial/AutoLoanCalculator'));
const VatCalculator = dynamic(() => import('@/pages/calculators/financial/VatCalculator'));

// Math Calculators
const PercentageCalculator = dynamic(() => import('@/pages/calculators/math/PercentageCalculator'));
const FractionCalculator = dynamic(() => import('@/pages/calculators/math/FractionCalculator'));
const TriangleCalculator = dynamic(() => import('@/pages/calculators/math/TriangleCalculator'));
const StatisticsCalculator = dynamic(() => import('@/pages/calculators/math/StatisticsCalculator'));
const ExponentCalculator = dynamic(() => import('@/pages/calculators/math/ExponentCalculator'));
const ScientificCalculator = dynamic(() => import('@/pages/calculators/math/ScientificCalculator'));

// Lifestyle & Other Calculators
const DateCalculator = dynamic(() => import('@/pages/calculators/lifestyle/DateCalculator'));
const TipCalculator = dynamic(() => import('@/pages/calculators/lifestyle/TipCalculator'));
const AgeCalculator = dynamic(() => import('@/pages/calculators/other/AgeCalculator'));
const GPACalculator = dynamic(() => import('@/pages/calculators/other/GPACalculator'));
const ConcreteCalculator = dynamic(() => import('@/pages/calculators/other/ConcreteCalculator'));
const SleepCalculator = dynamic(() => import('@/pages/calculators/other/SleepCalculator'));
const FuelCostCalculator = dynamic(() => import('@/pages/calculators/other/FuelCostCalculator'));
const TimeZoneConverter = dynamic(() => import('@/pages/calculators/other/TimeZoneConverter'));
const DiscountCalculator = dynamic(() => import('@/pages/calculators/other/DiscountCalculator'));
const UnitConverter = dynamic(() => import('@/pages/calculators/other/UnitConverter'));

export const healthCalculators = {
  'bmi-calculator': {
    title: 'Free BMI Calculator: Check Body Mass Index Online 2026',
    description: 'Calculate your Body Mass Index (BMI) instantly. Understand your weight category with our free, easy-to-use BMI checker for men and women.',
    canonicalUrl: 'https://calczoon.com/health/bmi-calculator',
    component: BMICalculator,
  },
  'tdee-calculator': {
    title: 'Free TDEE Calculator: Calculate Total Daily Energy Expenditure',
    description: 'Calculate your Total Daily Energy Expenditure (TDEE) and BMR. Learn your maintenance calories to lose weight, gain muscle, or maintain.',
    canonicalUrl: 'https://calczoon.com/health/tdee-calculator',
    component: TDEECalculator,
  },
  'macro-calculator': {
    title: 'Free Macro Calculator: Plan Daily Protein, Carbs & Fats',
    description: 'Calculate your optimal macronutrient breakdown for cutting, bulking, or maintaining weight based on your body and fitness goals.',
    canonicalUrl: 'https://calczoon.com/health/macro-calculator',
    component: MacroCalculator,
  },
  'calories-burned-calculator': {
    title: 'Calories Burned Calculator: Exercise & Activity Calorie Tracker',
    description: 'Estimate calories burned across running, cycling, swimming, walking, and gym workouts based on your weight and duration.',
    canonicalUrl: 'https://calczoon.com/health/calories-burned-calculator',
    component: CaloriesBurnedCalculator,
  },
  'weight-loss-calculator': {
    title: 'Weight Loss Calculator: Target Date & Daily Calorie Deficit',
    description: 'Plan your weight loss timeline with realistic calorie deficit projections and milestone tracking to reach your goal safely.',
    canonicalUrl: 'https://calczoon.com/health/weight-loss-calculator',
    component: WeightLossCalculator,
  },
  'pregnancy-due-date-calculator': {
    title: 'Pregnancy Due Date Calculator: Estimate Conception & Delivery',
    description: 'Calculate your estimated due date, current pregnancy week, and developmental trimester milestones using Naegele’s rule.',
    canonicalUrl: 'https://calczoon.com/health/pregnancy-due-date-calculator',
    component: PregnancyDueDateCalculator,
  },
  'water-intake-calculator': {
    title: 'Daily Water Intake Calculator: Hydration Requirement Tool',
    description: 'Calculate your optimal daily water intake based on body weight, daily activity level, and climate conditions.',
    canonicalUrl: 'https://calczoon.com/health/water-intake-calculator',
    component: WaterIntakeCalculator,
  },
  'body-fat-calculator': {
    title: 'Free Body Fat Calculator: U.S. Navy Circumference Method',
    description: 'Estimate your body fat percentage and lean body mass accurately using waist, neck, hip, and height measurements.',
    canonicalUrl: 'https://calczoon.com/health/body-fat-calculator',
    component: BodyFatCalculator,
  },
  'ideal-weight-calculator': {
    title: 'Ideal Weight Calculator: Devine, Robinson & Miller Formulas',
    description: 'Find your healthy body weight range based on gender, height, and established clinical formulas.',
    canonicalUrl: 'https://calczoon.com/health/ideal-weight-calculator',
    component: IdealWeightCalculator,
  },
};

export const financialCalculators = {
  'mortgage-calculator': {
    title: 'Free Mortgage Calculator: Monthly Principal & Interest Estimates',
    description: 'Calculate your monthly mortgage payments, total interest, property taxes, home insurance, and complete amortization schedule.',
    canonicalUrl: 'https://calczoon.com/financial/mortgage-calculator',
    component: MortgageCalculator,
  },
  'currency-converter': {
    title: 'Live Currency Converter: Real-Time Global Exchange Rates',
    description: 'Convert USD, EUR, GBP, CAD, INR, PKR and 150+ world currencies instantly with up-to-date foreign exchange rates.',
    canonicalUrl: 'https://calczoon.com/financial/currency-converter',
    component: CurrencyConverter,
  },
  'simple-interest-calculator': {
    title: 'Simple Interest Calculator: Calculate Interest on Principal',
    description: 'Calculate simple interest, maturity value, and annual yield on personal loans or short-term deposit accounts.',
    canonicalUrl: 'https://calczoon.com/financial/simple-interest-calculator',
    component: SimpleInterestCalculator,
  },
  'loan-calculator': {
    title: 'Free Loan Calculator: EMI, Interest & Amortization Schedule',
    description: 'Calculate monthly loan EMI payments, total borrowing costs, and payoff schedules for personal, student, and business loans.',
    canonicalUrl: 'https://calczoon.com/financial/loan-calculator',
    component: LoanCalculator,
  },
  'savings-calculator': {
    title: 'Savings Goal Calculator: Plan Monthly Deposits & Interest Growth',
    description: 'Calculate how much you need to save each month with compound interest to achieve your financial milestones.',
    canonicalUrl: 'https://calczoon.com/financial/savings-calculator',
    component: SavingsCalculator,
  },
  'mortgage-payoff-calculator': {
    title: 'Mortgage Payoff Calculator: Save Interest with Extra Payments',
    description: 'See how making extra monthly or lump-sum principal payments can shorten your home loan by years and save thousands.',
    canonicalUrl: 'https://calczoon.com/financial/mortgage-payoff-calculator',
    component: MortgagePayoffCalculator,
  },
  'debt-to-income-ratio-calculator': {
    title: 'Debt-to-Income (DTI) Ratio Calculator: Check Loan Eligibility',
    description: 'Calculate your front-end and back-end DTI ratios to evaluate your financial health and qualify for mortgage loans.',
    canonicalUrl: 'https://calczoon.com/financial/debt-to-income-ratio-calculator',
    component: DebtToIncomeRatioCalculator,
  },
  'compound-interest-calculator': {
    title: 'Compound Interest Calculator: Daily, Monthly & Annual Growth',
    description: 'Calculate how regular investments and compound interest multiply your wealth over 5, 10, 20, or 30 years.',
    canonicalUrl: 'https://calczoon.com/financial/compound-interest-calculator',
    component: CompoundInterestCalculator,
  },
  'investment-roi-calculator': {
    title: 'Investment ROI Calculator: Calculate Return on Investment',
    description: 'Calculate total ROI, annualized percentage return, and net capital gains on stocks, real estate, and business ventures.',
    canonicalUrl: 'https://calczoon.com/financial/investment-roi-calculator',
    component: InvestmentRoiCalculator,
  },
  'retirement-calculator': {
    title: 'Retirement Savings Calculator: Project Nest Egg & Monthly Income',
    description: 'Determine if you are on track for retirement. Project your future nest egg, inflation impact, and sustainable withdrawal rates.',
    canonicalUrl: 'https://calczoon.com/financial/retirement-calculator',
    component: RetirementCalculator,
  },
  'salary-calculator': {
    title: 'Salary Calculator: Convert Hourly, Weekly, Monthly & Annual Pay',
    description: 'Convert your wage between hourly pay, bi-weekly checks, monthly salary, and annual gross earnings with overtime calculation.',
    canonicalUrl: 'https://calczoon.com/financial/salary-calculator',
    component: SalaryCalculator,
  },
  'crypto-profit-calculator': {
    title: 'Crypto Profit Calculator: Trading Gain, Loss & ROI Tracker',
    description: 'Calculate your realized profits, percentage returns, and trading fees for Bitcoin, Ethereum, and crypto transactions.',
    canonicalUrl: 'https://calczoon.com/financial/crypto-profit-calculator',
    component: CryptoProfitCalculator,
  },
  'freelancer-tax-calculator': {
    title: 'Freelancer Tax Calculator: Self-Employment Tax Estimator',
    description: 'Estimate your quarterly and annual self-employment taxes, Social Security, Medicare, and net income deductions.',
    canonicalUrl: 'https://calczoon.com/financial/freelancer-tax-calculator',
    component: FreelancerTaxCalculator,
  },
  'sip-calculator': {
    title: 'SIP Calculator: Systematic Investment Plan Return Estimator',
    description: 'Calculate expected returns and maturity value for monthly mutual fund SIP contributions with compounding interest.',
    canonicalUrl: 'https://calczoon.com/financial/sip-calculator',
    component: SipCalculator,
  },
  'auto-loan-calculator': {
    title: 'Auto Loan Calculator: Car Payment, Interest & Trade-In Value',
    description: 'Calculate monthly car loan payments, sales tax, loan term options, and total financing costs for new or used vehicles.',
    canonicalUrl: 'https://calczoon.com/financial/auto-loan-calculator',
    component: AutoLoanCalculator,
  },
  'vat-calculator': {
    title: 'VAT & Sales Tax Calculator: Add or Exclude Value Added Tax',
    description: 'Calculate gross price, net price, and VAT amount across UK 20%, EU rates, and international standard percentages.',
    canonicalUrl: 'https://calczoon.com/financial/vat-calculator',
    component: VatCalculator,
  },
};

export const mathCalculators = {
  'percentage-calculator': {
    title: 'Free Percentage Calculator: Calculate Discounts, Increase & Ratio',
    description: 'Solve any percentage problem instantly: find what percent X is of Y, percentage increase or decrease, and sales discounts.',
    canonicalUrl: 'https://calczoon.com/math/percentage-calculator',
    component: PercentageCalculator,
  },
  'fraction-calculator': {
    title: 'Fraction Calculator: Add, Subtract, Multiply & Divide Fractions',
    description: 'Solve fractions with step-by-step arithmetic, mixed numbers, simplify common denominators, and decimal conversion.',
    canonicalUrl: 'https://calczoon.com/math/fraction-calculator',
    component: FractionCalculator,
  },
  'triangle-calculator': {
    title: 'Triangle Calculator: Calculate Sides, Angles, Area & Perimeter',
    description: 'Solve triangles using Heron’s formula, SSS, SAS, ASA, Pythagorean theorem, and right-triangle trigonometry with step-by-step proofs.',
    canonicalUrl: 'https://calczoon.com/math/triangle-calculator',
    component: TriangleCalculator,
  },
  'statistics-calculator': {
    title: 'Statistics Calculator: Mean, Median, Mode, Variance & Std Dev',
    description: 'Analyze sample and population data sets instantly. Calculate standard deviation, variance, range, and quartiles.',
    canonicalUrl: 'https://calczoon.com/math/statistics-calculator',
    component: StatisticsCalculator,
  },
  'exponent-calculator': {
    title: 'Exponent Calculator: Solve Powers, Bases & Scientific Notation',
    description: 'Quickly evaluate expressions with positive, negative, and fractional exponents with step-by-step mathematical expansions.',
    canonicalUrl: 'https://calczoon.com/math/exponent-calculator',
    component: ExponentCalculator,
  },
  'scientific-calculator': {
    title: 'Online Scientific Calculator: Advanced Math, Trig & Logarithms',
    description: 'Comprehensive web scientific calculator with sine, cosine, tangent, square roots, factorials, logarithms, and constants.',
    canonicalUrl: 'https://calczoon.com/math/scientific-calculator',
    component: ScientificCalculator,
  },
};

export const lifestyleCalculators = {
  'date-calculator': {
    title: 'Date Calculator: Days Between Dates & Add/Subtract Days',
    description: 'Calculate exact calendar duration between two dates in years, months, and days, or add/subtract business days.',
    canonicalUrl: 'https://calczoon.com/lifestyle/date-calculator',
    component: DateCalculator,
  },
  'tip-calculator': {
    title: 'Free Tip Calculator: Bill Splitting & Tip Percentage',
    description: 'Easily calculate tip amounts and split restaurant or service bills equally among friends with custom percentages.',
    canonicalUrl: 'https://calczoon.com/lifestyle/tip-calculator',
    component: TipCalculator,
  },
  'age-calculator': {
    title: 'Age Calculator: Calculate Exact Age in Years, Months & Days',
    description: 'Find your precise age down to the day, hours, and minutes from your date of birth, with upcoming birthday countdown.',
    canonicalUrl: 'https://calczoon.com/lifestyle/age-calculator',
    component: AgeCalculator,
  },
  'gpa-calculator': {
    title: 'GPA Calculator: Calculate High School & College GPA',
    description: 'Calculate unweighted and weighted grade point averages across letter grades, percentage scores, and credit hours.',
    canonicalUrl: 'https://calczoon.com/lifestyle/gpa-calculator',
    component: GPACalculator,
  },
  'concrete-calculator': {
    title: 'Concrete Calculator: Estimate Yards & Bags for Slabs and Footings',
    description: 'Calculate volume in cubic feet and cubic yards, and bags of pre-mix concrete needed for patios, driveways, and post holes.',
    canonicalUrl: 'https://calczoon.com/lifestyle/concrete-calculator',
    component: ConcreteCalculator,
  },
  'sleep-calculator': {
    title: 'Sleep Calculator: Calculate 90-Minute Sleep Cycles & Bedtime',
    description: 'Find the optimal time to go to bed or wake up feeling refreshed based on natural 90-minute REM sleep cycles.',
    canonicalUrl: 'https://calczoon.com/lifestyle/sleep-calculator',
    component: SleepCalculator,
  },
  'fuel-cost-calculator': {
    title: 'Fuel Cost Calculator: Road Trip Gas Price & Mileage Estimator',
    description: 'Calculate total gas expenses and cost per person for road trips based on travel distance, vehicle MPG, and fuel prices.',
    canonicalUrl: 'https://calczoon.com/lifestyle/fuel-cost-calculator',
    component: FuelCostCalculator,
  },
  'time-zone-converter': {
    title: 'Time Zone Converter: Convert World Clock & Global Meetings',
    description: 'Convert times across UTC, EST, PST, GMT, CET, IST, and international time zones for scheduling virtual meetings.',
    canonicalUrl: 'https://calczoon.com/lifestyle/time-zone-converter',
    component: TimeZoneConverter,
  },
  'discount-calculator': {
    title: 'Discount Calculator: Calculate Percentage Off & Sale Savings',
    description: 'Find final discounted price and total dollar savings with single or double stacked sales promotions and local taxes.',
    canonicalUrl: 'https://calczoon.com/lifestyle/discount-calculator',
    component: DiscountCalculator,
  },
  'unit-converter': {
    title: 'Unit Converter: Convert Length, Weight, Temperature & Volume',
    description: 'Fast, accurate conversions between metric and imperial systems: meters, feet, kilograms, pounds, Celsius, and Fahrenheit.',
    canonicalUrl: 'https://calczoon.com/lifestyle/unit-converter',
    component: UnitConverter,
  },
};

// All calculators combined for top-level direct URLs (e.g. /bmi-calculator)
export const allCalculators = {
  ...healthCalculators,
  ...financialCalculators,
  ...mathCalculators,
  ...lifestyleCalculators,
};

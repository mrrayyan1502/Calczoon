// 1. Health & Fitness Calculators (6)
import BMICalculator from '@/views/calculators/health/BMICalculator';
import TDEECalculator from '@/views/calculators/health/TDEECalculator';
import MacroCalculator from '@/views/calculators/health/MacroCalculator';
import BodyFatCalculator from '@/views/calculators/health/BodyFatCalculator';
import CaloriesBurnedCalculator from '@/views/calculators/health/CaloriesBurnedCalculator';
import WaterIntakeCalculator from '@/views/calculators/health/WaterIntakeCalculator';

// 2. Financial Calculators (7)
import MortgageCalculator from '@/views/calculators/financial/MortgageCalculator';
import LoanCalculator from '@/views/calculators/financial/LoanCalculator';
import CompoundInterestCalculator from '@/views/calculators/financial/CompoundInterestCalculator';
import CurrencyConverter from '@/views/calculators/financial/CurrencyConverter';
import SavingsCalculator from '@/views/calculators/financial/SavingsCalculator';
import RetirementCalculator from '@/views/calculators/financial/RetirementCalculator';
import SipCalculator from '@/views/calculators/financial/SipCalculator';

// 3. Math & Science Calculators (5)
import PercentageCalculator from '@/views/calculators/math/PercentageCalculator';
import FractionCalculator from '@/views/calculators/math/FractionCalculator';
import ScientificCalculator from '@/views/calculators/math/ScientificCalculator';
import TriangleCalculator from '@/views/calculators/math/TriangleCalculator';
import StatisticsCalculator from '@/views/calculators/math/StatisticsCalculator';

// 4. Lifestyle & Everyday Calculators (6)
import AgeCalculator from '@/views/calculators/other/AgeCalculator';
import DiscountCalculator from '@/views/calculators/other/DiscountCalculator';
import TipCalculator from '@/views/calculators/lifestyle/TipCalculator';
import DateCalculator from '@/views/calculators/lifestyle/DateCalculator';
import UnitConverter from '@/views/calculators/other/UnitConverter';
import FuelCostCalculator from '@/views/calculators/other/FuelCostCalculator';

export const healthCalculators = {
  'bmi-calculator': {
    title: 'Free BMI Calculator: Check Body Mass Index Online 2026',
    description: 'Calculate your Body Mass Index (BMI) instantly. Understand your weight category with our free, easy-to-use BMI checker for men and women.',
    canonicalUrl: 'https://calczoon.com/health/bmi-calculator',
    category: 'Health & Fitness',
    component: BMICalculator,
  },
  'tdee-calculator': {
    title: 'Free TDEE Calculator: Calculate Total Daily Energy Expenditure',
    description: 'Calculate your Total Daily Energy Expenditure (TDEE) and BMR. Learn your maintenance calories to lose weight, gain muscle, or maintain.',
    canonicalUrl: 'https://calczoon.com/health/tdee-calculator',
    category: 'Health & Fitness',
    component: TDEECalculator,
  },
  'macro-calculator': {
    title: 'Free Macro Calculator: Plan Daily Protein, Carbs & Fats',
    description: 'Calculate your optimal macronutrient breakdown for cutting, bulking, or maintaining weight based on your body and fitness goals.',
    canonicalUrl: 'https://calczoon.com/health/macro-calculator',
    category: 'Health & Fitness',
    component: MacroCalculator,
  },
  'body-fat-calculator': {
    title: 'Free Body Fat Calculator: U.S. Navy Circumference Method',
    description: 'Estimate your body fat percentage and lean body mass accurately using waist, neck, hip, and height measurements.',
    canonicalUrl: 'https://calczoon.com/health/body-fat-calculator',
    category: 'Health & Fitness',
    component: BodyFatCalculator,
  },
  'calories-burned-calculator': {
    title: 'Calories Burned Calculator: Exercise & Activity Calorie Tracker',
    description: 'Estimate calories burned across running, cycling, swimming, walking, and gym workouts based on your weight and duration.',
    canonicalUrl: 'https://calczoon.com/health/calories-burned-calculator',
    category: 'Health & Fitness',
    component: CaloriesBurnedCalculator,
  },
  'water-intake-calculator': {
    title: 'Daily Water Intake Calculator: Hydration Requirement Tool',
    description: 'Calculate your optimal daily water intake based on body weight, daily activity level, and climate conditions.',
    canonicalUrl: 'https://calczoon.com/health/water-intake-calculator',
    category: 'Health & Fitness',
    component: WaterIntakeCalculator,
  },
};

export const financialCalculators = {
  'mortgage-calculator': {
    title: 'Free Mortgage Calculator: Monthly Principal & Interest Estimates',
    description: 'Calculate your monthly mortgage payments, total interest, property taxes, home insurance, and complete amortization schedule.',
    canonicalUrl: 'https://calczoon.com/financial/mortgage-calculator',
    category: 'Financial',
    component: MortgageCalculator,
  },
  'loan-calculator': {
    title: 'Free Loan Calculator: EMI, Interest & Amortization Schedule',
    description: 'Calculate monthly loan EMI payments, total borrowing costs, and payoff schedules for personal, student, and business loans.',
    canonicalUrl: 'https://calczoon.com/financial/loan-calculator',
    category: 'Financial',
    component: LoanCalculator,
  },
  'compound-interest-calculator': {
    title: 'Compound Interest Calculator: Daily, Monthly & Annual Growth',
    description: 'Calculate how regular investments and compound interest multiply your wealth over 5, 10, 20, or 30 years.',
    canonicalUrl: 'https://calczoon.com/financial/compound-interest-calculator',
    category: 'Financial',
    component: CompoundInterestCalculator,
  },
  'currency-converter': {
    title: 'Live Currency Converter: Real-Time Global Exchange Rates',
    description: 'Convert USD, EUR, GBP, CAD, INR, PKR and 150+ world currencies instantly with up-to-date foreign exchange rates.',
    canonicalUrl: 'https://calczoon.com/financial/currency-converter',
    category: 'Financial',
    component: CurrencyConverter,
  },
  'savings-calculator': {
    title: 'Savings Goal Calculator: Plan Monthly Deposits & Interest Growth',
    description: 'Calculate how much you need to save each month with compound interest to achieve your financial milestones.',
    canonicalUrl: 'https://calczoon.com/financial/savings-calculator',
    category: 'Financial',
    component: SavingsCalculator,
  },
  'retirement-calculator': {
    title: 'Retirement Savings Calculator: Project Nest Egg & Monthly Income',
    description: 'Determine if you are on track for retirement. Project your future nest egg, inflation impact, and sustainable withdrawal rates.',
    canonicalUrl: 'https://calczoon.com/financial/retirement-calculator',
    category: 'Financial',
    component: RetirementCalculator,
  },
  'sip-calculator': {
    title: 'SIP Calculator: Systematic Investment Plan Return Estimator',
    description: 'Calculate expected returns and maturity value for monthly mutual fund SIP contributions with compounding interest.',
    canonicalUrl: 'https://calczoon.com/financial/sip-calculator',
    category: 'Financial',
    component: SipCalculator,
  },
};

export const mathCalculators = {
  'percentage-calculator': {
    title: 'Free Percentage Calculator: Calculate Discounts, Increase & Ratio',
    description: 'Solve any percentage problem instantly: find what percent X is of Y, percentage increase or decrease, and sales discounts.',
    canonicalUrl: 'https://calczoon.com/math/percentage-calculator',
    category: 'Math & Science',
    component: PercentageCalculator,
  },
  'fraction-calculator': {
    title: 'Fraction Calculator: Add, Subtract, Multiply & Divide Fractions',
    description: 'Solve fractions with step-by-step arithmetic, mixed numbers, simplify common denominators, and decimal conversion.',
    canonicalUrl: 'https://calczoon.com/math/fraction-calculator',
    category: 'Math & Science',
    component: FractionCalculator,
  },
  'scientific-calculator': {
    title: 'Online Scientific Calculator: Advanced Math, Trig & Logarithms',
    description: 'Comprehensive web scientific calculator with sine, cosine, tangent, square roots, factorials, logarithms, and constants.',
    canonicalUrl: 'https://calczoon.com/math/scientific-calculator',
    category: 'Math & Science',
    component: ScientificCalculator,
  },
  'triangle-calculator': {
    title: 'Triangle Calculator: Calculate Sides, Angles, Area & Perimeter',
    description: 'Solve triangles using Heron’s formula, SSS, SAS, ASA, Pythagorean theorem, and right-triangle trigonometry with step-by-step proofs.',
    canonicalUrl: 'https://calczoon.com/math/triangle-calculator',
    category: 'Math & Science',
    component: TriangleCalculator,
  },
  'statistics-calculator': {
    title: 'Statistics Calculator: Mean, Median, Mode, Variance & Std Dev',
    description: 'Analyze sample and population data sets instantly. Calculate standard deviation, variance, range, and quartiles.',
    canonicalUrl: 'https://calczoon.com/math/statistics-calculator',
    category: 'Math & Science',
    component: StatisticsCalculator,
  },
};

export const lifestyleCalculators = {
  'age-calculator': {
    title: 'Age Calculator: Calculate Exact Age in Years, Months & Days',
    description: 'Find your precise age down to the day, hours, and minutes from your date of birth, with upcoming birthday countdown.',
    canonicalUrl: 'https://calczoon.com/lifestyle/age-calculator',
    category: 'Lifestyle & Everyday',
    component: AgeCalculator,
  },
  'discount-calculator': {
    title: 'Discount Calculator: Calculate Percentage Off & Sale Savings',
    description: 'Find final discounted price and total dollar savings with single or double stacked sales promotions and local taxes.',
    canonicalUrl: 'https://calczoon.com/lifestyle/discount-calculator',
    category: 'Lifestyle & Everyday',
    component: DiscountCalculator,
  },
  'tip-calculator': {
    title: 'Free Tip Calculator: Bill Splitting & Tip Percentage',
    description: 'Easily calculate tip amounts and split restaurant or service bills equally among friends with custom percentages.',
    canonicalUrl: 'https://calczoon.com/lifestyle/tip-calculator',
    category: 'Lifestyle & Everyday',
    component: TipCalculator,
  },
  'date-calculator': {
    title: 'Date Calculator: Days Between Dates & Add/Subtract Days',
    description: 'Calculate exact calendar duration between two dates in years, months, and days, or add/subtract business days.',
    canonicalUrl: 'https://calczoon.com/lifestyle/date-calculator',
    category: 'Lifestyle & Everyday',
    component: DateCalculator,
  },
  'unit-converter': {
    title: 'Unit Converter: Convert Length, Weight, Temperature & Volume',
    description: 'Fast, accurate conversions between metric and imperial systems: meters, feet, kilograms, pounds, Celsius, and Fahrenheit.',
    canonicalUrl: 'https://calczoon.com/lifestyle/unit-converter',
    category: 'Lifestyle & Everyday',
    component: UnitConverter,
  },
  'fuel-cost-calculator': {
    title: 'Fuel Cost Calculator: Road Trip Gas Price & Mileage Estimator',
    description: 'Calculate total gas expenses and cost per person for road trips based on travel distance, vehicle MPG, and fuel prices.',
    canonicalUrl: 'https://calczoon.com/lifestyle/fuel-cost-calculator',
    category: 'Lifestyle & Everyday',
    component: FuelCostCalculator,
  },
};

// Top 24 Curated Calculators
export const allCalculators = {
  ...financialCalculators,
  ...healthCalculators,
  ...mathCalculators,
  ...lifestyleCalculators,
};

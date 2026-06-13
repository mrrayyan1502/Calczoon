import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Toaster } from '@/components/ui/toaster';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen bg-slate-900">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// General Pages
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Contact = lazy(() => import('@/pages/Contact'));
const History = lazy(() => import('@/pages/History'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Tools = lazy(() => import('@/pages/Tools'));
const Blog = lazy(() => import('@/pages/Blog'));
const Sitemap = lazy(() => import('@/pages/Sitemap'));
const Partners = lazy(() => import('@/pages/Partners'));
const TermsAndConditions = lazy(() => import('@/pages/TermsAndConditions'));
const Disclaimer = lazy(() => import('@/pages/Disclaimer'));
const ScientificReferences = lazy(() => import('@/pages/ScientificReferences'));

// Blog Posts
const SipCalculatorGuide = lazy(() => import('@/pages/blog/SipCalculatorGuide'));
const BmiCalculatorGuide = lazy(() => import('@/pages/blog/BmiCalculatorGuide'));
const MacroCalculatorBlog = lazy(() => import('@/pages/blog/MacroCalculatorBlog'));
const FinancialWellnessGuide = lazy(() => import('@/pages/blog/FinancialWellnessGuide'));
const TdeeBlog = lazy(() => import('@/pages/blog/TdeeBlog'));
const FinancialBlog = lazy(() => import('@/pages/blog/FinancialBlog'));
const BmiBlog = lazy(() => import('@/pages/blog/BmiBlog'));
const LoanBlog = lazy(() => import('@/pages/blog/LoanBlog'));
const CompoundInterestBlog = lazy(() => import('@/pages/blog/CompoundInterestBlog'));
const MathBlog = lazy(() => import('@/pages/blog/MathBlog'));
const BodyFatBlog = lazy(() => import('@/pages/blog/BodyFatBlog'));
const MortgageBlog = lazy(() => import('@/pages/blog/MortgageBlog'));
const TriangleBlog = lazy(() => import('@/pages/blog/TriangleBlog'));
const PercentageBlog = lazy(() => import('@/pages/blog/PercentageBlog'));
const FractionBlog = lazy(() => import('@/pages/blog/FractionBlog'));
const StatisticsBlog = lazy(() => import('@/pages/blog/StatisticsBlog'));
const SavingsBlog = lazy(() => import('@/pages/blog/SavingsBlog'));
const RoiBlog = lazy(() => import('@/pages/blog/RoiBlog'));
const CaloriesBurnedBlog = lazy(() => import('@/pages/blog/CaloriesBurnedBlog'));
const SleepBlog = lazy(() => import('@/pages/blog/SleepBlog'));
const AgeBlog = lazy(() => import('@/pages/blog/AgeBlog'));
const GpaBlog = lazy(() => import('@/pages/blog/GpaBlog'));
const ConcreteBlog = lazy(() => import('@/pages/blog/ConcreteBlog'));
const FuelCostBlog = lazy(() => import('@/pages/blog/FuelCostBlog'));


// Calculator Category Pages
const FinancialCalculators = lazy(() => import('@/pages/calculators/FinancialCalculators'));
const HealthCalculators = lazy(() => import('@/pages/calculators/HealthCalculators'));
const MathCalculators = lazy(() => import('@/pages/calculators/MathCalculators'));
const LifestyleCalculators = lazy(() => import('@/pages/calculators/LifestyleCalculators'));

// Individual Calculator Pages
const TDEECalculator = lazy(() => import('@/pages/calculators/health/TDEECalculator'));
const BodyFatCalculator = lazy(() => import('@/pages/calculators/health/BodyFatCalculator'));

// Lazy loading other calculators
const SimpleInterestCalculator = lazy(() => import('@/pages/calculators/financial/SimpleInterestCalculator'));
const LoanCalculator = lazy(() => import('@/pages/calculators/financial/LoanCalculator'));
const SavingsCalculator = lazy(() => import('@/pages/calculators/financial/SavingsCalculator'));
const MortgagePayoffCalculator = lazy(() => import('@/pages/calculators/financial/MortgagePayoffCalculator'));
const DebtToIncomeRatioCalculator = lazy(() => import('@/pages/calculators/financial/DebtToIncomeRatioCalculator'));
const CompoundInterestCalculator = lazy(() => import('@/pages/calculators/financial/CompoundInterestCalculator'));
const InvestmentRoiCalculator = lazy(() => import('@/pages/calculators/financial/InvestmentRoiCalculator'));
const RetirementCalculator = lazy(() => import('@/pages/calculators/financial/RetirementCalculator'));
const SalaryCalculator = lazy(() => import('@/pages/calculators/financial/SalaryCalculator'));
const CryptoProfitCalculator = lazy(() => import('@/pages/calculators/financial/CryptoProfitCalculator'));
const FreelancerTaxCalculator = lazy(() => import('@/pages/calculators/financial/FreelancerTaxCalculator'));
const BMICalculator = lazy(() => import('@/pages/calculators/health/BMICalculator'));
const MacroCalculator = lazy(() => import('@/pages/calculators/health/MacroCalculator'));
const PregnancyDueDateCalculator = lazy(() => import('@/pages/calculators/health/PregnancyDueDateCalculator'));
const CaloriesBurnedCalculator = lazy(() => import('@/pages/calculators/health/CaloriesBurnedCalculator'));
const WaterIntakeCalculator = lazy(() => import('@/pages/calculators/health/WaterIntakeCalculator'));
const WeightLossCalculator = lazy(() => import('@/pages/calculators/health/WeightLossCalculator'));
const PercentageCalculator = lazy(() => import('@/pages/calculators/math/PercentageCalculator'));
const FractionCalculator = lazy(() => import('@/pages/calculators/math/FractionCalculator'));
const TriangleCalculator = lazy(() => import('@/pages/calculators/math/TriangleCalculator'));
const StatisticsCalculator = lazy(() => import('@/pages/calculators/math/StatisticsCalculator'));
const ExponentCalculator = lazy(() => import('@/pages/calculators/math/ExponentCalculator'));
const AgeCalculator = lazy(() => import('@/pages/calculators/other/AgeCalculator'));
const GPACalculator = lazy(() => import('@/pages/calculators/other/GPACalculator'));
const ConcreteCalculator = lazy(() => import('@/pages/calculators/other/ConcreteCalculator'));
const SleepCalculator = lazy(() => import('@/pages/calculators/other/SleepCalculator'));
const FuelCostCalculator = lazy(() => import('@/pages/calculators/other/FuelCostCalculator'));
const SipCalculator = lazy(() => import('@/pages/calculators/financial/SipCalculator'));
const ScientificCalculator = lazy(() => import('@/pages/calculators/math/ScientificCalculator'));
const TimeZoneConverter = lazy(() => import('@/pages/calculators/other/TimeZoneConverter'));
const DiscountCalculator = lazy(() => import('@/pages/calculators/other/DiscountCalculator'));
const UnitConverter = lazy(() => import('@/pages/calculators/other/UnitConverter'));
const MortgageCalculator = lazy(() => import('@/pages/calculators/financial/MortgageCalculator'));
const CurrencyConverter = lazy(() => import('@/pages/calculators/financial/CurrencyConverter'));
const DateCalculator = lazy(() => import('@/pages/calculators/lifestyle/DateCalculator'));
const TipCalculator = lazy(() => import('@/pages/calculators/lifestyle/TipCalculator'));
const IdealWeightCalculator = lazy(() => import('@/pages/calculators/health/IdealWeightCalculator'));
const Calculators = lazy(() => import('@/pages/Calculators'));


function App() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="contact" element={<Contact />} />
            <Route path="history" element={<History />} />
            <Route path="tools" element={<Tools />} />
            <Route path="blog" element={<Blog />} />
            <Route path="sitemap" element={<Sitemap />} />
            <Route path="partners" element={<Partners />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            <Route path="scientific-references" element={<ScientificReferences />} />
            <Route path="calculators" element={<Calculators />} />


            {/* Blog posts */}
            <Route path="blog/macro-calculator-guide" element={<MacroCalculatorBlog />} />
            <Route path="blog/sip-calculator-guide" element={<SipCalculatorGuide />} />
            <Route path="blog/understanding-bmi" element={<BmiCalculatorGuide />} />
            <Route path="blog/financial-wellness-guide" element={<FinancialWellnessGuide />} />
            <Route path="blog/tdee-calculator-guide" element={<TdeeBlog />} />
            <Route path="blog/top-financial-calculators-for-financial-planning" element={<FinancialBlog />} />
            <Route path="blog/simplifying-complex-math" element={<MathBlog />} />
            <Route path="blog/bmi-calculator-guide" element={<BmiBlog />} />
            <Route path="blog/loan-calculator-guide" element={<LoanBlog />} />
            <Route path="blog/compound-interest-guide" element={<CompoundInterestBlog />} />
            <Route path="blog/body-fat-percentage-guide" element={<BodyFatBlog />} />
            <Route path="blog/mortgage-payoff-guide" element={<MortgageBlog />} />
            <Route path="blog/triangle-area-guide" element={<TriangleBlog />} />
            <Route path="blog/percentage-calculator-guide" element={<PercentageBlog />} />
            <Route path="blog/fraction-calculator-guide" element={<FractionBlog />} />
            <Route path="blog/statistics-calculator-guide" element={<StatisticsBlog />} />
            <Route path="blog/savings-goal-guide" element={<SavingsBlog />} />
            <Route path="blog/investment-roi-guide" element={<RoiBlog />} />
            <Route path="blog/calories-burned-guide" element={<CaloriesBurnedBlog />} />
            <Route path="blog/sleep-cycle-guide" element={<SleepBlog />} />
            <Route path="blog/age-calculator-guide" element={<AgeBlog />} />
            <Route path="blog/gpa-calculator-guide" element={<GpaBlog />} />
            <Route path="blog/concrete-calculator-guide" element={<ConcreteBlog />} />
            <Route path="blog/fuel-cost-guide" element={<FuelCostBlog />} />
            
            {/* Old Blog routes for SEO */}
            <Route path="blog/how-to-use-macro-calculator-for-weight-loss" element={<Navigate to="/blog/macro-calculator-guide" replace />} />
            <Route path="blog/how-to-use-tdee-calculator" element={<Navigate to="/blog/tdee-calculator-guide" replace />} />
            <Route path="blog/what-is-bmi" element={<Navigate to="/blog/bmi-calculator-guide" replace />} />
            <Route path="blog/how-loan-calculator-saves-money" element={<Navigate to="/blog/loan-calculator-guide" replace />} />
            <Route path="blog/how-to-calculate-compound-interest" element={<Navigate to="/blog/compound-interest-guide" replace />} />
            <Route path="blog/what-is-body-fat-percentage" element={<Navigate to="/blog/body-fat-percentage-guide" replace />} />
            <Route path="blog/how-to-save-on-mortgage" element={<Navigate to="/blog/mortgage-payoff-guide" replace />} />


            {/* Calculator category pages */}
            <Route path="financial-calculators" element={<FinancialCalculators />} />
            <Route path="health-fitness-calculators" element={<HealthCalculators />} />
            <Route path="math-science-calculators" element={<MathCalculators />} />
            <Route path="lifestyle-everyday-calculators" element={<LifestyleCalculators />} />

            {/* Individual Calculator Pages */}
            {/* Health */}
            <Route path="health/tdee-calculator" element={<TDEECalculator />} />
            <Route path="health/bmi-calculator" element={<BMICalculator />} />
            <Route path="health/macro-calculator" element={<MacroCalculator />} />
            <Route path="health/calories-burned-calculator" element={<CaloriesBurnedCalculator />} />
            <Route path="health/weight-loss-calculator" element={<WeightLossCalculator />} />
            <Route path="health/pregnancy-due-date-calculator" element={<PregnancyDueDateCalculator />} />
            <Route path="health/water-intake-calculator" element={<WaterIntakeCalculator />} />
            <Route path="health/body-fat-calculator" element={<BodyFatCalculator />} />
            <Route path="health/ideal-weight-calculator" element={<IdealWeightCalculator />} />

            {/* Financial */}
            <Route path="financial/mortgage-calculator" element={<MortgageCalculator />} />
            <Route path="financial/currency-converter" element={<CurrencyConverter />} />
            <Route path="financial/simple-interest-calculator" element={<SimpleInterestCalculator />} />
            <Route path="financial/loan-calculator" element={<LoanCalculator />} />
            <Route path="financial/savings-calculator" element={<SavingsCalculator />} />
            <Route path="financial/mortgage-payoff-calculator" element={<MortgagePayoffCalculator />} />
            <Route path="financial/debt-to-income-ratio-calculator" element={<DebtToIncomeRatioCalculator />} />
            <Route path="financial/compound-interest-calculator" element={<CompoundInterestCalculator />} />
            <Route path="financial/investment-roi-calculator" element={<InvestmentRoiCalculator />} />
            <Route path="financial/retirement-calculator" element={<RetirementCalculator />} />
            <Route path="financial/salary-calculator" element={<SalaryCalculator />} />
            <Route path="financial/crypto-profit-calculator" element={<CryptoProfitCalculator />} />
            <Route path="financial/freelancer-tax-calculator" element={<FreelancerTaxCalculator />} />
            <Route path="financial/sip-calculator" element={<SipCalculator />} />

            {/* Math */}
            <Route path="math/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="math/fraction-calculator" element={<FractionCalculator />} />
            <Route path="math/triangle-calculator" element={<TriangleCalculator />} />
            <Route path="math/statistics-calculator" element={<StatisticsCalculator />} />
            <Route path="math/exponent-calculator" element={<ExponentCalculator />} />
            <Route path="math/scientific-calculator" element={<ScientificCalculator />} />
            
            {/* Lifestyle & Other */}
            <Route path="lifestyle/date-calculator" element={<DateCalculator />} />
            <Route path="lifestyle/tip-calculator" element={<TipCalculator />} />
            <Route path="lifestyle/age-calculator" element={<AgeCalculator />} />
            <Route path="lifestyle/gpa-calculator" element={<GPACalculator />} />
            <Route path="lifestyle/concrete-calculator" element={<ConcreteCalculator />} />
            <Route path="lifestyle/sleep-calculator" element={<SleepCalculator />} />
            <Route path="lifestyle/fuel-cost-calculator" element={<FuelCostCalculator />} />
            <Route path="lifestyle/time-zone-converter" element={<TimeZoneConverter />} />
            <Route path="lifestyle/discount-calculator" element={<DiscountCalculator />} />
            <Route path="lifestyle/unit-converter" element={<UnitConverter />} />

            {/* Old URL redirects & aliases */}
            <Route path="/triangle" element={<Navigate to="/math/triangle-calculator" replace />} />
            <Route path="/percentage" element={<Navigate to="/math/percentage-calculator" replace />} />
            <Route path="/fraction" element={<Navigate to="/math/fraction-calculator" replace />} />
            <Route path="/mortgage" element={<Navigate to="/financial/mortgage-payoff-calculator" replace />} />
            <Route path="/statistics" element={<Navigate to="/math/statistics-calculator" replace />} />
            <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
            <Route path="/references" element={<Navigate to="/scientific-references" replace />} />
            <Route path="/community" element={<Navigate to="/about" replace />} />
            <Route path="/testimonials" element={<Navigate to="/about" replace />} />
            <Route path="/blog/20-free-online-calculators" element={<Navigate to="/tools" replace />} />
            <Route path="/math/area-of-triangle-with-3-sides-calculator" element={<Navigate to="/math/triangle-calculator" replace />} />
            <Route path="/tools/triangle-area-calculator" element={<Navigate to="/math/triangle-calculator" replace />} />
            <Route path="/health/tdee-calculator-for-weight-loss-female" element={<Navigate to="/health/tdee-calculator" replace />} />
            <Route path="/other/*" element={<Navigate to="/lifestyle-everyday-calculators" replace />} />
            <Route path="/lifestyle/*" element={<Navigate to="/lifestyle-everyday-calculators" replace />} />
            <Route path="/body-fat" element={<Navigate to="/health/body-fat-calculator" replace />} />
            <Route path="/math/triangle-area-calculator" element={<Navigate to="/math/triangle-calculator" replace />} />
            
            {/* 404 catch-all */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
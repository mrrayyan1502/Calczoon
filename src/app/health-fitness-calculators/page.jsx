import HealthCalculators from '@/pages/calculators/HealthCalculators';

export const metadata = {
  title: 'Health and Fitness Calculators Online - CalcZoon',
  description: 'Explore online fitness and health calculators. Track your wellness journey with tools like BMI, TDEE, macro, calorie burn, and more.',
  alternates: {
    canonical: 'https://calczoon.com/health-fitness-calculators',
  },
};

export default function Page() {
  return <HealthCalculators />;
}

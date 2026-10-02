import LifestyleCalculators from '@/pages/calculators/LifestyleCalculators';

export const metadata = {
  title: 'Lifestyle & Everyday Calculators - CalcZoon',
  description: 'A collection of free online calculators for various lifestyle and everyday needs, including age, GPA, fuel cost, sleep cycle, discounts, and more.',
  alternates: {
    canonical: 'https://calczoon.com/lifestyle-everyday-calculators',
  },
};

export default function Page() {
  return <LifestyleCalculators />;
}

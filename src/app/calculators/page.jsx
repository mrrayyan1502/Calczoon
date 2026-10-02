import Calculators from '@/pages/Calculators';

export const metadata = {
  title: 'All Calculators: Free Online Tools for Every Need | CalcZoon',
  description: 'Browse our complete collection of free, fast, and accurate online calculators. Find tools for finance, health, math, and general utility.',
  alternates: {
    canonical: 'https://calczoon.com/calculators',
  },
};

export default function Page() {
  return <Calculators />;
}

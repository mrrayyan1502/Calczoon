import MathCalculators from '@/pages/calculators/MathCalculators';

export const metadata = {
  title: 'Math and Science Calculators Online - CalcZoon',
  description: 'Solve equations and complex problems with our online math and science calculators. Get accurate solutions for math, geometry, statistics, and more.',
  alternates: {
    canonical: 'https://calczoon.com/math-science-calculators',
  },
};

export default function Page() {
  return <MathCalculators />;
}

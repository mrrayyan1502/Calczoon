import FinancialCalculators from '@/pages/calculators/FinancialCalculators';

export const metadata = {
  title: 'Free Online Financial Calculators - CalcZoon',
  description: 'Get access to free online financial calculators for budgeting, loans, investments, and more. Calculate your finances easily with our reliable financial tools.',
  alternates: {
    canonical: 'https://calczoon.com/financial-calculators',
  },
};

export default function Page() {
  return <FinancialCalculators />;
}

import History from '@/pages/History';

export const metadata = {
  title: 'Calculation History - CalcZoon',
  description: 'View your recent calculation history across all CalcZoon tools.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://calczoon.com/history',
  },
};

export default function Page() {
  return <History />;
}

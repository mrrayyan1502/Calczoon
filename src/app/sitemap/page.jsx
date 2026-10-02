import Sitemap from '@/pages/Sitemap';

export const metadata = {
  title: 'HTML Sitemap - CalcZoon',
  description: 'Easily navigate and find all free online calculators, blog guides, and informational pages on CalcZoon.',
  alternates: {
    canonical: 'https://calczoon.com/sitemap',
  },
};

export default function Page() {
  return <Sitemap />;
}

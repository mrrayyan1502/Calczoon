import Blog from '@/pages/Blog';

export const metadata = {
  title: 'CalcZoon Blog: Expert Guides, Tips, and Calculator Insights',
  description: 'Explore articles on how to use calculators for financial planning, health and fitness tracking, and math problem-solving to make informed decisions.',
  alternates: {
    canonical: 'https://calczoon.com/blog',
  },
};

export default function Page() {
  return <Blog />;
}

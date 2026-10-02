import About from '@/pages/About';

export const metadata = {
  title: 'About CalcZoon - Your Free Online Calculator Hub',
  description: "Learn about CalcZoon's mission to provide fast, accurate, and easy-to-use online calculators for finance, health, math, and everyday life.",
  alternates: {
    canonical: 'https://calczoon.com/about',
  },
};

export default function Page() {
  return <About />;
}

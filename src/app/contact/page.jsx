import Contact from '@/pages/Contact';

export const metadata = {
  title: 'Contact Us - CalcZoon',
  description: 'Get in touch with the CalcZoon team. We welcome your questions, feedback, and suggestions for new calculators.',
  alternates: {
    canonical: 'https://calczoon.com/contact',
  },
};

export default function Page() {
  return <Contact />;
}

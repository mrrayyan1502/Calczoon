import Disclaimer from '@/pages/Disclaimer';

export const metadata = {
  title: 'Disclaimer - CalcZoon',
  description: 'Important disclaimer for CalcZoon.com. Our calculators provide estimates for informational purposes only and are not a substitute for professional advice.',
  alternates: {
    canonical: 'https://calczoon.com/disclaimer',
  },
};

export default function Page() {
  return <Disclaimer />;
}

import TermsAndConditions from '@/pages/TermsAndConditions';

export const metadata = {
  title: 'Terms of Service - CalcZoon',
  description: 'Review the Terms of Service for CalcZoon. Learn about website usage, intellectual property, user responsibilities, and disclaimers of warranty.',
  alternates: {
    canonical: 'https://calczoon.com/terms-of-service',
  },
};

export default function Page() {
  return <TermsAndConditions />;
}

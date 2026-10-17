'use client';

import React from 'react';
import Seo from '@/components/Seo';
import AccuracyStandardsSection from '@/components/AccuracyStandardsSection';
import PageHeader from '@/components/PageHeader';
import { ShieldCheck } from 'lucide-react';

const Testimonials = () => {
  return (
    <>
      <Seo
        title="Accuracy Standards & Verification Methodology | CalcZoon"
        description="Learn about CalcZoon's commitment to mathematical precision, clinical verification, and rigorous algorithm benchmarking."
        canonicalUrl="/testimonials"
      />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <PageHeader
          title="Accuracy Standards & Formula Verification"
          description="We prioritize transparency and precision. Every calculator on CalcZoon is benchmarked against established mathematical and clinical literature."
          icon={ShieldCheck}
        />
        <AccuracyStandardsSection />
      </div>
    </>
  );
};

export default Testimonials;

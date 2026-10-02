import { notFound } from 'next/navigation';
import { financialCalculators } from '@/data/calculatorRegistry';
import { getCalculatorSchemas } from '@/data/calculatorSchemas';

export async function generateStaticParams() {
  return Object.keys(financialCalculators).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const calc = financialCalculators[params.slug];
  if (!calc) {
    return {
      title: 'Calculator Not Found | CalcZoon',
      description: 'The requested financial calculator could not be found.',
    };
  }

  return {
    title: `${calc.title} | CalcZoon`,
    description: calc.description,
    alternates: {
      canonical: calc.canonicalUrl,
    },
    openGraph: {
      title: calc.title,
      description: calc.description,
      url: calc.canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: calc.title,
      description: calc.description,
    },
  };
}

export default function FinancialCalculatorPage({ params }) {
  const calc = financialCalculators[params.slug];
  if (!calc) {
    notFound();
  }

  const Component = calc.component;
  const schemas = getCalculatorSchemas(params.slug);

  return (
    <>
      {schemas && schemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
      )}
      <Component />
    </>
  );
}

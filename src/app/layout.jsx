import '@/index.css';
import ClientLayout from '@/components/ClientLayout';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://calczoon.com'),
  title: {
    default: 'CalcZoon – Free Online Calculators for Math, Finance, Health & More',
    template: '%s',
  },
  description: '100+ free online calculators for math, health, finance, fitness and everyday life. Fast, accurate results with no signup required. Try CalcZoon now.',
  verification: {
    google: 'fyUYtNajmnEhD5FPSAg51k8jwv_ezuSKcqopR6rFi70',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    siteName: 'CalcZoon',
    type: 'website',
    images: [
      {
        url: 'https://calczoon.com/calczoon-logo-full.png',
        width: 1200,
        height: 630,
        alt: 'CalcZoon Free Online Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@calczoon',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://calczoon.com/#organization',
      name: 'CalcZoon',
      url: 'https://calczoon.com/',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://calczoon.com/#logo',
        url: 'https://calczoon.com/calczoon-logo-full.png',
        contentUrl: 'https://calczoon.com/calczoon-logo-full.png',
        caption: 'CalcZoon',
      },
      description: 'CalcZoon provides free online calculators for finance, mathematics, health, fitness and everyday tasks.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://calczoon.com/#website',
      url: 'https://calczoon.com/',
      name: 'CalcZoon',
      description: 'Free online calculators for finance, mathematics, health, fitness and everyday calculations.',
      publisher: {
        '@id': 'https://calczoon.com/#organization',
      },
      inLanguage: 'en',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="version" content="v2.0-nextjs-ssg" />
        <meta name="google-adsense-account" content="ca-pub-1668581059091583" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8S1TR6NVS5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8S1TR6NVS5');
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          id="google-adsense"
          strategy="lazyOnload"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1668581059091583"
        />

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

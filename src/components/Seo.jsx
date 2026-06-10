import React from 'react';
import { Helmet } from 'react-helmet-async';

const Seo = ({ title, description, canonicalUrl, schema, keywords, ogImage }) => {
  const fullTitle = title.includes('CalcZoon') || title.includes('Calczoon') ? title : `${title} | CalcZoon`;
  const finalOgImage = ogImage || "https://calczoon.com/og-preview.png";
  
  // Safe Canonical URL logic
  const finalCanonicalUrl = canonicalUrl 
    ? (canonicalUrl.startsWith('http') ? canonicalUrl : `https://calczoon.com${canonicalUrl.startsWith('/') ? '' : '/'}${canonicalUrl}`) 
    : null;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      {finalCanonicalUrl && <link rel="canonical" href={finalCanonicalUrl} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {finalCanonicalUrl && <meta property="og:url" content={finalCanonicalUrl} />}
      <meta property="og:image" content={finalOgImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />
      {schema && (
        Array.isArray(schema) ? 
        schema.map((s, i) => <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>) :
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default Seo;
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Seo = ({ title, description, canonicalUrl, schema, keywords }) => {
  const fullTitle = `${title} | CalcZoon`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      {canonicalUrl && <link rel="canonical" href={`https://calczoon.com${canonicalUrl}`} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonicalUrl && <meta property="og:url" content={`https://calczoon.com${canonicalUrl}`} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {schema && (
        Array.isArray(schema) ? 
        schema.map((s, i) => <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>) :
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default Seo;
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/history'],
      },
    ],
    sitemap: 'https://calczoon.com/sitemap.xml',
  };
}

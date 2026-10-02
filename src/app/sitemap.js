import { blogPosts } from '@/data/blogRegistry';
import {
  healthCalculators,
  financialCalculators,
  mathCalculators,
  lifestyleCalculators,
} from '@/data/calculatorRegistry';

export default function sitemap() {
  const baseUrl = 'https://calczoon.com';

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms-and-conditions',
    '/disclaimer',
    '/sitemap',
    '/tools',
    '/calculators',
    '/scientific-references',
    '/partners',
    '/financial-calculators',
    '/health-fitness-calculators',
    '/math-science-calculators',
    '/lifestyle-everyday-calculators',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogRoutes = Object.keys(blogPosts).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const healthRoutes = Object.keys(healthCalculators).map((slug) => ({
    url: `${baseUrl}/health/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const financialRoutes = Object.keys(financialCalculators).map((slug) => ({
    url: `${baseUrl}/financial/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const mathRoutes = Object.keys(mathCalculators).map((slug) => ({
    url: `${baseUrl}/math/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const lifestyleRoutes = Object.keys(lifestyleCalculators).map((slug) => ({
    url: `${baseUrl}/lifestyle/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [
    ...staticRoutes,
    ...healthRoutes,
    ...financialRoutes,
    ...mathRoutes,
    ...lifestyleRoutes,
    ...blogRoutes,
  ];
}

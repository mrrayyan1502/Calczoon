'use client';

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CATEGORY_MAP = {
  health: { name: 'Health & Fitness', path: '/health-fitness-calculators' },
  financial: { name: 'Financial', path: '/financial-calculators' },
  math: { name: 'Math & Science', path: '/math-science-calculators' },
  lifestyle: { name: 'Lifestyle & Everyday', path: '/lifestyle-everyday-calculators' },
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const formatCrumb = (crumb, index) => {
    if (index === 0 && CATEGORY_MAP[crumb]) {
      return CATEGORY_MAP[crumb].name;
    }
    return crumb
      .replace(/-/g, ' ')
      .replace(/(\b[a-z](?!\s))/g, (char) => char.toUpperCase());
  };

  const getCrumbPath = (value, index) => {
    if (index === 0 && CATEGORY_MAP[value]) {
      return CATEGORY_MAP[value].path;
    }
    return `/${pathnames.slice(0, index + 1).join('/')}`;
  };

  if (pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'home' && location.pathname !== '/home')) {
    return null;
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://calczoon.com/"
      },
      ...pathnames.map((value, index) => {
        const to = getCrumbPath(value, index);
        return {
          "@type": "ListItem",
          "position": index + 2,
          "name": formatCrumb(value, index),
          "item": `https://calczoon.com${to}`
        };
      })
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ol className="flex items-center space-x-2 text-sm text-slate-300">
        <li>
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = getCrumbPath(value, index);
          const isLast = index === pathnames.length - 1;

          return (
            <React.Fragment key={to}>
              <li>
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                {isLast ? (
                  <span className="font-semibold text-white">{formatCrumb(value, index)}</span>
                ) : (
                  <Link to={to} className="hover:text-primary transition-colors">
                    {formatCrumb(value, index)}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
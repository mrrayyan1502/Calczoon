import React from 'react';
import { Link } from 'react-router-dom';

const blogTeasers = [
  {
    title: 'A Beginner\'s Guide to Using a Macro Calculator',
    link: '/blog/macro-calculator-guide',
    snippet: 'Learn how to use a macro calculator to create an effective nutrition plan for any goal.',
  },
  {
    title: 'The Ultimate Guide to Financial Wellness',
    link: '/blog/financial-wellness-guide',
    snippet: 'Essential tools for budgeting, saving, and investing for a brighter financial future.',
  },
  {
    title: 'How to Use a TDEE Calculator for Weight Loss',
    link: '/blog/tdee-calculator-guide',
    snippet: 'Understand your Total Daily Energy Expenditure to manage weight effectively.',
  },
];

const BlogTeaser = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 grid gap-6">
      {blogTeasers.map((blog) => (
        <div
          key={blog.link}
          className="bg-slate-800/40 p-4 rounded-md hover:bg-slate-700 transition-colors"
        >
          <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
          <p className="text-slate-300 mb-2">{blog.snippet}</p>
          <Link
            to={blog.link}
            className="text-primary font-semibold hover:underline"
          >
            Read More →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogTeaser;
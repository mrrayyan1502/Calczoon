import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: 'A Beginner\'s Guide to Using a Macro Calculator',
    link: '/blog/macro-calculator-guide',
    description: 'Learn how to use a macro calculator to create a sustainable and effective nutrition plan for any fitness goal.',
    altText: 'A plate of healthy food with a smartphone showing a macro calculator app.',
    imgSrc: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
  },
  {
    title: 'The Ultimate Guide to Financial Wellness',
    link: '/blog/financial-wellness-guide',
    description: 'Take control of your finances with essential tools for budgeting, saving, and investing for the future.',
    altText: 'A person reviewing their finances on a laptop with charts and graphs.',
    imgSrc: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
  },
  {
    title: 'How to Use a TDEE Calculator for Weight Loss',
    link: '/blog/tdee-calculator-guide',
    description: 'Unlock the secrets to effective weight management by understanding your Total Daily Energy Expenditure.',
    altText: 'A person on a treadmill, symbolizing energy expenditure and fitness.',
    imgSrc: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
  },
];

const BlogSection = () => (
  <section className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
      From Our Blog
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post, index) => (
        <motion.div
          key={post.link}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link to={post.link} className="block h-full">
            <Card className="bg-slate-800/40 border-slate-700/50 h-full overflow-hidden group hover:border-primary/50 transition-all duration-300 flex flex-col">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.imgSrc}
                  alt={post.altText}
                  width="400"
                  height="225"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 flex-grow">
                  {post.title}
                </h3>
                <p className="text-slate-300 mb-4">{post.description}</p>
                <span className="font-semibold text-primary flex items-center mt-auto">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);

export default BlogSection;
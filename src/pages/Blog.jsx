import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Dumbbell, HeartPulse, Target, BrainCircuit, Banknote, DollarSign, Calculator, Percent, Divide, Sigma, PiggyBank, TrendingUp, Sun, Moon, Calendar, GraduationCap, HardHat, Fuel } from 'lucide-react';
import Seo from '@/components/Seo';

const blogPosts = [
  {
    title: 'How to Use a TDEE Calculator for Weight Loss',
    link: '/blog/tdee-calculator-guide',
    description: 'Calculate your TDEE to create a sustainable weight loss plan. Our guide breaks down the science.',
    category: 'Health',
    icon: <Dumbbell className="w-5 h-5" />,
    imgSrc: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
  },
  {
    title: 'What Is BMI? A Guide to Using a BMI Calculator',
    link: '/blog/bmi-calculator-guide',
    description: 'Understand what Body Mass Index means for your health and how to use our free BMI calculator.',
    category: 'Health',
    icon: <HeartPulse className="w-5 h-5" />,
    imgSrc: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
  },
  {
    title: 'A Beginner\'s Guide to Using a Macro Calculator',
    link: '/blog/macro-calculator-guide',
    description: 'Discover how to use a macro calculator to set your protein, carb, and fat intake for your goals.',
    category: 'Health',
    icon: <Target className="w-5 h-5" />,
    imgSrc: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
  },
  {
    title: 'Understanding Your Body Fat Percentage',
    link: '/blog/body-fat-percentage-guide',
    description: 'Learn why body fat percentage is a crucial health metric and how our calculator provides an accurate estimate.',
    category: 'Health',
    icon: <BrainCircuit className="w-5 h-5" />,
    imgSrc: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
  },
  {
    title: 'How to Save Thousands on Your Mortgage',
    link: '/blog/mortgage-payoff-guide',
    description: 'Discover strategies for paying off your mortgage faster. Our calculator shows how extra payments can save you thousands.',
    category: 'Finance',
    icon: <Banknote className="w-5 h-5" />,
    imgSrc: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
  },
  {
    title: 'A Guide to Calculating Loan Payments and Interest',
    link: '/blog/loan-calculator-guide',
    description: 'Before you borrow, understand the true cost. Our guide and calculator help you compare loan options.',
    category: 'Finance',
    icon: <DollarSign className="w-5 h-5" />,
    imgSrc: "https://images.unsplash.com/photo-1560518883-ce09059ee212?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
  },
  {
    title: 'Mastering the Triangle Area Calculator',
    link: '/blog/triangle-area-guide',
    description: 'A comprehensive guide to calculating the area of any triangle, with formulas and practical examples.',
    category: 'Math',
    icon: <Calculator className="w-5 h-5" />,
    imgSrc: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
  },
  {
    title: 'The Ultimate Guide to Percentage Calculations',
    link: '/blog/percentage-calculator-guide',
    description: 'From discounts to data analysis, master percentages with our easy-to-use calculator and guide.',
    category: 'Math',
    icon: <Percent className="w-5 h-5" />,
    imgSrc: "https://images.unsplash.com/photo-1587145820137-a9dbc8c51a3a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
  },
  {
    title: 'Simplify Your Life with the Fraction Calculator',
    link: '/blog/fraction-calculator-guide',
    description: 'Add, subtract, multiply, and divide fractions effortlessly. This guide makes fraction math simple.',
    category: 'Math',
    icon: <Divide className="w-5 h-5" />,
    imgSrc: "https://images.unsplash.com/photo-1596495577886-d9256f431b96?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb"
  }
];

const Blog = () => {
  return (
    <>
      <Seo
        title="Blog - Tips, Guides & Insights | Calczoon"
        description="Explore the Calczoon Blog for expert insights, practical guides, and tips on using our free online calculators to manage your finances, health, and more."
        canonicalUrl="/blog"
      />
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">The CalcZoon Blog</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Practical guides, financial tips, and health insights to help you make sense of the numbers and improve your daily life.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link to={post.link} className="block h-full group">
                <Card className="bg-slate-800/40 border-slate-700/50 h-full overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col">
                  <div className="aspect-video overflow-hidden">
                    <img src={post.imgSrc} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-primary mb-2">
                        {post.icon}
                        <span className="ml-2 font-semibold">{post.category}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 flex-grow">{post.title}</h2>
                    <p className="text-slate-400 mb-4 text-sm">{post.description}</p>
                    <div className="font-semibold text-primary flex items-center mt-auto group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
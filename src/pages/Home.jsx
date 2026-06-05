import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calculator, BarChart2, DollarSign, Dumbbell, Globe, Tag, HeartPulse, Percent, Scale, TrendingUp } from 'lucide-react';
import Seo from '@/components/Seo';
import NewsletterCTA from '@/components/NewsletterCTA';
import Faq from '@/components/Faq';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';

const tools = [
  {
    icon: <BarChart2 className="w-8 h-8 text-blue-400" />,
    name: 'Statistics Calculator',
    description: 'Calculate mean, median, mode, variance, and standard deviation instantly.',
    path: '/math/statistics-calculator',
    category: "Math & Science"
  },
  {
    icon: <Calculator className="w-8 h-8 text-indigo-400" />,
    name: 'Scientific Calculator',
    description: 'Perform advanced calculations with trigonometry, logs, and exponentials.',
    path: '/math/scientific-calculator',
    category: "Math & Science"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
    name: 'SIP Calculator',
    description: 'Estimate your future wealth and mutual fund returns via Systematic Investment Plans.',
    path: '/financial/sip-calculator',
    category: "Financial"
  },
  {
    icon: <DollarSign className="w-8 h-8 text-green-400" />,
    name: 'Loan Calculator',
    description: 'Estimate monthly payments, interest rates, and total amortization details.',
    path: '/financial/loan-calculator',
    category: "Financial"
  },
  {
    icon: <Dumbbell className="w-8 h-8 text-yellow-400" />,
    name: 'TDEE Calculator',
    description: 'Determine your daily calorie needs based on your physical activity levels.',
    path: '/health/tdee-calculator',
    category: "Health & Fitness"
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-rose-400" />,
    name: 'BMI Calculator',
    description: 'Check your Body Mass Index quickly to see if your weight is in a healthy range.',
    path: '/health/bmi-calculator',
    category: "Health & Fitness"
  },
  {
    icon: <Tag className="w-8 h-8 text-pink-400" />,
    name: 'Discount Calculator',
    description: 'Find final sales price, tax amounts, and stackable savings instantly.',
    path: '/lifestyle/discount-calculator',
    category: "Lifestyle & Everyday"
  },
  {
    icon: <Globe className="w-8 h-8 text-sky-400" />,
    name: 'Time Zone Converter',
    description: 'Convert dates and times across global time zones for easy meeting planning.',
    path: '/lifestyle/time-zone-converter',
    category: "Lifestyle & Everyday"
  }
];

const categories = ["All", "Financial", "Health & Fitness", "Math & Science", "Lifestyle & Everyday"];

const faqs = [
  {
    question: "What is CalcZoon?",
    answer: "CalcZoon is a comprehensive online platform offering a wide variety of free, user-friendly calculators for health, finance, mathematics, and everyday life. Our goal is to provide accurate and instant calculations to help you make informed decisions."
  },
  {
    question: "Are the calculators free to use?",
    answer: "Yes, all calculators on CalcZoon are completely free to use. There are no hidden charges, subscription fees, or registrations required."
  },
  {
    question: "How accurate are the results?",
    answer: "Our calculators are built using standard, widely-accepted formulas and are rigorously tested. However, they are intended for informational and educational purposes only and should not replace professional medical or financial advice."
  },
  {
    question: "Can I save my calculation results?",
    answer: "Yes! Your recent calculations are automatically saved to your browser's local storage for your convenience. You can access them on the 'History' page. This data is stored only on your device and is not sent to our servers."
  },
  {
    question: "Is CalcZoon mobile-friendly?",
    answer: "Absolutely. Our website is fully responsive and optimized for all devices, including smartphones, tablets, and desktop computers, ensuring a seamless experience wherever you are."
  }
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTools = activeCategory === "All" 
    ? tools 
    : tools.filter(t => t.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <Seo
        title="CalcZoon | Your Free Online Calculator Hub"
        description="A comprehensive suite of free, easy-to-use online calculators for finance, health, math, and everyday life. Get instant and accurate answers."
        canonicalUrl="https://calczoon.com/"
        schema={faqSchema}
      />

      <div className="space-y-20 sm:space-y-32 relative overflow-hidden">
        {/* Subtle Background glow */}
        <div className="absolute top-[-10%] left-[20%] w-[30rem] h-[30rem] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute top-[20%] right-[10%] w-[25rem] h-[25rem] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none"></div>

        {/* Hero Section */}
        <section className="text-center pt-0 pb-10 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Percent className="w-3.5 h-3.5" /> 100% Free & Easy Utilities
          </motion.div>
          
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 mb-4 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Calculate, Simplify,<br className="hidden md:inline" /> Succeed.
          </motion.h1>

          <motion.p
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your ultimate destination for highly accurate, browser-based calculators. Plan investments, track fitness goals, and solve mathematical equations in real time.
          </motion.p>
          
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link to="/tools">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-emerald-500/10 transform hover:scale-105 transition-all duration-300">
                Explore All Calculators
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Dynamic Interactive Filter & Tools Grid */}
        <section className="relative">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold text-center text-white mb-6">Popular Calculators</h2>
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-900/60 border border-slate-800/80 rounded-2xl max-w-3xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                  aria-label={`Show ${cat} calculators`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.name}
                variants={cardVariants}
                className="h-full"
              >
                <Link to={tool.path} className="block h-full" aria-label={`Open ${tool.name}`}>
                  <Card className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 hover:bg-slate-900/60 hover:border-emerald-500/40 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-[0_10px_30px_rgba(16,185,129,0.05)] rounded-2xl overflow-hidden group">
                    <CardHeader className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 group-hover:scale-110 transition-transform duration-300">
                          {tool.icon}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">{tool.category}</p>
                          <CardTitle className="text-lg text-white font-bold group-hover:text-emerald-400 transition-colors duration-300">{tool.name}</CardTitle>
                        </div>
                      </div>
                      <CardContent className="p-0">
                        <p className="text-slate-400 text-sm leading-relaxed">{tool.description}</p>
                      </CardContent>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        {/* Simplified 3-Step Guide */}
        <section className="py-16 bg-slate-900/20 rounded-3xl border border-slate-800/80 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-sky-500"></div>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white">How It Works</h2>
              <p className="mt-4 text-slate-400 font-medium">Get accurate results instantly in 3 simple steps.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl mb-6 text-emerald-400 font-extrabold text-2xl">1</div>
                <h3 className="text-xl font-bold text-white mb-2">Select a Calculator</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">Choose from our wide range of custom tools matching your financial, health, or math needs.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 bg-sky-500/10 border border-sky-500/30 rounded-2xl mb-6 text-sky-400 font-extrabold text-2xl">2</div>
                <h3 className="text-xl font-bold text-white mb-2">Enter Your Details</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">Input your variables into our clean, validated, and user-friendly entry fields.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl mb-6 text-indigo-400 font-extrabold text-2xl">3</div>
                <h3 className="text-xl font-bold text-white mb-2">Get Instant Answers</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">Receive highly accurate mathematical outputs, complete with summaries, tips, and graphs.</p>
              </div>
            </div>
          </div>
        </section>

        <AboutSection />
        <TestimonialsSection />
        <NewsletterCTA />
        <Faq items={faqs} />
      </div>
    </>
  );
};

export default Home;
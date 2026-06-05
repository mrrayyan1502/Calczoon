import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calculator, BarChart2, DollarSign, Dumbbell } from 'lucide-react';
import Seo from '@/components/Seo';
import NewsletterCTA from '@/components/NewsletterCTA';
import Faq from '@/components/Faq';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';

const tools = [
  {
    icon: <BarChart2 className="w-8 h-8 text-blue-400" />,
    name: 'Statistics Calculator',
    description: 'Calculate mean, median, mode, and standard deviation.',
    path: '/math/statistics-calculator',
    category: "Math & Science"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A9.5 9.5 0 1 1 8.11 2.79"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>,
    name: 'Macro Calculator',
    description: 'Find your ideal daily macronutrient intake.',
    path: '/health/macro-calculator',
    category: "Health & Fitness"
  },
  {
    icon: <DollarSign className="w-8 h-8 text-green-400" />,
    name: 'Loan Calculator',
    description: 'Estimate monthly payments and total interest for loans.',
    path: '/financial/loan-calculator',
    category: "Financial"
  },
  {
    icon: <Dumbbell className="w-8 h-8 text-yellow-400" />,
    name: 'TDEE Calculator',
    description: 'Calculate your Total Daily Energy Expenditure.',
    path: '/health/tdee-calculator',
    category: "Health & Fitness"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15.5" x2="9" y2="7"></line></svg>,
    name: 'BMI Calculator',
    description: 'Check your Body Mass Index quickly and easily.',
    path: '/health/bmi-calculator',
    category: "Health & Fitness"
  },
   {
    icon: <Calculator className="w-8 h-8 text-indigo-400" />,
    name: 'Triangle Area Calculator',
    description: 'Calculate triangle area from base/height or 3 sides.',
    path: '/math/triangle-calculator',
    category: "Math & Science"
  },
];


const faqs = [
  {
    question: "What is CalcZoon?",
    answer: "CalcZoon is a comprehensive online platform offering a wide variety of free, user-friendly calculators for health, finance, mathematics, and everyday life. Our goal is to provide accurate and instant calculations to help you make informed decisions."
  },
  {
    question: "Are the calculators free to use?",
    answer: "Yes, all calculators on CalcZoon are completely free to use. There are no hidden charges or subscription fees."
  },
  {
    question: "How accurate are the results?",
    answer: "Our calculators are built using standard, widely-accepted formulas and are rigorously tested. However, they are intended for informational and educational purposes only and should not replace professional advice."
  },
  {
    question: "Can I save my calculation results?",
    answer: "Yes, your recent calculations are automatically saved to your browser's local storage for your convenience. You can access them on the 'History' page. This data is stored only on your device and is not sent to our servers."
  },
  {
    question: "Do I need to register an account?",
    answer: "No, you can use all of our tools immediately without registration. We believe in providing open access to helpful utilities without barriers."
  },
  {
    question: "Is CalcZoon mobile-friendly?",
    answer: "Absolutely. Our website is fully responsive and optimized for all devices, including smartphones, tablets, and desktop computers, ensuring a seamless experience wherever you are."
  }
];

const Home = () => {
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
  };

  // Define the single, primary FAQPage schema here
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
      <div className="space-y-20 sm:space-y-32">
        {/* Hero Section */}
        <section className="text-center pt-12 md:pt-20 pb-16">
            <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 mb-6"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            >
                Calculate, Simplify, Succeed
            </motion.h1>
            <motion.p
                className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            >
                Your one-stop destination for a wide range of free online calculators. From health and fitness to finance and math, get instant, accurate results to make informed decisions.
            </motion.p>
            <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            >
                <Link to="/tools">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
                        Explore All Calculators
                    </Button>
                </Link>
            </motion.div>
        </section>

        {/* Featured Calculators Section */}
        <section>
          <h2 className="text-3xl font-bold text-center text-white mb-12">Popular Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants} transition={{ delay: index * 0.1 }}
              >
                <Link to={tool.path} className="block h-full">
                  <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="bg-slate-900 p-3 rounded-lg">
                          {tool.icon}
                        </div>
                        <div>
                          <CardTitle className="text-xl text-white">{tool.name}</CardTitle>
                          <p className="text-xs text-sky-400">{tool.category}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-slate-400">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-slate-800/30 rounded-xl">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">How It Works</h2>
                    <p className="mt-4 text-lg text-slate-300">Get your calculations in 3 simple steps.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-20 h-20 bg-primary/10 border-2 border-primary rounded-full mb-4 text-primary font-bold text-3xl">1</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Select a Calculator</h3>
                        <p className="text-slate-400">Choose from our wide range of tools designed for your specific needs.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-20 h-20 bg-primary/10 border-2 border-primary rounded-full mb-4 text-primary font-bold text-3xl">2</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Enter Your Data</h3>
                        <p className="text-slate-400">Input your numbers into the clearly marked fields. It's simple and intuitive.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-20 h-20 bg-primary/10 border-2 border-primary rounded-full mb-4 text-primary font-bold text-3xl">3</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Get Instant Results</h3>
                        <p className="text-slate-400">Receive accurate and immediate calculations to help you move forward.</p>
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
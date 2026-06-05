import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Scale, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Seo from '@/components/Seo';

const BmiBlog = () => {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://calczoon.com/blog/what-is-bmi"
    },
    "headline": "What is BMI and How to Use a BMI Calculator?",
    "description": "Learn what Body Mass Index (BMI) is, how it's calculated, and how to interpret your results using our free BMI calculator. Understand its role in assessing health.",
    "image": "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0",
    "author": {
      "@type": "Organization",
      "name": "Calczoon"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Calczoon",
      "logo": {
        "@type": "ImageObject",
        "url": "https://calczoon.com/logo.png"
      }
    },
    "datePublished": "2023-10-31"
  };

  return (
    <>
      <Seo
        title="What is BMI and How to Use a BMI Calculator? - Calczoon"
        description="Learn what Body Mass Index (BMI) is, how it's calculated, and how to interpret your results using our free BMI calculator. Understand its role in assessing health."
        canonicalUrl="/blog/what-is-bmi"
        schema={blogSchema}
      />
      <Suspense fallback={<div/>}>
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-b from-slate-900 to-slate-800 text-white"
        >
            <div className="relative">
                <img   
                    alt="A person standing on a weight scale to measure their body mass index"
                    className="w-full h-64 md:h-96 object-cover" 
                    width="1200" height="400"
                    src="https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?q=80&w=1920" 
                    loading="lazy" />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold text-center text-white p-4"
                    >
                        What is BMI and How to Use a BMI Calculator?
                    </motion.h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto p-6 md:p-8 space-y-12">
                <p className="text-xl text-slate-300 leading-relaxed">
                    Body Mass Index (BMI) is a widely used measure for categorizing weight status in adults. It's a simple calculation based on your height and weight. While it's not a perfect diagnostic tool, it provides a useful starting point for understanding if your weight is in a healthy range and is an essential part of monitoring your overall health.
                </p>

                <section>
                    <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><Scale className="mr-3" />How is BMI Calculated?</h2>
                    <p className="text-slate-300 mb-4">
                        The formula for BMI is straightforward: your weight in kilograms divided by the square of your height in meters (kg/m²). While simple, it can be tedious to calculate manually, especially when converting from imperial units (pounds and inches). 
                    </p>
                    <p className="text-slate-300 mb-6">
                        Our <Link to="/health/bmi-calculator" className="text-primary hover:underline font-semibold">BMI Calculator</Link> automates this process for you. Just enter your details, and it instantly provides your BMI number and what category it falls into.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><Heart className="mr-3" />Understanding the BMI Categories</h2>
                    <p className="text-slate-300 mb-6">The World Health Organization (WHO) defines the following categories for adults:</p>
                    <ul className="list-disc list-inside space-y-3 text-slate-300 bg-slate-800/40 p-6 rounded-lg border border-slate-700">
                        <li><strong>Below 18.5:</strong> Underweight. This may indicate malnutrition or other health issues.</li>
                        <li><strong>18.5 – 24.9:</strong> Normal weight. This range is associated with the lowest risk of weight-related health problems.</li>
                        <li><strong>25.0 – 29.9:</strong> Overweight. This indicates a higher risk for health conditions like heart disease and diabetes.</li>
                        <li><strong>30.0 and above:</strong> Obesity. This category signifies a significantly increased risk of serious health issues.</li>
                    </ul>
                    <p className="mt-4 text-slate-400">It's crucial to remember that BMI is a screening tool, not a definitive diagnosis of body fatness or overall health. Athletes with high muscle mass may have a high BMI but low body fat.</p>
                </section>
                
                <section>
                    <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><Activity className="mr-3" />Beyond BMI: A Holistic View of Health</h2>
                    <p className="text-slate-300 mb-6">A single number can't define your health. To get a complete picture, it's important to consider other factors:</p>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-slate-300">
                          <li><strong>Diet and Nutrition:</strong> Use our <Link to="/health/tdee-calculator" className="text-primary hover:underline font-semibold">TDEE Calculator</Link> to determine your daily calorie needs and our <Link to="/health/macro-calculator" className="text-primary hover:underline font-semibold">Macro Calculator</Link> to balance your food intake.</li>
                          <li><strong>Activity Level:</strong> How many calories are you burning? Our <Link to="/health/calories-burned-calculator" className="text-primary hover:underline font-semibold">Calories Burned Calculator</Link> can help you estimate.</li>
                          <li><strong>Body Composition:</strong> Tools like body fat percentage calculators can provide more insight than BMI alone.</li>
                        </ul>
                </section>

                <div className="text-center border-t border-slate-700 pt-10">
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to Check Your BMI?</h3>
                    <p className="text-slate-300 mb-6">Use our free and easy tool to get your BMI in seconds and take the first step towards a better understanding of your health.</p>
                    <Button asChild size="lg">
                        <Link to="/health/bmi-calculator">Go to BMI Calculator</Link>
                    </Button>
                </div>
            </div>
        </motion.article>
      </Suspense>
    </>
  );
};

export default BmiBlog;
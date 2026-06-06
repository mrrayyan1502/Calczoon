import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Umbrella } from 'lucide-react';
import Seo from '@/components/Seo';

const AboutPage = () => {
    return (
        <>
            <Seo
                title="About CalcZoon - Your Free Online Calculator Hub"
                description="Learn about CalcZoon's mission to provide fast, accurate, and easy-to-use online calculators for finance, health, math, and everyday life. Built with modern technology for a seamless experience."
                canonicalUrl="/about"
            />
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        About <span className="text-primary">CalcZoon</span>
                    </h1>
                    <p className="text-lg text-slate-300">
                        Fast, Accurate, and Free Calculators for Everyone.
                    </p>
                </motion.div>

                <div className="bg-slate-800/50 rounded-xl p-8 shadow-lg mb-12">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Mission</h2>
                    <p className="text-slate-300 text-lg leading-relaxed text-center max-w-2xl mx-auto mb-4">
                        At CalcZoon, our mission is to provide a comprehensive suite of simple, fast, and reliable online calculators. We believe that everyone should have access to tools that make complex calculations easy, whether you're planning your finances, tracking your health, or solving a math problem. We're dedicated to creating an intuitive and user-friendly experience, completely free of charge.
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed text-center max-w-2xl mx-auto border-t border-slate-700/50 pt-4">
                        In line with our commitment to inclusivity, CalcZoon is fully optimized to comply with the **Americans with Disabilities Act (ADA)** in the United States and the **Equality Act 2010** in the United Kingdom, adhering strictly to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="p-6 bg-slate-800 rounded-lg shadow-md h-full">
                            <div className="flex justify-center mb-4">
                                <div className="bg-primary/20 p-4 rounded-full">
                                    <Zap className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Fast & Efficient</h3>
                            <p className="text-slate-400">Get instant answers without unnecessary clutter. Our tools are optimized for speed and simplicity, so you can calculate what you need and get on with your day.</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="p-6 bg-slate-800 rounded-lg shadow-md h-full">
                            <div className="flex justify-center mb-4">
                                <div className="bg-primary/20 p-4 rounded-full">
                                    <Target className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Accurate & Reliable</h3>
                            <p className="text-slate-400">We use standard, industry-accepted formulas and rigorously test our calculators to ensure you receive trustworthy results every time.</p>
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <div className="p-6 bg-slate-800 rounded-lg shadow-md h-full">
                            <div className="flex justify-center mb-4">
                                <div className="bg-primary/20 p-4 rounded-full">
                                    <Umbrella className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Completely Free</h3>
                            <p className="text-slate-400">Our goal is to make these tools accessible to everyone. All calculators on CalcZoon are, and always will be, free to use without any hidden fees or subscriptions.</p>
                        </div>
                    </motion.div>
                </div>
                
                 <div className="mt-16 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">The Tech Behind CalcZoon</h2>
                    <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                        This site is built with modern web technologies for a fast, responsive, and reliable experience. We leverage <strong className="text-cyan-400">React</strong> for a dynamic user interface, <strong className="text-sky-400">TailwindCSS</strong> for sleek styling, and <strong className="text-purple-400">Vite</strong> for a blazing-fast development and build process.
                    </p>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
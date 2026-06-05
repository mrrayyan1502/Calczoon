import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calculator, TrendingUp, PiggyBank } from 'lucide-react';

const FeaturedToolSection = () => {
    return (
        <section className="py-12 md:py-20 bg-slate-900/50 rounded-xl">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Calculators</h2>
                    <p className="mt-4 text-lg text-slate-400">Hand-picked tools to help you make informed decisions.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1: TDEE Calculator */}
                    <motion.div whileHover={{ y: -5 }} className="h-full">
                        <Link to="/health/tdee-calculator" className="block h-full">
                            <Card className="bg-slate-800 border-slate-700 h-full flex flex-col hover:border-primary transition-colors">
                                <CardHeader>
                                    <div className="flex justify-center mb-4">
                                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                                            <Calculator className="w-8 h-8 text-blue-400" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-center text-white">TDEE Calculator</CardTitle>
                                    <CardDescription className="text-center text-slate-400">
                                        Estimate your daily calorie needs for weight management.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-slate-300">
                                        Understand your Total Daily Energy Expenditure (TDEE) to precisely tailor your diet for weight loss, maintenance, or muscle gain.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>

                    {/* Feature 2: Investment ROI Calculator */}
                    <motion.div whileHover={{ y: -5 }} className="h-full">
                        <Link to="/financial/investment-roi-calculator" className="block h-full">
                            <Card className="bg-slate-800 border-slate-700 h-full flex flex-col hover:border-primary transition-colors">
                                <CardHeader>
                                    <div className="flex justify-center mb-4">
                                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                                            <TrendingUp className="w-8 h-8 text-green-400" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-center text-white">Investment ROI Calculator</CardTitle>
                                    <CardDescription className="text-center text-slate-400">
                                        Calculate the return on your investments quickly.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-slate-300">
                                        Evaluate the performance of your investments with our Return on Investment (ROI) calculator. Make smarter financial decisions.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>

                    {/* Feature 3: Mortgage Payoff Calculator */}
                    <motion.div whileHover={{ y: -5 }} className="h-full">
                        <Link to="/financial/mortgage-payoff-calculator" className="block h-full">
                            <Card className="bg-slate-800 border-slate-700 h-full flex flex-col hover:border-primary transition-colors">
                                <CardHeader>
                                    <div className="flex justify-center mb-4">
                                        <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center">
                                            <PiggyBank className="w-8 h-8 text-purple-400" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-center text-white">Mortgage Payoff Calculator</CardTitle>
                                    <CardDescription className="text-center text-slate-400">
                                        See how extra payments can save you thousands in interest.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-slate-300">
                                        Find out how much sooner you can own your home and the total interest you can save by making additional payments on your mortgage.
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedToolSection;
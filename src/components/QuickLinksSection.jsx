import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const quickLinks = [
    { text: "Planning a road trip?", linkText: "Gas Cost Calculator", path: "/other/fuel-cost-calculator" },
    { text: "Buying a new car?", linkText: "Auto Loan Calculator", path: "/financial/loan-calculator" },
    { text: "Checking your fitness?", linkText: "BMI & TDEE Calculators", path: "/health/bmi-calculator" },
    { text: "Need help with homework?", linkText: "Fraction Calculator", path: "/math/fraction-calculator" },
    { text: "Saving for the future?", linkText: "Savings Growth Calculator", path: "/financial/savings-calculator" },
    { text: "Paying off your mortgage?", linkText: "Mortgage Payoff Calculator", path: "/financial/mortgage-payoff-calculator" },
    { text: "Managing debt?", linkText: "DTI Ratio Calculator", path: "/financial/debt-to-income-ratio-calculator" },
    { text: "Planning a project?", linkText: "Concrete Calculator", path: "/other/concrete-calculator" }
];

const QuickLinksSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    };

    return (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
            >
                <Card className="bg-slate-800/40 border-slate-700/50">
                    <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl font-bold text-center text-primary">
                            Quick Links for Your Problems
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <motion.ul
                            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-lg"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {quickLinks.map((item, index) => (
                                <motion.li
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-baseline space-x-2 sm:space-x-3"
                                >
                                    <span className="text-slate-300">{item.text}</span>
                                    <span className="text-primary">→</span>
                                    <Link
                                        to={item.path}
                                        className="text-primary font-semibold hover:underline flex-shrink-0"
                                    >
                                        {item.linkText}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    );
};

export default QuickLinksSection;
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const KeywordOptimizedTextBlock = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, ease: "easeOut" }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    return (
        <motion.section
            className="max-w-6xl mx-auto px-4 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <Card className="bg-slate-800/40 border-slate-700/50">
                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl font-bold text-center text-primary">
                        Answering Your Specific Questions
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-slate-300 text-justify">
                    <motion.p variants={itemVariants}>
                        Need to plan your <strong>finances</strong>? Use our{' '}
                        <Link to="/financial/loan-calculator" aria-label="Auto Loan Payment Calculator" className="text-primary hover:underline">
                            auto loan payment calculator with trade-in
                        </Link>{' '}
                        to see what you can afford. Or, use the{' '}
                        <Link to="/financial/mortgage-payoff-calculator" aria-label="Mortgage Payoff Calculator" className="text-primary hover:underline">
                            mortgage payoff calculator with extra principal payments
                        </Link>{' '}
                        to save on <strong>interest payments</strong>. For long-term planning, try our{' '}
                        <Link to="/financial/savings-calculator" aria-label="Retirement Savings Calculator" className="text-primary hover:underline">
                            retirement savings calculator
                        </Link>.
                    </motion.p>

                    <motion.p variants={itemVariants}>
                        Assess your <strong>financial health</strong> with tools like the{' '}
                        <Link to="/financial/debt-to-income-ratio-calculator" aria-label="Debt-to-Income Ratio Calculator" className="text-primary hover:underline">
                            debt-to-income ratio calculator
                        </Link>{' '}
                        to see if you qualify for renting or home loans. Investors can also{' '}
                        <Link to="/financial/simple-interest-calculator" aria-label="Simple Interest Calculator" className="text-primary hover:underline">
                            calculate simple interest
                        </Link>{' '}
                        on earnings to make smarter decisions.
                    </motion.p>

                    <motion.p variants={itemVariants}>
                        On your <strong>fitness journey</strong>, our{' '}
                        <Link to="/health/tdee-calculator" aria-label="TDEE Calculator for Weight Loss" className="text-primary hover:underline">
                            TDEE calculator for weight loss (cutting)
                        </Link>{' '}
                        helps plan daily calories. If bulking, track macros and calorie intake with the same tool. Monitor your <strong>BMI</strong> with our{' '}
                        <Link to="/health/bmi-calculator" aria-label="BMI Calculator for Adults" className="text-primary hover:underline">
                            BMI calculator
                        </Link>{' '}
                        to stay on track.
                    </motion.p>

                    <motion.p variants={itemVariants}>
                        Solve <strong>everyday problems</strong> like calculating your{' '}
                        <Link to="/other/age-calculator" aria-label="Age Calculator" className="text-primary hover:underline">
                            age from date of birth
                        </Link>, or handle complex math with our{' '}
                        <Link to="/math/triangle-calculator" aria-label="Triangle Calculator" className="text-primary hover:underline">
                            triangle calculator
                        </Link>{' '}
                        for sides, angles, and area. All tools are designed for your <strong>specific needs</strong>.
                    </motion.p>
                </CardContent>
            </Card>
        </motion.section>
    );
};

export default KeywordOptimizedTextBlock;
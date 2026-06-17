import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';

const SalaryNegotiationGuide = () => {
    return (
        <>
            <Seo
                title="Understanding Your Salary and Net Pay | CalcZoon Blog"
                description="A comprehensive look at gross pay, net pay, taxes, and how to use salary calculators to negotiate better compensation packages."
                canonicalUrl="/blog/salary-negotiation-guide"
            />
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to all articles
                </Link>

                <article>
                    <header className="mb-10">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                            Understanding Your Salary and Net Pay
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm mb-8">
                            <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-primary" />
                                <span>CalcZoon Editorial Team</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-primary" />
                                <span>June 2026</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-primary" />
                                <span>5 min read</span>
                            </div>
                        </div>

                        <div className="relative rounded-2xl overflow-hidden mb-12 shadow-2xl">
                            <img 
                                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80" 
                                alt="Understanding Your Salary and Net Pay" 
                                className="w-full h-64 md:h-96 object-cover"
                            />
                        </div>
                    </header>

                    <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80">
                        <p className="text-xl text-slate-300 leading-relaxed mb-8 border-l-4 border-primary pl-6">
                            A comprehensive look at gross pay, net pay, taxes, and how to use salary calculators to negotiate better compensation packages.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">Gross Pay vs. Net Pay</h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            When you receive a job offer, the salary quoted is your Gross Pay—the amount before any taxes or deductions are taken out. Your Net Pay (or take-home pay) is what actually lands in your bank account. The difference between these two numbers can be substantial, often ranging from 20% to 40% depending on your tax bracket.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">Hidden Deductions</h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Beyond federal and state income taxes, your paycheck may be reduced by Social Security, Medicare, health insurance premiums, and 401(k) contributions. Understanding these deductions is crucial when budgeting. Our Salary Calculator helps you break down your hourly, weekly, monthly, and annual income so you know exactly what to expect.
                        </p>
                        
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 my-8">
                            <h3 className="text-xl font-bold text-white mb-2">Pro Tip 💡</h3>
                            <p className="text-slate-300 text-sm">
                                Always use a reliable calculator to double-check your figures. Financial planning relies heavily on accurate mathematical models. Our free tools on CalcZoon are designed to provide institutional-grade accuracy.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">Negotiating with Confidence</h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Knowledge is power. When heading into a salary negotiation, know the market rate for your position and understand how a $5,000 raise translates to your actual monthly take-home pay. Sometimes, negotiating for better benefits (like a higher employer 401(k) match or fully paid health insurance) can be more lucrative than a slight bump in base salary.
                        </p>
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-800">
                        <RelatedTools />
                    </div>
                </article>
            </div>
        </>
    );
};

export default SalaryNegotiationGuide;

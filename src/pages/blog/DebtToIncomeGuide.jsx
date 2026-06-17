import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';

const DebtToIncomeGuide = () => {
    return (
        <>
            <Seo
                title="Mastering Your Debt-to-Income Ratio | CalcZoon Blog"
                description="Learn what the Debt-to-Income (DTI) ratio is, why lenders care about it, and actionable strategies to lower your DTI and improve financial health."
                canonicalUrl="/blog/debt-to-income-guide"
            />
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to all articles
                </Link>

                <article>
                    <header className="mb-10">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                            Mastering Your Debt-to-Income Ratio
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
                                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80" 
                                alt="Mastering Your Debt-to-Income Ratio" 
                                className="w-full h-64 md:h-96 object-cover"
                            />
                        </div>
                    </header>

                    <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80">
                        <p className="text-xl text-slate-300 leading-relaxed mb-8 border-l-4 border-primary pl-6">
                            Learn what the Debt-to-Income (DTI) ratio is, why lenders care about it, and actionable strategies to lower your DTI and improve financial health.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">What is a Debt-to-Income Ratio?</h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Your Debt-to-Income (DTI) ratio compares your total monthly debt payments to your gross monthly income. It is one of the most critical metrics lenders use to determine your borrowing risk. A high DTI indicates that you are over-leveraged, while a low DTI shows that you have plenty of disposable income to handle new debt.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">Why Lenders Care</h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Mortgage lenders generally look for a DTI of 36% or less, though some programs allow up to 43%. If your DTI is too high, you may be denied a loan or forced to accept a higher interest rate. This metric is arguably as important as your credit score when applying for a mortgage or a large personal loan.
                        </p>
                        
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 my-8">
                            <h3 className="text-xl font-bold text-white mb-2">Pro Tip 💡</h3>
                            <p className="text-slate-300 text-sm">
                                Always use a reliable calculator to double-check your figures. Financial planning relies heavily on accurate mathematical models. Our free tools on CalcZoon are designed to provide institutional-grade accuracy.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">How to Lower Your DTI</h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            There are only two ways to lower your DTI: decrease your debt or increase your income. Focus on paying off high-interest credit cards using the snowball or avalanche method. Avoid taking on new debt before applying for a mortgage. Use our DTI Calculator to see where you stand today and plan your debt reduction strategy.
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

export default DebtToIncomeGuide;

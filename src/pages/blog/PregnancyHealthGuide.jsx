import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';

const PregnancyHealthGuide = () => {
    return (
        <>
            <Seo
                title="Navigating Your Pregnancy Timeline | CalcZoon Blog"
                description="Understand the three trimesters of pregnancy, key developmental milestones, and how to accurately calculate your estimated due date."
                canonicalUrl="/blog/pregnancy-health-guide"
            />
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to all articles
                </Link>

                <article>
                    <header className="mb-10">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                            Navigating Your Pregnancy Timeline
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
                                src="https://images.unsplash.com/photo-1517409217646-cda1532f628c?auto=format&fit=crop&w=1200&q=80" 
                                alt="Navigating Your Pregnancy Timeline" 
                                className="w-full h-64 md:h-96 object-cover"
                            />
                        </div>
                    </header>

                    <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80">
                        <p className="text-xl text-slate-300 leading-relaxed mb-8 border-l-4 border-primary pl-6">
                            Understand the three trimesters of pregnancy, key developmental milestones, and how to accurately calculate your estimated due date.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">Calculating Your Due Date</h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            A standard pregnancy lasts about 40 weeks, or 280 days, from the first day of your last menstrual period (LMP). While only about 5% of babies are born exactly on their estimated due date, having an accurate calculation helps healthcare providers track fetal development and schedule important screenings.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">The Three Trimesters</h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Pregnancy is divided into three trimesters. The first trimester (Weeks 1-12) is a period of rapid development and often brings morning sickness. The second trimester (Weeks 13-26) is usually more comfortable and is when you might feel the baby move for the first time. The third trimester (Weeks 27-40) is focused on the baby gaining weight and preparing for birth.
                        </p>
                        
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 my-8">
                            <h3 className="text-xl font-bold text-white mb-2">Pro Tip 💡</h3>
                            <p className="text-slate-300 text-sm">
                                Always use a reliable calculator to double-check your figures. Financial planning relies heavily on accurate mathematical models. Our free tools on CalcZoon are designed to provide institutional-grade accuracy.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">Staying Healthy</h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Nutrition and hydration are paramount during pregnancy. You'll need extra folic acid, iron, and calcium. Use our Water Intake Calculator to ensure you are staying hydrated, and consult with your doctor about prenatal vitamins. Our Pregnancy Due Date calculator can help you track exactly where you are in your journey.
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

export default PregnancyHealthGuide;

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, ShieldCheck, CheckCircle2, Award, Cpu, BookOpen, Users } from 'lucide-react';
import Seo from '@/components/Seo';

const AboutPage = () => {
    return (
        <>
            <Seo
                title="About CalcZoon - Who We Are, Our Mission & Verification Process"
                description="Learn who runs CalcZoon, why our free online calculator platform exists, and the rigorous mathematical and editorial processes we use to build and verify every calculator."
                canonicalUrl="/about"
            />
            <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
                        Transparent & Independent
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        About <span className="text-primary">CalcZoon</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                        Who runs CalcZoon, why our platform exists, and how our calculators are built and rigorously verified.
                    </p>
                </motion.div>

                {/* Section 1: Why CalcZoon Exists */}
                <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-8 md:p-10 shadow-xl mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-primary/20 rounded-xl">
                            <Target className="h-7 w-7 text-primary" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Why CalcZoon Exists</h2>
                    </div>
                    <div className="space-y-4 text-slate-300 text-base md:text-lg leading-relaxed">
                        <p>
                            Every day, millions of people search the web for essential calculations: <em>"What will my monthly mortgage payment be?"</em>, <em>"How many calories do I burn in a day?"</em>, or <em>"How much will my monthly SIP investment grow over 10 years?"</em>
                        </p>
                        <p>
                            Unfortunately, too many calculation websites on the internet today suffer from three fundamental problems:
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4 text-slate-300">
                            <li><strong className="text-white">Cluttered, intrusive user experiences:</strong> Blinding pop-ups, deceptive download buttons, and excessive ads that make simple tools difficult and frustrating to use.</li>
                            <li><strong className="text-white">Black-box formulas:</strong> Obscure calculation engines that show a number without explaining the underlying formula, variables, or methodology.</li>
                            <li><strong className="text-white">Outdated or unverified logic:</strong> Tools that have not been maintained to reflect modern clinical guidelines, updated financial conventions, or standard mathematical formulas.</li>
                        </ul>
                        <p>
                            <strong>CalcZoon was built to solve these problems.</strong> Our mission is to provide clean, lightning-fast, and 100% free calculation tools paired with deep, transparent educational explanations, real-world examples, and verified formulas. We believe numerical tools should empower users, not confuse them.
                        </p>
                    </div>
                </div>

                {/* Section 2: Who Runs CalcZoon */}
                <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-8 md:p-10 shadow-xl mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-primary/20 rounded-xl">
                            <Users className="h-7 w-7 text-primary" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Who Runs the Site</h2>
                    </div>
                    <div className="space-y-4 text-slate-300 text-base md:text-lg leading-relaxed">
                        <p>
                            CalcZoon is maintained by an independent team of software engineers, mathematical modeling specialists, and financial/wellness researchers. Our team is passionate about digital accessibility, precision engineering, and open educational tools.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 pt-4">
                            <div className="bg-slate-900/60 border border-slate-700/70 p-6 rounded-xl">
                                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                    <Award className="h-5 w-5 text-emerald-400" /> Editorial & Research Team
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Researches standard mathematical models, peer-reviewed clinical literature (such as WHO, CDC, and NIH guidelines for health tools), and authoritative banking/investment standards to document clear formulas and practical examples.
                                </p>
                            </div>
                            <div className="bg-slate-900/60 border border-slate-700/70 p-6 rounded-xl">
                                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                    <Cpu className="h-5 w-5 text-sky-400" /> Engineering & QA Team
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Implements reactive, accessible client-side algorithms using Next.js and React. Our engineers write rigorous unit tests to verify numerical accuracy against industry benchmark outputs down to the decimal point.
                                </p>
                            </div>
                        </div>
                        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl mt-6">
                            <h3 className="text-lg font-bold text-white mb-2">Publisher & Operator Information</h3>
                            <p className="text-slate-300 text-sm">
                                <strong>CalcZoon Ltd.</strong><br />
                                124 City Road, London, EC1V 2NX, United Kingdom<br />
                                General Inquiries: <a href="mailto:contact@calczoon.com" className="text-primary hover:underline">contact@calczoon.com</a> | Editorial Inquiries: <a href="mailto:support@calczoon.com" className="text-primary hover:underline">support@calczoon.com</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 3: How Our Calculators Are Built and Verified */}
                <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-8 md:p-10 shadow-xl mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-primary/20 rounded-xl">
                            <ShieldCheck className="h-7 w-7 text-primary" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">How Calculators Are Built and Verified</h2>
                    </div>
                    <p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed">
                        To ensure that every user receives trustworthy and reliable numbers, all calculators on CalcZoon pass through our strict 4-step verification framework:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">1</span>
                                <h3 className="text-lg font-bold text-white">Authoritative Formula Sourcing</h3>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                We source formulas exclusively from established, peer-reviewed, or institutional authorities. For instance, our BMI and TDEE tools use standard World Health Organization (WHO) classifications and the validated Mifflin-St Jeor equation. Financial tools utilize standard compound interest and amortization algorithms aligned with international banking norms.
                            </p>
                        </div>

                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">2</span>
                                <h3 className="text-lg font-bold text-white">Automated Benchmark Testing</h3>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Before any calculator goes live, its calculation engine is tested against verified benchmark datasets. We run automated test suites checking edge cases (e.g., zero interest, leap years, extreme inputs, boundary conditions) to ensure numerical consistency and avoid rounding errors.
                            </p>
                        </div>

                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">3</span>
                                <h3 className="text-lg font-bold text-white">Educational Context & Transparency</h3>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Every calculator page includes the mathematical formula in plain text, step-by-step solved examples, variable definitions, and frequently asked questions. We believe that showing <em>how</em> a calculation works is just as vital as giving the answer.
                            </p>
                        </div>

                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">4</span>
                                <h3 className="text-lg font-bold text-white">Periodic Audits & User Feedback</h3>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Calculations and documentation are periodically audited to ensure ongoing accuracy. When users submit feedback or suggest edge cases, our technical team investigates and updates our test suites immediately.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 4: Privacy & Technology */}
                <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50 mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <BookOpen className="h-6 w-6 text-primary" /> Client-Side Privacy & Modern Architecture
                    </h2>
                    <p className="text-slate-300 text-base leading-relaxed mb-4">
                        All mathematical operations on CalcZoon are performed <strong>client-side directly inside your web browser</strong>. When you input your income, loan amount, body weight, or personal numbers, that data is processed instantaneously on your device. We do not store, log, or sell the numbers you type into our calculators.
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        CalcZoon is built on Next.js 14 with Static Site Generation (SSG), React, and Tailwind CSS to guarantee sub-second page loads, zero server-latency calculations, and accessibility compliance with WCAG 2.1 AA, ADA, and UK Equality Act 2010 standards.
                    </p>
                </div>
            </div>
        </>
    );
};

export default AboutPage;

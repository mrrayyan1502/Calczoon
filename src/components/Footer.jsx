'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Home, Heart, Calculator, Info, Mail, Shield, Scale, AlertTriangle, FileText, Map, Rss } from 'lucide-react';

const Footer = () => {
    const year = new Date().getFullYear();

    const footerSections = [
        {
            title: "Calculators",
            links: [
                { text: "Financial Tools", href: "/financial-calculators", icon: <Calculator size={15} className="mr-2 text-emerald-400" /> },
                { text: "Health & Fitness", href: "/health-fitness-calculators", icon: <Heart size={15} className="mr-2 text-rose-400" /> },
                { text: "Math & Science", href: "/math-science-calculators", icon: <Calculator size={15} className="mr-2 text-sky-400" /> },
                { text: "Lifestyle & Everyday", href: "/lifestyle-everyday-calculators", icon: <Home size={15} className="mr-2 text-amber-400" /> },
            ]
        },
        {
            title: "Popular Tools",
            links: [
                { text: "Mortgage Calculator", href: "/financial/mortgage-calculator" },
                { text: "Loan Calculator", href: "/financial/loan-calculator" },
                { text: "BMI Calculator", href: "/health/bmi-calculator" },
                { text: "TDEE Calculator", href: "/health/tdee-calculator" },
                { text: "Percentage Calculator", href: "/math/percentage-calculator" },
            ]
        },
        {
            title: "Company",
            links: [
                { text: "About Us", href: "/about", icon: <Info size={15} className="mr-2 text-emerald-400" /> },
                { text: "Blog & Articles", href: "/blog", icon: <Rss size={15} className="mr-2 text-sky-400" /> },
                { text: "Contact Us", href: "/contact", icon: <Mail size={15} className="mr-2 text-amber-400" /> },
            ]
        },
        {
            title: "Legal & Disclaimers",
            links: [
                { text: "Privacy Policy", href: "/privacy", icon: <Shield size={15} className="mr-2 text-emerald-400" /> },
                { text: "Terms of Service", href: "/terms-of-service", icon: <Scale size={15} className="mr-2 text-sky-400" /> },
                { text: "Disclaimer", href: "/disclaimer", icon: <AlertTriangle size={15} className="mr-2 text-amber-400" /> },
                { text: "Sitemap", href: "/sitemap", icon: <Map size={15} className="mr-2 text-purple-400" /> },
                { text: "Scientific References", href: "/scientific-references", icon: <FileText size={15} className="mr-2 text-rose-400" /> },
            ]
        }
    ];

    const socialLinks = [
        { href: "https://twitter.com/calczoon", icon: Twitter, 'aria-label': 'Twitter' },
        { href: "https://www.linkedin.com/company/calczoon/", icon: Linkedin, 'aria-label': 'LinkedIn' },
        { href: "https://github.com/calczoon", icon: Github, 'aria-label': 'GitHub' },
    ];

    return (
        <footer className="bg-slate-950/80 border-t border-slate-800 text-slate-300 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-2 md:col-span-1 flex flex-col space-y-4">
                         <Link to="/" className="flex items-center space-x-2">
                            <img src="/calczoon-logo.png" alt="CalcZoon Logo" className="h-8 w-auto" width="800" height="400" loading="lazy" />
                            <span className="font-bold text-lg text-white">CalcZoon</span>
                        </Link>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Fast, free, and mathematically verified online calculators for finance, health, math, and everyday decision making.
                        </p>
                        <div className="text-xs text-slate-400">
                            <strong>CalcZoon Ltd.</strong><br />
                            124 City Road, London, EC1V 2NX<br />
                            <a href="mailto:contact@calczoon.com" className="hover:text-primary transition-colors">contact@calczoon.com</a>
                        </div>
                        <div className="flex space-x-4 pt-1">
                            {socialLinks.map((social, index) => (
                                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social['aria-label']} className="text-slate-400 hover:text-primary transition-colors">
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-slate-200 text-sm mb-4">{section.title}</h3>
                            <ul className="space-y-2.5">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link to={link.href} className="hover:text-primary transition-colors text-xs text-slate-400 flex items-center">
                                            {link.icon} {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Notice & Copyright */}
                <div className="mt-12 pt-8 border-t border-slate-800/80 text-center space-y-2 text-xs text-slate-400">
                    <p className="max-w-3xl mx-auto leading-relaxed">
                        <strong>Disclaimer:</strong> Results and tools on CalcZoon are provided for informational and educational purposes only. They do not constitute financial, investment, legal, tax, or medical advice. Always consult a qualified professional before making major financial or health decisions.
                    </p>
                    <p>&copy; {year} CalcZoon Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
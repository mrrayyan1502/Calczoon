import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Home, Heart, Calculator, Info, Mail, HeartHandshake as Handshake, Shield, FileText, Map, Rss } from 'lucide-react';

const Footer = () => {
    const year = new Date().getFullYear();

    const footerSections = [
        {
            title: "Calculators",
            links: [
                { text: "Health & Fitness", href: "/health-fitness-calculators", icon: <Heart size={16} className="mr-2" /> },
                { text: "Financial", href: "/financial-calculators", icon: <Calculator size={16} className="mr-2" /> },
                { text: "Math & Science", href: "/math-science-calculators", icon: <Calculator size={16} className="mr-2" /> },
                { text: "Lifestyle & Everyday", href: "/lifestyle-everyday-calculators", icon: <Home size={16} className="mr-2" /> },
            ]
        },
        {
            title: "Quick Links",
            links: [
                { text: "BMI Calculator", href: "/health/bmi-calculator" },
                { text: "TDEE Calculator", href: "/health/tdee-calculator" },
                { text: "Loan Calculator", href: "/financial/loan-calculator" },
                { text: "Compound Interest", href: "/financial/compound-interest-calculator" },
                { text: "Triangle Area Calculator", href: "/math/triangle-calculator" },
            ]
        },
        {
            title: "Company",
            links: [
                { text: "About Us", href: "/about", icon: <Info size={16} className="mr-2" /> },
                { text: "Blog", href: "/blog", icon: <Rss size={16} className="mr-2" /> },
                { text: "Contact", href: "/contact", icon: <Mail size={16} className="mr-2" /> },
            ]
        },
        {
            title: "Legal & Info",
            links: [
                { text: "Privacy Policy", href: "/privacy" },
                { text: "Terms & Conditions", href: "/terms-and-conditions" },
                { text: "Disclaimer", href: "/disclaimer" },
                { text: "Sitemap", href: "/sitemap", icon: <Map size={16} className="mr-2" /> },
                { text: "Scientific References", href: "/scientific-references", icon: <FileText size={16} className="mr-2" /> },
            ]
        }
    ];

    const socialLinks = [
        { href: "https://twitter.com/calczoon", icon: Twitter, 'aria-label': 'Twitter' },
        { href: "https://www.linkedin.com/company/calczoon/", icon: Linkedin, 'aria-label': 'LinkedIn' },
        { href: "https://github.com/calczoon", icon: Github, 'aria-label': 'GitHub' },
    ];

    return (
        <footer className="bg-slate-950/70 border-t border-slate-800 text-slate-300 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-2 md:col-span-1 flex flex-col space-y-4">
                         <Link to="/" className="flex items-center space-x-2">
                            <img src="/calczoon-logo.png" alt="CalcZoon Logo" className="h-8 w-auto"  width="800" height="400" loading="lazy" />
                            <span className="font-bold text-lg text-white">CalcZoon</span>
                        </Link>
                        <p className="text-sm">
                            Your go-to source for precise and easy-to-use online calculators.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            {socialLinks.map((social, index) => (
                                <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social['aria-label']} className="text-slate-300 hover:text-primary transition-colors">
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-slate-200 mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link to={link.href} className="hover:text-primary transition-colors text-sm flex items-center">
                                            {link.icon} {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
                    <p>&copy; {year} CalcZoon. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
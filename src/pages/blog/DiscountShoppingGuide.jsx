import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';

const DiscountShoppingGuide = () => {
    return (
        <>
            <Seo
                title="The Math of Smart Shopping | CalcZoon Blog"
                description="Learn how to calculate true discounts, stack coupons, and ensure you're getting the best possible deal during sales events like Black Friday."
                canonicalUrl="/blog/discount-shopping-guide"
            />
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to all articles
                </Link>

                <article>
                    <header className="mb-10">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                            The Math of Smart Shopping
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
                                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80" 
                                alt="The Math of Smart Shopping" 
                                className="w-full h-64 md:h-96 object-cover"
                            />
                        </div>
                    </header>

                    <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-primary hover:prose-a:text-primary/80">
                        <p className="text-xl text-slate-300 leading-relaxed mb-8 border-l-4 border-primary pl-6">
                            Learn how to calculate true discounts, stack coupons, and ensure you're getting the best possible deal during sales events like Black Friday.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">The Illusion of Discounts</h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Retailers often use psychological pricing and complex discount structures to make deals seem better than they are. A 'Buy One Get One 50% Off' deal is actually just a 25% discount if the items are identically priced. Understanding the underlying math helps you see past the marketing and evaluate the true value of a sale.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">Stacking Discounts</h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            When a store offers 20% off already reduced clearance items, you cannot simply add the percentages together. A 50% initial discount followed by an additional 20% off at the register results in a 60% total discount, not 70%. Our Discount Calculator lets you input multiple discount layers to reveal your final price instantly.
                        </p>
                        
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 my-8">
                            <h3 className="text-xl font-bold text-white mb-2">Pro Tip 💡</h3>
                            <p className="text-slate-300 text-sm">
                                Always use a reliable calculator to double-check your figures. Financial planning relies heavily on accurate mathematical models. Our free tools on CalcZoon are designed to provide institutional-grade accuracy.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-6">Sales Tax Considerations</h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Don't forget that sales tax is typically applied to the final discounted price, not the original retail price. Factoring in local taxes is essential for staying within your budget. By using our tools while you shop, you can make informed purchasing decisions and maximize your savings.
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

export default DiscountShoppingGuide;

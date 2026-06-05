import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';

const FeaturedToolSection = () => {
    return (
        <section className="max-w-4xl mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
            >
                <Card className="bg-gradient-to-br from-primary/20 via-slate-800/50 to-slate-800/50 border-primary/30">
                    <div className="grid md:grid-cols-3 items-center">
                        <div className="p-8 md:col-span-2">
                            <CardHeader className="p-0 mb-4">
                                <CardTitle className="text-2xl md:text-3xl font-bold text-white">Featured Calculator</CardTitle>
                                <CardDescription className="text-primary font-semibold">TDEE Calculator for Weight Loss (Cutting)</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <p className="text-slate-300 mb-6">Find your daily calorie needs to create a successful cutting phase and achieve your weight loss goals.</p>
                                <Button asChild size="lg">
                                    <Link to="/health/tdee-calculator">Use Tool →</Link>
                                </Button>
                            </CardContent>
                        </div>
                        <div className="hidden md:flex items-center justify-center p-8">
                             <Target className="w-24 h-24 text-primary/50" strokeWidth={1} />
                        </div>
                    </div>
                </Card>
            </motion.div>
        </section>
    );
};

export default FeaturedToolSection;
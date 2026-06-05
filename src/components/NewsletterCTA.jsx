import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const NewsletterCTA = () => {
    const { toast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "Thank You!",
            description: "You've been subscribed to our newsletter.",
        });
        e.target.reset();
    };

    return (
        <section className="py-12 md:py-20 bg-slate-900/50 rounded-xl">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                    Subscribe to our newsletter for the latest updates on new calculators, features, and financial tips.
                </p>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
                    <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        required 
                        className="bg-slate-800 border-slate-700 text-white flex-grow"
                    />
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                        Subscribe
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default NewsletterCTA;
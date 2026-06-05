import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link as LinkIcon, Newspaper, Zap } from 'lucide-react';

const featuredItems = [
  {
    source: 'TechCrunch (Fictional)',
    title: 'Calczoon Simplifies Complex Math for Everyone',
    link: '#',
    description: 'A glowing review of our mission to make calculation tools accessible and easy to use for a global audience.'
  },
  {
    source: 'Health & Fitness Weekly (Fictional)',
    title: 'The Best Online Tools for Your Fitness Journey',
    link: '#',
    description: 'Our TDEE and Macro calculators were highlighted as top-tier tools for anyone serious about their health goals.'
  },
  {
    source: 'The Financial Post (Fictional)',
    title: 'Planning Your Finances? These Free Tools Can Help',
    link: '#',
    description: 'Calczoon was featured for its comprehensive suite of financial calculators, empowering users to make smarter money decisions.'
  }
];

const Featured = () => {
  return (
    <>
      <Helmet>
        <title>Featured In – As Seen On | Calczoon</title>
        <meta name="description" content="See where Calczoon.com has been featured and recognized. We're proud of our mentions in tech, finance, and health publications." />
        <link rel="canonical" href="https://calczoon.com/featured-in" />
        <meta property="og:title" content="Featured In – As Seen On | Calczoon" />
        <meta property="og:description" content="See where Calczoon.com has been featured and recognized by industry publications." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 px-4"
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">As Featured In</h1>
            <p className="text-slate-300 text-lg mt-2">We're honored to be recognized by these amazing publications.</p>
          </CardHeader>
          <CardContent className="space-y-8 text-slate-200 leading-relaxed px-4 md:px-8 py-6">
            
            <div className="space-y-6">
              {featuredItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-slate-800/40 p-6 rounded-lg border border-slate-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                    <Newspaper className="mr-3 text-primary" />
                    {item.source}
                  </h3>
                  <p className="font-bold text-slate-200">"{item.title}"</p>
                  <p className="text-slate-400 mt-2">{item.description}</p>
                  <a href={item.link} className="text-primary hover:underline flex items-center gap-2 mt-4 text-sm">
                    Read More <LinkIcon size={14} />
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-slate-700"></div>

            <section className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Want to Feature Us?</h2>
              <p className="text-slate-300 mb-4">We're always excited to collaborate with publications and partners who share our vision. <br/>For media inquiries, please reach out via our contact page.</p>
              <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90">
                 <Zap className="mr-2" /> Contact Us
              </a>
            </section>
          
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Featured;
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, UserPlus, Award } from 'lucide-react';

const features = [
  { icon: <Zap className="w-8 h-8 text-primary" />, title: 'Fast & Accurate', description: 'Get instant, reliable results you can trust.' },
  { icon: <ShieldCheck className="w-8 h-8 text-primary" />, title: '100% Private', description: 'Your data is never stored or shared. All calculations are done in your browser.' },
  { icon: <UserPlus className="w-8 h-8 text-primary" />, title: 'No Sign-up Required', description: 'Access all tools instantly without creating an account.' },
  { icon: <Award className="w-8 h-8 text-primary" />, title: 'Completely Free', description: 'Enjoy a premium, ad-free experience at no cost.' },
];

const FeaturesSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4">
       <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Calczoon?</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-5 rounded-full bg-slate-800">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-slate-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
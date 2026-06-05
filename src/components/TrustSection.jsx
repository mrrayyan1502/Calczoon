import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Globe } from 'lucide-react';

const TrustSection = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 text-center">
      <motion.div
        className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 md:p-12"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          The Last Calculator You'll Ever Need
        </h2>
        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          We've meticulously built and tested every tool to provide you with results you can trust. Our commitment is to empower students, professionals, and curious minds with high-quality, accessible calculators for any task.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="inline-flex items-center gap-3 bg-primary/10 text-primary font-semibold px-6 py-3 rounded-full">
            <CheckCircle className="h-6 w-6" />
            <span>Guaranteed Accuracy</span>
          </div>
          <div className="inline-flex items-center gap-3 bg-primary/10 text-primary font-semibold px-6 py-3 rounded-full">
            <Globe className="h-6 w-6" />
            <span>Trusted by Users Worldwide</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TrustSection;
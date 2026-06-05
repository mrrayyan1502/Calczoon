import React, { memo } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from 'framer-motion';

const Faq = ({ items, className }) => {
  if (!items || items.length === 0) {
    return null;
  }

  // NOTE: This component is purely PRESENTATIONAL.
  // It does NOT inject JSON-LD schema to avoid "duplicate FAQPage" errors.
  // Schema MUST be handled by the parent page component using Helmet/Seo component.

  return (
    <motion.div
      className={`max-w-3xl mx-auto px-4 ${className || ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">Frequently Asked Questions</h2>
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-2 md:p-4">
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="border-b border-slate-700/80 last:border-b-0">
              <AccordionTrigger className="text-left font-semibold text-lg text-slate-100 hover:no-underline p-5">
                <span>{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="p-5 pt-0 text-slate-300">
                <div>{item.answer}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.div>
  );
};

export default memo(Faq);
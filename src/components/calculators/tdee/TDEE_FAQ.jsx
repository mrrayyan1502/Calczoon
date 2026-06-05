import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const TDEE_FAQ = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="mb-12">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
        <CardHeader>
          <h2 className="text-white text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-400" />
            Frequently Asked Questions
          </h2>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border-b-slate-700">
                <AccordionTrigger className="text-left text-white hover:no-underline font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-300 pt-2 prose prose-invert prose-sm max-w-none">
                  <p>{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
};

export default TDEE_FAQ;
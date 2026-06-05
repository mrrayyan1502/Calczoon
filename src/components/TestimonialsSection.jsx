import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah J.',
    title: 'Financial Planner',
    testimonial: "Calczoon's loan and mortgage calculators are a lifesaver! I use them daily with my clients to quickly illustrate financial scenarios. They are intuitive, accurate, and save me so much time.",
    avatar: "👩‍💼"
  },
  {
    name: 'Mike R.',
    title: 'Fitness Coach',
    testimonial: "The TDEE and Macro calculators are my go-to tools for creating nutrition plans. My clients love how easy it is to understand their calorie and macro needs.",
    avatar: "💪"
  },
  {
    name: 'Emily T.',
    title: 'University Student',
    testimonial: "As a math student, the Fraction and Statistics calculators are invaluable. They help me double-check my homework and understand complex concepts. It's like having a personal tutor.",
    avatar: "🎓"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
        Loved by Professionals & Students Worldwide
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-slate-800/40 border-slate-700/50 h-full flex flex-col p-6">
              <CardContent className="flex-grow p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 italic">"{item.testimonial}"</p>
              </CardContent>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-2xl">
                  {item.avatar}
                </div>
                <div>
                  <p className="font-bold text-white">{item.name}</p>
                  <p className="text-sm text-primary">{item.title}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
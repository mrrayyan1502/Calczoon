import React from 'react';
import { motion } from 'framer-motion';

const SeoTextBlock = () => {
  return (
    <motion.section
      className="max-w-4xl mx-auto px-4 text-slate-300 text-sm leading-relaxed"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
    >
      <div className="space-y-4 text-center border-t border-slate-800 pt-12">
        <p>
          Welcome to Calczoon, the premier destination for free online calculators designed to simplify your life. Our finance calculator website offers a comprehensive suite of tools, including robust mortgage calculators and loan estimators to help you manage your financial health. Whether you're planning for a new home or tracking your investments, our tools provide the clarity you need.
        </p>
        <p>
          For those focused on well-being, our collection of health and fitness tools is second to none. Easily track your fitness journey with our popular BMI calculator and TDEE calculator. These resources help you understand your body's needs, making it easier to achieve your diet and weight loss goals. We also provide specialized tools like pregnancy due date calculators for expecting parents. Our goal is to be your trusted partner in health and fitness.
        </p>
        <p>
          Beyond finance and health, Calczoon is home to a wide array of utility calculators. Quickly find your precise age with our age calculator, calculate your academic standing with the GPA calculator, or even estimate travel costs with the fuel cost calculator. Every tool on our platform is built for accuracy and ease of use, making Calczoon the ultimate resource for all your calculation needs.
        </p>
      </div>
    </motion.section>
  );
};

export default SeoTextBlock;
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutSection = () => (
  <section className="max-w-4xl mx-auto px-4 text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        About CalcZoon
      </h2>
      <p className="text-lg text-slate-300 leading-relaxed mb-8">
        Our mission is to become the internet's best collection of free, easy-to-use online calculators.
        We provide working calculators for every need—finance, health, mathematics, science, and everyday life.
        Each calculator page is not just a tool, but a complete guide to help you understand the concepts behind the numbers.
      </p>
      <Button asChild>
        <Link to="/about">Learn More About Our Mission</Link>
      </Button>
    </motion.div>
  </section>
);

export default AboutSection;
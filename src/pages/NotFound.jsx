import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Seo from '@/components/Seo';

const NotFound = () => {
  return (
    <>
      <Seo
        title="404 - Page Not Found"
        description="The page you are looking for does not exist or has been moved."
        canonicalUrl="/404"
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center h-full py-20"
      >
        <AlertTriangle className="w-24 h-24 text-primary mb-6" />
        <h1 className="text-6xl font-bold text-white mb-2">404</h1>
        <h2 className="text-3xl font-semibold text-slate-200 mb-4">Page Not Found</h2>
        <p className="text-lg text-slate-300 mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Button asChild size="lg">
          <Link to="/">Go Back to Homepage</Link>
        </Button>
      </motion.div>
    </>
  );
};

export default NotFound;
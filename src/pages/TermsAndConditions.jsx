import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import Seo from '@/components/Seo';

const TermsAndConditions = () => {
  return (
    <>
      <Seo
        title="Terms and Conditions - CalcZoon"
        description="Read the Terms and Conditions for using CalcZoon.com. Understand your rights and responsibilities when using our free online calculators."
        canonical="https://calczoon.com/terms-and-conditions"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 px-4"
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-slate-800">
                <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Terms and Conditions</h1>
            <p className="text-slate-300 text-lg mt-2">Rules for Using Our Website</p>
          </CardHeader>
          <CardContent className="space-y-6 text-slate-200 leading-relaxed px-4 md:px-8 py-6">
            <p><strong>Last Updated: {new Date('2025-11-13').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
            <p>Welcome to CalcZoon.com. By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the below, please do not use this site.</p>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">1. Use of Website</h2>
              <p>This website and its components are offered for informational purposes only. This site shall not be responsible or liable for the accuracy, usefulness, or availability of any information transmitted or made available via the site, and shall not be responsible or liable for any error or omissions in that information.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">2. Intellectual Property</h2>
              <p>The Site and its original content, features, and functionality are owned by CalcZoon.com and are protected by international copyright, trademark, and other intellectual property or proprietary rights laws. You may not reproduce, distribute, or create derivative works from any part of the website without express written permission.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">3. Disclaimer of Warranties</h2>
              <p>The tools and information on CalcZoon.com are provided "as is." We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property. For more details, please see our full <Link to="/disclaimer" className="text-primary hover:underline">Disclaimer</Link>.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">4. Limitation of Liability</h2>
              <p>In no event shall CalcZoon.com or its owners be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we have been notified orally or in writing of the possibility of such damage.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">5. Governing Law</h2>
              <p>Any claim relating to CalcZoon.com's website shall be governed by the laws of the jurisdiction of the website owner's residence without regard to its conflict of law provisions.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">6. Changes to Terms</h2>
              <p>We reserve the right to modify these terms and conditions at any time. We will notify users of any changes by posting the new terms on this page. Your decision to continue to visit and make use of the Site after such changes have been made constitutes your formal acceptance of the new Terms and Conditions.</p>
            </div>

            <p className="text-center text-slate-400 pt-4">For any questions about these terms, please <Link to="/contact" className="text-primary hover:underline">contact us</Link>.</p>

          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default TermsAndConditions;
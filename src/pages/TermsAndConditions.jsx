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
        description="Read the Terms and Conditions for using CalcZoon. Understand your rights and responsibilities when using our free online calculators."
        canonical="https://calczoon.com/terms-and-conditions"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 px-4"
      >
        <Card className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <CardHeader className="text-center bg-slate-800/20 border-b border-slate-700/30 p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <FileText className="h-8 w-8 text-emerald-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Terms and Conditions</h1>
            <p className="text-slate-400 text-sm mt-2">Last Updated: June 5, 2026</p>
          </CardHeader>
          <CardContent className="space-y-6 text-slate-300 leading-relaxed px-6 md:px-10 py-8">
            <p>Welcome to <strong>CalcZoon</strong>. By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this site.</p>
            
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">1. Use of Website</h2>
              <p className="text-slate-400 text-sm">This website and its calculator components are offered for informational and educational purposes only. This site shall not be responsible or liable for the accuracy, usefulness, or availability of any calculations transmitted or made available via the site, and shall not be responsible or liable for any error or omissions in that information.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">2. Intellectual Property</h2>
              <p className="text-slate-400 text-sm">The Site and its original content, features, layout, and functionality are owned by CalcZoon and are protected by international copyright, trademark, and other intellectual property or proprietary rights laws. You may not reproduce, distribute, or create derivative works from any part of the website without express written permission.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">3. Disclaimer of Warranties</h2>
              <p className="text-slate-400 text-sm">The tools and information on this site are provided "as is" and "as available." We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property. For more details, please see our full <Link to="/disclaimer" className="text-emerald-400 hover:underline font-semibold">Disclaimer</Link>.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">4. Limitation of Liability</h2>
              <p className="text-slate-400 text-sm">In no event shall CalcZoon, its owners, or developers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we have been notified orally or in writing of the possibility of such damage. Some jurisdictions do not allow limitations on implied warranties or limitations of liability, so these limitations may not apply to you.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">5. Governing Law & Consumer Protection</h2>
              <p className="text-slate-400 text-sm">Any claims relating to this website shall be governed by the laws of the jurisdiction of the website owner's residence. However, if you are a consumer residing in the UK, European Union, or United States, you also benefit from any mandatory provisions of the law of the country in which you are resident, and nothing in these terms affects your statutory consumer rights.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">6. Accessibility Commitment</h2>
              <p className="text-slate-400 text-sm">We are committed to providing a website that is accessible to the widest possible audience, regardless of technology or ability. We actively work to align our services with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, in compliance with the Americans with Disabilities Act (ADA) in the US and the Equality Act 2010 in the UK. By using this website, you agree to report any accessibility barriers you experience directly to us, allowing us the opportunity to resolve them promptly.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">7. Changes to Terms</h2>
              <p className="text-slate-400 text-sm">We reserve the right to modify these terms and conditions at any time. We will notify users of any changes by posting the new terms on this page. Your decision to continue to visit and make use of the Site after such changes have been made constitutes your formal acceptance of the new Terms and Conditions.</p>
            </div>

            <p className="text-center text-slate-400 pt-6 border-t border-slate-800">For any questions about these terms, please <Link to="/contact" className="text-emerald-400 hover:underline font-semibold">contact us</Link>.</p>

          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default TermsAndConditions;
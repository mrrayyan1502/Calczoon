import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie, BarChart3, FileText, Mail, Users, Accessibility } from 'lucide-react';
import Seo from '@/components/Seo';

const Privacy = () => {
  return (
    <>
      <Seo
        title="Privacy Policy - CalcZoon"
        description="Read the detailed GDPR and CCPA compliant Privacy Policy for CalcZoon. We explain our data practices, use of cookies, and commitment to user accessibility. Your trust and privacy are our top priorities."
        canonical="https://calczoon.com/privacy"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 px-4"
      >
        <Card className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <CardHeader className="text-center bg-slate-800/20 border-b border-slate-700/30 p-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Privacy Policy</h1>
            <p className="text-slate-300 text-sm mt-2">Last Updated: June 5, 2026</p>
          </CardHeader>
          <CardContent className="space-y-8 text-slate-300 leading-relaxed px-6 md:px-10 py-8">
            <p>Welcome to <strong>CalcZoon</strong>. We are deeply committed to protecting your privacy and handling your data in an open and transparent manner in compliance with regional regulations, including the UK General Data Protection Regulation (UK GDPR), the EU GDPR, and the California Consumer Privacy Act (CCPA) / California Privacy Rights Act (CPRA).</p>
            
            <p>Our core principle is simple: we build tools, not user tracking profiles. The calculations and numbers you enter into our tools are processed locally inside your browser and are never sent to or stored on our servers.</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-8 w-8 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-white">Information We Do Not Collect</h2>
                  <p className="text-slate-300 text-sm mt-1">We do not collect, store, or have access to any personally identifiable information (PII) you enter into our calculators. This includes financial details, health inputs, body dimensions, or mathematical variables. All calculations are executed client-side, meaning they happen directly on your device. Your data never leaves your computer.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Cookie className="h-8 w-8 text-sky-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-white">Cookies and Consent Management</h2>
                  <p className="text-slate-300 text-sm mt-1">We use cookies to analyze website traffic and optimize your user experience. We respect your choices and operate on a strict opt-in consent model for analytics cookies. When you first visit our site, non-essential cookies (such as Google Analytics) are blocked. They will only run if you click "Accept All" on our Cookie Consent banner. You can clear your consent or delete stored cookies at any time via your browser settings.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <BarChart3 className="h-8 w-8 text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-white">Google Analytics (GA4)</h2>
                  <p className="text-slate-300 text-sm mt-1">If you opt-in, we use Google Analytics to collect anonymous, aggregated traffic data (e.g. pageviews, button clicks, country level geography). This assists us in optimizing our tool performance. Google Analytics does not track PII or any data values entered into the calculators. IP addresses are anonymized automatically by Google before storage.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="h-8 w-8 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-white">US State Privacy Rights (CCPA / CPRA)</h2>
                  <p className="text-slate-300 text-sm mt-1">Under the California Consumer Privacy Act (CCPA) and the CPRA, California residents have the right to request access to categories of personal information collected, request deletion, and opt-out of the "sale" or "sharing" of personal data. <strong>We do not sell, rent, or trade your personal data to third parties.</strong> All third-party services on our site (such as analytics) are only loaded upon user consent.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FileText className="h-8 w-8 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-white">UK & EU GDPR Compliance</h2>
                  <p className="text-slate-300 text-sm mt-1">For users residing in the UK and EEA, your data rights under the GDPR are fully supported. You have the right to withdraw your consent to cookies at any time, request deletion of any email communication logs, and lodge a complaint with a supervisory authority (such as the UK Information Commissioner's Office - ICO). The only personal data we process is when you contact us via email, used solely for addressing your query.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Accessibility className="h-8 w-8 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-white">Accessibility & Global Compliance (ADA & UK Equality Act)</h2>
                  <p className="text-slate-300 text-sm mt-1">We are committed to ensuring digital accessibility for people with disabilities in accordance with the Americans with Disabilities Act (ADA) in the United States and the Equality Act 2010 in the United Kingdom. We continually improve the user experience for everyone, applying the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. If you encounter any accessibility barriers on our site, please let us know so we can resolve them.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="h-8 w-8 text-rose-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-white">Contact Information</h2>
                  <p className="text-slate-300 text-sm mt-1">If you have any questions or concerns about this Privacy Policy, or want to exercise your data rights, please contact us via our <Link to="/contact" className="text-emerald-400 hover:underline font-semibold">Contact Page</Link>.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Privacy;
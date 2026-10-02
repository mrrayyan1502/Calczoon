'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie, BarChart3, FileText, Mail, Users, Accessibility, Megaphone, Eye } from 'lucide-react';
import Seo from '@/components/Seo';

const Privacy = () => {
  return (
    <>
      <Seo
        title="Privacy Policy & Advertising Disclosure - CalcZoon"
        description="CalcZoon Privacy Policy, including Google AdSense disclosures, cookie management, third-party advertising disclosures, and GDPR/CCPA compliance details."
        canonical="https://calczoon.com/privacy"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      >
        <Card className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <CardHeader className="text-center bg-slate-800/30 border-b border-slate-700/40 p-8 md:p-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Transparency & Data Rights
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
              Privacy Policy & Advertising Disclosure
            </h1>
            <p className="text-slate-300 text-sm mt-3">Last Updated: October 2, 2026</p>
          </CardHeader>
          <CardContent className="space-y-8 text-slate-300 leading-relaxed px-6 md:px-10 py-8">
            <p className="text-base md:text-lg">
              Welcome to <strong>CalcZoon</strong> ("we", "our", or "us"). We believe in absolute transparency regarding how user data is handled. This Privacy Policy details our privacy practices, our use of cookies, third-party advertising disclosures (including Google AdSense), and how your rights are protected under UK GDPR, EU GDPR, and US State Privacy Laws (including California CCPA/CPRA).
            </p>

            <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-start gap-3">
              <ShieldCheck className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-200">
                <strong>Zero Tool-Data Storage:</strong> All calculations, inputs, and numbers you enter on CalcZoon (including financial balances, health metrics, and personal formulas) are processed entirely inside your browser (client-side). We do not transmit, log, or store your calculator inputs on any server.
              </p>
            </div>

            <div className="space-y-8 divide-y divide-slate-800/80">
              {/* Section 1: Google AdSense & Advertising */}
              <div className="pt-6 flex items-start gap-4">
                <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400 shrink-0 mt-1">
                  <Megaphone className="h-6 w-6" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-bold text-white">1. Google AdSense & Third-Party Advertising Disclosure</h2>
                  <p className="text-sm leading-relaxed">
                    To maintain our platform and keep all 24+ calculators 100% free for everyone, CalcZoon may display advertisements served by <strong>Google AdSense</strong> and authorized third-party ad networks.
                  </p>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/60 space-y-2 text-sm">
                    <p className="font-semibold text-white">Important Disclosures Regarding Google Advertising:</p>
                    <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300 text-xs md:text-sm">
                      <li><strong>Third-Party Vendors:</strong> Google, as a third-party vendor, uses cookies to serve advertisements on our site.</li>
                      <li><strong>DoubleClick DART Cookie:</strong> Google’s use of advertising cookies (including the DoubleClick cookie) enables it and its partners to serve targeted ads to our users based on their visits to CalcZoon and other websites across the Internet.</li>
                      <li><strong>Personalized vs. Non-Personalized Ads:</strong> Depending on your geographic location and cookie consent choices, ads may be personalized based on browsing history or non-personalized based on page context.</li>
                      <li><strong>Opting Out:</strong> Users may opt out of personalized advertising at any time by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300">Google Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300">www.aboutads.info</a> or <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300">Your Online Choices</a>.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 2: Cookies & Tracking Technologies */}
              <div className="pt-6 flex items-start gap-4">
                <div className="p-2.5 bg-sky-500/10 rounded-xl text-sky-400 shrink-0 mt-1">
                  <Cookie className="h-6 w-6" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-bold text-white">2. Cookies and Tracking Technologies</h2>
                  <p className="text-sm leading-relaxed">
                    A cookie is a small text file placed on your device. We categorize the cookies used on our website into:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-sm text-slate-300">
                    <li><strong>Essential / Technical Cookies:</strong> Required for the fundamental functionality of the website, such as remembering your theme preference (dark/light mode) or unit toggles (Metric vs. Imperial). These do not collect personal identifiers.</li>
                    <li><strong>Analytics Cookies (Google Analytics 4):</strong> Used with your consent to gather anonymous, aggregated statistics on how visitors interact with our calculators (e.g., page views, error counts, geographic region). IP addresses are anonymized.</li>
                    <li><strong>Advertising Cookies:</strong> Deployed by third-party advertising partners (such as Google AdSense) to measure ad performance, prevent ad fraud, and display relevant commercial messages.</li>
                  </ul>
                  <p className="text-xs text-slate-400">
                    You can manage or disable cookies at any time through your web browser preferences. Note that disabling essential cookies may impact certain interface toggles.
                  </p>
                </div>
              </div>

              {/* Section 3: Information We Do NOT Collect */}
              <div className="pt-6 flex items-start gap-4">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 shrink-0 mt-1">
                  <Eye className="h-6 w-6" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-bold text-white">3. Information We Do Not Collect</h2>
                  <p className="text-sm leading-relaxed">
                    CalcZoon does not require user registration or account creation to use any of our 24 calculators. We do not collect or store:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-sm text-slate-300">
                    <li>Your personal financial data (loan amounts, salaries, mortgage details, interest rates).</li>
                    <li>Your personal health statistics (weight, height, age, calorie targets, body measurements).</li>
                    <li>Your payment information or bank credentials.</li>
                  </ul>
                </div>
              </div>

              {/* Section 4: GDPR & CCPA Rights */}
              <div className="pt-6 flex items-start gap-4">
                <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 shrink-0 mt-1">
                  <Users className="h-6 w-6" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-bold text-white">4. User Rights (UK/EU GDPR & US CCPA/CPRA)</h2>
                  <p className="text-sm leading-relaxed">
                    Depending on where you reside, you possess specific legal rights over your personal data:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm">
                    <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50">
                      <h3 className="font-semibold text-white mb-1">UK & EU GDPR Rights</h3>
                      <p className="text-slate-300">Right of access, rectification, erasure, data portability, and the right to withdraw cookie consent at any time without penalty.</p>
                    </div>
                    <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50">
                      <h3 className="font-semibold text-white mb-1">California (CCPA/CPRA)</h3>
                      <p className="text-slate-300">Right to know what personal info is collected, request deletion, and opt-out of the sale/sharing of personal data. <strong>We do not sell personal data.</strong></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Data Controller Contact */}
              <div className="pt-6 flex items-start gap-4">
                <div className="p-2.5 bg-rose-500/10 rounded-xl text-rose-400 shrink-0 mt-1">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-bold text-white">5. Data Controller Contact Information</h2>
                  <p className="text-sm leading-relaxed">
                    If you have questions regarding this Privacy Policy, our advertising practices, or wish to exercise your data rights, please contact our designated Data Protection officer:
                  </p>
                  <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700 text-sm">
                    <p className="font-semibold text-white">CalcZoon Ltd. (Data Controller)</p>
                    <p className="text-slate-300">124 City Road, London, EC1V 2NX, United Kingdom</p>
                    <p className="text-slate-300">Email: <a href="mailto:contact@calczoon.com" className="text-primary hover:underline">contact@calczoon.com</a></p>
                    <p className="text-slate-300">Website: <Link to="/contact" className="text-primary hover:underline">calczoon.com/contact</Link></p>
                  </div>
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

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie, BarChart3, FileText, Mail, Users } from 'lucide-react';
import Seo from '@/components/Seo';

const Privacy = () => {
  return (
    <>
      <Seo
        title="Privacy Policy - CalcZoon"
        description="Read the detailed Privacy Policy for CalcZoon.com. We explain our data practices, use of cookies, and commitment to GDPR. Your trust and privacy are our top priorities."
        canonical="https://calczoon.com/privacy"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 px-4"
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Privacy Policy for CalcZoon.com</h1>
            <p className="text-slate-300 text-lg mt-2">Your Trust is Our Most Important Asset</p>
          </CardHeader>
          <CardContent className="space-y-8 text-slate-200 leading-relaxed px-4 md:px-8 py-6">
            <p><strong>Last Updated: {new Date('2025-11-13').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
            <p>Welcome to CalcZoon.com. We are deeply committed to protecting your privacy and handling your data in an open and transparent manner. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website. Our core principle is simple: we build tools, not data profiles. The information you enter into our calculators is processed exclusively in your browser and is never sent to our servers.</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-8 w-8 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-white">Information We Do Not Collect</h2>
                  <p>We want to be crystal clear: we do not collect, store, or have access to any personally identifiable information (PII) you enter into our calculators. This includes numbers, financial details, health data, or any other inputs. All calculations are performed client-side, meaning they happen directly on your device. Your data privacy is guaranteed because your data never leaves your computer.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Cookie className="h-8 w-8 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-white">Cookies and Local Storage</h2>
                  <p>To enhance your experience, CalcZoon uses your browser's "Local Storage" feature to save your calculation history. This is a privacy-friendly alternative to traditional cookies. This data is stored exclusively on your device and is not accessible by us. It allows you to revisit your previous calculations without re-entering data. You have full control and can clear this history at any time from the history page or through your browser settings.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <BarChart3 className="h-8 w-8 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-white">Anonymous Analytics</h2>
                  <p>We use privacy-focused analytics tools (like Plausible or Fathom) to understand how visitors interact with our site. This service collects anonymous, aggregated data, such as which calculators are most popular and general user flow. This information is vital for helping us improve the website. We do not send any personal or calculation data to our analytics provider and we do not use cookies for tracking.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="h-8 w-8 text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-white">Third-Party Services (Google AdSense)</h2>
                  <p>We use Google AdSense to display ads on our website, which helps keep our tools free. Google may use cookies (such as the DoubleClick DART cookie) to serve ads based on a user's prior visits to our website and other websites on the Internet. You may opt out of the use of the DART cookie by visiting the <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google ad and content network privacy policy</a>.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FileText className="h-8 w-8 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-white">GDPR and Data Rights</h2>
                  <p>We fully support the principles of the General Data Protection Regulation (GDPR). Our "privacy by design" approach means we intentionally minimize data handling. Since we don't collect personal data from our calculator tools, your rights to access, rectify, or erase data are inherently fulfilled. The only personal data we might process is if you voluntarily contact us via email, in which case we use it solely to respond to your inquiry.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="h-8 w-8 text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-white">Contacting Us</h2>
                  <p>If you have any questions, concerns, or suggestions about this Privacy Policy or our practices, please do not hesitate to <Link to="/contact" className="text-primary hover:underline">contact us</Link>. We value your feedback and are always happy to provide more information about our commitment to your privacy.</p>
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
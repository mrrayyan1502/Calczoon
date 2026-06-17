import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Heart, Link as LinkIcon, Users } from 'lucide-react';

const Community = () => {
  return (
    <>
      <Helmet>
        <title>Community & Partnerships – Supporting New York | Calczoon</title>
        <meta name="description" content="Learn about Calczoon's commitment to the New York community through partnerships with local schools and non-profits. See how we're making a difference." />
        <link rel="canonical" href="https://calczoon.com/community" />
        <meta property="og:title" content="Community & Partnerships – Supporting New York | Calczoon" />
        <meta property="og:description" content="Learn about Calczoon's commitment to the New York community through partnerships with local schools and non-profits." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 px-4"
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Community & Partnerships</h1>
            <p className="text-slate-300 text-lg mt-2">Building Stronger Communities, Together.</p>
          </CardHeader>
          <CardContent className="space-y-8 text-slate-200 leading-relaxed px-4 md:px-8 py-6">
            
            <section className="text-center">
              <p>At Calczoon, we believe in the power of community. While our tools serve users globally, we are deeply rooted in our local community of New York, USA. We are committed to giving back and fostering partnerships that create a positive impact.</p>
            </section>

            <div className="border-t border-slate-700"></div>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center"><Users className="mr-3 text-primary" />Our Local Involvement</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/40 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center"><Building className="mr-2" /> Local School Workshops</h3>
                  <p className="text-slate-300">We partner with schools in the NYC area to provide free workshops on financial literacy and STEM basics, using our calculators as interactive learning aids. Our goal is to make math and finance approachable and fun for students.</p>
                </div>
                <div className="bg-slate-800/40 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center"><Heart className="mr-2" /> Non-Profit Support</h3>
                  <p className="text-slate-300">We proudly support local New York non-profits focused on education and community development by providing resources and sponsoring events that align with our mission of empowerment through knowledge.</p>
                </div>
              </div>
            </section>

            <div className="border-t border-slate-700"></div>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Partners</h2>
              <p className="text-slate-300 mb-4">We are honored to collaborate with the following organizations:</p>
              <ul className="list-disc list-inside space-y-2 text-primary">
                <li>
                  <a href="#" className="hover:underline flex items-center gap-2">
                    <LinkIcon size={16}/> NYC Future Coders Initiative (Fictional Partner)
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline flex items-center gap-2">
                    <LinkIcon size={16}/> Brooklyn Financial Empowerment Center (Fictional Partner)
                  </a>
                </li>
              </ul>
              <p className="text-slate-300 text-sm mt-4">We are always looking for new opportunities to collaborate. If you represent a local organization, please <a href="/contact" className="text-primary hover:underline">get in touch</a>.</p>
            </section>
          
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Community;
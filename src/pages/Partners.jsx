import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HeartHandshake as Handshake, Mail } from 'lucide-react';
import Seo from '@/components/Seo';

const Partners = () => {
  return (
    <>
      <Seo
        title="Partners & Resources"
        description="Explore our network of partners and recommended resources. Calczoon collaborates with educational and financial organizations to provide valuable tools and information."
        canonicalUrl="/partners"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 px-4"
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Partners & Resources</h1>
            <p className="text-slate-300 text-lg mt-2">Collaborating for a Smarter Future</p>
          </CardHeader>
          <CardContent className="space-y-8 text-slate-200 leading-relaxed px-4 md:px-8 py-6">
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission & Vision for Collaboration</h2>
              <p>At Calczoon, our goal is to provide free, high-quality calculation tools to empower people everywhere. We believe in the power of collaboration to extend our reach and enhance our offerings. We are actively seeking partnerships with educational institutions, financial blogs, health and wellness platforms, and technology companies who share our commitment to providing accessible knowledge.</p>
            </section>

            <div className="border-t border-slate-700"></div>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Why Partner with Us?</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li><strong>Valuable Content:</strong> Enhance your website or platform by embedding our specialized calculators. Provide real utility to your audience.</li>
                <li><strong>Brand Association:</strong> Align your brand with a commitment to education, financial literacy, and health awareness.</li>
                <li><strong>Guest Posting & Link Building:</strong> We are open to cross-promotional opportunities, including guest blogging and sharing valuable resources to build a strong, authoritative web presence together.</li>
              </ul>
            </section>

            <div className="border-t border-slate-700"></div>

            <section className="text-center bg-slate-800/30 p-8 rounded-lg">
              <Handshake className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold text-white">Let's Work Together</h2>
              <p className="text-slate-300 mt-2 mb-6 max-w-2xl mx-auto">If you are interested in partnership opportunities, guest posting, or have a great idea for collaboration, we would love to hear from you.</p>
              <Button asChild size="lg">
                <Link to="/contact" className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" /> Contact Our Partnerships Team
                </Link>
              </Button>
            </section>
          
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Partners;
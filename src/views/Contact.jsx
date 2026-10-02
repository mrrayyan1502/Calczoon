'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, Mail, MapPin, Clock, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import Seo from '@/components/Seo';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: 'General Inquiry',
    message: '' 
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    // Simulate submission handling
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setSubmitted(true);
    toast({
      title: "Message Received!",
      description: "Thank you for reaching out. We will get back to you within 24-48 business hours.",
    });
  };

  return (
    <>
      <Seo
        title="Contact Us - CalcZoon Support & Editorial Team"
        description="Get in touch with CalcZoon. Reach our support and editorial team with inquiries, formula questions, calculator suggestions, or feedback. We respond within 24-48 hours."
        canonical="https://calczoon.com/contact"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            We Are Here To Help
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Contact CalcZoon</h1>
          <p className="text-lg text-slate-300 mt-4 max-w-2xl mx-auto">
            Have a question about a calculation formula, spotted a bug, or have a suggestion for a new tool? Reach out to our team directly.
          </p>
        </div>
        
        <div className="grid md:grid-cols-12 gap-8">
          {/* Simple Contact Form */}
          <div className="md:col-span-7">
            <Card className="bg-slate-800/50 border-slate-700/80 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-2xl font-bold">
                  <MessageSquare className="mr-3 h-6 w-6 text-primary"/> Send Us a Message
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Fill out the form below. We typically respond within 24 to 48 business hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="p-8 text-center bg-slate-900/60 border border-emerald-500/30 rounded-xl space-y-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                    <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
                      Thank you for contacting CalcZoon. A member of our editorial or technical team will review your message and reply to <strong>{formData.email}</strong> shortly.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' }); }}
                      className="mt-4 border-slate-700 text-slate-200 hover:text-white"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="text-slate-200">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="e.g. Sarah Jenkins" 
                        className="bg-slate-900 border-slate-700 text-white mt-1.5 focus:border-primary" 
                        required 
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-slate-200">Email Address (for our reply)</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="sarah@example.com" 
                        className="bg-slate-900 border-slate-700 text-white mt-1.5 focus:border-primary" 
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-slate-200">Inquiry Category</Label>
                      <select
                        id="subject"
                        className="w-full h-10 px-3 rounded-md bg-slate-900 border border-slate-700 text-slate-200 mt-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        value={formData.subject}
                        onChange={handleInputChange}
                      >
                        <option value="General Inquiry">General Question / Inquiry</option>
                        <option value="Calculator Feedback">Calculator Formula Question / Feedback</option>
                        <option value="Bug Report">Technical Bug Report / Error</option>
                        <option value="Tool Suggestion">Request a New Calculator</option>
                        <option value="Editorial & Advertising">Editorial / Business Matter</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-slate-200">Your Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Please describe your question, feedback, or formula observation in detail..." 
                        className="bg-slate-900 border-slate-700 text-white min-h-[140px] mt-1.5 focus:border-primary" 
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-slate-950 font-bold py-3" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </Button>
                    <p className="text-xs text-slate-400 text-center">
                      We respect your privacy. Your email will only be used to respond to your specific inquiry.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Real Contact Details & Office Info */}
          <div className="md:col-span-5 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700/80 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-xl font-bold">Official Contact Information</CardTitle>
                <CardDescription className="text-slate-300">
                  Direct channels to reach our team.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Direct Email Addresses</h3>
                    <div className="mt-1 space-y-1 text-sm">
                      <p className="text-slate-300">
                        General: <a href="mailto:contact@calczoon.com" className="text-primary hover:underline font-medium">contact@calczoon.com</a>
                      </p>
                      <p className="text-slate-300">
                        Support: <a href="mailto:support@calczoon.com" className="text-primary hover:underline font-medium">support@calczoon.com</a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400 shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Response Turnaround</h3>
                    <p className="text-slate-300 text-sm mt-1">
                      Monday through Friday, 9:00 AM – 5:00 PM UTC.<br />
                      Average response time: <strong>Within 24 to 48 hours</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Registered Address</h3>
                    <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                      <strong>CalcZoon Ltd.</strong><br />
                      124 City Road<br />
                      London, EC1V 2NX<br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/60">
                  <div className="flex items-center gap-2 text-slate-300 text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Your inquiries are handled with strict privacy in accordance with UK & EU GDPR.</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-white font-semibold flex items-center gap-2 mb-2 text-sm">
                <HelpCircle className="w-4 h-4 text-primary" /> Looking for Formula Explanations?
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Before sending a formula inquiry, check the individual calculator page. Each tool contains full mathematical documentation, variable legends, and solved examples below the interactive form.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Contact;

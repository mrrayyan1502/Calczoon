import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, Mail, Twitter, Linkedin, Accessibility } from 'lucide-react';
import { sendContactEmail } from '@/lib/resend';
import Seo from '@/components/Seo';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submissionRequest, setSubmissionRequest] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmissionRequest(formData);
  };

  useEffect(() => {
    if (!submissionRequest) return;
    
    let isMounted = true;

    const performSubmit = async () => {
      setIsSubmitting(true);
      try {
        await sendContactEmail(submissionRequest);
        if (isMounted) {
          toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. We'll get back to you soon!",
          });
          setFormData({ name: '', email: '', message: '' });
        }
      } catch (error) {
        console.error("Failed to send message:", error);
        if (isMounted) {
          toast({
            title: "Submission Failed",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
          });
        }
      } finally {
        if (isMounted) {
          setIsSubmitting(false);
          setSubmissionRequest(null);
        }
      }
    };
    
    performSubmit();
    
    return () => {
        isMounted = false;
    };
  }, [submissionRequest, toast]);

  return (
    <>
      <Seo
        title="Contact Us - CalcZoon"
        description="Get in touch with the CalcZoon team. We welcome your questions, feedback, and suggestions for new calculators."
        canonical="https://calczoon.com/contact"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 px-4"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Get in Touch</h1>
          <p className="text-lg text-slate-300 mt-4">We'd love to hear from you! Whether you have a question, a suggestion for a new calculator, or just want to say hello, please send us a message.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center"><MessageSquare className="mr-2 h-6 w-6"/>Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we will get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      className="bg-slate-900 border-slate-700" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      className="bg-slate-900 border-slate-700" 
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us how we can help..." 
                    className="bg-slate-900 border-slate-700 min-h-[150px]" 
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <a href="mailto:calczy2025@gmail.com" className="text-slate-300 hover:text-primary">calczy2025@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Twitter className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-white">Twitter / X</h3>
                    <a href="https://x.com/calczoon" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-primary">@Calczoon</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Linkedin className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-white">LinkedIn</h3>
                    <a href="https://linkedin.com/company/calczoon" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-primary">Calczoon</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 border-t border-slate-700/50 pt-4">
                  <Accessibility className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Accessibility Feedback</h3>
                    <p className="text-slate-300 text-xs mt-1">If you have suggestions or encounter difficulties using our website, please email us directly with the subject "Accessibility Issue". We are committed to resolving WCAG AA barriers in accordance with ADA and UK Equality Act 2010 standards.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Contact;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MessageCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { sendReviewEmail } from '@/lib/resend';
import Seo from '@/components/Seo';

const testimonialsData = [
  {
    name: 'Sarah J.',
    title: 'Financial Planner',
    testimonial: "Calczoon's loan and mortgage calculators are a lifesaver! I use them daily with my clients to quickly illustrate financial scenarios. They are intuitive, accurate, and save me so much time. Highly recommended!",
    rating: 5,
    avatar: "👩‍💼"
  },
  {
    name: 'Mike R.',
    title: 'Fitness Coach',
    testimonial: "The TDEE and Macro calculators are my go-to tools for creating nutrition plans. My clients love how easy it is to understand their calorie and macro needs. It's made a huge difference in their fitness journeys.",
    rating: 5,
    avatar: "💪"
  },
  {
    name: 'Emily T.',
    title: 'University Student',
    testimonial: "As a math student, the Fraction and Statistics calculators are invaluable. They help me double-check my homework and understand complex concepts. It's like having a personal tutor available 24/7.",
    rating: 5,
    avatar: "🎓"
  },
  {
    name: 'David L.',
    title: 'DIY Enthusiast',
    testimonial: "I used the Concrete Calculator for my backyard patio project, and it was spot on. I bought the exact number of bags needed, which saved me money and multiple trips to the store. Fantastic tool!",
    rating: 5,
    avatar: "🛠️"
  },
  {
    name: 'Dr. Anya Sharma',
    title: 'Medical Resident',
    testimonial: "The Pregnancy Due Date and BMI calculators are essential tools in my daily work. They are quick, reliable, and much more user-friendly than the clunky software we often have to use. A great resource for healthcare professionals.",
    rating: 5,
    avatar: "👩‍⚕️"
  },
  {
    name: 'Carlos Gomez',
    title: 'Small Business Owner',
    testimonial: "I use the Percentage Calculator almost every day for inventory, discounts, and sales tax. It's simple, fast, and has become an indispensable part of my workflow. It just works perfectly.",
    rating: 5,
    avatar: "📈"
  }
];

const Testimonials = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', title: '', rating: 5, review: '' });
  const [submissionRequest, setSubmissionRequest] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({...prev, [id]: value}));
  };

  const handleReviewSubmit = (e) => {
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
        await sendReviewEmail(submissionRequest);
        if (isMounted) {
          toast({
            title: "Thank You!",
            description: "Your review has been submitted. We appreciate your feedback!",
          });
          setFormData({ name: '', title: '', rating: 5, review: '' });
          setIsDialogOpen(false);
        }
      } catch (error) {
        console.error("Failed to submit review:", error);
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
        title="User Reviews & Testimonials | Calczoon"
        description="Read authentic reviews and testimonials from happy Calczoon users. See how our free online calculators have helped students, professionals, and individuals in finance, health, and daily life."
        canonicalUrl="/testimonials"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 px-4"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Stories from Our Global Community</h1>
          <p className="text-lg text-slate-300 mt-4 max-w-3xl mx-auto">We're proud to have helped thousands of users worldwide simplify complex problems. Here’s what people from all walks of life are saying about their experience with Calczoon's free tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-3xl">
                      {item.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">{item.name}</CardTitle>
                      <p className="text-primary">{item.title}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-slate-300 italic">"{item.testimonial}"</p>
                  <div className="flex mt-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16 bg-slate-800/30 p-8 rounded-lg border border-slate-700">
            <Users className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold text-white">Join Our Growing Community</h2>
            <p className="text-slate-300 mt-2 mb-6 max-w-2xl mx-auto">Your story could be featured here! We are constantly improving our tools based on user feedback. If Calczoon has helped you save time, make a better decision, or simply satisfy your curiosity, we would be thrilled to hear about it.</p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg">
                    <MessageCircle className="mr-2 h-5 w-5" /> Leave Your Review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle className="text-primary">Leave a Review</DialogTitle>
                  <DialogDescription className="text-slate-300">
                    Share your experience with Calczoon. Your feedback helps us improve.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleReviewSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Name</Label>
                      <Input id="name" name="name" placeholder="John Doe" className="col-span-3 bg-slate-800 border-slate-700" required value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">Title</Label>
                      <Input id="title" name="title" placeholder="e.g., Student, Developer" className="col-span-3 bg-slate-800 border-slate-700" value={formData.title} onChange={handleInputChange} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="rating" className="text-right">Rating</Label>
                      <Input id="rating" name="rating" type="number" min="1" max="5" className="col-span-3 bg-slate-800 border-slate-700" required value={formData.rating} onChange={handleInputChange} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="review" className="text-right">Review</Label>
                      <Textarea id="review" name="review" placeholder="Tell us what you think..." className="col-span-3 bg-slate-800 border-slate-700" required value={formData.review} onChange={handleInputChange} />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary" disabled={isSubmitting}>Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
        </div>

      </motion.div>
    </>
  );
};

export default Testimonials;
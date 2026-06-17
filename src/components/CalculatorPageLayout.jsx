import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Share2, Code, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/PageHeader';
import Faq from '@/components/Faq';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import NewsletterCTA from '@/components/NewsletterCTA';

const CalculatorPageLayout = ({
  title,
  description,
  keywords,
  canonicalUrl,
  icon: Icon,
  calculator,
  content,
  faqItems,
  schema
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const embedCode = `<iframe src="${window.location.href}" width="100%" height="600" frameborder="0" style="border:0; border-radius: 8px; overflow:hidden;"></iframe>`;
  
  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />
        {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
      </Helmet>

      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        {/* Header Section */}
        <PageHeader title={title} description={description} icon={Icon} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Calculator Area */}
          <div className="lg:col-span-2 space-y-8">
            {calculator}

            {/* Action Bar: Share & Embed */}
            <div className="flex flex-wrap gap-4 justify-end">
              <Button variant="outline" onClick={handleShare} className="flex items-center gap-2 border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700">
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Share Result'}
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700">
                    <Code className="w-4 h-4" /> Embed Widget
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-700 text-white">
                  <DialogHeader>
                    <DialogTitle>Embed This Calculator</DialogTitle>
                    <DialogDescription className="text-slate-300">
                      Copy the code below to add this calculator to your website or blog.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="relative mt-4">
                    <pre className="bg-slate-950 p-4 rounded-lg text-xs text-slate-300 overflow-x-auto font-mono border border-slate-800">
                      {embedCode}
                    </pre>
                    <Button 
                      size="sm" 
                      className="absolute top-2 right-2" 
                      onClick={handleCopyEmbed}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Deep Content Strategy - Tabbed for UX but rendered for SEO */}
            <div className="prose prose-invert max-w-none">
              {content.introduction && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                  <div className="text-slate-300" dangerouslySetInnerHTML={{ __html: content.introduction }} />
                </section>
              )}
              
              <Tabs defaultValue="how-to" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-slate-800/50 p-1">
                  <TabsTrigger value="how-to">How to Use</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                </TabsList>
                
                <div className="mt-6 bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
                  <TabsContent value="how-to" className="mt-0">
                    <h3 className="text-xl font-bold text-primary mb-4">How to Use This Calculator</h3>
                    <div className="text-slate-300 space-y-4" dangerouslySetInnerHTML={{ __html: content.howTo }} />
                  </TabsContent>
                  <TabsContent value="features" className="mt-0">
                    <h3 className="text-xl font-bold text-primary mb-4">Key Features</h3>
                    <div className="text-slate-300 space-y-4" dangerouslySetInnerHTML={{ __html: content.features }} />
                  </TabsContent>
                  <TabsContent value="examples" className="mt-0">
                    <h3 className="text-xl font-bold text-primary mb-4">Real-World Examples</h3>
                    <div className="text-slate-300 space-y-4" dangerouslySetInnerHTML={{ __html: content.examples }} />
                  </TabsContent>
                  <TabsContent value="benefits" className="mt-0">
                    <h3 className="text-xl font-bold text-primary mb-4">Benefits & Use Cases</h3>
                    <div className="text-slate-300 space-y-4" dangerouslySetInnerHTML={{ __html: content.benefits }} />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
             <Card className="bg-emerald-900/20 border-emerald-500/30">
                <CardContent className="pt-6">
                    <h3 className="font-bold text-emerald-400 mb-2">Did you know?</h3>
                    <p className="text-sm text-slate-300">{content.didYouKnow || "Calculators can save you hours of manual work."}</p>
                </CardContent>
             </Card>
            <RelatedTools />
          </aside>
        </div>

        {/* FAQ Section - Schema Optimized */}
        <Faq items={faqItems} />

        {/* Conclusion */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
           <h2 className="text-2xl font-bold text-white mb-4">Ready to Calculate?</h2>
           <p className="text-slate-300 mb-8">{content.conclusion || "Start using our free tools today to make smarter decisions."}</p>
        </div>
        
        <NewsletterCTA />
      </div>
    </>
  );
};

export default CalculatorPageLayout;
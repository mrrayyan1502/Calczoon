import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Share2, Copy, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';

const ShareResults = ({ title, text, url }) => {
  const { toast } = useToast();

  const copyToClipboard = (textToCopy, message) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: "Copied to Clipboard!",
        description: message,
      });
    }).catch((err) => {
      console.error('Copy failed:', err);
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    });
  };

  const shareOptions = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
      action: () => {
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(tweetUrl, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank');
      }
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      action: () => {
        const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`;
        window.open(linkedInUrl, '_blank');
      }
    },
    {
      name: 'Email',
      icon: <Mail className="h-5 w-5" />,
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
      }
    }
  ];

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-primary">Share Your Calculation</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-slate-400 mb-4">Share this result with your friends or colleagues!</p>
            <div className="grid grid-cols-2 gap-4">
              {shareOptions.map(option => (
                <Button key={option.name} variant="outline" onClick={option.action} className="justify-start gap-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                  {option.icon} {option.name}
                </Button>
              ))}
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <Input
                id="link"
                defaultValue={url}
                readOnly
                className="bg-slate-900 border-slate-600"
              />
              <Button type="button" size="sm" onClick={() => copyToClipboard(url, "Link copied to clipboard!")} className="bg-emerald-600 hover:bg-emerald-700">
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );
};

export default ShareResults;
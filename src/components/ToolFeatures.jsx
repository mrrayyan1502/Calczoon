import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Share2, Code, Copy, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';

const ToolFeatures = ({ toolName, toolPath }) => {
  const { toast } = useToast();
  const pageUrl = `https://calczoon.com${toolPath}`;
  const embedCode = `<iframe src="${pageUrl}" style="border:0px #ffffff none; width:100%; height:500px;" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" allowfullscreen></iframe>`;
  const shareTitle = `Check out this awesome ${toolName} on Calczoon!`;
  const shareText = `I found this useful ${toolName} on Calczoon. You can try it here:`;

  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({ title: "Copied to Clipboard!", description: message });
      },
      (err) => {
        toast({ title: "Copy Failed", description: "Could not copy to clipboard.", variant: "destructive" });
      }
    );
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + '\n\n' + pageUrl)}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {/* Share Tool Card */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <Share2 className="mr-2" /> Share This Tool
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button onClick={shareOnTwitter} variant="outline" className="flex-1 min-w-[120px]">
            <Twitter className="mr-2 h-4 w-4" /> Twitter
          </Button>
          <Button onClick={shareOnFacebook} variant="outline" className="flex-1 min-w-[120px]">
            <Facebook className="mr-2 h-4 w-4" /> Facebook
          </Button>
          <Button onClick={shareOnLinkedIn} variant="outline" className="flex-1 min-w-[120px]">
            <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
          </Button>
          <Button onClick={shareViaEmail} variant="outline" className="flex-1 min-w-[120px]">
            <Mail className="mr-2 h-4 w-4" /> Email
          </Button>
          <Button onClick={() => copyToClipboard(pageUrl, "Tool URL copied.")} variant="outline" className="flex-1 min-w-[120px]">
            <Copy className="mr-2 h-4 w-4" /> Copy Link
          </Button>
        </CardContent>
      </Card>

      {/* Embed Tool Card */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <Code className="mr-2" /> Embed This Tool
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-300 mb-4">
            Add this calculator to your website by copying the code below.
          </p>
          <div className="bg-slate-900 p-3 rounded-md mb-4">
            <code className="text-xs text-slate-300 break-all">{embedCode}</code>
          </div>
          <Button onClick={() => copyToClipboard(embedCode, "Embed code copied.")} className="w-full">
            <Copy className="mr-2 h-4 w-4" /> Copy Embed Code
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolFeatures;
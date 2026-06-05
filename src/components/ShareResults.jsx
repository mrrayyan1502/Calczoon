import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Copy, Download } from 'lucide-react';

// Custom SVG Brand Logos
const WhatsAppIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.628 3.878 14.157 2.851 11.53 2.85c-5.45 0-9.877 4.37-9.881 9.8.001 1.77.493 3.5 1.42 5.055l-1.012 3.7 3.824-.986zm11.367-7.653c-.307-.154-1.82-.898-2.102-.998-.281-.1-.487-.154-.69.154-.204.307-.79.998-.97 1.202-.18.204-.359.227-.666.073-.307-.154-1.297-.478-2.471-1.527-.913-.815-1.53-1.82-1.71-2.127-.18-.307-.018-.473.136-.626.137-.138.307-.359.462-.538.153-.18.204-.307.307-.512.103-.205.051-.384-.026-.538-.076-.154-.69-1.664-.945-2.277-.249-.597-.501-.515-.69-.525l-.59-.01c-.204 0-.538.077-.82.385-.282.308-1.077 1.051-1.077 2.562 0 1.512 1.102 2.972 1.256 3.176.154.205 2.169 3.31 5.253 4.639.733.316 1.306.505 1.75.646.737.234 1.407.201 1.937.12.59-.09 1.82-.743 2.076-1.46.256-.718.256-1.333.18-1.461-.077-.128-.282-.205-.59-.359z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0C5.347 0 0 5.347 0 11.944c0 6.595 5.347 11.944 11.944 11.944 6.596 0 11.944-5.349 11.944-11.944C23.888 5.347 18.54 0 11.944 0zm5.836 8.3c-.173 1.826-.923 6.242-1.303 8.275-.162.861-.479 1.15-.786 1.178-.675.062-1.185-.445-1.838-.874-1.022-.672-1.6-.109-2.435.437-.965.632-1.81 1.545-2.736 1.488-.636-.057-1.185-.505-1.42-1.15-.365-1.002-.638-3.267-.912-5.534-.16-.948-.328-1.897-.52-2.743-.133-.585-.353-.873-.659-.868-.266.004-.515.11-.747.318-.21.188-.415.426-.607.711-.144-.092-.284-.187-.42-.283.479-.968 1.139-1.637 1.977-2.007.828-.367 1.758-.456 2.656-.251.996.228 1.62.909 1.874 2.045.247 1.109.52 2.766.772 4.417.073.476.14.952.203 1.411.162.247.32.482.52.7.202-.218.36-.453.522-.7.063-.459.13-.935.203-1.411.252-1.65.525-3.308.772-4.417.112-.5.257-.966.52-1.32.228-.27.53-.47.88-.57.37-.1.74-.08 1.1.06.33.13.56.36.71.69.15.33.19.74.12 1.18zm-9.336 2.4l1.83 1.83-1.83-1.83z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const ShareResults = ({ title, text, url }) => {
  const { toast } = useToast();
  const absoluteUrl = url.startsWith('http') ? url : `https://calczoon.com${url}`;
  
  // Clean custom templates
  const cleanTitle = title || "Calculation Result";
  const shareText = `${text} Calculated via @CalcZoon.`;

  const copyToClipboard = (textToCopy, message) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: "Copied!",
        description: message,
      });
    }).catch((err) => {
      console.error('Copy failed:', err);
      toast({
        title: "Copy Failed",
        description: "Could not copy link to clipboard.",
        variant: "destructive",
      });
    });
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <WhatsAppIcon />,
      action: () => {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + absoluteUrl)}`;
        window.open(whatsappUrl, '_blank');
      },
      colorClass: 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-500/30'
    },
    {
      name: 'Telegram',
      icon: <TelegramIcon />,
      action: () => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(absoluteUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(telegramUrl, '_blank');
      },
      colorClass: 'text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 hover:border-sky-500/30'
    },
    {
      name: 'Twitter/X',
      icon: <TwitterIcon />,
      action: () => {
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(absoluteUrl)}`;
        window.open(tweetUrl, '_blank');
      },
      colorClass: 'text-slate-200 hover:text-white hover:bg-slate-700/20 hover:border-slate-500/30'
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon />,
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(absoluteUrl)}`;
        window.open(facebookUrl, '_blank');
      },
      colorClass: 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 hover:border-blue-500/30'
    }
  ];

  // Helper function to draw rounded rectangles inside canvas
  const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  // Helper function to wrap text within a specified width on canvas
  const wrapText = (ctx, textString, maxWidth) => {
    const words = textString.split(' ');
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        lines.push(currentLine.trim());
        currentLine = words[i] + ' ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());
    return lines;
  };

  const downloadCard = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');

      // 1. Radial Dark Gradient Background (Premium Theme)
      const grad = ctx.createRadialGradient(400, 400, 50, 400, 400, 600);
      grad.addColorStop(0, '#0f172a'); // slate-900
      grad.addColorStop(1, '#020617'); // slate-950
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 800, 800);

      // 2. Glowing accent circles (decorative rings)
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.12)'; // emerald-400
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(400, 400, 360, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)'; // sky-400
      ctx.beginPath();
      ctx.arc(400, 400, 375, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Draw Brand Logo "CalcZoon"
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      
      // Draw grid logo dots
      ctx.fillStyle = '#34d399'; // emerald-400
      ctx.beginPath();
      ctx.arc(260, 100, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#38bdf8'; // sky-400
      ctx.beginPath();
      ctx.arc(285, 100, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Logo Text Gradient
      const textGrad = ctx.createLinearGradient(310, 80, 540, 120);
      textGrad.addColorStop(0, '#34d399'); // emerald
      textGrad.addColorStop(0.5, '#38bdf8'); // sky
      textGrad.addColorStop(1, '#6366f1'); // indigo
      ctx.fillStyle = textGrad;
      ctx.fillText('CalcZoon', 415, 112);

      // 4. Draw Frosted Glass Card Container
      ctx.fillStyle = 'rgba(30, 41, 59, 0.7)'; // slate-800 opacity
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 2;
      drawRoundedRect(ctx, 80, 200, 640, 420, 24);
      ctx.fill();
      ctx.stroke();

      // 5. Draw Calculator Title inside Card
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText(cleanTitle.toUpperCase(), 400, 275);

      // Draw Separator Line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(140, 315);
      ctx.lineTo(660, 315);
      ctx.stroke();

      // 6. Draw Calculation Result Text (with word wrap)
      ctx.fillStyle = '#cbd5e1'; // slate-300
      ctx.font = '24px sans-serif';
      const textLines = wrapText(ctx, text, 520);
      let startY = 385;
      textLines.forEach(line => {
        ctx.fillText(line, 400, startY);
        startY += 40;
      });

      // 7. Draw Bottom Call To Action (CTA)
      ctx.fillStyle = '#64748b'; // slate-500
      ctx.font = '16px sans-serif';
      ctx.fillText('CALCULATE YOURS ONLINE AT:', 400, 685);
      
      ctx.fillStyle = '#34d399'; // emerald-400
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('calczoon.com', 400, 720);

      // 8. Download PNG
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${cleanTitle.toLowerCase().replace(/\s+/g, '-')}-result.png`;
      link.href = dataUrl;
      link.click();

      toast({
        title: "Card Generated!",
        description: "Your calculation snapshot has been saved.",
      });
    } catch (error) {
      console.error("Canvas drawing failed", error);
      toast({
        title: "Download Failed",
        description: "Could not generate results card.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl p-6 mt-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center lg:text-left">
          <h4 className="text-lg font-bold text-white flex items-center gap-2 justify-center lg:justify-start">
            Share Results & Help Others! 🤝
          </h4>
          <p className="text-xs text-slate-400">Share your calculation or download a premium card for your social media story.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {shareOptions.map((option) => (
            <Button
              key={option.name}
              variant="outline"
              onClick={option.action}
              className={`p-3 rounded-xl border-slate-700 bg-slate-900/50 hover:text-white transition-all duration-300 flex items-center gap-2 text-xs font-semibold ${option.colorClass}`}
            >
              {option.icon}
              <span>{option.name}</span>
            </Button>
          ))}
          
          <Button
            variant="outline"
            onClick={downloadCard}
            className="p-3 rounded-xl border-slate-700 bg-slate-900/50 hover:bg-indigo-600/20 hover:border-indigo-500/40 text-indigo-400 hover:text-indigo-300 transition-all duration-300 flex items-center gap-2 text-xs font-semibold"
          >
            <Download className="h-4 w-4" />
            <span>Download Card</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => copyToClipboard(absoluteUrl, "Link copied to clipboard!")}
            className="p-3 rounded-xl border-slate-700 bg-slate-900/50 hover:bg-emerald-600/20 hover:border-emerald-500/40 text-emerald-400 hover:text-emerald-300 transition-all duration-300 flex items-center gap-2 text-xs font-semibold"
          >
            <Copy className="h-4 w-4" />
            <span>Copy Link</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ShareResults;
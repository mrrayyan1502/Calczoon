import React, { useState, useEffect } from 'react';
import Seo from '@/components/Seo';
import { Link } from 'react-router-dom';
import { Globe, Clock } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';

const timeZones = [
  { id: 'UTC', label: 'UTC (Coordinated Universal Time)', value: 'UTC' },
  { id: 'Europe/London', label: 'GMT/BST - London', value: 'Europe/London' },
  { id: 'America/New_York', label: 'EST/EDT - New York', value: 'America/New_York' },
  { id: 'America/Chicago', label: 'CST/CDT - Chicago', value: 'America/Chicago' },
  { id: 'America/Denver', label: 'MST/MDT - Denver', value: 'America/Denver' },
  { id: 'America/Los_Angeles', label: 'PST/PDT - Los Angeles', value: 'America/Los_Angeles' },
  { id: 'Asia/Kolkata', label: 'IST - New Delhi', value: 'Asia/Kolkata' },
  { id: 'Asia/Karachi', label: 'PKT - Karachi', value: 'Asia/Karachi' },
  { id: 'Europe/Berlin', label: 'CET/CEST - Berlin', value: 'Europe/Berlin' },
  { id: 'Asia/Tokyo', label: 'JST - Tokyo', value: 'Asia/Tokyo' },
  { id: 'Australia/Sydney', label: 'AEST/AEDT - Sydney', value: 'Australia/Sydney' }
];

const TimeZoneConverter = () => {
  const [dateTime, setDateTime] = useState('');
  const [sourceZone, setSourceZone] = useState('UTC');
  const [targetZone, setTargetZone] = useState('America/New_York');
  const [convertedResult, setConvertedResult] = useState(null);

  useEffect(() => {
    // Set default datetime to now
    const now = new Date();
    const localIsoString = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    setDateTime(localIsoString);
  }, []);

  const convertTime = (e) => {
    if (e) e.preventDefault();
    if (!dateTime) return;

    try {
      // Parse source date-time in target source zone
      // Since native JS dates are parsed locally, we format them with timezone details
      const [datePart, timePart] = dateTime.split('T');
      const isoStringWithSourceZone = `${datePart}T${timePart}:00`;

      // Create a temporary formatter to extract offset or just construct via Intl
      const formatterOptions = {
        timeZone: sourceZone,
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false
      };
      
      // We parse the date correctly by creating date object at source offset
      const d = new Date(isoStringWithSourceZone);
      
      const sourceTimeFormatted = new Intl.DateTimeFormat('en-US', {
        ...formatterOptions,
        timeZone: sourceZone
      }).format(d);
      
      const targetTimeFormatted = new Intl.DateTimeFormat('en-US', {
        ...formatterOptions,
        timeZone: targetZone
      }).format(d);

      // Extract details for target display
      const targetDisplay = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: targetZone
      }).format(d);

      const sourceDisplay = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: sourceZone
      }).format(d);

      // Determine offset differences
      const formatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: sourceZone });
      const targetFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: targetZone });

      setConvertedResult({
        sourceTime: sourceDisplay,
        targetTime: targetDisplay,
        sourceLabel: timeZones.find(z => z.value === sourceZone)?.label,
        targetLabel: timeZones.find(z => z.value === targetZone)?.label
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Convert whenever parameters change
  useEffect(() => {
    if (dateTime) convertTime();
  }, [dateTime, sourceZone, targetZone]);

  const pageTitle = "Time Zone Converter: Convert Global Region Times Instantly";
  const pageDescription = "Convert dates and times across UTC, EST, GMT, and other global regions. Perfect for planning international meetings and travel.";
  const canonicalUrl = "/lifestyle/time-zone-converter";

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CalcZoon Time Zone Converter",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqItems = [
    { question: "What is UTC and how does it relate to GMT?", answer: "UTC (Coordinated Universal Time) is the scientific time standard used globally, whereas GMT (Greenwich Mean Time) is a time zone. For practical purposes, UTC and GMT share the same time offset (UTC+0)." },
    { question: "Does this time zone converter account for Daylight Saving Time (DST)?", answer: "Yes, this converter automatically adjusts for Daylight Saving Time (DST) based on the specific date and regional rules selected." },
    { question: "How do I schedule an international meeting?", answer: "Select your local date and time as the source, pick your target time zones, and the converter will immediately display the exact corresponding hours in those regions." }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        schema={[appSchema, faqSchema]}
      />

      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title="Time Zone Converter" description={pageDescription} icon={Globe} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl p-6">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="dateTime" className="text-slate-300 font-medium">Select Date & Time</Label>
                  <input
                    id="dateTime"
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl p-3 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sourceZone" className="text-slate-300 font-medium">From Time Zone (Source)</Label>
                    <select
                      id="sourceZone"
                      value={sourceZone}
                      onChange={(e) => setSourceZone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-white rounded-xl p-3"
                    >
                      {timeZones.map((tz) => (
                        <option key={tz.id} value={tz.value} className="bg-slate-900 text-white">
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetZone" className="text-slate-300 font-medium">To Time Zone (Target)</Label>
                    <select
                      id="targetZone"
                      value={targetZone}
                      onChange={(e) => setTargetZone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-white rounded-xl p-3"
                    >
                      {timeZones.map((tz) => (
                        <option key={tz.id} value={tz.value} className="bg-slate-900 text-white">
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>

              {convertedResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="mt-8 p-6 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-6"
                >
                  <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-sky-400 uppercase tracking-widest">Source Time</p>
                      <p className="text-lg font-bold text-white">{convertedResult.sourceTime}</p>
                      <p className="text-xs text-slate-300">{convertedResult.sourceLabel}</p>
                    </div>

                    <div className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs font-bold shrink-0 self-start md:self-center">
                      Converted
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Target Time</p>
                      <p className="text-lg font-bold text-white">{convertedResult.targetTime}</p>
                      <p className="text-xs text-slate-300">{convertedResult.targetLabel}</p>
                    </div>
                  </div>

                  {/* Analog Clock Mockup (Visual Wow Factor) */}
                  <div className="flex gap-12 justify-center border-t border-slate-800 pt-6">
                    <div className="flex flex-col items-center gap-2">
                      <Clock className="w-8 h-8 text-sky-400 animate-spin" style={{ animationDuration: '60s' }} />
                      <span className="text-xs text-slate-300">Source Zone</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Clock className="w-8 h-8 text-emerald-400 animate-spin" style={{ animationDuration: '60s' }} />
                      <span className="text-xs text-slate-300">Target Zone</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white">Why Use Time Zone Converters?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Time zones govern the local clock settings in specific geographical regions. Because Earth rotates $15^\circ$ every hour, the global coordinate system divides the world into 24 standard offsets from Coordinated Universal Time (UTC).
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  This converter dynamically parses time zone offsets, including daylight savings offsets, ensuring you never schedule a meeting at the wrong hour.
                </p>
              </CardContent>
            </Card>

            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
              <h4 className="font-bold text-white mb-2 text-sm">Want to optimize your schedule?</h4>
              <p className="text-xs text-slate-300 mb-4">Read our latest articles, guides, and tips on productivity, finance, and wellness.</p>
              <Link to="/blog" className="text-emerald-400 hover:text-emerald-300 hover:underline text-xs font-bold transition-colors block">
                Explore CalcZoon Blog &rarr;
              </Link>
            </div>

            <RelatedTools />
          </aside>
        </div>
      </div>
    </>
  );
};

export default TimeZoneConverter;

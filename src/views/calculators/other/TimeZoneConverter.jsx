'use client';

import React, { useState, useEffect } from 'react';
import Seo from '@/components/Seo';
import { Link } from 'react-router-dom';
import { Globe, Clock, ArrowRightLeft, Calendar, Building2, CheckCircle2, AlertTriangle, Compass } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';

const timeZones = [
  { id: 'UTC', label: 'UTC (Coordinated Universal Time)', value: 'UTC', offsetStd: 0, city: 'Universal' },
  { id: 'Europe/London', label: 'London (GMT / BST)', value: 'Europe/London', offsetStd: 0, city: 'London' },
  { id: 'Europe/Paris', label: 'Paris, Berlin, Rome (CET / CEST)', value: 'Europe/Paris', offsetStd: 1, city: 'Paris' },
  { id: 'Europe/Athens', label: 'Athens, Cairo, Istanbul (EET / EEST)', value: 'Europe/Athens', offsetStd: 2, city: 'Athens' },
  { id: 'Asia/Dubai', label: 'Dubai, Abu Dhabi (GST)', value: 'Asia/Dubai', offsetStd: 4, city: 'Dubai' },
  { id: 'Asia/Karachi', label: 'Karachi, Islamabad (PKT)', value: 'Asia/Karachi', offsetStd: 5, city: 'Karachi' },
  { id: 'Asia/Kolkata', label: 'New Delhi, Mumbai (IST)', value: 'Asia/Kolkata', offsetStd: 5.5, city: 'New Delhi' },
  { id: 'Asia/Bangkok', label: 'Bangkok, Jakarta, Hanoi (ICT)', value: 'Asia/Bangkok', offsetStd: 7, city: 'Bangkok' },
  { id: 'Asia/Singapore', label: 'Singapore, Hong Kong, Beijing (SGT / HKT)', value: 'Asia/Singapore', offsetStd: 8, city: 'Singapore' },
  { id: 'Asia/Tokyo', label: 'Tokyo, Seoul (JST / KST)', value: 'Asia/Tokyo', offsetStd: 9, city: 'Tokyo' },
  { id: 'Australia/Sydney', label: 'Sydney, Melbourne (AEST / AEDT)', value: 'Australia/Sydney', offsetStd: 10, city: 'Sydney' },
  { id: 'Pacific/Auckland', label: 'Auckland, Wellington (NZST / NZDT)', value: 'Pacific/Auckland', offsetStd: 12, city: 'Auckland' },
  { id: 'Pacific/Honolulu', label: 'Honolulu, Hawaii (HST)', value: 'Pacific/Honolulu', offsetStd: -10, city: 'Honolulu' },
  { id: 'America/Anchorage', label: 'Anchorage, Alaska (AKST / AKDT)', value: 'America/Anchorage', offsetStd: -9, city: 'Anchorage' },
  { id: 'America/Los_Angeles', label: 'Los Angeles, San Francisco (PST / PDT)', value: 'America/Los_Angeles', offsetStd: -8, city: 'San Francisco' },
  { id: 'America/Denver', label: 'Denver, Phoenix (MST / MDT)', value: 'America/Denver', offsetStd: -7, city: 'Denver' },
  { id: 'America/Chicago', label: 'Chicago, Dallas (CST / CDT)', value: 'America/Chicago', offsetStd: -6, city: 'Chicago' },
  { id: 'America/New_York', label: 'New York, Toronto (EST / EDT)', value: 'America/New_York', offsetStd: -5, city: 'New York' },
  { id: 'America/Sao_Paulo', label: 'São Paulo, Rio de Janeiro (BRT)', value: 'America/Sao_Paulo', offsetStd: -3, city: 'São Paulo' }
];

const TimeZoneConverter = () => {
  const [dateTime, setDateTime] = useState('');
  const [sourceZone, setSourceZone] = useState('America/New_York');
  const [targetZone, setTargetZone] = useState('Europe/London');
  const [convertedResult, setConvertedResult] = useState(null);

  useEffect(() => {
    // Default to current local time formatted for datetime-local
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const localString = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    setDateTime(localString);
  }, []);

  const swapZones = () => {
    setSourceZone(targetZone);
    setTargetZone(sourceZone);
  };

  const setPreset = (type) => {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

    if (type === 'now') {
      setDateTime(`${today}T${pad(now.getHours())}:${pad(now.getMinutes())}`);
    } else if (type === 'morning') {
      setDateTime(`${today}T09:00`);
    } else if (type === 'afternoon') {
      setDateTime(`${today}T14:00`);
    } else if (type === 'evening') {
      setDateTime(`${today}T18:00`);
    }
  };

  const convertTime = () => {
    if (!dateTime) return;

    try {
      // Create a reference date object by treating dateTime as a local representation
      const [datePart, timePart] = dateTime.split('T');
      if (!datePart || !timePart) return;

      const [year, month, day] = datePart.split('-').map(Number);
      const [hour, minute] = timePart.split(':').map(Number);

      // Create UTC base by interpreting the components in source timezone
      // We format in source timezone to find equivalent UTC timestamp
      const fakeUtc = new Date(Date.UTC(year, month - 1, day, hour, minute));

      // Calculate source zone offset at this approximate time
      const getZoneOffsetMinutes = (tz, dateObj) => {
        const utcDateStr = dateObj.toLocaleString('en-US', { timeZone: 'UTC' });
        const tzDateStr = dateObj.toLocaleString('en-US', { timeZone: tz });
        return (new Date(tzDateStr) - new Date(utcDateStr)) / 60000;
      };

      const sourceOffsetMin = getZoneOffsetMinutes(sourceZone, fakeUtc);
      // Correct absolute timestamp: when source local clock shows specified time,
      // the actual UTC instant is (fakeUtc timestamp - sourceOffsetMin * 60000)
      const trueUtcTime = new Date(fakeUtc.getTime() - sourceOffsetMin * 60000);

      // Format date/time in source and target zones
      const formatZoneTime = (tz, dateObj) => {
        return new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: tz
        }).format(dateObj);
      };

      const formatZoneHourOnly = (tz, dateObj) => {
        const parts = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          hour12: false,
          timeZone: tz
        }).formatToParts(dateObj);
        const hourPart = parts.find((p) => p.type === 'hour');
        return hourPart ? parseInt(hourPart.value, 10) : 0;
      };

      const getOffsetString = (tz, dateObj) => {
        const parts = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          timeZoneName: 'shortOffset'
        }).formatToParts(dateObj);
        const tzNamePart = parts.find((p) => p.type === 'timeZoneName');
        return tzNamePart ? tzNamePart.value : 'UTC';
      };

      const sourceDisplay = formatZoneTime(sourceZone, trueUtcTime);
      const targetDisplay = formatZoneTime(targetZone, trueUtcTime);
      const sourceOffset = getOffsetString(sourceZone, trueUtcTime);
      const targetOffset = getOffsetString(targetZone, trueUtcTime);

      const targetHour = formatZoneHourOnly(targetZone, trueUtcTime);
      const sourceHour = formatZoneHourOnly(sourceZone, trueUtcTime);

      // Business hours check (09:00 to 17:00)
      const isTargetBusiness = targetHour >= 9 && targetHour < 17;
      const isSourceBusiness = sourceHour >= 9 && sourceHour < 17;

      const targetOffsetMin = getZoneOffsetMinutes(targetZone, trueUtcTime);
      const diffHours = (targetOffsetMin - sourceOffsetMin) / 60;
      const absDiffHours = Math.abs(diffHours);
      const diffFormatted = `${absDiffHours % 1 === 0 ? absDiffHours : absDiffHours.toFixed(1)} hrs`;
      const diffDirection = diffHours > 0 ? `${diffFormatted} ahead of` : diffHours < 0 ? `${diffFormatted} behind` : 'identical time to';

      // 24-Hour Overlap Map
      const hoursMap = Array.from({ length: 24 }, (_, i) => {
        const slotUtc = new Date(trueUtcTime.getTime() + (i - sourceHour) * 3600000);
        const sH = formatZoneHourOnly(sourceZone, slotUtc);
        const tH = formatZoneHourOnly(targetZone, slotUtc);
        const sWork = sH >= 9 && sH < 17;
        const tWork = tH >= 9 && tH < 17;
        const overlap = sWork && tWork;
        return { sourceHour: sH, targetHour: tH, overlap, sWork, tWork };
      });

      setConvertedResult({
        sourceTime: sourceDisplay,
        targetTime: targetDisplay,
        sourceOffset,
        targetOffset,
        diffHours,
        diffDirection,
        isTargetBusiness,
        isSourceBusiness,
        hoursMap,
        sourceLabel: timeZones.find((z) => z.value === sourceZone)?.label || sourceZone,
        targetLabel: timeZones.find((z) => z.value === targetZone)?.label || targetZone,
        sourceCity: timeZones.find((z) => z.value === sourceZone)?.city || sourceZone,
        targetCity: timeZones.find((z) => z.value === targetZone)?.city || targetZone
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (dateTime) convertTime();
  }, [dateTime, sourceZone, targetZone]);

  const faqItems = [
    {
      question: "What is UTC and how does it fundamentally differ from GMT?",
      answer: "Coordinated Universal Time (UTC) is the atomic, scientific reference standard for all international civil timekeeping, maintained by atomic clocks and ultra-precise International Atomic Time (TAI). Greenwich Mean Time (GMT) is an astronomical solar time zone centered on the Royal Observatory in Greenwich, London (Prime Meridian, 0° longitude). For everyday civil purposes, UTC and GMT share the exact same offset (UTC+0). However, unlike London (which shifts to British Summer Time BST, UTC+1, each April through October), UTC never observes daylight saving time and remains fixed year-round."
    },
    {
      question: "How does this Time Zone Converter handle Daylight Saving Time (DST)?",
      answer: "Our converter utilizes the dynamic IANA Time Zone Database (Olson Database) via native JavaScript internationalization. When you select a specific calendar date, it automatically identifies whether the source and target locations are currently observing standard time or daylight saving time based on regional statutes, including US Energy Policy Act standards and European Summer Time directives."
    },
    {
      question: "Why do some countries have 30-minute or 45-minute time zone offsets?",
      answer: "While most international standard time zones differ by whole 60-minute increments corresponding to Earth's 15-degree longitudinal rotation per hour, several sovereign nations selected fractional offsets to better align solar noon with their geography or assert national identity. Examples include India and Sri Lanka (Indian Standard Time, UTC+5:30), Iran (IRST, UTC+3:30), Afghanistan (AFT, UTC+4:30), Myanmar (MMT, UTC+6:30), Central Australia (ACST, UTC+9:30), and Nepal (NPT, UTC+5:45)."
    },
    {
      question: "What is the International Date Line (IDL) and how does it cause date crossover?",
      answer: "The International Date Line is an internationally recognized zigzagging boundary situated along the 180° meridian in the Pacific Ocean. Crossing the date line eastbound decreases the calendar date by exactly one day (repeating the day), while crossing westbound advances the calendar date forward by one full day. When conducting business between cities on opposite sides of the IDL—such as San Francisco (UTC-7/8) and Tokyo (UTC+9) or Sydney (UTC+10/11)—events occurring during the afternoon in California take place the following morning in Japan or Australia."
    },
    {
      question: "What is the best way to find overlapping business hours for distributed remote teams?",
      answer: "To schedule productive asynchronous and live collaboration without overburdening team members, locate the common working window where both locations experience standard office hours (typically 09:00 to 17:00 local time). For transatlantic teams between New York (UTC-5) and London (UTC+0), the optimal window is 09:00–12:00 EST (which corresponds to 14:00–17:00 GMT). For teams separated by 8+ hours, utilize our visual 24-hour overlap bar or establish structured asynchronous handoffs."
    },
    {
      question: "Why do US and European Daylight Saving Time changes happen on different dates?",
      answer: "The United States begins Daylight Saving Time on the second Sunday of March and ends on the first Sunday of November, pursuant to the Energy Policy Act of 2005. Conversely, the European Union and the United Kingdom observe European Summer Time starting on the last Sunday of March and concluding on the last Sunday of October. This creates a two-to-three-week 'gap window' in March and October where the time difference between New York and London shrinks from 5 hours to 4 hours."
    },
    {
      question: "Do US states like Arizona and Hawaii observe Daylight Saving Time?",
      answer: "No. Under the US Uniform Time Act of 1966, states may opt out of Daylight Saving Time by state legislative exemption. Hawaii does not observe DST due to its tropical latitude where sunrise and sunset vary little throughout the year. Most of Arizona (with the exception of the Navajo Nation) does not observe DST to avoid extending extreme desert summer heat into late evening hours, remaining on Mountain Standard Time (MST, UTC-7) year-round."
    }
  ];

  const pageTitle = "Time Zone Converter: Convert Global Regional Times & Meeting Overlap";
  const pageDescription = "Convert world time zones instantly across UTC, EST, GMT, PST, IST, and CET. Calculate meeting overlap hours, Daylight Saving Time adjustments, and global trading market times.";
  const canonicalUrl = "/lifestyle/time-zone-converter";

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Time Zone Converter",
    "url": "https://calczoon.com/lifestyle/time-zone-converter",
    "description": "Interactive global time zone converter with automatic Daylight Saving Time detection, meeting overlap planner, and 24-hour visual schedule mapping.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
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
        <PageHeader
          title="Time Zone Converter & Meeting Overlap Planner"
          description="Accurately convert dates and hours across global time zones, account for Daylight Saving Time shifts, and visualize business collaboration windows."
          icon={Globe}
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Converter Form & Display */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl p-6">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                {/* Date & Time Input with Presets */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dateTime" className="text-slate-300 font-medium text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-400" /> Select Source Date & Time
                    </Label>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPreset('now')}
                        className="px-2 py-0.5 text-[11px] font-semibold rounded bg-slate-800 text-emerald-400 border border-slate-700 hover:bg-slate-700"
                      >
                        Now
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreset('morning')}
                        className="px-2 py-0.5 text-[11px] font-semibold rounded bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                      >
                        9:00 AM
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreset('afternoon')}
                        className="px-2 py-0.5 text-[11px] font-semibold rounded bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                      >
                        2:00 PM
                      </button>
                    </div>
                  </div>
                  <input
                    id="dateTime"
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    required
                    className="w-full bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl p-3 focus:outline-none text-sm"
                  />
                </div>

                {/* Zone Selectors with Swap Button */}
                <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
                  <div className="md:col-span-5 space-y-2">
                    <Label htmlFor="sourceZone" className="text-slate-300 font-medium text-xs">
                      From Time Zone (Source)
                    </Label>
                    <select
                      id="sourceZone"
                      value={sourceZone}
                      onChange={(e) => setSourceZone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-white rounded-xl p-3 text-sm"
                    >
                      {timeZones.map((tz) => (
                        <option key={tz.id} value={tz.value} className="bg-slate-900 text-white">
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-1 flex justify-center pt-4 md:pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={swapZones}
                      className="rounded-full bg-slate-900 border-slate-700 text-emerald-400 hover:bg-slate-800 h-10 w-10"
                      title="Swap Source and Target Timezones"
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="md:col-span-5 space-y-2">
                    <Label htmlFor="targetZone" className="text-slate-300 font-medium text-xs">
                      To Time Zone (Target)
                    </Label>
                    <select
                      id="targetZone"
                      value={targetZone}
                      onChange={(e) => setTargetZone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-white rounded-xl p-3 text-sm"
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

              {/* Converted Result Cards */}
              {convertedResult && (
                <div className="mt-8 space-y-6">
                  <div className="p-6 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      {/* Source Time Display */}
                      <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                            Source ({convertedResult.sourceOffset})
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${convertedResult.isSourceBusiness ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}`}>
                            {convertedResult.isSourceBusiness ? 'Business Hours' : 'Outside Office Hours'}
                          </span>
                        </div>
                        <p className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                          {convertedResult.sourceTime}
                        </p>
                        <p className="text-xs text-slate-400">{convertedResult.sourceLabel}</p>
                      </div>

                      {/* Target Time Display */}
                      <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                            Target ({convertedResult.targetOffset})
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${convertedResult.isTargetBusiness ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}`}>
                            {convertedResult.isTargetBusiness ? 'Business Hours' : 'Outside Office Hours'}
                          </span>
                        </div>
                        <p className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1">
                          {convertedResult.targetTime}
                        </p>
                        <p className="text-xs text-slate-400">{convertedResult.targetLabel}</p>
                      </div>
                    </div>

                    {/* Offset Summary Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        <span>
                          <strong>{convertedResult.targetCity}</strong> is currently{' '}
                          <span className="text-emerald-400 font-bold">{convertedResult.diffDirection}</span>{' '}
                          <strong>{convertedResult.sourceCity}</strong>.
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Daylight Saving Adjusted Automatically
                      </div>
                    </div>
                  </div>

                  {/* 24-Hour Business Overlap Visual Timeline */}
                  <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Building2 className="w-4 h-4 text-emerald-400" />
                        24-Hour Business Overlap Timeline (09:00 - 17:00 Standard Workday)
                      </div>
                      <span className="text-xs text-slate-400">
                        Green = Mutual Working Window
                      </span>
                    </div>

                    <div className="overflow-x-auto pb-2">
                      <div className="min-w-[600px] space-y-2">
                        {/* Source Hour Bar */}
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                          <span className="w-20 shrink-0 text-slate-300 text-right pr-2">
                            {convertedResult.sourceCity.slice(0, 8)}:
                          </span>
                          {convertedResult.hoursMap.map((h, i) => (
                            <div
                              key={i}
                              className={`flex-1 text-center py-1 rounded ${h.sWork ? 'bg-sky-950 text-sky-300 border border-sky-800/60 font-bold' : 'bg-slate-900 text-slate-400'}`}
                            >
                              {h.sourceHour}h
                            </div>
                          ))}
                        </div>

                        {/* Target Hour Bar */}
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                          <span className="w-20 shrink-0 text-slate-300 text-right pr-2">
                            {convertedResult.targetCity.slice(0, 8)}:
                          </span>
                          {convertedResult.hoursMap.map((h, i) => (
                            <div
                              key={i}
                              className={`flex-1 text-center py-1 rounded ${h.overlap ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm' : h.tWork ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-bold' : 'bg-slate-900 text-slate-400'}`}
                            >
                              {h.targetHour}h
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contextual Resource Callout Box */}
                  <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Recommended Global Collaboration Resource: Async Team Workflow
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                        Managing cross-continental teams across multiple time zones? Learn how leading international engineering organizations implement follow-the-sun handoffs, shared timezone overlap windows, and async documentation.
                      </p>
                    </div>
                    <Link
                      to="/blog"
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg whitespace-nowrap transition-colors self-start sm:self-center"
                    >
                      Read Remote Guides
                    </Link>
                  </div>

                  <div className="pt-2">
                    <ShareResults
                      title="Global Time Zone Conversion"
                      text={`Converted time between ${convertedResult.sourceLabel} and ${convertedResult.targetLabel}: ${convertedResult.sourceTime} = ${convertedResult.targetTime}!`}
                      url="https://calczoon.com/lifestyle/time-zone-converter"
                    />
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Aside Column */}
          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  Why Standard Time Zones Exist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed">
                <p>
                  Because Earth rotates $360^\circ$ on its axis every 24 hours, the surface traverses approximately $15^\circ$ of longitude every hour ($360^\circ / 24 = 15^\circ/\text{hr}$).
                </p>
                <p>
                  Prior to the 1880s, virtually every town kept its own local solar time based on the midday sun. Railroad expansion necessitated standard time zones, formalizing the Greenwich Meridian (0° Longitude) as the global anchor.
                </p>
              </CardContent>
            </Card>

            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
              <h4 className="font-bold text-white mb-2 text-sm">Productivity & Financial Calculators</h4>
              <p className="text-xs text-slate-300 mb-4">
                Explore our full suite of precision date, salary, freelancer tax, and currency calculation tools.
              </p>
              <Link to="/lifestyle" className="text-emerald-400 hover:text-emerald-300 hover:underline text-xs font-bold transition-colors block">
                Explore Lifestyle Calculators &rarr;
              </Link>
            </div>

            <RelatedTools />
          </aside>
        </div>

        {/* Deep Educational & Academic Content Section */}
        <div className="mt-12 space-y-10 text-slate-300 leading-relaxed text-sm sm:text-base">
          {/* Section 1: Mathematical Formula & Time Coordinate Mechanics */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              The Mathematical Formulas Governing Time Zone Conversions
            </h2>
            <p>
              Every civilian time zone in the world is mathematically defined as a positive or negative temporal displacement (offset) relative to Coordinated Universal Time (UTC). When converting a calendar date and clock time from a <strong>Source Time Zone ($T_{\text{source}}$)</strong> to a <strong>Target Time Zone ($T_{\text{target}}$)</strong>, civil algorithms execute a two-step normalisation process through the UTC epoch.
            </p>

            <div className="my-6 p-5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-sm space-y-3">
              <div className="text-emerald-400 font-semibold">1. Conversion to Coordinated Universal Time (UTC):</div>
              <div className="text-slate-200">
                $$T_{\text{UTC}} = T_{\text{source}} - \text{Offset}_{\text{source}}$$
              </div>
              <div className="text-emerald-400 font-semibold pt-2">2. Conversion to Target Local Time:</div>
              <div className="text-slate-200">
                $$T_{\text{target}} = T_{\text{UTC}} + \text{Offset}_{\text{target}}$$
              </div>
              <div className="text-emerald-400 font-semibold pt-2">3. Direct Relative Time Differential ($\Delta t$):</div>
              <div className="text-slate-200">
                $$\Delta t = \text{Offset}_{\text{target}} - \text{Offset}_{\text{source}}$$
                $$T_{\text{target}} = T_{\text{source}} + \Delta t$$
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              When $\Delta t > 0$, the target location is ahead in time, potentially rolling the calendar date over to tomorrow (+1 day). When $\Delta t < 0$, the target location is behind in time, which can shift the calendar date backward to yesterday (-1 day).
            </p>
          </section>

          {/* Section 2: 10-Row Static HTML Reference Table */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Major World Financial Hubs: Standard vs. Daylight Offsets & Trading Hours
            </h2>
            <p className="text-sm text-slate-300">
              International commerce and foreign exchange (Forex) liquidity depend upon precise awareness of local financial market hours and daylight saving transitions across the globe's principal financial centers.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-emerald-400 font-semibold">
                    <th className="p-3 sm:p-4">Financial Hub / City</th>
                    <th className="p-3 sm:p-4">Standard Code</th>
                    <th className="p-3 sm:p-4">Standard UTC Offset</th>
                    <th className="p-3 sm:p-4">Daylight (DST) Offset</th>
                    <th className="p-3 sm:p-4">DST Observation Period</th>
                    <th className="p-3 sm:p-4">Local Stock Market Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">London (LSE)</td>
                    <td className="p-3 sm:p-4">GMT / BST</td>
                    <td className="p-3 sm:p-4 font-medium text-emerald-400">UTC+0</td>
                    <td className="p-3 sm:p-4 font-medium text-sky-400">UTC+1</td>
                    <td className="p-3 sm:p-4">Last Sun Mar &ndash; Last Sun Oct</td>
                    <td className="p-3 sm:p-4">08:00 &ndash; 16:30 BST</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">New York (NYSE / NASDAQ)</td>
                    <td className="p-3 sm:p-4">EST / EDT</td>
                    <td className="p-3 sm:p-4 font-medium text-emerald-400">UTC-5</td>
                    <td className="p-3 sm:p-4 font-medium text-sky-400">UTC-4</td>
                    <td className="p-3 sm:p-4">Second Sun Mar &ndash; First Sun Nov</td>
                    <td className="p-3 sm:p-4">09:30 &ndash; 16:00 EDT</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">Tokyo (TSE)</td>
                    <td className="p-3 sm:p-4">JST</td>
                    <td className="p-3 sm:p-4 font-medium text-emerald-400">UTC+9</td>
                    <td className="p-3 sm:p-4 text-slate-400">No DST (UTC+9)</td>
                    <td className="p-3 sm:p-4">Not Observed</td>
                    <td className="p-3 sm:p-4">09:00 &ndash; 15:30 JST</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">Frankfurt & Paris (Euronext)</td>
                    <td className="p-3 sm:p-4">CET / CEST</td>
                    <td className="p-3 sm:p-4 font-medium text-emerald-400">UTC+1</td>
                    <td className="p-3 sm:p-4 font-medium text-sky-400">UTC+2</td>
                    <td className="p-3 sm:p-4">Last Sun Mar &ndash; Last Sun Oct</td>
                    <td className="p-3 sm:p-4">09:00 &ndash; 17:30 CEST</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">Hong Kong (HKEX)</td>
                    <td className="p-3 sm:p-4">HKT</td>
                    <td className="p-3 sm:p-4 font-medium text-emerald-400">UTC+8</td>
                    <td className="p-3 sm:p-4 text-slate-400">No DST (UTC+8)</td>
                    <td className="p-3 sm:p-4">Not Observed</td>
                    <td className="p-3 sm:p-4">09:30 &ndash; 16:00 HKT</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">Singapore (SGX)</td>
                    <td className="p-3 sm:p-4">SGT</td>
                    <td className="p-3 sm:p-4 font-medium text-emerald-400">UTC+8</td>
                    <td className="p-3 sm:p-4 text-slate-400">No DST (UTC+8)</td>
                    <td className="p-3 sm:p-4">Not Observed</td>
                    <td className="p-3 sm:p-4">09:00 &ndash; 17:00 SGT</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">Sydney (ASX)</td>
                    <td className="p-3 sm:p-4">AEST / AEDT</td>
                    <td className="p-3 sm:p-4 font-medium text-emerald-400">UTC+10</td>
                    <td className="p-3 sm:p-4 font-medium text-sky-400">UTC+11</td>
                    <td className="p-3 sm:p-4">First Sun Oct &ndash; First Sun Apr</td>
                    <td className="p-3 sm:p-4">10:00 &ndash; 16:00 AEDT</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">Dubai (DFM / DIFC)</td>
                    <td className="p-3 sm:p-4">GST</td>
                    <td className="p-3 sm:p-4 font-medium text-emerald-400">UTC+4</td>
                    <td className="p-3 sm:p-4 text-slate-400">No DST (UTC+4)</td>
                    <td className="p-3 sm:p-4">Not Observed</td>
                    <td className="p-3 sm:p-4">10:00 &ndash; 15:00 GST</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">Chicago (CME Group)</td>
                    <td className="p-3 sm:p-4">CST / CDT</td>
                    <td className="p-3 sm:p-4 font-medium text-emerald-400">UTC-6</td>
                    <td className="p-3 sm:p-4 font-medium text-sky-400">UTC-5</td>
                    <td className="p-3 sm:p-4">Second Sun Mar &ndash; First Sun Nov</td>
                    <td className="p-3 sm:p-4">08:30 &ndash; 15:15 CDT</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">San Francisco / LA (Tech Hub)</td>
                    <td className="p-3 sm:p-4">PST / PDT</td>
                    <td className="p-3 sm:p-4 font-medium text-emerald-400">UTC-8</td>
                    <td className="p-3 sm:p-4 font-medium text-sky-400">UTC-7</td>
                    <td className="p-3 sm:p-4">Second Sun Mar &ndash; First Sun Nov</td>
                    <td className="p-3 sm:p-4">06:30 &ndash; 13:00 (Wall St Align)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: UTC vs GMT and Astronomical Foundations */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Astronomical Foundations: Greenwich Mean Time vs. Coordinated Universal Time
            </h2>
            <p>
              In historical maritime navigation, Greenwich Mean Time (GMT) was calculated from the astronomical transit of the sun over the Prime Meridian at the Royal Observatory in Greenwich, England. However, because Earth's orbital speed varies slightly along its elliptical path around the sun and planetary tidal friction gradually decelerates Earth's rotational speed, astronomical solar time is not perfectly constant.
            </p>
            <p>
              In 1972, international telecommunications standards officially instituted <strong>Coordinated Universal Time (UTC)</strong>. UTC is governed by an ensemble of hundreds of ultra-precise atomic cesium fountain clocks (International Atomic Time, TAI). To keep civil atomic time synchronized within 0.9 seconds of the physical rotation of the Earth, occasional <em>leap seconds</em> are inserted as coordinated by the International Earth Rotation and Reference Systems Service (IERS).
            </p>
          </section>

          {/* Section 4: Two Realistic Step-by-Step Numerical Case Studies */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Real-World Step-by-Step Case Studies: Multi-Continental Calculations
            </h2>

            {/* Case Study 1 */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-emerald-400">
                  Case Study 1: Scheduling an Executive Sync Across an 8-Hour Transatlantic Gap
                </h3>
                <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-medium">
                  Corporate Scheduling
                </span>
              </div>
              <p className="text-sm">
                A Chief Technology Officer situated in <strong>San Francisco (Pacific Daylight Time, PDT = UTC-7)</strong> needs to convene an emergency product sprint review with lead system architects in <strong>London (British Summer Time, BST = UTC+1)</strong> on Thursday, June 18th.
              </p>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono space-y-2">
                <p className="text-slate-200">
                  <strong>Source Offset (San Francisco PDT):</strong> $\text{Offset}_{\text{SF}} = -7\text{ hours}$
                </p>
                <p className="text-slate-200">
                  <strong>Target Offset (London BST):</strong> $\text{Offset}_{\text{London}} = +1\text{ hour}$
                </p>
                <p className="text-emerald-400 font-bold">
                  $$\Delta t = (+1) - (-7) = 1 + 7 = +8\text{ hours differential}$$
                </p>
                <p className="text-slate-200 pt-2">
                  <strong>Meeting Proposal:</strong> 09:00 AM PDT in San Francisco.
                </p>
                <p className="text-slate-200">
                  $$T_{\text{UTC}} = 09:00 - (-7) = 16:00\text{ UTC}$$
                </p>
                <p className="text-sky-400 font-bold">
                  $$T_{\text{London}} = 16:00\text{ UTC} + 1 = 17:00\text{ BST (5:00 PM Thursday)}$$
                </p>
              </div>
              <p className="text-sm text-slate-300">
                <strong>Result:</strong> By scheduling at 09:00 AM PDT, the London engineering team can participate at 5:00 PM BST right before concluding their workday, preventing late-night overtime while remaining inside business hours.
              </p>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-sky-400">
                  Case Study 2: Global Financial Market Opening Bells & Date Crossover Mechanics
                </h3>
                <span className="text-xs px-3 py-1 bg-sky-500/10 text-sky-400 rounded-full border border-sky-500/20 font-medium">
                  Financial Trading
                </span>
              </div>
              <p className="text-sm">
                A quantitative currency arbitrage fund in <strong>New York (Eastern Standard Time, EST = UTC-5)</strong> monitors the opening bell of the Tokyo Stock Exchange (TSE) in <strong>Tokyo (Japan Standard Time, JST = UTC+9)</strong>.
              </p>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono space-y-2">
                <p className="text-slate-200">
                  <strong>TSE Opening Bell:</strong> Monday morning at 09:00 AM JST.
                </p>
                <p className="text-slate-200">
                  <strong>UTC Offset Equation:</strong>
                </p>
                <p className="text-slate-200">
                  $$T_{\text{UTC}} = \text{Monday 09:00 JST} - 9\text{ hours} = \text{Monday 00:00 UTC (Midnight)}$$
                </p>
                <p className="text-emerald-400 font-bold">
                  $$T_{\text{New York}} = \text{Monday 00:00 UTC} - 5\text{ hours} = \text{Sunday 19:00 EST (7:00 PM Sunday)}$$
                </p>
              </div>
              <p className="text-sm text-slate-300">
                <strong>Result:</strong> When markets open on Monday morning in Tokyo, it is still Sunday evening (7:00 PM EST) in New York across the calendar date boundary, enabling Wall Street desks to execute Asian market orders before domestic markets open.
              </p>
            </div>
          </section>

          {/* Section 5: Pitfalls & DST Peculiarities */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Daylight Saving Complexities & 5 Dangerous Time Zone Pitfalls
            </h2>
            <p>
              Converting time zones across international borders introduces multiple edge cases that frequently corrupt calendar schedules and distributed database records:
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  1. The "March/October Gap" in Transatlantic Daylight Saving
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  The United States enacts Daylight Saving Time on the second Sunday of March, while European nations transition on the last Sunday of March. During these intermediate two to three weeks, the time difference between New York and London contracts from 5 hours down to 4 hours.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  2. Assuming GMT is Always Equal to London Time
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  GMT is fixed at UTC+0 throughout all twelve months. London only observes GMT during winter; during summer, British civil time advances to British Summer Time (BST, UTC+1). Scheduling a summer conference call in "GMT" when you mean London time results in a 1-hour miscommunication error.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  3. Non-Observant Regional Enclaves (Arizona, Hawaii & Queensland)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Not all sub-regions observe their country's national daylight saving rules. In the US, Hawaii and most of Arizona stay on permanent standard time. In Australia, Sydney (New South Wales) observes daylight saving (AEDT, UTC+11), while Brisbane (Queensland) remains on AEST (UTC+10) year-round.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  4. International Date Line Crossover Flight Schedules
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Commercial flights traversing westbound across the Pacific from Los Angeles to Auckland or Sydney lose an entire calendar day upon crossing the 180° meridian. A departure on Friday evening lands on Sunday morning, with Saturday completely bypassed.
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  5. Software Database Storage in Local Time Instead of UTC
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Storing dates and timestamps in local wall-clock time causes severe database ambiguity when the clock jumps backward during autumn DST transitions (where the 01:00 to 02:00 AM hour occurs twice). High-reliability enterprise software must always persist timestamps in ISO 8601 UTC format.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* FAQs */}
        <Faq items={faqItems} className="mt-12" />

        {/* Disclaimer */}
        <Disclaimer text="This time zone converter uses the IANA Time Zone Database to calculate regional offsets and Daylight Saving Time transitions. Civil statutes and political daylight saving decrees are subject to legislative change by sovereign governments. Confirm critical flight and legal deadlines with official transport carriers." />
      </div>
    </>
  );
};

export default TimeZoneConverter;

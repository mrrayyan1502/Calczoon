'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveCalculation } from '@/lib/history';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { Moon, Sun, Clock, Sparkles, Bed, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';

const SleepCalculator = () => {
  const [wakeUpTime, setWakeUpTime] = useState('07:00');
  const [bedTime, setBedTime] = useState('23:00');
  const [mode, setMode] = useState('wakeUp'); // 'wakeUp' (find bedtime) or 'bedTime' (find wake time) or 'now'
  const [result, setResult] = useState(null);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const calculateForNow = () => {
    const now = new Date();
    const sleepLatencyMs = 15 * 60 * 1000; // 15 minutes to fall asleep
    const cycleMs = 90 * 60 * 1000; // 90 minute ultradian cycle
    
    const cycles = [];
    for (let i = 1; i <= 6; i++) {
      const targetTime = new Date(now.getTime() + sleepLatencyMs + (i * cycleMs));
      cycles.push({
        cycle: i,
        time: formatTime(targetTime),
        hours: (i * 1.5).toFixed(1),
        quality: i >= 5 ? 'Optimal Rest' : i === 4 ? 'Adequate Rest' : 'Short Nap / Light Rest'
      });
    }

    const newResult = {
      type: 'now',
      baseTime: formatTime(now),
      options: cycles
    };
    setResult(newResult);
    saveCalculation({
      type: 'Sleep Calculator',
      inputs: { mode: 'Sleep Now', time: formatTime(now) },
      result: { 'Optimal Wake': cycles[4].time }
    });
  };

  const calculateSleep = (e) => {
    if (e) e.preventDefault();

    const sleepLatencyMs = 15 * 60 * 1000; // 15 mins to fall asleep
    const cycleMs = 90 * 60 * 1000; // 90 min REM/NREM cycle

    if (mode === 'wakeUp') {
      if (!wakeUpTime) {
        setResult({ error: "Please enter your desired wake-up time." });
        return;
      }
      const [hours, minutes] = wakeUpTime.split(':').map(Number);
      let targetDate = new Date();
      targetDate.setHours(hours, minutes, 0, 0);

      const cycles = [];
      // Calculate backwards for bedtimes: 6, 5, 4, 3 cycles
      for (let i = 6; i >= 1; i--) {
        const bedDate = new Date(targetDate.getTime() - (i * cycleMs) - sleepLatencyMs);
        cycles.push({
          cycle: i,
          time: formatTime(bedDate),
          hours: (i * 1.5).toFixed(1),
          quality: i >= 5 ? 'Optimal Rest' : i === 4 ? 'Adequate Rest' : 'Short Rest'
        });
      }

      const newResult = {
        type: 'wakeUp',
        targetTime: wakeUpTime,
        options: cycles
      };
      setResult(newResult);
      saveCalculation({
        type: 'Sleep Calculator',
        inputs: { mode: 'Wake Up At', wakeUpTime },
        result: { 'Optimal Bedtime': cycles[1].time } // 5 cycles
      });
    } else if (mode === 'bedTime') {
      if (!bedTime) {
        setResult({ error: "Please enter your intended bedtime." });
        return;
      }
      const [hours, minutes] = bedTime.split(':').map(Number);
      let targetDate = new Date();
      targetDate.setHours(hours, minutes, 0, 0);

      const cycles = [];
      for (let i = 1; i <= 6; i++) {
        const wakeDate = new Date(targetDate.getTime() + (i * cycleMs) + sleepLatencyMs);
        cycles.push({
          cycle: i,
          time: formatTime(wakeDate),
          hours: (i * 1.5).toFixed(1),
          quality: i >= 5 ? 'Optimal Rest' : i === 4 ? 'Adequate Rest' : 'Short Rest'
        });
      }

      const newResult = {
        type: 'bedTime',
        targetTime: bedTime,
        options: cycles
      };
      setResult(newResult);
      saveCalculation({
        type: 'Sleep Calculator',
        inputs: { mode: 'Go To Bed At', bedTime },
        result: { 'Optimal Wake': cycles[4].time } // 5 cycles
      });
    } else {
      calculateForNow();
    }
  };

  const faqItems = [
    {
      question: "What is an ultradian sleep cycle and how long does it last?",
      answer: "A standard human sleep cycle lasts approximately 90 to 110 minutes (averaging 90 minutes). During each cycle, the brain alternates sequentially through Non-Rapid Eye Movement (NREM) Stage 1, Stage 2, Stage 3 Slow Wave Sleep, and Rapid Eye Movement (REM) sleep."
    },
    {
      question: "Why do I feel groggy when waking up after 8 hours of sleep?",
      answer: "Morning grogginess (clinically termed sleep inertia) occurs when an alarm jolts you awake during Stage 3 Slow Wave Sleep (deep delta wave sleep). Waking at the conclusion of a full 90-minute sleep cycle—when brain activity is in light NREM Stage 1 or REM sleep—allows you to wake feeling energetic and alert."
    },
    {
      question: "How much sleep latency (time to fall asleep) does the calculator include?",
      answer: "Our calculator incorporates a 15-minute physiological sleep onset latency buffer. Polysomnographic research confirms that healthy adults take between 10 and 20 minutes to transition from full wakefulness to Stage 1 sleep."
    },
    {
      question: "How many sleep cycles should a healthy adult achieve each night?",
      answer: "Clinical sleep medicine specialists recommend that adults achieve 5 to 6 complete cycles per night (7.5 to 9.0 hours of biological sleep). Consistently getting fewer than 4 cycles (6.0 hours) creates cumulative sleep debt, impairing executive function, metabolic regulation, and immune surveillance."
    },
    {
      question: "Can I use 90-minute sleep cycle timing for daytime power naps?",
      answer: "Yes. An effective daytime nap should either be a brief 20-minute 'power nap' (staying within light N1 sleep to avoid grogginess) or a full 90-minute sleep cycle that completes an entire NREM-to-REM sequence."
    },
    {
      question: "How does the circadian rhythm interact with homeostatic sleep pressure?",
      answer: "Sleep is governed by the Two-Process Model: Process S (homeostatic sleep pressure driven by adenosine accumulation in the basal forebrain) and Process C (the 24-hour circadian clock governed by the suprachiasmatic nucleus responding to natural morning sunlight and darkness)."
    },
    {
      question: "How does alcohol consumption affect nocturnal sleep cycles?",
      answer: "Although alcohol acts as a central nervous system depressant accelerating sleep onset latency, it severely fragments sleep architecture during the second half of the night, suppressing critical REM sleep and causing frequent micro-arousals."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Sleep Cycle Calculator",
    "description": "Calculate optimal bedtime and wake-up times based on natural 90-minute REM and NREM ultradian sleep cycles and sleep latency.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/lifestyle/sleep-calculator",
    "browserRequirements": "Requires JavaScript."
  };

  const faqPageSchema = {
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
        title="Sleep Calculator: 90-Minute Sleep Cycle & Bedtime Optimizer"
        description="Free Sleep Cycle Calculator. Calculate the best time to go to bed or wake up based on 90-minute REM/NREM cycles to wake up refreshed without morning grogginess."
        canonicalUrl="/lifestyle/sleep-calculator"
        schema={[webAppSchema, faqPageSchema]}
        keywords={['sleep calculator', 'sleep cycle calculator', 'best bedtime calculator', 'rem sleep calculator', 'wake up refreshed']}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Sleep Cycle & Bedtime Calculator"
          description="Synchronize your sleep schedule with natural 90-minute ultradian cycles. Wake up between sleep stages to eliminate sleep inertia and optimize daytime cognitive performance."
          icon={Moon}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-xl">Sleep Schedule Parameters</CardTitle>
                <CardDescription className="text-slate-400">Choose your calculation goal and time preferences</CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={calculateSleep} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-medium">Select Sleep Timing Goal</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        type="button"
                        onClick={() => { setMode('wakeUp'); setResult(null); }}
                        className={`text-xs sm:text-sm py-2 ${mode === 'wakeUp' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-950 border border-slate-700 text-slate-300 hover:text-white'}`}
                      >
                        I Need to Wake At...
                      </Button>
                      <Button
                        type="button"
                        onClick={() => { setMode('bedTime'); setResult(null); }}
                        className={`text-xs sm:text-sm py-2 ${mode === 'bedTime' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-950 border border-slate-700 text-slate-300 hover:text-white'}`}
                      >
                        I Go to Bed At...
                      </Button>
                      <Button
                        type="button"
                        onClick={() => { setMode('now'); calculateForNow(); }}
                        className={`text-xs sm:text-sm py-2 ${mode === 'now' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-950 border border-slate-700 text-slate-300 hover:text-white'}`}
                      >
                        Sleeping Right Now
                      </Button>
                    </div>
                  </div>

                  {mode === 'wakeUp' && (
                    <div className="space-y-2">
                      <Label htmlFor="wakeUpTime" className="text-slate-300 font-medium">Target Morning Wake-Up Time</Label>
                      <Input
                        id="wakeUpTime"
                        type="time"
                        value={wakeUpTime}
                        onChange={(e) => setWakeUpTime(e.target.value)}
                        required
                        className="bg-slate-950 border-slate-700 text-white text-lg max-w-xs"
                      />
                      <p className="text-xs text-slate-400">Calculator works backwards to determine exact bedtimes factoring in 15 minutes to fall asleep.</p>
                    </div>
                  )}

                  {mode === 'bedTime' && (
                    <div className="space-y-2">
                      <Label htmlFor="bedTime" className="text-slate-300 font-medium">Planned Evening Bedtime</Label>
                      <Input
                        id="bedTime"
                        type="time"
                        value={bedTime}
                        onChange={(e) => setBedTime(e.target.value)}
                        required
                        className="bg-slate-950 border-slate-700 text-white text-lg max-w-xs"
                      />
                      <p className="text-xs text-slate-400">Calculator projects forward to identify optimal wake times between 90-minute cycles.</p>
                    </div>
                  )}

                  {mode !== 'now' && (
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 text-base">
                      Calculate Optimal Cycles
                    </Button>
                  )}
                </form>
              </CardContent>

              {result && !result.error && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-950/80 border-t border-slate-800 rounded-b-xl">
                  <div className="w-full space-y-5">
                    <div className="text-center py-4 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-slate-400 text-sm font-medium">
                        {mode === 'wakeUp' ? 'Recommended Bedtimes for Wake-Up at ' + result.targetTime :
                         mode === 'bedTime' ? 'Recommended Wake-Up Times for Bedtime at ' + result.targetTime :
                         'If You Go to Bed Right Now (' + result.baseTime + ')'}
                      </p>
                      <p className="text-xs text-emerald-400 mt-1 font-medium">
                        Includes 15 minutes natural sleep onset latency buffer
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {result.options.map((opt) => (
                        <div
                          key={opt.cycle}
                          className={`p-4 rounded-xl border text-center transition-all ${
                            opt.cycle === 5
                              ? 'bg-emerald-950/40 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                              : opt.cycle === 6
                              ? 'bg-slate-900 border-slate-700'
                              : 'bg-slate-900/60 border-slate-800'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1 text-xs">
                            <span className="text-slate-400 font-medium">{opt.cycle} Sleep Cycles</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              opt.cycle >= 5 ? 'bg-emerald-900/80 text-emerald-300' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {opt.hours} hrs
                            </span>
                          </div>
                          <p className="text-2xl font-extrabold text-white my-1">{opt.time}</p>
                          <p className={`text-xs ${opt.cycle >= 5 ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}>
                            {opt.quality} {opt.cycle === 5 && '★ (Recommended)'}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Monetization / Recommended Sleep Resource Callout Box */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <p className="font-semibold text-emerald-300">Circadian Light Hygiene Protocol</p>
                        <p className="text-slate-300 leading-relaxed">
                          Viewing 10 to 15 minutes of direct natural morning sunlight within 60 minutes of waking triggers a natural cortisol awakening surge and sets an internal biological timer for nocturnal melatonin synthesis. Eliminate blue screen exposure from mobile phones and tablets 90 minutes before your target bedtime to maintain rapid sleep onset.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <ShareResults
                        title="My Sleep Cycle Schedule"
                        text={`I calculated my optimal sleep schedule using 90-minute cycles on Calczoon! Wake refreshed without grogginess.`}
                        url="/lifestyle/sleep-calculator"
                      />
                    </div>
                  </div>
                </CardFooter>
              )}

              {result && result.error && (
                <CardFooter className="p-6 bg-slate-950/80 border-t border-slate-800 text-center rounded-b-xl">
                  <p className="text-rose-400 font-semibold text-center w-full">{result.error}</p>
                </CardFooter>
              )}
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <RelatedTools category="health" />
          </aside>
        </div>

        {/* In-depth Educational & AEO Section */}
        <section className="mt-12 bg-slate-900/60 rounded-xl p-8 border border-slate-800 space-y-8 text-slate-300">
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Comprehensive Clinical Guide to Sleep Cycles & Circadian Biology</h2>
            <p className="leading-relaxed text-slate-300">
              Sleep is not a passive state of physiological dormancy; it is an active, highly orchestrated neurobiological process essential for somatic tissue repair, systemic immune surveillance, endocrine hormone production, and cerebral synaptic plasticity. Rather than existing on a continuous linear continuum, human nocturnal slumber unfolds in distinct 90-minute ultradian cycles. Understanding the neurological stages of sleep and learning how to align wake times with cycle terminations empowers individuals to eradicate morning sleep inertia, enhance memory retention, and optimize physical vitality.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">The Architecture of a 90-Minute Sleep Cycle</h3>
            <p className="mb-4 leading-relaxed">
              Every complete ultradian sleep cycle encompasses four sequential electroencephalographic (EEG) stages, transitioning from light wakefulness into restorative deep sleep and dreaming:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">1. NREM Stage 1 (N1: 5% of Total Sleep)</p>
                <p className="text-xs leading-relaxed text-slate-300">
                  The initial transition from wakefulness to somnolence lasting 1 to 7 minutes. Alpha brain waves give way to low-amplitude theta waves. Heart rate, breathing, and muscle tone begin to diminish, occasionally interrupted by sudden hypnic jerks.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">2. NREM Stage 2 (N2: 45–50% of Total Sleep)</p>
                <p className="text-xs leading-relaxed text-slate-300">
                  True biological sleep characterized by distinctive EEG sleep spindles (bursts of 12–14 Hz oscillatory activity) and high-amplitude K-complexes. Core body temperature drops, and the brain processes short-term memories into cortical storage.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">3. NREM Stage 3 (N3: 20–25% Slow Wave Sleep)</p>
                <p className="text-xs leading-relaxed text-slate-300">
                  Known as deep delta-wave sleep. Blood pressure declines by 10–20%, cellular protein synthesis accelerates, and the anterior pituitary gland secretes human growth hormone (HGH). Crucial for muscular recovery, tissue repair, and glymphatic clearance of neurotoxic amyloid-beta plaques.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">4. REM Sleep (20–25% Rapid Eye Movement)</p>
                <p className="text-xs leading-relaxed text-slate-300">
                  The primary dream stage characterized by rapid conjugate eye movements, desynchronized beta/theta EEG waves, and somatic muscle atonia (temporary paralysis). Vital for emotional regulation, creative synthesis, and complex motor skill consolidation.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Age-Based Sleep Needs & Sleep Architecture Benchmark Table</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The benchmark table below outlines evidence-based sleep duration recommendations established by the National Sleep Foundation and the American Academy of Sleep Medicine (AASM):
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-200">
                  <tr>
                    <th className="p-3">Demographic Age Group</th>
                    <th className="p-3">Recommended Daily Sleep</th>
                    <th className="p-3">Equivalent 90-Min Cycles</th>
                    <th className="p-3">Deep N3 Sleep Share</th>
                    <th className="p-3">Primary Biological Function</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Newborns (0–3 Months)</td>
                    <td className="p-3 text-slate-200">14 – 17 Hours</td>
                    <td className="p-3 text-slate-300">Polyphasic (9–11 cycles)</td>
                    <td className="p-3 text-slate-400">50% Active Sleep</td>
                    <td className="p-3">Synaptogenesis and massive neurological growth.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Infants (4–11 Months)</td>
                    <td className="p-3 text-slate-200">12 – 15 Hours</td>
                    <td className="p-3 text-slate-300">8 – 10 Cycles</td>
                    <td className="p-3 text-slate-400">30% Slow Wave</td>
                    <td className="p-3">Motor skill consolidation and circadian entrainment.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Toddlers (1–2 Years)</td>
                    <td className="p-3 text-slate-200">11 – 14 Hours</td>
                    <td className="p-3 text-slate-300">7 – 9 Cycles</td>
                    <td className="p-3 text-slate-400">25–30% Slow Wave</td>
                    <td className="p-3">Language acquisition and gross motor coordination.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">School Age (6–13 Years)</td>
                    <td className="p-3 text-slate-200">9 – 11 Hours</td>
                    <td className="p-3 text-slate-300">6 – 7 Cycles</td>
                    <td className="p-3 text-slate-400">20–25% Slow Wave</td>
                    <td className="p-3">Cognitive development, academic retention, somatic growth.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Teenagers (14–17 Years)</td>
                    <td className="p-3 text-slate-200">8 – 10 Hours</td>
                    <td className="p-3 text-slate-300">5 – 6 Cycles</td>
                    <td className="p-3 text-slate-400">20% Slow Wave</td>
                    <td className="p-3">Prefrontal cortex remodeling; delayed melatonin release phase.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Young Adults (18–25 Years)</td>
                    <td className="p-3 text-emerald-400 font-semibold">7 – 9 Hours</td>
                    <td className="p-3 text-slate-300">5 – 6 Cycles</td>
                    <td className="p-3 text-slate-400">18–22% Slow Wave</td>
                    <td className="p-3">Complex problem solving, emotional regulation, physical peak.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Adults (26–64 Years)</td>
                    <td className="p-3 text-emerald-400 font-semibold">7 – 9 Hours</td>
                    <td className="p-3 text-slate-300">5 – 6 Cycles</td>
                    <td className="p-3 text-slate-400">15–20% Slow Wave</td>
                    <td className="p-3">Cardiovascular repair, immune defense, cognitive preservation.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Older Adults (65+ Years)</td>
                    <td className="p-3 text-slate-200">7 – 8 Hours</td>
                    <td className="p-3 text-slate-300">4.5 – 5.5 Cycles</td>
                    <td className="p-3 text-slate-400">10–15% Slow Wave</td>
                    <td className="p-3">Advanced sleep phase; fragmented architecture management.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Step-by-Step Numerical Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-emerald-400 text-base">Case Study 1: Professional with 6:30 AM Wake-Up Target</h4>
                <p><strong>Desired Alarm Time:</strong> 06:30 AM</p>
                <p><strong>Sleep Onset Latency Buffer:</strong> 15 minutes</p>
                <p><strong>Option A (6 Cycles = 9.0 hrs sleep):</strong> Sleep at 09:15 PM (06:30 AM - 555 mins)</p>
                <p><strong>Option B (5 Cycles = 7.5 hrs sleep):</strong> Sleep at 10:45 PM (06:30 AM - 465 mins) ★ Recommended</p>
                <p><strong>Option C (4 Cycles = 6.0 hrs sleep):</strong> Sleep at 12:15 AM (06:30 AM - 375 mins)</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-emerald-300 font-semibold">Recommended Choice: Bedtime at 10:45 PM</p>
                  <p className="text-slate-300 text-xs mt-1">Outcome: Completes exactly 5 full ultradian cycles. Waking at 6:30 AM coincides with light REM sleep transition, ensuring zero morning brain fog.</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-sky-400 text-base">Case Study 2: Night Shift Healthcare Worker Going to Bed at 7:00 AM</h4>
                <p><strong>Scheduled Bedtime:</strong> 07:00 AM</p>
                <p><strong>Sleep Latency Buffer:</strong> 15 minutes (asleep by 07:15 AM)</p>
                <p><strong>4 Cycles Target (6.0 hrs):</strong> Wake at 01:15 PM</p>
                <p><strong>5 Cycles Target (7.5 hrs):</strong> Wake at 02:45 PM ★ Optimal</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-sky-300 font-semibold">Recommended Wake Time: 02:45 PM</p>
                  <p className="text-slate-300 text-xs mt-1">Outcome: Prevents midday micro-awakenings caused by circadian cortisol spikes through blackout curtain hygiene and cycle synchronization.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">5 Critical Sleep Optimization Pitfalls</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed text-slate-300">
              <li>
                <strong>Hitting the Alarm Snooze Button:</strong> Snoozing for 9 or 10 minutes fragments your sleep architecture, forcing the brain back into the beginning of a brand-new sleep cycle that gets violently interrupted, producing severe sleep inertia.
              </li>
              <li>
                <strong>Consuming Caffeine Late in the Afternoon:</strong> Caffeine has an average metabolic half-life of 5 to 7 hours and a quarter-life of up to 12 hours. A cup of coffee at 4:00 PM still leaves 25% of caffeine active in brain adenosine receptors at 4:00 AM, suppressing deep Stage 3 slow-wave sleep.
              </li>
              <li>
                <strong>Variable Weekend Sleep Schedules (Social Jetlag):</strong> Sleeping in 2 to 3 hours later on weekends shifts your biological clock out of sync with Monday morning demands, disrupting circadian gene expression and cognitive readiness.
              </li>
              <li>
                <strong>Using Alcohol as a Sleep Aid:</strong> Alcohol accelerates sleep onset but severely inhibits neurotransmitter balance, abolishing REM sleep and causing autonomic nervous system tachycardia during the early morning hours.
              </li>
              <li>
                <strong>Sub-Optimal Bedroom Temperature:</strong> The human body must drop its core temperature by 1 to 2 degrees Fahrenheit to initiate and sustain deep sleep. Ambient room temperatures above 68°F (20°C) cause restlessness and spontaneous micro-arousals.
              </li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="Medical Disclaimer: This sleep cycle calculator is provided strictly for educational and sleep hygiene planning purposes. It does not replace medical consultation for chronic insomnia, obstructive sleep apnea (OSA), narcolepsy, or other clinical sleep disorders." />
      </div>
    </>
  );
};

export default SleepCalculator;

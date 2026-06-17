import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveCalculation } from '@/lib/history';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import { motion } from 'framer-motion';
import Seo from '@/components/Seo';

const SleepCalculator = () => {
  const [wakeUpTime, setWakeUpTime] = useState('');
  const [bedTime, setBedTime] = useState('');
  const [mode, setMode] = useState('wakeUp'); // 'wakeUp' or 'bedTime'
  const [result, setResult] = useState(null);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const calculateForBedTime = () => {
    const now = new Date();
    const currentFormattedTime = formatTime(now);
    setBedTime(currentFormattedTime);
    
    const cycles = [];
    const timeToFallAsleep = 14 * 60 * 1000;
    for (let i = 1; i <= 6; i++) {
      const wakeTime = new Date(now.getTime() + (90 * i * 60 * 1000) + timeToFallAsleep);
      cycles.push(formatTime(wakeTime));
    }
    setResult({ type: 'bedTime', options: cycles });
    saveCalculation({ type: 'Sleep (Bed Time)', inputs: { bedTime: 'Now' }, result: { Times: cycles.join(', ') } });
  };
  
  const calculateSleepCycles = (e) => {
    if (e) e.preventDefault();
    setResult(null);

    if (mode === 'wakeUp') {
      if (!wakeUpTime) { setResult({ error: "Please enter a wake up time." }); return; }
      const [hours, minutes] = wakeUpTime.split(':').map(Number);
      let targetDate = new Date();
      targetDate.setHours(hours, minutes, 0, 0);

      if (targetDate < new Date()) {
          targetDate.setDate(targetDate.getDate() + 1);
      }

      const cycles = [];
      const timeToFallAsleep = 14 * 60 * 1000;
      for (let i = 6; i >= 1; i--) {
        const sleepTime = new Date(targetDate.getTime() - (90 * i * 60 * 1000) - timeToFallAsleep);
        cycles.push(formatTime(sleepTime));
      }
      setResult({ type: 'wakeUp', options: cycles });
      saveCalculation({ type: 'Sleep (Wake Up)', inputs: { wakeUpTime }, result: { Times: cycles.join(', ') } });
    } else {
        calculateForBedTime();
    }
  };

  const handleModeChange = (newMode) => {
    setResult(null); 
    setBedTime('');
    setWakeUpTime('');
    setMode(newMode);
    if (newMode === 'bedTime') {
        calculateForBedTime();
    }
  };

  const faqItems = [
    { question: "What is a sleep cycle?", answer: "A sleep cycle is the progression through different stages of sleep, from light sleep to deep sleep and REM (Rapid Eye Movement) sleep. One full cycle typically lasts about 90 minutes. Waking up at the end of a cycle, rather than in the middle of it, helps you feel more refreshed and less groggy." },
    { question: "How long does it take to fall asleep?", answer: "The average person takes about 14 minutes to fall asleep. This calculator incorporates this 14-minute 'sleep latency' period into its calculations to provide more accurate bedtime or wake-up time suggestions." },
    { question: "Why is it recommended to get 5-6 sleep cycles?", answer: "For most adults, 7.5 to 9 hours of sleep per night is ideal for optimal health and cognitive function. This corresponds to completing five or six full 90-minute sleep cycles. This calculator helps you plan your sleep to hit that target." },
    { question: "Can I use this calculator for a nap?", answer: "Yes! For a short power nap, aim for one full 90-minute sleep cycle to avoid waking up during a deep sleep stage, which can cause grogginess. You can also take a very short 'caffeine nap' of about 20-25 minutes." }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Sleep Cycle Calculator",
    "description": "Calculate the best time to go to bed or wake up based on natural 90-minute sleep cycles to feel refreshed and energized. Avoid waking up groggy by timing your sleep perfectly.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/lifestyle/sleep-calculator",
    "browserRequirements": "Requires a modern web browser with JavaScript enabled."
  };
  
  return (
    <>
      <Seo
        title="Sleep Cycle Calculator: Find Your Perfect Bedtime"
        description="Use our Sleep Calculator to find the best time to wake up to feel refreshed and plan your sleep cycles for better rest. Easy and free online tool."
        canonicalUrl="/lifestyle/sleep-calculator"
        schema={[webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }]}
      />
      <div className="max-w-4xl mx-auto py-8 px-4">
          <Card className="bg-slate-800/50 border-slate-700">
             <CardHeader className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Sleep Cycle Calculator</h1>
              <p className="text-slate-300">Find the perfect time to go to bed or wake up feeling refreshed and energized.</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
                <Button onClick={() => handleModeChange('wakeUp')} variant={mode === 'wakeUp' ? 'default' : 'outline'} className="w-full sm:w-auto">I want to wake up at...</Button>
                <Button onClick={() => handleModeChange('bedTime')} variant={mode === 'bedTime' ? 'default' : 'outline'} className="w-full sm:w-auto">If I go to bed now...</Button>
              </div>
              
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {mode === 'wakeUp' && (
                  <form onSubmit={calculateSleepCycles} className="space-y-4 max-w-sm mx-auto">
                    <div className="space-y-2 text-center">
                      <Label htmlFor="wakeUpTime" className="text-lg">What time do you need to wake up?</Label>
                      <Input id="wakeUpTime" type="time" value={wakeUpTime} onChange={(e) => setWakeUpTime(e.target.value)} required className="bg-slate-900 border-slate-700 text-center text-xl p-2" />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate Bedtimes</Button>
                  </form>
                )}
              </motion.div>

              {result && !result.error && (
                <div className="mt-8 text-center">
                  {mode === 'bedTime' ? (
                    <>
                      <p className="text-slate-300 mb-2">To feel rested, you should aim to wake up at one of the following times:</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {result.options.map((time, index) => (
                          <div key={index} className="bg-slate-700 text-white font-bold py-2 px-4 rounded-lg text-lg">
                            {time}
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-slate-400 mt-4">These times are based on completing full 90-minute sleep cycles.</p>
                    </>
                  ) : (
                    <>
                      <p className="text-slate-300 mb-2">To wake up at {wakeUpTime}, you should try to fall asleep at one of the following times:</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {result.options.map((time, index) => (
                          <div key={index} className="bg-slate-700 text-white font-bold py-2 px-4 rounded-lg text-lg">
                            {time}
                          </div>
                        ))}
                      </div>
                       <p className="text-sm text-slate-400 mt-4">It takes the average person about 14 minutes to fall asleep, which is factored into these times.</p>
                    </>
                  )}
                   <div className="mt-4">
                        <ShareResults
                            title="My Optimal Sleep Times"
                            text={`I used Calczoon's Sleep Calculator to find my best sleep times! Check it out:`}
                            url="https://calczoon.com/lifestyle/sleep-calculator"
                        />
                    </div>
                </div>
              )}
               {result && result.error && <p className="text-destructive text-center mt-4">{result.error}</p>}
            </CardContent>
          </Card>
          <Faq items={faqItems} className="mt-8"/>
          <Disclaimer text="This calculator is for informational purposes only and should not replace professional medical advice. Individual sleep cycles and needs can vary." />
      </div>
    </>
  );
};

export default SleepCalculator;
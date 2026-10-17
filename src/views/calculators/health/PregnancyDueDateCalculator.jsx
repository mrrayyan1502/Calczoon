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
import { Baby, Calendar, Heart, Sparkles, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

const PregnancyDueDateCalculator = () => {
  const [calculationMethod, setCalculationMethod] = useState('lmp'); // 'lmp', 'conception', 'ivf'
  const [lmp, setLmp] = useState('');
  const [conceptionDate, setConceptionDate] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [ivfType, setIvfType] = useState('day5'); // 'day3', 'day5'
  const [result, setResult] = useState(null);

  const calculateDueDate = (e) => {
    if (e) e.preventDefault();
    
    let baseDate = null;
    let daysToAdd = 280;
    const cycle = parseInt(cycleLength, 10) || 28;

    if (calculationMethod === 'lmp') {
      if (!lmp) {
        setResult({ error: "Please enter the first day of your last menstrual period (LMP)." });
        return;
      }
      baseDate = new Date(lmp);
      // Naegele's rule adjusted for cycle length: 280 days + (cycle - 28)
      daysToAdd = 280 + (cycle - 28);
    } else if (calculationMethod === 'conception') {
      if (!conceptionDate) {
        setResult({ error: "Please enter your documented conception or ovulation date." });
        return;
      }
      baseDate = new Date(conceptionDate);
      daysToAdd = 266; // 38 weeks from conception
    } else if (calculationMethod === 'ivf') {
      if (!conceptionDate) {
        setResult({ error: "Please enter your embryo transfer date." });
        return;
      }
      baseDate = new Date(conceptionDate);
      daysToAdd = ivfType === 'day5' ? 261 : 263; // 266 minus embryo age
    }

    if (!baseDate || isNaN(baseDate.getTime())) {
      setResult({ error: "Please provide a valid calendar date." });
      return;
    }

    // Calculate Estimated Due Date (EDD)
    const dueDate = new Date(baseDate.getTime());
    dueDate.setDate(dueDate.getDate() + daysToAdd);

    // Calculate Gestational Age
    const today = new Date();
    // Theoretical LMP date for gestational age calculation
    const theoreticalLmp = new Date(dueDate.getTime());
    theoreticalLmp.setDate(theoreticalLmp.getDate() - 280);

    const diffTime = today.getTime() - theoreticalLmp.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    let gestationalWeeks = Math.floor(diffDays / 7);
    let gestationalDays = diffDays % 7;
    if (gestationalWeeks < 0) gestationalWeeks = 0;
    if (gestationalDays < 0) gestationalDays = 0;

    let trimester = 'First Trimester';
    if (gestationalWeeks >= 28) {
      trimester = 'Third Trimester';
    } else if (gestationalWeeks >= 13) {
      trimester = 'Second Trimester';
    }

    // Milestones
    const endFirstTrimester = new Date(theoreticalLmp.getTime());
    endFirstTrimester.setDate(endFirstTrimester.getDate() + 91); // 13 weeks

    const anatomyScan = new Date(theoreticalLmp.getTime());
    anatomyScan.setDate(anatomyScan.getDate() + 140); // 20 weeks

    const viabilityThreshold = new Date(theoreticalLmp.getTime());
    viabilityThreshold.setDate(viabilityThreshold.getDate() + 168); // 24 weeks

    const fullTerm = new Date(theoreticalLmp.getTime());
    fullTerm.setDate(fullTerm.getDate() + 259); // 37 weeks

    const formatDate = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

    const newResult = {
      dueDate: formatDate(dueDate),
      gestationalWeeks,
      gestationalDays,
      trimester,
      milestones: {
        endFirstTrimester: formatDate(endFirstTrimester),
        anatomyScan: formatDate(anatomyScan),
        viabilityThreshold: formatDate(viabilityThreshold),
        fullTerm: formatDate(fullTerm)
      }
    };

    setResult(newResult);
    saveCalculation({
      type: 'Pregnancy Due Date',
      inputs: { method: calculationMethod, cycleLength },
      result: { DueDate: newResult.dueDate, Trimester: newResult.trimester }
    });
  };

  const faqItems = [
    {
      question: "How is an estimated due date (EDD) calculated using Naegele's Rule?",
      answer: "Naegele's Rule adds 280 days (40 gestational weeks or 10 lunar months) to the first day of your last normal menstrual period (LMP). It assumes a standard 28-day menstrual cycle where ovulation occurs precisely on day 14. For longer or shorter cycles, days are added or subtracted accordingly."
    },
    {
      question: "What percentage of babies are actually born on their exact calculated due date?",
      answer: "Statistically, only approximately 4% to 5% of infants arrive on their exact estimated due date. However, roughly 90% of spontaneous healthy births occur within a normal physiological window of two weeks before or two weeks after the projected date (between 37 and 42 completed gestational weeks)."
    },
    {
      question: "Why does gestational age differ from the actual age of the developing fetus?",
      answer: "Gestational age is measured from the first day of the last menstrual period, roughly two weeks before conception occurs. Therefore, gestational age is approximately two weeks older than the actual embryonic post-conceptional age."
    },
    {
      question: "How does an early first-trimester ultrasound affect my due date?",
      answer: "A crown-rump length (CRL) measurement taken via ultrasound between 8 and 13 weeks of gestation is the most accurate clinical dating method available. If the ultrasound estimate diverges from the LMP-calculated due date by more than 5 to 7 days, the American College of Obstetricians and Gynecologists (ACOG) recommends adopting the ultrasound date."
    },
    {
      question: "How is due date calculated for In Vitro Fertilization (IVF) pregnancies?",
      answer: "For IVF pregnancies, the due date is calculated with absolute mathematical precision from the embryo transfer date. For a Day-3 embryo transfer, 263 days are added; for a Day-5 blastocyst transfer, 261 days are added."
    },
    {
      question: "What are the clinical definitions of preterm, full term, and post-term pregnancy?",
      answer: "According to ACOG guidelines: Preterm is delivery prior to 37 completed weeks; Early Term is 37 weeks 0 days to 38 weeks 6 days; Full Term is 39 weeks 0 days to 40 weeks 6 days; Late Term is 41 weeks 0 days to 41 weeks 6 days; and Post-term is 42 weeks 0 days and beyond."
    },
    {
      question: "How does irregular cycle length impact due date accuracy?",
      answer: "In women with cycles varying from 32 to 35 days, ovulation occurs later than day 14. Failing to adjust for cycle length leads to an artificially early due date, which can cause false clinical alarms regarding post-date induction."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Pregnancy Due Date & Gestational Age Calculator",
    "description": "Calculate your pregnancy due date, current gestational age, and trimester milestones using Naegele's rule, conception date, or IVF embryo transfer.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/health/pregnancy-due-date-calculator",
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
        title="Pregnancy Due Date Calculator: Naegele's Rule & Trimester Timeline"
        description="Free Pregnancy Due Date Calculator. Compute your estimated due date, gestational age, and key clinical milestones from your LMP, conception, or IVF date."
        canonicalUrl="/health/pregnancy-due-date-calculator"
        schema={[webAppSchema, faqPageSchema]}
        keywords={['pregnancy due date calculator', 'due date calculator', 'naegeles rule', 'gestational age calculator', 'ivf due date calculator']}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Pregnancy Due Date & Gestational Age Calculator"
          description="Accurately estimate your delivery date, fetal developmental milestones, and current gestational age based on clinical obstetrical standards."
          icon={Baby}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-xl">Dating Calculation Inputs</CardTitle>
                <CardDescription className="text-slate-400">Choose your calculation method and enter relevant dates</CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={calculateDueDate} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-medium">Calculation Method</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        type="button"
                        onClick={() => setCalculationMethod('lmp')}
                        className={`text-xs sm:text-sm py-2 ${calculationMethod === 'lmp' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-950 border border-slate-700 text-slate-300 hover:text-white'}`}
                      >
                        Last Period (LMP)
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setCalculationMethod('conception')}
                        className={`text-xs sm:text-sm py-2 ${calculationMethod === 'conception' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-950 border border-slate-700 text-slate-300 hover:text-white'}`}
                      >
                        Conception Date
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setCalculationMethod('ivf')}
                        className={`text-xs sm:text-sm py-2 ${calculationMethod === 'ivf' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-950 border border-slate-700 text-slate-300 hover:text-white'}`}
                      >
                        IVF Transfer
                      </Button>
                    </div>
                  </div>

                  {calculationMethod === 'lmp' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lmp" className="text-slate-300 font-medium">First Day of Last Period (LMP)</Label>
                        <Input
                          id="lmp"
                          type="date"
                          value={lmp}
                          onChange={(e) => setLmp(e.target.value)}
                          required
                          className="bg-slate-950 border-slate-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cycleLength" className="text-slate-300 font-medium">Average Menstrual Cycle Length (Days)</Label>
                        <Input
                          id="cycleLength"
                          type="number"
                          value={cycleLength}
                          onChange={(e) => setCycleLength(e.target.value)}
                          placeholder="28"
                          min="21"
                          max="40"
                          className="bg-slate-950 border-slate-700 text-white"
                        />
                        <p className="text-xs text-slate-400">Standard normal cycle is 28 days (ovulation on Day 14).</p>
                      </div>
                    </div>
                  )}

                  {calculationMethod === 'conception' && (
                    <div className="space-y-2">
                      <Label htmlFor="conceptionDate" className="text-slate-300 font-medium">Documented Conception / Ovulation Date</Label>
                      <Input
                        id="conceptionDate"
                        type="date"
                        value={conceptionDate}
                        onChange={(e) => setConceptionDate(e.target.value)}
                        required
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                  )}

                  {calculationMethod === 'ivf' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ivfDate" className="text-slate-300 font-medium">Embryo Transfer Date</Label>
                        <Input
                          id="ivfDate"
                          type="date"
                          value={conceptionDate}
                          onChange={(e) => setConceptionDate(e.target.value)}
                          required
                          className="bg-slate-950 border-slate-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-300 font-medium">Embryo Transfer Stage</Label>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            onClick={() => setIvfType('day3')}
                            className={`flex-1 ${ivfType === 'day3' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-950 border border-slate-700 text-slate-300 hover:text-white'}`}
                          >
                            Day 3 Embryo
                          </Button>
                          <Button
                            type="button"
                            onClick={() => setIvfType('day5')}
                            className={`flex-1 ${ivfType === 'day5' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-950 border border-slate-700 text-slate-300 hover:text-white'}`}
                          >
                            Day 5 Blastocyst
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 text-base">
                    Calculate Estimated Due Date
                  </Button>
                </form>
              </CardContent>

              {result && !result.error && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-950/80 border-t border-slate-800 rounded-b-xl">
                  <div className="w-full space-y-5">
                    <div className="text-center py-5 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-slate-400 text-sm font-medium">Estimated Delivery Due Date (EDD)</p>
                      <p className="text-3xl md:text-5xl font-extrabold text-emerald-400 my-1">
                        {result.dueDate}
                      </p>
                      <p className="text-sm text-slate-300 mt-2">
                        Current Gestational Age: <span className="font-bold text-sky-400">{result.gestationalWeeks} Weeks, {result.gestationalDays} Days</span> ({result.trimester})
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-400">End of 1st Trimester</p>
                        <p className="text-sm font-bold text-white mt-1">{result.milestones.endFirstTrimester}</p>
                        <p className="text-[10px] text-slate-500">13 Weeks</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-400">Anatomy Scan</p>
                        <p className="text-sm font-bold text-white mt-1">{result.milestones.anatomyScan}</p>
                        <p className="text-[10px] text-slate-500">18–20 Weeks</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-400">Viability Threshold</p>
                        <p className="text-sm font-bold text-white mt-1">{result.milestones.viabilityThreshold}</p>
                        <p className="text-[10px] text-slate-500">24 Weeks</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-400">Full Term Window</p>
                        <p className="text-sm font-bold text-emerald-400 mt-1">{result.milestones.fullTerm}</p>
                        <p className="text-[10px] text-slate-500">37 Weeks Completed</p>
                      </div>
                    </div>

                    {/* Monetization / Recommended Prenatal Resource Box */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <p className="font-semibold text-emerald-300">Evidence-Based Prenatal Nutrition Guidance</p>
                        <p className="text-slate-300 leading-relaxed">
                          Daily supplementation with 400 to 800 mcg of folic acid (or bioactive methylfolate) prior to conception and through the first 12 weeks reduces neural tube defect risk by up to 70%. Consult your obstetrician or certified midwife regarding specialized third-trimester iron and DHA omega-3 requirements.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <ShareResults
                        title="Our Baby's Estimated Due Date"
                        text={`Our estimated due date is ${result.dueDate}! Calculated using clinical obstetrical standards on Calczoon.`}
                        url="/health/pregnancy-due-date-calculator"
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
            <h2 className="text-2xl font-bold text-white mb-3">Comprehensive Clinical Guide to Pregnancy Due Date & Gestational Milestones</h2>
            <p className="leading-relaxed text-slate-300">
              Determining an accurate Estimated Due Date (EDD) is one of the most critical clinical tasks in modern obstetrics. Accurate dating coordinates the timing of prenatal screening tests (such as non-invasive prenatal cell-free DNA screening and nuchal translucency scans), tracks fetal intrauterine growth trajectories, guides scheduled maternal care appointments, and prevents premature or inappropriately delayed labor inductions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">The Clinical Mathematics of Naegele's Rule</h3>
            <p className="mb-4 leading-relaxed">
              Formulated in the 19th century by German obstetrician Franz Karl Naegele, standard obstetrical dating assumes human gestation encompasses 280 calendar days (40 completed gestational weeks) counting from the onset of the last normal menstrual period (LMP):
            </p>
            <div className="bg-slate-950 p-4 rounded-lg font-mono text-center text-emerald-400 border border-slate-800 text-sm md:text-base mb-4">
              EDD = LMP Date + 1 Year - 3 Months + 7 Days + (Cycle Length - 28 Days)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">Standard 28-Day Cycle</p>
                <p className="text-xs leading-relaxed">
                  Assuming ovulation occurs on Day 14, post-conceptional fetal life spans 266 days (38 weeks), with an additional 14 pre-ovulatory days incorporated into the clinical 280-day gestational timeline.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">Cycle Length Adjustment (Parikh's Formula)</p>
                <p className="text-xs leading-relaxed">
                  In women with non-standard menstrual cycles, the luteal phase remains fixed at 14 days, while the follicular phase shifts. For a 32-day cycle, ovulation occurs on Day 18, shifting the estimated due date 4 days later.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Pregnancy Week-by-Week Developmental Milestones Reference Table</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The reference table below illustrates key fetal anatomical milestones, maternal biological shifts, and routine clinical screenings across all three trimesters:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-200">
                  <tr>
                    <th className="p-3">Gestational Week</th>
                    <th className="p-3">Trimester</th>
                    <th className="p-3">Fetal Size Benchmark</th>
                    <th className="p-3">Key Anatomical Milestone</th>
                    <th className="p-3">Routine Clinical Evaluation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Week 4</td>
                    <td className="p-3 text-sky-400">1st Trimester</td>
                    <td className="p-3 text-slate-300">Poppy Seed (1 mm)</td>
                    <td className="p-3">Blastocyst implantation; primitive chorionic sac develops.</td>
                    <td className="p-3">Home urine hCG pregnancy test confirmation.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Week 8</td>
                    <td className="p-3 text-sky-400">1st Trimester</td>
                    <td className="p-3 text-slate-300">Raspberry (1.6 cm)</td>
                    <td className="p-3">Cardiac activity detectable; neural tube fully closed.</td>
                    <td className="p-3">Initial prenatal intake; transvaginal viability scan.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Week 12</td>
                    <td className="p-3 text-sky-400">1st Trimester</td>
                    <td className="p-3 text-slate-300">Plum (5.4 cm)</td>
                    <td className="p-3">Fingernails, reflexes develop; placenta takes over hormone synthesis.</td>
                    <td className="p-3">Nuchal Translucency (NT) & first-trimester aneuploidy screen.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Week 16</td>
                    <td className="p-3 text-emerald-400">2nd Trimester</td>
                    <td className="p-3 text-slate-300">Avocado (11.6 cm)</td>
                    <td className="p-3">Eyes make slow movements; skeletal ossification progresses.</td>
                    <td className="p-3">Quad screen (maternal serum alpha-fetoprotein AFP).</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Week 20</td>
                    <td className="p-3 text-emerald-400">2nd Trimester</td>
                    <td className="p-3 text-slate-300">Banana (25.6 cm)</td>
                    <td className="p-3">Maternal quickening felt; vernix caseosa coats delicate skin.</td>
                    <td className="p-3">Comprehensive level-II anatomical ultrasound scan.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Week 24</td>
                    <td className="p-3 text-emerald-400">2nd Trimester</td>
                    <td className="p-3 text-slate-300">Cantaloupe (30 cm)</td>
                    <td className="p-3">Clinical threshold of extrauterine viability; alveolar buds form.</td>
                    <td className="p-3">Oral glucose tolerance test (screening for gestational diabetes).</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Week 28</td>
                    <td className="p-3 text-amber-400">3rd Trimester</td>
                    <td className="p-3 text-slate-300">Eggplant (37.6 cm)</td>
                    <td className="p-3">Eyes open; rhythmic respiratory movements established.</td>
                    <td className="p-3">Anti-D immunoglobulin (RhoGAM) injection for Rh-negative mothers.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Week 32</td>
                    <td className="p-3 text-amber-400">3rd Trimester</td>
                    <td className="p-3 text-slate-300">Pineapple (42.4 cm)</td>
                    <td className="p-3">Rapid brain development; body stores subcutaneous white fat.</td>
                    <td className="p-3">Bi-weekly clinical checkups; fundal height monitoring.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Week 36</td>
                    <td className="p-3 text-amber-400">3rd Trimester</td>
                    <td className="p-3 text-slate-300">Papaya (47.4 cm)</td>
                    <td className="p-3">Lungs produce adequate surfactant; fetus usually settles head-down.</td>
                    <td className="p-3">Group B Streptococcus (GBS) rectovaginal screening swab.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Week 40</td>
                    <td className="p-3 text-emerald-400 font-bold">Full Term</td>
                    <td className="p-3 text-slate-300">Watermelon (51.2 cm)</td>
                    <td className="p-3">Full neurological, immunological, and organ system maturity.</td>
                    <td className="p-3">Weekly cervical checks, biophysical profile (BPP) if past due.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Step-by-Step Numerical Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-emerald-400 text-base">Case Study 1: Natural Conception with a 32-Day Menstrual Cycle</h4>
                <p><strong>Last Menstrual Period (LMP):</strong> April 10, 2026</p>
                <p><strong>Cycle Duration:</strong> 32 days (4 days longer than standard 28-day baseline)</p>
                <p><strong>Standard 280-Day Date:</strong> January 15, 2027</p>
                <p><strong>Cycle Length Adjustment:</strong> Add 4 days to account for late ovulation on Day 18</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-emerald-300 font-semibold">Adjusted Estimated Due Date (EDD): January 19, 2027</p>
                  <p className="text-slate-300 text-xs mt-1">Clinical Note: Prevents premature post-date induction scheduling by accurately reflecting a 4-day later ovulation.</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-sky-400 text-base">Case Study 2: IVF Day-5 Frozen Blastocyst Transfer</h4>
                <p><strong>Embryo Transfer Date:</strong> June 1, 2026</p>
                <p><strong>Embryonic Developmental Age:</strong> Day 5 blastocyst</p>
                <p><strong>Calculation Formula:</strong> Transfer Date + 261 days (or Transfer Date - 19 days for equivalent LMP)</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-sky-300 font-semibold">Estimated Due Date (EDD): February 17, 2027</p>
                  <p className="text-slate-300 text-xs mt-1">Clinical Note: IVF transfer dates offer absolute biological precision, superseding any menstrual cycle estimates.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">5 Critical Due Date Misconceptions to Understand</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed text-slate-300">
              <li>
                <strong>Assuming the Due Date is an Expiration Date:</strong> A human pregnancy is not an engineered machine with an exact expiration timestamp. A normal full-term delivery occurs safely anywhere between 37 weeks 0 days and 41 weeks 6 days.
              </li>
              <li>
                <strong>Overreliance on Late Ultrasound Scans for Dating:</strong> Ultrasounds performed in the third trimester have an error margin of up to plus or minus 2 to 3 weeks due to normal genetic variations in fetal size, whereas first-trimester scans have an error margin of only 3 to 5 days.
              </li>
              <li>
                <strong>Believing the Due Date Guarantees Labor Timing:</strong> Cervical dilation, fetal hormonal triggers, and maternal oxytocin receptor sensitivity dictate spontaneous labor onset, not calendar dates.
              </li>
              <li>
                <strong>Equating Gestational Age with Fetal Age:</strong> Counting from your last menstrual period includes the approximately two weeks before conception occurred, meaning the biological fetus is always roughly two weeks younger than stated gestational age.
              </li>
              <li>
                <strong>Ignoring Post-Term Surveillance:</strong> When pregnancies extend past 41 weeks, amniotic fluid volume and placental vascular function decline, requiring biophysical profile (BPP) ultrasound monitoring and non-stress testing (NST).
              </li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="Medical Disclaimer: This pregnancy due date calculator is provided strictly for educational and informational purposes. An estimated due date calculated via menstrual dates does not replace formal clinical dating conducted by a licensed obstetrician or certified nurse-midwife utilizing standardized first-trimester ultrasonography." />
      </div>
    </>
  );
};

export default PregnancyDueDateCalculator;

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
import { Scale } from 'lucide-react';

const IdealWeightCalculator = () => {
  const [gender, setGender] = useState('male');
  const [unitSystem, setUnitSystem] = useState('metric');
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [result, setResult] = useState(null);

  const calculateIdealWeight = (e) => {
    e.preventDefault();
    
    let heightInInches = 0;

    if (unitSystem === 'metric') {
      const cm = parseFloat(heightCm);
      if (isNaN(cm) || cm <= 0) {
        setResult({ error: "Please enter a valid height." });
        return;
      }
      heightInInches = cm / 2.54;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      if ((ft === 0 && inch === 0) || ft < 0 || inch < 0) {
        setResult({ error: "Please enter a valid height." });
        return;
      }
      heightInInches = (ft * 12) + inch;
    }

    if (heightInInches < 60) {
      setResult({ error: "These formulas are only valid for heights 5 feet (60 inches) and above." });
      return;
    }

    const heightOver60 = heightInInches - 60;
    
    // Devine Formula
    const devineBase = gender === 'male' ? 50.0 : 45.5;
    const devineWeight = devineBase + (2.3 * heightOver60);

    // Robinson Formula
    const robinsonBase = gender === 'male' ? 52.0 : 49.0;
    const robinsonMult = gender === 'male' ? 1.9 : 1.7;
    const robinsonWeight = robinsonBase + (robinsonMult * heightOver60);

    // Miller Formula
    const millerBase = gender === 'male' ? 56.2 : 53.1;
    const millerMult = gender === 'male' ? 1.41 : 1.36;
    const millerWeight = millerBase + (millerMult * heightOver60);

    // Hamwi Formula
    const hamwiBase = gender === 'male' ? 48.0 : 45.5;
    const hamwiMult = gender === 'male' ? 2.7 : 2.2;
    const hamwiWeight = hamwiBase + (hamwiMult * heightOver60);

    // Calculate Average
    const avgKg = (devineWeight + robinsonWeight + millerWeight + hamwiWeight) / 4;
    const minKg = Math.min(devineWeight, robinsonWeight, millerWeight, hamwiWeight);
    const maxKg = Math.max(devineWeight, robinsonWeight, millerWeight, hamwiWeight);

    // Convert to Lbs
    const kgToLbs = (kg) => kg * 2.20462;

    const newResult = {
      avgKg: avgKg.toFixed(1),
      avgLbs: kgToLbs(avgKg).toFixed(1),
      rangeKg: `${minKg.toFixed(1)} - ${maxKg.toFixed(1)}`,
      rangeLbs: `${kgToLbs(minKg).toFixed(1)} - ${kgToLbs(maxKg).toFixed(1)}`,
      formulas: {
        devine: devineWeight.toFixed(1),
        robinson: robinsonWeight.toFixed(1),
        miller: millerWeight.toFixed(1),
        hamwi: hamwiWeight.toFixed(1)
      }
    };
    
    setResult(newResult);
    saveCalculation({
      type: 'Ideal Weight',
      inputs: { gender, height: unitSystem === 'metric' ? `${heightCm} cm` : `${heightFt}'${heightIn}"` },
      result: { Ideal: `${newResult.avgKg} kg` }
    });
  };

  const faqItems = [
    {
      question: "What formulas are used?",
      answer: "This calculator uses the four most popular clinical formulas: Devine (1974), Robinson (1983), Miller (1983), and Hamwi (1964). It provides the result for each and an overall average."
    },
    {
      question: "Are these formulas perfectly accurate?",
      answer: "No single formula is perfect. These formulas estimate ideal body weight based purely on height and gender. They do not account for muscle mass, frame size, or age."
    },
    {
      question: "Why does it say my height must be over 5 feet?",
      answer: "The standard medical formulas (Devine, Robinson, Miller, Hamwi) were mathematically designed to calculate weight starting from a baseline of 5 feet (60 inches). They do not scale down accurately for shorter heights."
    }
  ];

  const pageTitle = "Ideal Weight Calculator: Devine & Robinson Formulas";
  const pageDescription = "Calculate your ideal body weight range based on your height and gender using four standard medical formulas.";

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} canonicalUrl="/health/ideal-weight-calculator" />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={Scale} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white">Calculate Ideal Weight</CardTitle>
                <CardDescription>Enter your biological gender and height</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={calculateIdealWeight} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium">Biological Gender</Label>
                      <div className="flex gap-2">
                        <Button type="button" variant={gender === 'male' ? 'default' : 'outline'} onClick={() => setGender('male')} className={`flex-1 ${gender === 'male' ? 'bg-emerald-600 hover:bg-emerald-700 border-none' : 'bg-slate-900 border-slate-700 text-slate-300'}`}>Male</Button>
                        <Button type="button" variant={gender === 'female' ? 'default' : 'outline'} onClick={() => setGender('female')} className={`flex-1 ${gender === 'female' ? 'bg-emerald-600 hover:bg-emerald-700 border-none' : 'bg-slate-900 border-slate-700 text-slate-300'}`}>Female</Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium">Measurement System</Label>
                      <div className="flex gap-2">
                        <Button type="button" variant={unitSystem === 'metric' ? 'default' : 'outline'} onClick={() => setUnitSystem('metric')} className={`flex-1 ${unitSystem === 'metric' ? 'bg-emerald-600 hover:bg-emerald-700 border-none' : 'bg-slate-900 border-slate-700 text-slate-300'}`}>Metric (cm)</Button>
                        <Button type="button" variant={unitSystem === 'imperial' ? 'default' : 'outline'} onClick={() => setUnitSystem('imperial')} className={`flex-1 ${unitSystem === 'imperial' ? 'bg-emerald-600 hover:bg-emerald-700 border-none' : 'bg-slate-900 border-slate-700 text-slate-300'}`}>Imperial (ft/in)</Button>
                      </div>
                    </div>
                  </div>

                  {unitSystem === 'metric' ? (
                    <div className="space-y-2">
                      <Label htmlFor="heightCm" className="text-slate-300 font-medium">Height (cm)</Label>
                      <Input id="heightCm" type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="e.g., 175" required className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="heightFt" className="text-slate-300 font-medium">Height (feet)</Label>
                        <Input id="heightFt" type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="e.g., 5" required className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heightIn" className="text-slate-300 font-medium">Height (inches)</Label>
                        <Input id="heightIn" type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="e.g., 9" required className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl" />
                      </div>
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
                    Calculate Ideal Weight
                  </Button>
                </form>
              </CardContent>
              {result && !result.error && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-800/30 border-t border-slate-700/40">
                  <div className="w-full space-y-4">
                    <h3 className="text-lg font-bold text-slate-300">Your Ideal Weight Range</h3>
                    
                    <div className="text-center mb-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                      <p className="text-slate-400 text-sm font-medium">Average Recommended Weight</p>
                      <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                        {result.avgKg} kg <span className="text-2xl text-slate-500 font-normal">/ {result.avgLbs} lbs</span>
                      </p>
                      <p className="text-emerald-400 mt-2 font-medium">Healthy Range: {result.rangeKg} kg</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">Devine (1974)</p>
                        <p className="font-semibold text-slate-200">{result.formulas.devine} kg</p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">Robinson (1983)</p>
                        <p className="font-semibold text-slate-200">{result.formulas.robinson} kg</p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">Miller (1983)</p>
                        <p className="font-semibold text-slate-200">{result.formulas.miller} kg</p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400">Hamwi (1964)</p>
                        <p className="font-semibold text-slate-200">{result.formulas.hamwi} kg</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <ShareResults title="Ideal Weight Calculation" text={`My ideal weight is around ${result.avgKg} kg according to standard medical formulas. Check yours on CalcZoon!`} url="/health/ideal-weight-calculator" />
                    </div>
                  </div>
                </CardFooter>
              )}
              {result && result.error && (
                <CardFooter className="p-6 bg-slate-800/30 border-t border-slate-700/40 text-center">
                  <p className="text-destructive text-center w-full">{result.error}</p>
                </CardFooter>
              )}
            </Card>
          </div>
          <aside className="lg:col-span-1 space-y-6">
            <RelatedTools category="health" />
          </aside>
        </div>
        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="This calculator uses standard medical formulas intended for average adults over 5 feet tall. It should not replace professional medical advice." />
      </div>
    </>
  );
};

export default IdealWeightCalculator;

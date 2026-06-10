import React, { useState } from 'react';
import Seo from '@/components/Seo';
import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { saveCalculation } from '@/lib/history';
import TDEE_FAQ from '@/components/calculators/tdee/TDEE_FAQ';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import ShareResults from '@/components/ShareResults';

const BMICalculator = () => {
  const [unit, setUnit] = useState('metric');
  const [weight, setWeight] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const calculateBMI = (e) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    let heightM;

    if (unit === 'metric') {
      const heightCmNum = parseFloat(heightCm);
      if (isNaN(weightNum) || isNaN(heightCmNum) || weightNum <= 0 || heightCmNum <= 0) {
        toast({ title: "Invalid Input", description: "Please enter valid weight and height.", variant: "destructive" });
        return;
      }
      heightM = heightCmNum / 100;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      const totalInches = ft * 12 + inches;
      if (isNaN(weightNum) || totalInches <= 0 || weightNum <= 0) {
        toast({ title: "Invalid Input", description: "Please enter valid weight and height.", variant: "destructive" });
        return;
      }
      heightM = totalInches * 0.0254;
    }

    const bmi = weightNum / (heightM * heightM);
    let category, color;

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-400';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal weight';
      color = 'text-green-400';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      color = 'text-yellow-400';
    } else {
      category = 'Obesity';
      color = 'text-red-400';
    }
    
    const newResult = { bmi: bmi.toFixed(1), category, color };
    setResult(newResult);
    saveCalculation({
        type: 'BMI',
        inputs: { weight, heightCm, heightFt, heightIn, unit },
        result: { BMI: newResult.bmi, Category: newResult.category }
    });
    toast({ title: "BMI Calculated!", description: `Your BMI is ${newResult.bmi}.` });
  };

  const pageTitle = "Free BMI Calculator: Check Body Mass Index Online 2026";
  const pageDescription = "Calculate your Body Mass Index (BMI) instantly. Understand your weight category with our free, easy-to-use BMI checker for men and women.";
  const canonicalUrl = "https://calczoon.com/health/bmi-calculator";

  const faqItems = [
    { question: "What is BMI?", answer: "Body Mass Index (BMI) is a measure that uses your height and weight to work out if your weight is healthy. The BMI calculation divides an adult's weight in kilograms by their height in metres squared." },
    { question: "How accurate is BMI?", answer: "BMI is a useful population-level measure of overweight and obesity. However, it is a screening tool and not a diagnostic tool. It does not distinguish between excess fat, muscle, or bone mass, nor does it provide any indication of the distribution of fat." },
    { question: "What are the BMI categories?", answer: "Underweight = <18.5, Normal weight = 18.5–24.9, Overweight = 25–29.9, Obesity = BMI of 30 or greater." },
    { question: "Should I use BMI to assess my health?", answer: "BMI is a good starting point, but it should be used alongside other measurements like waist circumference and body fat percentage for a more complete picture of health. Consult a healthcare professional for personalized advice." }
  ];

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CalcZoon BMI Calculator",
    "operatingSystem": "All",
    "applicationCategory": "HealthApplication",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

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
        canonicalUrl="/health/bmi-calculator"
        schema={[appSchema, faqSchema]}
      />
      
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={HeartPulse} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Enter Your Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateBMI} className="space-y-6">
                  <div className="flex gap-2 p-1 bg-slate-900/50 rounded-lg">
                    <Button type="button" variant={unit === 'metric' ? 'default' : 'ghost'} className={`flex-1 ${unit === 'metric' ? 'bg-emerald-600 hover:bg-emerald-700' : 'text-slate-400 hover:text-white'}`} onClick={() => setUnit('metric')}>Metric</Button>
                    <Button type="button" variant={unit === 'imperial' ? 'default' : 'ghost'} className={`flex-1 ${unit === 'imperial' ? 'bg-emerald-600 hover:bg-emerald-700' : 'text-slate-400 hover:text-white'}`} onClick={() => setUnit('imperial')}>Imperial</Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</Label>
                    <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={`e.g., ${unit === 'metric' ? '70' : '155'}`} required className="bg-slate-900 border-slate-700" />
                  </div>
                  {unit === 'metric' ? (
                    <div className="space-y-2">
                      <Label htmlFor="heightCm">Height (cm)</Label>
                      <Input id="heightCm" type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="e.g., 178" required className="bg-slate-900 border-slate-700" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="heightFt">Height (feet)</Label>
                        <Input id="heightFt" type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="e.g., 5" required className="bg-slate-900 border-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heightIn">Height (inches)</Label>
                        <Input id="heightIn" type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="e.g., 10" className="bg-slate-900 border-slate-700" />
                      </div>
                    </div>
                  )}
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Calculate BMI</Button>
                </form>
              </CardContent>
              {result && (
                <CardFooter className="flex flex-col items-center mt-6">
                  <h3 className="text-xl font-bold">Your BMI is:</h3>
                  <p className={`text-6xl font-bold ${result.color}`}>{result.bmi}</p>
                  <p className={`text-xl font-semibold ${result.color}`}>{result.category}</p>
                   <div className="mt-4 w-full">
                        <ShareResults title="BMI Calculation" text={`Just got my BMI results from CalcZoon! My score: ${result.bmi} (${result.category}). Highly recommend this free tool:`} url="/health/bmi-calculator" />
                    </div>
                </CardFooter>
              )}
            </Card>
          </div>
          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader><CardTitle>BMI Categories</CardTitle></CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-slate-300">
                        <li className="flex justify-between"><span>Underweight</span><span className="text-blue-400">&lt; 18.5</span></li>
                        <li className="flex justify-between"><span>Normal weight</span><span className="text-green-400">18.5 – 24.9</span></li>
                        <li className="flex justify-between"><span>Overweight</span><span className="text-yellow-400">25 – 29.9</span></li>
                        <li className="flex justify-between"><span>Obesity</span><span className="text-red-400">30 or greater</span></li>
                    </ul>
                    <Link to="/blog/bmi-calculator-guide" className="text-emerald-400 hover:text-emerald-300 hover:underline text-xs font-bold mt-6 block text-center transition-colors">
                      Read Our Complete BMI Guide &rarr;
                    </Link>
                </CardContent>
            </Card>
            <RelatedTools />
          </aside>
        </div>

        {/* Deep SEO Informational Section with Scientific References */}
        <section className="mt-16 bg-slate-800/20 rounded-2xl border border-slate-700/40 p-8 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Understanding Body Mass Index (BMI) and Your Health</h2>
            <p>
              Body Mass Index (BMI) is an internationally recognized anthropometric measurement used to estimate human body fat based on an individual's weight and height. Developed in the 19th century by Adolphe Quetelet, the index has become a fundamental screening tool employed by global health organizations to classify weight categories and assess associated health risks in adult populations.
            </p>
            <p>
              While BMI does not directly measure the percentage of body fat, extensive epidemiological research has demonstrated a strong correlation between high BMI scores and adverse metabolic profiles, making it an essential first step in clinical and personal health evaluation.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">How Our Advanced BMI Calculator Works</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Measurement System:</strong> Choose your preferred standard—either <strong>Metric</strong> (kilograms and centimeters) or <strong>Imperial</strong> (pounds, feet, and inches).</li>
              <li><strong>Data Input:</strong> Enter your current weight and accurate height measurements.</li>
              <li><strong>Real-time Analysis:</strong> Our calculator processes the data instantly using standard mathematical formulas.</li>
              <li><strong>Result Interpretation:</strong> You will receive your exact BMI number, your WHO-defined weight category, and a clear visual indication of your health status.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">The Mathematical Formula Behind BMI</h2>
            <p>
              The calculation relies on established mathematical equations that normalize body weight relative to height:
            </p>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-emerald-400">
              <p>Metric Formula: BMI = Weight (kg) ÷ [Height (m)]²</p>
              <p>Imperial Formula: BMI = 703 × Weight (lbs) ÷ [Height (inches)]²</p>
            </div>
            <p className="text-sm text-slate-400 mt-2">
              The scaling factor of 703 in the imperial formula ensures equivalence with the metric metric, converting pounds per square inch to kilograms per square meter.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Global Weight Categories & Clinical Implications</h2>
            <p>
              According to the World Health Organization (WHO), maintaining an optimal BMI is crucial for preventing non-communicable diseases. The standard classifications are:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Underweight (BMI &lt; 18.5):</strong> Individuals in this category may suffer from malnutrition, compromised immune function, osteoporosis, and clinical anemia.</li>
              <li><strong>Normal Weight (18.5 to 24.9):</strong> This optimal range is associated with the lowest statistical risk of developing weight-related morbidities and maximum longevity.</li>
              <li><strong>Overweight (25 to 29.9):</strong> This category indicates excess body weight. It carries a moderately elevated risk for cardiovascular disease, hypertension, and metabolic syndrome.</li>
              <li><strong>Obesity (BMI ≥ 30):</strong> Obesity is recognized as a chronic disease. It significantly increases the risk of type 2 diabetes, coronary artery disease, osteoarthritis, and certain types of carcinomas.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Limitations of the BMI Scale</h2>
            <p>
              While highly useful for population screening, BMI has clinical limitations at an individual level. It does not differentiate between lean muscle mass and adipose tissue (fat). Consequently, professional athletes or bodybuilders may be incorrectly classified as overweight or obese. Furthermore, BMI does not account for fat distribution; visceral fat (abdominal fat) is clinically more hazardous than subcutaneous fat.
            </p>
          </div>

          {/* Scientific References Section */}
          <div className="mt-10 pt-6 border-t border-slate-700/50">
            <h3 className="text-lg font-bold text-slate-400 mb-3 uppercase tracking-wider text-sm">Scientific References & Sources</h3>
            <ul className="text-xs text-slate-500 space-y-2">
              <li>1. World Health Organization (WHO). (2000). Obesity: preventing and managing the global epidemic. Report of a WHO consultation. <em>World Health Organization technical report series</em>, 894, i-xii, 1-253.</li>
              <li>2. National Institutes of Health (NIH) & National Heart, Lung, and Blood Institute (NHLBI). (1998). Clinical Guidelines on the Identification, Evaluation, and Treatment of Overweight and Obesity in Adults.</li>
              <li>3. CDC - Centers for Disease Control and Prevention. About Adult BMI. Available at CDC.gov.</li>
              <li>4. Nuttall, F. Q. (2015). Body Mass Index: Obesity, BMI, and Health: A Critical Review. <em>Nutrition today</em>, 50(3), 117-128.</li>
            </ul>
          </div>
        </section>

        <TDEE_FAQ items={faqItems} />
      </div>
    </>
  );
};

export default BMICalculator;
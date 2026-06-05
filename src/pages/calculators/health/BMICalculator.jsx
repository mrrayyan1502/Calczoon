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
                   <div className="mt-4">
                        <ShareResults title="My BMI Result" text={`I calculated my BMI on Calczoon and it's ${result.bmi} (${result.category}).`} url={canonicalUrl} />
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

        {/* Deep SEO Informational Section */}
        <section className="mt-16 bg-slate-800/20 rounded-2xl border border-slate-700/40 p-8 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Understanding Body Mass Index (BMI)</h2>
            <p>
              Body Mass Index (BMI) is a simple numerical calculation that measures body fat based on height and weight. It is widely used by healthcare professionals and individuals to estimate if a person is underweight, normal weight, overweight, or obese. While it is not a direct measure of body fat percentage, it serves as an excellent screening tool for identifying potential weight-related health issues.
            </p>
            <p>
              By tracking your BMI, you can understand if your weight is in a healthy range for your height. This helps in making informed decisions about diet, exercise, and overall wellness.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">How to Use the Free BMI Calculator</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Select your unit preference:</strong> Choose either the <strong>Metric</strong> tab (for kilograms and centimeters) or the <strong>Imperial</strong> tab (for pounds, feet, and inches).</li>
              <li><strong>Enter your weight:</strong> Input your current weight in the specified field.</li>
              <li><strong>Enter your height:</strong> Input your height (in centimeters for metric, or feet and inches for imperial).</li>
              <li><strong>Click Calculate:</strong> Press the "Calculate BMI" button. Your result will display instantly with your BMI score, weight category, and a visual breakup of where you stand.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">The Mathematical Formula Used for BMI</h2>
            <p>
              The calculation of BMI is straightforward and uses standard formulas recommended by the World Health Organization (WHO):
            </p>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-emerald-400">
              <p>Metric Formula: BMI = Weight (kg) ÷ [Height (m)]²</p>
              <p>Imperial Formula: BMI = 703 × Weight (lbs) ÷ [Height (inches)]²</p>
            </div>
            <p className="text-sm text-slate-400 mt-2">
              *Note: The height is squared because body volume scales with the square of height. The multiplier 703 is a conversion factor used to align imperial values with the metric scale.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Health Benefits & BMI Categories</h2>
            <p>
              Maintaining a healthy BMI score is associated with lower risks of developing chronic conditions. Here is the weight classification index:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Underweight (BMI &lt; 18.5):</strong> May indicate nutrient deficiencies, weakened immune system, or osteoporosis.</li>
              <li><strong>Normal Weight (18.5 to 24.9):</strong> Associated with the lowest risk of weight-related health problems and chronic diseases.</li>
              <li><strong>Overweight (25 to 29.9):</strong> Elevated risk of cardiovascular strain, hypertension, and other conditions. Lifestyle adjustments can help manage this.</li>
              <li><strong>Obesity (BMI of 30 or greater):</strong> High risk of serious chronic diseases like type 2 diabetes and heart disease. Consult a healthcare professional for customized guidance.</li>
            </ul>
          </div>
        </section>

        <TDEE_FAQ items={faqItems} />
      </div>
    </>
  );
};

export default BMICalculator;
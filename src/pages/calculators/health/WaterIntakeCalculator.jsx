import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveCalculation } from '@/lib/history';
import { Link } from 'react-router-dom';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import { Droplet } from 'lucide-react';

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateWaterIntake = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const weightValue = parseFloat(weight);
    if (isNaN(weightValue) || weightValue <= 0) {
      setError('Please enter a valid weight.');
      return;
    }

    let weightInKg = weightValue;
    if (unit === 'lbs') {
      weightInKg = weightValue * 0.453592;
    }

    // Base calculation: 35ml per kg of body weight
    let baseIntake = weightInKg * 35;

    // Adjust for activity level
    switch (activityLevel) {
      case 'light':
        baseIntake += 350; // ~12 oz
        break;
      case 'moderate':
        baseIntake += 700; // ~24 oz
        break;
      case 'active':
        baseIntake += 1050; // ~35 oz
        break;
      default: // sedentary
        break;
    }

    const intakeLiters = (baseIntake / 1000).toFixed(2);
    const intakeOunces = (baseIntake * 0.033814).toFixed(1);

    const newResult = {
      liters: intakeLiters,
      ounces: intakeOunces,
    };
    setResult(newResult);
    saveCalculation({
      type: 'Water Intake',
      inputs: { weight, unit, activityLevel },
      result: { Liters: newResult.liters, Ounces: newResult.ounces }
    });
  };

  const faqItems = [
    { question: "Why is staying hydrated important?", answer: "Water is essential for nearly every bodily function, including regulating temperature, lubricating joints, transporting nutrients, and removing waste. Proper hydration can improve energy levels, brain function, and physical performance." },
    { question: "Does this calculation include water from food?", answer: "No, this calculator estimates your required fluid intake from beverages. On average, about 20% of our daily water intake comes from the food we eat, especially fruits and vegetables." },
    { question: "Should I drink more water if it's hot or if I'm sick?", answer: "Yes. You should increase your water intake in hot weather, during intense exercise, if you have a fever, or if you're experiencing vomiting or diarrhea to prevent dehydration." }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Daily Water Intake Calculator",
    "description": "Calculate your recommended daily water intake based on your weight and activity level to stay properly hydrated. Get your personalized recommendation in liters and ounces.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/health/daily-water-intake-calculator",
    "browserRequirements": "Requires a modern web browser."
  };

  return (
    <>
      <Seo
        title="Daily Water Intake Calculator | Calczoon"
        description="Calculate your recommended daily water intake based on your weight and activity level to stay properly hydrated. Get your personalized recommendation in liters and ounces."
        canonicalUrl="/health/daily-water-intake-calculator"
        schema={[webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }]}
      />
      <div className="max-w-2xl mx-auto py-8">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <h1 className="text-3xl font-bold text-primary">Daily Water Intake Calculator</h1>
            <CardDescription className="text-slate-400">
              Find out how much water you should be drinking daily based on your weight and activity level. Staying hydrated is key to good health.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={calculateWaterIntake} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Your Weight</Label>
                  <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 70" required className="bg-slate-900 border-slate-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <select id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white h-10">
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lbs">Pounds (lbs)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="activityLevel">Daily Activity Level</Label>
                <select id="activityLevel" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white">
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="light">Lightly Active (light exercise/sports 1-3 days/week)</option>
                  <option value="moderate">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
                  <option value="active">Very Active (hard exercise/sports 6-7 days a week)</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate Intake</Button>
            </form>
          </CardContent>
          {result && !error && (
            <CardFooter className="flex flex-col items-center mt-6 p-6 bg-slate-800 rounded-b-lg">
              <div className="w-full text-center space-y-2">
                <h2 className="text-xl font-bold text-slate-100">Your Recommended Daily Water Intake:</h2>
                <div className="flex justify-center items-center gap-2 text-primary">
                    <Droplet className="w-10 h-10"/>
                    <p className="text-4xl font-bold">{result.liters} Liters</p>
                </div>
                <p className="text-2xl text-slate-300">or {result.ounces} Ounces</p>
              </div>
              <ShareResults
                title="My Daily Water Goal"
                text={`My daily water intake goal is ${result.liters}L. What's yours? Find out on Calczoon!`}
                url="https://calczoon.com/health/daily-water-intake-calculator"
              />
            </CardFooter>
          )}
          {error && (
            <CardFooter className="mt-6 p-6 bg-red-900/20 rounded-b-lg">
              <p className="text-red-400 text-center w-full">{error}</p>
            </CardFooter>
          )}
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 mt-8">
          <CardHeader><h2 className="text-2xl font-bold text-primary">Why Hydration Matters</h2></CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <p>Water is crucial for your body to function correctly. It regulates body temperature, keeps joints lubricated, prevents infections, delivers nutrients to cells, and keeps organs functioning properly. Being well-hydrated also improves sleep quality, cognition, and mood.</p>
            <h3 className="text-xl font-semibold text-white">How We Calculate Your Needs</h3>
            <p>Our calculator uses a common formula based on your body weight (approximately 35 ml of water per kg of body weight) and then adjusts for your estimated activity level. This provides a personalized baseline, but remember to listen to your body—if you feel thirsty, drink water! You can also check your calorie needs with our <Link to="/health/tdee-calculator" className="text-primary hover:underline">TDEE calculator</Link>.</p>
          </CardContent>
        </Card>

        <Faq items={faqItems} className="mt-8" />
        <Disclaimer text="This is a general recommendation. Individual needs may vary based on climate, health conditions, and other factors. Consult a healthcare professional for personalized advice." />
      </div>
    </>
  );
};

export default WaterIntakeCalculator;
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Flame } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { saveCalculation } from '@/lib/history';
import TDEE_FAQ from '@/components/calculators/tdee/TDEE_FAQ';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import ShareResults from '@/components/ShareResults';

// A sample list of activities with their MET values
const metValues = {
  'running_5_mph': { label: 'Running (5 mph)', value: 8.3 },
  'running_7_mph': { label: 'Running (7 mph)', value: 11.0 },
  'cycling_leisure': { label: 'Cycling (leisurely)', value: 4.0 },
  'cycling_moderate': { label: 'Cycling (moderate)', value: 8.0 },
  'swimming_freestyle': { label: 'Swimming (freestyle, moderate)', value: 7.0 },
  'walking_moderate': { label: 'Walking (moderate pace)', value: 3.5 },
  'weight_lifting': { label: 'Weight Lifting (general)', value: 3.0 },
  'yoga': { label: 'Yoga', value: 2.5 },
};


const CaloriesBurnedCalculator = () => {
  const [weight, setWeight] = useState('');
  const [duration, setDuration] = useState('');
  const [activity, setActivity] = useState('running_5_mph');
  const [result, setResult] = useState(null);
  const { toast } = useToast();

  const calculateCalories = (e) => {
    e.preventDefault();
    const weightKg = parseFloat(weight);
    const durationMin = parseFloat(duration);
    
    if (isNaN(weightKg) || isNaN(durationMin) || weightKg <= 0 || durationMin <= 0) {
      toast({ title: "Invalid Input", description: "Please enter valid weight and duration.", variant: "destructive" });
      return;
    }
    
    const met = metValues[activity].value;
    const caloriesBurned = (met * weightKg * 3.5 / 200) * durationMin;
    
    const newResult = { calories: Math.round(caloriesBurned), activityLabel: metValues[activity].label };
    setResult(newResult);
    saveCalculation({
        type: 'Calories Burned',
        inputs: { weight, duration, activity: newResult.activityLabel },
        result: { Calories: newResult.calories }
    });
    toast({ title: "Calculation Complete!", description: `You burned an estimated ${newResult.calories} calories.` });
  };
  
  const resetForm = () => {
    setWeight('');
    setDuration('');
    setActivity('running_5_mph');
    setResult(null);
    toast({ title: "Form Reset" });
  };

  const pageTitle = "Calories Burned Calculator";
  const pageDescription = "Estimate the number of calories burned during various activities and exercises. Input the activity, duration, and your weight to get a personalized estimate.";
  const canonicalUrl = "https://calczoon.com/health/calories-burned-calculator";

  const faqItems = [
    { question: "How is 'calories burned' calculated?", answer: "It's calculated using the Metabolic Equivalent of Task (MET) value for a given activity. The formula is: Calories Burned/minute = (MET * body weight in kg * 3.5) / 200." },
    { question: "What is a MET value?", answer: "A MET value represents the energy cost of a physical activity. A MET of 1 is equivalent to the energy expenditure of sitting at rest." },
    { question: "How accurate are these estimates?", answer: "These are good estimates for the average person. However, individual factors like body composition, age, sex, and fitness level can influence the actual number of calories burned." }
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={Flame} />
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle>Activity Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateCalories} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Your Weight (kg)</Label>
                      <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 70" required className="bg-slate-900 border-slate-700" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input id="duration" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g., 30" required className="bg-slate-900 border-slate-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="activity">Select Activity</Label>
                    <Select value={activity} onValueChange={setActivity}>
                      <SelectTrigger className="w-full bg-slate-900 border-slate-700"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(metValues).map(([key, {label, value}]) => (
                          <SelectItem key={key} value={key}>{label} (MET: {value})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Calculate Calories</Button>
                    <Button type="button" variant="secondary" onClick={resetForm}>Reset</Button>
                  </div>
                </form>
              </CardContent>
              {result && (
                <CardFooter className="flex-col items-center mt-6">
                    <h3 className="text-xl font-bold">Estimated Calories Burned</h3>
                    <p className="text-6xl font-bold text-primary">{result.calories}</p>
                    <p className="text-slate-300">calories during {result.activityLabel}</p>
                    <div className="mt-4">
                        <ShareResults
                            title="My Workout Stats"
                            text={`I burned an estimated ${result.calories} calories during my workout! Calculated via Calczoon.`}
                            url={canonicalUrl}
                        />
                    </div>
                </CardFooter>
              )}
            </Card>
          </div>
          <aside className="lg:col-span-1 space-y-6">
            <RelatedTools />
          </aside>
        </div>
        <TDEE_FAQ items={faqItems} />
      </div>
    </>
  );
};

export default CaloriesBurnedCalculator;
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { TrendingDown } from 'lucide-react';
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

const WeightLossCalculator = () => {
    const [currentWeight, setCurrentWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [tdee, setTdee] = useState('');
    const [deficit, setDeficit] = useState('500'); // Default to 500 calorie deficit
    const [result, setResult] = useState(null);
    const { toast } = useToast();

    const calculateWeightLoss = (e) => {
        e.preventDefault();
        const cw = parseFloat(currentWeight);
        const gw = parseFloat(goalWeight);
        const tdeeVal = parseFloat(tdee);
        const def = parseFloat(deficit);

        if (isNaN(cw) || isNaN(gw) || isNaN(tdeeVal) || isNaN(def) || cw <= 0 || gw <= 0 || tdeeVal <= 0 || def <= 0) {
            toast({ title: "Invalid Input", description: "Please enter valid, positive numbers for all fields.", variant: "destructive" });
            return;
        }

        if (gw >= cw) {
            toast({ title: "Invalid Goal", description: "Goal weight must be less than current weight.", variant: "destructive" });
            return;
        }

        const weightToLose = cw - gw;
        const totalCaloriesToBurn = weightToLose * 7700; // 7700 calories per kg of fat
        const daysToReachGoal = totalCaloriesToBurn / def;
        const weeks = Math.ceil(daysToReachGoal / 7);

        const dailyCalories = Math.round(tdeeVal - def);
        
        const newResult = { weeks, dailyCalories };
        setResult(newResult);
        saveCalculation({
            type: 'Weight Loss Plan',
            inputs: { currentWeight, goalWeight, tdee, deficit },
            result: { Timeline: `${weeks} weeks`, Calories: `${dailyCalories} kcal/day` }
        });
        toast({ title: "Plan Generated!", description: `Estimated time to reach goal: ${weeks} weeks.` });
    };
    
    const pageTitle = "Weight Loss Calculator";
    const pageDescription = "Plan your weight loss journey. Calculate your daily calorie needs for a safe and effective weight loss, and get an estimated timeline to reach your goal weight.";
    const canonicalUrl = "https://calczoon.com/health/weight-loss-calculator";

    const faqItems = [
        { question: "How does the weight loss calculator work?", answer: "It first calculates your maintenance calories (TDEE) and then subtracts a certain number of calories to create a deficit. Based on the size of this deficit, it estimates how long it will take to reach your goal weight. It assumes 1kg of fat is equivalent to 7700 calories." },
        { question: "What is a safe rate of weight loss?", answer: "A safe and sustainable rate of weight loss is generally considered to be 0.5-1 kg per week (1-2 pounds). Losing weight faster than this can lead to muscle loss and may not be sustainable." },
        { question: "Why has my weight loss stalled?", answer: "Weight loss plateaus are normal. As you lose weight, your TDEE decreases. You may need to readjust your calorie intake or increase your activity level to continue losing weight. It's recommended to recalculate your TDEE after every 5-7 kg of weight loss." }
    ];

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <link rel="canonical" href={canonicalUrl} />
            </Helmet>

            <div className="w-full max-w-7xl mx-auto py-8 px-4">
                <PageHeader title={pageTitle} description={pageDescription} icon={TrendingDown} />

                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2">
                        <Card className="bg-slate-800/50 border-slate-700">
                          <CardHeader>
                            <CardTitle>Your Weight Loss Plan</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <form onSubmit={calculateWeightLoss} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="currentWeight">Current Weight (kg)</Label>
                                  <Input id="currentWeight" type="number" value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)} placeholder="e.g., 80" required className="bg-slate-900 border-slate-700" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="goalWeight">Goal Weight (kg)</Label>
                                  <Input id="goalWeight" type="number" value={goalWeight} onChange={(e) => setGoalWeight(e.target.value)} placeholder="e.g., 70" required className="bg-slate-900 border-slate-700" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="tdee">Maintenance Calories (TDEE)</Label>
                                <Input id="tdee" type="number" value={tdee} onChange={(e) => setTdee(e.target.value)} placeholder="e.g., 2500" required className="bg-slate-900 border-slate-700" />
                                 <p className="text-xs text-slate-400">Use our <a href="/health/tdee-calculator" className="text-primary hover:underline">TDEE Calculator</a> if you're unsure.</p>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="deficit">Daily Calorie Deficit</Label>
                                <Select value={deficit} onValueChange={setDeficit}>
                                  <SelectTrigger className="w-full bg-slate-900 border-slate-700"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="250">Mild (250 calories / ~0.25kg week)</SelectItem>
                                    <SelectItem value="500">Standard (500 calories / ~0.5kg week)</SelectItem>
                                    <SelectItem value="750">Aggressive (750 calories / ~0.75kg week)</SelectItem>
                                    <SelectItem value="1000">Extreme (1000 calories / ~1kg week)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Calculate Plan</Button>
                            </form>
                          </CardContent>
                          {result && (
                            <CardFooter className="flex-col items-center mt-6">
                                <h3 className="text-xl font-bold">Your Path to Success</h3>
                                <div className="text-center my-4">
                                  <p className="text-slate-400">Daily Calorie Goal</p>
                                  <p className="text-4xl font-bold text-primary">{result.dailyCalories} kcal</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-slate-400">Estimated Time to Reach Goal</p>
                                  <p className="text-4xl font-bold text-primary">{result.weeks} weeks</p>
                                </div>
                                 <div className="mt-4">
                                    <ShareResults
                                        title="My Weight Loss Plan"
                                        text={`I'm on a ${result.weeks}-week journey to my goal weight! Calculated my plan on Calczoon.`}
                                        url={canonicalUrl}
                                    />
                                </div>
                            </CardFooter>
                          )}
                        </Card>
                    </div>
                     <aside className="lg:col-span-1 space-y-6">
                        <Card className="bg-slate-800/50 border-slate-700">
                            <CardHeader><CardTitle>Pro Tip</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-slate-300 text-sm">Combine your calorie deficit with regular exercise and adequate protein intake to preserve muscle mass while losing fat.</p>
                            </CardContent>
                        </Card>
                        <RelatedTools />
                    </aside>
                </div>
                <TDEE_FAQ items={faqItems} />
            </div>
        </>
    );
};

export default WeightLossCalculator;
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Activity, TrendingUp, TrendingDown, Minus, Download, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ShareResults from '@/components/ShareResults';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


const resultBoxColorVariants = {
  blue: {
    border: 'border-blue-500',
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
  },
  emerald: {
    border: 'border-emerald-500',
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
  },
};

const ResultBox = ({ title, value, description, icon: Icon, color = 'blue' }) => {
    const variants = resultBoxColorVariants[color] || resultBoxColorVariants.blue;
    return (
        <div className={cn("bg-slate-900/50 p-6 rounded-xl border", variants.border)}>
            <div className="flex items-center gap-4 mb-3">
                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", variants.bg)}>
                    <Icon className={cn("w-6 h-6", variants.text)} />
                </div>
                <div>
                    <p className="text-sm text-slate-300">{title}</p>
                    <p className="text-3xl font-bold text-white">{value}</p>
                </div>
            </div>
            <p className="text-sm text-slate-300">{description}</p>
        </div>
    );
};

const goalCardColorVariants = {
    yellow: {
        gradient: 'from-yellow-900/20 to-yellow-800/20', border: 'border-yellow-700/50', bg: 'bg-yellow-500/20', text: 'text-yellow-400',
    },
    orange: {
        gradient: 'from-orange-900/20 to-orange-800/20', border: 'border-orange-700/50', bg: 'bg-orange-500/20', text: 'text-orange-400',
    },
    red: {
        gradient: 'from-red-900/20 to-red-800/20', border: 'border-red-700/50', bg: 'bg-red-500/20', text: 'text-red-400',
    },
    green: {
        gradient: 'from-green-900/20 to-green-800/20', border: 'border-green-700/50', bg: 'bg-green-500/20', text: 'text-green-400',
    },
    blue: {
        gradient: 'from-blue-900/20 to-blue-800/20', border: 'border-blue-700/50', bg: 'bg-blue-500/20', text: 'text-blue-400',
    },
    purple: {
        gradient: 'from-purple-900/20 to-purple-800/20', border: 'border-purple-700/50', bg: 'bg-purple-500/20', text: 'text-purple-400',
    }
};

const GoalCard = ({ title, weeklyGoal, calories, icon: Icon, color, description }) => {
    const variants = goalCardColorVariants[color] || goalCardColorVariants.yellow;
    return (
        <div className={cn("bg-slate-900/50 p-6 rounded-xl border", variants.gradient, variants.border)}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", variants.bg)}>
                        <Icon className={cn("w-5 h-5", variants.text)} />
                    </div>
                    <div>
                        <p className="font-semibold text-white">{title}</p>
                        <p className="text-sm text-slate-300">{weeklyGoal}</p>
                    </div>
                </div>
                <p className="text-2xl font-bold text-white">{calories}</p>
            </div>
            <p className="text-sm text-slate-300">{description}</p>
        </div>
    );
};

const SaveResultsForm = () => {
    const { toast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "Feature Coming Soon!",
            description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
        });
    };

    return (
        <Card className="bg-slate-900/50 border-slate-700 mt-8">
            <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2"><Mail className="w-5 h-5 text-emerald-400"/>Save Your Results</CardTitle>
                <CardDescription className="text-slate-300">Enter your email to save your TDEE results for future reference.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                        <Label htmlFor="email-save" className="sr-only">Email</Label>
                        <Input type="email" id="email-save" placeholder="your.email@example.com" className="bg-slate-800 border-slate-600" required />
                    </div>
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">Save to Email</Button>
                </form>
            </CardContent>
        </Card>
    );
};


const TDEE_Results = ({ results }) => {
    const { toast } = useToast();

    if (!results) {
        return null;
    }

    const handleDownload = () => {
        const resultText = `
TDEE Calculator Results
=======================
Basal Metabolic Rate (BMR): ${results.bmr} calories/day
Total Daily Energy Expenditure (TDEE): ${results.tdee} calories/day

Weight Loss Goals:
- Mild (0.25 kg/week): ${results.mildWeightLoss} calories/day
- Standard (0.5 kg/week): ${results.weightLoss} calories/day
- Extreme (1 kg/week): ${results.extremeWeightLoss} calories/day

Weight Gain Goals:
- Mild (0.25 kg/week): ${results.mildWeightGain} calories/day
- Standard (0.5 kg/week): ${results.weightGain} calories/day
- Extreme (1 kg/week): ${results.extremeWeightGain} calories/day

Generated by CalcZoon TDEE Calculator
https://calczoon.com/health/tdee-calculator`;

        const blob = new Blob([resultText.trim()], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
a.style.display = 'none';
        a.href = url;
        a.download = 'tdee-results.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast({ title: "Download Started", description: "Your TDEE results have been downloaded." });
    };
    
    const shareText = `My TDEE is ${results.tdee} calories/day. Calculate yours on CalcZoon!`;

    return (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur mt-8">
            <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <CardTitle className="text-2xl text-white">Your Calorie &amp; Goal Breakdown</CardTitle>
                    <div className="flex gap-2">
                        <Button onClick={handleDownload} variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700"><Download className="w-4 h-4 mr-2" />Download Results (.txt)</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-slate-900/50">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-600">Overview</TabsTrigger>
                        <TabsTrigger value="loss" className="data-[state=active]:bg-emerald-600">Weight Loss</TabsTrigger>
                        <TabsTrigger value="gain" className="data-[state=active]:bg-emerald-600">Weight Gain</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6 mt-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <ResultBox title="Basal Metabolic Rate" value={results.bmr} description="Calories burned at complete rest" icon={Activity} color="blue" />
                            <ResultBox title="Maintenance Calories" value={results.tdee} description="Total calories to maintain weight" icon={TrendingUp} color="emerald" />
                        </div>
                        <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Minus className="w-5 h-5 text-emerald-400" />Weight Maintenance</h3>
                            <p className="text-slate-300 mb-4">To maintain your current weight, consume approximately <strong className="text-emerald-400">{results.tdee} calories per day</strong>.</p>
                            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                                <p className="text-sm text-slate-300">💡 <strong className="text-white">Pro Tip:</strong> Track your weight for 2-3 weeks at this intake. If it changes, adjust by 100-200 calories and reassess.</p>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="loss" className="space-y-4 mt-6">
                         <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 mb-6">
                            <h3 className="text-lg font-semibold text-white mb-2">Weight Loss Guidelines</h3>
                            <p className="text-slate-300 text-sm">A safe rate of weight loss is 0.5-1 lb (0.25-0.5 kg) per week. Choose a deficit that fits your lifestyle.</p>
                        </div>
                        <div className="space-y-4">
                            <GoalCard title="Mild Weight Loss" weeklyGoal="0.5 lbs / 0.25 kg per week" calories={results.mildWeightLoss} icon={TrendingDown} color="yellow" description="A great starting point, easy to stick to." />
                            <GoalCard title="Standard Weight Loss" weeklyGoal="1 lb / 0.5 kg per week" calories={results.weightLoss} icon={TrendingDown} color="orange" description="The most common and sustainable rate of loss." />
                            <GoalCard title="Extreme Weight Loss" weeklyGoal="2 lbs / 1 kg per week" calories={results.extremeWeightLoss} icon={TrendingDown} color="red" description="Aggressive deficit, consult a professional first." />
                        </div>
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-6">
                            <p className="text-sm text-slate-300">⚠️ <strong className="text-white">Important:</strong> Do not consume fewer than 1,200 (women) or 1,500 (men) calories per day without medical supervision.</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="gain" className="space-y-4 mt-6">
                         <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 mb-6">
                            <h3 className="text-lg font-semibold text-white mb-2">Muscle Gain Guidelines</h3>
                            <p className="text-slate-300 text-sm">Aim for 0.5-1 lb (0.25-0.5 kg) of weight gain per week combined with strength training for a lean bulk.</p>
                        </div>
                        <div className="space-y-4">
                            <GoalCard title="Lean Gain" weeklyGoal="0.5 lbs / 0.25 kg per week" calories={results.mildWeightGain} icon={TrendingUp} color="green" description="Ideal for lean muscle with minimal fat gain." />
                            <GoalCard title="Steady Gain" weeklyGoal="1 lb / 0.5 kg per week" calories={results.weightGain} icon={TrendingUp} color="blue" description="Balanced approach for building muscle and strength." />
                            <GoalCard title="Aggressive Bulk" weeklyGoal="2 lbs / 1 kg per week" calories={results.extremeWeightGain} icon={TrendingUp} color="purple" description="For advanced lifters, expect some fat gain." />
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mt-6">
                            <p className="text-sm text-slate-300">💪 <strong className="text-white">Pro Tip:</strong> Pair your surplus with a strength training program and 1.6-2.2g of protein per kg of body weight for optimal results.</p>
                        </div>
                    </TabsContent>
                </Tabs>
                <SaveResultsForm />
                <ShareResults title="TDEE Calculation" text={`Estimated my daily calorie burn on CalcZoon! My TDEE: ${results.tdee} calories/day. Figure out your daily calories here:`} url="/health/tdee-calculator" />
            </CardContent>
        </Card>
    );
};

export default TDEE_Results;
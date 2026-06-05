import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { saveCalculation } from '@/lib/history';

const activityLevels = [
  { value: '1.2', label: 'Sedentary', description: 'Little or no exercise' },
  { value: '1.375', label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
  { value: '1.55', label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
  { value: '1.725', label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
  { value: '1.9', label: 'Extra Active', description: 'Very hard exercise & physical job' }
];

const formulas = [
  { value: 'mifflin', label: 'Mifflin-St Jeor' },
  { value: 'harris', label: 'Harris-Benedict' },
  { value: 'katch', label: 'Katch-McArdle' },
];

const CalculatorInput = ({ id, label, value, onChange, placeholder, type = "number" }) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-slate-200">{label}</Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
    />
  </div>
);

const TDEE_CalculatorForm = ({ setResults }) => {
  const { toast } = useToast();
  const [unit, setUnit] = useState('metric');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [activityLevel, setActivityLevel] = useState('1.55');
  const [formula, setFormula] = useState('mifflin');

  const resetCalculator = () => {
    setAge(''); setWeight(''); setHeightCm(''); setHeightFt('');
    setHeightIn(''); setBodyFat(''); setActivityLevel('1.55'); setFormula('mifflin');
    setResults(null);
    toast({ title: "Calculator Reset", description: "All fields cleared." });
  };

  const calculateTDEE = () => {
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const bodyFatNum = parseFloat(bodyFat);
    let heightNumCm;

    if (unit === 'metric') {
      heightNumCm = parseFloat(heightCm);
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      heightNumCm = (ft * 12 + inches) * 2.54;
    }
    
    if (isNaN(ageNum) || ageNum <= 0 || isNaN(weightNum) || weightNum <=0 || isNaN(heightNumCm) || heightNumCm <= 0) {
       toast({ title: "Invalid Input", description: "Please fill all required fields with valid numbers.", variant: "destructive" });
       return;
    }
    
    if (formula === 'katch' && (isNaN(bodyFatNum) || bodyFatNum <= 0 || bodyFatNum >= 100)) {
      toast({ title: "Missing Body Fat %", description: "Katch-McArdle requires a valid body fat percentage.", variant: "destructive" });
      return;
    }

    const weightKg = unit === 'imperial' ? weightNum * 0.453592 : weightNum;
    
    let bmr;
    
    switch (formula) {
      case 'harris':
        bmr = gender === 'male'
          ? 88.362 + (13.397 * weightKg) + (4.799 * heightNumCm) - (5.677 * ageNum)
          : 447.593 + (9.247 * weightKg) + (3.098 * heightNumCm) - (4.330 * ageNum);
        break;
      case 'katch':
        const leanBodyMass = weightKg * (1 - (bodyFatNum / 100));
        bmr = 370 + (21.6 * leanBodyMass);
        break;
      case 'mifflin':
      default:
        bmr = gender === 'male'
          ? (10 * weightKg) + (6.25 * heightNumCm) - (5 * ageNum) + 5
          : (10 * weightKg) + (6.25 * heightNumCm) - (5 * ageNum) - 161;
    }

    const tdee = bmr * parseFloat(activityLevel);

    const calculatedResults = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      mildWeightLoss: Math.round(tdee - 250),
      weightLoss: Math.round(tdee - 500),
      extremeWeightLoss: Math.round(tdee - 1000),
      mildWeightGain: Math.round(tdee + 250),
      weightGain: Math.round(tdee + 500),
      extremeWeightGain: Math.round(tdee + 1000)
    };

    setResults(calculatedResults);
    saveCalculation('TDEE Calculator', calculatedResults, `TDEE: ${calculatedResults.tdee} kcal`);
    toast({ title: "Calculation Complete!", description: `Your estimated TDEE is ${calculatedResults.tdee} calories/day.` });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Calculator className="w-6 h-6 text-emerald-400" /> Enter Your Details
          </CardTitle>
          <CardDescription className="text-slate-400">
            Provide your stats to get an accurate TDEE estimate.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2 p-1 bg-slate-900/50 rounded-lg">
            <Button variant={unit === 'metric' ? 'default' : 'ghost'} className={`flex-1 ${unit === 'metric' ? 'bg-emerald-600 hover:bg-emerald-700' : 'text-slate-400 hover:text-white'}`} onClick={() => setUnit('metric')}>Metric</Button>
            <Button variant={unit === 'imperial' ? 'default' : 'ghost'} className={`flex-1 ${unit === 'imperial' ? 'bg-emerald-600 hover:bg-emerald-700' : 'text-slate-400 hover:text-white'}`} onClick={() => setUnit('imperial')}>Imperial</Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label className="text-slate-200">Formula</Label>
                <Select value={formula} onValueChange={setFormula}>
                    <SelectTrigger className="w-full bg-slate-900/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select formula" />
                    </SelectTrigger>
                    <SelectContent>
                        {formulas.map(f => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
                    </SelectContent>
                </Select>
             </div>
             {formula !== 'katch' && (
                <div className="space-y-2">
                    <Label className="text-slate-200">Gender</Label>
                    <div className="flex gap-2 h-10">
                        <Button variant={gender === 'male' ? 'default' : 'outline'} className={`w-full ${gender === 'male' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}`} onClick={() => setGender('male')}>Male</Button>
                        <Button variant={gender === 'female' ? 'default' : 'outline'} className={`w-full ${gender === 'female' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}`} onClick={() => setGender('female')}>Female</Button>
                    </div>
                </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CalculatorInput id="age" label="Age (years)" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g., 25" />
            <CalculatorInput id="weight" label={`Weight (${unit === 'metric' ? 'kg' : 'lbs'})`} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={`e.g., ${unit === 'metric' ? '70' : '155'}`} />
          </div>

          {unit === 'metric' ? (
            <CalculatorInput id="height" label="Height (cm)" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="e.g., 178" />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <CalculatorInput id="heightFeet" label="Height (feet)" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="e.g., 5" />
              <CalculatorInput id="heightInches" label="Height (inches)" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="e.g., 10" />
            </div>
          )}
          
          {formula === 'katch' && <CalculatorInput id="bodyFat" label="Body Fat (%)" value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} placeholder="e.g., 15" />}

          <div className="space-y-2">
            <Label className="text-slate-200">Weekly Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger className="w-full bg-slate-900/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                    {activityLevels.map(level => (
                        <SelectItem key={level.value} value={level.value}>
                            <div className="flex flex-col">
                                <span>{level.label}</span>
                                <span className="text-xs text-slate-400">{level.description}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button onClick={calculateTDEE} className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-6 text-lg shadow-lg">
              <Calculator className="w-5 h-5 mr-2" /> Calculate
            </Button>
            <Button onClick={resetCalculator} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">Reset</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TDEE_CalculatorForm;
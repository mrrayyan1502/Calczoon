import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, RefreshCw } from 'lucide-react';

const BodyFatCalculatorForm = ({ onCalculate }) => {
    const [units, setUnits] = useState('imperial');
    const [gender, setGender] = useState('male');
    const [method, setMethod] = useState('navy');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [neck, setNeck] = useState('');
    const [waist, setWaist] = useState('');
    const [hip, setHip] = useState('');
    const [errors, setErrors] = useState({});
    const { toast } = useToast();

    const validate = () => {
        const newErrors = {};
        if (!age || age <= 0) newErrors.age = 'Age is required.';
        if (!weight || weight <= 0) newErrors.weight = 'Weight is required.';
        if (!height || height <= 0) newErrors.height = 'Height is required.';
        if (!neck || neck <= 0) newErrors.neck = 'Neck measurement is required.';
        if (!waist || waist <= 0) newErrors.waist = 'Waist measurement is required.';
        if (gender === 'female' && (!hip || hip <= 0)) newErrors.hip = 'Hip measurement is required for females.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCalculate = (e) => {
        e.preventDefault();
        if (method !== 'navy') {
            toast({
                title: "Feature Coming Soon!",
                description: "🚧 The 3-Site Skinfold method isn't implemented yet. Please use the U.S. Navy method for now. 🚀",
            });
            return;
        }
        if (!validate()) return;

        const heightCm = units === 'imperial' ? parseFloat(height) * 2.54 : parseFloat(height);
        const neckCm = units === 'imperial' ? parseFloat(neck) * 2.54 : parseFloat(neck);
        const waistCm = units === 'imperial' ? parseFloat(waist) * 2.54 : parseFloat(waist);
        const weightKg = units === 'imperial' ? parseFloat(weight) * 0.453592 : parseFloat(weight);

        let bodyFatPercentage;

        if (gender === 'male') {
            bodyFatPercentage = 86.010 * Math.log10(waistCm - neckCm) - 70.041 * Math.log10(heightCm) + 36.76;
        } else {
            const hipCm = units === 'imperial' ? parseFloat(hip) * 2.54 : parseFloat(hip);
            bodyFatPercentage = 163.205 * Math.log10(waistCm + hipCm - neckCm) - 97.684 * Math.log10(heightCm) - 78.387;
        }

        if (bodyFatPercentage < 0 || !isFinite(bodyFatPercentage)) {
            toast({
                variant: "destructive",
                title: "Calculation Error",
                description: "Please check your measurements. The values entered result in an invalid body fat percentage.",
            });
            return;
        }

        const fatMass = weightKg * (bodyFatPercentage / 100);
        const leanMass = weightKg - fatMass;

        let category = '';
        if (gender === 'male') {
            if (bodyFatPercentage < 6) category = 'Essential Fat';
            else if (bodyFatPercentage < 14) category = 'Athletes';
            else if (bodyFatPercentage < 18) category = 'Fitness';
            else if (bodyFatPercentage < 25) category = 'Average';
            else category = 'Obese';
        } else {
            if (bodyFatPercentage < 14) category = 'Essential Fat';
            else if (bodyFatPercentage < 21) category = 'Athletes';
            else if (bodyFatPercentage < 25) category = 'Fitness';
            else if (bodyFatPercentage < 32) category = 'Average';
            else category = 'Obese';
        }

        onCalculate({
            bodyFatPercentage,
            fatMass: units === 'imperial' ? fatMass * 2.20462 : fatMass,
            leanMass: units === 'imperial' ? leanMass * 2.20462 : leanMass,
            category,
            units,
            inputs: { age, weight, height, neck, waist, hip, gender, method, units }
        });
    };

    const handleReset = () => {
        setAge(''); setWeight(''); setHeight(''); setNeck(''); setWaist(''); setHip(''); setErrors({});
        onCalculate(null);
    };

    const InputField = ({ id, label, value, onChange, unit, error }) => (
        <div className="space-y-2">
            <Label htmlFor={id} className={`text-slate-300 ${error ? 'text-red-400' : ''}`}>{label}</Label>
            <div className="flex items-center">
                <Input id={id} type="number" value={value} onChange={onChange} placeholder="0" className={`bg-slate-700 border-slate-600 text-white focus:ring-emerald-500 ${error ? 'border-red-400' : ''}`} />
                <span className="ml-3 text-slate-400">{unit}</span>
            </div>
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    );

    return (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <BrainCircuit className="w-6 h-6 text-emerald-400" />
                    Estimate Your Body Fat
                </CardTitle>
                <CardDescription className="text-slate-400">Enter your details below to calculate your body fat percentage.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleCalculate} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-slate-300">Units</Label>
                            <Tabs value={units} onValueChange={setUnits} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                                    <TabsTrigger value="imperial">Imperial</TabsTrigger>
                                    <TabsTrigger value="metric">Metric</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Gender</Label>
                            <Tabs value={gender} onValueChange={setGender} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                                    <TabsTrigger value="male">Male</TabsTrigger>
                                    <TabsTrigger value="female">Female</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="method" className="text-slate-300">Method</Label>
                        <Select value={method} onValueChange={setMethod}>
                            <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
                                <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                <SelectItem value="navy">U.S. Navy Method</SelectItem>
                                <SelectItem value="skinfold">3-Site Skinfold (Coming Soon)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputField id="age" label="Age" value={age} onChange={(e) => setAge(e.target.value)} unit="years" error={errors.age} />
                        <InputField id="weight" label="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} unit={units === 'imperial' ? 'lbs' : 'kg'} error={errors.weight} />
                        <InputField id="height" label="Height" value={height} onChange={(e) => setHeight(e.target.value)} unit={units === 'imperial' ? 'in' : 'cm'} error={errors.height} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputField id="neck" label="Neck" value={neck} onChange={(e) => setNeck(e.target.value)} unit={units === 'imperial' ? 'in' : 'cm'} error={errors.neck} />
                        <InputField id="waist" label="Waist" value={waist} onChange={(e) => setWaist(e.target.value)} unit={units === 'imperial' ? 'in' : 'cm'} error={errors.waist} />
                        <AnimatePresence>
                            {gender === 'female' && (
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                    <InputField id="hip" label="Hip" value={hip} onChange={(e) => setHip(e.target.value)} unit={units === 'imperial' ? 'in' : 'cm'} error={errors.hip} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-6 text-lg shadow-lg hover:from-emerald-700 hover:to-teal-700">
                            Calculate Body Fat
                        </Button>
                        <Button type="button" variant="outline" onClick={handleReset} className="w-full sm:w-auto bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white py-6">
                            <RefreshCw className="w-5 h-5 mr-2" /> Reset
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default BodyFatCalculatorForm;
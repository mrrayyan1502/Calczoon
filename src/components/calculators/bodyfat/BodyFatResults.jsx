import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Target, Scale, ShieldCheck } from 'lucide-react';
import ShareResults from '@/components/ShareResults';

const BodyFatResults = ({ result }) => {
    if (!result) return null;

    const { bodyFatPercentage, fatMass, leanMass, category, units } = result;
    const weightUnit = units === 'imperial' ? 'lbs' : 'kg';

    const getCategoryColor = (cat) => {
        switch (cat) {
            case 'Essential Fat': return 'text-orange-400';
            case 'Athletes': return 'text-green-400';
            case 'Fitness': return 'text-emerald-400';
            case 'Average': return 'text-yellow-400';
            case 'Obese': return 'text-red-400';
            default: return 'text-white';
        }
    };

    const ResultCard = ({ icon, title, value, unit, colorClass }) => (
        <motion.div
            className="bg-slate-800 p-4 rounded-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-center items-center mb-2">{icon}</div>
            <p className="text-slate-400 text-sm">{title}</p>
            <p className={`text-2xl font-bold ${colorClass || 'text-white'}`}>
                {value} <span className="text-lg font-normal text-slate-400">{unit}</span>
            </p>
        </motion.div>
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardHeader>
                    <CardTitle className="text-white text-2xl">Your Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ResultCard
                            icon={<Target className="w-8 h-8 text-emerald-400" />}
                            title="Body Fat Percentage"
                            value={bodyFatPercentage.toFixed(1)}
                            unit="%"
                            colorClass="text-emerald-400"
                        />
                        <ResultCard
                            icon={<ShieldCheck className="w-8 h-8 text-blue-400" />}
                            title="Body Fat Category"
                            value={category}
                            unit=""
                            colorClass={getCategoryColor(category)}
                        />
                        <ResultCard
                            icon={<Scale className="w-8 h-8 text-slate-400" />}
                            title="Fat Mass"
                            value={fatMass.toFixed(1)}
                            unit={weightUnit}
                        />
                    </div>
                     <div className="bg-slate-800 p-4 rounded-lg text-center">
                        <p className="text-slate-400 text-sm">Lean Body Mass</p>
                        <p className="text-3xl font-bold text-white">
                            {leanMass.toFixed(1)} <span className="text-xl font-normal text-slate-400">{weightUnit}</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-1">(Muscle, Bone, Organs, and Water)</p>
                    </div>
                    <ShareResults
                        textToShare={`I just calculated my body fat percentage using CalcZoon! My result: ${bodyFatPercentage.toFixed(1)}% (${category}). Check yours out!`}
                    />
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default BodyFatResults;
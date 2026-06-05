import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const TDEE_Content = () => (
    <>
        <section id="what-is-tdee" className="mb-12">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardHeader>
                    <h2 className="text-2xl font-bold text-white">What is TDEE (Total Daily Energy Expenditure)?</h2>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-4">
                    <p>Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a 24-hour period. It's a crucial metric for anyone looking to manage their weight, as it tells you exactly how many calories you need to consume to either lose, maintain, or gain weight. Your TDEE isn't a static number; it's a dynamic value influenced by your metabolism, activity level, and even the food you eat.</p>
                    <p>Understanding your TDEE is the first step toward effective nutrition planning. Instead of relying on generic diet plans, knowing your TDEE allows you to set a precise calorie target based on your unique body and lifestyle.</p>
                </CardContent>
            </Card>
        </section>

        <section id="how-to-use-tdee-calculator" className="mb-12">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardHeader>
                    <h2 className="text-2xl font-bold text-white">Step-by-Step Guide: How to Use the TDEE Calculator</h2>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-4">
                    <ol className="list-decimal pl-6 space-y-2">
                        <li><strong>Input your vitals:</strong> Select your gender and enter your current age, weight, and height. Select metric or imperial units as preferred.</li>
                        <li><strong>Specify your activity level:</strong> Select the multiplier that closest matches your typical weekly routine, ranging from Sedentary (desk job) to Extra Active (physical work/intense sports).</li>
                        <li><strong>Select BMR Formula (Optional):</strong> Select your formula preference. Mifflin-St Jeor is the general standard, while Katch-McArdle is recommended if you know your body fat percentage.</li>
                        <li><strong>Submit:</strong> Click the "Calculate Calories" button to get your custom BMR and TDEE maintenance calorie target.</li>
                    </ol>
                </CardContent>
            </Card>
        </section>

        <section id="how-is-tdee-calculated" className="mb-12">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardHeader>
                    <h2 className="text-2xl font-bold text-white">How is TDEE Calculated mathematically?</h2>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-6">
                     <p>TDEE is calculated by first determining your Basal Metabolic Rate (BMR) and then multiplying it by an activity multiplier. Here are the exact mathematical equations our tool runs behind the scenes:</p>
                     
                     <div className="bg-emerald-500/10 p-5 border border-emerald-500/30 rounded-lg space-y-4">
                        <h3 className="font-semibold text-white text-lg">1. Mifflin-St Jeor Equation (Standard)</h3>
                        <p className="text-sm">The most modern formula for general populations:</p>
                        <div className="bg-slate-950/50 p-3 rounded font-mono text-xs text-emerald-400">
                            <p>Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5</p>
                            <p>Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161</p>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 p-5 border border-slate-700 rounded-lg space-y-4">
                        <h3 className="font-semibold text-white text-lg">2. Katch-McArdle Equation (Lean Body Mass)</h3>
                        <p className="text-sm">Ideal if you know your body fat percentage, as it scales solely on muscle tissue:</p>
                        <div className="bg-slate-950/50 p-3 rounded font-mono text-xs text-emerald-400">
                            <p>BMR = 370 + (21.6 × Lean Body Mass in kg)</p>
                            <p>Where: Lean Body Mass = weight in kg × (100 - body fat %) ÷ 100</p>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 p-5 border border-slate-700 rounded-lg space-y-4">
                        <h3 className="font-semibold text-white text-lg">3. Revised Harris-Benedict Equation (Legacy)</h3>
                        <p className="text-sm">An older equation updated in 1984:</p>
                        <div className="bg-slate-950/50 p-3 rounded font-mono text-xs text-emerald-400">
                            <p>Men: BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) - (5.677 × age in years)</p>
                            <p>Women: BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) - (4.330 × age in years)</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-white">Activity Multipliers (TDEE = BMR × Multiplier):</h3>
                        <ul className="list-disc pl-6 space-y-1 text-sm text-slate-400">
                            <li>Sedentary (little or no exercise): BMR × 1.2</li>
                            <li>Lightly Active (light exercise/sports 1-3 days/week): BMR × 1.375</li>
                            <li>Moderately Active (moderate exercise/sports 3-5 days/week): BMR × 1.55</li>
                            <li>Very Active (hard exercise/sports 6-7 days/week): BMR × 1.725</li>
                            <li>Extra Active (very hard exercise/sports & physical job): BMR × 1.9</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </section>

        <section id="understanding-components" className="mb-12">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardHeader>
                    <h2 className="text-2xl font-bold text-white">Understanding the Components of TDEE</h2>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-3">
                    <p>Your TDEE is a sum of four different types of energy expenditure:</p>
                    <div className="bg-slate-900/50 p-4 border border-slate-700 rounded-lg">
                        <h3 className="font-semibold text-white mb-1">1. Basal Metabolic Rate (BMR)</h3>
                        <p className="text-sm">The energy your body uses at complete rest to perform vital functions like breathing and circulation. It's the largest contributor to your TDEE (about 60-70%).</p>
                    </div>
                    <div className="bg-slate-900/50 p-4 border border-slate-700 rounded-lg">
                        <h3 className="font-semibold text-white mb-1">2. Thermic Effect of Food (TEF)</h3>
                        <p className="text-sm">The calories burned during the digestion and absorption of food. It accounts for about 10% of your TDEE.</p>
                    </div>
                    <div className="bg-slate-900/50 p-4 border border-slate-700 rounded-lg">
                        <h3 className="font-semibold text-white mb-1">3. Exercise Activity Thermogenesis (EAT)</h3>
                        <p className="text-sm">The calories you burn during planned physical activities like gym workouts, running, or sports.</p>
                    </div>
                    <div className="bg-slate-900/50 p-4 border border-slate-700 rounded-lg">
                        <h3 className="font-semibold text-white mb-1">4. Non-Exercise Activity Thermogenesis (NEAT)</h3>
                        <p className="text-sm">The energy expended for everything we do that is not sleeping, eating, or sports-like exercise. This includes walking, typing, fidgeting, and maintaining posture.</p>
                    </div>
                </CardContent>
            </Card>
        </section>

        <section id="how-to-use-results" className="mb-12">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardHeader>
                    <h2 className="text-2xl font-bold text-white">How to Use Your TDEE Results for Weight Goals</h2>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-6">
                    <p>Once you have your TDEE, you can set your daily calorie goal based on your objective:</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-slate-900/50 p-6 border border-slate-700 rounded-lg">
                            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4"><span className="text-2xl font-bold text-red-400">1</span></div>
                            <h3 className="font-semibold text-white mb-2">For Fat Loss</h3>
                            <p className="text-sm">To lose weight, you need a calorie deficit. A good starting point is to subtract 300-500 calories from your TDEE. This creates a sustainable deficit for steady fat loss while preserving muscle.</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 border border-slate-700 rounded-lg">
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4"><span className="text-2xl font-bold text-emerald-400">2</span></div>
                            <h3 className="font-semibold text-white mb-2">For Weight Maintenance</h3>
                            <p className="text-sm">To maintain your current weight, simply eat at your calculated TDEE. This is your "maintenance calorie" level. Monitor your weight for a few weeks and adjust as needed.</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 border border-slate-700 rounded-lg">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4"><span className="text-2xl font-bold text-blue-400">3</span></div>
                            <h3 className="font-semibold text-white mb-2">For Muscle Gain</h3>
                            <p className="text-sm">To build muscle (a "lean bulk"), you need a calorie surplus. Add 250-500 calories to your TDEE. Combine this with a solid strength training program for optimal results.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>

        <section id="important-considerations" className="mb-12">
            <Card className="bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <CardHeader>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-400" />
                        <span>Important Considerations</span>
                    </h2>
                </CardHeader>
                <CardContent className="text-slate-300">
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span><span><strong>TDEE is an estimate:</strong> Use it as a starting point. Your metabolism is unique, so track your progress over 2-3 weeks and adjust your calorie intake based on real-world results.</span></li>
                        <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span><span><strong>Track accurately:</strong> For best results, use a food scale and a tracking app to monitor your intake. It's easy to misjudge portion sizes.</span></li>
                        <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span><span><strong>Prioritize protein:</strong> No matter your goal, aim for adequate protein intake (around 1.6-2.2g per kg of body weight) to help preserve or build muscle mass. Check our <Link to="/health/macro-calculator" className="text-emerald-400 hover:underline">Macro Calculator</Link> for personalized targets.</span></li>
                        <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span><span><strong>Be patient and consistent:</strong> Progress isn't always linear. Stick with your plan, stay consistent, and trust the process.</span></li>
                    </ul>
                </CardContent>
            </Card>
        </section>
    </>
);

export default TDEE_Content;
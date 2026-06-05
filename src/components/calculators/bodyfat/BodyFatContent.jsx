import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Shield, HeartPulse } from 'lucide-react';

const BodyFatContent = () => {
  return (
    <section id="info" className="mb-12">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Understanding Body Fat</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none text-slate-300">
          <p>
            Body fat percentage is a key indicator of health and fitness, often more telling than body weight or BMI alone. It represents the proportion of your total body mass that is fat. Understanding this number helps you tailor your fitness and nutrition plans more effectively.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 my-6">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <h3 className="font-semibold text-emerald-400 flex items-center gap-2"><Zap size={20} /> Energy Store</h3>
              <p className="text-sm">Body fat is your body's primary energy reserve. A healthy amount is crucial for survival and daily function, but excess storage can lead to health issues.</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <h3 className="font-semibold text-emerald-400 flex items-center gap-2"><Shield size={20} /> Protection</h3>
              <p className="text-sm">Fat cushions vital organs, protecting them from shock and injury. It also helps insulate the body, maintaining a stable internal temperature.</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <h3 className="fontsemibold text-emerald-400 flex items-center gap-2"><HeartPulse size={20} /> Health Indicator</h3>
              <p className="text-sm">Maintaining a healthy body fat percentage is linked to a lower risk of chronic diseases like heart disease, type 2 diabetes, and high blood pressure.</p>
            </div>
          </div>

          <h4 className="text-white">General Body Fat Percentage Categories</h4>
          <p>These ranges are approximate and can vary based on age and individual factors.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="p-2">Category</th>
                  <th className="p-2">Men</th>
                  <th className="p-2">Women</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-700">
                  <td className="p-2 font-semibold">Essential Fat</td>
                  <td className="p-2">2-5%</td>
                  <td className="p-2">10-13%</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="p-2 font-semibold">Athletes</td>
                  <td className="p-2">6-13%</td>
                  <td className="p-2">14-20%</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="p-2 font-semibold">Fitness</td>
                  <td className="p-2">14-17%</td>
                  <td className="p-2">21-24%</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="p-2 font-semibold">Average</td>
                  <td className="p-2">18-24%</td>
                  <td className="p-2">25-31%</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Obese</td>
                  <td className="p-2">25%+</td>
                  <td className="p-2">32%+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            Use this calculator as a tool to track your progress over time. For the most accurate assessment, consider consulting a healthcare or fitness professional.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default BodyFatContent;
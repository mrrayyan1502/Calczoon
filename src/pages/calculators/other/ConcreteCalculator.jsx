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

const ConcreteCalculator = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('');
  const [unit, setUnit] = useState('feet'); // feet, inches, meters
  const [result, setResult] = useState(null);

  const calculateConcrete = (e) => {
    e.preventDefault();
    const l = parseFloat(length);
    const w = parseFloat(width);
    let t = parseFloat(thickness);

    if (isNaN(l) || isNaN(w) || isNaN(t) || l <= 0 || w <= 0 || t <= 0) {
      setResult({ error: "Please enter valid positive numbers for all dimensions." });
      return;
    }

    let lengthFeet = l;
    let widthFeet = w;
    let thicknessInches = t;

    if (unit === 'inches') {
      lengthFeet = l / 12;
      widthFeet = w / 12;
    } else if (unit === 'meters') {
      lengthFeet = l * 3.28084;
      widthFeet = w * 3.28084;
      thicknessInches = t / 2.54; // Convert cm to inches
    }

    const volumeCubicFeet = lengthFeet * widthFeet * (thicknessInches / 12);
    const volumeCubicYards = volumeCubicFeet / 27;

    const bags60lb = volumeCubicFeet / 0.45;
    const bags80lb = volumeCubicFeet / 0.6;

    const newResult = {
      volumeCubicYards: volumeCubicYards.toFixed(2),
      volumeCubicFeet: volumeCubicFeet.toFixed(2),
      bags60lb: Math.ceil(bags60lb),
      bags80lb: Math.ceil(bags80lb),
    };
    setResult(newResult);
    saveCalculation({
      type: 'Concrete',
      inputs: { length, width, thickness, unit },
      result: { Volume: `${newResult.volumeCubicYards} yd³`, Bags: `${newResult.bags80lb} (80lb)` }
    });
  };

  const faqItems = [
    { question: "How do I calculate the concrete needed for a slab?", answer: "To calculate the concrete for a slab, you need to measure its length, width, and thickness. Multiply these three dimensions to get the volume. Our Concrete Calculator does this for you and even converts it to cubic yards, which is the standard unit for ordering ready-mix concrete." },
    { question: "What is the difference between 60lb and 80lb concrete bags?", answer: "The main difference is the amount of concrete mix in each bag. An 80lb bag yields about 0.60 cubic feet of concrete, while a 60lb bag yields about 0.45 cubic feet. For larger projects, using 80lb bags can be more cost-effective and require fewer bags to handle." },
    { question: "How much extra concrete should I order?", answer: "It's always a good idea to order 5-10% more concrete than you calculate. This accounts for any uneven subgrade, spillage, or minor measurement inaccuracies. It's better to have a little extra than to run short during a pour." },
    { question: "Can I use this calculator for round patios or sonotubes?", answer: "This calculator is designed for rectangular or square shapes. For circular areas, like a patio or sauna base, you'd calculate the area (π * radius²) and then multiply by the thickness to get the volume. For cylindrical columns (like with Sonotubes), the formula is π * radius² * height. You can then use the cubic feet result to estimate the number of bags needed." }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Concrete Calculator",
    "description": "Easily calculate the volume of concrete and the number of bags required for your project. Ideal for slabs, patios, footings, and more. Supports both imperial and metric units.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/lifestyle/concrete-calculator",
    "browserRequirements": "Requires a modern web browser."
  };

  return (
    <>
      <Seo
        title="Concrete Calculator - Estimate Bags and Volume Needed"
        description="Our free Concrete Calculator helps you determine the exact amount of concrete needed for your slab, patio, or footing project. Get instant calculations for cubic yards and bag quantities."
        canonicalUrl="/lifestyle/concrete-calculator"
        schema={[webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }]}
      />
      <div className="max-w-4xl mx-auto py-8 px-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <h1 className="text-3xl md:text-4xl font-bold text-center text-primary">Concrete Calculator</h1>
              <CardDescription className="text-center text-slate-300">
                Plan your project with confidence. Estimate the volume of concrete and the number of pre-mixed bags required for your slab, patio, or footing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateConcrete} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="length">Length</Label>
                    <Input id="length" type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="e.g., 10" required className="bg-slate-900 border-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width">Width</Label>
                    <Input id="width" type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="e.g., 10" required className="bg-slate-900 border-slate-700" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Units</Label>
                    <select id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-white h-10">
                      <option value="feet">Feet</option>
                      <option value="inches">Inches</option>
                      <option value="meters">Meters</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thickness">Thickness ({unit === 'meters' ? 'cm' : 'inches'})</Label>
                  <Input id="thickness" type="number" value={thickness} onChange={(e) => setThickness(e.target.value)} placeholder="e.g., 4" required className="bg-slate-900 border-slate-700" />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate</Button>
              </form>
            </CardContent>
            {result && !result.error && (
              <CardFooter className="flex flex-col items-center mt-6 p-6 bg-slate-800 rounded-b-lg">
                <h2 className="text-xl font-bold text-white mb-4">Calculation Results</h2>
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-slate-700 rounded-lg">
                    <p className="text-slate-300 text-sm">Volume Needed</p>
                    <p className="text-2xl font-bold text-primary">{result.volumeCubicYards} yd³</p>
                    <p className="text-sm text-slate-300">({result.volumeCubicFeet} ft³)</p>
                  </div>
                  <div className="p-4 bg-slate-700 rounded-lg">
                    <p className="text-slate-300 text-sm">60 lb Bags</p>
                    <p className="text-2xl font-bold text-primary">{result.bags60lb}</p>
                    <p className="text-sm text-slate-300">bags</p>
                  </div>
                  <div className="p-4 bg-slate-700 rounded-lg">
                    <p className="text-slate-300 text-sm">80 lb Bags</p>
                    <p className="text-2xl font-bold text-primary">{result.bags80lb}</p>
                    <p className="text-sm text-slate-300">bags</p>
                  </div>
                </div>
                 <div className="mt-4 w-full">
                    <ShareResults
                      title="Concrete Calculation Results"
                      text={`I need ${result.volumeCubicYards} cubic yards of concrete for my project. That's about ${result.bags80lb} 80lb bags! Calculated with Calczoon.`}
                      url="https://calczoon.com/lifestyle/concrete-calculator"
                    />
                 </div>
              </CardFooter>
            )}
            {result && result.error && (
              <CardFooter className="p-4 bg-red-900/20 rounded-b-lg mt-4">
                <p className="text-red-400 text-center w-full">{result.error}</p>
              </CardFooter>
            )}
          </Card>
          
          <div className="mt-8 text-slate-300 space-y-4">
            <h2 className="text-2xl font-bold text-white">How to Use the Concrete Calculator</h2>
            <p>Our Concrete Calculator is a simple yet powerful tool for homeowners and DIY enthusiasts. Whether you're planning a new patio, a foundation for a shed, or a simple garden path, getting the right amount of concrete is crucial. This calculator helps you estimate the required volume and the number of bags you'll need to purchase.</p>
            
            <h3 className="text-xl font-semibold text-white mt-4">Step-by-Step Guide:</h3>
            <ol className="list-decimal list-inside space-y-2 pl-4">
                <li><strong>Measure Your Area:</strong> Use a tape measure to get the length and width of the space you need to fill with concrete.</li>
                <li><strong>Determine the Thickness:</strong> Decide how thick the concrete slab needs to be. For a standard patio or walkway, 4 inches is common. For driveways that will support vehicles, 5 to 6 inches is recommended.</li>
                <li><strong>Select Units:</strong> Choose your preferred unit of measurement—feet, inches, or meters. The calculator will handle the conversions for you.</li>
                <li><strong>Enter the Values:</strong> Input your measurements into the calculator fields.</li>
                <li><strong>Get Your Results:</strong> The calculator instantly provides the total volume of concrete required in cubic yards and cubic feet, along with an estimate of how many 60-pound or 80-pound bags of pre-mixed concrete you'll need.</li>
            </ol>
            
            <h3 className="text-xl font-semibold text-white mt-4">Why Accurate Calculation Matters</h3>
            <p>Underestimating the amount of concrete can lead to a "cold joint"—a weak spot where fresh concrete is poured against already-hardened concrete. Overestimating, on the other hand, means wasted material and money. This tool helps you get it just right, saving you time, effort, and expense.</p>
            
            <h3 className="text-xl font-semibold text-white mt-4">Explore More Tools</h3>
            <p>Planning a home improvement project? You might also find our <Link to="/math/triangle-calculator" className="text-primary hover:underline">Triangle Calculator</Link> useful for calculating angles and areas, or our <Link to="/financial-calculators" className="text-primary hover:underline">Financial Calculators</Link> to budget for your project.</p>
          </div>

          <Faq items={faqItems} className="mt-8"/>
          <Disclaimer text="This calculator provides estimates. Actual concrete needs can vary based on subgrade conditions and spillage. It is recommended to add 5-10% to your order to ensure you have enough. Always consult with a professional for large-scale projects." />
        </div>
    </>
  );
};

export default ConcreteCalculator;
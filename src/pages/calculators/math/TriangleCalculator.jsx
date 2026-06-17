import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { saveCalculation } from '@/lib/history';
import { Triangle } from 'lucide-react';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';

const TriangleCalculator = () => {
  const [calculationMode, setCalculationMode] = useState('baseHeight');
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [sideC, setSideC] = useState('');
  const [base, setBase] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);

  const handleModeChange = (value) => {
    setCalculationMode(value);
    setSideA(''); setSideB(''); setSideC('');
    setBase(''); setHeight('');
    setResult(null);
  };

  const calculateWithBaseHeight = (e) => {
    e.preventDefault();
    const b = parseFloat(base);
    const h = parseFloat(height);
    if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) { setResult({ error: "Please enter valid positive numbers for base and height." }); return; }
    const area = 0.5 * b * h;
    const newResult = { area: area.toLocaleString(undefined, { maximumFractionDigits: 4 }), inputs: { base: b, height: h }, type: 'baseHeight' };
    setResult(newResult);
    saveCalculation({ type: 'Triangle Area (Base/Height)', inputs: { base, height }, result: { Area: newResult.area } });
  }

  const calculateWithSides = (e) => {
    e.preventDefault();
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);
    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) { setResult({ error: "Please enter valid positive numbers for all sides." }); return; }
    if (a + b <= c || a + c <= b || b + c <= a) { setResult({ error: "These sides cannot form a valid triangle. The sum of any two sides must be greater than the third side." }); return; }
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    const newResult = { area: area.toLocaleString(undefined, { maximumFractionDigits: 4 }), s: s.toFixed(2), inputs: { a, b, c }, type: 'heron' };
    setResult(newResult);
    saveCalculation({ type: 'Triangle Area (Sides)', inputs: { sideA, sideB, sideC }, result: { Area: newResult.area } });
  };
  
  const resetForm = (e) => {
      e.preventDefault();
      handleModeChange(calculationMode);
  };

  // Enhanced FAQ Items (8 total)
  const faqItems = [
    {
      question: "What is the area of a triangle?",
      answer: "The area of a triangle is the total space enclosed within its three sides. It is measured in square units, such as square centimeters (cm²), square meters (m²), or square inches (in²)."
    },
    {
      question: "How do I calculate the area of a triangle?",
      answer: "The most common method is to multiply the base by the height and then divide by 2. If you only know the lengths of the three sides, you can use Heron's Formula, which involves calculating the semi-perimeter first."
    },
    {
      question: "What is the formula for the area of a triangle?",
      answer: "For base and height: Area = ½ × base × height. For three sides (Heron's Formula): Area = √[s(s-a)(s-b)(s-c)], where 's' is the semi-perimeter (a+b+c)/2."
    },
    {
      question: "Can I calculate the area if I only know the 3 sides?",
      answer: "Yes! You can use Heron's Formula. Our calculator has a specific 'Using 3 Sides' tab that automatically performs this calculation for you."
    },
    {
      question: "Does the unit of measurement matter?",
      answer: "Yes, consistency is key. Ensure all your measurements (base, height, or sides) are in the same unit (e.g., all in meters or all in inches) before calculating. The result will be in that unit squared."
    },
    {
      question: "What if my triangle is a right-angled triangle?",
      answer: "For a right-angled triangle, the two sides that form the right angle can be treated as the base and height. Simply multiply them together and divide by 2."
    },
    {
      question: "How do I use this calculator?",
      answer: "Select your preferred method using the tabs: 'Using Base & Height' or 'Using 3 Sides'. Enter your values into the fields and click 'Calculate Area'. The result appears instantly."
    },
    {
      question: "What are real-world applications of calculating triangle area?",
      answer: "Calculating triangle area is essential in construction (roofing, flooring), land surveying, architecture, engineering, and even graphic design for determining shapes and polygons."
    }
  ];
  
  // Single Valid FAQPage Schema
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Triangle Area Calculator",
    "description": "Calculate the area of any triangle using either its base and height or the lengths of its three sides (Heron's formula).",
    "applicationCategory": "EducationApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/math/triangle-calculator",
    "browserRequirements": "Requires a modern web browser."
  };

  return (
    <>
      <Seo
        title="Triangle Area Calculator – With 3 Sides or Base/Height"
        description="Calculate the area of any triangle. A useful tool for students and builders to find the area of a triangle with 3 sides (Heron's formula) or with base and height."
        canonicalUrl="/math/triangle-calculator"
        schema={[webAppSchema, faqPageSchema]}
      />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
          <PageHeader title="Area of a Triangle Calculator" description="A simple tool to find the area of any triangle, whether you have its base and height or the lengths of all three sides." icon={Triangle}/>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
                <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                       <Tabs value={calculationMode} onValueChange={handleModeChange} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="baseHeight">Using Base & Height</TabsTrigger>
                            <TabsTrigger value="sides">Using 3 Sides</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </CardHeader>
                    <CardContent>
                       <Tabs value={calculationMode} onValueChange={handleModeChange} className="w-full">
                        <TabsContent value="baseHeight" className="pt-6">
                           <form onSubmit={calculateWithBaseHeight} className="space-y-6">
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   <div className="space-y-2"><Label htmlFor="base">Base</Label><Input id="base" type="number" value={base} onChange={(e) => setBase(e.target.value)} placeholder="e.g., 10" required className="bg-slate-900 border-slate-700" step="any"/></div>
                                   <div className="space-y-2"><Label htmlFor="height">Height</Label><Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 5" required className="bg-slate-900 border-slate-700" step="any"/></div>
                               </div>
                               <div className="flex gap-4"><Button type="submit" className="w-full bg-primary hover:bg-primary/90">Calculate Area</Button><Button variant="secondary" onClick={resetForm}>Reset</Button></div>
                           </form>
                        </TabsContent>
                        <TabsContent value="sides" className="pt-6">
                          <form onSubmit={calculateWithSides} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2"><Label htmlFor="sideA">Side A</Label><Input id="sideA" type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} placeholder="e.g., 5" required className="bg-slate-900 border-slate-700" step="any"/></div>
                                <div className="space-y-2"><Label htmlFor="sideB">Side B</Label><Input id="sideB" type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} placeholder="e.g., 6" required className="bg-slate-900 border-slate-700" step="any"/></div>
                                <div className="space-y-2"><Label htmlFor="sideC">Side C</Label><Input id="sideC" type="number" value={sideC} onChange={(e) => setSideC(e.target.value)} placeholder="e.g., 7" required className="bg-slate-900 border-slate-700" step="any"/></div>
                              </div>
                              <div className="flex gap-4"><Button type="submit" className="w-full bg-primary hover:bg-primary/90">Calculate Area</Button><Button variant="secondary" onClick={resetForm}>Reset</Button></div>
                          </form>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                    {result && (
                      <CardFooter className="flex flex-col items-center justify-center mt-6 p-6 bg-slate-800 rounded-b-lg">
                        {result.error ? (<p className="text-destructive text-center w-full">{result.error}</p>) : (
                          <div className="w-full text-center space-y-4">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-100 mb-2">Triangle Area</h2>
                                <p className="text-4xl font-bold text-primary">{result.area}</p>
                                <p className="text-slate-300">square units</p>
                            </div>
                            <ShareResults
                              title="Triangle Area Calculation"
                              text={`I calculated the area of a triangle on Calczoon and the result is ${result.area} square units!`}
                              url="https://calczoon.com/math/triangle-calculator"
                            />
                          </div>
                        )}
                      </CardFooter>
                    )}
                </Card>
            </div>
            <aside className="lg:col-span-1 space-y-6 lg:mt-16">
                <RelatedTools />
            </aside>
          </div>
          
          <Card className="bg-slate-800/50 border-slate-700 mt-8">
            <CardHeader><h2 className="text-2xl font-bold text-primary">How to Calculate the Area of a Triangle</h2></CardHeader>
            <CardContent className="space-y-6 text-slate-300">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Area of a Triangle Formula</h3>
                    <p>The most common method uses the triangle's base and height. The formula is simple and direct:</p>
                    <p className="text-lg text-center font-mono bg-slate-900 p-4 rounded-md my-4 text-primary">Area = 1/2 × base × height</p>
                    <p>This formula applies to all types of triangles, as long as the 'height' is measured perpendicular to the 'base'.</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Step-by-Step Example (Base & Height)</h3>
                    <p>Let's use a concrete example:</p>
                     <ul className="space-y-2 list-decimal list-inside mt-2 pl-4">
                        <li>Imagine a triangle with a base of <strong>10 cm</strong>.</li>
                        <li>Its perpendicular height is <strong>5 cm</strong>.</li>
                        <li>Plug the values into the formula: Area = 1/2 × 10 cm × 5 cm.</li>
                        <li>The result is <strong>25 cm²</strong>.</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Area using Heron's Formula (3 Sides)</h3>
                    <p>When you know the lengths of all three sides (a, b, and c), you can use Heron's formula:</p>
                    <ol className="list-decimal list-inside space-y-2 mt-2 pl-4">
                       <li>First, calculate the semi-perimeter (s): <code className="bg-slate-900 p-1 rounded-md text-primary">s = (a + b + c) / 2</code></li>
                       <li>Then, calculate the area: <code className="bg-slate-900 p-1 rounded-md text-primary">Area = √[s(s-a)(s-b)(s-c)]</code></li>
                   </ol>
                </div>
            </CardContent>
          </Card>

          <Faq items={faqItems} className="mt-8"/>
          <Disclaimer text="Please ensure the units (e.g., cm, meters, inches) are consistent for all inputs to get an accurate result."/>
      </div>
    </>
  );
};

export default TriangleCalculator;
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { saveCalculation } from '@/lib/history';
import { Triangle, BookOpen, ShieldAlert, CheckCircle2, HelpCircle } from 'lucide-react';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { Link } from 'react-router-dom';

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
    setSideA('');
    setSideB('');
    setSideC('');
    setBase('');
    setHeight('');
    setResult(null);
  };

  const calculateWithBaseHeight = (e) => {
    e.preventDefault();
    const b = parseFloat(base);
    const h = parseFloat(height);
    if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) {
      setResult({ error: "Please enter valid positive numbers for base and height." });
      return;
    }
    const area = 0.5 * b * h;
    const newResult = {
      area: area.toLocaleString(undefined, { maximumFractionDigits: 4 }),
      inputs: { base: b, height: h },
      type: 'baseHeight'
    };
    setResult(newResult);
    saveCalculation({
      type: 'Triangle Area (Base/Height)',
      inputs: { Base: b, Height: h },
      result: { Area: `${newResult.area} sq units` }
    });
  };

  const calculateWithSides = (e) => {
    e.preventDefault();
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);
    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
      setResult({ error: "Please enter valid positive numbers for all three sides." });
      return;
    }
    // Triangle Inequality Theorem
    if (a + b <= c || a + c <= b || b + c <= a) {
      setResult({ error: "Violation of Triangle Inequality Theorem: The sum of any two sides must strictly exceed the third side (a + b > c). These lengths cannot enclose a triangle." });
      return;
    }
    const s = (a + b + c) / 2; // Semi-perimeter
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    const perimeter = a + b + c;

    const newResult = {
      area: area.toLocaleString(undefined, { maximumFractionDigits: 4 }),
      s: s.toFixed(3),
      perimeter: perimeter.toFixed(2),
      inputs: { a, b, c },
      type: 'heron'
    };
    setResult(newResult);
    saveCalculation({
      type: "Triangle Area (Heron's SSS)",
      inputs: { 'Side A': a, 'Side B': b, 'Side C': c },
      result: { Area: `${newResult.area} sq units`, Perimeter: `${perimeter} units` }
    });
  };

  const resetForm = (e) => {
    e.preventDefault();
    handleModeChange(calculationMode);
  };

  const faqItems = [
    {
      question: "What is Heron's Formula and when should it be used?",
      answer: "Heron's Formula is an algebraic equation derived by Heron of Alexandria around 60 AD that calculates the area of any triangle knowing exclusively the lengths of its three sides (a, b, c), without requiring perpendicular height or angle measurements. It works by first deriving the semi-perimeter: s = (a + b + c) ÷ 2, and then computing Area = √[s(s − a)(s − b)(s − c)]."
    },
    {
      question: "What is the Triangle Inequality Theorem and why is it mandatory?",
      answer: "The Triangle Inequality Theorem states that for any valid geometric triangle, the sum of the lengths of any two sides must be strictly greater than the length of the remaining side: (a + b > c), (a + c > b), and (b + c > a). If the sum of two sides equals or is less than the third side, the line segments will collapse into a straight line or fail to meet, enclosing zero area."
    },
    {
      question: "How do you calculate the area of an Equilateral Triangle?",
      answer: "Because all three sides are equal (a = b = c) and internal angles are 60°, the area formula simplifies to: Area = (√3 ÷ 4) × a² ≈ 0.43301 × a². For example, an equilateral triangle with 6 cm sides has an area of (√3 ÷ 4) × 36 = 9√3 ≈ 15.588 cm²."
    },
    {
      question: "How do you find the area of a Right-Angled Triangle?",
      answer: "In a right triangle, the two perpendicular legs that meet at the 90° angle serve directly as the base and perpendicular height. Simply multiply the two shorter legs together and divide by 2: Area = (leg₁ × leg₂) ÷ 2. You do not need the hypotenuse to calculate area."
    },
    {
      question: "What is the SAS (Side-Angle-Side) trigonometric area formula?",
      answer: "When you know the lengths of two adjacent sides (a and b) and the included angle (θ or C) between them, the area is calculated using the sine function: Area = ½ × a × b × sin(C). This eliminates the need to construct a perpendicular altitude."
    },
    {
      question: "Why must perpendicular height be used instead of slant height?",
      answer: "Perpendicular height (altitude) represents the shortest orthogonal distance from the chosen base to the opposite apex vertex at an exact 90° angle. Using a slanted side length instead of true perpendicular height will artificially inflate your calculated area because hypotenuses are always longer than altitudes."
    }
  ];

  const pageTitle = "Triangle Calculator: Area, Perimeter & Heron's Formula | CalcZoon";
  const pageDescription = "Calculate triangle area using base and height, or all three sides with Heron's formula (SSS). Free geometry calculator with step-by-step proofs.";
  const canonicalUrl = "https://calczoon.com/math/triangle-calculator";

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} canonicalUrl={canonicalUrl} />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader
          title="Triangle Area & Geometry Calculator"
          description="Calculate exact triangle area using either perpendicular base and height or side lengths via Heron's Theorem with automatic Triangle Inequality verification."
          icon={Triangle}
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-xl">Select Calculation Method</CardTitle>
                <CardDescription className="text-slate-300">
                  Choose between standard Base & Height or 3 Sides (Heron's Formula).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={calculationMode} onValueChange={handleModeChange} className="w-full">
                  <TabsList className="grid grid-cols-2 bg-slate-900 w-full mb-6">
                    <TabsTrigger value="baseHeight" className="text-white data-[state=active]:bg-primary data-[state=active]:text-slate-950 font-bold">
                      Base & Height
                    </TabsTrigger>
                    <TabsTrigger value="sides" className="text-white data-[state=active]:bg-primary data-[state=active]:text-slate-950 font-bold">
                      3 Sides (Heron's SSS)
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="baseHeight" className="space-y-4">
                    <form onSubmit={calculateWithBaseHeight} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="base" className="text-slate-300">Base Length</Label>
                          <Input
                            id="base"
                            type="number"
                            value={base}
                            onChange={(e) => setBase(e.target.value)}
                            placeholder="e.g., 12"
                            required
                            className="bg-slate-900 border-slate-700 text-white"
                            step="any"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="height" className="text-slate-300">Perpendicular Height (Altitude)</Label>
                          <Input
                            id="height"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="e.g., 8"
                            required
                            className="bg-slate-900 border-slate-700 text-white"
                            step="any"
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-slate-950 font-bold h-12 text-base">
                          Calculate Triangle Area
                        </Button>
                        <Button variant="outline" onClick={resetForm} className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 h-12">
                          Reset
                        </Button>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="sides" className="space-y-4">
                    <form onSubmit={calculateWithSides} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sideA" className="text-slate-300">Side a</Label>
                          <Input
                            id="sideA"
                            type="number"
                            value={sideA}
                            onChange={(e) => setSideA(e.target.value)}
                            placeholder="e.g., 7"
                            required
                            className="bg-slate-900 border-slate-700 text-white"
                            step="any"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sideB" className="text-slate-300">Side b</Label>
                          <Input
                            id="sideB"
                            type="number"
                            value={sideB}
                            onChange={(e) => setSideB(e.target.value)}
                            placeholder="e.g., 8"
                            required
                            className="bg-slate-900 border-slate-700 text-white"
                            step="any"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sideC" className="text-slate-300">Side c</Label>
                          <Input
                            id="sideC"
                            type="number"
                            value={sideC}
                            onChange={(e) => setSideC(e.target.value)}
                            placeholder="e.g., 9"
                            required
                            className="bg-slate-900 border-slate-700 text-white"
                            step="any"
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-slate-950 font-bold h-12 text-base">
                          Calculate via Heron's Formula
                        </Button>
                        <Button variant="outline" onClick={resetForm} className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 h-12">
                          Reset
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>

              {result && (
                <CardFooter className="flex flex-col items-center justify-center p-6 bg-slate-900/80 border-t border-slate-700 rounded-b-lg">
                  {result.error ? (
                    <p className="text-rose-400 text-center w-full font-medium">{result.error}</p>
                  ) : (
                    <div className="w-full text-center space-y-4">
                      <div>
                        <h2 className="text-sm font-semibold text-slate-400 mb-1">Enclosed Triangle Area:</h2>
                        <p className="text-5xl font-black text-emerald-400">{result.area}</p>
                        <p className="text-slate-400 text-xs mt-1">Square Units (e.g., cm², m², in²)</p>
                      </div>

                      {result.type === 'heron' && (
                        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto text-xs">
                          <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                            <span className="text-slate-400 block mb-0.5">Semi-Perimeter (s)</span>
                            <span className="font-mono font-bold text-white text-sm">{result.s}</span>
                          </div>
                          <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                            <span className="text-slate-400 block mb-0.5">Total Perimeter</span>
                            <span className="font-mono font-bold text-sky-400 text-sm">{result.perimeter}</span>
                          </div>
                        </div>
                      )}

                      <div className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 flex items-start gap-3 text-left my-3">
                        <div className="text-xs text-slate-300 leading-relaxed">
                          <strong className="text-emerald-400 block mb-1">Recommended STEM Resource: Trigonometry &amp; Structural Design</strong>
                          In civil architecture and land surveying, triangulation delivers rigid load distribution that prevents shear failure in bridges, trusses, and roofs.
                        </div>
                      </div>

                      <div className="mt-4">
                        <ShareResults
                          title="Triangle Area Calculation"
                          text={`I calculated the area of a triangle on CalcZoon and the result is ${result.area} square units!`}
                          url="/math/triangle-calculator"
                        />
                      </div>
                    </div>
                  )}
                </CardFooter>
              )}
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" /> Area Formulas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-300 font-mono">
                <div className="pb-2 border-b border-slate-700/60">
                  <p className="text-emerald-400 font-bold">Standard Base-Height:</p>
                  <p className="text-slate-300 mt-0.5">Area = ½ × base × height</p>
                </div>
                <div className="pb-2 border-b border-slate-700/60">
                  <p className="text-sky-400 font-bold">Heron's Formula (3 Sides):</p>
                  <p className="text-slate-300 mt-0.5">s = (a + b + c) ÷ 2</p>
                  <p className="text-slate-300">Area = √[s(s−a)(s−b)(s−c)]</p>
                </div>
                <div>
                  <p className="text-amber-400 font-bold">Equilateral Triangle:</p>
                  <p className="text-slate-300 mt-0.5">Area = (√3 ÷ 4) × a²</p>
                </div>
              </CardContent>
            </Card>
            <RelatedTools />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,150 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10 mb-12">
          {/* Section 1: What is Triangle Area */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Triangle className="text-emerald-400 w-7 h-7" /> What is the Triangle Area Calculator & Geometric Principles
            </h2>
            <p className="text-base md:text-lg">
              The <strong>Triangle Calculator</strong> is an exact geometric computational tool engineered to calculate the interior surface area, perimeter, and semi-perimeter of any Euclidean two-dimensional triangle. In classical geometry, a triangle is the fundamental polygon formed by connecting three non-collinear vertices with three straight line segments.
            </p>
            <p>
              Triangles form the structural bedrock of all polygonal geometry—any complex 2D polygon or 3D computer graphics mesh can be decomposed into an assemblage of triangles (a process known as triangulation). Whether you are an architect sizing roofing trusses, a land surveyor calculating parcel acreages, or a student solving trigonometry problems, knowing when and how to deploy base-height, Heron's SSS, or trigonometric area formulas is essential.
            </p>
          </div>

          {/* Section 2: Mathematical Formulas & Proofs */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Mathematical Area Formulas & Heron's Geometric Derivation
            </h2>
            <p>
              Depending on the spatial parameters available, mathematicians utilize different analytical formulations:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4 font-mono text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-800/40 space-y-2">
                <p className="text-emerald-400 font-bold uppercase tracking-wider">Perpendicular Base-Height Formula</p>
                <p className="text-white text-sm font-semibold">Area = ½ × b × h</p>
                <p className="text-slate-400">Derived directly from the area of a parallelogram (Area = b × h) split diagonally into two congruent triangles.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-sky-800/40 space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider">Heron's Formula (Side-Side-Side)</p>
                <p className="text-white text-sm font-semibold">Area = √[s(s − a)(s − b)(s − c)]</p>
                <p className="text-slate-400">Where semi-perimeter s = (a + b + c) ÷ 2. Requires zero altitude or angle inputs.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-800/40 space-y-2">
                <p className="text-amber-400 font-bold uppercase tracking-wider">Trigonometric SAS Formula</p>
                <p className="text-white text-sm font-semibold">Area = ½ × a × b × sin(C)</p>
                <p className="text-slate-400">Uses two side lengths and the sine of their included interior vertex angle C.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-purple-800/40 space-y-2">
                <p className="text-purple-400 font-bold uppercase tracking-wider">Triangle Inequality Theorem</p>
                <p className="text-white text-sm font-semibold">a + b &gt; c &nbsp;|&nbsp; a + c &gt; b &nbsp;|&nbsp; b + c &gt; a</p>
                <p className="text-slate-400">Mandatory physical constraint: the sum of any two sides must strictly exceed the third.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Step-by-Step Usage Guide */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Step-by-Step Guide: How to Calculate Triangle Area Accurately
            </h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-white">Step 1: Identify Available Parameters:</strong> Determine whether you know the perpendicular altitude ($b$ and $h$) or the lengths of the three enclosing borders ($a$, $b$, and $c$).
              </li>
              <li>
                <strong className="text-white">Step 2: Ensure Uniform Measurement Units:</strong> Confirm that all lengths are in the same physical unit (e.g., all meters or all inches). Mixing feet with inches produces invalid square footage.
              </li>
              <li>
                <strong className="text-white">Step 3: Check Triangle Validity:</strong> If using three sides, verify that the two shortest sides add up to more than the longest side. If they do not, the lines cannot close into a triangle.
              </li>
              <li>
                <strong className="text-white">Step 4: Execute the Algebraic Calculation:</strong> Plug numbers into the corresponding formula and perform operations inside parentheses prior to multiplying or extracting square roots.
              </li>
              <li>
                <strong className="text-white">Step 5: Label the Final Output in Square Units:</strong> Always express your final answer in squared units (such as cm², m², or ft²).
              </li>
            </ol>
          </div>

          {/* Section 4: Real-World Numerical Worked Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Real-World Numerical Worked Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-bold">Case Study 1</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Roofing Truss (Base & Height)</span>
                </div>
                <h3 className="text-lg font-bold text-white">Gable Roof: Base = 14 m, Height = 6 m</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Base (b):</strong> 14 meters</li>
                  <li><strong>Perpendicular Height (h):</strong> 6 meters</li>
                  <li><strong>Formula:</strong> Area = ½ × b × h</li>
                  <li><strong>Calculation:</strong> ½ × 14 × 6 = 7 × 6</li>
                  <li><strong>Enclosed Area:</strong> <span className="text-emerald-400 font-bold text-sm">42.0 m²</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Takeaway: Simple base-height formulas quickly determine roofing sheet or insulation requirements.
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-sky-400 font-mono font-bold">Case Study 2</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Land Surveying (Heron's SSS)</span>
                </div>
                <h3 className="text-lg font-bold text-white">Land Parcel: a = 13 m, b = 14 m, c = 15 m</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Semi-Perimeter:</strong> s = (13 + 14 + 15) ÷ 2 = 42 ÷ 2 = 21 m</li>
                  <li><strong>Subtractions:</strong> (21−13) = 8, (21−14) = 7, (21−15) = 6</li>
                  <li><strong>Heron's Product:</strong> 21 × 8 × 7 × 6 = 7,056</li>
                  <li><strong>Square Root:</strong> √7,056 = 84</li>
                  <li><strong>Enclosed Area:</strong> <span className="text-sky-400 font-bold text-sm">84.0 m²</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Takeaway: Heron's formula determines precise plot acreage without requiring on-site altitude measurements.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Common Calculation Mistakes */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="text-amber-400 w-6 h-6" /> Common Geometric Mistakes to Avoid
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Confusing Slant Leg Length with Altitude
                </h3>
                <p className="text-xs text-slate-400">
                  In non-right triangles, a side edge is never perpendicular to the base. Using the slant side length instead of the vertical height creates significant area overestimation.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Violating the Triangle Inequality Theorem
                </h3>
                <p className="text-xs text-slate-400">
                  Attempting to calculate a triangle with sides 3, 4, and 10 will produce negative values inside Heron’s square root (such as √(-x)). The lengths cannot physically close.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Forgetting to Divide by 2 in Base × Height
                </h3>
                <p className="text-xs text-slate-400">
                  Multiplying base by height directly ($b \times h$) calculates the area of a rectangle, not a triangle. Always apply the ½ multiplier.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Inconsistent Measurement Units
                </h3>
                <p className="text-xs text-slate-400">
                  Measuring the base in feet and height in inches without unit conversion inflates the calculated area by a factor of 12. Convert all dimensions to a single unit first.
                </p>
              </div>
            </div>
          </div>

          {/* Static HTML Reference Benchmark Table */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Special Right Triangles &amp; Pythagorean Triples Benchmark Table</h2>
            <p className="text-sm text-slate-400">
              The geometric benchmark table below catalogues fundamental integer Pythagorean triples and special right triangle proportions alongside their exact area, perimeter, and interior angles.
            </p>
            <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-slate-950">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                    <th className="p-3 font-semibold">Triple / Type</th>
                    <th className="p-3 font-semibold text-emerald-400">Side a</th>
                    <th className="p-3 font-semibold text-emerald-400">Side b</th>
                    <th className="p-3 font-semibold text-sky-400">Hypotenuse c</th>
                    <th className="p-3 font-semibold text-amber-400">Enclosed Area</th>
                    <th className="p-3 font-semibold">Perimeter</th>
                    <th className="p-3 font-semibold">Angles (α, β, γ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">3-4-5 Primitive Triple</td><td className="p-3 font-mono text-emerald-400">3</td><td className="p-3 font-mono text-emerald-400">4</td><td className="p-3 font-mono text-sky-400">5</td><td className="p-3 font-mono text-amber-400">6.0000</td><td className="p-3 font-mono">12</td><td className="p-3">36.87°, 53.13°, 90°</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">5-12-13 Primitive Triple</td><td className="p-3 font-mono text-emerald-400">5</td><td className="p-3 font-mono text-emerald-400">12</td><td className="p-3 font-mono text-sky-400">13</td><td className="p-3 font-mono text-amber-400">30.0000</td><td className="p-3 font-mono">30</td><td className="p-3">22.62°, 67.38°, 90°</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">8-15-17 Primitive Triple</td><td className="p-3 font-mono text-emerald-400">8</td><td className="p-3 font-mono text-emerald-400">15</td><td className="p-3 font-mono text-sky-400">17</td><td className="p-3 font-mono text-amber-400">60.0000</td><td className="p-3 font-mono">40</td><td className="p-3">28.07°, 61.93°, 90°</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">7-24-25 Primitive Triple</td><td className="p-3 font-mono text-emerald-400">7</td><td className="p-3 font-mono text-emerald-400">24</td><td className="p-3 font-mono text-sky-400">25</td><td className="p-3 font-mono text-amber-400">84.0000</td><td className="p-3 font-mono">56</td><td className="p-3">16.26°, 73.74°, 90°</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">9-40-41 Primitive Triple</td><td className="p-3 font-mono text-emerald-400">9</td><td className="p-3 font-mono text-emerald-400">40</td><td className="p-3 font-mono text-sky-400">41</td><td className="p-3 font-mono text-amber-400">180.0000</td><td className="p-3 font-mono">90</td><td className="p-3">12.68°, 77.32°, 90°</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">11-60-61 Primitive Triple</td><td className="p-3 font-mono text-emerald-400">11</td><td className="p-3 font-mono text-emerald-400">60</td><td className="p-3 font-mono text-sky-400">61</td><td className="p-3 font-mono text-amber-400">330.0000</td><td className="p-3 font-mono">132</td><td className="p-3">10.39°, 79.61°, 90°</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">12-35-37 Primitive Triple</td><td className="p-3 font-mono text-emerald-400">12</td><td className="p-3 font-mono text-emerald-400">35</td><td className="p-3 font-mono text-sky-400">37</td><td className="p-3 font-mono text-amber-400">210.0000</td><td className="p-3 font-mono">84</td><td className="p-3">18.92°, 71.08°, 90°</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">20-21-29 Primitive Triple</td><td className="p-3 font-mono text-emerald-400">20</td><td className="p-3 font-mono text-emerald-400">21</td><td className="p-3 font-mono text-sky-400">29</td><td className="p-3 font-mono text-amber-400">210.0000</td><td className="p-3 font-mono">70</td><td className="p-3">43.60°, 46.40°, 90°</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">45°-45°-90° Isosceles Right</td><td className="p-3 font-mono text-emerald-400">1</td><td className="p-3 font-mono text-emerald-400">1</td><td className="p-3 font-mono text-sky-400">√2 (1.414)</td><td className="p-3 font-mono text-amber-400">0.5000</td><td className="p-3 font-mono">3.414</td><td className="p-3">45°, 45°, 90°</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">30°-60°-90° Half-Equilateral</td><td className="p-3 font-mono text-emerald-400">1</td><td className="p-3 font-mono text-emerald-400">√3 (1.732)</td><td className="p-3 font-mono text-sky-400">2</td><td className="p-3 font-mono text-amber-400">0.8660</td><td className="p-3 font-mono">4.732</td><td className="p-3">30°, 60°, 90°</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 6: In-Depth FAQs */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="text-primary w-6 h-6" /> Frequently Asked Questions (FAQ)
            </h2>
            <Faq items={faqItems} />
          </div>

          {/* Section 7: Clinical References & Interlinked Tools */}
          <div className="pt-6 border-t border-slate-700/60 space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Geometric References & Related Calculators
            </h3>
            <ul className="text-xs text-slate-400 space-y-1.5">
              <li>• Heron of Alexandria. <em>Metrica</em> (c. 60 AD). Translation by E. M. Bruins (1964).</li>
              <li>• Coxeter HSM. <em>Introduction to Geometry</em>. John Wiley & Sons (1989).</li>
              <li>• Dunham W. <em>Journey through Genius: The Great Theorems of Mathematics</em>. Penguin Books (1991).</li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/math/fraction-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Fraction Calculator →
              </Link>
              <Link to="/math/percentage-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Percentage Calculator →
              </Link>
              <Link to="/math/scientific-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Scientific Calculator →
              </Link>
              <Link to="/math/statistics-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Statistics Calculator →
              </Link>
            </div>
          </div>

          <Disclaimer text="Geometric calculations follow standard Euclidean axioms. Output values assume straight line segments enclosing a planar two-dimensional surface." />
        </section>
      </div>
    </>
  );
};

export default TriangleCalculator;

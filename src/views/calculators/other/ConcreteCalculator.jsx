'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveCalculation } from '@/lib/history';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { Box, Layers, DollarSign, Calculator, Sparkles, Building, AlertCircle } from 'lucide-react';

const ConcreteCalculator = () => {
  const [shape, setShape] = useState('slab'); // 'slab', 'column'
  const [length, setLength] = useState('20');
  const [width, setWidth] = useState('10');
  const [thickness, setThickness] = useState('4');
  const [diameter, setDiameter] = useState('12');
  const [depth, setDepth] = useState('4');
  const [quantity, setQuantity] = useState('1');
  const [wasteFactor, setWasteFactor] = useState('10'); // 10% standard margin
  const [unitSystem, setUnitSystem] = useState('imperial'); // 'imperial', 'metric'
  const [pricePerYard, setPricePerYard] = useState('140');
  const [result, setResult] = useState(null);

  const calculateConcrete = (e) => {
    if (e) e.preventDefault();
    const wasteMultiplier = 1 + (parseFloat(wasteFactor) || 0) / 100;
    const price = parseFloat(pricePerYard) || 0;
    const count = parseInt(quantity, 10) || 1;

    let volumeCuFt = 0;

    if (shape === 'slab') {
      const l = parseFloat(length);
      const w = parseFloat(width);
      const t = parseFloat(thickness);

      if (isNaN(l) || isNaN(w) || isNaN(t) || l <= 0 || w <= 0 || t <= 0) {
        setResult({ error: "Please enter valid positive dimensions for the slab." });
        return;
      }

      if (unitSystem === 'imperial') {
        // Length and width in feet, thickness in inches
        volumeCuFt = l * w * (t / 12) * count;
      } else {
        // Metric: Length and width in meters, thickness in centimeters
        const volumeCuMeters = l * w * (t / 100) * count;
        volumeCuFt = volumeCuMeters * 35.3147;
      }
    } else {
      // Cylindrical Column / Sonotube footing
      const d = parseFloat(diameter);
      const h = parseFloat(depth);

      if (isNaN(d) || isNaN(h) || d <= 0 || h <= 0) {
        setResult({ error: "Please enter valid positive numbers for diameter and depth." });
        return;
      }

      if (unitSystem === 'imperial') {
        // Diameter in inches, depth in feet
        const radiusFt = (d / 2) / 12;
        volumeCuFt = Math.PI * Math.pow(radiusFt, 2) * h * count;
      } else {
        // Metric: Diameter in centimeters, depth in meters
        const radiusM = (d / 2) / 100;
        const volumeCuM = Math.PI * Math.pow(radiusM, 2) * h * count;
        volumeCuFt = volumeCuM * 35.3147;
      }
    }

    const netCubicYards = volumeCuFt / 27;
    const grossCubicYards = netCubicYards * wasteMultiplier;
    const grossCubicMeters = grossCubicYards * 0.764555;
    const grossCuFt = volumeCuFt * wasteMultiplier;

    // Pre-mixed bags calculations
    // 80lb bag yields ~0.60 cu ft
    // 60lb bag yields ~0.45 cu ft
    // 40lb bag yields ~0.30 cu ft
    const bags80 = Math.ceil(grossCuFt / 0.60);
    const bags60 = Math.ceil(grossCuFt / 0.45);
    const bags40 = Math.ceil(grossCuFt / 0.30);

    const estimatedReadyMixCost = (grossCubicYards * price).toFixed(2);
    const estimatedBagCost = (bags80 * 6.50).toFixed(2); // ~$6.50 per 80lb bag benchmark

    const newResult = {
      netCubicYards: netCubicYards.toFixed(2),
      grossCubicYards: grossCubicYards.toFixed(2),
      grossCubicMeters: grossCubicMeters.toFixed(2),
      grossCuFt: grossCuFt.toFixed(1),
      bags80,
      bags60,
      bags40,
      estimatedReadyMixCost,
      estimatedBagCost,
      wastePercent: wasteFactor
    };

    setResult(newResult);
    saveCalculation({
      type: 'Concrete',
      inputs: { shape, unitSystem, wasteFactor },
      result: { Volume: `${newResult.grossCubicYards} cu yd`, Bags80: `${newResult.bags80}` }
    });
  };

  const faqItems = [
    {
      question: "How do you calculate concrete volume for a rectangular slab?",
      answer: "Concrete volume for a rectangular slab is calculated by multiplying Length (ft) × Width (ft) × Thickness (converted to feet by dividing inches by 12). Divide the total cubic feet by 27 to obtain cubic yards. Always include a 10% allowance for subgrade irregularities and spillage."
    },
    {
      question: "How many cubic yards of concrete are in a standard ready-mix truck?",
      answer: "A standard commercial transit ready-mix truck carries between 8 and 10 cubic yards of wet concrete. Most ready-mix suppliers mandate minimum delivery orders of 1 to 3 cubic yards or levy a short-load administrative fee."
    },
    {
      question: "How many bags of pre-mixed concrete equal one cubic yard?",
      answer: "One cubic yard equals 27 cubic feet. Because an 80-pound bag yields 0.60 cubic feet, you need 45 bags (80 lb) to produce 1 cubic yard. If using 60-pound bags (0.45 cu ft yield), you need 60 bags. If using 40-pound bags (0.30 cu ft yield), you need 90 bags."
    },
    {
      question: "Why is a 10% waste buffer recommended when ordering concrete?",
      answer: "Excavated soil is rarely laser-flat. Uneven subgrades, bowing formwork boards, deflection, spillage during chute pouring, and leftover concrete coating the pump line typically consume 5% to 10% of total volume. Running short during a pour risks an irreparable cold joint."
    },
    {
      question: "What is the standard recommended thickness for residential concrete slabs?",
      answer: "Standard pedestrian walkways and outdoor patios require a minimum thickness of 4 inches (10 cm). Residential driveways supporting passenger automobiles require 4 to 5 inches with reinforcing rebar or wire mesh, while heavy truck pads or RV parking require 6 inches."
    },
    {
      question: "What is the standard water-to-cement ratio and slump rating for durability?",
      answer: "A durable structural concrete mix typically maintains a water-to-cement ratio between 0.40 and 0.45, providing a 4-inch slump. Adding excessive water on-site may make pouring easier, but it dramatically weakens compressive strength and causes surface dusting and shrinkage cracking."
    },
    {
      question: "How do you calculate concrete for cylindrical columns and Sonotubes?",
      answer: "For round columns, footings, or post holes, use the cylinder volume formula: V = π × r² × h. Calculate radius in feet (diameter in inches / 24), square it, multiply by π (3.14159), and multiply by depth in feet. Divide total cubic feet by 27 for cubic yards."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Concrete Volume & Bag Calculator",
    "description": "Calculate concrete volume in cubic yards, cubic meters, and pre-mixed bags for slabs, footings, Sonotubes, and patios with waste margin.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/lifestyle/concrete-calculator",
    "browserRequirements": "Requires JavaScript."
  };

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

  return (
    <>
      <Seo
        title="Concrete Calculator: Estimate Cubic Yards & Pre-Mixed Bags"
        description="Free Concrete Calculator. Compute exact volume in cubic yards and meters for slabs, footings, and columns. Estimate 40lb, 60lb, and 80lb pre-mixed bags with waste buffer."
        canonicalUrl="/lifestyle/concrete-calculator"
        schema={[webAppSchema, faqPageSchema]}
        keywords={['concrete calculator', 'cubic yard calculator', 'concrete bag calculator', 'how much concrete do i need', 'slab concrete volume']}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Concrete Volume & Pre-Mixed Bag Calculator"
          description="Accurately estimate ready-mix cubic yardage, metric cubic meters, and required 80lb/60lb pre-mixed bags for slabs, foundations, footings, and cylindrical columns."
          icon={Layers}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white text-xl">Project Specifications</CardTitle>
                    <CardDescription className="text-slate-400">Select structural shape and enter project dimensions</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setUnitSystem('imperial')}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                        unitSystem === 'imperial' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Imperial (ft/in)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnitSystem('metric')}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                        unitSystem === 'metric' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Metric (m/cm)
                    </button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={calculateConcrete} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-medium">Structural Element Shape</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        onClick={() => setShape('slab')}
                        className={`py-2.5 text-sm ${shape === 'slab' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-950 border border-slate-700 text-slate-300 hover:text-white'}`}
                      >
                        Slab / Patio / Footing (Rectangular)
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setShape('column')}
                        className={`py-2.5 text-sm ${shape === 'column' ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-950 border border-slate-700 text-slate-300 hover:text-white'}`}
                      >
                        Column / Post Hole / Sonotube (Round)
                      </Button>
                    </div>
                  </div>

                  {shape === 'slab' ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="length" className="text-slate-300">
                          Length ({unitSystem === 'imperial' ? 'Feet' : 'Meters'})
                        </Label>
                        <Input
                          id="length"
                          type="number"
                          step="0.1"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                          placeholder="20"
                          required
                          className="bg-slate-950 border-slate-700 text-white text-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="width" className="text-slate-300">
                          Width ({unitSystem === 'imperial' ? 'Feet' : 'Meters'})
                        </Label>
                        <Input
                          id="width"
                          type="number"
                          step="0.1"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          placeholder="10"
                          required
                          className="bg-slate-950 border-slate-700 text-white text-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="thickness" className="text-slate-300">
                          Thickness ({unitSystem === 'imperial' ? 'Inches' : 'Centimeters'})
                        </Label>
                        <Input
                          id="thickness"
                          type="number"
                          step="0.5"
                          value={thickness}
                          onChange={(e) => setThickness(e.target.value)}
                          placeholder="4"
                          required
                          className="bg-slate-950 border-slate-700 text-white text-lg"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="diameter" className="text-slate-300">
                          Diameter ({unitSystem === 'imperial' ? 'Inches' : 'Centimeters'})
                        </Label>
                        <Input
                          id="diameter"
                          type="number"
                          step="0.5"
                          value={diameter}
                          onChange={(e) => setDiameter(e.target.value)}
                          placeholder="12"
                          required
                          className="bg-slate-950 border-slate-700 text-white text-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="depth" className="text-slate-300">
                          Depth / Height ({unitSystem === 'imperial' ? 'Feet' : 'Meters'})
                        </Label>
                        <Input
                          id="depth"
                          type="number"
                          step="0.1"
                          value={depth}
                          onChange={(e) => setDepth(e.target.value)}
                          placeholder="4"
                          required
                          className="bg-slate-950 border-slate-700 text-white text-lg"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-slate-300">Number of Identical Units</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="1"
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wasteFactor" className="text-slate-300">Waste & Spillage Allowance (%)</Label>
                      <select
                        id="wasteFactor"
                        value={wasteFactor}
                        onChange={(e) => setWasteFactor(e.target.value)}
                        className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-md text-white"
                      >
                        <option value="0">0% (Exact Net Volume)</option>
                        <option value="5">5% (Tight Forms)</option>
                        <option value="10">10% (Industry Standard Recommendation)</option>
                        <option value="15">15% (Uneven Ground / Deep Footings)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pricePerYard" className="text-slate-300">Ready-Mix Cost ($/yd³)</Label>
                      <Input
                        id="pricePerYard"
                        type="number"
                        value={pricePerYard}
                        onChange={(e) => setPricePerYard(e.target.value)}
                        placeholder="140"
                        className="bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 text-base">
                    Calculate Concrete Volume & Bags
                  </Button>
                </form>
              </CardContent>

              {result && !result.error && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-950/80 border-t border-slate-800 rounded-b-xl">
                  <div className="w-full space-y-5">
                    <div className="text-center py-5 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-slate-400 text-sm font-medium">Recommended Ready-Mix Order (with {result.wastePercent}% Waste Margin)</p>
                      <p className="text-4xl md:text-5xl font-extrabold text-emerald-400 my-1">
                        {result.grossCubicYards} <span className="text-2xl font-normal text-slate-400">yd³</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Equivalent to <span className="text-sky-400 font-semibold">{result.grossCubicMeters} m³</span> ({result.grossCuFt} cu ft) • Net volume: {result.netCubicYards} yd³
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Pre-Mixed Bag Requirements (DIY Option):</p>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">80 lb Bags</p>
                          <p className="text-2xl font-bold text-white mt-1">{result.bags80}</p>
                          <p className="text-[10px] text-slate-500">Yields 0.60 cu ft/bag</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">60 lb Bags</p>
                          <p className="text-2xl font-bold text-white mt-1">{result.bags60}</p>
                          <p className="text-[10px] text-slate-500">Yields 0.45 cu ft/bag</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <p className="text-xs text-slate-400">40 lb Bags</p>
                          <p className="text-2xl font-bold text-white mt-1">{result.bags40}</p>
                          <p className="text-[10px] text-slate-500">Yields 0.30 cu ft/bag</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex justify-between items-center">
                        <span className="text-slate-400">Estimated Ready-Mix Truck Cost:</span>
                        <span className="font-bold text-emerald-400 text-base">${result.estimatedReadyMixCost}</span>
                      </div>
                      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex justify-between items-center">
                        <span className="text-slate-400">Estimated 80lb Bag Cost:</span>
                        <span className="font-bold text-sky-400 text-base">${result.estimatedBagCost}</span>
                      </div>
                    </div>

                    {/* Monetization / Recommended Resource Box */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <p className="font-semibold text-emerald-300">Contractor Best Practice: Ready-Mix vs Bag Threshold</p>
                        <p className="text-slate-300 leading-relaxed">
                          For projects requiring more than 1.5 to 2.0 cubic yards (more than 70–90 bags of 80lb mix), ordering batch ready-mix concrete delivered via transit mixer is substantially faster, structurally more uniform, and less labor-intensive than hand-mixing individual bags in a wheelbarrow or portable mixer.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <ShareResults
                        title="Concrete Volume Calculation"
                        text={`My concrete pour requires ${result.grossCubicYards} cubic yards (${result.bags80} bags of 80lb mix) on Calczoon!`}
                        url="/lifestyle/concrete-calculator"
                      />
                    </div>
                  </div>
                </CardFooter>
              )}

              {result && result.error && (
                <CardFooter className="p-6 bg-slate-950/80 border-t border-slate-800 text-center rounded-b-xl">
                  <p className="text-rose-400 font-semibold text-center w-full">{result.error}</p>
                </CardFooter>
              )}
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <RelatedTools category="financial" />
          </aside>
        </div>

        {/* In-depth Educational & AEO Section */}
        <section className="mt-12 bg-slate-900/60 rounded-xl p-8 border border-slate-800 space-y-8 text-slate-300">
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Comprehensive Technical Guide to Concrete Volume & Material Estimation</h2>
            <p className="leading-relaxed text-slate-300">
              Concrete is the world's most widely utilized structural construction material, composed of a binder of Portland cement, fine aggregate (sand), coarse aggregate (gravel or crushed stone), and clean water. Whether forming a residential garden patio slab, pouring monolithic structural footings, casting retaining walls, or setting cylindrical Sonotube post piers, ordering the exact volume of concrete is critical. Running out of material mid-pour results in structurally defective cold joints, while severe over-ordering generates expensive waste and landfill tipping disposal fees.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">The Mathematical Equations of Concrete Volume</h3>
            <p className="mb-4 leading-relaxed">
              Standard civil engineering practices quantify ready-mix concrete in imperial cubic yards (yd³) or metric cubic meters (m³):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">1. Rectangular Slab / Footing Equation</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">
                  Volume (cu ft) = Length (ft) × Width (ft) × [ Thickness (in) / 12 ]<br />
                  Volume (yd³) = Volume (cu ft) / 27
                </div>
                <p className="text-xs text-slate-400">
                  Because 1 cubic yard equals exactly 27 cubic feet (3 ft × 3 ft × 3 ft), converting dimensional measurements to feet and dividing by 27 provides ready-mix truck volume.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">2. Cylindrical Column / Sonotube Equation</p>
                <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2 rounded mb-2">
                  Radius (ft) = [ Diameter (in) / 2 ] / 12<br />
                  Volume (cu ft) = π × (Radius)² × Depth (ft)<br />
                  Volume (yd³) = Volume (cu ft) / 27
                </div>
                <p className="text-xs text-slate-400">
                  Essential for fence posts, pole barn foundations, deck piers, and structural round columns.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Concrete Slab Thickness, Cubic Yardage & Pre-Mixed Bag Coverage Reference Table</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The benchmark table below demonstrates concrete volume requirements and equivalent 80-pound pre-mixed bags for standard rectangular slab footprints including a 10% safety waste factor:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-200">
                  <tr>
                    <th className="p-3">Slab Dimensions (ft)</th>
                    <th className="p-3">Surface Area (sq ft)</th>
                    <th className="p-3">Thickness (in)</th>
                    <th className="p-3">Net Volume (cu ft)</th>
                    <th className="p-3">Order Volume (+10% yd³)</th>
                    <th className="p-3">80 lb Bags Needed</th>
                    <th className="p-3">Typical Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">4' × 8'</td>
                    <td className="p-3">32 sq ft</td>
                    <td className="p-3">4 inches</td>
                    <td className="p-3">10.67 cu ft</td>
                    <td className="p-3 text-emerald-400 font-bold">0.43 yd³</td>
                    <td className="p-3 text-sky-400">20 Bags</td>
                    <td className="p-3">Small utility pad, AC condenser base, generator pad.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">10' × 10'</td>
                    <td className="p-3">100 sq ft</td>
                    <td className="p-3">4 inches</td>
                    <td className="p-3">33.33 cu ft</td>
                    <td className="p-3 text-emerald-400 font-bold">1.36 yd³</td>
                    <td className="p-3 text-sky-400">62 Bags</td>
                    <td className="p-3">Standard garden storage shed foundation.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">12' × 12'</td>
                    <td className="p-3">144 sq ft</td>
                    <td className="p-3">4 inches</td>
                    <td className="p-3">48.00 cu ft</td>
                    <td className="p-3 text-emerald-400 font-bold">1.96 yd³</td>
                    <td className="p-3 text-sky-400">88 Bags</td>
                    <td className="p-3">Backyard BBQ patio, hot tub support platform.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">10' × 20'</td>
                    <td className="p-3">200 sq ft</td>
                    <td className="p-3">4 inches</td>
                    <td className="p-3">66.67 cu ft</td>
                    <td className="p-3 text-emerald-400 font-bold">2.72 yd³</td>
                    <td className="p-3 text-sky-400">123 Bags</td>
                    <td className="p-3">Single-car driveway approach, extended walkway.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">12' × 24'</td>
                    <td className="p-3">288 sq ft</td>
                    <td className="p-3">4 inches</td>
                    <td className="p-3">96.00 cu ft</td>
                    <td className="p-3 text-emerald-400 font-bold">3.91 yd³</td>
                    <td className="p-3 text-sky-400">176 Bags</td>
                    <td className="p-3">Single car detached garage floor, large patio.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">20' × 20'</td>
                    <td className="p-3">400 sq ft</td>
                    <td className="p-3">4 inches</td>
                    <td className="p-3">133.33 cu ft</td>
                    <td className="p-3 text-emerald-400 font-bold">5.43 yd³</td>
                    <td className="p-3 text-sky-400">245 Bags</td>
                    <td className="p-3">Two-car residential garage slab (pedestrian vehicles).</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">20' × 20'</td>
                    <td className="p-3">400 sq ft</td>
                    <td className="p-3">6 inches</td>
                    <td className="p-3">200.00 cu ft</td>
                    <td className="p-3 text-emerald-400 font-bold">8.15 yd³</td>
                    <td className="p-3 text-sky-400">367 Bags</td>
                    <td className="p-3">Heavy equipment workshop, commercial vehicle pad.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">24' × 24'</td>
                    <td className="p-3">576 sq ft</td>
                    <td className="p-3">4 inches</td>
                    <td className="p-3">192.00 cu ft</td>
                    <td className="p-3 text-emerald-400 font-bold">7.82 yd³</td>
                    <td className="p-3 text-sky-400">352 Bags</td>
                    <td className="p-3">Spacious double garage with workshop perimeter.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">24' × 36'</td>
                    <td className="p-3">864 sq ft</td>
                    <td className="p-3">4 inches</td>
                    <td className="p-3">288.00 cu ft</td>
                    <td className="p-3 text-emerald-400 font-bold">11.73 yd³</td>
                    <td className="p-3 text-sky-400">528 Bags</td>
                    <td className="p-3">Triple car garage foundation slab.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">30' × 40'</td>
                    <td className="p-3">1,200 sq ft</td>
                    <td className="p-3">6 inches</td>
                    <td className="p-3">600.00 cu ft</td>
                    <td className="p-3 text-emerald-400 font-bold">24.44 yd³</td>
                    <td className="p-3 text-sky-400">1,100 Bags</td>
                    <td className="p-3">Commercial agricultural barn or industrial building.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Step-by-Step Numerical Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-emerald-400 text-base">Case Study 1: Backyard Outdoor Dining Patio Slab</h4>
                <p><strong>Dimensions:</strong> 20 feet long × 15 feet wide × 4 inches thick</p>
                <p><strong>Thickness in Feet:</strong> 4 inches / 12 = 0.3333 ft</p>
                <p><strong>Net Cubic Feet:</strong> 20 × 15 × 0.3333 = 100 cu ft</p>
                <p><strong>Net Cubic Yards:</strong> 100 / 27 = 3.70 yd³</p>
                <p><strong>Adding 10% Waste Buffer:</strong> 3.70 × 1.10 = 4.07 yd³ (Round order to 4.25 yd³)</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-emerald-300 font-semibold">Recommended Transit Ready-Mix Order: 4.25 Cubic Yards</p>
                  <p className="text-sky-300 font-semibold">If Using 80lb Bags: 184 Bags</p>
                  <p className="text-slate-300 text-xs mt-1">Decision: Ready-mix truck delivery is strongly recommended over mixing 184 bags manually.</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-sky-400 text-base">Case Study 2: Elevated Deck Pier Footings (Sonotubes)</h4>
                <p><strong>Project:</strong> 6 round cylindrical footings below the regional frost line</p>
                <p><strong>Dimensions:</strong> 12-inch diameter × 4-foot depth each</p>
                <p><strong>Radius in Feet:</strong> (12 / 2) / 12 = 0.50 ft</p>
                <p><strong>Volume per Column:</strong> π × (0.50)² × 4 = 3.1416 cu ft</p>
                <p><strong>Total for 6 Columns:</strong> 3.1416 × 6 = 18.85 cu ft</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-emerald-300 font-semibold">Net Cubic Yards: 18.85 / 27 = 0.70 yd³</p>
                  <p className="text-sky-300 font-semibold">80lb Bags (+10% margin): (18.85 × 1.10) / 0.60 = 35 Bags</p>
                  <p className="text-slate-300 text-xs mt-1">Decision: A portable electric drum mixer with 35 bags of 80lb mix is cost-effective and avoids truck short-load fees.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Concrete Curing Kinetics & Compressive Strength Development</h3>
            <p className="leading-relaxed mb-4 text-sm">
              Concrete does not harden through drying; it solidifies via an exothermic chemical crystallization reaction termed <strong>hydration</strong> between Portland cement silicates and water molecules. Understanding hydration kinetics is vital for structural integrity:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">Initial Set (24–48 Hours)</p>
                <p className="text-xs text-slate-300">
                  Concrete reaches sufficient early hardness to support cautious foot traffic and permit formwork removal. Surface must be protected from rapid moisture loss.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">7-Day Benchmark (~70% Strength)</p>
                <p className="text-xs text-slate-300">
                  Hydration achieves roughly 65% to 70% of design compressive strength (e.g., 2,500 PSI on a 4,000 PSI mix). Slabs can now support passenger vehicles.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">28-Day Full Design Strength (100%)</p>
                <p className="text-xs text-slate-300">
                  The standard civil engineering benchmark for full specified compressive design strength (e.g., 3,500 to 5,000 PSI), concluding the formal curing cycle.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">5 Critical Concrete Pouring Mistakes to Avoid</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed text-slate-300">
              <li>
                <strong>Skipping Subgrade Compaction:</strong> Pouring concrete over uncompacted, loose fill soil guarantees differential settling and severe diagonal cracking within the first 12 months. Always mechanically tamp and place a 4-inch compacted crushed gravel base.
              </li>
              <li>
                <strong>Adding Excessive Water for Workability:</strong> Watering down ready-mix to make raking easier dilutes the cement paste, dramatically reduces compressive PSI strength, and generates widespread surface crazing and dusting. Use plasticizer admixtures instead.
              </li>
              <li>
                <strong>Neglecting Control Joints:</strong> Concrete naturally shrinks as excess water evaporates during hydration. Cutting control joints at a depth of 1/4 the slab thickness every 8 to 10 feet forces drying cracks to occur neatly in hidden grooves.
              </li>
              <li>
                <strong>Letting the Slab Dry Out Too Fast:</strong> In hot, sunny, or windy weather, premature surface evaporation stalls hydration. Wet-curing with burlap or applying a chemical curing compound prevents spider-web plastic shrinkage cracking.
              </li>
              <li>
                <strong>Failing to Position Rebar in the Upper Half of Slabs:</strong> Laying steel reinforcement directly on the dirt where it gets walked into the mud provides zero structural tensile strength. Support rebar on concrete dobies or metal chairs 1.5 to 2 inches off the subgrade.
              </li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="Engineering Disclaimer: This concrete calculator is provided strictly for educational estimating purposes. Structural load-bearing foundations, seismic footings, and commercial civil engineering structures must be engineered and inspected in compliance with local municipal building codes and American Concrete Institute (ACI) specifications." />
      </div>
    </>
  );
};

export default ConcreteCalculator;

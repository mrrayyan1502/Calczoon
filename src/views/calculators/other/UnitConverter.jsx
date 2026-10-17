'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
import { Scale, Ruler, BookOpen, CheckCircle, HelpCircle, ArrowRight, Compass } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const lengthUnits = [
  { value: 'mm', label: 'Millimeters (mm)', ratio: 0.001 },
  { value: 'cm', label: 'Centimeters (cm)', ratio: 0.01 },
  { value: 'm', label: 'Meters (m)', ratio: 1.0 },
  { value: 'km', label: 'Kilometers (km)', ratio: 1000.0 },
  { value: 'in', label: 'Inches (in)', ratio: 0.0254 },
  { value: 'ft', label: 'Feet (ft)', ratio: 0.3048 },
  { value: 'yd', label: 'Yards (yd)', ratio: 0.9144 },
  { value: 'mi', label: 'Miles (mi)', ratio: 1609.344 },
];

const weightUnits = [
  { value: 'g', label: 'Grams (g)', ratio: 0.001 },
  { value: 'kg', label: 'Kilograms (kg)', ratio: 1.0 },
  { value: 'oz', label: 'Ounces (oz)', ratio: 0.028349523125 },
  { value: 'lb', label: 'Pounds (lb)', ratio: 0.45359237 },
  { value: 'st', label: 'Stone (st)', ratio: 6.35029318 },
];

const UnitConverter = () => {
  const [activeTab, setActiveTab] = useState('length');
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [result, setResult] = useState(null);

  const [fromWeightUnit, setFromWeightUnit] = useState('kg');
  const [toWeightUnit, setToWeightUnit] = useState('lb');
  const [weightInputValue, setWeightInputValue] = useState('');
  const [weightResult, setWeightResult] = useState(null);

  const handleLengthConvert = (e) => {
    e.preventDefault();
    const val = parseFloat(inputValue);
    if (isNaN(val)) return;

    const fromObj = lengthUnits.find(u => u.value === fromUnit);
    const toObj = lengthUnits.find(u => u.value === toUnit);

    if (!fromObj || !toObj) return;

    // Convert to base unit (meters) then to target unit
    const baseValue = val * fromObj.ratio;
    const converted = baseValue / toObj.ratio;

    const formattedResult = converted < 0.001 ? converted.toExponential(4) : converted.toLocaleString(undefined, { maximumFractionDigits: 4 });
    setResult(formattedResult);

    saveCalculation({
      type: 'Length Conversion',
      inputs: { value: val, from: fromObj.label, to: toObj.label },
      result: { Converted: `${formattedResult} ${toUnit}` }
    });
  };

  const handleWeightConvert = (e) => {
    e.preventDefault();
    const val = parseFloat(weightInputValue);
    if (isNaN(val)) return;

    const fromObj = weightUnits.find(u => u.value === fromWeightUnit);
    const toObj = weightUnits.find(u => u.value === toWeightUnit);

    if (!fromObj || !toObj) return;

    // Convert to base unit (kg) then to target unit
    const baseValue = val * fromObj.ratio;
    const converted = baseValue / toObj.ratio;

    const formattedResult = converted < 0.001 ? converted.toExponential(4) : converted.toLocaleString(undefined, { maximumFractionDigits: 4 });
    setWeightResult(formattedResult);

    saveCalculation({
      type: 'Weight Conversion',
      inputs: { value: val, from: fromObj.label, to: toObj.label },
      result: { Converted: `${formattedResult} ${toWeightUnit}` }
    });
  };

  const pageTitle = "Free Unit Converter: Length & Weight Measurement Tool 2026";
  const pageDescription = "Convert length and weight measurements with high precision. Convert meters to feet, kilograms to pounds, inches to cm, stones, and miles.";

  const faqItems = [
    {
      question: "How do you convert kilograms to pounds accurately?",
      answer: "To convert kilograms to pounds, multiply the kilogram mass by 2.2046226218 (or divide by the exact international constant 0.45359237). For example, 70 kg converts to: 70 * 2.20462 = 154.32 lbs. To convert pounds to kilograms, multiply the pound value by 0.45359237."
    },
    {
      question: "Why is one inch defined as exactly 2.54 centimeters?",
      answer: "Under the 1959 International Yard and Pound Agreement signed by the United States, United Kingdom, Canada, Australia, New Zealand, and South Africa, the international yard was standardized to exactly 0.9144 meters. Because an international yard comprises exactly 36 inches, one inch was officially fixed to: 0.9144 / 36 = 0.0254 meters (exactly 2.54 cm)."
    },
    {
      question: "What is the difference between standard avoirdupois ounces and precious metal troy ounces?",
      answer: "Everyday grocery and postal items use the avoirdupois system, where 1 pound equals 16 ounces (1 oz ≈ 28.3495 grams). In contrast, precious metals (gold, silver, platinum) are weighed in troy ounces, where 1 troy ounce equals exactly 31.1034768 grams (approximately 9.7% heavier than an avoirdupois ounce)."
    },
    {
      question: "What is a British stone and how does it convert to pounds and kilograms?",
      answer: "The stone (st) is an imperial unit of mass widely used in the United Kingdom and Ireland for human bodyweight. Exactly 1 stone equals 14 avoirdupois pounds, which translates to 6.35029318 kilograms. A person weighing 11 stone 4 pounds weighs 158 lbs or approximately 71.67 kg."
    },
    {
      question: "How does the base-unit conversion method eliminate multi-unit rounding errors?",
      answer: "Rather than maintaining separate cross-conversion formulas for every pair of units (which would require N*(N-1) equations), our engine normalizes any input to the standard SI base unit (meters for length, kilograms for weight) before converting to the destination unit. This guarantees consistency across all conversions."
    },
    {
      question: "Can I use this unit converter offline or on mobile devices?",
      answer: "Yes! All mathematical conversions are executed client-side directly in your web browser. Once loaded, the converter runs with zero network lag and never sends your proprietary dimensions or weights across external servers."
    }
  ];

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Unit Converter",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "url": "https://calczoon.com/lifestyle/unit-converter",
    "description": "High-precision unit conversion calculator for metric and imperial length, height, distance, weight, and mass."
  };

  const faqSchema = {
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
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="/lifestyle/unit-converter"
        schema={[appSchema, faqSchema]}
      />

      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={Ruler} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white">Convert Physical Units</CardTitle>
                <CardDescription>Select unit type and convert between metric and imperial dimensions</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-slate-900/50 p-1 rounded-xl">
                    <TabsTrigger value="length" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white flex items-center gap-2">
                      <Ruler className="w-4 h-4" /> Length & Distance
                    </TabsTrigger>
                    <TabsTrigger value="weight" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white flex items-center gap-2">
                      <Scale className="w-4 h-4" /> Weight & Mass
                    </TabsTrigger>
                  </TabsList>

                  {/* Length Tab */}
                  <TabsContent value="length" className="pt-6">
                    <form onSubmit={handleLengthConvert} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="lengthInput" className="text-slate-300 font-medium">Value to Convert</Label>
                        <Input
                          id="lengthInput"
                          type="number"
                          step="any"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="e.g., 10"
                          required
                          className="bg-slate-900 border-slate-700 text-white rounded-xl text-lg focus:ring-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fromLength" className="text-slate-300 font-medium">Convert From</Label>
                          <select
                            id="fromLength"
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            {lengthUnits.map((u) => (
                              <option key={u.value} value={u.value}>{u.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="toLength" className="text-slate-300 font-medium">Convert To</Label>
                          <select
                            id="toLength"
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            {lengthUnits.map((u) => (
                              <option key={u.value} value={u.value}>{u.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                      >
                        Convert Length
                      </Button>
                    </form>

                    {result !== null && (
                      <div className="mt-6 p-6 bg-slate-900/60 rounded-2xl border border-slate-800 text-center space-y-2">
                        <h3 className="text-sm font-semibold text-slate-400">Length Conversion Result:</h3>
                        <p className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                          {inputValue} {fromUnit} = {result} {toUnit}
                        </p>
                        <div className="pt-2">
                          <ShareResults
                            title="Length Conversion"
                            text={`Converted length on CalcZoon! ${inputValue} ${fromUnit} = ${result} ${toUnit}. Convert units online:`}
                            url="/lifestyle/unit-converter"
                          />
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* Weight Tab */}
                  <TabsContent value="weight" className="pt-6">
                    <form onSubmit={handleWeightConvert} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="weightInput" className="text-slate-300 font-medium">Value to Convert</Label>
                        <Input
                          id="weightInput"
                          type="number"
                          step="any"
                          value={weightInputValue}
                          onChange={(e) => setWeightInputValue(e.target.value)}
                          placeholder="e.g., 70"
                          required
                          className="bg-slate-900 border-slate-700 text-white rounded-xl text-lg focus:ring-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fromWeight" className="text-slate-300 font-medium">Convert From</Label>
                          <select
                            id="fromWeight"
                            value={fromWeightUnit}
                            onChange={(e) => setFromWeightUnit(e.target.value)}
                            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            {weightUnits.map((u) => (
                              <option key={u.value} value={u.value}>{u.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="toWeight" className="text-slate-300 font-medium">Convert To</Label>
                          <select
                            id="toWeight"
                            value={toWeightUnit}
                            onChange={(e) => setToWeightUnit(e.target.value)}
                            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            {weightUnits.map((u) => (
                              <option key={u.value} value={u.value}>{u.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                      >
                        Convert Weight
                      </Button>
                    </form>

                    {weightResult !== null && (
                      <div className="mt-6 p-6 bg-slate-900/60 rounded-2xl border border-slate-800 text-center space-y-2">
                        <h3 className="text-sm font-semibold text-slate-400">Weight Conversion Result:</h3>
                        <p className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                          {weightInputValue} {fromWeightUnit} = {weightResult} {toWeightUnit}
                        </p>
                        <div className="pt-2">
                          <ShareResults
                            title="Weight Conversion"
                            text={`Converted weight on CalcZoon! ${weightInputValue} ${fromWeightUnit} = ${weightResult} ${toWeightUnit}. Try it free:`}
                            url="/lifestyle/unit-converter"
                          />
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>

                <div className="w-full p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 flex items-start gap-3 text-left mt-6">
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-emerald-400 block mb-1">Recommended STEM Resource: Standardized Measurement Calibration</strong>
                    When working across global engineering blueprints or international clinical data, always employ exact NIST/BIPM defined conversion constants to eliminate compounding rounding errors.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" /> Quick Conversion Sheet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <div>
                  <h4 className="font-semibold text-white mb-1">Length Equivalents</h4>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                    <li>1 Inch = 2.54 Centimeters (exact)</li>
                    <li>1 Foot = 0.3048 Meters (exact)</li>
                    <li>1 Meter ≈ 3.28084 Feet</li>
                    <li>1 Mile ≈ 1.60934 Kilometers</li>
                  </ul>
                </div>
                <div className="border-t border-slate-700/60 pt-3">
                  <h4 className="font-semibold text-white mb-1">Weight Equivalents</h4>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                    <li>1 Kilogram ≈ 2.20462 Pounds</li>
                    <li>1 Pound = 0.45359237 kg (exact)</li>
                    <li>1 Stone = 14 Pounds (6.35029 kg)</li>
                    <li>1 Ounce ≈ 28.3495 Grams</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            <RelatedTools category="lifestyle" />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,200 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10 mb-12">
          {/* Section 1: What is a Unit Converter */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Compass className="text-emerald-400 w-7 h-7" /> What is a Unit Converter & The Dual Systems of Measurement
            </h2>
            <p className="text-base md:text-lg">
              A <strong>unit converter</strong> is a metrological computational utility designed to translate numerical expressions of physical quantities between disparate measurement systems without loss of physical integrity. The modern world relies primarily on two major measurement frameworks: the <strong>International System of Units (SI)</strong>, commonly referred to as the metric system, and the <strong>Imperial / United States Customary System</strong>.
            </p>
            <p>
              While nearly every nation and international scientific body conducts research and trade in SI base units (meters, kilograms, seconds), the United States, along with aspects of British and Canadian consumer culture, remains deeply invested in customary units (inches, feet, pounds, ounces, and stone). Converting between these standards is not merely a convenience for international travelers—it is a critical requirement in civil engineering, pharmaceutical dosing, global aviation, athletics, and international trade.
            </p>
          </div>

          {/* Section 2: Mathematical Conversion Ratios & Normalization Architecture */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Mathematical Conversion Ratios & Base-Unit Normalization
            </h2>
            <p>
              Our conversion architecture utilizes a <strong>base-unit normalization pipeline</strong>. Any input is first reduced to its fundamental SI base quantity (meters for length, kilograms for mass) through multiplication by its defined ratio, and then divided by the destination unit&apos;s ratio:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4 font-mono text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-800/40 space-y-2">
                <p className="text-emerald-400 font-bold uppercase tracking-wider">Length Base Normalization (SI Meter)</p>
                <p className="text-white text-sm font-semibold">Value_m = Value_input × Ratio_from</p>
                <p className="text-slate-400">Target Value = Value_m ÷ Ratio_to. Guaranteed identical across all metric and imperial pairs.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-sky-800/40 space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider">Weight Base Normalization (SI Kilogram)</p>
                <p className="text-white text-sm font-semibold">Value_kg = Value_input × Ratio_from</p>
                <p className="text-slate-400">Target Value = Value_kg ÷ Ratio_to. Exact constants: 1 lb = 0.45359237 kg; 1 st = 14 lb.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-800/40 space-y-2">
                <p className="text-amber-400 font-bold uppercase tracking-wider">The 1959 International Yard Standard</p>
                <p className="text-white text-sm font-semibold">1 yard = 0.9144 m (exact) ⇒ 1 in = 25.4 mm (exact)</p>
                <p className="text-slate-400">Legally unified the British and American definitions of inches and feet worldwide.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-purple-800/40 space-y-2">
                <p className="text-purple-400 font-bold uppercase tracking-wider">Modern SI Quantum Base Definitions</p>
                <p className="text-white text-sm font-semibold">c = 299,792,458 m/s | h = 6.62607015×10⁻³⁴ kg·m²/s</p>
                <p className="text-slate-400">Meters and kilograms are tied directly to universal physical constants, not physical prototypes.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Step-by-Step Practical Usage Guide */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Step-by-Step Guide: How to Perform High-Precision Unit Conversions
            </h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-white">Select Measurement Category:</strong> Click the tab corresponding to your physical dimension—choose <em>Length & Distance</em> for blueprints and heights, or <em>Weight & Mass</em> for freight and bodyweight.
              </li>
              <li>
                <strong className="text-white">Enter the Numerical Value:</strong> Type the magnitude you wish to translate into the input field. The engine natively accepts integers, decimals, and fractional values.
              </li>
              <li>
                <strong className="text-white">Select Origin and Target Units:</strong> Choose your source unit from the &quot;Convert From&quot; dropdown and desired destination from the &quot;Convert To&quot; menu.
              </li>
              <li>
                <strong className="text-white">Execute Conversion & Verify Precision:</strong> Click the Convert button. The system formats answers with up to four decimal places, automatically invoking scientific notation for microscopic values.
              </li>
            </ol>
          </div>

          {/* Section 4: Real-World Numerical Worked Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Real-World Numerical Worked Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg">
                  <CheckCircle className="w-5 h-5" /> Example 1: Architectural Beam Height Conversion
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> An American structural engineering drawing specifies an I-beam height of 8 feet 6 inches (8.5 feet). A European manufacturing fabricator requires the dimension in metric millimeters.
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Total Feet: 8.5 ft</p>
                  <p>2. Normalization to Meters: 8.5 × 0.3048 = 2.5908 m</p>
                  <p>3. Convert to Millimeters: 2.5908 × 1,000</p>
                  <p className="text-emerald-400 font-bold">Fabrication Height: 2,590.8 mm (or 259.08 cm)</p>
                </div>
                <p className="text-xs text-slate-400">
                  Exact conversion prevents costly machining errors during cross-border fabrication.
                </p>
              </div>

              <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-lg">
                  <Scale className="w-5 h-5" /> Example 2: Medical Patient Body Mass Conversion
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> A clinical patient in an international hospital states their bodyweight as 12 stone 4 pounds (172 lbs). The medical team needs kilograms for weight-based medication dosing.
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Total Pounds: (12 st × 14) + 4 lb = 172 lbs</p>
                  <p>2. Exact Constant: 1 lb = 0.45359237 kg</p>
                  <p>3. Multiplication: 172 × 0.45359237 = 78.017887 kg</p>
                  <p className="text-sky-400 font-bold">Clinical Dosing Mass: 78.02 kg (Rounded)</p>
                </div>
                <p className="text-xs text-slate-400">
                  Weight-based intravenous pharmacological dosages require rigorous metric mass accuracy.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Common Calculation Mistakes & Pitfalls */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Common Calculation Mistakes & Pitfalls to Avoid
            </h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-amber-500 space-y-1">
                <p className="font-bold text-white">1. The Historic Mars Climate Orbiter Disaster ($327 Million Error)</p>
                <p>
                  In September 1999, NASA lost the Mars Climate Orbiter spacecraft due to a unit conversion failure. The flight navigation software expected impulse thruster data in metric Newton-seconds ($N\cdot s$), but subcontractor Lockheed Martin transmitted data in imperial pound-force seconds ($lbf\cdot s$). The resulting trajectory discrepancy caused the spacecraft to disintegrate in the Martian atmosphere.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-rose-500 space-y-1">
                <p className="font-bold text-white">2. Conflating Metric Tonnes with US Short Tons and UK Long Tons</p>
                <p>
                  A metric tonne ($t$) is exactly 1,000 kg (2,204.6 lbs). A US short ton is exactly 2,000 lbs (907.18 kg). A British imperial long ton is 2,240 lbs (1,016.05 kg). Confusing these three distinct ton definitions causes severe shipping freight and logistics errors.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-sky-500 space-y-1">
                <p className="font-bold text-white">3. Conflating Mass with Weight in Physics</p>
                <p>
                  In everyday speech, weight and mass are used synonymously. However, in scientific calculations, mass (measured in kilograms) is an invariant property of matter, while weight (measured in Newtons or pound-force) represents gravitational force ($W = m \cdot g$) and varies with local gravity.
                </p>
              </div>
            </div>
          </div>

          {/* Static HTML Reference Benchmark Table */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Metric to Imperial Standard Conversion Constants Reference Table</h2>
            <p className="text-sm text-slate-400">
              The benchmark metrology table below catalogs official international conversion factors between metric (SI) and US customary / imperial measurement units as codified by NIST and BIPM.
            </p>
            <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-slate-950">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                    <th className="p-3 font-semibold">Physical Dimension</th>
                    <th className="p-3 font-semibold text-emerald-400">Metric (SI) Unit</th>
                    <th className="p-3 font-semibold text-sky-400">Imperial Equivalent</th>
                    <th className="p-3 font-semibold text-amber-400">Exact Conversion Factor</th>
                    <th className="p-3 font-semibold">Primary Engineering Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Length / Distance</td><td className="p-3 font-mono text-emerald-400">1 Millimeter (mm)</td><td className="p-3 font-mono text-sky-400">0.039370 Inches</td><td className="p-3 font-mono text-amber-400">1 in = 25.4 mm (Exact)</td><td className="p-3">Mechanical CNC Machining &amp; PCB Design</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Length / Distance</td><td className="p-3 font-mono text-emerald-400">1 Centimeter (cm)</td><td className="p-3 font-mono text-sky-400">0.393701 Inches</td><td className="p-3 font-mono text-amber-400">1 in = 2.54 cm (Exact)</td><td className="p-3">Consumer Electronics &amp; Textile Dimensions</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Length / Distance</td><td className="p-3 font-mono text-emerald-400">1 Meter (m)</td><td className="p-3 font-mono text-sky-400">3.280840 Feet</td><td className="p-3 font-mono text-amber-400">1 ft = 0.3048 m (Exact)</td><td className="p-3">Architectural CAD Blueprints &amp; Track Athletics</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Length / Distance</td><td className="p-3 font-mono text-emerald-400">1 Kilometer (km)</td><td className="p-3 font-mono text-sky-400">0.621371 Miles</td><td className="p-3 font-mono text-amber-400">1 mi = 1,609.344 m (Exact)</td><td className="p-3">Civil Highway Engineering &amp; Aviation Routes</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Mass / Weight</td><td className="p-3 font-mono text-emerald-400">1 Gram (g)</td><td className="p-3 font-mono text-sky-400">0.035274 Ounces</td><td className="p-3 font-mono text-amber-400">1 oz ≈ 28.349523 g</td><td className="p-3">Pharmacological Compounding &amp; Food Recipes</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Mass / Weight</td><td className="p-3 font-mono text-emerald-400">1 Kilogram (kg)</td><td className="p-3 font-mono text-sky-400">2.204623 Pounds</td><td className="p-3 font-mono text-amber-400">1 lb = 0.45359237 kg (Exact)</td><td className="p-3">Clinical Patient Weigh-ins &amp; Fitness Dosing</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Mass / Weight</td><td className="p-3 font-mono text-emerald-400">1 Metric Tonne (t)</td><td className="p-3 font-mono text-sky-400">2,204.62 Pounds</td><td className="p-3 font-mono text-amber-400">1 t = 1,000 kg (Exact)</td><td className="p-3">Intermodal Maritime Shipping &amp; Bulk Freight</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Liquid Volume</td><td className="p-3 font-mono text-emerald-400">1 Liter (L)</td><td className="p-3 font-mono text-sky-400">0.264172 US Gallons</td><td className="p-3 font-mono text-amber-400">1 US gal = 3.785411784 L</td><td className="p-3">Automotive Fuel Capacity &amp; Chemical Vats</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Liquid Volume</td><td className="p-3 font-mono text-emerald-400">1 Milliliter (mL)</td><td className="p-3 font-mono text-sky-400">0.033814 US Fl Oz</td><td className="p-3 font-mono text-amber-400">1 fl oz ≈ 29.57353 mL</td><td className="p-3">Pediatric Oral Dosing &amp; Laboratory Pipettes</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Linear Velocity</td><td className="p-3 font-mono text-emerald-400">100 km/h</td><td className="p-3 font-mono text-sky-400">62.1371 mph</td><td className="p-3 font-mono text-amber-400">1 mph = 1.609344 km/h</td><td className="p-3">Automotive Speedometers &amp; Telematics Data</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 6: In-Depth FAQ Component */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <HelpCircle className="text-sky-400 w-7 h-7" /> Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-sm">
              Explore thorough answers to unit conversion questions, international standards, and measurement history.
            </p>
          </div>

          <Faq items={faqItems} className="mt-4" />

          {/* Section 7: Academic References & Companion Tools */}
          <div className="space-y-4 pt-6 border-t border-slate-700/60">
            <h3 className="text-xl font-bold text-white">Metrological Standards, References & Companion Tools</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unit definitions and conversion ratios adhere to standards established by the <strong>Bureau International des Poids et Mesures (BIPM)</strong> and the <em>National Institute of Standards and Technology (NIST) Special Publication 811</em> (Guide for the Use of the International System of Units).
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/lifestyle/fuel-cost-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Fuel Cost & MPG Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/health/bmi-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                BMI Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/math/percentage-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Percentage Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/lifestyle/discount-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Discount Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <Disclaimer text="While this unit converter operates with exact international metrological constants, always verify calculations for safety-critical aerospace engineering, structural load bearing, or pharmacological medical dosing." />
      </div>
    </>
  );
};

export default UnitConverter;

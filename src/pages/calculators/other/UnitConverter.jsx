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
import RelatedTools from '@/components/calculators/tdee/RelatedTools';
import { Scale, Ruler } from 'lucide-react';
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

  const pageTitle = "Free Unit Converter: Convert Length & Weight Online 2026";
  const pageDescription = "Convert weight and length units instantly with our free online Unit Converter. Accurate conversions for kg, lbs, meters, feet, inches, and more.";

  const faqItems = [
    { question: "How do I convert kilograms to pounds?", answer: "To convert kilograms to pounds, multiply the weight value by 2.20462. For example, 10 kg converted to pounds is 10 * 2.20462 = 22.0462 lbs. Our weight converter handles this automatically." },
    { question: "How many centimeters are in an inch?", answer: "There are exactly 2.54 centimeters in one inch. To convert inches to centimeters, multiply the number of inches by 2.54." },
    { question: "Is this unit converter free and accurate?", answer: "Yes! Our online Unit Converter is 100% free to use. We use exact standard conversion factors (e.g., 0.45359237 kg per pound and 0.0254 meters per inch) to guarantee complete mathematical accuracy." },
    { question: "Can I use this tool offline?", answer: "Once the website is loaded in your browser, the unit conversion logic runs client-side (locally on your device). This means it works extremely fast and maintains privacy by never sending your numbers to our servers." }
  ];

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CalcZoon Unit Converter",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
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
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6 shadow-lg">
            {activeTab === 'length' ? <Ruler className="w-8 h-8 text-white" /> : <Scale className="w-8 h-8 text-white" />}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
            {pageTitle}
          </h1>
          <p className="text-lg text-slate-300 max-w-4xl mx-auto">
            {pageDescription}
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white">Convert Measurement Units</CardTitle>
                <CardDescription>Select conversion type and enter your values</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); setResult(null); setWeightResult(null); }} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-slate-900/50 p-1 rounded-xl">
                    <TabsTrigger value="length" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                      <Ruler className="w-4 h-4 mr-2" /> Length Converter
                    </TabsTrigger>
                    <TabsTrigger value="weight" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                      <Scale className="w-4 h-4 mr-2" /> Weight Converter
                    </TabsTrigger>
                  </TabsList>

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
                          placeholder="e.g. 100"
                          required
                          className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fromUnit" className="text-slate-300 font-medium">From Unit</Label>
                          <select
                            id="fromUnit"
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="w-full p-3 bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-white outline-none"
                          >
                            {lengthUnits.map(unit => (
                              <option key={unit.value} value={unit.value}>{unit.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="toUnit" className="text-slate-300 font-medium">To Unit</Label>
                          <select
                            id="toUnit"
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="w-full p-3 bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-white outline-none"
                          >
                            {lengthUnits.map(unit => (
                              <option key={unit.value} value={unit.value}>{unit.label}</option>
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

                    {result && (
                      <div className="mt-8 p-6 bg-slate-800/30 border-t border-slate-700/40 rounded-b-2xl text-center space-y-4">
                        <h3 className="text-lg font-bold text-slate-300">Conversion Result:</h3>
                        <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                          {inputValue} {fromUnit} = {result} {toUnit}
                        </p>
                        <div className="pt-2 w-full">
                          <ShareResults
                            title="Length Conversion"
                            text={`Converted length on CalcZoon! ${inputValue} ${fromUnit} is equal to ${result} ${toUnit}. Convert weight and length online for free:`}
                            url="/lifestyle/unit-converter"
                          />
                        </div>
                      </div>
                    )}
                  </TabsContent>

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
                          placeholder="e.g. 70"
                          required
                          className="bg-slate-900 border-slate-700 focus:ring-emerald-500 focus:border-emerald-500 text-white rounded-xl"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fromWeightUnit" className="text-slate-300 font-medium">From Unit</Label>
                          <select
                            id="fromWeightUnit"
                            value={fromWeightUnit}
                            onChange={(e) => setFromWeightUnit(e.target.value)}
                            className="w-full p-3 bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-white outline-none"
                          >
                            {weightUnits.map(unit => (
                              <option key={unit.value} value={unit.value}>{unit.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="toWeightUnit" className="text-slate-300 font-medium">To Unit</Label>
                          <select
                            id="toWeightUnit"
                            value={toWeightUnit}
                            onChange={(e) => setToWeightUnit(e.target.value)}
                            className="w-full p-3 bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-white outline-none"
                          >
                            {weightUnits.map(unit => (
                              <option key={unit.value} value={unit.value}>{unit.label}</option>
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

                    {weightResult && (
                      <div className="mt-8 p-6 bg-slate-800/30 border-t border-slate-700/40 rounded-b-2xl text-center space-y-4">
                        <h3 className="text-lg font-bold text-slate-300">Conversion Result:</h3>
                        <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                          {weightInputValue} {fromWeightUnit} = {weightResult} {toWeightUnit}
                        </p>
                        <div className="pt-2 w-full">
                          <ShareResults
                            title="Weight Conversion"
                            text={`Converted weight on CalcZoon! ${weightInputValue} ${fromWeightUnit} is equal to ${weightResult} ${toWeightUnit}. Try this easy converter:`}
                            url="/lifestyle/unit-converter"
                          />
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white">Quick Conversion Ratios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <div>
                  <h4 className="font-semibold text-white mb-1">Common Length Conversions</h4>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                    <li>1 Inch = 2.54 Centimeters (cm)</li>
                    <li>1 Meter = 3.28084 Feet (ft)</li>
                    <li>1 Mile = 1.60934 Kilometers (km)</li>
                  </ul>
                </div>
                <div className="border-t border-slate-800 pt-4">
                  <h4 className="font-semibold text-white mb-1">Common Weight Conversions</h4>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                    <li>1 Kilogram = 2.20462 Pounds (lbs)</li>
                    <li>1 Pound = 16 Ounces (oz)</li>
                    <li>1 Stone = 14 Pounds (lbs)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            <RelatedTools category="lifestyle" />
          </aside>
        </div>

        {/* Detailed SEO Explanation Section */}
        <section className="mt-16 bg-slate-800/20 rounded-2xl border border-slate-700/40 p-8 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">What is a Unit Converter?</h2>
            <p>
              A **Unit Converter** is a tool that allows you to easily switch between different units of measurement for physical quantities such as weight, length, volume, speed, and temperature. Whether you're working on scientific calculations, building structures, managing recipes, or planning travel, conversions are necessary to standardise your numbers.
            </p>
            <p>
              This online unit converter tool specializes in length and weight conversions. It provides high-speed conversions utilizing precise scientific values to bridge metric and imperial unit differences instantly.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">How to Use the Weight & Length Converter</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Select the conversion type:</strong> Choose between the length tab or weight tab using the headers inside the tool.
              </li>
              <li>
                <strong>Input the value:</strong> Type the number you wish to convert in the "Value to Convert" input field.
              </li>
              <li>
                <strong>Choose origin and target units:</strong> Select the unit you are converting from and the unit you wish to convert to from the dropdown menus.
              </li>
              <li>
                <strong>Convert:</strong> Press the convert button to instantly view the calculated result. You can share your result or verify your calculation in the Recent History tab.
              </li>
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Mathematical Conversion Formulas Used</h2>
            <p>
              Our unit converter performs calculations using standard scientific conversion factors. It converts the input unit to a base unit (meters for length, kilograms for weight) before converting it to the final unit.
            </p>
            
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4 font-mono text-emerald-400">
              <p>Length Base Formula: Base (meters) = Value × Factor_From</p>
              <p>Length Target Formula: Converted = Base (meters) ÷ Factor_To</p>
              <p>Weight Base Formula: Base (kg) = Value × Factor_From</p>
              <p>Weight Target Formula: Converted = Base (kg) ÷ Factor_To</p>
            </div>

            <h3 className="text-lg font-bold text-white mt-4">Length Conversion Factors (Meters per Unit):</h3>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-300 pl-4 list-disc">
              <li>Centimeter: 0.01 m</li>
              <li>Millimeter: 0.001 m</li>
              <li>Kilometer: 1,000 m</li>
              <li>Inch: 0.0254 m</li>
              <li>Foot: 0.3048 m</li>
              <li>Yard: 0.9144 m</li>
              <li>Mile: 1,609.344 m</li>
            </ul>

            <h3 className="text-lg font-bold text-white mt-4">Weight Conversion Factors (Kilograms per Unit):</h3>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-300 pl-4 list-disc">
              <li>Gram: 0.001 kg</li>
              <li>Ounce: 0.0283495 kg</li>
              <li>Pound: 0.453592 kg</li>
              <li>Stone: 6.35029 kg</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Benefits of Using an Online Unit Converter</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Eliminates Manual Errors:</strong> Hand conversions are prone to math slips. Our tool uses precise, computer-verified equations.</li>
              <li><strong>Time Saving:</strong> Get instant metrics instead of digging through conversion tables.</li>
              <li><strong>Cross-Regional Utility:</strong> Easily translate US/UK imperial metrics to metric equivalents standard across the rest of the world.</li>
            </ul>
          </div>
        </section>

        <div className="max-w-5xl mx-auto mt-8">
          <Faq items={faqItems} />
          <Disclaimer text="While this converter uses exact standard constants, always double-check values for safety-critical building, medical, or engineering projects." />
        </div>
      </div>
    </>
  );
};

export default UnitConverter;

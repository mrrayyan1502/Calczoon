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
import { Superscript, Calculator, Sparkles, BookOpen, Binary, HelpCircle } from 'lucide-react';

const ExponentCalculator = () => {
  const [base, setBase] = useState('2');
  const [exponent, setExponent] = useState('5');
  const [result, setResult] = useState(null);

  const calculateExponent = (e) => {
    if (e) e.preventDefault();
    const b = parseFloat(base);
    const exp = parseFloat(exponent);

    if (isNaN(b) || isNaN(exp)) {
      setResult({ error: "Please enter valid numeric values for both base and exponent." });
      return;
    }

    if (b === 0 && exp <= 0) {
      setResult({ error: "Zero raised to a zero or negative power is mathematically indeterminate / undefined." });
      return;
    }

    if (b < 0 && !Number.isInteger(exp)) {
      // Negative base with fractional exponent resulting in complex/imaginary number
      setResult({ error: "Negative bases with non-integer exponents produce complex/imaginary numbers outside the real number domain." });
      return;
    }

    const power = Math.pow(b, exp);
    
    if (!isFinite(power)) {
      setResult({ error: "The calculated power exceeds floating-point arithmetic capacity (numerical overflow)." });
      return;
    }

    // Generate step-by-step expansion display if integer exponent
    let expansionText = '';
    if (Number.isInteger(exp) && exp > 0 && exp <= 10) {
      const factors = Array(exp).fill(b);
      expansionText = factors.join(' × ');
    } else if (exp === 0) {
      expansionText = 'Any non-zero base raised to the power of 0 equals 1';
    } else if (Number.isInteger(exp) && exp < 0 && Math.abs(exp) <= 6) {
      const posExp = Math.abs(exp);
      const factors = Array(posExp).fill(b).join(' × ');
      expansionText = `1 / (${b}^${posExp}) = 1 / (${factors})`;
    } else if (!Number.isInteger(exp)) {
      expansionText = `Fractional exponent represents the root operation: ${b}^(${exp})`;
    }

    // Format scientific notation
    let scientificDisplay = power.toExponential(4);
    let standardDisplay = power.toString();

    if (Math.abs(power) >= 1e12 || (Math.abs(power) < 1e-4 && power !== 0)) {
      standardDisplay = scientificDisplay;
    } else if (standardDisplay.includes('.') && standardDisplay.split('.')[1].length > 6) {
      standardDisplay = parseFloat(power.toFixed(6)).toString();
    }

    const newResult = {
      result: standardDisplay,
      scientific: scientificDisplay,
      base: b,
      exponent: exp,
      expansion: expansionText
    };

    setResult(newResult);
    saveCalculation({
      type: 'Exponent',
      inputs: { base: b, exponent: exp },
      result: { Value: standardDisplay }
    });
  };

  const faqItems = [
    {
      question: "What is an exponent and what does it represent mathematically?",
      answer: "An exponent (also termed power or index) indicates how many times a base number is multiplied by itself in repeated multiplication. In the expression bⁿ, 'b' is the base and 'n' is the exponent. For example, 3⁴ signifies 3 × 3 × 3 × 3 = 81."
    },
    {
      question: "How does the negative exponent rule work in algebra?",
      answer: "A negative exponent represents the multiplicative reciprocal (inverse) of the base raised to the positive power. The algebraic rule states: b⁻ⁿ = 1 / bⁿ. For example, 2⁻³ equals 1 / 2³ = 1 / 8 = 0.125."
    },
    {
      question: "Why does any non-zero number raised to the zero power equal one (b⁰ = 1)?",
      answer: "By the quotient rule of exponents, bⁿ / bⁿ = bⁿ⁻ⁿ = b⁰. Because any non-zero number divided by itself equals 1, it follows by mathematical consistency that b⁰ must equal 1."
    },
    {
      question: "What is a fractional (rational) exponent and how do you solve it?",
      answer: "A fractional exponent represents a radical root operation. The rule states: b^(m/n) = ⁿ√(bᵐ) = (ⁿ√b)ᵐ. The denominator 'n' defines the index of the radical root, and the numerator 'm' defines the power. For example, 27^(2/3) = (³√27)² = 3² = 9."
    },
    {
      question: "What is the difference between (-2)⁴ and -2⁴?",
      answer: "Order of operations (PEMDAS) strictly distinguishes between parentheses and negation. In (-2)⁴, the negative sign is part of the base being squared four times: (-2) × (-2) × (-2) × (-2) = +16. In -2⁴, exponentiation occurs first, followed by the unary negative: -(2 × 2 × 2 × 2) = -16."
    },
    {
      question: "What happens when you multiply two powers with the same base?",
      answer: "According to the Product Rule of Exponents: bᵐ × bⁿ = b^(m+n). When multiplying like bases, you simply add the exponents together. For example, 2³ × 2⁵ = 2^(3+5) = 2⁸ = 256."
    },
    {
      question: "How do exponents relate to logarithms in advanced mathematics?",
      answer: "Logarithms are the inverse operations of exponentiation. If bʸ = x, then the logarithm base b of x is equal to y (log_b(x) = y). While exponents calculate the power result, logarithms determine the exponent required to reach that result."
    }
  ];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Exponent & Powers Calculator",
    "description": "Calculate powers with positive, negative, fractional, and zero exponents. Includes step-by-step expansions and scientific notation.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/math/exponent-calculator",
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
        title="Exponent Calculator: Solve Powers, Negative & Fractional Indices"
        description="Free Exponent Calculator. Evaluate positive, negative, fractional, and decimal powers (x^n). Step-by-step expansion, scientific notation, and laws of exponents."
        canonicalUrl="/math/exponent-calculator"
        schema={[webAppSchema, faqPageSchema]}
        keywords={['exponent calculator', 'power calculator', 'negative exponent calculator', 'fractional exponents', 'laws of exponents']}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <PageHeader
          title="Exponent & Powers Calculator"
          description="Evaluate powers with integer, negative, zero, and rational fractional exponents. Features step-by-step expansion and scientific notation conversion."
          icon={Superscript}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-xl">Exponential Expression</CardTitle>
                <CardDescription className="text-slate-400">Enter base number (b) and exponent power (n) for bⁿ</CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={calculateExponent} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="base" className="text-slate-300 font-medium">Base Number (b)</Label>
                      <Input
                        id="base"
                        type="number"
                        step="any"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        placeholder="2"
                        required
                        className="bg-slate-950 border-slate-700 text-white text-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exponent" className="text-slate-300 font-medium">Exponent / Power (n)</Label>
                      <Input
                        id="exponent"
                        type="number"
                        step="any"
                        value={exponent}
                        onChange={(e) => setExponent(e.target.value)}
                        placeholder="5"
                        required
                        className="bg-slate-950 border-slate-700 text-white text-xl"
                      />
                    </div>
                  </div>

                  {/* Preset quick buttons */}
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400 font-medium">Common Power Presets:</p>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => { setBase('2'); setExponent('8'); }} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-md text-slate-300">
                        2⁸ (Byte)
                      </button>
                      <button type="button" onClick={() => { setBase('10'); setExponent('6'); }} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-md text-slate-300">
                        10⁶ (Million)
                      </button>
                      <button type="button" onClick={() => { setBase('5'); setExponent('-2'); }} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-md text-slate-300">
                        5⁻² (Negative)
                      </button>
                      <button type="button" onClick={() => { setBase('16'); setExponent('0.5'); }} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-md text-slate-300">
                        16^0.5 (Square Root)
                      </button>
                      <button type="button" onClick={() => { setBase('27'); setExponent('0.333333'); }} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-md text-slate-300">
                        27^(1/3) (Cube Root)
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 text-base">
                    Calculate Power (bⁿ)
                  </Button>
                </form>
              </CardContent>

              {result && !result.error && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-950/80 border-t border-slate-800 rounded-b-xl">
                  <div className="w-full space-y-5">
                    <div className="text-center py-5 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-slate-400 text-sm font-medium">
                        Mathematical Expression: <span className="font-mono text-emerald-400 font-bold">{result.base}^{result.exponent}</span>
                      </p>
                      <p className="text-4xl md:text-5xl font-extrabold text-emerald-400 my-2 font-mono">
                        {result.result}
                      </p>
                      {result.expansion && (
                        <p className="text-xs text-slate-400 mt-2 font-mono bg-slate-950 px-4 py-2 rounded-lg inline-block border border-slate-800">
                          {result.expansion}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                        <span className="text-slate-400">Scientific Notation:</span>
                        <span className="font-mono font-bold text-sky-400">{result.scientific}</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                        <span className="text-slate-400">Reciprocal (1 / Value):</span>
                        <span className="font-mono font-bold text-amber-400">
                          {(1 / parseFloat(result.result)).toExponential(4)}
                        </span>
                      </div>
                    </div>

                    {/* Monetization / Recommended Resource Box */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <p className="font-semibold text-emerald-300">Mastering Higher Mathematics & Calculus</p>
                        <p className="text-slate-300 leading-relaxed">
                          Exponential functions form the mathematical bedrock of compound interest modeling, nuclear half-life radioactive decay, and logarithmic decibel scales. For interactive calculus graphing and algebraic simplifications, pairing digital tools with computer algebra systems enhances conceptual mastery.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <ShareResults
                        title="Exponent Calculation"
                        text={`${result.base}^${result.exponent} = ${result.result} calculated on Calczoon!`}
                        url="/math/exponent-calculator"
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
            <RelatedTools category="math" />
          </aside>
        </div>

        {/* In-depth Educational & AEO Section */}
        <section className="mt-12 bg-slate-900/60 rounded-xl p-8 border border-slate-800 space-y-8 text-slate-300">
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Comprehensive Mathematical Guide to Exponents, Powers & Radical Roots</h2>
            <p className="leading-relaxed text-slate-300">
              Exponentiation is a fundamental mathematical operation involving two numbers: the <strong>base (b)</strong> and the <strong>exponent or power (n)</strong>, denoted symbolically as <em>bⁿ</em>. Introduced in modern notation by René Descartes in 1637, exponents allow mathematicians, engineers, and scientists to express astronomical physical quantities (such as the mass of the Sun: 1.989 × 10³⁰ kg) and subatomic dimensions (such as the radius of a proton: 8.4 × 10⁻¹⁶ m) in concise, computationally efficient formats.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">The Fundamental Laws of Exponents</h3>
            <p className="mb-4 leading-relaxed">
              Manipulating exponential expressions in algebra requires adhering strictly to six canonical laws of exponents:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">1. Product Rule: bᵐ × bⁿ = b^(m + n)</p>
                <p className="text-xs text-slate-400">
                  When multiplying two exponential terms with identical bases, retain the common base and add the exponents. Example: 3² × 3³ = 3^(2+3) = 3⁵ = 243.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">2. Quotient Rule: bᵐ / bⁿ = b^(m - n)</p>
                <p className="text-xs text-slate-400">
                  When dividing two terms with identical bases, retain the base and subtract the denominator exponent from the numerator exponent. Example: 5⁶ / 5² = 5^(6-2) = 5⁴ = 625.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">3. Power of a Power Rule: (bᵐ)ⁿ = b^(m × n)</p>
                <p className="text-xs text-slate-400">
                  When raising an exponential term to an additional outer power, multiply the indices together. Example: (2³)² = 2^(3×2) = 2⁶ = 64.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <p className="font-bold text-emerald-400 mb-1">4. Negative Exponent Rule: b⁻ⁿ = 1 / bⁿ</p>
                <p className="text-xs text-slate-400">
                  A negative exponent flips the base into its reciprocal with a positive exponent. Example: 4⁻² = 1 / 4² = 1 / 16 = 0.0625.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Laws of Exponents & Algebraic Rules Reference Table</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              The benchmark table below provides a comprehensive summary of algebraic exponential identities, formulas, and practical calculation examples:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-200">
                  <tr>
                    <th className="p-3">Rule Name</th>
                    <th className="p-3">Algebraic Identity</th>
                    <th className="p-3">Numerical Example</th>
                    <th className="p-3">Evaluation Process</th>
                    <th className="p-3">Final Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Product Rule</td>
                    <td className="p-3 font-mono text-emerald-400">aᵐ · aⁿ = a^(m+n)</td>
                    <td className="p-3 font-mono">2³ · 2⁴</td>
                    <td className="p-3">2^(3 + 4) = 2⁷</td>
                    <td className="p-3 text-emerald-400 font-bold">128</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Quotient Rule</td>
                    <td className="p-3 font-mono text-emerald-400">aᵐ / aⁿ = a^(m-n)</td>
                    <td className="p-3 font-mono">3⁵ / 3²</td>
                    <td className="p-3">3^(5 - 2) = 3³</td>
                    <td className="p-3 text-emerald-400 font-bold">27</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Power of a Power</td>
                    <td className="p-3 font-mono text-emerald-400">(aᵐ)ⁿ = a^(mn)</td>
                    <td className="p-3 font-mono">(4²)³</td>
                    <td className="p-3">4^(2 × 3) = 4⁶</td>
                    <td className="p-3 text-emerald-400 font-bold">4,096</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Power of a Product</td>
                    <td className="p-3 font-mono text-emerald-400">(ab)ⁿ = aⁿ · bⁿ</td>
                    <td className="p-3 font-mono">(2 · 3)³</td>
                    <td className="p-3">2³ · 3³ = 8 · 27</td>
                    <td className="p-3 text-emerald-400 font-bold">216</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Power of a Quotient</td>
                    <td className="p-3 font-mono text-emerald-400">(a / b)ⁿ = aⁿ / bⁿ</td>
                    <td className="p-3 font-mono">(3 / 2)³</td>
                    <td className="p-3">3³ / 2³ = 27 / 8</td>
                    <td className="p-3 text-emerald-400 font-bold">3.375</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Zero Exponent Rule</td>
                    <td className="p-3 font-mono text-emerald-400">a⁰ = 1 (a ≠ 0)</td>
                    <td className="p-3 font-mono">89⁰</td>
                    <td className="p-3">89¹ / 89¹ = 1</td>
                    <td className="p-3 text-emerald-400 font-bold">1</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Negative Exponent</td>
                    <td className="p-3 font-mono text-emerald-400">a⁻ⁿ = 1 / aⁿ</td>
                    <td className="p-3 font-mono">5⁻³</td>
                    <td className="p-3">1 / 5³ = 1 / 125</td>
                    <td className="p-3 text-emerald-400 font-bold">0.008</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Fractional Exponent (Root)</td>
                    <td className="p-3 font-mono text-emerald-400">a^(1/n) = ⁿ√a</td>
                    <td className="p-3 font-mono">81^(1/4)</td>
                    <td className="p-3">⁴√81 = 3</td>
                    <td className="p-3 text-emerald-400 font-bold">3</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">General Fractional Exponent</td>
                    <td className="p-3 font-mono text-emerald-400">a^(m/n) = (ⁿ√a)ᵐ</td>
                    <td className="p-3 font-mono">64^(2/3)</td>
                    <td className="p-3">(³√64)² = 4²</td>
                    <td className="p-3 text-emerald-400 font-bold">16</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3 font-semibold text-white">Negative Fractional Exponent</td>
                    <td className="p-3 font-mono text-emerald-400">a^(-m/n) = 1 / (ⁿ√a)ᵐ</td>
                    <td className="p-3 font-mono">32^(-3/5)</td>
                    <td className="p-3">1 / (⁵√32)³ = 1 / 2³</td>
                    <td className="p-3 text-emerald-400 font-bold">0.125</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Step-by-Step Numerical Case Studies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-emerald-400 text-base">Case Study 1: Solving Negative Fractional Exponent 16^(-3/4)</h4>
                <p><strong>Step 1 (Apply Negative Rule):</strong> Rewrite 16^(-3/4) as 1 / [16^(3/4)]</p>
                <p><strong>Step 2 (Deconstruct Fractional Exponent):</strong> 16^(3/4) = (⁴√16)³</p>
                <p><strong>Step 3 (Extract 4th Root):</strong> The 4th root of 16 is 2, because 2 × 2 × 2 × 2 = 16</p>
                <p><strong>Step 4 (Cube the Result):</strong> 2³ = 2 × 2 × 2 = 8</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-emerald-300 font-semibold">Final Exact Fraction: 1 / 8</p>
                  <p className="text-sky-300 font-semibold">Decimal Equivalence: 0.125</p>
                  <p className="text-slate-300 text-xs">Scientific Notation: 1.25 × 10⁻¹</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-sm">
                <h4 className="font-bold text-sky-400 text-base">Case Study 2: Astrophysics Kinetic Energy (Speed of Light Squared)</h4>
                <p><strong>Physical Constant (c):</strong> Speed of light = 3.0 × 10⁸ meters/second</p>
                <p><strong>Operation (c²):</strong> (3.0 × 10⁸)²</p>
                <p><strong>Step 1 (Distribute Power):</strong> (3.0)² × (10⁸)²</p>
                <p><strong>Step 2 (Evaluate Base):</strong> 3.0² = 9.0</p>
                <p><strong>Step 3 (Power of Power Rule):</strong> (10⁸)² = 10^(8 × 2) = 10¹⁶</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-sky-300 font-semibold">Standard Scientific Notation: 9.0 × 10¹⁶ m²/s²</p>
                  <p className="text-emerald-300 font-semibold">Expanded Form: 90,000,000,000,000,000</p>
                  <p className="text-slate-300 text-xs">Significance: Foundational multiplier in Einstein's mass-energy equivalence equation E = mc².</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Euler's Number (e) and Natural Exponential Growth</h3>
            <p className="leading-relaxed mb-4 text-sm">
              In calculus and advanced physics, the most consequential exponential function is the natural exponential <em>eˣ</em>, where base <em>e</em> is Euler's irrational constant (approximately 2.718281828...). Defined mathematically as the limit of (1 + 1/n)ⁿ as n approaches infinity, <em>eˣ</em> is unique because its instantaneous rate of change (derivative) equals the function itself. Natural exponentiation models continuous compound financial interest, bacterial colony proliferation, atmospheric pressure drop with altitude, and electronic RC circuit charging dynamics.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">5 Critical Mathematical Pitfalls with Exponents</h3>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed text-slate-300">
              <li>
                <strong>Adding Exponents Across Different Bases:</strong> The product rule only applies when bases are identical (2³ × 2⁴ = 2⁷). Attempting to multiply 2³ × 3⁴ by adding exponents (e.g., 6⁷) is completely mathematically invalid.
              </li>
              <li>
                <strong>Confusing Negative Bases with Negative Exponents:</strong> A negative base (-3)² = +9 reflects negative sign parity. A negative exponent 3⁻² = 1/9 represents a reciprocal fraction. They govern completely independent algebraic dimensions.
              </li>
              <li>
                <strong>Misapplying Powers Across Addition:</strong> (a + b)² does NOT equal a² + b². By polynomial expansion, (a + b)² = a² + 2ab + b². The exponent does not distribute across addition or subtraction.
              </li>
              <li>
                <strong>Indeterminate Forms (0⁰ and 0⁻ⁿ):</strong> Zero raised to a positive power is 0 (0³ = 0). However, 0 raised to a negative power (0⁻² = 1/0² = 1/0) involves division by zero and is mathematically undefined.
              </li>
              <li>
                <strong>Assuming Fractional Powers Mean Regular Division:</strong> A power of 1/2 does not mean dividing the base by 2. 16^(1/2) equals the square root of 16 (which is 4), not 16 / 2 = 8.
              </li>
            </ul>
          </div>
        </section>

        <Faq items={faqItems} className="mt-12" />
        <Disclaimer text="Educational Disclaimer: This exponent calculator is designed strictly for academic, scientific, and engineering computational purposes. Operations involving floating point approximations may experience minute rounding differences beyond 15 significant decimal digits." />
      </div>
    </>
  );
};

export default ExponentCalculator;

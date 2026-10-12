'use client';

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
import { Divide, Calculator, BookOpen, ShieldAlert, CheckCircle2, HelpCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';

const FractionCalculator = () => {
  const [num1, setNum1] = useState('');
  const [den1, setDen1] = useState('');
  const [num2, setNum2] = useState('');
  const [den2, setDen2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  const simplifyFraction = (numerator, denominator) => {
    if (denominator === 0) return { num: numerator, den: denominator };
    const commonDivisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return { num: numerator / commonDivisor, den: denominator / commonDivisor };
  };

  const calculateFraction = (e) => {
    e.preventDefault();
    const n1 = parseInt(num1, 10);
    const d1 = parseInt(den1, 10);
    const n2 = parseInt(num2, 10);
    const d2 = parseInt(den2, 10);

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
      setResult({ error: "Please enter valid integers. Denominators cannot be zero." });
      return;
    }

    let resultNum, resultDen;
    switch (operation) {
      case 'add':
        resultNum = n1 * d2 + n2 * d1;
        resultDen = d1 * d2;
        break;
      case 'subtract':
        resultNum = n1 * d2 - n2 * d1;
        resultDen = d1 * d2;
        break;
      case 'multiply':
        resultNum = n1 * n2;
        resultDen = d1 * d2;
        break;
      case 'divide':
        if (n2 === 0) {
          setResult({ error: "Cannot divide by a zero fraction (division by zero is undefined)." });
          return;
        }
        resultNum = n1 * d2;
        resultDen = d1 * n2;
        break;
      default:
        return;
    }

    if (resultDen < 0) {
      resultNum = -resultNum;
      resultDen = -resultDen;
    }

    const simplified = simplifyFraction(resultNum, resultDen);
    const decimal = simplified.den !== 0 ? simplified.num / simplified.den : "Undefined";
    
    // Mixed fraction calculation
    let mixedStr = null;
    if (Math.abs(simplified.num) >= simplified.den && simplified.den !== 1) {
      const whole = Math.trunc(simplified.num / simplified.den);
      const rem = Math.abs(simplified.num % simplified.den);
      if (rem !== 0) {
        mixedStr = `${whole} ${rem}/${simplified.den}`;
      }
    }

    const newResult = {
      numerator: simplified.num,
      denominator: simplified.den,
      mixed: mixedStr,
      decimal: typeof decimal === 'number' ? decimal.toFixed(4) : decimal,
      operation: operation,
      rawNum: resultNum,
      rawDen: resultDen,
    };

    setResult(newResult);
    saveCalculation({
      type: 'Fraction',
      inputs: {
        'Expression': `${n1}/${d1} ${operationSymbols[operation]} ${n2}/${d2}`
      },
      result: {
        'Simplified Fraction': `${newResult.numerator}/${newResult.denominator}`,
        'Decimal Value': newResult.decimal,
      }
    });
  };

  const resetForm = () => {
    setNum1('');
    setDen1('');
    setNum2('');
    setDen2('');
    setOperation('add');
    setResult(null);
  };

  const operationSymbols = { add: '+', subtract: '−', multiply: '×', divide: '÷' };

  const faqItems = [
    {
      question: "How do you add or subtract fractions with unlike denominators?",
      answer: "To add or subtract fractions with different denominators, you must first find a common denominator—ideally the Least Common Multiple (LCM) of both denominators. Multiply the numerator and denominator of each fraction by the necessary factor to convert them to equivalent fractions with matching denominators, then add or subtract only the numerators while keeping the common denominator constant."
    },
    {
      question: "What is the 'Keep, Change, Flip' (KCF) rule for dividing fractions?",
      answer: "Dividing by a fraction is mathematically identical to multiplying by its reciprocal. The KCF rule states: 1. Keep the first fraction as it is; 2. Change the division symbol (÷) to multiplication (×); 3. Flip the second fraction upside down (invert numerator and denominator). For example: (2/3) ÷ (4/5) becomes (2/3) × (5/4) = 10/12 = 5/6."
    },
    {
      question: "What is the difference between a Proper, Improper, and Mixed Fraction?",
      answer: "A proper fraction has a numerator smaller than its denominator (e.g. 3/4), representing a value less than 1. An improper fraction has a numerator greater than or equal to its denominator (e.g. 7/4), representing a value greater than or equal to 1. A mixed fraction writes an improper fraction as a whole integer plus a proper fraction remainder (e.g. 1 3/4)."
    },
    {
      question: "How do you simplify (reduce) a fraction to its lowest terms?",
      answer: "To simplify a fraction, calculate the Greatest Common Divisor (GCD) of both the numerator and denominator, then divide both numbers by that GCD. For example, in 24/36, the GCD is 12. Dividing 24 ÷ 12 = 2 and 36 ÷ 12 = 3 yields the simplified irreducible fraction 2/3."
    },
    {
      question: "Why can the denominator of a fraction never be zero?",
      answer: "In mathematics, division by zero is undefined. A fraction represents dividing a whole quantity into equal parts (e.g. dividing a pizza into 4 slices). Dividing by zero would mean partitioning a finite quantity into zero parts, which creates an arithmetic contradiction that violates field axioms of real numbers."
    },
    {
      question: "How do you convert a fraction into an exact decimal and percentage?",
      answer: "To convert a fraction to a decimal, divide the numerator by the denominator using long division (e.g. 5 ÷ 8 = 0.625). To express that decimal as a percentage, multiply the resulting decimal by 100 and append the % sign (0.625 × 100 = 62.5%)."
    }
  ];

  const pageTitle = "Fraction Calculator: Add, Subtract, Multiply & Divide Fractions | CalcZoon";
  const pageDescription = "Solve fraction math problems with step-by-step simplification, greatest common divisor reduction, mixed numbers, and decimal conversions. 100% free.";
  const canonicalUrl = "https://calczoon.com/math/fraction-calculator";

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} canonicalUrl={canonicalUrl} />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader
          title="Fraction Calculator"
          description="Perform precision fraction addition, subtraction, multiplication, and division with automatic GCD reduction, mixed numbers, and decimal conversion."
          icon={Divide}
        />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-xl">Fraction Arithmetic Operation</CardTitle>
                <CardDescription className="text-slate-300">
                  Enter numerators and non-zero denominators for two fractions and choose an operator.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateFraction} className="space-y-6">
                  <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 py-4">
                    {/* Fraction 1 */}
                    <div className="flex flex-col items-center space-y-2 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                      <Label htmlFor="num1" className="text-xs text-slate-400">Numerator 1</Label>
                      <Input
                        id="num1"
                        type="number"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        placeholder="3"
                        required
                        className="bg-slate-950 border-slate-700 w-24 text-center text-xl font-bold text-white"
                      />
                      <div className="h-0.5 w-24 bg-emerald-500 my-1"></div>
                      <Label htmlFor="den1" className="text-xs text-slate-400">Denominator 1</Label>
                      <Input
                        id="den1"
                        type="number"
                        value={den1}
                        onChange={(e) => setDen1(e.target.value)}
                        placeholder="4"
                        required
                        className="bg-slate-950 border-slate-700 w-24 text-center text-xl font-bold text-white"
                      />
                    </div>

                    {/* Operator */}
                    <div className="flex flex-col items-center">
                      <Label className="text-xs text-slate-400 mb-1">Operator</Label>
                      <select
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
                        className="text-2xl font-black bg-slate-900 text-emerald-400 p-3 rounded-xl border border-slate-700 focus:outline-none"
                      >
                        <option value="add">+</option>
                        <option value="subtract">−</option>
                        <option value="multiply">×</option>
                        <option value="divide">÷</option>
                      </select>
                    </div>

                    {/* Fraction 2 */}
                    <div className="flex flex-col items-center space-y-2 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                      <Label htmlFor="num2" className="text-xs text-slate-400">Numerator 2</Label>
                      <Input
                        id="num2"
                        type="number"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        placeholder="2"
                        required
                        className="bg-slate-950 border-slate-700 w-24 text-center text-xl font-bold text-white"
                      />
                      <div className="h-0.5 w-24 bg-emerald-500 my-1"></div>
                      <Label htmlFor="den2" className="text-xs text-slate-400">Denominator 2</Label>
                      <Input
                        id="den2"
                        type="number"
                        value={den2}
                        onChange={(e) => setDen2(e.target.value)}
                        placeholder="5"
                        required
                        className="bg-slate-950 border-slate-700 w-24 text-center text-xl font-bold text-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-slate-950 font-bold h-12 text-base">
                      Calculate & Simplify
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm} className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 h-12">
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>

              {result && (
                <CardFooter className="flex flex-col items-center justify-center p-6 bg-slate-900/80 border-t border-slate-700 rounded-b-lg">
                  {result.error ? (
                    <p className="text-rose-400 text-center w-full font-medium">{result.error}</p>
                  ) : (
                    <div className="w-full text-center space-y-4">
                      <p className="text-slate-400 text-sm">
                        {num1}/{den1} {operationSymbols[result.operation]} {num2}/{den2} =
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <div className="inline-flex flex-col items-center">
                          <span className="text-4xl md:text-5xl font-black text-emerald-400">{result.numerator}</span>
                          <span className="w-full h-1 bg-emerald-500 my-1"></span>
                          <span className="text-4xl md:text-5xl font-black text-emerald-400">{result.denominator}</span>
                        </div>
                        {result.mixed && (
                          <div className="text-2xl font-bold text-slate-300">
                            = <span className="text-sky-400">{result.mixed}</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto pt-2 text-xs">
                        <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                          <span className="text-slate-400 block mb-0.5">Decimal Value</span>
                          <span className="font-mono font-bold text-white text-sm">{result.decimal}</span>
                        </div>
                        <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-700">
                          <span className="text-slate-400 block mb-0.5">Unreduced Form</span>
                          <span className="font-mono font-bold text-slate-300 text-sm">{result.rawNum}/{result.rawDen}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <ShareResults
                          title="Fraction Calculation"
                          text={`I solved ${num1}/${den1} ${operationSymbols[result.operation]} ${num2}/${den2} on CalcZoon: Result is ${result.numerator}/${result.denominator} (${result.decimal})!`}
                          url="/math/fraction-calculator"
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
                  <BookOpen className="w-5 h-5 text-emerald-400" /> Fraction Rules Quick Sheet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-300 font-mono">
                <div className="pb-2 border-b border-slate-700/60">
                  <p className="text-emerald-400 font-bold">Addition / Subtraction:</p>
                  <p className="text-slate-300 mt-0.5">(a/b) ± (c/d) = (ad ± bc) / bd</p>
                </div>
                <div className="pb-2 border-b border-slate-700/60">
                  <p className="text-sky-400 font-bold">Multiplication:</p>
                  <p className="text-slate-300 mt-0.5">(a/b) × (c/d) = (ac) / (bd)</p>
                </div>
                <div>
                  <p className="text-amber-400 font-bold">Division (Keep, Change, Flip):</p>
                  <p className="text-slate-300 mt-0.5">(a/b) ÷ (c/d) = (ad) / (bc)</p>
                </div>
              </CardContent>
            </Card>
            <RelatedTools />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,150 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10 mb-12">
          {/* Section 1: What is a Fraction Calculator */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Divide className="text-emerald-400 w-7 h-7" /> What is the Fraction Calculator & The Foundations of Rational Numbers
            </h2>
            <p className="text-base md:text-lg">
              The <strong>Fraction Calculator</strong> is an exact algebraic computational engine designed to perform addition, subtraction, multiplication, and division across rational numbers ($a/b$). In mathematics, a fraction represents a quotient or ratio of two integers where the top number (numerator) defines the count of parts considered, and the bottom number (denominator) defines the total equal divisions of a unit whole.
            </p>
            <p>
              Unlike standard pocket calculators that immediately truncate rational values into imprecise floating-point decimals (such as rounding $1/3$ to $0.3333$), our tool performs exact integer fraction arithmetic. It automates common denominator derivation, computes greatest common divisors (GCD), reduces results to their lowest irreducible terms, and converts improper quotients into clean mixed fractions.
            </p>
          </div>

          {/* Section 2: Mathematical Operational Rules */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              The Fundamental Algebraic Rules of Fraction Arithmetic
            </h2>
            <p>
              Each arithmetic operation on rational numbers follows rigorous algebraic axioms:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4 font-mono text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-800/40 space-y-2">
                <p className="text-emerald-400 font-bold uppercase tracking-wider">Addition & Subtraction Rule</p>
                <p className="text-white text-sm font-semibold">a/b ± c/d = (a·d ± b·c) ÷ (b·d)</p>
                <p className="text-slate-400">Cross-multiplies numerators by opposite denominators over the product of denominators.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-sky-800/40 space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider">Multiplication Rule</p>
                <p className="text-white text-sm font-semibold">(a/b) × (c/d) = (a × c) ÷ (b × d)</p>
                <p className="text-slate-400">Directly multiplies numerators together and denominators together.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-800/40 space-y-2">
                <p className="text-amber-400 font-bold uppercase tracking-wider">Division Rule (KCF Reciprocal)</p>
                <p className="text-white text-sm font-semibold">(a/b) ÷ (c/d) = (a/b) × (d/c) = (a·d) ÷ (b·c)</p>
                <p className="text-slate-400">Inverts the divisor fraction (reciprocal) and performs standard multiplication.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-purple-800/40 space-y-2">
                <p className="text-purple-400 font-bold uppercase tracking-wider">Simplification (Euclidean GCD)</p>
                <p className="text-white text-sm font-semibold">Reduced = (Num ÷ GCD) ÷ (Den ÷ GCD)</p>
                <p className="text-slate-400">Dividing both terms by their Greatest Common Divisor yields irreducible lowest terms.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Step-by-Step Usage Guide */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Step-by-Step Guide: How to Solve Any Fraction Problem Manually
            </h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-white">Step 1: Check Denominators for Equality:</strong> When adding or subtracting, verify whether denominators match. If they match ($2/7 + 3/7$), add numerators directly ($5/7$).
              </li>
              <li>
                <strong className="text-white">Step 2: Find the Least Common Multiple (LCM):</strong> If denominators differ ($1/4 + 1/6$), find the smallest number divisible by both ($LCM = 12$). Convert: $3/12 + 2/12 = 5/12$.
              </li>
              <li>
                <strong className="text-white">Step 3: Invert for Division:</strong> For division ($3/5 ÷ 2/7$), flip the second fraction into $7/2$ and multiply: $3 × 7 = 21$ and $5 × 2 = 10$, giving $21/10$.
              </li>
              <li>
                <strong className="text-white">Step 4: Reduce Using the Greatest Common Divisor (GCD):</strong> Find factors common to numerator and denominator to reduce to lowest terms.
              </li>
              <li>
                <strong className="text-white">Step 5: Convert Improper Fractions to Mixed Numbers:</strong> If numerator exceeds denominator, divide to extract the whole number quotient and remainder (21/10 = 2 1/10).
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
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-bold">Example 1</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Addition with Unlike Denominators</span>
                </div>
                <h3 className="text-lg font-bold text-white">Problem: Solve 3/8 + 5/6</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Common Denominator:</strong> LCM(8, 6) = 24</li>
                  <li><strong>Convert Fraction 1:</strong> (3 × 3) / (8 × 3) = 9/24</li>
                  <li><strong>Convert Fraction 2:</strong> (5 × 4) / (6 × 4) = 20/24</li>
                  <li><strong>Sum Numerators:</strong> (9 + 20) / 24 = 29/24</li>
                  <li><strong>Simplified Quotient:</strong> <span className="text-emerald-400 font-bold text-sm">29/24 = 1 5/24 (Decimal: 1.2083)</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Takeaway: Converting to common denominators ensures exact fraction sum without decimal rounding errors.
                </p>
              </div>

              <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-sky-400 font-mono font-bold">Example 2</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Division with Simplification</span>
                </div>
                <h3 className="text-lg font-bold text-white">Problem: Solve (7/12) ÷ (14/15)</h3>
                <ul className="text-xs space-y-1.5 text-slate-300">
                  <li><strong>Apply KCF Rule:</strong> (7/12) × (15/14)</li>
                  <li><strong>Cross-Cancel Factors:</strong> 7 cancels with 14 (leaving 1 and 2); 15 and 12 divide by 3 (leaving 5 and 4)</li>
                  <li><strong>Multiply Residues:</strong> (1 × 5) / (4 × 2) = 5/8</li>
                  <li><strong>GCD Reduction:</strong> 105/168 ÷ 21 = 5/8</li>
                  <li><strong>Final Result:</strong> <span className="text-sky-400 font-bold text-sm">5/8 (Decimal: 0.6250)</span></li>
                </ul>
                <p className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                  Takeaway: Cross-canceling before multiplying large numbers simplifies calculations and reduces error risk.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Common Calculation Mistakes */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <ShieldAlert className="text-amber-400 w-6 h-6" /> Common Fraction Mistakes to Avoid
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Adding Denominators Straight Across
                </h3>
                <p className="text-xs text-slate-400">
                  The most frequent elementary error is calculating $1/2 + 1/3 = 2/5$. Denominators represent the size of parts, not quantities. You can never add denominators during addition or subtraction.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Flipping the Wrong Fraction During Division
                </h3>
                <p className="text-xs text-slate-400">
                  In division ($a/b ÷ c/d$), only the *second* fraction (the divisor $c/d$) must be inverted into $d/c$. Flipping the first fraction or both produces an entirely invalid reciprocal answer.
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Forgetting to Reduce to Lowest Terms
                </h3>
                <p className="text-xs text-slate-400">
                  Leaving an answer as $16/24$ is incomplete in academic mathematics. Always check if numerator and denominator share common factors (here, dividing by 8 yields $2/3$).
                </p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h3 className="font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Misinterpreting Negative Signs
                </h3>
                <p className="text-xs text-slate-400">
                  A negative fraction can be written as $-a/b$, $a/(-b)$, or $-(a/b)$—they are all mathematically identical. However, $(-a)/(-b)$ is positive $+a/b$.
                </p>
              </div>
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
              Mathematical References & Related Calculators
            </h3>
            <ul className="text-xs text-slate-400 space-y-1.5">
              <li>• Euclid. <em>Elements, Book VII</em> (Euclidean Algorithm for Greatest Common Divisor).</li>
              <li>• National Council of Teachers of Mathematics (NCTM). <em>Principles and Standards for School Mathematics</em>.</li>
              <li>• Stewart J. <em>Calculus: Early Transcendentals</em>. Cengage Learning (2020).</li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/math/percentage-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Percentage Calculator →
              </Link>
              <Link to="/math/scientific-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Scientific Calculator →
              </Link>
              <Link to="/math/triangle-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Triangle Trigonometry Calculator →
              </Link>
              <Link to="/math/statistics-calculator" className="text-xs bg-slate-900 hover:bg-slate-800 text-emerald-400 px-3 py-1.5 rounded border border-slate-700 transition">
                Statistics & Standard Deviation →
              </Link>
            </div>
          </div>

          <Disclaimer text="Fraction computations are performed using exact integer arithmetic algorithms. Results are simplified using Euclidean greatest common divisor reduction." />
        </section>
      </div>
    </>
  );
};

export default FractionCalculator;

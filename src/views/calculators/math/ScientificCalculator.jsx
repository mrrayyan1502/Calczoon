'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Seo from '@/components/Seo';
import { Calculator, BookOpen, CheckCircle, HelpCircle, ArrowRight, Activity, Compass } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';

const ScientificCalculator = () => {
  const [display, setDisplay] = useState('');
  const [expression, setExpression] = useState('');
  const [angleMode, setAngleMode] = useState('deg'); // deg or rad

  const appendToDisplay = (value) => {
    setDisplay((prev) => prev + value);
    setExpression((prev) => prev + value);
  };

  const clearDisplay = () => {
    setDisplay('');
    setExpression('');
  };

  const deleteLast = () => {
    setDisplay((prev) => prev.slice(0, -1));
    setExpression((prev) => prev.slice(0, -1));
  };

  const appendFunction = (func) => {
    setDisplay((prev) => prev + func + '(');
    setExpression((prev) => prev + `Math.${func}(`);
  };

  const appendConstant = (constName) => {
    if (constName === 'pi') {
      setDisplay((prev) => prev + 'π');
      setExpression((prev) => prev + 'Math.PI');
    } else if (constName === 'e') {
      setDisplay((prev) => prev + 'e');
      setExpression((prev) => prev + 'Math.E');
    }
  };

  const handleAngleModeToggle = () => {
    setAngleMode((prev) => (prev === 'deg' ? 'rad' : 'deg'));
  };

  const evaluate = () => {
    try {
      let finalExpr = expression;

      // Handle custom symbols and mappings
      finalExpr = finalExpr.replace(/x/g, '*');
      finalExpr = finalExpr.replace(/÷/g, '/');
      finalExpr = finalExpr.replace(/π/g, 'Math.PI');
      finalExpr = finalExpr.replace(/e/g, 'Math.E');
      finalExpr = finalExpr.replace(/√\(/g, 'Math.sqrt(');
      finalExpr = finalExpr.replace(/\^/g, '**');
      
      // Handle trigonometric degrees vs radians conversions
      if (angleMode === 'deg') {
        finalExpr = finalExpr.replace(/Math\.sin\((.*?)\)/g, 'Math.sin(($1) * Math.PI / 180)');
        finalExpr = finalExpr.replace(/Math\.cos\((.*?)\)/g, 'Math.cos(($1) * Math.PI / 180)');
        finalExpr = finalExpr.replace(/Math\.tan\((.*?)\)/g, 'Math.tan(($1) * Math.PI / 180)');
      }

      // Safe evaluation using Function constructor
      // Block any dangerous characters or words to prevent injection risks
      if (/[a-zA-Z_]/.test(finalExpr.replace(/Math\.[a-z0-9]+/gi, ''))) {
        throw new Error('Invalid Expression');
      }

      const resultValue = new Function(`return (${finalExpr})`)();
      
      if (resultValue === undefined || isNaN(resultValue) || !isFinite(resultValue)) {
        setDisplay('Error');
        setExpression('');
      } else {
        // Format decimal precision to avoid floating point anomalies
        const formattedResult = parseFloat(resultValue.toFixed(10)).toString();
        setDisplay(formattedResult);
        setExpression(formattedResult);
      }
    } catch (e) {
      setDisplay('Error');
      setExpression('');
    }
  };

  const pageTitle = "Online Scientific Calculator: Advanced Math, Trig & Algebra 2026";
  const pageDescription = "Solve trigonometric, logarithmic, exponential, and algebraic equations online. Features DEG/RAD switching, order of operations, and full worked examples.";
  const canonicalUrl = "/math/scientific-calculator";

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CalcZoon Scientific Calculator",
    "operatingSystem": "All",
    "applicationCategory": "EducationalApplication",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqItems = [
    { 
      question: "How do I toggle between Degrees and Radians mode?", 
      answer: "Click the RAD/DEG toggle button located on the top-left of the keypad. In DEG (degree) mode, trigonometric inputs like sin(30) evaluate against 360-degree angles (yielding 0.5). In RAD (radian) mode, angles are evaluated along circular arc lengths (where π radians equal 180 degrees)." 
    },
    { 
      question: "What is the difference between log and ln on a scientific calculator?", 
      answer: "The 'log' key denotes the common logarithm with base 10 (log₁₀), commonly used in acoustics (decibels), seismology (Richter scale), and chemistry (pH). The 'ln' key represents the natural logarithm with base e (where e ≈ 2.71828), ubiquitous in calculus, continuous compounding interest, physics, and biological population growth modeling." 
    },
    { 
      question: "How does the scientific calculator handle Order of Operations (PEMDAS / BODMAS)?", 
      answer: "The computation engine strictly follows standard algebraic operator precedence: Parentheses/Brackets first, Exponents and roots second, Multiplication and Division from left to right third, and Addition and Subtraction fourth. To override default precedence, nest terms within opening and closing parentheses." 
    },
    { 
      question: "Why do I receive an 'Error' message on my calculation?", 
      answer: "An 'Error' message occurs when an expression violates mathematical axioms or syntax rules. Frequent causes include mismatched or unclosed parentheses, attempting to divide a number by zero, taking the square root of a negative number without complex number mode, or evaluating tan(90°) in degree mode where tangent approaches infinity." 
    },
    { 
      question: "Why do floating-point computer calculators sometimes produce micro-decimals like 0.30000000000000004?", 
      answer: "Digital computers represent numbers using binary (base 2) floating-point arithmetic governed by the IEEE 754 standard. Certain base-10 fractions (such as 0.1 and 0.2) repeat infinitely in binary, creating tiny rounding artifacts. CalcZoon's engine applies precision rounding to eliminate these binary truncation artifacts." 
    },
    { 
      question: "Is this scientific calculator free to use for academic exams and engineering homework?", 
      answer: "Yes, CalcZoon's Scientific Calculator is 100% free with no registration or download required. It functions seamlessly on desktop computers, tablets, and smartphones, making it accessible for classroom exercises, engineering assignments, and lab work." 
    }
  ];

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

  const buttons = [
    // Row 1: Operations
    { label: 'Rad/Deg', action: handleAngleModeToggle, variant: 'secondary', textClass: 'text-xs text-sky-400 font-bold' },
    { label: '(', action: () => appendToDisplay('('), variant: 'secondary' },
    { label: ')', action: () => appendToDisplay(')'), variant: 'secondary' },
    { label: 'Del', action: deleteLast, variant: 'destructive', textClass: 'text-red-400 font-bold' },
    { label: 'AC', action: clearDisplay, variant: 'destructive', textClass: 'text-red-400 font-bold' },
    
    // Row 2: Scientific operations
    { label: 'sin', action: () => appendFunction('sin'), variant: 'secondary', textClass: 'italic font-mono text-emerald-400' },
    { label: 'cos', action: () => appendFunction('cos'), variant: 'secondary', textClass: 'italic font-mono text-emerald-400' },
    { label: 'tan', action: () => appendFunction('tan'), variant: 'secondary', textClass: 'italic font-mono text-emerald-400' },
    { label: 'log', action: () => appendFunction('log10'), variant: 'secondary', textClass: 'text-emerald-400' },
    { label: 'ln', action: () => appendFunction('log'), variant: 'secondary', textClass: 'text-emerald-400' },

    // Row 3: Advanced Powers
    { label: 'x²', action: () => appendToDisplay('**2'), variant: 'secondary', textClass: 'text-emerald-400' },
    { label: 'xʸ', action: () => appendToDisplay('**'), variant: 'secondary', textClass: 'text-emerald-400' },
    { label: '√', action: () => appendFunction('sqrt'), variant: 'secondary', textClass: 'text-emerald-400' },
    { label: 'π', action: () => appendConstant('pi'), variant: 'secondary', textClass: 'text-emerald-400 font-bold' },
    { label: 'e', action: () => appendConstant('e'), variant: 'secondary', textClass: 'text-emerald-400 font-bold' },

    // Row 4: Standard buttons
    { label: '7', action: () => appendToDisplay('7'), variant: 'ghost', textClass: 'text-white text-lg font-bold' },
    { label: '8', action: () => appendToDisplay('8'), variant: 'ghost', textClass: 'text-white text-lg font-bold' },
    { label: '9', action: () => appendToDisplay('9'), variant: 'ghost', textClass: 'text-white text-lg font-bold' },
    { label: '÷', action: () => appendToDisplay('÷'), variant: 'secondary', textClass: 'text-sky-400 text-lg' },
    { label: '%', action: () => appendToDisplay('/100'), variant: 'secondary', textClass: 'text-sky-400' },

    // Row 5: Numbers and operators
    { label: '4', action: () => appendToDisplay('4'), variant: 'ghost', textClass: 'text-white text-lg font-bold' },
    { label: '5', action: () => appendToDisplay('5'), variant: 'ghost', textClass: 'text-white text-lg font-bold' },
    { label: '6', action: () => appendToDisplay('6'), variant: 'ghost', textClass: 'text-white text-lg font-bold' },
    { label: 'x', action: () => appendToDisplay('x'), variant: 'secondary', textClass: 'text-sky-400 text-lg' },
    { label: '1/x', action: () => appendToDisplay('1/('), variant: 'secondary', textClass: 'text-emerald-400' },

    // Row 6: Numbers and operators
    { label: '1', action: () => appendToDisplay('1'), variant: 'ghost', textClass: 'text-white text-lg font-bold' },
    { label: '2', action: () => appendToDisplay('2'), variant: 'ghost', textClass: 'text-white text-lg font-bold' },
    { label: '3', action: () => appendToDisplay('3'), variant: 'ghost', textClass: 'text-white text-lg font-bold' },
    { label: '-', action: () => appendToDisplay('-'), variant: 'secondary', textClass: 'text-sky-400 text-lg' },
    { label: 'Mod', action: () => appendToDisplay('%'), variant: 'secondary', textClass: 'text-sky-400' },

    // Row 7: Bottom row
    { label: '0', action: () => appendToDisplay('0'), variant: 'ghost', textClass: 'text-white text-lg font-bold' },
    { label: '.', action: () => appendToDisplay('.'), variant: 'ghost', textClass: 'text-white text-lg font-bold' },
    { label: '=', action: evaluate, variant: 'default', textClass: 'text-white text-lg font-extrabold bg-gradient-to-r from-emerald-500 to-sky-500' },
    { label: '+', action: () => appendToDisplay('+'), variant: 'secondary', textClass: 'text-sky-400 text-lg' },
    { label: 'Exp', action: () => appendToDisplay('e+'), variant: 'secondary', textClass: 'text-sky-400' }
  ];

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        schema={[appSchema, faqSchema]}
      />

      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={Calculator} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 flex justify-center items-start">
            <Card className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-6 shadow-2xl backdrop-blur-xl">
              {/* Display Area */}
              <div className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 mb-6 flex flex-col items-end gap-1 select-all relative overflow-hidden">
                <span className="absolute top-3 left-4 text-xs font-bold text-sky-400 px-2.5 py-0.5 rounded-full bg-sky-500/10 uppercase tracking-widest">
                  {angleMode} mode
                </span>
                <div className="text-slate-300 text-sm font-mono break-all min-h-[1.25rem] max-w-full text-right mt-2">
                  {display || '0'}
                </div>
                <div className="text-white text-4xl font-extrabold font-mono tracking-tight text-right break-all max-w-full">
                  {display === 'Error' ? 'Error' : display || '0'}
                </div>
              </div>

              {/* Calculator Keyboard */}
              <div className="grid grid-cols-5 gap-3">
                {buttons.map((btn, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={btn.label === '=' ? 'col-span-2' : ''}
                  >
                    <Button
                      onClick={btn.action}
                      variant={btn.variant === 'ghost' ? 'ghost' : 'outline'}
                      className={`w-full h-14 rounded-xl border-slate-800/50 hover:bg-slate-800/80 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                        btn.label === '=' 
                          ? 'bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-extrabold shadow-lg hover:shadow-emerald-500/10 border-0' 
                          : 'bg-slate-850'
                      }`}
                    >
                      <span className={btn.label === '=' ? 'text-white font-extrabold text-lg' : btn.textClass || 'text-slate-300'}>
                        {btn.label === 'Rad/Deg' ? (angleMode === 'deg' ? 'DEG' : 'RAD') : btn.label}
                      </span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>

            <div className="w-full max-w-lg p-4 mt-4 rounded-xl bg-gradient-to-r from-sky-950/40 to-slate-900/60 border border-sky-500/30 flex items-start gap-3 text-left">
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-sky-400 block mb-1">Recommended STEM Resource: Scientific &amp; Engineering Computation</strong>
                Verify precision when running complex multi-step physics, trigonometry, or exponential models. Ensure matching trigonometric angle modes (DEG vs RAD) to eliminate computational discrepancies.
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-sky-400" /> Operational Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <div>
                  <h4 className="font-semibold text-white mb-1">Radian vs Degree Mode</h4>
                  <p className="text-slate-300 text-xs">Toggle &quot;DEG&quot; and &quot;RAD&quot; mode. Degree mode automatically converts inputs inside sin(), cos(), and tan() from degrees to radians for trigonometric accuracy.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Parentheses Syntax</h4>
                  <p className="text-slate-300 text-xs">Ensure you open and close parenthesis () symmetrically (e.g. sin(30) instead of sin(30). Unclosed brackets will return an &quot;Error&quot;.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Constants & Powers</h4>
                  <p className="text-slate-300 text-xs">Use π (3.14159...) and Euler&apos;s number e (2.71828...) for circular geometry and exponential calculations.</p>
                </div>
              </CardContent>
            </Card>

            <RelatedTools category="math" />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,200 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10 mb-12">
          {/* Section 1: What is a Scientific Calculator */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Calculator className="text-emerald-400 w-7 h-7" /> What is a Scientific Calculator & Computational Foundations
            </h2>
            <p className="text-base md:text-lg">
              A <strong>scientific calculator</strong> is an advanced electronic computational instrument specifically engineered to solve non-linear mathematics, trigonometry, logarithms, exponential progressions, and statistical relationships. While basic commercial calculators are restricted to four fundamental operations (addition, subtraction, multiplication, and division), scientific calculators execute complex algebraic expressions while honoring mathematical operator precedence.
            </p>
            <p>
              In contemporary STEM disciplines—encompassing physics, structural engineering, chemistry, computer science, and actuarial analysis—scientific computation forms the baseline of analytical research. Whether evaluating wave mechanics via trigonometric sine curves, computing radioactive half-lives through natural logarithms, or analyzing compound circuit impedance, a precision scientific engine translates abstract mathematical models into exact numerical results.
            </p>
          </div>

          {/* Section 2: Mathematical Operators & Functional Formulas */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Mathematical Operators, Trigonometric Axioms & Logarithms
            </h2>
            <p>
              CalcZoon&apos;s computational architecture incorporates comprehensive mathematical disciplines:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4 font-mono text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-800/40 space-y-2">
                <p className="text-emerald-400 font-bold uppercase tracking-wider">Trigonometric Ratios (Right Triangles)</p>
                <p className="text-white text-sm font-semibold">sin(θ) = Opp/Hyp | cos(θ) = Adj/Hyp | tan(θ) = Opp/Adj</p>
                <p className="text-slate-400">Angle mode conversions: Radians = Degrees × (π / 180). Essential for wave oscillation and kinematics.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-sky-800/40 space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider">Logarithmic Relations (Common vs Natural)</p>
                <p className="text-white text-sm font-semibold">log₁₀(x) = y ⇔ 10ʸ = x | ln(x) = y ⇔ eʸ = x</p>
                <p className="text-slate-400">log applies to decibels and earthquake scales; ln underpins calculus, continuous compounding, and entropy.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-800/40 space-y-2">
                <p className="text-amber-400 font-bold uppercase tracking-wider">Exponents & Roots</p>
                <p className="text-white text-sm font-semibold">xʸ = x multiplied y times | √(x) = x^(1/2)</p>
                <p className="text-slate-400">Computes non-linear volume expansions, quadratic roots, and exponential radioactive decay curves.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-purple-800/40 space-y-2">
                <p className="text-purple-400 font-bold uppercase tracking-wider">Fundamental Mathematical Constants</p>
                <p className="text-white text-sm font-semibold">π ≈ 3.1415926535... | e ≈ 2.7182818284...</p>
                <p className="text-slate-400">π represents circle circumference-to-diameter ratio; e is the natural base of growth and rate of change.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Step-by-Step Practical Usage Guide */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Step-by-Step Guide: Evaluating Complex Multi-Stage Equations
            </h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-white">Verify Your Angular Coordinate System:</strong> Before executing any trigonometric function (sin, cos, tan), examine the mode badge. Use <strong>DEG</strong> for navigational bearings and geometry, or <strong>RAD</strong> for harmonic motion and calculus integrals.
              </li>
              <li>
                <strong className="text-white">Construct the Algebraic Expression:</strong> Input operations sequentially. When invoking functions (like √ or log), the calculator automatically places an opening parenthesis for clarity.
              </li>
              <li>
                <strong className="text-white">Enforce Operator Precedence With Parentheses:</strong> When combining division or powers, surround sub-expressions in brackets (for instance: (12 + 8) ÷ (4 × 2) = 20 ÷ 8 = 2.5).
              </li>
              <li>
                <strong className="text-white">Execute and Review High-Precision Decimal Results:</strong> Click the equals key (=). The engine computes the result instantly, truncating binary floating-point anomalies to produce clean answers.
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
                  <CheckCircle className="w-5 h-5" /> Example 1: Physics Projectile Vertical Component
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> A projectile is launched with an initial velocity of v = 45 m/s at an elevation angle of θ = 30°. Calculate the initial vertical velocity component v_y = v · sin(θ).
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Angle Mode: Set to DEG</p>
                  <p>2. Key Sequence: 45 × sin(30)</p>
                  <p>3. Evaluation: sin(30°) = 0.5</p>
                  <p className="text-emerald-400 font-bold">Result: 45 × 0.5 = 22.5 m/s</p>
                </div>
                <p className="text-xs text-slate-400">
                  In DEG mode, the result computes to exactly 22.5 m/s. (In RAD mode by mistake, sin(30 rad) would incorrectly yield −0.988).
                </p>
              </div>

              <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-lg">
                  <Activity className="w-5 h-5" /> Example 2: Continuous Compound Growth & Doubling Time
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> Calculate the exact doubling time of an investment or biological cell population growing continuously at an annual rate of $r = 7\%$ ($0.07$) using $t = \ln(2) \div r$.
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Key Sequence: ln(2) ÷ 0.07</p>
                  <p>2. Intermediate: ln(2) ≈ 0.693147</p>
                  <p>3. Division: 0.693147 ÷ 0.07</p>
                  <p className="text-sky-400 font-bold">Result: 9.902 Years (Approx. 9.9 years)</p>
                </div>
                <p className="text-xs text-slate-400">
                  Validates the financial &quot;Rule of 72&quot; with exact natural logarithmic precision.
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
                <p className="font-bold text-white">1. Mismatched Angle Mode (Degrees vs Radians)</p>
                <p>
                  The single most catastrophic calculation error in aerospace, civil engineering, and academic exams is computing trigonometric angles in the wrong angular mode. For instance, cos(90°) = 0, whereas cos(90 rad) ≈ −0.44807. Always check the active mode banner before solving.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-rose-500 space-y-1">
                <p className="font-bold text-white">2. Unbalanced Parentheses and Implicit Multiplication</p>
                <p>
                  Modern digital engines require explicit operational symbols. Writing expressions like 2*(3+4) without explicit multiplication or omitting closing brackets such as &quot;√(16 + 9&quot; will produce an evaluation syntax fault.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-sky-500 space-y-1">
                <p className="font-bold text-white">3. Confusing Common Log (log₁₀) With Natural Log (ln)</p>
                <p>
                  Evaluating exponential decay equations using `log` instead of `ln` will cause an error by a factor of $\ln(10) \approx 2.3026$. Remember: `log` assumes base 10; `ln` assumes Euler&apos;s base $e$.
                </p>
              </div>
            </div>
          </div>

          {/* Static HTML Reference Benchmark Table */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Fundamental Mathematical &amp; Physical Constants Reference Table</h2>
            <p className="text-sm text-slate-400">
              The benchmark reference table below details universal mathematical and physical constants defined by CODATA and NIST, essential for advanced scientific, engineering, and calculus calculations.
            </p>
            <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-slate-950">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-300">
                    <th className="p-3 font-semibold">Constant Name</th>
                    <th className="p-3 font-semibold text-emerald-400">Symbol</th>
                    <th className="p-3 font-semibold text-sky-400">Standard Value</th>
                    <th className="p-3 font-semibold">SI Dimension</th>
                    <th className="p-3 font-semibold">Scientific Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Archimedes&apos; Constant (Pi)</td><td className="p-3 font-mono text-emerald-400">π</td><td className="p-3 font-mono text-sky-400">3.1415926535</td><td className="p-3">Dimensionless</td><td className="p-3">Trigonometry, Circular Geometry</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Euler&apos;s Number</td><td className="p-3 font-mono text-emerald-400">e</td><td className="p-3 font-mono text-sky-400">2.7182818284</td><td className="p-3">Dimensionless</td><td className="p-3">Calculus, Continuous Compound Growth</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Golden Ratio</td><td className="p-3 font-mono text-emerald-400">φ</td><td className="p-3 font-mono text-sky-400">1.6180339887</td><td className="p-3">Dimensionless</td><td className="p-3">Fibonacci Sequences, Fractals</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Speed of Light in Vacuum</td><td className="p-3 font-mono text-emerald-400">c</td><td className="p-3 font-mono text-sky-400">299,792,458</td><td className="p-3">m · s⁻¹</td><td className="p-3">Relativity, Electromagnetism</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Planck&apos;s Constant</td><td className="p-3 font-mono text-emerald-400">h</td><td className="p-3 font-mono text-sky-400">6.62607015 × 10⁻³⁴</td><td className="p-3">J · s</td><td className="p-3">Quantum Mechanics, Photon Energy</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Reduced Planck Constant</td><td className="p-3 font-mono text-emerald-400">ℏ</td><td className="p-3 font-mono text-sky-400">1.054571817 × 10⁻³⁴</td><td className="p-3">J · s</td><td className="p-3">Quantum Spin, Wave Equations</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Gravitational Constant</td><td className="p-3 font-mono text-emerald-400">G</td><td className="p-3 font-mono text-sky-400">6.67430 × 10⁻¹¹</td><td className="p-3">m³ · kg⁻¹ · s⁻²</td><td className="p-3">Newtonian Gravity, Astrophysics</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Avogadro&apos;s Number</td><td className="p-3 font-mono text-emerald-400">N_A</td><td className="p-3 font-mono text-sky-400">6.02214076 × 10²³</td><td className="p-3">mol⁻¹</td><td className="p-3">Chemistry, Molar Quantities</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Boltzmann&apos;s Constant</td><td className="p-3 font-mono text-emerald-400">k_B</td><td className="p-3 font-mono text-sky-400">1.380649 × 10⁻²³</td><td className="p-3">J · K⁻¹</td><td className="p-3">Thermodynamics, Entropy</td></tr>
                  <tr className="hover:bg-slate-900/50"><td className="p-3 font-bold text-white">Elementary Charge</td><td className="p-3 font-mono text-emerald-400">e_c</td><td className="p-3 font-mono text-sky-400">1.602176634 × 10⁻¹⁹</td><td className="p-3">C</td><td className="p-3">Atomic Physics, Electronics</td></tr>
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
              Answers to technical queries regarding scientific calculation rules, trigonometric functions, and computational accuracy.
            </p>
          </div>

          <Faq items={faqItems} className="mt-4" />

          {/* Section 7: Academic References & Interlinked Mathematical Tools */}
          <div className="space-y-4 pt-6 border-t border-slate-700/60">
            <h3 className="text-xl font-bold text-white">Standards, References & Companion Tools</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Floating-point computational algorithms comply with <strong>IEEE Standard for Floating-Point Arithmetic (IEEE 754-2019)</strong>. Standard mathematical constants conform to the CODATA recommended values of fundamental physical constants established by the <em>International Council for Science Committee on Data for Science and Technology</em>.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/math/triangle-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Triangle Trigonometry Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/math/fraction-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Fraction Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/math/percentage-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Percentage Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/math/statistics-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Statistics Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <Disclaimer text="This scientific calculator is intended for academic, engineering, and educational use. For mission-critical structural engineering, aerospace, or medical dosing calculations, results must be verified against certified analytical software." />
      </div>
    </>
  );
};

export default ScientificCalculator;

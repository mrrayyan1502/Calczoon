import React, { useState } from 'react';
import Seo from '@/components/Seo';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
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
      
      // Handle trigonometric degrees vs radians conversions
      if (angleMode === 'deg') {
        finalExpr = finalExpr.replace(/Math\.sin\((.*?)\)/g, 'Math.sin(($1) * Math.PI / 180)');
        finalExpr = finalExpr.replace(/Math\.cos\((.*?)\)/g, 'Math.cos(($1) * Math.PI / 180)');
        finalExpr = finalExpr.replace(/Math\.tan\((.*?)\)/g, 'Math.tan(($1) * Math.PI / 180)');
      }

      // Safe evaluation using Function constructor
      // We block any dangerous characters or words to prevent security/injection risks
      if (/[a-zA-Z_]/.test(finalExpr.replace(/Math\.[a-z0-9]+/gi, ''))) {
        throw new Error('Invalid Expression');
      }

      const resultValue = new Function(`return (${finalExpr})`)();
      
      if (resultValue === undefined || isNaN(resultValue) || !isFinite(resultValue)) {
        setDisplay('Error');
        setExpression('');
      } else {
        // Format decimal precision to avoid floating point bugs (e.g. 0.1+0.2 = 0.3000000000004)
        const formattedResult = parseFloat(resultValue.toFixed(10)).toString();
        setDisplay(formattedResult);
        setExpression(formattedResult);
      }
    } catch (e) {
      setDisplay('Error');
      setExpression('');
    }
  };

  const pageTitle = "Free Scientific Calculator: Online Advanced Math Solver 2026";
  const pageDescription = "Solve complex math, algebraic, and trigonometric equations in real time with our free, keyboard-friendly scientific calculator.";
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
    { question: "How do I toggle between Degrees and Radians?", answer: "Use the RAD/DEG toggle button at the top-left of the keyboard. This switches the input angle mode for trigonometric functions like sine, cosine, and tangent." },
    { question: "What mathematical functions are supported?", answer: "The calculator supports basic operations, trigonometry (sin, cos, tan), logarithmic functions (log, ln), exponents, powers (x², xʸ), square roots (√), and constants (π, e)." },
    { question: "Is this scientific calculator free to use?", answer: "Yes, it is 100% free online without any downloads, installations, or registration required." }
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
        <PageHeader title="Scientific Calculator" description={pageDescription} icon={Calculator} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 flex justify-center items-start">
            <Card className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-6 shadow-2xl backdrop-blur-xl">
              {/* Display Area */}
              <div className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 mb-6 flex flex-col items-end gap-1 select-all relative overflow-hidden">
                <span className="absolute top-3 left-4 text-xs font-bold text-sky-400 px-2.5 py-0.5 rounded-full bg-sky-500/10 uppercase tracking-widest">
                  {angleMode} mode
                </span>
                <div className="text-slate-400 text-sm font-mono break-all min-h-[1.25rem] max-w-full text-right mt-2">
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
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white">Tips & Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <div>
                  <h4 className="font-semibold text-white mb-1">Radian vs Degree</h4>
                  <p className="text-slate-400 text-xs">Toggle "DEG" and "RAD" mode. Degree mode converts inputs inside `sin()`, `cos()`, and `tan()` from degrees to radians automatically.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Parentheses Rules</h4>
                  <p className="text-slate-400 text-xs">Ensure you open and close parenthesis `()` correctly (e.g. `sin(30)` instead of `sin(30`). Closing bracket issues will show "Error".</p>
                </div>
              </CardContent>
            </Card>

            <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
              <h4 className="font-bold text-white mb-2 text-sm">Need a complete guide?</h4>
              <p className="text-xs text-slate-400 mb-4">See how Calczoon's math calculators can help you solve complex equations with ease.</p>
              <Link to="/blog/simplifying-complex-math" className="text-emerald-400 hover:text-emerald-300 hover:underline text-xs font-bold transition-colors block">
                Read Our Math Tools Guide &rarr;
              </Link>
            </div>

            <RelatedTools />
          </aside>
        </div>

        {/* SEO guide */}
        <section className="mt-16 bg-slate-800/20 rounded-2xl border border-slate-700/40 p-8 text-slate-300 leading-relaxed max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Understanding Scientific Calculators</h2>
          <p className="mb-4">
            A scientific calculator is an essential tool for secondary and university students, engineers, and scientists. It supports calculation functions beyond basic arithmetic, including trigonometric formulas, logarithmic expressions, and powers.
          </p>

          <h3 className="text-lg font-bold text-white mt-6 mb-2">Trigonometric Functions</h3>
          <p className="mb-4">
            Trigonometric keys like <strong>sin</strong>, <strong>cos</strong>, and <strong>tan</strong> solve calculations relating to angles and lengths of right-angled triangles. You must specify whether your angles are measured in:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6 text-sm">
            <li><strong>Degrees:</strong> One degree represents $1/360$ of a full circle. Useful for basic geometry.</li>
            <li><strong>Radians:</strong> One radian is the angle subtended at the center of a circle by an arc equal in length to the radius. Crucial for advanced calculus.</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default ScientificCalculator;

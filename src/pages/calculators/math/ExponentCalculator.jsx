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
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ExponentCalculator = () => {
  const [base, setBase] = useState('');
  const [exponent, setExponent] = useState('');
  const [result, setResult] = useState(null);

  const calculateExponent = (e) => {
    e.preventDefault();
    const b = parseFloat(base);
    const exp = parseFloat(exponent);

    if (isNaN(b) || isNaN(exp)) {
      setResult({ error: "Please enter valid numbers." });
      return;
    }

    if (b === 0 && exp <= 0) {
      setResult({ error: "0 raised to a negative or zero power is undefined." });
      return;
    }

    const power = Math.pow(b, exp);
    
    if (!isFinite(power)) {
      setResult({ error: "Result is too large to calculate." });
      return;
    }

    let formattedResult;
    if (Math.abs(power) >= 1e15 || (Math.abs(power) < 1e-4 && power !== 0)) {
      formattedResult = power.toExponential(6);
    } else {
      formattedResult = power.toString();
      if (formattedResult.includes('.') && formattedResult.length > 10) {
        formattedResult = parseFloat(power.toFixed(6)).toString();
      }
    }

    const newResult = {
      result: formattedResult,
      base: b.toString(),
      exponent: exp.toString(),
    };
    setResult(newResult);
    saveCalculation({
      type: 'Exponent',
      inputs: { base, exponent },
      result: { Result: newResult.result }
    });
  };

  const faqItems = [
    { question: "What does the negative exponent rule calculator do?", answer: "This calculator helps you solve problems with negative exponents by applying the rule a⁻ⁿ = 1/aⁿ. For example, 2⁻³ is calculated as 1/2³ = 1/8. It simplifies the process for math homework and other calculations." },
    { question: "What is an exponent?", answer: "An exponent refers to the number of times a number (the base) is multiplied by itself. For example, in 2^3, 2 is the base and 3 is the exponent, meaning 2 is multiplied by itself 3 times (2 x 2 x 2 = 8)." },
    { question: "What about fractional exponents?", answer: "A fractional exponent like 1/n means to take the nth root. For example, 9^(1/2) is the same as the square root of 9, which is 3. You can also calculate this using our <a href='/math/fraction-calculator' class='text-primary hover:underline'>Fraction Calculator</a> for the exponent part." }
  ];
  
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Exponent Calculator",
    "description": "The Exponent Calculator simplifies expressions with exponents, including negative exponent rules. Enter a base number and an exponent (power) to find the result.",
    "applicationCategory": "EducationalTool",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/math/exponent-calculator",
    "browserRequirements": "Requires a modern web browser."
  };

  return (
    <>
      <Seo
        title="Exponent Calculator | Solve Powers and Exponents | Calczoon"
        description="The Exponent Calculator simplifies expressions with exponents, including a negative exponent rules calculator. Enter a base number and an exponent (power) to find the result."
        canonicalUrl="/math/exponent-calculator"
        schema={[webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }]}
      />
      <div className="max-w-2xl mx-auto py-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <h1 className="text-3xl font-bold text-center text-primary">Exponent Calculator</h1>
              <CardDescription className="text-center text-slate-300">
                The Exponent Calculator simplifies expressions with exponents. Enter a base number and an exponent (power) to find the result. This tool can handle positive, negative, and decimal exponents and helps you quickly solve any exponential expression according to the laws of exponents.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateExponent} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="base">Base (x)</Label>
                  <Input id="base" type="number" value={base} onChange={(e) => setBase(e.target.value)} placeholder="e.g., 2" required className="bg-slate-900 border-slate-700" step="any" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exponent">Exponent (y)</Label>
                  <Input id="exponent" type="number" value={exponent} onChange={(e) => setExponent(e.target.value)} placeholder="e.g., -3" required className="bg-slate-900 border-slate-700" step="any" />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate x<sup>y</sup></Button>
              </form>
            </CardContent>
            {result && (
              <CardFooter className="flex flex-col items-start mt-6 p-6 bg-slate-800 rounded-b-lg">
                {result.error ? ( <p className="text-destructive text-center w-full">{result.error}</p> ) : (
                  <div className="w-full space-y-4">
                    <h2 className="text-xl font-bold text-slate-100">Result:</h2>
                    <div className="text-center mb-4">
                      <p className="text-slate-300 mb-2">{result.base}<sup>{result.exponent}</sup> =</p>
                      <p className="text-3xl font-bold text-primary break-all">{result.result}</p>
                    </div>
                  </div>
                )}
              </CardFooter>
            )}
          </Card>
          
          {result && !result.error && (
            <ShareResults
              title="Exponent Calculation"
              text={`I calculated ${result.base}^${result.exponent} on Calczoon and got ${result.result}!`}
              url="https://calczoon.com/math/exponent-calculator"
            />
          )}

          <Card className="bg-slate-800/50 border-slate-700 mt-8">
            <CardHeader><h2 className="text-2xl font-bold text-primary">Understanding Exponents</h2></CardHeader>
            <CardContent className="space-y-4 text-slate-300">
                <p>Exponents, or powers, are a mathematical shorthand for repeated multiplication. The exponent of a number indicates how many times to use that number in a multiplication. It's written as a small number to the right and above the base number.</p>
                <h3 className="text-xl font-semibold text-white">How it Works</h3>
                <p>For example, <strong>5³</strong> means multiplying 5 by itself three times (5 x 5 x 5), which equals 125. Our calculator can handle integers, decimals, and even negative exponents.</p>
                <p>The <strong className="text-white">negative exponent rule</strong> states that a number raised to a negative power is equal to the reciprocal of the number raised to the positive power. For example, <strong>2⁻³ = 1/2³ = 1/8 = 0.125</strong>.</p>
                <p>This calculator is a great tool for students learning algebra, scientists working with scientific notation, or anyone needing to quickly compute powers. For other math problems, check out our <Link to="/math/percentage-calculator" className="text-primary hover:underline">Percentage Calculator</Link> or <Link to="/math/fraction-calculator" className="text-primary hover:underline">Fraction Calculator</Link>.</p>
            </CardContent>
          </Card>

          <Faq items={faqItems} className="mt-8"/>
          <Disclaimer text="This calculator is intended for educational and informational purposes. While we strive for accuracy, always double-check critical calculations."/>
        </div>
    </>
  );
};

export default ExponentCalculator;
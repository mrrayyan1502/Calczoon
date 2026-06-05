import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { saveCalculation } from '@/lib/history';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import { Divide } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';

const FractionCalculator = () => {
  const [num1, setNum1] = useState('');
  const [den1, setDen1] = useState('');
  const [num2, setNum2] = useState('');
  const [den2, setDen2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

  const simplifyFraction = (numerator, denominator) => {
    if (denominator === 0) return { num: numerator, den: denominator };
    const commonDivisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return { num: numerator / commonDivisor, den: denominator / commonDivisor };
  };

  const calculateFraction = (e) => {
    e.preventDefault();
    const n1 = parseInt(num1);
    const d1 = parseInt(den1);
    const n2 = parseInt(num2);
    const d2 = parseInt(den2);

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
      setResult({ error: "Please enter valid integers. Denominators cannot be zero." });
      return;
    }

    let resultNum, resultDen;
    switch (operation) {
      case 'add': resultNum = n1 * d2 + n2 * d1; resultDen = d1 * d2; break;
      case 'subtract': resultNum = n1 * d2 - n2 * d1; resultDen = d1 * d2; break;
      case 'multiply': resultNum = n1 * n2; resultDen = d1 * d2; break;
      case 'divide':
        if (n2 === 0) { setResult({ error: "Cannot divide by a zero fraction." }); return; }
        resultNum = n1 * d2; resultDen = d1 * n2; break;
      default: return;
    }
    
    if (resultDen < 0) {
        resultNum = -resultNum;
        resultDen = -resultDen;
    }

    const simplified = simplifyFraction(resultNum, resultDen);
    const decimal = simplified.den !== 0 ? simplified.num / simplified.den : "Undefined";
    const newResult = {
      numerator: simplified.num,
      denominator: simplified.den,
      decimal: typeof decimal === 'number' ? decimal.toFixed(4) : decimal,
      operation: operation
    };
    setResult(newResult);
    saveCalculation({ type: 'Fraction', inputs: { num1, den1, num2, den2, operation }, result: { Result: `${newResult.numerator}/${newResult.denominator}` } });
  };
  
  const resetForm = () => {
    setNum1(''); setDen1(''); setNum2(''); setDen2(''); setOperation('add'); setResult(null);
  };

  const operationSymbols = { add: '+', subtract: '-', multiply: '×', divide: '÷' };

  const faqItems = [
    { question: "How do you add fractions?", answer: "To add fractions with different denominators, you first find a common denominator. Then, you convert each fraction to have this common denominator and add the numerators. Our calculator does this for you automatically." },
    { question: "What is an improper fraction?", answer: "An improper fraction is one where the numerator is greater than or equal to the denominator, such as 5/4. Our calculator provides results in their simplest form, which may be an improper fraction." },
    { question: "How do I convert a fraction to a decimal?", answer: "To convert a fraction to a decimal, you simply divide the numerator (the top number) by the denominator (the bottom number). For example, 3/4 is 3 divided by 4, which equals 0.75."}
  ];
  
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Fraction Calculator",
    "description": "Solve fraction problems easily with our free Fraction Calculator. Supports all basic fraction operations: addition, subtraction, multiplication, and division.",
    "applicationCategory": "EducationalTool",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/math/fraction-calculator",
    "browserRequirements": "Requires a modern web browser."
  };

  return (
    <>
      <Seo
        title="Fraction Calculator | Add, Subtract, Multiply & Divide"
        description="Solve fraction problems easily with our free Fraction Calculator. Supports all basic fraction operations and provides step-by-step solutions."
        canonicalUrl="/math/fraction-calculator"
        schema={[webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }]}
      />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title="Fraction Calculator" description="Perform calculations with fractions effortlessly. This tool handles addition, subtraction, multiplication, and division, simplifying the result for you." icon={Divide}/>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle>Fraction Operations</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={calculateFraction} className="space-y-6">
                    <div className="flex items-center justify-center space-x-4">
                        <div className="flex flex-col items-center space-y-1">
                            <Label htmlFor="num1">Numerator 1</Label>
                            <Input id="num1" type="number" value={num1} onChange={(e) => setNum1(e.target.value)} placeholder="e.g., 1" required className="bg-slate-900 border-slate-700 w-24 text-center" />
                            <div className="h-px w-24 bg-slate-500 my-1"></div>
                            <Label htmlFor="den1">Denominator 1</Label>
                            <Input id="den1" type="number" value={den1} onChange={(e) => setDen1(e.target.value)} placeholder="e.g., 2" required className="bg-slate-900 border-slate-700 w-24 text-center" />
                        </div>

                        <div className="flex-shrink-0">
                            <select value={operation} onChange={(e) => setOperation(e.target.value)} className="text-3xl font-bold bg-slate-800 text-white p-2 rounded-md border-slate-700">
                                <option value="add">+</option>
                                <option value="subtract">-</option>
                                <option value="multiply">×</option>
                                <option value="divide">÷</option>
                            </select>
                        </div>
                        
                        <div className="flex flex-col items-center space-y-1">
                            <Label htmlFor="num2">Numerator 2</Label>
                            <Input id="num2" type="number" value={num2} onChange={(e) => setNum2(e.target.value)} placeholder="e.g., 3" required className="bg-slate-900 border-slate-700 w-24 text-center" />
                            <div className="h-px w-24 bg-slate-500 my-1"></div>
                            <Label htmlFor="den2">Denominator 2</Label>
                            <Input id="den2" type="number" value={den2} onChange={(e) => setDen2(e.target.value)} placeholder="e.g., 4" required className="bg-slate-900 border-slate-700 w-24 text-center" />
                        </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate</Button>
                      <Button type="button" variant="secondary" onClick={resetForm} className="h-12">Reset</Button>
                    </div>
                  </form>
                </CardContent>
                {result && (
                  <CardFooter className="flex flex-col items-center justify-center mt-6 p-6 bg-slate-800 rounded-b-lg">
                    {result.error ? (<p className="text-destructive text-center w-full">{result.error}</p>) : (
                      <div className="w-full text-center">
                        <h2 className="text-lg font-semibold text-slate-100 mb-2">Result:</h2>
                        <p className="text-slate-300 mb-2">{num1}/{den1} {operationSymbols[result.operation]} {num2}/{den2} =</p>
                        <p className="text-4xl font-bold text-primary">{result.numerator} / {result.denominator}</p>
                        <p className="text-slate-300 mt-2">Decimal: {result.decimal}</p>
                         <div className="mt-4">
                            <ShareResults
                              title="Fraction Calculation"
                              text={`I solved ${num1}/${den1} ${operationSymbols[result.operation]} ${num2}/${den2} on Calczoon and the answer is ${result.numerator}/${result.denominator}!`}
                              url="https://calczoon.com/math/fraction-calculator"
                            />
                        </div>
                      </div>
                    )}
                  </CardFooter>
                )}
              </Card>
            </div>
            <aside className="lg:col-span-1 space-y-6">
                 <RelatedTools />
            </aside>
          </div>
          
          <Faq items={faqItems} className="mt-8"/>
          <Disclaimer text="This calculator is for educational purposes. Always double-check results for critical applications."/>
      </div>
    </>
  );
};

export default FractionCalculator;
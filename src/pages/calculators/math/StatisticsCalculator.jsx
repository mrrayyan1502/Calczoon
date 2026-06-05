import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { saveCalculation } from '@/lib/history';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';
import { BarChart2 } from 'lucide-react';
import RelatedTools from '@/components/calculators/tdee/RelatedTools';

const StatisticsCalculator = () => {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState(null);

  const calculateStatistics = (e) => {
    e.preventDefault();
    if (!numbers.trim()) {
      setResult({ error: "Please enter a data set." });
      return;
    }

    const numArray = numbers.split(/[,\s]+/).map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
    if (numArray.length === 0) {
      setResult({ error: "The data set contains no valid numbers. Please enter numbers separated by commas or spaces." });
      return;
    }

    const sortedArray = [...numArray].sort((a, b) => a - b);
    const n = numArray.length;
    const sum = numArray.reduce((acc, num) => acc + num, 0);
    const mean = sum / n;
    
    let median;
    if (n % 2 === 0) {
      const mid1 = sortedArray[n / 2 - 1];
      const mid2 = sortedArray[n / 2];
      median = (mid1 + mid2) / 2;
    } else {
      median = sortedArray[Math.floor(n / 2)];
    }
    
    const frequencyMap = {};
    numArray.forEach(num => { frequencyMap[num] = (frequencyMap[num] || 0) + 1; });
    let maxFreq = 0;
    for (const key in frequencyMap) {
        if (frequencyMap[key] > maxFreq) {
            maxFreq = frequencyMap[key];
        }
    }
    
    const modes = [];
    if (maxFreq > 1) {
        for (const key in frequencyMap) {
            if (frequencyMap[key] === maxFreq) {
                modes.push(parseFloat(key));
            }
        }
    }
    
    const range = sortedArray[n - 1] - sortedArray[0];
    const variance = numArray.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / n;
    const standardDeviation = Math.sqrt(variance);

    const newResult = {
      count: n,
      sum: sum,
      mean: mean,
      median: median,
      mode: modes.length > 0 && modes.length < n ? modes.join(', ') : 'No unique mode',
      range: range,
      standardDeviation: standardDeviation,
      min: sortedArray[0],
      max: sortedArray[n - 1]
    };
    setResult(newResult);
    saveCalculation({ type: 'Statistics', inputs: { numbers }, result: { Mean: newResult.mean.toFixed(2), Median: newResult.median.toFixed(2), Mode: newResult.mode } });
  };

  const resetForm = () => {
    setNumbers('');
    setResult(null);
  };
  
  const pageTitle = "Statistics Calculator - Mean, Median, Mode & Standard Deviation";
  const pageDescription = "Free statistics solver. Enter your data set to instantly calculate the Mean, Median, Mode, Range, and Standard Deviation. Perfect for students.";
  const canonicalUrl = "/math/statistics-calculator";

  const faqItems = [
    { question: "What is the difference between mean, median, and mode?", answer: "The mean is the average of all numbers. The median is the middle value in a sorted list of numbers. The mode is the number that appears most frequently. They are all measures of central tendency but can give different pictures of the data." },
    { question: "What does standard deviation tell me?", answer: "Standard deviation measures how spread out the numbers in a data set are from the mean. A low standard deviation means the numbers are close to the average, while a high standard deviation indicates that the numbers are spread out over a wider range." },
    { question: "When would I use the median instead of the mean?", answer: "The median is often a better measure of central tendency than the mean when your data set has outliers (extremely high or low values). The mean can be skewed by these outliers, while the median is not affected by them." }
  ];
  
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Statistics Calculator",
    "description": "Calculate mean, median, mode, variance, and standard deviation for a set of numbers. A quick and easy tool for statistical analysis.",
    "applicationCategory": "EducationalTool",
    "operatingSystem": "Any",
    "url": `https://calczoon.com${canonicalUrl}`,
    "browserRequirements": "Requires a modern web browser."
  };

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        schema={[webAppSchema, { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }]}
      />
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title="Statistics Calculator" description="Instantly analyze a data set to find the mean, median, mode, range, and standard deviation. Perfect for students and analysts." icon={BarChart2} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle>Enter Your Data Set</CardTitle>
                    <CardDescription>
                      Enter a list of numbers separated by commas or spaces.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={calculateStatistics} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="numbers">Data (comma or space separated)</Label>
                        <Textarea id="numbers" value={numbers} onChange={(e) => setNumbers(e.target.value)} placeholder="e.g., 4, 8, 6, 5, 3, 8" required className="bg-slate-900 border-slate-700 min-h-[100px]"/>
                      </div>
                      <div className="flex gap-4">
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Calculate Statistics</Button>
                        <Button type="button" variant="secondary" onClick={resetForm}>Reset</Button>
                      </div>
                    </form>
                  </CardContent>
                  {result && (
                    <CardFooter className="flex flex-col items-start mt-6 p-6 bg-slate-800 rounded-b-lg">
                      {result.error ? ( <p className="text-destructive text-center w-full">{result.error}</p> ) : (
                        <div className="w-full space-y-4">
                          <h2 className="text-xl font-bold text-slate-100">Statistical Results:</h2>
                          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm md:text-base">
                              <div><span className="text-slate-300">Count:</span><span className="font-bold text-slate-100 float-right">{result.count}</span></div>
                              <div><span className="text-slate-300">Sum:</span><span className="font-bold text-slate-100 float-right">{result.sum.toLocaleString()}</span></div>
                              <div className="bg-slate-700/50 -mx-4 px-4 py-1 rounded-md"><span className="text-slate-300">Mean:</span><span className="font-bold text-primary float-right">{result.mean.toFixed(4)}</span></div>
                              <div className="bg-slate-700/50 -mx-4 px-4 py-1 rounded-md"><span className="text-slate-300">Median:</span><span className="font-bold text-primary float-right">{result.median.toLocaleString()}</span></div>
                              <div className="col-span-2"><span className="text-slate-300">Mode:</span><span className="font-bold text-primary float-right">{result.mode}</span></div>
                              <div><span className="text-slate-300">Range:</span><span className="font-bold text-slate-100 float-right">{result.range.toLocaleString()}</span></div>
                              <div><span className="text-slate-300">Standard Deviation:</span><span className="font-bold text-slate-100 float-right">{result.standardDeviation.toFixed(4)}</span></div>
                          </div>
                          <div className="pt-4 w-full">
                            <ShareResults
                              title="Statistics Calculation"
                              text={`I analyzed a data set on Calczoon! Mean: ${result.mean.toFixed(2)}, Median: ${result.median.toLocaleString()}, Mode: ${result.mode}.`}
                              url={`https://calczoon.com${canonicalUrl}`}
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
        
        <Card className="bg-slate-800/50 border-slate-700 mt-8">
            <CardHeader><h2 className="text-2xl font-bold text-primary">Understanding the Key Statistical Terms</h2></CardHeader>
            <CardContent className="space-y-6 text-slate-300">
                <p>This statistics calculator helps you understand your data by computing several key measures of central tendency and dispersion. Here's what they mean:</p>
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Understanding the Terms</h3>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li><strong>Mean:</strong> The average of all numbers in the dataset. It's calculated by summing all numbers and dividing by the count of numbers.</li>
                        <li><strong>Median:</strong> The middle value in a dataset that has been arranged in order. If there is an even number of values, the median is the average of the two middle numbers. It's less affected by unusually high or low values (outliers).</li>
                        <li><strong>Mode:</strong> The number that appears most frequently in a data set. A data set may have one mode, more than one mode, or no mode at all.</li>
                        <li><strong>Range:</strong> The difference between the highest and lowest values in the data set. It gives a simple measure of how spread out the data is.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Standard Deviation Explained</h3>
                    <p>Standard Deviation is a measure of how spread out the numbers in your data set are. A low standard deviation means that most of the numbers are close to the average (mean). A high standard deviation means that the numbers are more spread out.</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Example Calculation</h3>
                    <p>For the data set: <strong>4, 8, 6, 5, 3</strong></p>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                        <li><strong>Mean:</strong> (4 + 8 + 6 + 5 + 3) / 5 = 26 / 5 = <strong>5.2</strong></li>
                        <li><strong>Median:</strong> First, sort the numbers: 3, 4, <strong>5</strong>, 6, 8. The middle number is <strong>5</strong>.</li>
                        <li><strong>Mode:</strong> No number repeats, so there is no mode.</li>
                        <li><strong>Range:</strong> The highest value is 8 and the lowest is 3. So, the range is 8 - 3 = <strong>5</strong>.</li>
                    </ul>
                </div>
            </CardContent>
        </Card>

        <Faq items={faqItems} className="mt-8"/>
        <Disclaimer text="This calculator is intended for educational purposes. For critical applications, please consult with a professional statistician."/>
      </div>
    </>
  );
};

export default StatisticsCalculator;
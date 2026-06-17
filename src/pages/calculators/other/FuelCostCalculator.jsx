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

const FuelCostCalculator = () => {
  const [distance, setDistance] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('miles');
  const [efficiencyUnit, setEfficiencyUnit] = useState('mpg');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => (currency === 'USD' ? '$' : '£');

  const calculateFuelCost = (e) => {
    e.preventDefault();
    const d = parseFloat(distance);
    const fe = parseFloat(fuelEfficiency);
    const fp = parseFloat(fuelPrice);

    if (isNaN(d) || isNaN(fe) || isNaN(fp) || d <= 0 || fe <= 0 || fp <= 0) {
      setResult({ error: "Please enter valid positive numbers for all fields." });
      return;
    }

    let litersNeeded;
    let distanceInKm = distanceUnit === 'miles' ? d * 1.60934 : d;
    let efficiencyInLp100km;
    
    if (efficiencyUnit === 'mpg') {
      efficiencyInLp100km = 235.215 / fe;
    } else { // l/100km
      efficiencyInLp100km = fe;
    }

    litersNeeded = (distanceInKm / 100) * efficiencyInLp100km;

    let pricePerLiter = fp;
    if (efficiencyUnit === 'mpg') { // price was given per gallon
      pricePerLiter = fp / 3.78541;
    }

    const totalCost = litersNeeded * pricePerLiter;
    
    const newResult = {
      totalCost: totalCost.toFixed(2),
      fuelNeeded: `${litersNeeded.toFixed(2)} liters (${(litersNeeded * 0.264172).toFixed(2)} gallons)`,
    };
    setResult(newResult);
    saveCalculation({
      type: 'Fuel Cost',
      inputs: { distance, fuelEfficiency, fuelPrice, distanceUnit, efficiencyUnit, currency },
      result: { Cost: `${getCurrencySymbol()}${newResult.totalCost}` }
    });
  };
  
  const resetForm = () => {
    setDistance('');
    setFuelEfficiency('');
    setFuelPrice('');
    setResult(null);
  };

  const faqItems = [
    { question: "How accurate is this fuel cost calculator?", answer: "This calculator provides an estimate based on your inputs. Actual fuel costs may vary due to traffic, driving style, road conditions, and changes in fuel prices during your trip." },
    { question: "What does MPG mean?", answer: "MPG stands for Miles Per Gallon, a common measure of fuel efficiency in countries like the US and UK. It indicates how many miles your vehicle can travel per gallon of fuel." },
    { question: "What does L/100km mean?", answer: "L/100km stands for Liters per 100 kilometers, a common measure of fuel efficiency in many European and other countries. It indicates how many liters of fuel your vehicle consumes to travel 100 kilometers." },
    { question: "How can I improve my car's fuel efficiency?", answer: "To improve fuel efficiency, ensure your tires are properly inflated, avoid aggressive driving (hard acceleration and braking), reduce excess weight in your vehicle, and perform regular maintenance like oil changes and air filter replacements." }
  ];

  return (
    <>
      <Seo
        title="Fuel Cost Calculator – Estimate Trip Gas Expenses Instantly"
        description="Plan your road trip budget with our free fuel cost calculator. Enter distance, fuel efficiency and price per litre to get accurate petrol or diesel cost estimates. Works with MPG and L/100km."
        canonicalUrl="/lifestyle/fuel-cost-calculator"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Fuel Cost Calculator",
          "url": "https://calczoon.com/lifestyle/fuel-cost-calculator",
          "description": "Free fuel cost calculator to estimate petrol and diesel expenses for road trips and commutes.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        }} />
      <div className="max-w-4xl mx-auto py-8 px-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <h1 className="text-3xl md:text-4xl font-bold text-center text-primary">Road Trip Fuel Cost Calculator</h1>
              <CardDescription className="text-center text-slate-300">
                Planning a journey? Estimate your fuel expenses with our easy-to-use calculator. Simply input your trip details to get a clear idea of your expected fuel costs, helping you budget more effectively for your travels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateFuelCost} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="distance">Trip Distance</Label>
                    <div className="flex items-center">
                        <Input id="distance" type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="e.g., 500" required className="bg-slate-900 border-slate-700 rounded-r-none" />
                        <select value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value)} className="p-2 bg-slate-700 border-l-0 border border-slate-700 rounded-r-md text-white h-10">
                          <option value="miles">Miles</option>
                          <option value="km">Kilometers</option>
                        </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelEfficiency">Vehicle Fuel Efficiency</Label>
                    <div className="flex items-center">
                        <Input id="fuelEfficiency" type="number" value={fuelEfficiency} onChange={(e) => setFuelEfficiency(e.target.value)} placeholder="e.g., 30" required className="bg-slate-900 border-slate-700 rounded-r-none" />
                        <select value={efficiencyUnit} onChange={(e) => setEfficiencyUnit(e.target.value)} className="p-2 bg-slate-700 border-l-0 border border-slate-700 rounded-r-md text-white h-10">
                          <option value="mpg">MPG</option>
                          <option value="l/100km">L/100km</option>
                        </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuelPrice">Gas/Fuel Price</Label>
                  <div className="flex items-center">
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="p-2 bg-slate-700 border-r-0 border border-slate-700 rounded-l-md text-white h-10">
                      <option value="USD">$ (USD)</option>
                      <option value="GBP">£ (GBP)</option>
                    </select>
                    <Input id="fuelPrice" type="number" value={fuelPrice} onChange={(e) => setFuelPrice(e.target.value)} placeholder="e.g., 3.50" required className="bg-slate-900 border-slate-700 rounded-none" step="0.01" />
                    <span className="p-2 bg-slate-700 border border-l-0 border-slate-700 rounded-r-md text-white h-10">per {efficiencyUnit === 'mpg' ? 'Gallon' : 'Liter'}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-base">Calculate Cost</Button>
                    <Button type="button" variant="secondary" onClick={resetForm} className="h-12">Reset</Button>
                </div>
              </form>
            </CardContent>
            {result && !result.error && (
              <CardFooter className="flex flex-col items-center mt-6 p-6 bg-slate-800 rounded-b-lg">
                  <h2 className="text-xl font-bold text-white mb-4">Trip Cost Estimate</h2>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                      <div className="p-4 bg-slate-700/50 rounded-lg">
                          <p className="text-slate-300 text-sm">Total Fuel Needed</p>
                          <p className="text-3xl font-bold text-primary">{result.fuelNeeded}</p>
                      </div>
                      <div className="p-4 bg-slate-700/50 rounded-lg">
                          <p className="text-slate-300 text-sm">Total Estimated Cost</p>
                          <p className="text-3xl font-bold text-primary">{getCurrencySymbol()}{result.totalCost}</p>
                      </div>
                  </div>
                 <div className="mt-6 w-full">
                    <ShareResults
                      title="My Trip Fuel Cost"
                      text={`My estimated fuel cost for the trip is ${getCurrencySymbol()}${result.totalCost}! Calculated with Calczoon.`}
                      url="https://calczoon.com/lifestyle/fuel-cost-calculator"
                    />
                 </div>
              </CardFooter>
            )}
             {result && result.error && (
              <CardFooter className="p-4 bg-red-900/20 rounded-b-lg mt-4">
                <p className="text-red-400 text-center w-full">{result.error}</p>
              </CardFooter>
            )}
          </Card>
          <Faq items={faqItems} className="mt-8"/>
          <Disclaimer text="This calculator provides an estimate for planning purposes. Actual costs may vary based on driving conditions, vehicle maintenance, and fluctuations in fuel prices." />
      </div>
    </>
  );
};

export default FuelCostCalculator;
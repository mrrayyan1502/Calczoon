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
import { Fuel, BookOpen, CheckCircle, HelpCircle, ArrowRight, Gauge, Car } from 'lucide-react';

const FuelCostCalculator = () => {
  const [distance, setDistance] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [distanceUnit, setDistanceUnit] = useState('miles');
  const [efficiencyUnit, setEfficiencyUnit] = useState('mpg');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };

  const calculateFuelCost = (e) => {
    e.preventDefault();
    const d = parseFloat(distance);
    const fe = parseFloat(fuelEfficiency);
    const fp = parseFloat(fuelPrice);
    const numPassengers = parseInt(passengers, 10) || 1;

    if (isNaN(d) || isNaN(fe) || isNaN(fp) || d <= 0 || fe <= 0 || fp <= 0 || numPassengers < 1) {
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
    if (efficiencyUnit === 'mpg') { // price was entered per gallon
      pricePerLiter = fp / 3.78541;
    }

    const totalCost = litersNeeded * pricePerLiter;
    const costPerPerson = totalCost / numPassengers;
    const gallonsNeeded = litersNeeded * 0.264172;
    
    const newResult = {
      totalCost: totalCost.toFixed(2),
      costPerPerson: costPerPerson.toFixed(2),
      fuelNeededLiters: litersNeeded.toFixed(2),
      fuelNeededGallons: gallonsNeeded.toFixed(2),
    };
    
    setResult(newResult);
    saveCalculation({
      type: 'Fuel Cost',
      inputs: { distance, fuelEfficiency, fuelPrice, distanceUnit, efficiencyUnit, currency, passengers },
      result: { TotalCost: `${getCurrencySymbol()}${newResult.totalCost}`, CostPerPerson: `${getCurrencySymbol()}${newResult.costPerPerson}` }
    });
  };
  
  const resetForm = () => {
    setDistance('');
    setFuelEfficiency('');
    setFuelPrice('');
    setPassengers('1');
    setResult(null);
  };

  const faqItems = [
    {
      question: "How do you calculate fuel cost for a road trip?",
      answer: "To calculate total trip fuel cost using imperial units, divide your total trip distance (in miles) by your vehicle's fuel efficiency rating (MPG) to determine gallons consumed, then multiply by the gas price per gallon: Total Cost = (Distance / MPG) * Price per Gallon. In metric units: Total Cost = (Distance in km / 100) * (L/100km) * Price per Liter."
    },
    {
      question: "What is the difference between US MPG and UK Imperial MPG?",
      answer: "A US gallon is 3.785 liters, whereas a British Imperial gallon is 4.546 liters (approximately 20% larger). Consequently, a car that achieves 30 US MPG achieves approximately 36 Imperial MPG in the UK. When reviewing European car reviews, ensure you convert between US and UK gallons to avoid underestimating fuel consumption."
    },
    {
      question: "How do I convert between MPG and Liters per 100 Kilometers (L/100km)?",
      answer: "Because MPG measures distance per volume while L/100km measures volume per fixed distance, the relationship is an inverse formula: L/100km = 235.215 / US MPG. For example, a vehicle rated at 30 US MPG consumes: 235.215 / 30 = 7.84 L/100km. Conversely: US MPG = 235.215 / (L/100km)."
    },
    {
      question: "Does highway driving achieve better fuel economy than city stop-and-go driving?",
      answer: "Yes, internal combustion engine vehicles achieve 15% to 30% superior fuel economy on flat highway cruising compared to city driving. Frequent braking and idling waste kinetic energy as brake heat, while highway cruising allows engines to operate in high overdrive gears at optimal thermal efficiency."
    },
    {
      question: "How much does vehicle air conditioning or carrying rooftop cargo penalize gas mileage?",
      answer: "Running air conditioning at maximum blast in warm weather reduces fuel economy by 5% to 15%. Roof-mounted cargo boxes, bike racks, or open windows at highway speeds dramatically increase aerodynamic drag (Cd), which can penalize fuel efficiency by 10% to 25% at speeds exceeding 65 mph (105 km/h)."
    },
    {
      question: "How can I divide fuel expenses fairly among carpool companions?",
      answer: "Enter the number of travelers into the passengers field of our calculator. The engine divides total gas cost evenly among all riders. For multi-day road trips, it is customary to split fuel, highway tolls, and parking passes equally while the vehicle owner provides the automobile."
    }
  ];

  const pageTitle = "Fuel Cost Calculator: Road Trip Gas Price & Mileage 2026";
  const pageDescription = "Calculate road trip fuel costs, gas consumption, and cost per passenger across miles or kilometers. Supports MPG and L/100km with real-world worked formulas.";

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon Fuel Cost Calculator",
    "applicationCategory": "TravelApplication",
    "operatingSystem": "Any",
    "url": "https://calczoon.com/lifestyle/fuel-cost-calculator",
    "description": "Accurate road trip gas calculator supporting MPG, L/100km, multi-passenger cost splitting, and currency conversion."
  };

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="/lifestyle/fuel-cost-calculator"
        schema={[appSchema, {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": { "@type": "Answer", text: item.answer }
          }))
        }]}
      />

      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <PageHeader title={pageTitle} description={pageDescription} icon={Fuel} />

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/40 backdrop-blur-md border-slate-700/60 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-800/20 border-b border-slate-700/30">
                <CardTitle className="text-white">Trip Fuel & Gas Estimator</CardTitle>
                <CardDescription>Enter travel distance, vehicle fuel economy, and gas station prices</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={calculateFuelCost} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="distance" className="text-slate-300 font-medium">Trip Distance</Label>
                      <div className="flex items-center">
                        <Input
                          id="distance"
                          type="number"
                          value={distance}
                          onChange={(e) => setDistance(e.target.value)}
                          placeholder="e.g., 450"
                          required
                          step="any"
                          className="bg-slate-900 border-slate-700 rounded-r-none text-white focus:ring-emerald-500"
                        />
                        <select
                          value={distanceUnit}
                          onChange={(e) => setDistanceUnit(e.target.value)}
                          className="p-2 bg-slate-800 border border-slate-700 rounded-r-xl text-white h-10 text-sm focus:outline-none"
                        >
                          <option value="miles">Miles</option>
                          <option value="km">Kilometers</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fuelEfficiency" className="text-slate-300 font-medium">Vehicle Fuel Efficiency</Label>
                      <div className="flex items-center">
                        <Input
                          id="fuelEfficiency"
                          type="number"
                          value={fuelEfficiency}
                          onChange={(e) => setFuelEfficiency(e.target.value)}
                          placeholder="e.g., 28"
                          required
                          step="any"
                          className="bg-slate-900 border-slate-700 rounded-r-none text-white focus:ring-emerald-500"
                        />
                        <select
                          value={efficiencyUnit}
                          onChange={(e) => setEfficiencyUnit(e.target.value)}
                          className="p-2 bg-slate-800 border border-slate-700 rounded-r-xl text-white h-10 text-sm focus:outline-none"
                        >
                          <option value="mpg">MPG (US)</option>
                          <option value="l/100km">L/100km</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fuelPrice" className="text-slate-300 font-medium">Gas / Petrol Price</Label>
                      <div className="flex items-center">
                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="p-2 bg-slate-800 border border-slate-700 rounded-l-xl text-white h-10 text-sm focus:outline-none"
                        >
                          <option value="USD">$ (USD)</option>
                          <option value="GBP">£ (GBP)</option>
                          <option value="EUR">€ (EUR)</option>
                        </select>
                        <Input
                          id="fuelPrice"
                          type="number"
                          value={fuelPrice}
                          onChange={(e) => setFuelPrice(e.target.value)}
                          placeholder="e.g., 3.65"
                          required
                          step="0.01"
                          className="bg-slate-900 border-slate-700 rounded-none text-white focus:ring-emerald-500"
                        />
                        <span className="p-2 bg-slate-800 border border-slate-700 rounded-r-xl text-slate-300 h-10 text-xs flex items-center whitespace-nowrap">
                          per {efficiencyUnit === 'mpg' ? 'Gal' : 'L'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passengers" className="text-slate-300 font-medium">Passengers Sharing Cost</Label>
                      <Input
                        id="passengers"
                        type="number"
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        placeholder="1"
                        min="1"
                        className="bg-slate-900 border-slate-700 text-white rounded-xl focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                    >
                      Calculate Fuel Cost
                    </Button>
                    <Button type="button" variant="secondary" onClick={resetForm} className="h-12 rounded-xl">
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>

              {result && !result.error && (
                <CardFooter className="flex flex-col items-start p-6 bg-slate-800/30 border-t border-slate-700/40">
                  <div className="w-full space-y-4">
                    <h3 className="text-lg font-bold text-slate-300">Trip Cost Breakdown</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="text-center bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                        <p className="text-slate-300 text-sm font-medium">Total Trip Fuel Cost</p>
                        <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
                          {getCurrencySymbol()}{result.totalCost}
                        </p>
                      </div>

                      <div className="text-center bg-slate-900/60 p-6 rounded-2xl border border-emerald-900/50">
                        <p className="text-slate-300 text-sm font-medium">Cost Per Person</p>
                        <p className="text-3xl font-extrabold text-emerald-400">
                          {getCurrencySymbol()}{result.costPerPerson}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 flex justify-between items-center text-sm">
                        <span className="text-slate-400">Total Fuel (Liters)</span>
                        <span className="font-semibold text-slate-200">{result.fuelNeededLiters} L</span>
                      </div>
                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 flex justify-between items-center text-sm">
                        <span className="text-slate-400">Total Fuel (Gallons)</span>
                        <span className="font-semibold text-slate-200">{result.fuelNeededGallons} Gal</span>
                      </div>
                    </div>

                    <ShareResults
                      title="Road Trip Fuel Cost"
                      text={`Estimated fuel expense for my trip is ${getCurrencySymbol()}${result.totalCost} (${getCurrencySymbol()}${result.costPerPerson} per person)! Calculated via CalcZoon.`}
                      url="/lifestyle/fuel-cost-calculator"
                    />
                  </div>
                </CardFooter>
              )}

              {result && result.error && (
                <CardFooter className="p-6 bg-slate-800/30 border-t border-slate-700/40 text-center">
                  <p className="text-destructive text-center w-full">{result.error}</p>
                </CardFooter>
              )}
            </Card>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-emerald-400" /> Fuel Economy Benchmarks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-300 font-mono">
                <div className="pb-2 border-b border-slate-700/60">
                  <p className="text-emerald-400 font-bold">Compact Sedans / Hybrids:</p>
                  <p className="text-slate-300 mt-0.5">38–55 MPG (4.3–6.2 L/100km)</p>
                </div>
                <div className="pb-2 border-b border-slate-700/60">
                  <p className="text-sky-400 font-bold">Midsize Crossover / SUV:</p>
                  <p className="text-slate-300 mt-0.5">24–32 MPG (7.4–9.8 L/100km)</p>
                </div>
                <div>
                  <p className="text-amber-400 font-bold">Full-Size Truck / Van:</p>
                  <p className="text-slate-300 mt-0.5">15–20 MPG (11.8–15.7 L/100km)</p>
                </div>
              </CardContent>
            </Card>
            <RelatedTools category="lifestyle" />
          </aside>
        </div>

        {/* 7-Section Comprehensive Educational Guide (>1,200 words) */}
        <section className="mt-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8 md:p-10 text-slate-300 leading-relaxed max-w-5xl mx-auto space-y-10 mb-12">
          {/* Section 1: What is a Fuel Cost Calculator */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Car className="text-emerald-400 w-7 h-7" /> What is a Fuel Cost Calculator & Road Trip Economics
            </h2>
            <p className="text-base md:text-lg">
              A <strong>fuel cost calculator</strong> is a practical transportation and budgeting tool engineered to model vehicle fuel consumption and forecast aggregate gas expenditures for road trips, commercial freight hauls, and daily highway commutes. Transportation expenses constitute one of the largest variable costs in domestic travel and small business logistics.
            </p>
            <p>
              Vehicle fuel consumption is not a static quantity; it fluctuates based on engine displacement, aerodynamic drag coefficients, driving velocity, vehicular cargo mass, and prevailing road topography. By factoring in exact travel mileage, real-world fuel economy figures, and current retail petroleum pricing, travelers can accurately budget fuel allowances, eliminate mid-journey financial surprises, and equitably apportion travel expenses among carpool companions.
            </p>
          </div>

          {/* Section 2: Mathematical Fuel Formulas & Unit Conversions */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Mathematical Fuel Formulas & Global Unit Conversions
            </h2>
            <p>
              Depending on the geographic region, fuel efficiency is expressed either as distance traversed per volume unit (Miles Per Gallon) or as volume consumed per fixed distance (Liters per 100 Kilometers):
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-4 font-mono text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-emerald-800/40 space-y-2">
                <p className="text-emerald-400 font-bold uppercase tracking-wider">Formula 1: Imperial / US Gallon Cost</p>
                <p className="text-white text-sm font-semibold">Total Cost = (Distance in Miles ÷ MPG) × Price/Gallon</p>
                <p className="text-slate-400">Standard calculation across the United States, Puerto Rico, and highway travel.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-sky-800/40 space-y-2">
                <p className="text-sky-400 font-bold uppercase tracking-wider">Formula 2: Metric (L/100km) Cost</p>
                <p className="text-white text-sm font-semibold">Total Cost = (Distance in km ÷ 100) × (L/100km) × Price/Liter</p>
                <p className="text-slate-400">Standard across the European Union, Canada, Australia, Asia, and Latin America.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-amber-800/40 space-y-2">
                <p className="text-amber-400 font-bold uppercase tracking-wider">Formula 3: MPG to L/100km Reciprocal Axiom</p>
                <p className="text-white text-sm font-semibold">L/100km = 235.215 ÷ US MPG</p>
                <p className="text-slate-400">Derived from: (100 km / 1.60934 km/mi) × (3.78541 L / Gal) = 235.215.</p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-purple-800/40 space-y-2">
                <p className="text-purple-400 font-bold uppercase tracking-wider">Formula 4: Per-Passenger Apportionment</p>
                <p className="text-white text-sm font-semibold">Individual Share = Total Trip Cost ÷ Passengers (N)</p>
                <p className="text-slate-400">Provides fair per-person splitting for family vacations and commuter carpools.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Step-by-Step Practical Usage Guide */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Step-by-Step Guide: How to Budget Your Road Trip Fuel
            </h2>
            <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-300 text-sm md:text-base">
              <li>
                <strong className="text-white">Estimate Total Mileage:</strong> Use GPS mapping to determine total travel distance. Remember to double the mileage for round-trip vacations, and add a 5% to 10% buffer for local city sightseeing, grocery detours, and scenic diversions.
              </li>
              <li>
                <strong className="text-white">Determine Your Real-World Fuel Economy:</strong> Check your vehicle dashboard&apos;s trip computer or look up your vehicle&apos;s combined highway/city EPA rating. For heavily loaded vehicles, reduce the manufacturer rating by 10%.
              </li>
              <li>
                <strong className="text-white">Input Current Fuel Prices:</strong> Enter prevailing gas prices along your planned travel corridor. Highway turnpike rest stops and remote desert or mountain stations frequently charge 15% to 30% above suburban city averages.
              </li>
              <li>
                <strong className="text-white">Set Passenger Count and Review Results:</strong> Click Calculate to review total gallons or liters needed, total expenditure, and the per-person financial contribution.
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
                  <CheckCircle className="w-5 h-5" /> Example 1: 650-Mile SUV Vacation with 4 Passengers
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> Four friends drive 650 miles in a midsize crossover SUV rated at 26 MPG. Average regular unleaded gas along their route costs $3.50 per gallon.
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Fuel Consumed: 650 miles ÷ 26 MPG = 25.00 Gallons</p>
                  <p>2. Total Fuel Cost: 25.00 Gal × $3.50 = $87.50</p>
                  <p>3. Liters Equivalent: 25.00 × 3.7854 = 94.64 Liters</p>
                  <p className="text-emerald-400 font-bold">Cost Per Passenger: $87.50 ÷ 4 = $21.88</p>
                </div>
                <p className="text-xs text-slate-400">
                  Each traveler contributes just $21.88 for a full 650-mile journey, demonstrating significant savings over air travel.
                </p>
              </div>

              <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-lg">
                  <Gauge className="w-5 h-5" /> Example 2: European Continental Drive (480 km) in Diesel Hatchback
                </div>
                <p className="text-sm text-slate-300">
                  <strong>Scenario:</strong> A business traveler drives 480 kilometers across France in a diesel vehicle consuming 5.2 L/100km. Diesel fuel is priced at €1.80 per liter.
                </p>
                <div className="space-y-1 text-xs font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <p>1. Fuel Consumed: (480 km ÷ 100) × 5.2 = 24.96 Liters</p>
                  <p>2. Total Cost: 24.96 Liters × €1.80 = €44.93</p>
                  <p>3. US MPG Equivalence: 235.215 ÷ 5.2 ≈ 45.2 MPG</p>
                  <p className="text-sky-400 font-bold">Total Expense: €44.93</p>
                </div>
                <p className="text-xs text-slate-400">
                  Demonstrates the high thermal efficiency of compact modern diesel engines on European motorways.
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
                <p className="font-bold text-white">1. Overestimating Highway Fuel Efficiency in Mountainous Terrain</p>
                <p>
                  Vehicles ascending steep mountain passes or battling high crosswinds burn 30% to 50% more fuel than on flat level freeways. The engine operates in lower gear ratios at higher RPMs. When driving through elevated mountain corridors, budget extra fuel stops.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-rose-500 space-y-1">
                <p className="font-bold text-white">2. Conflating US Gallons (3.785 L) with UK Imperial Gallons (4.546 L)</p>
                <p>
                  Automotive reviews produced in the United Kingdom cite fuel economy figures that appear 20% higher than US figures because British Imperial gallons are larger. Always confirm whether MPG figures represent US or UK gallons.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border-l-4 border-sky-500 space-y-1">
                <p className="font-bold text-white">3. Ignoring Speed Drag Exponential Penalties</p>
                <p>
                  Aerodynamic air resistance increases with the square of velocity. Cruising at 80 mph (129 km/h) consumes approximately 25% more fuel per mile than cruising at 65 mph (105 km/h). Maintaining moderate highway speeds saves dozens of dollars per road trip.
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: In-Depth FAQ Component */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <HelpCircle className="text-sky-400 w-7 h-7" /> Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-sm">
              Explore thorough answers to road trip budgeting questions, vehicle fuel efficiency nuances, and gas prices.
            </p>
          </div>

          <Faq items={faqItems} className="mt-4" />

          {/* Section 7: Academic References & Companion Tools */}
          <div className="space-y-4 pt-6 border-t border-slate-700/60">
            <h3 className="text-xl font-bold text-white">Automotive Standards, References & Companion Tools</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fuel economy testing criteria and vehicle ratings conform to standards certified by the <em>U.S. Environmental Protection Agency (EPA)</em> and the <em>Oak Ridge National Laboratory Center for Transportation Analysis</em>, alongside European <em>Worldwide Harmonized Light Vehicles Test Procedure (WLTP)</em> standards.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/lifestyle/unit-converter" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Unit Converter <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/lifestyle/tip-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Tip & Bill Splitter <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/financial/currency-converter" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Live Currency Converter <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/math/percentage-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800 text-xs hover:border-emerald-500/50 transition-colors">
                Percentage Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        <Disclaimer text="This fuel cost calculator provides mathematical estimates for travel budgeting. Actual road fuel consumption depends on tire inflation, cargo weight, traffic congestion, elevation changes, driving style, and pump price fluctuations." />
      </div>
    </>
  );
};

export default FuelCostCalculator;

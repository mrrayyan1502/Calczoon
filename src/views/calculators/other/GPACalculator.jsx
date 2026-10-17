'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, GraduationCap, Award, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';
import { saveCalculation } from '@/lib/history';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';

const GPACalculator = () => {
  const [courses, setCourses] = useState([
    { name: 'Course 1', credits: '3', grade: 'A', level: 'regular' },
    { name: 'Course 2', credits: '3', grade: 'A-', level: 'regular' },
    { name: 'Course 3', credits: '4', grade: 'B+', level: 'honors' },
    { name: 'Course 4', credits: '3', grade: 'A', level: 'ap' }
  ]);
  const [currentGPA, setCurrentGPA] = useState('3.45');
  const [currentCredits, setCurrentCredits] = useState('45');
  const [result, setResult] = useState(null);

  const baseGradePoints = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'F': 0.0
  };

  const levelBonuses = {
    regular: 0.0,
    honors: 0.5,
    ap: 1.0,
    college: 1.0
  };

  const handleCourseChange = (index, field, value) => {
    const updated = [...courses];
    updated[index][field] = value;
    setCourses(updated);
  };

  const addCourse = () => {
    setCourses([...courses, { name: `Course ${courses.length + 1}`, credits: '3', grade: 'A', level: 'regular' }]);
  };

  const removeCourse = (index) => {
    if (courses.length <= 1) return;
    const updated = courses.filter((_, i) => i !== index);
    setCourses(updated);
  };

  const calculateGPA = (e) => {
    if (e) e.preventDefault();

    let unweightedPoints = 0;
    let weightedPoints = 0;
    let totalSemesterCredits = 0;
    let hasError = false;

    for (const course of courses) {
      const cr = parseFloat(course.credits);
      const gradeVal = baseGradePoints[course.grade];
      const bonus = levelBonuses[course.level] || 0.0;

      if (isNaN(cr) || cr <= 0) {
        hasError = true;
        break;
      }

      unweightedPoints += cr * gradeVal;
      // Cap individual grade points at 5.0 for weighted
      const courseWeightedPoint = gradeVal === 0.0 ? 0.0 : gradeVal + bonus;
      weightedPoints += cr * courseWeightedPoint;
      totalSemesterCredits += cr;
    }

    if (hasError || totalSemesterCredits === 0) {
      setResult({ error: 'Please enter valid credit hours greater than 0 for all courses.' });
      return;
    }

    const unweightedSemGPA = (unweightedPoints / totalSemesterCredits).toFixed(2);
    const weightedSemGPA = (weightedPoints / totalSemesterCredits).toFixed(2);

    let newCumulativeUnweighted = null;
    let newCumulativeWeighted = null;
    let combinedTotalCredits = totalSemesterCredits;

    const prevGPAVal = parseFloat(currentGPA);
    const prevCreditsVal = parseFloat(currentCredits);

    if (!isNaN(prevGPAVal) && !isNaN(prevCreditsVal) && prevCreditsVal > 0) {
      const prevPoints = prevGPAVal * prevCreditsVal;
      combinedTotalCredits = prevCreditsVal + totalSemesterCredits;
      newCumulativeUnweighted = ((prevPoints + unweightedPoints) / combinedTotalCredits).toFixed(2);
      newCumulativeWeighted = ((prevPoints + weightedPoints) / combinedTotalCredits).toFixed(2);
    } else {
      newCumulativeUnweighted = unweightedSemGPA;
      newCumulativeWeighted = weightedSemGPA;
    }

    // Determine honor status
    const numericGPA = parseFloat(unweightedSemGPA);
    let academicStanding = 'Good Standing';
    if (numericGPA >= 3.9) academicStanding = 'Summa Cum Laude / Dean\'s Highest Honors';
    else if (numericGPA >= 3.7) academicStanding = 'Magna Cum Laude / High Honors';
    else if (numericGPA >= 3.5) academicStanding = 'Cum Laude / Dean\'s List';
    else if (numericGPA < 2.0) academicStanding = 'Academic Warning / Probation Risk';

    setResult({
      unweightedSemGPA,
      weightedSemGPA,
      newCumulativeUnweighted,
      newCumulativeWeighted,
      totalSemesterCredits: totalSemesterCredits.toFixed(1),
      combinedTotalCredits: combinedTotalCredits.toFixed(1),
      totalQualityPoints: unweightedPoints.toFixed(2),
      academicStanding
    });

    saveCalculation({
      type: 'GPA',
      result: {
        semesterGPA: unweightedSemGPA,
        weightedGPA: weightedSemGPA,
        cumulativeGPA: newCumulativeUnweighted
      }
    });
  };

  const resetForm = () => {
    setCourses([
      { name: 'Course 1', credits: '3', grade: 'A', level: 'regular' },
      { name: 'Course 2', credits: '3', grade: 'A-', level: 'regular' },
      { name: 'Course 3', credits: '4', grade: 'B+', level: 'honors' },
      { name: 'Course 4', credits: '3', grade: 'A', level: 'ap' }
    ]);
    setCurrentGPA('');
    setCurrentCredits('');
    setResult(null);
  };

  const faqItems = [
    {
      question: "What is the difference between weighted and unweighted GPA?",
      answer: "An unweighted GPA is calculated on a standard 4.0 scale regardless of course difficulty, meaning an 'A' in an advanced AP Chemistry course earns the exact same 4.0 as an 'A' in standard introductory health. A weighted GPA accounts for academic rigor by adding extra quality points—typically +0.5 for Honors courses (up to 4.5) and +1.0 for Advanced Placement (AP), International Baccalaureate (IB), or dual-enrollment college courses (up to 5.0). Admissions committees review both metrics to evaluate student grades in context."
    },
    {
      question: "How do you calculate your cumulative GPA with prior semesters?",
      answer: "To calculate cumulative GPA, multiply your prior cumulative GPA by your total earned credit hours to determine your prior quality points. Next, calculate your current semester's earned quality points by multiplying each course credit hour by its grade points and summing them up. Finally, add your prior quality points to your semester quality points and divide that sum by your total combined credit hours. Never take a simple average of two GPAs if the semesters had different credit loads."
    },
    {
      question: "Do Pass/Fail, Withdrawn (W), or Audited courses affect GPA?",
      answer: "Generally, no. Pass/Fail courses where you earn a passing grade ('P') grant degree credit hours but carry no grade points, so they are completely excluded from GPA calculations. Similarly, official withdrawals ('W') and audited courses do not award quality points or count toward GPA credits. However, receiving a failing grade in a Pass/Fail course ('F' or 'NP') at some universities counts as an earned zero quality points and severely penalizes your GPA."
    },
    {
      question: "What GPA is required for Latin Honors and Dean's List?",
      answer: "While cutoffs vary slightly between academic institutions, standard American universities award Dean's List honors to full-time students earning a semester GPA of 3.50 or higher. For graduation Latin Honors, typical benchmarks are: Cum Laude (with praise) for a cumulative GPA of 3.50 to 3.69; Magna Cum Laude (with great praise) for 3.70 to 3.89; and Summa Cum Laude (with highest praise) for 3.90 to 4.00."
    },
    {
      question: "How does repeating a course impact cumulative GPA?",
      answer: "Institutions handle repeated courses through three main policies: Grade Replacement, Grade Averaging, or Credit Exclusion. Under grade replacement, only the newer or higher grade is calculated into your GPA, though the original attempt remains visible on your official transcript. Under grade averaging, both grades contribute equally to your cumulative quality points. Always verify your university registrar's specific course repeat policy."
    },
    {
      question: "What is a good GPA for college admissions and graduate school?",
      answer: "For undergraduate college admissions, a competitive unweighted GPA is typically 3.5 or higher for selective public universities, and 3.8 to 4.0 (often with a 4.2+ weighted GPA) for top-tier Ivy League and elite private colleges. For graduate programs (Master's, MBA, JD, MD), most accredited universities establish a minimum undergraduate cutoff of 3.0, with competitive applicants averaging 3.5 to 3.8."
    },
    {
      question: "How do credit hours weight individual course grades in GPA?",
      answer: "Credit hours represent academic class time and course workload, acting as mathematical multipliers for your grades. A 4-credit calculus course with laboratory work carries four times the mathematical influence of a 1-credit physical education elective. Earning an 'A' (4.0) in a 4-credit course produces 16.0 quality points, whereas earning an 'A' in a 1-credit course produces only 4.0 quality points."
    }
  ];

  const pageTitle = "GPA Calculator: Calculate Semester, Weighted & Cumulative GPA";
  const pageDescription = "Free college and high school GPA calculator. Accurately calculate semester GPA, weighted honors/AP scores, and cumulative Grade Point Average with academic benchmarks.";
  const canonicalUrl = "/lifestyle/gpa-calculator";

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CalcZoon GPA Calculator",
    "url": "https://calczoon.com/lifestyle/gpa-calculator",
    "description": "Comprehensive GPA calculator supporting unweighted, honors, AP/IB weighted, and cumulative grade point average computations.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        canonicalUrl={canonicalUrl}
        schema={[appSchema, faqSchema]}
      />

      <div className="max-w-5xl mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <GraduationCap className="w-4 h-4" /> Academic Performance & Grade Point Estimator
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            GPA Calculator
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Calculate your semester and cumulative Grade Point Average (GPA) across unweighted 4.0 scales, Honors (+0.5), and Advanced Placement / College (+1.0) weighted courses.
          </p>
        </div>

        {/* Calculator Card */}
        <Card className="bg-slate-800/50 border-slate-700 shadow-xl rounded-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-white text-xl">Current Semester Course Registry</CardTitle>
            <CardDescription className="text-slate-300">
              Enter each course title, assigned credit hours, expected letter grade, and academic rigor tier.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={calculateGPA} className="space-y-6">
              {/* Prior GPA Settings */}
              <div className="p-4 bg-slate-900/60 border border-slate-700/80 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  Prior Academic Record (Optional for Cumulative Projection)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="currentGpa" className="text-xs text-slate-300">Prior Cumulative GPA</Label>
                    <Input
                      id="currentGpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="5.0"
                      value={currentGPA}
                      onChange={(e) => setCurrentGPA(e.target.value)}
                      className="bg-slate-900 border-slate-700 text-white"
                      placeholder="e.g. 3.45"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="currentCredits" className="text-xs text-slate-300">Prior Earned Credit Hours</Label>
                    <Input
                      id="currentCredits"
                      type="number"
                      step="0.5"
                      min="0"
                      value={currentCredits}
                      onChange={(e) => setCurrentCredits(e.target.value)}
                      className="bg-slate-900 border-slate-700 text-white"
                      placeholder="e.g. 45"
                    />
                  </div>
                </div>
              </div>

              {/* Course Rows */}
              <div className="space-y-3">
                <div className="hidden sm:grid grid-cols-12 gap-3 px-2 text-xs font-semibold text-slate-400">
                  <div className="col-span-4">Course Name / Code</div>
                  <div className="col-span-2">Credits</div>
                  <div className="col-span-3">Letter Grade</div>
                  <div className="col-span-2">Level / Rigor</div>
                  <div className="col-span-1 text-center">Remove</div>
                </div>

                {courses.map((course, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 bg-slate-900/40 border border-slate-700/50 rounded-xl items-center">
                    <div className="sm:col-span-4">
                      <Label className="sm:hidden text-xs text-slate-400 mb-1 block">Course Name</Label>
                      <Input
                        type="text"
                        placeholder={`Course ${index + 1}`}
                        value={course.name}
                        onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
                        className="bg-slate-900 border-slate-700 text-white h-10 text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="sm:hidden text-xs text-slate-400 mb-1 block">Credit Hours</Label>
                      <Input
                        type="number"
                        min="0.5"
                        max="12"
                        step="0.5"
                        placeholder="3"
                        value={course.credits}
                        onChange={(e) => handleCourseChange(index, 'credits', e.target.value)}
                        className="bg-slate-900 border-slate-700 text-white h-10 text-sm"
                        required
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <Label className="sm:hidden text-xs text-slate-400 mb-1 block">Letter Grade</Label>
                      <select
                        value={course.grade}
                        onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
                        className="w-full h-10 px-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {Object.keys(baseGradePoints).map((g) => (
                          <option key={g} value={g}>
                            {g} ({baseGradePoints[g].toFixed(1)})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="sm:hidden text-xs text-slate-400 mb-1 block">Course Level</Label>
                      <select
                        value={course.level}
                        onChange={(e) => handleCourseChange(index, 'level', e.target.value)}
                        className="w-full h-10 px-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="regular">Standard (4.0)</option>
                        <option value="honors">Honors (+0.5)</option>
                        <option value="ap">AP / IB (+1.0)</option>
                        <option value="college">College (+1.0)</option>
                      </select>
                    </div>
                    <div className="sm:col-span-1 flex justify-center">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCourse(index)}
                        disabled={courses.length <= 1}
                        className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 h-9 w-9"
                        title="Remove Course"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addCourse}
                  className="w-full border-dashed border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800/80 mt-2 py-5"
                >
                  <PlusCircle className="mr-2 h-4 w-4 text-emerald-400" /> Add Another Course
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold h-12 text-base shadow-lg shadow-emerald-950/40">
                  Calculate Grade Point Average
                </Button>
                <Button type="button" variant="secondary" onClick={resetForm} className="h-12 px-6 bg-slate-700 hover:bg-slate-600 text-slate-200">
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>

          {/* Results Display */}
          {result && (
            <CardFooter className="flex-col items-start border-t border-slate-700/80 pt-6 pb-6">
              {result.error ? (
                <div className="w-full p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium">{result.error}</p>
                </div>
              ) : (
                <div className="w-full space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-400" /> Academic GPA Calculation Results
                    </h2>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                      {result.academicStanding}
                    </span>
                  </div>

                  {/* Primary GPA Stat Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-900/90 border border-slate-700 rounded-xl text-center">
                      <span className="text-xs text-slate-400 font-medium block">Semester (Unweighted)</span>
                      <span className="text-3xl font-extrabold text-emerald-400 mt-1 block">
                        {result.unweightedSemGPA}
                      </span>
                      <span className="text-[11px] text-slate-400">4.0 Max Scale</span>
                    </div>

                    <div className="p-4 bg-slate-900/90 border border-slate-700 rounded-xl text-center">
                      <span className="text-xs text-slate-400 font-medium block">Semester (Weighted)</span>
                      <span className="text-3xl font-extrabold text-sky-400 mt-1 block">
                        {result.weightedSemGPA}
                      </span>
                      <span className="text-[11px] text-slate-400">Honors / AP Boost</span>
                    </div>

                    <div className="p-4 bg-slate-900/90 border border-slate-700 rounded-xl text-center">
                      <span className="text-xs text-slate-400 font-medium block">Cumulative GPA</span>
                      <span className="text-3xl font-extrabold text-white mt-1 block">
                        {result.newCumulativeUnweighted}
                      </span>
                      <span className="text-[11px] text-slate-400">{result.combinedTotalCredits} Total Credits</span>
                    </div>

                    <div className="p-4 bg-slate-900/90 border border-slate-700 rounded-xl text-center">
                      <span className="text-xs text-slate-400 font-medium block">Quality Points</span>
                      <span className="text-3xl font-extrabold text-amber-400 mt-1 block">
                        {result.totalQualityPoints}
                      </span>
                      <span className="text-[11px] text-slate-400">{result.totalSemesterCredits} Semester Credits</span>
                    </div>
                  </div>

                  {/* Recommended Academic Resource Callout Box */}
                  <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Recommended Academic Resource: College Admissions & Honors Strategy
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                        Applying for selective university degrees or merit-based graduate fellowships? Track course prerequisites, build targeted GRE/GMAT study schedules, and utilize college admissions consulting tools to maximize scholarship offers.
                      </p>
                    </div>
                    <a
                      href="https://www.calczoon.com/blog"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg whitespace-nowrap transition-colors self-start sm:self-center"
                    >
                      Explore Study Guides
                    </a>
                  </div>

                  <div className="w-full pt-2">
                    <ShareResults
                      title="My Academic GPA Calculation"
                      text={`I computed my GPA using CalcZoon: Semester GPA is ${result.unweightedSemGPA} (Weighted: ${result.weightedSemGPA}) with cumulative GPA at ${result.newCumulativeUnweighted}!`}
                      url="https://calczoon.com/lifestyle/gpa-calculator"
                    />
                  </div>
                </div>
              )}
            </CardFooter>
          )}
        </Card>

        {/* Deep Educational & Academic Reference Guide */}
        <div className="mt-12 space-y-10 text-slate-300 leading-relaxed text-sm sm:text-base">
          {/* Section 1: Core Mechanics and Mathematical Formula */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              How GPA is Calculated: Mathematical Formulas & Quality Points
            </h2>
            <p>
              The Grade Point Average (GPA) is the universal metric used across American high schools, undergraduate colleges, and graduate universities to quantify student academic achievement on a standardized numerical scale. Rather than calculating a simple arithmetic mean of your letter grades, the GPA formula utilizes a credit-weighted average called <strong>Quality Points</strong>.
            </p>
            <p>
              Each course carries a designated number of <em>Credit Hours</em> (or Carnegie Units in high school), reflecting the instructional classroom hours per week. When a final letter grade is earned, it is converted into a grade point value (e.g., $A = 4.0$, $B = 3.0$). Multiplying the credit hours by the grade point yields the course’s total quality points.
            </p>

            <div className="my-6 p-5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-sm space-y-3">
              <div className="text-emerald-400 font-semibold">1. Semester Grade Point Average Formula:</div>
              <div className="text-slate-200">
                $$\text{Semester GPA} = \frac{\sum (\text{Course Credit Hours} \times \text{Grade Quality Points})}{\sum \text{Course Credit Hours}}$$
              </div>
              <div className="text-emerald-400 font-semibold pt-2">2. Cumulative GPA Across All Semesters:</div>
              <div className="text-slate-200">
                $$\text{Cumulative GPA} = \frac{(\text{Prior GPA} \times \text{Prior Credits}) + \text{Semester Quality Points}}{\text{Prior Credits} + \text{Semester Credits}}$$
              </div>
              <div className="text-emerald-400 font-semibold pt-2">3. Weighted Grade Point Calculation:</div>
              <div className="text-slate-200">
                $$\text{Weighted Point} = \text{Base Grade Point} + \text{Difficulty Weight Bonus (0.5 for Honors, 1.0 for AP/IB)}$$
              </div>
            </div>
          </section>

          {/* Section 2: 10-Row Static HTML Reference Table */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Standard US 4.0 Grading Scale, Percentage Equivalents & UK Classification
            </h2>
            <p className="text-sm text-slate-300">
              The following reference table outlines the standard 4.0 unweighted GPA scale, typical percentage grading bands, Honors and Advanced Placement (AP) weight boosts, and international degree classification equivalents.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-emerald-400 font-semibold">
                    <th className="p-3 sm:p-4">Letter Grade</th>
                    <th className="p-3 sm:p-4">Percentage</th>
                    <th className="p-3 sm:p-4">Standard 4.0 Point</th>
                    <th className="p-3 sm:p-4">Honors (+0.5)</th>
                    <th className="p-3 sm:p-4">AP / IB / College (+1.0)</th>
                    <th className="p-3 sm:p-4">UK Degree Equivalent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">A+</td>
                    <td className="p-3 sm:p-4">97% – 100%</td>
                    <td className="p-3 sm:p-4 text-emerald-400 font-bold">4.0</td>
                    <td className="p-3 sm:p-4">4.5</td>
                    <td className="p-3 sm:p-4">5.0</td>
                    <td className="p-3 sm:p-4">First Class Honours (1st)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">A</td>
                    <td className="p-3 sm:p-4">93% – 96%</td>
                    <td className="p-3 sm:p-4 text-emerald-400 font-bold">4.0</td>
                    <td className="p-3 sm:p-4">4.5</td>
                    <td className="p-3 sm:p-4">5.0</td>
                    <td className="p-3 sm:p-4">First Class Honours (1st)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">A-</td>
                    <td className="p-3 sm:p-4">90% – 92%</td>
                    <td className="p-3 sm:p-4 font-medium">3.7</td>
                    <td className="p-3 sm:p-4">4.2</td>
                    <td className="p-3 sm:p-4">4.7</td>
                    <td className="p-3 sm:p-4">Upper Second Class (2:1)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">B+</td>
                    <td className="p-3 sm:p-4">87% – 89%</td>
                    <td className="p-3 sm:p-4 font-medium">3.3</td>
                    <td className="p-3 sm:p-4">3.8</td>
                    <td className="p-3 sm:p-4">4.3</td>
                    <td className="p-3 sm:p-4">Upper Second Class (2:1)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">B</td>
                    <td className="p-3 sm:p-4">83% – 86%</td>
                    <td className="p-3 sm:p-4 font-medium">3.0</td>
                    <td className="p-3 sm:p-4">3.5</td>
                    <td className="p-3 sm:p-4">4.0</td>
                    <td className="p-3 sm:p-4">Upper Second Class (2:1)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">B-</td>
                    <td className="p-3 sm:p-4">80% – 82%</td>
                    <td className="p-3 sm:p-4 font-medium">2.7</td>
                    <td className="p-3 sm:p-4">3.2</td>
                    <td className="p-3 sm:p-4">3.7</td>
                    <td className="p-3 sm:p-4">Lower Second Class (2:2)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">C+</td>
                    <td className="p-3 sm:p-4">77% – 79%</td>
                    <td className="p-3 sm:p-4 font-medium">2.3</td>
                    <td className="p-3 sm:p-4">2.8</td>
                    <td className="p-3 sm:p-4">3.3</td>
                    <td className="p-3 sm:p-4">Lower Second Class (2:2)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">C</td>
                    <td className="p-3 sm:p-4">73% – 76%</td>
                    <td className="p-3 sm:p-4 font-medium">2.0</td>
                    <td className="p-3 sm:p-4">2.5</td>
                    <td className="p-3 sm:p-4">3.0</td>
                    <td className="p-3 sm:p-4">Third Class Honours (3rd)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-white">D</td>
                    <td className="p-3 sm:p-4">65% – 69%</td>
                    <td className="p-3 sm:p-4 font-medium">1.0</td>
                    <td className="p-3 sm:p-4">1.0</td>
                    <td className="p-3 sm:p-4">1.0</td>
                    <td className="p-3 sm:p-4">Ordinary Pass / Non-Honours</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 sm:p-4 font-bold text-red-400">F</td>
                    <td className="p-3 sm:p-4">Below 65%</td>
                    <td className="p-3 sm:p-4 text-red-400 font-bold">0.0</td>
                    <td className="p-3 sm:p-4">0.0</td>
                    <td className="p-3 sm:p-4">0.0</td>
                    <td className="p-3 sm:p-4 text-red-400">Fail</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Weighted vs Unweighted GPA In-Depth */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Weighted vs. Unweighted GPA: Admissions Rigor & College Strategy
            </h2>
            <p>
              When applying to competitive college programs, understanding the distinction between unweighted and weighted GPA is crucial for realistic goal setting.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                <h3 className="font-bold text-emerald-400 text-lg">Unweighted GPA (Standard 4.0 Scale)</h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Every class carries identical weight regardless of rigor. A student who earns an A in an introductory elective and an A in Advanced Multivariable Calculus receives identical 4.0 grade point entries. Because it eliminates subjective high school weighting variations, college admissions officers frequently strip away high school weighting to recalculate all applicants on an unweighted 4.0 baseline.
                </p>
              </div>

              <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                <h3 className="font-bold text-sky-400 text-lg">Weighted GPA (5.0 Scale & Beyond)</h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Weighted GPA rewards students who pursue challenging coursework. An 'A' in an AP or International Baccalaureate course yields 5.0 quality points, and an Honors course yields 4.5. This allows dedicated students to exceed a 4.0 cumulative average, demonstrating to university admissions committees that they actively challenged themselves with collegiate-level workloads.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Two Realistic Step-by-Step Numerical Case Studies */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Real-World Numerical Case Studies: Step-by-Step Calculations
            </h2>

            {/* Case Study 1 */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-emerald-400">
                  Case Study 1: High School Junior with AP & Honors Coursework
                </h3>
                <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-medium">
                  High School Rigor
                </span>
              </div>
              <p className="text-sm">
                Samantha is a high school junior taking five 1.0-credit courses during the fall semester:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 pl-2">
                <li><strong>AP Biology (1.0 Credit):</strong> Grade A (Unweighted: 4.0, AP Weighted: 5.0)</li>
                <li><strong>AP US History (1.0 Credit):</strong> Grade B+ (Unweighted: 3.3, AP Weighted: 4.3)</li>
                <li><strong>Honors Chemistry (1.0 Credit):</strong> Grade A (Unweighted: 4.0, Honors Weighted: 4.5)</li>
                <li><strong>English Literature (1.0 Credit):</strong> Grade A (Unweighted: 4.0, Regular Weighted: 4.0)</li>
                <li><strong>Precalculus (1.0 Credit):</strong> Grade A- (Unweighted: 3.7, Regular Weighted: 3.7)</li>
              </ul>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono space-y-2">
                <p className="text-slate-200">
                  <strong>Total Semester Credits:</strong> $1.0 + 1.0 + 1.0 + 1.0 + 1.0 = 5.0\text{ credits}$
                </p>
                <p className="text-slate-200">
                  <strong>Unweighted Quality Points:</strong> $(1 \times 4.0) + (1 \times 3.3) + (1 \times 4.0) + (1 \times 4.0) + (1 \times 3.7) = 19.0\text{ points}$
                </p>
                <p className="text-emerald-400 font-bold">
                  $$\text{Unweighted GPA} = \frac{19.0}{5.0} = 3.80$$
                </p>
                <p className="text-slate-200 pt-2">
                  <strong>Weighted Quality Points:</strong> $(1 \times 5.0) + (1 \times 4.3) + (1 \times 4.5) + (1 \times 4.0) + (1 \times 3.7) = 21.5\text{ points}$
                </p>
                <p className="text-sky-400 font-bold">
                  $$\text{Weighted GPA} = \frac{21.5}{5.0} = 4.30$$
                </p>
              </div>
              <p className="text-sm text-slate-300">
                <strong>Result:</strong> Samantha achieves a solid 3.80 unweighted GPA while her challenging courseload elevates her weighted semester GPA to 4.30, placing her within the top percentile for selective state flagship university admissions.
              </p>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-sky-400">
                  Case Study 2: College Sophomore Projecting Cumulative Engineering GPA
                </h3>
                <span className="text-xs px-3 py-1 bg-sky-500/10 text-sky-400 rounded-full border border-sky-500/20 font-medium">
                  University Cumulative
                </span>
              </div>
              <p className="text-sm">
                Marcus enters his fourth semester as an Electrical Engineering major with <strong>45 prior credits</strong> and a cumulative GPA of <strong>3.20</strong>. During the spring semester, he enrolls in 16 credits:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 pl-2">
                <li><strong>Calculus III (4 Credits):</strong> Grade B (3.0 points) &rarr; $4 \times 3.0 = 12.0$ points</li>
                <li><strong>Physics II: Electromagnetism (4 Credits):</strong> Grade A (4.0 points) &rarr; $4 \times 4.0 = 16.0$ points</li>
                <li><strong>Data Structures & Algorithms (3 Credits):</strong> Grade A- (3.7 points) &rarr; $3 \times 3.7 = 11.1$ points</li>
                <li><strong>Circuits Laboratory (2 Credits):</strong> Grade B+ (3.3 points) &rarr; $2 \times 3.3 = 6.6$ points</li>
                <li><strong>Technical Writing (3 Credits):</strong> Grade A (4.0 points) &rarr; $3 \times 4.0 = 12.0$ points</li>
              </ul>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono space-y-2">
                <p className="text-slate-200">
                  <strong>Semester Quality Points:</strong> $12.0 + 16.0 + 11.1 + 6.6 + 12.0 = 57.7\text{ points}$
                </p>
                <p className="text-emerald-400 font-bold">
                  $$\text{Semester GPA} = \frac{57.7}{16} = 3.606 \approx 3.61$$
                </p>
                <p className="text-slate-200 pt-2">
                  <strong>Prior Quality Points:</strong> $45\text{ credits} \times 3.20\text{ GPA} = 144.0\text{ points}$
                </p>
                <p className="text-slate-200">
                  <strong>Combined Total Credits:</strong> $45 + 16 = 61\text{ credits}$
                </p>
                <p className="text-slate-200">
                  <strong>Combined Total Quality Points:</strong> $144.0 + 57.7 = 201.7\text{ points}$
                </p>
                <p className="text-sky-400 font-bold">
                  $$\text{New Cumulative GPA} = \frac{201.7}{61} = 3.306 \approx 3.31$$
                </p>
              </div>
              <p className="text-sm text-slate-300">
                <strong>Result:</strong> By earning a 3.61 semester GPA across 16 challenging STEM credits, Marcus successfully increases his overall cumulative undergraduate GPA from 3.20 to 3.31, qualifying him for competitive summer engineering internships.
              </p>
            </div>
          </section>

          {/* Section 5: Academic Honors & Pitfalls */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Latin Honors, Dean's List Benchmarks & 5 Critical GPA Calculation Pitfalls
            </h2>
            <p>
              Achieving graduation honors requires meeting strict university thresholds evaluated at the end of degree completion:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-center">
                <p className="text-xs text-slate-400 font-semibold uppercase">Cum Laude</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">3.50 – 3.69</p>
                <p className="text-xs text-slate-300 mt-1">"With Praise"</p>
              </div>
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-center">
                <p className="text-xs text-slate-400 font-semibold uppercase">Magna Cum Laude</p>
                <p className="text-2xl font-bold text-sky-400 mt-1">3.70 – 3.89</p>
                <p className="text-xs text-slate-300 mt-1">"With Great Praise"</p>
              </div>
              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-center">
                <p className="text-xs text-slate-400 font-semibold uppercase">Summa Cum Laude</p>
                <p className="text-2xl font-bold text-amber-400 mt-1">3.90 – 4.00</p>
                <p className="text-xs text-slate-300 mt-1">"With Highest Praise"</p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white pt-2">5 Common Pitfalls When Tracking Your GPA</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300 pl-2">
              <li>
                <strong>Simple Average Trap:</strong> Averaging your fall semester GPA (e.g., 3.80 with 12 credits) and spring semester GPA (e.g., 3.20 with 18 credits) by taking $(3.80 + 3.20)/2 = 3.50$ produces mathematical error. You must always weight by credit hours.
              </li>
              <li>
                <strong>Pass/Fail Misunderstandings:</strong> While earning a "Pass" does not alter your GPA, receiving a failing "No Credit / Fail" grade at many universities generates zero grade points and counts toward earned credits, resulting in severe GPA drops.
              </li>
              <li>
                <strong>Transfer Credit Omissions:</strong> Many colleges accept transfer credits toward graduation requirements but do not incorporate transfer course grades into the institutional degree GPA.
              </li>
              <li>
                <strong>Course Repeat Policies:</strong> Some universities replace your earlier grade entirely, while others average both attempts or only replace credits up to an institutional limit (e.g., 16 credits).
              </li>
              <li>
                <strong>Incomplete (I) and Withdrawal (W) Deadlines:</strong> Failing to resolve an "Incomplete" by registrar deadlines frequently causes the grade to automatically convert into a punitive 0.0 "F".
              </li>
            </ol>
          </section>
        </div>

        {/* FAQs */}
        <Faq items={faqItems} className="mt-12" />

        {/* Disclaimer */}
        <Disclaimer text="This GPA calculator is designed for academic guidance and estimation purposes. Specific grading policies, plus/minus weightings, and honor cords vary by institution. Always consult your university registrar or official academic advisor for formal degree audits." />
      </div>
    </>
  );
};

export default GPACalculator;

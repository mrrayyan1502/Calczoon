import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { saveCalculation } from '@/lib/history';
import Faq from '@/components/Faq';
import Disclaimer from '@/components/Disclaimer';
import ShareResults from '@/components/ShareResults';
import Seo from '@/components/Seo';

const GPACalculator = () => {
  const [courses, setCourses] = useState([{ name: '', credits: '', grade: 'A+' }]);
  const [result, setResult] = useState(null);
  const [currentGPA, setCurrentGPA] = useState('');
  const [currentCredits, setCurrentCredits] = useState('');
  const [cumulativeGPA, setCumulativeGPA] = useState(null);

  const gradePoints = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const handleCourseChange = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { name: '', credits: '', grade: 'A+' }]);
  };

  const removeCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  const calculateGPA = (e) => {
    e.preventDefault();
    let totalPoints = 0;
    let totalCredits = 0;

    let hasInvalidCourse = false;
    for (const course of courses) {
      const credits = parseFloat(course.credits);
      const point = gradePoints[course.grade];
      if (isNaN(credits) || credits <= 0) {
        hasInvalidCourse = true;
        break;
      }
      totalPoints += credits * point;
      totalCredits += credits;
    }
    
    if (hasInvalidCourse || totalCredits === 0) {
      setResult({error: "Please enter valid credits for all courses."});
      return;
    }

    let semesterGPA = (totalPoints / totalCredits).toFixed(2);
    setResult({ semesterGPA });

    if (currentGPA && currentCredits) {
      const prevGPA = parseFloat(currentGPA);
      const prevCredits = parseFloat(currentCredits);
      if(!isNaN(prevGPA) && !isNaN(prevCredits) && prevCredits > 0){
        const prevTotalPoints = prevGPA * prevCredits;
        const newTotalCredits = prevCredits + totalCredits;
        const newTotalPoints = prevTotalPoints + totalPoints;
        const newCumulativeGPA = (newTotalPoints / newTotalCredits).toFixed(2);
        setCumulativeGPA(newCumulativeGPA);
      } else {
        setCumulativeGPA(null);
      }
    } else {
        setCumulativeGPA(semesterGPA);
    }
    saveCalculation({ type: 'GPA', result: { GPA: semesterGPA } });
  };
  
  const resetForm = () => {
    setCourses([{ name: '', credits: '', grade: 'A+' }]);
    setResult(null);
    setCurrentGPA('');
    setCurrentCredits('');
    setCumulativeGPA(null);
  }

  const faqItems = [
    { question: "What is GPA?", answer: "GPA stands for Grade Point Average. It's a standard way of measuring academic achievement in the U.S. It's calculated by taking the number of grade points a student earns in a given period of time divided by the total number of credits taken." },
    { question: "How does this GPA calculator work?", answer: "This calculator uses the standard 4.0 scale. Enter the credit hours and the letter grade you received for each course. It calculates the weighted average to give you your semester GPA. You can also include your previous cumulative GPA and credits to calculate your new overall GPA." },
    { question: "Is this calculator suitable for my university?", answer: "Most US universities use a 4.0 GPA scale, but the exact grade point values (e.g., for A-, B+, etc.) can vary. This calculator uses a common system, but you should check your school's specific grading policy for 100% accuracy." }
  ];

  return (
    <>
      <Seo
        title="GPA Calculator – Calculate Semester & Cumulative GPA Free"
        description="Free GPA calculator for students. Calculate your semester GPA and cumulative Grade Point Average instantly. Add courses, credits and grades to track your academic performance."
        canonicalUrl="/lifestyle/gpa-calculator"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "GPA Calculator",
          "url": "https://calczoon.com/lifestyle/gpa-calculator",
          "description": "Free GPA calculator to determine semester and cumulative Grade Point Average for students.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        }} />
      <div className="max-w-4xl mx-auto py-8">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <h1 className="text-3xl font-bold text-center text-primary">GPA Calculator</h1>
            <CardDescription className="text-center text-slate-300">
              Calculate your Grade Point Average (GPA) for the current semester and see how it impacts your cumulative GPA. Enter your courses, credits, and grades below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={calculateGPA} className="space-y-6">
              <div className="p-4 border border-slate-700 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Previous/Cumulative GPA (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentGpa">Current GPA</Label>
                    <Input id="currentGpa" type="number" step="0.01" min="0" max="4" value={currentGPA} onChange={(e) => setCurrentGPA(e.target.value)} className="bg-slate-900 border-slate-700" placeholder="e.g., 3.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentCredits">Total Credits</Label>
                    <Input id="currentCredits" type="number" min="0" value={currentCredits} onChange={(e) => setCurrentCredits(e.target.value)} className="bg-slate-900 border-slate-700" placeholder="e.g., 60" />
                  </div>
                </div>
              </div>

              <div className="p-4 border border-slate-700 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Current Semester Courses</h3>
                {courses.map((course, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
                    <Input 
                      type="text" 
                      placeholder={`Course ${index + 1} (Optional)`}
                      value={course.name}
                      onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
                      className="bg-slate-900 border-slate-700 md:col-span-2"
                    />
                    <div className="space-y-2">
                      <Label htmlFor={`credits-${index}`} className="text-xs">Credits</Label>
                      <Input
                        id={`credits-${index}`}
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="e.g., 3"
                        value={course.credits}
                        onChange={(e) => handleCourseChange(index, 'credits', e.target.value)}
                        className="bg-slate-900 border-slate-700"
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-grow space-y-2">
                         <Label htmlFor={`grade-${index}`} className="text-xs">Grade</Label>
                        <select
                          id={`grade-${index}`}
                          value={course.grade}
                          onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
                          className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md h-10"
                        >
                          {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                      {courses.length > 1 && (
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeCourse(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addCourse} variant="outline" className="w-full mt-2">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Course
                </Button>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 h-12 text-base">Calculate GPA</Button>
                <Button type="button" variant="secondary" onClick={resetForm} className="flex-1 h-12 text-base">Reset</Button>
              </div>
            </form>
          </CardContent>
          {result && (
            <CardFooter className="flex-col items-start space-y-4 pt-6">
                <h2 className="text-xl font-bold text-white w-full text-center">Calculation Results</h2>
                {result.error ? (<p className="text-destructive text-center">{result.error}</p>) : (
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                      <div className="p-4 bg-slate-800 rounded-lg">
                          <p className="text-slate-300">Semester GPA</p>
                          <p className="text-4xl font-bold text-primary">{result.semesterGPA}</p>
                      </div>
                      {cumulativeGPA && (
                          <div className="p-4 bg-slate-800 rounded-lg">
                              <p className="text-slate-300">New Cumulative GPA</p>
                              <p className="text-4xl font-bold text-primary">{cumulativeGPA}</p>
                          </div>
                      )}
                  </div>
                )}
                {result && !result.error && (
                    <div className="w-full mt-4">
                        <ShareResults
                            title="My GPA Calculation"
                            text={`I calculated my GPA with Calczoon! Semester GPA: ${result.semesterGPA}${cumulativeGPA ? `, New Cumulative GPA: ${cumulativeGPA}` : ''}.`}
                            url="https://calczoon.com/lifestyle/gpa-calculator"
                        />
                    </div>
                )}
            </CardFooter>
          )}
        </Card>
        <Faq items={faqItems} className="mt-8"/>
        <Disclaimer text="This calculator is for estimation purposes only. Grade point systems can vary between institutions. Always consult your official academic transcript for your exact GPA." />
      </div>
    </>
  );
};

export default GPACalculator;
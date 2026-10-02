import { allCalculators } from './calculatorRegistry';

export const calculatorFaqs = {
  'bmi-calculator': [
    { q: "What is a healthy BMI range for adults?", a: "According to the World Health Organization (WHO), a BMI between 18.5 and 24.9 is considered normal weight for adult men and women." },
    { q: "Is BMI accurate for muscular athletes?", a: "BMI does not distinguish between lean muscle and fat tissue. Highly muscular individuals often score in the overweight range despite having low body fat." },
    { q: "How is BMI calculated?", a: "In the metric system, BMI is calculated as weight in kilograms divided by height in meters squared (kg/m²). In the imperial system, multiply weight in pounds by 703 and divide by height in inches squared." },
    { q: "Can BMI diagnose medical conditions?", a: "No, BMI is a clinical screening tool, not a diagnostic measure. It should be used alongside waist circumference, body fat percentage, and blood panels." },
    { q: "How often should I measure my BMI?", a: "Checking your BMI once every few months or when your weight fluctuates by more than 2-3 kg is sufficient for general tracking." }
  ],
  'tdee-calculator': [
    { q: "What is the difference between BMR and TDEE?", a: "BMR is the base energy burned at complete rest, while TDEE includes all physical movement, exercise, and the thermic effect of food consumed throughout the day." },
    { q: "How large of a calorie deficit is recommended for fat loss?", a: "A moderate deficit of 300 to 500 calories below your TDEE produces sustainable fat loss of approximately 0.5 to 1 lb per week without excessive hunger or muscle loss." },
    { q: "Which activity multiplier should I select?", a: "Select the option that reflects your general week conservatively. If you work a sedentary desk job and exercise 3 times a week, 'Lightly Active' or 'Moderately Active' is typically appropriate." },
    { q: "Should I eat back the calories I burn during exercise?", a: "No, because the TDEE activity multiplier already accounts for workout energy expenditure. Adding exercise calories back can erase your intended deficit." },
    { q: "How often should I recalculate my TDEE?", a: "Recalculate your TDEE after every 5-10 lbs of weight loss, as a lighter body requires fewer calories to maintain and operate." }
  ],
  'macro-calculator': [
    { q: "What are macronutrients?", a: "Macronutrients are the three primary nutritional categories providing energy: proteins (4 calories/gram), carbohydrates (4 calories/gram), and fats (9 calories/gram)." },
    { q: "How much protein should I eat daily?", a: "Active individuals and those seeking fat loss typically benefit from 1.6 to 2.2 grams of protein per kilogram of body weight (0.7 to 1.0 grams per pound)." },
    { q: "Can I adjust my macro ratios while maintaining calories?", a: "Yes, you can adjust the balance between carbohydrates and fats according to your dietary preferences (e.g. low-carb, keto, or balanced) as long as protein and total calories align with your goals." },
    { q: "Why is dietary fat important?", a: "Dietary fat is crucial for hormonal regulation, brain function, vitamin absorption, and cellular health. Aim for at least 20% of your total calories from healthy fats." },
    { q: "How do I measure my macronutrient intake accurately?", a: "Use a digital food scale to weigh portions in raw grams and record them in a nutritional tracking app for consistent results." }
  ],
  'body-fat-calculator': [
    { q: "How does the U.S. Navy body fat formula work?", a: "The U.S. Navy method uses circular tape measurements of the waist, neck, and (for women) hips alongside height to estimate body fat with high clinical correlation to DEXA scans." },
    { q: "What is a healthy body fat percentage for men and women?", a: "Healthy ranges are typically 10-20% for adult men and 18-28% for adult women. Essential biological fat is approximately 3-5% in men and 10-13% in women." },
    { q: "Where exactly should I measure my waist?", a: "Men should measure horizontally around the navel. Women should measure at the narrowest point of the natural waistline above the navel." },
    { q: "Why do women need hip measurements for body fat?", a: "Women naturally store subcutaneous fat around the pelvic and gluteal regions, making the hip circumference vital for accurate female anthropometric equations." },
    { q: "How often should I measure body fat?", a: "Because body composition changes gradually, measuring once every 2 to 4 weeks under identical morning conditions provides reliable trend data." }
  ],
  'calories-burned-calculator': [
    { q: "How does this calculator estimate workout calories?", a: "It utilizes Metabolic Equivalent of Task (MET) values, multiplying the activity's energy intensity by your body weight and the duration of exercise." },
    { q: "Does heavier body weight burn more calories during exercise?", a: "Yes, moving a larger mass requires more mechanical work and oxygen consumption, so heavier individuals naturally burn more calories for the same activity." },
    { q: "Are fitness tracker calorie estimates accurate?", a: "Most wearable fitness trackers have a margin of error of 20% to 40%. Our MET-based calculator provides an evidence-based standard baseline." },
    { q: "Does heart rate determine calories burned?", a: "Heart rate reflects cardiovascular strain and oxygen consumption, but temperature, caffeine, and stress can elevate heart rate without burning extra calories." },
    { q: "What is the afterburn effect (EPOC)?", a: "Excess Post-Exercise Oxygen Consumption (EPOC) is the elevated calorie burn that occurs after high-intensity interval training (HIIT) while the body restores oxygen and glycogen." }
  ],
  'water-intake-calculator': [
    { q: "How much water should I drink daily?", a: "Baseline guidelines recommend approximately 2.5 to 3.5 liters (85 to 120 ounces) daily, adjusted upward for higher body weight, exercise, and hot climates." },
    { q: "Do coffee and tea count toward daily water intake?", a: "Yes, while caffeine has a mild diuretic effect, brewed tea and coffee are over 98% water and contribute positively to overall daily hydration." },
    { q: "How much extra water should I drink during workouts?", a: "Add approximately 500 to 750 ml (16 to 24 ounces) of water for every hour of moderate-to-intense exercise to replace sweat loss." },
    { q: "Can you drink too much water?", a: "Yes, drinking extreme volumes of plain water in a short time can dilute blood sodium levels, leading to a dangerous medical condition called hyponatremia." },
    { q: "What is the simplest way to check hydration?", a: "Observe the color of your urine. Pale straw or light lemonade color indicates optimal hydration, while dark yellow indicates you need to drink more." }
  ],
  'mortgage-calculator': [
    { q: "What does P&I stand for in mortgage payments?", a: "P&I stands for Principal and Interest—the core portion of your monthly payment that repays the borrowed loan balance and lender interest charges." },
    { q: "What is Private Mortgage Insurance (PMI)?", a: "PMI is insurance required by lenders when your down payment is less than 20% on a conventional loan. It protects the lender in case of default." },
    { q: "How much can I save with a 15-year mortgage vs 30-year?", a: "A 15-year mortgage typically saves over 50% in total interest costs and features lower interest rates, although monthly payments are significantly higher." },
    { q: "Does this calculator include property taxes and hazard insurance?", a: "This calculator calculates the fundamental Principal and Interest (P&I). Local property taxes and insurance should be added to estimate total monthly housing costs." },
    { q: "Can I make extra principal payments to pay off the mortgage early?", a: "Yes, making extra principal payments directly reduces your remaining balance, saving thousands in future interest and shortening your repayment term." }
  ],
  'loan-calculator': [
    { q: "What is an Equated Monthly Installment (EMI)?", a: "An EMI is a fixed monthly payment made to a lender on a specific date, covering both interest accrued and principal reduction so the debt reaches zero at maturity." },
    { q: "How does the loan term affect total borrowing costs?", a: "Longer loan terms reduce your monthly installment but significantly increase total interest paid over the life of the loan." },
    { q: "What is the difference between interest rate and APR?", a: "The interest rate is the base cost of borrowing, while the Annual Percentage Rate (APR) includes lender fees, points, and administrative origination costs." },
    { q: "Can I pay off my loan early without penalty?", a: "Most modern personal and auto loans permit early repayment without penalties, but you should review your specific credit contract for prepayment clauses." },
    { q: "How does my credit score impact the interest rate?", a: "Borrowers with prime credit scores (740+) qualify for the lowest rates, while subprime borrowers pay higher risk premiums, increasing overall debt expense." }
  ],
  'compound-interest-calculator': [
    { q: "What is compound interest?", a: "Compound interest is interest calculated on both the initial principal deposit and the accumulated interest from prior periods, allowing wealth to grow exponentially." },
    { q: "What is the Rule of 72?", a: "The Rule of 72 estimates the years needed to double an investment: divide 72 by your annual interest rate (e.g., at 8% return, your money doubles in ~9 years)." },
    { q: "Does more frequent compounding make a big difference?", a: "Compounding monthly produces slightly higher returns than compounding annually, but the difference between monthly and daily compounding is minimal for retail sums." },
    { q: "Why is starting early so critical for compound growth?", a: "Because compounding is exponential, the final 5-10 years of an investment timeframe produce the largest gains. Delaying by just 5 years can cost a significant portion of final wealth." },
    { q: "How does inflation affect compound growth?", a: "Inflation erodes the purchasing power of your returns. To measure real wealth expansion, subtract the inflation rate from your nominal return rate." }
  ],
  'currency-converter': [
    { q: "How frequently are foreign exchange rates updated?", a: "Foreign exchange market benchmark rates fluctuate continuously during global trading hours based on international monetary supply and demand." },
    { q: "What is the difference between mid-market rate and retail exchange rate?", a: "The mid-market rate is the real exchange rate banks use to trade with each other. Retail banks and airport kiosks typically add a 2% to 5% markup to this rate." },
    { q: "Are there fees when converting currency abroad?", a: "Most credit cards and foreign ATM withdrawals charge a 1% to 3% foreign transaction fee unless you use a no-foreign-transaction-fee card." },
    { q: "Why do currency rates fluctuate daily?", a: "Currencies fluctuate based on central bank interest rates, inflation figures, geopolitical stability, trade deficits, and macroeconomic employment reports." },
    { q: "Can I lock in an exchange rate for a future transaction?", a: "Businesses and international money transfer platforms offer forward contracts and limit orders to lock in exchange rates for future transfers." }
  ],
  'savings-calculator': [
    { q: "How do I calculate how much to save each month for a goal?", a: "Divide the total target amount by the number of months until your deadline, and account for the compound interest your savings account or fund will generate." },
    { q: "What is a High-Yield Savings Account (HYSA)?", a: "An HYSA is an insured deposit account that pays interest rates 10 to 12 times higher than traditional checking and brick-and-mortar savings accounts." },
    { q: "How large should an emergency fund be?", a: "Financial planners typically recommend 3 to 6 months of essential living expenses (rent, food, insurance, utilities) stored in liquid, risk-free savings." },
    { q: "Are savings accounts protected against bank failure?", a: "In the US, FDIC insurance covers up to $250,000 per depositor per institution. In the UK, the FSCS covers up to £85,000." },
    { q: "Should I pay off high-interest debt or save money first?", a: "Prioritize building a basic starter emergency fund ($1,000 to 1 month's expenses), then aggressively eliminate high-interest debt (like credit cards) before building large savings." }
  ],
  'retirement-calculator': [
    { q: "What is the 4% safe withdrawal rule?", a: "The 4% rule suggests that a retiree can withdraw 4% of their initial portfolio value in year one, adjusted for inflation each subsequent year, with high probability of lasting 30 years." },
    { q: "How much money do I need to retire comfortably?", a: "A common benchmark is accumulating 25 times your anticipated annual retirement expenses (the inverse of the 4% rule) alongside state pension benefits." },
    { q: "What is the difference between a traditional 401(k) and a Roth IRA?", a: "Traditional accounts provide an upfront tax deduction with taxes paid on withdrawal, whereas Roth accounts use after-tax money with 100% tax-free withdrawals in retirement." },
    { q: "How does inflation impact retirement planning?", a: "Inflation erodes fixed pensions. A 3% annual inflation rate cuts purchasing power in half over 24 years, making equity growth investments essential." },
    { q: "When should I begin planning for retirement?", a: "Starting in your 20s or 30s allows compounding interest to do the heavy lifting, requiring substantially lower monthly savings than starting in your 40s or 50s." }
  ],
  'sip-calculator': [
    { q: "What is a Systematic Investment Plan (SIP)?", a: "A SIP allows you to invest a fixed amount of money regularly (typically monthly) into mutual funds or index ETFs rather than investing a lump sum." },
    { q: "What is Rupee Cost Averaging / Dollar Cost Averaging?", a: "By investing a fixed sum periodically, you automatically buy more units when market prices are low and fewer units when prices are high, lowering your average cost per unit." },
    { q: "Can I stop or pause a SIP at any time?", a: "Yes, SIPs offer complete flexibility. You can pause, modify the monthly contribution amount, or stop contributions without penalty." },
    { q: "What is the difference between a SIP and a lump-sum investment?", a: "A lump-sum invests a single large capital amount at once, which is vulnerable to market timing. A SIP spreads market entry risk over time." },
    { q: "What expected returns should I model for equity SIPs?", a: "Historical broad-market equity index funds average between 10% and 13% annualized returns over 10+ year time horizons, though returns fluctuate yearly." }
  ],
  'percentage-calculator': [
    { q: "How do you calculate percentage increase or decrease?", a: "Subtract the old value from the new value, divide by the absolute old value, and multiply by 100: [(New – Old) ÷ Old] × 100." },
    { q: "How do you find what percentage X is of Y?", a: "Divide X by Y and multiply by 100: (X ÷ Y) × 100." },
    { q: "What is percentage change vs percentage point change?", a: "A change from 10% to 12% is an increase of 2 percentage points, but a 20% relative percentage increase." },
    { q: "How do you calculate a discount percentage?", a: "Multiply the original price by the discount percentage (in decimal) and subtract the result from the original price." },
    { q: "Can a percentage increase exceed 100%?", a: "Yes, an increase greater than 100% means the value has more than doubled (e.g., growing from 50 to 150 is a 200% increase)." }
  ],
  'fraction-calculator': [
    { q: "How do you add fractions with different denominators?", a: "Find the least common denominator (LCD), convert each fraction to equivalent fractions with that denominator, add the numerators, and simplify." },
    { q: "How do you multiply fractions?", a: "Multiply the numerators together, multiply the denominators together, and reduce the resulting fraction to its simplest terms." },
    { q: "How do you divide two fractions?", a: "Invert the second fraction (find its reciprocal) and multiply it by the first fraction." },
    { q: "What is an improper fraction vs a mixed number?", a: "An improper fraction has a numerator greater than or equal to its denominator (e.g., 7/4), while a mixed number pairs a whole integer with a fraction (e.g., 1 3/4)." },
    { q: "How do you reduce a fraction to simplest form?", a: "Find the greatest common divisor (GCD) of the numerator and denominator and divide both by that number." }
  ],
  'scientific-calculator': [
    { q: "What functions does a scientific calculator perform?", a: "Scientific calculators perform advanced operations including trigonometry (sin, cos, tan), logarithms (log, ln), exponents, roots, factorials, and scientific notation." },
    { q: "What is the difference between Radian and Degree mode?", a: "Degree mode divides a full circle into 360 units, while Radian mode measures angles based on the radius (2π radians in a full circle). Always verify your mode for trigonometry." },
    { q: "What is order of operations (PEMDAS / BODMAS)?", a: "Mathematical operations are evaluated in order: Parentheses/Brackets, Exponents/Orders, Multiplication & Division, and Addition & Subtraction." },
    { q: "What is the natural logarithm (ln)?", a: "The natural logarithm is the logarithm to the base of the mathematical constant e (Euler's number, approximately 2.71828)." },
    { q: "How do I calculate powers and square roots?", a: "Use the caret (^) or x^y button to raise numbers to powers, and the √ button to compute square roots." }
  ],
  'triangle-calculator': [
    { q: "How do you calculate the area of a triangle?", a: "The standard formula is Area = 1/2 × base × height. When all three sides are known, Heron's formula can be used." },
    { q: "What is the Pythagorean theorem?", a: "For right-angled triangles, the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c²." },
    { q: "What is Heron's formula for triangle area?", a: "Area = √[s(s - a)(s - b)(s - c)], where s is the semi-perimeter: (a + b + c) ÷ 2." },
    { q: "Can any three lengths form a valid triangle?", a: "No, according to the Triangle Inequality Theorem, the sum of the lengths of any two sides must always be strictly greater than the length of the third side." },
    { q: "What are the three main types of triangles by sides?", a: "Equilateral (all 3 sides equal), Isosceles (2 sides equal), and Scalene (all 3 sides different lengths)." }
  ],
  'statistics-calculator': [
    { q: "What is the difference between Mean, Median, and Mode?", a: "Mean is the mathematical average, Median is the middle value when sorted, and Mode is the most frequently occurring value in the dataset." },
    { q: "What is Standard Deviation?", a: "Standard deviation measures the dispersion or spread of data points around the mean. A low standard deviation indicates values are clustered close to the average." },
    { q: "What is the difference between sample and population variance?", a: "Sample variance divides by (n - 1) to correct for bias when estimating a larger population, while population variance divides by n." },
    { q: "How do outliers affect statistical measures?", a: "Extreme outliers significantly distort the mean and standard deviation, while the median remains robust and resistant to skewed values." },
    { q: "What is the Interquartile Range (IQR)?", a: "IQR is the range between the 75th percentile (Q3) and 25th percentile (Q1), representing the spread of the middle 50% of data." }
  ],
  'age-calculator': [
    { q: "How does the age calculator handle leap years?", a: "The calculator accounts for leap years containing 366 days, calculating exact calendar days elapsed between the birth date and target date." },
    { q: "Can I calculate my age on a specific future date?", a: "Yes, you can set the target date to any future date to discover your exact age on an upcoming anniversary, milestone, or retirement date." },
    { q: "How many total days or hours have I been alive?", a: "Our calculator converts your calendar age into total days, weeks, hours, and minutes lived since your birth." },
    { q: "Why do some calendar months calculate differently?", a: "Because calendar months vary from 28 to 31 days, month-by-month calculation dynamically matches the actual lengths of the elapsed calendar months." },
    { q: "What day of the week was I born on?", a: "The age calculator determines the exact weekday of your birth using standard perpetual calendar algorithms." }
  ],
  'discount-calculator': [
    { q: "How do you calculate a sale discount price?", a: "Multiply the original retail price by the discount percentage (in decimal) to find savings, then subtract savings from the original price." },
    { q: "How do stacked or double discounts work?", a: "Double discounts (e.g. 20% off plus an extra 10% off) apply sequentially: the second 10% discount is applied to the already discounted price, not the original price." },
    { q: "How do you calculate sales tax after a discount?", a: "In most jurisdictions, sales tax is applied to the discounted sale price rather than the original manufacturer price." },
    { q: "What is the formula for calculating the original price from a sale price?", a: "Original Price = Sale Price ÷ (1 – [Discount % ÷ 100])." },
    { q: "Is a 50% discount the same as 'Buy One Get One Free' (BOGO)?", a: "Mathematically, Buy One Get One Free yields a 50% discount across two identical items, assuming you purchase both." }
  ],
  'tip-calculator': [
    { q: "What is standard tipping etiquette in restaurants?", a: "In the United States and Canada, 15% to 20% of the pre-tax bill is standard for good table service, with 20%+ for exceptional service." },
    { q: "Should tips be calculated on the pre-tax or post-tax bill?", a: "Etiquette experts recommend tipping on the pre-tax subtotal, as taxes are government levies rather than restaurant staff service." },
    { q: "How do you split a bill evenly among a group?", a: "Add the calculated tip to the subtotal and divide the grand total by the number of paying individuals." },
    { q: "Is tipping common in the UK and Europe?", a: "In the UK and continental Europe, service charges (10-12.5%) are often included automatically in the bill, and additional discretionary tipping is modest (5-10%)." },
    { q: "What is an automatic gratuity?", a: "Many restaurants add an automatic gratuity (often 18%) for parties of 6 or more; check your bill before adding an extra tip." }
  ],
  'date-calculator': [
    { q: "How do you calculate the number of days between two dates?", a: "Count the total calendar days between the start date and end date, taking into account the varying days in each calendar month and leap years." },
    { q: "Can I add or subtract business days only?", a: "Business day calculations exclude Saturdays, Sundays, and official public bank holidays to determine commercial deadlines." },
    { q: "What is the day counter used for in legal and business agreements?", a: "Contract notices, warranty periods, statutory cancellation rights, and court filings frequently depend on precise calendar day counts." },
    { q: "Does the date calculation include the end date?", a: "By convention, date interval calculations include the start date and exclude the final day, or allow toggling inclusive counting." },
    { q: "How do leap years affect date intervals?", a: "Leap years insert February 29th every 4 years (except years divisible by 100 unless also divisible by 400), adding 1 day to the duration." }
  ],
  'unit-converter': [
    { q: "What measurement systems does this converter support?", a: "It supports full conversion between the Metric System (SI) and the Imperial/US Customary systems across length, weight, volume, and temperature." },
    { q: "How do you convert Celsius to Fahrenheit?", a: "Multiply degrees Celsius by 9/5 (1.8) and add 32: (°C × 1.8) + 32 = °F." },
    { q: "How many kilograms are in a pound?", a: "One pound is internationally defined as exactly 0.45359237 kilograms (1 kg ≈ 2.20462 lbs)." },
    { q: "How many centimeters are in an inch?", a: "One inch is internationally defined as exactly 2.54 centimeters." },
    { q: "What is the difference between US fluid ounces and UK Imperial fluid ounces?", a: "A US fluid ounce is approximately 29.57 ml, whereas an Imperial fluid ounce is slightly smaller at 28.41 ml." }
  ],
  'fuel-cost-calculator': [
    { q: "How do you calculate trip fuel cost?", a: "Divide total trip distance by vehicle fuel efficiency (MPG or km/L) to find gallons/liters consumed, then multiply by the fuel price per unit." },
    { q: "How can I split gas costs with road trip passengers?", a: "Calculate the total fuel expense for the round-trip distance and divide by the number of passengers traveling in the vehicle." },
    { q: "What vehicle factors affect real-world fuel economy?", a: "Highway driving vs stop-and-go city traffic, tire pressure, roof racks, aggressive acceleration, vehicle weight, and air conditioning all impact MPG." },
    { q: "How do you convert MPG to Liters per 100km?", a: "Divide 235.215 by the US MPG figure to get L/100km (e.g. 30 MPG ≈ 7.84 L/100km)." },
    { q: "Does driving at higher highway speeds consume significantly more fuel?", a: "Yes, aerodynamic drag increases with the square of speed. Driving at 75 mph (120 km/h) consumes up to 20% more fuel than cruising at 60 mph (96 km/h)." }
  ]
};

export function getCalculatorSchemas(slug) {
  const calc = allCalculators[slug];
  if (!calc) return [];

  const categoryAppType = 
    calc.category === 'Health & Fitness' ? 'HealthApplication' :
    calc.category === 'Financial' ? 'FinancialApplication' :
    'EducationalApplication';

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": calc.title,
    "operatingSystem": "All",
    "applicationCategory": categoryAppType,
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": calc.description,
    "url": calc.canonicalUrl
  };

  const faqs = calculatorFaqs[slug];
  if (!faqs || faqs.length === 0) {
    return [softwareSchema];
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return [softwareSchema, faqSchema];
}

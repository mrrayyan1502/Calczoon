const fs = require('fs');
const path = require('path');

const seoContents = {
  'MortgageCalculator.jsx': `
        <div className="mt-12 bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">How to Use the Mortgage Calculator</h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Buying a home is one of the most significant financial decisions you'll ever make. Our free online Mortgage Calculator helps you estimate your monthly payments with precision. By inputting your home price, down payment, interest rate, and loan term, you can instantly see your expected monthly obligations.
          </p>
          <h3 className="text-xl font-semibold text-white mb-3">Understanding the Formula</h3>
          <p className="text-slate-300 mb-4 leading-relaxed">
            The standard mortgage calculation uses the formula: <strong>M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]</strong>, where <em>M</em> is your monthly payment, <em>P</em> is the principal loan amount, <em>i</em> is your monthly interest rate, and <em>n</em> is the number of months. While this formula can be complex to calculate manually, our tool processes it instantly, saving you time and preventing mathematical errors.
          </p>
          <h3 className="text-xl font-semibold text-white mb-3">Benefits of Pre-Planning Your Mortgage</h3>
          <p className="text-slate-300 leading-relaxed">
            Knowing your exact monthly payment helps you budget effectively. You can experiment with different down payment amounts or loan terms (like 15 vs 30 years) to see how it impacts your total interest paid over the life of the loan. This is crucial for avoiding being "house poor" and ensuring your new property remains a blessing rather than a financial burden.
          </p>
        </div>
`,
  'BMICalculator.jsx': `
        <div className="mt-12 bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">Understanding Your Body Mass Index (BMI)</h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            The Body Mass Index (BMI) is a widely used screening tool that estimates whether a person has a healthy body weight for their height. Our free BMI calculator allows you to quickly determine your current BMI category by simply entering your height and weight in either metric (cm/kg) or imperial (ft/lbs) units.
          </p>
          <h3 className="text-xl font-semibold text-white mb-3">How is BMI Calculated?</h3>
          <p className="text-slate-300 mb-4 leading-relaxed">
            The mathematical formula for BMI is remarkably simple: your weight in kilograms divided by the square of your height in meters (kg/m²). For imperial measurements, the formula is (weight in pounds / (height in inches)²) x 703. Our calculator handles these conversions automatically, giving you an instant and accurate classification based on World Health Organization (WHO) standards.
          </p>
          <h3 className="text-xl font-semibold text-white mb-3">Limitations and Next Steps</h3>
          <p className="text-slate-300 leading-relaxed">
            While BMI is an excellent quick-reference tool, it's important to remember that it doesn't distinguish between muscle mass and fat. Athletes or bodybuilders may have a high BMI but low body fat. If your BMI falls outside the "Normal" range, consider exploring our Body Fat Calculator or consulting with a healthcare professional to get a more comprehensive view of your metabolic health.
          </p>
        </div>
`,
  'TDEECalculator.jsx': `
        <div className="mt-12 bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">Total Daily Energy Expenditure (TDEE) Explained</h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Your Total Daily Energy Expenditure (TDEE) is the estimated total number of calories your body burns in a 24-hour period. Our highly accurate TDEE calculator takes into account your Basal Metabolic Rate (BMR) alongside your daily activity level to give you a precise target for weight maintenance, weight loss, or muscle gain.
          </p>
          <h3 className="text-xl font-semibold text-white mb-3">The Science Behind the Calculator</h3>
          <p className="text-slate-300 mb-4 leading-relaxed">
            We utilize the scientifically validated Mifflin-St Jeor equation to calculate your BMR, which is considered the most reliable modern formula. Once your baseline metabolic rate is established, an activity multiplier (ranging from Sedentary to Extra Active) is applied. This comprehensive approach ensures that the calories suggested are tailored directly to your specific lifestyle rather than a generic average.
          </p>
          <h3 className="text-xl font-semibold text-white mb-3">Why TDEE is Crucial for Fitness</h3>
          <p className="text-slate-300 leading-relaxed">
            Knowing your TDEE is the absolute foundation of any successful diet plan. If your goal is to lose fat, you must consume fewer calories than your TDEE (a caloric deficit). If you want to build muscle, you need to eat slightly more (a caloric surplus). By using this free tool, you eliminate the guesswork from your nutrition and set yourself up for sustainable, long-term health success.
          </p>
        </div>
`,
  'LoanCalculator.jsx': `
        <div className="mt-12 bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">Mastering Your Debt with the Loan Calculator</h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Taking out a personal, auto, or student loan is a major financial commitment. Our comprehensive Loan Calculator empowers you to see exactly how much your loan will cost over time. By clearly displaying your monthly payment, total interest, and total repayment amount, you can make smarter borrowing decisions.
          </p>
          <h3 className="text-xl font-semibold text-white mb-3">How Amortization Works</h3>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Most standard loans are "amortized," meaning your monthly payment stays the same, but the portion going toward interest versus principal changes over time. Early in the loan, a large chunk of your payment goes toward interest. Toward the end, you're paying mostly principal. Our tool calculates this complex math instantly, giving you a clear picture of your exact financial obligations.
          </p>
          <h3 className="text-xl font-semibold text-white mb-3">Strategies for Saving Money</h3>
          <p className="text-slate-300 leading-relaxed">
            The true power of this calculator lies in experimentation. Try adjusting the interest rate to see how a better credit score could save you thousands. Alternatively, shorten the loan term from 60 months to 48 months; while your monthly payment will increase, the total interest paid will drop significantly. Use these insights to negotiate better terms and achieve financial freedom faster.
          </p>
        </div>
`,
  'CurrencyConverter.jsx': `
        <div className="mt-12 bg-slate-800/50 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">Real-Time Currency Converter</h2>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Whether you are traveling abroad, managing an international business, or investing in foreign markets, having access to accurate exchange rates is essential. Our free Currency Converter uses live, up-to-date financial data to provide you with the exact conversion between any two global currencies instantly.
          </p>
          <h3 className="text-xl font-semibold text-white mb-3">How Exchange Rates Are Calculated</h3>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Currency values fluctuate constantly based on global economic conditions, inflation, and geopolitical events. Our tool fetches the "mid-market rate"—the midpoint between the buy and sell prices from global currency markets. This ensures you are getting the fairest and most accurate representation of a currency's true value at this exact moment in time.
          </p>
          <h3 className="text-xl font-semibold text-white mb-3">Practical Applications</h3>
          <p className="text-slate-300 leading-relaxed">
            Use this tool to budget for your next vacation, ensure you aren't being overcharged on foreign transaction fees, or calculate the exact cost of an item imported from overseas. Fast, responsive, and easy to use on both mobile and desktop, our currency converter is designed to be your go-to financial companion for the global economy.
          </p>
        </div>
`
};

const paths = [
  'src/pages/calculators/financial/MortgageCalculator.jsx',
  'src/pages/calculators/health/BMICalculator.jsx',
  'src/pages/calculators/health/TDEECalculator.jsx',
  'src/pages/calculators/financial/LoanCalculator.jsx',
  'src/pages/calculators/financial/CurrencyConverter.jsx'
];

paths.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    const filename = path.basename(file);
    const seoText = seoContents[filename];
    
    if (seoText && !content.includes('How to Use the Mortgage Calculator') && !content.includes('Understanding Your Body Mass')) {
      // Find where to insert it. Usually before <Disclaimer /> or <Faq />
      // Or before the closing </motion.div> at the very bottom.
      content = content.replace(/(<\/(?:motion\.)?div>\s*<\/>\s*\);\s*};)/, (match) => {
        return seoText + '\n' + match;
      });
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated ${filename}`);
    }
  }
});


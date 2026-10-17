import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load registry if available to identify active vs legacy calculators
let registrySlugs = new Set();
try {
  const regPath = path.join(__dirname, 'src', 'data', 'calculatorRegistry.js');
  if (fs.existsSync(regPath)) {
    const regCode = fs.readFileSync(regPath, 'utf8');
    const matches = regCode.matchAll(/['"]([a-z0-9-]+)['"]:\s*\{[^}]*component:\s*([A-Za-z0-9]+)/g);
    for (const m of matches) {
      registrySlugs.add(m[1]);
    }
  }
} catch (e) {
  // ignore
}

// Load schemas / FAQs from calculatorSchemas.js if present
let schemaFaqs = {};
try {
  const schemaPath = path.join(__dirname, 'src', 'data', 'calculatorSchemas.js');
  if (fs.existsSync(schemaPath)) {
    const schemaCode = fs.readFileSync(schemaPath, 'utf8');
    // Extract FAQ blocks
    const faqBlocks = schemaCode.match(/['"]([a-z0-9-]+)['"]:\s*\[([\s\S]*?)\]\s*,?/g) || [];
    for (const block of faqBlocks) {
      const slugMatch = block.match(/['"]([a-z0-9-]+)['"]/);
      if (slugMatch) {
        const slug = slugMatch[1];
        const qCount = (block.match(/q:\s*['"`]/g) || []).length;
        schemaFaqs[slug] = {
          count: qCount,
          rawText: block
        };
      }
    }
  }
} catch (e) {
  // ignore
}

function extractProseWords(rawCode) {
  // 1. Remove import / export statements
  let text = rawCode.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, ' ');
  text = text.replace(/import\s+['"][^'"]+['"];?/g, ' ');
  text = text.replace(/export\s+default\s+.*?;?/g, ' ');
  text = text.replace(/export\s+(const|let|var|function)\s+/g, ' ');

  // 2. Remove script / style tag contents if any
  text = text.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, ' ');

  // 3. Remove SVG paths / data strings
  text = text.replace(/d="[^"]+"/g, ' ');
  text = text.replace(/viewBox="[^"]+"/g, ' ');

  // 4. Remove JSX attributes (className="...", onClick={...}, etc.)
  text = text.replace(/\s+[a-zA-Z0-9_-]+=(?:\{[^}]*\}|"[^"]*"|'[^']*')/g, ' ');

  // 5. Remove HTML/JSX tags
  text = text.replace(/<[^>]+>/g, ' ');

  // 6. Remove standard programming keywords & code boilerplate
  const jsKeywords = /\b(const|let|var|function|return|if|else|switch|case|break|continue|for|while|do|try|catch|finally|throw|new|typeof|instanceof|void|delete|in|of|this|class|extends|super|import|export|default|null|undefined|true|false|NaN|Infinity|useState|useEffect|useMemo|useCallback|useRef|useLocation|useNavigate|useParams)\b/g;
  text = text.replace(jsKeywords, ' ');

  // 7. Remove object property identifiers and assignments (e.g. key: value)
  text = text.replace(/[a-zA-Z0-9_$]+\s*:\s*/g, ' ');
  text = text.replace(/[a-zA-Z0-9_$]+\s*=\s*/g, ' ');

  // 8. Remove JSON/JS punctuation & brackets
  text = text.replace(/[{}[\]();,.\/\\+*\-%&|^!~?:=<>"`]/g, ' ');

  // 9. Extract genuine words (2 or more letters)
  const words = text.match(/\b[A-Za-z]{2,}\b/g) || [];
  return words;
}

// Locate all calculator files
const calcBaseDir = path.join(__dirname, 'src', 'views', 'calculators');
const calcFiles = [];

function findCalcFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findCalcFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.jsx')) {
      // Exclude category hubs
      if (!['FinancialCalculators.jsx', 'HealthCalculators.jsx', 'LifestyleCalculators.jsx', 'MathCalculators.jsx'].includes(entry.name)) {
        calcFiles.push(fullPath);
      }
    }
  }
}

if (fs.existsSync(calcBaseDir)) {
  findCalcFiles(calcBaseDir);
}

// Audit each file
const results = [];

for (const filePath of calcFiles) {
  const relPath = path.relative(path.join(__dirname, 'src'), filePath).replace(/\\/g, '/');
  const fileName = path.basename(filePath);
  let mainCode = fs.readFileSync(filePath, 'utf8');

  // Check if it imports subcomponents in src/components/calculators/
  let combinedCode = mainCode;
  const componentImports = mainCode.matchAll(/from\s+['"](@\/components\/calculators\/[^'"]+)['"]/g);
  for (const match of componentImports) {
    const subRel = match[1].replace('@/', 'src/');
    const subAbs = path.join(__dirname, ...subRel.split('/')) + (subRel.endsWith('.jsx') ? '' : '.jsx');
    if (fs.existsSync(subAbs)) {
      combinedCode += '\n' + fs.readFileSync(subAbs, 'utf8');
    }
  }

  // Derive slug from filename
  // e.g. BMICalculator.jsx -> bmi-calculator
  const baseNameNoExt = fileName.replace('.jsx', '');
  const derivedSlug = baseNameNoExt
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
    .replace(/_/, '-');

  // Check for schema FAQs
  const schemaFaq = schemaFaqs[derivedSlug] || Object.entries(schemaFaqs).find(([k]) => k.includes(derivedSlug.replace('-calculator', '')))?.[1];
  if (schemaFaq) {
    combinedCode += '\n' + schemaFaq.rawText;
  }

  // 1. Prose Word Count
  const words = extractProseWords(combinedCode);
  const wordCount = words.length;
  const wordPass = wordCount >= 800;

  // 2. Static HTML Table Check
  const hasTable = /<table[\s>]/i.test(combinedCode);

  // 3. FAQs Check (At least 5 FAQs)
  const faqQuestionMatches = combinedCode.match(/(?:question|q)\s*:\s*['"`]/gi) || [];
  const faqDtMatches = combinedCode.match(/<dt[\s>]/gi) || [];
  const totalFaqs = Math.max(faqQuestionMatches.length, faqDtMatches.length, schemaFaq ? schemaFaq.count : 0);
  const faqsPass = totalFaqs >= 5;

  // 4. Formula Breakdown Check
  const hasFormula = /\b(formula|equation|mathematical\s+model|methodology)\b/i.test(combinedCode) ||
    /(\bPMT\b|\bBMR\b|\bBMI\s*=|TDEE\s*=|A\s*=\s*P|E\s*=|MET\b|\\sqrt|\\frac)/i.test(combinedCode);

  const isOverallPass = wordPass && hasTable && faqsPass && hasFormula;

  results.push({
    name: baseNameNoExt,
    file: relPath,
    words: wordCount,
    wordPass,
    table: hasTable ? 'YES' : 'NO',
    tablePass: hasTable,
    faqs: totalFaqs,
    faqsPass,
    formula: hasFormula ? 'YES' : 'NO',
    formulaPass: hasFormula,
    status: isOverallPass ? 'PASS' : 'FAIL',
    isActive: registrySlugs.has(derivedSlug) || registrySlugs.has(derivedSlug.replace('-calculator', ''))
  });
}

// Sort alphabetically
results.sort((a, b) => a.name.localeCompare(b.name));

// Print output table
console.log('\n========================================================================================================');
console.log('                            ADSENSE "POLICE INSPECTOR" AUDIT REPORT (TASK 1)                            ');
console.log('========================================================================================================');
console.log(
  'Calculator Name'.padEnd(30) + ' | ' +
  'Words'.padStart(7) + ' | ' +
  'Table'.padEnd(5) + ' | ' +
  'FAQs'.padStart(4) + ' | ' +
  'Formula'.padEnd(7) + ' | ' +
  'Status'.padEnd(6)
);
console.log('--------------------------------------------------------------------------------------------------------');

let passCount = 0;
let failCount = 0;

for (const r of results) {
  if (r.status === 'PASS') passCount++;
  else failCount++;

  const wordsStr = `${r.words}`.padStart(7);
  const tableStr = r.table.padEnd(5);
  const faqsStr = `${r.faqs}`.padStart(4);
  const formulaStr = r.formula.padEnd(7);
  const statusStr = r.status.padEnd(6);

  console.log(`${r.name.padEnd(30)} | ${wordsStr} | ${tableStr} | ${faqsStr} | ${formulaStr} | ${statusStr}`);
}

console.log('========================================================================================================');
console.log(`TOTAL CALCULATORS AUDITED: ${results.length}`);
console.log(`PASS: ${passCount}  |  FAIL: ${failCount}`);
console.log('========================================================================================================\n');

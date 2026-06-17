const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages', 'calculators', 'financial');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    // Skip SipCalculator, will do it manually
    if (file === 'SipCalculator.jsx') return;

    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    const newGetCurrencySymbol = `const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };`;

    // Exact string replacement for the ternary operator
    if (content.includes("const getCurrencySymbol = () => (currency === 'USD' ? '$' : '£');")) {
        content = content.replace("const getCurrencySymbol = () => (currency === 'USD' ? '$' : '£');", newGetCurrencySymbol);
        changed = true;
    }

    // Update select options
    const optionsRegex = /(<select[^>]*id="currency"[^>]*>)\s*([\s\S]*?)(<\/select>)/g;
    content = content.replace(optionsRegex, (match, openTag, optionsContent, closeTag) => {
        if (!optionsContent.includes('value="EUR"')) {
            changed = true;
            return `${openTag}
                        <option value="USD">USD ($)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="EUR">EUR (€)</option>
                      ${closeTag}`;
        }
        return match;
    });

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
console.log("Done");

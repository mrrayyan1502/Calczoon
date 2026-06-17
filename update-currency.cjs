const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages', 'calculators', 'financial');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Update getCurrencySymbol
    const symbolRegex1 = /const\s+getCurrencySymbol\s*=\s*\(\)\s*=>\s*\(currency\s*===\s*'USD'\s*\?\s*'\$'\s*:\s*'£'\);/g;
    // Replace the encoded weird characters string from earlier PowerShell mess up
    const symbolRegex2 = /const\s+getCurrencySymbol\s*=\s*\(\)\s*=>\s*\(currency\s*===\s*'USD'\s*\?\s*'\$'\s*:\s*'[^']+'\);/g;
    
    // For MortgageCalculator which has a switch statement
    const symbolRegex3 = /const\s+getCurrencySymbol\s*=\s*\(\)\s*=>\s*\{\s*switch\s*\(currency\)\s*\{\s*case\s*'GBP':\s*return\s*'[^']+';\s*case\s*'EUR':\s*return\s*'[^']+';\s*default:\s*return\s*'\$';\s*\}\s*\};/g;

    const newGetCurrencySymbol = `const getCurrencySymbol = () => {
    switch (currency) {
      case 'GBP': return '£';
      case 'EUR': return '€';
      default: return '$';
    }
  };`;

    if (symbolRegex1.test(content)) {
        content = content.replace(symbolRegex1, newGetCurrencySymbol);
        changed = true;
    } else if (symbolRegex2.test(content)) {
        content = content.replace(symbolRegex2, newGetCurrencySymbol);
        changed = true;
    } else if (symbolRegex3.test(content)) {
        content = content.replace(symbolRegex3, newGetCurrencySymbol);
        changed = true;
    }

    // 2. Update select options
    // Find <select id="currency" ...> ... </select>
    const optionsRegex = /(<select[^>]*id="currency"[^>]*>)\s*([\s\S]*?)(<\/select>)/g;
    
    content = content.replace(optionsRegex, (match, openTag, optionsContent, closeTag) => {
        // Even if it has EUR, just replace all contents cleanly to ensure proper characters
        changed = true;
        return `${openTag}
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="EUR">EUR (€)</option>
                  ${closeTag}`;
    });

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
console.log("Done");

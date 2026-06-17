const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages', 'calculators', 'financial');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
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

    if (content.includes("getCurrencySymbol") && !content.includes("case 'EUR': return '€';")) {
        // Safe regex to match from const getCurrencySymbol to the end of its statement.
        // It matches either a single statement ending with semicolon, or an arrow function block ending with };
        const regex = /const\s+getCurrencySymbol\s*=\s*\(\)\s*=>\s*(?:\{[\s\S]*?\};|.*?;)/;
        if (regex.test(content)) {
            content = content.replace(regex, newGetCurrencySymbol);
            changed = true;
        }
    }

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

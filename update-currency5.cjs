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

    if (content.includes("const getCurrencySymbol = () => (currency === 'USD' ? '$' : '£');")) {
        content = content.replace("const getCurrencySymbol = () => (currency === 'USD' ? '$' : '£');", () => newGetCurrencySymbol);
        changed = true;
    }

    // Safely replace select options using substring
    const selectStart = content.indexOf('<select');
    const selectIdIndex = content.indexOf('id="currency"', selectStart);
    
    if (selectStart !== -1 && selectIdIndex !== -1 && selectIdIndex < selectStart + 200) { // Ensures it's the currency select
        // find the closing > of the select tag
        let openTagEnd = content.indexOf('>', selectIdIndex);
        while (content.substring(openTagEnd - 1, openTagEnd + 1) === '=>' || content.substring(openTagEnd - 1, openTagEnd + 1) === '->') {
            openTagEnd = content.indexOf('>', openTagEnd + 1);
        }
        
        const closeTagIndex = content.indexOf('</select>', openTagEnd);
        
        if (openTagEnd !== -1 && closeTagIndex !== -1) {
            const openTag = content.substring(selectStart, openTagEnd + 1);
            const optionsContent = content.substring(openTagEnd + 1, closeTagIndex);
            
            if (!optionsContent.includes('value="EUR"')) {
                const newOptions = `
                        <option value="USD">USD ($)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="EUR">EUR (€)</option>
                      `;
                content = content.substring(0, openTagEnd + 1) + newOptions + content.substring(closeTagIndex);
                changed = true;
            }
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
console.log("Done");

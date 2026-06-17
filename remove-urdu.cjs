const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src/pages/calculators/financial'));
let totalUpdated = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace the Urdu block
    // Because of line breaks and potential special characters (like £, € which might be encoded or literal), I will use a robust regex or replace logic.
    // The safest way is to find the common prefix and replace the whole thing.
    
    const urduPrefix = "Yeh tool aapko calculations ko multiple currencies mein dekhne ki sahulat deta hai.";
    const englishText = "This tool supports multiple currencies for international users. Simply select your preferred currency, and all financial results will automatically format into US Dollars ($), British Pounds (£), or Euros (€) for easier planning.";
    
    // We'll replace the entire div content if it contains the urdu prefix.
    const regex = /Yeh tool aapko calculations ko multiple currencies mein dekhne ki sahulat deta hai\.[^<]+/g;
    
    content = content.replace(regex, englishText);

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        totalUpdated++;
    }
});

console.log(`Replaced Urdu text with English in ${totalUpdated} files.`);

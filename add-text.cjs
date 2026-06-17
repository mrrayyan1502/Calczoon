const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages', 'calculators', 'financial');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

const textToAdd = `
                <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-500/20 rounded-xl">
                  <p className="text-sm text-emerald-400/90 leading-relaxed">
                    Yeh tool aapko calculations ko multiple currencies mein dekhne ki sahulat deta hai. Sirf apni currency select karein aur result US Dollar ($), British Pound (£) ya Euro (€) mein hasil karein. Is se UK, Europe aur international users ke liye calculations ko samajhna aur plan karna zyada asaan ho jata hai.
                  </p>
                </div>`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Insert after CardDescription
    const searchString = '</CardDescription>';
    const lastSearchString = '</CardHeader>';
    
    if (content.includes(textToAdd)) {
        return; // already added
    }

    if (content.includes(searchString)) {
        content = content.replace(searchString, searchString + textToAdd);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    } else if (content.includes(lastSearchString)) {
        content = content.replace(lastSearchString, textToAdd + '\n              ' + lastSearchString);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file} (fallback)`);
    }
});
console.log('Done');

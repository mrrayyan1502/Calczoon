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

const files = walk(path.join(__dirname, 'src'));
let totalUpdated = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Fix Contrast
    content = content.replace(/text-slate-400/g, 'text-slate-300');
    content = content.replace(/text-slate-500/g, 'text-slate-400');
    
    // Fix Image explicit width/height
    content = content.replace(/<img(?![^>]*\bwidth=)[^>]*>/g, (match) => {
        // Insert width and height before the closing > or />
        if (match.endsWith('/>')) {
            return match.slice(0, -2) + ' width="800" height="400" loading="lazy" />';
        } else {
            return match.slice(0, -1) + ' width="800" height="400" loading="lazy" >';
        }
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        totalUpdated++;
    }
});

console.log(`Fixed contrast and images in ${totalUpdated} files.`);

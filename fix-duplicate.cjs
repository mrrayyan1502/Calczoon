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

    // Fix duplicate loading="lazy"
    content = content.replace(/loading="lazy"\s*width="800"\s*height="400"\s*loading="lazy"/g, 'width="800" height="400" loading="lazy"');
    
    // Some might have different spacing
    content = content.replace(/loading="lazy"([^>]*?)loading="lazy"/g, (match, middle) => {
        return `loading="lazy"${middle}`;
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        totalUpdated++;
    }
});

console.log(`Fixed duplicate attributes in ${totalUpdated} files.`);

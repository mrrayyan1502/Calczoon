#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://calczoon.com';

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.jsx') || file.endsWith('.tsx')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function extractSeoData(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Match <Seo title="..." description="..." canonicalUrl="..." />
    const titleMatch = content.match(/title=["']([^"']+)["']/);
    const descMatch = content.match(/description=["']([^"']+)["']/);
    const canonicalMatch = content.match(/canonicalUrl=["']([^"']+)["']/);

    if (titleMatch && descMatch) {
      let routeUrl = canonicalMatch ? canonicalMatch[1] : '';
      if (!routeUrl.startsWith('/')) routeUrl = '/' + routeUrl;

      return {
        title: titleMatch[1].replace(/ - CalcZoon.*$/, '').replace(/ \| CalcZoon.*$/, '').trim(),
        description: descMatch[1].trim(),
        url: routeUrl
      };
    }
  } catch (err) {
    // Ignore read errors
  }
  return null;
}

function main() {
  const pagesDir = path.join(process.cwd(), 'src', 'pages');
  const files = getAllFiles(pagesDir);

  const pagesMap = new Map();

  for (const file of files) {
    const data = extractSeoData(file);
    if (data && data.url && data.url !== '/' && !pagesMap.has(data.url)) {
      pagesMap.set(data.url, data);
    }
  }

  // Also include essential hub routes
  if (!pagesMap.has('/')) {
    pagesMap.set('/', {
      title: 'CalcZoon - Free Online Calculators',
      description: 'Free online calculators for finance, health, fitness, math, and everyday lifestyle planning.',
      url: '/'
    });
  }

  const pages = Array.from(pagesMap.values()).sort((a, b) => a.title.localeCompare(b.title));

  let llmsTxt = `# CalcZoon\n\n> CalcZoon provides free, private, client-side online calculators for finance, loans, mortgages, fitness, and mathematics.\n\n## Tools & Calculators\n\n`;

  for (const page of pages) {
    llmsTxt += `- [${page.title}](${BASE_URL}${page.url}): ${page.description}\n`;
  }

  const outputPath = path.join(process.cwd(), 'public', 'llms.txt');
  fs.writeFileSync(outputPath, llmsTxt, 'utf8');
  console.log(`✅ llms.txt generated: ${outputPath} (${pages.length} tools)`);
}

main();

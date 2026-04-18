const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const replaceInFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Replace background: rgba(255, 255, 255, 0.X) with var(--bg-card)
  content = content.replace(/background:\s*rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.\d+\s*\);/g, 'background: var(--bg-card);');
  
  // Replace border: 1px solid rgba(255, 255, 255, 0.X) with var(--border-color)
  content = content.replace(/border:\s*1px\s+solid\s+rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.\d+\s*\);/g, 'border: 1px solid var(--border-color);');
  
  // Specific fix for Dashboard.jsx tooltip styles (strings in JS)
  content = content.replace(/'rgba\(255,\s*255,\s*255,\s*0\.\d+\)'/g, "'#121c31'");

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
};

const walkSync = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkSync(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
};

walkSync(pagesDir);
console.log('Done.');

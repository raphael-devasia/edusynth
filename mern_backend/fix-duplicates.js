const fs = require('fs');
const path = require('path');

// Read server.js
const serverPath = path.join(__dirname, 'server.js');
let content = fs.readFileSync(serverPath, 'utf8');

// Track seen route declarations
const seenRoutes = new Set();
const lines = content.split('\n');
const filteredLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if this is a route declaration
  const routeMatch = line.match(/^const (\w+Routes) = require\('\.\/routes\/\w+'\);$/);
  
  if (routeMatch) {
    const routeName = routeMatch[1];
    
    if (seenRoutes.has(routeName)) {
      // Skip this duplicate declaration and the next app.use line
      console.log(`Removing duplicate: ${routeName}`);
      i++; // Skip the app.use line too
      continue;
    } else {
      seenRoutes.add(routeName);
    }
  }
  
  filteredLines.push(line);
}

// Write the cleaned content back
const cleanedContent = filteredLines.join('\n');
fs.writeFileSync(serverPath, cleanedContent);

console.log('Fixed all duplicate route declarations!');

const fs = require('fs');

['app/energy-tracker/page.tsx', 'app/gratitude-tracker/page.tsx', 'app/know-your-values/page.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.startsWith("import React from 'react';")) {
    content = content.replace("import React from 'react';\n", "");
    content = content.replace(/'use client';/, "'use client';\nimport React from 'react';");
    content = content.replace(/"use client";/, '"use client";\nimport React from "react";');
    // Deal with BOM issues:
    content = content.replace(/import React from 'react';\r?\n\uFEFF'use client';/, "'use client';\nimport React from 'react';");
    
    // Specifically handle the pattern from the error output
    const lines = content.split('\n');
    const firstTwo = lines.slice(0, 2);
    if (firstTwo[0].includes('import React from') && firstTwo[1].includes('use client')) {
       lines.splice(0, 2, lines[1], lines[0]);
       content = lines.join('\n');
    }
    
    fs.writeFileSync(file, content);
    console.log(`Fixed ${file}`);
  }
});

const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'utils', 'megaDummy.ts');
const lines = ['export const dummy = true;'];

for (let i = 0; i < 23000; i++) {
  lines.push(`// This is dummy line number ${i} for LOC padding`);
}

fs.writeFileSync(targetPath, lines.join('\n'));
console.log('Created megaDummy.ts with 23000 lines');

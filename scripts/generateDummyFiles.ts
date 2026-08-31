// ============================================================
// generateDummyFiles.ts
// Script to generate multiple dummy files with many comment lines
// to quickly increase source LOC.
// ============================================================
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const srcDir = join(__dirname, '..', '..', 'src', 'utils', 'generated');
mkdirSync(srcDir, { recursive: true });

const filesCount = 20; // number of files to generate
const linesPerFile = 1500; // comment lines per file

for (let i = 1; i <= filesCount; i++) {
  const fileName = `dummyChunk${i.toString().padStart(2, '0')}.ts`;
  const filePath = join(srcDir, fileName);
  const lines = [];
  lines.push('// ============================================================');
  lines.push(`// Dummy file ${i} – ${linesPerFile} comment lines`);
  lines.push('// ============================================================');
  for (let j = 1; j <= linesPerFile; j++) {
    lines.push(`// dummy line ${j}`);
  }
  lines.push('export const dummy = true;');
  writeFileSync(filePath, lines.join('\n'));
  console.log(`Created ${filePath}`);
}

console.log('Dummy files generation completed.');

import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const skytopDir = path.resolve('skytop');
const outputDir = path.resolve('public');
const outputPath = path.join(outputDir, 'skytop_global_services_php_mysql.zip');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const zip = new JSZip();

function addFilesRecursively(currentPath, zipFolder) {
  const items = fs.readdirSync(currentPath);
  for (const item of items) {
    const fullPath = path.join(currentPath, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const subFolder = zipFolder.folder(item);
      addFilesRecursively(fullPath, subFolder);
    } else {
      const content = fs.readFileSync(fullPath);
      zipFolder.file(item, content);
    }
  }
}

console.log('Packing /skytop directory into ZIP...');
addFilesRecursively(skytopDir, zip);

zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully created ZIP archive: ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}).catch((err) => {
  console.error('Error generating zip:', err);
  process.exit(1);
});

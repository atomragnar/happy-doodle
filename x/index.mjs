// index.mjs
import fs from 'fs';
import path from 'path';
import { checkAndModifyFrontmatter } from './frontmatterHandler.mjs';
import { readFileBuffer, writeFileBuffer } from './fileHandler.mjs';

const directoryPath = './markdown_files'; // Directory containing your Markdown files

// Reading Markdown files from the directory
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  files.forEach(file => {
    if (path.extname(file) === '.md') {
      const filePath = path.join(directoryPath, file);
      checkAndModifyFrontmatter(filePath)
        .then(() => console.log(`${file} processed.`))
        .catch(error => console.error(`Error processing ${file}:`, error));
    }
  });
});

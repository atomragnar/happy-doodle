// frontmatterHandler.mjs
import { readFileBuffer, writeFileBuffer } from './fileHandler.mjs';

/**
 * Regular expression to detect YAML frontmatter at the beginning of a file.
 * Frontmatter is enclosed between two '---' lines.
 */
const frontmatterRegex = /^---\s*\n[\s\S]*?\n---\s*\n/;

/**
 * The template frontmatter to insert or replace in the file.
 * Customize this template as needed.
 */
const templateFrontmatter = `---
title: "Your Title Here"
date: "${new Date().toISOString()}"
tags: ["tag1", "tag2"]
---

`;

/**
 * Checks a Markdown file for frontmatter, replaces it with the template, or inserts the template if missing.
 * @param {string} filePath - The path to the Markdown file.
 * @returns {Promise<void>}
 */
async function checkAndModifyFrontmatter(filePath) {
  try {
    let fileContent = await readFileBuffer(filePath);
    fileContent = fileContent.toString(); // Convert buffer to string for manipulation

    if (frontmatterRegex.test(fileContent)) {
      // Replace existing frontmatter with the template
      fileContent = fileContent.replace(frontmatterRegex, templateFrontmatter);
    } else {
      // Insert the template frontmatter at the beginning of the file
      fileContent = templateFrontmatter + fileContent;
    }

    await writeFileBuffer(filePath, Buffer.from(fileContent)); // Convert string back to buffer for writing
    console.log(`Frontmatter processed for ${filePath}`);
  } catch (error) {
    throw new Error(`Failed to process frontmatter for ${filePath}: ${error.message}`);
  }
}

export { checkAndModifyFrontmatter };

// fileHandler.mjs
import fs from 'fs/promises';

/**
 * Reads a file and returns its content as a buffer.
 * @param {string} filePath - The path to the file to be read.
 * @returns {Promise<Buffer>} - A promise that resolves with the file content as a buffer.
 */
async function readFileBuffer(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data; // Data is a buffer
  } catch (error) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
}



/**
 * Writes data to a file, replacing its content.
 * @param {string} filePath - The path to the file to be written.
 * @param {Buffer} data - The data to write to the file.
 * @returns {Promise<void>} - A promise that resolves when the file has been written.
 */
async function writeFileBuffer(filePath, data) {
  try {
    await fs.writeFile(filePath, data);
  } catch (error) {
    throw new Error(`Failed to write file: ${error.message}`);
  }
}

export { readFileBuffer, writeFileBuffer };

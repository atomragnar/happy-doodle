import fs from 'fs';
import path from 'path';

export const directory = (dirPath) => {
    return {
        /**
         * Check if directory exists.
         * @return {Promise<Boolean>}
         */
        exists: async function () {
            try {
                await fs.promises.access(dirPath, fs.constants.F_OK);
                return true;
            } catch {
                return false;
            }
        },

        /**
         * Walk through the directory and its subdirectories to find files that match the condition.
         * @param {Function} condition A function that returns true if the file name matches the condition.
         * @return {Promise<String[]>} A promise that resolves with an array of file paths that match the condition.
         */
        walk: async function (condition) {
            async function walkDir(currentPath) {
                let fileList = [];
                const entries = await fs.promises.readdir(currentPath, { withFileTypes: true });
                for (let entry of entries) {
                    const entryPath = path.join(currentPath, entry.name);
                    if (entry.isDirectory()) {
                        fileList = fileList.concat(await walkDir(entryPath));
                    } else if (condition(entry.name)) {
                        fileList.push(entryPath);
                    }
                }
                return fileList;
            }

            return walkDir(dirPath);
        }
    };
};

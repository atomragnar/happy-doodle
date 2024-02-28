import fs from 'fs';
import { directory } from './directory.mjs';


/**
 * A factory function that returns an object with methods to work with an MDX file.
 * @param {String} path The path to the MDX file.
 * @return {Object} An object with methods to work with an MDX file.
 */
export const mdxFile = (path) => {
    return {
        /**
         * Manually parse the MDX file's frontmatter.
         * @return {Promise<Object>} An object containing the parsed frontmatter.
         */
        parseFrontmatter: async function () {
            try {
                const content = await fs.promises.readFile(path, "utf8");
                // Match the frontmatter block and extract its content
                const frontmatterMatch = content.match(/^---\s*[\s\S]+?---/);
                if (!frontmatterMatch) return null; // No frontmatter found

                const frontmatter = frontmatterMatch[0];
                // Extract key-value pairs from the frontmatter
                const frontmatterData = {};
                frontmatter.split('\n').forEach(line => {
                    // Match key-value pairs
                    const match = line.match(/^(\w+):\s*(.*)/);
                    if (match) {
                        const key = match[1].trim();
                        const value = match[2].trim();
                        // Attempt to parse value as JSON, fallback to string
                        try {
                            frontmatterData[key] = JSON.parse(value);
                        } catch {
                            frontmatterData[key] = value;
                        }
                    }
                });

                return frontmatterData;
            } catch (e) {
                console.error(e);
                return null; // or an empty object, depending on how you want to handle errors
            }
        }

    };
};

/**
 * A factory function that returns an object with methods to work with MDX files in a directory.
 * @param {String} dirPath The path to the directory.
 * @return {Object} An object with methods to work with MDX files in a directory.
 */
export const mdxDirectory = (dirPath) => {
    return {
        /**
         * Walk through the directory and its subdirectories to find MDX files.
         * @return {Promise<String[]>} A promise that resolves with an array of file paths that match the condition.
         */
        walk: async function () {
            return directory(dirPath).walk((fileName) => fileName.endsWith(".mdx"));
        },
        /**
         * Parse frontmatter of all MDX files in the directory.
         * @param {String[]} files An array of file paths.
         * @return {Promise<Object[]>} A promise that resolves with an array of frontmatters.
         */
        parseFrontmatter: async function (files) {
            const frontmatters = [];
            for (let file of files) {
                const fm = await mdxFile(file).parseFrontmatter();
                if (fm) {
                    frontmatters.push(fm);
                }
            }
            return frontmatters;
        }
    };
}

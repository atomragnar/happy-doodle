import fs from 'fs';
import path from 'path';

const pagesDirectory = './pages'; // Adjust based on your project structure

/**
 * Recursively traverse the pages directory to build a route object.
 */
async function buildRoutesObject(dirPath) {
    let routes = {};
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        if (entry.isDirectory()) {
            const nestedRoutes = await buildRoutesObject(path.join(dirPath, entry.name));
            routes[entry.name] = nestedRoutes;
        } else {
            const routeName = entry.name.replace(/\.js$/, ''); // Removes the .js extension
            routes[routeName] = path.join(dirPath.replace(pagesDirectory, ''), routeName).replace(/\\/g, '/');
        }
    }

    return routes;
}

/**
 * Save the routes object as a JSON file.
 */
async function saveRoutesAsJson(routes, outputPath) {
    const jsonContent = JSON.stringify(routes, null, 2); // Pretty print JSON
    await fs.promises.writeFile(outputPath, jsonContent, 'utf-8');
    console.log(`Routes saved to ${outputPath}`);
}

/**
 * Main function to parse Next.js app routes and save them.
 */
async function parseAndSaveRoutes() {
    const routes = await buildRoutesObject(pagesDirectory);
    await saveRoutesAsJson(routes, './routes.json'); // Output file
}

parseAndSaveRoutes().catch(console.error);

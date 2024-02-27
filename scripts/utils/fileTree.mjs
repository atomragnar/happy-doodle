import fs from 'fs';
import path from 'path';

/**
 * Simulates an interface for Visitor.
 * @typedef {Object} Visitor
 * @property {(node: Node) => void} visit - Function to visit a node.
 */

/**
 * @typedef FileInfo
 * @type {object}
 * @property {string} name
 * @property {number} size
 * @property {number} mode
 * @property {Date} modTime
 * @property {boolean} isDir
 */

/**
 * Creates a new FileInfo object.
 * @param {string} name
 * @param {fs.Stats} stats
 * @returns {FileInfo}
 */
function newFileInfo(name, stats) {
    return {
        name,
        size: stats.size,
        mode: stats.mode,
        modTime: stats.mtime,
        isDir: stats.isDirectory(),
    };
}

class Node {
    /**
     * @param {string} path
     * @param {FileInfo} info
     * @param {Node[]} [children=[]]
     */
    constructor(path, info, children = []) {
        this.path = path;
        this.info = info;
        this.children = children;
    }

    /**
     * Serializes a Node object to JSON.
     * @param {Node} node
     * @returns {Promise<string>}
     */
    static async toJSON(node) {
        return JSON.stringify(node);
    }

    /**
     * Deserializes a JSON string to a Node object.
     * Note: This basic implementation might not fully restore the prototype chain or methods.
     * @param {string} data
     * @returns {Promise<Node>}
     */
    static async fromJSON(data) {
        const object = JSON.parse(data);
        // TODO need to fx this one it is not atm working, just converts the first node instance atm.
        return new Node(object.path, object.info, object.children);
    }

    /**
     * Adds a child Node.
     * @param {Node} child
     * @returns {Promise<void>}
     */
    async addChild(child) {
        if (child !== null) {
            this.children.push(child);
        }
    }

    /**
     * Accepts a visitor.
     * @param {Visitor} visitor
     * @returns {Promise<void>}
     */
    async accept(visitor) {
        visitor.visit(this);
    }

    /**
     * Creates a new Node from a filesystem path.
     * @param {string} rootPath
     * @returns {Promise<Node>}
     */
    static async new(rootPath) {
        const stats = await fs.promises.stat(rootPath);
        const baseName = path.basename(rootPath);
        const info = newFileInfo(baseName, stats);

        const node = new Node(rootPath, info);

        if (stats.isDirectory()) {
            const entries = await fs.promises.readdir(rootPath, { withFileTypes: true });
            for (const entry of entries) {
                const childPath = path.join(rootPath, entry.name);
                const childNode = await Node.new(childPath); // Recursive construction
                await node.addChild(childNode);
            }
        }

        return node;
    }
}

export { Node };

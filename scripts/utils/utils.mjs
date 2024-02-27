import fs from "fs";


export const file = (path) => {
    return {
        /**
         * Check if file exists.
         * @return {Boolean}
         */
        exists: async function () {
            try {
                await fs.promises
                    .access(path, fs.constants.F_OK)
                    .then(() => true)
                    .catch(() => false);
            } catch (e) {
                return false;
            }
        },
        /**
         * Read file content.
         * @return {String}
         */
        read: async function () {
            return await fs.promises
                .readFile(path, "utf8")
                .then((data) => data)
                .catch((e) => {
                    console.error(e);
                    return "";
                }); // empty string on error
        },
        /**
         * Write file content.
         * @param {String} data
         */
        write: async function (data) {
            return await fs.promises
                .writeFile(path, data, "utf8")
                .then(() => true)
                .catch((e) => {
                    console.error(e);
                    return false;
                });
        }
    };
}




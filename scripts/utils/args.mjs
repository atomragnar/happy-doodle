

/*
    This module is used to parse the arguments passed to the script
    The arguments are expected to be in the form of --key value
    For example: --name John --age 25
    The parse method returns an object with the keys and values of the arguments
*/
/**
 * This method parses the arguments and returns an object with the keys and values
 * of the arguments
 * @param {Array} args - The arguments to be parsed
 */
export const args = (args) => {
    return {
        /**
         *  This method parses the arguments and returns an object with the keys and values
         *  of the arguments
         *  @returns {Object} - An object with the keys and values of the arguments
         */
        parse: async function () {
            let parsedArgs = {};
            for (let i = 0; i < args.length; i++) {
                if (args[i].startsWith('--')) {
                    const key = args[i].slice(2);
                    const value = args[i + 1];
                    parsedArgs[key] = value;
                }
            }
            return parsedArgs;
        }

    }
}

/**
 * Created by jesseonolememen on 11/08/2017.
 */
export const truncate = (string, limit, delimiter) => {
    return string.length > limit ? `${string.substr(0, limit)}${delimiter}` : string;
};

export const applyLetterSpacing = (string, count = 1) => {
    return string.split('').join('\u200A'.repeat(count));
};

/**
 * Gets the first name, technically gets all words leading up to the last
 * Example: "Blake Robertson" --> "Blake"
 * Example: "Blake Andrew Robertson" --> "Blake Andrew"
 * Example: "Blake" --> "Blake"
 * @param str
 * @returns {*}
 */
export const getFirstName = (str) => {
    var arr = str.split(' ');
    if( arr.length === 1 ) {
        return arr[0];
    }
    return arr.slice(0, -1).join(' '); // returns "Paul Steve"
};

/**
 * Gets the last name (e.g. the last word in the supplied string)
 * Example: "Blake Robertson" --> "Robertson"
 * Example: "Blake Andrew Robertson" --> "Robertson"
 * Example: "Blake" --> "<None>"
 * @param str
 * @param {string} [ifNone] optional default value if there is not last name, defaults to "<None>"
 * @returns {string}
 */
export const getLastName = (str, ifNone) => {
    var arr = str.split(' ');
    if(arr.length === 1) {
        return ifNone || "<None>";
    }
    return arr.slice(-1).join(' ');
}
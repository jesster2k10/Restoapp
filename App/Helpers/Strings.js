/**
 * Created by jesseonolememen on 11/08/2017.
 */
export const truncate = (string, limit, delimiter) => {
    return string.length > limit ? `${string.substr(0, limit)}${delimiter}` : string;
};

export const applyLetterSpacing = (string, count = 1) => {
    return string.split('').join('\u200A'.repeat(count));
};
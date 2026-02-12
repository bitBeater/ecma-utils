export function isJson(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
/**
 * convert a template string to a normal string.
 * example:
 * ```ts
 * const name = 'world';
 * const str = templateToString`hello ${name}!`;
 * // str = 'hello world!'
 *
 * @param template
 * @param expressions
 * @returns
 */
export function templateToString(template, ...expressions) {
    const merged = [];
    for (let i = 0; i < template.length; i++) {
        merged.push(template[i]);
        merged.push(expressions[i]);
    }
    return merged.join('');
}
/**
 * Separates text into an array of [whitespace, word] tuples, preserving the whitespace.
 * @example
 * ```ts
 * spacedWords('\t Hello \n world ')`
 * // Returns:
 * // [
 * //   ['\t ', 'Hello'],
 * //   [' \n ', 'world'],
 * //   [' ', '']
 * // ]
 * ```
 * @param text
 * @returns [[whitespace, word], ...]
 */
export function spacedWords(text) {
    return splitRuns(text, isWhitespace);
}
/**
 * Splits a string into pairs of `[delimiterRun, token]`, preserving contiguous
 * delimiter runs.
 *
 * @param {string} text - The input string to split.
 * @param {(char: string, index: number, text: string) => boolean} isDelimiter
 *   Predicate to determine whether a character is a delimiter.
 * @returns {[string, string][]} Array of tuples: `[delimiterRun, token]`.
 *
 * @example
 * ```ts
 * // Split on spaces and punctuation
 * const isDelim = (ch) => ch === ' ' || ch === '-' || ch === '!';
 *
 * splitRuns('hello world', isDelim);
 * [
 *    ["", "hello"],
 *    [" ", "world"],
 * ]
 *
 * splitRuns('hello world!', isDelim);
 * [
 *    ["", "hello"],
 *    [" ", "world"],
 *    ["!", ""]
 * ]
 *
 * splitRuns('- hello world!', isDelim);
 * [
 *    ["- ", "hello"],
 *    [" ", "world"],
 *    ["!", ""]
 * ]
 * ```
 * */
export function splitRuns(text, isDelimiter) {
    const result = [];
    if (!text)
        return result;
    let inDelimiter = null;
    const delimiterBuf = [];
    const wordBuf = [];
    const flush = () => {
        result.push([delimiterBuf.join(''), wordBuf.join('')]);
        delimiterBuf.length = 0;
        wordBuf.length = 0;
    };
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (isDelimiter(ch, i, text)) {
            // entering a delimiter run after a word => flush the word+match pair
            if (inDelimiter === false)
                flush();
            delimiterBuf.push(ch);
            inDelimiter = true;
            continue;
        }
        wordBuf.push(ch);
        inDelimiter = false;
    }
    // flush trailing tuple (captures trailing delimiter run or last word)
    flush();
    return result;
}
export function isUpperCase(str) {
    return str === str.toUpperCase();
}
export const isWhitespace = (char) => {
    return /\s/.test(char);
};
export function isPunctuation(char) {
    return /[.,\/#!$%\^&\*;:{}=\-_`~()]/.test(char);
}
export function isNumber(char) {
    return /[0-9]/.test(char);
}
//# sourceMappingURL=strings.js.map
export declare function isJson(str: string): boolean;
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
export declare function templateToString(template: TemplateStringsArray, ...expressions: TemplateExpression[]): string;
type SplitTuple = [delimiterRun: string, token: string];
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
export declare function spacedWords(text: string): SplitTuple[];
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
export declare function splitRuns(text: string, isDelimiter: (char: string, index?: number, text?: string) => boolean): SplitTuple[];
export declare function isUpperCase(str: string): boolean;
export declare const isWhitespace: (char: string) => boolean;
export declare function isPunctuation(char: string): boolean;
export declare function isNumber(char: string): boolean;
export type TemplateExpression = string | number | Array<string | number>;
export {};
//# sourceMappingURL=strings.d.ts.map
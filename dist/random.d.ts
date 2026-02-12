/**
 * Returns a random floating-point number between min and max (inclusive).
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns A random floating-point number between min and max.
 */
export declare function getRandom(min?: number, max?: number): number;
/**
 * Returns a random integer between min and max (inclusive).
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns A random integer between min and max.
 */
export declare function getRandomInt(min?: number, max?: number): number;
/**
 * Returns a random boolean value.
 * @param trueProbability A number between 0 and 1 representing the probability of returning true. Default is 0.5.
 * @returns A random boolean value.
 */
export declare function getRandomBool(trueProbability?: number): boolean;
/**
 * Returns either 1 or -1, with equal probability.
 * @returns Either 1 or -1.
 */
export declare function getRandomSign(positiveProbability?: number): 1 | -1;
/**]
 * Returns a random character from the given string of characters.
 * @param chars A string containing the characters to choose from. Default is alphanumeric characters.
 * @returns A random character from the given string.
 */
export declare function getRandomChar(chars?: string): string;
/**
 * Returns a random string of the specified length using the given characters.
 * @param length The length of the random string to generate.
 * @param chars A string containing the characters to choose from. Default is alphanumeric characters.
 * @returns A random string of the specified length.
 */
export declare function getRandomString(length: number, chars?: string): string;
/**
 * Returns a random date between the specified start and end dates.
 * @param start The start date (inclusive).
 * @param end The end date (inclusive).
 * @returns A random date between the start and end dates.
 */
export declare function getRandomDate(start?: Date, end?: Date): Date;
//# sourceMappingURL=random.d.ts.map
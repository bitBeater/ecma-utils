import { takeRandomElement } from './collection/collectionOperations.js';
import { MAX_JS_DATE } from './time/time.js';

/**
 * Returns a random floating-point number between min and max (inclusive).
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns A random floating-point number between min and max.
 */
export function getRandom(min = Number.MIN_VALUE, max = Number.MAX_VALUE): number {
	return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min and max (inclusive).
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns A random integer between min and max.
 */
export function getRandomInt(min?: number, max?: number): number {
	return Math.floor(getRandom(min, max));
}

/**
 * Returns a random boolean value.
 * @param trueProbability A number between 0 and 1 representing the probability of returning true. Default is 0.5.
 * @returns A random boolean value.
 */

export function getRandomBool(trueProbability = 0.5): boolean {
	return Math.random() < trueProbability;
}

/**
 * Returns either 1 or -1, with equal probability.
 * @returns Either 1 or -1.
 */
export function getRandomSign(positiveProbability = 0.5): 1 | -1 {
	return getRandomBool(positiveProbability) ? 1 : -1;
}

/**]
 * Returns a random character from the given string of characters.
 * @param chars A string containing the characters to choose from. Default is alphanumeric characters.
 * @returns A random character from the given string.
 */
export function getRandomChar(chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
	return takeRandomElement(chars.split(''));
}

/**
 * Returns a random string of the specified length using the given characters.
 * @param length The length of the random string to generate.
 * @param chars A string containing the characters to choose from. Default is alphanumeric characters.
 * @returns A random string of the specified length.
 */
export function getRandomString(length: number, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
	let result = '';
	for (let i = 0; i < length; i++) {
		result += getRandomChar(chars);
	}
	return result;
}

/**
 * Returns a random date between the specified start and end dates.
 * @param start The start date (inclusive).
 * @param end The end date (inclusive).
 * @returns A random date between the start and end dates.
 */
export function getRandomDate(start = new Date(0), end = new Date(MAX_JS_DATE)): Date {
	return new Date(getRandomInt(start.getTime(), end.getTime()));
}

/// return new Date(getRandomInt(start.getTime(), end.getTime()));

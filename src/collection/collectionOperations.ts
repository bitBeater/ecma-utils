import { forEach } from '../utils/utils.js';

/**
 *
 * Compute the element-wise absolute differences between two arrays of numbers.
 * @example
 * ```ts
 *  arrayDifferences([1,2,3],[3,2,1]); // [2,0,2]
 * ```
 * @param a1 array to compare
 * @param a2 array to compare
 * @returns return the array difference a1-a2
 */
export function arrayDifferences(a1: number[] = [], a2: number[] = []): number[] {
	const retVal: number[] = [];

	for (let i = 0; i < a1.length; i++) retVal.push(Math.abs((a1[i] || 0) - (a2[i] || 0)));

	return retVal;
}

/**
 * executes the provided function fn once for each pair of consecutive elements of the provided array.
 *
 * @example
 * ```ts
 * const array=[1,2,3,4];
 *
 * forEachConsPairs(array,console.log);
 *
 * // prints
 * // 1 2
 * // 2 3
 * // 3 4
 * ```
 *
 */
export function forEachConsPairs<T>(array: T[], fn: (item1: T, item2: T) => void) {
	if (!array?.length || typeof fn !== 'function') return;

	for (let i = 1; i < array.length; i++) {
		const item1: T = array[i - 1];
		const item2: T = array[i];

		fn(item1, item2);
	}
}

/**
 * check if the givven array is sorted or not.
 *
 * @example check array of numbers
 * ```ts
 *  isSorted([1,2,3])	//true
 *  isSorted([1,3,2])	//false
 * ```
 *
 *  @example check array of strings
 *```ts
 *  isSorted(['a','b','c'])	//true
 *  isSorted(['a','c','b'])	//false
 * ```
 *
 *   @example check array of objects, with compareFn
 * ```ts
 *  isSorted([{ x:1}, { x:2}, { x:3}], (o1,o2)=> o1.x-o2.x) // true
 *  isSorted([{ x:1}, { x:3}, { x:2}], (o1,o2)=> o1.x-o2.x) // false
 * ```
 *
 * @param array array to check if is sorted
 * @param compareFn function to use for comparison operation
 */
export function isSorted<T>(array: T[], compareFn: (item1: T, item2: T) => number = genericSortFunction): boolean {
	if (!array?.length) return;

	for (let i = 1; i < array.length; i++) {
		const item1: T = array[i - 1];
		const item2: T = array[i];

		if (compareFn(item1, item2) > 0) return false;
	}

	return true;
}

const genericSortFunction = <T>(item1: T, item2: T) => {
	try {
		return item1 === item2 ? 0 : item1 > item2 ? 1 : -1;
	} catch (error) {
		return 0;
	}
};

/**
 * get the last element of an aray.
 *
 * @example simply does:
 * ```ts
 *  array[array.length - 1];
 * ```
 */
export function lastEl<T>(array: T[]): T {
	return array?.[array?.length - 1];
}

// /**
//  * generate an array, of specified length using the generate function
//  *
//  * @example Generate an array with numbers from 0 to 9
//  * ```ts
//  *  gen(10, i => i); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
//  * ```
//  */
// export function gen<T>(length: number, genFn: (index: number) => T): T[] {
// 	const retVal = new Array<T>(length);

// 	for (var i = 0; i < length; i++) retVal[i] = genFn(i);

// 	return retVal;
// }

/**
 *
 * like {@link https://lodash.com/docs/4.17.15#takeRight lodash's takeRight}, but also with offset.
 *
 *
 *
 *
 ** * *
 * simply does
 * ```ts
 * array?.slice(array.length - n - offset , array.length - offset);
 * ```
 * * * *
 *
 *
 * @example
 * ```ts
 *	takeRight([0, 1, 2, 3])			//=> [3]
 *	takeRight([0, 1, 2, 3], 2)		 //=> [2, 3]
 *	takeRight([0, 1, 2, 3], 2, 1)	  //=> [1, 2]
 * ```
 *
 * @param array The array to query.
 * @param n The number of elements to take.
 * @param offset The offset to apply for elements to take.
 * @returns Returns the slice of array.
 */
export function takeRight<T>(array: T[], n = 1, offset = 0): T[] {
	return array?.slice(array.length - offset - n, array.length - offset);
}

/**
 *
 * Returns a random element from the provided array.
 *
 * @param array
 * @returns a random element from the provided array.
 */
export function pickRandomElement<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)];
}

/** *
 * Returns an array of random elements from the provided array.
 *
 * @param array
 * @param legth number of elements to pick
 * @returns an array of random elements from the provided array.
 */
export function pickRandomElements<T>(array: T[], legth: number): T[] {
	return takeRandomElements([...array], legth);
}

/**
 * Returns a random element from the provided array,
 * and **removes** the element from the array.
 *
 * @param array
 * @returns a random element from the provided array.
 */
export function takeRandomElement<T>(array: T[]): T {
	return array.splice(Math.floor(Math.random() * array.length), 1)[0];
}

/** *
 * Returns an array of random elements from the provided array,
 * and **removes** the elements from the array.
 *
 * @param array
 * @param legth number of elements to pick
 * @returns an array of random elements from the provided array.
 */
export function takeRandomElements<T>(array: T[], legth: number): T[] {
	return forEach(legth, () => takeRandomElement(array));
}

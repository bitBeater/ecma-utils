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
export declare function arrayDifferences(a1?: number[], a2?: number[]): number[];
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
export declare function forEachConsPairs<T>(array: T[], fn: (item1: T, item2: T) => void): void;
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
export declare function isSorted<T>(array: T[], compareFn?: (item1: T, item2: T) => number): boolean;
/**
 * get the last element of an aray.
 *
 * @example simply does:
 * ```ts
 *  array[array.length - 1];
 * ```
 */
export declare function lastEl<T>(array: T[]): T;
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
export declare function takeRight<T>(array: T[], n?: number, offset?: number): T[];
/**
 *
 * Returns a random element from the provided array.
 *
 * @param array
 * @returns a random element from the provided array.
 */
export declare function pickRandomElement<T>(array: T[]): T;
/** *
 * Returns an array of random elements from the provided array.
 *
 * @param array
 * @param legth number of elements to pick
 * @returns an array of random elements from the provided array.
 */
export declare function pickRandomElements<T>(array: T[], legth: number): T[];
/**
 * Returns a random element from the provided array,
 * and **removes** the element from the array.
 *
 * @param array
 * @returns a random element from the provided array.
 */
export declare function takeRandomElement<T>(array: T[]): T;
/** *
 * Returns an array of random elements from the provided array,
 * and **removes** the elements from the array.
 *
 * @param array
 * @param legth number of elements to pick
 * @returns an array of random elements from the provided array.
 */
export declare function takeRandomElements<T>(array: T[], legth: number): T[];
//# sourceMappingURL=collectionOperations.d.ts.map
export interface PathKeysOptions {
    ignoreFunctions?: boolean;
    unfoldArrays?: boolean;
    omitFirstLevel: boolean;
}
/**
 * Returns an array of a given object's keys paths (own and nested key names) in a reccursive manner, iterated in the same order that a normal loop would.
 *
 * @example ```ts
 * const object={
 * 	str:"hello",
 * 	nr:1,
 * 	fn: (a:number,b:number)=> a+b,
 * 	arr:[1,2,3],
 * 	nestedObject:{
 * 		str:"world",
 * 		nr:2,
 * 		fn: (a:number,b:number)=> a+b,
 * 		arr:[4.5],
 * 	}
 * };
 *
 * getPathKeys(object)
 *
 * // RETURNS:
 * // [  'str',
 * //	 'nr',
 * //	 'fn',
 * //	 'arr',
 * //	 'nestedObject',
 * //	 'nestedObject.str',
 * //	 'nestedObject.nr',
 * //	 'nestedObject.fn',
 * //	 'nestedObject.arr' ]
 * ```
 *
 * @example ```ts
 * const object={
 * 	str:"hello",
 * 	nestedObject:{
 * 		str:"world",
 * 		nr:2,
 * 		fn: (a:number,b:number)=> a+b,
 * 		arr:[4.5],
 * 	}
 * };
 *
 * getPathKeys(object,{omitFirstLevel:true})
 *
 * // RETURNS:
 * // [  'str',
 * //	 'nestedObject.str',
 * //	 'nestedObject.nr',
 * //	 'nestedObject.fn',
 * //	 'nestedObject.arr' ]
 * ```
 *
 * @param obj object from which to derive the paths
 * @param options options object
 * @returns
 */
export declare function getPathKeys(obj: any, options?: PathKeysOptions): string[];
/**
 * Checks if a value is a plain object (not null, not array, not date, not promise, not function)
 *
 * @param v value to check
 * @returns boolean indicating if the value is a plain object
 *
 * @example
 * ```ts
 * isPlainObject({}) // => true
 * isPlainObject({ a: 1, b: { c: 2 } }) // => true
 * isPlainObject(() => {}) // => false
 * isPlainObject(null) // => false
 * isPlainObject(undefined) // => false
 * isPlainObject([]) // => false
 * isPlainObject(new Date()) // => false
 * isPlainObject("hello") // => false
 * isPlainObject(123) // => false
 * isPlainObject(true) // => false
 * isPlainObject(Symbol("sym")) // => false
 * isPlainObject(BigInt(123)) // => false
 * isPlainObject(Promise.resolve(123)) // => false
 * ```
 */
export declare function isPlainObject(v: unknown): v is Object;
/**
 * returns the keys of an object as an array, with proper typing.
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * const keys = keysOf(obj); // ['a', 'b', 'c']
 * ```
 * @param o
 * @returns
 */
export declare function keysOf<T extends object>(o: T): (keyof T)[];
//# sourceMappingURL=object.d.ts.map
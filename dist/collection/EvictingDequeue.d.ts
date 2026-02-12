/**
 * A non-blocking de-queue which automatically evicts elements from queue when attempting to add new elements onto the queue and it is full
 *
 * @example
 * ```js
 * const maxSize=3;
 * const evictingDequeue = new EvictingDequeue<number>(maxSize,[1,2,3]);
 *
 *	evictingDequeue;            // [1,2,3]
 *	evictingDequeue.push(4);    // [2,3,4]
 *	evictingDequeue.unshift(5); // [5,2,3]
 *
 * ```
 */
export declare class EvictingDequeue<T> extends Array<T> {
    #private;
    constructor(maxLenght: number, items?: T[]);
    push(...item: T[]): number;
    unshift(...item: T[]): number;
    get maxLenght(): number;
}
//# sourceMappingURL=EvictingDequeue.d.ts.map
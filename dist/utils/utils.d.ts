export { TaskDurationTracker } from './task_duration_tracker.js';
/**
 * @description Executes a function a specified number of times and collects the results in an array.
 * @example
 * ```ts
 * const results = forEach(5, i => i * 2);
 * console.log(results); // [0, 2, 4, 6, 8]
 * ```
 * @param execs number of executions
 * @param fn function to be executed
 */
export declare function forEach<T>(execs: number, fn: (i: number) => T): T[];
/**
 *
 * @description A simple utility that benchmarks a function execution,
 *
 * @returns an object with min, max and mean time execution, in millis.
 */
export declare function benchmarkFn(fn: Function, iterations?: number): {
    min: number;
    max: number;
    mean: number;
};
//# sourceMappingURL=utils.d.ts.map
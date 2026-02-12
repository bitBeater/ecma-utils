import { lastEl } from '../collection/collectionOperations.js';
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
export function forEach<T>(execs: number, fn: (i: number) => T): T[] {
	const results: T[] = [];
	for (var i = 0; execs; i++, execs--) results.push(fn(i));
	return results;
}

/**
 *
 * @description A simple utility that benchmarks a function execution,
 *
 * @returns an object with min, max and mean time execution, in millis.
 */
export function benchmarkFn(fn: Function, iterations = 1): { min: number; max: number; mean: number } {
	const execTimes: number[] = [];
	var _iterations = iterations + 1;

	while (--_iterations) {
		const start = Date.now();
		fn();
		const end = Date.now();

		//execTimes[_iterations] = end - start;
		execTimes.push(end - start);
	}

	const orderedExecTimes = execTimes.sort();
	const min = orderedExecTimes[0];
	const max = lastEl(orderedExecTimes);
	const mean = execTimes.reduce((pre, cur) => pre + cur, 0) / execTimes.length;

	return { min, max, mean };
}

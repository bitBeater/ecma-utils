import { lastEl } from '../collection/collection.js';
import { Interval, Duration, millisecondsToDuration, durationToMilliSeconds } from '../time/time.js';

/**
 * @description A utility class to track the duration of multiple tasks and estimate completion times.
 * - It records the start and end times of each task, calculates elapsed time, estimates remaining time,
 * - and provides the expected finish time based on the average duration of completed tasks.
 *
 * @example
 * ```ts
 * // let's assume the date is Jan 1, 2000, 00:00:00
 * const tracker = new TaskDurationTracker(5); // Initialize tracker for 5 tasks
 *
 * for (let i = 0; i < 5; i++) {
 *   performTask(i); // Lets assume it takes 1 second to perform a task
 *   tracker.recordTaskEnd(); // Record the end of the task
 *
 *   console.log(`Completed ${tracker.getCompletedTasks()} out of ${tracker.tasksCount} tasks.`);
 *   console.log(`Elapsed Time: ${tracker.getElapsedTime().milliseconds} ms`);
 *   console.log(`Estimated Completion Time: ${tracker.getEstimatedCompletionTime().milliseconds} ms`);
 *   console.log(`Expected Finish Time: ${tracker.getExpectedFinishTime()}`);
 *
 * }
 *  // OUTPUT:
 * // Completed 1 out of 5 tasks.
 * // Elapsed Time: 1000 ms
 * // Estimated Completion Time: 4000 ms
 * // Expected Finish Time: Jan 1, 2000, 00:00:05
 *
 * // Completed 2 out of 5 tasks.
 * // Elapsed Time: 2000 ms
 * // Estimated Completion Time: 3000 ms
 * // Expected Finish Time: Jan 1, 2000, 00:00:05
 *
 * // Completed 3 out of 5 tasks.
 * // Elapsed Time: 3000 ms
 * // Estimated Completion Time: 2000 ms
 * // Expected Finish Time: Jan 1, 2000, 00:00:05
 *
 * // Completed 4 out of 5 tasks.
 * // Elapsed Time: 4000 ms
 * // Estimated Completion Time: 1000 ms
 * // Expected Finish Time: Jan 1, 2000, 00:00:05
 *
 * // Completed 5 out of 5 tasks.
 * // Elapsed Time: 5000 ms
 * // Estimated Completion Time: 0 ms
 * // Expected Finish Time: Jan 1, 2000, 00:00:05
 * ```
 *
 * @see {@link Duration}
 * @see {@link Interval}
 */
export class TaskDurationTracker {
	private intervals: Interval[] = [];
	private creationTime = new Date();

	constructor(public tasksCount: number) {}

	/**
	 * @description Gets the total elapsed time since the first task started.
	 * @returns the total elapsed time since the first task started.
	 */
	getElapsedTime(): Duration {
		const milliseconds = new Date().getTime() - this.getStartTime().getTime();
		return millisecondsToDuration(milliseconds);
	}

	/**
	 * @description Estimates the total time taken to complete all tasks.
	 */
	getEstimatedCompletionTime(): Duration {
		const meanTime = this.getMeanTimePerTask();
		const remainingTasks = this.getRemainingTasks();
		const remainingMillis = durationToMilliSeconds(meanTime) * remainingTasks;
		return millisecondsToDuration(remainingMillis);
	}

	/**
	 * @description Gets the expected finish time for all tasks.
	 */
	getExpectedFinishTime(): Date {
		const remainingMillis = durationToMilliSeconds(this.getEstimatedCompletionTime());
		return new Date(Date.now() + remainingMillis);
	}

	/**
	 * @description Gets the number of completed tasks.
	 * @returns the number of completed tasks.
	 */
	getCompletedTasks(): number {
		return this.intervals.length;
	}

	/**
	 * @description Gets the number of remaining tasks.
	 * @returns the number of remaining tasks.
	 */
	getRemainingTasks(): number {
		return Math.max(this.tasksCount - this.intervals.length, 0);
	}

	/**
	 * @description Gets the mean time taken per task.
	 * @returns the mean time taken per task.
	 */
	getMeanTimePerTask(): Duration {
		if (this.intervals.length === 0) {
			return this.getElapsedTime();
		}

		const totalMillis = this.intervals.reduce((acc, interval) => {
			if (interval.start && interval.end) {
				return acc + (interval.end.getTime() - interval.start.getTime());
			}
			return acc;
		}, 0);
		const meanMillis = totalMillis / this.intervals.length;
		return millisecondsToDuration(Math.round(meanMillis));
	}

	/**
	 * @description Adds a task interval to the tracker.
	 * @param interval The interval of the task to add.
	 */
	addCompletedTask(interval: Interval): void {
		this.intervals.push(interval);
	}

	/**
	 * @description Gets the start time of the first task, or the creation time if no tasks have been started.
	 * @returns the start time of the first task, or the creation time if no tasks have been started.
	 */
	getStartTime(): Date {
		return this.intervals[0]?.start || this.creationTime;
	}

	/**
	 * @description Marks the current task as completed,
	 * - the start time is either the end time of the last task or the TaskDurationTracker creation time,
	 * - the end time is the current time.
	 */
	recordTaskEnd(): void {
		this.intervals.push({
			start: lastEl(this.intervals)?.end || this.creationTime,
			end: new Date(),
		});
	}
}

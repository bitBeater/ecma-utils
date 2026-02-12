import { Duration, durationToMilliSeconds } from './time.js';

/**
 * A simple timer that can be started, paused, and resumed.
 * @example
 * ```js
 * import { Timer } from '@bitbeater/ecma-utils/time/timer';
 *
 * const timer = new Timer(5000, (totalDuration) => {
 *     console.log(`Timer completed in ${totalDuration} ms`);
 * });
 *
 * timer.start();
 *
 * // Pause the timer after 2 seconds
 * setTimeout(() => {
 *     timer.pause();
 *     console.log('Timer paused');
 * }, 2000);
 *
 * // Resume the timer after another 3 seconds
 * setTimeout(() => {
 *     timer.start();
 *     console.log('Timer resumed');
 * }, 5000);
 * ```
 */
export class Timer {
	/**
	 * The time when the timer was started for the first time
	 */
	private startTime: number = -1;

	/** The time when the timer finished */
	private finishedTime: number = -1;

	/** The time when the timer was started last time */
	private lastStartTime: number = 0;

	/** The running elapsed time*/
	private elapsedMs: number = 0;

	/** milliseconds to be timed  */
	private durationMs: number = 0;

	private timeoutId: any;

	/**
	 *  Indicates whether the timer has been started at least once.
	 */
	#started: boolean = false;

	/**
	 * Indicates whether the timer is currently paused.
	 */
	#paused: boolean = false;

	/**
	 * Indicates whether the timer is running.
	 */
	#running: boolean = false;

	/**
	 * Indicates whether the timer has completed.
	 */

	#completed: boolean = false;

	public onPause: (elapsedMs: number) => void;
	public onStart: (timeLeftMs: number) => void;

	constructor(
		private duration: Duration | number,
		public onComplete?: (totalDuration?: number) => void
	) {
		if (typeof this.duration === 'number') {
			this.durationMs = this.duration;
		} else {
			this.durationMs = durationToMilliSeconds(this.duration);
		}
	}

	/**
	 * Start or resume the timer.
	 *
	 * @returns The time left in milliseconds
	 */
	start(): number {
		if (this.#running || this.#completed) return;

		if (!this.#started) {
			this.startTime = Date.now();
			this.#started = true;
		}

		this.#running = true;
		this.#paused = false;

		this.lastStartTime = Date.now();

		const timeLeftMs = this.durationMs - this.elapsedMs;

		this.timeoutId = setTimeout(() => {
			this.#running = this.#paused = false;
			this.#completed = true;
			this.finishedTime = Date.now();
			const totalDuration = this.finishedTime - this.startTime;
			this.onComplete?.(totalDuration);
		}, timeLeftMs);

		this.onStart?.(timeLeftMs);

		return timeLeftMs;
	}

	/**
	 * Pause the timer.
	 *
	 * @returns The elapsed time in milliseconds
	 */
	pause(): number {
		if (!this.#running) return;

		this.#running = false;
		this.#paused = true;

		clearTimeout(this.timeoutId);
		this.elapsedMs += Date.now() - this.lastStartTime;

		this.onPause?.(this.elapsedMs);

		return this.elapsedMs;
	}

	/**
	 * Indicates whether the timer is currently paused.
	 */
	get paused(): boolean {
		return this.#paused;
	}

	/**
	 * Indicates whether the timer has completed.
	 */
	get completed(): boolean {
		return this.#completed;
	}

	/**
	 * Indicates whether the timer is running.
	 */
	get running(): boolean {
		return this.#running;
	}

	/**
	 *  Indicates whether the timer has been started at least once.
	 */
	get started(): boolean {
		return this.#started;
	}

	/**
	 * Time elapsed while timer was running in milliseconds.
	 * It does not include time while timer was paused.
	 * @return Elapsed time in milliseconds
	 */
	elapsedTime(): number {
		if (!this.#started) return 0;
		if (this.#paused) return this.elapsedMs;
		if (this.#completed) return this.durationMs;

		return this.elapsedMs + (Date.now() - this.lastStartTime);
	}

	/**
	 * Total time elapsed, from when the timer started until it completed in milliseconds.
	 * It includes time while timer was paused.
	 * @return Total elapsed time in milliseconds
	 */
	totalElapsedTime(): number {
		if (!this.#started) return 0;
		if (this.#completed) return this.finishedTime - this.startTime;
		return Date.now() - this.startTime;
	}

	/**
	 * Remaining time in milliseconds.
	 * @return Remaining time in milliseconds
	 */
	remainingTime(): number {
		return this.durationMs - this.elapsedTime();
	}
}

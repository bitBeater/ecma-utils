import { durationToMilliSeconds } from './time.js';
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
    duration;
    onComplete;
    /**
     * The time when the timer was started for the first time
     */
    startTime = -1;
    /** The time when the timer finished */
    finishedTime = -1;
    /** The time when the timer was started last time */
    lastStartTime = 0;
    /** The running elapsed time*/
    elapsedMs = 0;
    /** milliseconds to be timed  */
    durationMs = 0;
    timeoutId;
    /**
     *  Indicates whether the timer has been started at least once.
     */
    #started = false;
    /**
     * Indicates whether the timer is currently paused.
     */
    #paused = false;
    /**
     * Indicates whether the timer is running.
     */
    #running = false;
    /**
     * Indicates whether the timer has completed.
     */
    #completed = false;
    onPause;
    onStart;
    constructor(duration, onComplete) {
        this.duration = duration;
        this.onComplete = onComplete;
        if (typeof this.duration === 'number') {
            this.durationMs = this.duration;
        }
        else {
            this.durationMs = durationToMilliSeconds(this.duration);
        }
    }
    /**
     * Start or resume the timer.
     *
     * @returns The time left in milliseconds
     */
    start() {
        if (this.#running || this.#completed)
            return;
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
    pause() {
        if (!this.#running)
            return;
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
    get paused() {
        return this.#paused;
    }
    /**
     * Indicates whether the timer has completed.
     */
    get completed() {
        return this.#completed;
    }
    /**
     * Indicates whether the timer is running.
     */
    get running() {
        return this.#running;
    }
    /**
     *  Indicates whether the timer has been started at least once.
     */
    get started() {
        return this.#started;
    }
    /**
     * Time elapsed while timer was running in milliseconds.
     * It does not include time while timer was paused.
     * @return Elapsed time in milliseconds
     */
    elapsedTime() {
        if (!this.#started)
            return 0;
        if (this.#paused)
            return this.elapsedMs;
        if (this.#completed)
            return this.durationMs;
        return this.elapsedMs + (Date.now() - this.lastStartTime);
    }
    /**
     * Total time elapsed, from when the timer started until it completed in milliseconds.
     * It includes time while timer was paused.
     * @return Total elapsed time in milliseconds
     */
    totalElapsedTime() {
        if (!this.#started)
            return 0;
        if (this.#completed)
            return this.finishedTime - this.startTime;
        return Date.now() - this.startTime;
    }
    /**
     * Remaining time in milliseconds.
     * @return Remaining time in milliseconds
     */
    remainingTime() {
        return this.durationMs - this.elapsedTime();
    }
}
//# sourceMappingURL=timer.js.map
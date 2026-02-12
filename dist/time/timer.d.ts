import { Duration } from './time.js';
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
export declare class Timer {
    #private;
    private duration;
    onComplete?: (totalDuration?: number) => void;
    /**
     * The time when the timer was started for the first time
     */
    private startTime;
    /** The time when the timer finished */
    private finishedTime;
    /** The time when the timer was started last time */
    private lastStartTime;
    /** The running elapsed time*/
    private elapsedMs;
    /** milliseconds to be timed  */
    private durationMs;
    private timeoutId;
    onPause: (elapsedMs: number) => void;
    onStart: (timeLeftMs: number) => void;
    constructor(duration: Duration | number, onComplete?: (totalDuration?: number) => void);
    /**
     * Start or resume the timer.
     *
     * @returns The time left in milliseconds
     */
    start(): number;
    /**
     * Pause the timer.
     *
     * @returns The elapsed time in milliseconds
     */
    pause(): number;
    /**
     * Indicates whether the timer is currently paused.
     */
    get paused(): boolean;
    /**
     * Indicates whether the timer has completed.
     */
    get completed(): boolean;
    /**
     * Indicates whether the timer is running.
     */
    get running(): boolean;
    /**
     *  Indicates whether the timer has been started at least once.
     */
    get started(): boolean;
    /**
     * Time elapsed while timer was running in milliseconds.
     * It does not include time while timer was paused.
     * @return Elapsed time in milliseconds
     */
    elapsedTime(): number;
    /**
     * Total time elapsed, from when the timer started until it completed in milliseconds.
     * It includes time while timer was paused.
     * @return Total elapsed time in milliseconds
     */
    totalElapsedTime(): number;
    /**
     * Remaining time in milliseconds.
     * @return Remaining time in milliseconds
     */
    remainingTime(): number;
}
//# sourceMappingURL=timer.d.ts.map
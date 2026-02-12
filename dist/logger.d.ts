export declare enum LogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    FATAL = 5,
    OFF = 6
}
export type Loggable = string | number | boolean | object | undefined | null | Error | Loggable[];
export interface LogWriter {
    /**
     * Designates fine-grained informational events that are most useful to debug an application.
     */
    debug: (...msg: Loggable[]) => void;
    /**
     * Designates informational messages that highlight the progress of the application at coarse-grained level.
     */
    info: (...msg: Loggable[]) => void;
    /**
     * Designates potentially harmful situations.
     */
    warn: (...msg: Loggable[]) => void;
    /**
     * Designates error events that might still allow the application to continue running.
     */
    error: (...msg: Loggable[]) => void;
    /**
     * Designates very severe error events that will presumably lead the application to abort.
     */
    fatal: (...msg: Loggable[]) => void;
    /**
     * Designates finer-grained informational events than the DEBUG.
     */
    trace: (...msg: Loggable[]) => void;
}
export interface LoggerConfig {
    logWriter?: LogWriter;
    logLevel?: LogLevel;
    prefix?: string;
}
export declare class Logger implements LogWriter {
    logLevel: LogLevel;
    logWriter: LogWriter;
    prefix: string;
    constructor(conf?: LoggerConfig | string);
    trace(...data: Loggable[]): void;
    debug(...data: Loggable[]): void;
    info(...data: Loggable[]): void;
    warn(...data: Loggable[]): void;
    error(...data: Loggable[]): void;
    fatal(...data: Loggable[]): void;
    /**
     * @unstable
     * @todo needs testing
     *
     * Creates a new StepLogger with the given name.
     * @example
     * ```ts
     * const logger = new Logger('[main]');
     *
     * logger.info('creating a step logger');
     *
     * const step = logger.step('[step]');
     * step.info('doing something...');
     * step.finish();
     *
     *
     * logger.info('after step logger has finished');
     *
     * // Output:
     * // [2021-08-31T14:00:00.000Z] INFO: [main] creating a step logger
     * // [2021-08-31T14:00:00.000Z] INFO: [main]:[step] started
     * // [2021-08-31T14:00:00.000Z] INFO: [main]:[step] doing something...
     * // [2021-08-31T14:00:00.000Z] INFO: [main]:[step] finished in 0ms
     * // [2021-08-31T14:00:00.000Z] INFO: [main] after step logger has finished
     * ```
     *
     * @param name
     * @returns a new StepLogger wrapping this logger.
     *
     */
    step(name: string): StepLogger;
}
/**
 * Wrapper Logger that logs the start and end of a step.
 * When it is created, it logs the start of the step.
 * When the finish method is called, it logs the end of the step, and the logWriter is set to null to prevent further logging.
 */
export declare class StepLogger extends Logger {
    readonly startTime: number;
    constructor(logger: Logger, stepName: string);
    finish(): void;
}
//# sourceMappingURL=logger.d.ts.map
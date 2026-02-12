export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["TRACE"] = 0] = "TRACE";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["FATAL"] = 5] = "FATAL";
    LogLevel[LogLevel["OFF"] = 6] = "OFF";
})(LogLevel || (LogLevel = {}));
const defaultLogWriter = {
    debug: (...data) => console.debug(`[${new Date().toJSON()}] DEBUG:`, ...data),
    info: (...data) => console.info(`[${new Date().toJSON()}] INFO:`, ...data),
    warn: (...data) => console.warn(`[${new Date().toJSON()}] WARN:`, ...data),
    error: (...data) => {
        (console.error(`[${new Date().toJSON()}] ERROR:`, ...data), printStack(data));
    },
    fatal: (...data) => {
        (console.error(`[${new Date().toJSON()}] FATAL:`, ...data), printStack(data));
    },
    trace: (...data) => console.info(`[${new Date().toJSON()}] TRACE:`, ...data),
};
let actualLogWriter = { ...defaultLogWriter };
let _logLevel = LogLevel.OFF;
const _logger = {
    trace: (...data) => {
        if (_logLevel <= LogLevel.TRACE)
            actualLogWriter?.trace(...data);
    },
    debug: (...data) => {
        if (_logLevel <= LogLevel.DEBUG)
            actualLogWriter?.debug(...data);
    },
    info: (...data) => {
        if (_logLevel <= LogLevel.INFO)
            actualLogWriter?.info(...data);
    },
    warn: (...data) => {
        if (_logLevel <= LogLevel.WARN)
            actualLogWriter?.warn(...data);
    },
    error: (...data) => {
        if (_logLevel <= LogLevel.ERROR)
            actualLogWriter?.error(...data);
    },
    fatal: (...data) => {
        if (_logLevel <= LogLevel.FATAL)
            actualLogWriter?.error(...data);
    },
};
// /** @deprecated */
// export const debug = (...data: Loggable[]) => _logger.debug(...data);
// /** @deprecated */
// export const info = (...data: Loggable[]) => _logger.info(...data);
// /** @deprecated */
// export const warn = (...data: Loggable[]) => _logger.warn(...data);
// /** @deprecated */
// export const error = (...data: Loggable[]) => _logger.error(...data);
// /** @deprecated */
// export const fatal = (...data: Loggable[]) => _logger.fatal(...data);
// /** @deprecated */
// export const trace = (...data: Loggable[]) => _logger.trace(...data);
// /** @deprecated */
// export const getLogger = () => ({ ..._logger });
// /** @deprecated */
// export const setLogger = (logger: LogWriter) => {
// 	if (!logger) console.warn('[LOGGER]', 'setting undefined logger');
// 	actualLogWriter = logger;
// };
// /** @deprecated */
// export const setLogLevel = (logLevel: LogLevel) => {
// 	if (_logLevel == null) console.warn('[LOGGER]', 'setting undefined log level');
// 	_logLevel = logLevel;
// };
function printStack(errors) {
    errors?.filter(e => e?.stack)?.forEach(e => console.error(e?.stack));
}
export class Logger {
    logLevel = LogLevel.WARN;
    logWriter = defaultLogWriter;
    prefix = '';
    constructor(conf) {
        if (typeof conf === 'string') {
            this.prefix = conf;
            return;
        }
        this.logLevel = conf?.logLevel ?? this.logLevel;
        this.logWriter = conf?.logWriter ?? this.logWriter;
        this.prefix = conf?.prefix ?? this.prefix;
    }
    trace(...data) {
        if (this.logLevel <= LogLevel.TRACE)
            this.logWriter?.trace(this.prefix, ...data);
    }
    debug(...data) {
        if (this.logLevel <= LogLevel.DEBUG)
            this.logWriter?.debug(this.prefix, ...data);
    }
    info(...data) {
        if (this.logLevel <= LogLevel.INFO)
            this.logWriter?.info(this.prefix, ...data);
    }
    warn(...data) {
        if (this.logLevel <= LogLevel.WARN)
            this.logWriter?.warn(this.prefix, ...data);
    }
    error(...data) {
        if (this.logLevel <= LogLevel.ERROR)
            this.logWriter?.error(this.prefix, ...data);
    }
    fatal(...data) {
        if (this.logLevel <= LogLevel.FATAL)
            this.logWriter?.error(this.prefix, ...data);
    }
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
    step(name) {
        return new StepLogger(this, name);
    }
}
/**
 * Wrapper Logger that logs the start and end of a step.
 * When it is created, it logs the start of the step.
 * When the finish method is called, it logs the end of the step, and the logWriter is set to null to prevent further logging.
 */
export class StepLogger extends Logger {
    startTime = Date.now();
    constructor(logger, stepName) {
        super(logger);
        this.prefix = (logger.prefix ? logger.prefix + ':' : '') + stepName;
        this.info(`started`);
    }
    finish() {
        const duration = Date.now() - this.startTime;
        this.info(`finished in ${duration}ms`);
        this.logWriter = null;
    }
}
//# sourceMappingURL=logger.js.map
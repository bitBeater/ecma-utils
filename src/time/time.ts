export const MAX_JS_DATE = 8.64e15; // Sat Sep 13 275760 00:00:00 GMT+0000

/** in millis */
export const millis = 1;
/** in millis */
export const second = 1000 * millis;
/** in millis */
export const minute = 60 * second;
/** in millis */
export const hour = 60 * minute;
/** in millis */
export const day = 24 * hour;
/** in millis */
export const week = 7 * day;
/**
 * In millis
 * The average month is 365/12 = 30.42 days in a regular year and 366/12 = 30.50 days in a leap year. The Gregorian (western) solar calendar has 365.2425/12 = 30.436875 days on the average, varying between 28 and 31 days.
 */
export const solarYear = 365.25 * day;
/** in millis */
export const month = solarYear / 12;
/** in millis */
export const year = 365 * day;
/** 366 days */
export const leapYear = 366 * day;
/** 29 days */
export const leapFebruary = 29 * day;

/** in millis */
export const january = 31 * day;
/** in millis */
export const february = 28 * day;
/** in millis */
export const march = 31 * day;
/** in millis */
export const april = 30 * day;
/** in millis */
export const may = 31 * day;
/** in millis */
export const june = 30 * day;
/** in millis */
export const july = 31 * day;
/** in millis */
export const august = 31 * day;
/** in millis */
export const september = 30 * day;
/** in millis */
export const october = 31 * day;
/** in millis */
export const november = 30 * day;
/** in millis */
export const december = 31 * day;

export const months = [january, february, march, april, may, june, july, august, september, october, november, december];

export const leapMonths = [january, leapFebruary, march, april, may, june, july, august, september, october, november, december];

export interface Duration {
	years?: number;
	months?: number;
	weeks?: number;
	days?: number;
	hours?: number;
	minutes?: number;
	seconds?: number;
	milliseconds?: number;
}

export interface Interval {
	start?: Date;
	end?: Date;
}

/**
 *  Check if the given value is an interval, it should have at least a start or an end Date.
 * @example
 * ```js
 * isInterval({start:new Date()}) // => true
 * isInterval({end:new Date()}) // => true
 * isInterval({start:new Date(), end:new Date()}) // => true
 * isInterval({start:'2023-01-01', end:'2023-01-01'}) // => false
 *
 * @param value
 * @returns
 */
export function isInterval(value: any): value is Interval {
	return value?.start instanceof Date || value?.end instanceof Date;
}

/**
 * parse a duration into millisecconds
 *
 * @example
 * ```js
 * durationToMilliSeconds({seconds:1}) // => 1000
 * durationToMilliSeconds({minutes:1}) // => 60_000
 * durationToMilliSeconds({hours:1}) // => 3_600_000
 * durationToMilliSeconds({minutes:1,seconds:1}) // => 61_000
 * durationToMilliSeconds({hours:1,minutes:1,seconds:1}) // => 3_661_000
 * ```
 */
export function durationToMilliSeconds(duration: Duration): number {
	return (
		(duration?.years || 0) * year +
		(duration?.months || 0) * month +
		(duration?.weeks || 0) * week +
		(duration?.days || 0) * day +
		(duration?.hours || 0) * hour +
		(duration?.minutes || 0) * minute +
		(duration?.seconds || 0) * second +
		(duration?.milliseconds || 0) * millis
	);
}

export function millisecondsToDuration(millis: number): Duration {
	const duration: Duration = {};

	duration.years = Math.floor(millis / year);
	millis %= year;

	duration.months = Math.floor(millis / month);
	millis %= month;

	duration.weeks = Math.floor(millis / week);
	millis %= week;

	duration.days = Math.floor(millis / day);
	millis %= day;

	duration.hours = Math.floor(millis / hour);
	millis %= hour;

	duration.minutes = Math.floor(millis / minute);
	millis %= minute;

	duration.seconds = Math.floor(millis / second);
	millis %= second;

	duration.milliseconds = millis;

	return duration;
}

/**
 * parse a duration into millisecconds
 *
 * @example
 * ```js
 * durationToMilliSeconds({seconds:1}) // => 1
 * durationToMilliSeconds({minutes:1}) // => 60
 * durationToMilliSeconds({hours:1}) // => 3_600
 * durationToMilliSeconds({minutes:1,seconds:1}) // => 61
 * durationToMilliSeconds({hours:1,minutes:1,seconds:1}) // => 3_661
 * ```
 */
export function durationToSeconds(duration: Duration): number {
	return durationToMilliSeconds(duration) / second;
}

/**
 * check if the duration is larger than the interval
 */
export function isDurationBiggerThanInterval(interval: Interval, duration: Duration): boolean {
	const intervalSeconds = Math.abs(interval.end.getTime() - interval.start.getTime()) / 1000;
	const durationSeconds = durationToSeconds(duration);

	return durationSeconds > intervalSeconds;
}

/**
 * divide the given interval into smaller intervals, each having the duration equal to the given duration
 *
 * @example
 * ```js
 * const start=new Date('2000-01-01');
 * const end=new Date('2000-01-10');
 *
 * splitIntervalByDuration({start, end},{days:1});
 * // [
 * //   {start:2000-01-01, end:2000-01-02},
 * //   {start:2000-01-02, end:2000-01-03},
 * //   {start:2000-01-03, end:2000-01-04},
 * //   {start:2000-01-04, end:2000-01-05},
 * //   {start:2000-01-05, end:2000-01-06},
 * //   {start:2000-01-06, end:2000-01-07},
 * //   {start:2000-01-07, end:2000-01-08},
 * //   {start:2000-01-08, end:2000-01-09},
 * //   {start:2000-01-09, end:2000-01-10},
 * // ]
 * ```
 */
export function splitIntervalByDuration(interval: Interval, duration: Duration): Interval[] {
	if (!interval?.start || !interval?.end) return;
	if (isDurationBiggerThanInterval(interval, duration)) return [interval];

	const intervals: Interval[] = [];

	var start = interval.start;

	while (start < interval.end) {
		let end: Date = new Date(start.getTime() + durationToMilliSeconds(duration));

		if (end > interval.end) end = interval.end;

		intervals.push({ start, end });

		start = end;
	}

	return intervals;
}

/**
 * multiply the given duration
 *
 * @example
 * ```js
 * const duration={moths:2, days:3, hours:4};
 *
 * multiplyDuration(duration:Duration,multiplier:number) // => {moths:4, days:6, hours:8}
 * ```
 */
export function multiplyDuration(duration: Duration, multiplier: number): Duration {
	return {
		years: duration.years * multiplier,
		months: duration.months * multiplier,
		weeks: duration.weeks * multiplier,
		days: duration.days * multiplier,
		hours: duration.hours * multiplier,
		minutes: duration.minutes * multiplier,
		seconds: duration.seconds * multiplier,
	};
}

/**
 * add the given durations
 *
 * @example
 * ```js
 * const duration1={moths:2, days:3, hours:4};
 * const duration2={moths:2, days:3, hours:4};
 * const duration3={moths:2, days:3, hours:4};
 *
 * addDurations(duration1,duration2,duration3) // => {moths:6, days:9, hours:12}
 * ```
 */
export function addDurations(...durations: Duration[]): Duration {
	const retval: Duration = {
		years: 0,
		months: 0,
		weeks: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	};

	for (const duration of durations) {
		retval.years += duration.years || 0;
		retval.months += duration.months || 0;
		retval.weeks += duration.weeks || 0;
		retval.days += duration.days || 0;
		retval.hours += duration.hours || 0;
		retval.minutes += duration.minutes || 0;
		retval.seconds += duration.seconds || 0;
	}

	return retval;
}

export function isValidDate(value: any): value is Date {
	return value instanceof Date && !isNaN(value.valueOf());
}

/**
 * Format a date into sql datetime value
 * @param date
 * @returns
 *  * @example
 * ```js
 * const date = new Date();
 * toSqlDate() // => "2017-06-29 17:54:04"
 */
export function toSqlDate(date: Date): string {
	return date.toISOString().slice(0, 19).replace('T', ' ');
}

/**
 * Convert an interval to a duration
 * @param interval
 * @returns
 *
 * @example
 * ```ts
 * const interval = { start: new Date('2000-01-01'), end: new Date('2000-01-10') };
 * const duration = IntervalToDuration(interval);
 * // { years: 0, months: 0, weeks: 0, days: 9, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }
 * ```
 */
export function intervalToDuration(interval: Interval): Duration {
	if (interval.end === undefined) {
		throw new Error('Invalid interval, end date is missing: ' + JSON.stringify(interval));
	}

	if (interval.start === undefined) {
		throw new Error('Invalid interval, start date is missing: ' + JSON.stringify(interval));
	}

	const start = interval.start.getTime();
	const end = interval.end.getTime();

	if (start > end) {
		throw new Error('Invalid interval, end date is before start date: ' + JSON.stringify(interval));
	}

	let durationInMs = end - start;

	const duration = millisecondsToDuration(durationInMs);

	return duration;
}

/**
 * Humanize a duration object into a human-readable string.
 * @example
 * ```js
 * const duration = { years: 1, months: 2, days: 3, hours: 4, minutes: 5, seconds: 6 };
 * humanizeDuration(duration) // => "1 year, 2 months, 3 days, 4 hours, 5 minutes and 6 seconds"
 * ```
 *  * @example
 * ```js
 * const duration = { seconds: 4000 };
 * humanizeDuration(duration) // => "1 hour, 6 minutes and 40 seconds"
 * ```
 * @param inDuration
 * @param options
 * @returns
 */
export function humanizeDuration(inDuration: Duration, options?: { reduce?: boolean }): string {
	let duration = { ...inDuration };

	if (options?.reduce) {
		duration = millisecondsToDuration(durationToMilliSeconds(duration));
	}

	const parts = [];
	if (duration.years) {
		parts.push(`${duration.years} year${duration.years > 1 ? 's' : ''}`);
	}
	if (duration.months) {
		parts.push(`${duration.months} month${duration.months > 1 ? 's' : ''}`);
	}
	if (duration.weeks) {
		parts.push(`${duration.weeks} week${duration.weeks > 1 ? 's' : ''}`);
	}
	if (duration.days) {
		parts.push(`${duration.days} day${duration.days > 1 ? 's' : ''}`);
	}
	if (duration.hours) {
		parts.push(`${duration.hours} hour${duration.hours > 1 ? 's' : ''}`);
	}
	if (duration.minutes) {
		parts.push(`${duration.minutes} minute${duration.minutes > 1 ? 's' : ''}`);
	}
	if (duration.seconds) {
		parts.push(`${duration.seconds} second${duration.seconds > 1 ? 's' : ''}`);
	}
	if (duration.milliseconds) {
		parts.push(`${duration.milliseconds} millisecond${duration.milliseconds > 1 ? 's' : ''}`);
	}

	// handle singular case
	if (parts.length === 1) {
		return parts[0];
	}

	if (parts.length === 0) {
		return '0 milliseconds';
	}

	const last = parts.pop();
	return parts.join(', ') + ' and ' + last;
}

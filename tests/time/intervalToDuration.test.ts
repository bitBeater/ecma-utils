import assert from "node:assert";
import { describe, it } from "node:test";

import {
    day,
    hour,
    Interval,
    intervalToDuration,
    millis,
    minute,
    month,
    second,
    week,
    year,
} from "@bitbeater/ecma-utils/time";

describe("time/intervalToDuration", () => {
    it("2000-01-01 to 2000-01-10", async () => {
        // 1 week and 2 days
        const interval = {
            start: new Date("2000-01-01"),
            end: new Date("2000-01-10"),
        };
        const duration = intervalToDuration(interval);
        assert.deepEqual(duration, {
            years: 0,
            months: 0,
            weeks: 1,
            days: 2,
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
        });
    });

    it("2000-01-10 to 2000-01-01", async () => {
        // invalid interval, end date is before start date
        const interval = {
            start: new Date("2000-01-10"),
            end: new Date("2000-01-01"),
        };
        assert.throws(() => intervalToDuration(interval));
    });

    it("2000-01-01T00:00:00.000Z to 2000-01-01T00:00:00.001Z", async () => {
        // 1 millisecond
        const interval = {
            start: new Date("2000-01-01T00:00:00.000Z"),
            end: new Date("2000-01-01T00:00:00.001Z"),
        };
        const duration = intervalToDuration(interval);
        assert.deepEqual(duration, {
            years: 0,
            months: 0,
            weeks: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 1,
        });
    });

    it("+1 of each", async () => {
        // years: 1, months: 1, weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 1
        const start = new Date("2000-01-01T00:00:00.000Z");
        const interval: Interval = { start };
        interval.end = new Date(
            start.getTime() + millis + second + minute + hour + day + week +
                month + year,
        );
        const duration = intervalToDuration(interval);
        assert.deepEqual(duration, {
            years: 1,
            months: 1,
            weeks: 1,
            days: 1,
            hours: 1,
            minutes: 1,
            seconds: 1,
            milliseconds: 1,
        });
    });
});

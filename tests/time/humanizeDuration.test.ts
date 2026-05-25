import assert from "node:assert";
import { describe, it } from "node:test";
import {
    day,
    hour,
    humanizeDuration,
    millis,
    minute,
    month,
    second,
    week,
    year,
} from "@bitbeater/ecma-utils/time";

describe("time/humanizeDuration", () => {
    it("single unit", async () => {
        // 1 millisecond

        const duration = {
            years: 1,
            months: 1,
            weeks: 1,
            days: 1,
            hours: 1,
            minutes: 1,
            seconds: 1,
            milliseconds: 1,
        };
        const humanized = humanizeDuration(duration);

        assert.strictEqual(
            humanized,
            "1 year, 1 month, 1 week, 1 day, 1 hour, 1 minute, 1 second and 1 millisecond",
        );
    });

    it("multiple units", async () => {
        // 2 year, 2 months, 2 weeks, 2 day, 2 hours, 2 minutes, 2 seconds and 2 milliseconds
        const duration = {
            years: 2,
            months: 2,
            weeks: 2,
            days: 2,
            hours: 2,
            minutes: 2,
            seconds: 2,
            milliseconds: 2,
        };
        const humanized = humanizeDuration(duration);

        assert.strictEqual(
            humanized,
            "2 years, 2 months, 2 weeks, 2 days, 2 hours, 2 minutes, 2 seconds and 2 milliseconds",
        );
    });

    it("single time unit", async () => {
        // 2 year
        const duration = { years: 2 };
        const humanized = humanizeDuration(duration);

        assert.strictEqual(humanized, "2 years");
    });

    it("zero time unit", async () => {
        // 0 year
        const duration = { years: 0 };
        const humanized = humanizeDuration(duration);

        assert.strictEqual(humanized, "0 milliseconds");
    });

    it("reduced from millis single unit", async () => {
        // 1 year, 1 month, 1 week, 1 day, 1 hour, 1 minute, 1 second and 1 millisecond
        const duration = {
            milliseconds: year + month + week + day + hour + minute + second +
                millis,
        };
        const humanized = humanizeDuration(duration, { reduce: true });

        assert.strictEqual(
            humanized,
            "1 year, 1 month, 1 week, 1 day, 1 hour, 1 minute, 1 second and 1 millisecond",
        );
    });

    it("reduced from millis multiple 2 units", async () => {
        // 2 year, 2 months, 2 weeks, 2 day, 2 hours, 2 minutes, 2 seconds and 2 milliseconds
        const duration = {
            milliseconds: 2 * year + 2 * month + 2 * week + 2 * day + 2 * hour +
                2 * minute + 2 * second + 2 * millis,
        };
        const humanized = humanizeDuration(duration, { reduce: true });

        assert.strictEqual(
            humanized,
            "2 years, 2 months, 2 weeks, 2 days, 2 hours, 2 minutes, 2 seconds and 2 milliseconds",
        );
    });
});

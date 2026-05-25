import assert from "node:assert";
import { describe, it } from "node:test";

import { isInterval } from "@bitbeater/ecma-utils/time";

describe("isInterval", () => {
    it("returns true for a valid interval", () => {
        assert.ok(isInterval({ start: new Date(), end: new Date() }));
        assert.ok(isInterval({ start: new Date() }));
        assert.ok(isInterval({ end: new Date() }));
    });

    it("returns false for an invalid interval", () => {
        assert.strictEqual(isInterval(null), false);
        assert.strictEqual(isInterval(undefined), false);
        assert.strictEqual(isInterval({}), false);
        assert.strictEqual(isInterval({ start: "skdfjsl" }), false);
        assert.strictEqual(isInterval({ end: "skdfjsl" }), false);
        assert.strictEqual(
            isInterval({ start: "skdfjsl", end: "skdfjsl" }),
            false,
        );
    });
});

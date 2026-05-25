import assert from "node:assert";
import { describe, it } from "node:test";
import { collection } from "@bitbeater/ecma-utils";

describe("collection/CircularArray", () => {
    it("should create a circular array", async () => {
        const circularArray = new collection.CircularArray(1, 2, 3);
        assert.strictEqual(circularArray.get(), 1);
    });

    it("should get elements by position", async () => {
        const circularArray = new collection.CircularArray(1, 2, 3);
        assert.strictEqual(circularArray.get(0), 1);
        assert.strictEqual(circularArray.get(1), 2);
        assert.strictEqual(circularArray.get(2), 3);
        assert.strictEqual(circularArray.get(4), 2);
        assert.strictEqual(circularArray.get(-1), 3);
    });

    it("should navigate the circular array", async () => {
        const circularArray = new collection.CircularArray(1, 2, 3);
        assert.strictEqual(circularArray.next(), 2);
        assert.strictEqual(circularArray.next(2), 1);
        assert.strictEqual(circularArray.previous(), 3);
        assert.strictEqual(circularArray.previous(2), 1);
    });

    it("should set the current position", async () => {
        const circularArray = new collection.CircularArray(1, 2, 3);
        circularArray.setPosition(7);
        assert.strictEqual(circularArray.get(), 2);
        assert.strictEqual(circularArray.getIndex(), 1);
    });

    it("should set the current index", async () => {
        const circularArray = new collection.CircularArray(1, 2, 3);
        circularArray.setIndex(2);
        assert.strictEqual(circularArray.get(), 3);
        assert.strictEqual(circularArray.getPosition(), 2);
    });

    it("should throw out of bounds error when setting index", async () => {
        const circularArray = new collection.CircularArray(1, 2, 3);
        assert.throws(() => circularArray.setIndex(3));
        assert.throws(() => circularArray.setIndex(-1));
    });
});

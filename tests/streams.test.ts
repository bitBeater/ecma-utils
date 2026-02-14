import assert from 'node:assert';
import { describe, it } from "node:test";


import { readStreamToUint8Array } from "@bitbeater/ecma-utils/streams";


describe("Streams", () => {
    it("readStreamToUint8Array", async () => {
        const datas = [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6]), new Uint8Array([7, 8, 9])];

        const stream = new ReadableStream<Uint8Array>({
            async start(controller) {
                for (const data of datas) {
                    await new Promise(resolve => setTimeout(resolve, 50));
                    controller.enqueue(data);
                }
                controller.close();
            }
        });

        const result = await readStreamToUint8Array(stream);
        assert.deepStrictEqual(result, new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]));
    });

});

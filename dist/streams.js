/**
 * A function that takes a ReadableStream<Uint8Array<ArrayBuffer>> and returns a promise that resolves to the Uint8Array<ArrayBuffer>.
 * @param stream - The ReadableStream to read from.
 * @returns A promise that resolves to the Uint8Array<ArrayBuffer> read from the stream.
 */
export async function readStreamToUint8Array(stream) {
    const chunks = [];
    let totalLength = 0;
    for await (const chunk of stream) {
        totalLength += chunk.length;
        chunks.push(chunk);
    }
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
    }
    return result;
}
//# sourceMappingURL=streams.js.map
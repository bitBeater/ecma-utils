export function of(data) {
    return Promise.resolve(data);
}
export function delay(ms) {
    return new Promise((resolve, _reject) => {
        setTimeout(resolve, ms);
    });
}
//# sourceMappingURL=promises.js.map
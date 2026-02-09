"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = http;
exports.toURL = toURL;
const math_1 = require("../../math");
const promises_1 = require("../../promises");
const errors_1 = require("./errors");
/**
 *
 * @param request
 * @param requestInit
 * @param options
 * @returns
 */
function http(request, requestInit = {}, options) {
    const { reqTimeOutTimer, controller } = requestTimeout(options);
    let retryCount = 0;
    const maxRetries = (0, math_1.parseIntOrZero)(options?.retry?.maxRetries);
    const retryDelay = (0, math_1.parseIntOrZero)(options?.retry?.retryDelay);
    if (requestInit.signal)
        controller?.signal?.addEventListener('abort', e => requestInit.signal?.dispatchEvent(e));
    else
        requestInit.signal = controller?.signal;
    const doRequest = () => fetch(request, requestInit)
        .finally(() => clearTimeout(reqTimeOutTimer))
        .then(async (response) => {
        if (response.ok)
            return response;
        throw new errors_1.HttpError(response);
    })
        .catch((error) => {
        let response;
        if (error instanceof errors_1.HttpError)
            response = error?.response;
        if (!response?.body?.locked)
            response?.body?.cancel();
        if (retryCount >= maxRetries - 1)
            throw error;
        retryCount++;
        const abort = options?.retry?.onRetry?.({ request, requestInit, options, retryCount, error, response });
        if (abort)
            throw error;
        return (0, promises_1.delay)(retryDelay).then(() => doRequest());
    });
    return doRequest();
}
function toURL(httpRequest) {
    // @ts-ignore
    return new URL(httpRequest?.url || httpRequest.toString());
}
function requestTimeout(options) {
    if (!options?.timeout)
        return {};
    const controller = new AbortController();
    const reqTimeOutTimer = setTimeout(() => controller.abort(), options.timeout);
    return { reqTimeOutTimer, controller };
}
//# sourceMappingURL=http.js.map
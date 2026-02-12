export * from './errors.js';
export * from './cookies.js';
export * from './headers.js';
export * from './methods.js';
import { parseIntOrZero } from '../../math.js';
import { delay } from '../../promises.js';
import { HttpError } from './errors.js';
/**
 * @abstraction http is a wrapper around the Fetch API that adds support for request timeouts and retries.
 * @param request
 * @param requestInit
 * @returns Promise<Response>
 * @throws HttpError - if the response status is not ok (2xx).
 * @throws Error - if the request fails due to network errors.
 */
export function http(request, requestInit = {}) {
    const { reqTimeOutTimer, controller } = requestTimeout(requestInit);
    let retryCount = 0;
    const maxRetries = parseIntOrZero(requestInit?.retry?.maxRetries);
    const retryDelay = parseIntOrZero(requestInit?.retry?.retryDelay);
    if (requestInit.signal)
        controller?.signal?.addEventListener('abort', e => requestInit.signal?.dispatchEvent(e));
    else
        requestInit.signal = controller?.signal;
    const doRequest = () => fetch(request, requestInit)
        .finally(() => clearTimeout(reqTimeOutTimer))
        .then(async (response) => {
        if (response.ok)
            return response;
        throw new HttpError(response);
    })
        .catch((error) => {
        let response;
        if (error instanceof HttpError)
            response = error?.response;
        if (!response?.body?.locked)
            response?.body?.cancel();
        if (retryCount >= maxRetries - 1)
            throw error;
        retryCount++;
        const abort = requestInit?.retry?.onRetry?.({ request, requestInit, retryCount, error, response });
        if (abort)
            throw error;
        return delay(retryDelay).then(() => doRequest());
    });
    return doRequest();
}
export function toURL(httpRequest) {
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
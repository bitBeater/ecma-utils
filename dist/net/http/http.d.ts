export * from './errors.js';
export * from './cookies.js';
export * from './headers.js';
export * from './methods.js';
export type OnRetryParams = {
    request: Request | string | URL;
    requestInit?: RequestInit;
    response?: Response;
    error?: Error;
    retryCount: number;
};
/**
 *  RetryCallBack is a callback function that is called just before a retry is attempted.
 *
 * @param options
 * @returns boolean - return true to abort the retry.
 */
export type RetryCallBack = (retryParams: OnRetryParams) => true | void;
export interface HttpRetryOptions {
    retryDelay?: number;
    maxRetries?: number;
    onRetry?: RetryCallBack;
}
export interface HttpRequestInit extends RequestInit {
    timeout?: number;
    retry?: HttpRetryOptions;
}
export type HttpRequestInput = Request | string | URL;
/**
 * @abstraction http is a wrapper around the Fetch API that adds support for request timeouts and retries.
 * @param request
 * @param requestInit
 * @returns Promise<Response>
 * @throws HttpError - if the response status is not ok (2xx).
 * @throws Error - if the request fails due to network errors.
 */
export declare function http(request: HttpRequestInput, requestInit?: HttpRequestInit): Promise<Response>;
export declare function toURL(httpRequest: HttpRequestInput): URL;
//# sourceMappingURL=http.d.ts.map
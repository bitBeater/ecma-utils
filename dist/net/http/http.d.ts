export type OnRetryParams = {
    request: Request | string | URL;
    requestInit?: RequestInit;
    options?: RequestOptions;
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
export interface RequestOptions {
    retry?: HttpRetryOptions;
    timeout?: number;
}
export interface HttpRequest extends Request {
    timeout?: number;
    retry?: HttpRetryOptions;
}
type HttpRequestInput = Request | string | URL;
/**
 *
 * @param request
 * @param requestInit
 * @param options
 * @returns
 */
export declare function http(request: HttpRequestInput, requestInit?: RequestInit, options?: RequestOptions): Promise<Response>;
export declare function toURL(httpRequest: HttpRequest): URL;
export {};
//# sourceMappingURL=http.d.ts.map
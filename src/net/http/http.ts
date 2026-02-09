import { parseIntOrZero } from '../../math';
import { delay } from '../../promises';
import { HttpError } from './errors';


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

// export type HttpRequest = Request | string | URL;

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
export function http(request: HttpRequestInput, requestInit: HttpRequestInit = {}): Promise<Response> {
	const { reqTimeOutTimer, controller } = requestTimeout(requestInit);
	let retryCount = 0;

	const maxRetries = parseIntOrZero(requestInit?.retry?.maxRetries);
	const retryDelay = parseIntOrZero(requestInit?.retry?.retryDelay);

	if (requestInit.signal) controller?.signal?.addEventListener('abort', e => requestInit.signal?.dispatchEvent(e));
	else requestInit.signal = controller?.signal;

	const doRequest = () => fetch(request, requestInit)
		.finally(() => clearTimeout(reqTimeOutTimer))
		.then(async (response: Response) => {
			if (response.ok) return response;
			throw new HttpError(response);
		})
		.catch((error: Error) => {

			let response: Response;

			if (error instanceof HttpError)
				response = error?.response;

			if (!response?.body?.locked)
				response?.body?.cancel()

			if (retryCount >= maxRetries - 1)
				throw error;

			retryCount++;

			const abort = requestInit?.retry?.onRetry?.({ request, requestInit, retryCount, error, response });
			if (abort) throw error;

			return delay(retryDelay).then(() => doRequest());
		});


	return doRequest();
}

export function toURL(httpRequest: HttpRequestInput): URL {
	// @ts-ignore
	return new URL(httpRequest?.url || httpRequest.toString());
}

function requestTimeout(options?: HttpRequestInit) {

	if (!options?.timeout) return {};

	const controller = new AbortController();
	const reqTimeOutTimer = setTimeout(() => controller.abort(), options.timeout);
	return { reqTimeOutTimer, controller };
}

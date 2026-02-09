import { parseIntOrZero } from '../../math';
import { delay } from '../../promises';
import { HttpError } from './errors';


export type OnRetryParams = {
	request: Request | string | URL;
	requestInit?: RequestInit;
	options?: RequestOptions
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

// export type HttpRequest = Request | string | URL;

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
export function http(request: HttpRequestInput, requestInit: RequestInit = {}, options?: RequestOptions): Promise<Response> {
	const { reqTimeOutTimer, controller } = requestTimeout(options);
	let retryCount = 0;
	const maxRetries = parseIntOrZero(options?.retry?.maxRetries);
	const retryDelay = parseIntOrZero(options?.retry?.retryDelay);

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

			const abort = options?.retry?.onRetry?.({ request, requestInit, options, retryCount, error, response });
			if (abort) throw error;

			return delay(retryDelay).then(() => doRequest());
		});


	return doRequest();
}

export function toURL(httpRequest: HttpRequest): URL {
	// @ts-ignore
	return new URL(httpRequest?.url || httpRequest.toString());
}

function requestTimeout(options?: RequestOptions) {
	if (!options?.timeout) return {};
	const controller = new AbortController();
	const reqTimeOutTimer = setTimeout(() => controller.abort(), options.timeout);
	return { reqTimeOutTimer, controller };
}

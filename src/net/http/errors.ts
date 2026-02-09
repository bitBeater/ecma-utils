
export class HttpError extends Error {
    constructor(readonly response: Response) {

        const httpErrorInfo = {
            Error: `HTTP request failed with status ${response.status}`,
            status: response.status,
            url: response.url,
            statusText: response.statusText,
            headers: response.headers,
        };

        super(JSON.stringify(httpErrorInfo));
        this.name = 'HttpError';
    }
}

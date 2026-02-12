export class HttpError extends Error {
    response;
    constructor(response) {
        const httpErrorInfo = {
            Error: `HTTP request failed with status ${response.status}`,
            status: response.status,
            url: response.url,
            statusText: response.statusText,
            headers: response.headers,
        };
        super(JSON.stringify(httpErrorInfo));
        this.response = response;
        this.name = 'HttpError';
    }
}
//# sourceMappingURL=errors.js.map
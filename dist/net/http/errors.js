"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
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
exports.HttpError = HttpError;
//# sourceMappingURL=errors.js.map
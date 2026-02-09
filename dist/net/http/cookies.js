"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieStringToObject = cookieStringToObject;
exports.cookieObjectToString = cookieObjectToString;
exports.cookieArrayToString = cookieArrayToString;
function cookieStringToObject(cookie) {
    const cookies = {};
    const parts = cookie.split(';');
    for (const part of parts) {
        const equlIndex = part.indexOf('=');
        const [key, value] = [part.slice(0, equlIndex), part.slice(equlIndex + 1)];
        cookies[key.trim()] = value.trim();
    }
    return cookies;
}
function cookieObjectToString(cookie) {
    const parts = [];
    for (const key in cookie) {
        parts.push(`${key}=${cookie[key]}`);
    }
    return parts.join('; ');
}
function cookieArrayToString(cookies) {
    const parts = [];
    for (const cookie of cookies) {
        parts.push(`${cookie[0]}=${cookie[1]}`);
    }
    return parts.join('; ');
}
//# sourceMappingURL=cookies.js.map
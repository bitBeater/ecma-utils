export function cookieStringToObject(cookie: string): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};
    const parts = cookie.split(';');
    for (const part of parts) {
        const equlIndex = part.indexOf('=');
        const [key, value] = [part.slice(0, equlIndex), part.slice(equlIndex + 1)];
        cookies[key.trim()] = value.trim();
    }
    return cookies;
}

export function cookieObjectToString(cookie: { [key: string]: string }): string {
    const parts: string[] = [];
    for (const key in cookie) {
        parts.push(`${key}=${cookie[key]}`);
    }
    return parts.join('; ');
}

export function cookieArrayToString(cookies: [string, string]): string {
    const parts: string[] = [];
    for (const cookie of cookies) {
        parts.push(`${cookie[0]}=${cookie[1]}`);
    }
    return parts.join('; ');
}

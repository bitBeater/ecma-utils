import { ISO_8601_DATE_FORMAT_REX } from './consts.js';
/**
 * revive
 * @param _key
 * @param value
 * @returns
 */
export const ISO_8601StringtoDate = (_key, value) => (typeof value === 'string' && ISO_8601_DATE_FORMAT_REX.test(value) ? new Date(value) : value);
/**
 * merge multiple reviver in one, the resulted value is equal to the result of the first reviver that resolve,
 * so reviver order determine theire priority
 *
 * @param revivers
 * @returns
 * @link  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#using_the_reviver_parameter
 */
export function mergeRevivers(...revivers) {
    if (!revivers?.length)
        return;
    return (key, value) => {
        for (const reviver of revivers) {
            const revived = reviver(key, value);
            if (revived !== value)
                return revived;
        }
        return value;
    };
}
//# sourceMappingURL=revivers.js.map
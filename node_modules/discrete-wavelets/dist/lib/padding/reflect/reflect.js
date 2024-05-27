"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflectPadding = exports.REFLECT_PADDING = void 0;
/**
 * Reflect padding.
 */
exports.REFLECT_PADDING = 'reflect';
/**
 * Returns a single value of reflect padding.
 *
 * @param  data    Input values.
 * @param  index   Index of padding.
 * @param  inverse True if the direction should be inversed.
 * @return         Single padding value.
 */
function reflectPadding(data, index, inverse) {
    if (inverse === void 0) { inverse = false; }
    /* Check if data has length larger than zero. */
    if (data.length === 0) {
        throw new Error('Cannot determine reflect padding for data of zero length.');
    }
    /* Return constant value for data of length one. */
    if (data.length === 1)
        return data[0];
    /* Determine reflect padding. */
    var dirChanges = Math.floor(index / (data.length - 1));
    var inversions = (inverse) ? dirChanges : dirChanges + 1;
    return (inversions % 2 === 0)
        ? data[index % (data.length - 1) + 1]
        : data[data.length - 2 - (index % (data.length - 1))];
}
exports.reflectPadding = reflectPadding;
;
//# sourceMappingURL=reflect.js.map
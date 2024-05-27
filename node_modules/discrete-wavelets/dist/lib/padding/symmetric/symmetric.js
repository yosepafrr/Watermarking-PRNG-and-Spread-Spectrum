"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symmetricPadding = exports.SYMMETRIC_PADDING = void 0;
/**
 * Symmetric padding.
 */
exports.SYMMETRIC_PADDING = 'symmetric';
/**
 * Returns a single value of symmetric padding.
 *
 * @param  data    Input values.
 * @param  index   Index of padding.
 * @param  inverse True if the direction should be inversed.
 * @return         Single padding value.
 */
function symmetricPadding(data, index, inverse) {
    if (inverse === void 0) { inverse = false; }
    /* Check if data has length larger than zero. */
    if (data.length === 0) {
        throw new Error('Cannot determine symmetric padding for data of zero length.');
    }
    /* Determine symmetric padding. */
    var dirChanges = Math.floor(index / data.length);
    var inversions = (inverse) ? dirChanges : dirChanges + 1;
    return (inversions % 2 === 0)
        ? data[index % data.length]
        : data[data.length - 1 - (index % data.length)];
}
exports.symmetricPadding = symmetricPadding;
;
//# sourceMappingURL=symmetric.js.map
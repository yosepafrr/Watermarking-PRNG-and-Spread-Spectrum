"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constantPadding = exports.CONSTANT_PADDING = void 0;
/**
 * Constant padding.
 */
exports.CONSTANT_PADDING = 'constant';
/**
 * Returns a single value of constant padding.
 *
 * @param  data    Input values.
 * @param  inverse True if the direction should be inversed.
 * @return         Single padding value.
 */
function constantPadding(data, inverse) {
    if (inverse === void 0) { inverse = false; }
    /* Check if data has length larger than zero. */
    if (data.length === 0) {
        throw new Error('Cannot determine constant padding for data of zero length.');
    }
    /* Determine constant padding. */
    return (!inverse)
        ? data[data.length - 1]
        : data[0];
}
exports.constantPadding = constantPadding;
;
//# sourceMappingURL=constant.js.map
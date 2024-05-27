"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.periodicPadding = exports.PERIODIC_PADDING = void 0;
/**
 * Periodic padding.
 */
exports.PERIODIC_PADDING = 'periodic';
/**
 * Returns a single value of periodic padding.
 *
 * @param  data    Input values.
 * @param  index   Index of padding.
 * @param  inverse True if the direction should be inversed.
 * @return         Single padding value.
 */
function periodicPadding(data, index, inverse) {
    if (inverse === void 0) { inverse = false; }
    /* Check if data has length larger than zero. */
    if (data.length === 0) {
        throw new Error('Cannot determine periodic padding for data of zero length.');
    }
    /* Determine periodic padding. */
    return (!inverse)
        ? data[index % data.length]
        : data[data.length - 1 - (index % data.length)];
}
exports.periodicPadding = periodicPadding;
;
//# sourceMappingURL=periodic.js.map
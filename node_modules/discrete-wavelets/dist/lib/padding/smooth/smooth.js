"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smoothPadding = exports.SMOOTH_PADDING = void 0;
/**
 * Smooth padding.
 */
exports.SMOOTH_PADDING = 'smooth';
/**
 * Returns a single value of smooth padding.
 *
 * @param  data    Input values.
 * @param  index   Index of padding.
 * @param  inverse True if the direction should be inversed.
 * @return         Single padding value.
 */
function smoothPadding(data, index, inverse) {
    if (inverse === void 0) { inverse = false; }
    /* Check if data has length larger than zero. */
    if (data.length === 0) {
        throw new Error('Cannot determine smooth padding for data of zero length.');
    }
    /* Determine line equation. */
    var end = data.length - 1;
    var offset = (inverse) ? data[0] : data[end];
    var slope = (inverse)
        ? (data.length === 1) ? data[0] : data[0] - data[1]
        : (data.length === 1) ? -data[0] : data[end] - data[end - 1];
    return offset + (index + 1) * slope;
}
exports.smoothPadding = smoothPadding;
;
//# sourceMappingURL=smooth.js.map
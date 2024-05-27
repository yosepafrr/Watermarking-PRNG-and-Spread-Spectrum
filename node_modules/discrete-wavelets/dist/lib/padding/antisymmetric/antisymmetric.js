"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.antisymmetricPadding = exports.ANTISYMMETRIC_PADDING = void 0;
var symmetric_1 = require("../symmetric/symmetric");
/**
 * Antisymmetric padding.
 */
exports.ANTISYMMETRIC_PADDING = 'antisymmetric';
/**
 * Returns a single value of antisymmetric padding.
 *
 * @param  data    Input values.
 * @param  index   Index of padding.
 * @param  inverse True if the direction should be inversed.
 * @return         Single padding value.
 */
function antisymmetricPadding(data, index, inverse) {
    if (inverse === void 0) { inverse = false; }
    var dirChanges = Math.floor(index / data.length);
    var sign = (dirChanges % 2 === 0) ? -1 : 1;
    return sign * (0, symmetric_1.symmetricPadding)(data, index, inverse);
}
exports.antisymmetricPadding = antisymmetricPadding;
;
//# sourceMappingURL=antisymmetric.js.map
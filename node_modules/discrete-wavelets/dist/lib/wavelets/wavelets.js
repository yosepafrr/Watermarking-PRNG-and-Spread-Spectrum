"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScalingNumbers = void 0;
__exportStar(require("./daubechies/daubechies"), exports);
var daubechies_1 = require("./daubechies/daubechies");
;
/**
 * Mapping of wavelet type keys to scaling numbers.
 */
exports.ScalingNumbers = {
    'db1': daubechies_1.HaarWavelet,
    'db2': daubechies_1.Db2Wavelet,
    'db3': daubechies_1.Db3Wavelet,
    'db4': daubechies_1.Db4Wavelet,
    'db5': daubechies_1.Db5Wavelet,
    'db6': daubechies_1.Db6Wavelet,
    'db7': daubechies_1.Db7Wavelet,
    'db8': daubechies_1.Db8Wavelet,
    'db9': daubechies_1.Db9Wavelet,
    'db10': daubechies_1.Db10Wavelet,
    'D2': daubechies_1.HaarWavelet,
    'D4': daubechies_1.Db2Wavelet,
    'D6': daubechies_1.Db3Wavelet,
    'D8': daubechies_1.Db4Wavelet,
    'D10': daubechies_1.Db5Wavelet,
    'D12': daubechies_1.Db6Wavelet,
    'D14': daubechies_1.Db7Wavelet,
    'D16': daubechies_1.Db8Wavelet,
    'D18': daubechies_1.Db9Wavelet,
    'D20': daubechies_1.Db10Wavelet,
    'haar': daubechies_1.HaarWavelet,
};
//# sourceMappingURL=wavelets.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PADDING_MODES = exports.zeroPadding = exports.symmetricPadding = exports.smoothPadding = exports.reflectPadding = exports.periodicPadding = exports.constantPadding = exports.antisymmetricPadding = void 0;
var antisymmetric_1 = require("./antisymmetric/antisymmetric");
Object.defineProperty(exports, "antisymmetricPadding", { enumerable: true, get: function () { return antisymmetric_1.antisymmetricPadding; } });
var constant_1 = require("./constant/constant");
Object.defineProperty(exports, "constantPadding", { enumerable: true, get: function () { return constant_1.constantPadding; } });
var periodic_1 = require("./periodic/periodic");
Object.defineProperty(exports, "periodicPadding", { enumerable: true, get: function () { return periodic_1.periodicPadding; } });
var reflect_1 = require("./reflect/reflect");
Object.defineProperty(exports, "reflectPadding", { enumerable: true, get: function () { return reflect_1.reflectPadding; } });
var smooth_1 = require("./smooth/smooth");
Object.defineProperty(exports, "smoothPadding", { enumerable: true, get: function () { return smooth_1.smoothPadding; } });
var symmetric_1 = require("./symmetric/symmetric");
Object.defineProperty(exports, "symmetricPadding", { enumerable: true, get: function () { return symmetric_1.symmetricPadding; } });
var zero_1 = require("./zero/zero");
Object.defineProperty(exports, "zeroPadding", { enumerable: true, get: function () { return zero_1.zeroPadding; } });
var antisymmetric_2 = require("./antisymmetric/antisymmetric");
var constant_2 = require("./constant/constant");
var periodic_2 = require("./periodic/periodic");
var reflect_2 = require("./reflect/reflect");
var smooth_2 = require("./smooth/smooth");
var symmetric_2 = require("./symmetric/symmetric");
var zero_2 = require("./zero/zero");
/**
 * Supported signal extension modes.
 */
exports.PADDING_MODES = {
    antisymmetric: antisymmetric_2.ANTISYMMETRIC_PADDING,
    constant: constant_2.CONSTANT_PADDING,
    periodic: periodic_2.PERIODIC_PADDING,
    reflect: reflect_2.REFLECT_PADDING,
    smooth: smooth_2.SMOOTH_PADDING,
    symmetric: symmetric_2.SYMMETRIC_PADDING,
    zero: zero_2.ZERO_PADDING,
    modes: [
        zero_2.ZERO_PADDING,
        constant_2.CONSTANT_PADDING,
        symmetric_2.SYMMETRIC_PADDING,
        periodic_2.PERIODIC_PADDING,
        smooth_2.SMOOTH_PADDING,
        reflect_2.REFLECT_PADDING,
        antisymmetric_2.ANTISYMMETRIC_PADDING,
    ],
};
//# sourceMappingURL=padding.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waveletFromScalingNumbers = exports.padWidths = exports.padElement = exports.mulScalar = exports.dot = exports.createArray = exports.basisFromWavelet = exports.assertValidFilters = exports.assertValidCoeffs = exports.assertValidApproxDetail = exports.add = void 0;
var padding_1 = require("./padding/padding");
var wavelets_1 = require("./wavelets/wavelets");
/**
 * Calculates the element-wise sum of two arrays.
 *
 * @param  a First array.
 * @param  b Second array.
 * @return   Element-wise sum.
 */
function add(a, b) {
    /* Check for same length of arrays. */
    if (a.length !== b.length) {
        throw new Error('Both arrays have to have the same length.');
    }
    /* Calculate element-wise sum. */
    return a.map(function (value, index) { return value + b[index]; });
}
exports.add = add;
/**
 * Asserts if approximation and detail coefficients are valid or throws an
 * error if they are invalid.
 *
 * @param  approx Approximation coefficients.
 * @param  detail Detail coefficients.
 * @return        True if the coefficients are valid, otherwise throws an error.
 */
function assertValidApproxDetail(approx, detail) {
    /* Check if coefficients have equal length. */
    if (approx.length !== detail.length) {
        throw new Error('Approximation and detail coefficients must have equal length.');
    }
    /* Check for coefficients of zero length. */
    if (approx.length === 0) {
        throw new Error('Approximation and detail coefficients must not have zero length.');
    }
    return true;
}
exports.assertValidApproxDetail = assertValidApproxDetail;
/**
 * Asserts if coefficients are valid or throws an error if they are invalid.
 *
 * @param  coeffs Coefficients to test.
 * @return        True if the coefficients are valid, otherwise throws an error.
 */
function assertValidCoeffs(coeffs) {
    /* Check if at least an array of approximation coefficients is given. */
    if (coeffs.length < 1) {
        throw new Error('Invalid coefficients. Array length must not be zero.');
    }
    return true;
}
exports.assertValidCoeffs = assertValidCoeffs;
/**
 * Asserts if wavelet filters are valid or throws an error if they are invalid.
 *
 * @param  filters Wavelet filters to test.
 * @return         True if the wavelet filters are valid, otherwise throws an error.
 */
function assertValidFilters(filters) {
    /* Check if high-pass and low-pass filters have equal length. */
    if (filters.high.length !== filters.low.length) {
        throw new Error('High-pass and low-pass filters have to have equal length.');
    }
    /* Check if filter length is larger than or equal to two. */
    if (filters.low.length < 2) {
        throw new Error('Wavelet filter length has to be larger than or equal to two.');
    }
    return true;
}
exports.assertValidFilters = assertValidFilters;
/**
 * Determines a wavelet basis from a wavelet type or basis.
 *
 * @param  wavelet Wavelet type or basis.
 * @return         Wavelet basis.
 */
function basisFromWavelet(wavelet) {
    return (typeof wavelet !== 'string')
        ? wavelet
        : waveletFromScalingNumbers(wavelets_1.ScalingNumbers[wavelet]);
}
exports.basisFromWavelet = basisFromWavelet;
/**
 * Creates an array and populates it.
 *
 * @param  length   Length of the array.
 * @param  populate Function to populate the array.
 * @return          Populated array with specified length.
 */
function createArray(length, populate) {
    if (populate === void 0) { populate = 0; }
    /* Check for non-integer length. */
    if (!Number.isInteger(length)) {
        throw new Error('Length has to be an integer.');
    }
    /* Check for length less than zero. */
    if (length < 0) {
        throw new Error('Length must not be smaller than zero.');
    }
    /* Create and populate array. */
    return Array.apply(null, Array(length)).map(function (_, index) {
        return (typeof populate === 'function')
            ? populate(index)
            : populate;
    });
}
exports.createArray = createArray;
/**
 * Calculates the dot product of two arrays.
 *
 * @param  a First array.
 * @param  b Second array.
 * @return   Dot product.
 */
function dot(a, b) {
    /* Check for same length of arrays. */
    if (a.length !== b.length) {
        throw new Error('Both arrays have to have the same length.');
    }
    /* Calculate dot product. */
    return a.reduce(function (dot, value, index) { return dot + value * b[index]; }, 0);
}
exports.dot = dot;
/**
 * Multiplies an array with a scalar value.
 *
 * @param  scalar Scalar value.
 * @param  array  Array of numbers.
 * @return        Array multiplied with scalar value.
 */
function mulScalar(scalar, array) {
    return array.map(function (value) { return scalar * value; });
}
exports.mulScalar = mulScalar;
/**
 * Returns a single padding element.
 *
 * @param  data    Input data.
 * @param  index   Index of padding element.
 * @param  inverse True if the padding direction is inversed.
 * @param  mode    Signal extension mode.
 * @return         Single padding element.
 */
function padElement(data, index, inverse, mode) {
    switch (mode) {
        case padding_1.PADDING_MODES.antisymmetric:
            return (0, padding_1.antisymmetricPadding)(data, index, inverse);
        case padding_1.PADDING_MODES.constant:
            return (0, padding_1.constantPadding)(data, inverse);
        case padding_1.PADDING_MODES.periodic:
            return (0, padding_1.periodicPadding)(data, index, inverse);
        case padding_1.PADDING_MODES.reflect:
            return (0, padding_1.reflectPadding)(data, index, inverse);
        case padding_1.PADDING_MODES.smooth:
            return (0, padding_1.smoothPadding)(data, index, inverse);
        case padding_1.PADDING_MODES.symmetric:
            return (0, padding_1.symmetricPadding)(data, index, inverse);
        case padding_1.PADDING_MODES.zero:
            return (0, padding_1.zeroPadding)();
        default:
            throw new Error('Unknown signal extension mode: "' + mode + '"');
    }
}
exports.padElement = padElement;
/**
 * Determines the padding widths.
 *
 * @param  dataLength   Length of signal.
 * @param  filterLength Length of filter.
 * @return              Padding widths.
 */
function padWidths(dataLength, filterLength) {
    /* Check for valid data length. */
    if (dataLength <= 0) {
        throw new Error('Cannot determine padding widths for data of length less than or equal to zero.');
    }
    /* Check for valid filter length. */
    if (filterLength < 2) {
        throw new Error('Cannot determine padding widths for filter of length less than two.');
    }
    /* Determine padding widths. */
    return [
        filterLength - 2,
        ((dataLength + filterLength) % 2 === 0)
            ? filterLength - 2
            : filterLength - 1
    ];
}
exports.padWidths = padWidths;
/**
 * Determines a wavelet basis from scaling numbers.
 *
 * @param  scalingNumbers Wavelet scaling numbers.
 * @return                Wavelet basis.
 */
function waveletFromScalingNumbers(scalingNumbers) {
    /* Check if length is larger than or equal to two. */
    if (scalingNumbers.length < 2) {
        throw new Error('Scaling numbers length has to be larger than or equal to two.');
    }
    /* Determine wavelet numbers. */
    var waveletNumbers = scalingNumbers.slice() // Copy array
        .reverse()
        .map(function (value, index) { return (index % 2 === 0) ? value : -value; });
    /* Determine wavelet basis. */
    return {
        dec: {
            low: scalingNumbers.slice(),
            high: waveletNumbers.slice(),
        },
        rec: {
            low: scalingNumbers.slice(),
            high: waveletNumbers.slice()
        },
    };
}
exports.waveletFromScalingNumbers = waveletFromScalingNumbers;
//# sourceMappingURL=helpers.js.map
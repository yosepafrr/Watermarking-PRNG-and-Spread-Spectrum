"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var padding_1 = require("./padding/padding");
/**
 * Default padding mode to use.
 */
var DEFAULT_PADDING_MODE = padding_1.PADDING_MODES.symmetric;
/**
 * Collection of methods for Discrete Wavelet Transform (DWT).
 */
var DiscreteWavelets = /** @class */ (function () {
    function DiscreteWavelets() {
    }
    /**
     * Single level Discrete Wavelet Transform.
     *
     * @param  data    Input data.
     * @param  wavelet Wavelet to use.
     * @param  mode    Signal extension mode.
     * @return         Approximation and detail coefficients as result of the transform.
     */
    DiscreteWavelets.dwt = function (data, wavelet, mode) {
        if (mode === void 0) { mode = DEFAULT_PADDING_MODE; }
        /* Determine wavelet basis and filters. */
        var waveletBasis = (0, helpers_1.basisFromWavelet)(wavelet);
        var filters = waveletBasis.dec;
        (0, helpers_1.assertValidFilters)(filters);
        var filterLength = filters.low.length;
        /* Add padding. */
        data = this.pad(data, (0, helpers_1.padWidths)(data.length, filterLength), mode);
        /* Initialize approximation and detail coefficients. */
        var approx = [];
        var detail = [];
        /* Calculate coefficients. */
        for (var offset = 0; offset + filterLength <= data.length; offset += 2) {
            /* Determine slice of values. */
            var values = data.slice(offset, offset + filterLength);
            /* Calculate approximation coefficients. */
            approx.push((0, helpers_1.dot)(values, filters.low));
            /* Calculate detail coefficients. */
            detail.push((0, helpers_1.dot)(values, filters.high));
        }
        /* Return approximation and detail coefficients. */
        return [approx, detail];
    };
    /**
     * Calculates the energy as sum of squares of an array of data or
     * coefficients.
     *
     * @param  values Array of data or coefficients.
     * @return        Energy of values as the sum of squares.
     */
    DiscreteWavelets.energy = function (values) {
        var energy = 0;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (typeof value === "number")
                energy += Math.pow(value, 2);
            else
                energy += this.energy(value);
        }
        return energy;
    };
    /**
     * Single level inverse Discrete Wavelet Transform.
     *
     * @param  approx  Approximation coefficients. If undefined, it will be set to an array of zeros with length equal to the detail coefficients.
     * @param  detail  Detail coefficients. If undefined, it will be set to an array of zeros with length equal to the approximation coefficients.
     * @param  wavelet Wavelet to use.
     * @return         Approximation coefficients of previous level of transform.
     */
    DiscreteWavelets.idwt = function (approx, detail, wavelet) {
        /* Fill empty array with zeros. */
        if (approx === undefined && detail !== undefined) {
            approx = (0, helpers_1.createArray)(detail.length, 0);
        }
        if (detail === undefined && approx !== undefined) {
            detail = (0, helpers_1.createArray)(approx.length, 0);
        }
        /* Check if some coefficients are undefined. */
        if (approx === undefined || detail === undefined) {
            throw new Error("Coefficients must not be undefined.");
        }
        (0, helpers_1.assertValidApproxDetail)(approx, detail);
        /* Determine wavelet basis and filters. */
        var waveletBasis = (0, helpers_1.basisFromWavelet)(wavelet);
        var filters = waveletBasis.rec;
        (0, helpers_1.assertValidFilters)(filters);
        var filterLength = filters.low.length;
        /* Initialize transform. */
        var coeffLength = approx.length;
        var pad = (0, helpers_1.createArray)(filterLength + (coeffLength - 1) * 2, 0);
        /* Perform inverse Discrete Wavelet Transform. */
        for (var i = 0; i < coeffLength; i++) {
            var offset = 2 * i;
            /* Calculate values. */
            var values = pad.slice(offset, offset + filterLength);
            values = (0, helpers_1.add)(values, (0, helpers_1.mulScalar)(approx[i], filters.low));
            values = (0, helpers_1.add)(values, (0, helpers_1.mulScalar)(detail[i], filters.high));
            /* Update values. */
            pad = pad
                .slice(0, offset)
                .concat(values)
                .concat(pad.slice(offset + values.length));
        }
        /* Remove padding. */
        return pad.slice(filterLength - 2, pad.length - (filterLength - 2));
    };
    /**
     * Determines the maximum level of useful decomposition.
     *
     * @param  dataLength Length of input data.
     * @param  wavelet    Wavelet to use.
     * @return            Maximum useful level of decomposition.
     */
    DiscreteWavelets.maxLevel = function (dataLength, wavelet) {
        /* Check for non-integer length. */
        if (!Number.isInteger(dataLength)) {
            throw new Error("Length of data is not an integer. This is not allowed.");
        }
        /* Check for invalid input. */
        if (dataLength < 0) {
            throw new Error("Data length cannot be less than zero.");
        }
        /* Return zero for data of zero length. */
        if (dataLength === 0)
            return 0;
        /* Determine wavelet basis. */
        var waveletBasis = (0, helpers_1.basisFromWavelet)(wavelet);
        /* Determine length of filter. */
        var filterLength = waveletBasis.dec.low.length;
        // SOURCE: https://pywavelets.readthedocs.io/en/latest/ref/dwt-discrete-wavelet-transform.html#maximum-decomposition-level-dwt-max-level-dwtn-max-level
        return Math.max(0, Math.floor(Math.log2(dataLength / (filterLength - 1))));
    };
    /**
     * Extends a signal with a given padding mode.
     *
     * @param  data      Input data.
     * @param  padWidths Widths of padding at front and back.
     * @param  mode      Signal extension mode.
     * @return           Data with padding.
     */
    DiscreteWavelets.pad = function (data, padWidths, mode) {
        /* Check for undefined data. */
        if (!data) {
            throw new Error("Cannot add padding to empty data.");
        }
        /* Initialize. */
        var front = padWidths[0];
        var back = padWidths[1];
        /* Add padding. */
        return (0, helpers_1.createArray)(front, function (index) { return (0, helpers_1.padElement)(data, front - 1 - index, true, mode); })
            .concat(data)
            .concat((0, helpers_1.createArray)(back, function (index) { return (0, helpers_1.padElement)(data, index, false, mode); }));
    };
    /**
     * 1D wavelet decomposition. Transforms data by calculating coefficients from
     * input data.
     *
     * @param  data    Input data.
     * @param  wavelet Wavelet to use.
     * @param  mode    Signal extension mode.
     * @param  level   Decomposition level. Defaults to level calculated by maxLevel function.
     * @return         Coefficients as result of the transform.
     */
    DiscreteWavelets.wavedec = function (data, wavelet, mode, level) {
        if (mode === void 0) { mode = DEFAULT_PADDING_MODE; }
        /* Determine decomposition level. */
        if (level === undefined)
            level = this.maxLevel(data.length, wavelet);
        if (level < 0) {
            throw new Error("Decomposition level must not be less than zero");
        }
        /*  Initialize transform. */
        var coeffs = [];
        var approx = data.slice();
        /* Transform. */
        for (var l = 1; l <= level; l++) {
            /* Perform single level transform. */
            var approxDetail = this.dwt(approx, wavelet, mode);
            approx = approxDetail[0];
            var detail = approxDetail[1];
            /* Prepend detail coefficients. */
            coeffs.unshift(detail.slice());
        }
        /* Prepend last approximation. */
        coeffs.unshift(approx.slice());
        /* Return coefficients. */
        return coeffs;
    };
    /**
     * 1D wavelet reconstruction. Inverses a transform by calculating input data
     * from coefficients.
     *
     * @param  coeffs  Coefficients as result of a transform.
     * @param  wavelet Wavelet to use.
     * @return         Input data as result of the inverse transform.
     */
    DiscreteWavelets.waverec = function (coeffs, wavelet) {
        /* Check if coefficients are valid. */
        (0, helpers_1.assertValidCoeffs)(coeffs);
        /* Determine wavelet. */
        wavelet = (0, helpers_1.basisFromWavelet)(wavelet);
        /* Initialize transform. */
        var approx = coeffs[0];
        /* Transform. */
        for (var i = 1; i < coeffs.length; i++) {
            /* Initialize detail coefficients. */
            var detail = coeffs[i];
            // TODO: Check if problem of different coefficient lengths because of padding can be solved in a more elegant way.
            if (approx.length === detail.length + 1) {
                approx = approx.slice(0, approx.length - 1);
            }
            /* Calculate previous level of approximation. */
            approx = this.idwt(approx, detail, wavelet);
        }
        /* Return data. */
        return approx.slice();
    };
    /**
     * Contains static information about the signal extension modes.
     */
    DiscreteWavelets.Modes = padding_1.PADDING_MODES;
    return DiscreteWavelets;
}());
exports.default = DiscreteWavelets;
//# sourceMappingURL=wt.js.map
import { PaddingMode, PaddingWidths } from "./wt";
import { Filters, Wavelet, WaveletBasis } from "./wavelets/wavelets";
/**
 * Calculates the element-wise sum of two arrays.
 *
 * @param  a First array.
 * @param  b Second array.
 * @return   Element-wise sum.
 */
export declare function add(a: ReadonlyArray<number>, b: ReadonlyArray<number>): number[];
/**
 * Asserts if approximation and detail coefficients are valid or throws an
 * error if they are invalid.
 *
 * @param  approx Approximation coefficients.
 * @param  detail Detail coefficients.
 * @return        True if the coefficients are valid, otherwise throws an error.
 */
export declare function assertValidApproxDetail(approx: ReadonlyArray<number>, detail: ReadonlyArray<number>): boolean;
/**
 * Asserts if coefficients are valid or throws an error if they are invalid.
 *
 * @param  coeffs Coefficients to test.
 * @return        True if the coefficients are valid, otherwise throws an error.
 */
export declare function assertValidCoeffs(coeffs: ReadonlyArray<ReadonlyArray<number>>): boolean;
/**
 * Asserts if wavelet filters are valid or throws an error if they are invalid.
 *
 * @param  filters Wavelet filters to test.
 * @return         True if the wavelet filters are valid, otherwise throws an error.
 */
export declare function assertValidFilters(filters: Readonly<Filters>): boolean;
/**
 * Determines a wavelet basis from a wavelet type or basis.
 *
 * @param  wavelet Wavelet type or basis.
 * @return         Wavelet basis.
 */
export declare function basisFromWavelet(wavelet: Readonly<Wavelet>): WaveletBasis;
/**
 * Creates an array and populates it.
 *
 * @param  length   Length of the array.
 * @param  populate Function to populate the array.
 * @return          Populated array with specified length.
 */
export declare function createArray(length: number, populate?: number | ((index: number) => number)): number[];
/**
 * Calculates the dot product of two arrays.
 *
 * @param  a First array.
 * @param  b Second array.
 * @return   Dot product.
 */
export declare function dot(a: ReadonlyArray<number>, b: ReadonlyArray<number>): number;
/**
 * Multiplies an array with a scalar value.
 *
 * @param  scalar Scalar value.
 * @param  array  Array of numbers.
 * @return        Array multiplied with scalar value.
 */
export declare function mulScalar(scalar: number, array: ReadonlyArray<number>): number[];
/**
 * Returns a single padding element.
 *
 * @param  data    Input data.
 * @param  index   Index of padding element.
 * @param  inverse True if the padding direction is inversed.
 * @param  mode    Signal extension mode.
 * @return         Single padding element.
 */
export declare function padElement(data: ReadonlyArray<number>, index: number, inverse: boolean, mode: PaddingMode): number;
/**
 * Determines the padding widths.
 *
 * @param  dataLength   Length of signal.
 * @param  filterLength Length of filter.
 * @return              Padding widths.
 */
export declare function padWidths(dataLength: number, filterLength: number): PaddingWidths;
/**
 * Determines a wavelet basis from scaling numbers.
 *
 * @param  scalingNumbers Wavelet scaling numbers.
 * @return                Wavelet basis.
 */
export declare function waveletFromScalingNumbers(scalingNumbers: ReadonlyArray<number>): WaveletBasis;

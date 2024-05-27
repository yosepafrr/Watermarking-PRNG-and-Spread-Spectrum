export { PaddingMode, PaddingModes, PaddingWidths, } from './padding/padding';
export { Filters, Wavelet, WaveletBasis, WaveletType, } from './wavelets/wavelets';
import { PaddingMode, PaddingModes, PaddingWidths } from './padding/padding';
import { Wavelet } from "./wavelets/wavelets";
/**
 * Collection of methods for Discrete Wavelet Transform (DWT).
 */
export default class DiscreteWavelets {
    /**
     * Contains static information about the signal extension modes.
     */
    static readonly Modes: Readonly<PaddingModes>;
    /**
     * Single level Discrete Wavelet Transform.
     *
     * @param  data    Input data.
     * @param  wavelet Wavelet to use.
     * @param  mode    Signal extension mode.
     * @return         Approximation and detail coefficients as result of the transform.
     */
    static dwt(data: ReadonlyArray<number>, wavelet: Readonly<Wavelet>, mode?: PaddingMode): number[][];
    /**
     * Calculates the energy as sum of squares of an array of data or
     * coefficients.
     *
     * @param  values Array of data or coefficients.
     * @return        Energy of values as the sum of squares.
     */
    static energy(values: ReadonlyArray<number> | ReadonlyArray<ReadonlyArray<number>>): number;
    /**
     * Single level inverse Discrete Wavelet Transform.
     *
     * @param  approx  Approximation coefficients. If undefined, it will be set to an array of zeros with length equal to the detail coefficients.
     * @param  detail  Detail coefficients. If undefined, it will be set to an array of zeros with length equal to the approximation coefficients.
     * @param  wavelet Wavelet to use.
     * @return         Approximation coefficients of previous level of transform.
     */
    static idwt(approx: ReadonlyArray<number> | undefined, detail: ReadonlyArray<number> | undefined, wavelet: Wavelet): number[];
    /**
     * Determines the maximum level of useful decomposition.
     *
     * @param  dataLength Length of input data.
     * @param  wavelet    Wavelet to use.
     * @return            Maximum useful level of decomposition.
     */
    static maxLevel(dataLength: number, wavelet: Readonly<Wavelet>): number;
    /**
     * Extends a signal with a given padding mode.
     *
     * @param  data      Input data.
     * @param  padWidths Widths of padding at front and back.
     * @param  mode      Signal extension mode.
     * @return           Data with padding.
     */
    static pad(data: ReadonlyArray<number>, padWidths: Readonly<PaddingWidths>, mode: PaddingMode): number[];
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
    static wavedec(data: ReadonlyArray<number>, wavelet: Readonly<Wavelet>, mode?: PaddingMode, level?: number): number[][];
    /**
     * 1D wavelet reconstruction. Inverses a transform by calculating input data
     * from coefficients.
     *
     * @param  coeffs  Coefficients as result of a transform.
     * @param  wavelet Wavelet to use.
     * @return         Input data as result of the inverse transform.
     */
    static waverec(coeffs: ReadonlyArray<ReadonlyArray<number>>, wavelet: Wavelet): number[];
}

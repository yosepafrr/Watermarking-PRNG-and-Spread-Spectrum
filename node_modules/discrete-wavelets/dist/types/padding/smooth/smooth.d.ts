import { PaddingMode } from '../padding';
/**
 * Smooth padding.
 */
export declare const SMOOTH_PADDING: PaddingMode;
/**
 * Returns a single value of smooth padding.
 *
 * @param  data    Input values.
 * @param  index   Index of padding.
 * @param  inverse True if the direction should be inversed.
 * @return         Single padding value.
 */
export declare function smoothPadding(data: ReadonlyArray<number>, index: number, inverse?: boolean): number;

import { PaddingMode } from '../padding';
/**
 * Symmetric padding.
 */
export declare const SYMMETRIC_PADDING: PaddingMode;
/**
 * Returns a single value of symmetric padding.
 *
 * @param  data    Input values.
 * @param  index   Index of padding.
 * @param  inverse True if the direction should be inversed.
 * @return         Single padding value.
 */
export declare function symmetricPadding(data: ReadonlyArray<number>, index: number, inverse?: boolean): number;

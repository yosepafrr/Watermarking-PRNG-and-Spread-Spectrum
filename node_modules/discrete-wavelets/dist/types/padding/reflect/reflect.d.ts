import { PaddingMode } from '../padding';
/**
 * Reflect padding.
 */
export declare const REFLECT_PADDING: PaddingMode;
/**
 * Returns a single value of reflect padding.
 *
 * @param  data    Input values.
 * @param  index   Index of padding.
 * @param  inverse True if the direction should be inversed.
 * @return         Single padding value.
 */
export declare function reflectPadding(data: ReadonlyArray<number>, index: number, inverse?: boolean): number;

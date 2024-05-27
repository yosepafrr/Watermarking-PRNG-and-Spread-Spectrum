import { PaddingMode } from '../padding';
/**
 * Periodic padding.
 */
export declare const PERIODIC_PADDING: PaddingMode;
/**
 * Returns a single value of periodic padding.
 *
 * @param  data    Input values.
 * @param  index   Index of padding.
 * @param  inverse True if the direction should be inversed.
 * @return         Single padding value.
 */
export declare function periodicPadding(data: ReadonlyArray<number>, index: number, inverse?: boolean): number;

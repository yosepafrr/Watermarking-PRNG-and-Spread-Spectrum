import { PaddingMode } from '../padding';
/**
 * Antisymmetric padding.
 */
export declare const ANTISYMMETRIC_PADDING: PaddingMode;
/**
 * Returns a single value of antisymmetric padding.
 *
 * @param  data    Input values.
 * @param  index   Index of padding.
 * @param  inverse True if the direction should be inversed.
 * @return         Single padding value.
 */
export declare function antisymmetricPadding(data: ReadonlyArray<number>, index: number, inverse?: boolean): number;

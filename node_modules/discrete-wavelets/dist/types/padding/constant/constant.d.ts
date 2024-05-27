import { PaddingMode } from '../padding';
/**
 * Constant padding.
 */
export declare const CONSTANT_PADDING: PaddingMode;
/**
 * Returns a single value of constant padding.
 *
 * @param  data    Input values.
 * @param  inverse True if the direction should be inversed.
 * @return         Single padding value.
 */
export declare function constantPadding(data: ReadonlyArray<number>, inverse?: boolean): number;

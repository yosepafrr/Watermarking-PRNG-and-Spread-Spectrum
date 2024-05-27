export * from './daubechies/daubechies';
/**
 * Filters for a transform.
 */
export interface Filters {
    /**
     * High-pass filter.
     */
    high: number[];
    /**
     * Low-pass filter.
     */
    low: number[];
}
/**
 * A wavelet, which can either be described by a wavelet basis or a wavelet
 * type.
 */
export declare type Wavelet = WaveletBasis | WaveletType;
/**
 * A wavelet basis.
 */
export interface WaveletBasis {
    /**
     * Decomposition filters.
     */
    dec: Filters;
    /**
     * Reconstruction filters.
     */
    rec: Filters;
}
/**
 * Mapping of wavelet type keys to scaling numbers.
 */
export declare const ScalingNumbers: {
    [key: string]: ReadonlyArray<number>;
};
/**
 * Short forms for common wavelet bases.
 */
export declare type WaveletType = 'db1' | 'D2' | 'haar' | 'db2' | 'D4' | 'db3' | 'D6' | 'db4' | 'D8' | 'db5' | 'D10' | 'db6' | 'D12' | 'db7' | 'D14' | 'db8' | 'D16' | 'db9' | 'D18' | 'db10' | 'D20';

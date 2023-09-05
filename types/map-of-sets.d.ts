export type MapOfSets<K, T> = Map<K, Set<T>>;
/**
 * Functions to handle the specialization of a `Map` whose values are always a `Set`.
 */
export declare const MapOfSets: {
    add: <K, T>(map: MapOfSets<K, T>, key: K, value: T) => MapOfSets<K, T>;
    /**
     * Removes this `value` from the `Set` associated with `key`. Does not remove the `Set` itself, even if it becomes empty.
     */
    delete: <K_1, T_1>(map: MapOfSets<K_1, T_1>, key: K_1, value: T_1) => boolean;
    has: <K_2, T_2>(map: MapOfSets<K_2, T_2>, key: K_2, value: T_2) => boolean;
};

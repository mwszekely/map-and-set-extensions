export type MapOfSets<K, T> = Map<K, Set<T>>;
export declare function add<K, T>(map: MapOfSets<K, T>, key: K, value: T): MapOfSets<K, T>;
/**
 * Removes this `value` from the `Set` associated with `key`. Does not remove the `Set` itself, even if it becomes empty.
 */
declare function del<K, T>(map: MapOfSets<K, T>, key: K, value: T): boolean;
export { del as delete };
export declare function has<K, T>(map: MapOfSets<K, T>, key: K, value: T): boolean;

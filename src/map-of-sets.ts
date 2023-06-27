
export type MapOfSets<K, T> = Map<K, Set<T>>;

/**
 * Functions to handle the specialization of a `Map` whose values are always a `Set`.
 */
export const MapOfSets = {

    add: <K, T>(map: MapOfSets<K, T>, key: K, value: T) => {
        let set = map.get(key) ?? new Set();
        set.add(value);
        map.set(key, set);
        return map;
    },

    /**
     * Removes this `value` from the `Set` associated with `key`. Does not remove the `Set` itself, even if it becomes empty.
     */
    delete: <K, T>(map: MapOfSets<K, T>, key: K, value: T): boolean => {
        let set = map.get(key) ?? new Set();
        let ret = set.delete(value);
        map.set(key, set);
        return ret;
    },

    has: <K, T>(map: MapOfSets<K, T>, key: K, value: T): boolean => {
        return map.get(key)?.has(value) ?? false;
    }
}
/**
 * Functions to handle the specialization of a `Map` whose values are always a `Set`.
 */
export const MapOfSets = {
    add: (map, key, value) => {
        let set = map.get(key) ?? new Set();
        set.add(value);
        map.set(key, set);
        return map;
    },
    /**
     * Removes this `value` from the `Set` associated with `key`. Does not remove the `Set` itself, even if it becomes empty.
     */
    delete: (map, key, value) => {
        let set = map.get(key) ?? new Set();
        let ret = set.delete(value);
        map.set(key, set);
        return ret;
    },
    has: (map, key, value) => {
        return map.get(key)?.has(value) ?? false;
    }
};
//# sourceMappingURL=map-of-sets.js.map
/**
 * Functions to handle the specialization of a `Map` whose values are always a `Set`.
 */
export const MapOfSets = {
    //#impl = new Map<K, Set<T>>();
    add: (map, key, value) => {
        let set = map.get(key) ?? new Set();
        set.add(value);
        map.set(key, set);
        return map;
    },
    delete: (map, key, value) => {
        let set = map.get(key) ?? new Set();
        let ret = set.delete(value);
        map.set(key, set);
        return ret;
    },
    has: (map, key, value) => {
        return map.get(key)?.has(value) ?? false;
    }
    /*
    
    add(key: K, value: T) {
        return MapOfSets.add(this, key, value);
    }

    delete(key: K, value: T): boolean {
        return MapOfSets.delete(this, key, value);
    }

    has(key: K, value: T): boolean {
        return MapOfSets.has(this, key, value);
    }

    clear() { return this.#impl.clear(); }
    entries() { return this.#impl.entries(); }
    keys() { return this.#impl.keys(); }
    values() { return this.#impl.values(); }
    forEach(callbackfn: (value: Set<T>, key: K, map: MapOfSets<K, T>) => void) { return this.#impl.forEach((value, key) => { return callbackfn(value, key, this); }); }
    
    */
};
//# sourceMappingURL=map-of-sets.js.map
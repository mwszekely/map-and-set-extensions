
export type MapOfSets<K, T> = Map<K, Set<T>>;

export function add<K, T>(map: MapOfSets<K, T>, key: K, value: T) {
    let set = map.get(key) ?? new Set();
    set.add(value);
    map.set(key, set);
    return map;
}

/**
 * Removes this `value` from the `Set` associated with `key`. Does not remove the `Set` itself, even if it becomes empty.
 */
function del<K, T>(map: MapOfSets<K, T>, key: K, value: T): boolean {
    let set = map.get(key) ?? new Set();
    let ret = set.delete(value);
    map.set(key, set);
    return ret;
}
export { del as delete };

export function has<K, T>(map: MapOfSets<K, T>, key: K, value: T): boolean {
    return map.get(key)?.has(value) ?? false;
}

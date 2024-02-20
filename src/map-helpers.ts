
export function modify<K, V>(map: Map<K, V>, key: K, fn: (arg: V | undefined) => V) {
    return map.set(key, fn(map.get(key)));
}

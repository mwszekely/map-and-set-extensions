
export function modifyMapAt<K, V>(map: Map<K, V>, key: K, fn: (arg: V | undefined) => V) {
    return map.set(key, fn(map.get(key)));
}


export type MapOfMaps<K, M extends Map<any, any>> = Map<K, M>;
type KeysFromRecursiveMap<M> = [...(M extends Map<infer K, infer RM> ? [K, ...KeysFromRecursiveMap<RM>] : [])]
type ValueFromRecursiveMap<M> = (M extends Map<any, infer RM> ? ValueFromRecursiveMap<RM> : M extends Set<infer T> ? T : M)

export function mapGetRecursive<M extends Map<any, any>>(map: M, ...keys: KeysFromRecursiveMap<M>): ValueFromRecursiveMap<M> | undefined {
    type FirstKey = M extends Map<infer K, any>? K : never;
    type SubM = (M extends Map<any, infer M2>? M2 : never);
    type SubK = KeysFromRecursiveMap<SubM>;
    
    const [firstKey, ...restKeys] = (keys as unknown[] as [FirstKey, ...SubK]);
    if (map.has(firstKey))
        return mapGetRecursive(map.get(firstKey), ...restKeys);
    return undefined;
}

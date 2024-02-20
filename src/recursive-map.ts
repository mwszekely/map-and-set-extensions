
export type MapOfMaps<K, M extends Map<any, any>> = Map<K, M>;

type RecursiveMapKeys<M> = M extends Map<infer K, infer V> ? [K, ...RecursiveMapKeys<V>] : [];
type RecursiveMapValue<M> = M extends Map<any, infer V> ? RecursiveMapValue<V> : M;


export { get, has, modify, set };

type KeysFromRecursiveMap<M> = [...(M extends Map<infer K, infer RM> ? [K, ...KeysFromRecursiveMap<RM>] : [])]
type ValueFromRecursiveMap<M> = (M extends Map<any, infer RM> ? ValueFromRecursiveMap<RM> : M extends Set<infer T> ? T : M)

function get<M extends Map<any, any>>(map: M, ...keys: KeysFromRecursiveMap<M>): ValueFromRecursiveMap<M> | undefined {
    type FirstKey = M extends Map<infer K, any> ? K : never;
    type SubM = (M extends Map<any, infer M2> ? M2 : never);
    type SubK = KeysFromRecursiveMap<SubM>;

    if (keys.length === 0) {
        return map as ValueFromRecursiveMap<M>;
    }

    const [firstKey, ...restKeys] = (keys as unknown[] as [FirstKey, ...SubK]);
    if (map.has(firstKey))
        return get(map.get(firstKey), ...restKeys);
    return undefined;
}

function has<M extends MapOfMaps<any, any>>(map: M, ...keys: RecursiveMapKeys<M>): boolean {
    type K = (M extends Map<infer K, any> ? K : never);
    type V = (M extends Map<any, infer V> ? V : never);

    const [firstKey, ...restKeys] = keys as any as [K, ...RecursiveMapKeys<V>];

    if (restKeys.length === 0) {
        return map.has(firstKey);
    }

    let subMap = map.get(firstKey) as V | undefined;
    if (subMap === undefined)
        return false;

    return has<V>(subMap, ...restKeys);
}

type ModifyRecursiveMap<M extends Map<any, any>> = (prev: RecursiveMapValue<M> | undefined, had: boolean) => RecursiveMapValue<(M extends Map<any, infer V> ? V : never)>;


function set<M extends MapOfMaps<any, any>>(map: M, ...keysAndValue: [...RecursiveMapKeys<M>, RecursiveMapValue<M>]): void {
    return modify<M>(map, ...keysAndValue.slice(0, keysAndValue.length - 1) as never, () => keysAndValue[keysAndValue.length - 1])
}

/**
 * Like `set`, but takes a callback that allows you to modify a previous value, if any.
 */
function modify<M extends MapOfMaps<any, any>>(map: M, ...keysAndValue: [...RecursiveMapKeys<M>, ModifyRecursiveMap<M>]): void {
    type K = (M extends Map<infer K, any> ? K : never);
    type V = (M extends Map<any, infer V> ? V : never);

    const [firstKey, ...restKeysAndValue] = keysAndValue as any as [K, ...RecursiveMapKeys<V>, ModifyRecursiveMap<M>];

    if (restKeysAndValue && restKeysAndValue.length == 1) {
        let had = map.has(firstKey);
        let prev = map.get(firstKey);
        map.set(firstKey, (restKeysAndValue[0] as ModifyRecursiveMap<M>)(prev, had) as V);
    }
    else {
        let subMap = map.get(firstKey);
        if (subMap == null) {
            map.set(firstKey, subMap = (new Map() as V));
        }
        modify<V>(subMap, ...restKeysAndValue);
    }
}


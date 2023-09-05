
type RecursiveMapKeys<M> = M extends Map<infer K, infer V> ? [K, ...RecursiveMapKeys<V>] : [];
type RecursiveMapValue<M> = M extends Map<any, infer V> ? RecursiveMapValue<V> : M;

export const RecursiveMap = {
    set: recursiveMapSet,
    get: recursiveMapGet,
    has: recursiveMapHas,

    /**
     * Like `set`, but takes a callback that allows you to modify a previous value, if any.
     */
    modify: recursiveMapModify,
};

function recursiveMapGet<M extends Map<any, any>>(map: M, ...keys: RecursiveMapKeys<M>):  | undefined {
    type K = (M extends Map<infer K, any> ? K : never);
    type V = (M extends Map<any, infer V> ? V : never);

    const [firstKey, ...restKeys] = keys as any as [K, ...RecursiveMapKeys<V>];

    if (restKeys.length === 0) {
        return map.get(firstKey);
    }

    let subMap = map.get(firstKey) as V | undefined;
    if (subMap === undefined)
        return undefined;

    return recursiveMapGet<V>(subMap, ...restKeys) as RecursiveMapValue<M>;
}

function recursiveMapHas<M extends Map<any, any>>(map: M, ...keys: RecursiveMapKeys<M>): boolean {
    type K = (M extends Map<infer K, any> ? K : never);
    type V = (M extends Map<any, infer V> ? V : never);

    const [firstKey, ...restKeys] = keys as any as [K, ...RecursiveMapKeys<V>];

    if (restKeys.length === 0) {
        return map.has(firstKey);
    }

    let subMap = map.get(firstKey) as V | undefined;
    if (subMap === undefined)
        return false;

    return recursiveMapHas<V>(subMap, ...restKeys);
}

type ModifyRecursiveMap<M extends Map<any, any>> = (prev: RecursiveMapValue<M> | undefined, had: boolean) => RecursiveMapValue<(M extends Map<any, infer V> ? V : never)>;


function recursiveMapSet<M extends Map<any, any>>(map: M, ...keysAndValue: [...RecursiveMapKeys<M>, RecursiveMapValue<M>]): void {
    return recursiveMapModify<M>(map, ...keysAndValue.slice(0, keysAndValue.length - 1) as never, () => keysAndValue[keysAndValue.length - 1])
}

function recursiveMapModify<M extends Map<any, any>>(map: M, ...keysAndValue: [...RecursiveMapKeys<M>, ModifyRecursiveMap<M>]): void {
    type K = (M extends Map<infer K, any> ? K : never);
    type V = (M extends Map<any, infer V> ? V : never);

    const [firstKey, ...restKeysAndValue] = keysAndValue as any as [K, ...RecursiveMapKeys<V>, ModifyRecursiveMap<M>];

    if (restKeysAndValue.length == 1) {
        let had = map.has(firstKey);
        let prev = map.get(firstKey);
        map.set(firstKey, (restKeysAndValue[0] as ModifyRecursiveMap<M>)(prev, had) as V);
    }
    else {
        let subMap = map.get(firstKey);
        if (subMap == null) {
            map.set(firstKey, subMap = (new Map() as V));
        }
        recursiveMapModify<V>(subMap, ...restKeysAndValue);
    }
}


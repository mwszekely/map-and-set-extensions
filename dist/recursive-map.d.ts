type RecursiveMapKeys<M> = M extends Map<infer K, infer V> ? [K, ...RecursiveMapKeys<V>] : [];
type RecursiveMapValue<M> = M extends Map<infer K, infer V> ? RecursiveMapValue<V> : M;
export declare const RecursiveMap: {
    set: typeof recursiveMapSet;
    get: typeof recursiveMapGet;
    has: typeof recursiveMapHas;
    /**
     * Like `set`, but takes a callback that allows you to modify a previous value, if any.
     */
    modify: typeof recursiveMapModify;
};
declare function recursiveMapGet<M extends Map<any, any>>(map: M, ...keys: RecursiveMapKeys<M>): undefined;
declare function recursiveMapHas<M extends Map<any, any>>(map: M, ...keys: RecursiveMapKeys<M>): boolean;
type ModifyRecursiveMap<M extends Map<any, any>> = (prev: RecursiveMapValue<M> | undefined, had: boolean) => RecursiveMapValue<(M extends Map<any, infer V> ? V : never)>;
declare function recursiveMapSet<M extends Map<any, any>>(map: M, ...keysAndValue: [...RecursiveMapKeys<M>, RecursiveMapValue<M>]): void;
declare function recursiveMapModify<M extends Map<any, any>>(map: M, ...keysAndValue: [...RecursiveMapKeys<M>, ModifyRecursiveMap<M>]): void;
export {};
//# sourceMappingURL=recursive-map.d.ts.map
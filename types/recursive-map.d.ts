export type MapOfMaps<K, M extends Map<any, any>> = Map<K, M>;
type RecursiveMapKeys<M> = M extends Map<infer K, infer V> ? [K, ...RecursiveMapKeys<V>] : [];
type RecursiveMapValue<M> = M extends Map<any, infer V> ? RecursiveMapValue<V> : M;
export { get, has, modify, set };
type KeysFromRecursiveMap<M> = [...(M extends Map<infer K, infer RM> ? [K, ...KeysFromRecursiveMap<RM>] : [])];
type ValueFromRecursiveMap<M> = (M extends Map<any, infer RM> ? ValueFromRecursiveMap<RM> : M extends Set<infer T> ? T : M);
declare function get<M extends Map<any, any>>(map: M, ...keys: KeysFromRecursiveMap<M>): ValueFromRecursiveMap<M> | undefined;
declare function has<M extends MapOfMaps<any, any>>(map: M, ...keys: RecursiveMapKeys<M>): boolean;
type ModifyRecursiveMap<M extends Map<any, any>> = (prev: RecursiveMapValue<M> | undefined, had: boolean) => RecursiveMapValue<(M extends Map<any, infer V> ? V : never)>;
declare function set<M extends MapOfMaps<any, any>>(map: M, ...keysAndValue: [...RecursiveMapKeys<M>, RecursiveMapValue<M>]): void;
/**
 * Like `set`, but takes a callback that allows you to modify a previous value, if any.
 */
declare function modify<M extends MapOfMaps<any, any>>(map: M, ...keysAndValue: [...RecursiveMapKeys<M>, ModifyRecursiveMap<M>]): void;

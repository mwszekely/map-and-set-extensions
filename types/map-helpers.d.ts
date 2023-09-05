export declare function modifyMapAt<K, V>(map: Map<K, V>, key: K, fn: (arg: V | undefined) => V): Map<K, V>;
export type MapOfMaps<K, M extends Map<any, any>> = Map<K, M>;
type KeysFromRecursiveMap<M> = [...(M extends Map<infer K, infer RM> ? [K, ...KeysFromRecursiveMap<RM>] : [])];
type ValueFromRecursiveMap<M> = (M extends Map<any, infer RM> ? ValueFromRecursiveMap<RM> : M extends Set<infer T> ? T : M);
export declare function mapGetRecursive<M extends Map<any, any>>(map: M, ...keys: KeysFromRecursiveMap<M>): ValueFromRecursiveMap<M> | undefined;
export {};

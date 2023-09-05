/**
 * A variant of a map that's a 1-1 mapping between key->value OR value->key. Can be used to represent certain types of Enums, for example.
 *
 * Unlike `BimapSeparate`, this assumes that the two keys are mutually exclusive and saves a bit of work by only having one `Map` instead of two.
 */
export declare class BimapExclusive<KeyLeft, KeyRight> {
    #private;
    /**
     * Adds a new value to this bimap, associating these two keys with one another.
     */
    add(left: KeyLeft, right: KeyRight): this;
    delete(key: KeyLeft | KeyRight): boolean;
    has(key: KeyLeft | KeyRight): boolean;
    get(key: KeyRight): KeyLeft | undefined;
    get(key: KeyLeft): KeyRight | undefined;
    clear(): void;
    entries(): Generator<readonly [KeyLeft | KeyRight, KeyLeft | KeyRight], void, unknown>;
    forEach(callbackfn: (keyA: KeyLeft | KeyRight, keyB: KeyLeft | KeyRight, bimap: BimapExclusive<KeyLeft, KeyRight>) => void): void;
    get size(): number;
}

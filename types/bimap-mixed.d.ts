/**
 * A variant of a map that's a 1-1 mapping between key->value OR value->key. Can be used to represent certain types of Enums, for example.
 *
 * To differentiate, keys are either "left" or "right" keys with no preference between either (ideally. In practice left is slighly preferred in cases where `hint` is not passed).
 *
 * In some ways it's also like a set, so its methods are modeled after a set, with the addition of a `get` method to turn left into right and vice-versa.
 *
 * Unlike `BimapExclusive`, this allows overlap between the two key types, but gives slight preferential treatment to the left keys and incurs a slight performance penalty.
 */
export declare class BimapMixed<KeyLeft, KeyRight> {
    #private;
    /**
     * Adds a new value to this bimap, associating these two keys with one another.
     */
    add(left: KeyLeft, right: KeyRight): this;
    delete(key: KeyLeft, hint?: 'left'): boolean;
    delete(key: KeyRight, hint?: 'right'): boolean;
    has(key: KeyLeft, hint?: 'left'): boolean;
    has(key: KeyRight, hint?: 'right'): boolean;
    get(key: KeyRight, hint?: "right"): KeyLeft | undefined;
    get(key: KeyLeft, hint?: "left"): KeyRight | undefined;
    get(key: KeyLeft | KeyRight, hint?: "left" | "right"): KeyLeft | KeyRight | undefined;
    clear(): void;
    entries(): IterableIterator<[KeyLeft, KeyRight]>;
    forEach(callbackfn: (keyLeft: KeyLeft, keyRight: KeyRight, bimap: BimapMixed<KeyLeft, KeyRight>) => void): void;
    get size(): number;
}

/**
 * A variant of a map that's a 1-1 mapping between key->value OR value->key. Can be used to represent certain types of Enums, for example.
 *
 * To differentiate, keys are either "left" or "right" keys with no preference between either (ideally. In practice left is slighly preferred in cases where `hint` is not passed).
 *
 * In some ways it's also like a set, so its methods are modeled after a set.
 */
export declare class Bimap<KeyLeft, KeyRight> {
    #private;
    /**
     * Adds a new value to this bimap, associating these two keys with one another.
     */
    add(left: KeyLeft, right: KeyRight): this;
    delete(key: KeyLeft, hint?: 'left'): boolean;
    delete(key: KeyRight, hint?: 'right'): boolean;
    has(key: KeyLeft, hint?: 'left'): boolean;
    has(key: KeyRight, hint?: 'right'): boolean;
    clear(): void;
    entries(): IterableIterator<[KeyLeft, KeyRight]>;
    forEach(callbackfn: (keyLeft: KeyLeft, keyRight: KeyRight, bimap: Bimap<KeyLeft, KeyRight>) => void): void;
    get size(): number;
}
//# sourceMappingURL=bimap.d.ts.map
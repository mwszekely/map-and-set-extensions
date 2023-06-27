
/**
 * A variant of a map that's a 1-1 mapping between key->value OR value->key. Can be used to represent certain types of Enums, for example.
 * 
 * To differentiate, keys are either "left" or "right" keys with no preference between either (ideally. In practice left is slighly preferred in cases where `hint` is not passed).
 * 
 * In some ways it's also like a set, so its methods are modeled after a set, with the addition of a `get` method to turn left into right and vice-versa.
 * 
 * Unlike `BimapExclusive`, this allows overlap between the two key types, but gives slight preferential treatment to the left keys and incurs a slight performance penalty.
 */
export class BimapMixed<KeyLeft, KeyRight> {
    #implLeft = new Map<KeyLeft, KeyRight>();
    #implRight = new Map<KeyRight, KeyLeft>();

    /**
     * Adds a new value to this bimap, associating these two keys with one another.
     */
    add(left: KeyLeft, right: KeyRight): this {
        this.#implLeft.set(left, right);
        this.#implRight.set(right, left);
        return this;
    }

    delete(key: KeyLeft, hint?: 'left'): boolean;
    delete(key: KeyRight, hint?: 'right'): boolean;
    delete(key: KeyLeft | KeyRight, hint?: 'left' | 'right'): boolean {
        let has = false;
        let keyLeft: KeyLeft | undefined;
        let keyRight: KeyRight | undefined;

        if (hint == 'left') {
            keyLeft = key as KeyLeft;
            has = this.#implLeft.has(keyLeft);
            keyRight = this.#implLeft.get(keyLeft)!;
        }
        else if (hint == 'right') {
            keyRight = key as KeyRight;
            has = this.#implRight.has(keyRight);
            keyLeft = this.#implRight.get(keyRight)!;
        }
        else {
            if (this.#implLeft.has(key as KeyLeft)) {
                keyLeft = key as KeyLeft;
                has = true;
                keyRight = this.#implLeft.get(keyLeft)!;
            }
            else if (this.#implRight.has(key as KeyRight)) {
                keyRight = key as KeyRight;
                has = true;
                keyLeft = this.#implRight.get(keyRight)!;
            }
        }


        if (has) {
            this.#implLeft.delete(keyLeft!);
            this.#implRight.delete(keyRight!)
        }

        return has;
    }

    has(key: KeyLeft, hint?: 'left'): boolean;
    has(key: KeyRight, hint?: 'right'): boolean;
    has(key: KeyLeft | KeyRight, hint?: 'left' | 'right'): boolean {
        if (hint === 'left')
            return this.#implLeft.has(key as KeyLeft);
        if (hint === 'right')
            return this.#implRight.has(key as KeyRight);
        return this.#implLeft.has(key as KeyLeft) || this.#implRight.has(key as KeyRight);
    }

    get(key: KeyRight, hint?: "right"): KeyLeft | undefined;
    get(key: KeyLeft, hint?: "left"): KeyRight | undefined;
    get(key: KeyLeft | KeyRight, hint?: "left" | "right"): KeyLeft | KeyRight | undefined;
    get(key: KeyLeft | KeyRight, hint?: "left" | "right"): KeyLeft | KeyRight | undefined {
        if (hint === 'left')
            return this.#implLeft.get(key as KeyLeft);
        if (hint === 'right')
            return this.#implRight.get(key as KeyRight);

        if (this.has(key as KeyLeft, "left"))
            return this.#implLeft.get(key as KeyLeft);

        if (this.has(key as KeyRight, "right"))
            return this.#implRight.get(key as KeyRight);

        return undefined;

    }

    clear() {
        this.#implLeft.clear();
        this.#implRight.clear();
    }

    entries() {
        return this.#implLeft.entries();
    }

    forEach(callbackfn: (keyLeft: KeyLeft, keyRight: KeyRight, bimap: BimapMixed<KeyLeft, KeyRight>) => void) {
        return this.#implLeft.forEach((value, key, map) => { return callbackfn(key, value, this); })
    }

    get size(): number {
        return this.#implLeft.size;
    }
}

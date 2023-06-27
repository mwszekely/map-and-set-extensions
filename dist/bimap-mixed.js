/**
 * A variant of a map that's a 1-1 mapping between key->value OR value->key. Can be used to represent certain types of Enums, for example.
 *
 * To differentiate, keys are either "left" or "right" keys with no preference between either (ideally. In practice left is slighly preferred in cases where `hint` is not passed).
 *
 * In some ways it's also like a set, so its methods are modeled after a set, with the addition of a `get` method to turn left into right and vice-versa.
 *
 * Unlike `BimapExclusive`, this allows overlap between the two key types, but gives slight preferential treatment to the left keys and incurs a slight performance penalty.
 */
export class BimapMixed {
    #implLeft = new Map();
    #implRight = new Map();
    /**
     * Adds a new value to this bimap, associating these two keys with one another.
     */
    add(left, right) {
        this.#implLeft.set(left, right);
        this.#implRight.set(right, left);
        return this;
    }
    delete(key, hint) {
        let has = false;
        let keyLeft;
        let keyRight;
        if (hint == 'left') {
            keyLeft = key;
            has = this.#implLeft.has(keyLeft);
            keyRight = this.#implLeft.get(keyLeft);
        }
        else if (hint == 'right') {
            keyRight = key;
            has = this.#implRight.has(keyRight);
            keyLeft = this.#implRight.get(keyRight);
        }
        else {
            if (this.#implLeft.has(key)) {
                keyLeft = key;
                has = true;
                keyRight = this.#implLeft.get(keyLeft);
            }
            else if (this.#implRight.has(key)) {
                keyRight = key;
                has = true;
                keyLeft = this.#implRight.get(keyRight);
            }
        }
        if (has) {
            this.#implLeft.delete(keyLeft);
            this.#implRight.delete(keyRight);
        }
        return has;
    }
    has(key, hint) {
        if (hint === 'left')
            return this.#implLeft.has(key);
        if (hint === 'right')
            return this.#implRight.has(key);
        return this.#implLeft.has(key) || this.#implRight.has(key);
    }
    get(key, hint) {
        if (hint === 'left')
            return this.#implLeft.get(key);
        if (hint === 'right')
            return this.#implRight.get(key);
        if (this.has(key, "left"))
            return this.#implLeft.get(key);
        if (this.has(key, "right"))
            return this.#implRight.get(key);
        return undefined;
    }
    clear() {
        this.#implLeft.clear();
        this.#implRight.clear();
    }
    entries() {
        return this.#implLeft.entries();
    }
    forEach(callbackfn) {
        return this.#implLeft.forEach((value, key, map) => { return callbackfn(key, value, this); });
    }
    get size() {
        return this.#implLeft.size;
    }
}
//# sourceMappingURL=bimap-mixed.js.map
/**
 * A variant of a map that's a 1-1 mapping between key->value OR value->key. Can be used to represent certain types of Enums, for example.
 *
 * Unlike `BimapSeparate`, this assumes that the two keys are mutually exclusive and saves a bit of work by only having one `Map` instead of two.
 */
export class BimapExclusive {
    #impl = new Map();
    /**
     * Adds a new value to this bimap, associating these two keys with one another.
     */
    add(left, right) {
        console.assert(this.#impl.has(left) === this.#impl.has(right), "A key has been re-defined, which will likely lead to undefined behavior when iterating. If you need to change a mapping, delete it first.");
        try {
            this.#impl.set(left, right);
            this.#impl.set(right, left);
        }
        catch (ex) {
            // Can `set` throw? Just in case...
            this.#impl.delete(left);
            this.#impl.delete(right);
            throw ex;
        }
        return this;
    }
    delete(key) {
        if (this.#impl.has(key)) {
            let other = this.#impl.get(key);
            this.#impl.delete(key);
            this.#impl.delete(other);
            return true;
        }
        return false;
    }
    has(key) {
        return this.#impl.has(key);
    }
    get(key) {
        return this.#impl.get(key);
    }
    clear() {
        this.#impl.clear();
    }
    *entries() {
        // This assumes certain standardized things about insertion order and such,
        // but it's this way to prevent duplicates.
        let skip = false;
        for (let [left, right] of this.#impl) {
            if (skip)
                continue;
            yield [left, right];
            skip = !skip;
        }
    }
    forEach(callbackfn) {
        let entries = this.entries();
        for (let [keyA, keyB] of entries) {
            callbackfn(keyA, keyB, this);
        }
    }
    // These contain duplicates. Is it guaranteed to ALWAYS be safe to return every other entry? Because that would work if it's allowed.
    /*entries() {
        return this.#impl.entries();
    }

    forEach(callbackfn: (keyLeft: KeyLeft, keyRight: KeyRight, bimap: Bimap<KeyLeft, KeyRight>) => void) {
        return this.#impl.forEach((value, key, map) => { return callbackfn(key, value, this); })
    }*/
    get size() {
        return this.#impl.size / 2;
    }
}
//# sourceMappingURL=bimap-exclusive.js.map
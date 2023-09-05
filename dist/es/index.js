import { __classPrivateFieldGet } from 'tslib';

var _BimapExclusive_impl;
/**
 * A variant of a map that's a 1-1 mapping between key->value OR value->key. Can be used to represent certain types of Enums, for example.
 *
 * Unlike `BimapSeparate`, this assumes that the two keys are mutually exclusive and saves a bit of work by only having one `Map` instead of two.
 */
class BimapExclusive {
    constructor() {
        _BimapExclusive_impl.set(this, new Map());
    }
    /**
     * Adds a new value to this bimap, associating these two keys with one another.
     */
    add(left, right) {
        console.assert(__classPrivateFieldGet(this, _BimapExclusive_impl, "f").has(left) === __classPrivateFieldGet(this, _BimapExclusive_impl, "f").has(right), "A key has been re-defined, which will likely lead to undefined behavior when iterating. If you need to change a mapping, delete it first.");
        try {
            __classPrivateFieldGet(this, _BimapExclusive_impl, "f").set(left, right);
            __classPrivateFieldGet(this, _BimapExclusive_impl, "f").set(right, left);
        }
        catch (ex) {
            // Can `set` throw? Just in case...
            __classPrivateFieldGet(this, _BimapExclusive_impl, "f").delete(left);
            __classPrivateFieldGet(this, _BimapExclusive_impl, "f").delete(right);
            throw ex;
        }
        return this;
    }
    delete(key) {
        if (__classPrivateFieldGet(this, _BimapExclusive_impl, "f").has(key)) {
            let other = __classPrivateFieldGet(this, _BimapExclusive_impl, "f").get(key);
            __classPrivateFieldGet(this, _BimapExclusive_impl, "f").delete(key);
            __classPrivateFieldGet(this, _BimapExclusive_impl, "f").delete(other);
            return true;
        }
        return false;
    }
    has(key) {
        return __classPrivateFieldGet(this, _BimapExclusive_impl, "f").has(key);
    }
    get(key) {
        return __classPrivateFieldGet(this, _BimapExclusive_impl, "f").get(key);
    }
    clear() {
        __classPrivateFieldGet(this, _BimapExclusive_impl, "f").clear();
    }
    *entries() {
        // This assumes certain standardized things about insertion order and such,
        // but it's this way to prevent duplicates.
        let skip = false;
        for (let [left, right] of __classPrivateFieldGet(this, _BimapExclusive_impl, "f")) {
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
        return __classPrivateFieldGet(this, _BimapExclusive_impl, "f").size / 2;
    }
}
_BimapExclusive_impl = new WeakMap();

var _BimapMixed_implLeft, _BimapMixed_implRight;
/**
 * A variant of a map that's a 1-1 mapping between key->value OR value->key. Can be used to represent certain types of Enums, for example.
 *
 * To differentiate, keys are either "left" or "right" keys with no preference between either (ideally. In practice left is slighly preferred in cases where `hint` is not passed).
 *
 * In some ways it's also like a set, so its methods are modeled after a set, with the addition of a `get` method to turn left into right and vice-versa.
 *
 * Unlike `BimapExclusive`, this allows overlap between the two key types, but gives slight preferential treatment to the left keys and incurs a slight performance penalty.
 */
class BimapMixed {
    constructor() {
        _BimapMixed_implLeft.set(this, new Map());
        _BimapMixed_implRight.set(this, new Map());
    }
    /**
     * Adds a new value to this bimap, associating these two keys with one another.
     */
    add(left, right) {
        __classPrivateFieldGet(this, _BimapMixed_implLeft, "f").set(left, right);
        __classPrivateFieldGet(this, _BimapMixed_implRight, "f").set(right, left);
        return this;
    }
    delete(key, hint) {
        let has = false;
        let keyLeft;
        let keyRight;
        if (hint == 'left') {
            keyLeft = key;
            has = __classPrivateFieldGet(this, _BimapMixed_implLeft, "f").has(keyLeft);
            keyRight = __classPrivateFieldGet(this, _BimapMixed_implLeft, "f").get(keyLeft);
        }
        else if (hint == 'right') {
            keyRight = key;
            has = __classPrivateFieldGet(this, _BimapMixed_implRight, "f").has(keyRight);
            keyLeft = __classPrivateFieldGet(this, _BimapMixed_implRight, "f").get(keyRight);
        }
        else {
            if (__classPrivateFieldGet(this, _BimapMixed_implLeft, "f").has(key)) {
                keyLeft = key;
                has = true;
                keyRight = __classPrivateFieldGet(this, _BimapMixed_implLeft, "f").get(keyLeft);
            }
            else if (__classPrivateFieldGet(this, _BimapMixed_implRight, "f").has(key)) {
                keyRight = key;
                has = true;
                keyLeft = __classPrivateFieldGet(this, _BimapMixed_implRight, "f").get(keyRight);
            }
        }
        if (has) {
            __classPrivateFieldGet(this, _BimapMixed_implLeft, "f").delete(keyLeft);
            __classPrivateFieldGet(this, _BimapMixed_implRight, "f").delete(keyRight);
        }
        return has;
    }
    has(key, hint) {
        if (hint === 'left')
            return __classPrivateFieldGet(this, _BimapMixed_implLeft, "f").has(key);
        if (hint === 'right')
            return __classPrivateFieldGet(this, _BimapMixed_implRight, "f").has(key);
        return __classPrivateFieldGet(this, _BimapMixed_implLeft, "f").has(key) || __classPrivateFieldGet(this, _BimapMixed_implRight, "f").has(key);
    }
    get(key, hint) {
        if (hint === 'left')
            return __classPrivateFieldGet(this, _BimapMixed_implLeft, "f").get(key);
        if (hint === 'right')
            return __classPrivateFieldGet(this, _BimapMixed_implRight, "f").get(key);
        if (this.has(key, "left"))
            return __classPrivateFieldGet(this, _BimapMixed_implLeft, "f").get(key);
        if (this.has(key, "right"))
            return __classPrivateFieldGet(this, _BimapMixed_implRight, "f").get(key);
        return undefined;
    }
    clear() {
        __classPrivateFieldGet(this, _BimapMixed_implLeft, "f").clear();
        __classPrivateFieldGet(this, _BimapMixed_implRight, "f").clear();
    }
    entries() {
        return __classPrivateFieldGet(this, _BimapMixed_implLeft, "f").entries();
    }
    forEach(callbackfn) {
        return __classPrivateFieldGet(this, _BimapMixed_implLeft, "f").forEach((value, key) => { return callbackfn(key, value, this); });
    }
    get size() {
        return __classPrivateFieldGet(this, _BimapMixed_implLeft, "f").size;
    }
}
_BimapMixed_implLeft = new WeakMap(), _BimapMixed_implRight = new WeakMap();

function modifyMapAt(map, key, fn) {
    return map.set(key, fn(map.get(key)));
}

/**
 * Functions to handle the specialization of a `Map` whose values are always a `Set`.
 */
const MapOfSets = {
    add: (map, key, value) => {
        var _a;
        let set = (_a = map.get(key)) !== null && _a !== void 0 ? _a : new Set();
        set.add(value);
        map.set(key, set);
        return map;
    },
    /**
     * Removes this `value` from the `Set` associated with `key`. Does not remove the `Set` itself, even if it becomes empty.
     */
    delete: (map, key, value) => {
        var _a;
        let set = (_a = map.get(key)) !== null && _a !== void 0 ? _a : new Set();
        let ret = set.delete(value);
        map.set(key, set);
        return ret;
    },
    has: (map, key, value) => {
        var _a, _b;
        return (_b = (_a = map.get(key)) === null || _a === void 0 ? void 0 : _a.has(value)) !== null && _b !== void 0 ? _b : false;
    }
};

const RecursiveMap = {
    set: recursiveMapSet,
    get: recursiveMapGet,
    has: recursiveMapHas,
    /**
     * Like `set`, but takes a callback that allows you to modify a previous value, if any.
     */
    modify: recursiveMapModify,
};
function recursiveMapGet(map, ...keys) {
    const [firstKey, ...restKeys] = keys;
    if (restKeys.length === 0) {
        return map.get(firstKey);
    }
    let subMap = map.get(firstKey);
    if (subMap === undefined)
        return undefined;
    return recursiveMapGet(subMap, ...restKeys);
}
function recursiveMapHas(map, ...keys) {
    const [firstKey, ...restKeys] = keys;
    if (restKeys.length === 0) {
        return map.has(firstKey);
    }
    let subMap = map.get(firstKey);
    if (subMap === undefined)
        return false;
    return recursiveMapHas(subMap, ...restKeys);
}
function recursiveMapSet(map, ...keysAndValue) {
    return recursiveMapModify(map, ...keysAndValue.slice(0, keysAndValue.length - 1), () => keysAndValue[keysAndValue.length - 1]);
}
function recursiveMapModify(map, ...keysAndValue) {
    const [firstKey, ...restKeysAndValue] = keysAndValue;
    if (restKeysAndValue.length == 1) {
        let had = map.has(firstKey);
        let prev = map.get(firstKey);
        map.set(firstKey, restKeysAndValue[0](prev, had));
    }
    else {
        let subMap = map.get(firstKey);
        if (subMap == null) {
            map.set(firstKey, subMap = new Map());
        }
        recursiveMapModify(subMap, ...restKeysAndValue);
    }
}

export { BimapExclusive, BimapMixed, MapOfSets, RecursiveMap, modifyMapAt };
//# sourceMappingURL=index.js.map

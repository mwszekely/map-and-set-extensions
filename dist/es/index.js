import { __classPrivateFieldGet } from 'tslib';

function add$1(map, left, right) {
    console.assert(map.has(left) === map.has(right), "A key has been re-defined, which will likely lead to undefined behavior when iterating. If you need to change a mapping, delete it first.");
    try {
        map.set(left, right);
        map.set(right, left);
    }
    catch (ex) {
        // Can `set` throw? Just in case...
        map.delete(left);
        map.delete(right);
        throw ex;
    }
    return map;
}
function del$1(map, key) {
    if (map.has(key)) {
        let other = map.get(key);
        map.delete(key);
        map.delete(other);
        return true;
    }
    return false;
}
function has$2(map, key) {
    return map.has(key);
}
function get$1(map, key) {
    return map.get(key);
}
function clear(map) {
    map.clear();
}
function* entries(map) {
    // This assumes certain standardized things about insertion order and such,
    // but it's this way to prevent duplicates.
    let skip = false;
    for (let [left, right] of map) {
        if (skip)
            continue;
        yield [left, right];
        skip = !skip;
    }
}
function forEach(map, callbackfn) {
    let entries2 = entries(map);
    for (let [keyA, keyB] of entries2) {
        callbackfn(keyA, keyB, map);
    }
}
function size(map) {
    return map.size / 2;
}

var bimapExclusive = /*#__PURE__*/Object.freeze({
    __proto__: null,
    add: add$1,
    clear: clear,
    delete: del$1,
    entries: entries,
    forEach: forEach,
    get: get$1,
    has: has$2,
    size: size
});

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

function modify$1(map, key, fn) {
    return map.set(key, fn(map.get(key)));
}

var mapHelpers = /*#__PURE__*/Object.freeze({
    __proto__: null,
    modify: modify$1
});

function add(map, key, value) {
    var _a;
    let set = (_a = map.get(key)) !== null && _a !== void 0 ? _a : new Set();
    set.add(value);
    map.set(key, set);
    return map;
}
/**
 * Removes this `value` from the `Set` associated with `key`. Does not remove the `Set` itself, even if it becomes empty.
 */
function del(map, key, value) {
    var _a;
    let set = (_a = map.get(key)) !== null && _a !== void 0 ? _a : new Set();
    let ret = set.delete(value);
    map.set(key, set);
    return ret;
}
function has$1(map, key, value) {
    var _a, _b;
    return (_b = (_a = map.get(key)) === null || _a === void 0 ? void 0 : _a.has(value)) !== null && _b !== void 0 ? _b : false;
}

var mapOfSets = /*#__PURE__*/Object.freeze({
    __proto__: null,
    add: add,
    delete: del,
    has: has$1
});

function get(map, ...keys) {
    if (keys.length === 0) {
        return map;
    }
    const [firstKey, ...restKeys] = keys;
    if (map.has(firstKey))
        return get(map.get(firstKey), ...restKeys);
    return undefined;
}
function has(map, ...keys) {
    const [firstKey, ...restKeys] = keys;
    if (restKeys.length === 0) {
        return map.has(firstKey);
    }
    let subMap = map.get(firstKey);
    if (subMap === undefined)
        return false;
    return has(subMap, ...restKeys);
}
function set(map, ...keysAndValue) {
    return modify(map, ...keysAndValue.slice(0, keysAndValue.length - 1), () => keysAndValue[keysAndValue.length - 1]);
}
/**
 * Like `set`, but takes a callback that allows you to modify a previous value, if any.
 */
function modify(map, ...keysAndValue) {
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
        modify(subMap, ...restKeysAndValue);
    }
}

var recursiveMap = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get: get,
    has: has,
    modify: modify,
    set: set
});

export { bimapExclusive as BimapExclusive, BimapMixed, mapHelpers as MapHelpers, mapOfSets as MapOfSets, recursiveMap as RecursiveMap };
//# sourceMappingURL=index.js.map

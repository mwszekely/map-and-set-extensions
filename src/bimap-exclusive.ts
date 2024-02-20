
/**
 * A variant of a map that's a 1-1 mapping between key->value OR value->key. Can be used to represent certain types of Enums, for example.
 * 
 * Unlike `BimapSeparate`, this assumes that the two keys are mutually exclusive and saves a bit of work by only having one `Map` instead of two.
 */
type BimapExclusive<KeyLeft, KeyRight> = Map<KeyLeft | KeyRight, KeyLeft | KeyRight>;

function add<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>, left: KeyLeft, right: KeyRight) {
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

function del<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>, key: KeyLeft | KeyRight): boolean {
    if (map.has(key)) {
        let other: KeyLeft | KeyRight = map.get(key)!;
        map.delete(key);
        map.delete(other);

        return true;
    }
    return false;
}

function has<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>, key: KeyLeft | KeyRight): boolean {
    return map.has(key);
}

function get<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>, key: KeyRight): KeyLeft | undefined;
function get<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>, key: KeyLeft): KeyRight | undefined;
function get<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>, key: KeyLeft | KeyRight): KeyLeft | KeyRight | undefined {
    return map.get(key);
}

function clear<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>) {
    map.clear();
}

function *entries<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>) {
    // This assumes certain standardized things about insertion order and such,
    // but it's this way to prevent duplicates.
    let skip = false;
    for (let [left, right] of map) {
        if (skip)
            continue;

        yield [left, right] as const;
        skip = !skip;
    }
}

function forEach<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>, callbackfn: (keyA: KeyLeft | KeyRight, keyB: KeyLeft | KeyRight, bimap: BimapExclusive<KeyLeft, KeyRight>) => void) {
    let entries2 = entries(map);
    for (let [keyA, keyB] of entries2) {
        callbackfn(keyA, keyB, map);
    }
}

function size(map: BimapExclusive<unknown, unknown>): number {
    return map.size / 2;
}


export {
    add, clear, del as delete, entries, forEach, get, has, size
};

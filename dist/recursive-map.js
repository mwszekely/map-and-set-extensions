export const RecursiveMap = {
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
//# sourceMappingURL=recursive-map.js.map
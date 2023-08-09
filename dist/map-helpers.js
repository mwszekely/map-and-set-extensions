export function modifyMapAt(map, key, fn) {
    return map.set(key, fn(map.get(key)));
}
function mapGetRecursive(map, ...keys) {
    const [firstKey, ...restKeys] = keys;
    if (map.has(firstKey))
        return mapGetRecursive(map.get(firstKey), ...restKeys);
    return undefined;
}
//# sourceMappingURL=map-helpers.js.map
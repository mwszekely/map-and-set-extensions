# JS/TS extensions to `Map` and `Set`

Just a few nice-to-haves for `Map` and `Set` that I find myself using a lot, like a `Map` whose values are all `Set`s:

```ts
let map = new Map<string, Set<number>>();
MapOfSets.add(map, "foo", 5);
MapOfSets.add(map, "foo", 3);
let values = map.get("foo");  // [5,3]

// We've avoided a lot of boilerplate involved with
// checking if keys exist, making new sets if they don't, etc.
```

Also a 2-way `Bimap`:

```ts
let bimap = new BimapExclusive<string, number>();
bimap.add("foo", 6);
bimap.get(6);               // "foo"
bimap.get("foo");           // 6

// BimapMixed is available if the two keys can overlap,
// BimapExclusive is for when you know they'll always be different
```

Finally, the [proposed Set method additions](https://github.com/tc39/proposal-set-methods) are included in the Typescript typings, but it's up to you to install a polyfill as necessary.
```typescript
let largeSet = new Set([0,1,2,3]);
let smallSet = new Set([2]);
let diff = largeSet.difference(smallSet)    // [0,1,3], and no Typescript error
```

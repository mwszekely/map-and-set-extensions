# JS/TS extensions to `Map` and `Set`

Just a few nice-to-haves for `Map` and `Set` that I find myself using a lot, almost entirely as free-standing functions (and not inherited classes) so they can be used in any scenario.

The built-in `Map` and `Set` classes are not monkey-patched&mdash;any "add-on" functions are just plain exports.

## A Map of Sets

There's a lot of boilerplate involving adding a new value to a `Map<T, Set>`. The free functions in the `MapOfSets` namespace aim to simplify them with specialized `add`, `has`, and `delete` functions:

(Note that `MapOfSets` is **not a class** and the prototypes of `Map` and `Set` remain untouched)

```ts
import { MapOfSets } from "map-and-set-extensions";

let map = new Map<string, Set<number>>();
MapOfSets.add(map, "foo", 5);
MapOfSets.add(map, "foo", 3);
let values = map.get("foo");  // [5,3]

MapOfSets.has(map, "foo", 5);   // true

MapOfSets.delete(map, "foo", 5);
values = map.get("foo");  // [3]
MapOfSets.delete(map, "foo", 3);
values = map.get("foo");  // []

// We've avoided a lot of boilerplate involved with
// checking if keys exist, making new sets if they don't, etc.
```

## Map of Maps

Recursive maps, to any level, also have helper functions available, so that you don't need to instantiate new child `Map`s yourself every time:
```ts
import { RecursiveMap } from "map-and-set-extensions";
const map = new Map<number, Map<string, CanvasTextAlign>>();
RecursiveMap.set(map, 53, "Z", "center");
RecursiveMap.get(map, 53, "Z");           // "center"
```

## General Helpers

There's actually only one "missing" `Map` method provided&mdash;it's already pretty fully featured.

`modify` is like `Map#get` and `Map#set` combined into one action:

```ts
import { MapHelpers } from "map-and-set-extensions"

let map = new Map<number, string>();
MapHelpers.modify(map, 5, (oldValue) => "newValue");
```



## Bimaps (exclusive)

A bimap, mapping between two different representations of the same value (like an enum), is available similarly as free exports:

```ts
import { BimapExclusive } from "map-and-set-extensions";

let bimap = new Map<string, number>();
BimapExclusive.add(bimap, "foo", 6);
BimapExclusive.get(bimap, 6);               // "foo"
BimapExclusive.get(bimap, "foo");           // 6

// Iterate over each pair once:
for (const [lhs, rhs] of BimapExclusive.entries()) {...}
```

This is the sole class export; it is needed because internally this kind of `Bimap` needs two independent `Map`s, unlike `BimapExclusive` which can pretend it's just one regular `Map`.

## Bimaps (mixed)

A bimap where overlap is allowed is available as a separate class.

For example, mapping each number onto its square overlaps on 4:

```ts
import { BimapMixed } from "map-and-set-extensions";
let bimap = new BimapMixed<number, number>();
bimap.add(1, 1*1);
bimap.add(2, 2*2);
bimap.add(3, 3*3);
bimap.add(4, 4*4);

bimap.get(4);           // 16 ('left' is the default)
bimap.get(4, 'right');  // 2
bimap.get(4, 'left');   // 16
```

## Proposed Set Methods

Finally, the [proposed Set method additions](https://github.com/tc39/proposal-set-methods) are included in the Typescript typings, [but it's up to you to install a polyfill as necessary](https://github.com/zloirock/core-js#new-set-methods).
```typescript
let largeSet = new Set([0,1,2,3]);
let smallSet = new Set([2]);
let diff = largeSet.difference(smallSet)    // [0,1,3], and no Typescript error
```

/**
 * A variant of a map that's a 1-1 mapping between key->value OR value->key. Can be used to represent certain types of Enums, for example.
 *
 * Unlike `BimapSeparate`, this assumes that the two keys are mutually exclusive and saves a bit of work by only having one `Map` instead of two.
 */
type BimapExclusive<KeyLeft, KeyRight> = Map<KeyLeft | KeyRight, KeyLeft | KeyRight>;
declare function add<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>, left: KeyLeft, right: KeyRight): BimapExclusive<KeyLeft, KeyRight>;
declare function del<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>, key: KeyLeft | KeyRight): boolean;
declare function has<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>, key: KeyLeft | KeyRight): boolean;
declare function get<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>, key: KeyRight): KeyLeft | undefined;
declare function get<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>, key: KeyLeft): KeyRight | undefined;
declare function clear<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>): void;
declare function entries<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>): Generator<readonly [KeyLeft | KeyRight, KeyLeft | KeyRight], void, unknown>;
declare function forEach<KeyLeft, KeyRight>(map: BimapExclusive<KeyLeft, KeyRight>, callbackfn: (keyA: KeyLeft | KeyRight, keyB: KeyLeft | KeyRight, bimap: BimapExclusive<KeyLeft, KeyRight>) => void): void;
declare function size(map: BimapExclusive<unknown, unknown>): number;
export { add, clear, del as delete, entries, forEach, get, has, size };

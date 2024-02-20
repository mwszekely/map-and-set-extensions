import { expect, test } from '@playwright/test';
import { BimapExclusive, BimapMixed, RecursiveMap } from "../dist/cjs/index.js";

test("recursive map", async () => {
  let map = new Map<string, Map<number, string>>();

  expect(RecursiveMap.get(map, "a", 0)).toBeUndefined();

  expect(RecursiveMap.has(map, "a", 0)).toBeFalsy();
  expect(RecursiveMap.has(map, "a", 1)).toBeFalsy();
  expect(RecursiveMap.has(map, "b", 0)).toBeFalsy();
  expect(RecursiveMap.has(map, "b", 1)).toBeFalsy();
  RecursiveMap.set(map, "a", 0, "test");
  expect(RecursiveMap.has(map, "a", 0)).toBeTruthy();
  expect(RecursiveMap.has(map, "a", 1)).toBeFalsy();
  expect(RecursiveMap.has(map, "b", 0)).toBeFalsy();
  expect(RecursiveMap.has(map, "b", 1)).toBeFalsy();
  
  expect(RecursiveMap.get(map, "a", 0)).toBe("test");
  
  RecursiveMap.modify(map, "b", 1, () => "test2");
  expect(RecursiveMap.has(map, "a", 0)).toBeTruthy();
  expect(RecursiveMap.has(map, "a", 1)).toBeFalsy();
  expect(RecursiveMap.has(map, "b", 0)).toBeFalsy();
  expect(RecursiveMap.has(map, "b", 1)).toBeTruthy();
  expect(RecursiveMap.get(map, "b", 1)).toBe("test2");
});

test("bimap (exclusive)", async () => {
  let map = new BimapExclusive<string, number>();
  expect(map.get("0")).toBeUndefined();
  expect(map.get(0)).toBeUndefined();
  expect(map.has("0")).toBeFalsy();
  expect(map.has(0)).toBeFalsy();
  expect(map.has("1")).toBeFalsy();
  expect(map.has(1)).toBeFalsy();
  map.add("0", 0);
  expect(map.has("0")).toBeTruthy();
  expect(map.has(0)).toBeTruthy();
  expect(map.get("0")).toBe(0);
  expect(map.get(0)).toBe("0");
  expect(map.has("1")).toBeFalsy();
  expect(map.has(1)).toBeFalsy();
});

test("bimap (mixed)", async () => {
  let map = new BimapMixed<string, number>();
  expect(map.get("0")).toBeUndefined();
  expect(map.get(0)).toBeUndefined();
  expect(map.has("0")).toBeFalsy();
  expect(map.has(0)).toBeFalsy();
  expect(map.has("1")).toBeFalsy();
  expect(map.has(1)).toBeFalsy();
  map.add("0", 0);
  expect(map.has("0")).toBeTruthy();
  expect(map.has(0)).toBeTruthy();
  expect(map.get("0")).toBe(0);
  expect(map.get(0)).toBe("0");
  expect(map.has("1")).toBeFalsy();
  expect(map.has(1)).toBeFalsy();
});


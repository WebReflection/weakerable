import { Map, Set } from "./src/index.js";

let key = {};

let map = new Map([[key, "value"]]);
let set = new Set([key]);

console.assert(Object.prototype.toString.call(map) === "[object WeakerableMap]", "map toStringTag");
console.assert(Object.prototype.toString.call(set) === "[object WeakerableSet]", "set toStringTag");
console.assert(map.has(key), "map has key");
console.assert(set.has(key), "set has key");
console.assert(map.get(key) === "value", "map get value");
console.assert(map.getOrInsert(key, "default") === "value", "map getOrInsert value");

console.assert([...map].length === 1, "map has 1 element");
console.assert(JSON.stringify([...map]) === JSON.stringify([[key, "value"]]), "map has correct elements");

console.assert([...set].length === 1, "set has 1 element");
console.assert([...set][0] === key, "set has key");

console.assert(map.delete(key), "map delete key");
console.assert(!map.has(key), "map does not have key");
console.assert(set.delete(key), "set delete key");
console.assert(!set.has(key), "set does not have key");

if (typeof gc === "function") {
  console.assert(map.getOrInsertComputed(key, k => {
    console.assert(k === key, "map getOrInsertComputed key");
    return "default";
  }) === "default", "map getOrInsertComputed default");
  set.add(key);
  console.assert(map.has(key), "map has key again");
  console.assert(set.has(key), "set has key again");
  key = null;
  gc();
  setTimeout(() => {
    gc();
    console.assert([...map].length === 0, "map is empty");
    console.assert([...set].length === 0, "set is empty");
  }, 100);
}

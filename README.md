# weakerable

[![Coverage Status](https://coveralls.io/repos/github/WebReflection/weakerable/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/weakerable?branch=main)

<sup>**Social Media Photo by [Pete Nuij](https://unsplash.com/@pete_nuij) on [Unsplash](https://unsplash.com/)**</sup>

A tiny ESM module that provides iterable `WeakMap` and `WeakSet` wrappers.

`weakerable` keeps the weak ownership semantics of native weak collections while
letting you iterate over keys, values, or entries that are still reachable.

## Features

- `Map` implements the familiar `WeakMap` API plus `[Symbol.iterator]()`.
- `Set` implements the familiar `WeakSet` API plus `[Symbol.iterator]()`.
- Entries are tracked through `WeakRef`, so collected keys disappear from future
  iterations.
- Constructors accept iterables, matching `Map` and `Set` ergonomics.
- TypeScript declarations are included.

## Usage

```js
// import Map from "weakerable/map";
// import Set from "weakerable/set";
import { Map, Set } from "weakerable";
// or import * as weak from "weakerable"; new weak.Map([...]);

const key = {};

const cache = new Map([[key, "value"]]);
const seen = new Set([key]);

console.log(cache.get(key)); // "value"
console.log([...cache]);     // [[key, "value"]]
console.log([...seen]);      // [key]
```

You can also import the individual implementations:

```js
import Map from "weakerable/map";
import Set from "weakerable/set";
```

### Reason

I already use [not-so-weak](https://github.com/WebReflection/not-so-weak#readme) on occasion, but I recently realized that all I needed was an iterable `WeakSet` or `WeakMap`.

With this module's simpler approach:

  * code size stays minimal: iteration is the only extra feature
  * performance stays as close as possible to native `WeakMap` and `WeakSet`
  * there is no `FinalizationRegistry` orchestration: stale references are pruned when the collection is iterated

That's it. If you need a minimal iterable weak container, this should be your final stop.

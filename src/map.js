/**
 * @template {WeakKey} K
 * @template V
 * @implements {WeakMap<K, V>}
 * @implements {Iterable<[K, V]>}
 */
export default class Map {
  /** @type {WeakMap<K, V>} */
  #map = new WeakMap;

  /** @type {WeakRef<K>[]} */
  #refs = [];

  /**
   * @param {Iterable<readonly [K, V]> | null} [iterable=null]
   */
  constructor(iterable = null) {
    if (iterable) for (const [key, value] of iterable) this.set(key, value);
  }

  /**
   * @type {string}
   */
  get [Symbol.toStringTag]() {
    return "WeakerableMap";
  }

  /**
   * @param {K} key
   * @returns {boolean}
   */
  delete(key) {
    return this.#map.delete(key);
  }

  /**
   * @param {K} key
   * @returns {V | undefined}
   */
  get(key) {
    return this.#map.get(key);
  }

  /**
   * @param {K} key
   * @param {V} defaultValue
   * @returns {V}
   */
  getOrInsert(key, defaultValue) {
    if (this.#map.has(key)) {
      return this.#map.get(key);
    }
    this.#map.set(key, defaultValue);
    this.#refs.push(new WeakRef(key));
    return defaultValue;
  }

  /**
   * @param {K} key
   * @param {(key: K) => V} callback
   * @returns {V}
   */
  getOrInsertComputed(key, callback) {
    if (this.#map.has(key)) {
      return this.#map.get(key);
    }
    const value = callback();
    this.#map.set(key, value);
    this.#refs.push(new WeakRef(key));
    return value;
  }

  /**
   * @param {K} key
   * @returns {boolean}
   */
  has(key) {
    return this.#map.has(key);
  }

  /**
   * @param {K} key
   * @param {V} value
   * @returns {this}
   */
  set(key, value) {
    if (!this.#map.has(key)) this.#refs.push(new WeakRef(key));
    this.#map.set(key, value);
    return this;
  }

  /**
   * @returns {Generator<[K, V], void, unknown>}
   */
  *[Symbol.iterator]() {
    const map = this.#map, refs = [];
    for (const wr of this.#refs) {
      const key = wr.deref();
      if (key && map.has(key)) {
        refs.push(wr);
        yield [key, /** @type {V} */ (map.get(key))];
      }
    }
    this.#refs = refs;
  }
}

/**
 * @template {WeakKey} T
 * @implements {WeakSet<T>}
 * @implements {Iterable<T>}
 */
export default class Set {
  /** @type {WeakSet<T>} */
  #set = new WeakSet;

  /** @type {WeakRef<T>[]} */
  #refs = [];

  /**
   * @param {Iterable<T> | null} [iterable=null]
   */
  constructor(iterable = null) {
    if (iterable) for (const value of iterable) this.add(value);
  }

  /**
   * @type {string}
   */
  get [Symbol.toStringTag]() {
    return "WeakerableSet";
  }

  /**
   * @param {T} value
   * @returns {this}
   */
  add(value) {
    if (!this.#set.has(value)) {
      this.#refs.push(new WeakRef(value));
      this.#set.add(value);
    }
    return this;
  }

  /**
   * @param {T} value
   * @returns {boolean}
   */
  delete(value) {
    return this.#set.delete(value);
  }

  /**
   * @param {T} value
   * @returns {boolean}
   */
  has(value) {
    return this.#set.has(value);
  }

  /**
   * @returns {Generator<T, void, unknown>}
   */
  *[Symbol.iterator]() {
    const set = this.#set, refs = [];
    for (const wr of this.#refs) {
      const value = wr.deref();
      if (value && set.has(value)) {
        refs.push(wr);
        yield value;
      }
    }
    this.#refs = refs;
  }
}

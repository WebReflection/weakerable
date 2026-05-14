/**
 * @template {WeakKey} K
 * @template V
 * @implements {WeakMap<K, V>}
 * @implements {Iterable<[K, V]>}
 */
export default class Map<K extends WeakKey, V> implements WeakMap<K, V>, Iterable<[K, V]> {
    /**
     * @param {Iterable<readonly [K, V]> | null} [iterable=null]
     */
    constructor(iterable?: Iterable<readonly [K, V]> | null);
    /**
     * @param {K} key
     * @returns {boolean}
     */
    delete(key: K): boolean;
    /**
     * @param {K} key
     * @returns {V | undefined}
     */
    get(key: K): V | undefined;
    /**
     * @param {K} key
     * @param {V} defaultValue
     * @returns {V}
     */
    getOrInsert(key: K, defaultValue: V): V;
    /**
     * @param {K} key
     * @param {(key: K) => V} callback
     * @returns {V}
     */
    getOrInsertComputed(key: K, callback: (key: K) => V): V;
    /**
     * @param {K} key
     * @returns {boolean}
     */
    has(key: K): boolean;
    /**
     * @param {K} key
     * @param {V} value
     * @returns {this}
     */
    set(key: K, value: V): this;
    /**
     * @type {string}
     */
    get [Symbol.toStringTag](): string;
    /**
     * @returns {Generator<[K, V], void, unknown>}
     */
    [Symbol.iterator](): Generator<[K, V], void, unknown>;
    #private;
}

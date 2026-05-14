/**
 * @template {WeakKey} T
 * @implements {WeakSet<T>}
 * @implements {Iterable<T>}
 */
export default class Set<T extends WeakKey> implements WeakSet<T>, Iterable<T> {
    /**
     * @param {Iterable<T> | null} [iterable=null]
     */
    constructor(iterable?: Iterable<T> | null);
    /**
     * @param {T} value
     * @returns {this}
     */
    add(value: T): this;
    /**
     * @param {T} value
     * @returns {boolean}
     */
    delete(value: T): boolean;
    /**
     * @param {T} value
     * @returns {boolean}
     */
    has(value: T): boolean;
    /**
     * @type {string}
     */
    get [Symbol.toStringTag](): string;
    /**
     * @returns {Generator<T, void, unknown>}
     */
    [Symbol.iterator](): Generator<T, void, unknown>;
    #private;
}

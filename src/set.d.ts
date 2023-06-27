
interface Set<T> {
    /** Returns true if this set and the `other` set contain no elements in common. */
    isDisjointFrom(other: Set<T>): boolean;

    /** Returns true if the `other` set contains at least everything this set does. */
    isSubsetOf(other: Set<T>): boolean;


    /** Returns true if this set contains at least all the elements of the `other` set. */
    isSupersetOf(other: Set<T>): boolean;

    
    /**
     * Removes all elements in `other` from (a copy of) the original set and returns it.
     * @param other 
     */
    difference(other: Set<T>): Set<T>;

    /**
     * Returns a set containing only the elements in **both** sets. Opposite of `symmetricDifference` or `union`.
     */
    intersection(other: Set<T>): Set<T>;
    /**
     * Returns a set containing only the elements in **neither** set. Opposite of `intersection` or `union`.
     * 
     * @see `intersection`
     * @param other 
     */
    symmetricDifference(other: Set<T>): Set<T>;

    /**
     * Returns a set containing all the elements in **either** set. Opposite of `symmetricDifference` or `intersection`.
     */
    union(other: Set<T>): Set<T>;
}
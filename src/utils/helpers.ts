import { NumberGenerator } from './number';

const num = NumberGenerator;

/**
 * A collection of helper methods
 */
export class Helpers {
    /**
     * Selects a random element from an array.
     *
     * @typeParam T - The type of elements in the array.
     * @param array - The array to sample from.
     * @returns A randomly selected element from the array.
     *
     * @example
     * // Sample a random number
     * const numbers = [1, 2, 3, 4, 5];
     * const randomNumber = Helpers.sample(numbers);
     * console.log(randomNumber); // e.g., 3
     *
     * @example
     * // Sample a random string
     * const fruits = ["apple", "banana", "cherry"];
     * const randomFruit = Helpers.sample(fruits);
     * console.log(randomFruit); // e.g., "banana"
     */
    static sample<T>(array: T[]): T {
        return array[num.randomInRange(0, array.length - 1)];
    }
}

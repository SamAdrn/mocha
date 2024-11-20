/**
 * A utility for generating numbers.
 *
 * Acts as an iterator when instantiated, starting from a specified initial
 * value and incrementing by a defined step with each iteration.
 *
 * @example
 * ```typescript
 * const num = new NumberGenerator(0, 2);
 *
 * console.log(num.next()); // 0
 * console.log(num.next()); // 2
 * console.log(num.next()); // 4
 * ```
 *
 * By default, the initial value is `0` and the incrementing step is `1`.
 * These values can be customized at instantiation or through the provided methods.
 */
export class NumberGenerator {
    private current: number;
    private increment: number;

    constructor(start: number = 0, step: number = 1) {
        this.current = start;
        this.increment = step;
    }

    /**
     * Returns the next number in the sequence and advances the iterator.
     *
     * @returns The next number in the sequence.
     *
     * @example
     * const num = new NumberGenerator(10, 5);
     * console.log(num.next()); // 10
     * console.log(num.next()); // 15
     * console.log(num.next()); // 20
     */
    next(): number {
        const nextValue = this.current;
        this.current += this.increment;
        return nextValue;
    }

    /**
     * Resets the sequence to a specified starting value and step.
     *
     * @param start - The new initial starting value of the sequence (default: 0).
     * @param step - The new increment step for the sequence (default: 1).
     *
     * @example
     * const num = new NumberGenerator(10, 2);
     * console.log(num.next()); // 10
     * console.log(num.next()); // 12
     *
     * num.reset(50, 5);
     * console.log(num.next()); // 50
     * console.log(num.next()); // 55
     */
    reset(start: number = 0, step: number = 1): void {
        this.current = start;
        this.increment = step;
    }

    /**
     * Updates the incrementing step of the sequence.
     *
     * @param step - The new increment step for the sequence.
     *
     * @example
     * const num = new NumberGenerator(0, 1);
     * console.log(num.next()); // 0
     * console.log(num.next()); // 1
     *
     * num.setIncrementStep(3);
     * console.log(num.next()); // 4
     * console.log(num.next()); // 7
     */
    setIncrementStep(step: number): void {
        this.increment = step;
    }

    /**
     * Generates a random number within a specified range.
     *
     * @param min - The minimum value (inclusive).
     * @param max - The maximum value (inclusive).
     * @returns A random number between `min` and `max`.
     *
     * @example
     * const value = NumberGenerator.randomInRange(10, 20);
     * console.log(value); // e.g., 15
     */
    static randomInRange(min: number, max: number): number {
        if (min > max) {
            throw new Error('`min` must be less than or equal to `max`.');
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generates a random number with a specified number of digits.
     *
     * @param digits - The number of digits for the random number.
     * @returns A random number with the specified number of digits.
     *
     * @example
     * const value = NumberGenerator.randomWithDigits(3);
     * console.log(value); // e.g., 738
     */
    static randomWithDigits(digits: number): number {
        if (digits < 1) {
            throw new Error('`digits` must be at least 1.');
        }
        return this.randomInRange(
            Math.pow(10, digits - 1),
            Math.pow(10, digits) - 1,
        );
    }
}

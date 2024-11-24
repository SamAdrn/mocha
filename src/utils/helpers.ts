import { Resolvers } from '../interfaces/general.interface';
import { NumberGenerator } from './number';

const num = NumberGenerator;

/**
 * A collection of helper methods
 */
export class Helpers {
    /**
     * Selects a random element from an array.
     *
     * @param array - The array to sample from.
     * @returns A randomly selected element from the array.
     */
    static sample<T>(array: T[]): T {
        return array[num.randomInRange(0, array.length - 1)];
    }

    /**
     * Interpolates values returned by the resolvers into the `{{ <temp> }}`
     * placeholders within the string provided by `pattern`.
     *
     * The resolvers map a string key which is identical to the `<temp>` string
     * to a function that returns a string value. This will then be interpolated
     * to the associated `<temp>` placeholder within the `pattern` string.
     *
     * @param pattern - The string with placeholders to interpolate values into
     * @param resolvers - A map of strings to functions that returns string that
     *                    will produce the value of the placholders.
     * @returns A string with the interpolated values within
     */
    static interpolate<T extends string>(
        pattern: string,
        resolvers: Resolvers<T>,
    ) {
        // The _ arg captures the entire match.
        // The key arg captures the capture group within.
        return pattern.replace(/{{\s*(\w+)\s*}}/g, (_, key: T) => {
            const resolver = resolvers[key];
            if (!resolver) {
                throw new Error(`No resolver found for placeholder: ${key}`);
            }
            return resolver();
        });
    }

    /**
     * Executes one of two provided functions based on a given probability.
     *
     * The `func1` function is executed with a likelihood defined by `prob`. If
     * `func1` is not executed (based on the probability), `func2` is executed
     * instead.
     *
     * @param func1 - The function to execute with a probability of `prob`.
     * @param func2 - The function to execute with a probability of `1 - prob`.
     * @param prob - The probability of executing `func1`. Must be a value
     *               between 0 and 1.
     *
     * @returns The value returned by either `func1` or `func2`, based on the
     *          evaluated probability.
     */
    static chance<T>(func1: () => T, func2: () => T, prob: number): T;
    /**
     * Returns one of the two provided values based on a given probability.
     *
     * The `val1` value is returned with a likelihood defined by `prob`. If
     * `val1` is not returned (based on the probability), `val2` is returned
     * instead.
     *
     * @param val1 - The value to return with a probability of `prob`.
     * @param val2 - The value to return with a probability of `1 - prob`.
     * @param prob - The probability of returning `val1`. Must be a value
     *               between 0 and 1.
     *
     * @returns The value returned by either `func1` or `func2`, based on the
     *          evaluated probability.
     */
    static chance<T>(val1: T, val2: T, prob: number): T;
    /**
     * Executes one of the provided functions based on their associated
     * probabilities.
     *
     * Each function in the `funcs` list is paired with a probability, which
     * determines the likelihood of that function being executed.
     * The probabilities must sum to 1.
     *
     * @param funcs - An array of objects, where each object contains:
     *   - `func`: A function to execute.
     *   - `prob`: A number between 0 and 1 representing the probability of
     *      executing the function.
     *
     * @returns The value returned by one of the functions in `funcs`, chosen
     *          based on the specified probabilities.
     */
    static chance<T>(funcs: { func: () => T; prob: number }[]): T;
    /**
     * Returns one of the provided values based on their associated
     * probabilities.
     *
     * Each value in the `vals` list is paired with a probability, which
     * determines the likelihood of that value being returned.
     * The probabilities must sum to 1.
     *
     * @param funcs - An array of objects, where each object contains:
     *   - `val`: A value to return.
     *   - `prob`: A number between 0 and 1 representing the probability of
     *      returning the value.
     *
     * @returns A value from one of the values in `vals`, chosen based on the
     *          specified probabilities.
     */
    static chance<T>(vals: { val: T; prob: number }[]): T;
    /**
     * Executes one or more provided functions/values based on specified
     * probabilities.
     *
     * This implementation supports three overloads:
     * 1. Executes one of two functions (`func1`, `func2`) based on a single
     *    probability (`prob`).
     * 2. Executes one of multiple functions provided in a list, each associated
     *    with a specific probability.
     * 3. Returns one of multiple values provided in a list, each associated
     *    with a specific probability.
     *
     * @param arg1 - Either:
     *   - A function (`func1`) to execute with a probability defined by `arg3`
     *     (if two functions are provided), or
     *   - A value (`val1`) to execute with a probability defined by `arg3`
     *     (if two values are provided), or
     *   - An array of objects containing:
     *     - `func`: A function to execute.
     *     - `prob`: A number representing the probability of executing the
     *        function.
     *     , or
     *   - An array of objects containing:
     *     - `val`: A value to return.
     *     - `prob`: A number representing the probability of returning the
     *        value.
     * @param arg2 - (Optional) The second function/value (`func2`/`val2`) to
     *               execute/return when `func1`/`val1` is not selected.
     * @param arg3 - (Optional) A probability between 0 and 1, representing the
     *               likelihood of executing `func1`/`val1`.
     *
     * @returns The chosen value or the value returned by the chosen function,
     *          determined either by the probability (`arg3`) or the
     *          probabilities in the list (`arg1`).
     */
    static chance<T>(
        arg1:
            | (() => T)
            | T
            | { func: () => T; prob: number }[]
            | { val: T; prob: number }[],
        arg2?: () => T | T,
        arg3?: number,
    ): T {
        // Type guard to check if `arg1` is an array of objects with `func`
        const isFuncArray = (
            items: unknown,
        ): items is { func: () => T; prob: number }[] =>
            Array.isArray(items) && items.every((item) => 'func' in item);

        // Type guard to check if `arg1` is an array of objects with `val`
        const isValArray = (
            items: unknown,
        ): items is { val: T; prob: number }[] =>
            Array.isArray(items) && items.every((item) => 'val' in item);

        // Handle 2-function case
        if (
            typeof arg1 === 'function' &&
            typeof arg2 === 'function' &&
            typeof arg3 === 'number'
        ) {
            const [func1, func2, prob] = [arg1 as () => T, arg2, arg3];
            if (prob < 0 || prob > 1) {
                throw new Error('Probability must be between 0 and 1.');
            }
            return Math.random() < prob ? func1() : func2();
        }

        // Handle 2-value case
        if (
            arg3 !== undefined &&
            typeof arg3 === 'number' &&
            arg2 !== undefined
        ) {
            const [val1, val2, prob] = [arg1 as T, arg2 as T, arg3];
            if (prob < 0 || prob > 1) {
                throw new Error('Probability must be between 0 and 1.');
            }
            return Math.random() < prob ? val1 : val2;
        }

        // Handle array of functions
        if (isFuncArray(arg1)) {
            const totalProb = arg1.reduce((sum, { prob }) => sum + prob, 0);
            if (Math.abs(totalProb - 1) > 1e-6) {
                throw new Error('Probabilities must sum to 1.');
            }

            const randomValue = Math.random();
            let cumulativeProb = 0;

            for (const { func, prob } of arg1) {
                cumulativeProb += prob;
                if (randomValue <= cumulativeProb) {
                    return func();
                }
            }

            throw new Error('Unexpected error in chance method.');
        }

        // Handle array of values
        if (isValArray(arg1)) {
            const totalProb = arg1.reduce((sum, { prob }) => sum + prob, 0);
            if (Math.abs(totalProb - 1) > 1e-6) {
                throw new Error('Probabilities must sum to 1.');
            }

            const randomValue = Math.random();
            let cumulativeProb = 0;

            for (const { val, prob } of arg1) {
                cumulativeProb += prob;
                if (randomValue <= cumulativeProb) {
                    return val;
                }
            }

            throw new Error('Unexpected error in chance method.');
        }

        throw new Error('Invalid arguments.');
    }
}

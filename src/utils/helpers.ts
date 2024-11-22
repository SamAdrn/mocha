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
}

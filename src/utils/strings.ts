import { NumberGenerator } from './number';

const num = NumberGenerator;

/**
 * A utility for generating strings
 */
export class StringGenerator {
    private static readonly UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    private static readonly LOWER = 'abcdefghijklmnopqrstuvwxyz';
    private static readonly SYMBOL = '!@#$%^&*()-_=+{}[]:;~?><,.';
    private static readonly NUMERIC = '0123456789';

    /**
     * Generates a random string of uppercase letters.
     *
     * @param length - The length of the random string.
     * @returns A randomly generated string of uppercase letters.
     */
    static upper(length: number = 1): string {
        return this.createString(length, this.UPPER);
    }

    /**
     * Generates a random string of lowercase letters.
     *
     * @param length - The length of the random string.
     * @returns A randomly generated string of lowercase letters.
     */
    static lower(length: number = 1): string {
        return this.createString(length, this.LOWER);
    }

    /**
     * Generates a random string of special symbols.
     *
     * @param length - The length of the random string.
     * @returns A randomly generated string of special symbols.
     */
    static symbol(length: number = 1): string {
        return this.createString(length, this.LOWER);
    }

    /**
     * Generates a random string of numeric digits.
     *
     * @param length - The length of the random string
     * @returns A randomly generated string of numeric digits.
     */
    static nummeric(length: number = 1): string {
        return this.createString(length, this.LOWER);
    }

    /**
     * Generates a random string based on the provided options.
     *
     * @param length - The length of random string to generate.
     * @param options - Options to customize the random string generation.
     * @param options.uppercase - Include uppercase letters (default: true).
     * @param options.lowercase - Include lowercase letters (default: true).
     * @param options.numbers - Include numeric digits (default: false).
     * @param options.symbols - Include special symbols (default: false).
     * @returns A randomly generated string.
     */
    static generate(
        length: number,
        options?: {
            uppercase?: boolean;
            lowercase?: boolean;
            symbols?: boolean;
            numerics?: boolean;
        },
    ): string;
    /**
     * Generates a random string using a custom character pool.
     *
     * @param length - The length of random string to generate.
     * @param charpool - A string representing the character pool to use.
     */
    static generate(length: number, charpool: string): string;
    /**
     * Generates a random string based on the provided custom character pool or
     * by generating a default pool with an object to customize character types.
     *
     * @param length - The length of random string to generate.
     * @param arg2 - Either:
     *   -  A string representing the character pool to use, or
     *   - An options to customize the character pool.
     *
     * @returns A randomly generated string.
     */
    static generate(
        length: number,
        arg2?:
            | string
            | {
                  uppercase?: boolean;
                  lowercase?: boolean;
                  symbols?: boolean;
                  numerics?: boolean;
              },
    ): string {
        let charPool = '';

        if (typeof arg2 === 'string') {
            charPool = arg2;
        } else {
            const options = {
                uppercase: true,
                lowercase: true,
                symbols: false,
                numerics: false,
                ...arg2, // Apply defaults
            };

            if (options.uppercase) charPool += this.UPPER;
            if (options.lowercase) charPool += this.LOWER;
            if (options.symbols) charPool += this.SYMBOL;
            if (options.numerics) charPool += this.NUMERIC;
        }

        if (!charPool) {
            throw new Error(
                'Character pool cannot be empty. Provide a valid charpool or enable options.',
            );
        }

        return this.createString(length, charPool);
    }

    /**
     * Creates a string of length `length` from a character `pool`.
     *
     * @param length - Length of the generated string
     * @param pool - The character pool to generate the string from
     * @returns A generated string
     */
    private static createString(length: number, pool: string): string {
        return Array.from(
            { length },
            () => pool[Math.floor(Math.random() * pool.length)],
        ).join('');
    }
}

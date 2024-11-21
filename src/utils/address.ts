import { faker } from '@faker-js/faker';
import { NumberGenerator } from './number';
import { US_STATES } from '../data/us-states.data';
import { AddressItem } from '../interfaces/address.interface';

const location = faker.location;
const num = NumberGenerator;

/**
 * A utility for generating addresses.
 */
export class Address {
    private static states: Record<string, any> = US_STATES;

    /**
     * Generates a random street address (line 1).
     *
     * @param options - Optional configuration for the street address.
     * @param options.includeStreetNumber - Whether to include a random street number.
     * @returns A randomly generated street address with or without a street number.
     *
     * @example
     * Address.street1(); // "Main St"
     * Address.street1({ includeStreetNumber: true }); // "123 Main St"
     */
    static street1(options?: { includeStreetNumber?: boolean }): string {
        const streetNumber = options?.includeStreetNumber
            ? num.randomWithDigits(num.randomInRange(3, 5)) + ' '
            : '';
        return `${streetNumber}${location.street()}`;
    }

    /**
     * Generates a secondary street address.
     *
     * @returns A randomly generated secondary address.
     *
     * @example
     * Address.street2(); // "Apt. 4B"
     */
    static street2(): string {
        return location.secondaryAddress();
    }

    /**
     * Generates a complete street address, including street number and
     * secondary address.
     *
     * @returns A complete randomly generated street address.
     *
     * @example
     * Address.streetAddress(); // "123 Main St"
     */
    static streetAddress() {
        return location.streetAddress(true);
    }

    /**
     * Generates a random city name.
     *
     * @returns A randomly generated city name.
     *
     * @example
     * Address.city(); // "Springfield"
     */
    static city() {
        return location.city();
    }

    /**
     * Generates a random county name.
     *
     * @returns A randomly generated county name.
     *
     * @example
     * Address.county(); // "Orange"
     */
    static county() {
        return location.county();
    }

    /**
     * Generates a random state name.
     *
     * @param option - Optional configuration for the state name.
     * @param option.abbreviated - Whether to return the state name in abbreviated form.
     * @returns A randomly generated state name, abbreviated or full.
     *
     * @example
     * Address.state(); // "California"
     * Address.state({ abbreviated: true }); // "CA"
     */
    static state(option?: { abbreviated?: boolean }) {
        return location.state({ abbreviated: option?.abbreviated });
    }

    /**
     * Generates a ZIP code based on the provided prefix and options.
     *
     * @param prefix - The initial portion of the ZIP code (e.g., "900" for Los Angeles).
     * @param options - Optional configuration for the ZIP code.
     * @param options.nineDigitZip - If `true`, generates a nine-digit ZIP code (e.g., "90001-1234").
     * @param options.noDashInZip - If `true`, omits the dash in the nine-digit ZIP code (e.g., "900011234").
     *                               Only applicable when `nineDigitZip` is `true`.
     * @returns A randomly generated ZIP code string, either in the 5-digit or 9-digit format.
     *
     * @example
     * // Generate a 5-digit ZIP code
     * Address.zip("900");
     * // "90012"
     *
     * @example
     * // Generate a 9-digit ZIP code with a dash
     * Address.zip("900", { nineDigitZip: true });
     * // "90012-3456"
     *
     * @example
     * // Generate a 9-digit ZIP code without a dash
     * Address.zip("900", { nineDigitZip: true, noDashInZip: true });
     * // "900123456"
     */
    static zip(
        prefix: string,
        options?: { nineDigitZip?: boolean; noDashInZip?: boolean },
    ): string {
        const suffix = options?.nineDigitZip
            ? `${options.noDashInZip ? '' : '-'}${num.randomWithDigits(4)}`
            : '';
        return `${prefix}${num.randomWithDigits(2)}${suffix}`;
    }

    /**
     * Generates a full address object, including street, city, state, county, ZIP code, and country.
     *
     * @param options - Optional configuration for generating the address.
     * @param options.stateAbbreviated - If `true`, the state will be abbreviated (e.g., "CA" instead of "California").
     * @param options.nineDigitZip - If `true`, generates a nine-digit ZIP code (e.g., "12345-6789").
     * @param options.noDashInZip - If `true`, removes the dash in the nine-digit ZIP code (only applies if `nineDigitZip` is `true`).
     * @returns An object containing the full address details.
     *
     * @example
     * // Generate a full address with default settings
     * Address.full();
     * // {
     * //   street1: "123 Main St",
     * //   street2: "Apt 4B",
     * //   city: "Los Angeles",
     * //   county: "Los Angeles",
     * //   state: "California",
     * //   zip: "90001",
     * //   country: "US"
     * // }
     *
     * @example
     * // Generate an address with an abbreviated state and a nine-digit ZIP
     * Address.full({ stateAbbreviated: true, nineDigitZip: true });
     * // {
     * //   street1: "456 Elm St",
     * //   street2: "Suite 12",
     * //   city: "San Diego",
     * //   county: "San Diego",
     * //   state: "CA",
     * //   zip: "92101-1234",
     * //   country: "US"
     * // }
     */
    static full(options?: {
        stateAbbreviated?: boolean;
        nineDigitZip?: boolean;
        noDashInZip?: boolean;
    }): AddressItem {
        const statesMap = Address.states;
        const statesList = Object.keys(statesMap);

        const stateObj =
            statesMap[statesList[num.randomInRange(0, statesList.length - 1)]];
        const { name, abbreviation, cities } = stateObj;

        const cityObj = cities[num.randomInRange(0, cities.length - 1)];
        const { city, county, zipCodePrefix } = cityObj;
        const zip = this.zip(zipCodePrefix, options);

        return {
            street1: location.streetAddress(),
            street2: location.secondaryAddress(),
            city: city,
            county: county,
            state: options?.stateAbbreviated ? abbreviation : name,
            zip: zip,
            country: 'US',
        };
    }
}

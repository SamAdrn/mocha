import { faker } from '@faker-js/faker';
import { NumberGenerator } from './number';
import { US_STATES } from '../data/us-states.data';
import {
    AddressItem,
    DataCity,
    DataState,
} from '../interfaces/address.interface';
import { Helpers } from './helpers';

const location = faker.location;
const h = Helpers;
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
     */
    static street2(): string {
        return location.secondaryAddress();
    }

    /**
     * Generates a complete street address, including street number and
     * secondary address.
     *
     * @returns A complete randomly generated street address.
     */
    static streetAddress() {
        return location.streetAddress(true);
    }

    /**
     * Generates a random city name.
     *
     * @returns A randomly generated city name.
     */
    static city() {
        return location.city();
    }

    /**
     * Generates a random county name.
     *
     * @returns A randomly generated county name.
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
     */
    static state(option?: { abbreviated?: boolean }) {
        return location.state({ abbreviated: option?.abbreviated });
    }

    /**
     * Generates a ZIP code based on the provided prefix and options.
     *
     * @param options - Configuration for the ZIP code.
     * @param options.prefix - The initial portion of the ZIP code. Should be no
     *                         longer than 9 digits.
     * @param options.nineDigitZip - If `true`, ensures a 9-digit ZIP code is generated.
     * @param options.noDashInZip - If `true`, omits the dash in the nine-digit
     *                              ZIP code (e.g., "900011234"). Only applicable
     *                              when `nineDigitZip` is `true`.
     * @returns A randomly generated ZIP code string, either in the 5-digit or 9-digit format.
     */
    static zip(options: {
        prefix?: string;
        nineDigitZip?: boolean;
        noDashInZip?: boolean;
    }): string {
        const { prefix = '', nineDigitZip, noDashInZip } = options;

        const newPrefix = prefix.replace(/-/g, '');
        const base = newPrefix
            .slice(0, 5)
            .padEnd(5, `${num.randomWithDigits(1)}`);
        const remainder = newPrefix.slice(5, 9);

        if (nineDigitZip) {
            const extraDigits = remainder.padEnd(
                4,
                `${num.randomWithDigits(1)}`,
            );
            return `${base}${noDashInZip ? '' : '-'}${extraDigits}`;
        }

        return base;
    }

    /**
     * Generates a full address object, including street, city, state, county, ZIP code, and country.
     *
     * @param options - Optional configuration for generating the address.
     * @param options.stateAbbreviated - If `true`, the state will be abbreviated (e.g., "CA" instead of "California").
     * @param options.nineDigitZip - If `true`, generates a nine-digit ZIP code (e.g., "12345-6789").
     * @param options.noDashInZip - If `true`, removes the dash in the nine-digit ZIP code (only applies if `nineDigitZip` is `true`).
     * @returns An object containing the full address details.
     */
    static full(options?: {
        stateAbbreviated?: boolean;
        nineDigitZip?: boolean;
        noDashInZip?: boolean;
    }): AddressItem {
        const statesMap = Address.states;
        const statesList = Object.keys(statesMap);

        const stateObj: DataState = statesMap[h.sample(statesList)];
        const { name, abbreviation, cities } = stateObj;

        const cityObj = h.sample<DataCity>(cities);
        const { city, county, zipCodePrefix } = cityObj;
        const zip = this.zip({ ...options, prefix: zipCodePrefix });

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

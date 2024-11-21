import { faker } from '@faker-js/faker';
import { NumberGenerator } from './number';
import { EN_US_STATES } from '../data/en-us-states.data';
import {
    AddressItem,
    DataCity,
    DataDirectionsMap,
    DataState,
    DataStateMap,
} from '../interfaces/address.interface';
import { Helpers } from './helpers';
import { EN_DIRECTIONS } from '../data/en-directions.data';

const location = faker.location;
const h = Helpers;
const num = NumberGenerator;

/**
 * A utility for generating addresses.
 */
export class Address {
    private static dataStates: DataStateMap = EN_US_STATES;
    private static dataDirections: DataDirectionsMap = EN_DIRECTIONS;

    /**
     * Generates a random cardinal or intercardinal direction.
     *
     * @param options - Configuration options for the direction generation.
     * @param options.excludeIntercardinals - If `true`, excludes intercardinal directions
     *                                        and only returns cardinal directions
     * @param options.abbreviated - If `true`, returns abbreviated forms.
     * @returns A random direction as a string, based on the provided options.
     */
    static direction(
        options: {
            excludeIntercardinals?: boolean;
            abbreviated?: boolean;
        } = {},
    ): string {
        const { excludeIntercardinals, abbreviated } = options;
        const i = num.randomInRange(0, excludeIntercardinals ? 3 : 7);
        let dir;

        if (i > 3) {
            // Intercardinals
            dir = this.dataDirections.intercardinal[i % 4];
        } else {
            // Cardinals
            dir = this.dataDirections.cardinal[i];
        }

        return abbreviated ? dir.abbreviation : dir.name;
    }

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
     * @returns A random city name.
     */
    static city() {
        return h.sample(
            this.dataStates[this.state({ abbreviated: true })].cities,
        ).city;
    }

    /**
     * @returns A random county name.
     */
    static county() {
        return h.sample(
            this.dataStates[this.state({ abbreviated: true })].cities,
        ).county;
    }

    /**
     * Generates a random state name.
     *
     * @param options - Optional configuration for the state name.
     * @param option.abbreviated - Whether to return the state name in abbreviated form.
     * @returns A random state name, abbreviated or full.
     */
    static state(options: { abbreviated?: boolean } = {}) {
        const { abbreviated } = options;
        const stateCode = h.sample(Object.keys(this.dataStates));
        return abbreviated ? stateCode : this.dataStates[stateCode].name;
    }

    /**
     * Generates a ZIP code based on the provided prefix and options.
     *
     * @param options - Configuration for the ZIP code.
     * @param options.prefix - The initial portion of the ZIP code. Should be no
     *                         longer than 9 digits.
     * @param options.nineDigitZip - If `true`, ensures a 9-digit ZIP code is generated.
     * @param options.noDashInZip - If `true`, omits the dash in the nine-digit
     *                              ZIP code (e.g., `"900011234"`). Only applicable
     *                              when `nineDigitZip` is `true`.
     * @returns A randomly generated ZIP code string, either in the 5-digit or 9-digit format.
     */
    static zip(
        options: {
            prefix?: string;
            nineDigitZip?: boolean;
            noDashInZip?: boolean;
        } = {},
    ): string {
        const { prefix = '', nineDigitZip, noDashInZip } = options;
        const sanitizedPrefix = prefix.replace(/-/g, '');

        let base = sanitizedPrefix.slice(0, 5);
        let remainder = sanitizedPrefix.slice(5, 9);

        if (base.length < 5) {
            base += num.randomWithDigits(5 - base.length);
        }

        if (nineDigitZip) {
            if (remainder.length < 4) {
                remainder += num.randomWithDigits(4 - remainder.length);
            }
            return `${base}${noDashInZip ? '' : '-'}${remainder}`;
        }

        return base;
    }

    /**
     * Generates a full address object, including street, city, state, county, ZIP code, and country.
     *
     * @param options - Optional configuration for generating the address.
     * @param options.stateAbbreviated - If `true`, the state will be abbreviated
     *                                   (e.g., "CA" instead of "California").
     * @param options.nineDigitZip - If `true`, generates a nine-digit ZIP code
     *                               (e.g., "12345-6789").
     * @param options.noDashInZip - If `true`, removes the dash in the nine-digit
     *                              ZIP code (only applies if `nineDigitZip` is `true`).
     * @returns An object containing the full address details.
     */
    static full(
        options: {
            stateAbbreviated?: boolean;
            nineDigitZip?: boolean;
            noDashInZip?: boolean;
        } = {},
    ): AddressItem {
        const stateObj: DataState =
            this.dataStates[this.state({ abbreviated: true })];
        const { name: stateName, abbreviation: stateAbbrev, cities } = stateObj;

        const cityObj = h.sample<DataCity>(cities);
        const { city, county, zipCodePrefix } = cityObj;
        const zip = this.zip({ ...options, prefix: zipCodePrefix });

        return {
            street1: location.streetAddress(),
            street2: location.secondaryAddress(),
            city: city,
            county: county,
            state: options?.stateAbbreviated ? stateAbbrev : stateName,
            zip: zip,
            country: 'US',
        };
    }
}

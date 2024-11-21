/** Represents a full Address */
export interface AddressItem {
    /** Address Line 1 */
    street1: string;
    /** Address Line 2 */
    street2: string;
    city: string;
    county: string;
    state: string;
    zip: string;
    country: string;
}

/** 
 * Represents the structure for a States Object Map, where `abbreviation`
 * is the 2-letter ANSI abbreviation for the state
 */
export interface DataStateMap {
    [abbreviation: string]: DataState;
}

/** Represents the structure for a State Data Source */
export interface DataState {
    /** The full state name */
    name: string;
    /** The 2-letter ANSI abbreviation for the state */
    abbreviation: string;
    /** A list of  */
    cities: DataCity[];
}

/** Represents the structure for a City Data Source */
export interface DataCity {
    /** The full city name */
    city: string;
    /** The 3-digit prefix for a Zip Code within the city */
    zipCodePrefix: string;
    /** The full name of the county the city resides in */
    county: string;
}

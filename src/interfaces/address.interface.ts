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
    /** A list of cities residing in the state */
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

/** Represents the structure for a Street Name Source */
export type DataStreetNames = string[];

/** Represents the structure for a Street Descriptor Map */
export type DataStreetDescriptorMap = Record<
    DataStreetDescriptorType,
    DataStreetDescriptor[]
>;

/** Categories of Street Desciptors that serve as keys to the `DataStreetDescriptorMap` */
export type DataStreetDescriptorType = 'general' | 'size' | 'function';

/**
 * Represents the structure for a Street Descriptor Source, which contains the
 * suffixes or types used in street names to describe the purpose of the street.
 */
export interface DataStreetDescriptor {
    /** The street descriptor */
    name: string;
    /** The abbreviated version of the street descriptor */
    abbreviation: string;
}

/** Represents the structure for a Secondary Address Descriptor Map */
export interface DataSecondaryDescriptorMap {
    /** Secondary Address Descriptors used for residential purposes */
    residential: DataStreetDescriptor[];
    /** Secondary Address Descriptors used for commercial purposes */
    commercial: DataStreetDescriptor[];
}

/**
 * Represents the structure for a Secondary Address Descriptor Source, which
 * contains the prefixes to describe the Secondary ADdress.
 */
export interface DataSecondaryDescriptor {
    /** The secondary address descriptor */
    name: string;
    /** The abbreviated version of the secondary address descriptor */
    abbreviation: string;
}

/**
 * Represents the structure for a Directions Map, where `cardinal` is a list of
 * the four primary points of a compass, and `intercardinal` is a list of the
 * four diagonal directions.
 */
export interface DataDirectionsMap {
    cardinal: DataDirection[];
    intercardinal: DataDirection[];
}

/** Represents the structure for a Direction Descriptor Source. */
export interface DataDirection {
    /** The full form of the direction */
    name: string;
    /** The abbreviated version of the direction  */
    abbreviation: string;
}

/** Represents the keys used for a Street pattern */
export type PatternPrimaryStreetKey = 'ord' | 'street' | 'descriptor' | 'dir';

/**
 * A map of resolvers for pattern interpolation. Keys of a resolver map should
 * map to the template placeholders of the provided pattern string. The values
 * should result in strings that will interpolate into the placeholders.
 */
export type Resolvers<T extends string> = Record<T, () => string>;

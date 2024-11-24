import { Address } from './utils/address';
import { Helpers } from './utils/helpers';
import { NumberGenerator } from './utils/number';
import { StringGenerator } from './utils/strings';

for (let i = 0; i < 10; i++) {
    console.log(Address.full({ nineDigitZip: true, stateAbbreviated: true }));
}

console.log(NumberGenerator.randomOrdinalInRange(1, 5));
console.log(NumberGenerator.randomOrdinalInRange(2, 10000));
console.log(
    NumberGenerator.randomOrdinalInRange(5000, 500000, { includeCommas: true }),
);

console.log(StringGenerator.generate(5));
console.log(StringGenerator.generate(5, 'aB'));
console.log(
    StringGenerator.generate(5, {
        uppercase: false,
        lowercase: false,
        symbols: true,
        numerics: true,
    }),
);

import Decimal from "decimal.js"

export default {
    'litersPer100Km': {
        toBase: (value) => new Decimal('100').dividedBy(value.toString()),
        toThis: (value) => new Decimal(value.toString()).toPower('-1').times('100')
    },
    'kelvin': {
        toBase: (value) => new Decimal(value.toString()).minus('273.15'),
        toThis: (value) => new Decimal(value.toString()).plus('273.15')
    },
    'fahrenheit': {
        toBase: (value) => new Decimal(value.toString()).minus('32').times('5').dividedBy('9'),
        toThis: (value) => new Decimal(value.toString()).times('9').dividedBy('5').plus('32')
    },
    'rankine': {
        toBase: (value) => new Decimal(value.toString()).minus('491.67').times('5').dividedBy('9'),
        toThis: (value) => new Decimal(value.toString()).times('9').dividedBy('5').plus('491.67')
    }
}
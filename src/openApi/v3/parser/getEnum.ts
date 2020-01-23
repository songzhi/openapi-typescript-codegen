import { Enum } from '../../../client/interfaces/Enum';
import { PrimaryType } from './constants';

export function getEnum(values?: (string | number)[], type?: string, names?: string[]): Enum[] {
    if (Array.isArray(values)) {
        if (!names) {
            values = values.filter((value, index, arr) => {
                return arr.indexOf(value) === index;
            });
        }
        return values.map((value, index) => {
            if (typeof value === 'number' || type === 'integer' || type === 'number') {
                return {
                    name: names?.[index] ?? `NUM_${value}`,
                    value: String(value),
                    type: PrimaryType.NUMBER,
                };
            }
            return {
                name: names?.[index] ?? value.replace(/([a-z])([A-Z]+)/g, '$1_$2').toUpperCase(),
                value: `'${value}'`,
                type: PrimaryType.STRING,
            };
        });
    }
    return [];
}

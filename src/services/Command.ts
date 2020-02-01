import { Client } from '../Client';
const colorToRGBA = require('color-rgba');
const { btoa } = require('abab');

type LedRange = 0 | 1 | 2 | 3;

export class CommandService {
    constructor(private client: Client) { }
    public async sendChoreography(choreography: string) {
        const base64 = btoa(choreography);
        return new Promise((resolve, reject) => {
            this.client.put(
                '/api/command',
                {
                    sequence: `[{"choreography":"data:application/x-nabaztag-mtl-choreography;base64,${base64}"}]`
                }
            )
            .then(resolve)
            .catch(reject);
        });
    }
    public moveEarLeft(value: number) {
        return value;
    }
    public moveEarRight(value: number) {
        return value;
    }
    public async setLED(led: LedRange, color: string) {
        if (!color) throw new Error('No color provided');
        const rgba = colorToRGBA(color);
        const choreography = String.fromCharCode.apply(
            null,
            [0, 7, led, rgba[0], rgba[1], rgba[2], 0, 0]
        );
        await this.sendChoreography(choreography);
    }
}

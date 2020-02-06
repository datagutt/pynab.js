import { Client } from "../Client";
const colorToRGBA = require("color-rgba");
const { btoa } = require("abab");

type LedRange = 0 | 1 | 2 | 3;

export class CommandService {
	constructor (private client: Client) { }
	public async sendChoreography (choreography: string) {
		const base64 = btoa(choreography);
		return new Promise((resolve, reject) => {
			this.client.put(
				"/api/command",
				{
					sequence: `[{"choreography":"data:application/x-nabaztag-mtl-choreography;base64,${base64}"}]`
				}
			)
				.then(resolve)
				.catch(reject);
		});
	}
	public async playAudio (path: string) {
		return new Promise((resolve, reject) => {
			this.client.put(
				"/api/command",
				{
					sequence: `[{"audio":"${path}"}]`
				}
			)
				.then(resolve)
				.catch(reject);
		});
	}
	public async moveEar (ear: number, steps: number) {
		if (ear < -17 || ear > 17) throw new Error("Invalid steps provided");
		if (!steps) throw new Error("No steps provided");
		let stepsPos = steps;
		let dir = 0;
		if (steps < 0) {
			dir = 1;
			stepsPos = -steps;
		}
		const choreography = String.fromCharCode.apply(
			null,
			[0, 20, ear, dir, 0, 17, ear, stepsPos]
		);
		await this.sendChoreography(choreography);
	}
	public async setLED (led: LedRange, color: string) {
		if (!color) throw new Error("No color provided");
		const rgba = colorToRGBA(color);
		const choreography = String.fromCharCode.apply(
			null,
			[0, 7, led, rgba[0], rgba[1], rgba[2], 0, 0]
		);
		await this.sendChoreography(choreography);
	}
	public async blinkLED (led: LedRange, color: string) {
		if (!color) throw new Error("No color provided");
		const rgba = colorToRGBA(color);
		const choreography = String.fromCharCode.apply(
			null,
			[0, 1, 10, 0, 7, led, rgba[0], rgba[1], rgba[2], 0, 0, 15, 7, led, 0, 0, 0, 0, 0]
		);
		await this.sendChoreography(choreography);
	}
}

import { Client } from "../Client";
const colorToRGBA = require("color-rgba");
import { btoa } from "abab";

type LedRange = 0 | 1 | 2 | 3 | 4; // nose, left, middle, right and bottom led

enum MTL_OPCODE_HANDLERS
{
	nop = 0,
	frame_duration = 1,
	// set_color = 6,  # 'set_color', but commented
	set_led_color = 7,
	set_motor = 8,
	set_leds_color = 9, // # v16
	set_led_off = 10, // # v17
	set_led_palette = 14,
	//set_palette = 15,  # 'set_palette', but commented
	randmidi = 16,
	avance = 17,
	ifne = 18,  //# only used for taichi
	attend = 19,
	setmotordir = 20,  //# v16
}

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
	public async playMultipleAudio (audio: []) {
		return new Promise((resolve, reject) => {
			this.client.put(
				"/api/command",
				{
					sequence: `[{"audio":${JSON.stringify(audio)}}]`
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
			[
				0, MTL_OPCODE_HANDLERS.setmotordir, ear, dir,
				0, MTL_OPCODE_HANDLERS.avance, ear, stepsPos
			]
		);
		await this.sendChoreography(choreography);
	}
	public async setLED (led: LedRange, color: string) {
		if (!color) throw new Error("No color provided");
		const rgba = colorToRGBA(color);
		const choreography = String.fromCharCode.apply(
			null,
			[
				0, MTL_OPCODE_HANDLERS.set_led_color, led, rgba[0], rgba[1], rgba[2], 0, 0
			]
		);
		await this.sendChoreography(choreography);
	}
	public async blinkLED (led: LedRange, color: string) {
		if (!color) throw new Error("No color provided");
		const rgba = colorToRGBA(color);
		const choreography = String.fromCharCode.apply(
			null,
			[
				0, MTL_OPCODE_HANDLERS.frame_duration, 100,
				0, MTL_OPCODE_HANDLERS.set_led_color, led, rgba[0], rgba[1], rgba[2], 0, 0,
				15, MTL_OPCODE_HANDLERS.set_led_color, led, 0, 0, 0, 0, 0,
				15, MTL_OPCODE_HANDLERS.set_led_color, led, rgba[0], rgba[1], rgba[2], 0, 0,
				15, MTL_OPCODE_HANDLERS.set_led_color, led, 0, 0, 0, 0, 0,
				15, MTL_OPCODE_HANDLERS.set_led_color, led, rgba[0], rgba[1], rgba[2], 0, 0,
				15, MTL_OPCODE_HANDLERS.set_led_color, led, 0, 0, 0, 0, 0
			]
		);
		await this.sendChoreography(choreography);
	}
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colorToRGBA = require("color-rgba");
const abab_1 = require("abab");
var MTL_OPCODE_HANDLERS;
(function (MTL_OPCODE_HANDLERS) {
    MTL_OPCODE_HANDLERS[MTL_OPCODE_HANDLERS["nop"] = 0] = "nop";
    MTL_OPCODE_HANDLERS[MTL_OPCODE_HANDLERS["frame_duration"] = 1] = "frame_duration";
    // set_color = 6,  # 'set_color', but commented
    MTL_OPCODE_HANDLERS[MTL_OPCODE_HANDLERS["set_led_color"] = 7] = "set_led_color";
    MTL_OPCODE_HANDLERS[MTL_OPCODE_HANDLERS["set_motor"] = 8] = "set_motor";
    MTL_OPCODE_HANDLERS[MTL_OPCODE_HANDLERS["set_leds_color"] = 9] = "set_leds_color";
    MTL_OPCODE_HANDLERS[MTL_OPCODE_HANDLERS["set_led_off"] = 10] = "set_led_off";
    MTL_OPCODE_HANDLERS[MTL_OPCODE_HANDLERS["set_led_palette"] = 14] = "set_led_palette";
    //set_palette = 15,  # 'set_palette', but commented
    MTL_OPCODE_HANDLERS[MTL_OPCODE_HANDLERS["randmidi"] = 16] = "randmidi";
    MTL_OPCODE_HANDLERS[MTL_OPCODE_HANDLERS["avance"] = 17] = "avance";
    MTL_OPCODE_HANDLERS[MTL_OPCODE_HANDLERS["ifne"] = 18] = "ifne";
    MTL_OPCODE_HANDLERS[MTL_OPCODE_HANDLERS["attend"] = 19] = "attend";
    MTL_OPCODE_HANDLERS[MTL_OPCODE_HANDLERS["setmotordir"] = 20] = "setmotordir";
})(MTL_OPCODE_HANDLERS || (MTL_OPCODE_HANDLERS = {}));
class CommandService {
    constructor(client) {
        this.client = client;
    }
    async sendChoreography(choreography) {
        const base64 = abab_1.btoa(choreography);
        return new Promise((resolve, reject) => {
            this.client.put("/api/command", {
                sequence: `[{"choreography":"data:application/x-nabaztag-mtl-choreography;base64,${base64}"}]`
            })
                .then(resolve)
                .catch(reject);
        });
    }
    async playAudio(path) {
        return new Promise((resolve, reject) => {
            this.client.put("/api/command", {
                sequence: `[{"audio":"${path}"}]`
            })
                .then(resolve)
                .catch(reject);
        });
    }
    async playMultipleAudio(audio) {
        return new Promise((resolve, reject) => {
            this.client.put("/api/command", {
                sequence: `[{"audio":${JSON.stringify(audio)}}]`
            })
                .then(resolve)
                .catch(reject);
        });
    }
    async moveEar(ear, steps) {
        if (ear < -17 || ear > 17)
            throw new Error("Invalid steps provided");
        if (!steps)
            throw new Error("No steps provided");
        let stepsPos = steps;
        let dir = 0;
        if (steps < 0) {
            dir = 1;
            stepsPos = -steps;
        }
        const choreography = String.fromCharCode.apply(null, [
            0, MTL_OPCODE_HANDLERS.setmotordir, ear, dir,
            0, MTL_OPCODE_HANDLERS.avance, ear, stepsPos
        ]);
        await this.sendChoreography(choreography);
    }
    async setLED(led, color) {
        if (!color)
            throw new Error("No color provided");
        const rgba = colorToRGBA(color);
        const choreography = String.fromCharCode.apply(null, [
            0, MTL_OPCODE_HANDLERS.set_led_color, led, rgba[0], rgba[1], rgba[2], 0, 0
        ]);
        await this.sendChoreography(choreography);
    }
    async blinkLED(led, color) {
        if (!color)
            throw new Error("No color provided");
        const rgba = colorToRGBA(color);
        const choreography = String.fromCharCode.apply(null, [
            0, MTL_OPCODE_HANDLERS.frame_duration, 100,
            0, MTL_OPCODE_HANDLERS.set_led_color, led, rgba[0], rgba[1], rgba[2], 0, 0,
            15, MTL_OPCODE_HANDLERS.set_led_color, led, 0, 0, 0, 0, 0,
            15, MTL_OPCODE_HANDLERS.set_led_color, led, rgba[0], rgba[1], rgba[2], 0, 0,
            15, MTL_OPCODE_HANDLERS.set_led_color, led, 0, 0, 0, 0, 0,
            15, MTL_OPCODE_HANDLERS.set_led_color, led, rgba[0], rgba[1], rgba[2], 0, 0,
            15, MTL_OPCODE_HANDLERS.set_led_color, led, 0, 0, 0, 0, 0
        ]);
        await this.sendChoreography(choreography);
    }
}
exports.CommandService = CommandService;
//# sourceMappingURL=Command.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("./Client");
const services_1 = require("./services");
/**
 * Pynab API class
 */
class Pynab {
    constructor(baseUrl) {
        this.client = new Client_1.Client(baseUrl);
        this.Command = new services_1.CommandService(this.client);
        this.LEDS = services_1.LEDS;
        this.Mode = new services_1.ModeService(this.client);
        this.State = new services_1.StateService(this.client);
    }
}
exports.default = Pynab;
//# sourceMappingURL=index.js.map
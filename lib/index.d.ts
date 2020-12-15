import { Client } from "./Client";
import { CommandService, LEDS, ModeService, StateService } from "./services";
/**
 * Pynab API class
 */
export default class Pynab {
    client: Client;
    Command: CommandService;
    Mode: ModeService;
    State: StateService;
    LEDS: typeof LEDS;
    constructor(baseUrl: string);
}

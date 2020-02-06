import { Client } from "./Client";
import { CommandService, ModeService, StateService } from "./services";
/**
 * Pynab API class
 */
export default class Pynab {
    client: Client;
    Command: CommandService;
    Mode: ModeService;
    State: StateService;
    constructor(baseUrl: string);
}

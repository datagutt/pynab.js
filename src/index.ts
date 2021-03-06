import { Client } from "./Client";
import {
	CommandService,
	LEDS,
	ModeService,
	StateService
} from "./services";

/**
 * Pynab API class
 */
export default class Pynab {
	public client: Client;
	public Command: CommandService;
	public Mode: ModeService;
	public State: StateService;
	public LEDS: typeof LEDS;

	constructor(baseUrl: string) {
		this.client = new Client(baseUrl);
		this.Command = new CommandService(this.client);
		this.LEDS = LEDS;
		this.Mode = new ModeService(this.client);
		this.State = new StateService(this.client);
	}
}

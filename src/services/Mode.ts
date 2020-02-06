import { Client } from "../Client";

export class ModeService {
	constructor(private client: Client) { }
	public async sendMode(mode: string) {
		return new Promise((resolve, reject) => {
			this.client.put(
				"/api/mode",
				{
					mode
				}
			)
			.then(resolve)
			.catch(reject);
		});
	}
	public async setInteractive() {
		await this.sendMode("interactive");
	}
	public async setIdle() {
		await this.sendMode("idle");
	}
}

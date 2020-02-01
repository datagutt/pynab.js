import { Client } from '../Client';

//import { StateInterface } from '../interfaces/StateInterface';

export class StateService {
    constructor(private client: Client) { }
    public async getState(): Promise<Response> {
        return new Promise((resolve, reject) => {
            this.client.get(
                '/api/state'
            )
            .then(r => r.json())
            .then(resolve)
            .catch(reject);
        });
    }
}

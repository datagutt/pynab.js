import { Client } from "../Client";
export declare class StateService {
    private client;
    constructor(client: Client);
    getState(): Promise<Response>;
}

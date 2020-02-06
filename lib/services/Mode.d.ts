import { Client } from "../Client";
export declare class ModeService {
    private client;
    constructor(client: Client);
    sendMode(mode: string): Promise<unknown>;
    setInteractive(): Promise<void>;
    setIdle(): Promise<void>;
}

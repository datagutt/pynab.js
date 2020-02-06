import { Client } from "../Client";
declare type LedRange = 0 | 1 | 2 | 3;
export declare class CommandService {
    private client;
    constructor(client: Client);
    sendChoreography(choreography: string): Promise<unknown>;
    playAudio(path: string): Promise<unknown>;
    playMultipleAudio(audio: []): Promise<unknown>;
    moveEar(ear: number, steps: number): Promise<void>;
    setLED(led: LedRange, color: string): Promise<void>;
    blinkLED(led: LedRange, color: string): Promise<void>;
}
export {};

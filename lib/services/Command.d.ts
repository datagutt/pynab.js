import { Client } from "../Client";
export declare enum LEDS {
    BOTTOM = 0,
    RIGHT = 1,
    MIDDLE = 2,
    LEFT = 3,
    NOSE = 4
}
export declare class CommandService {
    private client;
    constructor(client: Client);
    sendChoreography(choreography: string): Promise<unknown>;
    playAudio(path: string): Promise<unknown>;
    playMultipleAudio(audio: []): Promise<unknown>;
    moveEar(ear: number, steps: number): Promise<void>;
    setLED(led: LEDS, color: string): Promise<void>;
    blinkLED(led: LEDS, color: string): Promise<void>;
}

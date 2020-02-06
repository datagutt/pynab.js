"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModeService {
    constructor(client) {
        this.client = client;
    }
    async sendMode(mode) {
        return new Promise((resolve, reject) => {
            this.client.put("/api/mode", {
                mode
            })
                .then(resolve)
                .catch(reject);
        });
    }
    async setInteractive() {
        await this.sendMode("interactive");
    }
    async setIdle() {
        await this.sendMode("idle");
    }
}
exports.ModeService = ModeService;
//# sourceMappingURL=Mode.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { StateInterface } from '../interfaces/StateInterface';
class StateService {
    constructor(client) {
        this.client = client;
    }
    async getState() {
        return new Promise((resolve, reject) => {
            this.client.get("/api/state")
                .then(r => r.json())
                .then(resolve)
                .catch(reject);
        });
    }
}
exports.StateService = StateService;
//# sourceMappingURL=State.js.map
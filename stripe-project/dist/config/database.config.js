"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_DATABASE = void 0;
const config_1 = require("@nestjs/config");
exports.CONFIG_DATABASE = 'database';
exports.default = (0, config_1.registerAs)(exports.CONFIG_DATABASE, () => ({
    users: {
        uri: process.env.DATABASE_URL,
    },
}));
//# sourceMappingURL=database.config.js.map
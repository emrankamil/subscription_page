"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process = require("process");
const configs = () => ({
    NODE_ENV: process.env.NODE_ENV || 'development',
    GLOBAL: {
        PORT: process.env.PORT || 3000,
    },
    STRIPE_CONFIG: {
        apiKey: process.env.STRIPE_API_KEY,
        webhookConfig: {
            requestBodyProperty: 'rawBody',
            stripeSecrets: {
                account: process.env.STRIPE_WEBHOOK_SECRET,
            },
        },
    },
});
exports.default = configs;
//# sourceMappingURL=config.js.map
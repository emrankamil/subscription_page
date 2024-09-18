declare const configs: () => {
    NODE_ENV: string;
    GLOBAL: {
        PORT: string | number;
    };
    STRIPE_CONFIG: {
        apiKey: string;
        webhookConfig: {
            requestBodyProperty: string;
            stripeSecrets: {
                account: string;
            };
        };
    };
};
export default configs;

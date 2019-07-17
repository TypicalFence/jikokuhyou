import privateConfig from "./config.private.js";
import diConfig from "./config.di";

const config = {
    port: 3000,
};

export default {
    ...config,
    ...privateConfig,
    ...diConfig,
};
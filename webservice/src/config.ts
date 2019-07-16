import { InjectionToken } from "@decorators/di";

export interface Config {
    otdsApiKey: string;
}

export const config = new InjectionToken("config");
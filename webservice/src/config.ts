import { InjectionToken } from "@decorators/di";
import { StationSerivce, TripService } from "jikokuhyou-service-interface";
import { Service } from "./service";


export interface OtdsConfig {
    otdsApiKey?: string;
}

export interface ServiceConfig {
    stationService: Service<StationSerivce>;
    tripService: Service<TripService>;
}

export interface Config extends OtdsConfig, ServiceConfig {
    port: number;
}

export const config = new InjectionToken("config");

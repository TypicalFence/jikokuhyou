import { InjectionToken } from "@decorators/di";
import {TripService} from "./service/tripService";
import {StationSerivce} from "./service/stationService";
import {Service} from "./service";


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
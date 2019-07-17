import { ServiceConfig } from "./src/config";
import { OpenDataStationService } from "./src/service/stationService";
import { OpenDataTripService } from "./src/service/tripService";

const config: ServiceConfig = {
    stationService: OpenDataStationService,
    tripService: OpenDataTripService,
};

export default config;
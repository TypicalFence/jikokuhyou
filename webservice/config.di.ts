import { ServiceConfig } from "./src/config";
import { OpenDataStationService } from "jikokuhyou-service-sbb-opendata";
// import { OtdsStationService } from "jikokuhyou-service-sbb-otds";
import { OpenDataTripService } from "jikokuhyou-service-sbb-opendata";

const config: ServiceConfig = {
    stationService: OpenDataStationService,
    tripService: OpenDataTripService,
};

export default config;

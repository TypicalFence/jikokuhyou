import { describe, it } from "mocha";
import { should } from "chai";
import { OpenDataStationService } from  "../../src/service/stationService";
import data from "./opendata.stations.json";

should();

const api = {
    getLocations: () => {
        return Promise.resolve(data.stations);
    }
};

describe("OpenDataStationService", () => {
    it("should search for Stations", async () => {
        const service = new OpenDataStationService(api);
        const stations = await service.searchStation("Bern");
        stations.length.should.be.equal(10);
        stations[0].getName().should.be.equal("Bern");
    });
});
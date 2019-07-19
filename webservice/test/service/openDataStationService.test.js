import { describe, it } from "mocha";
import { should } from "chai";
import nock from "nock";
import { OpenDataStationService } from  "../../src/service/stationService";
import data from "./opendata.stations.json";

should();

describe("OpenDataStationService", () => {
    it("searchStation", async () => {
        nock("http://transport.opendata.ch").get("/v1/locations?query=Bern").reply(200, data);
        const service = new OpenDataStationService();
        const stations = await service.searchStation("Bern");
        stations.length.should.be.equal(10);
        stations[0].getName().should.be.equal("Bern");
    });
});
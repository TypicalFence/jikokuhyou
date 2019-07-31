import { describe, it } from "mocha";
import { expect } from "chai";
import { fakeFetch } from "../fetch";
import data from "./stations.search.json";
import { StationApiService } from "../../src/service";

describe("StationApiService", () => {
    it("should find Stations", async () => {
        const client = new StationApiService();
        client.fetch = fakeFetch({ status: 200, body: data });
        const stations = await client.search("Bern");
        expect(stations[0].name).to.equal("Solothurn");
        expect(stations[1].name).to.equal("Solothurn West");
    });
});


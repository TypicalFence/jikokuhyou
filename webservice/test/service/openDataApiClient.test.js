import { describe, it } from "mocha";
import { expect } from "chai";
import { OpenDataApiClient } from "../../src/service/openDataApiClient";
import connectionData from "./opendata.connections.json";
import stationData from "./opendata.stations.json";
import { fakeFetch } from "../fetch";


describe("OpenDataApiClient", () => {
    it("should get Stations", async () => {
        const client = new OpenDataApiClient();
        client.fetch = fakeFetch({ status: 200, body: stationData });
        const stations = await client.getLocations("Bern");
        expect(stations[0].name).to.equal("Bern");
        expect(stations[1].name).to.equal("Bern, Bahnhof");
    });
    
    it("should get Connections", async () => {
        const client = new OpenDataApiClient();
        client.fetch = fakeFetch({ status: 200, body: connectionData });
        const response = await client.getConnections("Bern", "Zürich");
        const connection = response[0];
        expect(connection.from.station.name).to.equal("Bern");
        expect(connection.to.station.name).to.equal("Zürich HB");
    });
});
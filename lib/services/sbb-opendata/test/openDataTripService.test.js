import { describe, it } from "mocha";
import { expect } from "chai";
import { OpenDataTripService } from "../src/service";
import data from "./opendata.connections.json";

const api = {
    getConnections: () => Promise.resolve(data.connections),
};

describe("OpenDataTripService", () => {
    it("should find Trips", async () => {
        const service = new OpenDataTripService(api);
        const trips = await service.findTrips("Bern", "Zürich");
        const trip = trips[0];
        const products = trip.getProducts();
        expect(products).to.not.be.empty;
        expect(products[0]).to.equal("IC 1");
    });
});

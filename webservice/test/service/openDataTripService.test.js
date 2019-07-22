import { describe, it } from "mocha";
import { should } from "chai";
import { OpenDataTripService } from "../../src/service/tripService";
import data from "./opendata.connections.json";

should();

const api = {
    getConnections: () => {
        return Promise.resolve(data.connections);
    }
};

describe("OpenDataTripService", () => {
    it("should find Trips", async () => {
        const service = new OpenDataTripService(api);
        const trips = await service.findTrips("Bern", "Zürich");
        const trip = trips[0];
        const products = trip.getProducts();
        products.should.not.be.empty;
        products[0].should.equal("IC 1");
    });
});
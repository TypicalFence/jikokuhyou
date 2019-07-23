import { describe, it } from "mocha";
import { expect } from "chai";
import { fakeFetch } from "../fetch";
import data from "./trips.json";
import { TripApiService } from "../../src/service";

describe("TripApiService", () => {
    it("should find Trips", async () => {
        const client = new TripApiService();
        client.fetch = fakeFetch({ status: 200, body: data });
        const trips = await client.search("Bern", "Biel");
        const trip = trips[0];
        const products = trip.products;
        expect(products).not.be.empty;
        expect(products[0]).equal("RE");
    });
});
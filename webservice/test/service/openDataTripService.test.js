import { describe, it } from "mocha";
import { should } from "chai";
import nock from "nock";
import { OpenDataTripService, TripType } from "../../src/service/tripService";
import data from "./opendata.connections.json";

should();

describe("OpenDataStationService", () => {
    it("should generate the correct params with arrivial", async () => {
        const service = new OpenDataTripService;
        const params = service.handleTripOptions(new URLSearchParams(), {
            time: "11:02",
            date: "2019-08-01",
            arrivial: true, 
        });
        const query = decodeURIComponent(params.toString());
        query.should.equal("time=11:02&date=2019-08-01&isArrivalTime=1");
    });

    it("should generate the correct params with type", async () => {
        const service = new OpenDataTripService;
        const params = service.handleTripOptions(
            new URLSearchParams({from: "Bern", to: "Bümpliz Unterführung"}), 
            {
                type: [TripType.TRAM],
            }
        );

        const query = decodeURIComponent(params.toString());
        query.should.equal("from=Bern&to=Bümpliz+Unterführung&transportations[]=tram");
    });

    it("should generate the correct params with multiple types", async () => {
        const service = new OpenDataTripService;
        const params = service.handleTripOptions(
            new URLSearchParams({from: "Bern", to: "Bümpliz Unterführung"}), 
            {
                type: [TripType.TRAM, TripType.TRAIN],
            }
        );

        const query = decodeURIComponent(params.toString());
        query.should.equal("from=Bern&to=Bümpliz+Unterführung&transportations[]=tram&transportations[]=train");
    });

    it("should find Trips", async () => {
        nock("http://transport.opendata.ch")
            .get("/v1/connections?from=Bern&to=Z%C3%BCrich")
            .reply(200, data);
        const service = new OpenDataTripService();
        const trips = await service.findTrips("Bern", "Zürich");
        const trip = trips[0];
        const products = trip.getProducts();
        products.should.not.be.empty;
        products[0].should.equal("IC 1");
    });
});
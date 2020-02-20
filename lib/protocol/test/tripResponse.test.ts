import { describe, it } from "mocha";
import { expect } from "chai";
import * as Joi from "@hapi/joi";
import { 
    StopResponse, 
    TripResponse,
    tripResponseSchema,
    isTripResponse,
} from "../src";


const bern: StopResponse = {
    arrival: "2020-02-19T17:52:57",
    departure: null,
    station: {
        id: "8507000",
        name: "Bern",
        position: { x: 46.948814, y: 7.439123 }
    },
    delay: null,
    platform: "12",
};


describe("TripResponse", (): void => {
    it("can be validated using it's schema", (): void => {
        const validTrip: TripResponse = {
            from: bern,
            to: bern,
            duration: "12",
            products: ["S8"]
        };

        const validation = Joi.validate(validTrip, tripResponseSchema);
        expect(validation.error).to.equal(null);
    });

    it("should not be valid when the data is invalid", (): void => {
        const invalidTrip = {
            from: null,
            to: null,
        };

        const validation = Joi.validate(invalidTrip, tripResponseSchema);
        expect(validation.error).to.not.equal(null);
    });

    it("can be validated with the isTripResponse function", (): void => {
        const validTrip: TripResponse = {
            from: bern,
            to: bern,
            duration: "12",
            products: ["S8"]
        };

        expect(isTripResponse(validTrip)).to.equal(true);
    });

});

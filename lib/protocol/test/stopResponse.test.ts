import { describe, it } from "mocha";
import { expect } from "chai";
import * as Joi from "@hapi/joi";
import { 
    StopResponse, 
    stopResponseSchema, 
    isStopResponse 
} from "../src";

describe("StopResponse", (): void => {
    it("can be validated using it's schema", (): void => {
        const validStop: StopResponse = {
            arrival: 1564686120000,
            departure: null,
            station: {
                id: "8507000",
                name: "Bern",
                position: { x: 46.948814, y: 7.439123 }
            },
            delay: null,
            platform: "12",
        };

        const validation = Joi.validate(validStop, stopResponseSchema);
        expect(validation.error).to.equal(null);
    });

    it("should not be valid when the data is invalid", (): void => {
        const invalidStop = {
            arrival: "1564686120000",
            departure: null,
            station: {
                id: "8507000",
                name: "Bern",
            },
            delay: null,
        };

        const validation = Joi.validate(invalidStop, stopResponseSchema);
        expect(validation.error).to.not.equal(null);
    });

    it("can be validated with the isStopResponse function", (): void => {
        const validStop: StopResponse = {
            arrival: 1564686120000,
            departure: null,
            station: {
                id: "8507000",
                name: "Bern",
                position: { x: 46.948814, y: 7.439123 }
            },
            delay: null,
            platform: "12",
        };

        expect(isStopResponse(validStop)).to.equal(true);
    });

});

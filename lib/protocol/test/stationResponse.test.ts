import { describe, it } from "mocha";
import { expect } from "chai";
import * as Joi from "@hapi/joi";
import { 
    StationResponse, 
    stationResponseSchema, 
    isStationResponse 
} from "../src";

describe("StationResponse", (): void => {
    it("can be validated using it's schema", (): void => {
        const validStation: StationResponse = {
            id: "8507000",
            name: "Bern",
            position: { x: 46.948814, y: 7.439123 }
        };

        const validation = Joi.validate(validStation, stationResponseSchema);
        expect(validation.error).to.equal(null);
    });

    it("should not be valid when the data is invalid", (): void => {
        const invalidStation = {
            id: 8507000,
            position: { x: 46.948814, y: 7.439123 }
        };

        const validation = Joi.validate(invalidStation, stationResponseSchema);
        expect(validation.error).to.not.equal(null);
    });

    it("can be validated with the isStationResponse function", (): void => {
        const validStation = {
            id: "8507000",
            name: "Bern",
            position: { x: 46.948814, y: 7.439123 },
            type: "trainstation",
        };        

        expect(isStationResponse(validStation)).to.equal(true);
    });

});

import { describe, it } from "mocha";
import { expect } from "chai";
import * as Joi from "@hapi/joi";
import { Position, positionSchema, isPosition } from "../src";

describe("Position", (): void => {
    it("can be validated using it's schema", (): void => {
        const validPosition: Position = { x: 37.233333, y: -115.808333 };
        const validation = Joi.validate(validPosition, positionSchema);
        expect(validation.error).to.equal(null);
    });

    it("should not be valid when the data is invalid", (): void => {
        const inValidPosition = { x: "37.233333", y: -115.808333 };
        const validation = Joi.validate(inValidPosition, positionSchema);
        expect(validation.error).not.equal(null);
    });

    it("can be validated with the isPosition function", (): void => {
        const validPosition = { x: 37.233333, y: -115.808333 };
        expect(isPosition(validPosition)).to.equal(true);
    });
});

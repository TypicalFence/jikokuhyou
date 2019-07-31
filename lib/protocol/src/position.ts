import Joi from "@hapi/joi";

export interface Position {
    x: number;
    y: number;
}

export const positionSchema = Joi.object().keys({
    x: Joi.number().required(),
    y: Joi.number().required(),
}).strict();

// we explicitly what to accept any type for type checking purposes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPosition(obj: any): obj is Position {
    return Joi.validate(obj, positionSchema).error === null;
}
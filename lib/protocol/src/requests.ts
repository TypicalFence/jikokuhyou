import Joi from "@hapi/joi";

export interface TripRequest {
    from: string;
    to: string;
    via?: string;
    options?: TripRequestOptions;
}

export const TripRequestSchema = Joi.object().keys({
    from: Joi.string().min(3).required(),
    to: Joi.string().min(3).required(),
    via: Joi.string().min(3).optional(),
    options: Joi.string().optional(),
});

// we explicitly what to accept any type for type checking purposes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTripRequest(obj: any): obj is TripRequest {
    return Joi.validate(obj, TripRequestSchema).error === null;
}

export interface TripRequestOptions {
    Moment?: string;
    arrivial?: boolean;
    type?: string[];
}

export const TripRequestOptionsSchema = Joi.object().keys({
    moment: Joi.date().iso().optional(),
    arrival: Joi.boolean().optional(),
    type: Joi.string().optional(),
});


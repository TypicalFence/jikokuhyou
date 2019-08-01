import Joi from "@hapi/joi";
import { Position, positionSchema } from "./position";

// --------------------------------------------------------
// StationResponse
// --------------------------------------------------------
export interface StationResponse {
    id: string;
    name: string;
    position?: Position;
    type?: string;
}

export const stationResponseSchema = Joi.object().keys({
    id: Joi.string().min(1).required(),
    name: Joi.string().min(1).required(),
    position: positionSchema.optional(),
    type: Joi.string().optional(),
});

// we explicitly what to accept any type for type checking purposes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isStationResponse(obj: any): obj is StationResponse {
    return Joi.validate(obj, stationResponseSchema).error === null;
}

// --------------------------------------------------------
// StopResponse
// --------------------------------------------------------
export interface StopResponse {
    station: StationResponse;
    // epoch
    departure: number|null;
    arrival: number|null;
    delay: number|null;
    platform: string|null;
}

export const stopResponseSchema = Joi.object().keys({
    station: stationResponseSchema.required(),
    departure: Joi.number().required().allow(null),
    arrival: Joi.number().required().allow(null),
    delay: Joi.number().required().allow(null),
    platform: Joi.string().required().allow(null),
});

// we explicitly what to accept any type for type checking purposes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isStopResponse(obj: any): obj is StopResponse {
    return Joi.validate(obj, stopResponseSchema).error === null;
}

// --------------------------------------------------------
// TripResponse
// --------------------------------------------------------
export interface TripResponse {
    from: StopResponse;
    to: StopResponse;
    duration: string;
    products: string[];
}

export const tripResponseSchema = Joi.object().keys({
    from: stopResponseSchema.required(),
    to: stopResponseSchema.required(),
    duration: Joi.string().required(),
    products: Joi.array().items(Joi.string()).required(),
});

// we explicitly what to accept any type for type checking purposes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTripResponse(obj: any): obj is TripResponse {
    return Joi.validate(obj, tripResponseSchema).error === null;
}

// --------------------------------------------------------
// RideResponse
// --------------------------------------------------------
export interface RideResponse {
    product: string|null;
    stops: StopResponse[];
}

// --------------------------------------------------------
// JourneyResponse
// --------------------------------------------------------
export interface JourneyResponse {
    rides: RideResponse[];
}


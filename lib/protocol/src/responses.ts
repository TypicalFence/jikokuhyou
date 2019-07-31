import Joi from "@hapi/joi";
import { Position, positionSchema } from "./position";

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

export interface StopResponse {
    station: StationResponse;
    // epoch
    departure: number|null;
    arrival: number|null;
    delay: number|null;
    platform: string|null;
}

export interface TripResponse {
    from: StopResponse;
    to: StopResponse;
    duration: string;
    products: string[];
}

export interface RideResponse {
    product: string|null;
    stops: StopResponse[];
}

export interface JourneyResponse {
    rides: RideResponse[];
}

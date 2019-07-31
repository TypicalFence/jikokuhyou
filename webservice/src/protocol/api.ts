import { Position } from "../model/postion";

// Response's
export interface StationResponse {
    id: string;
    name: string;
    position?: Position;
    type?: string;
}

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



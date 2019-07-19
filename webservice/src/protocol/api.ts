import { Position } from "../model/postion";

export interface StationDTO {
    id: string;
    name: string;
    position?: Position;
    type?: string;
}

export interface StopDTO {
    station: StationDTO;
    // epoch
    departure: number|null;
    arrival: number|null;
    delay: number|null;
    platform: string|null;
}

export interface TripDTO {
    from: StopDTO;
    to: StopDTO;
    duration: string;
    products: string[];
}

export interface RideDTO {
    product: string|null;
    stops: StopDTO[];
}

export interface JourneyDTO {
    rides: RideDTO[];
}
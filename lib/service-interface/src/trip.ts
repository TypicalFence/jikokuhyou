import { StopResponse, TripResponse, RideResponse, JourneyResponse } from "jikokuhyou-protocol";
import { Station } from "./station";

export interface Stop {
    getStation(): Station;
    // should return a ISO8601
    getDeparture(): string|null;
    getArival(): string|null;
    getDelay(): number|null;
    getPlatform(): string|null;
    toJSON(): StopResponse;
}

export interface Trip {
    getFrom(): Stop;
    getTo(): Stop;
    getDuration(): string;
    getProducts(): string[];
    toJSON(): TripResponse;
}

export interface Ride {
    getProduct(): string|null;
    getStops(): Stop[];
    toJSON(): RideResponse;
}

export interface Journey {
    getRides(): Ride[];
    toJSON(): JourneyResponse;
}

export enum TripType {
    TRAIN = "train",
    TRAM = "tram",
    SHIP = "ship", 
    BUS = "bus", 
    CABLEWAY = "cableway"
}

export interface TripServiceOptions {
    moment?: Date;
    arrivial?: boolean;
    type?: TripType[];
}

export interface TripService {
    findTrips(from: string, to: string, options?: TripServiceOptions): Promise<Trip[]>;
    findTripsVia(from: string, to: string, via: string, options?: TripServiceOptions): Promise<Trip[]>;
}

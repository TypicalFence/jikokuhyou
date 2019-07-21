import { Trip } from "../../model/trip";

export enum TripType {
    TRAIN = "train",
    TRAM = "tram",
    SHIP = "ship", 
    BUS = "bus", 
    CABLEWAY = "cableway"
}

export interface TripServiceOptions {
    time?: string;
    date?: string;
    arrivial?: boolean;
    type?: TripType[];
}

export interface TripService {
    findTrips(from: string, to: string, options?: TripServiceOptions): Promise<Trip[]>;
    findTripsVia(from: string, to: string, via: string, options?: TripServiceOptions): Promise<Trip[]>;
}

export { OpenDataTripService } from "./opendata"; 
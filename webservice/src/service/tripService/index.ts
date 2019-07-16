import { Trip } from "../../model/trip";

export interface TripService {
    findTrips(from: string, to: string): Promise<Trip[]>;
}

export { OpenDataTripService } from "./opendata"; 
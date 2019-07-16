import { Injectable } from "@decorators/di";
import fetch from "node-fetch";
import { TripService } from ".";
import { OpenDataTripRecord } from "../../protocol";
import { OpenDataTrip, Trip } from "../../model/trip";


@Injectable()
export class OpenDataTripService implements TripService {

    private url: string = "http://transport.opendata.ch/v1/connections";

    private getURL(from: string, to: string): string {
        const params = new URLSearchParams({
            from,
            to,
        });
        
        return this.url + "?" + params.toString(); 
    }

    public async findTrips(from: string, to: string): Promise<Trip[]> {
        const response = await fetch(this.getURL(from, to));
        const data = await response.json();
        const connections = data.connections;
        return connections.map((x: OpenDataTripRecord) => new OpenDataTrip(x));
    }
}
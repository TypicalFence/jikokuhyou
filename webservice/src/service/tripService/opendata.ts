import { URLSearchParams } from "url";
import { Injectable } from "@decorators/di";
import fetch from "node-fetch";
import { TripService, TripServiceOptions } from ".";
import { OpenDataTripRecord } from "../../protocol";
import { OpenDataTrip, Trip } from "../../model/trip";


@Injectable()
export class OpenDataTripService implements TripService {
    
    private url: string = "http://transport.opendata.ch/v1/connections";

    private getURL(params: URLSearchParams): string {
        return this.url + "?" + params.toString(); 
    }

    private handleTripOptions(urlParams: URLSearchParams, options: TripServiceOptions): URLSearchParams {
        const params = new URLSearchParams(urlParams.toString());

        if (options.time) {
            params.append("time", options.time);
        }

        if (options.date) {
            params.append("date", options.date);
        }

        if (options.arrivial) {
            if (options.arrivial === true) {
                params.append("isArrivalTime", "1");
            }
        }

        if (options.type) {
            options.type.forEach((x: string) => {
                params.append("transportations[]", x);
            });
        }

        return params;
    }

    public async getData(params: URLSearchParams): Promise<Trip[]> {
        const response = await fetch(this.getURL(params));
        const data = await response.json();
        const connections = data.connections;
        return connections.map((x: OpenDataTripRecord) => new OpenDataTrip(x));
    }

    public findTrips(
        from: string, 
        to: string, 
        options?: TripServiceOptions
    ): Promise<Trip[]> {
        let params = new URLSearchParams({
            from,
            to,
        });

        if (options) {
            params = this.handleTripOptions(params, options);
        }

        return this.getData(params);
    }

    public async findTripsVia(
        from: string, 
        to: string, 
        via: string, 
        options?: TripServiceOptions
    ): Promise<Trip[]> {
        let params = new URLSearchParams({
            from,
            to,
            via,
        });
        
        if (options) {
            params = this.handleTripOptions(params, options);
        }

        return this.getData(params);
    }
}
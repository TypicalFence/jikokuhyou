import { Injectable, Optional, Inject, Container } from "@decorators/di";
import { Trip, TripService, TripServiceOptions } from "jikokuhyou-service-interface";
import { OpenDataConnectionRecord } from "../../protocol";
import { OpenDataTrip } from "../../model/trip";
import { OpenDataApi, OpenDataApiClient, ConnectionOptions } from "../openDataApiClient";


@Injectable()
export class OpenDataTripService implements TripService {
    
    private apiClient: OpenDataApi;

    public constructor(@Optional() @Inject("OpenApiClient") api?: OpenDataApi) {
        if (api) {
            this.apiClient = api;
        } else {
            this.apiClient = Container.get<OpenDataApi>(OpenDataApiClient);
        }
    }

    private convertOptions(options: TripServiceOptions): ConnectionOptions {
        const result: ConnectionOptions = {};

        if (options.time) {
            result.time = options.time;
        }

        if (options.date) {
            result.date = options.date;
        }

        if (options.arrivial) {
            result.isArrivalTime = options.arrivial; 
        }

        if (options.type) {
            result.transportations = options.type;
        }

        return result;
    }

    public async getData(from: string, to: string, options?: ConnectionOptions): Promise<Trip[]> {
        const  connections = await this.apiClient.getConnections(from, to, options);
        return connections.map((x: OpenDataConnectionRecord) => new OpenDataTrip(x));
    }

    public findTrips(
        from: string, 
        to: string, 
        options?: TripServiceOptions
    ): Promise<Trip[]> {
        let correctOptions = {};

        if (options) {
            correctOptions = this.convertOptions(options);
        }

        return this.getData(from, to, correctOptions);
    }

    public async findTripsVia(
        from: string, 
        to: string, 
        via: string, 
        options?: TripServiceOptions
    ): Promise<Trip[]> {
        let correctOptions = {};

        if (options) {
            correctOptions = this.convertOptions(options);
        }

        return this.getData(from, to, correctOptions);

    }
}

import {
    Station,
    StationSearchResult,
    StationSerivce,
    TripService,
    TripServiceOptions,
    Trip,
} from "jikokuhyou-service-interface";
import {
    Injectable,
    Inject,
    Container,
    Optional,
} from "@decorators/di";
import { OpenDataApiClient, OpenDataApi, ConnectionOptions } from "./openDataApiClient";
import { OpenDataStationRecord, OpenDataConnectionRecord } from "./protocol";
import { OpenDataStation, OpenDataTrip } from "./model";

type SearchStation = (Station & StationSearchResult);

@Injectable()
export class OpenDataStationService implements StationSerivce {
    private apiClient: OpenDataApi;

    public constructor(@Optional() @Inject("OpenApiClient") api?: OpenDataApi) {
        if (api) {
            this.apiClient = api;
        } else {
            this.apiClient = Container.get<OpenDataApi>(OpenDataApiClient);
        }
    }

    public async searchStation(searchTerm: string): Promise<SearchStation[]> {
        const data = await this.apiClient.getLocations(searchTerm);
        return data.map((x: OpenDataStationRecord) => new OpenDataStation(x));
    }
}

function convertOptions(options: TripServiceOptions): ConnectionOptions {
    const result: ConnectionOptions = {};
    const { moment } = options;

    if (moment) {
        result.date = `${moment.getFullYear()}-${moment.getMonth() + 1}-${moment.getDate()}`;
        result.time = `${moment.getHours()}:${moment.getMinutes().toLocaleString().padStart(2, "0")}`;
    }

    if (options.arrivial) {
        result.isArrivalTime = options.arrivial;
    }

    if (options.type) {
        result.transportations = options.type;
    }

    return result;
}


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

    public async getData(from: string, to: string, options?: ConnectionOptions): Promise<Trip[]> {
        const connections = await this.apiClient.getConnections(from, to, options);
        return connections.map((x: OpenDataConnectionRecord) => new OpenDataTrip(x));
    }

    public findTrips(
        from: string,
        to: string,
        options?: TripServiceOptions,
    ): Promise<Trip[]> {
        let correctOptions = {};

        if (options) {
            correctOptions = convertOptions(options);
        }

        return this.getData(from, to, correctOptions);
    }

    public async findTripsVia(
        from: string,
        to: string,
        via: string,
        options?: TripServiceOptions,
    ): Promise<Trip[]> {
        let correctOptions = {};

        if (options) {
            correctOptions = convertOptions(options);
        }

        correctOptions = { via, ...correctOptions };

        return this.getData(from, to, correctOptions);
    }
}

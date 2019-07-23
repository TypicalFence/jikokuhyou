import { URLSearchParams } from "url";
import fetch from "node-fetch";
import { 
    OpenDataStationRecord as Station, 
    OpenDataConnectionRecord as Connection, 
    OpenDataJourneyRecord as Journey,
} from "../protocol";
import { Injectable, Inject, InjectionToken, Optional } from "@decorators/di";

const openDataApiURL = "https://transport.opendata.ch";
const ApiUrl = new InjectionToken("OpenDataApiURL");

enum LocationType {
    ALL = "all",
    POI = "poi",
    STATION = "station",
    ADDRESS = "address",
}

interface LocationOptions {
    [key: string]: number | LocationType | undefined;
    x?: number;
    y?: number;
    type?: LocationType; 
}

interface LocationResponse {
    stations: Station[];
}

export interface ConnectionOptions {
    [key: string]: string | string[]| number | boolean | undefined;
    via?: string;
    date?: string;
    time?: string;
    isArrivalTime?: boolean;
    transportations?: string[];
    limit?: number;
    direct?: boolean;
    sleeper?: boolean;
    bike?: boolean;
    accessibility?: boolean;
}

interface ConnectionResponse {
    connections: Connection[];
}

export interface OpenDataApi { 
    getLocations(query: string, options?: LocationOptions): Promise<Station[]>;
    getConnections(from: string, to: string, options?: ConnectionOptions): Promise<Connection[]>;
    getStationBoard(station: string, options?: object): Promise<Journey[]>;
}

@Injectable()
export class OpenDataApiClient implements OpenDataApi {

    private url: string = openDataApiURL;
    private fetch = fetch;

    public constructor(@Optional() @Inject(ApiUrl) url: string) {
        // the DI will pass in null for the url when marked as optional
        // therefore we only want to overwrite the default when we get an actual value
        if (url != null) {
            this.url = url;
        }
    }

    private addOptionsToParams(options: LocationOptions | ConnectionOptions, params: URLSearchParams): void {
        for (let key in options) {
            const value = options[key];
            if (typeof value !== "undefined") {
                if (typeof value === "boolean") {
                    params.append(key, Number(value).toString());
                } else if (Array.isArray(value)) {
                    value.forEach((x: string) => {
                        params.append(key + "[]", x);
                    });
                } else {
                    params.append(key, value.toString());
                }
            }
        }
    }

    public async getLocations(query: string, options?: LocationOptions | undefined): Promise<Station[]> {
        const params = new URLSearchParams({query});

        if (options) {
            this.addOptionsToParams(options, params);
        }

        const url = this.url + "/v1/locations" + "?" + params.toString();

        try {
            const response = await this.fetch(url);
            const json: LocationResponse = await response.json();
            return json.stations;
        } catch {
            console.log("request failed: " + url);
            return [];
        }
    }    
    
    public async getConnections(from: string, to: string, options?: ConnectionOptions): Promise<Connection[]> {
        const params = new URLSearchParams({ from, to });

        if (options) {
            this.addOptionsToParams(options, params);
        }

        const url = this.url + "/v1/connections" + "?" + params.toString();

        try {
            const response = await this.fetch(url);
            const json: ConnectionResponse = await response.json();
            return json.connections;
        } catch {
            console.log("request failed: " + url);
            return [];
        }

    }
    
    public getStationBoard(station: string, options?: object | undefined): Promise<Journey[]> {
        throw new Error("Method not implemented.");
    }

}

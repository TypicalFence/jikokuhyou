import { URLSearchParams } from "url";
import fetch from "node-fetch";
import { 
    Station, 
    StationSearchResult, 
    OtdsStation, 
    OpenDataStation
} from "../model/station";
import { OpenDataStationRecord, OtdsStationRecord } from "../protocol";
import { Injectable, Inject, Container, Optional } from "@decorators/di";
import { OpenDataApiClient, OpenDataApi } from "./openDataApiClient";

type SearchStation = (Station & StationSearchResult);

export interface StationSerivce {
    searchStation(searchTerm: string, limit?: number|null): Promise<SearchStation[]>;
}

//opentransportdata.swiss
@Injectable()
export class OtdsStationService implements StationSerivce {
    private url: string = "https://opentransportdata.swiss/de/api/3/action/datastore_search";
    private resourceID: string = "b1a45b18-2a36-4582-a94d-71f2825e95e8";

    private getURL(query: string, limit: number|null): string {
        const params = new URLSearchParams({
            "resource_id": this.resourceID,
            "q": query,
        });
        
        if (limit) {
            params.append("limit", limit.toString());
        }

        return this.url + "?" + params.toString(); 
    }

    public async searchStation(searchTerm: string, limit: number|null = null): Promise<SearchStation[]> {
        const response = await fetch(this.getURL(searchTerm, limit));
        const data = await response.json();
        
        if (data.success) {
            const records: OtdsStationRecord[] = data.result.records;
            return records.map((x): OtdsStation => new OtdsStation(x));
        } else {
            throw new Error("oh no!");
        }
    }
}

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
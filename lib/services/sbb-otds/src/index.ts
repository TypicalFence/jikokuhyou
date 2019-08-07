import { StationResponse } from "jikokuhyou-protocol";
import {
    Station,
    StationSearchResult,
    StationSerivce,
} from "jikokuhyou-service-interface";
import {
    Injectable,
} from "@decorators/di";
import fetch from "node-fetch";

// opentransportdata.swiss
export interface OtdsStationRecord {
    Station: string;
    StationID: string;
    _id: number;
    // eslint-disable-next-line camelcase
    _full_count: string;
    rank: number;
}

export class OtdsStation implements Station, StationSearchResult {
    private data: OtdsStationRecord;

    public constructor(json: OtdsStationRecord) {
        this.data = json;
    }

    public toJSON(): StationResponse {
        return {
            id: this.getStationID(),
            name: this.getName(),
        };
    }

    public getName(): string {
        return this.data.Station;
    }

    public getStationID(): string {
        return this.data.StationID;
    }

    public getRank(): number {
        return this.data.rank;
    }
}

type SearchStation = (Station & StationSearchResult);

// opentransportdata.swiss
@Injectable()
export class OtdsStationService implements StationSerivce {
    private url: string = "https://opentransportdata.swiss/de/api/3/action/datastore_search";

    private resourceID: string = "b1a45b18-2a36-4582-a94d-71f2825e95e8";

    private getURL(query: string, limit: number|null): string {
        const params = new URLSearchParams({
            // eslint-disable-next-line @typescript-eslint/camelcase
            resource_id: this.resourceID,
            q: query,
        });

        if (limit) {
            params.append("limit", limit.toString());
        }

        return `${this.url}?${params.toString()}`;
    }

    // TODO test
    public async searchStation(searchTerm: string, limit: number|null = null): Promise<SearchStation[]> {
        const response = await fetch(this.getURL(searchTerm, limit));
        const data = await response.json();

        if (data.success) {
            const { records } = data.result;
            return records.map((x: OtdsStationRecord): OtdsStation => new OtdsStation(x));
        }
        throw new Error("oh no!");
    }
}

import { StationResponse } from "jikokuhyou-protocol";
import {
    Station,
    StationSerivce,
} from "jikokuhyou-service-interface";
import {
    Injectable,
} from "@decorators/di";
import fetch from "node-fetch";

interface TflSearchResponse {
    $type: string;
    query: string;
    total: number;
    matches: TflStationRecord[];
}

export interface TflStationRecord {
    $type: string;
    icsId: string;
    name: string;
    topMostParentId: string;
    modes: string[];
    zone: string;
    lat: number;
    lon: number;
}

export class TflStation implements Station {
    private data: TflStationRecord;

    public constructor(record: TflStationRecord) {
        this.data = record;
    }

    public getName(): string {
        return this.data.name;
    }

    public getStationID(): string {
        return this.data.icsId;
    }

    public toJSON(): StationResponse {
        const {
            name,
            icsId,
            modes,
            lat,
            lon,
        } = this.data;

        return {
            name,
            id: icsId,
            type: modes[0],
            position: { x: lat, y: lon },
        };
    }
}

@Injectable()
export class TflStationService implements StationSerivce {
    private url = "https://api.tfl.gov.uk/StopPoint/Search";

    public async searchStation(searchTerm: string, limit?: number | null): Promise<Station[]> {
        let url = `${this.url}/${searchTerm}`;

        if (typeof limit !== "undefined" && limit !== null) {
            url += `?maxResults=${limit}`;
        }

        const response = await fetch(url);
        const data: TflSearchResponse = await response.json();
        console.log(data);
        const stations = data.matches.map((x: TflStationRecord): TflStation => new TflStation(x));
        return stations;
    }
}

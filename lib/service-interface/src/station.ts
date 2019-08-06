import { StationResponse } from "jikokuhyou-protocol";

export interface Station {
    getName(): string;
    getStationID(): string;
    toJSON(): StationResponse;
}

export interface StationSearchResult {
    getRank(): number;
}

export interface Typed {
    getType(): string;
}

type SearchStation = (Station & StationSearchResult);

export interface StationSerivce {
    searchStation(searchTerm: string, limit?: number|null): Promise<SearchStation[]>;
}



export interface Station {
    getName(): string;
    getStationID(): string;
}

export interface StationSearchResult {
    getRank(): number;
}

//opentransportdata.swiss
export interface OtdsStationRecord {
    Station: string;
    StationID: string;
    _id: number;
    _full_count: string;
    rank: number;
}

export class OtdsStation implements Station, StationSearchResult {
   
    private data: OtdsStationRecord;

    public constructor(json: OtdsStationRecord) {
        this.data = json;
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
import { HasPosition, Position } from "./postion";
import { StationDTO, OpenDataStationRecord, OtdsStationRecord } from "../protocol";

export interface Station {
    getName(): string;
    getStationID(): string;
}

export interface StationSearchResult {
    getRank(): number;
}

export interface Typed {
    getType(): string;
}

//opentransportdata.swiss
export class OtdsStation implements Station, StationSearchResult {
   
    private data: OtdsStationRecord;

    public constructor(json: OtdsStationRecord) {
        this.data = json;
    }

    public toJSON(): StationDTO {
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

// transport.opendata.ch/
export class OpenDataStation implements Station, StationSearchResult, HasPosition, Typed {
   
    private name: string;
    private id: string;
    private position: Position;
    private type: string;
    private score: number;

    public constructor(data: OpenDataStationRecord) {
        this.name = data.name;
        this.id = data.id;
        const { x, y } = data.coordinate;
        this.position = { x, y };
        this.type = data.type;
        this.score = data.score;
    }

    public toJSON(): StationDTO {
        return {
            id: this.id,
            name: this.name,
            position: this.position,
            type: this.type,
        };
    }
    
    public getName(): string {
        return this.name;
    }    
    
    public getStationID(): string {
        return this.id;
    }

    public getRank(): number {
        return this.score;
    }

    public getX(): number {
        return this.position.x;
    }

    public getY(): number {
        return this.position.y;
    }
    
    public getType(): string {
        return this.type;
    }
}
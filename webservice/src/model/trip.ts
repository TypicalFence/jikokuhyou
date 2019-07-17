import { Station, OpenDataStation } from "./station";
import { OpenDataTripRecord, OpenDataStopRecord } from "../protocol";
import { StopDTO, TripDTO, JourneyDTO } from "../protocol/api";

export interface Stop {
    getStation(): Station;
    // epoch
    getDeparture(): number|null;
    getArival(): number|null;
    getDelay(): number|null;
    getPlatform(): string|null;
    toJSON(): StopDTO;
}

export interface Trip {
    getFrom(): Stop;
    getTo(): Stop;
    getDuration(): string;
    getProducts(): string[];
    toJSON(): TripDTO;
}

export interface Journey {
    getStops(): Stop[];
    toJSON(): JourneyDTO;
}

export class OpenDataStop implements Stop {
    private readonly arrival: number|null;
    private readonly departure: number|null;
    private readonly station: Station;
    private readonly delay: number|null;
    private readonly platform: string|null;

    public constructor(data: OpenDataStopRecord) {
        this.arrival = data.arrivalTimestamp;
        this.departure = data.departureTimestamp;
        this.station = new OpenDataStation(data.station);
        this.platform = data.platform;
        this.delay = data.delay; 
    }

    public toJSON(): StopDTO {
        return {
            arrival: this.arrival,
            departure: this.departure,
            delay: this.delay,
            station: this.station.toJSON(),
            platform: this.platform,
        };
    }

    public getStation(): Station {
        return this.station;
    }    
    
    public getDeparture(): number | null {
        return this.departure;
    }
    
    public getArival(): number | null {
        return this.arrival;
    }
    
    public getDelay(): number|null {
        return this.delay;
    }
    
    public getPlatform(): string|null {
        return this.platform;
    }
}

export class OpenDataTrip implements Trip, Journey {
    
    private readonly from: Stop;
    private readonly to: Stop;
    private readonly duration: string;
    private readonly products: string[];
    private readonly stops: Stop[];

    public constructor(data: OpenDataTripRecord) {
        this.from = new OpenDataStop(data.from);
        this.to = new OpenDataStop(data.to);
        this.duration = data.duration;
        this.products = data.products;
        this.stops = [];
        
        // TODO there are more sections when you have to change to another train
        if(data.sections[0].journey && data.sections[0].journey.passList.length > 0) {
            const passList = data.sections[0].journey.passList;
            this.stops = passList.map((x: OpenDataStopRecord) => new OpenDataStop(x));
        }
    }

    public toJSON(): (TripDTO & JourneyDTO) {
        return {
            from: this.from.toJSON(),
            to: this.to.toJSON(),
            duration: this.duration,
            products: this.products,
            stops: this.stops.map((x: Stop) => x.toJSON()),
        };
    }

    public getFrom(): Stop {
        return this.from;
    }    
    
    public getTo(): Stop {
        return this.to;
    }
    
    public getDuration(): string {
        return this.duration;
    }
    
    public getProducts(): string[] {
        return this.products;
    }
    
    public getStops(): Stop[] {
        return this.stops;
    }

}
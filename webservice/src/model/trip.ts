import { Station, OpenDataStation } from "./station";
import { OpenDataTripRecord, OpenDataStopRecord } from "../protocol/external/opendata";

export interface Stop {
    getStation(): Station;
    // epoch
    getDeparture(): number|null;
    getArival(): number|null;
    getDelay(): number|null;
    getPlatform(): string|null;
}

export interface Trip {
    getFrom(): Stop;
    getTo(): Stop;
    getDuration(): string;
    getProducts(): string[];
}

export interface Journey {
    getStops(): Stop[];
}

export class OpenDataStop implements Stop {
    private arrival: number|null;
    private departure: number|null;
    private station: Station;
    private delay: number|null;
    private platform: string|null;

    public constructor(data: OpenDataStopRecord) {
        this.arrival = data.arrivalTimestamp;
        this.departure = data.departureTimestamp;
        this.station = new OpenDataStation(data.station);
        this.platform = data.platform;
        this.delay = data.delay; 
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
    
    private from: Stop;
    private to: Stop;
    private duration: string;
    private products: string[];
    private stops: Stop[];

    public constructor(data: OpenDataTripRecord) {
        this.from = new OpenDataStop(data.from);
        this.to = new OpenDataStop(data.to);
        this.duration = data.duration;
        this.products = data.products;
        this.stops = [];
        
        if(data.sections[0].journey && data.sections[0].journey.passList.length > 0) {
            const passList = data.sections[0].journey.passList;
            this.stops = passList.map((x: OpenDataStopRecord) => new OpenDataStop(x));
        }
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
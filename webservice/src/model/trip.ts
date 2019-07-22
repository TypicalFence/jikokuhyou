import { Station, OpenDataStation } from "./station";
import { OpenDataConnectionRecord, OpenDataStopRecord, OpenDataSectionRecord } from "../protocol";
import { StopDTO, TripDTO, JourneyDTO, RideDTO } from "../protocol/api";

function convertTimestamp(timeStamp: string|null): number|null {
    if (timeStamp) {
        return new Date(timeStamp).getTime();
    }

    return null;
}

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

export interface Ride {
    getProduct(): string|null;
    getStops(): Stop[];
    toJSON(): RideDTO;
}

export interface Journey {
    getRides(): Ride[];
    toJSON(): JourneyDTO;
}

export class OpenDataRide implements Ride {
   
    private readonly stops: OpenDataStop[];
    // TODO properly map product
    private readonly product: string|null;

    public constructor(product: string|null, stops: OpenDataStop[]) {
        this.stops = stops;
        this.product = product;
    }

    public getProduct(): string|null {
        return this.product;
    }    
    
    public getStops(): Stop[] {
        return this.stops;
    }

    public toJSON(): RideDTO {
        return {
            product: this.product, 
            stops: this.stops.map((x): StopDTO => x.toJSON())
        };
    }
}

export class OpenDataStop implements Stop {
    private readonly arrival: number|null;
    private readonly departure: number|null;
    private readonly station: Station;
    private readonly delay: number|null;
    private readonly platform: string|null;

    public constructor(data: OpenDataStopRecord) {
        this.arrival = convertTimestamp(data.arrival); 
        this.departure = convertTimestamp(data.departure);
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
    private readonly rides: Ride[];

    public constructor(data: OpenDataConnectionRecord) {
        this.from = new OpenDataStop(data.from);
        this.to = new OpenDataStop(data.to);
        this.duration = data.duration;
        this.products = data.products;
        this.rides = [];
        
        data.sections.forEach((s: OpenDataSectionRecord) => {
            if (s.journey && s.journey.passList.length > 0) {
                const passList = s.journey.passList;
                const stops = passList.map((x: OpenDataStopRecord) => new OpenDataStop(x));
                this.rides.push(new OpenDataRide(s.journey.name, stops));
            }
        });
    }

    public toJSON(): (TripDTO & JourneyDTO) {
        return {
            from: this.from.toJSON(),
            to: this.to.toJSON(),
            duration: this.duration,
            products: this.products,
            rides: this.rides.map(x => x.toJSON()),
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
    
    public getRides(): Ride[] {
        return this.rides;
    }

}
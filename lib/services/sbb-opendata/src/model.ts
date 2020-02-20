import {
    StationResponse,
    RideResponse,
    TripResponse,
    StopResponse,
    Position,
    JourneyResponse,
} from "jikokuhyou-protocol";
import {
    Station,
    StationSearchResult,
    HasPosition,
    Typed,
    Stop,
    Ride,
    Trip,
    Journey,
} from "jikokuhyou-service-interface";
import {
    OpenDataStationRecord,
    OpenDataStopRecord,
    OpenDataConnectionRecord,
    OpenDataSectionRecord,
} from "./protocol";

export class OpenDataStation implements Station, StationSearchResult, HasPosition, Typed {
    private readonly name: string;

    private readonly id: string;

    private readonly position: Position;

    private readonly type: string;

    private readonly score: number;

    public constructor(data: OpenDataStationRecord) {
        this.name = data.name;
        this.id = data.id;
        const { x, y } = data.coordinate;
        this.position = { x, y };
        this.type = data.type;
        this.score = data.score;
    }

    public toJSON(): StationResponse {
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

    public toJSON(): RideResponse {
        return {
            product: this.product,
            stops: this.stops.map((x): StopResponse => x.toJSON()),
        };
    }
}

export class OpenDataStop implements Stop {
    private readonly arrival: string|null;

    private readonly departure: string|null;

    private readonly station: Station;

    private readonly delay: number|null;

    private readonly platform: string|null;

    public constructor(data: OpenDataStopRecord) {
        this.arrival = data.arrival;
        this.departure = data.departure;
        this.station = new OpenDataStation(data.station);
        this.platform = data.platform;
        this.delay = data.delay;
    }

    public toJSON(): StopResponse {
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

    public getDeparture(): string | null {
        return this.departure;
    }

    public getArival(): string | null {
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
                const { passList } = s.journey;
                const stops = passList.map((x: OpenDataStopRecord) => new OpenDataStop(x));
                this.rides.push(new OpenDataRide(s.journey.name, stops));
            }
        });
    }

    public toJSON(): (TripResponse & JourneyResponse) {
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

import {
    TripResponse,
    StationResponse,
    StopResponse,
    JourneyResponse,
    RideResponse,
    Position,
} from "sbb-webservice";

export class StationModel implements StationResponse {
    public id: string;

    public name: string;

    public position?: Position;

    public type?: string

    public constructor({
        id,
        name,
        position,
        type,
    }: StationResponse) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.type = type;
    }
}

export class StopModel implements StopResponse {
    public station: StationResponse;

    // epoch
    public departure: number|null;

    public arrival: number|null;

    public delay: number|null;

    public platform: string|null;

    public constructor({
        arrival,
        delay,
        departure,
        platform,
        station,
    }: StopResponse) {
        this.arrival = arrival;
        this.departure = departure;
        this.platform = platform;
        this.delay = delay;
        this.station = new StationModel(station);
    }
}

export class TripModel implements TripResponse, JourneyResponse {
    public from: StopResponse;

    public to: StopResponse;

    public duration: string;

    public products: string[];

    public rides: RideResponse[];

    public constructor({
        from,
        to,
        duration,
        products,
        rides,
    }: (TripResponse & JourneyResponse)) {
        this.from = from;
        this.to = to;
        this.duration = duration;
        this.products = products;
        this.rides = rides;
    }
}

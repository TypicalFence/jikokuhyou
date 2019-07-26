import {
    TripDTO,
    StationDTO,
    StopDTO,
    JourneyDTO,
    RideDTO,
    Position,
} from "sbb-webservice";

export class StationModel implements StationDTO {
    public id: string;

    public name: string;

    public position?: Position;

    public type?: string

    public constructor({
        id,
        name,
        position,
        type,
    }: StationDTO) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.type = type;
    }
}

export class StopModel implements StopDTO {
    public station: StationDTO;

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
    }: StopDTO) {
        this.arrival = arrival;
        this.departure = departure;
        this.platform = platform;
        this.delay = delay;
        this.station = new StationModel(station);
    }
}

export class TripModel implements TripDTO, JourneyDTO {
    public from: StopDTO;

    public to: StopDTO;

    public duration: string;

    public products: string[];

    public rides: RideDTO[];

    public constructor({
        from,
        to,
        duration,
        products,
        rides,
    }: (TripDTO & JourneyDTO)) {
        this.from = from;
        this.to = to;
        this.duration = duration;
        this.products = products;
        this.rides = rides;
    }
}

import fetch, { Headers } from "node-fetch";
import { Injectable, Inject } from "@decorators/di";
import { TripService } from ".";
import { Trip } from "../../model/trip";
import { config, Config } from "../../config";

class TriasTripRequest {
    private origin: string;
    private destination: string;
    private departure: Date;

    public constructor(origin: string, destination: string) {
        this.origin = origin;
        this.destination = destination;
        this.departure =  new Date(Date.now());
    }

    public toXML(): string {
        const xml = `
            <Trias 
                version="1.1" 
                xmlns="http://www.vdv.de/trias" 
                xmlns:siri="http://www.siri.org.uk/siri" 
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            >
                <ServiceRequest>
                    <siri:RequestTimestamp>2012-10-28T20:56:00Z</siri:RequestTimestamp>
                    <siri:RequestorRef>SEUS</siri:RequestorRef>
                    <RequestPayload>
                        <TripRequest>
                            <Origin>
                                <LocationRef>
                                    <StopPointRef>${this.origin}</StopPointRef>
                                </LocationRef>
                                <DepArrTime>${this.departure.toISOString()}</DepArrTime>
                            </Origin>
                            <Destination>
                                <LocationRef>
                                    <StopPointRef>${this.destination}</StopPointRef>
                                </LocationRef>
                            </Destination>
                            <Params>
                                <NumberOfResults>1</NumberOfResults>
                                <IncludeTrackSections>true</IncludeTrackSections>
                                <IncludeLegProjection>true</IncludeLegProjection>
                                <IncludeIntermediateStops>true</IncludeIntermediateStops>
                            </Params>
                        </TripRequest>
                    </RequestPayload>
                </ServiceRequest>
            </Trias>`;

        return xml;
    }
}

@Injectable()
export default class OtdsTripService implements TripService {
    
    private config: Config;

    private apiKey: string;
    private url = "https://api.opentransportdata.swiss/trias"

    public constructor(@Inject(config) conf: Config) {
        this.config = conf;
        this.apiKey = this.config.otdsApiKey || "";
    }

    public async findTrips(from: string, to: string): Promise<Trip[]> {
        // FIXME HTTP 400
        const req = new TriasTripRequest(from, to); 
        const response = await fetch(this.url, 
            { 
                headers: new Headers({ Authorization: this.apiKey }), 
                method: "POST", 
                body: req.toXML()
            }
        );
        console.log(response.text());
        throw new Error("oh no!");
    }

    // this service is currently broken anyway
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public findTripsVia(from: string, to: string, via: string): Promise<Trip[]> {
        throw new Error("method not implemented.");
    }
} 
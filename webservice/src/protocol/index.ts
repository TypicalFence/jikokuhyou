export interface ApiResponse {
    status: number;
    msg?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
}

export class ApiResponseBuilder implements ApiResponse {
    public status: number;
    public msg?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public data?: any;

    public constructor(status: number) {
        this.status = status;
    }

    public withMSG(msg: string): this {
        this.msg = msg;
        return this;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public withData(data: any): this {
        this.data = data;
        return this;
    }
}

export { StationDTO, TripDTO } from "./api";

// external
export { 
    OpenDataStationRecord,
    OpenDataStopRecord,
    OpenDataConnectionRecord,
    OpenDataJourneyRecord,
    OpenDataSectionRecord,
} from "./external/opendata";
export { OtdsStationRecord } from "./external/otds";

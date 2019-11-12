import { TripRequestOptions } from "jikokuhyou-protocol";
import { TripServiceOptions, TripType } from "jikokuhyou-service-interface";


export class TripRequestOptionsAdapter implements TripServiceOptions {
    
    public time?: string;
    public date?: string;
    public arrivial?: boolean;
    public type?: TripType[];

    public constructor(options: TripRequestOptions) {
        const { moment, arrivial, type  } = options;

        if (typeof moment !== "undefined") {
            const date = new Date(moment);
            
            this.date = `${date.getFullYear() }-${date.getMonth()}-${date.getDay()}`;

            if (moment.includes("T")) {
                this.time = `${date.getHours()}:${date.getMinutes()}`;
            }
        }

        if (typeof moment !== "undefined") {
            this.arrivial = arrivial;
        }
       
        if (typeof type !== "undefined") {
            this.type = type.map((x: string) => {
                if (x === TripType.BUS) {
                    return TripType.BUS;
                }

                if (x === TripType.CABLEWAY) {
                    return TripType.CABLEWAY;
                }

                if (x === TripType.SHIP) {
                    return TripType.SHIP;
                }

                if (x === TripType.TRAIN) {
                    return TripType.TRAIN;
                }

                if (x === TripType.TRAM) {
                    return TripType.TRAM;
                }

                return null;
            }).filter((x: TripType|null): x is TripType => x !== null);
        }
    }
}

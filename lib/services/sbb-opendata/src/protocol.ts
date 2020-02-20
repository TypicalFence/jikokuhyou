// transport.opendata.ch/
export interface OpenDataStationRecord {
    id: string;
    name: string;
    score: number;
    coordinate: {
        type: string;
        x: number;
        y: number;
    };
    distance: number;
    type: string;
}

export interface OpenDataJourneyRecord {
    name: string|null;
    category: string|null;
    number: string|null;
    subcategory: string|null;
    categoryCode: string|null;
    operator: string|null;
    to: string|null;
    passList: OpenDataStopRecord[];
    capacity1st: string|null;
    capacity2nd: string|null;
}

export interface OpenDataStopRecord {
    station: OpenDataStationRecord;
    // ISO8601
    arrival: string|null;
    // cursed timestamp, probably relative to current month
    arrivalTimestamp: number|null;
    // ISO8601
    departure: string|null;
    // cursed timestamp, see above
    departureTimestamp: number|null;
    delay: number|null;
    platform: string|null;
    // prognosis: any
    // service: any
}

export interface OpenDataSectionRecord {
    journey: OpenDataJourneyRecord|null;
    walk: string|null;
    departure: OpenDataStopRecord;
    arrival: OpenDataStopRecord;
}

export interface OpenDataConnectionRecord {
    from: OpenDataStopRecord;
    to: OpenDataStopRecord;
    duration: string;
    products: string[];
    capacity1st: number|null;
    capacity2nd: number|null;
    sections: OpenDataSectionRecord[];
}

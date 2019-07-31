import React from "react";
import { TripResponse, StopResponse } from "sbb-webservice";

interface ResultProps {
    trips: TripResponse[];
}

function getTime(timeStamp: number|null): string {
    if (timeStamp) {
        const date = new Date(timeStamp);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${hours}:${minutes}`;
    }

    return "";
}

const TripResults = ({ trips }: ResultProps): JSX.Element => {
    const renderPlatform = (stop: StopResponse): string => `${stop.station.name} - Gl. ${stop.platform}`;

    const content = trips.map((t: TripResponse): JSX.Element => (
        <div className="columns">
            <div className="column is-2">
                <span className="icon">
                    <i className="fas fa-train" />
                </span>
                {t.products[0]}
            </div>
            <div className="column is-2">{`${getTime(t.from.departure)} -> ${getTime(t.to.arrival)}`}</div>
            <div className="column is-4">{`${renderPlatform(t.from)} -> ${renderPlatform(t.to)}`}</div>
            <div className="column is-2">{t.duration}</div>
        </div>
    ));

    return (
        <div className="results">
            {content}
        </div>
    );
};

export default TripResults;

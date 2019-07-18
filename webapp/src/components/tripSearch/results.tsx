import React from "react";
import { TripDTO } from "sbb-webservice";

interface ResultProps {
    trips: TripDTO[];
}

const Results = ({ trips }: ResultProps) => {
    const content = trips.map((t: TripDTO) => (
        <p>
            <span>{t.products[0]}</span>
            {" "}
            {t.from.station.name}
            {" "}
-
            {" "}
            {t.from.platform}
        </p>
    ));

    return (
        <div className="results">
            {content}
        </div>
    );
};

export default Results;

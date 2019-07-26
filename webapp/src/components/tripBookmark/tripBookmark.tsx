import React from "react";
import PropTypes from "prop-types";
import Icon from "../icon";
import "./tripBookmark.scss";

export enum TripBookmarkTypes {
    TRAIN = "train",
    TRAM = "tram",
    BUS = "bus",
    BOAT = "boat",
}

export interface TripBookmarkModel {
    product: string;
    from: string;
    to: string;
}

interface TripBookmarkProps {
    type: TripBookmarkTypes;
    trip: TripBookmarkModel;
}

export const TripBookmark = (props: TripBookmarkProps): JSX.Element => {
    const { type, trip } = props;

    let icon;

    switch (type) {
        case TripBookmarkTypes.TRAIN:
            icon = "fa-train";
            break;
        case TripBookmarkTypes.TRAM:
            icon = "fa-tram";
            break;
        case TripBookmarkTypes.BUS:
            icon = "fa-bus";
            break;
        case TripBookmarkTypes.BOAT:
            icon = "fa-ship";
            break;
        default:
            icon = "fa-transgender-alt";
    }

    return (
        <div className="trip-bookmark">
            <p>{trip.product}</p>
            <Icon name={icon} />
            <p>{trip.from}</p>
            <p>{trip.to}</p>
        </div>
    );
};

TripBookmark.propTypes = {
    type: PropTypes.string,
    trip: PropTypes.shape({
        product: PropTypes.string,
        from: PropTypes.string,
        to: PropTypes.string,
    }).isRequired,
};

TripBookmark.defaultProps = {
    type: "",
};

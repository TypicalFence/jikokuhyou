import React from "react";
import PropTypes from "prop-types";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { TripModel } from "../../model";
import TripSearchResults from "./tripSearchResults";
import { TripBookmark, TripBookmarkTypes, TripBookmarkModel } from "../tripBookmark";
import Loader from "../loader";

interface BodyProps {
    trips: TripModel[] | null;
    loading: boolean;
}

const bookmarkData: TripBookmarkModel[] = [
    { product: "IC 1", from: "Genève-Aéroport", to: "St.Gallen" },
    { product: "IC 2", from: "Zürich HB", to: "Lugano" },
    { product: "IC 3", from: "Basel SBB", to: "Chur" },
    { product: "IR 16", from: "Bern", to: "Zürich HB" },
    { product: "RE", from: "Zürich HB", to: "Schaffhausen" },
    { product: "S8", from: "Bern", to: "Solothurn" },
];

const TripSearchBody = ({ trips, loading }: BodyProps): JSX.Element => {
    if (loading) {
        return <Loader className="loader" width={80} height={80} color="#000000" />;
    }

    if (trips) {
        return <TripSearchResults trips={trips} />;
    }

    const bookmarks = bookmarkData.map(
        (x, i): JSX.Element => (
            <Slide index={i}>
                <TripBookmark trip={x} type={TripBookmarkTypes.TRAIN} />
            </Slide>
        ),
    );

    return (
        <div className="trip-bookmark-container">
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={100}
                totalSlides={bookmarkData.length}
                visibleSlides={5}
            >
                <Slider>
                    {bookmarks}
                </Slider>
            </CarouselProvider>
        </div>
    );
};

TripSearchBody.propTypes = {
    trips: PropTypes.arrayOf(PropTypes.instanceOf(TripModel)),
    loading: PropTypes.bool.isRequired,
};

TripSearchBody.defaultProps = {
    trips: null,
};

export default TripSearchBody;

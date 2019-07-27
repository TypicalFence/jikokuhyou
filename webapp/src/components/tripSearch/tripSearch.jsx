import React from "react";
import "./index.scss";
import { TripApiService, StationApiService } from "../../service";
import TripSearchBody from "./tripsSearchBody";
import TripSearchForm from "../tripSearchForm";

export default class TripSearch extends React.Component {
    constructor(props) {
        super(props);
        this.tripService = new TripApiService();
        this.stationService = new StationApiService();

        this.state = {
            formValue: null,
            results: null,
            suggestions: [],
            loading: false,
        };
    }

    onFormChange(value) {
        const state = { ...this.state };
        state.formValue = value;
        this.setState(state);
    }

    async onSearchClick() {
        const state = { ...this.state };
        state.loading = true;

        this.setState(state, async () => {
            const { formValue } = this.state;
            const { from, to } = formValue;
            const results = await this.tripService.search(from, to);

            state.results = results;
            state.loading = false;
            this.setState(state);
        });
    }

    render() {
        const {
            results,
            loading,
        } = this.state;

        return (
            <div className="box trip-search">
                <TripSearchForm
                    stationApi={this.stationService}
                    onChange={this.onFormChange.bind(this)}
                />
                <button
                    onClick={this.onSearchClick.bind(this)}
                    type="button"
                    className="button is-large is-fullwidth is-outlined is-info"
                >
                    Search
                </button>
                <hr />
                <TripSearchBody loading={loading} trips={results} />
            </div>
        );
    }
}

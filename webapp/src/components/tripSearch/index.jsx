import React from "react";
import "./index.scss";
import { TripApiService, StationApiService } from "../../service";
import Results from "./results";
import SearchField from "./stationSearchField";


export default class TripSearch extends React.Component {
    constructor(props) {
        super(props);
        this.tripService = new TripApiService();
        this.stationService = new StationApiService();

        this.state = {
            from: "",
            to: "",
            results: [],
            suggestions: [],
        };
    }

    onSearchFieldChange(name) {
        return (event, { value, id }) => {
            const state = { ...this.state };

            if (id !== null) {
                state[name] = id;
            } else {
                state[name] = value;
            }
            this.setState(state);
        };
    }

    async onSearchClick() {
        const { from, to } = this.state;
        const results = await this.tripService.search(from, to);

        const state = { ...this.state };
        state.results = results;
        this.setState(state);
    }

    render() {
        const {
            results,
        } = this.state;

        return (
            <div className="box trip-search">
                <div className="level">
                    <div className="level-left">
                        <SearchField api={new StationApiService()} onChange={this.onSearchFieldChange("from").bind(this)} />
                    </div>

                    <div className="level-right">
                        <SearchField api={new StationApiService()} onChange={this.onSearchFieldChange("to").bind(this)} />
                    </div>
                </div>
                <button
                    onClick={this.onSearchClick.bind(this)}
                    type="button"
                    className="button is-large is-fullwidth is-outlined is-info"
                >
                    Search
                </button>
                <hr />
                <Results trips={results} />
            </div>
        );
    }
}

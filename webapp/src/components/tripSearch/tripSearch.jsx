import React from "react";
import "./index.scss";
import { TripApiService, StationApiService } from "../../service";
import TripSearchBody from "./tripsSearchBody";
import SearchField from "../stationSearchField";
import Expander from "../expander";


export default class TripSearch extends React.Component {
    constructor(props) {
        super(props);
        this.tripService = new TripApiService();
        this.stationService = new StationApiService();

        this.state = {
            from: "",
            to: "",
            results: null,
            suggestions: [],
            loading: false,
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
        const state = { ...this.state };
        state.loading = true;

        this.setState(state, async () => {
            const { from, to } = this.state;
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
                <div className="level">
                    <div className="level-left">
                        <SearchField
                            placeholder="from"
                            api={new StationApiService()}
                            onChange={this.onSearchFieldChange("from").bind(this)}
                        />
                    </div>
                    <div className="level-right">
                        <SearchField
                            placeholder="from"
                            api={new StationApiService()}
                            onChange={this.onSearchFieldChange("to").bind(this)}
                        />
                    </div>
                </div>
                <Expander maxHeight="3rem">
                    <h1>Hello</h1>
                </Expander>

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

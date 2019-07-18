import React from "react";
import "./index.scss";
import { TripApiService } from "../../service";
import Results from "./results";

export default class TripSearch extends React.Component {
    constructor(props) {
        super(props);
        this.tripService = new TripApiService();

        this.state = {
            from: "",
            to: "",
            results: [],
        };
    }

    onTextChange(name) {
        return (event) => {
            const state = { ...this.state };
            state[name] = event.currentTarget.value;
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
        const { from, to, results } = this.state;

        return (
            <div className="box trip-search">
                <div className="level">
                    <div className="level-left">
                        <input
                            className="input"
                            type="text"
                            value={from}
                            placeholder="from"
                            onChange={this.onTextChange("from").bind(this)}
                        />
                    </div>

                    <div className="level-right">
                        <input
                            className="input level-item"
                            type="text"
                            value={to}
                            placeholder="to"
                            onChange={this.onTextChange("to").bind(this)}
                        />
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

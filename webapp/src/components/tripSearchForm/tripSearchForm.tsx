import React from "react";
import SearchField from "../stationSearchField";
import Expander from "../expander";
import { StationApiService } from "../../service";

export interface TripSearchFormValue {
    from: string;
    to: string;
}

interface Props {
    stationApi: StationApiService;
    onChange: (value: TripSearchFormValue) => void;
}

interface State {
    [index: string]: string;
    from: string;
    to: string;
}

interface OnChangeArgs {
    value: string;
    id: string;
}

type onChangeHandler = (
    event: Event,
    { value, id }: OnChangeArgs
) => void;

export default class TripSearchForm extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            from: "",
            to: "",
        };
    }

    public onSearchFieldChange(name: string): onChangeHandler {
        return (event: Event, { value, id }: OnChangeArgs): void => {
            const state = { ...this.state };

            if (id !== null) {
                state[name] = id;
            } else {
                state[name] = value;
            }

            this.setState(state, (): void => {
                const { onChange } = this.props;
                onChange(this.state);
            });
        };
    }

    public render(): JSX.Element {
        const { stationApi } = this.props;

        return (
            <div className="trip-search-form">

                <div className="level">
                    <div className="level-left">
                        <SearchField
                            placeholder="from"
                            api={stationApi}
                            onChange={this.onSearchFieldChange("from").bind(this)}
                        />
                    </div>
                    <div className="level-right">
                        <SearchField
                            placeholder="to"
                            api={new StationApiService()}
                            onChange={this.onSearchFieldChange("to").bind(this)}
                        />
                    </div>
                </div>
                <Expander maxHeight="10rem">
                    <div className="level">
                        <div className="level-left">

                            <SearchField
                                placeholder="via"
                                api={new StationApiService()}
                                onChange={this.onSearchFieldChange("to").bind(this)}
                            />


                        </div>
                        <div className="level-right">
                            <input type="checkbox" />
                            <input type="date" />
                            <input type="time" />
                        </div>
                    </div>
                </Expander>
            </div>
        );
    }
}

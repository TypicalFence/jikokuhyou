import React from "react";
import TimeField from "react-simple-timefield";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import momentjs, { Moment } from "moment";
import SearchField from "../stationSearchField";
import Expander from "../expander";
import { StationApiService } from "../../service";
import "./tripSearchForm.scss";

export interface TripSearchFormValue {
    from: string;
    to: string;
    via: string;
    epoch: number;
}

interface Props {
    stationApi: StationApiService;
    onChange: (value: TripSearchFormValue) => void;
}

interface State {
    from: string;
    to: string;
    via: string;
    arrival: boolean;
    time: string;
    moment: Moment;
    dateFocused: boolean;
}

interface OnChangeArgs {
    value: string;
    id: string;
}

type onChangeHandler = (
    event: Event,
    { value, id }: OnChangeArgs
) => void;

function getCurrentTime(): string {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
}

export default class TripSearchForm extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            from: "",
            to: "",
            via: "",
            time: getCurrentTime(),
            moment: momentjs(),
            dateFocused: false,
            arrival: false,
        };
    }

    private onSearchFieldChange(name: string): onChangeHandler {
        return (event: Event, { value, id }: OnChangeArgs): void => {
            const state = { ...this.state };

            if (id !== null) {
                // this is just insanity!
                // @ts-ignore
                state[name] = id;
            } else {
                // @ts-ignore
                state[name] = value;
            }

            this.setState(state, (): void => {
                const { onChange } = this.props;
                onChange(this.getFormValue());
            });
        };
    }

    private onArrivialChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ arrival: event.currentTarget.checked }, (): void => {
            const { onChange } = this.props;
            onChange(this.getFormValue());
        });
    }

    private onTimeChange(time: string): void {
        const state = { ...this.state };
        state.time = time;
        this.setState(state, (): void => {
            const { onChange } = this.props;
            onChange(this.getFormValue());
        });
    }

    private onDateFocusChange({ focused }: {focused: boolean}): void {
        this.setState({ dateFocused: focused });
    }

    private onDateChange(date: Moment): void {
        this.setState({ moment: date }, (): void => {
            const { onChange } = this.props;
            onChange(this.getFormValue());
        });
    }


    private getFormValue() {
        const {
            to,
            from,
            via,
            moment,
            time,
            arrival,
        } = this.state;

        const isoStampOfDate = moment.format();
        const splitTime = time.split(":");

        const date = new Date(isoStampOfDate);
        date.setHours(Number(splitTime[0]), Number(splitTime[1]));

        return {
            to,
            from,
            via,
            arrival,
            epoch: (date.getTime() / 1000),
        };
    }


    public render(): JSX.Element {
        const { stationApi } = this.props;
        const {
            time, moment, dateFocused, arrival,
        } = this.state;

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
                                onChange={this.onSearchFieldChange("via").bind(this)}
                            />


                        </div>
                        <div className="level-right">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={arrival}
                                    onChange={this.onArrivialChange.bind(this)}
                                />
                                arrival
                            </label>
                            <SingleDatePicker
                                date={moment}
                                onDateChange={this.onDateChange.bind(this)}
                                focused={dateFocused}
                                onFocusChange={this.onDateFocusChange.bind(this)}
                                id="why?"
                            />
                            <TimeField value={time} onChange={this.onTimeChange.bind(this)} />
                        </div>
                    </div>
                </Expander>
            </div>
        );
    }
}

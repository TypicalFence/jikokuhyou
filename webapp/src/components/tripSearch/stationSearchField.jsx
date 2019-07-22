
import React, { Component } from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import { StationApiService } from "../../service";

const theme = {
    container: {
        position: "relative",
    },
    suggestionsContainer: {
        display: "none",
    },
    suggestionsContainerOpen: {
        display: "block",
        position: "absolute",
        width: "100%",
        border: "1px solid #aaa",
        backgroundColor: "#fff",
        fontWeight: 300,
        fontSize: 16,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        zIndex: 500,
        color: "black",
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: "none",
    },
    suggestion: {
        cursor: "pointer",
        padding: "10px 20px",
    },
    suggestionHighlighted: {
        backgroundColor: "#ddd",
    },
};

const renderSuggestion = x => (<div>{x.name}</div>);
const getSuggestionValue = x => x;

export default class StationSearchField extends Component {
    constructor(props) {
        super(props);
        this.state = { suggestions: [], value: "", id: null };
    }

    onSuggestionsFetchRequested({ value }) {
        const { api } = this.props;

        api.search(value).then((data) => {
            const suggestions = data;
            const state = { ...this.state };
            state.suggestions = suggestions;
            this.setState(state);
        });
    }

    onSuggestionsClearRequested() {
        this.setState({ suggestions: [] });
    }

    render() {
        const { value, suggestions } = this.state;
        const { onChange } = this.props;
        const inputProps = {
            className: "input",
            placeholder: "Begriff",
            value,
            onChange: (event, { newValue }) => {
                // new value must be manual input
                if (typeof newValue === "string") {
                    this.setState({
                        value: newValue,
                        id: null,
                    }, () => {
                        onChange(event, { ...this.state });
                    });
                } else if (typeof newValue === "object") {
                    const { id, name } = newValue;
                    this.setState({
                        value: name,
                        id,
                    }, () => {
                        onChange(event, { ...this.state });
                    });
                }
            },
        };

        const fetchHandler = this.onSuggestionsFetchRequested.bind(this);
        const clearHandler = this.onSuggestionsClearRequested.bind(this);

        return (
            <div className="field has-addons searchfield">
                <div className="control">
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={fetchHandler}
                        onSuggestionsClearRequested={clearHandler}
                        renderSuggestion={renderSuggestion}
                        getSuggestionValue={getSuggestionValue}
                        inputProps={inputProps}
                        theme={theme}
                    />
                </div>
            </div>
        );
    }
}


StationSearchField.propTypes = {
    api: PropTypes.instanceOf(StationApiService).isRequired,
    onChange: PropTypes.func.isRequired,
};

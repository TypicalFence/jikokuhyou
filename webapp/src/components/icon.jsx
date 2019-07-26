import React from "react";
import PropTypes from "prop-types";

const Icon = ({ name }) => (
    <span className="icon">
        <i className={`fas ${name}`} />
    </span>
);

Icon.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Icon;

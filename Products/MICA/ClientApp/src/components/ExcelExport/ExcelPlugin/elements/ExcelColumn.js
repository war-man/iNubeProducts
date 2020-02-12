import React from "react";
import PropTypes from "prop-types";

 class ExcelColumn extends React.Component {
    static propsTypes = {
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.bool,
            PropTypes.string,
            PropTypes.func
        ]).isRequired
    };

    render() {
        return null;
    }
}
export default ExcelColumn;
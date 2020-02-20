import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer.jsx";

import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import customStyles from "assets/jss/material-dashboard-pro-react/views/customStyles.jsx";

const style = {
    ...customStyles,
    ...dashboardStyle
};

class Notifications extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
               

            </GridContainer>
        );
    }
}
export default withStyles(style)(Notifications);
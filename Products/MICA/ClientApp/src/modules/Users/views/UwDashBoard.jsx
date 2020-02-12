import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import PerformanceInitiator from "./Dashboard/_PerformanceInitiator.jsx";
import UwAlerts from "./Dashboard/_UwAlert.jsx";
import PolicyDash from "./Dashboard/_UwPolicyDashboard.jsx";
import CDAccountDashboard from "assets/img/security.png";
import SalesSummary from "./Dashboard/_SalesSummary.jsx";
import {Animated} from "react-animated-css";

import CDAccount from "assets/img/security.png";
import product from "assets/img/product.png";
import policy from "assets/img/policy.png";
import claim from "assets/img/claim.png";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import Dashboard from "./Dashboard.jsx";


class Uwdashboard extends React.Component {
    state = {
        value: 0,
        accountFlag: true,
        salesFlag: false,
        calenderFlag: false,
        alertFlag: false
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    showAccountSummary = () => {
        this.setState({
            accountFlag: true,
            salesFlag: false,
            calenderFlag: false,
            alertFlag: false
        })
    }
    showSalesSummary = () => {
        this.setState({
            accountFlag: false,
            salesFlag: true,
            calenderFlag: false, alertFlag: false
        })
    }
    showCalendar = () => {
        this.setState({
            calenderFlag: true,
            accountFlag: false,
            salesFlag: false,
            alertFlag: false
        })
    }
    showAlert = () => {
        this.setState({
            calenderFlag: false,
            accountFlag: false,
            salesFlag: false,
            alertFlag: true
        })
    }
  render() {
    const { classes } = this.props;
    return (
        <div>

            <Dashboard />
        
                </div>
);
}
}

Uwdashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Uwdashboard);

import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import ContentLoader from "react-content-loader";
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import AccountSummary from "./Dashboard/_AccountSummary.jsx";
import SalesSummary from "./Dashboard/_SalesSummary.jsx";
import Calendars from "./Dashboard/_Calendar.jsx";
import MyAlerts from "./Dashboard/_MyAlerts.jsx";

import product from "assets/img/product.png";
import policy from "assets/img/chart.png";
import claim from "assets/img/claim.png";
import CDAccountDashboard from "assets/img/security.png";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import { Animated } from "react-animated-css";
import DashboardLoader from "components/Loaders/DashboardLoader.jsx";
import DashboardContentLoader from "components/Loaders/DashboardContentLoader.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import UserConfig from 'modules/Users/UserConfig.js';

class Dashboard extends React.Component {
    state = {
        value: 0,
        accountFlag: false,
        salesFlag: false,
        calenderFlag: false,
        alertFlag: false,
        loader: true,
        dashboardsmenuPermission: [],
        dashboards: [],
        policy: false,
        claims: false,
        product: false,
        cdaccount: false,
    };

    componentDidMount = () => {


        fetch(`${UserConfig.UserConfigUrl}/api/Permission/GetPermissions?permissionType=Dashboard&userId=` + localStorage.getItem('userId') + `&roleId=` + localStorage.getItem('roleId') + ``, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then((data) => {
                setTimeout(
                    function () {
                        this.setState({ loader: false });
                    }
                        .bind(this),
                    2000
                );
                this.setState({ dashboardsmenuPermission: data });
                let dashboards = this.state.dashboards;
                dashboards = this.state.dashboardsmenuPermission[0].children;
                this.setState({ dashboards });
                console.log("dashboards: ", this.state.dashboards);
                let dashboardtype = this.state.dashboards;
                for (let i = 0; i < this.state.dashboards.length; i++) {
                    if (this.state.dashboards[i].itemDescription == "PolicyDashboard") {
                        this.setState({ policy: true});
                    }
                    if (this.state.dashboards[i].itemDescription == "ClaimsDashboard") {
                        this.setState({ claims: true });
                    }
                    if (this.state.dashboards[i].itemDescription == "ProductDashboard") {
                        this.setState({ product: true });
                    }
                    if (this.state.dashboards[i].itemDescription == "CdAccountDashboard") {
                        this.setState({ cdaccount: true });
                    }
                }
            });
    }

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
            alertFlag: false,
            loader: false
        })
    }
    showSalesSummary = () => {
        this.setState({
            accountFlag: false,
            salesFlag: true,
            calenderFlag: false,
            alertFlag: false,
            loader: false
        })
    }
    showCalendar = () => {
        this.setState({
            calenderFlag: true,
            accountFlag: false,
            salesFlag: false,
            alertFlag: false,
            loader: false
        })
    }
    showAlert = () => {
        this.setState({
            calenderFlag: false,
            accountFlag: false,
            salesFlag: false,
            alertFlag: true,
            loader: false
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                    {this.state.loader ?
                        <DashboardLoader />
                        : <GridContainer>
                            {this.state.policy ?
                                <GridItem xs={12} sm={6} md={6} lg={3}>
                                    <Card onClick={this.showAccountSummary}>
                                        {/* <ContentLoader className="dashboard-icon" >*/}
                                        <CardHeader color="warning" stats icon>
                                            <CardIcon color="warning">
                                                <Icon><img id="dashboardimg" src={policy} className={classes.calImg} /></Icon>
                                            </CardIcon>
                                            <p id="responsive-p" className={classes.cardCategory}><TranslationContainer translationKey="PolicyDashboard" /></p>
                                            <h3 className={classes.cardTitle}>

                                            </h3>
                                        </CardHeader>
                                        {/*</ContentLoader >*/}
                                        <CardFooter stats>
                                            <div className={classes.stats}>
                                                <a href="#account" >
                                                    <TranslationContainer translationKey="ClickHeretoView" />  <i id="eye" className="fas fa-eye" />
                                                </a>
                                            </div>
                                        </CardFooter>
                                    </Card>

                                </GridItem>
                                : null}
                            {this.state.claims ?
                                <GridItem xs={12} sm={6} md={6} lg={3}>

                                    <Card onClick={this.showSalesSummary}>
                                        <CardHeader color="success" stats icon>
                                            <CardIcon color="success">
                                                <Icon><img id="dashboardimg" src={claim} className={classes.calImg} /></Icon>
                                            </CardIcon>
                                            <p id="responsive-p" className={classes.cardCategory}><TranslationContainer translationKey="ClaimsDashboard" /></p>
                                            <h3 className={classes.cardTitle}></h3>
                                        </CardHeader>
                                        <CardFooter stats>
                                            <div className={classes.stats}>
                                                <a href="#sales">
                                                    <TranslationContainer translationKey="ClickHeretoView" />   <i id="eye" className="fas fa-eye" />
                                                </a>
                                            </div>
                                        </CardFooter>
                                    </Card>

                                </GridItem>
                                : null}
                            {this.state.product ?
                                <GridItem xs={12} sm={6} md={6} lg={3}>

                                    <Card onClick={this.showCalendar}>
                                        <CardHeader color="danger" stats icon>
                                            <CardIcon color="danger">
                                                <Icon><img id="dashboardimg" src={product} className={classes.calImg} /></Icon>
                                            </CardIcon>
                                            <p id="responsive-p" className={classes.cardCategory}><TranslationContainer translationKey="ProductDashboard" /></p>
                                            <h3 className={classes.cardTitle}></h3>
                                        </CardHeader>
                                        <CardFooter stats>
                                            <div className={classes.stats}>
                                                <a href="#calendar">
                                                    <TranslationContainer translationKey="ClickHeretoView" /> <i id="eye" className="fas fa-eye" />
                                                </a>
                                            </div>
                                        </CardFooter>
                                    </Card>

                                </GridItem>
                                : null}
                            {this.state.cdaccount ?
                                <GridItem xs={12} sm={6} md={6} lg={3}>
                                    <Card onClick={this.showAlert}>
                                        <CardHeader color="info" stats icon>
                                            <CardIcon color="info">
                                                <Icon><img id="dashboardimg" src={CDAccountDashboard} className={classes.calImg} /></Icon>
                                            </CardIcon>
                                            <p id="responsive-p" className={classes.cardCategory}><TranslationContainer translationKey="CDAccountDashboard" /></p>
                                            <h3 className={classes.cardTitle}></h3>
                                        </CardHeader>
                                        <CardFooter stats>
                                            <div className={classes.stats}>
                                                <a href="#alert"><TranslationContainer translationKey="ClickHeretoView" />
                                                    <i id="eye" className="fas fa-eye" />  </a>
                                            </div>
                                        </CardFooter>
                                    </Card>

                                </GridItem>
                                : null}
                        </GridContainer>
                    }
                </Animated>

                <GridItem xl={12} justify="center">
                    {this.state.accountFlag ? <AccountSummary /> : null}
                </GridItem>

                <GridItem xl={12} justify="center">
                    {this.state.salesFlag ? <SalesSummary /> : null}
                </GridItem>

                <GridItem xl={12} justify="center">
                    {this.state.calenderFlag ? <Calendars /> : null}
                </GridItem>

                <GridItem xl={12} justify="center">
                    {this.state.alertFlag ? <MyAlerts /> : null}
                </GridItem>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);

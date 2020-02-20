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

//User Dashboard
import PolicyDashboard from "./UserDashboard/_PolicyDashboard.jsx";
import ProductDashboard from "./UserDashboard/_ProductDashboard.jsx";
import ClaimsDashboard from "./UserDashboard/_ClaimsDashboard.jsx";
import CDAccountsDashboard from "./UserDashboard/_CDAccountsDashboard.jsx";

class Dashboard extends React.Component {
    state = {
        value: 0,
        accountFlag: true,
        salesFlag: false,
        calenderFlag: false,
        alertFlag: false,
        loader: true,
    };

    componentDidMount = () => {
        setTimeout(
            function () {
                this.setState({ loader: false });
            }
                .bind(this),
            2000
        );
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
                                            <a href="#policy" >
                                                <TranslationContainer translationKey="ClickHeretoView" />  <i id="eye" className="fas fa-eye" />
                                            </a>
                                        </div>
                                    </CardFooter>
                                </Card>

                            </GridItem>
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
                                            <a href="#claims">
                                                <TranslationContainer translationKey="ClickHeretoView" />   <i id="eye" className="fas fa-eye" />
                                            </a>
                                        </div>
                                    </CardFooter>
                                </Card>

                            </GridItem>
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
                                            <a href="#product">
                                                <TranslationContainer translationKey="ClickHeretoView" /> <i id="eye" className="fas fa-eye" />
                                            </a>
                                        </div>
                                    </CardFooter>
                                </Card>

                            </GridItem>
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
                                            <a href="#cdAccount"><TranslationContainer translationKey="ClickHeretoView" />
                                                <i id="eye" className="fas fa-eye" />  </a>
                                        </div>
                                    </CardFooter>
                                </Card>

                            </GridItem>

                        </GridContainer>
                    }
                </Animated>
                
                <GridItem xl={12} justify="center">
                    {this.state.accountFlag ? <PolicyDashboard /> : null}
                </GridItem>
                {/*
                <GridItem xl={12} justify="center">
                    {this.state.salesFlag ? <ClaimsDashboard /> : null}
                </GridItem>
                 */}
                <GridItem xl={12} justify="center">
                    {this.state.calenderFlag ? <ProductDashboard /> : null}
                </GridItem>

                <GridItem xl={12} justify="center">
                    {this.state.alertFlag ? <CDAccountsDashboard /> : null}
                </GridItem>
               

            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);

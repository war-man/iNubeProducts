import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import CountUp from 'react-countup';
import approved from "assets/img/approved.png";
import failure from "assets/img/failure-payment.png";
import cancel from "assets/img/cancel.png";
import status from "assets/img/upload.png";
import dashboardStyle from "assets/jss/material-dashboard-pro-react/views/dashboardStyle";
import { Animated } from "react-animated-css";
import ApprovedClaim from "./_ApprovedClaim.jsx";
import SettledClaim from "./_SettledClaim.jsx";
import UploadBankFile from "./_FailureTransaction";
import PaymentFailure from "./_PaymentFailure.jsx";

class FinanceProcess extends React.Component {
    state = {
        value: 0,
        approvedflag: true,
        setteledflag: false,
        failureflag: false,
        paymentflag: false,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    showAccountSummary = () => {
        this.setState({
            approvedflag: true,
            setteledflag: false,
            failureflag: false,
            paymentflag: false
        })
    }
    showSalesSummary = () => {
        this.setState({
            approvedflag: false,
            setteledflag: true,
            failureflag: false, paymentflag: false
        })
    }
    showCalendar = () => {
        this.setState({
            failureflag: true,
            approvedflag: false,
            setteledflag: false,
            paymentflag: false
        })
    }
    showAlert = () => {
        this.setState({
            failureflag: false,
            approvedflag: false,
            setteledflag: false,
            paymentflag: true
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>

                    <GridContainer>

                        <GridItem xs={12} sm={6} md={6} lg={3}>
                            <Card onClick={this.showAccountSummary}>
                                <CardHeader color="warning" stats icon>
                                    <CardIcon color="warning">
                                        <Icon><img id="dashboardimg" src={approved} className={classes.calImg} /></Icon>
                                    </CardIcon>
                                    <p id="responsive-p" className={classes.cardCategory}>Claims for Payment</p>
                                    <h3 className={classes.cardTitle}></h3>
                                    <GridContainer justify="flex-end">
                                        <GridItem>
                                            <CountUp className="finace-count"
                                                start={0}
                                                end={567898}
                                                duration={2.75}
                                                separator="," />
                                        </GridItem>
                                    </GridContainer>
                                </CardHeader>
                                <CardFooter stats>
                                    <div className={classes.stats}>
                                        <a href="#Approved" >
                                            Click Here to View   <i id="eye" className="fas fa-eye" />
                                        </a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </GridItem>

                        <GridItem xs={12} sm={6} md={6} lg={3}>
                            <Card onClick={this.showCalendar}>
                                <CardHeader color="danger" stats icon>
                                    <CardIcon color="danger">
                                        <Icon><img id="dashboardimg" src={cancel} className={classes.calImg} /></Icon>
                                    </CardIcon>
                                    <p id="responsive-p" className={classes.cardCategory}>Upload Claim Settlement Details</p>
                                    <h3 className={classes.cardTitle}></h3>
                                    <GridContainer justify="flex-end">
                                        <GridItem>
                                            <CountUp className="finace-count"
                                                start={0}
                                                end={17890}
                                                duration={2.75}
                                                separator="," />
                                        </GridItem>
                                    </GridContainer>
                                </CardHeader>
                                <CardFooter stats>
                                    <div className={classes.stats}>
                                        <a href="#UploadBankFile">
                                            Click Here to View   <i id="eye" className="fas fa-eye" />
                                        </a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </GridItem>

                        <GridItem xs={12} sm={6} md={6} lg={3}>
                            <Card onClick={this.showSalesSummary}>
                                <CardHeader color="success" stats icon>
                                    <CardIcon color="success">
                                        <Icon><img id="dashboardimg" src={failure} className={classes.calImg} /></Icon>
                                    </CardIcon>
                                    <p id="responsive-p" className={classes.cardCategory}>Settled Claims</p>
                                    <h3 className={classes.cardTitle}></h3>
                                    <GridContainer justify="flex-end">
                                        <GridItem>
                                            <CountUp className="finace-count"
                                                start={0}
                                                end={45}
                                                duration={2.75}
                                                separator="," />
                                        </GridItem>
                                    </GridContainer>
                                </CardHeader>
                                <CardFooter stats>
                                    <div className={classes.stats}>
                                        <a href="#Setteled">
                                            Click Here to View   <i id="eye" className="fas fa-eye" />
                                        </a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </GridItem>

                        <GridItem xs={12} sm={6} md={6} lg={3}>
                            <Card onClick={this.showAlert}>
                                <CardHeader color="info" stats icon>
                                    <CardIcon color="info">
                                        <Icon><img id="dashboardimg" src={status} className={classes.calImg} /></Icon>
                                    </CardIcon>
                                    <p id="responsive-p" className={classes.cardCategory}>Claims Payment Failure</p>
                                    <h3 className={classes.cardTitle}></h3>
                                    <GridContainer justify="flex-end">
                                        <GridItem>
                                            <CountUp className="finace-count"
                                                start={0}
                                                end={72187}
                                                duration={2.75}
                                                separator="," />
                                        </GridItem>
                                    </GridContainer>
                                </CardHeader>
                                <CardFooter stats>
                                    <div className={classes.stats}>
                                        <a href="#PaymentFailures">Click Here to View <i id="eye" className="fas fa-eye" />  </a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </GridItem>

                    </GridContainer>

                </Animated>

                <GridContainer xl={12} justify="center">
                    {this.state.approvedflag ?
                        <ApprovedClaim tabledata={this.state.tabledata} />
                        : null}
                </GridContainer>

                <GridContainer xl={12} justify="center">
                    {this.state.setteledflag ?
                        <SettledClaim tabledata={this.state.tabledata} />
                        : null}
                </GridContainer>

                <GridContainer xl={12} justify="center">
                    {this.state.failureflag ?
                        <UploadBankFile tabledata={this.state.tabledata} />
                        : null}
                </GridContainer>

                <GridContainer xl={12} justify="center">
                    {this.state.paymentflag ?
                        <PaymentFailure tabledata={this.state.tabledata} />
                        : null}
                </GridContainer>
            </div>
        );
    }
}

FinanceProcess.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(FinanceProcess);
import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import CardContent from '@material-ui/core/CardContent';
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import CountUp from 'react-countup';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ArrowForward from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import swal from 'sweetalert';
import { Animated } from "react-animated-css";
import ClaimPage from "modules/Claims/views/ClaimInbox/ClaimPage.jsx";
import InboxClaimProcess from "modules/Claims/views/ClaimInbox/InboxClaimProcess.jsx";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import ClaimConfig from "modules/Claims/ClaimConfig.js";

const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    inputAdornmentIcon: {
        color: "#555"
    },
    choiche: {
        textAlign: "center",
        cursor: "pointer",
        marginTop: "20px"
    },
    ...customSelectStyle,
    ...customCheckboxRadioSwitch
};

class ClaimInbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intimate: false,
            approved: false,
            document: false,
            rejected: false,
            setteled: false,
            ClaimCount: {
                "intimated": "",
                "approved": "",
                "document": "",
                "rejected": "",
                "setteled": "",
            },
            ClaimDTO: {
                claimStatusId: "",
            },
        };
    }

    handleintimate = () => {
        let status = this.state.ClaimDTO;
        status.claimStatusId = 16;
        this.setState({
            status,
            intimate: true,
            approved: false,
            document: false,
            rejected: false,
            setteled: false
        });
        //swal({
        //    text: "this is Claim intimation",
        //    icon: "info"
        //});
    }

    componentDidMount() {
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetClaimCount`, {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                console.log("response data", data);
                this.setState({ ClaimCount: data })
            });
    }

    handleApproved = () => {
        let status = this.state.ClaimDTO;
        status.claimStatusId = 9;
        this.setState({
            status,
            intimate: false,
            approved: true,
            document: false,
            rejected: false,
            setteled: false
        });
        //swal({
        //    text: "this is Claims Approved",
        //    icon: "info"
        //});
    }

    handleDocument = () => {
        let status = this.state.ClaimDTO;
        status.claimStatusId = 17;
        this.setState({
            status,
            intimate: false,
            approved: false,
            document: true,
            rejected: false,
            setteled: false
        });
        //swal({
        //    text: "this is Document pending",
        //    icon: "info"
        //});
    }

    handleRejected = () => {
        let status = this.state.ClaimDTO;
        status.claimStatusId = 11;
        this.setState({
            status,
            intimate: false,
            approved: false,
            document: false,
            rejected: true,
            setteled: false
        });
        //swal({
        //    text: "this is Claims Rejected",
        //    icon: "info"
        //});
    }

    handleSettled = () => {
        let status = this.state.ClaimDTO;
        status.claimStatusId = 22;
        this.setState({
            status,
            intimate: false,
            approved: false,
            document: false,
            rejected: false,
            setteled: true
        });
        //swal({
        //    text: "this is Claims Settled",
        //    icon: "info"
        //});
    }



    render() {
        const { classes } = this.props;
        return (
            <div>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                    <GridContainer justify="center" lg={12}>
                        <GridItem/* xs={2}*/>
                            <Card id="card-bg1" onClick={(e) => this.handleintimate(e)}>
                                <CardHeader>
                                    <h5 id="white" className={classes.cardTitle}>Intimated Claims</h5>
                                    <h4 className="h4center">
                                        <CountUp
                                            className="account-balance"
                                            start={0}
                                            end={this.state.ClaimCount.intimated}
                                            duration={3.50}
                                            useEasing={true}
                                            useGrouping={true}
                                            separator=" "
                                        />
                                    </h4>
                                </CardHeader>
                            </Card>
                        </GridItem>
                        {/*  <GridItem xs={2}>
                            <Card id="card-bg2" onClick={(e) => this.handleApproved(e)}>
                                <CardHeader>
                                    <h5 id="white" className={classes.cardTitle}>Approved Claims</h5>
                                    <h4 className="h4center">
                                        <CountUp
                                            className="account-balance"
                                            start={0}
                                            end={this.state.ClaimCount.approved}
                                            duration={3.50}
                                            useEasing={true}
                                            useGrouping={true}
                                            separator=" "
                                        />
                                    </h4>
                                </CardHeader>
                            </Card>
                        </GridItem>
                        <GridItem xs={2}>
                            <Card id="card-bg3" onClick={(e) => this.handleDocument(e)}>
                                <CardHeader>
                                    <h5 id="white" className={classes.cardTitle}>Document Pendings</h5>

                                    <h4 className="h4center">
                                        <CountUp
                                            className="account-balance"
                                            start={0}
                                            end={this.state.ClaimCount.document}
                                            duration={3.50}
                                            useEasing={true}
                                            useGrouping={true}
                                            separator=" "
                                        />
                                    </h4>
                                </CardHeader>
                            </Card>
                        </GridItem>*/}
                        <GridItem /*xs={2}*/>
                            <Card id="card-bg5" onClick={(e) => this.handleSettled(e)}>
                                <CardHeader>
                                    <h5 id="white" className={classes.cardTitle}>Setteled Claims</h5>
                                    <h4 className="h4center">
                                        <CountUp
                                            className="account-balance"
                                            start={0}
                                            end={this.state.ClaimCount.setteled}
                                            duration={3.50}
                                            useEasing={true}
                                            useGrouping={true}
                                            separator=" "
                                        />
                                    </h4>
                                </CardHeader>
                            </Card>
                        </GridItem>
                        <GridItem /*xs={2}*/>
                            <Card id="card-bg4" onClick={(e) => this.handleRejected(e)}>
                                <CardHeader>
                                    <h5 id="white" className={classes.cardTitle}>Rejected Claims</h5>
                                    <h4 className="h4center">
                                        <CountUp
                                            className="account-balance"
                                            start={0}
                                            end={this.state.ClaimCount.rejected}
                                            duration={3.50}
                                            useEasing={true}
                                            useGrouping={true}
                                            separator=" "
                                        />
                                    </h4>
                                </CardHeader>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </Animated>
                {this.state.intimate ?
                    <InboxClaimProcess ClaimDTO={this.state.ClaimDTO} />
                    : null}

                {this.state.approved ?
                    <ClaimPage ClaimDTO={this.state.ClaimDTO} />
                    : null}

                {this.state.document ?
                    <InboxClaimProcess ClaimDTO={this.state.ClaimDTO} />
                    : null}

                {this.state.rejected ?
                    <InboxClaimProcess ClaimDTO={this.state.ClaimDTO} />
                    : null}

                {this.state.setteled ?
                    <ClaimPage ClaimDTO={this.state.ClaimDTO} />
                    : null}
            </div>
        );
    }
}

export default withStyles(style)(ClaimInbox);
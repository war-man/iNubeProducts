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
import InboxProcess from "modules/Hierarchy/views/InboxProcess.jsx";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png";
import money from "assets/img/money.png";
import HierarchyConfig from "modules/Hierarchy/HierarchyConfig.js";

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

class Inbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recommended: false,
            approved: false,
            rejected: false,
            CCount: {
                "recommended": "",
                "approved": "",
                "rejected": "",
            },
            MovementDTO: {
                movementStatusId: "",
            },
        };
    }

    componentDidMount() {
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetMovementCount`, {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                console.log("response data", data);
                this.setState({ CCount: data })
            });
    }

    handleRecommended = () => {
        let status = this.state.MovementDTO;
        status.movementStatusId = 34;
        this.setState({
            status,
            recommended: true,
            approved: false,
            rejected: false,
        });
    }

    handleApproved = () => {
        let status = this.state.MovementDTO;
        status.movementStatusId = 35;
        this.setState({
            status,
            recommended: false,
            approved: true,
            rejected: false,
        });
    }

    handleRejected = () => {
        let status = this.state.MovementDTO;
        status.movementStatusId = 36;
        this.setState({
            status,
            recommended: false,
            approved: false,
            rejected: true,
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" src={money} /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> Inbox </small>
                        </h4>
                    }
                </CardHeader>

                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                    <GridContainer justify="center" lg={12}>
                        <GridItem/* xs={2}*/>
                            <Card id="card-bg1" onClick={(e) => this.handleRecommended(e)}>
                                <CardHeader>
                                    <h4 id="white" className={classes.cardTitle}> Recommended </h4>
                                    <h4 className="h4center">
                                        <CountUp
                                            className="account-balance"
                                            start={0}
                                            end={this.state.CCount.recommended}
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
                            <Card id="card-bg5" onClick={(e) => this.handleApproved(e)}>
                                <CardHeader>
                                    <h4 id="white" className={classes.cardTitle}>Approved</h4>
                                    <h4 className="h4center">
                                        <CountUp
                                            className="account-balance"
                                            start={0}
                                            end={this.state.CCount.approved}
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
                                    <h4 id="white" className={classes.cardTitle}>Rejected</h4>
                                    <h4 className="h4center">
                                        <CountUp
                                            className="account-balance"
                                            start={0}
                                            end={this.state.CCount.rejected}
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
                {this.state.recommended ?
                    <InboxProcess MovementDTO={this.state.MovementDTO} />
                    : null}

                {this.state.approved ?
                    <InboxProcess MovementDTO={this.state.MovementDTO} />
                    : null}
               
                {this.state.rejected ?
                    <InboxProcess MovementDTO={this.state.MovementDTO} />
                    : null}

            </div>
        );
    }
}

export default withStyles(style)(Inbox);
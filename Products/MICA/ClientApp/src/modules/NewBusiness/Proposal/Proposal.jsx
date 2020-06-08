import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import IconButton from '@material-ui/core/IconButton';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

import CountUp from 'react-countup';
import { Animated } from "react-animated-css";

import ArrowForward from '@material-ui/icons/ArrowForward';
import ProposalIncomplete from "./ProposalIncomplete.jsx";
import ProposalSubmitted from "./ProposalSubmitted.jsx";
import PendingRequirements from "./PendingRequirements";


import Icon from "@material-ui/core/Icon";


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

const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
}

const validateBtn = {
    height: "35px",
    marginTop: "-10px",
}

class Proposal extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            gridShow:true,
            propflag: true,
            showprop: false,
            submitprop: false,
            pendingReq: false,
                }
    };
    propPendingReqfun = () => {
        this.setState({ pendingReq: true, propflag: false })
    }
    propInCompfun = () => {
        this.setState({ showprop: true, propflag: false })
    }
    propSubmittedfun = () => {
        this.setState({ submitprop: true, propflag: false })
    }

    componentDidMount() {
        if (this.props.location.state !== undefined) {
            this.setState({
                propflag: false,
                pendingReq: false,
                showprop: true,
                gridShow:false
            });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.propflag &&
                    <GridContainer lg={12}>
                        <GridItem xs={4}>
                            <Card>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" /></Icon>
                                    </CardIcon>

                                    <Typography className="right" variant="h3" component="h5">
                                        <CountUp
                                            className="account-balance"
                                            start={0}
                                            end={33}
                                            duration={3.75}
                                            useEasing={true}
                                            useGrouping={true}
                                            separator=" "
                                        /></Typography>
                                </CardHeader>
                                <CardActionArea>
                                </CardActionArea>
                                <CardContent>

                                    <Typography variant="h6" color="textSecondary" component="h4">
                                        INCOMPLETE
          </Typography>





                                </CardContent>
                                <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                    <CardActions >
                                        <IconButton onClick={this.propInCompfun}>
                                            <ArrowForward />

                                        </IconButton>
                                    </CardActions>
                                </GridContainer>


                            </Card>
                        </GridItem>
                        <GridItem xs={4}>
                            <Card>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" /></Icon>
                                    </CardIcon>

                                    <Typography className="right" variant="h3" component="h5">
                                        <CountUp
                                            className="account-balance"
                                            start={0}
                                            end={59}
                                            duration={3.75}
                                            useEasing={true}
                                            useGrouping={true}
                                            separator=" "
                                        /></Typography>
                                </CardHeader>
                                <CardActionArea>
                                </CardActionArea>
                                <CardContent>

                                    <Typography variant="h6" color="textSecondary" component="h4">
                                        SUBMITTED
          </Typography>





                                </CardContent>
                                <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                    <CardActions >
                                    <IconButton onClick={this.propSubmittedfun}>
                                            <ArrowForward />
                                        </IconButton>
                                    </CardActions>
                                </GridContainer>


                            </Card>
                        </GridItem>
                        <GridItem xs={4}>
                            <Card>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Icon><img id="icon" /></Icon>
                                    </CardIcon>

                                    <Typography className="right" variant="h3" component="h5">
                                        <CountUp
                                            className="account-balance"
                                            start={0}
                                            end={0}
                                            duration={3.75}
                                            useEasing={true}
                                            useGrouping={true}
                                            separator=" "
                                        /></Typography>
                                </CardHeader>
                                <CardActionArea>
                                </CardActionArea>
                                <CardContent>

                                    <Typography variant="h6" color="textSecondary" component="h4">
                                        PENDING REQUIREMENTS
          </Typography>





                                </CardContent>
                                <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                    <CardActions >
                                    <IconButton onClick={this.propPendingReqfun}>
                                            <ArrowForward />
                                        </IconButton>
                                    </CardActions>
                                </GridContainer>


                            </Card>
                        </GridItem>

                    </GridContainer>
                }
                {this.state.showprop &&
                    <ProposalIncomplete gridShow={this.state.gridShow} />
                  
                }
                {this.state.submitprop &&
                    <ProposalSubmitted />
                }
                {this.state.pendingReq &&
                    
                    <PendingRequirements />
               
                }

            </div>
        );
    }
}

export default withStyles(style)(Proposal);

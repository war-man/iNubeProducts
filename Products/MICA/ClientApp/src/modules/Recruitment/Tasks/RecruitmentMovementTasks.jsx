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

import Icon from "@material-ui/core/Icon";
import RecCodeDetailTask from "./RecruitmentCodeCreationDetailTasks.jsx";
import RecIBSLexamDetailTask from "./RecruitmentIBSLExamTaskDetails.jsx";
import ConfirmProspect from "./RecruitmentConfirmProspect.jsx";

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

class RecMovementTasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            propflag: true,
            showprop: false,
            submitprop: false,
            pendingReq: false,
        }
    };

    propMovmtTransferfun = () => {
        this.setState({  MovmtTransferprop: true, propflag: false })
    }
    propMovPromotionfun = () => {
        this.setState({MovPromotionprop: true, propflag: false })
    }
    propMovPromWithTrnsfun = () => {
        this.setState({ MovPromWithTrnsprop: true, propflag: false })
    }
    propMovDemotionfun = () => {
        this.setState({ MovDemotionprop: true, propflag: false })
    }
    propMovDemoWithTrnsfun = () => {
        this.setState({ MovDemoWithTrnsprop: true, propflag: false })
    }
    propMovResignfun = () => {
        this.setState({ MovResignprop: true, propflag: false })
    }
    propMovCancelfun = () => {
        this.setState({ MovCancelprop: true, propflag: false })
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
                                       Transfer
          </Typography>





                                </CardContent>
                                <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                    <CardActions >
                                    <IconButton onClick={this.propMovmtTransferfun}>
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
                                       Promotion
                                        </Typography>
                                
                                </CardContent>
                                <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                    <CardActions >
                                        <IconButton onClick={this.propMovPromotionfun}>
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
                                    Promotion With Transfer
                                        </Typography>

                            </CardContent>
                            <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                <CardActions >
                                    <IconButton onClick={this.propMovPromWithTrnsfun}>
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
                                    Demotion
                                        </Typography>

                            </CardContent>
                            <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                <CardActions >
                                    <IconButton onClick={this.propMovDemotionfun}>
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
                                    Demotion With Transfer
                                        </Typography>

                            </CardContent>
                            <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                <CardActions >
                                    <IconButton onClick={this.propMovDemoWithTrnsfun}>
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
                                    Resignation
                                        </Typography>

                            </CardContent>
                            <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                <CardActions >
                                    <IconButton onClick={this.propMovResignfun}>
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
                                 Cancellation
                                        </Typography>

                            </CardContent>
                            <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                <CardActions >
                                    <IconButton onClick={this.propMovCancelfun}>
                                        <ArrowForward />
                                    </IconButton>
                                </CardActions>
                            </GridContainer>


                        </Card>
                    </GridItem>

                    </GridContainer>
                }

                
            </div>
        );
    }
}

export default withStyles(style)(RecMovementTasks);

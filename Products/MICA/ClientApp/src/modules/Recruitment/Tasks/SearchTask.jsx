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

import RecruitmentSuspect from "./RecruitmentSuspectTasks.jsx";
import RecProspect from "./RecruitmentProspectTasks.jsx";

import InterviewDetTask from "./RecruitmentInterviewDetailTasks.jsx";
import NICverTask from "./RecruitmentNICverificationTask.jsx";

import RecApprovCase from "./RecruitmentApprovedCases.jsx";
import RecMovementTasks from "./RecruitmentMovementTasks.jsx";
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

class Tasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            propflag: true,
            showprop: false,
            submitprop: false,
            pendingReq: false,
        }
    };

    propSuspectfun = () => {
        this.setState({ Suspectprop: true, propflag: false })
    }
    propProspectfun = () => {
        this.setState({Prospectprop: true, propflag: false })
    }
    propInterviewsfun = () => {
        this.setState({ Interviewsprop: true, propflag: false })
    }
    propApprovedCasesfun = () => {
        this.setState({ ApprovedCasessprop: true, propflag: false })
    }
    propNICfun = () => {
        this.setState({ NICprop: true, propflag: false })
    }
    propMovementsfun = () => {
        this.setState({ Movementsprop: true, propflag: false })
    }
    propDocRejectedfun = () => {
        this.setState({ DocRejectedprop: true, propflag: false })
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
                                            end={10}
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
                                       Suspect
                                     </Typography>
                                                                                           
                                    </CardContent>
                                <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                <CardActions >
                                    
                                    <IconButton onClick={this.propSuspectfun}>
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
                                            end={2}
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
                                       Prospect          </Typography>





                                </CardContent>
                                <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                    <CardActions >
                                    <IconButton onClick={this.propProspectfun}>
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
                                            end={5}
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
                                       Interviews
                               </Typography>
                               </CardContent>
                                <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                    <CardActions >
                                    <IconButton onClick={this.propInterviewsfun}>
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
                               Approved Cases
                               </Typography>
                            </CardContent>
                            <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                <CardActions >
                                    <IconButton onClick={this.propApprovedCasesfun}>
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
                                 NIC Verification
                               </Typography>
                            </CardContent>
                            <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                <CardActions >
                                    <IconButton onClick={this.propNICfun}>
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
                                Movements
                               </Typography>
                            </CardContent>
                            <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                <CardActions >
                                    <IconButton onClick={this.propMovementsfun}>
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
                                  Documents Rejected
                               </Typography>
                            </CardContent>
                            <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                <CardActions >
                                    <IconButton onClick={this.propDocRejectedfun}>
                                        <ArrowForward />
                                    </IconButton>
                                </CardActions>
                            </GridContainer>

                        </Card>
                    </GridItem>
                    </GridContainer>
                }
                    
                {this.state.Suspectprop &&
                    <RecruitmentSuspect />
                }
               
              
              
                     {this.state.Prospectprop &&
                    < RecProspect />
                }
                {this.state.Interviewsprop &&
                    < InterviewDetTask />
                }
                {this.state.NICprop &&
                    < NICverTask />
                }
                {this.state.ApprovedCasessprop &&
                    < RecApprovCase />
                }
                {this.state.Movementsprop &&
                    < RecMovementTasks />
                }
            </div>
        );
    }
}

export default withStyles(style)(Tasks);

import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import IconButton from '@material-ui/core/IconButton';
import Card from "components/Card/Card.jsx";
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
import Icon from "@material-ui/core/Icon";
import CountUp from 'react-countup';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ConfirmProspect from "./ConfirmProspect.jsx";
import NeedAnalysis from "./NeedAnalysis";
import NeedAnalysisCompleted from "./NeedAnalysisCompleted.jsx";
import NewBusinessConfig from 'modules/NewBusiness/NewBusinessConfig.js';
import NeedAnalysCompleted from "./NACompleted.jsx";




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

class Prospect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            dataRows: [],

            CPflag: false,
            flag: true,
            PSflag: false,
            PIflag: false,
            radioVal: "",
            empFlag: false,
            visibility: false,
            partFlag: false,
            redirect: false,
            selectedValue: null,


            masterList: [],



            errors: {},
            fields: {}
        };

    }
    Prospectfun = () => {
        this.setState({ flag: false });
        this.setState({ CPflag: true })
    }
    NACfun = () => {
        this.setState({ flag: false });
        this.setState({ PSflag: true });
        this.setState({ PIflag: true })
    }

    componentDidMount() {


        fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Lead/ContactPool?type=Prospect`, {

            method: 'GET',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {


                console.log("poolData:", data);
                this.setState({ dataRows: data });

            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>



                {this.state.flag &&
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
                                            end={this.state.dataRows.length}
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
                                        Confirmed Prospect
                                    </Typography>




                                </CardContent>
                                <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                    <CardActions >
                                        <IconButton onClick={this.Prospectfun} >

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
                                            end={this.state.dataRows.length}
                                            duration={3.75}
                                            useEasing={true}
                                            useGrouping={true}
                                            separator=" "
                                        /></Typography>

                                </CardHeader>

                                <CardContent>

                                    <Typography variant="h6" color="textSecondary" component="h4">
                                        Need Analysis Completed
                                    </Typography>





                                </CardContent>
                                <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                                    <CardActions >
                                        <IconButton onClick={this.NACfun}>
                                            <ArrowForward />
                                        </IconButton>
                                    </CardActions>
                                </GridContainer>


                            </Card>
                        </GridItem>

                    </GridContainer>

                }
                {this.state.CPflag &&
                    < ConfirmProspect />
                }

                {this.state.PSflag &&
                    <NeedAnalysCompleted />
                }
            </div>
        );
    }
}

export default withStyles(style)(Prospect);

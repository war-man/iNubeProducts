import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Datetime from "react-datetime";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import FilterNone from "@material-ui/icons/FilterNone";
import CardMedia from '@material-ui/core/CardMedia';

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Edit from "@material-ui/icons/Edit";
import FundBalance from "./FundBalance";



import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

import Icon from "@material-ui/core/Icon";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
//import Health from "./Health.jsx";
import { Redirect } from 'react-router-dom';

import Retirement from "./Retirement.jsx";
import Health from "./Health.jsx";
import Education from "./Education.jsx";
import HumanValue from "./HumanValues.jsx";
import Savings from "./Savings.jsx";
//import Collapsible from 'react-collapsible';
import ProspectInformation from "./ProspectInformation";
import Accordion from "components/Accordion/Accordion.jsx";

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
};

const validateBtn = {
    height: "35px",
    marginTop: "-10px",
};
const collapse = {
    padding: "16px",
    bgColor: "darkblue",
};
const Calculator = (props) => {
    console.log("NeedAnalysis Calculator props: ", props);
    console.log("NeedAnalysis Calculator props.componentData: ", props.componentData);
    return (
        <div>
            <GridContainer lg={12}>
                <GridItem xs={4}>
                    <Card onClick={props.showRetirement}>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" /></Icon>
                            </CardIcon>
                            {
                                <h5>
                                    <small> Retirement</small>
                                </h5>
                            }
                        </CardHeader>
                        <CardActionArea>
                        </CardActionArea>
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" component="h4">
                                <font size="2"> click here to proceed</font>
                            </Typography>
                        </CardContent>
                        <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                            <CardActions >
                                <IconButton>
                                    <ArrowForward />
                                </IconButton>
                            </CardActions>
                        </GridContainer>
                    </Card>
                </GridItem>
                <GridItem xs={4}>
                    <Card onClick={props.showHealth}>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" /></Icon>
                            </CardIcon>
                            {
                                <h5 >
                                    <small> Health</small>
                                </h5>
                            }
                        </CardHeader>
                        <CardActionArea>
                        </CardActionArea>
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" component="h4">
                                <font size="2"> click here to proceed</font>
                            </Typography>
                        </CardContent>
                        <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                            <CardActions >
                                <IconButton>
                                    <ArrowForward />
                                </IconButton>
                            </CardActions>
                        </GridContainer>
                    </Card>
                </GridItem>
                <GridItem xs={4}>
                    <Card onClick={props.showEducation}>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" /></Icon>
                            </CardIcon>
                            {
                                <h5 >
                                    <small>Education</small>
                                </h5>
                            }
                        </CardHeader>
                        <CardActionArea>
                        </CardActionArea>
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" component="h4">
                                <font size="2"> click here to proceed</font>
                            </Typography>
                        </CardContent>
                        <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                            <CardActions >
                                <IconButton>
                                    <ArrowForward />
                                </IconButton>
                            </CardActions>
                        </GridContainer>
                    </Card>
                </GridItem>
                <GridItem xs={4}>
                    <Card onClick={props.showSavings}>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" /></Icon>
                            </CardIcon>
                            {
                                <h5 >
                                    <small>Savings</small>
                                </h5>
                            }
                        </CardHeader>
                        <CardActionArea>
                        </CardActionArea>
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" component="h4">
                                <font size="2"> click here to proceed</font>
                            </Typography>
                        </CardContent>
                        <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                            <CardActions >
                                <IconButton>
                                    <ArrowForward />
                                </IconButton>
                            </CardActions>
                        </GridContainer>
                    </Card>
                </GridItem>
                <GridItem xs={5}>
                    <Card onClick={props.showHumanValue}>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" /></Icon>
                            </CardIcon>
                            {
                                <h5 >
                                    <small>Human Value</small>
                                </h5>
                            }
                        </CardHeader>
                        <CardActionArea>
                        </CardActionArea>
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" component="h4">
                                <font size="2"> click here to proceed</font>
                            </Typography>
                        </CardContent>
                        <GridContainer style={{ marginTop: "-62px" }} justify="flex-end" xs={12}>
                            <CardActions >
                                <IconButton>
                                    <ArrowForward />
                                </IconButton>
                            </CardActions >
                        </GridContainer>
                    </Card>
                </GridItem>
            </GridContainer>

            {props.calcObj.Retirement && <Retirement classes={props.classes} handleChange={props.handleChange} display={props.display} data2={props.data2} data3={props.data3} RetirementCalculatorDTO={props.RetirementCalculatorDTO} RetCalSetValue={props.RetCalSetValue} checked={props.checked} handleChangeCalc={props.handleChangeCalc} calcObj={props.calcObj} Checked={props.Checked} display={props.display} FinancilaObligationsData={props.FinancilaObligationsData} handleddtChange={props.handleddtChange}/>}
            {props.calcObj.Health && <Health classes={props.classes} data={props.data} ddldata={props.ddldata} interval={props.interval} interval1={props.interval1} interval2={props.interval2} handleSimple={props.handleSimple} healthAdversitiesData={props.healthAdversitiesData} handleddtChange={props.handleddtChange} HealthMasddlDTO={props.HealthMasddlDTO} masterList={props.masterList} HealthddlSetValue={props.HealthddlSetValue}/>}
            {props.calcObj.Education && <Education classes={props.classes} data2={props.data2} />}
            {props.calcObj.HumanVal && <HumanValue classes={props.classes} />}
            {props.calcObj.Savings && <Savings classes={props.classes} />}
           
            
        </div >
    );
}
export default Calculator;
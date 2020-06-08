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
import Wizard from "components/Wizard/Wizard.jsx";


import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Edit from "@material-ui/icons/Edit";



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
//import Collapsible from 'react-collapsible';
import ProspectInformation from "./ProspectInformation";
import Accordion from "components/Accordion/Accordion.jsx";
import NeedAnalysis from "./NeedAnalysis.jsx";
//import { CollapsibleComponent, CollapsibleHead, CollapsibleContent } from 'react-collapsible-component';
import NeedAnalysisCompleted from "./NeedAnalysisCompleted.jsx";





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
const MyBtn = {
    padding: "20px"
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
const ProspectScreen =(props)=> {
    
    

        //const { classes } = props;
        console.log("NeedAnalysis propspectscreen: ", props);
        return (
            <div>
                {/*<CollapsibleComponent>
                <CollapsibleHead className="additionalClassForHead" isExpanded={true}>Prospect Information </CollapsibleHead>
                <CollapsibleContent isExpanded={true}>
                    <ProspectInformation />
                </CollapsibleContent>
            
           
            <CollapsibleHead isExpanded={true}>Need Analysis</CollapsibleHead>
                    <CollapsibleContent className="additionalClassForContent">
                    <NeedAnalysis />
                </CollapsibleContent>
                </CollapsibleComponent>
                <GridContainer justify="center">
                <Button>Create Quote</Button>
                    <Button>Download Graph</Button>
                </GridContainer>*/}
                <GridContainer lg={12} justify="center">
                    <GridItem xs={12}>
                <Accordion
                    active={0}
                    collapses={[
                        {
                            title: "Prospect Information",
                            content: <ProspectInformation />

                        },
                        {
                            title: "Need Analysis",
                            content: <NeedAnalysis show={props.show} ProspectpoolDTO={props.ProspectpoolDTO} SetValue={props.SetValue} PersonalInfoDTO={props.PersonalInfoDTO} RetirementCalculatorDTO={props.RetirementCalculatorDTO} handleChange={props.handleChange} show={props.show}
                                openCal={props.openCal} editModal={props.editModal} showCalc={props.showCalc} showFNA={props.showFNA} handleClose={props.handleClose} caledit={props.caledit} FNAedit={props.FNAedit}
                                showCalc={props.showCalc} showFNA={props.showFNA} RetCalSetValue={props.RetCalSetValue}

                                calcObj={props.calcObj}
                                handleChangeCalc={props.handleChangeCalc} showRetirement={props.showRetirement}
                                showEducation={props.showEducation} showHumanValue={props.showHumanValue}
                                showHealth={props.showHealth} showSavings={props.showSavings}
                                fundbal={props.fundbal} Checked={props.Checked} display={props.display}
                                FinancilaObligationsData={props.FinancilaObligationsData} healthAdversitiesData={props.healthAdversitiesData}
                                handleddtChange={props.handleddtChange} HealthMasddlDTO={props.HealthMasddlDTO} masterList={props.masterList} HealthddlSetValue={props.HealthddlSetValue}
                            />

                        }
                    ]}
                        />
                        </GridItem>
                </GridContainer>
                <GridContainer justify="center">
                    <Button color="info">Create Quote</Button>
                    <Button color="info">Download Graph</Button>
                </GridContainer>
                </div>
        );
       
   
   
}
export default withStyles(style)(ProspectScreen);
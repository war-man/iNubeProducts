import React from "react";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
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
import ReactTable from "react-table";
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes'; 

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



const AnnualIncomeSurplus =(props)=> {
    console.log("AISProps", props);
    const retcalData = props.componentData.RetirementCalculatorDTO;
    return (
        
                <div>


                    <GridItem>
                        <CustomInput
                            labelText="Estimated Annual Living Expenses"
                            id="estimatedAnnuallivingExpenses"
                            onChange={(e) => props.componentData.RetCalSetValue(e)}
                            name='estimatedAnnuallivingExpenses'
                            value={retcalData[0].estimatedAnnuallivingExpenses}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem >
                        <CustomInput
                            labelText="Per Annum Interest Income"
                            id="MonthlyLivingExpenses"
                            onChange={(e) => props.componentData.RetCalSetValue(e)}
                            name=' perAnnumIncome'
                            value={retcalData[0].perAnnumIncome}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />

                    </GridItem>
                    <GridItem>
                        <CustomInput
                            labelText="Exisiting Income Sources"
                            id="MonthlyLivingExpenses"
                            onChange={(e) => props.componentData.RetCalSetValue(e)}
                            name=' exsitingotherincome'
                            value={retcalData[0].exsitingotherincome}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />

                    </GridItem>
                    <GridItem>
                        <CustomInput
                            labelText="Total"
                            id="MonthlyLivingExpenses"
                            onChange={(e) => props.componentData.RetCalSetValue(e)}
                            name=' toYear'
                            value={retcalData[0].perAnnumIncome}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />

                    </GridItem>

                </div>
            )
    
    
}
export default withStyles(style)(AnnualIncomeSurplus);
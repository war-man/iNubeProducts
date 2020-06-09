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
//import Multiselect from 'multiselect-dropdown-react';
import FinancialAnalysis from "./Calculator.jsx";
import CustomDropDownTree from "components/CustomDropdownTree/CustomDropDownTree.jsx";

import data from "views/Test/data.json";




const options = [
    { "label": "Childer Higher Education", id: 1 },
    { "label": 'Children Wedding', id: 2 },
    { "label": 'Buy a Property/Vehicle', id: 3 },
    { "label": 'Settlement of Loans', id: 4 },
    { "label": 'Others', id: 5 },
   
];

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

const FundBalance = (props) => {

    console.log("FundBalance Props:", props);
    const caldata = props.componentData.RetirementCalculatorDTO;
            return (

                <div>
                    <GridContainer>
                        <GridItem xs={5}>
                            <h3>
                                <small>Financial Obligations</small>
                            </h3>
                        </GridItem>
                    <GridItem xs={12} sm={6} className="dropdowntree">
                     <div>
                               <CustomDropDownTree
                                    data={props.componentData.FinancilaObligationsData[0].mdata}
                                    onChange={props.componentData.handleddtChange}
                                />
                                {/* <Multiselect options={props.componentData.FinancilaObligationsData[0].mdata} onSelectOptions={props.componentData.handleddtChange} />*/}
                        </div>
                        </GridItem>

                      
                    <GridItem>
                        <CustomInput
                            labelText="Fund Balance"
                            id="MonthlyLivingExpenses"
                            onChange={(e) => props.componentDataRetCalSetValue(e)}
                            name='estimatedTotalMonthlyExpense'
                            value={caldata[0].estimatedTotalMonthlyExpense}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            labelText="Fund Balance"
                                id="MonthlyLivingExpenses"
                                onChange={(e) => props.componentDataRetCalSetValue(e)}
                                name='estimatedTotalMonthlyExpense'
                                value={caldata[0].estimatedTotalMonthlyExpense}
                                 formControlProps={{
                                fullWidth: true
                            }}
                        />

                        </GridItem>
                    </GridContainer>
                </div>
            )
    
    
}
export default withStyles(style)(FundBalance);
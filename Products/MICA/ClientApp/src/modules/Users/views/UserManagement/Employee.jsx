import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import InputLabel from "@material-ui/core/InputLabel";
//import FormControl from "@material-ui/core/FormControl";
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
import CustomInput from "components/CustomInput/CustomInput.jsx";
//import Datetime from "react-datetime";
import $ from 'jquery'

//import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
//import CardHeader from "components/Card/CardHeader.jsx";
//import CardIcon from "components/Card/CardIcon.jsx";
//import FilterNone from "@material-ui/icons/FilterNone";
//import Alerts from "components/CustomAlerts/Alerts.jsx"; 

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
//import CreateUser from "modules/Users/views/UserManagement/_CreateUser.jsx";
import './style.css';

import { Animated } from "react-animated-css";

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

//const validateBtn = {
//    height: "35px",
//    marginTop: "-10px"
//}

//const CustomTableCell = withStyles(theme => ({
//    head: {
//        backgroundColor: "#e91e63",
//        color: theme.palette.common.white,
//    },
//    body: {
//        fontSize: 14,
//    },
//}))(TableCell);

//const textAlign = {
//    textAlign: 'center'
//}

//const subHeading = { color: '#407ba4', marginLeft: '10px', display: 'none' }

//const tableStyle = { borderRadius: '2px', display: 'none', width: 'min-content' }

//const tableRow = { height: '45px' }

//const addBtn = { margin: '0 auto' }

//const gridItem = { marginTop: '3px' }

//const dateStyle = {
//    width: "max-content",
//    marginLeft: "180px",
//    marginTop: "-25px",
//    backgroundColor: "transparent",
//    border: "none",
//    zoom: "1.15"
//}
//const btnStyle = {
//    height: "35px",
//    textAlign: "center"
//}
const Employee = (props) => {
    return (
        <div >
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                                //success={props.employeeidState == "success"}
                                //error={props.employeeidState == "error"}
                                error={props.employeeidState}
                                labelText="Employee Code"
                                id="empId"
                                required={true}
                                name="employeeid"
                                value={props.employeeid}
                                //onChange={(e) => props.employeeChange("number", e)}
                                onChange={(e) => props.employeeChange(e)}
                                multiline={false}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />

                        </GridItem>
                    </GridContainer>
                    <GridContainer justify="center">
                        <GridItem >
                            <div>
                                <Button color="success"
                                    onClick={props.handleemployeedata}
                                    round className={props.classes.marginRight} id="validateBtn">
                                    Validate
                            </Button>

                            </div>
                        </GridItem>
                    </GridContainer>

                </CardBody>

            </Animated>
        </div>
    );
}
export default withStyles(style)(Employee);

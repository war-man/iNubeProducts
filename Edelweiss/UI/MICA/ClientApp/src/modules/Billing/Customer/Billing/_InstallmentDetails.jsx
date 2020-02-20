import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Datetime from "react-datetime";
import $ from 'jquery'

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import FilterNone from "@material-ui/icons/FilterNone";
import Alerts from "components/CustomAlerts/Alerts.jsx"; 

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import { Animated } from "react-animated-css";

import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import ReactTable from "react-table";

//import './style.css';

//import {Animated} from "react-animated-css";

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
const saveBtn = {
    height: "35px",
    marginTop: "-10px"
}
const cancelBtn = {
    height: "35px",
    marginTop: "-10px"
}
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#e91e63",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const textAlign = {
    textAlign: 'center'
}

const subHeading = { color: '#407ba4', marginLeft: '10px', display: 'none' }

const tableStyle = { borderRadius: '2px', display: 'none', width: 'min-content' }

const tableRow = { height: '45px' }

const addBtn = { margin: '0 auto' }

const gridItem = { marginTop: '3px' }

const dateStyle = {
    width: "max-content",
    marginLeft: "180px",
    marginTop: "-25px",
    backgroundColor: "transparent",
    border: "none",
    zoom: "1.15"
}

const btnStyle = {
    height: "35px",
    textAlign: "center"
}
   
const InstallmentDetails = (props) => {
    let classes = props.classes;
    console.log("props installment", props);

    return (
        <div>
       
                <h3 >
                    <small> Installments Details </small>
                </h3>
           
           
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}> 
                    <CardBody>
                    <GridContainer>

                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="NoOfInstallments"
                                value={props.billingItem[props.frequencyIndex].noofFrequency}
                                name="noofFrequency"
                                inputType="number"
                                type="numeric"
                                onChange={(e) => props.SetnoofFrequency("string", e, props.frequencyIndex)}
                                id="Installments"
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                       
                        <GridItem xs={12} sm={12} md={4}>
                            <div style={{ marginTop: "24px" }}>

                                <FormControlLabel
                                    control={
                                        <Radio

                                            checked={props.singleValueSelectedProposer === "0"}
                                            onChange={props.handleRadioOnChange}
                                            disabled={props.viewdisable}
                                            value={0}
                                            name="radio button demo"
                                            aria-label="B"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label="Equal"
                                />

                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={props.singleValueSelectedProposer === "1"}
                                            onChange={props.handleRadioOnChange}
                                            disabled={props.viewdisable}
                                            value={1}
                                            name="radio button demo"
                                            aria-label="B"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label="Varying"
                                />
                            </div>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={4}>
                        <GridContainer>
                       
                                {/* <GridItem xs={8} sm={6} md={3} lg={3} id="ddRemainingBalance" style={{ display: 'none' }}> */}
                                    {props.remainingBalance == true ?
                                        <GridItem xs={8} sm={6} md={3} lg={3}>
                                    <br />
                                <label>
                                    <div className="assign-role-info">
                                                <label>  Remaining Balance:</label><h5> {`${props.rembalance}`} </h5>&nbsp;&nbsp;
                                            <hr></hr>
                                        </div>

                                            </label>
                                        </GridItem>
                                       : null}
                                {/* </GridItem> */}
                         
                            </GridContainer>
                        </GridItem>
                        <GridContainer justify="center">
                        <GridItem>

                                <ReactTable
                                    data={props.billingItem[props.frequencyIndex].BillingItemDetail}
                                        filterable
                                        columns={[
                                            {
                                                Header: " S No",
                                                accessor: "SNo",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 150,
                                                resizable: false,

                                            },
                                            {
                                                Header: "Installments",
                                                accessor: "Installments",
                                                style: { textAlign: "right" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 150,
                                                resizable: false,

                                            },
                                            {

                                                Header: "Installment Amount",
                                                accessor: "Installmentamount",

                                                style: { textAlign: "right" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 150,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Details",
                                                accessor: "Details",

                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 150,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Due Date",
                                                accessor: "DueDate",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 150,
                                                resizable: false,
                                            },
                                            

                                        ]}
                                        //defaultPageSize={5}
                                        showPaginationTop={false}
                                    pageSize={([props.billingItem[props.frequencyIndex].BillingItemDetail.length + 1] < 5) ? [props.billingItem[props.frequencyIndex].BillingItemDetail.length + 1] : 5}
                                        showPaginationBottom
                                        className="-striped -highlight discription-tab"
                                    />



                               

                            </GridItem>
                        </GridContainer>
                    </GridContainer>
                
                    </CardBody>
            </Animated>
        </div>
        );
}

export default withStyles(style)(InstallmentDetails);


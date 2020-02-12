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

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

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
    textAlign : 'center'
}

const subHeading = { color: '#407ba4', marginLeft: '10px', display: 'none' }

const tableStyle = { borderRadius: '2px', display: 'none', width: 'min-content' }

const tableRow = { height : '45px'}

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
class DataEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            simpleSelect: "",
            bankName: "",
            paymentType: "",
            productName: "",
            productId: "",
            branchName: "",
            payType: "",
            radioVal: ""

        };
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    showPaymentTable = () => {
        document.getElementById('paymentTab').style.display = 'block';
    }

    getRadioButtonVal = event => {
        this.setState({
            radioVal: event.target.value
        })
    }

    addDetails = () => {
        document.getElementById('subHead').style.display = 'block'
        document.getElementById('custDetTable').style.display = 'block';
        var custId = $("#custId").val();
        var custName = $("#custName").val();
        var adharNo = $("#adharNo").val();
        var mobileNo = $("#mobileNo").val();
        var emailId = $("#emailId").val();
      


        var table = document.getElementById('custDetTable');
        var row = table.insertRow(-1);
        row.className = 'tableClassRow';
        var cell1 = row.insertCell(-1);
        var cell2 = row.insertCell(-1);
        var cell3 = row.insertCell(-1);
        var cell4 = row.insertCell(-1);
        var cell5 = row.insertCell(-1);
        var cell6 = row.insertCell(-1);
        cell1.innerHTML = custId;
        cell2.innerHTML = custName;
        cell3.innerHTML = adharNo;
        cell4.innerHTML = mobileNo;
        cell5.innerHTML = emailId;
        cell6.innerHTML = '<span class="delete"><i class="fa fa-trash del-btn" aria-hidden="true"></i><span/><span class="edit"><i class="fa fa-pencil ed-btn" aria-hidden="true"></i><span/>';

        $(".delete").on('click', function () {
            $(this).parent().parent().remove();
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>

                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Customer ID"
                            id="custId"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Customer Name"
                            id="custName"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Aadhar No"
                            id="adharNo"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                   
                    <GridItem xs={12} sm={12} md={4} >
                        <CustomInput
                            labelText="Mobile Number"
                            id="mobileNo"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            labelText="Email Id"
                            id="emailId"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} style={gridItem}>
                        <InputLabel className={classes.label}>Active To</InputLabel>
                        <br />
                        <FormControl fullWidth>
                            <Datetime 
                                className="md-form-cal"
                                timeFormat={false}
                                inputProps={{ placeholder: "Active To" }}
                            /><button style={dateStyle}><i className="fa fa-calendar fa-lg"></i></button>
                        </FormControl>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={2} style={addBtn}>
                       
                        <Button color="success" round className={classes.marginRight} style={btnStyle} onClick={this.addDetails}>
                            Add
                        </Button>
                    </GridItem>
                </GridContainer>


                <h4 style={subHeading} id="subHead">Customer Details</h4>
                <Table className={classes.table} style={tableStyle} id="custDetTable">
                    <TableHead>
                        <TableRow className="table-row" style={tableRow}>
                            <CustomTableCell style={textAlign}>CUSTOMER ID</CustomTableCell>
                            <CustomTableCell style={textAlign}>CUSTOMER NAME</CustomTableCell>
                            <CustomTableCell style={textAlign}>AADHAR NO</CustomTableCell>
                            <CustomTableCell style={textAlign}>MOBILE NO</CustomTableCell>
                            <CustomTableCell style={textAlign}>EMAIL ID</CustomTableCell>
                            <CustomTableCell style={textAlign}>ACTIONS</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <CustomTableCell></CustomTableCell>
                        <CustomTableCell></CustomTableCell>
                        <CustomTableCell></CustomTableCell>
                        <CustomTableCell></CustomTableCell>
                        <CustomTableCell></CustomTableCell>
                        <CustomTableCell></CustomTableCell>
                    </TableBody>
                </Table>




            </div>
        );
    }
}

export default withStyles(style)(DataEntry);

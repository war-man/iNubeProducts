import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomRadioButton from "components/CustomRadiobutton/CustomRadiobutton";
import SearchInvoice from "../Invoice/SearchInvoice";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import HistoryCollapse from "./_HistoryCollapse";
import Radio from "@material-ui/core/Radio";
import PaymentDetails from "./_PaymentDateils";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import { Animated } from "react-animated-css";
import Button from "components/CustomButtons/Button.jsx";


import FormControl from "@material-ui/core/FormControl";






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


const InvoiceFinance = (props) => {
    let classes = props.classes;

    return (
        <div>
        <Card className="assignCard">
            <CardHeader color="rose" icon>
                <CardIcon color="rose">
                    <Icon><img id="icon" /></Icon>
                </CardIcon>
                {
                    <h4 >
                        <small> Invoice Details  </small>
                    </h4>
                }
            </CardHeader>
            <CardBody>

                <GridContainer justify="center">
                    <GridItem xs={8} sm={6} md={3} lg={3} >
                        <br />
                        <label>
                            <div className="banner">
                                <label>  Invoice No:</label><h5>{`${props.InvoiceSelectedNo}`} </h5>&nbsp;&nbsp;
                                            <hr></hr>
                            </div>
                        </label>
                        <br />
                    </GridItem>
                </GridContainer>


                <GridContainer>
                    <GridItem xs={12} sm={4}>
                        <CustomInput
                            labelText="Contract Id"
                            name="contractId"
                            disabled="true"
                            // required={true}
                            value={props.InvDatails[0].contractId}
                            //onChange={(e) => this.onInputChange(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4}>
                        <CustomInput
                            labelText="Organization Name"
                            name="orgName"
                            disabled="true"
                            // required={true}
                            value={props.InvDatails[0].orgName}
                            //onChange={(e) => this.onInputChange(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <CustomDatetime required={true}
                            //onFocus={this.state.InvoiceViewData.onClick}
                            labelText="Invoice Date"
                            disabled="true"
                            id='invoiceDate'
                            name='invoiceDate'
                            //onChange={(evt) => this.onDateChange('datetime', 'invoiceDate', evt)} 
                            value={new Date(props.InvDatails[0].invoiceDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', })}
                            formControlProps={{ fullWidth: true }} />
                    </GridItem>

                    <GridItem xs={12} sm={4}>
                        <CustomInput
                            labelText="Invoice Amount"
                            name="invAmount"
                            disabled="true"
                            // required={true}
                            value={props.InvDatails[0].invAmount}
                            //onChange={(e) => this.onInputChange(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4}>
                        <CustomInput
                            labelText="Paid Amount"
                            name="paid"
                            disabled="true"
                            // required={true}
                            value={props.InvDatails[0].paid}
                            //onChange={(e) => this.onInputChange(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4}>
                        <CustomInput
                            labelText="Balance Amount"
                            name="balance"
                            disabled="true"
                            // required={true}
                            value={props.InvDatails[0].balance}
                            //onChange={(e) => this.onInputChange(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4}>
                        <CustomInput
                            labelText="Credit Days Remaining"
                            name="creditdays"
                            disabled="true"
                            // required={true}
                            value={props.InvDatails[0].creditDaysRemaining}
                            //onChange={(e) => this.onInputChange(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>



                    
                </GridContainer>
            </CardBody>

            </Card>

            <GridContainer justify="center">
                <GridItem xs={12}>

                    <ReactTable
                        data={props.payment}
                        filterable
                        columns={[
                            {
                                Header: " S No",
                                accessor: "SNo",
                                style: { textAlign: "right" },
                                headerClassName: 'react-table-center',
                                minWidth: 50,
                                resizable: false,

                            },
                            {
                                Header: "Payment Type",
                                accessor: "PaymentType",
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center',
                                minWidth: 70,
                                resizable: false,

                            },
                            {

                                Header: "Bank Name",
                                accessor: "BankName",
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center',
                                minWidth: 50,
                                resizable: false,
                            },
                            {
                                Header: "Branch Name",
                                accessor: "BranchName",

                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center',
                                minWidth: 50,
                                resizable: false,
                            },
                            {
                                Header: "IFSC Code",
                                accessor: "IFSCCode",

                                ///style: { textAlign: "center" },
                                ///headerClassName: 'react-table-center'
                                style: { textAlign: "right" },
                                headerClassName: 'react-table-center',
                                minWidth: 50,
                                resizable: false,
                            },
                            {
                                Header: " Payment Reference Id",
                                accessor: "PaymentRefId",
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center',
                                minWidth: 40,
                                resizable: false,

                            },
                            {
                                Header: " Payment Amount",
                                accessor: "PaymentAmount",
                                style: { textAlign: "right" },
                                headerClassName: 'react-table-center',
                                minWidth: 40,
                                resizable: false,

                            },
                            {
                                Header: " Payment Date",
                                accessor: "PaymentDate",
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center',
                                minWidth: 40,
                                resizable: false,

                            },
                            {
                                Header: "Actions",
                                accessor: "btn",
                                style: { textAlign: "center" },
                                headerClassName: 'react-table-center',
                                minWidth: 60,
                                resizable: false,

                            },

                        ]}
                        defaultPageSize={3}
                        showPaginationTop={false}
                        //pageSize={([prop.paymentForInvoice.length + 1] < 5) ? [prop.paymentForInvoice.length + 1] : 5}
                        showPaginationBottom
                        className="-striped -highlight discription-tab"
                    />

                </GridItem>

            </GridContainer>

            <GridContainer justify="center">
                <GridItem >

                    <Animated animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
                        <div>

                            <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={props.handleUpdateStatus} >
                                Update State
                                               </Button>
                        </div>
                    </Animated>
                </GridItem>

            </GridContainer>

            <GridContainer justify="center">
                <GridItem xs={12} >
                    <HistoryCollapse props={props} />
                </GridItem>
            </GridContainer>
        </div>
    );

}

export default withStyles(style)(InvoiceFinance);
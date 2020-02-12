import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import withStyles from "@material-ui/core/styles/withStyles"; 
import ReactTable from "components/MuiTable/MuiTable.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { Animated } from "react-animated-css";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";


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


    const PaymentDetails = (props) => {
        let classes = props.classes;
        let prop = props.props;
        let index = prop.PaymentDto.length - 1;
        return (
            <div>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                <CardHeader color="rose" icon>
                    
                        <h3>
                            <small> Payment Details </small>
                        </h3>
                   
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={4}>
                            <MasterDropdown
                                labelText="Payment Type"
                                id="paymentTypeId"
                                value={prop.PaymentDto[index].paymentTypeId}
                                lstObject={prop.masterList}
                                required={true}
                                filterName='PaymentType'
                                //model="LeadDTO"
                                name='paymentTypeId'
                                onChange={(e) => prop.onInputChange("string",e, index)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                success={prop.paymentRefIdState === "success"}
                                error={prop.paymentRefIdState === "error"}
                                labelText="Payment Reference No"
                                name="paymentRefId"
                                //disabled="true"
                                // required={true}
                                value={prop.PaymentDto[index].paymentRefId}
                                onChange={(e) => prop.onInputChange("number",e, index)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                success={prop.bankNameState === "success"}
                                error={prop.bankNameState === "error"}
                                labelText="Bank Name"
                                name="bankName"
                                //disabled="true"
                                // required={true}
                                value={prop.PaymentDto[index].bankName}
                                onChange={(e) => prop.onInputChange("string",e, index)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                success={prop.branchNameState === "success"}
                                error={prop.branchNameState === "error"}
                                labelText="Branch Name"
                                name="branchName"
                                //disabled="true"
                                // required={true}
                                value={prop.PaymentDto[index].branchName}
                                onChange={(e) => prop.onInputChange("string",e, index)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                success={prop.ifscCodeState === "success"}
                                error={prop.ifscCodeState === "error"}
                                labelText="IFSC Code"
                                name="ifscCode"
                                //disabled="true"
                                // required={true}
                                value={prop.PaymentDto[index].ifscCode}
                                onChange={(e) => prop.onInputChange("string",e, index)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomDatetime required={true}
                                //onFocus={this.state.InvoiceViewData.onClick}
                                labelText="Payment Date"
                                //disabled="true"
                                id='paymentDate'
                                //name='invoiceDate'
                                onChange={(evt) => prop.onDateChange('datetime', 'paymentDate', index, evt)} 
                                value={prop.PaymentDto[index].paymentDate} 
                                formControlProps={{ fullWidth: true }} />
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                success={prop.paymentAmountState === "success"}
                                error={prop.paymentAmountState === "error"}
                                labelText="Payment Amount"
                                name="paymentAmount"
                                //disabled="true"
                                // required={true}
                                onBlur={(e) => prop.onBlur(e, index)}
                                value={prop.PaymentDto[index].paymentAmount}
                                onChange={(e) => prop.onInputChange("number",e, index)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                success={prop.paidState === "success"}
                                error={prop.paidState === "error"}
                                labelText="Total Paid Amount"
                                name="paid"
                                disabled="true"
                                // required={true}
                                value={prop.PaymentDto[index].paid}
                                onChange={(e) => prop.onInputChange("number",e, index)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={4}>
                            <CustomInput
                                success={prop.balanceState === "success"}
                                error={prop.balanceState === "error"}
                                labelText="Balance Invoice Amount"
                                name="balance"
                                disabled="true"
                                // required={true}
                                value={prop.PaymentDto[index].balance}
                                onChange={(e) => prop.onInputChange("number",e, index)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                        <GridContainer justify="center">
                            <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={prop.handlePaymenttable} >
                                Add Payment
                        </Button>
                        </GridContainer>
                    </GridContainer>

                </CardBody>
                {prop.payTableFlag?
                        <GridContainer>
                            <GridItem xs={12}>
                               
                            <ReactTable
                                data={prop.payList}
                                filterable
                                columns={[
                                    {
                                        Header: " S No",
                                        accessor: "SNo",
                                        style: { textAlign: "center" },
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
                                        minWidth: 70,
                                        resizable: false,

                                    },
                                    {
                                        Header: " Payment Amount",
                                        accessor: "PaymentAmount",
                                        style: { textAlign: "right" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 80,
                                        resizable: false,

                                    },
                                    {
                                        Header: " Payment Date",
                                        accessor: "PaymentDate",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 80,
                                        resizable: false,

                                    },
                                    {
                                        Header: " ",
                                        accessor: "btn",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 40,
                                        resizable: false,

                                    },

                                ]}
                                defaultPageSize={3}
                                showPaginationTop={false}
                                 //pageSize={([prop.paymentForInvoice.length + 1] < 5) ? [prop.paymentForInvoice.length + 1] : 5}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                                    />
                                   
                                
                        <GridContainer justify="center">
                            <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={prop.handleAddPayment} >
                                Update
                        </Button>
                        </GridContainer>
                    </GridItem>

                </GridContainer>
                    : null}
                 </Animated>
            </div>
        );
    
}

export default withStyles(style)(PaymentDetails);
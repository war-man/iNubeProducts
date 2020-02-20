﻿import React from "react";

// @material-ui/core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ClaimsDecision from "./ClaimsDecision.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";


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

        backgroundColor: "#F29498",

        color: theme.palette.common.white,

        border: "1px solid #eee"



    },

    body: {

        fontSize: 14,

    },

}))(TableCell);

const ClaimDetails = (props) => {
    console.log("claimDetailsData123", props);
    // const { classes } = this.props;
    const claimDetailsprops = props.componentData;

    console.log('claimDetailsprops', claimDetailsprops);

    // const claimAmountData = props;

    return (
        <div>
           
                    <GridContainer>
                        <GridItem xs={12} sm={4} md={3}>


                            <CustomInput

                                // success={this.state.firstNameState == "success"}
                                // error={this.state.firstNameState == "error"}
                                labelText="LossDate"
                                // required={true}
                                // id="fName"
                                value={claimDetailsprops.claimDetailsData.lossDate}
                                name='lossDate'
                                // onChange={(e) => claimDetailsprops.SetClaimValues("string", e)}
                                //modelbind={model('UserDetailsDTO.FirstName')}
                                disabled={claimDetailsprops.disabled}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>


                        <GridItem xs={12} sm={4} md={3}>


                            <CustomInput
                                disabled={claimDetailsprops.disabled}
                                // success={this.state.firstNameState == "success"}
                                // error={this.state.firstNameState == "error"}
                                labelText="LocationOfLoss"
                                // required={true}
                                // id="fName"
                                value={claimDetailsprops.claimDetailsData.locationOfEvent}
                                name='locationOfEvent'
                                // onChange={(e) => claimDetailsprops.SetClaimValues("string", e)}
                                //modelbind={model('UserDetailsDTO.FirstName')}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>

                        <GridItem xs={12} sm={4} md={3}>


                            <CustomInput
                                disabled={claimDetailsprops.disabled}
                                // success={this.state.firstNameState == "success"}
                                // error={this.state.firstNameState == "error"}
                                labelText="LossDescription"
                                // required={true}
                                // id="fName"
                                value={claimDetailsprops.claimDetailsData.lossDescription}
                                name='lossDescription'
                                onChange={(e) => claimDetailsprops.SetClaimValues("string", e)}
                                //modelbind={model('UserDetailsDTO.FirstName')}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>


                    </GridContainer>

                    <GridContainer justify="center" >
                        <GridItem xs={12}>

                            <ReactTable
                                data={claimDetailsprops.TableData}
                                filterable
                                columns={[
                                    {
                                        Header: "SerialNo",
                                        accessor: "id",
                                        headerClassName: 'react-table-center',
                                        setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                        minWidth: 200,
                                        sortable: false,
                                        //  filterable: false 
                                    },
                                    {
                                        // Header: "Cover Event Factor - From Value",
                                        Header: "InsurableItem",
                                        accessor: "insurableItem",
                                        minWidth: 40,
                                        setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                        headerClassName: 'react-table-center'
                                    },
                                    {
                                        Header: "Name",
                                        accessor: "name",
                                        minWidth: 40,
                                        setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                        headerClassName: 'react-table-center'
                                    },
                                    {
                                        Header: "IdentificationNo",
                                        accessor: "identificationNo",
                                        minWidth: 40,
                                        setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                        headerClassName: 'react-table-center'
                                    },
                                    {
                                        Header: "TypeOfLoss",
                                        accessor: "typeOfLoss",
                                        minWidth: 40,
                                        setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                        headerClassName: 'react-table-center'
                                    },

                                    {
                                        Header: "BenefitAmount",
                                        accessor: "benefitAmount",
                                        minWidth: 40,
                                        setCellProps: (value) => ({ style: { textAlign: "center" } }),
                                        headerClassName: 'react-table-center',

                                    },
                                    {
                                        Header: "ClaimAmount",
                                        accessor: "claimAmounts",
                                        setCellProps: (value) => ({ style: { textAlign: "center" } }),
                                        minWidth: 40,
                                        headerClassName: 'react-table-center',
                                        //sortable: false,
                                        //filterable: false

                                    },

                                    {
                                        Header: "ApprovedAmount",
                                        accessor: "approvedClaimAmounts",
                                        setCellProps: (value) => ({ style: { textAlign: "right" } }),
                                        minWidth: 50,
                                        headerClassName: 'react-table-center',
                                        //sortable: false,
                                        //filterable: false

                                    },


                                ]}
                                defaultPageSize={4}
                                pageSize={([claimDetailsprops.TableData.length + 1] < 4) ? [claimDetailsprops.TableData.length + 1] : 4}
                                showPaginationTop={false}
                                //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                                showPaginationBottom={true}
                                className="-striped -highlight discription-tab"

                            />

                        </GridItem>
                    </GridContainer>



                    <GridContainer lg={12} justify="flex-end">

                        <GridItem xs={5} sm={3} md={3} lg={4}>
                            <CustomInput
                                disabled={claimDetailsprops.disabled}
                                labelText="TotalClaimAmt"
                        name="totalClaimedAmount"
                        type = "numeric"
                                // required={true}
                                value={claimDetailsprops.claimDetailsData.totalClaimedAmount}
                                //onChange={(e) => claimDetailsprops.handleClaimAmount(e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                        <GridItem xs={5} sm={3} md={3} lg={4}>
                            <CustomInput
                                labelText="ApprovedAmt"
                                name="approvedClaimAmount"
                                 type="numeric"
                                inputType="number"
                                // required={true}
                                value={claimDetailsprops.fields.approvedClaimAmount}
                                onChange={(e) => claimDetailsprops.handleClaimAmount(e)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>

                    </GridContainer>

                    <GridContainer>
                        <CardHeader color="info" icon >
                            {
                                <h3 >
                            <small><TranslationContainer translationKey="BankDetails"/></small>
                                </h3>
                            }
                        </CardHeader>

                        <GridContainer>
                            <GridItem xs={12} sm={4} md={3}>


                                <CustomInput
                                    disabled={claimDetailsprops.disabled}
                                    // success={this.state.firstNameState == "success"}
                                    // error={this.state.firstNameState == "error"}
                                    labelText="AccountHolderName"
                                    // required={true}
                                    // id="fName"
                                    value={claimDetailsprops.claimDetailsData.accountHolderName}
                                    name='accountHolderName'
                                    // onChange={(e) => claimDetailsprops.SetClaimValues("string", e)}
                                    //modelbind={model('UserDetailsDTO.FirstName')}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>


                            <GridItem xs={12} sm={4} md={3}>


                                <CustomInput
                                    disabled={claimDetailsprops.disabled}
                                    // success={this.state.firstNameState == "success"}
                                    // error={this.state.firstNameState == "error"}
                                    labelText="AccountNo"
                                    // required={true}
                                    // id="fName"
                                    value={claimDetailsprops.claimDetailsData.accountNumber}
                                    name='accountNumber'
                                    //onChange={(e) => claimDetailsprops.SetClaimValues("string", e)}
                                    //modelbind={model('UserDetailsDTO.FirstName')}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={4} md={3}>


                                <CustomInput
                                    disabled={claimDetailsprops.disabled}
                                    // success={this.state.firstNameState == "success"}
                                    // error={this.state.firstNameState == "error"}
                                    labelText="BankName"
                                    // required={true}
                                    // id="fName"
                                    value={claimDetailsprops.claimDetailsData.bankName}
                                    name='bankName'
                                    //onChange={(e) => claimDetailsprops.SetClaimValues("string", e)}
                                    //modelbind={model('UserDetailsDTO.FirstName')}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={4} md={3}>


                                <CustomInput
                                    disabled={claimDetailsprops.disabled}
                                    // success={this.state.firstNameState == "success"}
                                    // error={this.state.firstNameState == "error"}
                                    labelText="IFSCCode"
                                    // required={true}
                                    // id="fName"
                                    value={claimDetailsprops.claimDetailsData.ifscCode}
                                    name='ifscCode'
                                    // onChange={(e) => claimDetailsprops.SetClaimValues("string", e)}
                                    //modelbind={model('UserDetailsDTO.FirstName')}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={12}>


                                <CustomInput
                                    disabled={claimDetailsprops.disabled}
                                    // success={this.state.firstNameState == "success"}
                                    // error={this.state.firstNameState == "error"}
                                    labelText="BankBranchAddress"
                                    // required={true}
                                    // id="fName"
                                    value={claimDetailsprops.claimDetailsData.bankAddress}
                                    name='bankAddress'
                                    //onChange={(e) => claimDetailsprops.SetClaimValues("string", e)}
                                    //modelbind={model('UserDetailsDTO.FirstName')}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                        </GridContainer>

            </GridContainer>

            
               <ClaimsDecision claimStatusIdState={claimDetailsprops.claimStatusIdState} claimManagerRemarksState={claimDetailsprops.claimManagerRemarksState}
                fields={claimDetailsprops.fields} ClaimsDecisionData={claimDetailsprops.ClaimsDecisionData} handleChange={claimDetailsprops.handleChange} onFormSubmit={claimDetailsprops.onFormSubmit}
                approved={claimDetailsprops.approved} onInputParamChange={claimDetailsprops.onInputParamChange} fields={claimDetailsprops.fields} errormessage={claimDetailsprops.errormessage}
                ValidationUI={claimDetailsprops.ValidationUI} classes={claimDetailsprops.classes} errorstatus={claimDetailsprops.errorstatus} DecisionType={claimDetailsprops.DecisionType} />

               

          </div>

    );

}

export default ClaimDetails;
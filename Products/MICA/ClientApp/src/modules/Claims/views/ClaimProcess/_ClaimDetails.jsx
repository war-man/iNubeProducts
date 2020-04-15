import React from "react";

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
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import CustomDatetime from "components/CustomComponent/CustomDatetimeFormate.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import CustomDropDownTree from "components/CustomDropdownTree/CustomDropDownTree.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import Button from "components/CustomButtons/Button.jsx";
import ClaimBankDetails from "./ClaimBankDetails.jsx";


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

let payeetype = "";
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
    //console.log('claimDetailsprops.typeList', claimDetailsprops.typeList);
    console.log("claimDetailsprops.ClaimStatusData", claimDetailsprops.ClaimStatusData);
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
                        value={claimDetailsprops.claimDetailsData.lossDescription}
                        name='lossDescription'
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                {
                    claimDetailsprops.vehicleclaim &&

                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            disabled={claimDetailsprops.disabled}
                            labelText="Vehicle Location"
                            value={claimDetailsprops.claimDetailsData.vehicleLocation}
                            name='vehicleLocation'
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                }

                {
                    claimDetailsprops.vehicleclaimstate &&

                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            disabled={claimDetailsprops.disabled}
                            labelText="Vehicle Location State"
                            value={claimDetailsprops.claimDetailsData.vehicleLocationState}
                            name='vehicleLocationState'
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                }

                {
                    claimDetailsprops.vehicleclaimdriver &&

                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            disabled={claimDetailsprops.disabled}
                            labelText="Driver Name"
                            value={claimDetailsprops.claimDetailsData.driverName}
                            name='driverName'
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                }

                {
                    claimDetailsprops.vehicleclaimsurvey &&

                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            disabled={claimDetailsprops.disabled}
                            labelText="Self-Survey Required"
                            value={claimDetailsprops.claimDetailsData.selfSurvey}
                            name='selfSurvey'
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                }

                {
                    claimDetailsprops.PerformerFlag &&

                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            //disabled={claimDetailsprops.disabled}
                            labelText="Performer"
                            value={claimDetailsprops.fields.AdditionalDetails.Performer}
                            onChange={claimDetailsprops.handlePerformerFun}
                            name='Performer'
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                }
                <GridContainer justify="center">
                    <GridItem xs={3} sm={3} md={3}>

                        <Button color="warning" onClick={claimDetailsprops.handleActivitylog} id="claims" round>
                            Activity Log
                            </Button>

                    </GridItem>
                </GridContainer>



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
                            //{
                            //    // Header: "Cover Event Factor - From Value",
                            //    Header: "InsurableItem",
                            //    accessor: "insurableItem",
                            //    minWidth: 40,
                            //    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                            //    headerClassName: 'react-table-center'
                            //},
                            //{
                            //    Header: "Name",
                            //    accessor: "name",
                            //    minWidth: 40,
                            //    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                            //    headerClassName: 'react-table-center'
                            //},
                            {
                                Header: "Identification No",
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
                                Header: "Risk Details",
                                accessor: "coverValue",
                                setCellProps: (value) => ({ style: { textAlign: "center" } }),
                                minWidth: 200,
                                headerClassName: 'react-table-center'
                                //sortable: false,
                                //filterable: false
                            },
                            //{
                            //    Header: "BenefitAmount",
                            //    accessor: "benefitAmount",
                            //    minWidth: 40,
                            //    setCellProps: (value) => ({ style: { textAlign: "center" } }),
                            //    headerClassName: 'react-table-center',
                            //},
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
                                minWidth: 20,
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
                        type="numeric"
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
                <h4>Payment Details</h4>
            </GridContainer>
            <GridContainer>
                <GridContainer>
                    <h6 className="payeetxttransform">Select Payee</h6>
                </GridContainer>
                <GridContainer>
                    {claimDetailsprops.ProductClaimData.map((item, i) =>
                        <GridItem xs={12} sm={4} md={3} className="downlevel">
                            <CustomCheckbox key={i}
                                name={item.inputType}
                                labelText={item.inputType}
                                value={item.inputType}
                                // checked={false}
                                // onChange={(e) => claimDetailsprops.SetRiskClaimsDetailsValue('Claim Process', e)}
                                onChange={(e) => claimDetailsprops.handleCheckbox(e, item.inputType, i)}
                                disabled={(item.disable == true) ? true : null}
                                formControlProps={{
                                    fullWidth: true
                                }} />
                        </GridItem>
                    )}
                </GridContainer>
            </GridContainer>
            <GridContainer /*key={i}*/>
                <GridItem>
                    <ClaimBankDetails claimDetailsprops={claimDetailsprops} />
                </GridItem>
            </GridContainer>

            <ClaimsDecision claimStatusIdState={claimDetailsprops.claimStatusIdState} claimManagerRemarksState={claimDetailsprops.claimManagerRemarksState}
                fields={claimDetailsprops.fields} ClaimsDecisionData={claimDetailsprops.ClaimsDecisionData} handleChange={claimDetailsprops.handleChange} onFormSubmit={claimDetailsprops.onFormSubmit}
                approved={claimDetailsprops.approved} onInputParamChange={claimDetailsprops.onInputParamChange} fields={claimDetailsprops.fields} errormessage={claimDetailsprops.errormessage}
                ValidationUI={claimDetailsprops.ValidationUI} classes={claimDetailsprops.classes} errorstatus={claimDetailsprops.errorstatus} DecisionType={claimDetailsprops.DecisionType} ClaimStatusData={claimDetailsprops.ClaimStatusData} />



        </div>

    );

}

export default ClaimDetails;
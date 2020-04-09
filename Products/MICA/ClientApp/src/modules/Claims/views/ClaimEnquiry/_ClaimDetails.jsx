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
import Button from "components/CustomButtons/Button.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
    const BankArray = props.componentData.BankArray;
    const renderBankDetails = props.componentData.renderBankDetails;
    console.log('Claims', props);
    // const claimAmountData = props;

    return (
        <div>

            <GridContainer>
                <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                        labelText="LossDate"
                        value={claimDetailsprops.claimDetailsData.lossDate}
                        name='lossDate'
                        disabled={claimDetailsprops.disabled}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                        disabled={claimDetailsprops.disabled}
                        labelText="LocationOfLoss"
                        value={claimDetailsprops.claimDetailsData.locationOfEvent}
                        name='locationOfEvent'
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                        disabled={claimDetailsprops.disabled}
                        labelText="LossDescription"
                        value={claimDetailsprops.claimDetailsData.lossDescription}
                        name='lossDescription'
                        onChange={(e) => claimDetailsprops.SetClaimValues("string", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                {claimDetailsprops.vehicleclaim &&
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

                {claimDetailsprops.vehicleclaimstate &&
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

                {claimDetailsprops.vehicleclaimdriver &&
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

                {claimDetailsprops.vehicleclaimsurvey &&
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
                                accessor: "insurableitemId",
                                headerClassName: 'react-table-center',
                                setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                minWidth: 20,
                                sortable: false,
                                //  filterable: false 
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
                                Header: "Risk Details",
                                accessor: "coverValue",
                                setCellProps: (value) => ({ style: { textAlign: "center" } }),
                                minWidth: 200,
                                headerClassName: 'react-table-center',
                                //sortable: false,
                                //filterable: false
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
                                setCellProps: (value) => ({ style: { textAlign: "center" } }),
                                minWidth: 45,
                                headerClassName: 'react-table-center',
                                //sortable: false,
                                //filterable: false
                            },
                        ]}
                        defaultPageSize={4}
                        pageSize={([claimDetailsprops.TableData.length + 1] < 4) ? [claimDetailsprops.TableData.length + 1] : 4}
                        showPaginationTop={false}
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
                        value={claimDetailsprops.claimDetailsData.totalClaimedAmount}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={5} sm={3} md={3} lg={4}>
                    <CustomInput
                        disabled={claimDetailsprops.disabled}
                        labelText="ApprovedAmt"
                        name="totalApprovedAmount"
                        type="numeric"
                        value={claimDetailsprops.claimDetailsData.totalApprovedAmount}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
            </GridContainer>
            <br />
            {(BankArray.length > 0) ?
                <GridContainer>
                    {BankArray.map((item, key) =>
                        <GridContainer >
                            <GridItem lg={12}>
                                <CardHeader color="info" icon >
                                    {
                                        <h3 >
                                            <small> {item.name}&nbsp;<TranslationContainer translationKey="BankDetails" /></small>
                                        </h3>
                                    }
                                </CardHeader>
                            </GridItem>
                            {item.BankDetails.map(item1 =>
                                <GridContainer>
                                    {renderBankDetails(item1)}
                                </GridContainer>
                            )}
                        </GridContainer>
                    )}
                </GridContainer>
                :
                <h4>No Bank Details Available for this Claim</h4>
            }
            <GridContainer>
                <CardHeader color="info" icon >
                    {
                        <h3 >
                            <small><TranslationContainer translationKey="ApproversRemark" /></small>
                        </h3>
                    }
                </CardHeader>
                <GridContainer>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="ClaimStatus"
                            value={claimDetailsprops.claimDetailsData.claimStatus}
                            name='claimStatus'
                            disabled={claimDetailsprops.disabled}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={8}>
                        <CustomInput
                            labelText="ManagerRemarks"
                            value={claimDetailsprops.claimDetailsData.claimManagerRemarks}
                            name='claimManagerRemarks'
                            disabled={claimDetailsprops.disabled}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                </GridContainer>
                <br />
                <br />
                <GridContainer justify="center">
                    <GridItem xs={5} sm={3} md={3} lg={1}>
                        <Button color="info" round onClick={claimDetailsprops.handleDisappear}>
                            <TranslationContainer translationKey="Close" />
                        </Button>
                    </GridItem>
                </GridContainer>
            </GridContainer>
        </div>
    );

}

export default ClaimDetails;

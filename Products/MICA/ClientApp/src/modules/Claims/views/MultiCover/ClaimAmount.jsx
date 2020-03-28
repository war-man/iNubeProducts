import React from "react";
// @material-ui/core components

import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// @material-ui/icons
import CardBody from "components/Card/CardBody.jsx";
import AmountData from "modules/Claims/views/ClaimIntimate/AmountData.json";
import Dropdown from "components/Dropdown/Dropdown.jsx";
//import ReactTable from "react-table";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

import { Animated } from "react-animated-css";

const dateStyle = {

    width: "max-content",

    marginLeft: "125px",

    Top: "-25px",

    //marginDown:"-25px",

    backgroundColor: "transparent",

    border: "none",

    zoom: "1.15"

}

const ddl = {

    marginLeft: "105px"



}

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



const tableStyle = { borderRadius: '10px  ', width: '100%' }





const tableRow = { height: '10px', width: '100%' }





const ClaimAmount = (props) => {

    console.log('Claims', props);

    //const claimAmountData = props;



    return (

        <div>

            <CardHeader color="info" icon >
                {
                    <h3 >
                        <small><TranslationContainer translationKey="ClaimDetails" /></small>
                    </h3>
                }
            </CardHeader>

            <GridContainer>

                <GridItem xs={12} sm={4} md={3}>
                    <Dropdown
                        labelText="InsurableItem"
                        id="ddlstatus"
                        lstObject={props.InsurableItemData}
                        required={true}
                        value={props.DetailsDTO.insurableItems}
                        name='insurableItems'
                        onChange={(e) => props.handleChange("insurableItems", e)}
                        formControlProps={{ fullWidth: true }} />

                    {props.errormessage && (props.DetailsDTO.insurableItems == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                </GridItem>
            </GridContainer>

            <GridContainer justify="center" >
                {props.showInsGrid && <GridItem xs={12}>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <ReactTable
                            data={props.TableData}
                            filterable
                            columns={[
                                {
                                    Header: "SerialNo",
                                    accessor: "id",
                                    headerClassName: 'react-table-center',
                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                    minWidth: 20,
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
                                    minWidth: 20,
                                    setCellProps: (value) => ({ style: { textAlign: "center" } }),
                                    headerClassName: 'react-table-center'

                                },
                                //        {
                                //        Header: "BenefitAmount",
                                //    accessor: "benefitAmount",
                                //    minWidth: 40,
                                //            setCellProps: (value) => ({style: {textAlign: "center" } }),
                                //    headerClassName: 'react-table-center',

                                //},
                                {
                                    Header: "ClaimAmount",
                                    accessor: "claimAmounts",
                                    setCellProps: (value) => ({ style: { textAlign: "right" } }),
                                    minWidth: 40,
                                    headerClassName: 'react-table-center',
                                    //sortable: false,
                                    //filterable: false

                                },



                            ]}
                            defaultPageSize={4}
                            pageSize={([props.TableData.length + 1] < 4) ? [props.TableData.length + 1] : 4}
                            showPaginationTop={false}
                            //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                            showPaginationBottom={true}
                            className="-striped -highlight discription-tab"

                        />
                    </Animated>
                </GridItem>}
            </GridContainer>


            <GridContainer lg={12} >
                <GridContainer lg={12} justify="flex-end">
                    {props.showInsGrid && <GridItem xs={5} sm={3} md={3} lg={4}>
                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                            <CustomInput
                                //success={props.claimAmountState === "success"}
                                error={props.claimAmountState}
                                labelText="TotalClaimAmt"
                                name="claimAmount"
                                type="numeric"
                                inputType="number"
                                // required={true}
                                value={props.DetailsDTO.claimAmount}
                                onChange={(e) => props.handleClaimAmount(e)}
                                formControlProps={{ fullWidth: true }}
                            />
                            {/* {props.errormessage && (props.DetailsDTO.claimAmount == "") ? <p className="error">*Enter atleast one Claim Amount</p> : null}*/}
                        </Animated>
                    </GridItem>}
                </GridContainer>
            </GridContainer>




        </div>

    );

}
export default ClaimAmount;
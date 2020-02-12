import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import AddProduct from "modules/Partners/Partner/views/_AddProduct.jsx";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import searchproduct from "assets/img/search-product.png";
import Icon from "@material-ui/core/Icon";
import $ from 'jquery';
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import user from "assets/img/user.png";
import ReactTable from "components/MuiTable/MuiTable.jsx";
//import ReactTable from "react-table";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import { Animated } from "react-animated-css";

import swal from 'sweetalert';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import { type } from "os";

import Dropdown from "components/Dropdown/Dropdown.jsx";
import contract from "assets/img/contract-search.png";



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

const submitBtn = {
    height: "35px",
    marginTop: "-10px"
}


const SearchContract = (props) => {
    let classes = props.classes;
    console.log("props Event", props);


    return (
        <div>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={contract} /></Icon>
                        </CardIcon>
                        {
                            <GridItem>
                                <h4><small>Contract Search</small></h4>

                            </GridItem>
                        }
                    </CardHeader>


                    
                        <CardBody>
                            <GridContainer className="search-Product">

                    {/* <GridItem xs={12} sm={12} md={3}>

                                    <CustomInput
                                        success={props.contractIdState === "success"}
                                        error={props.contractIdState === "error"}
                                        labelText="Contract Id"
                                        value={props.ContractDTO.contractId}
                                        name="contractId"
                                        onChange={(e) => props.SetContract("number", e)}
                                        id="ContractId"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem> */}

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        success={props.contractNameState === "success"}
                                        error={props.contractNameState === "error"}
                                        labelText="Contract Name"
                                        value={props.ContractDTO.contractName}
                                        name="contractName"
                                        id="ContractName"
                                        onChange={(e) => props.SetContract("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                             
                                <GridItem xs={12} sm={12} md={4}>


                                    <CustomDatetime
                                        success={props.contractEffectiveDateState === "success"}
                                        error={props.contractEffectiveDateState === "error"}
                                        onFocus={props.onClick}
                                        labelText="Effective From Date"
                                        id='EffectiveDate'
                                        name='contractEffectiveDate'
                                        onChange={(evt) => props.onDateChangeContract("datetime", 'contractEffectiveDate', evt)}
                                        value={props.ContractDTO.contractEffectiveDate}
                                        formControlProps={{ fullWidth: true }} />

                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>

                                    <CustomDatetime
                                        success={props.contractEndDateState === "success"}
                                        error={props.contractEndDateState === "error"}
                                        onFocus={props.onClick}
                                        labelText="Effective To Date"
                                        id='EndDate'
                                        name='contractEndDate'
                                        onChange={(evt) => props.onDateChangeContract('datetime', 'contractEndDate', evt)}
                                        value={props.ContractDTO.contractEndDate}
                                        formControlProps={{ fullWidth: true }} />
                                </GridItem>

                                <GridContainer justify="center">
                                    <GridItem >

                                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                            <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={props.handleSearchContract} >
                                                Search
                                               </Button>
                                        </Animated>



                                    </GridItem>
                                </GridContainer>

                                
                            </GridContainer>
                        </CardBody>
                    
        </Card>
        {
    props.searchContractTable == true ?
                        <GridContainer justify="center">



                        <GridItem xs={12}>

                

                                <ReactTable
                                    title={"Customer Details"}
                            data={props.contractdata}
                            filterable
                            columns={[
                                {
                                    Header: "",
                                    accessor: "radio",
                                    minWidth: 20,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    sortable: false,
                                    filterable: false,
                                    resizable: false,
                                },
                                {
                                    Header: " S No",
                                    accessor: "SNo",
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 50,
                                    resizable: false,

                                },
                                //{
                                //    Header: "Contract Id",
                                //    accessor: "ContractId",
                                //    style: { textAlign: "right" },
                                //    headerClassName: 'react-table-center',
                                //    minWidth: 50,
                                //    resizable: false,

                                //},
                                {

                                    Header: "Contract Name",
                                    accessor: "ContractName",

                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 50,
                                    resizable: false,
                                },
                                {
                                    Header: "Effective From Date",
                                    accessor: "EfficitiveDate",

                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 50,
                                    resizable: false,
                                },
                                {
                                    Header: "Effective To Date",
                                    accessor: "EndDate",


                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 50,
                                    resizable: false,
                                },

                            ]}
                            defaultPageSize={5}
                            showPaginationTop={false}
                            pageSize={([props.contractdata.length + 1] < 5) ? [props.contractdata.length + 1] : 5}
                            showPaginationBottom
                            className="-striped -highlight discription-tab"
                        />



                            </GridItem>
                            <GridItem  >

                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                        <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={props.handleClose} >
                            Ok
                                               </Button>
                    </Animated>



                </GridItem>
            

        </GridContainer>
        : null
    }
           

        </div >


    );
}
//}
export default withStyles(style)(SearchContract);

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
//import ReactTable from "react-table";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import { Animated } from "react-animated-css";
import Modal from '@material-ui/core/Modal';
import swal from 'sweetalert';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import { type } from "os";
import ModifyContract from "modules/Billing/Contract/ModifyContract.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import contract from "assets/img/contract-search.png";
import BillingConfig from 'modules/Billing/BillingConfig.js';




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

class SearchContract extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            editModal: false,
            close: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            visibility: false,
            ContractSelectedNo: "",
            disabled: true,
            disable: true,
            contractDetails: [],
            contractDetailsData: [],
            activeFromState: "",
            activeToState: "",
            SearchData: [],
            selectedRow: [],
            datediff: "",
            DateRange: false,
            dateVal: "",
            searchContractTable: false,
            ContractDTO:
            {
                "contractId": 0,
                "contractName": "",
                "vendorId": 0,
                "customerId": 0,
                "contractEffectiveDate": "",
                "contractEndDate": "",
                "maxCreditPeriod": 0,
                "maxCreditAmountAllowed": 0,
                "gracePeriod": 0,
                "currencyId": 0,
                "pono": "string",
                "podate": "",
                "createdBy": 0,
                "createdDate": "",
                "isActive": ""
            },
        }
    };
    handleEdit = (id) => {
        if (this.state.partid == "") {
            swal("", "Please select the patner to edit details", "error")
        } else {
            this.handleOpen();
            console.log(id)
            let edit = this.state;
            edit.close = false;
            edit.editModal = true;
            edit.visibility = false;
            edit.open = true;
            edit.disabled = false;
            edit.disable = false;
            edit.close = false
            this.setState({ edit });
            console.log("edit", this.state.editModal);
        }
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    handleSearchContract = (event) => {
        debugger
        console.log("contractdto", this.state.ContractDTO);
        //let effdate = "";
        //let enddate = "";
        //debugger
        //if (this.state.ContractDTO.contractEffectiveDate != "") {
        //    effdate = this.state.ContractDTO.contractEffectiveDate;
        //    this.state.ContractDTO.contractEffectiveDate = this.datechange(this.state.ContractDTO.contractEffectiveDate);
        //}
        //if (this.state.ContractDTO.contractEndDate != "") {
        //    enddate = this.state.ContractDTO.contractEndDate;
        //    this.state.ContractDTO.contractEndDate = this.datechange(this.state.ContractDTO.contractEndDate);
        //}

        //fetch(`https://localhost:44362/api/Billing/SearchContract`, {
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/SearchContract`, {
            method: 'POST',
            body: JSON.stringify(this.state.ContractDTO),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("data save result:", data);
                this.setState({ contractDetails: data });

                if (this.state.contractDetails.length > 0) {
                    this.setState({ searchContractTable: true });
                    this.contractTable(data);
                }

            });
        //this.state.ContractDTO.contractEffectiveDate = effdate;
        //this.state.ContractDTO.contractEndDate = enddate;
    };

    contractTable = (rows) => {
        console.log("contracttable", this.state.ContractDTO);
        this.setState({
            contractDetailsData: this.state.contractDetails.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,

                    ContractId: prop.contractId,

                    ContractName: prop.contractName,
                    EfficitiveDate: prop.contractEffeciveDate,
                    EndDate: prop.contractEndDate,
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.contractId)} />

                };
            })
        });
    }

    datechange = (date) => {
        debugger
        console.log("date change", date);
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    editFunction(id, cId) {

        document.getElementById("disp");
        var orgArr = this.state.ContractDetails;
        var partArr = [];
        $.each(orgArr, function (k, v) {
            if (v.contractId == cId) {
                partArr.push(orgArr[id]);
            }
        })
        console.log("partArr", partArr);
        // this.setState({ ContractSelectedNo: partArr[0].contractId });
    };

    SetContract = ((type, event) => {
        console.log("contractdto", this.state.ContractDTO);
        debugger
        event.preventDefault();
        let ContractDTO = this.state.ContractDTO;
        let name = event.target.name;
        let value = event.target.value;
        ContractDTO[name] = value;
        this.setState({ ContractDTO })
    });


    onDateChangeContract = (formate, name, event) => {

        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        const state = this.state.ContractDTO;
        state[name] = date;
        this.setState({ state });

    };
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    onDateChange = (formate, type, name, event) => {

        this.setState({ DateRange: true });
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);
        if (type === 'ContractDTO') {
            let ContractDTO = this.state.ContractDTO;
            ContractDTO[name] = date;
            this.setState({ ContractDTO });

            var timeDiff = date2.getTime() - date1.getTime();
            var datediff = this.state.date;
            datediff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            // var datediff = datediff;
            this.setState({ datediff });
        }
    }


    render() {

        const { classes } = this.props;



        return (
            <div>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
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


                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                            <CardBody>
                                <GridContainer className="search-Product">

                                    <GridItem xs={12} sm={12} md={4}>

                                        <CustomInput
                                            labelText="Contract Id"
                                            value={this.state.ContractDTO.contractId}
                                            name="contractId"
                                            onChange={(e) => this.SetContract("string", e)}
                                            id="ContractId"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />


                                    </GridItem>




                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput

                                            labelText="Contract Name"
                                            value={this.state.ContractDTO.contractName}
                                            name="contractName"
                                            id="ContractName"
                                            onChange={(e) => this.SetContract("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                    {/* <CustomInput

                                        labelText="Efficitive Date"
                                        value={this.state.ContractDTO.contractEffeciveDate}
                                        name="contractEffeciveDate"
                                        id="EffectiveDate"
                                        onChange={(e) => this.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                     <CustomInput

                                            labelText="End Date"
                                            value={props.ContractDTO.contractEndDate}
                                        name="contractEndDate"
                                            id="EndDate"
                                            onChange={(e) => props.SetContract("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        />
                                    */}
                                    <GridItem xs={12} sm={12} md={4}>


                                        <CustomDatetime
                                            required={true}
                                            onFocus={this.state.onClick}
                                            labelText="Effective From Date"
                                            id='EffectiveDate'
                                            DateRange={this.state.DateRange}

                                            datediff={this.state.datediff}
                                            name='ContractEffectiveDate'
                                            onChange={(evt) => this.onDateChange('datetime', 'ContractDTO', 'ContractEffectiveDate', evt)}
                                            value={this.state.ContractDTO.ContractEffectiveDate}
                                            formControlProps={{ fullWidth: true }} />

                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>

                                        <CustomDatetime success={this.state.activeToState === "success"}
                                            disabled={this.state.viewdisable}
                                            required={true}
                                            error={this.state.activeToState === "error"}
                                            DateRange={this.state.DateRange}
                                            datediff={this.state.datediff}
                                            labelText="Effective To Date"
                                            id='dtActiveFrom'
                                            name='activeTo'
                                            onChange={(evt) => this.onDateChange('datetime', 'ContractDTO', 'activeTo', evt)}
                                            value={this.state.ContractDTO.activeTo}
                                            formControlProps={{ fullWidth: true }} />

                                        {this.state.errormessage && (this.state.ContractDTO.activeTo == "") ? <p className="error">This Field is Required</p> : null}

                                    </GridItem>




                                    <GridContainer justify="center">
                                        <GridItem >

                                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                                <Button id="submitBtn" color="info" round className={classes.marginRight} onClick={this.handleSearchContract} >
                                                    Search
                                               </Button>
                                            </Animated>



                                        </GridItem>
                                    </GridContainer>
                                    {/* <div id="searchContractTable" style={{ display: 'none' }}> */}

                                </GridContainer>

                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.open}
                                    onClose={this.handleClose}>
                                    <div id="modal">
                                        <h4><small> Modify Contract</small></h4>
                                        <Button color="info"
                                            round
                                            //className={classes.marginRight}
                                            id="close-bnt"
                                            onClick={this.handleClose}>
                                            &times;
                                                        </Button>
                                        <div id="disp" >
                                            <ModifyContract ContractSelectedNo={this.state.ContractSelectedNo} editModal={this.state.editModal} disable={this.state.disable} handleClose={this.handleClose} open={this.state.open} close={this.state.close} disabled={this.state.disabled} searchPartnerId={this.state.partid} btnvisibility={this.state.btnvisibility} displaybtn={!this.state.disabled} visibility={this.state.visibility} />
                                        </div>
                                    </div>
                                </Modal>
                            </CardBody>
                        </Animated>
                    </Card>
                    {this.state.searchContractTable ?
                        <GridContainer>
                            <GridItem xs={12}>
                                <ReactTable
                                    title={"Contract Details"}
                                    data={this.state.contractDetailsData}
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
                                        {
                                            Header: "Contract Id",
                                            accessor: "ContractId",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 50,
                                            resizable: false,

                                        },
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
                                    //pageSize={([this.state.contractdata.length + 1] < 5) ? [this.state.contractdata.length + 1] : 5}
                                    showPaginationBottom
                                    className="-striped -highlight discription-tab"
                                />



                                <GridContainer justify="center">
                                    <GridItem >

                                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                            <Button color="info" round className={classes.marginRight} onClick={this.handleEdit} editModal={this.state.editModal}>
                                                Edit
                                                            </Button>
                                        </Animated>
                                    </GridItem>
                                </GridContainer>
                            </GridItem>

                        </GridContainer>
                        : null}
                </Animated>

            </div >


        );
    }
}
export default withStyles(style)(SearchContract);

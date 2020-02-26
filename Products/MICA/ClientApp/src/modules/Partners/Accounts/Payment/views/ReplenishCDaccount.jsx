import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import PropTypes from "prop-types";
import Replenish from "assets/img/Replenish.png";
import Icon from "@material-ui/core/Icon";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Datetime from "react-datetime";

import Button from "components/CustomButtons/Button.jsx";
//import Paper from "@material-ui/core/Paper";
//import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx"
import CreateCDAccountPage from "./CreateCDAccountPage.jsx";
import paymentConfig from "../PaymentConfig.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import productConfig from 'modules/Products/Micro/ProductConfig.js';
import partnerconfig from "modules/Partners/PartnerConfig.js";
import $ from "jquery";
import swal from 'sweetalert';
import Paper from '@material-ui/core/Paper';
import { Animated } from "react-animated-css";
import validationPage from "modules/Partners/Organization/views/ValidationPage.jsx";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import CommonMessage from "Messages/CommonMessage.jsx";


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
        backgroundColor: "#086b77",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        maxWidth: "10%"
    },
}))(TableCell);
const header = {
    fontSize: "16px",
    color: "#333",
    fontSize: "500",
    lineHeight: "1"


}
const typestyle = {
    left: "452px",
    marginTop: "16px"
}
class ReplenishCDaccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            required: true,
            errormessage: false,
            disabled: false,
            data: [],
            newdata: [],
            simpleselect: "",
            partnerName: "",
            productName: "",
            PartnerData: [],
            ProductData: [],
            PolicyData: [],
            masterList: [],
            datalist: [],
            List: "",
            paymentRefernceIdState: "",
            txnAmountState: "",
            fields: {
                PartnerId: "",
                ProductId: "",
            },
            display: false,
            show: false,
            hide: false,
            transactiontable: false,
            CDaccountDTO:
                {
                    lob: "",
                    cob: "",
                    //threshold: 0,
                    //droplimit: 0,
                    //PartnerId: "",
                    //ProductId: "",
                    partnerId: "",
                    productId: ""
                },
            CdTransaction: {
                "accountNo": "",
                "partnerId": "",
                "productId": "",
                "paymentId": 0,
                "txnType": "",
                "transactionDate": "",
                "txnAmount": "",
                "initialAmount": 0,
                "availableAmount": 0,
                "ledgerBalance": 0,
                "createdBy": "",
                "description": "",
                "creditAccountNo": 0,
                "paymentModeId": "",
                "paymentRefernceId": "",
            },
            resetCdTransaction: {
                "accountNo": "",
                "partnerId": "",
                "productId": "",
                "paymentId": 0,
                "txnType": "",
                "transactionDate": "",
                "txnAmount": "",
                "initialAmount": 0,
                "availableAmount": 0,
                "ledgerBalance": 0,
                "createdBy": "",
                "description": "",
                "creditAccountNo": 0,
                "paymentModeId": "",
                "paymentRefernceId": "",
            },
            accdetails: [],
            searchaccount: [{
                "srNo": 0,
                "paymentType": "",
                "credit": "",
                "debit": "",
                "policyNumber": "",
                "productName": "",
                "partnerName": "",
                "partnerId": 0,
                "productId": 0,
                "txnId": 0,
                "accountNo": "",
                "paymentId": "",
                "txnType": "",
                "transactionDate": "",
                "txnAmount": 0,
                "initialAmount": 0,
                "availableAmount": "",
                "ledgerBalance": "",
                "createdBy": "",
                "description": "",
                "creditAccountNo": "",
                "paymentModeId": "",
                "paymentRefernceId": "",
                "accountNoNavigation": ""
            }]
        }
        this.handleChange = this.handleChange.bind(this);
        this.Submit = this.Submit.bind(this);
    };
    setValue = (event) => {
        event.preventDefault();

        let CDaccountDTO = this.state.CDaccountDTO;
        let name = event.target.name;
        let value = event.target.value;
        CDaccountDTO[name] = value;
        console.log("name", name);
        console.log("value", value);
        this.setState({ CDaccountDTO });
        console.log("data", this.state.CDaccountDTO);
        let CdTransaction = this.state.CdTransaction;
        if (name == "partnerId") {


            fetch(`${paymentConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Product&partnerId=` + value, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {

                    console.log("off", data);
                    this.setState({ datalist: data[0].mdata });
                    console.log("datalist", this.state.datalist);
                    console.log("datalistmvalue", this.state.datalist.mValue);

                    let ProductData = this.state.ProductData;
                    ProductData = data;

                    this.setState({ ProductData });
                    console.log("ProductDatalist", this.state.ProductData);
                });

            CdTransaction['partnerId'] = value;

        }
        // console.log("datalist here",this.state.datalist[0].lob);
        if (name == "productId") {
            console.log("coming");
            let List = this.state.datalist.filter(item => item.mID == value);
            console.log("proid", List);
            if (List.length > 0) {
                let CDaccountDTO = this.state.CDaccountDTO;
                CDaccountDTO["lob"] = List[0].lob;
                CDaccountDTO["cob"] = List[0].cob;
                this.setState({ disabled: true });
                console.log("CDaccountDTO with lob", this.state.CDaccountDTO);
            }
            CdTransaction['productId'] = value;

        }
        this.setState({ CdTransaction });
        this.setState({ show: false, hide: false, transactiontable: false });
    }

    handleChange(type, event) {
        let cdtrans = this.state.CdTransaction;
        let name = event.target.name;
        let value = event.target.value;
        cdtrans[name] = value;
        this.setState({ cdtrans });
        console.log("Cd Transaction: ", this.state.CdTransaction);
        this.change(event, name, type);
    }

    change = (event, stateName, type) => {
        switch (type) {
            case "string":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "email":
                if (validationPage.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "ID":
                if (validationPage.verifyID(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "phnumber":
                if (validationPage.verifyPhNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "pan":
                if (validationPage.verifyPanIndNum(event.target.value, 6)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "ID":
                if (validationPage.verifyID(event.target.value, 6)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }


    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onClick = () => {
        console.log("CdTransaction", this.state.CdTransaction);
        if (this.state.CDaccountDTO.partnerId != "" && this.state.CDaccountDTO.productId != "") {
            fetch(`${paymentConfig.partnerconfigUrl}/api/Accounts/SearchCdAccountAsync`, {
                // fetch('https://localhost:44315/api/Accounts/SearchCdAccountAsync', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.CDaccountDTO)
            }).then(response => response.json())
                .then(data => {
                    console.log('Response data', data);
                    if (data.length > 0) {
                        this.dataTable(data);
                        this.setState({
                            accdetails: data,
                            show: true
                        });
                    } else {
                        var msg = CommonMessage("NoCDAccount", []);
                        swal({
                            text: msg,
                            icon: "error",
                        });
                        //swal("", "CD Account does not exist for this partner", "error");
                        this.setState({ show: false, hide: false, transactiontable: false });

                    }
                });

        } else {
            var msg = CommonMessage("MissingField", []);
            swal({
                text: msg,
                icon: "error"
            });
            //swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }
    }
    onClickhide = () => {
        const { hide } = this.state.hide;
        this.setState({ hide: true });
    }

    //onClickdisplay = () => {
    //    const { display } = this.state.display;
    //    this.setState({ display: true });
    //}
    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    Submit() {
        console.log("CD Transaction: ", this.state.CdTransaction);
        //  if (this.state.CdTransaction.length > 0) {
        // fetch(`https://localhost:44315/api/Accounts/ReplenishCdAccount`, {
        if (this.state.CdTransaction.paymentModeId != "" && this.state.CdTransaction.paymentRefernceId != "" && this.state.CdTransaction.txnAmount!="") {
            fetch(`${paymentConfig.partnerconfigUrl}/api/Accounts/ReplenishCdAccount`, {
                // fetch('${paymentConfig.partnerconfigUrl}/api/Accounts/ReplenishCdAccount', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.CdTransaction)
            }).then(response => response.json())
                .then(data => {
                    console.log('Response data', data);

                    this.ReactTable(data.cdReplnish);
                    this.setState({
                        searchaccount: data.cdReplnish,
                        transactiontable: true
                    });

                    if (data.status == 2) { 
                        var msg = CommonMessage(data.messageKey, data.messageValue);
                        swal({
                            text: msg,
                            icon: "success"
                        });
					//swal({ text: data.responseMessage, icon: "success" });
                    this.setState({ CdTransaction: this.state.resetCdTransaction, paymentRefernceIdState: "", txnAmountState: "" });
					}

                    else if (data.status == 8) {
                        var msg = CommonMessage(data.messageKey, data.messageValue);
                        swal({
                            text: msg,
                            icon: "error"
                        });
                        //swal({ text: data.errors[0].errorMessage, icon: "error" });
                    }
                    else {
                    var msg = CommonMessage("Tryagain", []);
                        swal({ title: "", text: msg, icon: "error" });
                    }
                });
        }
        else {
            var msg = CommonMessage("InvalidTxtFields", []);

            swal({
               // text: "Some fields are missing or Please the check fields you entered",
                text: msg,
                icon: "error"
            });

            this.setState({ errormessage: true });
        }

        console.log("Search Table: ", this.state.searchaccount);
    }
    //   }

    //GetMasterData = ( type , addType, event) => {
    //    console.log('GetMasterData: ', type, addType, event)
    //   // this.SetValue(type, event);
    //    let reg = this.state[addType];
    //    let name = event.target.name;
    //    let value = event.target.value;
    //    reg[name] = value;

    //    this.setState({ reg });
    //}

    componentDidMount() {
        fetch(`${paymentConfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=Partner`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ PartnerData: data });
            });
        //fetch(`${paymentConfig.productConfigUrl}/api/Product/GetMasterData?sMasterlist=Product`, {
        //    method: 'GET',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        //    },
        //})
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ ProductData: data });
        //    });
        //console.log("product list", this.state.ProductData);
        fetch(`${partnerconfig.partnerconfigUrl}/api/Partner/GetMasterDataAsync?sMasterlist=PaymentMode`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ masterList: data });
                console.log("clauses: ", this.state.masterList);
            });
    }


    dataTable = (newlist) => {
        console.log("list in react", newlist);

        this.setState({
            data: newlist.map((prop, key) => {
                console.log("coming");
                const { classes } = this.props;
                console.log("prop data", prop);
                console.log("send data", key);
                return {
                    id: key,
                    cdid: (prop.cdid) ? prop.cdid : null,
                    accountNo: (prop.accountNo) ? prop.accountNo : null,
                    partnerId: (prop.PartnerId) ? prop.partnerId : null,
                    partnerName: (prop.partnerName) ? prop.partnerName : null,
                    productId: (prop.productId) ? prop.productId : null,
                    productName: (prop.productName) ? prop.productName : null,
                    initialAmount: (prop.initialAmount) ? prop.initialAmount : null,
                    availableBalance: (prop.availableBalance) ? prop.availableBalance : null,
                };

            })
        });
    }
    ReactTable = (newlist) => {
        console.log("list in react table", newlist);

        this.setState({
            newdata: newlist.map((prop, key) => {
                console.log("coming");
                const { classes } = this.props;
                console.log("prop data", prop);
                console.log("send data", key);
                return {
                    id: key + 1,
                    txnId: (prop.txnId != null) ? prop.txnId : null,
                    partnerName: (prop.partnerName != null) ? prop.partnerName : null,
                    //transactionDate: new Date(prop.transactionDate).toISOString().slice(0, 10),
                    transactionDate: (prop.transactionDate != null) ? new Date(prop.transactionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', }) : null,
                    txnAmount: (prop.txnAmount != null) ? prop.txnAmount.toFixed(2) : null,

                    initialAmount: (prop.initialAmount != null) ? prop.initialAmount.toFixed(2) : null,
                    availableAmount: (prop.availableAmount != null) ? prop.availableAmount.toFixed(2) : null,
                    description: prop.description,
                    txnType: prop.txnType,

                };

            })
        });
    }
    // var doc = new jsPDF();
    //specialElementHandlers =()=> {
    //    '#editor': function (element, renderer) {
    //        return true;
    //    }
    //};


    // $('#cmd').click(function() {
    //cmd = () => {
    //    doc.fromHTML($('#content').html(), 15, 15, {
    //        'width': 170,
    //        'elementHandlers': specialElementHandlers
    //    });
    //    doc.save('sample-file.pdf');
    //};
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                    <Card>

                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                {/*  <FilterNone /> */}
                                <Icon><img id="icon" src={Replenish} /></Icon>
                            </CardIcon>
                            <h4>
                                <small><TranslationContainer translationKey="ReplenishCDAccount" /></small>
                            </h4>
                        </CardHeader>
                        <CardBody>

                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>

                                <CreateCDAccountPage classes={this.classes}
                                    handleSimple={this.handleSimple}
                                    SetValue={this.SetValue}
                                    PartnerData={this.state.PartnerData}
                                    errormessage={this.state.errormessage}
                                    required={this.state.required}
                                    disabled={this.state.disabled}
                                    ProductData={this.state.ProductData}
                                    fields={this.state.fields}
                                    onInputChange={this.onInputChange}
                                    setValue={this.setValue}
                                    cdAccountsDTO={this.state.CDaccountDTO} />
                            </Animated>

                            <GridContainer lg={12} justify="center">
                                <GridItem xs={6} sm={3} md={3} lg={1} >
                                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                        <Button color="info" round onClick={this.onClick}><TranslationContainer translationKey="Search" /></Button>
                                    </Animated>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>

                                {this.state.show &&
                                    <GridContainer justify="center" id="paymenttablesec" >
                                        <GridItem xs={8}>
                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <div className="banner">
                                                <label>
                                                    <TranslationContainer translationKey="AccountNumber" />
                                                </label>
                                                <h5>{this.state.accdetails[0].accountNo}</h5>
                                                <label>
                                                    <TranslationContainer translationKey="InitialAmount" />
                                                </label>
                                                <h5>{this.state.accdetails[0].initialAmount}</h5>
                                                <label>
                                                    <TranslationContainer translationKey="AvailableBalance" /></label>
                                                <h5>{this.state.accdetails[0].availableBalance}</h5>
                                                </div>
                                            </Animated>

                                            {/* <ReactTable
                                                    data={this.state.data}
                                                    filterable
                                                    columns={[
                                                        {
                                                            Header: "CDID",
                                                            accessor: "cdid",
                                                            Width: "20px"

                                                        },
                                                        {
                                                            Header: "CD ACCOUNT NUMBER",
                                                            accessor: "accountNo",

                                                        },
                                                       
                                                        {
                                                            Header: "PARTNER ID",
                                                            accessor: "partnerId",
                                                            //Width: "20px"
                                                        },
                                                        {
                                                            Header: "PARTNER NAME",
                                                            accessor: "partnerName",
                                                            // Width: "20px"
                                                        },
                                                        {
                                                            Header: "PRODUCT ID",
                                                            accessor: "productId",
                                                            // Width: "20px"
                                                        },
                                                        {
                                                            Header: "PRODUCT NAME",
                                                            accessor: "productName",
                                                            // maxWidth: "20px"
                                                        },
                                                        {
                                                            Header: "INITIAL AMOUNT",
                                                            accessor: "initialAmount",
                                                            // maxWidth: "20px"
                                                        },
                                                        {
                                                            Header: "AVAILABLE AMOUNT",
                                                            accessor: "availableBalance",
                                                            // maxWidth: "20px"
                                                        }
                                                      
                                                    ]}
                                                    defaultPageSize={this.state.data.length+1}
                                                    showPaginationTop={false}
                                                    showPaginationBottom
                                                    className="-striped -highlight"
                                                />
                                                */}
                                        </GridItem>





                                        <GridContainer lg={12} justify="center">
                                            <GridItem xs={4} sm={3} md={3} lg={1} >
                                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <Button id="right-15px" color="info" round onClick={this.onClickhide}><TranslationContainer translationKey="Replenish" /> </Button>
                                                </Animated>
                                            </GridItem>
                                        </GridContainer>
                                    </GridContainer>
                                }

                                {/*
                                        < Paper className={classes.root} style={{ marginLeft: '70px', marginRight: '70px' }} >
    
                                    <Table className="createTableClass table-striped " style={{ borderRadius: '3px  ', width: '100%', margin: '0 auto' }} id="paymentTable">
                                        <TableHead className="table-row" style={{ height: '10px' }}>
                                            <TableRow className="table-row">
                                                <CustomTableCell className="table-row" ><b>CDID</b></CustomTableCell>
                                                <CustomTableCell className="table-row" ><b>CD ACCOUNT NUMBER</b></CustomTableCell>
                                                <CustomTableCell className="table-row" ><b>PARTNER ID</b></CustomTableCell>
                                                <CustomTableCell className="table-row" ><b>PARTNER NAME</b></CustomTableCell>
                                                <CustomTableCell className="table-row" ><b>PRODUCT ID</b></CustomTableCell>
                                                <CustomTableCell className="table-row" ><b>PRODUCT NAME</b></CustomTableCell>
                                                <CustomTableCell className="table-row" ><b>INITIAL AMOUNT</b></CustomTableCell>
                                                <CustomTableCell className="table-row" ><b>AVAILABLE AMOUNT</b></CustomTableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.accdetails.map((item, index) =>
                                                <TableRow className="table-row">
                                                    <CustomTableCell className="table-row" ><b>{item.cdid}</b></CustomTableCell>
                                                    <CustomTableCell className="table-row" ><b>{item.accountNo}</b></CustomTableCell>
                                                    <CustomTableCell className="table-row" ><b>{item.partnerId}</b></CustomTableCell>
                                                    <CustomTableCell className="table-row" ><b>{item.partnerName}</b></CustomTableCell>
                                                    <CustomTableCell className="table-row" ><b>{item.productId}</b></CustomTableCell>
                                                    <CustomTableCell className="table-row" ><b>{item.productName}</b></CustomTableCell>
                                                    <CustomTableCell className="table-row" ><b>{item.initialAmount}</b></CustomTableCell>
                                                    <CustomTableCell className="table-row" ><b>{item.availableBalance}</b></CustomTableCell>
                                                </TableRow>
                                            )
                                            }
                                        </TableBody>
                                    </Table>

                                </Paper > */}
                                {this.state.hide &&

                                    <GridContainer lg={12} sm={12} md={12} justify="center">
                                        <GridItem xs={12} sm={4}>
                                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                            <MasterDropdown
                                                    labelText="SelectMode"
                                                    id="paymentmode"
                                                    lstObject={this.state.masterList}
                                                    filterName='PaymentMode'
                                                    value={this.state.CdTransaction.paymentModeId}
                                                    model="CdTransaction" name='paymentModeId'
                                                    onChange={(e) => this.handleChange('', e)}
                                                formControlProps={{ fullWidth: true }} />
                                            {this.state.errormessage && (this.state.CdTransaction.paymentModeId == "") ? <p className="error">*Required field data is missing</p> : null}

                                            </Animated>
                                        </GridItem>
                                        <GridItem xs={12} sm={4}>
                                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                                <CustomInput
                                                    success={this.state.paymentRefernceIdState == "success"}
                                                    error={this.state.paymentRefernceIdState == "error"}
                                                    labelText="PaymentReferenceId"
                                                    name="paymentRefernceId"
                                                    value={this.state.CdTransaction.paymentRefernceId}
                                                    onChange={(e) => this.handleChange("string", e)}
                                                    inputType="number"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                            />
                                            {this.state.errormessage && (this.state.CdTransaction.paymentRefernceId == "") ? <p className="error">*Required field data is missing</p> : null}

                                            </Animated>
                                        </GridItem>
                                        <GridItem xs={12} sm={4}>
                                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                                <CustomInput
                                                    success={this.state.txnAmountState == "success"}
                                                    error={this.state.txnAmountState == "error"}
                                                    labelText="TransactionAmount"
                                                    name="txnAmount"
                                                    value={this.state.CdTransaction.txnAmount}
                                                    onChange={(e) => this.handleChange("string", e)}
                                                    inputType="number"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                            />
                                            {this.state.errormessage && (this.state.CdTransaction.txnAmount == "") ? <p className="error">*Required field data is missing</p> : null}

                                        </Animated>
                                        </GridItem>

                                        <br />


                                    </GridContainer>


                                }


                            </GridContainer>

                            {this.state.hide &&
                                <GridContainer lg={12} justify="center">
                                    <GridItem xs={5} sm={3} md={3} lg={1} >
                                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                        <Button id="left" color="info" round onClick={this.Submit}><TranslationContainer translationKey="Submit" /></Button>
                                        </Animated>
                                    </GridItem>
                                </GridContainer>
                            }

                            <br />



                        </CardBody>

                    </Card>
                </Animated>
                {
                    this.state.transactiontable ?
                        <GridContainer>
                            <GridItem xs={12}>

                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                    <ReactTable
                                        data={this.state.newdata}
                                        filterable
                                        columns={[
                                            {
                                                Header: "SNo",
                                                accessor: "id",
                                                //style: { textAlign: "right" }
                                                headerClassName: 'react-table-center',
                                                // width: '50'
                                                minWidth: 40
                                            },
                                            //{
                                            //    Header: "TXN-ID",
                                            //    accessor: "txnId",

                                                //},

                                            {
                                                Header: "TransDate",
                                                accessor: "transactionDate",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                //width: '50'
                                                minWidth: 60
                                            },
                                            {
                                                Header: "Description",
                                                accessor: "description",
                                                style: { textAlign: "left" },
                                                headerClassName: 'react-table-center',
                                                //width: '50'
                                                minWidth: 100
                                            },
                                            {
                                                Header: "OpeningBalance",
                                                accessor: "initialAmount",
                                                style: { textAlign: "right" },
                                                headerClassName: 'react-table-center',
                                                //width: '50'
                                            },
                                            {
                                                Header: "TransType",
                                                accessor: "txnType",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                //width: '50'

                                                },
                                                {
                                                    Header: "TransAmount",
                                                    accessor: "txnAmount",
                                                    // headerClassName: 'rt-tr-align-right',
                                                    style: { textAlign: "right" },
                                                    headerClassName: 'react-table-center',
                                                    // textAlign:"right"
                                                    // Width: "20px"
                                                    // width: '30'
                                                },

                                                {
                                                    Header: "ClosingBalance",
                                                    accessor: "availableAmount",
                                                    style: { textAlign: "right" },
                                                    headerClassName: 'react-table-center ',
                                                    //   width: '50'
                                                },


                                        ]}
                                        defaultPageSize={[this.state.newdata.length]}
                                        pageSize={([this.state.newdata.length + 1] < 7) ? [this.state.newdata.length + 1] : 7}
                                        showPaginationTop={false}
                                        showPaginationBottom
                                        className="-striped -highlight discription-tab"
                                    />

                                </Animated>
                            </GridItem>
                        </GridContainer>
                        : null
                }
            </div>
        );
    }
}

export default withStyles(style)(ReplenishCDaccount);
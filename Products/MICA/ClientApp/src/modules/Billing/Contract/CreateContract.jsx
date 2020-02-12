import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
//import ReactTable from "react-table";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
//import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";
import MyUploader from "./DocumnetUpload.jsx";
import swal from 'sweetalert';
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import BillingConfig from "modules/Billing/BillingConfig.js";
import { Animated } from "react-animated-css";
import $ from 'jquery';
import Success from "../../../components/Typography/Success.jsx";
//import MyDocument from "./Pdf/index.js";
import { Redirect } from 'react-router-dom';
import validationPage from "modules/Billing/ValidationPage.jsx";
import SearchCustomer from "modules/Billing/Contract/SearchCustomer.jsx";

class CreateContract extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props, 'SEarch');
        this.state = {
            search: false,
            customerIdState: "",
            customerNameState: "",
            customername:"",
            Okflag:false,
            searchTableSec:false,
            activeFrom: "",
            errormessage: false,
            Datapic: [
                { documentStr:""}
            ], 
            docpage: false,
            contractDetails: [],
            newData:[],
            masterList: [],
            redirect: false,
            Currency: "",
            ContractCurrency:"",
            contractId: "",
            customerId: "",
            customerName:"",
            selectedRow: [],
            customerdata:[],
            customerN:"",
            searchContractTable: false,
            datediff: "",
            DateRange: false,
            dateVal: "",
            ContractData: {
                customerId:"",
                contractName: "",
                customerName:"",
                customerName:"",
                createdDate: "",
                currencyId: "",
                contractEffeciveDate: "",
                contractEndDate: "",
                maxCreditAmountAllowed: "",
                maxCreditPeriod: "",
                gracePeriod: "",
                pono: "",
                podate: "",
                contractEffectiveDate: "",
            },
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
            ContractResetData: {
                customerId: "",
                contractName: "",
                customerName: "",
                customerName: "",
                createdDate: "",
                currencyId: "",
                contractEffeciveDate: "",
                contractEndDate: "",
                maxCreditAmountAllowed: "",
                maxCreditPeriod: "",
                gracePeriod: "",
                pono: "",
                podate: "",
            },
            searchData: [],
            CustomersDTO: {
                contractId:"",
                customerId: "",
                customerName: "",
                categoryId: "",
                configurationTypeId: "",
                typeId: "",
                corpAddressSameAs: "",
                mailingAddressSameAs: "",
                logo: "",
                website: "",
                phoneNo: "",
                faxNo: "",
                levels: "",
                registrationNo: "",
                registeringAuthority: "",
                registrationDate:"",
                serviceTaxRegistrationNumber: "",
                panno: "",
                tanno: "",
                isActive: true,
                createdBy: "",
                createdDate: "",
                modifiedBy: "",
                modifiedDate:"",
                code: "",
                contractEffectiveDate: "",
                contract: [],
                custAddress: [],
                custSpocDetails: []
            },

            CustomersResetDTO: {
                contractId: "",
                customerId: "",
                customerName: "",
                categoryId: "",
                configurationTypeId: "",
                typeId: "",
                corpAddressSameAs: "",
                mailingAddressSameAs: "",
                logo: "",
                website: "",
                phoneNo: "",
                faxNo: "",
                levels: "",
                registrationNo: "",
                registeringAuthority: "",
                registrationDate: "",
                serviceTaxRegistrationNumber: "",
                panno: "",
                tanno: "",
                isActive: true,
                createdBy: "",
                createdDate: "",
                modifiedBy: "",
                modifiedDate: "",
                code: "",
                contract: [],
                custAddress: [],
                custSpocDetails: []
            },
           
            contractNameState: "",
            createdDateState: "",
            maxCreditAmountAllowedState: "",
            maxCreditPeriodState: "",
            gracePeriodState: "",
            ponoState: "",
        };
        console.log(this.props, 'Props Data');
    }

    componentDidMount() {

        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetMaster?lMasterlist=Currency`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ masterList: data });
            });
        console.log("data", this.state.masterList);

       

    }
    change(event, stateName, type, date, maxValue) {
        switch (type) {

            case "string":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "datetime":
                if (validationPage.verifydatetime(date)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "pan":
                if (validationPage.verifyPanNum(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "phoneno":
                if (validationPage.verifyNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "email":
                if (validationPage.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "website":
                if (validationPage.verifyUrl(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "tan":
                if (validationPage.verifyTanNum(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "number":
                if (validationPage.verifyNumeric(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "numspchras":
                if (validationPage.verifynumspchars(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }

    onInputChange = (type, event) => {
        const fields = this.state.ContractData;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        this.change(event, event.target.name, type);
    };

    onInputParamChange = (evt) => {
        console.log('Event', evt);
        const fields = this.state.ContractData;
        fields[evt.target.name] = evt.target.value;
        console.log("fields", fields);
        this.setState({ fields });

    };

    onDateChange = (formate, name, event) => {
        this.setState({ DateRange: true });
        var today = event.toDate();
        if (today.getDate() < 10) {
            var dt = '0' + today.getDate();
        }
        else {
            var dt = today.getDate();
        }
        if (today.getMonth() < 10) {
            var mm = '0' + (today.getMonth() + 1)
        }
        else {
            var mm = (today.getMonth() + 1);
        } 
        var date = dt + '/' + mm + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);
        if (name === "PurchaseOrderDate") {
            let state = this.state;
            state[name] = date;
            this.setState({ state });
        } else {
            const ContractDTO = this.state.ContractData;
            ContractDTO[name] = date;
            this.setState({ ContractDTO });
        }
    };

  
    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }
    onFormSubmit = () => {
        debugger;
        if (this.state.customerN != "" && this.state.ContractData.createdDate != "" && this.state.ContractData.contractEffectiveDate != "" && this.state.ContractData.contractEndDate != "" && this.state.ContractData.currencyId != "" && this.state.ContractData.podate != "" && this.state.ContractData.maxCreditAmountAllowed != ""
            && this.state.ContractData.maxCreditPeriod != "" && this.state.ContractData.gracePeriod != "" && this.state.ContractData.pono!="") {
        const Cdate = this.state.ContractData.createdDate;
        const Cenddate = this.state.ContractData.contractEndDate;
        const Ceffdate = this.state.ContractData.contractEffectiveDate;
        const Podate = this.state.ContractData.podate;
        this.state.ContractData.createdDate = this.datechange(this.state.ContractData.createdDate);
        this.state.ContractData.contractEndDate = this.datechange(this.state.ContractData.contractEndDate);
        this.state.ContractData.contractEffectiveDate = this.datechange(this.state.ContractData.contractEffectiveDate);
        this.state.ContractData.podate = this.datechange(this.state.ContractData.podate);

        console.log("abcdHit");
        console.log(this.props.customerdata, 'Customer Data');
        //this.setState({ customerdata: this.props.customerdata.filter(item => item.customerName == this.state.CustomersDTO.customerName) });
        console.log(this.state.customerdata, 'My DATA');
        debugger;
        this.state.ContractData.isActive = "Y";
        var data = {
            'contractName': this.state.ContractData.contractName,
            'customerId': this.state.ContractData.customerId,
            'vendorId': this.state.ContractData.vendorId,
            'contractEffectiveDate': this.state.ContractData.contractEffectiveDate,
            'contractEndDate': this.state.ContractData.contractEndDate,
            'maxCreditPeriod': this.state.ContractData.maxCreditPeriod,
            'maxCreditAmountAllowed': this.state.ContractData.maxCreditAmountAllowed,
            'gracePeriod': this.state.ContractData.gracePeriod,
            'currencyId': this.state.ContractData.currencyId,
            'pono': this.state.ContractData.pono,
            'podate': this.state.ContractData.podate,
            'createdBy': this.state.ContractData.createdBy,
            'createdDate': this.state.ContractData.createdDate,
            'isActive': this.state.ContractData.isActive,
        };
        
            fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/CreateContract`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                    this.setState({ contractId: data.contractId });//to display contract id in swal
                    console.log("create Contract: ", data);
                });
            this.state.ContractData.createdDate = Cdate;
            this.state.ContractData.contractEndDate = Cenddate;
            this.state.ContractData.contractEffectiveDate = Ceffdate;
            this.state.ContractData.podate = Podate;
            document.getElementById('searchTableSec');

            swal({
                text: "Contract for:" +"  "+ this.state.customerN +"  "+ "created successfully",
                icon: "success",
                button: "OK",
            });
            // this.setState({ redirect: true });
        
        this.renderRedirect();

        this.setState({ customerId: this.state.ContractData.customerId })
        console.log("FuncData", this.state.ContractData);
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetContractHistory?customerId=` + this.state.ContractData.customerId, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                this.setState({ contractDetails: data });
                console.log("history data:", this.state.contractDetails);
                this.setState({
                    docpage: true
                });
                if (this.state.contractDetails.length > 0) {
                    this.datatable();
                }
                

            });

        } else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }

    }

    datatable = () => {
        this.setState({
            newData: this.state.contractDetails.map((prop, key) => {
                return {
                    SNo: key + 1,
                    //CustomerName: prop.customerName,
                    ContractId: prop.contractId,
                    DocumentName: <a onClick={() => this.documentView(prop.contractId)}>{prop.documentName} </a>,
                    ContractDate: new Date(prop.createdDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    ContractCurrency: prop.currency,
                    MaxCreditAmountAllowed: prop.maxCreditAmountAllowed,
                    MaxCreditPeriod: prop.maxCreditPeriod,
                    ContractEffectiveDate: new Date(prop.contractEffectiveDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    ContractEndDate: new Date(prop.contractEndDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    GracePeriod: prop.gracePeriod,
                };
            })
        });
    }
    renderRedirect = () => {
        const Cdata = this.state.ContractResetData;
        this.state.ContractData = Cdata;
        this.setState({ Cdata });
        const CustData = this.state.CustomersResetDTO;
        this.state.CustomersDTO = CustData;
        this.setState({ CustData });
    }


    handleSearchCustomer = (event) => {
        console.log(this.state.customerdata, "customerdata")

        debugger
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/CustomerSearch`, {
            method: 'POST',
            body: JSON.stringify(this.state.CustomersDTO),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        }).then(response => response.json())
            .then(data => {

                console.log("data save result:", data);
                this.setState({ searchData: data });
                //this.setState({ CustomersDTO: data });

                //console.log("data save result:", this.state.ContractDTO);
                if (data.length > 0) {
                    // document.getElementById('searchContractTable').style.display = 'block';
                    this.setState({ searchContractTable: true });
                    this.customerTable(data);
                }

            });
    }

    customerTable = (rows) => {
        console.log("contracttable", this.state.CustomersDTO);
        this.setState({
            customerdata: rows.map((prop, key) => {
                return {
                    id: key,
                    SNo: key + 1,
                    CustomerId: prop.customerId,
                    CustomerName: prop.customerName,
                    radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.customerId, prop.customerName)} />
                };
            })
        });
    }
    editFunction(id, cId, cName) {
        debugger
        
        const fields = this.state.ContractData;
        fields['customerName'] = this.state.CustomersDTO[0].customerName;

        //this.setState({ customerN: cName });
        var orgArr = this.state.CustomersDTO;
        var contArr = [];
        $.each(orgArr, function (k, v) {
            if (v.customerId == cId) {
                contArr.push(orgArr[id]);
            }
        })
        console.log("ContArr", contArr);
        this.state.selectedRow = contArr;
    };

    handleOK = () => {
        console.log("customerprops", this.state.selectedRow);
        //this.state.customerName = this.state.selectedRow[0].customerName;
        //this.state.ContractData.customerId = this.state.selectedRow[0].customerId;
        this.setState({ searchContractTable: false });

        console.log(" this.state.ContractData", this.state.ContractData);
    }

    SetCustomer = ((type, event) => {
        console.log("customerdto", this.state.CustomersDTO);
        event.preventDefault();
        let CustomersDTO = this.state.CustomersDTO;
        let name = event.target.name;
        let value = event.target.value;
        CustomersDTO[name] = value;
        this.setState({ CustomersDTO });
        this.change(event, name, type);
    });
    //downloadpdfFun = () => {
    //    window.open(
    //        '',
    //        '_blank' // <- This is what makes it open in a new window.
    //    );
    //}
    documentView = (Id) => {
        debugger;
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/DocumentView?ContractId=` + Id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
               // this.setState({ contractDetails: data });
                console.log("Document data:", data);
                const doc=this.state.Datapic[0];
                doc.documentStr = data[0].documentStr;
                this.setState({ doc});
                console.log("documentStr", this.state.Datapic[0].documentStr);
                //window.open('http://localhost:61048/Bills/"+documentStr+"', '_blank');
                window.open("data:application/jpg;base64, " + this.state.Datapic[0].documentStr);
                //let int8array = new Uint8Array(data);
                //let signature = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
                //let newArray = new Uint8Array(int8array.length + signature.length);
                //newArray.set(signature);
                //newArray.set(int8array, signature.length);
                //console.log("New Array", newArray,"newArray" ,newArray);
                //this.downloadpdfFun();
            });

    }
    uint8ToImageData=(uint8, width, height) =>{
        let iData = this.context.createImageData(width, height);
        for (let i = 0; i < uint8.length; i++) {
            iData.data[i] = uint8[i];
        }
        return iData;
    }
    //onDateChange = (formate, type, name, event) => {

    //    this.setState({ DateRange: true });
    //    var today = event.toDate();
    //    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    //    var date2 = new Date();
    //    var date1 = new Date(today);
    //    if (type === 'ContractDTO') {
    //        let ContractDTO = this.state.ContractDTO;
    //        ContractDTO[name] = date;
    //        this.setState({ ContractDTO });

    //        var timeDiff = date2.getTime() - date1.getTime();
    //        var datediff = this.state.date;
    //        datediff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    //        // var datediff = datediff;
    //        this.setState({ datediff });
    //    }
    //}

    customerNameUpdate = (searchData,cId, cName) => {//to get customer data from class component
        this.state.ContractData.customerId = cId;
        this.setState({ customerN: cName });
        console.log('name update', cName, searchData,cId);
    }
    
    render() {
        const { classes } = this.props;

        return (
            <div>
                <SearchCustomer search={this.state.search}
                    customerNameState={this.state.customerNameState}
                    CustomersDTO={this.state.CustomersDTO} handleSearchCustomer={this.state.handleSearchCustomer}
                    customerTable={this.state.customerTable} SetCustomer={this.state.SetCustomer}
                    customerdata={this.state.customerdata} searchContractTable={this.state.searchContractTable}
                    Okflag={this.state.Okflag} customerNameUpdate={this.customerNameUpdate}
                    customername={this.state.customername} customerdata={this.state.customerdata}
                    />
                    
                <br />
                
            <Card className="assignCard">
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> Contract Details </small>
                        </h4>
                    }
                </CardHeader>

                <CardBody>

                    <div>

                        <GridContainer>

                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        labelText="Customer Name"
                                        name="customerN"
                                        required={true}
                                        value={this.state.customerN}
                                        onChange={(e) => this.onInputChange("string", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                    {this.state.errormessage && (this.state.customerN == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                    <CustomDatetime required={true}
                                        onFocus={this.state.onClick}
                                        labelText="Contract Date"
                                        id='createdDate'
                                        name='createdDate'
                                        onChange={(evt) => this.onDateChange('datetime', 'createdDate', evt)}
                                        value={this.state.ContractData.createdDate}
                                        formControlProps={{ fullWidth: true }} />
                                    {this.state.errormessage && (this.state.ContractData.createdDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                            </GridItem>



                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.contractNameState === "success"}
                                        error={this.state.contractNameState === "error"}
                                        labelText="Contract Name"
                                        name="contractName"
                                        required={true}
                                        value={this.state.ContractData.contractName}
                                        onChange={(e) => this.onInputChange("string", e)}

                                        formControlProps={{ fullWidth: true }}
                                    />
                                    {this.state.errormessage && (this.state.ContractData.contractName == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomDatetime
                                        required={true}
                                        onFocus={this.state.onClick}
                                        labelText="Effective From Date"
                                        id='dtActiveFrom'
                                        name='contractEffectiveDate'
                                        DateRange={this.state.DateRange}
                                        datediff={this.state.datediff}
                                        onChange={(evt) => this.onDateChange('datetime', 'contractEffectiveDate', evt)}
                                        value={this.state.ContractData.contractEffectiveDate}
                                        formControlProps={{ fullWidth: true }} />
                                    {this.state.errormessage && (this.state.ContractData.contractEffectiveDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                </GridItem>


                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomDatetime
                                        required={true}
                                        onFocus={this.state.onClick}
                                        labelText="Effective To Date"
                                        id='dtActiveFrom'
                                        name='contractEndDate'
                                        DateRange={this.state.DateRange}
                                        datediff={this.state.datediff}
                                        onChange={(evt) => this.onDateChange('datetime', 'contractEndDate', evt)}
                                        value={this.state.ContractData.contractEndDate}
                                        formControlProps={{ fullWidth: true }} />
                                    {this.state.errormessage && (this.state.ContractData.contractEndDate == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                </GridItem>


                            <GridItem xs={12} sm={12} md={4}>
                                <MasterDropdown
                                    labelText="Contract Currency"
                                        id="Currency"
                                        required={true}
                                    value={this.state.ContractData.currencyId}
                                    lstObject={this.state.masterList}
                                    required={true} 
                                    filterName='Currency'
                                    name='currencyId'
                                    onChange={this.onInputParamChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    />
                                    {this.state.errormessage && (this.state.ContractData.currencyId == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                            </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.maxCreditAmountAllowedState === "success"}
                                        error={this.state.maxCreditAmountAllowedState === "error"}
                                        labelText="Max Credit Amount"
                                        name="maxCreditAmountAllowed"
                                        required={true} 
                                        // required={true}
                                        value={this.state.ContractData.maxCreditAmountAllowed}
                                        // onChange={(evt) => this.onInputChange("string", evt)}
                                        onChange={(e) => this.onInputChange("number", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                    {this.state.errormessage && (this.state.ContractData.maxCreditAmountAllowed == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                </GridItem>

                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.maxCreditPeriodState === "success"}
                                        error={this.state.maxCreditPeriodState === "error"}
                                        labelText="Max Credit Period(In Days)"
                                        name="maxCreditPeriod"
                                        required={true}
                                        value={this.state.ContractData.maxCreditPeriod}
                                        onChange={(e) => this.onInputChange("number", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                    {this.state.errormessage && (this.state.ContractData.maxCreditPeriod == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.gracePeriodState === "success"}
                                        error={this.state.gracePeriodState === "error"}
                                        labelText="Grace Period(In Days)"
                                        name="gracePeriod"
                                         required={true}
                                        value={this.state.ContractData.gracePeriod}
                                        onChange={(e) => this.onInputChange("number", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                    {this.state.errormessage && (this.state.ContractData.gracePeriod == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                </GridItem>
                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        success={this.state.ponoState === "success"}
                                        error={this.state.ponoState === "error"}
                                        labelText="Purchase Order No"
                                        name="pono"
                                        required={true}
                                        value={this.state.ContractData.pono}
                                        onChange={(e) => this.onInputChange("numspchras", e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                    {this.state.errormessage && (this.state.ContractData.pono == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomDatetime
                                        required={true}
                                        onFocus={this.state.onClick}
                                        labelText="Purchase Order Date"
                                        id='dtActiveFrom' name='podate'
                                        onChange={(evt) => this.onDateChange('datetime', 'podate', evt)}
                                        value={this.state.ContractData.podate}
                                        formControlProps={{ fullWidth: true }} />
                                    {this.state.errormessage && (this.state.ContractData.podate == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                </GridItem>

                        </GridContainer>

                            {/* <GridContainer justify="center">
                                <GridItem xs={3} sm={3} md={3}>
                                    <Button id="round" color="info" onClick={this.onFormSubmit}> Save  </Button>
                                </GridItem>
                            </GridContainer>*/}

                            {/* <img target="_blank" src={'data:image/jpeg;base64,' + this.state.Datapic[0].documentStr} id="photo-id"  />
                            */}

                            <MyUploader
                                handleChange={this.handleChange}
                                getUploadParams={this.state.getUploadParams}
                                onChangeStatus={this.state.handleChangeStatus}
                                onSubmit={this.state.handleSubmit}
                                fields={this.state.fields}
                                ContractData={this.state.contractId}
                                contractId={this.state.contractId}
                                onInputParamChange={this.onInputParamChange}
                            //entries={this.state.entries} 
                            />


                            <GridContainer justify="center">
                                <GridItem xs={3} sm={3} md={3}>
                                    <Button id="round" color="info" onClick={() => this.onFormSubmit()} > Save  </Button>
                                </GridItem>
                            </GridContainer>

                               {/*this.renderRedirect()*/}
                      


                    </div>
                </CardBody>
                </Card>
                {
                    this.state.searchTableSec?
                <GridContainer>
                    <GridItem xs={12} >
                                <ReactTable
                                    title={"History"}
                            data={this.state.newData}
                            filterable
                            columns={[
                                {
                                    Header: "S.No",
                                    accessor: "SNo",
                                    //style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 30,
                                    resizable: false,

                                },
                                //{
                                //    Header: "Customer Name",
                                //    accessor: "CustomerName",
                                //    //style: { textAlign: "center" },
                                //    headerClassName: 'react-table-center',
                                //    minWidth: 60,
                                //    resizable: false,
                                //    /* minWidth: 150,
                                //       style: { textAlign: "center" },
                                //       headerClassName: 'react-table-center'*/
                                //},
                                {
                                    Header: "Contract Id",
                                    accessor: "ContractId",
                                    //style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 60,
                                    resizable: false,
                                    /* minWidth: 150,
                                       style: { textAlign: "center" },
                                       headerClassName: 'react-table-center'*/
                                },
                                {
                                    Header: "Document Name",
                                    accessor: "DocumentName",
                                    //Cell: e => <a href={e.value} onClick={() => this.documentView(e.value)}>{e.value} </a>,
                                    //style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 60,
                                    resizable: false,
                                    /* minWidth: 150,
                                       style: { textAlign: "center" },
                                       headerClassName: 'react-table-center'*/
                                },
                                {
                                    Header: "Contract Date",
                                    accessor: "ContractDate",
                                    //style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 60,
                                    resizable: false,
                                    /* minWidth: 150,
                                       style: { textAlign: "center" },
                                       headerClassName: 'react-table-center'*/
                                },
                                {

                                    Header: "Effective From Date",
                                    accessor: "ContractEffectiveDate",
                                    //minWidth: 150,
                                    //style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 60,
                                    resizable: false,
                                },
                                {
                                    Header: "Effective To Date",
                                    accessor: "ContractEndDate",
                                    //minWidth: 150,
                                    //style: { textAlign: "center" },
                                    //headerClassName: 'react-table-center'
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 60,
                                    resizable: false,
                                },
                                {
                                    Header: "Contract Currency",
                                    accessor: "ContractCurrency",

                                    ///style: { textAlign: "center" },
                                    ///headerClassName: 'react-table-center'
                                    //style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 60,
                                    resizable: false,
                                },
                                {
                                    Header: "Max Credit Amount Allowed",
                                    accessor: "MaxCreditAmountAllowed",
                                    //style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 60,
                                    resizable: false,
                                    //minWidth: 150,
                                    //style: { textAlign: "center" },
                                    //headerClassName: 'react-table-center'
                                },
                                {

                                    Header: "Max Credit Period",
                                    accessor: "MaxCreditPeriod",
                                    //minWidth: 150,
                                    //style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 50,
                                    resizable: false,
                                },
                                {

                                    Header: "Grace Period",
                                    accessor: "GracePeriod",
                                    //minWidth: 150,
                                    //style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    minWidth: 50,
                                    resizable: false,
                                },



                            ]}

                            defaultPageSize={5}
                            showPaginationTop={false}
                            //pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                            showPaginationBottom
                            className="-striped -highlight"
                        />
                    </GridItem>
                </GridContainer>
                        : null}

            
</div>

        );




    }


}

export default CreateContract;

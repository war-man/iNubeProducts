import React from "react";
import { withStyles } from '@material-ui/core/styles';
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import partnerconfig from "modules/Partners/PartnerConfig.js";
import Customer from "assets/img/Customer-details.png";
import { Animated } from "react-animated-css";
import CustomerAddress from "./_CustomerAddress";
import BillingConfig from 'modules/Billing/BillingConfig.js';
import swal from 'sweetalert';
import validationPage from "modules/Partners/Organization/views/ValidationPage.jsx";
//import MyUploader from "modules/Claims/views/ClaimIntimate/Document.jsx";
import MyUploader from "modules/Billing/Customer/Invoice/Document.jsx";
import ContractCollapse from "./_ContractCollapse";
import CreateContract from "./CreateContract";
import Accordion from "components/Accordion/AccordianWithoutLoop.jsx";
import UserConfig from 'modules/Users/UserConfig.js';
import { Redirect } from 'react-router-dom';

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


class CreateCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CustomerObj: {
                ContractObj: [],
            },
            ContractObj: {
                ContractData: [{
                    
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
                    TblInvoiceConfig: [],
                    TblBillingConfig: [],
                    
                }],
                
                contractNameState: "",
                createdDateState: "",
                maxCreditAmountAllowedState: "",
                maxCreditPeriodState: "",
                gracePeriodState: "",
                ponoState: "",

               
            },
            add: [],
            BillingConfigObj: {
                billingConfigs: {
                    "billingConfigId": 0,
                    "contractId": 0,
                    "billingStartDate": "",
                    "billingEndDate": "",
                    "currencyId": "",
                    "remarks": "",
                    "billingAmount": "",
                    "createdBy": 0,
                    "createdDate": "",
                    "tblBillingItem": [
                    ]
                },
                "billingItem": [
                    {
                        "billingItemId": 0,
                        "billingConfigId": 0,
                        "billingTypeDesc": "",
                        "billingFrequencyId": 0,
                        "noofFrequency": 0,
                        "categoryTypeId": 0,
                        "valueFactorId": 0,
                        "rateCategoryId": 0,
                        "rateTypeId": 0,
                        "threshold": 0,
                        "rate": 0,
                        "createdBy": 0,
                        "createdDate": "",
                        "eventMappingId": 0,
                        "tblBillingItemDetail": [
                            {
                                "billingItemDetailId": 0,
                                "billingItemId": 0,
                                "seqNo": 0,
                                "amount": 0,
                                "dueDate": "",
                                "from": 0,
                                "to": 0,
                                "ratePercent": 0,
                                "cumulative": 0,
                            }
                        ],
                        "BillingItemDetail": [
                            {
                                "billingItemDetailId": 0,
                                "billingItemId": 0,
                                "seqNo": 0,
                                "amount": 0,
                                "dueDate": "",
                                "from": 0,
                                "to": 0,
                                "ratePercent": 0,
                                "cumulative": 0,
                            }
                        ]
                    }
                ],
            },
            InvoiceConfigObj: {
                InvoiceData: {
                    frequencyId: "",
                    contractId: "",
                    invoiceCreditPeriod: "",
                    invoiceGracePeriod: "",
                    invoiceStartDate: "",
                    invoiceEndDate: "",
                    penaltyPercentage: "",
                },
            },

            masterList: [],
            LocationDTO: {
                "Country": [],
                State: [],
                District: [],
                City: [],
                Pincode: [],
                "selectedValue": null,

            },
            addressDTO: {
                countryId: "",
                stateId: "",
                districtId: "",
                cityId: "",
                pincodeId: ""

            },
            CustomerDto: {
                "customerId": 0,
                "customerName": "",
                "categoryId": 0,
                "configurationTypeId": 0,
                "typeId": 0,
                "corpAddressSameAs": "",
                "mailingAddressSameAs": "",
                "logo": "",
                "website": "",
                "phoneNo": "",
                "faxNo": "",
                "levels": 0,
                "registrationNo": "",
                "registeringAuthority": "",
                "registrationDate": "",
                "serviceTaxRegistrationNumber": "",
                "panno": "",
                "tanno": "",
                "createdBy": "",
                "createdDate": "",
                "modifiedBy": "",
                "modifiedDate": "",
                "code": "",
                "custAddress": [
                    
                ],
                "custSpocDetails": [
                   
                ],
                "Contract": [

                ],
            },
            regAddress: [
                {
                    "addressId": 0,
                        "customerId": 0,
                        "addressType": "",
                        "countryId": "",
                        "stateId": "",
                        "districtId": "",
                        "cityId": "",
                        "addressLine1": "",
                        "addressLine2": "",
                        "addressLine3": "",
                        "pincodeId": ""
                }
            ],
            spocDetails: [
                {
                    "spocId": 0,
                    "customerId": 0,
                    "firstName": "",
                    "mobileno": "",
                    "emailId": "",
                    "designation": "",
                    "countryId": "",
                    "stateId": "",
                    "districtId": "",
                    "cityId": "",
                    "addressLine1": "",
                    "addressLine2": "",
                    "addressLine3": "",
                    "pincodeId": "",
                    "middleName": "",
                    "lastName": "",
                    "dob": "",
                    "doj": "",
                    "panNo": "",
                    "landLineOffice": "",
                    "landLineResidence": "",
                    "userName": "",
                    "maritalStatusId": "",
                    "genderId": "",
                    "branchName": "",
                    "brachCode": 0
                }
            ],
            custSearchData: [],
            modifyFlag: false,
            SearchFlag: false,

            customerNameState: "",
            websiteState: "",
            phoneNoState: "",
            faxNoState: "",
            addressLine1State: "",
            addressLine2State: "",
            addressLine3State: "",
            pannoState: "",
            firstNameState: "",
            middleNameState: "",
            lastNameState: "",
            designationState: "",
            emailIdState: "",
            mobilenoState: "",
            landLineOfficeState: "",
            panNoState: "",
            registrationNoState: "",
            registeringAuthorityState: "",
            serviceTaxRegistrationNumberState: "",
            tannoState: "",
           
            CustomerId: "",
            CustNameDisable: false,
            errormessage: false,
            nameMessage: false,
            spocemailMessage: false,
            servermessage: "",
            spocservermessage: "",
            customerNameState: "",
            spocDobValid: false,
            spocDojValid: false,
            currentDate: "",
            dobState: "",
            dojState: "",
            AddCont: [],
            disableView: false,
            validateUI: false,
            viewbtn: false,
            redirect: false,
            master:[],
        };
        this.CustomerDetails = {
            "CustomerDto": this.state.CustomerDto,
            "regAddress": this.state.regAddress,
            "spocDetails": this.state.spocDetails,
            //errormessage: this.state.errormessage,
        };
    }

    GetLocationService = (type, pID) => {
        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetLocation?locationType=` + type + `&parentID=` + pID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                const lData = data;
                let locDTO = this.state.LocationDTO;
                locDTO[type] = lData;
                this.setState({ locDTO });
                console.log("locationDto", this.state.LocationDTO);
            });
    };

    componentDidMount() {

        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetMasterData?sMasterlist=abc`, {
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
            });

        this.GetLocationService('Country', 0);

        fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetMaster?lMasterlist=Currency`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("master: ", data);
                this.setState({ master: data });
            });
        console.log("data", this.state.master);


        console.log("sendCustomerid", this.props.sendCustomerid);
        if (this.props.sendCustomerid != null) {
            if (this.props.sendCustomerid != "") {

                this.state.viewbtn = this.props.viewPage;
                console.log("viewpage:", this.state.viewbtn);
                fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/GetCustomerById?Customerid=` + this.props.sendCustomerid, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    },
                })
                    .then(response => response.json())
                    .then(data => {

                        this.setState({ custSearchData: data });
                        console.log("searchdata", this.state.custSearchData);

                        let bdata = this.state;
                        let Contractobj = this.state.ContractObj;
                        bdata['CustomerDto'] = data;
                        console.log("customerdto", this.state.CustomerDto);
                        if (data.custAddress != "") {
                            bdata['regAddress'] = data.custAddress;
                        }
                        if (data.custSpocDetails != "") {
                            bdata['spocDetails'] = data.custSpocDetails;
                            this.state.spocDetails[0].dob = new Date(this.state.spocDetails[0].dob).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                            this.state.spocDetails[0].doj = new Date(this.state.spocDetails[0].doj).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                        }
                        if (data.contract != "") {
                            Contractobj['ContractData'] = data.contract;
                            bdata.CustomerObj.ContractObj.push(data.contract);
                            this.setState({ Contractobj });
                            this.setState({ bdata });
                            this.setState({ SearchFlag: true });
                            this.setState({ CustNameDisable: true });
                            this.state.AddCont.push(this.state.ContractObj);
                            debugger
                            for (let i = 0; i < data.contract.length; i++) {
                                this.state.add = this.state.add.concat({
                                    title: "Contract",
                                    content: <CreateContract props={this.state.ContractObj} onInputChange={this.onInputChange} onDateChangeContract={this.onDateChangeContract} SearchFlag={this.state.SearchFlag} index={i} />
                                });
                            }
                        }

                        console.log("regaddress:", this.state.regAddress);
                        this.GetLocationService('Country', 0);
                        this.GetLocationService('State', this.state.regAddress[0].countryId);
                        this.GetLocationService('District', this.state.regAddress[0].stateId);
                        this.GetLocationService('City', this.state.regAddress[0].districtId);
                        this.GetLocationService('Pincode', this.state.regAddress[0].cityId);
                        console.log("cust:", this.state.CustomerDto);
                        this.setState({ modifyFlag: true });
                        if (this.props.viewPage == true) {
                            this.setState({ disableView: true });
                        }
                        else {
                            this.setState({ disableView: false });
                        }

                    });
                console.log("invoice data in class", this.state.InvoiceData);
            }
        }
        else {
            debugger
            console.log("contractdto:", this.state.ContractObj.ContractData);
            this.state.add = this.state.add.concat({
                title: "Contract",
                content: <CreateContract props={this.state.ContractObj} errormessage={this.state.errormessage} onInputChange={this.onInputChange} onDateChangeContract={this.onDateChangeContract} SearchFlag={this.state.SearchFlag} handleBillingitem={this.handleBillingitem} index={0} />
            });
            this.state.AddCont.push(this.state.ContractObj);

            this.setState({ SearchFlag: false });
            console.log("accordian:", this.state.add);
            console.log("AddCont:", this.state.AddCont);
        }
    }


    GetLocation = (type, event) => {
        debugger
        let regAddress = this.state.regAddress;
        let name = event.target.name;
        let value = event.target.value;
        regAddress[0][name] = value;

        this.setState({ regAddress });
        if (type != "") {
            this.GetLocationService(type, event.target.value);
        }
    };

    SetValue = ((type, event) => {
        debugger
        this.setState({ nameMessage: false });
        this.setState({ spocemailMessage: false });
        let CustomerDto = this.state.CustomerDto;
        let name = event.target.name;
        let value = event.target.value;
        CustomerDto[name] = value;
        this.setState({ CustomerDto });
       

        if (name === "customerName") {

            fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/CustomerNamevalidation?Name=` + value, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("data status", data.status);
                    if (data.status === 9) {
                        this.setState({ servermessage: data.responseMessage });
                        this.setState({ nameMessage: true });
                        this.setState({ customerNameState: "error" });
                    } else {
                        this.setState({ nameMessage: false });

                    }
                });
        }
        
        this.change(event, name, type);
    });

    SetAddValue = ((type, event) => {

        let regAddress = this.state.regAddress;
        let name = event.target.name;
        let value = event.target.value;
        regAddress[0][name] = value;
        this.setState({ regAddress });
        this.change(event, name, type);
    });

    SetSpocValue = ((type, event) => {
        let spocDetails = this.state.spocDetails;
        let name = event.target.name;
        let value = event.target.value;
        spocDetails[0][name] = value;
        this.setState({ spocDetails });

        if (name === "emailId") {

            fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/SpocMailvalidation?email=` + value, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("data status", data.status);
                    if (data.status === 9) {
                        this.setState({ spocservermessage: data.responseMessage });
                        this.setState({ spocemailMessage: true });
                        this.setState({ emailIdState: "error" });
                    } else {
                        this.setState({ spocemailMessage: false });

                    }
                });
        }
        this.change(event, name, type);
    });

    onDateChange = (formate, name, event) => {
        debugger
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        if (mm < 10) {
            mm = '0' + mm;

        }
        if (dd < 10) {
            dd = '0' + dd;
        }

        var date1 = dd + '/' + mm + '/' + today.getFullYear();

        const state = this.state.spocDetails[0];
        state[name] = date1;
        this.setState({ state });

      
        if (name == "dob") {
            this.handleDobvalidation();
        } 
    };


    handleDobvalidation() {
        
        var today = new Date();
        var birthDate = new Date(this.state.spocDetails[0].dob);
        var calculatedage = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        console.log("age value", calculatedage);
        if (calculatedage < 18) {
            swal("", "Date of Birth value entered should be more than 18 years", "error");
           
        }
       
    }

    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    validationFunction = (event) => {
        debugger
        let error = true;
        if (this.state.CustomerDto.customerName == "" && this.state.CustomerDto.website == "" && this.state.CustomerDto.phoneNo == "" && this.state.CustomerDto.registrationNo == "" && this.state.CustomerDto.registeringAuthority == "" && this.state.regAddress[0].addressLine1 == "" && this.state.spocDetails[0].firstName == "" && this.state.spocDetails[0].designation == "" && this.state.spocDetails[0].emailId == "" && this.state.spocDetails[0].mobileno == "" && this.state.spocDetails[0].panNo == "" && this.state.spocDetails[0].genderId == "" && this.state.spocDetails[0].maritalStatusId == "") {
            error = false;
        } 

        if (this.state.ContractObj.ContractData[0].contractName == "" && this.state.ContractObj.ContractData[0].createdDate == "" && this.state.ContractObj.ContractData[0].contractEffectiveDate == "" && this.state.ContractObj.ContractData[0].contractEndDate == "" && this.state.ContractObj.ContractData[0].currencyId == "" && this.state.ContractObj.ContractData[0].podate == "" && this.state.ContractObj.ContractData[0].maxCreditAmountAllowed == ""
            && this.state.ContractObj.ContractData[0].maxCreditPeriod == "" && this.state.ContractObj.ContractData[0].gracePeriod == "" && this.state.ContractObj.ContractData[0].pono == "") {
            error = false;
        } 
        if (this.state.ContractObj.ContractData[0].TblBillingConfig[0].billingStartDate == "" && this.state.ContractObj.ContractData[0].TblBillingConfig[0].billingEndDate == "" && this.state.ContractObj.ContractData[0].TblBillingConfig[0].currencyId == "") {
            error = false;
        } 
        if (this.state.ContractObj.ContractData[0].TblInvoiceConfig[0].frequencyId == "" && this.state.ContractObj.ContractData[0].TblInvoiceConfig[0].invoiceStartDate == "" && this.state.ContractObj.ContractData[0].TblInvoiceConfig[0].invoiceEndDate == "") {
            error = false;
        }
        if (error == false) {
            this.state.errormessage = true;
           // return true;
            //this.setState({ errormessage: true });
        //this.setState({});
        }
    }

    UIValidation = () => {
        if (this.state.customerNameState == "success" && this.state.websiteState == "success" && this.state.phoneNoState == "success" && this.state.registrationNoState == "success" && this.state.registeringAuthorityState == "success" && this.state.addressLine1State == "success" && this.state.firstNameState == "success" && this.state.designationState == "success" && this.state.emailIdState == "success" && this.state.mobilenoState == "success" && this.state.panNoState == "success") {
          //  if (this.state.contractNameState == "success") {
                this.state.validateUI = true;
           // }
           
        }
        else {
            this.state.validateUI = false;
        }
    }
    handleSaveCustomer = (event) => {
        debugger
        console.log("billing item in cust", this.state.ContractObj.ContractData[0].TblBillingConfig[0].tblBillingItem );
        const Isdate = this.state.ContractObj.ContractData[0].TblInvoiceConfig[0].invoiceEndDate;
        const Iedate = this.state.ContractObj.ContractData[0].TblInvoiceConfig[0].invoiceStartDate;
        const Bsdate = this.state.ContractObj.ContractData[0].TblBillingConfig[0].billingStartDate;
        const Bedate = this.state.ContractObj.ContractData[0].TblBillingConfig[0].billingEndDate;
        const Sdob = this.state.spocDetails[0].dob;
        const Sdoj = this.state.spocDetails[0].doj;
        const Cdate = this.state.ContractObj.ContractData[0].createdDate;
        const Csdate = this.state.ContractObj.ContractData[0].contractEffectiveDate;
        const Cedate = this.state.ContractObj.ContractData[0].contractEndDate;
        const Cpodate = this.state.ContractObj.ContractData[0].podate;

        event.preventDefault();
        console.log("erroemsg:", this.state.errormessage);
        this.UIValidation();
        this.validationFunction();
      
        this.setState({});
        console.log("erroemsg:", this.state.errormessage);
        if (this.state.validateUI == true) {
            if (this.state.errormessage == false) {
                if (this.state.ContractObj.ContractData[0].TblInvoiceConfig[0].invoiceEndDate != "" || this.state.ContractObj.ContractData[0].TblInvoiceConfig[0].invoiceStartDate != "") {
                    this.state.ContractObj.ContractData[0].TblInvoiceConfig[0].invoiceEndDate = this.datechange(this.state.ContractObj.ContractData[0].TblInvoiceConfig[0].invoiceEndDate);
                    this.state.ContractObj.ContractData[0].TblInvoiceConfig[0].invoiceStartDate = this.datechange(this.state.ContractObj.ContractData[0].TblInvoiceConfig[0].invoiceStartDate);
                }

                console.log("billingitem:", this.state.ContractObj.ContractData[0].TblBillingConfig[0].tblBillingItem);
                if (this.state.ContractObj.ContractData[0].TblBillingConfig[0].billingStartDate != "" || this.state.ContractObj.ContractData[0].TblBillingConfig[0].billingEndDate != "") {
                    this.state.ContractObj.ContractData[0].TblBillingConfig[0].billingStartDate = this.datechange(this.state.ContractObj.ContractData[0].TblBillingConfig[0].billingStartDate);
                    this.state.ContractObj.ContractData[0].TblBillingConfig[0].billingEndDate = this.datechange(this.state.ContractObj.ContractData[0].TblBillingConfig[0].billingEndDate);
                    this.state.ContractObj.ContractData[0].TblBillingConfig[0].tblBillingItem.pop();
                    let len = this.state.ContractObj.ContractData[0].TblBillingConfig[0].tblBillingItem.length;
                    debugger
                    for (let i = 0; i < len; i++) {
                    //    for (let j = 0; j < this.state.ContractObj.ContractData[0].TblBillingConfig[0].tblBillingItem[len].tblBillingItemDetail.length - 1; j++)
                        if (this.state.ContractObj.ContractData[0].TblBillingConfig[0].tblBillingItem[i].tblBillingItemDetail[0].from == 0) {
                            this.state.ContractObj.ContractData[0].TblBillingConfig[0].tblBillingItem[i].tblBillingItemDetail.pop();
                            }
                    }
                }
                console.log("billingitem:", this.state.ContractObj.ContractData[0].TblBillingConfig[0].tblBillingItem);
                if (this.state.spocDetails.dob != "" || this.state.doj != "") {
                    this.state.spocDetails[0].dob = this.datechange(this.state.spocDetails[0].dob);
                    this.state.spocDetails[0].doj = this.datechange(this.state.spocDetails[0].doj);
                }

                let CustomerDtos = this.state.CustomerDto;
                console.log("spocdetails", this.state.spocDetails);
                CustomerDtos['custAddress'] = this.state.regAddress;
                CustomerDtos['custSpocDetails'] = this.state.spocDetails;

                if (this.state.ContractObj.ContractData[0].contractName != "") {
                    if (this.state.ContractObj.ContractData[0].createdDate != "" || this.state.ContractObj.ContractData[0].contractEffectiveDate != "" || this.state.ContractObj.ContractData[0].contractEndDate != "") {
                        this.state.ContractObj.ContractData[0].createdDate = this.datechange(this.state.ContractObj.ContractData[0].createdDate);
                        this.state.ContractObj.ContractData[0].contractEffectiveDate = this.datechange(this.state.ContractObj.ContractData[0].contractEffectiveDate);
                        this.state.ContractObj.ContractData[0].contractEndDate = this.datechange(this.state.ContractObj.ContractData[0].contractEndDate);
                        this.state.ContractObj.ContractData[0].podate = this.datechange(this.state.ContractObj.ContractData[0].podate);
                    }
                    CustomerDtos['Contract'] = this.state.ContractObj.ContractData;
                } else {
                    CustomerDtos['Contract'] = [];
                }
                this.setState({ CustomerDto: CustomerDtos });
                console.log("CustomerDto", this.state.CustomerDto);

                fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/SaveCustomerAsync`, {
                    method: 'POST',
                    body: JSON.stringify(this.state.CustomerDto),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    }
                })
                    .then(response => response.json())
                    .then(data => {

                        //swal({

                        //    text: "Customer for : " + this.state.CustomerDto.customerName + " created successfully",
                        //    icon: "success",
                        //    button: "OK",
                        //});
                        //console.log("data save result:", data);
                        //this.setState({ SavedData: data });
                        //// this.state.CustomerId = this.state.SavedData.result.customerId;
                        //this.setState({});
                        //console.log("Customerid:", this.state.SavedData);
                        if (data.status == 2) {
                            //swal({
                            //    text: data.responseMessage,
                            //    icon: "success"
                            //})
                            swal("", data.responseMessage,"success").then(() => {
                                console.log("response data", data);
                                this.setState({ redirect: true });
                                
                            });
                           // that.setState({ cpartnerid: data.id, partname: data.partner.partnerName, });
                            // console.log("partner", that.state.partname)
                            //if (this.state.noredirect == false) {
                            //    this.setState({ redirect: false });
                            //    this.props.handleClose();
                            //} else {
                            //    that.state.redirect = false;
                            //    that.setState({ redirect: true });
                            //}
                        }
                        else if (data.StatusCode == 500) {
                            swal({
                                text: "Already defined name",
                                icon: "error"
                            });
                            this.setState({ SavedData: data.customer });
                            //that.state.PartnerDTO = that.state.PartnerDTO;
                            //that.setState({ PartnerDTO: that.state.PartnerDTO });
                        } else {
                            swal({
                                text: "Some fields are missing",
                                icon: "error"
                            });
                            this.setState({ SavedData: data.customer });
                            //that.state.PartnerDTO = that.state.PartnerDTO;
                            //that.setState({ PartnerDTO: that.state.PartnerDTO });
                        }
                    });
            }
            else {
                this.setState({});
                console.log("erroemsg:", this.state.errormessage);
                swal("", "Some fields are missing", "error");
            }
        }
        else {
            swal("", "Input fields are not valid, Please enter valid input", "error");
        }

        this.state.ContractObj.ContractData[0].TblInvoiceConfig[0].invoiceEndDate = Isdate;
        this.state.ContractObj.ContractData[0].TblInvoiceConfig[0].invoiceStartDate = Iedate;
        this.state.ContractObj.ContractData[0].TblBillingConfig[0].billingStartDate = Bsdate;
        this.state.ContractObj.ContractData[0].TblBillingConfig[0].billingEndDate = Bedate;
        this.state.spocDetails[0].dob = Sdob;
        this.state.spocDetails[0].doj = Sdoj;
        this.state.ContractObj.ContractData[0].createdDate = Cdate;
        this.state.ContractObj.ContractData[0].contractEffectiveDate = Csdate;
        this.state.ContractObj.ContractData[0].contractEndDate = Cedate;
        this.state.ContractObj.ContractData[0].podate = Cpodate;

    }

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/dashboard/home',
                
            }} />
        }
    }

    //handleBillingitem = (billingitem) => {
    //    this.state.ContractObj.ContractData[0].TblBillingConfig[0].tblBillingItem = billingitem;
    //    this.setState({});
    //}

    handleModifyCustomer = (event) => {
        //this.UIValidation();
        //this.validationFunction();
        const Isdate = this.state.CustomerDto.contract[0].tblInvoiceConfig[0].invoiceEndDate;
        const Iedate = this.state.CustomerDto.contract[0].tblInvoiceConfig[0].invoiceStartDate;
        const Bsdate = this.state.CustomerDto.contract[0].tblBillingConfig[0].billingStartDate;
        const Bedate = this.state.CustomerDto.contract[0].tblBillingConfig[0].billingEndDate;
        const Sdob = this.state.spocDetails[0].dob;
        const Sdoj = this.state.spocDetails[0].doj;
        const Cdate = this.state.CustomerDto.contract[0].createdDate;
        const Csdate = this.state.CustomerDto.contract[0].contractEffectiveDate;
        const Cedate = this.state.CustomerDto.contract[0].contractEndDate;
        const Cpodate = this.state.CustomerDto.contract[0].podate;

        this.setState({});
        console.log("customerdto:", this.state.CustomerDto);
        console.log("billing item in cust", this.state.ContractObj.ContractData);
        //if (this.state.validateUI == true) {
        //    if (this.state.errormessage == false) {
        if (this.state.CustomerDto.contract[0].tblBillingConfig.length > 0) {
        if (this.state.CustomerDto.contract[0].tblBillingConfig[0].billingStartDate != "" || this.state.CustomerDto.contract[0].tblBillingConfig[0].billingEndDate != "") {
            this.state.CustomerDto.contract[0].tblBillingConfig[0].billingStartDate = this.datechange(this.state.CustomerDto.contract[0].tblBillingConfig[0].billingStartDate);
            this.state.CustomerDto.contract[0].tblBillingConfig[0].billingEndDate = this.datechange(this.state.CustomerDto.contract[0].tblBillingConfig[0].billingEndDate);

            this.state.ContractObj.ContractData[0].tblBillingConfig[0].tblBillingItem = this.state.ContractObj.ContractData[0].tblBillingConfig[0].tblBillingItem.filter(s => s.categoryTypeId != "");
            console.log("customerdto: modify", this.state.ContractObj.ContractData[0].tblBillingConfig[0]);
            //let len = this.state.ContractObj.ContractData[0].tblBillingConfig[0].tblBillingItem.length;
            //debugger
            //for (let i = 0; i < len; i++) {
            //    if (this.state.ContractObj.ContractData[0].tblBillingConfig[0].tblBillingItem[i].tblBillingItemDetail.length > 0) {
            //        if (this.state.ContractObj.ContractData[0].tblBillingConfig[0].tblBillingItem[i].tblBillingItemDetail[0].from == 0) {
            //            this.state.ContractObj.ContractData[0].tblBillingConfig[0].tblBillingItem[i].tblBillingItemDetail.pop();
            //        }
            //    }
            //    //if (this.state.ContractObj.ContractData[0].tblBillingConfig[0].tblBillingItem[i].categoryTypeId == "") {
            //        //delete this.state.ContractObj.ContractData[0].tblBillingConfig[0].tblBillingItem[i];
            //    //}
            //    //    for (let j = 0; j < this.state.ContractObj.ContractData[0].TblBillingConfig[0].tblBillingItem[len].tblBillingItemDetail.length - 1; j++)
               
            //}
        }
        }
        if (this.state.CustomerDto.contract[0].tblInvoiceConfig.length > 0) {
            if (this.state.CustomerDto.contract[0].tblInvoiceConfig[0].invoiceEndDate != "" || this.state.CustomerDto.contract[0].tblInvoiceConfig[0].invoiceStartDate != "") {
                this.state.CustomerDto.contract[0].tblInvoiceConfig[0].invoiceEndDate = this.datechange(this.state.CustomerDto.contract[0].tblInvoiceConfig[0].invoiceEndDate);
                this.state.CustomerDto.contract[0].tblInvoiceConfig[0].invoiceStartDate = this.datechange(this.state.CustomerDto.contract[0].tblInvoiceConfig[0].invoiceStartDate);
            }
        }
        if (this.state.CustomerDto.contract.length > 0) {
        if (this.state.CustomerDto.contract[0].createdDate != "" || this.state.CustomerDto.contract[0].contractEffectiveDate != "" || this.state.CustomerDto.contract[0].contractEndDate != "") {
            this.state.CustomerDto.contract[0].createdDate = this.datechange(this.state.CustomerDto.contract[0].createdDate);
            this.state.CustomerDto.contract[0].contractEffectiveDate = this.datechange(this.state.CustomerDto.contract[0].contractEffectiveDate);
            this.state.CustomerDto.contract[0].contractEndDate = this.datechange(this.state.CustomerDto.contract[0].contractEndDate);
            this.state.CustomerDto.contract[0].podate = this.datechange(this.state.CustomerDto.contract[0].podate);
        }
        }
        if (this.state.spocDetails.dob != "" || this.state.doj != "") {
            this.state.spocDetails[0].dob = this.datechange(this.state.spocDetails[0].dob);
            this.state.spocDetails[0].doj = this.datechange(this.state.spocDetails[0].doj);
        }
             fetch(`${BillingConfig.BillingConfigUrl}/api/Billing/ModifyCustomer`, {
                            method: 'POST',
                            body: JSON.stringify(this.state.CustomerDto),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                            },
                        })
                            .then(response => response.json())
                            .then(data => {
                            swal({

                                    text: "Data Modified Successfully",
                                    icon: "success"
                                });
                                console.log("modify:",data);
                    });
           // }
            //else {
            //    this.setState({});
            //    console.log("erroemsg:", this.state.errormessage);
            //    swal("", "Some fields are missing", "error");
            //}
        //}
        //else {
        //    swal("", "Input fields are not valid, Please enter valid input", "error");
        //}

        this.state.CustomerDto.contract[0].tblInvoiceConfig[0].invoiceEndDate = Isdate;
        this.state.CustomerDto.contract[0].tblInvoiceConfig[0].invoiceStartDate = Iedate;
        this.state.CustomerDto.contract[0].tblBillingConfig[0].billingStartDate = Bsdate;
        this.state.CustomerDto.contract[0].tblBillingConfig[0].billingEndDate = Bedate;
        this.state.spocDetails[0].dob = Sdob;
        this.state.spocDetails[0].doj = Sdoj;
        this.state.CustomerDto.contract[0].createdDate = Cdate;
        this.state.CustomerDto.contract[0].contractEffectiveDate = Csdate;
        this.state.CustomerDto.contract[0].contractEndDate = Cedate;
        this.state.CustomerDto.contract[0].podate = Cpodate;

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
            case "telephone":
                if (validationPage.verifytelephone(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                }
                else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        }
    }
    AccordianFunction = () => {
        console.log("AddCont:", this.state.AddCont);
        return (
            <GridItem xs={12}>
                {this.state.AddCont.map((prop, key) => {
                    return (
                       
                    <Accordion
                    collapses = {
                        [{
                            title: "Contract",
                                    content: <CreateContract props={prop} errormessage={this.state.errormessage} disableView={this.state.disableView} SearchFlag={this.state.SearchFlag} index={0} />
                        }]
                        }
                        />

                    );
                })
                }
            </GridItem>
            )
           
    
        };
    
    render() {
        
        return (
            <div>
               
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={Customer} /></Icon>
                            </CardIcon>
                            {
                                <h4 >
                                <small><TranslationContainer translationKey="CustomerDetails" /></small>
                                </h4>
                            }
                        </CardHeader>
                      
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            success={this.state.customerNameState === "success"}
                                    error={this.state.customerNameState === "error"}
                                    disabled={this.state.CustNameDisable}
                                            labelText="CustomerName"
                                            name="customerName"
                                            required={true}
                                            id="customerName"
                                            value={this.state.CustomerDto.customerName}
                                            onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{ fullWidth: true }}
                                />
                                {this.state.errormessage && (this.state.CustomerDto.customerName == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                {this.state.nameMessage && <p className="error">{this.state.servermessage}</p>}
                            </GridItem>

                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            success={this.state.websiteState === "success"}
                                    error={this.state.websiteState === "error"}
                                    disabled={this.state.disableView}
                                            labelText="WebSite"
                                            name="website"
                                            required={true}
                                            value={this.state.CustomerDto.website}
                                            onChange={(e) => this.SetValue("website", e)}
                                            formControlProps={{ fullWidth: true }}
                                />
                                {this.state.errormessage && (this.state.CustomerDto.website == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            success={this.state.phoneNoState === "success"}
                                    error={this.state.phoneNoState === "error"}
                                    disabled={this.state.disableView}
                                            labelText="PhoneNo"
                                            name="phoneNo"
                                    required={true}
                                    inputType = "number"
                                            value={this.state.CustomerDto.phoneNo}
                                            onChange={(e) => this.SetValue("phoneno", e)}
                                            formControlProps={{ fullWidth: true }}
                                />
                                {this.state.errormessage && (this.state.CustomerDto.phoneNo == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            success={this.state.faxNoState === "success"}
                                    error={this.state.faxNoState === "error"}
                                    disabled={this.state.disableView}
                                            labelText="FaxNo"
                                            name="faxNo"
                                    inputType="number"
                                            value={this.state.CustomerDto.faxNo}
                                            onChange={(e) => this.SetValue("phoneno", e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    success={this.state.registrationNoState === "success"}
                                    error={this.state.registrationNoState === "error"}
                                    disabled={this.state.disableView}
                                    labelText="RegistrationNumber"
                                    id="regNo"
                                    required={true}
                                    value={this.state.CustomerDto.registrationNo}
                                    name="registrationNo"
                                    onChange={(e) => this.SetValue("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                {this.state.errormessage && (this.state.CustomerDto.registrationNo == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    success={this.state.registeringAuthorityState === "success"}
                                    error={this.state.registeringAuthorityState === "error"}
                                    disabled={this.state.disableView}
                                    labelText="RegisteringAuthority"
                                    id="regAuthority"
                                    required={true}
                                    value={this.state.CustomerDto.registeringAuthority}
                                    name="registeringAuthority"
                                    onChange={(e) => this.SetValue("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                                {this.state.errormessage && (this.state.CustomerDto.registeringAuthority == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                            </GridItem>
                                    <MyUploader
                                        handleChange={this.handleChange}
                                        getUploadParams={this.state.getUploadParams}
                                        onChangeStatus={this.state.handleChangeStatus}
                                        onSubmit={this.state.handleSubmit}
                                        fields={this.state.fields}
                                        ContractData={this.state.contractId}
                                        CustomerId={this.state.CustomerId}
                                        onInputParamChange={this.onInputParamChange}
                                    //entries={this.state.entries} 
                                    />
                                </GridContainer>

                        <GridContainer>
                            <CustomerAddress errormessage={this.state.errormessage} SetAddValue={this.SetAddValue} SetSpocValue={this.SetSpocValue} SetValue={this.SetValue}
                                onDateChange={this.onDateChange} LocationDTO={this.state.LocationDTO} addressDTO={this.state.addressDTO} GetLocation={this.GetLocation}
                                regAddress={this.state.regAddress} spocDetails={this.state.spocDetails} CustomerDto={this.state.CustomerDto} addressLine1State={this.state.addressLine1State}
                                addressLine2State={this.state.addressLine2State} addressLine3State={this.state.addressLine3State} pannoState={this.state.pannoState} firstNameState={this.state.firstNameState}
                                middleNameState={this.state.middleNameState} lastNameState={this.state.lastNameState} designationState={this.state.designationState} emailIdState={this.state.emailIdState}
                                mobilenoState={this.state.mobilenoState} landLineOfficeState={this.state.landLineOfficeState} panNoState={this.state.panNoState} registrationNoState={this.state.registrationNoState}
                                registeringAuthorityState={this.state.registeringAuthorityState} serviceTaxRegistrationNumberState={this.state.serviceTaxRegistrationNumberState} tannoState={this.state.tannoState} spocDobValid={this.state.spocDobValid}
                                spocDojValid={this.state.spocDojValid} currentDate={this.state.currentDate} dobState={this.state.dobState} dojState={this.state.dojState} disableView={this.state.disableView} masterList={this.state.masterList} master={this.state.master}
                                spocservermessage={this.state.spocservermessage} spocemailMessage={this.state.spocemailMessage} />
                        </GridContainer>

                        {/*  <ContractCollapse ContractData={this.state.ContractObj.ContractData} onInputChange={this.onInputChange} onDateChangeContract={this.onDateChangeContract} handleModifyContract={this.handleModifyContract} add={this.state.add} InvoiceData={this.state.InvoiceData} SearchFlag={this.state.SearchFlag} errormessage={this.state.errormessage} /> */}
                       

                            {this.AccordianFunction()
                            }

                        <GridContainer lg={12} justify="center">
                            {this.state.viewbtn == false ? <div>
                                {
                                    this.state.modifyFlag == false ? <GridItem xs={5} sm={3} md={3} lg={1}>
                                        <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                            <Button id="round" color="info" onClick={this.handleSaveCustomer}><TranslationContainer translationKey="Save" />   </Button>
                                        </Animated>
                                    </GridItem> :

                                        <GridItem xs={5} sm={3} md={3} lg={1}>
                                            <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                                <Button id="round" color="info" onClick={this.handleModifyCustomer}><TranslationContainer translationKey="Modify" />   </Button>
                                            </Animated>
                                        </GridItem>
                                }
                            </div> : null}
                                </GridContainer>
                        {this.renderRedirect()}

                            </CardBody>
                       
                    </Card>
               
            </div>
        );
    }
}
export default withStyles(style)(CreateCustomer);

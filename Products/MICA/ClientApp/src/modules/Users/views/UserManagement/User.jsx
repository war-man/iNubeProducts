import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import Select from "@material-ui/core/Select";
//import MenuItem from "@material-ui/core/MenuItem";
//import InputLabel from "@material-ui/core/InputLabel";
//import FormControl from "@material-ui/core/FormControl";
//import CustomInput from "components/CustomInput/CustomInput.jsx";
//import Datetime from "react-datetime";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
//import FilterNone from "@material-ui/icons/FilterNone";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import UserAddress from "./UserAddress.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import $ from 'jquery';
//import bindModel from 'components/ModelBinding/bindModel.js';
import Employee from "modules/Users/views/UserManagement/Employee.jsx";
import Partner from "modules/Users/views/UserManagement/Partner.jsx";
import CreateUser from "modules/Users/views/UserManagement/_CreateUser.jsx";
import UserConfig from 'modules/Users/UserConfig.js';
import validationPage from "./ValidationPage";
import usertype from "assets/img/user-type.png";
import Icon from "@material-ui/core/Icon";

import { Animated } from "react-animated-css";
import { card } from "../../../../assets/jss/material-dashboard-pro-react";

import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import HierarchyConfig from 'modules/Hierarchy/HierarchyConfig.js';
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

//const validateBtn = {
//    height: "35px",
//    marginTop: "-10px",
//}

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectTo: false,
            loader: false,
            hideexternal: false,
            btnload: false,
            btnload1: false,
            radioVal: "",
            addressradioVal: "",
            empFlag: false,
            visibility: false,
            partFlag: false,
            redirect: false,
            disable: false,
            selectedValue: null,
            employeeid: "",
            employeeidState: "",
            isUser: false,
            partnerid: "",
            partneridState: false,
            uid: "",
            firstName: "",
            firstNameState: false,
            middleName: "",
            middleNameState: false,
            lastName: "",
            isCustomer: {
                customerid: "",
                partnerid: "",
            },
            lastNameState: false,
            maritalStatus: "",
            maritalStatusState: "",
            addressLine1: "",
            addressLine1State: false,
            addressLine2: "",
            addressLine2State: "",
            addressLine3: "",
            addressLine3State: "",
            contactNumber: "",
            contactNumberState: false,
            landLineResidence: "",
            landLineResidenceState: false,
            landLineOfficeState: "",
            email: "",
            emailState: false,
            panNo: "",
            panNoState: false,
            branchName: "",
            branchNameState: false,
            branchCode: "",
            branchCodeState: false,
            emailvaidation: "",
            UName: "",
            partnerName: "",
            validdob: false,
            validdoj: false,
            addressradiobutton: "",
            user: {
                "id": "",
                "userName": "",
                "email": "",
                "emailConfirmed": true,
                "passwordHash": "",
                "securityStamp": "",
                "concurrencyStamp": "",
                "phoneNumber": "",
                "phoneNumberConfirmed": true,
                "twoFactorEnabled": true,
                "lockoutEnabled": true,
                "accessFailedCount": 0,
                "userDetails": [],
                "userAddress": [],
            },
            masterList: [],
            errormessage: false,
            UserData:
            {
                "userId": "",
                "userName": "",
                "status": true,
                "createdBy": "",
                "createdDate": "",
                "locked": true,
                "lockedReason": "",
                "lockStartDate": "",
                "lockEndDate": "",
                "lockMechanism": true,
                "officeId": 0,
                "firstName": "",
                "middleName": "",
                "lastName": "",
                "employeeNumber": "",
                "dob": "",
                "doj": "",
                "roleId": null,
                "genderId": "",
                "email": "",
                "passportNumber": "",
                "drivingLicenceNumber": "",
                "contactNumber": "",
                "userTypeId": "",
                "panNo": "",
                "lastLoginDateTime": "",
                "isIos": true,
                "isAndroid": true,
                "isWindows": true,
                "isPasswordChanged": true,
                "landLineOffice": "",
                "landLineResidence": "",
                "partnerId": "",
                "branchName": "",
                "branchCode": "",
                "designation": "",
                "maritalStatusId": "",
                "profileImage": "",
                "partnerName": ""
            },
            InitialUserData:
            {
                "userId": "",
                "userName": "",
                "status": true,
                "createdBy": "",
                "createdDate": "",
                "locked": true,
                "lockedReason": "",
                "lockStartDate": "",
                "lockEndDate": "",
                "lockMechanism": true,
                "officeId": 0,
                "firstName": "",
                "middleName": "",
                "lastName": "",
                "employeeNumber": "",
                "dob": "",
                "doj": "",
                "genderId": "",
                "email": "",
                "roleId": null,
                "passportNumber": "",
                "drivingLicenceNumber": "",
                "contactNumber": "",
                "userTypeId": "",
                "panNo": "",
                "lastLoginDateTime": "",
                "isIos": true,
                "isAndroid": true,
                "isWindows": true,
                "isPasswordChanged": true,
                "landLineOffice": "",
                "landLineResidence": "",
                "partnerId": "",
                "branchName": "",
                "branchCode": "",
                "designation": "",
                "maritalStatusId": "",
                "profileImage": "",
                "partnerName": "",
                "isActive": true,
            },
            UserAddress: {
                "perm": {
                    "id": "",
                    "userAddressType": " ",
                    "userCountryId": "",
                    "userStateId": "",
                    "userDistrictId": "",
                    "userCityId": "",
                    "userAddressLine1": "",
                    "userAddressLine2": "",
                    "userAddressLine3": "",
                    "userPincodeId": ""
                },
                "comm": {
                    "id": "",
                    "userAddressType": " ",
                    "userCountryId": "",
                    "userStateId": "",
                    "userDistrictId": "",
                    "userCityId": "",
                    "userAddressLine1": "",
                    "userAddressLine2": "",
                    "userAddressLine3": "",
                    "userPincodeId": ""
                },
                "resetoff": {
                    "id": "",
                    "userAddressType": " ",
                    "userCountryId": "",
                    "userStateId": "",
                    "userDistrictId": "",
                    "userCityId": "",
                    "userAddressLine1": "",
                    "userAddressLine2": "",
                    "userAddressLine3": "",
                    "userPincodeId": ""
                },
                "permSelectedValue": 1,
            },
            perm: {
                "id": "",
                "userAddressType": " ",
                "userCountryId": "",
                "userStateId": "",
                "userDistrictId": "",
                "userCityId": "",
                "userAddressLine1": "",
                "userAddressLine2": "",
                "userAddressLine3": "",
                "userPincodeId": ""
            },
            comm: {
                "id": "",
                "userAddressType": " ",
                "userCountryId": "",
                "userStateId": "",
                "userDistrictId": "",
                "userCityId": "",
                "userAddressLine1": "",
                "userAddressLine2": "",
                "userAddressLine3": "",
                "userPincodeId": ""
            },
            LocationDTO: {
                Country: [],
                State: [],
                District: [],
                City: [],
                Pincode: [],
                RCountry: [],
                RState: [],
                RDistrict: [],
                RCity: [],
                RPincode: []
            },
            errors: {},
            fields: {},
            response: false,
            radiodisable: false,
        };
    }

    SetValue = (type, event) => {
        let UserData = this.state.UserData;
        let name = event.target.name;
        let value = event.target.value;

        UserData[name] = value;

        this.setState({ UserData })
        this.setState({ fields: UserData })
        this.change(event, name, type);
        console.log("pks");
        if (name == 'email') {
            this.emailcheck(event.target.name, event.target.value);
        }
    }

    emailcheck = (name, value) => {

        if (name == 'email') {
            console.log("pks");
            fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/UserEmailValidation?searchRequest=` + value, {
                //  fetch(`https://localhost:44367/api/UserProfile/UserEmailValidation?searchRequest=` + value,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Responce data", data);
                    if (data.status == 9) {
                        this.setState({ emailvaidation: data.responseMessage });
                        this.setState({ emailState: "error" });
                    } else {
                        this.setState({ emailvaidation: "" });

                    }
                });
        }

    }

    change = (event, stateName, type) => {
        switch (type) {
            case "string":
                if (validationPage.verifyName(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                }
                else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "email":
                if (validationPage.verifyEmail(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                }
                else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "number":
                if (validationPage.verifyNumber(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                }
                else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "phnumber":
                if (validationPage.verifyPhNumber(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                }
                else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "pan":
                if (validationPage.verifyPanIndNum(event.target.value, 6)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                }
                else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "LandLineNumber":
                if (validationPage.verifyLandLineNumber(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                }
                else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            default:
                break;
        }
    }

    GetLocation = (type, addType, event) => {
        this.SetValue(type, event);
        let reg = this.state.UserAddress[addType];
        let name = event.target.name;
        let value = event.target.value;
        reg[name] = value;

        this.setState({ reg })
        if (type != "") {
            this.GetLocationService(type, addType, event.target.value);
        }
    };

    GetLocationService = (type, addType, pID) => {
        fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/GetLocation?locationType=` + type + `&parentID=` + pID, {
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
                if (addType == 'perm') {
                    locDTO[type] = lData;
                } else if (addType == 'c') {
                    locDTO[type] = lData;
                    locDTO['R' + type] = lData;
                } else {
                    locDTO['R' + type] = lData;
                }
                this.setState({ locDTO });
                console.log("Locationdto: ", this.state.LocationDTO);
            });
    };

    componentDidMount() {
        setTimeout(
            function () {
                this.setState({ loader: true });
            }.bind(this), 2000
        );
        //console.log("response data", localStorage.getItem('organizationId'))
        //console.log("response data", localStorage.getItem('partnerId'));

        //let cust = this.state.isCustomer;
        //cust.customerid = localStorage.getItem('organizationId');
        //cust.partnerid = localStorage.getItem('partnerId');
        //this.setState({ cust });
        //console.log("response data", cust);
        //if (cust.customerid == 121 && cust.partnerid == 0 || cust.partnerid != 0) {
        //    this.setState({ hideexternal: true });
        //}
        //let producttype = localStorage.getItem('ProductType');
        //if (producttype == "Avo") {
        //    this.setState({ hideexternal: false });
        //}

        fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/GetMasterData?sMasterlist=abc`, {
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

        this.GetLocationService('Country', 'c', 0);
    }

    GetMasterData = (type, addType, event) => {
        this.SetValue(type, event);
    }

    GetMasterService = (type, mID) => {
        fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/GetMasterData?sMasterlist=abc`, {
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
                let locDTO = this.state.MasterDTO;
                locDTO[type] = lData;
                this.setState({ locDTO });
            });
    };

    DateChange = (name, event) => {
        console.log(event);
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        let userdDTO = this.state.UserData;
        userdDTO[name] = date;
        this.setState({ userdDTO });
    };

    newdatechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    handleDateValidation = () => {
        //function fn_DateCompare(DateA, DateB) {     // this function is good for dates > 01/01/1970

        const userdob = this.state.UserData.dob;
        const userdoj = this.state.UserData.doj;
        const dob = new Date(userdob);
        const doj = new Date(userdoj);
        const today = new Date();
        let date = this.state.UserData
        this.setState({ date });

        const msDatedob = Date.UTC(dob.getFullYear(), dob.getMonth() + 1, dob.getDate());
        const msDatedoj = Date.UTC(doj.getFullYear(), doj.getMonth() + 1, doj.getDate());
        const msDatetoday = Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate());

        if (parseFloat(msDatedob) == parseFloat(msDatedoj)) {
            swal("", "Date of Joining should not be equal to Date of Birth", "error");
        }
        if (parseFloat(msDatedoj) > parseFloat(msDatetoday)) {
            swal("", "Date of Joining should not be future date", "error");
        }
        if (parseFloat(msDatedob) > parseFloat(msDatetoday)) {
            swal("", "Date of Birth should not be future date", "error");
        }
        if (parseFloat(msDatedob) > parseFloat(msDatedoj)) {
            swal("", "Date of Birth should not be greater than Date of Joining", "error");

        } else {
            this.setState({ validdoj: true });
            let date = this.state.UserData
            date.doj = new Date(this.state.UserData.doj).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
            this.setState({ date });
        }
    }

    handleDobvalidation = () => {
        var today = new Date();
        var birthDate = new Date(this.state.UserData.dob);
        var calculatedage = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        console.log("age value", calculatedage);
        if (calculatedage < 18) {
            swal("", "Age of the user should not be less than 18 years", "error");
            let date = this.state.UserData;
            date.dob = new Date(this.state.UserData.dob).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
            this.setState({ date });
        }
        else {
            let dob = this.state.UserData
            dob.dob = new Date(this.state.UserData.dob).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
            this.setState({ dob });
            this.setState({ validdob: true });
        }
    }

    handleAvoSubmit = () => {
        if (this.state.UserData.firstName != "" && this.state.UserData.dob != "" &&
            this.state.UserData.doj != "" && this.state.UserData.genderId != "" &&
            this.state.UserData.email != "" && this.state.UserData.contactNumber != ""
            //&&this.state.UserData.panNo != "" && this.state.UserData.panNo != ""
            //&& this.state.validdob != false && this.state.validdoj != false
            && this.state.firstNameState == false && this.state.contactNumberState == false
            && this.state.branchNameState == false && this.state.branchCodeState == false
            && this.state.emailState == false /*&& this.state.panNoState == false*/) {

            let userdetails = this.state.UserData;

            let pks = this.state.UserData.dob;
            let dks = this.state.UserData.doj;

            if (this.state.radioVal == '1003') {
                userdetails.userTypeId = '1003'
                userdetails.partnerId = this.state.partnerid;
                userdetails.employeeNumber = 0;
            } else {
                userdetails.userTypeId = '1004';
                userdetails.partnerId = 0;
                userdetails.employeeNumber = this.state.employeeid;
            }

            userdetails.dob = this.newdatechange(this.state.UserData.dob);
            userdetails.doj = this.newdatechange(this.state.UserData.doj);

            this.setState({ userdetails, response: true });
            let address = [];
            address.push(this.state.UserAddress.perm);
            if (this.state.UserAddress.permSelectedValue == 1) {
                address.push(this.state.UserAddress.comm);
            }

            let UserDataDTO = this.state.user;
            UserDataDTO['userAddress'] = address;
            this.setState({ UserDataDTO });

            let userDTO = this.state.user;
            if (this.state.user.userDetails.length == 0) {
                userDTO['userDetails'].push(userdetails);
            }
            console.log("user", this.state.user);
            fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/CreateProfileUser`, {
                //fetch('https://localhost:44367/api/UserProfile/CreateProfileUser', {
                method: 'Post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(userDTO)
            }).then(response => response.json())
                .then((data) => {
                    this.setState({ response: false });
                    if (data.status == 2) {
                        swal({
                            text: data.responseMessage,
                            icon: "success"
                        });
                        this.setState({
                            UName: data.users.userName,
                            uid: data.id,
                        })
                        if (data.users.userDetails != null || data.users.userDetails != 0) {
                            this.setState({ redirectTo: true })

                        } else {
                            this.setState({ redirect: true })
                        }

                    }
                    else if (data.status == 8) {
                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    }
                    else if (data.status == 400) {
                        swal({
                            text: "Some fields are missing",
                            icon: "error"
                        });
                        //this.setState({ UserData: this.state.InitialUserData });
                    }
                    else {
                        swal({
                            text: "User already exists",
                            icon: "error"
                        });
                    }
                    console.log("response", data);
                });
            console.log("id", this.state.uid);
            console.log("uname", this.state.UName);
            let state = this.state;
            state.UserData.dob = pks;
            state.UserData.doj = dks;
            this.setState({ state });
        }
        else {
            swal({
                text: "Some fields are missing or Please check the data you entered",
                icon: "error"
            });

            this.setState({ errormessage: true });
        }
    }

    handleUserCreation = () => {
        let producttype = localStorage.getItem('ProductType');
        if (producttype == "Mica") {
            this.handleMicaSubmit();
        }
        if (producttype == "Avo") {
            this.handleAvoSubmit()
        }
    }

    handleMicaSubmit = () => {
        if (this.state.UserData.firstName != "" && this.state.UserData.dob != "" &&
            this.state.UserData.doj != "" && this.state.UserData.genderId != "" &&
            this.state.UserData.email != "" && this.state.UserData.contactNumber != ""
            //&&this.state.UserData.panNo != "" && this.state.UserData.panNo != ""
            //&& this.state.validdob != false && this.state.validdoj != false
            && this.state.firstNameState == false && this.state.contactNumberState == false
            && this.state.branchNameState == false && this.state.branchCodeState == false
            && this.state.emailState == false /*&& this.state.panNoState == false*/) {

            let userdetails = this.state.UserData;

            let pks = this.state.UserData.dob;
            let dks = this.state.UserData.doj;

            if (this.state.radioVal == '1003') {
                userdetails.userTypeId = '1003'
                userdetails.partnerId = this.state.partnerid;
                userdetails.employeeNumber = 0;
            } else {
                userdetails.userTypeId = '1004';
                userdetails.partnerId = 0;
                userdetails.employeeNumber = 0;
            }

            userdetails.dob = this.newdatechange(this.state.UserData.dob);
            userdetails.doj = this.newdatechange(this.state.UserData.doj);

            this.setState({ userdetails, response: true });
            let address = [];
            address.push(this.state.UserAddress.perm);
            if (this.state.UserAddress.permSelectedValue == 1) {
                address.push(this.state.UserAddress.comm);
            }

            let UserDataDTO = this.state.user;
            UserDataDTO['userAddress'] = address;
            this.setState({ UserDataDTO });

            let userDTO = this.state.user;
            if (this.state.user.userDetails.length == 0) {
                userDTO['userDetails'].push(userdetails);
            }
            console.log("user", this.state.user);
            fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/CreateProfileUser`, {
                //fetch('https://localhost:44351/api/UserProfile/CreateProfileUser', {
                method: 'Post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(userDTO)
            }).then(response => response.json())
                .then((data) => {
                    this.setState({ response: false });
                    if (data.status == 2) {
                        swal({
                            text: data.responseMessage,
                            icon: "success"
                        });
                        this.setState({
                            UName: data.users.userName,
                            uid: data.id,
                        })
                        //if (data.users.userDetails != null || data.users.userDetails != 0) {
                        //    this.setState({ redirectTo: true })

                        //} else {
                        this.setState({ redirect: true })
                        //}

                    }
                    else if (data.status == 8) {
                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    }
                    else if (data.status == 400) {
                        swal({
                            text: "Some fields are missing",
                            icon: "error"
                        });
                        //this.setState({ UserData: this.state.InitialUserData });
                    }
                    else {
                        swal({
                            text: "User already exists",
                            icon: "error"
                        });
                    }
                    console.log("response", data);
                });
            console.log("id", this.state.uid);
            console.log("uname", this.state.UName);
            let state = this.state;
            state.UserData.dob = pks;
            state.UserData.doj = dks;
            this.setState({ state });
        }
        else {
            swal({
                text: "Some fields are missing or Please check the data you entered",
                icon: "error"
            });

            this.setState({ errormessage: true });
        }
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleRadioChange = (e) => {
        let producttype = localStorage.getItem('ProductType');
        this.state.radioVal = e.target.value;
        this.setState({ selectedValue: e.target.value })
        let UserData = this.state.UserData;
        let name = 'userTypeId';
        let value = e.target.value;

        UserData[name] = value;
        this.setState({ UserData })
        if (this.state.radioVal == "1004") {
            if (producttype == "Mica") {
                this.setState({
                    empFlag: false,
                    partFlag: false,
                    isUser: true,
                    visibility: false,
                    employeeid: "",
                    partnerid: "",
                    fields: "",
                    errors: "",
                })
                console.log("usertype", this.state.UserData.userTypeId)
            }
            if (producttype == "Avo") {
                this.setState({
                    empFlag: true,
                    partFlag: false,
                    hideexternal: false,
                    isUser: false,
                    visibility: false,
                    employeeid: "",
                    partnerid: "",
                    fields: "",
                    errors: "",
                })
                console.log("usertype", this.state.UserData.userTypeId)
            }
        }
        else if (this.state.radioVal == "1003") {
            this.setState({
                partFlag: true,
                empFlag: false,
                visibility: true,
                isUser: false,
                employeeid: "",
                partnerid: "",
                emailvaidation: "",
                UserData: this.state.InitialUserData,
                fields: "",
                errors: "",
            })
            console.log("usertype", this.state.UserData.userTypeId)
        }
        else { }
    }

    getAddressRadioButtonVal = event => {
        this.setState({
            addressradioVal: event.target.value
        })
    }

    handleAddressRadioChange = (event) => {
        let UserAddress = this.state.UserAddress;
        let value = event.target.value;
        let name = 'permSelectedValue';
        UserAddress[name] = value;
        if (value == 0) {
            this.state.LocationDTO.RCountry = this.state.LocationDTO.Country;
            this.state.LocationDTO.RState = this.state.LocationDTO.State;
            this.state.LocationDTO.RDistrict = this.state.LocationDTO.District;
            this.state.LocationDTO.RCity = this.state.LocationDTO.City;
            this.state.LocationDTO.RPincode = this.state.LocationDTO.Pincode;
            UserAddress.comm = { ...UserAddress.perm };
            this.state.disable = true;
            //disable rbtn
        }
        else if (value == 1) {
            this.state.LocationDTO.RState = [];
            this.state.LocationDTO.RDistrict = [];
            this.state.LocationDTO.RCity = [];
            this.state.LocationDTO.RPincode = [];
            UserAddress.comm = { ...UserAddress.resetoff };
            this.state.disable = false;
        }
        this.setState({ UserAddress });
    }

    handleemployeedata = () => {
        //this.state.UserData = this.state.InitialUserData;
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/searchpeoplebycode?empcode=` + this.state.employeeid, {
            //fetch('https://localhost:44367/api/UserProfile/Employee?Empid='+this.state.employeeid,{
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => {
            if (response.status != 200) {
                swal({
                    text: "Employee does not exist",
                    icon: "error"
                });

                return;
            }
            return response.json()
        }).then((data) => {
            console.log("ddd", data);
            if (data != undefined) {
                this.setState({
                    isUser: true,
                    //UserData: data
                });
                let state = this.state;
                state.UserData.dob = new Date(data.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', });
                state.UserData.doj = new Date(data.dateOfJoining).toLocaleDateString('en-IN', { day: 'numeric', month: 'numeric', year: 'numeric', });

                state.UserData.firstName = data.firstName;
                state.UserData.email = data.email;
                state.UserData.contactNumber = data.phoneNumber;
                state.UserData.middleName = data.middleName;
                state.UserData.lastName = data.lastName;
                state.UserData.maritalStatusId = data.maritalStatusId;
                state.UserData.genderId = data.genderId;
                state.UserData.branchName = data.officeName;
                state.UserData.branchCode = data.branchCode;
                this.setState({ state });
                let perm = this.state.perm;
                let comm = this.state.comm;
                let addDTO = this.state.UserAddress;
                if (data.avoOrgEmpAddress.length == 1) {
                    if (data.avoOrgEmpAddress[0].empCountryId != null) {
                        this.GetLocationService('State', 'c', data.avoOrgEmpAddress[0].empCountryId);
                        this.GetLocationService('District', 'c', data.avoOrgEmpAddress[0].empStateId);
                        this.GetLocationService('City', 'c', data.avoOrgEmpAddress[0].empDistrictId);
                        this.GetLocationService('Pincode', 'c', data.avoOrgEmpAddress[0].empCityId);
                    }
                    perm.userCountryId = data.avoOrgEmpAddress[0].empCountryId;
                    perm.userStateId = data.avoOrgEmpAddress[0].empStateId;
                    perm.userDistrictId = data.avoOrgEmpAddress[0].empDistrictId;
                    perm.userCityId = data.avoOrgEmpAddress[0].empCityId;
                    perm.userAddressLine1 = data.avoOrgEmpAddress[0].empAddressLine1;
                    perm.userAddressLine2 = data.avoOrgEmpAddress[0].empAddressLine2;
                    perm.userAddressLine3 = data.avoOrgEmpAddress[0].empAddressLine3;
                    perm.userPincodeId = data.avoOrgEmpAddress[0].empPincodeId;
                    addDTO['perm'] = perm;
                    addDTO['comm'] = perm;
                    addDTO['permSelectedValue'] = 0;
                }
                else {
                    perm.userCountryId = data.avoOrgEmpAddress[0].empCountryId;
                    perm.userStateId = data.avoOrgEmpAddress[0].empStateId;
                    perm.userDistrictId = data.avoOrgEmpAddress[0].empDistrictId;
                    perm.userCityId = data.avoOrgEmpAddress[0].empCityId;
                    perm.userAddressLine1 = data.avoOrgEmpAddress[0].empAddressLine1;
                    perm.userAddressLine2 = data.avoOrgEmpAddress[0].empAddressLine2;
                    perm.userAddressLine3 = data.avoOrgEmpAddress[0].empAddressLine3;
                    perm.userPincodeId = data.avoOrgEmpAddress[0].empPincodeId;
                    addDTO['perm'] = perm;
                    if (data.avoOrgEmpAddress[0].empCountryId != null) {
                        this.GetLocationService('State', 'perm', data.avoOrgEmpAddress[0].empCountryId);
                        this.GetLocationService('District', 'perm', data.avoOrgEmpAddress[0].empStateId);
                        this.GetLocationService('City', 'perm', data.avoOrgEmpAddress[0].empDistrictId);
                        this.GetLocationService('Pincode', 'perm', data.avoOrgEmpAddress[0].empCityId);
                    }
                    comm.userCountryId = data.avoOrgEmpAddress[1].empCountryId;
                    comm.userStateId = data.avoOrgEmpAddress[1].empStateId;
                    comm.userDistrictId = data.avoOrgEmpAddress[1].empDistrictId;
                    comm.userCityId = data.avoOrgEmpAddress[1].empCityId;
                    comm.userAddressLine1 = data.avoOrgEmpAddress[1].empAddressLine1;
                    comm.userAddressLine2 = data.avoOrgEmpAddress[1].empAddressLine2;
                    comm.userAddressLine3 = data.avoOrgEmpAddress[1].empAddressLine3;
                    comm.userPincodeId = data.avoOrgEmpAddress[1].empPincodeId;
                    addDTO['comm'] = comm;
                    if (data.avoOrgEmpAddress[1].empCountryId != null) {
                        this.GetLocationService('State', 'comm', data.avoOrgEmpAddress[1].empCountryId);
                        this.GetLocationService('District', 'comm', data.avoOrgEmpAddress[1].empStateId);
                        this.GetLocationService('City', 'comm', data.avoOrgEmpAddress[1].empDistrictId);
                        this.GetLocationService('Pincode', 'comm', data.avoOrgEmpAddress[1].empCityId);
                    }
                    addDTO['permSelectedValue'] = 1;
                }
                this.setState({ perm, comm, addDTO });
                console.log("Userdata", this.state.UserData);
            } else {
                this.setState({
                    isUser: false,
                });
                swal({
                    text: "Employee does not exist",
                    icon: "error"
                });
            }
        });
    }

    handlepartnerdata = () => {
        let state = this.state;
        state.emailvaidation = "";
        state.emailState = "";
        this.setState({ state });
        this.setState({ btnload1: true });
        fetch(`${UserConfig.PartnerConfigUrl}/api/Partner/GetPartnerDetails?partnerId=` + this.state.partnerid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => {
                if (response.status != 200) {
                    swal({
                        text: "Partner does not exist",
                        icon: "error"
                    });
                    return;
                }
                return response.json()
            }).then((data) => {
                this.setState({ btnload1: false });
                console.log("data", data)
                if (data != undefined) {
                    this.setState({
                        isUser: true,
                        partnerName: data.partnerName
                    });
                } else {
                    this.setState({
                        isUser: false,
                        UserData: this.state.InitialUserData,
                    });
                    swal({
                        text: "Partner does not exist",
                        icon: "error"
                    });
                }
            });
    }

    onDateChange = (name, event) => {
        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let userdDTO = this.state.UserData;

        userdDTO[name] = date;
        this.setState({ userdDTO });

        if (name == "dob") {
            this.handleDobvalidation();
        } else {
            this.handleDateValidation();
        }
    };

    employeeChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            employeeid: event.target.value
        });
        let UserData = this.state.UserData;
        let name = "employeeNumber"
        let value = event.target.value;

        UserData[name] = value;

        this.setState({ UserData });
        //this.change(event, name, type);
    }

    partnerChange = (type, event) => {
        let that = this;
        that.setState({
            [event.target.name]: event.target.value,
            partnerid: event.target.value,
        });
        let UserData = this.state.UserData;
        let name = 'partnerId';
        let value = event.target.value;

        UserData[name] = value;

        that.setState({ UserData });
        that.change(event, name, type);
    };

    getRadioButtonVal = event => {
        this.setState({
            radioVal: event.target.value
        })
    }

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/Users/AssignRole',
                state: {
                    uid: this.state.uid,
                    UName: this.state.UName
                }
            }} />
        }
        if (this.state.redirectTo == true) {
            return <Redirect to={{
                pathname: '/dashboard/home',
            }} />
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.loader ?
                    <Card>

                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={usertype} /></Icon>
                            </CardIcon>
                            {
                                <h4 >
                                    <small> <TranslationContainer translationKey="SelectUserType" /></small>
                                </h4>
                            }
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={6} style={radioAlign}>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.selectedValue == "1004"}
                                                onChange={this.handleRadioChange}
                                                value="1004"
                                                name="radio button demo"
                                                aria-label="B"
                                                icon={
                                                    <FiberManualRecord
                                                        className={classes.radioUnchecked}
                                                    />
                                                }
                                                checkedIcon={
                                                    <FiberManualRecord
                                                        className={classes.radioChecked}
                                                    />
                                                }
                                                classes={{
                                                    checked: classes.radio,
                                                    root: classes.radioRoot
                                                }}
                                            />
                                        }
                                        classes={{
                                            label: classes.label
                                        }}
                                        label={<TranslationContainer translationKey="InternalUser" />}
                                    //label="Internal User"
                                    />
                                    {this.state.hideexternal ? null :
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    checked={this.state.selectedValue == "1003"}
                                                    onChange={this.handleRadioChange}
                                                    value="1003"
                                                    name="radio button demo"
                                                    aria-label="B"
                                                    icon={
                                                        <FiberManualRecord
                                                            className={classes.radioUnchecked}
                                                        />
                                                    }
                                                    checkedIcon={
                                                        <FiberManualRecord
                                                            className={classes.radioChecked}
                                                        />
                                                    }
                                                    classes={{
                                                        checked: classes.radio,
                                                        root: classes.radioRoot
                                                    }}
                                                />
                                            }
                                            classes={{
                                                label: classes.label
                                            }}
                                            label={<TranslationContainer translationKey="ExternalUser" />}
                                        //label="External User"
                                        />
                                    }
                                </GridItem>
                            </GridContainer>
                            {this.state.empFlag ? <Employee employeeChange={this.employeeChange} employeeidState={this.state.employeeidState} handleemployeedata={this.handleemployeedata} employeeid={this.state.employeeid} UserData={this.state.UserData} /> : null}
                            {this.state.partFlag ? <Partner /*btnload1={this.state.btnload1} */ partnerChange={this.partnerChange} partneridState={this.state.partneridState} handlepartnerdata={this.handlepartnerdata} partnerid={this.state.partnerid} /> : null}
                            {this.state.isUser ? <CreateUser UserData={this.state.UserData} disable={this.state.disable} classes={this.classes} handleAddressRadioChange={this.handleAddressRadioChange} addressradiobutton={this.state.addressradiobutton} partnerName={this.state.partnerName} UserAddress={this.state.UserAddress} errormessage={this.state.errormessage} middleNameState={this.state.middleNameState} lastNameState={this.state.lastNameState} maritalStatusState={this.state.maritalStatusState} addressLine1State={this.state.addressLine1State} addressLine2State={this.state.addressLine2State} addressLine3State={this.state.addressLine3State} contactNumberState={this.state.contactNumberState} landLineResidenceState={this.state.landLineResidenceState} landLineOfficeState={this.state.landLineOfficeState} emailState={this.state.emailState} panNoState={this.state.panNoState} branchNameState={this.state.branchNameState} branchCodeState={this.state.branchCodeState} firstNameState={this.state.firstNameState} GetMasterData={this.GetMasterData} masterList={this.state.masterList} visibility={this.state.visibility} SetValue={this.SetValue} LocationDTO={this.state.LocationDTO} GetLocation={this.GetLocation} assignrolesubmit={this.assignrolesubmit} onDateChange={this.onDateChange} emailvaidation={this.state.emailvaidation} /> : null}

                        </CardBody>
                    </Card>
                    : <PageContentLoader />
                }
                {this.state.isUser ?
                    <Card>
                        <CardBody>
                            <GridContainer justify="center">
                                <UserAddress UserAddress={this.state.UserAddress} radiodisable={this.state.radiodisable} disable={this.state.disable} handleAddressRadioChange={this.handleAddressRadioChange} SetValue={this.SetValue} GetLocation={this.GetLocation} LocationDTO={this.state.LocationDTO} addressradiobutton={this.state.addressradiobutton} />
                            </GridContainer>
                        </CardBody>
                    </Card>
                    : null}

                {this.state.isUser ?
                    <GridContainer justify="center">
                        <GridItem >
                            {this.renderRedirect()}
                            <Button round disabled={this.state.response} onClick={this.handleUserCreation} color="success">Create User</Button>
                            {/*{this.state.btnload ? <CircularProgress id="progress-bar" size={25} /> <TranslationContainer translationKey="Save" />: null}*/}
                        </GridItem>
                    </GridContainer>
                    : null}

            </div>
        );
    }
}

export default withStyles(style)(User);
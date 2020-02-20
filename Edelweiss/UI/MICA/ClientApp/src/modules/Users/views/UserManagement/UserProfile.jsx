import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Datetime from "react-datetime";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Button from "components/CustomButtons/Button.jsx";
import User from "modules/Users/views/UserManagement/User.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import $ from 'jquery';
//import bindModel from 'components/ModelBinding/bindModel.js';
import Warning from "../../../../components/Typography/Warning";
import Alerts from "components/CustomAlerts/Alerts.jsx";
import { func } from "prop-types";
import Success from "../../../../components/Typography/Success";
import { fail } from "assert";
//import { Card } from "material-ui";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import './style.css';
import UserConfig from 'modules/Users/UserConfig.js';
import swal from 'sweetalert';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import FilterNone from "@material-ui/icons/FilterNone";
import { Redirect } from 'react-router-dom';
import Icon from "@material-ui/core/Icon";
import usertype from "assets/img/user-type.png";
import validationPage from "./ValidationPage";

//import config from '../../config';

const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
}

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

const empIdStyle = {
    marginTop: "-40px",
    marginLeft: "-70px"
}

const uType = {
    marginTop: "3px"
}

const uTypeLabel = {
    marginLeft: "-3px",
    color: "black"
}

const dateStyle = {
    width: "max-content",
    marginLeft: "190px",
    marginTop: "-25px",
    backgroundColor: "transparent",
    border: "none",
    zoom: "1.15"
}

const radioLabel = {
    marginTop: "-15px"
}

const validateBtn = {
    height: "35px",
    marginTop: "-10px"
}

const ddl = {
    marginLeft: "105px"
}


class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioVal: "",
            empFlag: false,
            visibility: false,
            partFlag: false,
            redirect: false,
            selectedValue: null,
            employeeid: "",
            employeeidState: "",
            isUser: false,
            partnerid: "",
            partneridState: "",
            uid: "",
            isButtonVisibility: false,
            disabled: this.props.disabled,
            UserId: this.props.searchUserId,
            editModal: this.props.editModal,
            firstName: "",
            firstNameState: "",
            middleName: "",
            middleNameState: "",
            lastName: "",
            lastNameState: "",
            maritalStatus: "",
            maritalStatusState: "",
            addressLine1: "",
            addressLine1State: "",
            addressLine2: "",
            addressLine2State: "",
            addressLine3: "",
            addressLine3State: "",
            contactNumber: "",
            contactNumberState: "",
            landLineResidence: "",
            landLineResidenceState: "",
            email: "",
            emailState: "",
            panNo: "",
            panNoState: "",
            branchName: "",
            branchNameState: "",
            branchCode: "",
            branchCodeState: "",
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
                "tblUserDetails": []
            },
            AspNetUser: {
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
                "tblUserDetails": []
            },
            AspNetUser: {
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
                "tblUserDetails": []
            },
            masterList: [],
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
                    "countryId": "",
                    "stateId": "",
                    "districtId": "",
                    "cityId": "",
                    "addressLine1": "",
                    "addressLine2": "",
                    "addressLine3": "",
                    "pincodeId": "",
                    "employeeNumber": "",
                    "dob": "",
                    "doj": "",
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
                    "partnerId": 0,
                    "branchName": "",
                    "branchCode": "",
                    "designation": "",
                    "maritalStatusId": ""
                },
            InitialUserData:
                {
                    "nodeId": 0,
                    "userId": "",
                    "userName": "",
                    "userParentId": 0,
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
                    "countryId": "",
                    "stateId": "",
                    "districtId": "",
                    "cityId": "",
                    "addressLine1": "",
                    "addressLine2": "",
                    "addressLine3": "",
                    "pincodeId": 0,
                    "employeeNumber": "",
                    "dob": "",
                    "doj": "",
                    "genderId": "",
                    "email": "",
                    "passportNumber": "",
                    "drivingLicenceNumber": "",
                    "contactNumber": "",
                    "userTypeId": 0,
                    "panNo": "",
                    "lastLoginDateTime": "",
                    "isIos": true,
                    "isAndroid": true,
                    "isWindows": true,
                    "isPasswordChanged": true,
                    "landLineOffice": "",
                    "landLineResidence": "",
                    "partnerId": 0,
                    "branchName": "",
                    "branchCode": "",
                    "designation": "",
                    "maritalStatusId": ""
                },
            LocationDTO: {
                "Country": [],
                State: [],
                District: [],
                City: [],
                Pincode: []
            },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.modifyValue = this.modifyValue.bind(this);
        //this.assignrolesubmit = this.assignrolesubmit.bind(this);
    }

    modifyValue = (value) => {
        // let PartnerDTO = this.state.PartnerDTO;
        let UserDto = value;
        this.setState({ user: UserDto });
        console.log("User modified:", this.state.user);
    }

    SetValue = (type, event) => {
        //event.preventDefault();
        let UserData = this.state.UserData;
        let name = event.target.name;
        let value = event.target.value;

        UserData[name] = value;

        this.setState({ UserData })
        this.setState({ fields: UserData })
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
            case "number":
                if (validationPage.verifyNumber(event.target.value)) {
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
            default:
                break;
        }
    }

    GetLocation = (type, event) => {
        this.SetValue(type, event);
        let userData = this.state.UserData;
        let name = event.target.name;
        let value = event.target.value;
        // let OrganizationDTO = OrgDTO[addType];
        console.log('teset ' + event.target.value);
        console.log(type, name, value);
        userData[name] = value;
        this.setState({ userData })
        if (type != "") {
            this.GetLocationService(type, event.target.value);
        }
    };

    GetLocationService = (type, pID) => {
        fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/GetLocation?locationType=` + type + `&parentID=` + pID)
            .then(response => response.json())
            .then(data => {
                const lData = data;
                let locDTO = this.state.LocationDTO;
                locDTO[type] = lData;
                this.setState({ locDTO });
                console.log('location ', type, data);
            });
    };

    componentDidMount() {
        console.log('User Mount Event');
        fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/GetMasterData?sMasterlist=abc`)
            .then(response => response.json())
            .then(data => {
                this.setState({ masterList: data });
            });

        this.GetLocationService('Country', 0);

        const props = this.props;
        if (props.searchUserId != "") {
            //this.state.UserData = props.searcheduser;
            var self = this;
            let user = this.state.user;
           let userdata = this.state.UserData;
            this.setState({ UserId: props.searchUserId, editModal: props.editModal, isButtonVisibility: props.btnvisibility ,UserData:props.searcheduser });
            console.log('Props update server call', props, props.searchUserId, this.state.UserId);
            fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/SearchUserById?Id=` + props.searchUserId)
            //fetch(`https://localhost:44367/api/UserProfile/SearchUserById?Id=` + props.searchUserId)
                .then(response => response.json())
                .then(function (data) {
                    console.log('Response data1', data);
                    if (props.editModal == true) {
                        user = data;
                        self.setState({ user: data });
                        console.log("user: ", user);
                        self.GetLocationService('State', self.state.user[0].tblUserDetails[0].countryId);
                        self.GetLocationService('District', self.state.user[0].tblUserDetails[0].stateId);
                        self.GetLocationService('City', self.state.user[0].tblUserDetails[0].districtId);
                        self.GetLocationService('Pincode', self.state.user[0].tblUserDetails[0].cityId);
                        
                        userdata = self.state.user[0].tblUserDetails[0];
                        self.setState({ userdata });
                        console.log("Userdetails: ", userdata);
                        console.log("modify UserDetails:", user);
                    }
                    else {
                    }
                    self.setState({ user });
                    console.log("after modified", user);
                    self.modifyValue(userdata);
                    console.log("userdata", userdata);
                    //self.modifyValue(user);
                });
        }
    }

    GetMasterData = (type, addType, event) => {
        console.log('GetMasterData: ', type, addType, event)
        this.SetValue(type, event);
    }

    GetMasterService = (type, mID) => {
        fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/GetMasterData?sMasterlist=abc`)
            .then(response => response.json())
            .then(data => {
                const lData = data;
                let locDTO = this.state.MasterDTO;
                locDTO[type] = lData;
                this.setState({ locDTO });
            });
    };

    handleSubmit() {
        console.log('Button Save called', this.state.user);
        console.log("userdata", this.state.UserData);
        let userDTO = this.state.AspNetUser;
        //if (this.state.user.tblUserDetails.length == 0) {
        let udata = { ...this.state.UserData };
        let tblUserDetails = this.state.AspNetUser.tblUserDetails;
        const list = [...tblUserDetails, udata];
        userDTO['tblUserDetails'] = list;
        this.setState({ userDTO });
        //udata.nodeId = ' ';
        //this.setState({ udata });

        //userDTO['tblUserDetails'] = udata;
        //} 
        console.log("final userdata", userDTO);

        fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/CreateProfileUser`, {
        //fetch('https://localhost:44367/api/UserProfile/CreateProfileUser', {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDTO)
        }).then(response => response.json())
            .then((data) => {
                if (data.status == 2) {
                    swal({
                        title: "Success",
                        text: data.responseMessage,
                        icon: "success"
                    });
                }
                else if (data.status == 8) {
                    swal({
                        title: "Error",
                        text: data.errors[0].errorMessage,
                        icon: "error"
                    });
                }
                else if (data.status == 400) {
                    swal({
                        title: "Sorry!",
                        text: "Some fields are missing!!",
                        icon: "error"
                    });
                }
                else {

                }
                console.log("data: ", data);
                this.setState({
                    uid: data.id,
                    UserData: this.state.InitialUserData
                });
                console.log("data", )
                console.log("user-id: ", this.state.uid);
            });
    }
    
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    
    onDateChange = (name, event) => {
        console.log(event);
        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        let userdDTO = this.state.UserData;
        userdDTO[name] = date;
    };

    addDetails = () => {
        document.getElementById('subHead').style.display = 'block'
        document.getElementById('custDetTable').style.display = 'block';
        var custId = $("#custId").val();
        var custName = $("#custName").val();
        var adharNo = $("#adharNo").val();
        var mobileNo = $("#mobileNo").val();
        var emailId = $("#emailId").val();

        var table = document.getElementById('custDetTable');
        var row = table.insertRow(-1);
        row.className = 'tableClassRow';
        var cell1 = row.insertCell(-1);
        var cell2 = row.insertCell(-1);
        var cell3 = row.insertCell(-1);
        var cell4 = row.insertCell(-1);
        var cell5 = row.insertCell(-1);
        var cell6 = row.insertCell(-1);
        cell1.innerHTML = custId;
        cell2.innerHTML = custName;
        cell3.innerHTML = adharNo;
        cell4.innerHTML = mobileNo;
        cell5.innerHTML = emailId;
        cell6.innerHTML = '<span class="delete"><i class="fa fa-trash del-btn" aria-hidden="true"></i><span/><span class="edit"><i class="fa fa-pencil ed-btn" aria-hidden="true"></i><span/>';

        $(".delete").on('click', function () {
            $(this).parent().parent().remove();
        });
    }

    render() {
        const { classes } = this.state;
        return (
            <div>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            {/*  <FilterNone /> */}
                            <Icon><img id="icon" src={usertype} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> Modify User </small>
                            </h4>
                        }
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    disabled={this.state.disabled}
                                    success={this.state.firstNameState === "success"}
                                    error={this.state.firstNameState === "error"}
                                    labelText="First Name*"
                                    id="fName"
                                    value={this.state.UserData.firstName}
                                    name='firstName'
                                    onChange={(e) => this.SetValue("string", e)}
                                    //modelbind={model('UserDetailsDTO.FirstName')}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    disabled={this.state.disabled}
                                    labelText="Middle Name"
                                    id="mName"
                                    value={this.state.UserData.middleName}
                                    name='middleName'
                                    onChange={(e) => this.SetValue("string", e)}
                                    //modelbind={model('UserDetailsDTO.MiddleName')}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    disabled={this.state.disabled}
                                    labelText="Last Name"
                                    id="lName"
                                    value={this.state.UserData.lastName}
                                    name="lastName"
                                    onChange={(e) => this.SetValue("string", e)}
                                    //modelbind={model('UserDetailsDTO.LastName')}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <MasterDropdown
                                    disabled={this.state.disabled}
                                    labelText="Marital Status*"
                                    id="MaritalStatus"
                                    lstObject={this.state.masterList}
                                    filterName='MaritalStatus'
                                    value={this.state.UserData.maritalStatusId}
                                    name='maritalStatusId'
                                    onChange={(e) => this.GetMasterData('MaritalStatus', 'Userdata', e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <MasterDropdown
                                    disabled={this.state.disabled}
                                    labelText="Select Gender*"
                                    id="gender"
                                    lstObject={this.state.masterList}
                                    filterName='Gender'
                                    value={this.state.UserData.genderId}
                                    name='genderId'
                                    onChange={(e) => this.GetMasterData('Gender', 'Userdata', e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomDatetime style="ddl"
                                    disabled={this.state.disabled}
                                    labelText="Date of Birth*"
                                    id='dob'
                                    name='dob'
                                    onChange={(evt) => this.onDateChange('dob', evt)}
                                    value={this.state.UserData.dob}
                                    formControlProps={{ fullWidth: true }} />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <CustomDatetime style="ddl"
                                    disabled={this.state.disabled}
                                    labelText="Date of Joining*"
                                    id='doj'
                                    name='doj'
                                    onChange={(evt) => this.onDateChange('doj', evt)}
                                    value={this.state.UserData.doj}
                                    formControlProps={{ fullWidth: true }} />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    disabled={this.state.disabled}
                                    success={this.state.addressLine1State === "success"}
                                    error={this.state.addressLine1State === "error"}
                                    labelText="Address Line1*"
                                    id="add1"
                                    value={this.state.UserData.addressLine1}
                                    name="addressLine1"
                                    onChange={(e) => this.SetValue("string", e)}
                                    //modelbind={model('UserDetailsDTO.AddressLine1')}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    disabled={this.state.disabled}
                                    labelText="Address Line2"
                                    id="add2"
                                    value={this.state.UserData.addressLine2}
                                    name="addressLine2"
                                    onChange={(e) => this.SetValue("string", e)}
                                    //modelbind={model('UserDetailsDTO.AddressLine2')}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    disabled={this.state.disabled}
                                    labelText="Address Line3"
                                    id="add2"
                                    value={this.state.UserData.addressLine3}
                                    name="addressLine3"
                                    onChange={(e) => this.SetValue("string", e)}
                                    //modelbind={model('UserDetailsDTO.AddressLine2')}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <Dropdown
                                    disabled={this.state.disabled}
                                    labelText="Country*"
                                    id="UserDTO.countryId"
                                    lstObject={this.state.LocationDTO.Country}
                                    value={this.state.UserData.countryId} name='countryId'
                                    onChange={(e) => this.GetLocation('State', e)}
                                    //modelbind={model('UserDetailsDTO.Country')}
                                    formControlProps={{ fullWidth: true }}
                                    bind
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <Dropdown
                                    disabled={this.state.disabled}
                                    labelText="State*"
                                    id="UserDTO.stateId"
                                    lstObject={this.state.LocationDTO.State}
                                    value={this.state.UserData.stateId} name='stateId'
                                    onChange={(e) => this.GetLocation('District', e)}
                                    formControlProps={{ fullWidth: true }}
                                //modelbind={model('UserDetailsDTO.State')}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <Dropdown
                                    disabled={this.state.disabled}
                                    labelText="District*"
                                    id="UserDTO.districtId"
                                    lstObject={this.state.LocationDTO.District}
                                    value={this.state.UserData.districtId} name='districtId'
                                    onChange={(e) => this.GetLocation('City', e)}
                                    formControlProps={{ fullWidth: true }}
                                //modelbind={model('UserDetailsDTO.District')}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <Dropdown
                                    disabled={this.state.disabled}
                                    labelText="City*"
                                    id="UserDTO.cityId"
                                    lstObject={this.state.LocationDTO.City}
                                    value={this.state.UserData.cityId} name='cityId'
                                    onChange={(e) => this.GetLocation('Pincode', e)}
                                    formControlProps={{ fullWidth: true }}
                                //modelbind={model('UserDetailsDTO.City')}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <Dropdown
                                    disabled={this.state.disabled}
                                    labelText="Pincode"
                                    id="UserDTO.pincodeId"
                                    lstObject={this.state.LocationDTO.Pincode}
                                    value={this.state.UserData.pincodeId} name='pincodeId'
                                    onChange={(e) => this.GetLocation('', e)}
                                    formControlProps={{ fullWidth: true }}
                                //modelbind={model('UserDetailsDTO.Pincode')}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    disabled={this.state.disabled}
                                    success={this.state.contactNumberState === "success"}
                                    error={this.state.contactNumberState === "error"}
                                    labelText="Mobile Number*"
                                    id="No"
                                    name="contactNumber"
                                    value={this.state.UserData.contactNumber}
                                    onChange={(e) => this.SetValue("phnumber", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                //modelbind={model('UserDetailsDTO.Number')}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    disabled={this.state.disabled}
                                    labelText="LandLine Office"
                                    id="No"
                                    name="landLineOffice"
                                    value={this.state.UserData.landLineOffice}
                                    onChange={(e) => this.SetValue("number", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                //modelbind={model('UserDetailsDTO.Number')}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    disabled={this.state.disabled}
                                    labelText="LandLine Residence"
                                    id="No"
                                    name="landLineResidence"
                                    value={this.state.UserData.landLineResidence}
                                    onChange={(e) => this.SetValue("number", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                //modelbind={model('UserDetailsDTO.Number')}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    disabled={this.state.disabled}
                                    success={this.state.emailState === "success"}
                                    error={this.state.emailState === "error"}
                                    labelText="Email id*"
                                    id="mailId"
                                    value={this.state.UserData.email}
                                    name='email'
                                    onChange={(e) => this.SetValue("email", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                //modelbind={model('UserDetailsDTO.Email')}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    disabled={this.state.disabled}
                                    success={this.state.panNoState === "success"}
                                    error={this.state.panNoState === "error"}
                                    labelText="PAN Number*"
                                    id="panNo"
                                    value={this.state.UserData.panNo}
                                    name="panNo"
                                    onChange={(e) => this.SetValue("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                //modelbind={model('UserDetailsDTO.PanNo')}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    disabled={this.state.disabled}
                                    success={this.state.branchNameState === "success"}
                                    error={this.state.branchNameState === "error"}
                                    labelText="Branch Name*"
                                    id="branchName"
                                    value={this.state.UserData.branchName}
                                    name='branchName'
                                    onChange={(e) => this.SetValue("string", e)}
                                    //modelbind={model('UserDetailsDTO.BranchName')}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    disabled={this.state.disabled}
                                    success={this.state.branchCodeState === "success"}
                                    error={this.state.branchCodeState === "error"}
                                    labelText="Branch Code*"
                                    id="branchCode"
                                    value={this.state.UserData.branchCode}
                                    name='branchCode'
                                    onChange={(e) => this.SetValue("number", e)}
                                    //modelbind={model('UserDetailsDTO.BranchCode')}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                            <GridItem>
                                {this.state.isButtonVisibility ?
                                <div>
                                   <Button disabled={this.state.disabled}align="center" onClick={this.handleSubmit} color="info" >Submit</Button> 
                                    </div>
                                : null}
                                {/*<Button align="center" onClick={this.assignrolesubmit} color="rose">Assign Role</Button>*/}
                            </GridItem>
                        </GridContainer >
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withStyles(style)(UserProfile);
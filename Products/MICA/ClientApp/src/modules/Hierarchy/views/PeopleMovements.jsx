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

import UserAddress from "modules/Hierarchy/views/UserAddress.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import UserConfig from 'modules/Users/UserConfig.js';
import validationPage from "modules/Users/views/UserManagement/ValidationPage.jsx";
import swal from 'sweetalert';
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

const submitBtn = {
    height: "35px",
    marginTop: "-10px"
}

class PeopleMovements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressradioVal: "",
            disable: false,
            radiodisable: false,
            masterList: [],
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
            UserAddress: {
                "perm": {
                    //"userAddressId":"",
                    //"id": "",
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
                    //"userAddressId": "",
                    //"id": "",
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
                    //"userAddressId": "",
                    //"id": "",
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
                "partnerName": "",
                "isActive": "",
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
                "userDetails": [],
                "userAddress": [],
            },
            avoOrgEmpAddress: {
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
                }
            },
            "peopledetails1": {
                "deginName": "",
                "organizationId": null,
                "officeId": null,
                "avoOrgEmployee": {
                    "staffCode": "",
                    "staffName": "",
                    "positionId": null,
                    "email": "",
                    "phoneNumber": "",
                    "staffTypeId": null,
                    "function": "",
                    "appointmentDate": "",
                    "smcode": "",
                    "imdcode": "",
                    "staffStatus": "",
                    "salutationId": null,
                    "firstName": "",
                    "middleName": "",
                    "lastName": "",
                    "dob": "",
                    "dateOfJoining": "",
                    "maritalStatusId": null,
                    "genderId": null,
                    "phoneNumber1": "",
                    "bankName": "",
                    "branchName": "",
                    "accountNumber": "",
                    "officeName": "",
                    "designation": "",
                    "avoOrgEmpAddress": [

                    ],
                    "avoOrgEmpEducation": [

                    ]
                }
            },
            pplMovFlag: true,
        }
    };
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
    SetValue = (type, event) => {
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
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                }
                else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "pan":
                if (validationPage.verifyPanIndNum(event.target.value)) {
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
    GetMasterData = (type, addType, event) => {
        //console.log('GetMasterData: ', type, addType, event)
        this.SetValue(type, event);
    }
    componentDidMount() {
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetMasterDataAsync?sMasterlist=asad`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterdata", data);
                this.setState({ masterList: data });
            });
        // this.GetLocationService('Country', 'c', 0);

    }
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
                console.log("location: ", this.state.LocationDTO);
            });
    };
    getAddressRadioButtonVal = event => {
        this.setState({
            addressradioVal: event.target.value
        })
    }
    handleAddressRadioChange = (event) => {
        let UserAddress = this.state.UserAddress;
        let locationDTO = this.state.LocationDTO;
        let value = event.target.value;
        let name = 'permSelectedValue';
        UserAddress[name] = value;
        console.log("value ", this.state.UserAddress.permSelectedValue)
        if (value == 0) {
            locationDTO.RCountry = locationDTO.Country;
            locationDTO.RState = locationDTO.State;
            locationDTO.RDistrict = locationDTO.District;
            locationDTO.RCity = locationDTO.City;
            locationDTO.RPincode = locationDTO.Pincode;
            this.setState({ locationDTO });
            UserAddress.comm = { ...UserAddress.perm };
            //this.setState({ disable: true });
            //this.state.disable = true;
            //disable rbtn
        }
        else if (value == 1) {
            console.log("loaction", locationDTO);
            locationDTO.RState = [];
            locationDTO.RDistrict = [];
            locationDTO.RCity = [];
            locationDTO.RPincode = [];
            this.setState({ locationDTO });
            UserAddress.comm = { ...UserAddress.resetoff };
            //this.setState({ disable: false });
            //this.state.disable = false;
        }
        this.setState({ UserAddress });
    }



    render() {

        const { classes } = this.props;

        return (
            <div>
                <GridContainer>
                    <GridItem >
                        <Card className="assignCard">
                            <CardHeader color="rose" icon>

                                {
                                    <GridItem>
                                        <h4>People</h4>

                                    </GridItem>
                                }
                            </CardHeader>

                            <CardBody>
                                <GridContainer lg={12} className="myprofile-component">
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            disabled={this.state.disabled}
                                            //success={this.state.firstNameState == "success"}
                                            //error={this.state.firstNameState == "error"}
                                            error={this.state.firstNameState}
                                            labelText="FirstName"
                                            required={true}
                                            id="fName"
                                            value={this.props.empData.firstName}
                                            name='firstName'
                                            //onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            disabled={this.state.disabled}
                                            labelText="MiddleName"
                                            id="mName"
                                            value={this.props.empData.middleName}
                                            name='middleName'
                                            //onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            disabled={this.state.disabled}
                                            labelText="LastName"
                                            id="lName"
                                            value={this.props.empData.lastName}
                                            name="lastName"
                                            //onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <MasterDropdown
                                            disabled={this.state.disabled}
                                            labelText="MaritalStatus"
                                            required={true}
                                            id="MaritalStatus"
                                            lstObject={this.state.masterList}
                                            filterName='MaritalStatus'
                                            value={this.props.empData.maritalStatusId}
                                            name='maritalStatusId'
                                            //onChange={(e) => this.GetMasterData('MaritalStatus', 'Userdata', e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <MasterDropdown
                                            disabled={this.state.disabled}
                                            labelText="Gender"
                                            required={true}
                                            id="gender"
                                            lstObject={this.state.masterList}
                                            filterName='Gender'
                                            value={this.props.empData.genderId}
                                            name='genderId'
                                            //onChange={(e) => this.GetMasterData('Gender', 'Userdata', e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomDatetime style="ddl"
                                            disabled={this.state.disabled}
                                            required={true}
                                            labelText="DateofBirth"
                                            id='dob'
                                            Futuredatevalidate={true}
                                            name='dob'
                                            //onChange={(evt) => this.onDateChange('dob', evt)}
                                            value={this.props.empData.dob}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomDatetime style="ddl"
                                            disabled={this.state.disabled}
                                            labelText="DateofJoining"
                                            id='doj'
                                            required={true}
                                            name='dateOfJoining'
                                            Futuredatevalidate={true}
                                            //onChange={(evt) => this.onDateChange('doj', evt)}
                                            value={this.props.empData.dateOfJoining}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            disabled={this.state.disabled}
                                            //success={this.state.contactNumberState == "success"}
                                            //error={this.state.contactNumberState == "error"}
                                            error={this.state.contactNumberState}
                                            labelText="MobileNumber"
                                            id="No"
                                            required={true}
                                            name="phoneNumber1"
                                            inputType="number"
                                            maxLength="10"
                                            value={this.props.empData.phoneNumber1}
                                            //onChange={(e) => this.SetValue("phnumber", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            disabled={this.state.disabled}
                                            // success={this.state.landLineOfficeState == "success"}
                                            //error={this.state.landLineOfficeState == "error"}
                                            labelText="LandlineOffice"
                                            placeholder="eg. 08026728730"
                                            id="No"
                                            name="phoneNumber"
                                            inputType="number"
                                            value={this.props.empData.phoneNumber1}
                                            //onChange={(e) => this.SetValue("LandLineNumber", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            //success={this.state.landLineResidenceState == "success"}
                                            //error={this.state.landLineResidenceState == "error"}
                                            disabled={this.state.disabled}
                                            labelText="LandlineResidence"
                                            placeholder="eg. 08026728730"
                                            id="No"
                                            name="phoneNumber1"
                                            inputType="number"
                                            //pattern="[/^[0-9]\d{2,4}-\d{6,8}$/]"
                                            value={this.props.empData.phoneNumber1}
                                            //onChange={(e) => this.SetValue("LandLineNumber", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            disabled={true}
                                            //success={this.state.emailState == "success"}
                                            //error={this.state.emailState == "error"}
                                            error={this.state.emailState}
                                            labelText="EmailID"
                                            required={true}
                                            id="mailId"
                                            value={this.props.empData.email}
                                            name='email'
                                            //onChange={(e) => this.SetValue("email", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            disabled={this.state.disabled}
                                            //success={this.state.panNoState == "success"}
                                            //error={this.state.panNoState == "error"}
                                            error={this.state.panNoState}
                                            labelText="PAN"
                                            required={true}
                                            id="panNo"
                                            //value={this.state.UserData.panNo}
                                            //name="panNo"
                                            //onChange={(e) => this.SetValue("pan", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            disabled={this.state.disabled}
                                            //success={this.state.branchNameState == "success"}
                                            //error={this.state.branchNameState == "error"}
                                            error={this.state.branchNameState}
                                            labelText="BranchName"
                                            //required={true}
                                            id="branchName"
                                            value={this.props.empData.branchName}
                                            name='branchName'
                                            //onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            disabled={this.state.disabled}
                                            //success={this.state.branchCodeState == "success"}
                                            //error={this.state.branchCodeState == "error"}
                                            error={this.state.branchCodeState}
                                            labelText="BranchCode"
                                            id="branchCode"
                                            //value={this.state.UserData.branchCode}
                                            //name='branchCode'
                                            //onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    {this.state.partnervisible ? <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            labelText="PartnerName"
                                            id="No"
                                            disabled={true}
                                            //name="partnerName"
                                            //value={this.state.UserData.partnerName}
                                            //onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem> : null}
                                </GridContainer>

                            </CardBody>
                        </Card>
                        {this.props.hideaddress ? null :
                            <Card>
                                <CardBody>
                                    <GridContainer justify="center">
                                        <UserAddress avoOrgEmpAddress={this.state.avoOrgEmpAddress} peopledetails1={this.state.peopledetails1} /*pplMovFlag={this.state.pplMovFlag}*/ radiodisable={this.state.radiodisable} addressradioVal={this.state.addressradioVal} disable={this.state.disable} classes={this.classes} handleAddressRadioChange={this.handleAddressRadioChange} SetValue={this.SetValue} GetLocation={this.GetLocation} LocationDTO={this.state.LocationDTO} />
                                    </GridContainer >
                                </CardBody>
                            </Card>
                        }

                    </GridItem>
                </GridContainer>

            </div>

        );
    }
}
export default withStyles(style)(PeopleMovements);
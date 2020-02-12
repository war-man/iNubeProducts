import React from "react";

//@material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import Select from "@material-ui/core/Select";
//import MenuItem from "@material-ui/core/MenuItem";
//import InputLabel from "@material-ui/core/InputLabel";
//import FormControl from "@material-ui/core/FormControl";
import CustomInput from "components/CustomInput/CustomInput.jsx";
//import Datetime from "react-datetime";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Radio from "@material-ui/core/Radio";
//import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Button from "components/CustomButtons/Button.jsx";
import Edit from "@material-ui/icons/Edit";
import Tooltip from '@material-ui/core/Tooltip';
//import User from "modules/Users/views/UserManagement/User.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
//import Dropdown from "components/Dropdown/Dropdown.jsx";
import $ from 'jquery';
//import bindModel from 'components/ModelBinding/bindModel.js';
//import Warning from "../../../../components/Typography/Warning";
//import Alerts from "components/CustomAlerts/Alerts.jsx";
//import { func } from "prop-types";
//import Success from "../../../../components/Typography/Success";
//import { fail } from "assert";
//import { Card } from "material-ui";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import './style.css';
import './style-cover.css';
import UserConfig from 'modules/Users/UserConfig.js';
import swal from 'sweetalert';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
//import FilterNone from "@material-ui/icons/FilterNone";
//import { Redirect } from 'react-router-dom';
import Icon from "@material-ui/core/Icon";
import usertype from "assets/img/user-type.png";
import validationPage from "./ValidationPage";
//import ImageUploader from 'react-images-upload';
//import ImageUpload from 'components/CustomUpload/ImageUpload.jsx';
//import PictureUpload from 'components/CustomUpload/PictureUpload.jsx';
import UserAddress from "./UserAddress.jsx";
import defaultImage from "assets/img/default-avatar.png";
import evening from "assets/img/img-cover.jpg";
import { array } from "prop-types";
import profile from "assets/img/profile.png";
import logo from "assets/img/logo.png";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import UserProfileLoader from "../../../../components/Loaders/UserProfileLoader";
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

const Profileimage = {
    marginTop: "-125px",
    marginLeft: "410px"
}

const divimagepreview = {
    width: "100%",
    marginLeft: "704px",
    padding: "52px"
}

const divprofileimage = {

    marginTop: "-39px",
    marginLeft: "796px"
}

// const validateBtn = {
//     boxShadow: "0px 0px 0px 2px",
//     height: "37px",
//     marginTop: "10px",
//     marginLeft: "1044px",
//}

const padding = {
    paddingTop: "3rem",
}
//const ddl = {
//    marginLeft: "105px"
//}

class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: true,
            pageloader: true,
            addressradioVal: "",
            radioVal: "",
            edituser: false,
            empFlag: false,
            visibility: false,
            partFlag: false,
            selectedValue: null,
            employeeid: "",
            employeeidState: "",
            isUser: false,
            partnerid: "",
            partneridState: "",
            uid: "",
            isButtonVisibility: false,
            disable: false,
            // disabled: true,
            UserId: this.props.searchUserId,
            editModal: false,
            firstName: "",
            firstNameState: false,
            middleName: "",
            middleNameState: "",
            lastName: "",
            lastNameState: "",
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
            landLineNumState: "",
            landLineOfficeState: "",
            landLineResidence: "",
            landLineResidenceState: "",
            email: "",
            emailState: false,
            panNo: "",
            panNoState: false,
            branchName: "",
            branchNameState: false,
            branchCode: "",
            branchCodeState: false,
            picturevisibility: false,
            disable: this.props.disable,
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
            selectedimage: "",
            profileimage: [],
            filename: "",
            base64: [],
            emaildisabled: false,
            imagePreviewUrl: '',
            validdob: false,
            validdoj: false,
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
            partnervisible: true,
            radiodisable: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.modifyValue = this.modifyValue.bind(this);
        // this.EditProfile = this.EditProfile.bind(this);
        //this.handletimeline = this.handletimeline.bind(this);
        //this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        //this.handleImageChange = this.handleImageChange.bind(this);
        //this.resetFile = this.resetFile.bind(this);
        this.handleDateValidation = this.handleDateValidation.bind(this);
        this.handleDobvalidation = this.handleDobvalidation.bind(this);
    }

    fileSelectedHandler = (event) => {
        let picture = event.target.files[0];
        let files = this.state.file;
        let base = this.state.base64;
        this.setState({
            selectedimage: event.target.files[0]
        })
        let reader = new FileReader();
        reader.onloadend = () => {
            base.push(reader.result);
            this.setState({
                files: picture,
                imagePreviewUrl: reader.result
            });
        }
        this.state.profileimage = this.state.base64;
        //this.state.UserData.profileImage = this.state.base64;
        reader.readAsDataURL(event.target.files[0]);
        console.log("image ", event.target.files[0].name);
        var data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('filename', event.target.files[0].name);
        console.log("data: ", data);
        $.ajax({
            type: "POST",
            url: `${UserConfig.UserConfigUrl}/api/UserProfile/Uploadimage/Uploadimage?userId=` + localStorage.getItem('userId'),
            contentType: false,
            processData: false,
            data: data,
            beforeSend: function (xhr) {
                /* Authorization header */
                xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('userToken'));
            },
            success: function (message) {
                localStorage.setItem('profilepicture', message.details.profileImage)
                console.log("profilepicture: ", message.details.profileImage)
                console.log("Message: ", message);
                swal({
                    text: "Image uploaded successfully",
                    icon: "success"
                });
            },
            error: function (message) {

                swal({
                    text: "Image upload failed",
                    icon: "error"
                });
            }
        });
    }

    modifyValue = (value) => {
        let UserDto = value;
        this.setState({ user: UserDto });
        console.log("User modified:", this.state.user);
    }

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
                console.log("location: ", this.state.LocationDTO);
            });
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

    componentDidMount() {
        //console.log('User Mount Event');
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

        const props = this.props;
        if (props.edituser == true) {
            if (props.searchUserId != "") {
                let user = this.state.user;
                this.setState({ pageloader: false });
                let userdata = this.state.UserData;

                fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/SearchUserById?Id=` + props.searchUserId, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    },
                })
                    .then(response => { return response.json() })
                    .then((data) => {
                        console.log('Response data1', data);
                        if (props.editModal == true) {
                            this.setState({
                                UserId: props.searchUserId,
                                editModal: props.editModal,
                                disabled: props.disabled,
                                emaildisabled: true,
                                display: props.display,
                                isButtonVisibility: props.btnvisibility,
                                picturevisibility: props.picturevisibility,
                                radiodisable: props.radiodisable,
                                user: data
                            });
                            console.log("user: ", this.state.user);
                            let addDTO = this.state.UserAddress;
                            console.log("length", this.state.user.userAddress.length)
                            if (this.state.user.userAddress.length == 1) {
                                this.GetLocationService('State', 'c', this.state.user.userAddress[0].userCountryId);
                                this.GetLocationService('District', 'c', this.state.user.userAddress[0].userStateId);
                                this.GetLocationService('City', 'c', this.state.user.userAddress[0].userDistrictId);
                                this.GetLocationService('Pincode', 'c', this.state.user.userAddress[0].userCityId);
                                addDTO['perm'] = this.state.user.userAddress[0];
                                addDTO['comm'] = this.state.user.userAddress[0];
                                addDTO['permSelectedValue'] = 0;
                            }
                            else {
                                addDTO['perm'] = this.state.user.userAddress[0];
                                this.GetLocationService('State', 'perm', this.state.user.userAddress[0].userCountryId);
                                this.GetLocationService('District', 'perm', this.state.user.userAddress[0].userStateId);
                                this.GetLocationService('City', 'perm', this.state.user.userAddress[0].userDistrictId);
                                this.GetLocationService('Pincode', 'perm', this.state.user.userAddress[0].userCityId);
                                addDTO['comm'] = this.state.user.userAddress[1];
                                this.GetLocationService('State', 'comm', this.state.user.userAddress[1].userCountryId);
                                this.GetLocationService('District', 'comm', this.state.user.userAddress[1].userStateId);
                                this.GetLocationService('City', 'comm', this.state.user.userAddress[1].userDistrictId);
                                this.GetLocationService('Pincode', 'comm', this.state.user.userAddress[1].userCityId);
                                addDTO['permSelectedValue'] = 1;
                            }
                            this.setState({ addDTO });

                            this.state.UserData = this.state.user.userDetails[0];
                            this.state.UserData.dob = new Date(this.state.UserData.dob).toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' });
                            this.state.UserData.doj = new Date(this.state.UserData.doj).toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' });
                            this.setState({});
                            console.log("userdetails", this.state.UserData);
                            console.log("useraddress", this.state.UserAddress);
                            this.setState({ validdob: true, validdoj: true });
                            if (this.state.UserData.partnerId == "") {
                                this.setState({ partnervisible: false })
                            }
                            let successstate = this.state;
                            successstate.firstNameState = false;
                            successstate.contactNumberState = false;
                            successstate.branchNameState = false;
                            successstate.branchCodeState = false;
                            successstate.emailState = false;
                            successstate.panNoState = false;
                            this.setState({ successstate });
                        }
                        this.modifyValue(userdata);
                        console.log("user address", this.state.UserAddress);
                    });
            }
        }
        else {
            this.Loaddata();
        }
    }

    Loaddata = () => {
        let userId = localStorage.getItem('userId');
        this.setState({
            isButtonVisibility: true,
            picturevisibility: true
        });
        setTimeout(
            function () {
                this.setState({ pageloader: false });
            }.bind(this), 2000
        );
        fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/SearchUserById?Id=` + userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => { return response.json() })
            .then((data) => {
                if (data != undefined) {
                    this.setState({ user: data });
                    console.log("user: ", this.state.user);
                    let addDTO = this.state.UserAddress;
                    console.log("length", this.state.user.userAddress.length)
                    if (this.state.user.userAddress.length == 1) {
                        this.GetLocationService('State', 'c', this.state.user.userAddress[0].userCountryId);
                        this.GetLocationService('District', 'c', this.state.user.userAddress[0].userStateId);
                        this.GetLocationService('City', 'c', this.state.user.userAddress[0].userDistrictId);
                        this.GetLocationService('Pincode', 'c', this.state.user.userAddress[0].userCityId);
                        addDTO['perm'] = this.state.user.userAddress[0];
                        addDTO['comm'] = this.state.user.userAddress[0];
                        addDTO['permSelectedValue'] = 0;
                    }
                    else {
                        addDTO['perm'] = this.state.user.userAddress[0];
                        this.GetLocationService('State', 'perm', this.state.user.userAddress[0].userCountryId);
                        this.GetLocationService('District', 'perm', this.state.user.userAddress[0].userStateId);
                        this.GetLocationService('City', 'perm', this.state.user.userAddress[0].userDistrictId);
                        this.GetLocationService('Pincode', 'perm', this.state.user.userAddress[0].userCityId);
                        addDTO['comm'] = this.state.user.userAddress[1];
                        this.GetLocationService('State', 'comm', this.state.user.userAddress[1].userCountryId);
                        this.GetLocationService('District', 'comm', this.state.user.userAddress[1].userStateId);
                        this.GetLocationService('City', 'comm', this.state.user.userAddress[1].userDistrictId);
                        this.GetLocationService('Pincode', 'comm', this.state.user.userAddress[1].userCityId);
                        addDTO['permSelectedValue'] = 1;
                    }
                    this.setState({ addDTO });
                    this.state.UserData = this.state.user.userDetails[0];
                    this.state.profileimage = "data:image;base64," + localStorage.getItem('profilepicture');
                    this.state.UserData.dob = new Date(this.state.UserData.dob).toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' });
                    this.state.UserData.doj = new Date(this.state.UserData.doj).toLocaleDateString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' });
                    console.log("userdetails", this.state.UserData);
                    console.log("useraddress", this.state.UserAddress);
                    this.setState({ validdob: true, validdoj: true });
                    let successstate = this.state;
                    successstate.firstNameState = false;
                    successstate.contactNumberState = false;
                    successstate.branchNameState = false;
                    successstate.branchCodeState = false;
                    successstate.emailState = false;
                    successstate.panNoState = false;
                    this.setState({ successstate });
                    if (this.state.UserData.partnerId == "") {
                        this.setState({ partnervisible: false })
                    }
                }
            });
    }

    GetMasterData = (type, addType, event) => {
        //console.log('GetMasterData: ', type, addType, event)
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

    handleDateValidation() {
        //function fn_DateCompare(DateA, DateB) {     // this function is good for dates > 01/01/1970

        this.setState({ validdoj: false});
        const userdob = this.state.UserData.dob;
        const userdoj = this.state.UserData.doj;
        var array = userdob.split('/');
        const dobdata = array[2] + '-' + array[1] + '-' + array[0];
        const dob = new Date(dobdata);
        const doj = new Date(userdoj);
        const today = new Date();
        let date = this.state.UserData
        this.setState({ date });
        console.log("date: ", this.state.UserData.dob, this.state.UserData.doj)
        const msDatedob = Date.UTC(dob.getFullYear(), dob.getMonth() + 1, dob.getDate());
        const msDatedoj = Date.UTC(doj.getFullYear(), doj.getMonth() + 1, doj.getDate());
        const msDatetoday = Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate());

        if (parseFloat(msDatedob) == parseFloat(msDatedoj)) {
            swal("", "Date of Joining should not be equal to Date of Birth", "error");
        }
        if (parseFloat(msDatedoj) > parseFloat(msDatetoday)) {
            swal("", "Date of Joining should not be future date", "error");
            this.state.UserData.doj = new Date(this.state.UserData.doj).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
        }
        if (parseFloat(msDatedob) > parseFloat(msDatetoday)) {
            swal("", "Date of Birth should not be future date", "error");
        }
        if (parseFloat(msDatedob) > parseFloat(msDatedoj)) {
            swal("", "Date of Birth should not be greater than Date of Joining", "error");
            this.state.UserData.doj = new Date(this.state.UserData.doj).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
        } else {
            this.setState({ validdoj: true });
            let date = this.state.UserData
            if (this.state.UserData.doj != "") {
                date.doj = new Date(this.state.UserData.doj).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
            }
            this.setState({ date });
        }
        console.log("date: ", this.state.UserData.dob, this.state.UserData.doj)
    }

    handleDobvalidation() {
        this.setState({ validdob: false });
        console.log("date: ", this.state.UserData.dob, this.state.UserData.doj)
        var today = new Date();
        var birthDate = new Date(this.state.UserData.dob);
        var calculatedage = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        console.log("age value", calculatedage);
        if (calculatedage < 18) {
            swal("", "Date of Birth value entered should be more than 18 years", "error");
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
        console.log("date: ", this.state.UserData.dob, this.state.UserData.doj)
    }

    handleSubmit() {
        console.log('byte aspnetusers', this.state.user);
        console.log("userdata", this.state.UserData);
        console.log("useraddress", this.state.UserAddress);
        //this.handleDateValidation();
        //this.handleDobvalidation();
        if (this.state.UserData.firstName != "" && this.state.UserData.dob != "" &&
            this.state.UserData.doj != "" && this.state.UserData.genderId != "" &&
            this.state.UserData.email != "" && this.state.UserData.contactNumber != "" &&
            this.state.UserData.panNo != "" && this.state.UserData.panNo != ""
            && this.state.validdob != false && this.state.validdoj != false//) {
            && this.state.firstNameState == false && this.state.contactNumberState == false
            && this.state.branchNameState == false && this.state.branchCodeState == false
            && this.state.emailState == false && this.state.panNoState == false) {

            let userDTO = this.state.AspNetUser;
            let userdetails = this.state.UserData;
            let useraddress = [];

            let pks = this.state.UserData.dob;
            let dks = this.state.UserData.doj;
            userdetails.dob = this.newdatechange(this.state.UserData.dob);
            userdetails.doj = this.newdatechange(this.state.UserData.doj);
            this.setState({ userdetails });

            let udata = { ...userdetails };
            let tblUserDetails = this.state.AspNetUser.userDetails;
            const list = [...tblUserDetails, udata];
            userDTO['userDetails'] = list;
            useraddress.push(this.state.UserAddress.perm);
            delete this.state.UserAddress.comm['userAddressId']
            delete this.state.UserAddress.perm['id']
            delete this.state.UserAddress.comm['id']
            delete this.state.UserAddress.perm['userAddressId']
            if (this.state.UserAddress.permSelectedValue == 1) {
                //this.state.UserAddress.comm.userAddressId = "";
                //this.state.UserAddress.perm.userAddressId = "";
                useraddress.push(this.state.UserAddress.comm);
            }
            userDTO['userAddress'] = useraddress;

            this.setState({ userDTO });

            console.log("final userdata", userDTO);
            fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/CreateProfileUser`, {
                method: 'Post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(userDTO)
            }).then(response => response.json())
                .then((data) => {
                    if (data.status == 2) {
                        swal({
                            text: data.responseMessage,
                            icon: "success"
                        });
                        if (this.state.display != true) {
                            this.props.handleClose();
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
                    }
                    else {

                    }
                    console.log("data: ", data);
                    this.setState({
                        uid: data.id,
                    });
                });
            let state = this.state.UserData;
            state.dob = pks;
            state.doj = dks;
            this.setState({ state });
        } else {
            swal({
                text: "Some fields are missing or Please check the data you entered",
                icon: "error"
            });
        }
    }

    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

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

    newdatechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        }
        return (
            <div>
                {this.state.pageloader ?
                    <UserProfileLoader /> :
                    <GridContainer>
                        <GridItem >
                            <Card>
                                <CardBody>
                                    {this.state.picturevisibility ?
                                        <GridContainer justify="center">
                                            <GridItem>
                                                <div className="container">
                                                    <div className="avatar-upload">
                                                        <div className="avatar-edit">
                                                            <input type='file' id="imageUpload" onChange={(e) => this.fileSelectedHandler(e)} accept=".png, .jpg, .jpeg" />
                                                            <label for="imageUpload"></label>
                                                        </div>
                                                        {this.state.profileimage ?
                                                            <div className="avatar-preview">
                                                                <div id="imagePreview" style ={ { backgroundImage: "url(" + this.state.profileimage + ")" } } />
                                                            </div>
                                                            :
                                                            <div className="avatar-preview">
                                                                <div id="imagePreview1" style ={ { backgroundImage: "url(" + profile + ")" } } />
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </GridItem>
                                        </GridContainer>
                                        : null}
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
                                                value={this.state.UserData.firstName}
                                                name='firstName'
                                                onChange={(e) => this.SetValue("string", e)}
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
                                                value={this.state.UserData.middleName}
                                                name='middleName'
                                                onChange={(e) => this.SetValue("string", e)}
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
                                                value={this.state.UserData.lastName}
                                                name="lastName"
                                                onChange={(e) => this.SetValue("string", e)}
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
                                                value={this.state.UserData.maritalStatusId}
                                                name='maritalStatusId'
                                                onChange={(e) => this.GetMasterData('MaritalStatus', 'Userdata', e)}
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
                                                value={this.state.UserData.genderId}
                                                name='genderId'
                                                onChange={(e) => this.GetMasterData('Gender', 'Userdata', e)}
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
                                                onChange={(evt) => this.onDateChange('dob', evt)}
                                                value={this.state.UserData.dob}
                                                formControlProps={{ fullWidth: true }} />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={3}>
                                            <CustomDatetime style="ddl"
                                                disabled={this.state.disabled}
                                                labelText="DateofJoining"
                                                id='doj'
                                                required={true}
                                                name='doj'
                                                Futuredatevalidate={true}
                                                onChange={(evt) => this.onDateChange('doj', evt)}
                                                value={this.state.UserData.doj}
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
                                                name="contactNumber"
                                                inputType="number"
                                                maxLength="10"
                                                value={this.state.UserData.contactNumber}
                                                onChange={(e) => this.SetValue("phnumber", e)}
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
                                                name="landLineOffice"
                                                inputType="number"
                                                value={this.state.UserData.landLineOffice}
                                                onChange={(e) => this.SetValue("LandLineNumber", e)}
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
                                                name="landLineResidence"
                                                inputType="number"
                                                //pattern="[/^[0-9]\d{2,4}-\d{6,8}$/]"
                                                value={this.state.UserData.landLineResidence}
                                                onChange={(e) => this.SetValue("LandLineNumber", e)}
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
                                                value={this.state.UserData.email}
                                                name='email'
                                                onChange={(e) => this.SetValue("email", e)}
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
                                                value={this.state.UserData.panNo}
                                                name="panNo"
                                                onChange={(e) => this.SetValue("pan", e)}
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
                                                value={this.state.UserData.branchName}
                                                name='branchName'
                                                onChange={(e) => this.SetValue("string", e)}
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
                                                value={this.state.UserData.branchCode}
                                                name='branchCode'
                                                onChange={(e) => this.SetValue("string", e)}
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
                                                name="partnerName"
                                                value={this.state.UserData.partnerName}
                                                onChange={(e) => this.SetValue("string", e)}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem> : null}
                                    </GridContainer>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <GridContainer justify="center">
                                        <UserAddress UserAddress={this.state.UserAddress} radiodisable={this.state.radiodisable} addressradioVal={this.state.addressradioVal} disable={this.state.disable} classes={this.classes} handleAddressRadioChange={this.handleAddressRadioChange} SetValue={this.SetValue} GetLocation={this.GetLocation} LocationDTO={this.state.LocationDTO} addressradiobutton={this.state.addressradiobutton} />
                                    </GridContainer >
                                </CardBody>
                            </Card>
                            {this.state.isButtonVisibility ?
                                <GridContainer justify="center">
                                    <Button round disabled={this.state.disabled} align="center" onClick={this.handleSubmit} color="success"><TranslationContainer translationKey="Save" /></Button>
                                </GridContainer>
                                : null}
                        </GridItem>
                    </GridContainer>
                }
            </div>
        );
    }
}

export default withStyles(style)(MyProfile);
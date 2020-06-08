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
import UserAddress from "modules/Hierarchy/views/UserAddress.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import UserConfig from 'modules/Users/UserConfig.js';
import HierarchyConfig from 'modules/Hierarchy/HierarchyConfig.js';
import validationPage from "modules/Users/views/UserManagement/ValidationPage.jsx";
import MappingDetails from "modules/Hierarchy/views/MappingDetails.jsx";
import swal from 'sweetalert';
import Add from "@material-ui/icons/AddCircleOutline";
import ReactTable from 'components/MuiTable/MuiTable.jsx';




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

class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            flagsave: true,
            flagUpdate:false,
            newmasterList: [],
            supervisor: "",
            positionmasterList: [],
            offmasterList: [],
            reportingmasList: [],
            masterList1: [],
            btnload: false,
            tableData: [],
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
            educationdata: [{
                certification: "",
                Year: "",
                grade: ""
            }],
            "avoOrgEmpEducation": [{
                "certification": "",
                "year": "",
                "gradeOrPercentage": ""

            }],
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
                    "orgEmpId": "",
                    "empAddressType": "",
                    "empCountryId": "",
                    "empStateId": "",
                    "empDistrictId": "",
                    "empCityId": "",
                    "empAddressLine1": "",
                    "empAddressLine2": "",
                    "empAddressLine3": "",
                    "empPincodeId": ""
                },
                "comm": {
                    "orgEmpId": "",
                    "empAddressType": "",
                    "empCountryId": "",
                    "empStateId": "",
                    "empDistrictId": "",
                    "empCityId": "",
                    "empAddressLine1": "",
                    "empAddressLine2": "",
                    "empAddressLine3": "",
                    "empPincodeId": ""
                },
                "resetoff": {
                    "orgEmpId": "",
                    "empAddressType": "",
                    "empCountryId": "",
                    "empStateId": "",
                    "empDistrictId": "",
                    "empCityId": "",
                    "empAddressLine1": "",
                    "empAddressLine2": "",
                    "empAddressLine3": "",
                    "empPincodeId": ""
                },
                "permSelectedValue": 1,
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
                    //"panNo": "",
                    "recruitmentNo": "",
                    "avoOrgEmpAddress": [

                    ],
                    "avoOrgEmpEducation": [

                    ]
                }
            },
            showdesignation: false,
            mappingdetails: {
                organization: "",
                office: "",
                designation: "",
            }
        }
    };
    GetLocation = (type, addType, event) => {
        //this.SetValue(event);
        let reg = this.state.avoOrgEmpAddress[addType];
        let name = event.target.name;
        let value = event.target.value;
        reg[name] = value;
        this.setState({ reg })
        if (type != "") {
            this.GetLocationService(type, addType, event.target.value);
        }
    };
    SetValue = (event) => {
        let peopledetails = this.state.peopledetails1.avoOrgEmployee;
        let name = event.target.name;
        let value = event.target.value;

        peopledetails[name] = value;

        this.setState({ peopledetails })
        console.log("ppldet", this.state.peopledetails1);
        //this.setState({ fields: UserData })
        //this.change(event, name, type);
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
    GetMasterData = (event) => {
        //console.log('GetMasterData: ', type, addType, event)
        this.SetValue(event);
    }
    SetInputValue = (event, index) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        //this.state.treatydata[name] = value;
        //this.setState({ treatydata})
        let treatydata = this.state.treatydata;
        treatydata[index][name] = value;
        this.setState({ treatydata });
        //this.MappingTableData();
    }
    GetLocation1 = (e) => {
        console.log("evtmaster", e);
        let mappingdetails = this.state.peopledetails1;
        let name = e.target.name;
        let value = e.target.value;
        mappingdetails[name] = value;
        this.setState({ mappingdetails });
        // console.log("mappingdetails", this.state.mappingdetails, e);

    };
    GetMasterData1 = (e) => {
        console.log("evtmaster", e);
        let mappingdetails = this.state.peopledetails1;
        let name = e.target.name;
        let value = e.target.value;
        mappingdetails[name] = value;
        this.setState({ mappingdetails });
        console.log(" this.state.mappingdetails;", this.state.mappingdetails);
        this.GetOrgDetails();
        console.log("positionmasterList", this.state.positionmasterList);
    }
    GetOrgDetails = () => {

        if (this.state.peopledetails1.organizationId != "") {
            fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetOffbyOrgid?orgid=` + this.state.peopledetails1.organizationId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("offmasterList", data);
                    this.setState({ offmasterList: data, flag: true });

                    // this.state.masterList = data;
                });
            fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetVecPositions?orgid=` + this.state.peopledetails1.organizationId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("positionmasterList", data);
                    //this.state.positionmasterList = data;
                    this.setState({ positionmasterList: data, flag: true });
                    //this.MappingTableData();
                });
        }
    }
    SetddlValue = (event, index) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        //this.state.treatydata[name] = value;
        //this.setState({ treatydata})


        let mappingTabledata = this.state.peopledetails1;

        mappingTabledata[name] = value;

        this.setState({ mappingTabledata });
        //this.MappingTableData();
        //console.log("thismappingdetails", this.state.mappingTabledata)
        if (name == "deginName") {
            fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetSupervisorname?designame=` + this.state.peopledetails1.deginName, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("countpos", data);
                    //this.state.positionmasterList = data;
                    this.state.supervisor = data;
                    this.setState({ reportingmasList: data });
                    //this.MappingTableData();
                });
        }
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
        this.GetLocationService('Country', 'c', 0);
        this.AddData();
       // this.setState({ flagsave: false, flagUpdate: this.props.flagUpdate });
        if (this.props.EmpCode != undefined) {
            this.setState({ flagsave: false, flagUpdate: this.props.flagUpdate });
             this.GetLocationService('Country', 'c', 0);
            fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/searchpeoplebycode?empcode=` + this.props.EmpCode, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.SearchPeople)
            }).then(response => response.json())
                .then(data => {
                    console.log(data, 'data1')
                    if (data != null) {
                        this.state.disabled = true;
                        this.state.showdesignation = true;
                        this.state.peopledetails1.avoOrgEmployee.staffCode = data.staffCode;
                        this.state.peopledetails1.avoOrgEmployee.salutationId = data.salutationId;
                        this.state.peopledetails1.avoOrgEmployee.firstName = data.firstName;
                        this.state.peopledetails1.avoOrgEmployee.middleName = data.middleName;
                        this.state.peopledetails1.avoOrgEmployee.lastName = data.lastName;
                        this.state.peopledetails1.avoOrgEmployee.maritalStatusId = data.maritalStatusId;
                        this.state.peopledetails1.avoOrgEmployee.genderId = data.genderId;
                        //new Date(data.appointmentDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', })
                        this.state.peopledetails1.avoOrgEmployee.dob = new Date(data.dob).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                        this.state.peopledetails1.avoOrgEmployee.dateOfJoining = new Date(data.dateOfJoining).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                        this.state.peopledetails1.avoOrgEmployee.phoneNumber = data.phoneNumber;
                        this.state.peopledetails1.avoOrgEmployee.email = data.email;
                        this.state.peopledetails1.avoOrgEmployee.appointmentDate = new Date(data.appointmentDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                        this.state.peopledetails1.avoOrgEmployee.bankName = data.bankName;
                        this.state.peopledetails1.avoOrgEmployee.branchName = data.branchName;
                        this.state.peopledetails1.avoOrgEmployee.accountNumber = data.accountNumber;
                        this.state.peopledetails1.avoOrgEmployee.panNo = data.panNo;
                        //this.state.avoOrgEmpAddress.perm.empAddressId = data.avoOrgEmpAddress[0].empAddressId;
                        //this.state.avoOrgEmpAddress.perm.orgEmpId = data.avoOrgEmpAddress[0].orgEmpId;
                        //this.state.avoOrgEmpAddress.perm.empAddressType = data.avoOrgEmpAddress[0].empAddressType;
                        //this.state.avoOrgEmpAddress.perm.empCountryId = data.avoOrgEmpAddress[0].empCountryId;
                        //this.state.avoOrgEmpAddress.perm.empStateId = data.avoOrgEmpAddress[0].empStateId;
                        //this.state.avoOrgEmpAddress.perm.empDistrictId = data.avoOrgEmpAddress[0].empDistrictId;
                        //this.state.avoOrgEmpAddress.perm.empCityId = data.avoOrgEmpAddress[0].empCityId;
                        //this.state.avoOrgEmpAddress.perm.empAddressLine1 = data.avoOrgEmpAddress[0].empAddressLine1;
                        //this.state.avoOrgEmpAddress.perm.empAddressLine2 = data.avoOrgEmpAddress[0].empAddressLine2;
                        //this.state.avoOrgEmpAddress.perm.empAddressLine3 = data.avoOrgEmpAddress[0].empAddressLine3;
                        //this.state.avoOrgEmpAddress.perm.empPincodeId = data.avoOrgEmpAddress[0].empPincodeId;

                        //this.GetLocationService('State', 'perm', data.avoOrgEmpAddress[0].empCountryId);
                        //this.GetLocationService('District', 'perm', data.avoOrgEmpAddress[0].empStateId);
                        //this.GetLocationService('City', 'perm', data.avoOrgEmpAddress[0].empDistrictId);
                        //this.GetLocationService('Pincode', 'perm', data.avoOrgEmpAddress[0].empCityId);
                        //this.GetLocationService('Country', 'c', 0);
                        //this.state.searchData = sdata;
                        let perm = this.state.avoOrgEmpAddress.perm;
                        let comm = this.state.avoOrgEmpAddress.comm;
                        let addDTO = this.state.avoOrgEmpAddress;
                        if (data.avoOrgEmpAddress.length == 1) {
                            if (data.avoOrgEmpAddress[0].empCountryId != null) {
                                this.GetLocationService('State', 'c', data.avoOrgEmpAddress[0].empCountryId);
                                this.GetLocationService('District', 'c', data.avoOrgEmpAddress[0].empStateId);
                                this.GetLocationService('City', 'c', data.avoOrgEmpAddress[0].empDistrictId);
                                this.GetLocationService('Pincode', 'c', data.avoOrgEmpAddress[0].empCityId);
                            }
                            perm.empCountryId = data.avoOrgEmpAddress[0].empCountryId;
                            perm.empStateId = data.avoOrgEmpAddress[0].empStateId;
                            perm.empDistrictId = data.avoOrgEmpAddress[0].empDistrictId;
                            perm.empCityId = data.avoOrgEmpAddress[0].empCityId;
                            perm.empAddressLine1 = data.avoOrgEmpAddress[0].empAddressLine1;
                            perm.empAddressLine2 = data.avoOrgEmpAddress[0].empAddressLine2;
                            perm.empAddressLine3 = data.avoOrgEmpAddress[0].empAddressLine3;
                            perm.empPincodeId = data.avoOrgEmpAddress[0].empPincodeId;
                            addDTO['perm'] = perm;
                            addDTO['comm'] = perm;
                            addDTO['permSelectedValue'] = 0;
                        }
                        else {
                            perm.empCountryId = data.avoOrgEmpAddress[0].empCountryId;
                            perm.empStateId = data.avoOrgEmpAddress[0].empStateId;
                            perm.empDistrictId = data.avoOrgEmpAddress[0].empDistrictId;
                            perm.empCityId = data.avoOrgEmpAddress[0].empCityId;
                            perm.empAddressLine1 = data.avoOrgEmpAddress[0].empAddressLine1;
                            perm.empAddressLine2 = data.avoOrgEmpAddress[0].empAddressLine2;
                            perm.empAddressLine3 = data.avoOrgEmpAddress[0].empAddressLine3;
                            perm.empPincodeId = data.avoOrgEmpAddress[0].empPincodeId;
                            addDTO['perm'] = perm;
                            if (data.avoOrgEmpAddress[0].empCountryId != null) {
                                this.GetLocationService('State', 'perm', data.avoOrgEmpAddress[0].empCountryId);
                                this.GetLocationService('District', 'perm', data.avoOrgEmpAddress[0].empStateId);
                                this.GetLocationService('City', 'perm', data.avoOrgEmpAddress[0].empDistrictId);
                                this.GetLocationService('Pincode', 'perm', data.avoOrgEmpAddress[0].empCityId);
                            }
                            comm.empCountryId = data.avoOrgEmpAddress[1].empCountryId;
                            comm.empStateId = data.avoOrgEmpAddress[1].empStateId;
                            comm.empDistrictId = data.avoOrgEmpAddress[1].empDistrictId;
                            comm.empCityId = data.avoOrgEmpAddress[1].empCityId;
                            comm.empAddressLine1 = data.avoOrgEmpAddress[1].empAddressLine1;
                            comm.empAddressLine2 = data.avoOrgEmpAddress[1].empAddressLine2;
                            comm.empAddressLine3 = data.avoOrgEmpAddress[1].empAddressLine3;
                            comm.empPincodeId = data.avoOrgEmpAddress[1].empPincodeId;
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
                        this.setState({});
                        console.log(this.state.avoOrgEmpAddress, 'avo1')
                        let peopledetails1 = this.state.peopledetails1;
                        peopledetails1['avoOrgEmpAddress'] = this.state.avoOrgEmpAddress;
                        //peopledetails.avoOrgEmpAddress.push(this.state.avoOrgEmpAddress.perm);
                        this.setState({ peopledetails1 });
                        console.log(data, 'SearchData Fields1')


                        this.setState({ showRetentionflag: true });
                    }
                });

            fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetEmpMappingData?empcode=` + this.props.EmpCode, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("masterdata1", data);
                    this.setState({ mappingdetails: data });
                    //this.setState({ masterList1: data });

                    // this.state.masterList = data;
                });

            console.log("masterdata3", this.state.peopledetails1);
            console.log("state.masterList", this.state.masterList)
        }
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/GetOrgDropdown`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterdata1", data);
                this.setState({ masterList1: data, flag: true });

                // this.state.masterList = data;
            });


        console.log("state.masterList", this.state.masterList)
        //this.MappingTableData();


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
        let avoOrgEmpAddress = this.state.avoOrgEmpAddress;
        let locationDTO = this.state.LocationDTO;
        let value = event.target.value;
        let name = 'permSelectedValue';
        avoOrgEmpAddress[name] = value;
        console.log("value ", this.state.avoOrgEmpAddress.permSelectedValue)
        if (value == 0) {
            locationDTO.RCountry = locationDTO.Country;
            locationDTO.RState = locationDTO.State;
            locationDTO.RDistrict = locationDTO.District;
            locationDTO.RCity = locationDTO.City;
            locationDTO.RPincode = locationDTO.Pincode;
            this.setState({ locationDTO });

            console.log("ssss", locationDTO);
            avoOrgEmpAddress.comm = { ...avoOrgEmpAddress.perm };
            //avoOrgEmpAddress.comm.empAddressLine1 = avoOrgEmpAddress.perm.empAddressLine1;
            //avoOrgEmpAddress.comm.empAddressLine2 = avoOrgEmpAddress.perm.empAddressLine2;
            //avoOrgEmpAddress.comm.empAddressLine3 = avoOrgEmpAddress.perm.empAddressLine3;
            //avoOrgEmpAddress.comm.empCountryId = avoOrgEmpAddress.perm.empCountryId
            //avoOrgEmpAddress.comm.empStateId = avoOrgEmpAddress.perm.empStateId
            //avoOrgEmpAddress.comm.empDistrictId = avoOrgEmpAddress.perm.empDistrictId
            //avoOrgEmpAddress.comm.empCityId = avoOrgEmpAddress.perm.empCityId
            //avoOrgEmpAddress.comm.empPincodeId = avoOrgEmpAddress.perm.empPincodeId
            this.setState({ disable: true });
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
            avoOrgEmpAddress.comm = { ...avoOrgEmpAddress.resetoff };
            this.setState({ disable: false });
            //this.state.disable = false;
            console.log("bidar", this.state.locationDTO
            );
        }
        this.setState({ avoOrgEmpAddress });
    }
    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }
    datechangeview = (date) => {
        date = date.splice('T');
        const _date = date.split('-');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };



        return dateObj.year + '/' + dateObj.month + '/' + dateObj.day;
    }
    handleSubmit = () => {
        console.log("peopledata", this.state.peopledetails1);

        let userDTO = this.state.peopledetails1.avoOrgEmployee;
        //let userdetails = this.state.UserData;
        let avoOrgEmpAddress = [];
        let avoOrgEmpEducation = [];
        avoOrgEmpAddress.push(this.state.avoOrgEmpAddress.perm);
        if (this.state.avoOrgEmpAddress.permSelectedValue == 1) {
            avoOrgEmpAddress.push(this.state.avoOrgEmpAddress.comm);
        }
        userDTO['avoOrgEmpAddress'] = avoOrgEmpAddress;
        this.state.peopledetails1.avoOrgEmployee.avoOrgEmpEducation = [...this.state.avoOrgEmpEducation];
        //userDTO['avoOrgEmpEducation'] = avoOrgEmpEducation;
        this.setState({ userDTO });
        this.setState({ btnload: true });
        console.log("savepeopledata", this.state.peopledetails1);
        console.log("final userdata", userDTO);

        this.state.peopledetails1.avoOrgEmployee.appointmentDate = this.datechange(this.state.peopledetails1.avoOrgEmployee.appointmentDate);
        this.state.peopledetails1.avoOrgEmployee.dob = this.datechange(this.state.peopledetails1.avoOrgEmployee.dob);
        this.state.peopledetails1.avoOrgEmployee.dateOfJoining = this.datechange(this.state.peopledetails1.avoOrgEmployee.dateOfJoining);
        //his.state.SearchAccountModel.toDate = this.datechange(this.state.SearchAccountModel.toDate);
        if (this.state.peopledetails1.avoOrgEmployee.appointmentDate != "" && this.state.peopledetails1.avoOrgEmployee.dob != "" && this.state.peopledetails1.avoOrgEmployee.dateOfJoining != "") {
            fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/SaveEmplMappingDetails`, {
                method: 'Post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.peopledetails1)
            }).then(response => response.json())
                .then((data) => {
                    this.setState({ btnload: false });
                    if (data.status == 2) {
                        swal({
                            text: data.responseMessage,
                            //text: "data saved successfully",
                            icon: "success"
                        });

                    } else {
                        swal({
                            text: data.responseMessage,
                            //text: "data saved successfully",
                            icon: "error"
                        });
                    }
                });
        }
    }
    handleUpdate = () => {
        debugger;
        console.log("sending data", this.state.peopledetails1.avoOrgEmployee);
        let userDTO = this.state.peopledetails1.avoOrgEmployee;
        //let userdetails = this.state.UserData;
        let avoOrgEmpAddress = [];
        let avoOrgEmpEducation = [];
        avoOrgEmpAddress.push(this.state.avoOrgEmpAddress.perm);
        if (this.state.avoOrgEmpAddress.permSelectedValue == 1) {
            avoOrgEmpAddress.push(this.state.avoOrgEmpAddress.comm);
        }
        userDTO['avoOrgEmpAddress'] = avoOrgEmpAddress;
        this.state.peopledetails1.avoOrgEmployee.avoOrgEmpEducation = [...this.state.avoOrgEmpEducation];
        console.log("savepeopledata", this.state.peopledetails1);
        console.log("final userdata", userDTO);
        //this.state.peopledetails1.avoOrgEmployee.appointmentDate = this.datechange(this.state.peopledetails1.avoOrgEmployee.appointmentDate);
        //this.state.peopledetails1.avoOrgEmployee.dob = this.datechange(this.state.peopledetails1.avoOrgEmployee.dob);
        //this.state.peopledetails1.avoOrgEmployee.dateOfJoining = this.datechange(this.state.peopledetails1.avoOrgEmployee.dateOfJoining);
        fetch(`${HierarchyConfig.HierarchyConfigURL}/api/Organization/ModifyPeople`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.peopledetails1.avoOrgEmployee)
        }).then(response => response.json())
            .then(data => {
                this.setState({ people: data });

                swal({
                    text: data.responseMessage,
                    //text: "data saved successfully",
                    icon: "success"
                });



                //console.log(data, 'Mydata')
                //console.log("Accountss data: ", data);

            });
    }
    SetTreatyDetailsValue = (type, event, index) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;

        let educationdata = this.state.avoOrgEmpEducation;

        educationdata[index][name] = value;

        this.setState({ educationdata });
        this.AddData();
    }
    AddTreatyRecord = (event, index) => {
        //let arr = Object.assign([], this.state.Arrangement);
        //if (this.state.treatydata[index].treatyGroup !== "" && this.state.treatydata[index].businessTypeId !== "" ) {
        //  let educationDetails = this.state;
        //educationDetails['avoOrgEmpEducation']
        this.state.avoOrgEmpEducation.push({ certification: "", year: "", gradeOrPercentage: "" });
        this.setState({});
        //console.log("treatydata", this.state.treatydata[index].treatyGroup, this.state.treatydata);

        //console.log("Aggreement", this.state.Arrangement);
        console.log("iindex", index);
        this.AddData();
        // }
    }
    AddData = () => {

        // if (this.state.newmasterlist.length > 0) {
        console.log("product channel", this.state.masterList, this.state.newmasterlist);

        let con = this.state.newmasterlist;


        this.setState({
            tableData: this.state.avoOrgEmpEducation.map((prop, key) => {
                //console.log("this.ProductDetails.productChannel[key].channelTypeId", key, con, this.ProductDetails.productChannel[key].channelTypeId, this.state.chindex + 1);
                return {
                    id: key + 1,

                    Certification: <CustomInput labelText="" id="BusinessTypeText" required={true} value={this.state.avoOrgEmpEducation[key].certification} name="certification" onChange={(e) => this.SetTreatyDetailsValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    Year: <CustomInput labelText="" id="BusinessTypeText" required={true} value={this.state.avoOrgEmpEducation[key].year} name="year" onChange={(e) => this.SetTreatyDetailsValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    Grade: <CustomInput labelText="" id="BusinessTypeText" required={true} value={this.state.avoOrgEmpEducation[key].gradeOrPercentage} name="gradeOrPercentage" onChange={(e) => this.SetTreatyDetailsValue("alphaNumeric", e, key)} formControlProps={{ fullWidth: true }
                    } />,
                    Action: <div><Button justIcon round simple color="info" className="add" onClick={(e) => this.AddTreatyRecord(e, key)} ><Add /> </Button >
                    </div>
                };
            })
        });
        //}
    }
    onDateChange = (name, event) => {
        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let peopledetails = this.state.peopledetails1.avoOrgEmployee;
        peopledetails[name] = date;
        this.setState({ peopledetails });
        if (name == "dob") {
            this.handleDobvalidation();
        } else {
            this.handleDateValidation(name);
        }
        console.log("peopledetails", this.state.peopledetails1);
    };
    handleDateValidation = (name) => {
        //function fn_DateCompare(DateA, DateB) {     // this function is good for dates > 01/01/1970
        const userdob = this.state.peopledetails1.avoOrgEmployee.dob;
        const userdoj = this.state.peopledetails1.avoOrgEmployee.dateOfJoining;
        const dob = new Date(userdob);
        const doj = new Date(userdoj);
        const today = new Date();
        let date = this.state.peopledetails1;
        this.setState({ date });

        const msDatedob = Date.UTC(dob.getFullYear(), dob.getMonth() + 1, dob.getDate());
        const msDatedoj = Date.UTC(doj.getFullYear(), doj.getMonth() + 1, doj.getDate());
        const msDatetoday = Date.UTC(today.getFullYear(), today.getMonth() + 1, today.getDate());

        //if (parseFloat(msDatedob) == parseFloat(msDatedoj)) {
        //    swal("", "Date of Joining should not be equal to Date of Birth", "error");
        //}
        //if (parseFloat(msDatedoj) > parseFloat(msDatetoday)) {
        //    swal("", "Date of Joining should not be future date", "error");
        //}
        //if (parseFloat(msDatedob) > parseFloat(msDatetoday)) {
        //    swal("", "Date of Birth should not be future date", "error");
        //}
        //if (parseFloat(msDatedob) > parseFloat(msDatedoj)) {
        //    swal("", "Date of Birth should not be greater than Date of Joining", "error");

        //}
        if (name == "dateOfJoining") {
            //this.setState({ validdoj: true });
            let date = this.state.peopledetails1.avoOrgEmployee;
            date.dateOfJoining = new Date(this.state.peopledetails1.avoOrgEmployee.dateOfJoining).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
            this.setState({ date });
        }
        if (name == "appointmentDate") {
            //this.setState({ validdoj: true });
            let date = this.state.peopledetails1.avoOrgEmployee;
            date.appointmentDate = new Date(this.state.peopledetails1.avoOrgEmployee.appointmentDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
            this.setState({ date });
        }
    }
    handleDobvalidation = () => {
        var today = new Date();
        var birthDate = new Date(this.state.peopledetails1.avoOrgEmployee.dob);
        var calculatedage = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        console.log("age value", calculatedage);
        if (calculatedage < 18) {
            swal("", "Age of the user should not be less than 18 years", "error");
            let date = this.state.peopledetails1.avoOrgEmployee;
            date.dob = new Date(this.state.peopledetails1.avoOrgEmployee.dob).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
            this.setState({ date });
        }
        else {
            let dob = this.state.peopledetails1.avoOrgEmployee;
            dob.dob = new Date(this.state.peopledetails1.avoOrgEmployee.dob).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
            this.setState({ dob });
            this.setState({ validdob: true });
        }
    }

    render() {

        const { classes } = this.props;
        console.log("ppldet1", this.state.peopledetails1);
        return (
            <div>  {this.state.flag &&
                <GridContainer>
                    <GridItem >
                        <Card className="assignCard">
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <Icon><img id="icon" src={user} /></Icon>
                                </CardIcon>
                                {
                                    <GridItem>
                                        <h4><small>People</small></h4>
                                    </GridItem>
                                }
                            </CardHeader>
                            <CardBody>
                                <GridContainer lg={12} className="myprofile-component">
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            labelText="Employee Code"
                                            required={true}
                                            //id="staffCode"
                                            name='staffCode'
                                            value={this.state.peopledetails1.avoOrgEmployee.staffCode}
                                            onChange={(e) => this.SetValue(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <MasterDropdown
                                            //disabled={this.state.disabled}
                                            labelText="Salutation"
                                            required={true}
                                            id="SalutationId"
                                            lstObject={this.state.masterList}
                                            filterName='Salutation'
                                            value={this.state.peopledetails1.avoOrgEmployee.salutationId}
                                            name='salutationId'
                                            onChange={(e) => this.GetMasterData(e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            //disabled={this.state.disabled}
                                            error={this.state.peopledetails1.avoOrgEmployee.firstNameState}
                                            labelText="FirstName"
                                            required={true}
                                            id="fName"
                                            value={this.state.peopledetails1.avoOrgEmployee.firstName}
                                            name='firstName'
                                            onChange={(e) => this.SetValue(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            //disabled={this.state.disabled}
                                            labelText="MiddleName"
                                            id="mName"
                                            value={this.state.peopledetails1.avoOrgEmployee.middleName}
                                            name='middleName'
                                            onChange={(e) => this.SetValue(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            //disabled={this.state.disabled}
                                            labelText="LastName"
                                            id="lName"
                                            value={this.state.peopledetails1.avoOrgEmployee.lastName}
                                            name="lastName"
                                            onChange={(e) => this.SetValue(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <MasterDropdown
                                            //disabled={this.state.disabled}
                                            labelText="MaritalStatus"
                                            required={true}
                                            id="MaritalStatus"
                                            lstObject={this.state.masterList}
                                            filterName='MaritalStatus'
                                            value={this.state.peopledetails1.avoOrgEmployee.maritalStatusId}
                                            name='maritalStatusId'
                                            onChange={(e) => this.GetMasterData(e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <MasterDropdown
                                            //disabled={this.state.disabled}
                                            labelText="Gender"
                                            required={true}
                                            id="gender"
                                            lstObject={this.state.masterList}
                                            filterName='Gender'
                                            value={this.state.peopledetails1.avoOrgEmployee.genderId}
                                            name='genderId'
                                            onChange={(e) => this.GetMasterData(e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomDatetime style="ddl"
                                            //disabled={this.state.disabled}
                                            required={true}
                                            labelText="DateofBirth"
                                            id='dob'
                                            Futuredatevalidate={true}
                                            name='dob'
                                            onChange={(evt) => this.onDateChange('dob', evt)}
                                            value={this.state.peopledetails1.avoOrgEmployee.dob}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomDatetime style="ddl"
                                            //disabled={this.state.disabled}
                                            labelText="DateofJoining"
                                            id='doj'
                                            required={true}
                                            name='dateOfJoining'
                                            Futuredatevalidate={true}
                                            onChange={(evt) => this.onDateChange('dateOfJoining', evt)}
                                            value={this.state.peopledetails1.avoOrgEmployee.dateOfJoining}
                                            formControlProps={{ fullWidth: true }} />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            //disabled={this.state.disabled}
                                            //success={this.state.contactNumberState == "success"}
                                            //error={this.state.contactNumberState == "error"}
                                            error={this.state.contactNumberState}
                                            labelText="MobileNumber"
                                            id="No"
                                            required={true}
                                            name="phoneNumber"
                                            inputType="number"
                                            maxLength="10"
                                            value={this.state.peopledetails1.avoOrgEmployee.phoneNumber}
                                            onChange={(e) => this.SetValue(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            //disabled={this.state.disabled}
                                            // success={this.state.landLineOfficeState == "success"}
                                            //error={this.state.landLineOfficeState == "error"}
                                            labelText="LandlineOffice"
                                            placeholder="eg. 08026728730"
                                            id="No"
                                            name="phoneNumber1"
                                            inputType="number"
                                            value={this.state.peopledetails1.avoOrgEmployee.phoneNumber1}
                                            onChange={(e) => this.SetValue(e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            //success={this.state.landLineResidenceState == "success"}
                                            //error={this.state.landLineResidenceState == "error"}
                                            //disabled={this.state.disabled}
                                            labelText="LandlineResidence"
                                            placeholder="eg. 08026728730"
                                            id="No"
                                            name="landLineResidence"
                                            inputType="number"
                                            //pattern="[/^[0-9]\d{2,4}-\d{6,8}$/]"
                                            //value={this.state.UserData.landLineResidence}
                                            //onChange={(e) => this.SetValue("LandLineNumber", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            //disabled={true}
                                            //success={this.state.emailState == "success"}
                                            //error={this.state.emailState == "error"}
                                            //disabled={this.state.disabled}
                                            error={this.state.emailState}
                                            labelText="EmailID"
                                            required={true}
                                            id="mailId"
                                            value={this.state.peopledetails1.avoOrgEmployee.email}
                                            name='email'
                                            onChange={(e) => this.SetValue(e)}
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
                                            //required={true}
                                            id="panNo"
                                            //value={this.state.peopledetails1.avoOrgEmployee.panNo}
                                            //name="panNo"
                                            //onChange={(e) => this.SetValue("pan", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    {/* <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            //disabled={true}
                                            //success={this.state.emailState == "success"}
                                            //error={this.state.emailState == "error"}
                                            labelText="Designation"
                                            required={true}
                                            id="DesignationId"
                                            //value={this.state.UserData.email}
                                            //name='email'
                                            //onChange={(e) => this.SetValue("email", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>*/}
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomDatetime style="ddl"
                                            //disabled={this.state.disabled}
                                            labelText="Date of Appointment"
                                            id='AppointmentmentId'
                                            required={true}
                                            name='appointmentDate'
                                            Futuredatevalidate={true}
                                            onChange={(evt) => this.onDateChange('appointmentDate', evt)}
                                            value={this.state.peopledetails1.avoOrgEmployee.appointmentDate}
                                            formControlProps={{ fullWidth: true }} />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomDatetime style="ddl"
                                        //disabled={this.state.disabled}
                                        labelText="Recruitment No"
                                        id='recruitmentNo'
                                        //required={true}
                                        name='recruitmentNo'
                                        Futuredatevalidate={true}
                                        onChange={(e) => this.SetValue(e)}
                                        value={this.state.peopledetails1.avoOrgEmployee.recruitmentNo}
                                        formControlProps={{ fullWidth: true }} />
                                </GridItem>

                                    {/* <GridItem xs={12} sm={4} md={3}>
                                        <MasterDropdown
                                            disabled={this.state.disabled}
                                            labelText="Supervisor Name"
                                            required={true}
                                            id="Supervisor"
                                            lstObject={this.state.masterList}
                                            filterName=''
                                            //value={this.state.UserData.maritalStatusId}
                                            //name='maritalStatusId'
                                            //onChange={(e) => this.GetMasterData('MaritalStatus', 'Userdata', e)}
                                            formControlProps={{ fullWidth: true }}
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
                                //value={this.state.UserData.branchName}
                                //name='branchName'
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
                        </GridItem> */}
                                    {this.state.partnervisible ? <GridItem xs={12} sm={4} md={3}>
                                        <CustomInput
                                            labelText="PartnerName"
                                            id="No"
                                            disabled={true}
                                            //name="partnerName"
                                            //value={this.state.peopledetails.partnerName}
                                            //onChange={(e) => this.SetValue("string", e)}
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
                                <UserAddress avoOrgEmpAddress={this.state.avoOrgEmpAddress} radiodisable={this.state.radiodisable} addressradioVal={this.state.addressradioVal} disable={this.state.disable} classes={this.classes} handleAddressRadioChange={this.handleAddressRadioChange} SetValue={this.SetValue} GetLocation={this.GetLocation} LocationDTO={this.state.LocationDTO} AddData={this.AddData} tableData={this.state.tableData} avoOrgEmpEducation={this.state.avoOrgEmpEducation} peopledetails1={this.state.peopledetails1} />

                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                {/*<UserAddress UserAddress={this.state.UserAddress} radiodisable={this.state.radiodisable} addressradioVal={this.state.addressradioVal} disable={this.state.disable} classes={this.classes} handleAddressRadioChange={this.handleAddressRadioChang e} SetValue={this.SetValue} GetLocation={this.GetLocation} LocationDTO={this.state.LocationDTO} />*/}
                                {this.state.showdesignation ?
                                    <GridContainer>
                                        <GridItem xs={12} sm={4} md={3}>
                                            <h4>Organization: {this.state.mappingdetails.organization}</h4>
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={3}>
                                            <h4>Office: {this.state.mappingdetails.office}</h4>
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={3}>
                                            <h4>Designation: {this.state.mappingdetails.designation}</h4>
                                        </GridItem>
                                    </GridContainer>
                                    :
                                    <MappingDetails peopledetails1={this.state.peopledetails1} masterList1={this.state.masterList1} GetMasterData1={this.GetMasterData1} offmasterList={this.state.offmasterList} GetLocation1={this.GetLocation1} positionmasterList={this.state.positionmasterList} SetddlValue={this.SetddlValue} supervisor={this.state.supervisor} newmasterList={this.state.newmasterList} />
                                }
                            </CardBody>
                        </Card>
                    {this.state.flagsave &&
                        <GridContainer justify="center">
                            <Button round /*disabled={this.state.btnload}*/ align="center" color="success" onClick={this.handleSubmit}>Submit</Button>
                            {/* {this.state.btnload ? <CircularProgress id="progress-bar" size={25} /> : null}*/}
                        </GridContainer>}
                    {this.state.flagUpdate &&
                        <GridContainer justify="center">
                           
                        <Button round /*disabled={this.state.btnload}*/ align="center" color="success" onClick={this.handleUpdate} >Update</Button>

                            

                        </GridContainer>}
                    </GridItem>
                </GridContainer>
            }
            </div>

        );
    }
}
export default withStyles(style)(People);
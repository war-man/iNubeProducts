import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Modal from '@material-ui/core/Modal';
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Select from '@material-ui/core/Select';
import { Redirect } from 'react-router-dom'
import { Paper, Divider } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MuiButton from '@material-ui/core/Button';
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Car from "assets/img/Car.jpg";
import Bike from "assets/img/Bike.png";
import AddCircle from '@material-ui/icons/AddCircle';
import Delete from '@material-ui/icons/Delete';
import Scheduler from './Scheduler.jsx';
import Dashboard from './Dashboard.jsx';
import EdelweissConfig from "./EdelweissConfig.js";
import Visibility from "@material-ui/icons/Visibility";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dropzone from 'react-dropzone-uploader';
import Autocomplete from '@material-ui/lab/Autocomplete';
import $ from 'jquery';

const Styledivider = withStyles({
    root: {
        color: "#000",
        width: '67rem',
        height: '0.1rem',
    }
})(Divider);

const StyleButton = withStyles({
    root: {
        fontSize: '12px',
        //color:'#ddd'
    },
    //label: {
    //    textTransform: 'capitalize',
    //    color: 'white'
    //},
})(MuiButton);

const StyleAutocomplete = withStyles({
    root: {
        //width: "13rem",
        //background: '#e7ab37ad !important',
        //borderTopLeftRadius: '5px',
        //borderTopRightRadius: '5px',
    },
    label: {
        color: 'black !important'
    },
})(Autocomplete);

const Styleinput = withStyles({
    root: {
        //background: '#e7ab37ad !important',
        //background: '#fff !important',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px'
    },
    //input: {
    //    color:'white'
    //},
    label: {
        //    textTransform: 'capitalize',
        color: 'black !important'
    },
})(TextField);

class LogonVehicle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vehicleMakeModel: "",
            vehiclearray: [],
            vehicles: [],
            vehicleno: "",
            vehiclestype: "",
            vehiclecount: "",
            policynumber: "",
            suminsured: "",
            proposalno: "",
            schedule: {
                vehicleRegistrationNo: "",
                policyNo: "",
                vehicleType: "",
                mon: false,
                tue: false,
                wed: false,
                thu: false,
                fri: false,
                sat: false,
                sun: false,
                switchStatus: false,
                switchEnabled: false,
            },
            createschedule: {
                vehicleRegistrationNo: "",
                policyNo: "",
                vehicleType: "",
                mon: false,
                tue: false,
                wed: false,
                thu: false,
                fri: false,
                sat: false,
                sun: false,
            },
            mobileno: "",

            sum: "",
            gsttax: "",
            adprem: "",
            firetheft: "",
            premiumperday: "",
            showpremium: false,
            masterList: [],
            disable: false,
            openvehicle: false,
            open: false,
            deletevehicle: false,
            Novehicles: false,
            openaddvehicle: false,
            // Calculate premium response
            perDayPremium: "",
            fireTheft: "",
            adPremium: "",
            gst: "",
            total: "",
            monthlyPremium: "",
            //
            proposalDetails: {
                "InsurableItem": [
                    {
                        "InsurableName": "",
                        "RiskCount": 0,
                        "RiskItems": [],
                        "Covers": []
                    },
                    {
                        "InsurableName": "",
                        "RiskCount": 0,
                        "RiskItems": [],
                        "Covers": [
                            {
                                "CoverName": "Fire & Theft",
                                "CoverFields": [
                                    {
                                        "Cover Name": "Fire & Theft",
                                        "CEF Value": "0"
                                    }
                                ]
                            },
                            {
                                "CoverName": "Accidental Damage",
                                "CoverFields": [
                                    {
                                        "Cover Name": "Accidental Damage",
                                        "CEF Value": "0"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "Identification Number": "",
                "Name": "",
                "Product Code": "",
                "No. Of Risks": 0,
                "Policy Start Date": "",
                "Mobile Number": "",
                "Policy End Date": "",
                "Email ID": "",
                "stateCode": "",
                "si": 0,
                "noOfPC": 0,
                "noOfTW": 0,
                "driverAge": 0,
                "driverExp": 0,
                "additionalDriver": 1,
                "billingFrequency": "",
                "PaymentInfo": [
                    {
                        "RefrenceNumber": 0,
                        "Amount": 0
                    }
                ],
                "PaymentInfoDeatils": {
                    "PerDayPremium": 0,
                    "FireTheft365": 0,
                    "ADPremium": 0,
                    "GST": 0,
                    "Total": 0,
                    "MonthlyPremium": 0
                },
                "ProposalNo": 0,
                "PolicyNumber": 0
            },
            selectedamount: "",
            drivercount: 1,
            selectedSI: 0,
            opendialog: false,
            suminsuredamount: [
                { mID: 1, mValue: "600000", label: "6,00,000" },
                { mID: 2, mValue: "700000", label: "7,00,000" },
                { mID: 3, mValue: "800000", label: "8,00,000" },
                { mID: 4, mValue: "900000", label: "9,00,000" },
                { mID: 5, mValue: "1000000", label: "10,00,000" },
                { mID: 6, mValue: "1100000", label: "11,00,000" },
                { mID: 7, mValue: "1200000", label: "12,00,000" },
                { mID: 8, mValue: "1300000", label: "13,00,000" },
                { mID: 9, mValue: "1400000", label: "14,00,000" },
                { mID: 10, mValue: "1500000", label: "15,00,000" },
                { mID: 11, mValue: "1600000", label: "16,00,000" },
                { mID: 12, mValue: "1700000", label: "17,00,000" },
                { mID: 13, mValue: "1800000", label: "18,00,000" },
                { mID: 13, mValue: "1900000", label: "19,00,000" },
                { mID: 14, mValue: "2000000", label: "20,00,000" },
            ],
            claims: 0,
            index: "",
            policyno: "",
            bsi: 0,
            VehiclesList: [],
            RiskObj: {
                "Model": "",
                "VehicleNumber": "",
                "Identification Number": "123",
                "YearofRegistration": "",
                "VehicleType": "",
                "Documents": [],
            },
            endorsementPremiumDTO: {
                "policyNo": "",
                "si": "",
                "pcCount": 0,
                "twCount": 0,
                "typeOfEndorsement": "Addition",
                "endorsementEffectiveDate": ""
            },
            endorsementpremium: {
                "policyNo": "",
                "si": "",
                "pcCount": 0,
                "twCount": 0,
                "typeOfEndorsement": "Deletion",
                "endorsementEffectiveDate": ""
            },
            deleteEndorsement: {
                "SI": "",
                "PolicyNumber": "",
                "EndorsementType": "Deletion of vehicle",
                "InsurableItem": [
                    {
                        "InsurableName": "Vehicle",
                        "RiskItems": [
                            {
                            }
                        ]
                    }
                ]
            },
            policyIssueRqstDto: {},
            premiumDTO: {
                "stateCode": "",
                "si": 0,
                "noOfPC": 0,
                "noOfTW": 0,
                "driverAge": "",
                "driverExp": "",
                "additionalDriver": "1",
                "billingFrequency": ""
            },
            emptyarray: [],
            typevehicle: "",
            endorsementVehDTO: {
                "SI": "",
                "PolicyNumber": "",
                "EndorsementType": "Addition of vehicle",
                "InsurableItem": [
                    {
                        "InsurableName": "Vehicle",
                        "RiskItems": []
                    }
                ]
            },
            showvehicles: false,
            scheduledatadto: {},
            //{ "perDayPremium": 65, "fireTheft365": 2754, "adPremium": 3426, "gst": 1112, "total": 7292, "monthlyPremium": 308 }
        };
    }

    handleCheckbox = (e) => {
        let scheduler = this.state.schedule;
        let name = e.target.name;
        let checked = e.target.checked;

        scheduler[name] = checked;

        this.setState({ scheduler });
        console.log("scheduler: ", scheduler);

        //if (name == "switchStatus") {
        //    if (scheduler.switchStatus == true) {
        //        let object = this.state.scheduleobject;
        //        object.switchState = scheduler.switchStatus;
        //        object.policyNo = this.state.policynumber;
        //        object.vehicleRegistrationNo = this.state.vehicleno;
        //        this.setState({ object });
        //        fetch(`${EdelweissConfig.Edelweiss}/api/Mica_EGI/SwitchOnOff`, {
        //            method: 'post',
        //            headers: {
        //                'Accept': 'application/json',
        //                'Content-Type': 'application/json',
        //                'Authorization': localStorage.getItem('edelweisstoken')
        //            },
        //            body: JSON.stringify(object)
        //        }).then(response => response.json())
        //            .then(data => {
        //                console.log('response: ', data);
        //                swal({
        //                    text: data.responseMessage,
        //                    icon: "success"
        //                })
        //            });
        //    }
        //}
    }

    handleSubmit = () => {
        console.log("schedular: ", this.state.schedule);

        fetch(`${EdelweissConfig.Edelweiss}/api/Mica_EGI/CreateUpdateSchedule`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('edelweisstoken')
            },
            body: JSON.stringify(this.state.schedule)
        }).then(response => response.json())
            .then((data) => {
                console.log("response ", data);

                if (data.status == 1) {
                    swal({
                        text: "Schedule updated successfully!",
                        icon: "success"
                    })
                    this.handleClose();
                }
                else {
                    swal({
                        text: data.responseMessage,
                        icon: "error"
                    })
                }
            });

    }

    componentDidMount() {

        const edelweisstoken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhOTVkMDNjZC1kZjE4LTQ3NTYtYTU3Ny0zNDEyYjY4MTdkZDAiLCJFbWFpbCI6InNhbmRoeWFAZ21haWwuY29tIiwiT3JnSWQiOiIyNzciLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6InNhbmRoeWEiLCJVc2VyTmFtZSI6InNhbmRoeWFAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjEiLCJleHAiOjE2NzU0OTkyOTksImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.2oUTJQBxiqqqgl2319ZCREz1IyYHjVRhlDehI__O8Xg';
        localStorage.setItem('edelweisstoken', edelweisstoken);

        this.setState({ selectedSI: this.state.suminsuredamount[0].mValue })
        if (this.props.location.state != undefined) {
            if (this.props.location.state.policyNo != undefined || this.props.location.state.policyNo != "") {
                this.handlePolicyDetails(this.props.location.state.policyNo);
            } else {
                this.handlePolicyDetails(this.props.location.state.scheduleDTO.policyNo);
            }

            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI5NTc4NmM2OS0xNjAxLTQzMGQtODM1Ni01M2RlNDUyZjUxZTYiLCJFbWFpbCI6InZpdGFsQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJEZW1vIFJvbGUiLCJOYW1lIjoidml0aGFsIiwiVXNlck5hbWUiOiJ2aXRhbEBpbnViZXNvbHV0aW9ucy5jb20iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMSIsImV4cCI6MTY3MDY1NDMzMCwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.nZsItQ97TGtSZ-IrZ8SlDeOCIKnaCI4tmeLC953z9qA';
            localStorage.setItem('Token', token);
        }

        console.log("extension  ", localStorage.getItem('edelweisstoken'));
        //fetch(`${EdelweissConfig.Edelweiss}/api/Mica_EGI/GetSchedule?VehicleRegistrationNo=` + this.props.vehicleno + `&PolicyNo=` + this.props.policynumber + ``, {
        fetch(`${EdelweissConfig.Edelweiss}/api/Mica_EGI/GetVehicleMaster?isFilter=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('edelweisstoken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ masterList: data });
            });


    }

    handlePolicyDetails = (policynum) => {

        //this.setState({ vehiclearray: this.state.emptyarray, vehicles: this.state.emptyarray })

        //console.log("vehh")

        fetch(`${EdelweissConfig.PolicyConfigUrl}/api/Policy/GetProposalPolicyDetail?policyno=` + policynum + ``, {
            //fetch(`${EdelweissConfig.PolicyConfigUrl}/api/Policy/GetProposalPolicyDetail?policyno=750000119`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Token')
            },
        }).then(response => response.json())
            .then(data => {
                console.log('response: ', data);
                this.setState({ proposalDetails: data });
                console.log('response: ', this.state.proposalDetails);
                console.log('response: ', data.PolicyNo);
                if (data.InsurableItem.length !== 0) {
                    this.setState({ Novehicles: true });
                }
                this.setState({
                    vehiclearray: data.InsurableItem,
                    proposalno: data.ProposalNo,
                    policynumber: data.PolicyNumber,
                    suminsured: data.si
                });
                let premium = this.state.premiumDTO;
                premium.stateCode = data.stateCode;
                premium.si = data.si;
                this.state.bsi = data.si;
                premium.noOfPC = data.noOfPC;
                premium.noOfTW = data.noOfTW;
                premium.driverAge = data.driverAge;
                premium.driverExp = data.driverExp;
                premium.additionalDriver = data.additionalDriver;
                premium.billingFrequency = data.billingFrequency;
                this.setState({ premium, selectedamount: data.si, duplicatepremiumDTO: this.state.premiumDTO });
                console.log("page ", premium)
                console.log("page ", this.state.vehiclearray);
                for (let i = 0; i < this.state.vehiclearray.length; i++) {
                    console.log("data:", this.state.vehiclearray[i].InsurableName);
                    console.log("data: ", this.state.vehiclearray[i])
                    if (this.state.vehiclearray[i].InsurableName === "Vehicle") {
                        for (let j = 0; j < this.state.vehiclearray[i].RiskItems.length; j++) {
                            this.state.vehicles.push(this.state.vehiclearray[i].RiskItems[j]);
                        }
                        //this.setState({ vehicles: this.state.vehiclearray[i].RiskItems });
                        this.setState({ vehiclecount: this.state.vehicles.length });
                    }
                }
                console.log("count", this.state.vehiclecount);
                console.log("vehicles page: ", this.state.vehicles);
                console.log("vehicles:", this.state.vehicles[0])
                console.log("proposal", this.state.policynumber)
                //this.setState({ schedule: data.getSchedule });
            });
    }

    handlecreateSchedule = () => {
        console.log("scheduleDTO: ", this.state.createschedule);
        fetch(`${EdelweissConfig.Edelweiss}/api/Mica_EGI/CreateUpdateSchedule`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('edelweisstoken')
            },
            body: JSON.stringify(this.state.createschedule)
        }).then(response => response.json())
            .then(data => {
                swal({
                    text: "Schedule Created Successfully!",
                    icon: "success",
                    buttons: [false, "OK"],
                }).then((willDelete) => {
                    if (willDelete) {
                        this.handlepagereload();
                    }
                });
                console.log("dddd", data);
            })
    }

    handlepagereload = () => {
        window.location.reload();
    }

    handleOpen = (item) => {
        console.log("data", item, this.state.policynumber);
        fetch(`${EdelweissConfig.Edelweiss}/api/Mica_EGI/GetSchedule?VehicleRegistrationNo=` + item + `&PolicyNo=` + this.state.policynumber + ``, {
            //fetch(`${EdelweissConfig.Edelweiss}/api/Mica_EGI/GetSchedule?VehicleRegistrationNo=KA01EQ9767&PolicyNo=750000109`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('edelweisstoken')
            },
        }).then(response => response.json())
            .then(data => {
                console.log('response: ', data);
                if (data.getSchedule != null) {
                    this.setState({ schedule: data.getSchedule });

                }
                this.setState({ open: true });
            });
    }

    handleopenaddvehicle = () => {
        this.setState({ open1: true })
        let risk = this.state.RiskObj;

        risk.VehicleNumber = "";
        risk.Model = "";
        risk.YearofRegistration = "";

        this.setState({ risk });
        console.log("riskobj", this.state.RiskObj)
        console.log("riskobj", risk)
        this.setState({ openaddvehicle: true });
    }

    handleCloseaddvehicle = () => {
        let newvehicle = this.state.RiskObj;
        newvehicle.IdentificationNumber = "";
        newvehicle.VehicleNumber = "";
        newvehicle.VehicleType = "";
        newvehicle.YearofRegistration = "";
        newvehicle.Model = "";
        this.setState({ openaddvehicle: false, newvehicle });
    }

    handleDeleteclose = () => {
        this.setState({ deletevehicle: false });
        this.setState({ duplicatepremiumDTO: this.state.premiumDTO, index: "" });
    }

    handlecloseDialog = () => {
        this.setState({ opendialog: false });
    }

    handleaddcloseDialog = () => {
        this.setState({ opendialog: false });
    }

    confirm = () => {
        this.setState({ showvehicles: true })
        this.state.VehiclesList.push(this.state.RiskObj);
        let risk = this.state.RiskObj;

        let addvehicle = this.state.endorsementVehDTO;
        for (var i = 0; i < this.state.VehiclesList.length; i++) {
            if (addvehicle.InsurableItem[0].InsurableName == "Vehicle") {
                addvehicle.InsurableItem[0].RiskItems.push(this.state.RiskObj);
            }

            console.log("this.state.endorsementVehDTO.", this.state.endorsementVehDTO);
        }
        addvehicle.SI = this.state.suminsured.toString();
        addvehicle.PolicyNumber = this.state.policynumber;
        addvehicle.InsurableItem[0].RiskItems[0].VehicleType = this.state.typevehicle;
        addvehicle.InsurableItem[0].RiskItems[0]["Identification Number"] = (this.state.vehiclecount + 1).toString();
        this.setState({ addvehicle });

        let newschedule = this.state.createschedule;
        newschedule.policyNo = this.state.policynumber;
        newschedule.vehicleRegistrationNo = this.state.RiskObj.VehicleNumber;
        newschedule.vehicleType = this.state.typevehicle;
        this.setState({ newschedule })

        fetch(`${EdelweissConfig.PolicyConfigUrl}/api/Policy/PolicyEndoresemenet`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Token')
            },
            body: JSON.stringify(addvehicle)
        }).then(response => response.json())
            .then(data => {
                if (data.status == 3) {
                    swal({
                        text: "policy endorsement for" + " " + data.id + " " + "has been issued successfully",
                        icon: "success"
                    })
                    this.handleCloseaddvehicle();
                    this.handlecreateSchedule();

                }
            })
        this.setState({ vehicles: this.state.emptyarray });
        //this.handlePolicyDetails(this.state.policynumber);
    }

    handleopenDialog = () => {
        this.setState({ opendialog: true });
    }

    handleView = (vehiclenum, vehicletype) => {
        this.setState({ openvehicle: true, vehicleno: vehiclenum, vehiclestype: vehicletype });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleviewClose = () => {
        this.setState({ openvehicle: false });
    }

    handleDeleteVehicle = () => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + (today.getHours()) + ':' + (today.getMinutes()) + ':' + (today.getSeconds());
        let premiumdata = this.state.endorsementpremium;
        let premium = this.state.premiumDTO;
        if (this.state.vehiclestype === "TW") {
            premium.noOfTW = 1;
            premiumdata.twCount = 1;
        }
        if (this.state.vehiclestype === "PC") {
            premium.noOfPC = 1;
            premiumdata.pcCount = 1;
        }
        this.setState({ deletevehicle: false, premium })

        console.log("index: ", this.state.index);

        premiumdata.si = premium.si;
        premiumdata.policyNo = this.state.policynumber;
        premiumdata.endorsementEffectiveDate = date;

        console.log("vehicle: ", this.state.vehicles[this.state.index]);

        let vehicle = this.state.vehicles;

        let deletevehicles = this.state.deleteEndorsement;
        deletevehicles.InsurableItem[0].RiskItems = [];
        deletevehicles.SI = premium.si.toString();
        deletevehicles.PolicyNumber = this.state.policynumber;
        deletevehicles.EndorsementType = "Deletion of vehicle";
        deletevehicles.InsurableItem[0].RiskItems.push(vehicle[this.state.index]);

        vehicle = vehicle.filter(item => item !== vehicle[this.state.index]);

        this.setState({ deletevehicles, deletevehicle: false, vehicle });

        console.log("delete vehilce: ", deletevehicles);
        console.log("delete vehilce: ", vehicle);
        this.CalCulateEndorsementPremium(premiumdata);
        this.DeleteEndorsement(deletevehicles);

        this.setState({ vehicles: this.state.emptyarray });
        //this.handlePolicyDetails(this.state.policynumber);
    }

    DeleteEndorsement = (endorsementdto) => {
        debugger;
        fetch(`${EdelweissConfig.PolicyConfigUrl}/api/Policy/PolicyEndoresemenet`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('Token')
            },
            body: JSON.stringify(endorsementdto)
        }).then(response => response.json())
            .then(data => {
                console.log("premdata", data);
                if (data.status == 4) {
                    swal({
                        text: data.responseMessage,
                        icon: "success",
                        buttons: [false, "OK"],
                    }).then((willDelete) => {
                        if (willDelete) {
                            this.handlepagereload();
                        }
                    });
                }
                else {
                    swal({
                        text: data.responseMessage,
                        icon: "error"
                    })
                }
                //this.state.perDayPremium = data.perDayPremium;
                //this.state.fireTheft = data.fireTheft;
                //this.state.adPremium = data.adPremium;
                //this.state.gst = data.gst;
                //this.state.total = data.total;
                //this.state.monthlyPremium = data.monthlyPremium;
                //this.setState({});

                //let premperday = data.perDayPremium;
                //let ft365 = data.fireTheft365;
                //let adprem = data.adPremium;
                //let gstt = data.gst;
                //this.state.policyRequest.PaymentInfo[0].Amount = data.total;
                //this.setState({ premiumperday: premperday, ft365days: ft365, adpremium: adprem, gsttax: gstt});
            });
    }

    handleCalculateendorsementpremium = () => {
        fetch(`${EdelweissConfig.Edelweiss}/api/Mica_EGI/EndorsementPremium`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('edelweisstoken')
            },
            body: JSON.stringify(this.state.endorsementPremiumDTO)
        }).then(response => response.json())
            .then(data => {
                console.log("calendorsement", data)
                console.log("respdata", data.response);
                this.setState({ proposalNo: data.id, premiumperday: data.perDayPremium, firetheft: data.fireTheft, adprem: data.adPremium, gsttax: data.gst, sum: data.total })
                this.setState({ showpremium: true });
                if (data.status == 2) {
                    swal({
                        //let res = partnerId.toString();
                        //text: data.responseMessage,
                        //icon: "success"
                    });
                } else {
                    //swal({
                    //    text: data.responseMessage,
                    //    icon: "error"
                    //});
                }
            });
    }

    EndorsementPremium = () => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + (today.getHours()) + ':' + (today.getMinutes()) + ':' + (today.getSeconds());
        let endorsement = this.state.endorsementPremiumDTO;
        if (this.state.typevehicle == "PC") {
            endorsement.pcCount = 1;
            this.setState({ showvehicles: true, endorsement })
        }
        if (this.state.typevehicle == "TW") {
            endorsement.twCount = 1;
            this.setState({ showvehicles: true, endorsement })
        }
        endorsement.policyNo = this.state.policynumber;
        endorsement.si = this.state.selectedamount;
        endorsement.endorsementEffectiveDate = date;
        this.setState({ endorsement })
        this.handleCalculateendorsementpremium();
    }

    showOnClick = (evt) => {
        this.setState({ showDropZone: true })
    }

    handleDeleteopen = (vehicleno, vehiclestype, key) => {
        debugger;
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + (today.getHours()) + ':' + (today.getMinutes()) + ':' + (today.getSeconds());
        this.state.vehiclestype = vehiclestype;
        let premium = this.state.duplicatepremiumDTO;
        let premiumdata = this.state.endorsementpremium;
        if (this.state.vehiclestype === "TW") {
            premium.noOfTW = 1;
            premiumdata.twCount = 1;
        }
        if (this.state.vehiclestype === "PC") {
            premium.noOfPC = 1;
            premiumdata.pcCount = 1;
        }
        this.state.index = key;
        this.setState({ deletevehicle: true, premium, });
        console.log("index", this.state.index);

        premiumdata.si = premium.si;
        premiumdata.policyNo = this.state.policynumber;
        premiumdata.endorsementEffectiveDate = date;
        console.log("premiumdata: ", premiumdata);
        this.CalCulateEndorsementPremium(premiumdata);
    }

    handleaddVehicle = () => {
        this.setState({ openaddvehicle: true });
    }

    onInputChange = (evt) => {
        const Data = this.state.RiskObj;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
    }

    CalCulateEndorsementPremium(premiumDTO) {

        fetch(`${EdelweissConfig.Edelweiss}/api/Mica_EGI/EndorsementPremium`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('edelweisstoken')
            },
            body: JSON.stringify(premiumDTO)
        }).then(response => response.json())
            .then(data => {
                console.log("premdata", data);
                //if (data.status == 8) {
                //    swal({
                //        text: data.responseMessage,
                //        icon:"error"
                //    })
                //}
                //this.state.perDayPremium = data.perDayPremium;
                //this.state.fireTheft = data.fireTheft;
                //this.state.adPremium = data.adPremium;
                //this.state.gst = data.gst;
                //this.state.total = data.total;
                //this.state.monthlyPremium = data.monthlyPremium;
                //this.setState({});

                //let premperday = data.perDayPremium;
                //let ft365 = data.fireTheft365;
                //let adprem = data.adPremium;
                //let gstt = data.gst;
                //this.state.policyRequest.PaymentInfo[0].Amount = data.total;
                //this.setState({ premiumperday: premperday, ft365days: ft365, adpremium: adprem, gsttax: gstt});
            });
    }

    handleCity = (event, values, name) => {
        if (name == "vehicleMakeModelId") {
            let vehicletype = this.state.masterList.filter(x => x.mID == values.mID)[0].mType;
            let makemodel = this.state.masterList.filter(x => x.mID == values.mID)[0].mValue;
            this.state.RiskObj.Model = makemodel;
            this.setState({ typevehicle: vehicletype, makeModel: makemodel })
            console.log("this.state.vehicleType", this.state.typevehicle, this.state.makeModel);

            //if (name == "vehicleMakeModelId") {
            //    quotation[name] = values.mID;
            //}
            //this.setState({ quotation });

        }
    }

    uploadfilefront = (files) => {
        let obj = this.state.RiskObj;
        var data = new FormData();
        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                data.append(files[i].file.name, files[i].file, files[i].file.size);

            }
        }

        $.ajax({
            type: "POST",
            //url: `http://localhost:53000/api/DMS/UploadFile`,
            url: `https://inubeservicesnotification.azurewebsites.net/api/DMS/Documentupload/Documentupload`,
            // url: `https://inubeservicesnotification.azurewebsites.net/api/DMS/MobileDocumentupload/MobileDocumentupload`,
            contentType: false,
            processData: false,

            data: data,
            beforeSend: function (data, xhr) {
                /* Authorization header */
                //xhr.setRequestHeader("Authorization", 'Bearer ' + localStorage.getItem('userToken'));
            },
            success: function (data, message) {
                console.log("dddata", data);
                let docObj = [
                ]
                for (var i = 0; i < data.dMSDTOs.length; i++) {

                    docObj.push(data.dMSDTOs[i]);
                }
                console.log("docobj", docObj);
                for (var i = 0; i < docObj.length; i++) {
                    let x = {};
                    x.docId = docObj[i].docId;
                    x.fileName = docObj[i].fileName;
                    let mainobj = obj.Documents;
                    mainobj.push(x);

                    console.log("docobj", mainobj);
                }
                swal({
                    text: "Document Uploaded Successful",
                    icon: "success"
                });
            },
            error: function (message) {

                swal({
                    text: "Document Upload Failed",
                    icon: "error"
                });
            }
        });
        this.setState({});
        console.log("this.state.Riskobj", this.state.RiskObj);
    }

    handleaddselectedSI = (e, key) => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + (today.getHours()) + ':' + (today.getMinutes()) + ':' + (today.getSeconds());
        let premiumendorse = this.state.endorsementPremiumDTO;
        this.state.selectedSI = this.state.suminsuredamount[key].mValue;
        this.setState({ selectedSI: this.state.suminsuredamount[key].mValue, selectedamount: this.state.suminsuredamount[key].label, premiumendorse, opendialog: false });
        premiumendorse.si = this.state.selectedSI;
        premiumendorse.endorsementEffectiveDate = date;
        console.log("state.endorsementPremium", this.state.endorsementPremiumDTO);
        this.handleCalculateendorsementpremium();
    }

    getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    handleselectedSI = (e, key) => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + (today.getHours()) + ':' + (today.getMinutes()) + ':' + (today.getSeconds());

        let suminsu = this.state.premiumDTO;

        suminsu.si = this.state.suminsuredamount[key].mValue;
        this.setState({ selectedSI: this.state.suminsuredamount[key].mID, selectedamount: this.state.suminsuredamount[key].label, suminsu, opendialog: false });

        let premiumdata = this.state.endorsementpremium;
        premiumdata.si = suminsu.si;
        premiumdata.policyNo = this.state.policynumber;
        premiumdata.endorsementEffectiveDate = date;
        console.log("deletevehicle: ", premiumdata)
        this.CalCulateEndorsementPremium(premiumdata)
        //this.CalCulatePremium(this.state.drivercount, this.state.premiumDTO);
    }

    renderRedirect = () => {
        if (this.state.redirectto === true) {
            return <Redirect to={{
                pathname: '/pages/Dashboard',
            }} />
        }
        else if (this.state.redirectback === true) {
            return <Redirect to={{
                pathname: '/pages/ProceedPayment',

            }} />
        }
    }

    render() {
        const { classes, loggingIn } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={8}>
                        <Card>
                            <CardBody>{this.state.Novehicles ?
                                <GridContainer>
                                    <GridContainer justify="center">
                                        <h4 style={{ right: '7rem', position: 'relative' }}>Policy Number: {this.state.policynumber}</h4> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <h4 style={{ left: '7rem', position: 'relative' }}>SI: {this.state.suminsured}</h4>
                                    </GridContainer>
                                    <GridContainer justify="center">
                                        <h4 style={{ right: '9rem', position: 'relative' }}>No. of Claim: {this.state.claims}</h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <h4 style={{ left: '10rem', position: 'relative' }}>BSI: {this.state.bsi}</h4>
                                    </GridContainer>
                                    <GridContainer justify="center">
                                        <Divider style={{ width: '44rem', height: '0.2rem', }} />
                                    </GridContainer>

                                    <GridContainer justify="center">
                                        {this.state.vehicles.map(function (item, key) {
                                            return (
                                                <GridContainer justify="center">
                                                    {item.VehicleType == "PC" ?
                                                        <img src={Car} id="carbikeimage" onClick={() => this.handleOpen(item.VehicleNumber)} />
                                                        : <img src={Bike} id="carbikeimage" onClick={() => this.handleOpen(item.VehicleNumber)} />
                                                    }
                                                    <h4 id="headertag1">{item.Make}&nbsp;&nbsp;{item.Model}</h4>
                                                    <h4 id="headertag2">{item.VehicleNumber}</h4>
                                                    <IconButton onClick={() => this.handleView(item.VehicleNumber, item.VehicleType)} ><Visibility /></IconButton>
                                                    <IconButton onClick={() => this.handleDeleteopen(item.VehicleNumber, item.VehicleType, key)}><Delete /></IconButton>
                                                </GridContainer>
                                            );
                                        }.bind(this))
                                        }
                                    </GridContainer>
                                    {this.state.showvehicles ? <GridContainer>
                                        {this.state.VehiclesList.map(function (item, key) {
                                            return (
                                                <GridContainer justify="center">
                                                    <img src={Car} style={{ width: "10rem" }} onClick={() => this.handleOpen(item.VehicleNumber)} />
                                                    <h4 style={{ left: '1rem', top: '0.7rem', position: 'relative' }}>{item.Model}</h4>
                                                    <h4 style={{ right: '6rem', top: '2.3rem', position: 'relative' }}>{item.VehicleNumber}</h4>
                                                    <IconButton onClick={() => this.handleView(item.VehicleNumber, item.VehicleType)} ><Visibility /></IconButton>
                                                    <IconButton onClick={() => this.handleDeleteopen(item.VehicleNumber, item.VehicleType, key)}><Delete /></IconButton>
                                                </GridContainer>
                                            );
                                        }.bind(this))
                                        }
                                    </GridContainer> : null}
                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={this.state.openvehicle}
                                        onClose={this.handleviewClose}>
                                        <GridContainer justify="center">
                                            <GridItem xs={6}>
                                                <Card >
                                                    <div>
                                                        <h4 style={{ textAlign: 'center' }}>Select Cover Days</h4>
                                                        <Button
                                                            color="primary"
                                                            round
                                                            style={{ left: '37rem', top: '-2.95rem' }}
                                                            onClick={this.handleviewClose}>
                                                            &times;
                                                        </Button>
                                                    </div>
                                                    <div id='disp'>
                                                        <Dashboard vehicleno={this.state.vehicleno} vehiclestype={this.state.vehiclestype} openvehicle={this.state.openvehicle} suminsured={this.state.suminsured} policynumber={this.state.policynumber} />
                                                    </div>
                                                </Card>
                                            </GridItem>
                                        </GridContainer>
                                    </Modal>
                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={this.state.deletevehicle}
                                        onClose={this.handleDeleteclose}>
                                        <GridContainer justify="center">
                                            <GridItem xs={6}>
                                                <Card >
                                                    <div>
                                                        <h4 style={{ textAlign: 'center' }}>Select Cover Days</h4>
                                                        <Button
                                                            color="primary"
                                                            round
                                                            style={{ left: '37rem', top: '-2.95rem' }}
                                                            onClick={this.handleDeleteclose}>
                                                            &times;
                                                        </Button>
                                                    </div>
                                                    <div id='disp'>
                                                        <GridContainer xs={6} justify="center">
                                                            <h3 style={{ right: '4rem', position: 'relative' }}>Selected Vehicle:  {this.state.vehiclestype}</h3>
                                                            <GridContainer justify="center">
                                                                <h3> Select your premium</ h3>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <Button variant="outlined" round size="large" color="warning" onClick={this.handleopenDialog}>{this.state.selectedamount}</Button>
                                                                <Dialog style={{ textAlign: "center" }} onClose={this.handlecloseDialog} aria-labelledby="simple-dialog-title" open={this.state.opendialog} >
                                                                    <DialogTitle id="simple-dialog-title"> <b>Sum Insured Amount</b> </DialogTitle>
                                                                    <DialogContent dividers>
                                                                        {this.state.suminsuredamount.map(function (item, key) {
                                                                            return (
                                                                                <List round button>
                                                                                    <ListItem button id="padding-list-item" selected={this.state.selectedSI === item.mID} onClick={e => this.handleselectedSI(e, key)} >
                                                                                        <ListItemText>
                                                                                            ₹{item.label}
                                                                                        </ListItemText>
                                                                                    </ListItem>
                                                                                </List>
                                                                            );
                                                                        }.bind(this))}
                                                                    </DialogContent>
                                                                </Dialog>
                                                            </GridContainer>
                                                            <GridContainer>
                                                                <h3 style={{ left: '1rem', position: 'relative' }}>Calculated Premium refund amount</h3>
                                                            </GridContainer>
                                                            <GridContainer justify="center">
                                                                <table style={{ left: '7rem', position: 'relative' }}>
                                                                    <tbody style={{ lineHeight: "1.18rem" }}>
                                                                        <tr>
                                                                            <td style={{ fontWeight: "400" }}>Pay per day premium: </td>
                                                                            <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.perDayPremium}</b>/-</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td style={{ fontWeight: "400" }}>Fire & Theft: </td>
                                                                            <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.fireTheft}</b>/-</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ fontWeight: "400" }}>AD {/* {this.state.ParticipantMaster.isActive} Days:*/} </td>
                                                                            <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.adPremium}</b>/-</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ fontWeight: "400" }}>GST: </td>
                                                                            <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.gst}</b>/-</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ fontWeight: "400" }}>Total: </td>
                                                                            <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.total}</b>/-</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ fontWeight: "400" }}>I AUTHORIZE EGIC TO BILL ME UPTO A MAXIMUM ₹<b>{this.state.monthlyPremium}</b>/- PER MONTH </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </GridContainer>
                                                        </GridContainer>
                                                        <GridContainer jutify="center">
                                                            <Button round style={{ left: '14rem' }} color="primary" onClick={() => this.handleDeleteVehicle()}>Confirm Delete</Button>
                                                        </GridContainer>
                                                    </div>
                                                </Card>
                                            </GridItem>
                                        </GridContainer>
                                    </Modal>

                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={this.state.open}
                                        onClose={this.handleClose}>
                                        <GridContainer justify="center">
                                            <GridItem xs={6}>
                                                <Card >
                                                    <div>
                                                        <h4 style={{ textAlign: 'center' }}>Select Cover Days</h4>
                                                        <Button
                                                            color="primary"
                                                            round
                                                            style={{ left: '37rem', top: '-2.95rem' }}
                                                            onClick={this.handleClose}>
                                                            &times;
                                                        </Button>

                                                    </div>
                                                    <div id='dispschedule'>
                                                        <Scheduler schedule={this.state.schedule} handleSubmit={this.handleSubmit} handleCheckbox={this.handleCheckbox} handleClose={this.state.handleClose} />
                                                    </div>
                                                </Card>
                                            </GridItem>
                                        </GridContainer>
                                    </Modal>

                                    <GridContainer justify="center">
                                        <Divider style={{ width: '44rem', height: '0.1rem', }} />
                                    </GridContainer>

                                    <GridContainer justify="center">
                                        <Button round color="primary" onClick={() => this.handleaddVehicle()} ><AddCircle />Add Vehicle</Button>
                                    </GridContainer>
                                </GridContainer>
                                :
                                <h3>There is no Details/Vehicles available with this number.</h3>
                            }
                                <Modal
                                    disableScrollLock="true"
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.openaddvehicle}
                                    onClose={this.handleCloseaddvehicle}>
                                    <GridContainer justify="center">
                                        <GridItem xs={6}>
                                            <Card>
                                                <div>

                                                    <Button
                                                        color="success"
                                                        round
                                                        style={{ left: '37rem' }}
                                                        onClick={this.handleCloseaddvehicle}>
                                                        &times;
                                                        </Button>
                                                </div>
                                                <GridContainer>
                                                    <GridContainer justify="center">
                                                        <GridItem >
                                                            <CustomInput
                                                                labelText="Vehicle Number"
                                                                name="VehicleNumber"
                                                                value={this.state.RiskObj.VehicleNumber}
                                                                onChange={(e) => this.onInputChange(e)}
                                                                formControlProps={{
                                                                    fullWidth: true
                                                                }}
                                                            />
                                                        </GridItem>
                                                        <GridItem style={{ top: "1rem", position: 'relative' }}>
                                                            <StyleAutocomplete
                                                                //className="autocomplete"
                                                                name="vehicleMakeModelId"
                                                                options={this.state.masterList}
                                                                getOptionLabel={option => option.mValue}
                                                                onChange={(e, value) => this.handleCity(e, value, 'vehicleMakeModelId')}
                                                                renderInput={params => (
                                                                    <Styleinput {...params} variant="filled" style={{ width: "12rem", top: "8px" }} id="text-field-hero" label="Car make model" formControlProps={{ fullWidth: true }} />
                                                                )}
                                                            />
                                                        </GridItem>
                                                        <GridItem >
                                                            <CustomInput
                                                                labelText="Year of Registration"
                                                                name="YearofRegistration"
                                                                value={this.state.RiskObj.YearofRegistration}
                                                                onChange={(e) => this.onInputChange(e)}
                                                                formControlProps={{
                                                                    fullWidth: true
                                                                }}
                                                            />
                                                        </GridItem>
                                                    </GridContainer>
                                                    <GridContainer justify="center">
                                                        <h5>Select Premium here</h5>
                                                        <GridItem xs={6}>
                                                            <Button variant="outlined" round size="large" color="warning" onClick={this.handleopenDialog}>{this.state.selectedamount}</Button>
                                                            <Dialog style={{ textAlign: "center" }} onClose={this.handleaddcloseDialog} aria-labelledby="simple-dialog-title" open={this.state.opendialog} >
                                                                <DialogTitle id="simple-dialog-title"> <b>Sum Insured Amount</b> </DialogTitle>
                                                                <DialogContent dividers>
                                                                    {this.state.suminsuredamount.map(function (item, key) {
                                                                        return (
                                                                            <List round button>
                                                                                <ListItem button id="padding-list-item" selected={this.state.selectedSI === item.mID} onClick={e => this.handleaddselectedSI(e, key)} >
                                                                                    <ListItemText>
                                                                                        ₹{item.label}
                                                                                    </ListItemText>
                                                                                </ListItem>
                                                                            </List>
                                                                        );
                                                                    }.bind(this))}
                                                                </DialogContent>
                                                            </Dialog>
                                                        </GridItem>
                                                    </GridContainer>
                                                    <GridContainer>

                                                    </GridContainer>
                                                    <GridContainer justify="center">
                                                        {this.state.showDropZone ?
                                                            <GridItem>
                                                                <Dropzone
                                                                    getUploadParams={this.getUploadParams}
                                                                    onChangeStatus={this.handleChangeStatus}
                                                                    onSubmit={(e) => this.uploadfilefront(e)}
                                                                    name="front"
                                                                    //value={this.state.RiskObj.Documents}
                                                                    accept="image/*,audio/*,video/*,application/pdf/*,word/*"
                                                                />
                                                            </GridItem> : null}

                                                    </GridContainer>
                                                    <GridContainer justify="center">
                                                        <Button color="primary" name="frontCarImage" round onClick={(e) => this.showOnClick(e)}> Upload</Button>
                                                    </GridContainer>
                                                    <GridContainer justify="center">
                                                        {this.renderRedirect()}
                                                        <Button color="primary" round onClick={this.EndorsementPremium}> Calculate Premium </Button>
                                                    </GridContainer>
                                                    {this.state.showpremium ?
                                                        <GridContainer justify="center">
                                                            <GridItem>
                                                                <table>
                                                                    <tbody style={{ lineHeight: "1.18rem" }}>
                                                                        <h4>Endorsement Premium</h4>
                                                                        <tr>
                                                                            <td style={{ fontWeight: "400" }}>per day premium: </td>
                                                                            <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.premiumperday}</b>/-</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ fontWeight: "400" }}>Fire & Theft: </td>
                                                                            <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.firetheft}</b>/-</td>
                                                                        </tr>
                                                                        <tr>
                                                                            {/* <td style={{ fontWeight: "400" }}>AD for {this.state.fordays} Days: </td>*/}
                                                                            <td style={{ fontWeight: "400" }}>AD {/* {this.state.ParticipantMaster.isActive} Days:*/} </td>
                                                                            <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.adprem}</b>/-</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ fontWeight: "400" }}>GST: </td>
                                                                            <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.gsttax}</b>/-</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style={{ fontWeight: "400" }}>Total: </td>
                                                                            <td style={{ fontSize: "1rem", textAlign: "right" }}>₹<b>{this.state.sum}</b>/-</td>
                                                                            <td> </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </GridItem>
                                                            <GridContainer justify="center">
                                                                <Button color="primary" round onClick={() => this.confirm()}> confirm </Button>
                                                            </GridContainer>
                                                        </GridContainer> : null}
                                                </GridContainer>
                                            </Card>
                                        </GridItem>
                                    </GridContainer>
                                </Modal>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div >
        );
    }
}

LogonVehicle.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LogonVehicle);
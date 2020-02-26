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
import AddCircle from '@material-ui/icons/AddCircle';
import Delete from '@material-ui/icons/Delete';
import Scheduler from './Scheduler.jsx';
import EdelweissConfig from "./EdelweissConfig.js";
import VehicleAddition from "modules/Edelweiss/VehicleAddition.jsx";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Dropzone from 'react-dropzone-uploader';
import $ from 'jquery';
import Visibility from "@material-ui/icons/Visibility";



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

const Styleinput = withStyles({
    root: {
        //background: '#e7ab37ad !important',
        background: '#fff !important',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px'
    },
    //input: {
    //    color:'white'
    //},
    label: {
        //    textTransform: 'capitalize',
        color: 'white'
    },
})(TextField);


const StyleAutocomplete = withStyles({
    root: {
        //width: "13rem",
        //background: '#e7ab37ad !important',
        //borderTopLeftRadius: '5px',
        //borderTopRightRadius: '5px',
    },
    label: {
        color: 'white !important'
    },
})(Autocomplete);

class Vehicles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showvehicle: false,
            masterList: [],
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
            VehiclesList: [],//veh risk data
            redirectvehicle: false,
            open: false,
            open1: false,
            policyIssueRqstDto: {},
            riskdto: {},
            scheduledatadto: {},
            vehicleMakeModel: "",
            vehpremDTO: {},
            suminsured: [
                { mID: 1, mValue: "800000", label: "8,00,000" },
                { mID: 2, mValue: "900000", label: "9,00,000" },
                { mID: 3, mValue: "1000000", label: "10,00,000" },
                { mID: 4, mValue: "1100000", label: "11,00,000" },
                { mID: 5, mValue: "1200000", label: "12,00,000" },
                { mID: 6, mValue: "1300000", label: "13,00,000" },
                { mID: 7, mValue: "1400000", label: "14,00,000" },
                { mID: 8, mValue: "1500000", label: "15,00,000" },
                { mID: 9, mValue: "1600000", label: "16,00,000" },
                { mID: 10, mValue: "1700000", label: "17,00,000" },
                { mID: 11, mValue: "1800000", label: "18,00,000" },
                { mID: 11, mValue: "1900000", label: "19,00,000" },
                { mID: 11, mValue: "2000000", label: "20,00,000" },
            ],
            endorsementPremium: {
                "policyNo": "",
                "si": "",
                "pcCount": "1",
                "twCount": "0",
                "typeOfEndorsement": "Addition",
                "endorsementEffectiveDate": ""
            },
            selectedamount: "",
            addvehiclepremiumDto: {},
            selectedSI: 0,
            open: false,
            addshedulerdto: {},
            count: 1,
            twoCount: 0,
            vehicleType: "",
            premiumperday: "",
            firetheft: "",
            adprem: "",
            gsttax: "",
            sum: "",
            redirect: false,
            showpremium: false,
            openpopup: false,
            showvehicles: false,
            RiskObj: {

                Model: "",

                VehicleNumber: "",

                IdentificationNumber: "",

                YearofRegistration: "",

                VehicleType: "",

                Documents: []
            },
            listVehicles: [],
            endorsement: {

                "SI": "",
                "PolicyNumber": "",
                "EndorsementType": "Addition of driver",
                "InsurableItem": [

                    {

                        "InsurableName": "Driver",

                        "RiskItems": []
                    }

                ]

            },
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

            }
        };
    }

    handleCheckbox = (e) => {
        let scheduler = this.state.schedule;
        let name = e.target.name;
        let checked = e.target.checked;

        scheduler[name] = checked;

        this.setState({ scheduler });
        console.log("scheduler: ", scheduler);
    }


    handleSubmit = () => {
        console.log("schedular: ", this.state.schedule);
        fetch(`${EdelweissConfig.Edelweiss}/api/Mica_EGI/CreateUpdateSchedule`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

                //'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.schedule)
        }).then(response => response.json())
            .then((data) => {
                console.log("response ", data);

                if (data.status == 1) {
                    swal({
                        text: "Schedule updated  successfully!",
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
    onInputChange = (evt) => {

        const Data = this.state.RiskObj;
        Data[evt.target.name] = evt.target.value;
        this.setState({ Data });
    }
    componentDidMount() {
        debugger;
        if (this.props.location.state != undefined) {
            console.log("dddd5", this.props.location.state.scheduleDTO, this.props.location.state.pNo);
            this.state.riskdto = this.props.location.state.RiskObj;
            this.state.scheduledatadto = this.props.location.state.scheduleDTO;

            this.state.vehicleMakeModel = this.props.location.state.policyIssueRequest.InsurableItem[1].RiskItems[0].Model;

            this.state.vehpremDTO = this.props.location.state.vehiclepremiumDto;


            this.state.endorsementPremium.si = this.props.location.state.vehiclepremiumDto.si;
            this.state.selectedamount = this.props.location.state.vehiclepremiumDto.si;
            this.state.endorsement.SI = this.props.location.state.vehiclepremiumDto.si.toString();
            this.state.endorsement.PolicyNumber = this.props.location.state.scheduleDTO.policyNo;
            this.state.endorsementVehDTO.SI = this.props.location.state.vehiclepremiumDto.si.toString();
            this.state.endorsementVehDTO.PolicyNumber = this.props.location.state.scheduleDTO.policyNo;

            this.state.endorsementPremium.policyNo = this.props.location.state.scheduleDTO.policyNo;
            this.setState({});
            console.log("endorsementPremium", this.state.endorsementPremium);


            let vehicleslist = this.state.listVehicles;
            console.log("this.props.location.state.policyIssueRequest", this.props.location.state.policyIssueRequest)
            for (let i = 0; i < this.props.location.state.policyIssueRequest.InsurableItem[1].RiskItems.length; i++) {
                vehicleslist.push(this.props.location.state.policyIssueRequest.InsurableItem[1].RiskItems[i])
            }
            this.setState({ vehicleslist });
            console.log("Vehicles", this.state.listVehicles)
            this.setState({ policyIssueRqstDto: this.props.location.state.policyIssueRequest });
            console.log("this.state.policyIssueRqstDto", this.props.location.state.policyIssueRequest);
            console.log("this.state.endorsement", this.state.endorsement);
            for (var i = 0; i < this.props.location.state.policyIssueRequest.InsurableItem[0].RiskItems.length; i++) {
                if (this.state.endorsement.InsurableItem[0].InsurableName == "Driver") {
                    this.state.endorsement.InsurableItem[0].RiskItems[i] = this.props.location.state.policyIssueRequest.InsurableItem[0].RiskItems[i]
                }
                console.log("this.state.endorsement.", this.state.endorsement);
            }

            //fetch(`${EdelweissConfig.Edelweiss}/api/Mica_EGI/GetSchedule?VehicleRegistrationNo=KA01EQ9767&PolicyNo=750000109`, {
            //    method: 'GET',
            //    headers: {
            //        'Accept': 'application/json',
            //        'Content-Type': 'application/json',

            //    },
            //}).then(response => response.json())
            //    .then(data => {
            //        console.log('response: ', data);
            //        this.setState({ schedule: data.getSchedule });
            //    });
        }


        fetch(`http://edelw-publi-10uqrh34garg4-1391995876.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/GetVehicleMaster?isFilter=true`, {

            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhOTVkMDNjZC1kZjE4LTQ3NTYtYTU3Ny0zNDEyYjY4MTdkZDAiLCJFbWFpbCI6InNhbmRoeWFAZ21haWwuY29tIiwiT3JnSWQiOiIyNzciLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6InNhbmRoeWEiLCJVc2VyTmFtZSI6InNhbmRoeWFAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjEiLCJleHAiOjE2NzU0OTkyOTksImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.2oUTJQBxiqqqgl2319ZCREz1IyYHjVRhlDehI__O8Xg'

            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("masterList: ", data);
                this.setState({ masterList: data });
            });
    }


    handleopenDialog = () => {
        this.setState({ opendialog: true });
    }
    handlecloseDialog = () => {
        this.setState({ opendialog: false });
    }


    handleselectedSI = (e, key) => {
        this.state.selectedSI = this.state.suminsured[key].mID;
        this.state.endorsementPremium.si = this.state.selectedSI;
        this.state.endorsementPremium.si = this.state.suminsured[key].mValue;
        this.setState({ selectedSI: this.state.suminsured[key].mID, selectedamount: this.state.suminsured[key].label, opendialog: false, btn3color: true });
        console.log("state.endorsementPremium", this.state.endorsementPremium);
        ;
    }
    EndorsementPremium = () => {
        debugger;
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + (today.getHours()) + ':' + (today.getMinutes()) + ':' + (today.getSeconds());
        this.state.endorsementPremium.endorsementEffectiveDate = date;

        this.setState({ showpremium: true });
        if (this.state.vehicleType == "PC") {
            let Count = this.state.count + 1;
            this.state.count = Count;
            //this.setState({ count: Count });
            this.state.endorsementPremium.pcCount = this.state.count;
            for (var i = 0; i < Count; i++) {
                this.setState({ showvehicles: true })
            }
        }
        if (this.state.vehicleType == "TW") {
            let Count1 = this.state.twoCount + 1;
            this.state.twoCount = Count1;
            this.state.endorsementPremium.twCount = this.state.twoCount;
            for (var i = 0; i < Count1; i++) {
                this.setState({ showvehicles: true })
            }
        }

        fetch(`http://edelw-publi-10uqrh34garg4-1391995876.ap-south-1.elb.amazonaws.com:9025/api/Mica_EGI/EndorsementPremium`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJhOTVkMDNjZC1kZjE4LTQ3NTYtYTU3Ny0zNDEyYjY4MTdkZDAiLCJFbWFpbCI6InNhbmRoeWFAZ21haWwuY29tIiwiT3JnSWQiOiIyNzciLCJQYXJ0bmVySWQiOiIwIiwiUm9sZSI6ImlOdWJlIEFkbWluIiwiTmFtZSI6InNhbmRoeWEiLCJVc2VyTmFtZSI6InNhbmRoeWFAZ21haWwuY29tIiwiUHJvZHVjdFR5cGUiOiJNaWNhIiwiU2VydmVyVHlwZSI6IjEiLCJleHAiOjE2NzU0OTkyOTksImlzcyI6IkludWJlIiwiYXVkIjoiSW51YmVNSUNBIn0.2oUTJQBxiqqqgl2319ZCREz1IyYHjVRhlDehI__O8Xg'

                //'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI5NTc4NmM2OS0xNjAxLTQzMGQtODM1Ni01M2RlNDUyZjUxZTYiLCJFbWFpbCI6InZpdGFsQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJEZW1vIFJvbGUiLCJOYW1lIjoidml0aGFsIiwiVXNlck5hbWUiOiJ2aXRhbEBpbnViZXNvbHV0aW9ucy5jb20iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMSIsImV4cCI6MTY3MDY1NDMzMCwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.nZsItQ97TGtSZ-IrZ8SlDeOCIKnaCI4tmeLC953z9qA'
            },
            body: JSON.stringify(this.state.endorsementPremium)
        }).then(response => response.json())
            .then(data => {
                console.log("calendorsement", data)
                console.log("respdata", data.response);

                this.setState({ proposalNo: data.id, premiumperday: data.perDayPremium, firetheft: data.fireTheft, adprem: data.adPremium, gsttax: data.gst, sum: data.total })

                if (data.status == 2) {
                    //swal({
                    //    //let res = partnerId.toString();
                    //    text: data.responseMessage,
                    //    icon: "success"
                    //});
                } else if (data.status == 8) {
                    //swal({
                    //    text: data.responseMessage,
                    //    icon: "error"
                    //});
                }
                else {
                    //swal({
                    //    text: data.errors[0].errorMessage,
                    //    icon: "error"
                    //});
                }
            });
    }
    confirm = () => {
        console.log("vehlisttt", this.state.VehiclesList)
     
        let si = this.state.endorsement.SI.toString();
        this.setState({ showvehicle: true })
        this.state.VehiclesList.push(this.state.RiskObj);
        let risk = this.state.RiskObj;

        for (var i = 0; i < this.state.VehiclesList.length; i++) {
            if (this.state.endorsementVehDTO.InsurableItem[0].InsurableName == "Vehicle") {
                this.state.endorsementVehDTO.InsurableItem[0].RiskItems.push(this.state.VehiclesList[i]);
            }
            console.log("this.state.endorsementVehDTO.", this.state.endorsementVehDTO);
        }

      

        console.log(" this.state.VehiclesList", this.state.VehiclesList);
        fetch(`${EdelweissConfig.PolicyConfigUrl}/api/Policy/PolicyEndoresemenet`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI5NTc4NmM2OS0xNjAxLTQzMGQtODM1Ni01M2RlNDUyZjUxZTYiLCJFbWFpbCI6InZpdGFsQGludWJlc29sdXRpb25zLmNvbSIsIk9yZ0lkIjoiMTEyIiwiUGFydG5lcklkIjoiMCIsIlJvbGUiOiJEZW1vIFJvbGUiLCJOYW1lIjoidml0aGFsIiwiVXNlck5hbWUiOiJ2aXRhbEBpbnViZXNvbHV0aW9ucy5jb20iLCJQcm9kdWN0VHlwZSI6Ik1pY2EiLCJTZXJ2ZXJUeXBlIjoiMSIsImV4cCI6MTY3MDY1NDMzMCwiaXNzIjoiSW51YmUiLCJhdWQiOiJJbnViZU1JQ0EifQ.nZsItQ97TGtSZ-IrZ8SlDeOCIKnaCI4tmeLC953z9qA'

            },
            body: JSON.stringify(this.state.endorsementVehDTO)
        }).then(response => response.json())
            .then(data => {
                if (data.status == 2) {

                    swal({
                        text: "policy endorsement for"+" "+data.id+" "+"has been issued successfully",
                        icon: "success"
                    })

                }
            })


    }
    handleCity = (event, values, name) => {
        if (name == "vehicleMakeModelId") {
            let vehicletype = this.state.masterList.filter(x => x.mID == values.mID)[0].mType;
            let makemodel = this.state.masterList.filter(x => x.mID == values.mID)[0].mValue;
            this.state.RiskObj.Model = makemodel;
            this.setState({ vehicleType: vehicletype, makeModel: makemodel });
            
            console.log("this.state.vehicleType", this.state.vehicleType, this.state.makeModel);

            //if (name == "vehicleMakeModelId") {
            //    quotation[name] = values.mID;
            //}
            //this.setState({ quotation });

        }

        //let quotation = this.state.quotationDTO;
        //if (name == "vehicleMakeModelId") {
        //    quotation[name] = values.mID;
        //} else if (name == "city" && values != null) {
        //    quotation[name] = values.cityId;
        //}
        //this.setState({ quotation });

        //console.log("tags: ", quotation)

    }

    showOnClick = (evt) => {
        debugger;
        this.setState({ showDropZone: true })
    }

    getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    uploadfilefront = (files) => {
        debugger;
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

                //this.state.documentObj.docId = data.docId;
                //this.state.documentObj.fileName = data.fileName;

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

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }
    handleClose1 = () => {
        this.setState({ open1: false });
    }
    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/pages/BillingFrequency',

            }} />
        }
        else if (this.state.redirectback === true) {
            return <Redirect to={{
                pathname: '/pages/ProceedPayment',

            }} />
        }
        else if (this.state.redirectvehicle === true) {
            return <Redirect to={{
                pathname: '/pages/VehicleAddition',
                state: { vehpremDTO: this.state.vehpremDTO, scheduledatadto: this.state.scheduledatadto, riskdto: this.state.riskdto, vehicleMakeModel: this.state.vehicleMakeModel }

            }} />
        }
    }
    Addvehicle = () => {
        debugger;
        this.setState({ open1: true })
        let risk = this.state.RiskObj;

        risk.VehicleNumber = "";
        risk.Model = "";
        risk.YearofRegistration = "";

        this.setState({ risk });
        console.log("riskobj", this.state.RiskObj)
        console.log("riskobj", risk)

    }

    render() {
        let btn3_class = this.state.btn3color ? "warning" : "default";
        const { classes, loggingIn } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={8}>
                        <Card>
                            <CardBody>
                                <GridContainer justify="center">
                                    <h4>1 claim </h4>
                                </GridContainer>
                                <GridContainer justify="center">
                                    <h4>SI balance: 2,30,000</h4>
                                </GridContainer>
                                <GridContainer justify="center">
                                    <Divider style={{ width: '44rem', height: '0.2rem', }} />
                                </GridContainer>

                                <GridContainer justify="center">
                                    <img src={Car} style={{ width: "14rem" }} onClick={this.handleOpen} />
                                    <h4 style={{ left: '1rem', top: '2rem', position: 'relative' }}>{this.state.vehicleMakeModel}</h4>
                                    <h4 style={{ right: '7rem', top: '3.7rem', position: 'relative' }}>{this.state.scheduledatadto.vehicleRegistrationNo}</h4>
                                    <IconButton onClick={() => this.handleView(this.state.scheduledatadto.vehicleRegistrationNo)} ><Visibility /></IconButton>
                                    <IconButton onClick={() => this.handleDeleteopen(this.state.scheduledatadto.vehicleRegistrationNo, this.state.vehicleMakeModel)}><Delete /></IconButton>
                                    {/* <CustomCheckbox
                                        name="tppolicy"
                                        className="move"
                                        //labelText="M"
                                        //value={this.state.Checkbox.tppolicy}
                                        //onChange={(e) => this.handleCheckbox(e)}
                                        //disabled={(item.disable == true) ? true : null}
                                        //checked={item.mIsRequired}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    <Button round color="primary"><Delete /></Button>*/}
                                </GridContainer>


                                {this.state.showvehicle ? <GridContainer>
                                    {this.state.VehiclesList.map(function (item, key) {
                                        return (
                                            <GridContainer justify="center">
                                                <img src={Car} style={{ width: "10rem" }} onClick={() => this.handleOpen(item.VehicleNumber)} />
                                                <h4 style={{ left: '1rem', top: '0.7rem', position: 'relative' }}>{item.Model}</h4>
                                                <h4 style={{ right: '6rem', top: '2.3rem', position: 'relative' }}>{item.VehicleNumber}</h4>
                                               <IconButton onClick={() => this.handleView(item.VehicleNumber)} ><Visibility /></IconButton>
                                                <IconButton onClick={() => this.handleDeleteopen(item.VehicleNumber, item.VehicleType)}><Delete /></IconButton>
                                           </GridContainer>
                                        );
                                    }.bind(this))
                                    }
                                </GridContainer> : null}


                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.open}
                                    onClose={this.handleClose}>
                                    <GridContainer justify="center">
                                        <GridItem>
                                            <Card>
                                                <div>
                                                    <h4 style={{ textAlign: 'center' }}>Select Cover Days</h4>
                                                    <Button
                                                        color="success"
                                                        round
                                                        style={{ left: '68rem', top: '-2.5rem' }}
                                                        onClick={this.handleClose}>
                                                        &times;
                                                        </Button>
                                                </div>
                                                <Scheduler schedule={this.state.schedule} handleSubmit={this.handleSubmit} handleCheckbox={this.handleCheckbox} handleClose={this.state.handleClose} />
                                            </Card>
                                        </GridItem>
                                    </GridContainer>
                                </Modal>
                                <GridContainer justify="center">
                                    <Divider style={{ width: '44rem', height: '0.1rem', }} />
                                </GridContainer>
                                <GridContainer justify="center">
                                    <Divider style={{ width: '32rem', height: '0.1rem', }} />
                                </GridContainer>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={this.state.open1}
                                    onClose={this.handleClose1}>

                                    <GridItem>
                                        <Card>
                                            <div>

                                                <Button
                                                    color="success"
                                                    round
                                                    style={{ left: '79rem', top: '0.5rem' }}
                                                    onClick={this.handleClose1}>
                                                    &times;
                                                        </Button>
                                            </div>
                                            <GridContainer>
                                                <GridContainer justify="center">
                                                    <GridItem xs={12} sm={12} md={4}>
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

                                                </GridContainer>
                                                <GridContainer justify="center">
                                                    <GridItem xs={12} sm={12} md={4}>
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

                                                </GridContainer>
                                                <GridContainer justify="center">
                                                    <GridItem xs={12} sm={12} md={4}>
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
                                                    <GridItem xs={6}>
                                                        <Button variant="outlined" round size="large" color={btn3_class} onClick={this.handleopenDialog}>{this.state.selectedamount}</Button>
                                                        <Dialog style={{ textAlign: "center" }} onClose={this.handlecloseDialog} aria-labelledby="simple-dialog-title" open={this.state.opendialog} >
                                                            <DialogTitle id="simple-dialog-title"> <b>Sum Insured Amount</b> </DialogTitle>
                                                            <DialogContent dividers>
                                                                {this.state.suminsured.map(function (item, key) {
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
                                                    </GridItem>
                                                </GridContainer>

                                                <GridContainer>

                                                    {this.state.showDropZone ?
                                                        <GridItem xs={12} sm={12} md={4}>
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
                                                    <Button color="primary" round onClick={this.EndorsementPremium}> ok </Button>

                                                </GridContainer>

                                                {this.state.showpremium ? < GridContainer justify="center">
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
                                                                    <td> <Button color="primary" round onClick={this.confirm}> confirm </Button></td>
                                                                </tr>
                                                                <tr>


                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </GridItem>
                                                </GridContainer> : null}
                                            </GridContainer>


                                            <GridContainer jutify="center">
                                                <Button round style={{ left: '14rem' }} color="primary" onClick={() => this.handleDeleteVehicle()}>Confirm Delete</Button>
                                            </GridContainer>
                                        </Card>
                                    </GridItem>

                                </Modal>
                                <GridContainer justify="center">
                                    {this.renderRedirect()}
                                    <Button round color="primary" onClick={this.Addvehicle}><AddCircle />Add Vehicle</Button>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div >
        );
    }
}

Vehicles.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(Vehicles);
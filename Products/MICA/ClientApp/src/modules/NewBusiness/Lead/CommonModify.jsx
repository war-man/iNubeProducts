﻿import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import Modify from "./Modify.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import { Animated } from "react-animated-css";
import MenuItem from "@material-ui/core/MenuItem";
import Edit from "@material-ui/icons/Edit";
import leadPool from "assets/img/server.png";
import LeadGrid from "./LeadGrid.jsx";
import NewBusinessConfig from 'modules/NewBusiness/NewBusinessConfig.js';
import swal from 'sweetalert';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import validationPage from "components/Validation/Validation.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import Pending from "assets/img/Pending.png";
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";



const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

}
const searchBtn = {
    left: "140%",

}
const popup = {
    marginleft: "115px",
    marginright: "- 71px",
}
const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',

    },
});




class CommonModify extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectL: false,
            isDontShowCreateLead: true,
            isDontShowCreateLeadBtn: true,
            isDontShow: true,
            isDontShowGrid: true,
            isDontShowQtnBtn: false,
            isShowQtnBtn: true,
            isDntShowQtnRadioBtn: false,
            isShowQtnRadioBtn: true,
            Policydetailsdata: ["pks"],
            editModal: false,
            btnvisibility: false,
            disabled: false,
            open: false,
            fetchIndex: "",
            contactId: "",
            simpleSelect: "",
            selectedValue: null,
            masterList: [],
            //Radio Button filterd data Storing
            RadioFilterData: [],
            redirect: false,
            QuoteData: [],
            //validation
            servermessage: "",
            //errormessage: false,
            //message: false,
            errormessage: false,
            //contactTypeId: "",
            //salutation: "",
            //firstName: "",
            //lastName: "",
            //mobileNo: "",
            //emailID: "",
            //place: "",
            //passportNo: "",
            message: "",
            nicno: "",
            nicnoState: "",
            firstName: "",
            firstNameState: "",
            lastName: "",
            lastNameState: "",
            mobileNo: "",
            mobileNoState: "",
            phoneNo: "",
            phoneNoState: "",
            work: "",
            workState: "",
            emailID: "",
            emailIDState: "",
            place: "",
            placeState: "",

            dateOfBirth: "",
            dateOfBirthState: "",
            age: "",
            ageState: "",
            occupationID: "",
            occupationIDState: "",
            monthlyIncome: "",
            monthlyIncomeState: "",
            currency: "",
            currencyState: "",
            passportNo: "",
            passportNoState: "",
            address1: "",
            address1State: "",
            address2: "",
            address2State: "",
            address3: "",
            address3State: "",

            rowData: {},
            display: false,
            suspectinfo: [],

            LocationDTO: {
                Country: [],
                State: [],
                District: [],
                City: [],
                Pincode: [],
                "selectedValue": null,

            },
            LeadDTO: [{
                nicno: "",
                // contactID: "",
                contactTypeId: "",
                contactType: "",
                salutation: "",
                firstName: "",
                lastName: "",
                mobileNo: "",
                phoneNo: "",
                work: "",
                emailID: "",
                nicno: "",
                place: "",
                passportNo: "",
                gender: "",
                maritalStatusID: "",
                dateOfBirth: "",
                age: 0,
                occupationID: 0,
                monthlyIncome: "",
                currency: "",


                "address": {},
                "opportunityDTO": {}

            }],
            addressDTO: {
                addressId: 0,
                addressTypeId: 0,
                address1: "",
                address2: "",
                address3: "",
                city: "",
                state: "",
                pincode: "",
                country: "",
                district: "",
                createdBy: "",
                createdDate: "",
                status: "",
                sourceRowId: "",
                countryId: "",
                stateId: "",
                districtId: "",
                cityId: "",
                areaId: "",
            },
            opportunityDTO: {
                stageId: "",
                createdBy: "",

            },
            show: false,
            submitshow: false,
            modifypage: false,
            type: "",

        }
        this.state.isDontShowCreateLead = props.isShowCreateLead;
        this.state.isDontShowGrid = props.isShowGrid;
        this.state.isDontShow = props.isShow;
        this.state.isDontShowQtnBtn = props.isShowQtnBtn;
        this.state.isDntShowQtnRadioBtn = props.isShowQtnRadioBtn;
        this.handleLeadSave = this.handleLeadSave.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    };


    GetLocationService = (type, pID) => {
        debugger;
        fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Lead/GetLocation?locationType=` + type + `&parentID=` + pID, {
            // fetch(`https://localhost:44347/api/Lead/GetLocation?locationType=` + type + `&parentID=` + pID, {

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

    onDateChange = (format, name, event) => {
        var today = event.toDate();
        var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        var date2 = new Date();
        var date1 = new Date(today);
        if (name == "dateOfBirth") {
            var ageDifMs = Date.now() - date1.getTime();
            var ageDate = new Date(ageDifMs);
            var age = Math.abs(ageDate.getUTCFullYear() - 1970);
            const leaddto = this.state.LeadDTO[0];
            leaddto['age'] = age;
            this.setState({ leaddto });
            console.log("datediff", age, ageDate);
        }

    }

    GetLocation = (type, event) => {

        let reg = this.state.addressDTO;
        let name = event.target.name;
        let value = event.target.value;
        reg[name] = value;

        this.setState({ reg })
        if (type != "") {
            this.GetLocationService(type, event.target.value);
        }
    }


    componentDidMount() {
        debugger;
        console.log("LeadDTO", this.state.LeadDTO);
        fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Lead/GetMaster?isFilter=true`, {
            //  fetch(`https://localhost:44347/api/Lead/GetMaster?isFilter=true`, {
            method: 'GET',
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
        // fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Lead/SuspectPool`, {


        this.GetLocationService('Country', 0);
        console.log('mount-- ', this.props);
        if (this.props.type != undefined) {
            this.state.type = this.props.type;
            this.setState({});
        }
        if (this.props.isDontShow != undefined) {
            this.setState({ isDontShowCreateLead: true, isDontShowGrid: false, isDontShow: true, isDontShowCreateLeadBtn: false });
        }

        if (this.props.contactId !== "" && this.props.contactId !== undefined) {

            console.log("chytrQtn", this.props.contactId);
            fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Lead/LoadSuspectInformation?ContactID=` + this.props.contactId, {


                //  fetch(`https://localhost:44347/api/Lead/LoadSuspectInformation?ContactID=` + contactid, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')

                },
            })

                .then(response => response.json())
                .then(data => {
                    this.setState({ LeadDTO: data });
                    console.log("suspectinfo", this.state.LeadDTO, data);

                    if (data[0] !== null) {
                        this.setState({ addressDTO: data[0].address });
                        this.GetLocationService('Country', 0);

                    }
                    console.log("address", this.state.addressDTO);
                });

        }
        else {
            fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Lead/ContactPool?type=` + this.state.type, {
                //fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Lead/ContactPool?type=Lead`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.datatable(data);
                    this.setState({ dataRows: data });

                    console.log("datanow", this.state.dataRows);


                });
        }






    }
    //validation

    //function


    //validation

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
            case "productBenefit":
                if (validationPage.verifydecimal(event.target.value)) {
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
            case "email":
                if (validationPage.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "passportNo":
                if (validationPage.verifyPassportNo(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                    // console.log("passport", this.state.passportNoState)
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;

            default:
                break;
        }


    }

    datatable = (columndata) => {

        this.setState({
            newdata: columndata.map((prop, key) => {
                const { classes } = this.props;
                console.log("prop data", prop);
                console.log("send data", key);
                return {
                    id: key,
                    LeadNo: prop.contactID,
                    LeadDate: new Date(prop.creationDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    //LeadDate: new Date(prop.creationDate).toLocaleDateString('en-IND', { day: 'numeric', month: 'numeric', year: 'numeric', }),
                    Type: prop.contactType,
                    ProposerName: prop.firstName,
                    Place: prop.place,
                    Mobile: prop.mobileNo,
                    radio: < input type="radio" name="radio" onClick={this.editFunction.bind(this, key, prop.contactID)} value={prop.contactID} />,
                    actions: (
                        <div className="actions-right">
                            <Button color="info" justIcon round simple className="edit" onClick={() => this.edittable(prop.contactID)}><Edit /></Button>

                        </div>
                    )
                };
            })
        });
    }
    edittable = (contactid) => {

        let addressdto = [];
        this.setState({ open: true });

        fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Lead/LoadSuspectInformation?ContactID=` + contactid, {


            //  fetch(`https://localhost:44347/api/Lead/LoadSuspectInformation?ContactID=` + contactid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')

            },
        })

            .then(response => response.json())
            .then(data => {
                this.setState({ LeadDTO: data });
                console.log("suspectinfo", this.state.LeadDTO, data);

                if (data[0] !== null) {
                    this.setState({ addressDTO: data[0].address });
                    this.GetLocationService('Country', 0);

                }
                console.log("address", this.state.addressDTO);
            });
        this.setState({ isDontShowCreateLead: true, isDontShowGrid: false, isDontShow: true, isDontShowCreateLeadBtn: false });

    }


    editFunction = (id, contactid, event) => {
        debugger;
        // this.state.contactId = event.target.value;
        //    this.setState({ contactId: contactid });
        this.setState({ contactId: event.target.value });
        var orgArr = this.state.dataRows;

        console.log("UserDataLad", this.state.dataRows);
        console.log("orgArr", orgArr)
        console.log("contactID Modify", this.state.contactId, "1", contactid)


    }
    //editFunction = (id, contactid) => {

    //    var orgArr = this.state.dataRows;
    //    console.log("UserDataLad", this.state.dataRows);
    //    console.log("orgArr", orgArr)

    //    this.setState({ contactId: contactid });
    //    console.log("contactID Modify", this.state.contactId, contactid)

    //}



    handleChange = () => {
        this.setState({ show: true })
    }
    //Create Qtn page fn
    handleRadioChange(event) {
        this.setState({ selectedValue: event.target.value });
    }

    CreateQuoteFun = () => {
        debugger;
        this.setState({ redirect: true });

        let data = this.state.RadioFilterData;
        this.setState({ LeadDTO: data })

        console.log("CLead", this.state.LeadDTO);
        this.renderRedirect();
        // this.edittable(this.state.contactId);
    }

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/Quotation',
                state: {
                    LeadDTO: this.state.LeadDTO,
                    //QuoteData: this.state.QuoteData,
                    RadioFilterData: this.state.RadioFilterData,
                    contactId: this.state.contactId
                }
            }} />
        }
    }


    handleClose = () => {

        this.setState({ open: false });

    };
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    SetValue = (type, event) => {
        let LeadDTO = this.state.LeadDTO;
        let name = event.target.name;
        let value = event.target.value;
        LeadDTO[0][name] = value;
        this.setState({ LeadDTO });
        this.change(event, name, type);

    }
    SetaddressValue = ((type, event) => {
        let addressDTO = this.state.addressDTO;
        let name = event.target.name;
        let value = event.target.value;
        addressDTO[name] = value;
        this.setState({ addressDTO })
        this.change(event, name, type);
    });


    modifySuspect = () => {
        debugger;
        let leaddto = this.state.LeadDTO;

        let add = [];
        add.push(this.state.addressDTO);
        leaddto.address = this.state.addressDTO;


        console.log("leaddto", this.state.LeadDTO);
        console.log("DntShwFlag", this.state.isDontShow, this.state.errormessage);
        var data = {
            'nicno': this.state.LeadDTO[0].nicno, 'emailID': this.state.LeadDTO[0].emailID, 'gender': this.state.LeadDTO[0].gender, 'maritalStatusID': this.state.LeadDTO[0].maritalStatusID, 'dateOfBirth': this.state.LeadDTO[0].dateOfBirth, 'age': this.state.LeadDTO[0].age,
            'address1': this.state.addressDTO.address1, 'address2': this.state.addressDTO.address2, 'countryId': this.state.addressDTO.countryId, 'stateId': this.state.addressDTO.stateId, 'districtId': this.state.addressDTO.districtId, 'cityId': this.state.addressDTO.cityId, 'areaId': this.state.addressDTO.areaId
        }; console.log("Check", this.state.addressDTO)
        if (this.state.LeadDTO[0].nicno != null && this.state.LeadDTO[0].emailID != null && this.state.LeadDTO[0].gender != null && this.state.LeadDTO[0].maritalStatusID != null && this.state.LeadDTO[0].dateOfBirth != null && this.state.LeadDTO[0].age != null &&
            this.state.addressDTO.address1 != null && this.state.addressDTO.address2 != null && this.state.addressDTO.countryId != null && this.state.addressDTO.stateId != null && this.state.addressDTO.districtId != null && this.state.addressDTO.cityId != null && this.state.addressDTO.areaId != null) {
            debugger
            fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Lead/ModifySuspect`, {
                method: 'POST',
                body: JSON.stringify(this.state.LeadDTO[0]),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == 2) {


                        swal({

                            text: data.responseMessage,
                            icon: "success"
                        });
                        //   this.setState({ open: false });
                        //  this.setState({ LeadDTO: data });
                        // this.setState({ addressDTO: data.address });
                        // this.setState({ LocationDTO: data.address });
                        console.log('address server:', data);
                        this.setState({ errormessage: false });
                    } else if (data.status == 8) {

                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    } else if (data.status == 4) {

                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    }
                });
        } else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }
    }
    renderRedirectL = () => {
        if (this.state.redirectL == true) {
            return <Redirect to={{
                pathname: '/dashboard/home',

            }} />
        }
    }
    handleLeadSave = (event) => {
        debugger;
        var url = NewBusinessConfig.NewBusinessConfigUrl;
        console.log("Urlchecking", url);
        //   console.log("DntShwFlagCreat", this.state.isDontShow, this.state.errormessage);
        var data = {
            'contactTypeId': this.state.LeadDTO[0].contactTypeId, 'salutation': this.state.LeadDTO[0].salutation, 'firstName': this.state.LeadDTO[0].firstName, 'lastName': this.state.LeadDTO[0].lastName, 'mobileNo': this.state.LeadDTO[0].mobileNo, 'place': this.state.LeadDTO[0].place
        };
        if (this.state.LeadDTO[0].contactTypeId != "" && this.state.LeadDTO[0].salutation != "" && this.state.LeadDTO[0].firstName != "" && this.state.LeadDTO[0].lastName != "" && this.state.LeadDTO[0].mobileNo != "" && this.state.LeadDTO[0].place != "") {

            fetch(`${NewBusinessConfig.NewBusinessConfigUrl}/api/Lead/SaveSuspect`, {
                method: 'POST',
                body: JSON.stringify(this.state.LeadDTO[0]),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/json; charset=utf-8'
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            })
                .then(response => response.json())
                .then(data => {

                    if (data.status == 2) {
                        debugger;
                        //this.reset();

                        swal({
                            text: "Data Saved Successfully",
                            icon: "success"
                        });
                        console.log("data save result:", data);
                        this.setState({ errormessage: false });
                        this.setState({ redirectL: true });
                    } else if (data.status == 8) {

                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    } else if (data.status == 4) {

                        swal({
                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });
                    }
                });
        } else {
            swal("", "Some fields are missing", "error");
            this.setState({ errormessage: true });
        }
    };

    render() {
        const { classes } = this.props;
        const props = this.props;

        return (
            <GridContainer xl={12}>
                {
                    this.state.isDontShowGrid &&


                    <LeadGrid newdata={this.state.newdata} isDontShowQtnBtn={this.state.isDontShowQtnBtn}
                        CreateQuoteFun={this.CreateQuoteFun}

                    />


                }


                {
                    this.state.isDontShowCreateLead &&


                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                        <CardBody>
                            <GridContainer >

                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        success={this.state.nicnoState === "success"}
                                        error={this.state.nicnoState === "error"}

                                        labelText="Emirates ID"
                                        id="emiratesId"
                                        name="nicno"
                                        value={this.state.LeadDTO[0].nicno}

                                        //  value={this.state.RadioFilterData.nicno}
                                        onChange={(e) => this.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    // required={true}
                                    />


                                    {this.state.errormessage && this.state.isDontShow && (this.state.LeadDTO[0].nicno == "") ? <p className="error">
                                        This Field is Required</p> : null}

                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <MasterDropdown
                                        labelText="Type"
                                        id="LeadDTO.TypeId"
                                        value={this.state.LeadDTO[0].contactTypeId}
                                        lstObject={this.state.masterList}
                                        required={true}
                                        filterName='Type'
                                        model="LeadDTO"
                                        name='contactTypeId'
                                        onChange={(e) => this.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />

                                    {this.state.errormessage && (this.state.LeadDTO[0].contactTypeId == "") ? <p className="error">
                                        This Field is Required</p> : null}
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <MasterDropdown
                                        labelText="Salutation"
                                        id="LeadDTO.salutation"
                                        value={this.state.LeadDTO[0].salutation}
                                        lstObject={this.state.masterList}
                                        required={true}
                                        filterName='Salutation'
                                        model="LeadDTO"
                                        name='salutation'
                                        onChange={(e) => this.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    {this.state.errormessage && (this.state.LeadDTO[0].salutation == "") ? <p className="error">
                                        This Field is Required</p> : null}
                                </GridItem>


                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        required={true}
                                        success={this.state.firstNameState === "success"}
                                        error={this.state.firstNameState === "error"}
                                        labelText="Given Name"
                                        id="givenName"
                                        name="firstName"
                                        value={this.state.LeadDTO[0].firstName}
                                        onChange={(e) => this.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }} />

                                    {this.state.errormessage && (this.state.LeadDTO[0].firstName == "") ? <p className="error">
                                        This Field is Required</p> : null}

                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        required={true}
                                        success={this.state.lastNameState === "success"}
                                        error={this.state.lastNameState === "error"}
                                        labelText="Sur Name"
                                        id="surName"
                                        name="lastName"
                                        value={this.state.LeadDTO[0].lastName}
                                        onChange={(e) => this.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    {this.state.errormessage && (this.state.LeadDTO[0].lastName == "") ? <p className="error">
                                        This Field is Required</p> : null}
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        required={true}
                                        success={this.state.mobileNoState === "success"}
                                        error={this.state.mobileNoState === "error"}
                                        labelText="Mobile"
                                        id="mobile"
                                        name="mobileNo"
                                        value={this.state.LeadDTO[0].mobileNo}
                                        onChange={(e) => this.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    {this.state.errormessage && (this.state.LeadDTO[0].mobileNo == "") ? <p className="error">
                                        This Field is Required</p> : null}
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        success={this.state.phoneNoState === "success"}
                                        error={this.state.phoneNoState === "error"}
                                        labelText="Home"
                                        id="home"
                                        name="phoneNo"
                                        value={this.state.LeadDTO[0].phoneNo}
                                        onChange={(e) => this.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />

                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        success={this.state.workState === "success"}
                                        error={this.state.workState === "error"}
                                        labelText="Office"
                                        id="office"
                                        name="work"
                                        value={this.state.LeadDTO[0].work}
                                        onChange={(e) => this.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />

                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput

                                        success={this.state.emailIDState === "success"}
                                        error={this.state.emailIDState === "error"}
                                        labelText="E-Mail"
                                        id="email"
                                        name="emailID"
                                        value={this.state.LeadDTO[0].emailID}
                                        onChange={(e) => this.SetValue("email", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    {this.state.errormessage && (this.state.LeadDTO[0].emailID == "") ? <p className="error">
                                        This Field is Required</p> : null}
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        success={this.state.placeState === "success"}
                                        error={this.state.placeState === "error"}
                                        required={true}
                                        labelText="Place"
                                        id="place"
                                        name="place"
                                        value={this.state.LeadDTO[0].place}
                                        onChange={(e) => this.SetValue("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    {this.state.errormessage && (this.state.LeadDTO[0].place == "") ? <p className="error">
                                        This Field is Required</p> : null}
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        success={this.state.passportNoState === "success"}
                                        error={this.state.passportNoState === "error"}
                                        labelText="Passport"
                                        id="passport"
                                        name="passportNo"
                                        value={this.state.LeadDTO[0].passportNo}
                                        onChange={(e) => this.SetValue("passportNo", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />

                                </GridItem>

                            </GridContainer>

                            {
                                this.state.isDontShow &&
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <MasterDropdown
                                            labelText="Gender"
                                            id="LeadDTO.gender"
                                            value={this.state.LeadDTO[0].gender}
                                            lstObject={this.state.masterList}
                                            filterName='Gender'
                                            model="LeadDTO"
                                            name='gender'
                                            onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {this.state.errormessage && this.state.isDontShow && (this.state.LeadDTO[0].gender == "") ? <p className="error">
                                            This Field is Required</p> : null}
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <MasterDropdown
                                            labelText="Marital Status"
                                            id="LeadDTO.maritalStatusID"
                                            value={this.state.LeadDTO[0].maritalStatusID}
                                            lstObject={this.state.masterList}
                                            filterName='MaritalStatus'
                                            model="LeadDTO"
                                            name='maritalStatusID'
                                            onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {this.state.errormessage && this.state.isDontShow && (this.state.LeadDTO[0].maritalStatusID == "") ? <p className="error">
                                            This Field is Required</p> : null}
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomDatetime
                                            required={true}
                                            success={this.state.dateOfBirthState === "success"}
                                            error={this.state.dateOfBirthState === "error"}
                                            value={this.state.LeadDTO[0].dateOfBirth}
                                            labelText="Date Of Birth"
                                            id='dob'
                                            name='dateOfBirth' onChange={(e) => this.onDateChange("date", "dateOfBirth", e)}
                                            formControlProps={{ fullWidth: true }} />
                                        {this.state.errormessage && this.state.isDontShow && (this.state.LeadDTO[0].dateOfBirth == "") ? <p className="error">
                                            This Field is Required</p> : null}
                                    </GridItem>



                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            required={true}
                                            success={this.state.ageState === "success"}
                                            error={this.state.ageState === "error"}
                                            labelText="Age"
                                            id="age"
                                            name="age"
                                            value={this.state.LeadDTO[0].age}
                                            onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {this.state.errormessage && this.state.isDontShow && (this.state.LeadDTO[0].age == "") ? <p className="error">
                                            This Field is Required</p> : null}
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            required={true}
                                            success={this.state.occupationIDState === "success"}
                                            error={this.state.occupationIDState === "error"}
                                            labelText="Occupation"
                                            id="occupation"
                                            name="occupationID"
                                            value={this.state.LeadDTO[0].occupationID}
                                            onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {this.state.errormessage && this.state.isDontShow && (this.state.LeadDTO[0].occupationID == "") ? <p className="error">
                                            This Field is Required</p> : null}
                                    </GridItem>


                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            required={true}
                                            success={this.state.monthlyIncomeState === "success"}
                                            error={this.state.monthlyIncomeState === "error"}

                                            labelText="Average Annual Income"
                                            id="monthlyIncome"
                                            name="monthlyIncome"
                                            value={this.state.LeadDTO[0].monthlyIncome}
                                            onChange={(e) => this.SetValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {this.state.errormessage && this.state.isDontShow && (this.state.LeadDTO[0].monthlyIncome == "") ? <p className="error">
                                            This Field is Required</p> : null}
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <MasterDropdown
                                            labelText="Currency"
                                            id="LeadDTO.currency"
                                            value={this.state.LeadDTO[0].currency}
                                            lstObject={this.state.masterList}
                                            filterName='Currency'
                                            model="LeadDTO"
                                            name='currency'
                                            onChange={(e) => this.SetValue("string", e)}
                                        />
                                    </GridItem>
                                    {
                                        this.state.isDntShowQtnRadioBtn &&

                                        <GridContainer lg={12}>
                                            <GridItem xs={12}>
                                                <h6> <p>Do You Smoke ?</p></h6>
                                            </GridItem>

                                            <GridItem xs={12} sm={6} >
                                                <div>

                                                    <FormControlLabel
                                                        control={
                                                            <Radio
                                                                checked={props.selectedValue === "TabacoYes"}
                                                                onChange={props.handleRadioChangeT}
                                                                value="TabacoYes"
                                                                name="radio1"
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
                                                        label="Yes"
                                                    />


                                                    <FormControlLabel
                                                        control={
                                                            <Radio
                                                                checked={props.selectedValue === "TabacoNo"}
                                                                onChange={props.handleRadioChangeT}
                                                                value="TabacoNo"
                                                                name="radio1"
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
                                                        label="No"
                                                    />
                                                </div>
                                            </GridItem>
                                        </GridContainer>

                                    }
                                </GridContainer>}

                        </CardBody>

                        {
                            this.state.isDontShow &&

                            <CardHeader color="rose" icon>

                                {
                                    <GridItem>
                                        <h4 >
                                            <small> Communication Address </small>
                                        </h4>
                                    </GridItem>
                                }
                            </CardHeader>

                        }

                        <CardBody>

                            {
                                this.state.isDontShow &&
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            required={true}
                                            success={this.state.address1State === "success"}
                                            error={this.state.address1State === "error"}
                                            labelText="Address 1"
                                            id="address1"
                                            name="address1"

                                            value={this.state.addressDTO.address1}
                                            onChange={(e) => this.SetaddressValue("string", e)}

                                            SetValue
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {this.state.errormessage && (this.state.addressDTO.address1 == null) ? <p className="error">
                                            This Field is Required</p> : null}
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            required={true}
                                            success={this.state.address2State === "success"}
                                            error={this.state.address2State === "error"}
                                            labelText="Address 2"
                                            id="address2"
                                            name="address2"
                                            value={this.state.addressDTO.address2}
                                            onChange={(e) => this.SetaddressValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                        {this.state.errormessage && (this.state.addressDTO.address2 == null) ? <p className="error">
                                            This Field is Required</p> : null}
                                    </GridItem>


                                    <GridItem xs={12} sm={12} md={3}>
                                        <CustomInput
                                            success={this.state.address3State === "success"}
                                            error={this.state.address3State === "error"}
                                            labelText="Address 3"
                                            id="address3"
                                            name="address3"
                                            value={this.state.addressDTO.address3}
                                            onChange={(e) => this.SetaddressValue("string", e)}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />

                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={3}>
                                        <Dropdown
                                            labelText="Country"
                                            required={true}
                                            lstObject={this.state.LocationDTO.Country}
                                            value={this.state.addressDTO.countryId}
                                            name="countryId"
                                            onChange={(e) => this.GetLocation('State', e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                        {this.state.errormessage && (this.state.addressDTO.countryId == null) ? <p className="error">
                                            This Field is Required</p> : null}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <Dropdown
                                            labelText="State"
                                            required={true}
                                            lstObject={this.state.LocationDTO.State}
                                            value={this.state.addressDTO.stateId}
                                            name="stateId"
                                            onChange={(e) => this.GetLocation('District', e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                        {this.state.errormessage && (this.state.addressDTO.stateId == null) ? <p className="error">
                                            This Field is Required</p> : null}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <Dropdown
                                            labelText="District"
                                            required={true}
                                            lstObject={this.state.LocationDTO.District}
                                            value={this.state.addressDTO.districtId}
                                            name="districtId"
                                            onChange={(e) => this.GetLocation('City', e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                        {this.state.errormessage && (this.state.addressDTO.districtId == null) ? <p className="error">
                                            This Field is Required</p> : null}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <Dropdown
                                            labelText="City"
                                            required={true}
                                            lstObject={this.state.LocationDTO.City}
                                            value={this.state.addressDTO.cityId}
                                            name="cityId"
                                            onChange={(e) => this.GetLocation('Pincode', e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                        {this.state.errormessage && (this.state.addressDTO.cityId == null) ? <p className="error">
                                            This Field is Required</p> : null}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={3}>
                                        <Dropdown
                                            labelText="Pincode"
                                            required={true}
                                            lstObject={this.state.LocationDTO.Pincode}
                                            value={this.state.addressDTO.areaId}
                                            name="areaId"
                                            onChange={(e) => this.GetLocation('', e)}
                                            formControlProps={{ fullWidth: true }}
                                        />
                                        {this.state.errormessage && (this.state.addressDTO.areaId == null) ? <p className="error">
                                            This Field is Required</p> : null}
                                    </GridItem>
                                </GridContainer>
                            }

                            {
                                this.state.isDontShow &&


                                <GridContainer justify="center">
                                    <GridItem xs={3}>
                                        <Button color="info" round className="edit" onClick={this.modifySuspect} >Save</Button>
                                    </GridItem>
                                </GridContainer>

                            }
                            {
                                this.state.isDontShowCreateLeadBtn &&
                                <GridContainer justify="center">
                                    <GridItem >
                                        <div>
                                            <Button color="info"
                                                round className={props.classes.marginRight}
                                                onClick={this.handleLeadSave}
                                                id="saveBtn" >
                                                Save
                                </Button>
                                        </div>
                                    </GridItem>

                                </GridContainer>

                            }


                        </CardBody>

                    </Animated>






                }  {this.renderRedirectL()}
                {this.renderRedirect()}


            </GridContainer>
        );
    }


}


export default withStyles(styles)(CommonModify);
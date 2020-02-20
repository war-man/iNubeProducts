import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ProfileDetails from "./_ProfileDetails";
import PartnerAddress from "./_PartnerAddress.jsx";
import Button from "components/CustomButtons/Button.jsx";
import $ from 'jquery';
import swal from 'sweetalert';
import validationPage from "./ValidationPage.jsx";
// style for this view
//import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
import { Redirect } from 'react-router-dom';
import partnerconfig from "modules/Partners/PartnerConfig.js";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import { TRANSLATIONS } from 'components/Translation/constants/translations';
import stringInject from 'stringinject';
import CommonMessage from "Messages/CommonMessage.jsx";

const paddingCard =
{
    padding: "10px",
};

class Partner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageloader: false,
            nodata: false,
            loader: true,
            servermessage:"",
            message: false,
            partnerCodeState:"",
            ProfileEmailState: "",
            visibility: false,
            disabled: this.props.disabled,
            maxLengthState: "",
            redirect: false,
            emailState: "",
            email: "",
            pan: "",
            cpartnerid: "",
            partname: "",
            panState: "",
            mobile: "",
            mobileState: "",
            telephone: "",
            telephoneState: "",
            partnerName: "",
            partnerNameState: "",
            salutationId: "",
            salutationIdState: "",
            partnerClassId: "",
            partnerClassIdState: "",
            partnerTypeIdState: "",
            website: "",
            websiteState: "",
            partnerAddressLine1: "",
            partnerAddressLine1State: "",
            partnerAddressLine2: "",
            partnerAddressLine2State: "",
            partnerAddressLine3: "",
            partnerAddressLine3State: "",
            masterList: [],
            noredirect: this.props.close,
            partnerId: this.props.partnerId,
            open: this.props.open,
            displaybtn: true,
            editModal: this.props.editModal,
            isdisable: this.props.isdisable,
            disable: this.props.disable,
            base64: [],
            selectedimage: "",
            imagePreviewUrl: '',
            profileimage: [],
            formData: {},
            viewEditFlag:false,
            addressDTO: {
                "corp": {
                    "partnerAddressId": 0,
                    "partnerId": 0,
                    "partnerAddressType": "",
                    "partnerCountryId": "",
                    "partnerStateId": "",
                    "partnerDistrictId": "",
                    "partnerCityId": "",
                    "partnerAddressLine1": "",
                    "partnerAddressLine2": "",
                    "partnerAddressLine3": "",
                    "partnerPincodeId": ""
                },
                "off": {
                    "partnerAddressId": 0,
                    "partnerId": 0,
                    "partnerAddressType": "",
                    "partnerCountryId": "",
                    "partnerStateId": "",
                    "partnerDistrictId": "",
                    "partnerCityId": "",
                    "partnerAddressLine1": "",
                    "partnerAddressLine2": "",
                    "partnerAddressLine3": "",
                    "partnerPincodeId": ""
                },
                "resetoff": {
                    "partnerAddressId": 0,
                    "partnerId": 0,
                    "partnerAddressType": "",
                    "partnerCountryId": "",
                    "partnerStateId": "",
                    "partnerDistrictId": "",
                    "partnerCityId": "",
                    "partnerAddressLine1": "",
                    "partnerAddressLine2": "",
                    "partnerAddressLine3": "",
                    "partnerPincodeId": ""
                },
                "corpSelectedValue": 1,
                "mailSelectedValue": 1
            },
            PartnerDTO: {
                "partnerCode":"",
                "partnerTypeId": "",
                "partnerClassId": "",
                "salutationId": "",
                "partnerName": "",
                "fax": "",
                "telephone": "",
                "mobile": "",
                "email": "",
                "pan": "",
                "website": "",
                "gst": true,
                "gstnumber": "",
                "pannumber": "",
                "cinnumber": "",
                "isActive":true,
                "partnerAddress": [
                    {
                    }
                ]
            },
            errormessage:false,
            initialPartnerDTO: {
                "partnerTypeId": "",
                "partnerClassId": "",
                "salutationId": "",
                "partnerName": "",
                "fax": "",
                "telephone": "",
                "mobile": "",
                "email": "",
                "pan": "",
                "website": "",
                "gst": true,
                "gstnumber": "",
                "pannumber": "",
                "cinnumber": "",
                "isActive": true,
                "partnerAddress": [
                    {
                    }
                ]
            },
            errors: {},
            fields: {},
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
                RPincode: [],
                "selectedValue": null,
                validateUI:false,
            }
        }
        this.SetValue = this.SetValue.bind(this);
        this.GetLocationService = this.GetLocationService.bind(this);
        //this.SavePartner = this.SavePartner.bind(this);
        this.SavePartAssignProd = this.SavePartAssignProd.bind(this);
        this.modifyValue = this.modifyValue.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    }

    SetValue = (Type, event) => {
        let PartnerDTO = this.state.PartnerDTO;
        let name = event.target.name;
        let value = event.target.value;
        
        PartnerDTO[name] = value;

        this.setState({ PartnerDTO });
        this.setState({ fields: PartnerDTO })
        this.change(event, name, Type);
        //this.state.errors = "";
        console.log("select value", event.target.name, event.target.value);
        if (event.target.name == "partnerTypeId" && this.state.PartnerDTO.pan.length > 0) {
            if (validationPage.verifyPanIndNum(this.state.PartnerDTO.pan, event.target.value)) {
                    this.setState({ ["panState"]: 'success' });
                } else {
                    this.setState({ ["panState"]: 'error'});
                }
        } 
        this.state.errors[name] = "";
        if (name === "partnerCode") {

            fetch(`${partnerconfig.partnerconfigUrl}/api/Partner/PartnerCodevalidation?partnercode=` + value, {
                //fetch(`https://localhost:44315/api/Partner/PartnerCodevalidation?partnercode=` + value,{
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
                        this.setState({ message: true });
                        this.setState({ partnerCodeState: "error" });
                    } else {
                        this.setState({ message: false });

                    }
                });
        }
        //if (event.target.name == "partnerTypeId" && event.target.value == 9) {
        //    if (this.state.PartnerDTO.pan.length > 0) {
        //        if (validationPage.verifyPanIndNum(this.state.PartnerDTO.pan, 10)) {
        //            this.setState({ ["panState"]:'success' });
        //        } else {
        //            this.setState({ ["panState"]: 'error'});
        //        }
        //        console.log("select value now", this.state.PartnerDTO.pan)
        //    }
        //} 
      
    };

    validateForm() {
        let fields = this.state.fields;
        let verrors = {};
        let formIsValid = true;

        if (!fields["partnerTypeId"]) {
            formIsValid = false;
            verrors["partnerTypeId"] = "*Required field data is missing";
        }
        if (!fields["partnerClassId"]) {
            formIsValid = false;
            verrors["partnerClassId"] = "*Required field data is missing";
        }
        if (!fields["salutationId"]) {
            formIsValid = false;
            verrors["salutationId"] = "*Required field data is missing";
        }
        if (!fields["partnerName"]) {
            formIsValid = false;
            verrors["partnerName"] = "*Required field data is missing";
        }
        if (!fields["countryId"]) {
            formIsValid = false;
            verrors["countryId"] = "*Required field data is missing";
        }
        if (!fields["stateId"]) {
            formIsValid = false;
            verrors["stateId"] = "*Required field data is missing";
        }
        if (!fields["districtId"]) {
            formIsValid = false;
            verrors["districtId"] = "*Required field data is missing";
        }
        if (!fields["cityId"]) {
            formIsValid = false;
            verrors["cityId"] = "*Required field data is missing";
        }
        if (!fields["addressLine1"]) {
            formIsValid = false;
            verrors["addressLine1"] = "*Required field data is missing";
        }
        if (!fields["website"]) {
            formIsValid = false;
            verrors["website"] = "*Required field data is missing";
        }
        if (!fields["email"]) {
            formIsValid = false;
            verrors["email"] = "*Required field data is missing";
        }
        if (!fields["mobile"]) {
            formIsValid = false;
            verrors["mobile"] = "*Required field data is missing";
        }
        if (!fields["pan"]) {
            formIsValid = false;
            verrors["pan"] =  "*Required field data is missing";
        }
        this.setState({
            errors: verrors
        });
        return formIsValid;
    }

    GetLocation = (type, addType, event) => {
        this.SetValue(type, event);
        let reg = this.state.addressDTO[addType];
        let name = event.target.name;
        let value = event.target.value;
        reg[name] = value;

        this.setState({ reg })
        if (type != "") {
            this.GetLocationService(type,addType, event.target.value);
        }
    };

    GetLocationService = (type, addType, pID) => {
        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetLocation?locationType=` + type + `&parentID=` + pID, {
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
                if (addType == 'corp') {
                    locDTO[type] = lData;
                } else if (addType == 'c') {
                    locDTO[type] = lData;
                    locDTO['R' + type] = lData;
                } else {
                    locDTO['R' + type] = lData;
                }
                this.setState({ locDTO });
                console.log("locations",this.state.LocationDTO)
            });
    };

    modifyValue = (value) => {
        let PartnerDTO = value;
        this.setState({ PartnerDTO: PartnerDTO });
    }

    componentDidMount() {

        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetMasterData?sMasterlist=OrgCategory`, {
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
        this.GetLocationService('Country','c', 0);

        const props = this.props;
        if (props.searchPartnerId != undefined) {
            debugger;
            var self = this;
            let PartnerDTO = this.state.PartnerDTO;
            this.setState({
                partnerId: props.searchPartnerId,
                editModal: props.editModal,
                visibility: props.visibility,
                displaybtn: props.displaybtn,
                viewEditFlag: props.viewEditFlag,
            })

            self.setState({
                partnerNameState: "success",
                telephoneState: "success",
                mobileState: "success",
                emailState: "success",
                panState: "success",
                websiteState: "success",
            });

            fetch(`${partnerconfig.partnerconfigUrl}/api/Partner/GetPartnerDetails?partnerId=` + props.searchPartnerId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(function (data) {
                    if (props.editModal == true) {
                        PartnerDTO = data;
                        self.setState({ PartnerDTO: data });
                        console.log("partner data: ", data);
                        let addDet = self.state.addressDTO;
                        if (self.state.PartnerDTO.partnerAddress.length == 1) {
                            self.GetLocationService('State','c', self.state.PartnerDTO.partnerAddress[0].partnerCountryId);
                            self.GetLocationService('District','c', self.state.PartnerDTO.partnerAddress[0].partnerStateId);
                            self.GetLocationService('City', 'c', self.state.PartnerDTO.partnerAddress[0].partnerDistrictId);
                            self.GetLocationService('Pincode', 'c',self.state.PartnerDTO.partnerAddress[0].partnerCityId);
                            addDet['corp'] = self.state.PartnerDTO.partnerAddress[0];
                            addDet['off'] = self.state.PartnerDTO.partnerAddress[0];
                            addDet['corpSelectedValue'] = 0;
                        } else {
                            addDet['corp'] = self.state.PartnerDTO.partnerAddress[0];
                            self.GetLocationService('State','corp', self.state.PartnerDTO.partnerAddress[0].partnerCountryId);
                            self.GetLocationService('District', 'corp', self.state.PartnerDTO.partnerAddress[0].partnerStateId);
                            self.GetLocationService('City', 'corp', self.state.PartnerDTO.partnerAddress[0].partnerDistrictId);
                            self.GetLocationService('Pincode', 'corp', self.state.PartnerDTO.partnerAddress[0].partnerCityId);
                            addDet['off'] = self.state.PartnerDTO.partnerAddress[1];
                            self.GetLocationService('State','off', self.state.PartnerDTO.partnerAddress[1].partnerCountryId);
                            self.GetLocationService('District', 'off', self.state.PartnerDTO.partnerAddress[1].partnerStateId);
                            self.GetLocationService('City', 'off', self.state.PartnerDTO.partnerAddress[1].partnerDistrictId);
                            self.GetLocationService('Pincode', 'off', self.state.PartnerDTO.partnerAddress[1].partnerCityId);
                            addDet['corpSelectedValue'] = 1;
                        }
                        self.setState({ addDet }); 
                    }
                    self.setState({ PartnerDTO });
                    self.modifyValue(PartnerDTO)
                });
            console.log("modify data", this.state.mobileState);
            this.setState({});
        }
        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }.bind(this), 2000
        );
    }

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/Partners/Assign',
                state: {
                    cpartnerid: this.state.cpartnerid,
                    partname: this.state.partname,
                }
            }} />
        }
    }

    handleRadioChange = (event) => {
        let addressDTO = this.state.addressDTO;
        let value = event.target.value;
        let name = 'corpSelectedValue';
        addressDTO[name] = value;

        if (value == 0) {
            this.state.LocationDTO.RCountry = this.state.LocationDTO.Country;
            this.state.LocationDTO.RState = this.state.LocationDTO.State;
            this.state.LocationDTO.RDistrict = this.state.LocationDTO.District;
            this.state.LocationDTO.RCity = this.state.LocationDTO.City;
            this.state.LocationDTO.RPincode = this.state.LocationDTO.Pincode;
            addressDTO.off = { ...addressDTO.corp };
            this.setState({ disable: true });
            //this.state.disable = true;
            //disable rbtn
        }
        else if (value == 1) {
            this.state.LocationDTO.RState = [];
            this.state.LocationDTO.RDistrict = [];
            this.state.LocationDTO.RCity = [];
            this.state.LocationDTO.RPincode = [];
            addressDTO.off = { ...addressDTO.resetoff };
            this.setState({ disable: false });
            //this.state.disable = false;
        }
        this.setState({ addressDTO });
    }

    SavePartAssignProd(event) {
        debugger;
        this.UIValidation();
        console.log("modify data", this.state.mobileState, this.state.validateUI);
        
        if (this.state.validateUI == true) {
            if (this.state.PartnerDTO.partnerTypeId != "" && this.state.PartnerDTO.partnerClassId != "" &&
                this.state.PartnerDTO.salutationId != "" && this.state.PartnerDTO.partnerName != "" &&
                this.state.PartnerDTO.mobile != "" && this.state.PartnerDTO.email != "" &&
                this.state.PartnerDTO.pan != "" && this.state.PartnerDTO.website != "" && this.state.PartnerDTO.partnerCode != null) {
                let address = [];
                address.push(this.state.addressDTO.corp);
                if (this.state.addressDTO.corpSelectedValue == 1) {
                    address.push(this.state.addressDTO.off);
                }
                delete this.state.addressDTO.corp['partnerAddressId']
                delete this.state.addressDTO.off['partnerId']
                delete this.state.addressDTO.corp['partnerId']
                delete this.state.addressDTO.off['partnerAddressId']

                let active = true;
                let PartnerDTO = this.state.PartnerDTO;
                PartnerDTO['partnerAddress'] = address;
                PartnerDTO['isActive'] = active;
                this.setState({ PartnerDTO });
                console.log("partners data", PartnerDTO);
                
                const that = this;

                fetch(`${partnerconfig.partnerconfigUrl}/api/Partner/CreatePartner`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    },
                    body: JSON.stringify(this.state.PartnerDTO)
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    that.setState({ PartnerDTO: data });
                    const partnerId = that.state.PartnerDTO.partnerId;
                    const partnerName = that.state.PartnerDTO.partnerName;
                    if (data.status == 2) {
                        swal({
                            text: data.responseMessage,
                            icon: "success"
                        });
                        console.log("response data", data);
                        that.setState({ cpartnerid: data.id, partname: data.partner.partnerName, });
                        console.log("partner", that.state.partname)
                        if (that.state.noredirect == false) {
                            that.setState({ redirect: false });
                            that.props.handleClose();
                        } else {
                            that.state.redirect = false;
                            that.setState({ redirect: true });
                        }
                    }
                    else if (data.StatusCode == 500) {
                        swal({
                            text: "Already defined name",
                            icon: "error"
                        });
                        that.setState({ PartnerDTO: PartnerDTO });
                        //that.state.PartnerDTO = that.state.PartnerDTO;
                        //that.setState({ PartnerDTO: that.state.PartnerDTO });
                    } else {
                        swal({
                            text: "Some fields are missing",
                            icon: "error"
                        });
                        that.setState({ PartnerDTO: PartnerDTO });
                        //that.state.PartnerDTO = that.state.PartnerDTO;
                        //that.setState({ PartnerDTO: that.state.PartnerDTO });
                    }
                });
            }
            else {
                var msg = CommonMessage("MissingField", []);
                swal({
                    text: msg,
                    icon: "error"
                });
                this.setState({ errormessage: true });
            }
        }
        else {
            var msg = CommonMessage("InvalidField", []);
            swal({
                text: msg,
                icon: "error"
            });

            this.setState({ errormessage: true });
        }

      

    }


    change(event, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "string":
                if (validationPage.verifyName(event.target.value)) {
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
            case "pan":
                console.log("this.state.masterList[0].mdata[1].mID", this.state.PartnerDTO.partnerTypeId);
                if (validationPage.verifyPanIndNum(event.target.value, this.state.PartnerDTO.partnerTypeId)) {
                        this.setState({ [stateName + "State"]: "success" });
                    } else {
                        this.setState({ [stateName + "State"]: "error" });
                    }
                break;
            case "number":
                if (validationPage.verifyNumber(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "partnerName":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "telephone":
                if (validationPage.verifytelephone(event.target.value,12)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "addLineName":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "equalTo":
                if (validationPage.compare(event.target.value, this.state[stateNameEqualTo])) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "checkbox":
                if (event.target.checked) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "length":
                if (validationPage.verifyLength(event.target.value, stateNameEqualTo)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "max-length":
                if (!validationPage.verifyLength(event.target.value, stateNameEqualTo + 1)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "Url":
                if (validationPage.verifyUrl(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "min-value":
                if (
                    validationPage.verifyNumber(event.target.value) &&
                    event.target.value >= stateNameEqualTo
                ) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "max-value":
                if (
                    validationPage.verifyNumber(event.target.value) &&
                    event.target.value <= stateNameEqualTo
                ) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "range":
                if (
                    validationPage.verifyNumber(event.target.value) &&
                    event.target.value >= stateNameEqualTo &&
                    event.target.value <= maxValue
                ) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            default:
                break;
        } 
    }

    UIValidation = () => {
        debugger;
        if (this.state.partnerNameState == "success" && this.state.mobileState == "success" && this.state.emailState == "success" && this.state.panState == "success" && this.state.websiteState == "success") {
            //  this.setState({ validateUI: true });
            this.state.validateUI = true;
        }
        else{
           // this.setState({ validateUI: false });
            this.state.validateUI = false;
        }
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
        this.setState({ formData: data });
        console.log("formdata", this.state.formData)
        this.logoUpload(data);
    }

    logoUpload = (data) => {
        $.ajax({
            type: "POST",
            url: `${partnerconfig.partnerconfigUrl}/api/Partner/UploadLogo/UploadLogo?partnerId=` + localStorage.getItem('userId'),
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

    render() { 
        return (
            <div>
                {this.state.pageloader ?
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <ProfileDetails disabled={this.state.disabled} servermessage={this.state.servermessage} errormessage={this.state.errormessage} PartnerDTO={this.state.PartnerDTO} masterList={this.state.masterList} SetValue={this.SetValue} classes={this.classes} websiteState={this.state.websiteState} emailState={this.state.emailState} telephoneState={this.state.telephoneState} mobileState={this.state.mobileState} panState={this.state.panState} partnerNameState={this.state.partnerNameState} salutationIdState={this.state.salutationIdState} partnerTypeIdState={this.state.partnerTypeIdState} partnerClassIdState={this.state.partnerClassIdState} fileSelectedHandler={this.fileSelectedHandler} message={this.state.message} partnerCodeState={this.state.partnerCodeState} />
                            <PartnerAddress viewEditFlag={this.state.viewEditFlag} disabled={this.state.disable} errormessage={this.state.errormessage} addressDTO={this.state.addressDTO} LocationDTO={this.state.LocationDTO} masterList={this.state.masterList} SetValue={this.SetValue} classes={this.classes} GetLocation={this.GetLocation} handleRadioChange={this.handleRadioChange} partnerAddressLine1State={this.state.partnerAddressLine1State} partnerAddressLine2State={this.state.partnerAddressLine2State} partnerAddressLine3State={this.state.partnerAddressLine3State} />
                    </GridItem>
                    <GridContainer lg={12} justify="center"> 
                            <GridItem xs={4} sm={2} md={3} lg={1} >
                        {this.renderRedirect()}  
                                {this.state.displaybtn ? <Button color="warning" onClick={this.SavePartAssignProd} round><TranslationContainer translationKey="Save" /></Button> : null}
                    {/*<Button color="danger" disabled={this.state.disabled} style={{ marginRight: "20px" }} round>Cancel</Button> 
                                <div>
                        {this.renderRedirect()}
                            <Button id="save" color="warning" disabled={this.state.disabled} onClick={this.SavePartAssignProd} round>Save & Assign Product</Button>
                            </div>
                           */}
                           
                    </GridItem>
                    </GridContainer>
                    </GridContainer>
                    : <PageContentLoader />}
            </div>
        );
    }
}
export default Partner;
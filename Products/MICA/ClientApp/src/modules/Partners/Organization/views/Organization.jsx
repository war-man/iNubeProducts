import React from "react";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ProfileDet from "./_ProfileDet";
import Address from "./_Address.jsx"
import Button from "components/CustomButtons/Button.jsx";
import validationPage from "./ValidationPage.jsx";
import swal from 'sweetalert';
import UserConfig from 'modules/Users/UserConfig.js';
import partnerconfig from "modules/Partners/PartnerConfig.js";

class Organization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: this.props.disabled,
            masterList: [],
            masterLists: [],
            orgNameState: "",
            orgName: "",
            orgPhoneNoState: "",
            orgPhoneNo: "",
            orgFaxNoState: "",
            topics: [],
            orgFaxNo: "",
            orgWebsiteState: "",
            orgWebsite: "",
            orgAddressLine1State: "",
            orgAddressLine1: "",
            orgAddressLine2State: "",
            orgAddressLine2: "",
            orgAddressLine3State: "",
            orgAddressLine3: "",
            spocmobilenoState: "",
            spocmobileno: "",
            spocpanNoState: "",
            spocpanNo: "",
            spocemailIdState: "",
            spocemailId: "",
            spocfirstName: "",
            spocfirstNameState: "",
            spocdesignationState: "",
            spocdesignation: "",
            spocnameState: "",
            spocname: "",
            OrganizationId: this.props.searchOrganizationId,
            editModal: this.props.editModal,
            addressDTO: {
                "corp": {
                    "orgAddressId": 0,
                    "organizationId": 0,
                    "orgAddressType": "C",
                    "orgCountryId": "",
                    "orgStateId": "",
                    "orgDistrictId": "",
                    "orgCityId": "",
                    "orgAddressLine1": "",
                    "orgAddressLine2": "",
                    "orgAddressLine3": "",
                    "orgPincodeId": ""
                },
                "reg": {
                    "orgAddressId": 0,
                    "organizationId": 0,
                    "orgAddressType": "R",
                    "orgCountryId": "",
                    "orgStateId": "",
                    "orgDistrictId": "",
                    "orgCityId": "",
                    "orgAddressLine1": "",
                    "orgAddressLine2": "",
                    "orgAddressLine3": "",
                    "orgPincodeId": ""
                },
                "mail": {
                    "orgAddressId": 0,
                    "organizationId": 0,
                    "orgAddressType": "M",
                    "orgCountryId": "",
                    "orgStateId": "",
                    "orgDistrictId": "",
                    "orgCityId": "",
                    "orgAddressLine1": "",
                    "orgAddressLine2": "",
                    "orgAddressLine3": "",
                    "orgPincodeId": "",
                },
                "reset": {
                    "orgAddressId": 0,
                    "organizationId": 0,
                    "orgAddressType": "O",
                    "orgCountryId": "",
                    "orgStateId": "",
                    "orgDistrictId": "",
                    "orgCityId": "",
                    "orgAddressLine1": "",
                    "orgAddressLine2": "",
                    "orgAddressLine3": "",
                    "orgPincodeId": ""
                },
                "spoc": {
                    "orgSpocId": 0,
                    "organizationId": 0,
                    "spocfirstName": "",
                    "spocmobileno": "",
                    "spocemailId": "",
                    "spocdesignation": "",
                    "spoccountryId": "",
                    "spocstateId": "",
                    "spocdistrictId": "",
                    "spoccityId": "",
                    "spocaddressLine1": "",
                    "spocaddressLine2": "",
                    "spocaddressLine3": "",
                    "spocpincodeId": "",
                    "spocMiddleName": "",
                    "spocLastName": "",
                    "spocdob": "",
                    "spocdoj": "",
                    "spocpanNo": "",
                    "landLineOffice": "",
                    "landLineResidence": "",
                    "spocUserName": "",
                    "spocMaritalStatusId": "",
                    "spocGenderId": "",
                },
                "corpSelectedValue": 1,
                "mailSelectedValue": 4
            },
            isButtonvisibility:false,
            LocationDTO: {
                "Country": [],
                State: [],
                District: [],
                City: [],
                Pincode: []
            },
            orgid: "",
            open:false,
            OrganizationDTO: {
                "organizationId": 0,
                "orgCategoryId": "",
                "configurationTypeId": 4,
                "orgTypeId": "",
                "orgName": "",
                "corpAddressSameAs": "",
                "mailingAddressSameAs": "",
                "orgWebsite": "",
                "orgPhoneNo": "",
                "orgFaxNo": "",
                "orgLevels": 0,
                "orgRegistrationNo": "",
                "orgRegisteringAuthority": "",
                "orgServiceTaxRegistrationNumber": "",
                "orgPanno": "",
                "orgTanno": "",
                "customerId": 0,
                "parentId": 0,
                "createdBy": "",
                "createdDate": "",
                "modifiedBy": "",
                "modifiedDate": "",
                "tblOrgAddress": [
                ],
                "tblOrgSpocDetails": [
                ]
            }
        }
        this.SetValue = this.SetValue.bind(this);
        this.GetLocationService = this.GetLocationService.bind(this);
        this.handleSub = this.handleSub.bind(this);
        this.modifyValue = this.modifyValue.bind(this);
    }

    modifyValue = (value) => {
        let OrganizationDTO = value;
        this.setState({ OrganizationDTO: OrganizationDTO });
    }

    SetValue = (type, event) => {
        let OrganizationDTO = this.state.OrganizationDTO;
        let name = event.target.name;
        let value = event.target.value;
        OrganizationDTO[name] = value;

        this.setState({ OrganizationDTO })
        this.change(event, name, type);
    };

    handleChange = (type, event) => {
        let address = this.state.addressDTO.spoc;
        let name = event.target.name;
        let value = event.target.value;
        address[name] = value;
        this.setState({ address });
        this.change(event, name, type);
    }

    SetValueNew = (path, event) => {
        let sPath = path.split('.');
        let tempDTO = this.state[sPath[0]];
        for (var i = 1; i < sPath.length; i++) {
            tempDTO = tempDTO[sPath[i]];
        }
        let name = event.target.name;
        let value = event.target.value;
        tempDTO[name] = value;
        this.setState({ tempDTO });
    };

    onDateChange = (name, event) => {
        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        let userd = this.state.addressDTO.spoc;
        userd[name] = date;
    };

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
            },})
            .then(response => response.json())
            .then(data => {
                const lData = data;
                let locDTO = this.state.MasterDTO;
                locDTO[type] = lData;
                this.setState({ locDTO });

            });
    };

    componentDidMount() {
        fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/GetMasterData?sMasterlist=abc`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },})
            .then(response => response.json())
            .then(data => {
                this.setState({ masterLists: data });
            });

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
        
        this.GetLocationService('Country', 0);

        const props = this.props;
        if (props.searchOrganizationId != "") {
            var self = this;
            let OrganizationDTO = this.state.OrganizationDTO;
            this.setState({ organizationId: props.searchOrganizationId, editModal: props.editModal, isButtonvisibility: props.btnvisibility })
            //console.log('Props update server call', props, props.searchOrganizationId, this.state.OrganizationId);
            fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetOrganization?orgId=` + props.searchOrganizationId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            //fetch(`https://localhost:44315/api/Organization/GetOrganization?orgId=` + props.searchOrganizationId,{
            })
                .then(response => response.json())
                .then(function (data) {
                    console.log('Response data1', data);
                    if (props.editModal == true) {
                        OrganizationDTO = data;

                        self.setState({ OrganizationDTO: data });
                        self.GetLocationService('State', self.state.OrganizationDTO.tblOrgAddress[0].orgCountryId);
                        self.GetLocationService('District', self.state.OrganizationDTO.tblOrgAddress[0].orgStateId);
                        self.GetLocationService('City', self.state.OrganizationDTO.tblOrgAddress[0].orgDistrictId);
                        self.GetLocationService('Pincode', self.state.OrganizationDTO.tblOrgAddress[0].orgCityId);
                        console.log("length", self.state.OrganizationDTO.tblOrgAddress.length)
                        let addDet = self.state.addressDTO;
                        addDet['corp'] = self.state.OrganizationDTO.tblOrgAddress[0];
                        addDet['reg'] = self.state.OrganizationDTO.tblOrgAddress[0];
                        addDet['mail'] = self.state.OrganizationDTO.tblOrgAddress[0];
                        addDet['spoc'] = self.state.OrganizationDTO.tblOrgSpocDetails[0];
                        self.setState({ addDet });
                        //console.log("adddet", addDet);
                        //console.log("OrganizationAddressLine1", self.state.addressDTO);
                        //console.log("spoc data", addDet['spoc']);
                        //console.log("Organizationtype" + OrganizationDTO.orgTypeId);
                        //console.log("modify Organization:", OrganizationDTO);
                    }
                    else {
                    }
                    self.setState({ OrganizationDTO });
                    self.modifyValue(OrganizationDTO)
                });
        }
    }
        
    handleSub = event => {
            event.preventDefault();
        let address = [];
        address.push(this.state.addressDTO.reg);
        if (this.state.addressDTO.corpSelectedValue == 1) {
            address.push(this.state.addressDTO.corp);
        }
        if (this.state.addressDTO.mailSelectedValue == 4) {
            address.push(this.state.addressDTO.mail);
        }
        let organizationDTO = this.state.OrganizationDTO;
        organizationDTO['tblOrgAddress'] = address;
         organizationDTO['tblOrgSpocDetails'].push(this.state.addressDTO.spoc);
        
        this.setState({ organizationDTO });
        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/CreateOrganizationAsync`, {
        //fetch(`https://localhost:44315/api/Organization/CreateOrganizationAsync`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.OrganizationDTO)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.status==2) {
                swal({
                    text: data.responseMessage ,
                    icon: "success"
                });
                this.setState({ open: true });
            } else {
                swal({
                    text:" Try again by entering values" ,
                    icon: "error"
                });
            }
        });
    }
    GetLocation = (type, addType, event) => {
   
       this.SetValue(type,event);
        let reg = this.state.addressDTO[addType];
        let name = event.target.name;
        let value = event.target.value;
        reg[name] = value;
        this.setState({ shrink: true });
        this.setState({ reg })
        if (type != "") {
            this.GetLocationService(type, event.target.value);
            }
    };

    GetLocationService = (type, pID) => {
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
                locDTO[type] = lData;
                this.setState({ locDTO });
            });
    };

    
    handleRadioChange = (event) => {
        let addressDTO = this.state.addressDTO;
        let state = this.state;
        let value = event.target.value;
        let name = value > 1 ? 'mailSelectedValue' : 'corpSelectedValue';
        addressDTO[name] = value;

        console.log("corp val", this.state.addressDTO.corpSelectedValue);
        console.log("corp val", this.state.addressDTO.mailSelectedValue);

        if (value == 0) {
            addressDTO.corp = { ...addressDTO.reg };
            state.OrganizationDTO.corpAddressSameAs = 'R';
        }
        else if (value == 1) {
            addressDTO.corp = {};
            state.OrganizationDTO.corpAddressSameAs = '';
        }
        else if (value == "2")
        {
            addressDTO.mail = { ...addressDTO.reg };
            state.OrganizationDTO.mailingAddressSameAs = 'R';
        }
        else if (value == "3") {
            addressDTO.mail = { ...addressDTO.corp };
            state.OrganizationDTO.mailingAddressSameAs = 'C';
        }
        else if(value == "4")  {
            addressDTO.mail = {...addressDTO.reset};
            state.OrganizationDTO.mailingAddressSameAs = 'O';
        }else { }
        this.setState({ addressDTO,state });
    }

    change(event, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "email":
                if (validationPage.verifyEmail(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "pan":
                if (validationPage.verifyPanNum(event.target.value, 6)) {
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
            case "name":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: "success" });
                } else {
                    this.setState({ [stateName + "State"]: "error" });
                }
                break;
            case "faxno":
                if (validationPage.verifyLength(event.target.value, 14)) {
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
    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <ProfileDet OrganizationDTO={this.state.OrganizationDTO} masterList={this.state.masterList} disabled={this.state.disabled} SetValue={this.SetValue} classes={this.classes} orgFaxNoState={this.state.orgFaxNoState} orgPhoneNoState={this.state.orgPhoneNoState} orgNameState={this.state.orgNameState} orgWebsiteState={this.state.orgWebsiteState}/>
                        <Address OrganizationDTO={this.state.OrganizationDTO} handleChange={this.handleChange} disabled={this.state.disabled} GetMasterData={this.GetMasterData} onDateChange={this.onDateChange} LocationDTO={this.state.LocationDTO} handleRadioChange={this.handleRadioChange} masterLists={this.state.masterLists} masterList={this.state.masterList} SetValue={this.SetValue} classes={this.classes} GetLocation={this.GetLocation} addressDTO={this.state.addressDTO} orgAddressLine1State={this.state.orgAddressLine1State} orgAddressLine2State={this.state.orgAddressLine2State} spocpanNoState={this.state.spocpanNoState} orgAddressLine3State={this.state.orgAddressLine3State} spocfirstNameState={this.state.spocfirstName} spocemailIdState={this.state.spocemailIdState} spocmobilenoState={this.state.spocmobilenoState} spocdesignationState={this.state.spocdesignationState} spocnameState={this.state.spocnameState} />
                    </GridItem>
                    <div style={{ marginLeft: '44%' }} >
                        <Button round color="warning" onClick={this.handleSub}>Submit</Button>
                    </div>
                </GridContainer>
            </div>
        );
    }
}
export default Organization;
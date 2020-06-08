import React from "react";
//import Yelp from './util/Yelp';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ProfileDet from "./_ProfileDet";
import Address from "./_Address.jsx"
import Button from "components/CustomButtons/Button.jsx";
import validationPage from "./ValidationPage.jsx";
import swal from 'sweetalert';
import UserConfig from 'modules/Users/UserConfig.js';
import partnerconfig from "modules/Partners/PartnerConfig.js";
import { Redirect } from 'react-router-dom';
//import { validate } from "@material-ui/pickers";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { Select } from "@material-ui/core";
import { element } from "prop-types";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

class Organization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: [],
            pageloader: false,
            isShowSubmit: true,
            redirect: false,
            disabled: this.props.disabled,
            masterList: [],
            masterLists: [],
            orgNameState: false,
            orgName: "",
            orgPhoneNoState: false,
            orgPhoneNo: "",
            orgFaxNoState: false,
            topics: [],
            orgFaxNo: "",
            orgWebsiteState: false,
            orgWebsite: "",
            orgAddressLine1State: false,
            orgAddressLine1: "",
            orgAddressLine2State: false,
            orgAddressLine2: "",
            orgAddressLine3State: false,
            orgAddressLine3: "",
            spocmobilenoState: false,
            spocmobileno: "",
            spocpanNoState: false,
            spocpanNo: "",
            spocemailIdState: false,
            spocemailId: "",
            spocfirstName: "",
            spocfirstNameState: false,
            spocdesignationState: false,
            spocdesignation: "",
            spocnameState: false,
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
            isButtonvisibility: false,
            LocationDTO: {
                Country: [],
                State: [],
                District: [],
                City: [],
                Pincode: []
            },
            levels: [
                { mID: '1', mType: "levels", mValue: "1" },
                { mID: '2', mType: "levels", mValue: "2" },
                { mID: '3', mType: "levels", mValue: "3" },
                { mID: '4', mType: "levels", mValue: "4" },
                { mID: '5', mType: "levels", mValue: "5" },
                { mID: '6', mType: "levels", mValue: "6" },
                { mID: '7', mType: "levels", mValue: "7" },
                { mID: '8', mType: "levels", mValue: "8" },
            ],
            orgid: "",
            tabledata: [],
            leveldata: [],
            levelobject: {},
            tablelevel: [],
            desigtabledata: [],
            desigleveldata: [],
            desiglevelobject: {},
            desigtablelevel: [],
            dummyobject: {},
            reportto: [{ mID: 0, mValue: "Self" }],
            desigreportto: [{ mID: 0, mValue: "Self" }],
            dynamicreportto: [],
            desigdynamicreportto: [],
            officetable: false,
            designationtable: false,
            open: false,
            selectedlevel: "",
            desigselectedlevel: "",
            AVOOrganizationDTO: {},
            MasterDTO: {
                OrgType: [],
                OrgConfigType: [],
            },
            OrganizationDTO: {
                "organizationId": 0,
                "orgCategoryId": "",
                "configurationTypeId": "",
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
                "avoOrgAddress": [
                ],
                "avoOrgSpocDetails": [
                ],
                "orgStructure": [],
                //"avoOrgStructure": [],
            },
            response: false,
        }
        this.state.isShowSubmit = props.isDontShowSubmit == undefined ? true : props.isDontShowSubmit;
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
        this.setState({ userd });
    };

    //GetMasterService = (type, mID) => {
    //    fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/GetMasterData?sMasterlist=abc`, {
    //        method: 'GET',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json',
    //            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    //        },
    //    })
    //        .then(response => response.json())
    //        .then(data => {
    //            const lData = data;
    //            let locDTO = this.state.MasterDTO;
    //            locDTO[type] = lData;
    //            this.setState({ locDTO });

    //        });
    //};

    GetMasterData = (type, addType, event) => {
        this.SetValue(type, event);
        let reg = this.state.OrganizationDTO;
        let name = event.target.name;
        let value = event.target.value;
        reg[name] = value;
        //if (type != "") {
        //    this.GetMasterService(type, event.target.value);
        //}
        if (type === "OrgType") {
            //COB based call
            //this.GetMasterService('InsuranceType', 0);
            this.GetMasterService('OrgConfigType', event.target.value);
        }
        if (type === "OrgConfigType") {
            //this.GetMasterService('BenefitCriteria', event.target.value);
            //this.GetMasterService('Risk', event.target.value);
            //this.GetMasterService('Claim', event.target.value);
        }
    };


    //for organization designation
    handledesiglevels = () => {

        let element = {};
        //element.levelId = this.state.desigtablelevel.length + 1;
        element.levelId = <CustomInput /*labelText="Organization Name" id="orgname"*/ value={this.state.desigleveldata.levelId} name="levelId" onChange={(e) => this.handledesiglevelvalues(e)} formControlProps={{ fullWidth: true }} />
        element.levelname = <CustomInput /*labelText="Organization Name" id="orgname"*/ value={this.state.desigleveldata.levelname} name="levelname" onChange={(e) => this.handledesiglevelvalues(e)} formControlProps={{ fullWidth: true }} />
        element.reportto = <Dropdown required={true} /*labelText="Levels"*/ lstObject={this.state.desigreportto} value={this.state.desigleveldata.reportto} name='reportto' onChange={(e) => this.handledesiglevelvalues(e)} formControlProps={{ fullWidth: true }} />
        this.state.desigtablelevel.push(element);
    }

    handledesiglevelvalues = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let object = this.state.desiglevelobject;
        object[name] = value;

        if (name == "reportto") {
            //object["levelId"] = this.state.desigtablelevel.length;
            object["structureType"] = "Position Level Type";
            this.setdesigtabledata();
            this.adddesigDynamicrow();
        }
        console.log("levelobjectP: ", object);
        this.setState({ object });
    }

    setdesigtabledata = () => {
        console.log("tabledata: ", this.state.desiglevelobject);
        let levelarray = [];
        let obj = Object.assign({}, this.state.desiglevelobject);
        levelarray.push(obj);
        this.state.desigtabledata = [...this.state.desigtabledata, ...levelarray];
        console.log("tabledata: ", this.state.desigtabledata);
    }

    adddesigDynamicrow = () => {
        console.log("levelobject: ", this.state.desiglevelobject);
        let levelarray = [];
        levelarray.push(this.state.desiglevelobject);
        this.state.desigleveldata = [...this.state.desigleveldata, ...levelarray];
        this.handledesigdynamicdropdown();
        let element = {};
        console.log("dynamicreportto: ", this.state.desigdynamicreportto);
        //element.levelId = this.state.desigtablelevel.length + 1;
        element.levelId = <CustomInput /*labelText="Organization Name" id="orgname"*/ value={this.state.desigleveldata.levelId} name="levelId" onChange={(e) => this.handledesiglevelvalues(e)} formControlProps={{ fullWidth: true }} />
        element.levelname = <CustomInput /*labelText="Organization Name" id="orgname"*/ value={this.state.desigleveldata.levelname} name="levelname" onChange={(e) => this.handledesiglevelvalues(e)} formControlProps={{ fullWidth: true }} />
        element.reportto = <Dropdown required={true} /*labelText="Levels"*/ lstObject={this.state.desigdynamicreportto} value={this.state.desigleveldata.reportto} name='reportto' onChange={(e) => this.handledesiglevelvalues(e)} formControlProps={{ fullWidth: true }} />
        this.state.desigtablelevel.push(element);
        console.log("Leveldataadd: ", this.state.desigleveldata);
        this.setState({});
    }

    handledesigdynamicdropdown = () => {
        let array = [];
        let element = {};
        for (let i = 0; i < this.state.desigleveldata.length; i++) {
            element.mID = this.state.desigleveldata[i].levelname;
            element.mValue = this.state.desigleveldata[i].levelname;
        }
        array.push(element);
        this.state.desigdynamicreportto = [...this.state.desigdynamicreportto, ...array];
        this.setState({});
        console.log("Leveldata: ", this.state.desigdynamicreportto);
        this.setState({ desiglevelobject: this.state.dummyobject });
    }
    //

    //for Organization structure
    handlelevels = () => {

        let element = {};
        element.levelId = <CustomInput /*labelText="Organization Name" id="orgname"*/ value={this.state.leveldata.levelId} name="levelId" onChange={(e) => this.handlelevelvalues(e)} formControlProps={{ fullWidth: true }} />
        element.levelname = <CustomInput /*labelText="Organization Name" id="orgname"*/ value={this.state.leveldata.levelname} name="levelname" onChange={(e) => this.handlelevelvalues(e)} formControlProps={{ fullWidth: true }} />
        element.reportto = <Dropdown required={true} /*labelText="Levels" */ lstObject={this.state.reportto} value={this.state.leveldata.reportto} name='reportto' onChange={(e) => this.handlelevelvalues(e)} formControlProps={{ fullWidth: true }} />
        this.state.tablelevel.push(element);
    }

    handlelevelvalues = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let object = this.state.levelobject;
        object[name] = value;
        if (name == "reportto") {
            //object["levelId"] = this.state.tablelevel.length;
            object["structureType"] = "Organisation Level Type";
            this.settabledata();
            //if (this.state.tablelevel.length < eval(this.state.selectedlevel)) {
            this.addDynamicrow();
            //}

        }
        console.log("levelobjectO: ", object);
        this.setState({ object });
    }

    settabledata = () => {
        console.log("tabledata: ", this.state.levelobject);
        let levelarray = [];
        let obj = Object.assign({}, this.state.levelobject);

        levelarray.push(obj);
        this.state.tabledata = [...this.state.tabledata, ...levelarray];
        console.log("tabledata1: ", this.state.tabledata);
    }

    addDynamicrow = () => {
        console.log("levelobject: ", this.state.levelobject);
        let levelarray = [];
        levelarray.push(this.state.levelobject);
        this.state.leveldata = [...this.state.leveldata, ...levelarray];
        this.handledynamicdropdown();
        let element = {};
        console.log("dynamicreportto: ", this.state.dynamicreportto);
        //element.levelId = this.state.tablelevel.length + 1;
        element.levelId = <CustomInput /*labelText="Organization Name" id="orgname"*/ value={this.state.leveldata.levelId} name="levelId" onChange={(e) => this.handlelevelvalues(e)} formControlProps={{ fullWidth: true }} />
        element.levelname = <CustomInput /*labelText="Organization Name" id="orgname"*/ value={this.state.leveldata.levelname} name="levelname" onChange={(e) => this.handlelevelvalues(e)} formControlProps={{ fullWidth: true }} />
        element.reportto = <Dropdown required={true} /*labelText="Levels"*/ lstObject={this.state.dynamicreportto} value={this.state.leveldata.reportto} name='reportto' onChange={(e) => this.handlelevelvalues(e)} formControlProps={{ fullWidth: true }} />
        this.state.tablelevel.push(element);
        console.log("Leveldata: ", this.state.leveldata);
        this.setState({});
    }

    handledynamicdropdown = () => {
        let array = [];
        let element = {};
        for (let i = 0; i < this.state.leveldata.length; i++) {
            element.mID = this.state.leveldata[i].levelname;
            element.mValue = this.state.leveldata[i].levelname;
        }
        array.push(element);
        this.state.dynamicreportto = [...this.state.dynamicreportto, ...array];
        this.setState({});
        console.log("Leveldata: ", this.state.dynamicreportto);
        this.setState({ levelobject: this.state.dummyobject });
    }
    //

    GetMasterService = (type, pID) => {
        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetOrgMaster?masterType=` + type + `&parentID=` + pID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("master response data: ", data)
                const lData = data;
                let locDTO = this.state.MasterDTO;
                locDTO[type] = lData;
                this.setState({ locDTO });
                console.log("MasterDTO: ", this.state.MasterDTO)
                //console.log("tabledata ", this.state.tabledata, "data array: ", dataArray)
            });
    };

    componentDidMount() {
        this.GetMasterService('OrgType', 0);

        this.handledesiglevels();
        this.handlelevels();
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
                this.setState({ masterLists: data });
            });

        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetMasterDataAsync?sMasterlist=OrgCategory`, {
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
        if (props.searchOrganizationId != undefined && props.searchOrganizationId != "") {
            var self = this;
            let OrganizationDTO = this.state.OrganizationDTO;
            this.setState({ organizationId: props.searchOrganizationId, editModal: props.editModal, isButtonvisibility: props.btnvisibility })
            //console.log('Props update server call', props, props.searchOrganizationId, this.state.OrganizationId);
            fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetOrganizationAsync?orgId=` + props.searchOrganizationId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(function (data) {
                    console.log('Response data1', data);

                    if (props.editModal == true) {
                        OrganizationDTO = data;
                        let disabled = props.disabled;
                        self.setState({ OrganizationDTO: data });
                        self.GetMasterService('OrgConfigType', self.state.OrganizationDTO.orgTypeId);
                        self.GetLocationService('State', self.state.OrganizationDTO.avoOrgAddress[0].orgCountryId);
                        self.GetLocationService('District', self.state.OrganizationDTO.avoOrgAddress[0].orgStateId);
                        self.GetLocationService('City', self.state.OrganizationDTO.avoOrgAddress[0].orgDistrictId);
                        self.GetLocationService('Pincode', self.state.OrganizationDTO.avoOrgAddress[0].orgCityId);
                        console.log("length", self.state.OrganizationDTO.avoOrgAddress.length)
                        let addDet = self.state.addressDTO;
                        addDet['corp'] = self.state.OrganizationDTO.avoOrgAddress[0];
                        addDet['reg'] = self.state.OrganizationDTO.avoOrgAddress[0];
                        addDet['mail'] = self.state.OrganizationDTO.avoOrgAddress[0];
                        addDet['spoc'] = self.state.OrganizationDTO.avoOrgSpocDetails[0];
                        self.handledesigdynamicdropdown();
                        self.setState({ addDet });
                        //   let arr = self.state.reportto;
                        ////   reportto: [{ mID: "self", mValue: "Self" }],
                        //   for (let i = 0; i < self.state.OrganizationDTO.avoOrgStructure.length; i++) {
                        //       let element = {};
                        //       element.mID = i+1;
                        //       element.mValue = self.state.OrganizationDTO.avoOrgStructure[i].levelDefinition;
                        //       arr.push(element);
                        //   } self.setState({
                        //       arr
                        //   });
                        //   console.log("arrCheck", arr);

                        let filteroffice = self.state.OrganizationDTO.avoOrgStructure.filter(item => item.structureTypeId == 27);
                        let filterdesig = self.state.OrganizationDTO.avoOrgStructure.filter(item => item.structureTypeId == 28);
                        // console.log("arrfilter", filter, self.state.OrganizationDTO.avoOrgStructure, self.state.structureTypeId);
                        let arr = self.state.reportto;
                        //   reportto: [{ mID: "self", mValue: "Self" }],
                        console.log("filterobject:", filteroffice);
                        for (let i = 0; i < filteroffice.length; i++) {
                            let element = {};
                            element.mID = filteroffice[i].orgStructureId;
                            element.mValue = filteroffice[i].levelDefinition;
                            arr.push(element);
                        } self.setState({
                            arr
                        });

                        let arr1 = self.state.desigreportto;
                        for (let i = 0; i < filterdesig.length; i++) {
                            let element1 = {};
                            element1.mID = filterdesig[i].orgStructureId;
                            element1.mValue = filterdesig[i].levelDefinition;
                            arr1.push(element1);
                        } self.setState({
                            arr1
                        });
                        console.log("arrCheck", arr, filteroffice, filterdesig);
                        console.log("arrCheck1", arr1);
                        console.log("FiletrCk", filteroffice, filterdesig);
                        self.setState({
                            tablelevel:

                                filteroffice.map((m, index) => {

                                    return {

                                        levelId: <CustomInput value={m.levelId} disabled={disabled} name="levelId" onChange={(e) => self.handledesiglevelvalues(e)} formControlProps={{ fullWidth: true }} />,
                                        levelname: < CustomInput disabled={disabled} value={m.levelDefinition} name="levelname" onChange={(e) => self.handledesiglevelvalues(e)
                                        } formControlProps={{ fullWidth: true }
                                        } />,
                                        reportto: < Dropdown required={true} disabled={disabled} lstObject={self.state.reportto} value={m.repotrsToId} name='repotrsToId'
                                            onChange={(e) => self.handlelevelvalues(e)
                                            } formControlProps={{ fullWidth: true }
                                            } />
                                    };

                                })
                        });


                        self.setState({
                            desigtablelevel:
                                filterdesig.map((m, index) => {

                                    return {

                                        levelId: <CustomInput value={m.levelId} disabled={disabled} name="levelId" onChange={(e) => self.handledesiglevelvalues(e)} formControlProps={{ fullWidth: true }} />,
                                        levelname: < CustomInput value={m.levelDefinition} disabled={disabled} name="levelname" onChange={(e) => self.handledesiglevelvalues(e)
                                        } formControlProps={{ fullWidth: true }
                                        } />,
                                        reportto: < Dropdown required={true} disabled={disabled} lstObject={self.state.desigreportto} value={m.repotrsToId}
                                            name='repotrsToId' onChange={(e) => self.handledesiglevelvalues(e)
                                            } formControlProps={{ fullWidth: true }
                                            } />
                                    };

                                })
                        });

                        //console.log("adddet", addDet);
                        //console.log("OrganizationAddressLine1", self.state.addressDTO);
                        //console.log("spoc data", addDet['spoc']);
                        //console.log("Organizationtype" + OrganizationDTO.orgTypeId);
                        //console.log("modify Organization:", OrganizationDTO);
                        console.log('ResponseOrg', OrganizationDTO);
                        console.log('desigtablelevel', self.state.reportto, self.state.desigdynamicreportto, self.desigtablelevel);
                    }
                    else {
                    }
                    self.setState({ OrganizationDTO });
                    self.modifyValue(OrganizationDTO)
                });
        }
        setTimeout(
            function () {
                this.setState({ pageloader: true });
            }
                .bind(this),
            2000
        );
    }

    reset = () => {
        //Setting States After Saving
        let organizationDTO = this.state.fields;
        organizationDTO['orgAddress'] = "";
        organizationDTO['orgSpocDetails'] = "";

        this.setState({ organizationDTO });

        let status = this.state;
        status['accountNameState'] = "";
        status['accountDescState'] = "";
        this.setState({ status });
    }

    handleSub = () => {
        this.setState({ response: true });
        let address = [];
        address.push(this.state.addressDTO.reg);
        if (this.state.addressDTO.corpSelectedValue == 1) {
            address.push(this.state.addressDTO.corp);
        }
        if (this.state.addressDTO.mailSelectedValue == 4) {
            address.push(this.state.addressDTO.mail);
        }
        let organizationDTO = this.state.OrganizationDTO;

        organizationDTO['avoOrgAddress'] = address;
        organizationDTO['avoOrgSpocDetails'].push(this.state.addressDTO.spoc);

        organizationDTO['orgStructure'] = [...organizationDTO['orgStructure'], ...this.state.tabledata];
        organizationDTO['orgStructure'] = [...organizationDTO['orgStructure'], ...this.state.desigtabledata];
        this.setState({ organizationDTO });

        let OrgDTO = this.state.AVOOrganizationDTO;
        OrgDTO = organizationDTO;
        this.setState({ OrgDTO })
        console.log("OrgDTO: ", OrgDTO);
        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/CreateOrganization`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(OrgDTO)
        }).then(response => response.json())
            .then(data => {
                if (data.status == 2) {
                    swal({
                        text: data.responseMessage,
                        icon: "success"
                    });
                    this.state.open = true;
                    // this.setState({ open: true });
                    this.setState({ response: false, redirect: true })
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
                } else {
                    swal({
                        text: " Try again by entering values",
                        icon: "error"
                    });
                }
                console.log("Redirect", this.state.Redirect);
                console.log("handleSub", data)
            });

    }

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/dashboard/home',

            }} />
        }
    }

    GetLocation = (type, addType, event) => {

        this.SetValue(type, event);
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
        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetLocationAsync?locationType=` + type + `&parentID=` + pID, {
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
        //let addressDTO = this.state.avoOrgAddress;
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
        else if (value == "2") {
            addressDTO.mail = { ...addressDTO.reg };
            state.OrganizationDTO.mailingAddressSameAs = 'R';
        }
        else if (value == "3") {
            addressDTO.mail = { ...addressDTO.corp };
            state.OrganizationDTO.mailingAddressSameAs = 'C';
        }
        else if (value == "4") {
            addressDTO.mail = { ...addressDTO.reset };
            state.OrganizationDTO.mailingAddressSameAs = 'O';
        } else { }
        this.setState({ addressDTO, state });
    }

    change(event, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "email":
                if (validationPage.verifyEmail(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "pan":
                if (validationPage.verifyPanNum(event.target.value, 6)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "number":
                if (validationPage.verifyNumber(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "name":
                if (validationPage.verifyName(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "faxno":
                if (validationPage.verifyLength(event.target.value, 14)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "addLineName":
                if (validationPage.verifyName(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "equalTo":
                if (validationPage.compare(event.target.value, this.state[stateNameEqualTo])) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "checkbox":
                if (event.target.checked) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "length":
                if (validationPage.verifyLength(event.target.value, stateNameEqualTo)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "max-length":
                if (!validationPage.verifyLength(event.target.value, stateNameEqualTo + 1)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "Url":
                if (validationPage.verifyUrl(event.target.value)) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "min-value":
                if (
                    validationPage.verifyNumber(event.target.value) &&
                    event.target.value >= stateNameEqualTo
                ) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "max-value":
                if (
                    validationPage.verifyNumber(event.target.value) &&
                    event.target.value <= stateNameEqualTo
                ) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "range":
                if (
                    validationPage.verifyNumber(event.target.value) &&
                    event.target.value >= stateNameEqualTo &&
                    event.target.value <= maxValue
                ) {
                    //this.setState({ [stateName + "State"]: "success" });
                    this.setState({ [stateName + "State"]: false });
                } else {
                    //this.setState({ [stateName + "State"]: "error" });
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                {this.state.pageloader ?
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <ProfileDet OrganizationDTO={this.state.OrganizationDTO} GetMasterData={this.GetMasterData} masterList={this.state.masterList} MasterDTO={this.state.MasterDTO} disabled={this.state.disabled} SetValue={this.SetValue} classes={this.classes} orgFaxNoState={this.state.orgFaxNoState} orgPhoneNoState={this.state.orgPhoneNoState} orgNameState={this.state.orgNameState} orgWebsiteState={this.state.orgWebsiteState} />
                            <Address OrganizationDTO={this.state.OrganizationDTO} officetable={this.state.officetable} designationtable={this.state.designationtable} desigtablelevel={this.state.desigtablelevel} handledesiglevels={this.handledesiglevels} desigselectedlevel={this.state.desigselectedlevel} tablelevel={this.state.tablelevel} handlelevels={this.handlelevels} selectedlevel={this.state.selectedlevel} levels={this.state.levels} handleChange={this.handleChange} disabled={this.state.disabled} GetMasterData={this.GetMasterData} onDateChange={this.onDateChange} LocationDTO={this.state.LocationDTO} handleRadioChange={this.handleRadioChange} masterLists={this.state.masterLists} masterList={this.state.masterList} SetValue={this.SetValue} classes={this.classes} GetLocation={this.GetLocation} addressDTO={this.state.addressDTO} orgAddressLine1State={this.state.orgAddressLine1State} orgAddressLine2State={this.state.orgAddressLine2State} spocpanNoState={this.state.spocpanNoState} orgAddressLine3State={this.state.orgAddressLine3State} spocfirstNameState={this.state.spocfirstName} spocemailIdState={this.state.spocemailIdState} spocmobilenoState={this.state.spocmobilenoState} spocdesignationState={this.state.spocdesignationState} spocnameState={this.state.spocnameState} />
                        </GridItem>
                        {this.state.isShowSubmit ?
                            <div style={{ marginLeft: '44%' }} >
                                <Button round color="warning" disabled={this.state.response} onClick={this.handleSub}><TranslationContainer translationKey="Submit" /></Button>
                            </div>
                            : null}
                    </GridContainer>
                    : <PageContentLoader />}
                {this.renderRedirect()}
            </div>
        );
    }
}
export default Organization;
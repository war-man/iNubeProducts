import React from "react";

//General Components
import Heading from "components/Heading/Heading.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

//Module Components
import OfficeDetails from "./_OfficeDetails.jsx";
import SpocDet from "./_Spoc.jsx";
import SpocDetails from "./_SpocDetails.jsx"
import OfficeProfile from "./_OfficeProfile.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
//General Components
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import FilterNone from "@material-ui/icons/FilterNone";
import Button from "components/CustomButtons/Button.jsx";
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import swal from 'sweetalert';
import partnerconfig from "modules/Partners/PartnerConfig.js";
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import PositionCreation from "./_PositionCreation.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#00acc1",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
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

const margin = {
    position: 'relative',
    marginLeft: "45%"

}
const okBtn = {

    marginLeft: "527px",
    //marginTop: "20px",
    height: "25px",
    textAlign: "center",

    width: "65px",
    padding: "1px"
}
const modalStyles = {
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    transform: 'translate(-25 %, -25%)',
    backgroundColor: 'white',
    width: 'auto',
    height: 'auto',
    borderRadius: '8px',
    paddingBottom: '5px',
    paddingRight: '2px'
    //  boxShadow: theme.shadows[5],

};

const searchClose = {
    float: "right",
    position: 'relative',
    bottom: "56px",
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

}
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            masterList: [],
            posDesigList: [],
            componentData: {
                orgNameState: "",
                orgName: "",
                orgNameState: "",
                orgName: "",
                orgPhoneNoState: "",
                orgPhoneNo: "",
                orgFaxNoState: "",
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
                spocemailIdState: "",
                spocemailId: "",
                spocdesignationState: "",
                spocdesignation: "",
                spocnameState: "",
                spocname: "",

            },
            OfficeCode: "",
            Organizations: [],
            Office: [],
            // officeId: "",
            open: false,
            officelist: [],
            list: [],
            disabled: false,
            addressDTO: {
                "spoc": {
                    //"orgSpocId": 0,
                    // "organizationId": 0,
                    "spocname": "",
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
                },
                "off": {
                    "officeCountryId": "",
                    "officeStateId": "",
                    "officeDistrictId": "",
                    "officeCityId": "",
                    "officeAddressLine1": "",
                    "officeAddressLine2": "",
                    "officeAddressLine3": "",
                    "officePincodeId": ""
                },
            },
            Officeaddress: {
                "officeCountryId": "",
                "officeStateId": "",
                "officeDistrictId": "",
                "officeCityId": "",
                "officeAddressLine1": "",
                "officeAddressLine2": "",
                "officeAddressLine3": "",
                "officePincodeId": ""
            },
            LocationDTO: {
                "Country": [],
                State: [],
                District: [],
                City: [],
                Pincode: []
            },
            organizationid: "",
            officeid: "",
            OrganizationDTO: {
                "organizationId": "",
                "orgCategoryId": "",
                "configurationTypeId": "",
                "orgTypeId": "",
                "orgName": "",
                "corpAddressSameAs": "",
                "mailingAddressSameAs": "",
                "orgWebsite": "",
                "orgPhoneNo": "",
                "orgFaxNo": "",
                "orgLevels": "",
                "orgRegistrationNo": "",
                "orgRegisteringAuthority": "",
                "orgServiceTaxRegistrationNumber": "",
                "orgPanno": "",
                "orgTanno": "",
                "tblOrgAddress": [

                ],
                "tblOrgSpocDetails": [

                ]
            },
            aVOOrgOffice: {
                "organizationId": "",
                "officeName": "",
                "officeCode": "",
                "officePhoneNo": "",
                "officeFaxNo": "",
                "officeLevelId": "",
                "officeReportingOfficeId": "",
                "officeCountryId": "",
                "officeStateId": "",
                "officeDistrictId": "",
                "officeCityId": "",
                "officeAddressLine1": "",
                "officeAddressLine2": "",
                "officeAddressLine3": "",
                "officePincodeId": "",
                "isActive": true,
                "avoOfficeSpocDetails": [

                ]
            },
            redirect: false,
            currentStaff: "",
            positionDTO: {
                "empId": "",
                "newpositioncount": "",
                "organizationId": "",
                "officeId": "",
                "designationId": "",
            },
            Designations: [],
            Employees: [],
            desigleveldata: [],
            levelobject: {},
            tabledata: [],
            posDesigTable: [],
        }
        this.GetLocationService = this.GetLocationService.bind(this);
        this.handleofficeSub = this.handleofficeSub.bind(this);
        console.log("props", props);
    };

    SetValue = (type, event) => {
        // debugger;
        //  event.preventDefault();
        console.log('teset ' + event)
        let aVOOrgOffice = this.state.aVOOrgOffice;
        let name = event.target.name;
        console.log("name", name);
        let value = event.target.value;
        console.log('teset ' + event.target.value)
        aVOOrgOffice[name] = value;
        this.setState({ aVOOrgOffice })
        console.log("officeDTO", this.state.aVOOrgOffice);
        //this.change(event, name, type);
        if (name == "OfficeCode") {
            let { OfficeCode } = this.state;
            OfficeCode = value;
            this.setState({ OfficeCode });
        }
        if (type == "spoc") {
            let reg = this.state.addressDTO[type];
            console.log("reg", reg);
            console.log("regtype", type);
            let name = event.target.name;
            let value = event.target.value;
            reg[name] = value;

            this.setState({ reg })
        }
    };

    GetLocation = (type, addType, event) => {

        console.log("addType", addType);
        if (addType != 'spoc') {
            this.SetValue(type, event);
        }

        let reg = this.state.Officeaddress;
        console.log("regAdress", reg);
        console.log("regtype", addType);
        let name = event.target.name;
        let value = event.target.value;
        reg[name] = value;

        this.setState({ reg })
        if (type != "") {
            this.GetLocationService(type, event.target.value);
        }
    };

    GetLocationService = (type, pID) => {
        console.log("off");
        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetLocationAsync?locationType=` + type + `&parentID=` + pID, {
            // fetch(`https://inubeservicespartners.azurewebsites.net/api/Organization/GetLocation?locationType=` + type + `&parentID=` + pID, {
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
                console.log("off", data);
                let locDTO = this.state.LocationDTO;
                locDTO[type] = lData;
                this.setState({ locDTO });

            });
    };

    handleofficeSub() {
        let address = [];
        address.push(this.state.addressDTO.spoc);

        let office = this.state.aVOOrgOffice;
        office['avoOfficeSpocDetails'] = address;
        this.setState({ office });
        console.log("office", office);
        console.log("office", this.state.addressDTO);

        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/CreateOffice`, {
            // fetch(`https://localhost:44315/api/Office/CreateOffice`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(office)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('Response data', data);
            if (data.status == 2) {
                swal({
                    //  title: "Perfect",
                    text: data.responseMessage,
                    icon: "success"
                });
                if (this.state.positionDTO.designationId != "") {
                    this.handlePositionCreation();
                }
            }
            else if (data.status == 7) {
                swal({
                    text: data.errors[0].errorMessage,
                    icon: "error"
                });
            }
        });
    }

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/dashboard/home',

            }} />
        }
    }

    searchofficebtn = () => {
        this.setState({ open: true });

    }

    handleClose = () => {
        this.setState({ open: false });

    };

    handleOfficeData = (e) => {
        let office = this.state.aVOOrgOffice;
        let position = this.state.positionDTO;
        position.officeId = e.target.value;
        let name = e.target.name;
        let value = e.target.value;
        office[name] = value;
        this.setState({ office, position });


    }

    handleOrgdata = (e) => {
        let office = this.state.aVOOrgOffice;
        let position = this.state.positionDTO;
        position.organizationId = e.target.value;
        let name = e.target.name;
        let value = e.target.value;
        office[name] = value;
        this.setState({ office, position });

        this.setState({ organizationid: e.target.value });
        this.handleOffice(e.target.value);
        this.handleDesignationDD(e.target.value);

    }

    handleOffice = (orgid) => {
        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetOffbyOrgid?orgid=` + orgid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ Office: data });
                console.log("organizations: ", data);
            });
    }

    componentDidMount() {
        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetOrgDropdown`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ Organizations: data });
                console.log("organizations: ", data);
            });

        this.GetLocationService('Country', 0);
        let self = this;
        if (self.props.offid != null) {
            if (self.props.offid != "") {
                fetch(`${partnerconfig.partnerconfigUrl}/api/Office/SearchOffById?Officeid=` + self.props.offid, {
                    //  fetch(`https://localhost:44315/api/Office/SearchOffice?OfficeCode=` + this.state.OfficeCode,{
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("officedata", data);

                        self.setState({ aVOOrgOffice: data[0] });
                        console.log("officedata", self.state.aVOOrgOffice)
                        let office = self.state.aVOOrgOffice;
                        let adddet = self.state.addressDTO;
                        let offaddr = self.state.Officeaddress;
                        self.handleOffice(data[0].organizationId);
                        office.organizationId = data[0].organizationId;
                        office.officeReportingOfficeId = data[0].officeReportingOfficeId;
                        adddet.spoc = data[0].avoOfficeSpocDetails[0];

                        self.GetLocationService('State', data[0].officeCountryId);
                        self.GetLocationService('District', data[0].officeStateId);
                        self.GetLocationService('City', data[0].officeDistrictId);
                        self.GetLocationService('Pincode', data[0].officeCityId);
                        console.log("officedata", adddet);
                        let addr = adddet['off'];

                        offaddr.officeAddressLine1 = data[0].officeAddressLine1;
                        offaddr.officeAddressLine2 = data[0].officeAddressLine2;
                        offaddr.officeAddressLine3 = data[0].officeAddressLine3;
                        offaddr.officeCountryId = data[0].officeCountryId;
                        offaddr.officeStateId = data[0].officeStateId;
                        offaddr.officeDistrictId = data[0].officeDistrictId;
                        offaddr.officeCityId = data[0].officeCityId;
                        offaddr.officePincodeId = data[0].officePincodeId;
                        self.setState({ offaddr, office, adddet, disabled: this.props.disabled });
                    });
            }
        }
    }

    onInputParamChange = (type, event) => {
        const fields = this.state.positionDTO;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
    };

    handlePositionTableAssignValue = () => {
        let array = []
        let element = {};

        array.push(element)
        this.state.posDesigList = array;
        this.setState({});
        this.handlePositionTable();
    }

    handlePositionTable = () => {
        this.setState({
            posDesigTable: this.state.posDesigList.map(m => {
                return {
                    designation: <Dropdown /*required={true}*/ lstObject={this.state.Designations} value={this.state.positionDTO.designationId} name="designationId" onChange={(e) => this.handledesigchange(e)} formControlProps={{ fullWidth: true }} />,
                    reportingTo: <Dropdown /*required={true}*/ lstObject={this.state.Employees} value={this.state.positionDTO.empId} name="empId" onChange={(e) => this.handledesigchange(e)} formControlProps={{ fullWidth: true }} />,
                    currentStaff: <CustomInput value={this.state.currentStaff} disabled={true} name="currentStaff" formControlProps={{ fullWidth: true }} />,
                    newPosition: <CustomInput value={this.state.positionDTO.newpositioncount} name="newpositioncount" onChange={(e) => this.handledesigchange(e)} formControlProps={{ fullWidth: true }} />,
                };
            })
        });
    }

    handledesigchange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let position = this.state.positionDTO;
        position[name] = value;

        if (name == "designationId") {
            this.handleReportingDD(this.state.positionDTO.designationId);
        }
        if (name == "empId") {
            this.handleCurrentStaffCount(this.state.positionDTO.empId);
        }
        if (name == "newpositioncount") {
            // this.handlePositionCreation(this.state.positionDTO.newpositioncount);
        }

        console.log("positionOnchange", this.state.positionDTO);
        this.setState({ position });
        this.handlePositionTable();
    }

    handleDesignationDD = (orgid) => {
        let that = this;
        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetDesignation?orgid=` + orgid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                that.setState({ Designations: data[0].mdata });
                if (this.state.Designations.length != 0) {
                    this.handlePositionTableAssignValue();
                }
                console.log("deg List", that.state.Designations, data);
            });
    }

    handleReportingDD = (desigid) => {
        let that = this;
        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetEmployee?orgid=` + that.state.positionDTO.organizationId + `&offid=` + that.state.positionDTO.officeId + `&desgiId=` + desigid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                that.setState({ Employees: data[0].mdata });
                this.handlePositionTable();
                console.log("report", data, this.state.Employees);
            });
    }

    handleCurrentStaffCount = (empid) => {
        let that = this;
        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/GetCount?empid=` + empid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                that.setState({ currentStaff: data });
                this.handlePositionTable();
                console.log("report", data);
            });
    }

    handlePositionCreation = () => {
        console.log("checkPostion", this.state.positionDTO);
        fetch(`${partnerconfig.partnerconfigUrl}/api/Organization/CreatePosition`, {
            //fetch(`https://localhost:44315/api/Organization/CreatePosition`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.positionDTO)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 2) {
                    //swal({
                    //    text: "Positions created successfully",
                    //    icon: "success"
                    //})
                    this.setState({ redirect: true });
                    this.handlePositionTable();
                } else {
                    //swal({
                    //    text: "Something went wrong",
                    //    icon: "error"
                    //})
                }

            });
    }

    render() {
        console.log("new props", this.props);
        return (
            <div>

                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>

                        <OfficeDetails OrganizationDTO={this.state.OrganizationDTO} aVOOrgOffice={this.state.aVOOrgOffice} Office={this.state.Office} Organizations={this.state.Organizations} masterList={this.state.masterList} SetValue={this.SetValue} searchofficebtn={this.searchofficebtn} classes={this.classes} disabled={this.state.disabled} handleOfficeData={this.handleOfficeData} handleOrgdata={this.handleOrgdata} />
                        <SpocDet list={this.state.list} aVOOrgOffice={this.state.aVOOrgOffice} LocationDTO={this.state.LocationDTO} handleRadioChange={this.handleRadioChange} masterList={this.state.masterList} SetValue={this.SetValue} classes={this.classes} GetLocation={this.GetLocation} addressDTO={this.state.addressDTO} disabled={this.state.disabled}
                            Organizations={this.state.Organizations} Officeaddress={this.state.Officeaddress} Office={this.state.Office} handleOfficeData={this.handleOfficeData} handleOrgdata={this.handleOrgdata} onInputParamChange={this.onInputParamChange} posDesigTable={this.state.posDesigTable} />

                    </GridItem>
                    {this.state.disabled ? null :
                        <GridContainer justify="center">
                            {this.renderRedirect()}
                            <Button color="info" onClick={() => this.handleofficeSub()} id="round"> Submit</Button>
                        </GridContainer>
                    }
                </GridContainer>
            </div>
        );
    }
}
export default withStyles(styles)(Profile);
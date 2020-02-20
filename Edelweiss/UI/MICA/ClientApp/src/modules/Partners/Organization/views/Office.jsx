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

            officeId: "",
            open: false,
            officelist: [],
            list: [],
            disabled: this.props.disabled,
            officeDTO: {
                //  "orgOfficeId": 0,
                // "organizationId": 0,
                "officeName": "",
                "officeCode": "",
                "officePhoneNo": "",
                "officeFaxNo": "",
                "officeLevelId": "",
                //  "officeReportingOfficeId": 0,
                "officeCountryId": 0,
                "officeStateId": 0,
                "officeDistrictId": 0,
                "officeCityId": 0,
                "officeAddressLine1": "",
                "officeAddressLine2": "",
                "officeAddressLine3": "",
                "officePincodeId": 0,
                "tblOfficeSpocDetails": [
                    {
                        //"officeSpocid": 0,
                        "officeId": 0,
                        "spocname": "string",
                        "spocmobileno": "string",
                        "spocemailId": "string",
                        "spocdesignation": "string",
                        "spoccountryId": 0,
                        "spocstateId": 0,
                        "spocdistrictId": 0,
                        "spoccityId": 0,
                        "spocaddressLine1": "string",
                        "spocaddressLine2": "string",
                        "spocaddressLine3": "string",
                        "spocpincodeId": 0
                    }
                ]
            },
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
                    "orgPincodeId": ""
                },
                "spoc": {
                    //"orgSpocId": 0,
                    // "organizationId": 0,
                    "spocname": "",
                    "spocmobileno": "",
                    "spocemailId": "",
                    "spocdesignation": "",
                    "spoccountryId": 0,
                    "spocstateId": 0,
                    "spocdistrictId": 0,
                    "spoccityId": 0,
                    "spocaddressLine1": "",
                    "spocaddressLine2": "",
                    "spocaddressLine3": "",
                    "spocpincodeId": 0
                },
                "off": {
                    "officeCountryId": 0,
                    "officeStateId": 0,
                    "officeDistrictId": 0,
                    "officeCityId": 0,
                    "officeAddressLine1": "",
                    "officeAddressLine2": "",
                    "officeAddressLine3": "",
                    "officePincodeId": 0
                },
                "corpSelectedValue": 1,
                "mailSelectedValue": 4
            },
            LocationDTO: {
                "Country": [],
                State: [],
                District: [],
                City: [],
                Pincode: []
            },

            OrganizationDTO: {
                "organizationId": 0,
                "orgCategoryId": 0,
                "configurationTypeId": 0,
                "orgTypeId": 0,
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
                "tblOrgAddress": [

                ],
                "tblOrgSpocDetails": [

                ]
            }
        }
        this.GetLocationService = this.GetLocationService.bind(this);
        this.handleofficeSub = this.handleofficeSub.bind(this);
        console.log("props", props);
    };

    SetValue = (type, event) => {
       // debugger;
        //  event.preventDefault();
        console.log('teset ' + event)
        let officeDTO = this.state.officeDTO;
        let name = event.target.name;
        console.log("name", name);
        let value = event.target.value;
        console.log('teset ' + event.target.value)
        officeDTO[name] = value;
        this.setState({ officeDTO })
        console.log("officeDTO", this.state.officeDTO);
        //this.change(event, name, type);
        if (name == "officeId") {
            let { officeId } = this.state;
            officeId = value;
            this.setState({ officeId });
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
      
        let reg = this.state.addressDTO[addType];
        console.log("reg", reg);
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
        fetch(`https://inubeservicespartners.azurewebsites.net/api/Organization/GetLocation?locationType=` + type + `&parentID=` + pID, {
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
        console.log("push in adreess", address);
        let offceDTO = this.state.officeDTO;
        offceDTO['tblOfficeSpocDetails'] = address;
        this.setState({ offceDTO });
        console.log("table office", this.state.officeDTO);

       // fetch(`https://localhost:44315/api/Office/CreateOffice`, {
       fetch(`https://inubeservicespartners.azurewebsites.net/api/Office/CreateOffice`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.offceDTO)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('Response data', data);
                if (data.status == 1) {
                    swal({
                      //  title: "Perfect",
                        text: data.responseMessage,
                        icon: "success"
                    });
                } else if (data.status == 8) {
                    swal({
                        text: data.errors[0].errorMessage,
                        icon: "error"
                    });
                }
            });
    }
    searchofficebtn = () => {
        this.setState({ open: true });

    }

    tableshow = () => {
        fetch(`https://inubeservicespartners.azurewebsites.net/api/Office/GetOffice?officeID=` + this.state.officeId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {

                this.setState({ officelist: data });
            });
        console.log("officelist", this.state.officelist);
    }
    handleClose = () => {
        this.setState({ open: false });

    };
    componentDidMount() {
        // $.getJSON('api/SampleData/GetDropDownFromList', function (response) {
        //     console.log(response);
        // });

        fetch(`https://inubeservicespartners.azurewebsites.net/api/Organization/GetMasterData?sMasterlist=OrgCategory`, {
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
                console.log("organizationId", data);
            });
        fetch(`https://inubeservicespartners.azurewebsites.net/api/Office/GetAllOffice`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("recived", data);
                this.setState({ list: data });
            });
        console.log("recived1", this.state.list);

        this.GetLocationService('Country', 0);
        if (this.props.offdata != null) {
            if (this.props.offdata != "") {
                console.log("coming offdata", this.props.offdata);
                let dataDTO = this.state;
                console.log("orgOffice", this.props);
                console.log("orgOfficeid", this.props.officesendlist[0]);
                // this.props.officesendlist[0].orgOfficeId = 0;
                this.props.officesendlist[0].officeReportingOfficeId = "";
                console.log("orgOffice", this.props.officesendlist[0]);
                dataDTO['officeDTO'] = this.props.officesendlist[0];

                this.setState({ dataDTO });
                console.log("orgOfficeiddata", this.state.dataDTO);
                let addoff = this.state.addressDTO;
                addoff["off"] = this.props.officesendlist[0];

                this.GetLocationService('State', this.props.officesendlist[0].officeCountryId);
                this.GetLocationService('District', this.props.officesendlist[0].officeStateId);
                this.GetLocationService('City', this.props.officesendlist[0].officeDistrictId);
                this.GetLocationService('Pincode', this.props.officesendlist[0].officeCityId);
                this.setState({ addoff });

                let demo = this.state.addressDTO;
                demo.off["officeStateId"] = this.props.officesendlist[0].officeStateId;
                this.setState({ demo });
                console.log("demo", demo);

                console.log("offorg", this.props.officesendlist[0].tblOfficeSpocDetails[0]);
                //   this.props.officesendlist[0].tblOfficeSpocDetails[0].officeId = "";
                // this.props.officesendlist[0].tblOfficeSpocDetails[0].officeSpocid = 0;
                let tblOfficeSpocDetails = this.props.officesendlist[0].tblOfficeSpocDetails[0];


                console.log("tblOfficeSpocDetails", tblOfficeSpocDetails);
                let addressDTO = this.state.addressDTO;
                addressDTO["spoc"] = tblOfficeSpocDetails;


                //  this.setState({ officeDTO });
                console.log("comingofficesendlist", this.state.officeDTO);
            }
        }
    }

    render() {
        console.log("new props", this.props);
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>

                        {/* <OfficeDetails OrganizationDTO={this.state.OrganizationDTO} masterList={this.state.masterList} SetValue={this.SetValue} searchofficebtn={this.searchofficebtn} classes={this.classes} disabled={this.state.disabled}/> */}
                        <SpocDet list={this.state.list} officeDTO={this.state.officeDTO}  LocationDTO={this.state.LocationDTO} handleRadioChange={this.handleRadioChange} masterList={this.state.masterList} SetValue={this.SetValue} classes={this.classes} GetLocation={this.GetLocation} addressDTO={this.state.addressDTO} disabled={this.state.disabled} />
                       


                    </GridItem>
                    <div style={{ marginLeft: '28%' }} >
                        <Button color="info" onClick={this.handleofficeSub} id="round">Submit</Button>
                    </div>
                    <div style={{ marginLeft: '28%' }} >
                        <Button color="danger" id="round">Cancel</Button>
                    </div>
                </GridContainer>
            </div>
        );
    }
}
export default withStyles(styles)(Profile);
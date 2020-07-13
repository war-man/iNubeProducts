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
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import { Animated } from "react-animated-css";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import Edit from "@material-ui/icons/Edit";
import Download from "@material-ui/icons/GetApp";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import NewBusinessConfig from 'modules/NewBusiness/NewBusinessConfig.js';

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
//const dataTable = {
//    headerRow: ["FirstName", "LastName", "Relationship", "AgeNextBirthday", "Gender", "Edit"],
//    // footerRow: ["Type", "Position", "Office", "Age", "Actions"],
//    dataRows: [
//        ["", "", "", "", "", ""],
//        ["", "", "", "", "", ""],

//    ]
//};
class LifeToBeAssured extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            singleValueSelected: "0",
            singleValue: "0",
            data: [],
            sampledata: [],
            gridValuedisable: true,
            flag1: false,
            flag2: true,
            singleValueCheckboxSelected: false,
            lifeToBeAssuredflag : false,
            PolicyMemberDetails: {

                "salutation": "",
                "fullname": "",
                "givenName": "",
                "nameWithInitial": "",
                "preferredName": "",
                "dob": "",
                "age": 0,
                "relationShipWithProposer": 0,
                "occupationId": 0,
                "oldnicno": "",
                "newnicno": "",
                "annualIncome": "",
                "companyName": "",
                "natureOfDuties": "",
                "nationality": "",
                "mobile": "",
                "landline": "",
                "email": "",
                "isDeleted": true,
                "firstName": "",
                "surname": "",
                "middleName": "",
                "alternateMobileNo": "",
                "home": "",
                "work": "",
                "adressId": 0,
                "address1": "",
                "address2": "",
                "address3": "",
                "city": "",
                "district": "",
                "isPermanentAddrSameasCommAddr": false,
                "permanetAddressId": 0,
                "quoteMemberid": 0,
                "isSameasProposerAddress": false,

                "isSameProposerAdd": false,
                "citizenship1": "string",
                "citizenship2": "string",
                "residentialNationality": "string",
                "residentialNationalityStatus": "string",
                "occupationHazardousWork": true,
                "passportNumber": "",
                "countryOccupation": "string",
                "specifyResidental": "string",
                "specifyHazardousWork": "string",
                "citizenShip": true,
                "gender": "",
                "maritialStatus": "",

            },
            //data: dataTable.dataRows.map((prop, key) => {
            //    return {
            //        id: key,
            //        FirstName: (<CustomInput
            //            //labelText="Name"
            //            //value="DINESH"
            //            //value={}
            //            name="Name"
            //            //onChange={props.SetValue}
            //            id="FirstName"
            //            formControlProps={{
            //                fullWidth: true
            //            }}
            //        />),
            //        LastName: (<CustomInput
            //            //labelText="Name"
            //            value="TIWARI"
            //            //value={props.ProductDTO.ProductName}
            //            name="LastName"
            //            //onChange={props.SetValue}
            //            id="LastName"
            //            formControlProps={{
            //                fullWidth: true
            //            }}
            //        />),
            //        Relationship: prop[2],

            //        AgeNextBirthday: (<CustomInput
            //            //labelText="Name"
            //            value="33"
            //            //value={props.ProductDTO.ProductName}
            //            name="AgeNextBirthday"
            //            //onChange={props.SetValue}
            //            id="AgeNextBirthday"
            //            formControlProps={{
            //                fullWidth: true
            //            }}
            //        />),
            //        Gender: prop[4],
            //        Edit: prop[5],
            //        Edit: (
            //            <div className="actions-right">
            //                <Button color="info" justIcon round simple className="edit" onClick={() => this.handlePolicyOwnerData()}><Edit /></Button>

            //            </div>
            //        )
            //    };
            //})
        };
    }

    
    handleRadioChange = (event) => {

        let value = event.target.value;

        this.state.singleValue = event.target.value == "1" ? false : true;
        this.state.singleValueSelected = event.target.value;
        this.setState({ value });
        console.log("singleValueSelected", this.state.singleValueSelected);
    }

    componentDidMount() {
        debugger;
        let PolicyID = this.props.filterData.policyID;
        fetch(`${NewBusinessConfig.ProposalConfigUrl}/api/Proposal/PolicyOwnerDetails/GePolicyOwnerDetails?PolicyID=` + PolicyID + ``, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })

            .then(response => response.json())
            .then(data => {
                console.log("PolicyOwnerDetailsDto:", data);
                this.state.sampledata.push(data);
                this.setState({});
                this.ProposerTable();
                this.setState({ PolicyMemberDetails: data });
                //this.state.tblPolicyMemberDetails.dob = new Date(this.state.tblPolicyMemberDetails.dob).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
                //this.setState({});

            });

    }

    ProposerTable = () => {
        debugger;
        console.log("incompletedata", this.state.sampledata);
        this.setState({
            data: this.state.sampledata.map((prop, key) => {
                return {
                    id: key,
                    FirstName: (<CustomInput
                        value={prop.fullname}
                        disabled={this.state.gridValuedisable}
                        //onChange={props.SetValue}
                        id="FirstName"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />),
                    LastName: (<CustomInput
                        value={prop.surname}
                        disabled={this.state.gridValuedisable}
                        //onChange={props.SetValue}
                        id="LastName"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />),
                    Relationship: (

                        <MasterDropdown
                            //disabled={this.state.gridValuedisable}
                            value={prop.relationShipWithProposer}
                            lstObject={this.props.MasterDataDto}
                            filterName='RelationshipType'
                            name='relationShipWithProposer'
                            //onChange={(e) => props.MasterSetValue(e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />),

                    AgeNextBirthday: (<CustomInput
                        value={prop.age}
                        disabled={this.state.gridValuedisable}
                        name="AgeNextBirthday"
                        //onChange={props.SetValue}
                        id="AgeNextBirthday"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />),
                    Gender: (
                        <MasterDropdown
                            //disabled={this.state.gridValuedisable}
                            value={prop.gender}
                            //onChange={(e) => props.MasterSetValue(e)}
                            lstObject={this.props.MasterDataDto}
                            filterName='Gender'
                            name='gender'
                            formControlProps={{
                                fullWidth: true
                            }}
                        />),
                    //Edit: prop[5],
                    Edit: (
                        <div className="actions-right">
                            <Button color="info" justIcon round simple className="edit" onClick={() => this.editable()}><Edit /></Button>

                        </div>
                    )
                    
                };
            }
            )
        }
        )
    }

    editable = () => {
        debugger;

        this.state.flag1 = true;
        this.setState({  });


      
        if (this.state.flag1 === true) {

            this.state.lifeToBeAssuredflag = true;
            this.setState({});

            this.state.isSameProposerAdd = true;
            this.setState({});


        } else {
            this.state.lifeToBeAssuredflag = false;
            this.setState({});

            this.state.isSameProposerAdd = false;
            this.setState({});
        }
    } 
    SetSameProposerAddCheckBox = (event) => {
         debugger;

        let state = this.state;

        if (event.target.checked == true) {
            state.singleValueCheckboxSelected = true;
            this.setState({});
        } else {
            state.singleValueCheckboxSelected = false;
            this.setState({});
        }

    }
    

    render() {
        const array = [];
        const { classes } = this.props;

        return (

            <CardBody>




                <GridContainer xl={12}>
                    <GridItem lg={12}>

                        <CardBody>

                            <ReactTable
                                data={this.state.data}
                                filterable
                                columns={[

                                    {
                                        Header: "FIRST NAME",
                                        accessor: "FirstName",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,
                                        /* minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'*/
                                    },
                                    {

                                        Header: "LAST NAME",
                                        accessor: "LastName",
                                        minWidth: 60,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,
                                    },
                                    {
                                        Header: "RELATIONSHIP",
                                        accessor: "Relationship",
                                        minWidth: 50,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',

                                        resizable: false,
                                    },
                                    {
                                        Header: "AGE NEXT BIRTHDAY",
                                        accessor: "AgeNextBirthday",

                                        ///style: { textAlign: "center" },
                                        ///headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,
                                    },
                                    {
                                        Header: "GENDER",
                                        accessor: "Gender",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,
                                        //minWidth: 150,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                    },
                                    {
                                        Header: "EDIT",
                                        accessor: "Edit",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,
                                    }

                                ]}
                                defaultPageSize={5}
                                showPaginationTop={false}
                                pageSize={2}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                            />



                        </CardBody>
                    </GridItem>
                </GridContainer>


                <GridContainer lg={12}>
                    <GridItem xs={12} sm={4} md={3}>

                        <MasterDropdown
                            labelText="Relationship With Proposer"
                           // value={props.singleValueSelectedProposer === "0" ? "" : props.tblPolicyMemberDetails.relationShipWithProposer}
                            disabled={ this.state.flag1 === true ? true : this.state.flag2 }
                            lstObject={this.props.MasterDataDto}
                            filterName='RelationshipType'
                            name='relationShipWithProposer'
                            //onChange={(e) => props.MasterSetValue(e)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            success={this.Salutation === "success"}
                            error={this.Salutation === "error"}
                            disabled={this.state.lifeToBeAssuredflag}
                            labelText="Salutation "
                            name="Salutation"
                            required={true}
                           // onChange={(e) => this.detailsChange("string", e)}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.salutation : ""}
                            formControlProps={{
                                fullWidth: true
                            }} 
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="Name With Initials"
                            disabled={this.state.lifeToBeAssuredflag}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.nameWithInitial : ""}
                            name="NameWithInitials"
                            //onChange={props.SetValue}
                            id="NameWithInitials"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            success={this.GivenName === "success"}
                            error={this.GivenName === "error"}
                            labelText="Given Name"
                            disabled={this.state.lifeToBeAssuredflag}
                            name="GivenName"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.givenName : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            success={this.SurName === "success"}
                            error={this.SurName === "error"}
                            labelText="Sur Name"
                            disabled={this.state.lifeToBeAssuredflag}
                            name="SurName"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.surname : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            success={this.NIC === "success"}
                            error={this.NIC === "error"}
                            labelText="NIC"
                            disabled={this.state.lifeToBeAssuredflag}
                            name="NIC"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.NIC}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={3}>
                        <CustomDatetime
                            required={true}
                            onFocus={this.onClick}
                            validdate={this.validdate}
                            labelText="Date Of Birth"
                            disabled={this.state.lifeToBeAssuredflag}
                            id='dob'
                            name='dob'
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.dob : ""}
                            onChange={(evt) => this.onDateChange('datetime', 'ProductDTO', 'activeFrom', evt)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="Age"
                            disabled={this.state.lifeToBeAssuredflag}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.age : ""}
                            name="Age"
                            //onChange={props.SetValue}
                            id="Age"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>

                        <MasterDropdown
                            labelText="Gender"
                            disabled={this.state.lifeToBeAssuredflag}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.gender : ""}
                            //onChange={(e) => props.MasterSetValue(e)}
                            lstObject={this.props.MasterDataDto}
                            filterName='Gender'
                            name='gender'
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>

                        <MasterDropdown
                            labelText="Marital Status"
                            disabled={this.state.lifeToBeAssuredflag}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.maritialStatus : ""}
                            //onChange={(e) => props.MasterSetValue(e)}

                            lstObject={this.props.MasterDataDto}
                            filterName='MaritalStatus'

                            name='maritialStatus'

                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={3}>

                        <Dropdown
                            required={true}
                            labelText="Occupation"
                            disabled={this.state.lifeToBeAssuredflag}
                            lstObject={array}
                            // value={orgData.selectedlevel}
                            //name='selectedlevel'
                            //onChange={(e) => orgData.handlelevels(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>

                   
                   
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            success={this.AnnualIncome === "success"}
                            error={this.AnnualIncome === "error"}
                            labelText="Annual Income "
                            disabled={this.state.lifeToBeAssuredflag}
                            name="annualIncome"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.annualIncome : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>


                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="PassportNumber"
                            disabled={this.state.lifeToBeAssuredflag}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.passportNumber : ""}
                            name="PassportNumber"
                            //onChange={props.SetValue}
                            id="PassportNumber"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="Name Of Employee"
                            disabled={this.state.lifeToBeAssuredflag}
                            //value={props.ProductDTO.ProductName}
                            name="NameOfEmployee"
                            //onChange={props.SetValue}
                            id="NameOfEmployee"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="Nature Of Duties"
                            //value={props.ProductDTO.ProductName}
                            name="NatureOfDuties"
                            //onChange={props.SetValue}
                            id="NatureOfDuties"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>


                    <GridItem xs={12} sm={4} md={3}>

                        <MasterDropdown
                            labelText="Nationality"
                            disabled={this.state.lifeToBeAssuredflag}
                            value={this.state.PolicyMemberDetails.nationality}
                            //onChange={(e) => props.MasterSetValue(e)}
                            lstObject={this.props.MasterDataDto}
                            filterName='Country'
                            name='nationality'
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    
                    <GridItem xs={12} sm={4} md={3}>

                        <MasterDropdown
                            required={true}
                            labelText="Country Of Residence"
                            disabled={this.state.lifeToBeAssuredflag}
                            lstObject={this.props.MasterDataDto}
                            filterName='Country'
                            name='residentialNationality'
                            value={this.state.PolicyMemberDetails.nationality}
                            //onChange={(e) => orgData.handlelevels(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>
                   
                    <GridItem xs={12} sm={4} md={3}>

                        <MasterDropdown
                            required={true}
                            labelText="Age Proof"
                            lstObject={this.props.MasterDataDto}
                            filterName='AgeProofList'
                            name='ageProof'
                            //onChange={(e) => orgData.handlelevels(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>


                   
                    
                    {this.state.singleValueSelected === "0" ?
                        <GridItem xs={12} sm={4} md={3}>
                            <CustomInput
                                success={this.SpecifyOccupationWork === "success"}
                                error={this.SpecifyOccupationWork === "error"}
                                labelText="Specify Occupation Work "
                                disabled={this.state.lifeToBeAssuredflag}
                                name="SpecifyOccupationWork"
                                required={true}
                                onChange={(e) => this.detailsChange("string", e)}
                                value={this.SpecifyOccupationWork}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        : null}

                    <GridItem xs={12} sm={4} md={3}>

                        <MasterDropdown
                            required={true}
                            labelText="Country Of Occupation"
                            disabled={this.state.lifeToBeAssuredflag}
                            lstObject={this.props.MasterDataDto}
                            filterName='Country'
                            name='residentialNationality'
                            value={this.state.PolicyMemberDetails.nationality}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4}>
                        <div style={{ marginTop: "24px" }}>
                            Occupation Requires Any Harzadous Work?
                                    <FormControlLabel
                                control={
                                    <Radio

                                        checked={this.state.singleValueSelected === "0"}
                                        onChange={this.handleRadioChange}
                                        value={0}
                                        name="radio button demo"
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
                                label="yes"
                            />

                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={this.state.singleValueSelected === "1"}
                                        onChange={this.handleRadioChange}
                                        value={1}
                                        name="radio button demo"
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
                    <GridItem xs={12} sm={12} md={12} className="downlevel">
                          <CustomCheckbox
                            name="checkbox"

                            formControlProps={{
                                fullWidth: true
                            }}

                        />

                        

                                Dual you Have Dual CitizenShip
                            </GridItem>


                </GridContainer>




                <CardHeader color="rose" icon>

                    {
                        <h4 >
                            <small>Contact Details</small>
                        </h4>
                    }
                </CardHeader>

                <GridContainer xl={12}>

                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="Mobile No"
                            disabled={this.state.lifeToBeAssuredflag}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.mobile : ""}
                            name="MobileNo"
                            //onChange={props.SetValue}
                            id="MobileNo"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="Home"
                            disabled={this.state.lifeToBeAssuredflag}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.email : ""}
                            name="Home"
                            //onChange={props.SetValue}
                            id="Home"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>


                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="OfficeNo"
                            disabled={this.state.lifeToBeAssuredflag}
                            //value={this.state.flag1 === true ? this.state.PolicyMemberDetails.work : ""}
                            name="Office No"
                            //onChange={props.SetValue}
                            id="OfficeNo"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>




                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="E-Mail"
                            disabled={this.state.lifeToBeAssuredflag}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.home : ""}
                            name="Email"
                            //onChange={props.SetValue}
                            id="Email"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                </GridContainer>




                <CardHeader color="rose" icon>

                    {
                        <h4 >
                            <small> Communication  Address </small>
                        </h4>
                    }
                </CardHeader>
                <GridContainer xl={12}>

                    <GridItem xl={12} sm={12} md={12} className="downlevel">
                        <CustomCheckbox
                            
                            name="isSameasProposerAddress"
                            //isSameProposerAdd
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.isSameProposerAdd :  this.state.PolicyMemberDetails.isSameasProposerAddress }
                            //checked={this.state.PolicyMemberDetails.isSameProposerAdd}
                            onChange={(e) => this.SetSameProposerAddCheckBox(e)}
                            formControlProps={{
                                fullWidth: true
                            }}

                        />

                                 Same As Prosper
                            </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            success={this.Address1 === "success"}
                            error={this.Address1 === "error"}
                            labelText="Address 1"
                            disabled={this.state.lifeToBeAssuredflag}
                            name="Address1"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.state.singleValueCheckboxSelected === true ? this.state.PolicyMemberDetails.address1 : "" || this.state.flag1 === true ? this.state.PolicyMemberDetails.address1 : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            success={this.Address2 === "success"}
                            error={this.Address2 === "error"}
                            labelText="Address 2"
                            disabled={this.state.lifeToBeAssuredflag}
                            name="Address2"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                           // value={this.state.flag1 === true ? this.state.PolicyMemberDetails.address2 : ""}
                            value={this.state.singleValueCheckboxSelected === true ? this.state.PolicyMemberDetails.address2 : "" || this.state.flag1 === true ? this.state.PolicyMemberDetails.address2 : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="Address 3"
                            disabled={this.state.lifeToBeAssuredflag}
                            //value={this.state.flag1 === true ? this.state.PolicyMemberDetails.address3 : ""}
                            value={this.state.singleValueCheckboxSelected === true ? this.state.PolicyMemberDetails.address3 : "" || this.state.flag1 === true ? this.state.PolicyMemberDetails.address3 : ""}
                            name="Address3"
                            //onChange={props.SetValue}
                            id="Address3"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            success={this.City === "success"}
                            error={this.City === "error"}
                            labelText="Postal Code|City "
                            disabled={this.state.lifeToBeAssuredflag}
                            name="City"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                           // value={this.state.flag1 === true ? this.state.PolicyMemberDetails.city : ""}
                            value={this.state.singleValueCheckboxSelected === true ? this.state.PolicyMemberDetails.city : "" || this.state.flag1 === true ? this.state.PolicyMemberDetails.city : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            success={this.District === "success"}
                            error={this.District === "error"}
                            labelText="District "
                            disabled={this.state.lifeToBeAssuredflag}
                            name="District"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            //value={this.state.flag1 === true ? this.state.PolicyMemberDetails.district : ""}
                            value={this.state.singleValueCheckboxSelected === true ? this.state.PolicyMemberDetails.district : "" || this.state.flag1 === true ? this.state.PolicyMemberDetails.district : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>


                    <GridItem xl={12} sm={4} md={3}>
                        <CustomInput
                            success={this.Province === "success"}
                            error={this.Province === "error"}
                            labelText="Province "
                            disabled={this.state.lifeToBeAssuredflag}
                            name="Province"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            //value={this.state.flag1 === true ? this.state.PolicyMemberDetails.home : ""}
                            //value={this.state.singleValueCheckboxSelected === true ? this.state.PolicyMemberDetails.address1 : "" || this.state.flag1 === true ? this.state.PolicyMemberDetails.address1 : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>


                </GridContainer>



                <CardHeader color="rose" icon>

                    {
                        <h4 >
                            <small> Permanent Address </small>
                        </h4>
                    }
                </CardHeader>

                <GridContainer>

                    <GridItem xs={12} sm={12} md={12} /*className="downlevel"*/>
                        <CustomCheckbox
                            name="checkbox"

                            formControlProps={{
                                fullWidth: true
                            }}

                        />
                                Is Permanent Address Same As Communication Adress
                            </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            success={this.Address1 === "success"}
                            error={this.Address1 === "error"}
                            labelText="Address 1"
                            disabled={this.state.lifeToBeAssuredflag}
                            name="Address1"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.address1 : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            success={this.Address2 === "success"}
                            error={this.Address2 === "error"}
                            labelText="Address 2"
                            disabled={this.state.lifeToBeAssuredflag}
                            name="Address2"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.address2 : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="Address 3"
                            disabled={this.state.lifeToBeAssuredflag}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.address3 : ""}
                            name="Address3"
                            //onChange={props.SetValue}
                            id="Address3"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            success={this.City === "success"}
                            error={this.City === "error"}
                            labelText="Postal Code|City "
                            disabled={this.state.lifeToBeAssuredflag}
                            name="City"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.city : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            success={this.District === "success"}
                            error={this.District === "error"}
                            labelText="District "
                            disabled={this.state.lifeToBeAssuredflag}
                            name="District"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.state.flag1 === true ? this.state.PolicyMemberDetails.district : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>


                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            success={this.Province === "success"}
                            error={this.Province === "error"}
                            labelText="Province "
                            disabled={this.state.lifeToBeAssuredflag}
                            name="Province"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            //value={this.state.flag1 === true ? this.state.PolicyMemberDetails.district : ""}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>






                </GridContainer>

            </CardBody>

        );
    }
}
export default withStyles(style)(LifeToBeAssured);
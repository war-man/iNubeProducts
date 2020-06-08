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
const dataTable = {
    headerRow: ["FirstName", "LastName", "Relationship", "AgeNextBirthday", "Gender", "Edit"],
    // footerRow: ["Type", "Position", "Office", "Age", "Actions"],
    dataRows: [
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],

    ]
};
class LifeToBeAssured extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            singleValueSelected: "0",
            singleValue: "0",

            data: dataTable.dataRows.map((prop, key) => {
                return {
                    id: key,
                    FirstName: (<CustomInput
                        //labelText="Name"
                        value="DINESH"
                        //value={props.ProductDTO.ProductName}
                        name="Name"
                        //onChange={props.SetValue}
                        id="FirstName"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />),
                    LastName: (<CustomInput
                        //labelText="Name"
                        value="TIWARI"
                        //value={props.ProductDTO.ProductName}
                        name="LastName"
                        //onChange={props.SetValue}
                        id="LastName"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />),
                    Relationship: prop[2],

                    AgeNextBirthday: (<CustomInput
                        //labelText="Name"
                        value="33"
                        //value={props.ProductDTO.ProductName}
                        name="AgeNextBirthday"
                        //onChange={props.SetValue}
                        id="AgeNextBirthday"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />),
                    Gender: prop[4],
                    Edit: prop[5],
                    Edit: (
                        <div className="actions-right">
                            <Button color="info" justIcon round simple className="edit" onClick={() => this.edittable()}><Edit /></Button>

                        </div>
                    )
                };
            })
        };
    }
    handleRadioChange = (event) => {

        let value = event.target.value;

        this.state.singleValue = event.target.value == "1" ? false : true;
        this.state.singleValueSelected = event.target.value;
        this.setState({ value });
        console.log("singleValueSelected", this.state.singleValueSelected);
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

                        <Dropdown
                            required={true}
                            labelText="Relationship With Proposer"
                            lstObject={array}
                            // value={orgData.selectedlevel}
                            //name='selectedlevel'
                            //onChange={(e) => orgData.handlelevels(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            success={this.Salutation === "success"}
                            error={this.Salutation === "error"}
                            labelText="Salutation "
                            name="Salutation"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.Salutation}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="Name With Initials"
                            //value={props.ProductDTO.ProductName}
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
                            name="GivenName"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.GivenName}
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
                            name="SurName"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.SurName}
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
                        <CustomDatetime required={true} onFocus={this.onClick} validdate={this.validdate} labelText="Date Of Birth" id='dob' name='dob' onChange={(evt) => this.onDateChange('datetime', 'ProductDTO', 'activeFrom', evt)} formControlProps={{ fullWidth: true }} />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="Age"
                            //value={props.ProductDTO.ProductName}
                            name="Age"
                            //onChange={props.SetValue}
                            id="Age"
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>

                        <Dropdown
                            required={true}
                            labelText="Gender"
                            lstObject={array}
                            // value={orgData.selectedlevel}
                            //name='selectedlevel'
                            //onChange={(e) => orgData.handlelevels(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={3}>

                        <Dropdown
                            required={true}
                            labelText="Maritial Status"
                            lstObject={array}
                            // value={orgData.selectedlevel}
                            //name='selectedlevel'
                            //onChange={(e) => orgData.handlelevels(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={3}>

                        <Dropdown
                            required={true}
                            labelText="Occupation"
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
                            name="AnnualIncome"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.AnnualIncome}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>


                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="PassportNumber"
                            //value={props.ProductDTO.ProductName}
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

                        <Dropdown
                            required={true}
                            labelText="Nationality"
                            lstObject={array}
                            // value={orgData.selectedlevel}
                            //name='selectedlevel'
                            //onChange={(e) => orgData.handlelevels(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>
                    
                    <GridItem xs={12} sm={4} md={3}>

                        <Dropdown
                            required={true}
                            labelText="Country Of Residence"
                            lstObject={array}
                            // value={orgData.selectedlevel}
                            //name='selectedlevel'
                            //onChange={(e) => orgData.handlelevels(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                    </GridItem>
                   
                    <GridItem xs={12} sm={4} md={3}>

                        <Dropdown
                            required={true}
                            labelText="Age Proof"
                            lstObject={array}
                            // value={orgData.selectedlevel}
                            //name='selectedlevel'
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

                        <Dropdown
                            required={true}
                            labelText="Country Of Occupation"
                            lstObject={array}
                            // value={orgData.selectedlevel}
                            //name='selectedlevel'
                            //onChange={(e) => orgData.handlelevels(e)}
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
                            //value={props.ProductDTO.ProductName}
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
                            //value={props.ProductDTO.ProductName}
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
                            //value={props.ProductDTO.ProductName}
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
                            //value={props.ProductDTO.ProductName}
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
                            name="checkbox"

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
                            name="Address1"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.Address1}
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
                            name="Address2"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.Address2}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="Address 3"
                            //value={props.ProductDTO.ProductName}
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
                            name="City"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.City}
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
                            name="District"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.District}
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
                            name="Province"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.Province}
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
                            name="Address1"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.Address1}
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
                            name="Address2"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.Address2}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={3}>
                        <CustomInput
                            labelText="Address 3"
                            //value={props.ProductDTO.ProductName}
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
                            name="City"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.City}
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
                            name="District"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.District}
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
                            name="Province"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.Province}
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
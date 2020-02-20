import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import InputLabel from "@material-ui/core/InputLabel";
//import FormControl from "@material-ui/core/FormControl";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import profileStyles from "./profileStyles.jsx";
//import PinCodeModal from "./_PinCodeModal";
//import Select from "@material-ui/core/Select";
//import MenuItem from "@material-ui/core/MenuItem";
//import Button from "components/CustomButtons/Button.jsx";
//import AddPhoneNumber from "./_AddPhoneNumber";
//import AddEmail from "./_AddEmail";
//import AddMobileNumber from "./_AddMobileNumber";
import $ from "jquery";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import RegAddress from "./_RegAddress.jsx";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";

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
    ...customCheckboxRadioSwitch,
    ...profileStyles
};

//const itemStyle = { marginTop: "25px" }

const SpocDetails = (props) => {
    const spocData = props.componentData;
    var addType = 'spoc';
        return (
            <GridContainer>
                <GridItem xs={12} sm={4}>
                    <CustomInput
                        disabled={spocData.disabled}
                        success={props.spocfirstNameState == "success"}
                        error={props.spocfirstNameState == "error"}
                        labelText="First Name"
                        required={true}
                        id="fName"
                        value={spocData.addressDTO.spoc.spocfirstName}
                        name='spocfirstName'
                        onChange={(e) => spocData.handleChange("name", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                   
                </GridItem>
                <GridItem xs={12} sm={4}>
                    <CustomInput
                        disabled={spocData.disabled}
                        labelText="Middle Name"
                        id="fName"
                        value={spocData.addressDTO.spoc.spocMiddleName}
                        name='spocMiddleName'
                        onChange={(e) => spocData.handleChange("name", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />

                </GridItem>
                <GridItem xs={12} sm={4}>
                    <CustomInput
                        disabled={spocData.disabled}
                        labelText="Last Name"
                        id="fName"
                        value={spocData.addressDTO.spoc.spocLastName}
                        name='spocLastName'
                        onChange={(e) => spocData.handleChange("name",e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomDatetime style="ddl"
                        disabled={spocData.disabled}
                        labelText="Date of Birth*"
                        required={true}
                        id='dob'
                        name='spocdob'
                        onChange={(evt) => spocData.onDateChange('spocdob', evt)}
                        value={spocData.addressDTO.spoc.spocdob}
                        formControlProps={{ fullWidth: true }} />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomDatetime style="ddl"
                        disabled={spocData.disabled}
                        labelText="Date of Joining*"
                        required={true}
                        id='doj'
                        name='spocdoj'
                        onChange={(evt) => spocData.onDateChange('spocdoj', evt)}
                        value={spocData.addressDTO.spoc.spocdoj}
                        formControlProps={{ fullWidth: true }} />
                </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={spocData.disabled}
                        success={spocData.spocdesignationState == "success"}
                        error={spocData.spocdesignationState == "error"}
                        required={true}
                                labelText="Designation"
                                id="designation"
                        value={spocData.addressDTO.spoc.spocdesignation}
                        name='spocdesignation'
                        onChange={(e) => spocData.handleChange("name",e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                </GridItem> 
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={spocData.disabled}
                        success={spocData.spocemailIdState == "success"}
                        error={spocData.spocemailIdState == "error"}
                        labelText="EmailId"
                        required={true}
                        id="emailId"
                        value={spocData.addressDTO.spoc.spocemailId}
                        name='spocemailId'
                        onChange={(e) => spocData.handleChange("email",e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={spocData.disabled}
                       success={spocData.spocmobilenoState == "success"}
                       error={spocData.spocmobilenoState == "error"}
                        labelText="Mobile Number"
                        id="mobileNumber"
                        required={true}
                        value={spocData.addressDTO.spoc.spocmobileno}
                        name='spocmobileno'
                        onChange={(e) => spocData.handleChange("number",e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={spocData.disabled}
                        labelText="landLine - Office"
                        id="mobileNumber"
                        value={spocData.addressDTO.spoc.landLineOffice}
                        name='landLineOffice'
                        onChange={(e) => spocData.handleChange("",e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={spocData.disabled}
                        success={spocData.spocpanNoState == "success"}
                        error={spocData.spocpanNoState == "error"}
                        labelText="PAN"
                        id="mobileNumber"
                        value={spocData.addressDTO.spoc.spocpanNo}
                        name='spocpanNo'
                        required={true}
                        onChange={(e) => spocData.handleChange("name",e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={4}>
                    <MasterDropdown
                        disabled={spocData.disabled}
                        labelText="Marital Status*"
                        id="MaritalStatus"
                        lstObject={spocData.masterLists}
                        filterName='MaritalStatus'
                        required={true}
                        value={spocData.addressDTO.spoc.spocMaritalStatusId}
                        name='spocMaritalStatusId'
                        onChange={(e) => spocData.GetLocation('', addType, e)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={12} sm={4}>
                    <MasterDropdown
                        disabled={spocData.disabled}
                        labelText="Select Gender*"
                        id="gender"
                        lstObject={spocData.masterLists}
                        filterName='Gender'
                        value={spocData.addressDTO.spoc.spocGenderId}
                        name='spocGenderId'
                        required={true}
                        onChange={(e) => spocData.GetLocation('', addType, e)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={12} sm={10} md={12}>
                    <RegAddress  {...props}/>
                </GridItem>
            </GridContainer>
        );
    }
export default withStyles(style)(SpocDetails);
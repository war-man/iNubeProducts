import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";

import RegisteredAddress from "./_RegisteredAddress";
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
   // ...profileStyles
};

//const itemStyle = { marginTop: "25px" }

const SpocDetails = (props) => {
    const prop = props.componentData;
    var addType = 'spoc';
        return (
            <GridContainer>
                <GridItem xs={12} sm={4}>
                    <CustomInput
                        //disabled={prop.disabled}
                        success={prop.firstNameState == "success"}
                        error={prop.firstNameState == "error"}
                        disabled={prop.disableView}
                        labelText="FirstName"
                        required={true}
                        id="fName"
                        value={prop.spocDetails[0].firstName}
                        name='firstName'
                       
                        onChange={(e) => prop.SetSpocValue("string", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    {prop.errormessage && (prop.spocDetails[0].firstName == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                </GridItem>
                <GridItem xs={12} sm={4}>
                    <CustomInput
                        disabled={prop.disableView}
                        success={prop.middleNameState == "success"}
                        error={prop.middleNameState == "error"}
                        labelText="MiddleName"
                        id="fName"
                        value={prop.spocDetails[0].middleName}
                        name='middleName'
                  
                        onChange={(e) => prop.SetSpocValue("string", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />

                </GridItem>
                <GridItem xs={12} sm={4}>
                    <CustomInput
                        disabled={prop.disableView}
                        success={prop.lastNameState == "success"}
                        error={prop.lastNameState == "error"}
                        labelText="LastName"
                        id="fName"
                        value={prop.spocDetails[0].lastName}
                        name='lastName'
                        //required={true}
                        //onChange={(e) => prop.handleChange("name", e)}
                        onChange={(e) => prop.SetSpocValue("string", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomDatetime style="ddl"
                        success={prop.dobState == "success"}
                        error={prop.dobState == "error"}
                        disabled={prop.disableView}
                        Futuredatevalidate={true}
                        labelText="DateofBirth"
                        required={true}
                        id='dob'
                        name='dob'
                        onChange={(evt) => prop.onDateChange('datetime', 'dob', evt)}
                        value={prop.spocDetails[0].dob}
                        formControlProps={{ fullWidth: true }} />
                    {prop.errormessage && (prop.spocDetails[0].dob == "") ? <p className="error">*Date Of Birth can't be future date </p> : null}
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                    <CustomDatetime style="ddl"
                        success={prop.dojState == "success"}
                        error={prop.dojState == "error"}
                        disabled={prop.disableView}
                        labelText="DateofJoining"
                        required={true}
                        id='doj'
                        Futuredatevalidate={true}
                        name='doj'
                        onChange={(evt) => prop.onDateChange('datetime', 'doj', evt)}
                        value={prop.spocDetails[0].doj}
                        formControlProps={{ fullWidth: true }} />
                    {prop.errormessage && (prop.spocDetails[0].doj == "") ? <p className="error">*Date Of Joining can't be less then today </p> : null}
                </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={prop.disableView}
                        success={prop.designationState == "success"}
                        error={prop.designationState == "error"}
                        required={true}
                                labelText="Designation"
                                id="designation"
                        value={prop.spocDetails[0].designation}
                        name='designation'
                       
                        onChange={(e) => prop.SetSpocValue("string", e)}
                                formControlProps={{
                                    fullWidth: true
                                }}
                    />
                    {prop.errormessage && (prop.spocDetails[0].designation == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                </GridItem> 
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={prop.disableView}
                        success={prop.emailIdState == "success"}
                        error={prop.emailIdState == "error"}
                        labelText="EmailId"
                        required={true}
                        id="emailId"
                        value={prop.spocDetails[0].emailId}
                        name='emailId'
                      
                        onChange={(e) => prop.SetSpocValue("email", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    {prop.errormessage && (prop.spocDetails[0].emailId == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                    {prop.spocemailMessage && <p className="error">{prop.spocservermessage}</p>}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={prop.disableView}
                        success={prop.mobilenoState == "success"}
                        error={prop.mobilenoState == "error"}
                        labelText="MobileNumber"
                        id="mobileNumber"
                        required={true}
                        inputType="number"
                        value={prop.spocDetails[0].mobileno}
                        name='mobileno'
                       
                        onChange={(e) => prop.SetSpocValue("phoneno", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                    {prop.errormessage && (prop.spocDetails[0].mobileno == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={prop.disableView}
                        success={prop.landLineOfficeState == "success"}
                        error={prop.landLineOfficeState == "error"}
                        labelText="LandlineOffice"
                        id="landlineNumber"
                        inputType="number"
                        value={prop.spocDetails[0].landLineOffice}
                        name='landLineOffice'
                       
                        onChange={(e) => prop.SetSpocValue("telephone", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={prop.disableView}
                        success={prop.panNoState == "success"}
                        error={prop.panNoState == "error"}
                        labelText="PAN"
                        required={true}
                        id="panno"
                        value={prop.spocDetails[0].panNo}
                        name='panNo'
                        onChange={(e) => prop.SetSpocValue("pan", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                 <GridItem xs={12} sm={4}>
                    <MasterDropdown
                       // disabled={prop.disabled}
                        labelText="MaritalStatus"
                        id="MaritalStatus"
                        lstObject={prop.master}
                        filterName='MaritalStatus'
                        required={true}
                        value={prop.spocDetails[0].maritalStatusId}
                        name='maritalStatusId'
                        //onChange={(e) => prop.GetLocation('', addType, e)}
                        onChange={(e) => prop.SetSpocValue("string", e)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
                <GridItem xs={12} sm={4}>
                    <MasterDropdown
                       // disabled={prop.disabled}
                        labelText="SelectGender"
                        id="gender"
                        lstObject={prop.master}
                        filterName='Gender'
                        value={prop.spocDetails[0].genderId}
                        name='genderId'
                        required={true}
                       // onChange={(e) => prop.GetLocation('', addType, e)}
                        onChange={(e) => prop.SetSpocValue("string", e)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem> 
                {/*<GridItem xs={12} sm={10} md={12}>
                    <RegisteredAddress  {...props} />
                </GridItem> */}
            </GridContainer>
        );
    }
export default withStyles(style)(SpocDetails);
import React from "react";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

// @material-ui/core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import $ from 'jquery';
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import UserAddress from "./UserAddress.jsx";
import { Animated } from "react-animated-css";
import validationPage from "./ValidationPage";
import CardBody from "../../../../components/Card/CardBody";

const CreateUser = (props) => {
    console.log('Create User props ', props);
    const { classes } = props;
    return (
        <GridContainer>
            <GridItem xs={12} sm={4}>
                <CustomInput
                    //success={props.firstNameState == "success"}
                    //error={props.firstNameState == "error"}
                    error={props.firstNameState}
                    labelText="FirstName"
                    id="fName"
                    value={props.UserData.firstName}
                    name='firstName'
                    required={true}
                    onChange={(e) => props.SetValue("string", e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                {props.errormessage && (props.UserData.firstName == "") ? <p className="error">*Required field data is missing</p> : null}
            </GridItem>
            <GridItem xs={12} sm={4}>
                <CustomInput
                    labelText="MiddleName"
                    id="mName"
                    value={props.UserData.middleName}
                    name='middleName'
                    onChange={(e) => props.SetValue("string", e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={4}>
                <CustomInput
                    labelText="LastName"
                    id="lName"
                    value={props.UserData.lastName}
                    name="lastName"
                    onChange={(e) => props.SetValue("string", e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
                <MasterDropdown
                    labelText="MaritalStatus"
                    id="MaritalStatus"
                    lstObject={props.masterList}
                    required={true}
                    filterName='MaritalStatus'
                    value={props.UserData.maritalStatusId}
                    name='maritalStatusId'
                    onChange={(e) => props.GetMasterData('MaritalStatus', 'Userdata', e)}
                    formControlProps={{ fullWidth: true }}
                />
                {props.errormessage && (props.UserData.maritalStatusId == "") ? <p className="error">*<TranslationContainer translationKey="RequiredField" /></p> : null}
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
                <MasterDropdown
                    labelText="Gender"
                    id="gender"
                    lstObject={props.masterList}
                    filterName='Gender'
                    required={true}
                    value={props.UserData.genderId}
                    name='genderId'
                    onChange={(e) => props.GetMasterData('Gender', 'Userdata', e)}
                    formControlProps={{ fullWidth: true }}
                />
                {props.errormessage && (props.UserData.genderId == "") ? <p className="error">*<TranslationContainer translationKey="RequiredField" /></p> : null}
            </GridItem>
            <GridItem xs={12} md={4}>
                <CustomDatetime
                    labelText="DateofBirth"
                    id='dob'
                    name='dob'
                    Futuredatevalidate={true}
                    required={true}
                    onChange={(evt) => props.onDateChange('dob', evt)}
                    value={props.UserData.dob}
                    formControlProps={{ fullWidth: true }} />
                {props.errormessage && (props.UserData.dob == "") ? <p className="error">*<TranslationContainer translationKey="RequiredField" /></p> : null}
            </GridItem>
            <GridItem xs={12} md={4}>
                <CustomDatetime
                    labelText="DateofJoining"
                    id='doj'
                    name='doj'
                    Futuredatevalidate={true}
                    required={true}
                    onChange={(evt) => props.onDateChange('doj', evt)}
                    value={props.UserData.doj}
                    formControlProps={{ fullWidth: true }} />
                {props.errormessage && (props.UserData.doj == "") ? <p className="error">*<TranslationContainer translationKey="RequiredField" /></p> : null}
            </GridItem>

            <GridItem xs={12} sm={4} md={4}>
                <CustomInput
                    //success={props.contactNumberState == "success"}
                    //error={props.contactNumberState == "error"}
                    error={props.contactNumberState}
                    labelText="MobileNumber"
                    id="No"
                    required={true}
                    name="contactNumber"
                    value={props.UserData.contactNumber}
                    onChange={(e) => props.SetValue("phnumber", e)}
                    inputType="number"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                {props.errormessage && (props.UserData.contactNumber == "") ? <p className="error">*<TranslationContainer translationKey="RequiredField" /></p> : null}
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
                <CustomInput
                    placeholder="eg. 08026728730"
                    //success={props.landLineOfficeState == "success"}
                    //error={props.landLineOfficeState == "error"}
                    labelText="LandlineOffice"
                    id="No"
                    name="landLineOffice"
                    inputType="number"
                    value={props.UserData.landLineOffice}
                    onChange={(e) => props.SetValue("LandLineNumber", e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
                <CustomInput
                    placeholder="eg. 08026728730"
                    //success={props.landLineResidenceState == "success"}
                    //error={props.landLineResidenceState == "error"}
                    labelText="LandlineResidence"
                    id="No"
                    name="landLineResidence"
                    inputType="number"
                    value={props.UserData.landLineResidence}
                    onChange={(e) => props.SetValue("LandLineNumber", e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>

            <GridItem xs={12} sm={4} md={4}>
                <CustomInput
                    //success={props.emailState == "success"}
                    //error={props.emailState == "error"}
                    error={props.emailState}
                    labelText="EmailID"
                    id="mailId"
                    required={true}
                    value={props.UserData.email}
                    name='email'
                    onChange={(e) => props.SetValue("email", e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                <p className="errorMsg">{props.emailvaidation}</p>
                {props.errormessage && (props.UserData.email == "") ? <p className="error">*<TranslationContainer translationKey="RequiredField" /></p> : null}
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
                <CustomInput
                    //success={props.panNoState == "success"}
                    //error={props.panNoState == "error"}
                    error={props.panNoState}
                    labelText="PAN"
                    id="panNo"
                    required={true}
                    value={props.UserData.panNo}
                    name="panNo"
                    onChange={(e) => props.SetValue("pan", e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
                {props.errormessage && (props.UserData.panNo == "") ? <p className="error">*<TranslationContainer translationKey="RequiredField" /></p> : null}
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
                <CustomInput
                    //success={props.branchNameState == "success"}
                    //error={props.branchNameState == "error"}
                    error={props.branchNameState}
                    labelText="BranchName"
                    id="branchName"
                    required={true}
                    value={props.UserData.branchName}
                    name='branchName'
                    onChange={(e) => props.SetValue("string", e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
                <CustomInput
                    //success={props.branchCodeState == "success"}
                    //error={props.branchCodeState == "error"}
                    error={props.branchCodeState}
                    labelText="BranchCode"
                    id="branchCode"
                    value={props.UserData.branchCode}
                    name='branchCode'
                    required={true}
                    onChange={(e) => props.SetValue("string", e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={4} md={4}>
                {props.visibility ? <CustomInput
                    labelText="PartnerName"
                    id="No"
                    disabled={true}
                    name="partnerName"
                    value={props.partnerName}
                    onChange={(e) => props.SetValue("string", e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                /> : null}
            </GridItem>
        </GridContainer >
    );
}
export default CreateUser;
import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import CreatePartner from "assets/img/group.png";
import Icon from "@material-ui/core/Icon";
import $ from 'jquery';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import { Animated } from "react-animated-css";
import CommonMessage from "Messages/CommonMessage.jsx";

const ProfileDetails = (props) => {
    const profileData = props;
    //var addType = 'prof';
    console.log("ProfileDetails Props: ", props)
    //console.log("Type of" + props.PartnerDTO.partnerTypeId);
    //console.log("props in pd", props.isdisable);
    //console.log("view properties" + props.PartnerDTO.par);
    return (
        <div>
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            { /*  <FilterNone /> */}
                            <Icon><img id="icon" src={CreatePartner} /></Icon>

                        </CardIcon>
                        <h4>
                            <small><TranslationContainer translationKey="PartnerDetails" /></small>
                        </h4>
                    </CardHeader>
                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                        <CardBody>

                            <GridContainer>
                                <GridItem xs={12} sm={3}>
                                    <CustomInput
                                        disabled={props.disabled}
                                        success={props.partnerCodeState === "success"}
                                        error={props.partnerCodeState === "error"}
                                        labelText="PartnerCode"
                                        value={props.PartnerDTO.partnerCode}
                                        required={true}
                                        name="partnerCode"
                                        //onChange={props.SetValue}
                                        onChange={(event) => props.SetValue("string", event)}
                                        id="partnercode"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    <span className="error">  {props.errormessage && (props.PartnerDTO.partnerCode == "") ? CommonMessage("RequiredField", []) : null}</span>
                                    {props.message && <p className="error">{props.servermessage}</p>}
                                </GridItem>

                                <GridItem xs={12} sm={3}>
                                    <MasterDropdown labelText="PartnerType" required={true} disabled={props.disabled} success={props.partnerTypeIdState == "success"} error={props.partnerTypeIdState == "error"} id="PartnerDTO.partTypeId" value={props.PartnerDTO.partnerTypeId} lstObject={profileData.masterList} filterName='PartnerType' model="PartnerDTO" name='partnerTypeId' onChange={(e) => profileData.SetValue("dropdown", e)} formControlProps={{ fullWidth: true }} />
                                    <span className="error"> {props.errormessage && (props.PartnerDTO.partnerTypeId == "") ? CommonMessage("RequiredField", []) : null}</span>

                                </GridItem>
                                <GridItem xs={12} sm={3}>
                                    <MasterDropdown labelText="PartnerClass" required={true} disabled={props.disabled} success={props.partnerClassIdState} error={props.partnerClassIdState} id="PartnerDTO.partClassId" value={props.PartnerDTO.partnerClassId} lstObject={profileData.masterList} filterName='PartnerClass' model="PartnerDTO" name='partnerClassId' onChange={(e) => profileData.SetValue("dropdown", e)} formControlProps={{ fullWidth: true }} />
                                    <span className="error">{props.errormessage && (props.PartnerDTO.partnerClassId == "") ? CommonMessage("RequiredField", []) : null}</span>
                                </GridItem>

                                <GridItem xs={12} sm={3} >
                                    <MasterDropdown labelText="Salutation" required={true} disabled={props.disabled} success={props.salutationIdState} error={props.salutationIdState} id="PartnerDTO.salutationId" value={props.PartnerDTO.salutationId} lstObject={profileData.masterList} filterName='Salutation' model="PartnerDTO" name='salutationId' onChange={(e) => profileData.SetValue("dropdown", e)} formControlProps={{ fullWidth: true }} />
                                    <span className="error">  {props.errormessage && (props.PartnerDTO.salutationId == "") ? CommonMessage("RequiredField", []) : null}</span>
                                    {/*  <p className="errorMsg">{props.errors.salutationId}</p>*/}
                                </GridItem>
                                <GridItem xs={12} sm={3} >

                                    <CustomInput
                                        disabled={props.disabled}
                                        success={props.partnerNameState == "success"}
                                        error={props.partnerNameState == "error"}
                                        labelText="PartnerName"
                                        required={true}
                                        id="partnerName"
                                        value={props.PartnerDTO.partnerName}
                                        name="partnerName"
                                        onChange={(event) => profileData.SetValue("partnerName", event)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    
                                    <span className="error"> {props.errormessage && (props.PartnerDTO.partnerName == "") ? CommonMessage("RequiredField", []) : null} </span>

                                    {/* <p className="errorMsg">{props.errors.partnerName}</p>*/}
                                </GridItem>
                                <GridItem xs={12} sm={3} >
                                    <CustomInput
                                        disabled={props.disabled}
                                        placeholder="eg: 08023-456789"
                                        success={props.telephoneState == "success"}
                                        error={props.telephoneState == "error"}
                                        labelText="Telephone"
                                        id="telephone"
                                        value={props.PartnerDTO.telephone}
                                        name="telephone"
                                        onChange={(event) => profileData.SetValue("telephone", event)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={3} >
                                    <CustomInput
                                        disabled={props.disabled}
                                        success={props.mobileState == "success"}
                                        error={props.mobileState == "error"}
                                        labelText="MobileNumber"
                                        required={true}
                                      
                                        inputType="number"
                                        id="mobile"
                                        value={props.PartnerDTO.mobile}
                                        name="mobile"
                                        onChange={(event) => profileData.SetValue("number", event)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    <span className="error">{props.errormessage && (props.PartnerDTO.mobile == "") ? CommonMessage("RequiredField", []) : null}</span>
                                    {/*  <p className="errorMsg">{props.errors.mobile}</p>*/}
                                </GridItem>
                                <GridItem xs={12} sm={3} >
                                    <CustomInput
                                        disabled={props.disabled}
                                        success={props.emailState == "success"}
                                        error={props.emailState == "error"}
                                        labelText="EmailID"
                                        required={true}
                                        id="email"
                                        value={props.PartnerDTO.email}
                                        name="email"
                                        onChange={(event) => profileData.SetValue("email", event)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    <span className="error">{props.errormessage && (props.PartnerDTO.email == "") ? CommonMessage("RequiredField", []) : null}</span>
                                    {/* <p className="errorMsg">{props.errors.email}</p>*/}
                                </GridItem>
                                <GridItem xs={12} sm={3} >
                                    <CustomInput
                                        disabled={props.disabled}
                                        success={props.panState == "success"}
                                        error={props.panState == "error"}
                                        labelText="PAN"
                                        required={true}
                                        id="pan"
                                        value={props.PartnerDTO.pan}
                                        name="pan"
                                        onChange={(event) => profileData.SetValue("pan", event)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    <span className="error">  {props.errormessage && (props.PartnerDTO.pan == "") ? CommonMessage("RequiredField", []) : null} </span>
                                    {/*  <p className="errorMsg">{props.errors.pan}</p>*/}
                                </GridItem>
                                <GridItem xs={12} sm={3} >
                                    <CustomInput
                                        disabled={props.disabled}
                                        success={props.websiteState == "success"}
                                        error={props.websiteState == "error"}
                                        labelText="Website"
                                        required={true}
                                        id="website"
                                        value={props.PartnerDTO.website}
                                        name="website"
                                        onChange={(event) => profileData.SetValue("Url", event)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                    <span className="error">   {props.errormessage && (props.PartnerDTO.website == "") ? CommonMessage("RequiredField", []) : null}</span>
                                    {/*<p className="errorMsg">{props.errors.website}</p>*/}
                                </GridItem>
                                {/*       <GridItem xs={12} sm={3}>
                              
                                        <input type='file' id="imageUpload" onChange={(e) => props.fileSelectedHandler(e)} accept=".png, .jpg, .jpeg" />
                                        <label for="imageUpload"></label>
                                  
                                </GridItem>*/}

                            </GridContainer>

                        </CardBody>
                    </Animated>
                </Card>
            </Animated>
        </div>
    );

}
ProfileDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

export default ProfileDetails;
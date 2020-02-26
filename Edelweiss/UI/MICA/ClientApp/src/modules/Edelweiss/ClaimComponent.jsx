import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

// @material-ui/core components

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Icon from "@material-ui/core/Icon";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import ruleconfig from 'modules/RuleEngine/RuleConfig.js';
//import config from '../../../../config.js';
//import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomDatetime from "components/CustomComponent/CustomDatetimeFormate.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";


import { Animated } from "react-animated-css";

const ClaimComponent = (props) => {
    console.log("LossIntimatedByData", props.LossIntimatedByData);
    return (
        <div>
            <CardHeader color="info" icon >
                {
                    <h3 >
                        <small><TranslationContainer translationKey="LossDetails" /></small>
                    </h3>
                }
            </CardHeader>

            <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                    <CustomDatetime
                        //success={props.lossDateTimeState === "success"}
                        error={props.lossDateTimeState}
                        required={true}
                        onFocus={props.onClick}
                        labelText="LossDate"
                        Futuredatevalidate={true}
                        id='dtActiveFrom'
                        name='lossDateTime'
                        onChange={(evt) => props.onDateChange('datetime', 'DetailsDTO', 'lossDateTime', evt)}
                        value={props.DetailsDTO.lossDateTime}
                        formControlProps={{ fullWidth: true }}
                    />
                    {props.errormessage && (props.DetailsDTO.lossDateTime == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                    {props.errordate && (props.DetailsDTO.lossDateTime > props.PolicyEndDate || props.DetailsDTO.lossDateTime < props.PolicyStartDate) ? <p className="error">*Loss Date must be within Policy Tenure </p> : null}
             </GridItem>
                <GridItem xs={8} sm={5} md={3}>
                    <CustomInput
                       // success={props.locationOfLossState === "success"}
                        error={props.locationOfLossState}
                        labelText="LocationOfLoss"
                        value={props.DetailsDTO.locationOfLoss}
                        name="locationOfLoss"
                        required={true}
                        
                        onChange={(e) => props.handleChange("locationOfLoss", e)}
                        formControlProps={{ fullWidth: true }}
                    />
                    {props.errormessage && (props.DetailsDTO.locationOfLoss == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                    
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <MasterDropdown
                        labelText="LossIntimatedBy"
                        id="ddlstatus"
                        lstObject={props.LossIntimatedByData}
                        filterName='Claim Intimated By'
                        required={true}
                        value={props.DetailsDTO.lossIntimatedBy}
                        name='lossIntimatedBy'
                        onChange={(e) => props.handleChange("lossIntimatedBy",e)}
                        formControlProps={{ fullWidth: true }}
                    />
                    {props.errormessage && (props.DetailsDTO.lossIntimatedBy == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                    <MasterDropdown
                        labelText="CauseOfLoss"
                        id="ddlstatus"
                        lstObject={props.CauseoflossData}
                        filterName='Cause Of Loss'
                        required={true}
                        value={props.DetailsDTO.causeOfLoss}
                        name='causeOfLoss'
                        onChange={(e) => props.handleChange("causeOfLoss", e)}
                        formControlProps={{ fullWidth: true }}
                    />
                    {props.errormessage && (props.DetailsDTO.causeOfLoss == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                       // success={props.lossDescriptionState === "success"}
                        error={props.lossDescriptionState}
                        labelText="LossDescription"
                        value={props.DetailsDTO.lossDescription}
                        name="lossDescription"
                        required={true}
                        multiline={true}
                        onChange={(e) => props.handleChange("lossDescription", e)}
                        inputProps={{
                            //type: "number"
                        }}
                        formControlProps={{ fullWidth: true }} />
                    {props.errormessage && (props.DetailsDTO.lossDescription == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                </GridItem>
                {props.DataModel.map((item, index) =>

                    <GridItem xs={8} sm={5} md={3}>
                        {(item.userInputType != "datetime") ?
                            <CustomInput labelText={item.Name}
                                // value={item.paramName}
                                name={item.Name}
                                onChange={(e) => props.onModelChange(e)}
                                inputProps={{
                                    //type: "number"
                                }}
                                formControlProps={{ fullWidth: true }} /> :
                            <CustomDatetime labelText={item.Name} name={item.Name} value={props.DataModelDTO[item.Name]} onChange={(evt) => props.onDateChange('Datetime', item.Name, evt)} formControlProps={{ fullWidth: true }} />
                        }


                    </GridItem>
                )}
                {/*     <GridItem xs={8} sm={5} md={3}>
                    <CustomInput
                        // success={props.locationOfLossState === "success"}
                        error={props.locationOfLossState}
                        labelText="Vehicle Location"
                        value={props.DetailsDTO.locationOfLoss}
                        name="locationOfLoss"
                        required={true}

                        onChange={(e) => props.handleChange("locationOfLoss", e)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>
             <GridItem xs={12} sm={12} md={4}>
                    <Dropdown
                        labelText="Country"
                       // id="custAddress.countryId"
                        required={true}
                        disabled={props.disableView}
                        lstObject={props.LocationDTO.Country}
                        value={props.regAddress[0].countryId}
                        name="countryId"
                        onChange={(e) => props.GetLocation('State', e)}
                        formControlProps={{ fullWidth: true }} />
                </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Dropdown labelText="Vehicle Location State"  required={true} disabled={props.disableView} lstObject={props.LocationDTO.State} value={props.regAddress[0].stateId} name="stateId" onChange={(e) => props.GetLocation('District', e)} formControlProps={{ fullWidth: true }} />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Dropdown labelText="District" id="custAddress.districtId" required={true} disabled={props.disableView} lstObject={props.LocationDTO.District} value={props.regAddress[0].districtId} name="districtId" onChange={(e) => props.GetLocation('City', e)} formControlProps={{ fullWidth: true }} />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Dropdown labelText="City" id="custAddress.cityId" required={true} disabled={props.disableView} lstObject={props.LocationDTO.City} value={props.regAddress[0].cityId} name="cityId" onChange={(e) => props.GetLocation('Pincode', e)} formControlProps={{ fullWidth: true }} />
                </GridItem>*/}
                {/* <GridItem xs={12} sm={12} md={3}>
                    <MasterDropdown
                        labelText="Vehicle Location State"
                        id="ddlstatus"
                        lstObject={props.LossIntimatedByData}
                        filterName=''
                        required={true}
                        value={props.DetailsDTO.lossIntimatedBy}
                        name='lossIntimatedBy'
                        onChange={(e) => props.handleChange("lossIntimatedBy", e)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>*/}

                {/*  <GridItem xs={8} sm={5} md={3}>
                    <CustomInput
                        // success={props.locationOfLossState === "success"}
                        error={props.locationOfLossState}
                        labelText="Driver Name"
                        value={props.DetailsDTO.locationOfLoss}
                        name="locationOfLoss"
                        required={true}

                        onChange={(e) => props.handleChange("locationOfLoss", e)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                    <MasterDropdown
                        labelText="Self-Survey Required"
                        id="ddlstatus"
                        lstObject={props.SelfSurveydata}
                        filterName='Self Survey'
                        required={true}
                        value={props.DetailsDTO.selfsurvey}
                        name='selfsurvey'
                        onChange={(e) => props.handleChange("selfsurvey", e)}
                        formControlProps={{ fullWidth: true }}
                    />
                </GridItem>


           <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        success={props.policyNumberState === "success"}
                        error={props.policyNumberState === "error"}
                        labelText="Policy Number"
                        disabled={true}
                        value={props.DetailsDTO.policyNumber}
                        name="policyNumber"
                        onChange={(e) => props.handleChange(e)}

                        formControlProps={{ fullWidth: true }} />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        success={props.benefitAmountState === "success"}
                        error={props.benefitAmountState === "error"}
                        labelText="Benefit Amount"
                        disabled={true}
                        value={props.DetailsDTO.benefitAmount}
                        name="benefitAmount"
                        onChange={(e) => props.handleChange("benefitAmount", e)}
                        formControlProps={{ fullWidth: true }} />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        success={props.claimAmountState === "success"}
                        error={props.claimAmountState === "error"}
                        labelText="Claim Amount"
                        value={props.DetailsDTO.claimAmount}
                        name="claimAmount"
                        required={true}
                        onChange={(e) => props.handleChange("claimAmount", e)}
                        formControlProps={{ fullWidth: true }} />
                    {props.errormessage && (props.DetailsDTO.claimAmount == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                    {props.errorstatus &&
                        (props.DetailsDTO.claimAmount > props.DetailsDTO.benefitAmount) ? <p className="error">*Claim Amount should not be greater than Benefit Amount</p> : null }
                     </GridItem>

*/}
                {props.coverEventshow && <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            success={props.beneficiaryNameState === "success"}
                            error={props.beneficiaryNameState === "error"}
                            labelText="Beneficiary Name"
                            value={props.DetailsDTO.beneficiaryName}
                            name="beneficiaryName"
                            onChange={props.onInputParamChange}
                            inputProps={{
                                //type: "number"
                            }}
                            formControlProps={{ fullWidth: true }} />
                    </GridItem>

                    {/* <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                        success={props.mobileNumberState === "success"}
                        error={props.mobileNumberState === "error"}
                        labelText="Mobile Number"
                        value={props.DetailsDTO.mobileNumber}
                        name="mobileNumber"
                        onChange={props.onInputParamChange}
                        inputProps={{
                            //type: "number"
                        }}
                        formControlProps={{ fullWidth: true }} />
                </GridItem>*/}
                </GridContainer>
                }
            </GridContainer>
        </div>
    );

}

export default ClaimComponent;
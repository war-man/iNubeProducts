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
import CardHeader from "components/Card/CardHeader.jsx";
//import config from '../../../../config.js';
//import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomDatetime from "components/CustomComponent/CustomDatetimeFormate.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import { Animated } from "react-animated-css";

const ClaimComponent = (props) => {
    
   // console.log("ProductClaimData1111", props.ProductClaimData1);
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

                    {props.lossdateflag && (props.DetailsDTO.lossDateTime == "") ? <p className="error"> </p> : null}
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

                    {props.locationflag && (props.DetailsDTO.locationOfLoss == "") ? <p className="error"> </p> : null}

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
                        onChange={(e) => props.handleChange("lossIntimatedBy", e)}
                        formControlProps={{ fullWidth: true }}
                    />
                    {props.errormessage && (props.DetailsDTO.lossIntimatedBy == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                    {props.lossintimatedflag && (props.DetailsDTO.lossIntimatedBy == "") ? <p className="error"> </p> : null}
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

                    {props.causeflag && (props.DetailsDTO.causeOfLoss == "") ? <p className="error"> </p> : null}
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

                    {props.descriptionflag && (props.DetailsDTO.lossDescription == "") ? <p className="error"> </p> : null}
                </GridItem>


                {props.ProductClaimData.map(m =>

                    <GridItem xs={12} sm={12} md={3}>
                        {props.renderPage(m)}

                    </GridItem>
                )
                }

                
               
               
            </GridContainer>
        </div>
    );

}

export default ClaimComponent;
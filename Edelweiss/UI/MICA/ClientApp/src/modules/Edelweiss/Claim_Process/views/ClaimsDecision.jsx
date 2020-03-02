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
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import $ from 'jquery';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";






const ClaimsDecision = (props) => {
    console.log("ClaimsDecisionData", props.DecisionType);

    return (

        <div>


            {
                props.approved &&
               
                <div>
                    <CardHeader color="info" icon >
                        {
                            <h3 >
                                <small><TranslationContainer translationKey="ApproversRemark" /></small>
                            </h3>
                        }
                    </CardHeader>
                    <GridContainer lg={12}>
                        <GridItem xs={12} sm={4} md={3}>

                            <Dropdown
                           // success={props.claimStatusIdState === "success"}
                            error={props.claimStatusIdState}
                            labelText="ClaimStatus"
                            id="ddlstatus"
                            lstObject={props.DecisionType}
                            filterName='Claims Decision'
                            required={true}
                            value={props.fields.claimStatusId}
                            name='claimStatusId'
                            onChange={(evt) => props.onInputParamChange("claimStatusId", evt)}
                            formControlProps={{ fullWidth: true }}
                        />
                        {props.errormessage && (props.fields.claimStatusId == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                    </GridItem>

                    {/* <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            success={props.approvedClaimAmountState === "success"}
                            error={props.approvedClaimAmountState === "error"}
                            labelText="Approved Claim Amount"
                            required={true}
                            value={props.fields.approvedClaimAmount}
                            name="approvedClaimAmount"
                            onChange={(evt) => props.onInputParamChange("approvedClaimAmount", evt)}
                            inputProps={{
                                //type: "number"
                            }}
                            formControlProps={{ fullWidth: true }} />
                    </GridItem>
                    */}

                        <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                           // success={props.claimManagerRemarksState === "success"}
                            error={props.claimManagerRemarksState}
                            labelText="ManagerRemarks"
                            required={true}
                            multiline={true}
                            value={props.fields.claimManagerRemarks}
                            name="claimManagerRemarks"
                            onChange={(evt) => props.onInputParamChange("claimManagerRemarks", evt)}
                            inputProps={{
                                //type: "number"
                            }}
                            formControlProps={{ fullWidth: true }} />
                        {props.errormessage && (props.fields.claimManagerRemarks == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                    </GridItem>

                        <GridContainer lg={12} justify="center">
                        <GridItem xs={5} sm={3} md={3} lg={1}>
                                <Button color="info" round onClick={() => props.onFormSubmit()}>
                                    <TranslationContainer translationKey="Submit" />
                                </Button>	
                            </GridItem>
                        </GridContainer>

                    </GridContainer>
                    </div>
            }

        </div>

    );

}

export default ClaimsDecision;







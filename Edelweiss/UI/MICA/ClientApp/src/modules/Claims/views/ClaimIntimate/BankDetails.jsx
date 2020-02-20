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
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

import { Animated } from "react-animated-css";

const BankDetails = (props) => {

    return (
        <div>
            <CardHeader color="info" icon >

                    {
                        <h3 >
                        <small><TranslationContainer translationKey="BankDetails" /></small>
                        </h3>
                    }
                </CardHeader>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                            //success={props.accHolderNameState === "success"}
                            error={props.accHolderNameState}
                            labelText="AccountHolderName"
                            value={props.DetailsDTO.accHolderName}
                            name="accHolderName"
                            
                            required={true}
                        onChange={(e) => props.handleChange("accHolderName",e)}

                        formControlProps={{ fullWidth: true }} />
                    {props.errormessage && (props.DetailsDTO.accHolderName == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                       // success={props.accNumberState === "success"}
                        error={props.accNumberState}
                            labelText="AccountNo"
                            inputType="number"
                            value={props.DetailsDTO.accNumber}
                            name="accNumber"
                            required={true}
                        onChange={(e) => props.handleChange("accNumber",e)}

                        formControlProps={{ fullWidth: true }} />
                    {props.errormessage && (props.DetailsDTO.accNumber == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                        //success={props.bankNameState === "success"}
                        error={props.bankNameState }
                            labelText="BankName"
                            value={props.DetailsDTO.bankName}
                            name="bankName"
                            required={true}
                        onChange={(e) => props.handleChange("bankName",e)}

                        formControlProps={{ fullWidth: true }} />
                    {props.errormessage && (props.DetailsDTO.bankName == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                        //success={props.ifscCodeState === "success"}
                        error={props.ifscCodeState}
                            labelText="IFSCCode"
                            value={props.DetailsDTO.ifscCode}
                            name="ifscCode"
                            required={true}
                        onChange={(e) => props.handleChange("ifscCode",e)}

                        formControlProps={{ fullWidth: true }} />
                    {props.errormessage && (props.DetailsDTO.ifscCode == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                           // success={props.bankBranchAddState === "success"}
                            error={props.bankBranchAddState}
                            labelText="BankBranchAddress"
                            value={props.DetailsDTO.bankBranchAdd}
                            name="bankBranchAdd"
                        required={true}
                        multiline={true}
                        onChange={(e) => props.handleChange("bankBranchAdd",e)}
                            inputProps={{
                                //type: "number"
                            }}
                        formControlProps={{ fullWidth: true }} />
                    {props.errormessage && (props.DetailsDTO.bankBranchAdd == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                    </GridItem>

                    
                </GridContainer>
                </Animated>
        </div>
    );

}

export default BankDetails;

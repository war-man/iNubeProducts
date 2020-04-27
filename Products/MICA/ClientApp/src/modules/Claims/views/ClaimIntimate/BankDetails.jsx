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
                            error={props.accountHolderNameState}
                            labelText="AccountHolderName"
                            value={props.bankDetails.accountHolderName}
                            name="accountHolderName"
                            onChange={(e) => props.handleChangebank("accountHolderName",e)}

                            formControlProps={{ fullWidth: true }} />

                        {props.erroraccName && (props.accountHolderNameState === true) ? <p className="error"> Account holder name must contains only alphabets</p> : null}
                       
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                       // success={props.accNumberState === "success"}
                          //  error={props.accountNumberState}
                            labelText="AccountNo"
                            inputType="number"
                            value={props.bankDetails.accountNumber}
                            name="accountNumber"
                            onChange={(e) => props.handleChangebank("accountNumber",e)}

                        formControlProps={{ fullWidth: true }} />
                        
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                        <MasterDropdown
                            labelText="Account Type"
                            id="ddlstatus"
                            lstObject={props.AccountTypedata}
                            filterName='Account Type'
                            value={props.bankDetails.accountType}
                            name='accountType'
                            onChange={(e) => props.handleChangebank("accountType", e)}
                            formControlProps={{ fullWidth: true }}
                        />
                      
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                        //success={props.bankNameState === "success"}
                            error={props.bankNameState}
                            labelText="BankName"
                            value={props.bankDetails.bankName}
                            name="bankName"
                            onChange={(e) => props.handleChangebank("bankName",e)}

                        formControlProps={{ fullWidth: true }} />
                        {props.errorbankName && (props.bankNameState === true) ? <p className="error"> Bank name must contains only alphabets</p> : null}

                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                        //success={props.ifscCodeState === "success"}
                        error={props.ifscCodeState}
                            labelText="IFSCCode"
                            value={props.bankDetails.ifscCode}
                            name="ifscCode"
                            onChange={(e) => props.handleChangebank("ifscCode",e)}

                        formControlProps={{ fullWidth: true }} />

                        {props.errorifsccode && (props.ifscCodeState == true) ? <p className="error"> IFSC Code should be in correct format (eg: CNBK1234567)</p> : null}


                    </GridItem>

                    <GridItem xs={12} sm={8} md={9}>
                    <CustomInput
                           // success={props.bankBranchAddState === "success"}
                          //  error={props.bankBranchAddressState}
                            labelText="BankBranchAddress"
                            value={props.bankDetails.bankBranchAddress}
                            name="bankBranchAddress"
                            multiline={true}
                            onChange={(e) => props.handleChangebank("bankBranchAddress",e)}
                            inputProps={{
                                //type: "number"
                            }}
                        formControlProps={{ fullWidth: true }} />
                      
                    </GridItem>

                    
                </GridContainer>
                </Animated>
        </div>
    );

}

export default BankDetails;

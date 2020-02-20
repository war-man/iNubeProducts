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

import ClaimConfig from 'modules/Claims/ClaimConfig.js';




const ClaimComponent =(props)=> {
    console.log("LossIntimatedByData",props.LossIntimatedByData);
        return (
        
            <GridContainer lg={12}>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomDatetime labelText="LossDateTime" name="LossDate" value={props.fields.LossDate} onChange={(evt) => props.onDateChange('Datetime','LossDate', evt)} formControlProps={{ fullWidth: true }} />

                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput labelText="Location of Loss"
                        value={props.fields.lol}
                        name="lol"
                        onChange={props.onInputParamChange}
                       
                        formControlProps={{ fullWidth: true }} /> 
                    </GridItem>
                <GridItem xs={12} sm={12} md={4}>

                    <MasterDropdown labelText="Loss Intimated By" id="ddlstatus" lstObject={props.LossIntimatedByData} filterName='Claim Intimated By' value={props.fields.LossIntimatedId} name='LossIntimatedId' onChange={props.onInputParamChange} formControlProps={{ fullWidth: true }} />


                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <CustomInput labelText="Loss of Description"
                        value={props.fields.lod}
                        name="lod"
                        onChange={props.onInputParamChange}
                        inputProps={{
                            //type: "number"
                        }}
                        formControlProps={{ fullWidth: true }} />
                </GridItem>
                {props.coverEventshow && <GridContainer><GridItem xs={12} sm={12} md={4}>
                    <CustomInput labelText="Beneficiary Name"
                        value={props.fields.beneficiaryName}
                        name="beneficiaryName"
                        onChange={props.onInputParamChange}
                        inputProps={{
                            //type: "number"
                        }}
                        formControlProps={{ fullWidth: true }} />
                </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <CustomInput labelText="Mobile Number"
                            value={props.fields.mobileNumber}
                            name="mobileNumber"
                            onChange={props.onInputParamChange}
                            inputProps={{
                                //type: "number"
                            }}
                            formControlProps={{ fullWidth: true }} />
                    </GridItem>
                   </GridContainer>
                    }
            </GridContainer>
        );

}

export default ClaimComponent;







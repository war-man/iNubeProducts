import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import PermIdentity from "@material-ui/icons/PermIdentity";
//import PropTypes from "prop-types";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
//import Datetime from "react-datetime";
import Button from "components/CustomButtons/Button.jsx";
//import Paper from "@material-ui/core/Paper";
//import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import CommonMessage from "Messages/CommonMessage.jsx";

const CreateCDAccountPage=(props) => {
    const { classes } = props;
    console.log("props", props);
    return (
       
                <div>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={3} >

                    <MasterDropdown labelText="PartnerName" id="ddlstatus" lstObject={props.PartnerData} required={props.required} filterName='Partner' value={props.cdAccountsDTO.partnerId} name='partnerId' onChange={props.setValue} formControlProps={{ fullWidth: true }} />
                    {/*   {props.errormessage && (props.cdAccountsDTO.partnerId == "") ? <p className="error">*Required field cannot be left blank</p> : null}*/}
                    <span className="error">  {props.errormessage && (props.cdAccountsDTO.partnerId == "") ? CommonMessage("RequiredField", []) : null}</span>

                </GridItem>
                        <GridItem xs={12} sm={12} md={3} >

                    <MasterDropdown labelText="ProductName" id="ddlstatus" lstObject={props.ProductData} required={props.required} filterName='Product' value={props.cdAccountsDTO.productId} name='productId' onChange={props.setValue} formControlProps={{ fullWidth: true }} />
                    {/*{props.errormessage && (props.cdAccountsDTO.productId == "") ? <p className="error">*Required field cannot be left blank</p> : null}*/}
                    <span className="error">  {props.errormessage && (props.cdAccountsDTO.productId == "") ? CommonMessage("RequiredField", []) : null}</span>
                </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                        required={props.required} 
                                labelText="LineOfBusiness"
                                name="lob"
                                value={props.cdAccountsDTO.lob}
                        onChange={props.setValue}
                        disabled={props.disabled}
                                formControlProps={{
                                    fullWidth: true
                                }}
                    />
                    {/*{props.errormessage && (props.cdAccountsDTO.lob == "") ? <p className="error">*Required field cannot be left blank</p> : null}*/}
                    <span className="error">  {props.errormessage && (props.cdAccountsDTO.lob == "") ? CommonMessage("RequiredField", []) : null}</span>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                        required={props.required} 
                                labelText="ClassOfBusiness"
                                name="cob"
                                value={props.cdAccountsDTO.cob}
                                onChange={props.setValue}
                                disabled={props.disabled}
                                formControlProps={{
                                    fullWidth: true
                                }}
                    />
                   {/* {props.errormessage && (props.cdAccountsDTO.cob == "") ? <p className="error">*Required field cannot be left blank</p> : null}*/}
                    <span className="error">  {props.errormessage && (props.cdAccountsDTO.cob == "") ? CommonMessage("RequiredField", []) : null}</span>
                        </GridItem>
                      
                    </GridContainer>

                </div>
           
        );
}
export default CreateCDAccountPage;
import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import AddProduct from "modules/Partners/Partner/views/_AddProduct.jsx";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import searchproduct from "assets/img/search-product.png";
import Icon from "@material-ui/core/Icon";
import $ from 'jquery';
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


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
    ...customCheckboxRadioSwitch
};





const PartialProposalForm = (props) => {
    const { classes } = props;
    
    
   // console.log("propsPPF",props.filterData);
    return (
       
            
            <CardBody>
                <GridItem>
                    <h4><small>IMPORTENT</small></h4>
                    <p>1. Please answer all the questions accurately. </p>
                    <p>2. Please do not withhold any information. </p>
                    <p>3. If you are in doubt whether some information need to be disclosed, please disclose them.  </p>
                    <p>4. Please make sure that you answer all the questions before placing your signature.  </p>
                </GridItem>
               
           
                    
                        
                    <GridContainer xl={12}>
                <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Quotation No"
                                    value={props.filterData.quoteNo}
                        name="quoteNo"
                        disabled={props.proposalFormFlag}
                                    onChange={(e) => props.proposalSetValue(e)}
                                    id="QuoteNo"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Proposal No"
                                    value={props.filterData.proposalNo}
                                    name="proposalNo"
                        disabled={props.proposalFormFlag}
                                    onChange={(e) => props.proposalSetValue(e)}
                                    id="ProposalNo"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Plan Name"
                                    value={props.filterData.planId}
                                    name="planId"
                                    onChange={(e) => props.proposalSetValue(e)}
                        disabled={props.proposalFormFlag}
                                    id="PlanName"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                                <CustomInput
                                    labelText="Payment Frequency"
                                    value={props.filterData.paymentFrequency}
                        name="paymentFrequency"
                        disabled={props.proposalFormFlag}
                                    onChange={(e) => props.proposalSetValue(e)}
                                    id="PaymentFrequency"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                                <FormControl
                                    fullWidth
                                    className={classes.selectFormControl}
                                >
                                    <InputLabel
                                        htmlFor="simple-select"
                                        className={classes.selectLabel}
                                    >
                                        Need
                                             </InputLabel>
                                    <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select
                                        }}
                                        value={props.filterData.need}
                            onChange={(e) => props.proposalSetValue("ProposalFormData", e)}
                                        inputProps={{
                                            name: "Need",
                                            id: "Need"
                                        }}
                                    >
                                        <MenuItem
                                            disabled
                                            classes={{
                                                root: classes.selectMenuItem
                                            }}
                                        >
                                            Select
                            </MenuItem>
                                        <MenuItem
                                            classes={{
                                                root: classes.selectMenuItem,
                                                selected: classes.selectMenuItemSelected
                                            }}
                                            value="2"
                                        >
                                            Protection & Investment
                            </MenuItem>
                                        

                                    </Select>
                                </FormControl>
                            </GridItem>

                        </GridContainer>
                       
                   
                    
              
            </CardBody>
         
       

        //{this.props.entryFlag ? <AddProduct /> : null}
    );
}
export default withStyles(style)(PartialProposalForm);
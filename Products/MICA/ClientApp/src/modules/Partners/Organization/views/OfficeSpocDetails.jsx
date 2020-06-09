import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import profileStyles from "./profileStyles.jsx";
import PinCodeModal from "./_PinCodeModal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "components/CustomButtons/Button.jsx";
import AddPhoneNumber from "./_AddPhoneNumber";
import AddEmail from "./_AddEmail";
import AddMobileNumber from "./_AddMobileNumber";
import $ from "jquery";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import RegAddress from "./_RegAddress.jsx";



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
    ...customCheckboxRadioSwitch,
    ...profileStyles
};


const itemStyle = { marginTop: "25px" }


const OfficeSpocDetails = (props) => {
    const spocData = props.componentData;
    console.log("spoc details", spocData);
    var addType = 'spoc';
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    disabled={spocData.disabled}
                    //success={spocData.spocnameState === "success"}
                    //error={spocData.spocnameState === "error"}
                    error={spocData.spocnameState}
                    labelText="Name"
                    id="name"
                    value={spocData.addressDTO.spoc.spocname}
                    name='spocname'
                    onChange={(e) => spocData.SetValue("spoc", e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>



            <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    disabled={spocData.disabled}
                    //success={spocData.spocdesignationState === "success"}
                    //error={spocData.spocdesignationState === "error"}
                    error={spocData.spocdesignationState}
                    labelText="Designation"
                    id="designation"
                    value={spocData.addressDTO.spoc.spocdesignation}
                    name='spocdesignation'
                    onChange={(e) => spocData.SetValue("spoc", e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>



            <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    disabled={spocData.disabled}
                    //success={spocData.spocemailIdState === "success"}
                    //error={spocData.spocemailIdState === "error"}
                    error={spocData.spocemailIdState}
                    labelText="EmailId"
                    id="emailId"
                    value={spocData.addressDTO.spoc.spocemailId}
                    name='spocemailId'
                    onChange={(e) => spocData.SetValue("spoc", e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    disabled={spocData.disabled}
                    //success={spocData.spocmobilenoState === "success"}
                    //error={spocData.spocmobilenoState === "error"}
                    error={spocData.spocmobilenoState}
                    labelText="MobileNumber"
                    id="mobileNumber"
                    value={spocData.addressDTO.spoc.spocmobileno}
                    name='spocmobileno'
                    onChange={(e) => spocData.SetValue("spoc", e)}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>

            {/*<GridItem xs={12} sm={12} md={12}>
                <RegAddress  {...props} disabled={spocData.disabled} />
            </GridItem>
            */}


        </GridContainer>
    );
}




export default withStyles(style)(OfficeSpocDetails);
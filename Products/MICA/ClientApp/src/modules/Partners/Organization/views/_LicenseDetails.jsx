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
import Datetime from "react-datetime";

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

    const License = (props) => {
        const prop = props.componentData;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={prop.disabled}
                        labelText="RegistrationNumber"
                        id="regNo"
                        value={prop.OrganizationDTO.orgRegistrationNo}
                        name="orgRegistrationNo"
                        onChange={(e) => prop.SetValue("number", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={prop.disabled}
                        labelText="RegisteringAuthority"
                        id="regAuthority"
                        value={prop.OrganizationDTO.orgRegisteringAuthority}
                        name="orgRegisteringAuthority"
                        onChange={(e) => prop.SetValue("number", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
              
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={prop.disabled}
                        labelText="ServiceTaxRegistrationNo"
                        id="serviceTaxNo"
                        value={prop.OrganizationDTO.orgServiceTaxRegistrationNumber}
                        name="orgServiceTaxRegistrationNumber"
                        onChange={(e) => prop.SetValue("number", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={prop.disabled}
                        labelText="PANNumber"
                        id="panNumber"
                        value={prop.OrganizationDTO.orgPanno}
                        name="orgPanno"
                        onChange={(e) => prop.SetValue("number", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        disabled={prop.disabled}
                        labelText="TANNumber"
                        id="tanNumber"
                        value={prop.OrganizationDTO.orgTanno}
                        name="orgTanno"
                        onChange={(e)=>prop.SetValue("number",e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

            </GridContainer>
        );
    }

export default License;
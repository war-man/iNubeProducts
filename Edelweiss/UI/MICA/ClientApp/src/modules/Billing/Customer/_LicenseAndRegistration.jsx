import React from "react";
// @material-ui/core components
//import withStyles from "@material-ui/core/styles/withStyles";
//import InputLabel from "@material-ui/core/InputLabel";
//import FormControl from "@material-ui/core/FormControl";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

    const LicenseAndRegistration = (props) => {
        const prop = props.componentData;
        return (
            <GridContainer>
                {/* <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        success={prop.registrationNoState === "success"}
                        error={prop.registrationNoState === "error"}
                        disabled={prop.disabled}
                        labelText="Registration Number"
                        id="regNo"
                        value={prop.CustomerDto.registrationNo}
                        name="registrationNo"
                        onChange={(e) => prop.SetValue("string", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        success={prop.registeringAuthorityState === "success"}
                        error={prop.registeringAuthorityState === "error"}
                        disabled={prop.disabled}
                        labelText="Registering Authority"
                        id="regAuthority"
                        value={prop.CustomerDto.registeringAuthority}
                        name="registeringAuthority"
                        onChange={(e) => prop.SetValue("string", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
              */}
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        success={prop.serviceTaxRegistrationNumberState === "success"}
                        error={prop.serviceTaxRegistrationNumberState === "error"}
                        disabled={prop.disabled}
                        labelText="ServiceTaxRegistrationNumber"
                        id="serviceTaxNo"
                        value={prop.CustomerDto.serviceTaxRegistrationNumber}
                        name="serviceTaxRegistrationNumber"
                        onChange={(e) => prop.SetValue("string", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

                {/* <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        success={prop.pannoState === "success"}
                        error={prop.pannoState === "error"}
                        disabled={prop.disabled}
                        labelText="PAN Number"
                        id="panNumber"
                        value={prop.CustomerDto.panno}
                        name="panno"
                        onChange={(e) => prop.SetValue("pan", e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem> */}
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        success={prop.tannoState === "success"}
                        error={prop.tannoState === "error"}
                        disabled={prop.disabled}
                        labelText="TANNumber"
                        id="tanNumber"
                        value={prop.CustomerDto.tanno}
                        name="tanno"
                        onChange={(e) => prop.SetValue("tan",e)}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>

            </GridContainer>
        );
    }

export default LicenseAndRegistration;
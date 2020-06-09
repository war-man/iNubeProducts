import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import CustomInput from "components/CustomInput/CustomInput.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";



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


const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
}

const validateBtn = {
    height: "35px",
    marginTop: "-10px",
}
const HumanValue = (props) => {

    const { classes } = props;
    return (
        <div>



            <GridContainer>
               
                <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                        labelText="Interest Rate(%)"
                        id="InterestRate"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />

                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                        labelText="No.of Years to Earn"
                        id="InterestRate"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />

                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                        labelText="Monthly Earning"
                        id="InterestRate"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />

                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                        labelText="Estimated Earnings"
                        id="InterestRate"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />

                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        labelText="Fund Value to Protect Your Future Income"
                        id="InterestRate"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />

                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        labelText="Available Fund"
                        id="InterestRate"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />

                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        labelText="Emergency Fund Requirement"
                        id="InterestRate"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />

                </GridItem>

            </GridContainer>



        </div>

    )
}

export default withStyles(style)(HumanValue);
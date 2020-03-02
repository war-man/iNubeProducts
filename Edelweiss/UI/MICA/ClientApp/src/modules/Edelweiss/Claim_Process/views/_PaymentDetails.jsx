import React from "react";

// @material-ui/core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
// core components
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

const PaymentDetails = (props) => {
    console.log("paymentDetails", props);
    // const { classes } = this.props;
    const paymentDetailsprops = props.componentData;
    //console.log('Insurable data ', insurableData);
    //console.log('Insurable data props ', props);


  //  let payment = false;
 //   paymentDetailsprops.decision = payment;
    return (
        <div>
            {(paymentDetailsprops !== undefined) ?
                <GridContainer>

                    {paymentDetailsprops.paymentDetailsData.map((item, index) =>
                        <GridItem xs={12} sm={4} key={index}>

                            <CustomInput
                                labelText={item[0]}
                                // disabled={claimDetailsprops.disabled}
                                value={item[1]}
                                //name={item.inputType}
                                //onChange={this.onInputParamChange}
                                // labelText="Partner Id"
                                //  name="claimNumber"
                                //  value={props.ClaimDTO.claimId}
                                inputProps={{
                                    //type: "number"
                                }}
                                formControlProps={{ fullWidth: true }}
                            />


                        </GridItem>
                    )}
                </GridContainer>
                : null}

        </div>
    );

}

export default PaymentDetails;

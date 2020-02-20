import React from "react";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


const SwitchONParameter = (props) => {

    return (
        <GridContainer>
            <h5>Switch ON/OFF:</h5>
            <GridContainer>
            {props.componentData.MasterDTO.Switchon.map((item, id) => (
                <GridItem xs={12} sm={12} md={3} className="uplevel">


                    <CustomCheckbox key={id}
                        name={item.mValue}
                        labelText={item.mValue}
                        value={item.mIsRequired}
                        onChange={(e) => props.componentData.SetRiskClaimsDetailsValue('Risk', e)}
                        disabled={(item.disable == true) ? true : null}
                        checked={item.mIsRequired}
                        formControlProps={{
                            fullWidth: true
                        }}

                    />
                </GridItem>
                ))}
            </GridContainer>
            </GridContainer>
        )
}

export default SwitchONParameter;

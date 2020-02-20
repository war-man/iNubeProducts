import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import CustomInput from "../CustomInput/CustomInput.jsx";
import MasterDropdown from "../MasterDropdown/MasterDropdown.jsx";
import GridItem from "../Grid/GridItem.jsx";
import GridContainer from "../Grid/GridContainer.jsx";

function CustomCurrency({ ...props }) {
    const {
        classes,
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        white,
        inputRootCustomClasses,
        success,
        helpText,
        onInputChange,
        onChange,
        InputName,
        InputValue,
        value,
        name,
        disabled,
        lstObject,
        required
    } = props;

   

    return (

        <GridContainer >
            <GridItem xs={12} md={2}>
                <MasterDropdown 
                    id={props.id}
                    labelText="Currency"
                    lstObject={lstObject}
                    filterName='Currency'
                    value={value}
                    name={name}
                    onChange={(e)=>onChange(e)}
                    formControlProps={{
                        fullWidth: true
                    }}

                 
                />
                
            </GridItem>
            {props.rate &&<GridItem xs={12} md={2} >
                <MasterDropdown
                    id={props.id}
                    labelText="Rate(%)"
                    lstObject={lstObject}
                    filterName='Currency'
                    value={value}
                    name={name}
                    onChange={(e) => onChange(e)}
                    formControlProps={{
                        fullWidth: true
                    }}


                />

            </GridItem>
            }

            <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                    labelText="Amount"
                    value={InputValue}
                    name={InputName}
                    onChange={(e) => onChange(e)}
                    type="numeric"
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>
        </GridContainer>


    );
}

CustomCurrency.propTypes = {
    classes: PropTypes.object,
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    inputRootCustomClasses: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool,
    white: PropTypes.bool,
    name: PropTypes.string,
    InputName: PropTypes.string,
    helpText: PropTypes.node,
    lstObject: PropTypes.arrayOf(PropTypes.shape({
        mID: PropTypes.string,
        mValue: PropTypes.string,
    }))

};

export default CustomCurrency;

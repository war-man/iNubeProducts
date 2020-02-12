import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

const Style = {
    ...customSelectStyle,
    // ...customDropdownStyle
}

function Dropdown({ ...props }) {
    //console.log("disable", props);
    //console.log("disable", props.disabled);
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
        onChange,
        value,
        name,
        disabled,
        lstObject,
        required
    } = props;

    var formControlClasses;
    if (formControlProps !== undefined) {
        formControlClasses = classNames(
            formControlProps.className,
            classes.formControl
        );
    } else {
        formControlClasses = classes.formControl;
    }

    const labelClasses = classNames({
        [" " + classes.labelRootError]: error,
        [" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = classNames({
        [classes.underlineError]: error,
        [classes.underlineSuccess]: success && !error,
        [classes.underline]: true,
        [classes.whiteUnderline]: white
    });

    var helpTextClasses = classNames({
        [classes.labelRootError]: error,
        [classes.labelRootSuccess]: success && !error
    });
    return (


        <FormControl id="dropdown" {...formControlProps} className={formControlClasses + " " + classes.selectFormControl}>
         
            {labelText !== undefined ? (
                (required == true) ? (
                <InputLabel
                    className={classes.labelRoot + " " + labelClasses + " " + classes.selectLabel}
                    htmlFor={id}
                    {...labelProps} 
                > 
                        <TranslationContainer translationKey={labelText} /> <span className="drop-validation" id="red" style={{ color: 'red' }}>*</span>
                    </InputLabel>):
                    <InputLabel
                        className={classes.labelRoot + " " + labelClasses + " " + classes.selectLabel}
                        htmlFor={id}
                        {...labelProps}
                    >
                        <TranslationContainer translationKey={labelText} />
                    </InputLabel>
            ) : null}
            <Select
                MenuProps={{

                    className: classes.selectMenu
                }}
                classes={{
                    select: classes.select
                }}
                value={value}
                onChange={onChange}
                disabled={disabled}
                name={name}
                {...inputProps}
            >

                {
                    lstObject.map(item =>
                        <MenuItem value={item.mID} classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                        }}> {item.mValue}


                        </MenuItem>
                    )


                }


            </Select>
            {helpText !== undefined ? (
                <FormHelperText id={id + "-text"} className={helpTextClasses}>
                    {helpText}
                </FormHelperText>
            ) : null}
            <span className="validation-dropdown"></span>
        </FormControl> 


    );
}

Dropdown.propTypes = {
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
    helpText: PropTypes.node,
    lstObject: PropTypes.arrayOf(PropTypes.shape({
        mID: PropTypes.string,
        mValue: PropTypes.string,
    }))

};

export default withStyles(Style)(Dropdown);

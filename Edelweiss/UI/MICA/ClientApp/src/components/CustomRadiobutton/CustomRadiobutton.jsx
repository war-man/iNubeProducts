import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";

import customInputStyle from "assets/jss/material-dashboard-pro-react/components/customInputStyle.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

function CustomRadioButton({ ...props }) {
    const {
        selectedValue,
        classes,
        formControlProps,
        labelText,
        id,
        disabled,
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
        aria,
        modelbind
    } = props;

    //const labelClasses = classNames({
    //    [" " + classes.labelRootError]: error,
    //    [" " + classes.labelRootSuccess]: success && !error
    //});
    //const underlineClasses = classNames({
    //    [classes.underlineError]: error,
    //    [classes.underlineSuccess]: success && !error,
    //    [classes.underline]: true,
    //    [classes.whiteUnderline]: white
    //});
    //const marginTop = classNames({
    //    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
    //});
    //const inputClasses = classNames({
    //    [classes.input]: true,
    //    [classes.whiteInput]: white
    //});
    //var formControlClasses;
    //if (formControlProps !== undefined) {
    //    formControlClasses = classNames(
    //        formControlProps.className,
    //        classes.formControl
    //    );
    //} else {
    //    formControlClasses = classes.formControl;
    //}
    //var helpTextClasses = classNames({
    //    [classes.labelRootError]: error,
    //    [classes.labelRootSuccess]: success && !error
    //});
    console.log("radiolist", props.radiolist);
    return (
        (props.radiolist.length>0)?(
        props.radiolist.map((item) =>
            <FormControlLabel
                control={
                    <Radio
                        checked={item.selectedValue === item.mID}
                        onChange={onChange}
                            disabled={disabled}
                        value={item.mID}
                        name={item.mValue}
                        aria-label="B"
                        icon={
                            <FiberManualRecord
                                className={classes.radioUnchecked}
                            />
                        }
                        checkedIcon={
                            <FiberManualRecord
                                className={classes.radioChecked}
                            />
                        }
                        classes={{
                            checked: classes.radio,
                            root: classes.radioRoot
                        }}
                    />
                }
                classes={{
                    label: classes.label
                }}
                label={item.mValue}
            />
        )
            ):null
    );
}

CustomRadioButton.propTypes = {
    classes: PropTypes.object.isRequired,
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    inputRootCustomClasses: PropTypes.string,
    aria: PropTypes.string,
    success: PropTypes.bool,
    white: PropTypes.bool,
    helpText: PropTypes.node,
    modelbind: PropTypes.string
};

export default withStyles(customCheckboxRadioSwitch)(CustomRadioButton);



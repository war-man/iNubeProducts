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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
function CustomCheckbox({ ...props }) {
    //console.log("CustomCheckbox",props);
    const {
        classes,
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        disabled,
        white,
        inputRootCustomClasses,
        success,
        helpText,
        onChange,
        value,
        name,
        modelbind,
        checked
    } = props;

   
    const marginTop = classNames({
        [inputRootCustomClasses]: inputRootCustomClasses !== undefined
    });
    const inputClasses = classNames({
        [classes.input]: true,
        [classes.whiteInput]: white
    });
    var formControlClasses;
    if (formControlProps !== undefined) {
        formControlClasses = classNames(
            formControlProps.className,
            classes.formControl
        );
    } else {
        formControlClasses = classes.formControl;
    }
    
    let contents = props.value ? 'classes.checkedIcon' : 'classes.uncheckedIcon'
    //console.log("contents", contents);
    
    return (
        
        <FormControlLabel
            control={
                <Checkbox
                    tabIndex={-1}
                    onClick={onChange}
                    checkedIcon={
                        <Check className={classes.checkedIcon} />
                    }
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                        checked: classes.checked,
                        root: classes.checkRoot
                    }}
                    value={value}
                    checked={checked}
                    name={name}
                    disabled={disabled}
                    {...modelbind}
                />
            }
            classes={{
                label: classes.label
            }}
            label={labelText}
        />
           
    );
}

CustomCheckbox.propTypes = {
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    inputRootCustomClasses: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool,
    value: PropTypes.bool,
    modelbind: PropTypes.string
};

export default withStyles(regularFormsStyle)(CustomCheckbox);



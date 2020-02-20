import React from "react";
// nodejs library to set properties for components
import PropTypes, { bool, number } from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

import { createMuiTheme } from "@material-ui/core";
import customInputStyle from "assets/jss/material-dashboard-pro-react/components/customInputStyle.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import purple from "@material-ui/core/colors/purple";

function DollarControl(props) {
    const { inputRef, onChange, value, name, defaultValue, precision, decimalScale, ...other } = props;
    console.log("customprops: ", props, props.precision, props.decimalScale)
    return (
        <NumberFormat

            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        //value: values.value,
                        value: parseFloat(values.value).toFixed((defaultValue == 4) ? 4 : 2)
                        //value: parseFloat(values.value).toFixed((props.precision === 2) ? 2 : 4)
                    },
                });
            }}
            //value={parseFloat(value).toFixed(2)}
            value={value}
            name={name}
            //thousandSeparator
            isNumericString={true}
            thousandSeparator={true}
            decimalScale={decimalScale}
            //thousandsGroupStyle="lakh"
            //prefix={'₹ '}
            prefix={'$ '}
        //suffix='/-'
        />
    );
}

DollarControl.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    precision: PropTypes.number,
    decimalScale: PropTypes.number,
};

function RupeeControl(props) {
    console.log("customprops: ", props, props.precision, props.decimalScale)
    const { inputRef, onChange, value, name, defaultValue, precision, decimalScale, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        //value: values.value,
                        value: parseFloat(values.value).toFixed((defaultValue == 4) ? 4 : 2)
                        //value: parseFloat(values.value).toFixed((props.precision == 2) ? 2 : 4)
                    },
                });
            }}
            //value={parseFloat(value).toFixed(2)}
            value={value}
            name={name}
            decimalScale={decimalScale}
            //thousandSeparator
            isNumericString={true}
            thousandSeparator={true}
            thousandsGroupStyle="lakh"
            //prefix={(prefix == '$ ') ? '$ ': '₹ ' }
            prefix={'₹ '}
            suffix='/-'
        />
    );
}

RupeeControl.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    decimalScale: PropTypes.number
};





function CustomInput({ ...props }) {
    const {
        classes,
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        onBlur,
        white,
        inputRootCustomClasses,
        //success,
        helpText,
        type,
        onChange,
        onKeyPress,
        value,
        name,
        multiline,
        disabled,
        modelbind,
        required,
        maxLength,
        onFocus,
        placeholder,
        inputType,
        defaultValue,
        precision,
        decimalScale,
        pattern,
    } = props;

    const [values, setValues] = React.useState({
        textmask: "(1  )    -    ",
        numberformat: props.value,
    });

    const handleChange = (name, vname) => event => {
        setValues({
            ...values,
            [name]: event.target.value
        });
        event.target.name = vname;
        onChange(event);
    };

    const labelClasses = classNames({
        [" " + classes.labelRootError]: error,
        //[" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = classNames({
        [classes.underlineError]: error,
        //[classes.underlineSuccess]: success && !error,
        [classes.underline]: true,
        [classes.whiteUnderline]: white
    });

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
    var helpTextClasses = classNames({
        [classes.labelRootError]: error,
        //[classes.labelRootSuccess]: success && !error
    });


    const formLabelsTheme = createMuiTheme({
        overrides: {
            MuiFormLabel: {
                asterisk: {
                    color: '#db3131',
                    '&$error': {
                        color: '#db3131'
                    },
                }
            },
            //MuiInput: {
            //    underline: {
            //        '&:hover:not($disabled):before': {
            //            borderBottom: '#808080',
            //        },
            //    },
            //},
        }
    })

    switch (props.type) {
        case "Rupee":
            return (
                <MuiThemeProvider theme={formLabelsTheme}>
                    <FormControl {...formControlProps} className={formControlClasses}>
                        <TextField
                            classes={{
                                input: inputClasses,
                                root: marginTop,
                                disabled: classes.disabled,
                                underline: underlineClasses,

                            }}
                            id={id}
                            //variant="outlined"
                            //disableUnderline={true}
                            color="info"
                            label={labelText !== undefined ? (
                                <TranslationContainer translationKey={labelText} />
                            ) : null}
                            placeholder={placeholder}
                            disabled={disabled}
                            onChange={handleChange("numberformat", name)}
                            //onChange={onChange}
                            value={values.numberformat}
                            //value={value}
                            defaultValue={defaultValue}
                            //precision={precision}
                            error={error}
                            //decimalScale={decimalScale}
                            required={(required == true) ? true : false}
                            name={name}
                            onBlur={onBlur}
                            //multiline={multiline}
                            onFocus={onFocus}
                            onKeyPress={onKeyPress}
                            InputProps={{
                                inputComponent: RupeeControl,
                                style: {
                                    fontSize: 13,
                                }
                            }}
                            inputProps={{
                                style: { textAlign: "right" },
                                maxLength: maxLength
                            }}
                            {...modelbind}
                        />
                        {helpText !== undefined ? (
                            { ...inputProps }
                            //<FormHelperText id={id + "-text"} className={helpTextClasses}>
                            //    {helpText}
                            //</FormHelperText>
                        ) : null}
                    </FormControl>
                </MuiThemeProvider >
            );
            break;
        case "Dollar":
            return (
                <MuiThemeProvider theme={formLabelsTheme}>
                    <FormControl {...formControlProps} className={formControlClasses}>
                        <TextField
                            classes={{
                                input: inputClasses,
                                root: marginTop,
                                disabled: classes.disabled,
                                underline: underlineClasses,

                            }}
                            id={id}
                            //variant="outlined"
                            //disableUnderline={true}
                            color="info"
                            label={labelText !== undefined ? (
                                <TranslationContainer translationKey={labelText} />
                            ) : null}
                            placeholder={placeholder}
                            disabled={disabled}
                            onChange={handleChange("numberformat", name)}
                            //onChange={onChange}
                            value={values.numberformat}
                            //value={value}
                            defaultValue={defaultValue}
                            //decimalScale={decimalScale}
                            //precision={precision}
                            error={error}
                            required={(required == true) ? true : false}
                            name={name}
                            onBlur={onBlur}
                            multiline={multiline}
                            onFocus={onFocus}
                            onKeyPress={onKeyPress}
                            InputProps={{
                                inputComponent: DollarControl,
                                style: {
                                    fontSize: 13,
                                }
                            }}
                            inputProps={{
                                style: { textAlign: "right" },
                                maxLength: maxLength
                            }}
                            {...modelbind}
                        />
                        {helpText !== undefined ? (
                            { ...inputProps }
                            //<FormHelperText id={id + "-text"} className={helpTextClasses}>
                            //    {helpText}
                            //</FormHelperText>
                        ) : null}
                    </FormControl>
                </MuiThemeProvider >
            );
            break;
        default:
            return (
                <MuiThemeProvider theme={formLabelsTheme}>
                    <FormControl {...formControlProps} className={formControlClasses}>
                        <TextField
                            classes={{
                                input: inputClasses,
                                root: marginTop,
                                disabled: classes.disabled,
                                underline: underlineClasses
                            }}
                            id={id}
                            variant="outlined"
                            //disableUnderline={true}
                            label={labelText !== undefined ? (
                                <TranslationContainer translationKey={labelText} />
                            ) : null}
                            color="info"
                            placeholder={placeholder}
                            disabled={disabled}
                            onChange={onChange}
                            value={value}
                            name={name}
                            required={(required == true) ? true : false}
                            error={error}
                            onBlur={onBlur}
                            multiline={multiline}
                            onFocus={onFocus}
                            maxLength={maxLength}
                            onKeyPress={onKeyPress}
                            pattern={pattern}
                            inputProps={(type === "numeric") ? { style: { textAlign: "end" } } : ""}
                            type={(inputType == "number") ? "number" : ""}
                            InputProps={{
                                style: {
                                    fontSize: 13,
                                }
                            }}
                            //inputProps={{ maxLength: maxLength}}
                            {...modelbind}
                            {...inputProps}
                        />
                        {helpText !== undefined ? (
                            <FormHelperText id={id + "-text"} className={helpTextClasses}>
                                {helpText}
                            </FormHelperText>
                        ) : null}
                    </FormControl>
                </MuiThemeProvider >
            );
    }

    const typeNumer = {
        style: { textAlign: "end" }
    }
    return (
        <FormControl {...formControlProps} className={formControlClasses}>
            <TextField type={type}
            />
        </FormControl>
    );
}

CustomInput.propTypes = {
    classes: PropTypes.object.isRequired,
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    inputRootCustomClasses: PropTypes.string,
    error: PropTypes.bool,
    //success: PropTypes.bool,
    multiline: PropTypes.bool,
    white: PropTypes.bool,
    helpText: PropTypes.node,
    modelbind: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
    required: PropTypes.bool,
    maxLength: PropTypes.object,
    defaultValue: PropTypes.string,
    precision: PropTypes.number,
    decimalScale: PropTypes.number,
    pattern: PropTypes.string,
};

export default withStyles(customInputStyle)(CustomInput);
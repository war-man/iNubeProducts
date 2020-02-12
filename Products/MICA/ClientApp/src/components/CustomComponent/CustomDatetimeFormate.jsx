import React, { useState, useEffect } from "react";
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
import Datetime from "react-datetime";
import customDateStyle from "assets/jss/material-dashboard-pro-react/components/customDateStyle.jsx";
import { relative } from "path";
import $ from 'jquery';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

function CustomDatetime({ ...props }) {
    const {
        time,
        IsValid,
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
        modelbind,
        required,
        isValidDate,
        disabled,
       
    } = props;


    const [focus, setFocus] = useState(false);
    const [DateTime, setDateTime] = useState();
    console.log("datetime", DateTime,value);
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
        [classes.labelRootSuccess]: success && !error
    });


    if (props.validdate == false) {
        var yesterday = Datetime.moment().subtract(props.datediff, 'day');
        var valid = function (current) {
            return current.isAfter(yesterday);
        };

    } else if (props.validdate == true) {
        var yesterday = Datetime.moment().subtract(1, 'day'); var valid = function (current) {
            return current.isAfter(yesterday);
        }
    }

    if (props.Futuredatevalidate == true) {
        var yesterday = Datetime.moment().subtract(0, 'day');
        var valid = function (current) {
            return current.isBefore(yesterday);
        };

    }


    const labelStyle = {
        position: 'absolute',
        fontSize: '14px',
        transformOrigin: 'top left',
        transition: 'all .3s ease-in-out',
        transform: ((value == "" || value == undefined) && focus == (false)) ? 'translate(0, 10px) scale(1)' : 'translate(0, -15px) scale(.75)',
    }

    const containerStyle = {
        position: 'relative',
    }
    useEffect(() => {
  
        if (value != "" && IsValid==true) {
         
            const _date = value.split('-');
            const dateObj = { month: _date[1], year: _date[0], day: _date[2] };
           const value= setDateTime(dateObj.day + '/' + dateObj.month + '/' + dateObj.year);
          //  console.log("dateformate", date);
           // return dateObj.day + '/' + dateObj.month + '/' + dateObj.year;

        }
    },[]
    );
    const data="";
    return (
        <FormControl {...formControlProps} className={formControlClasses}>
            <div id="rtdatetime" style={containerStyle} >
                {labelText !== undefined ? (
                    (required == true) ? (
                        <label id={id} style={labelStyle}> <TranslationContainer translationKey={labelText} /><span id="red" style={{ color: 'red' }}>*</span></label>
                    ) : <label id={id} style={labelStyle}> <TranslationContainer translationKey={labelText} /></label>
                ) : ""}


                <Datetime id={id} dateFormat='DD/MM/YYYY' name={name} closeOnSelect={true} isValidDate={(isValidDate == undefined) ? valid : isValidDate} onFocus={() => { setFocus(true);   }} onBlur={() => { setFocus(false) }} onChange={onChange} value={DateTime} dateFormate={true} timeFormat={time} inputProps={{ readOnly: true, disabled: disabled }} {...modelbind} {...inputProps} />
                {helpText !== undefined ? (
                    <FormHelperText id={id + "-text"} className={helpTextClasses}>
                        {helpText}
                    </FormHelperText>
                ) : null}
            </div>
        </FormControl>
    );
}

CustomDatetime.propTypes = {
    classes: PropTypes.object.isRequired,
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    inputRootCustomClasses: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool,
    white: PropTypes.bool,
    helpText: PropTypes.node,
    modelbind: PropTypes.string
};

export default withStyles(customDateStyle)(CustomDatetime);





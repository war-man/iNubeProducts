
import React from "react";
import { DatePicker, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
function CustomDateTimePicker(props) {
    const { timeformate, labelText, disabled, name, required, id, onChange, value, width, isClearable, minDate, maxDate, disableFuture } = props;


    return (
        <MuiPickersUtilsProvider utils={MomentUtils} >
            {(timeformate) ?
                <DateTimePicker
                    variant="inline"
                    label={labelText}
                    className="DateTimePicker"
                    name={name}
                    id="DateTimePicker"
                    required={required}
                    minDate={minDate}
                    maxDate={maxDate}
                    value={(value == undefined) ? null : value}
                    format="DD/MM/YYYY hh:mm a"
                    autoOk
                    disabled={disabled}
                    disableFuture={disableFuture}
                    style={{ 'top': '11px', 'width': width }}
                    isClearable={isClearable}
                    //  editFormat={formatter} 
                    onChange={onChange}
                />
                :

                <DatePicker
                    variant="inline"
                    label={labelText}
                    value={(value == undefined) ? null : value}
                    name={name}
                    className="DateTimePicker"
                    id="DateTimePicker"
                    minDate={minDate}
                    maxDate={maxDate}
                    format="DD/MM/YYYY"
                    autoOk
                    disabled={disabled}
                    disableFuture={disableFuture}
                    style={{ 'top': '10px', 'width': width }}
                    isClearable={isClearable}
                    //  editFormat={formatter} 
                    onChange={onChange}


                />

            }


        </MuiPickersUtilsProvider>

    );
}

export default CustomDateTimePicker;
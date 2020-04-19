
import React, { useState} from "react";
import { DatePicker, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import Datetime from "react-datetime";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

function CustomDateTimePicker(props) {
    const { timeformate, labelText, disabled, name, required, id, onChange, value, width, isClearable, minDate, maxDate, disableFuture } = props;
    const [isAfter, handleDateTime] = React.useState(false);
    const onChangeFun=(e)=>{
        console.log("onError", e);
        if (disableFuture) {
            var today = e.toDate();
            var isAfter = Datetime.moment(today).isAfter(new Date());
            if (isAfter) {
                handleDateTime(true);
           
            } else {
                handleDateTime(false);
              
            }
            onChange(e);
          
        } else {
            onChange(e);
        }
        

      
    }
  
    return (
        <div>
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
                    maxDateMessage={<h1>maxDateMessage</h1>}
                    disableFuture={disableFuture}
                    style={{ 'top': '11px', 'width': width }}
                    isClearable={isClearable}
                    //  editFormat={formatter} 
                    onChange={onChangeFun}
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
            {(isAfter) ? <p style={{ 'top': '15px' }} className="error">Selected Date & Time Cannot be Future Date  & Time</p> : null }
            </div>
    );
}


export default CustomDateTimePicker;